import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import MaterialComponent                  from 'rapidfab/components/records/material'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'description',
  'color',
  'type',
  'manufacturer',
  'cost',
  'third_party_fulfillment',
  'post_processing_seconds'
]

class MaterialContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <MaterialComponent {...this.props}/>
  }
}

function redirect() {
  window.location.hash = "#/inventory/materials"
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.manufacturer.list())
      if(uuid) {
        dispatch(Actions.Api.wyatt.material.get(uuid))
      }
    },
    onSubmit: payload => {
      if(!payload.third_party_fulfillment){ payload.third_party_fulfillment = false}
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.material.put(payload.uuid, payload)).then(redirect)
      } else {
        dispatch(Actions.Api.wyatt.material.post(payload)).then(redirect)
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.material.delete(uuid)).then(redirect)
      }
    }
  }
}

function mapStateToProps(state, props) {
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : Selectors.getRouteResource(state, props),
    submitting      : Selectors.getResourceFetching(state, "wyatt.material"),
    apiErrors       : Selectors.getResourceErrors(state, "wyatt.material"),
    manufacturers   : Selectors.getManufacturers(state)
  }
}

export default reduxForm({
  form: 'record.material',
  fields
}, mapStateToProps, mapDispatchToProps)(MaterialContainer)
