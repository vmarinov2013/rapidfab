import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import PostProcessorTypeComponent from 'rapidfab/components/records/postProcessorType';
import { reduxForm } from 'redux-form';
import * as Selectors from 'rapidfab/selectors';

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'description',
  'materials',
  'manufacturer',
  'bureau',
  'cost',
  'duration',
];

class PostProcessorTypeContainer extends Component {
  componentWillMount() {
    const { bureau, uuid } = this.props;
    this.props.onInitialize(bureau, uuid);
  }

  render() {
    return <PostProcessorTypeComponent {...this.props} />;
  }
}

function redirect() {
  window.location.hash = '#/inventory/post-processor-types';
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: (bureau, uuid) => {
      dispatch(Actions.Api.wyatt.material.list({ bureau }));
      dispatch(Actions.Api.wyatt.manufacturer.list());
      if (uuid) {
        dispatch(Actions.Api.wyatt['post-processor-type'].get(uuid));
      }
    },
    onSubmit: payload => {
      if (payload.uuid) {
        dispatch(
          Actions.Api.wyatt['post-processor-type'].put(payload.uuid, payload)
        ).then(redirect);
      } else {
        dispatch(Actions.Api.wyatt['post-processor-type'].post(payload)).then(
          redirect
        );
      }
    },
    onDelete: uuid => {
      if (uuid) {
        dispatch(Actions.Api.wyatt['post-processor-type'].delete(uuid)).then(
          redirect
        );
      }
    },
  };
}

PostProcessorTypeContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  onInitialize: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  return {
    bureau: Selectors.getBureauUri(state),
    uuid: Selectors.getRoute(state, props).uuid,
    initialValues: Selectors.getInitialValuesBureau(state, props),
    submitting: Selectors.getResourceFetching(
      state,
      'wyatt.post-processor-type'
    ),
    materials: Selectors.getMaterials(state),
    manufacturers: Selectors.getManufacturers(state),
  };
}

export default reduxForm(
  {
    form: 'record.postProcessorType',
    fields,
  },
  mapStateToProps,
  mapDispatchToProps
)(PostProcessorTypeContainer);
