import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import Config                             from 'rapidfab/config'
import TemplateComponent                  from 'rapidfab/components/records/template'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uuid',
  'name',
  'description',
  'region',
  'cost',
  'bureau',
]

class TemplateContainer extends Component {
  componentWillMount() {
    const { bureau, uuid } = this.props;
    this.props.onInitialize(bureau, uuid);
  }

  componentWillUnmount() {
    this.props.onUnmount()
  }

  render() {
    return <TemplateComponent {...this.props}/>
  }
}

function redirect() {
  window.location.hash = "#/inventory/templates"
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: (bureau, uuid) => {
      dispatch(Actions.Api.wyatt['printer-type'].list())
      dispatch(Actions.Api.wyatt['post-processor-type'].list())
      dispatch(Actions.Api.wyatt.shipping.list({ bureau: bureau.uri }))
      if(uuid) {
        dispatch(Actions.Api.wyatt.template.get(uuid))
        dispatch(Actions.Api.wyatt["process-step"].list())
      }
    },
    onSave: (payload, deletedSteps) => {
      let templatePromise = null
      if(payload.uuid) {
        templatePromise = dispatch(Actions.Api.wyatt.template.put(payload.uuid, payload))
      } else {
        templatePromise = dispatch(Actions.Api.wyatt.template.post(payload))
      }
      Promise.all([templatePromise]).then(() => {
        const deletePromises = _.map(deletedSteps, uuid => {
          return dispatch(Actions.Api.wyatt["process-step"].delete(uuid))
        })
        Promise.all(deletePromises).then(redirect)
      })
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.template.delete(uuid)).then(redirect)
      }
    },
    onDuplicate: templateCopy => {
      const { bureau, name, steps } = templateCopy;
      const stepCopies = steps.map( step => {
        const step_data = _.omit(step, ['step_position', 'template']);
        return new Promise((resolve) => {
          dispatch(Actions.Api.wyatt["process-step"].post(step_data))
            .then( response => resolve(response.payload.uri) )
        });
      });
      Promise.all(stepCopies).then(process_steps => {
        const payload = {
          bureau,
          name,
          process_steps,
        }
        dispatch(Actions.Api.wyatt.template.post(payload)).then(redirect);
      });
    },
    submitStep: payload => {
      if(payload.uuid) {
        return dispatch(Actions.Api.wyatt["process-step"].put(payload.uuid, payload))
      } else {
        return dispatch(Actions.Api.wyatt["process-step"].post(payload))
      }
    },
    onUnmount: () => {
      //get rid of pesky lingering errors
      dispatch(Actions.UI.clearUIState([
        "wyatt.location",
      ]))
    },
  }
}

function mapStateToProps(state, props) {
  const template = Selectors.getRouteResource(state, props)

  const processTypes = _.concat(
    Selectors.getPrinterTypes(state),
    Selectors.getPostProcessorTypes(state),
    Selectors.getShippings(state),
  )

  const fetching =
    state.ui.wyatt["process-step"].list.fetching ||
    state.ui.wyatt.template.list.fetching

  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    template        : template,
    bureau          : Selectors.getBureau(state),
    initialValues   : Selectors.getInitialValuesBureau(state, props),
    submitting      : Selectors.getResourceFetching(state, "wyatt.template"),
    apiErrors       : Selectors.getResourceErrors(state, "wyatt.template"),
    steps           : Selectors.getStepsForTemplate(state, template),
    processTypes    : processTypes,
    fetching,
  }
}

export default reduxForm({
  form: 'record.template',
  fields
}, mapStateToProps, mapDispatchToProps)(TemplateContainer)
