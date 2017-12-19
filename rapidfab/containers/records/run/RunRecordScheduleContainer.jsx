import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRouteUUIDResource } from 'rapidfab/selectors';
import extractUuid from 'rapidfab/utils/extractUuid';
import Actions from 'rapidfab/actions';

import RunRecordSchedule from 'rapidfab/components/records/run/RunRecordSchedule';

class RunRecordScheduleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      runQueue: null,
    };
  }
  componentWillMount() {
    const { dispatch, route: { uuid } } = this.props;
    dispatch(Actions.RouteUUID.setRouteUUID(uuid));
    dispatch(Actions.Api.wyatt.run.get(uuid)).then(runResponse => {
      const printer = runResponse.json.printer;
      const printerUUID = extractUuid(printer);
      const onPrinterResponse = dispatch(
        Actions.Api.wyatt.printer.get(printerUUID)
      );
      const onRunsResponse = dispatch(
        Actions.Api.wyatt.run.list({
          printer,
        })
      );
      Promise.all([
        onPrinterResponse,
        onRunsResponse,
      ]).then((responses) => {
        const printerResponse = responses[0];
        const runsResponse = responses[1];
        const runQueue = printerResponse.json.queue.map(runURI =>
          runsResponse.json.resources.find(run => run.uri === runURI)
        );
        this.setState({ runQueue });
      });
    });
  }

  render() {
    return <RunRecordSchedule {...this.props} {...this.state} />;
  }
}

RunRecordScheduleContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
};

const mapStateToProps = state => {
  const run = getRouteUUIDResource(state);
  return Object.assign(
    {},
    { isRunFetching: !run && state.ui.wyatt.run.get.fetching },
    run
      ? {
          id: run.id,
          operation: run.operation,
        }
      : null
  );
};
export default connect(mapStateToProps)(RunRecordScheduleContainer);
