import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import ThirdPartyProvider from 'rapidfab/components/records/thirdPartyProvider';
import { reduxForm } from 'redux-form';
import * as Selectors from 'rapidfab/selectors';

const fields = ['id', 'uri', 'uuid', 'name', 'description', 'bureau'];

class ThirdPartyProviderContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid);
  }

  render() {
    return <ThirdPartyProvider {...this.props} />;
  }
}

ThirdPartyProviderContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

function redirect() {
  window.location.hash = '#/inventory/third-party-providers';
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      if (uuid) {
        dispatch(Actions.Api.wyatt['third-party'].get(uuid));
      }
    },
    onSubmit: payload => {
      if (payload.uuid) {
        dispatch(
          Actions.Api.wyatt['third-party'].put(payload.uuid, payload)
        ).then(redirect);
      } else {
        dispatch(Actions.Api.wyatt['third-party'].post(payload)).then(redirect);
      }
    },
    onDelete: uuid => {
      if (uuid) {
        dispatch(Actions.Api.wyatt['third-party'].delete(uuid)).then(redirect);
      }
    },
  };
}

function mapStateToProps(state, props) {
  return {
    uuid: Selectors.getRoute(state, props).uuid,
    initialValues: Selectors.getInitialValuesBureau(state, props),
    submitting: Selectors.getResourceFetching(state, 'wyatt.third-party'),
    apiErrors: Selectors.getResourceErrors(state, 'wyatt.third-party'),
  };
}

export default reduxForm(
  {
    form: 'record.third_party_provider',
    fields,
  },
  mapStateToProps,
  mapDispatchToProps
)(ThirdPartyProviderContainer);
