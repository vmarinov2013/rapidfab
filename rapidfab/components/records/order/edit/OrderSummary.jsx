import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Col, Form, Panel } from 'react-bootstrap';

import Actions from 'rapidfab/actions';
import Feature from 'rapidfab/components/Feature';

import EditOrderFormContainer from 'rapidfab/containers/records/order/EditOrderFormContainer';
import OrderDocuments from './OrderDocuments';
import OrderEstimates from './OrderEstimates';
import OrderRuns from './OrderRuns';
import SaveDropdownButton from './SaveDropdownButton';

const PanelHeader = () => (
  <FormattedMessage id="record.order.summary" defaultMessage="Order Summary" />
);

class OrderSummary extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    // redux-form v5 requires refs for remote form submission
    // this should be refactored out, either with redux-form v6 or with no redux-form
    /* eslint-disable react/no-string-refs */
    this.refs.orderForm.submit();
    /* eslint-enable react/no-string-refs */
  }

  onDelete() {
    this.props
      .dispatch(Actions.Api.wyatt.order.delete(this.props.uuid))
      .then(() => {
        window.location.hash = '#/plan/orders';
      });
  }

  render() {
    const { onSubmit, onDelete } = this;
    return (
      <Panel header={<PanelHeader />}>
        <Form horizontal onSubmit={onSubmit}>
          <SaveDropdownButton onDelete={onDelete} />
          <hr />

          <Col xs={12} md={7}>
            {/* eslint-disable react/no-string-refs */}
            <EditOrderFormContainer ref="orderForm" />
            {/* eslint-enable react/no-string-refs */}
          </Col>

          <Col xs={12} md={5}>
            <OrderEstimates />
            <Feature featureName="order-documents">
              <OrderDocuments />
            </Feature>
            <OrderRuns />
          </Col>
        </Form>
      </Panel>
    );
  }
}

OrderSummary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ uuid: state.routeUUID });

export default connect(mapStateToProps)(OrderSummary);
