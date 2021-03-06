import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import Queues from 'rapidfab/components/work/Queues';
import * as Selectors from 'rapidfab/selectors';

class QueuesContainer extends Component {
  componentWillMount() {
    this.props.onInitialize();
  }

  render() {
    return <Queues {...this.props} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleOnChange: location => {
      dispatch(Actions.LocationFilter.setLocation(location));
    },
    onInitialize: () => {
      dispatch(Actions.Api.nautilus.modeler.list());
      dispatch(Actions.Api.wyatt['post-processor-type'].list());
      dispatch(Actions.Api.wyatt['post-processor'].list());
      dispatch(Actions.Api.wyatt.printer.list());
      dispatch(Actions.Api.wyatt.run.list());
      dispatch(Actions.Api.wyatt.downtime.list());
      dispatch(Actions.Api.wyatt.location.list());
    },
  };
}

function mapStateToProps(state) {
  const postProcessor = state.ui.wyatt['post-processor'];
  const blockMachine = state.ui.wyatt.downtime;
  const { printer, location, run } = state.ui.wyatt;
  const machines = Selectors.getMachinesForQueues(state);
  const locationFilter = Selectors.getLocationFilter(state);
  let filteredMachines = null;
  if (locationFilter) {
    filteredMachines = _.filter(machines, ['location', locationFilter]);
  }

  return {
    events: Selectors.getQueueEvents(state),
    machines: filteredMachines || machines,
    locations: Selectors.getLocations(state),
    locationFilter,
    apiErrors: _.concat(
      blockMachine.errors,
      run.list.errors,
      postProcessor.list.errors,
      printer.list.errors,
      location.list.errors
    ),
  };
}

QueuesContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QueuesContainer);
