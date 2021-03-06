import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import ConversionComponent from 'rapidfab/components/records/conversion';
import { reduxForm } from 'redux-form';
import * as Selectors from 'rapidfab/selectors';

const fields = ['id', 'uuid', 'currency', 'value', 'bureau'];

class ConversionContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid);
  }

  render() {
    return <ConversionComponent {...this.props} />;
  }
}

ConversionContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

function redirect() {
  window.location.hash = '#/inventory/conversions';
}

function mapDispatchToProps(dispatch) {
  const conversion = Actions.Api.wyatt['currency-conversion'];
  return {
    onInitialize: uuid => {
      if (uuid) {
        dispatch(conversion.get(uuid));
      }
    },
    onSubmit: payload => {
      if (payload.uuid) {
        dispatch(conversion.put(payload.uuid, payload)).then(redirect);
      } else {
        dispatch(conversion.post(payload)).then(redirect);
      }
    },
    onDelete: uuid => {
      if (uuid) {
        dispatch(conversion.delete(uuid)).then(redirect);
      }
    },
  };
}

function mapStateToProps(state, props) {
  return {
    uuid: Selectors.getRoute(state, props).uuid,
    initialValues: Selectors.getInitialValuesBureau(state, props),
    submitting: Selectors.getResourceFetching(
      state,
      'wyatt.currency-conversion'
    ),
    apiErrors: Selectors.getResourceErrors(state, 'wyatt.currency-conversion'),
  };
}

export default reduxForm(
  {
    form: 'record.conversion',
    fields,
  },
  mapStateToProps,
  mapDispatchToProps
)(ConversionContainer);
