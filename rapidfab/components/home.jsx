import React from 'react';
import PropTypes from 'prop-types';
import Chart, { SeriesStyle } from 'rapidfab/components/chart';
import Locations from 'rapidfab/components/locations';
import * as BS from 'react-bootstrap';
import Error from 'rapidfab/components/error';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Grid, {
  IdColumn,
  MappedColumn,
  DateTimeColumn,
} from 'rapidfab/components/grid';

import { ORDER_STATUS_MAP } from 'rapidfab/mappings';

const panelBodyStyle = {
  height: 359,
  overflow: 'scroll',
};

const LastTenOrders = ({ data }) => (
  <BS.Panel header="Orders">
    <div style={panelBodyStyle} fill>
      <Grid
        data={data}
        columns={['id', 'name', 'status', 'created']}
        columnMeta={[
          {
            displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
            columnName: 'id',
            customComponent: IdColumn('order'),
            locked: true,
          },
          {
            columnName: 'name',
            displayName: (
              <FormattedMessage id="field.name" defaultMessage="Name" />
            ),
          },
          {
            customComponent: MappedColumn('status', ORDER_STATUS_MAP),
            columnName: 'status',
            displayName: (
              <FormattedMessage id="field.status" defaultMessage="Status" />
            ),
          },
          {
            customComponent: DateTimeColumn,
            columnName: 'created',
            displayName: (
              <FormattedMessage id="field.created" defaultMessage="Created" />
            ),
          },
        ]}
      />
    </div>
  </BS.Panel>
);

LastTenOrders.propTypes = {
  data: PropTypes.object.isRequired,
};

const RunsByStatusChart = ({ data }) => {
  const datasets = [
    {
      label: 'Status',
      backgroundColor: [
        SeriesStyle.Warning.color,
        SeriesStyle.Info.color,
        SeriesStyle.Default.color,
        SeriesStyle.Danger.color,
        SeriesStyle.Success.color,
      ],
      hoverBackgroundColor: [
        SeriesStyle.Warning.hover,
        SeriesStyle.Info.hover,
        SeriesStyle.Default.hover,
        SeriesStyle.Danger.hover,
        SeriesStyle.Success.hover,
      ],
      data,
    },
  ];
  return (
    <Chart
      title="Run Status"
      type="bar"
      data={{
        labels: [
          <FormattedMessage
            id="status.calculating"
            defaultMessage="Calculating"
          />,
          <FormattedMessage id="status.queued" defaultMessage="Queued" />,
          <FormattedMessage
            id="status.inProgress"
            defaultMessage="In Progress"
          />,
          <FormattedMessage id="status.error" defaultMessage="Error" />,
          <FormattedMessage id="status.complete" defaultMessage="Complete" />,
        ],
        datasets,
      }}
    />
  );
};

RunsByStatusChart.propTypes = {
  data: PropTypes.object.isRequired,
};

const Home = ({
  fetching,
  apiErrors,
  data,
  locationFilter,
  locations,
  handleOnChange,
}) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={8}>
        {locations.length > 1 ? (
          <Locations
            locations={locations}
            handleOnChange={handleOnChange}
            locationFilter={locationFilter}
          />
        ) : (
          <div />
        )}
      </BS.Col>
      <BS.Col xs={4}>
        <BS.ButtonToolbar className="pull-right">
          <BS.Button bsStyle="primary" bsSize="small" href="#/records/order">
            <Fa name="list" />{' '}
            <FormattedMessage
              id="record.order.add"
              defaultMessage="Add Order"
            />
          </BS.Button>
          <BS.Button bsStyle="primary" bsSize="small" href="#/records/run">
            <Fa name="files-o" />{' '}
            <FormattedMessage id="record.run.add" defaultMessage="Add Run" />
          </BS.Button>
        </BS.ButtonToolbar>
      </BS.Col>
    </BS.Row>

    <hr />

    <BS.Row>
      <BS.Col xs={12}>
        <Error errors={apiErrors} />
      </BS.Col>
    </BS.Row>

    {(() => {
      if (fetching) {
        return (
          <BS.Row>
            <BS.Col xs={12}>
              <div style={{ textAlign: 'center' }}>
                <Fa name="spinner" spin size="2x" />
              </div>
            </BS.Col>
          </BS.Row>
        );
      }
      return (
        <BS.Row>
          <BS.Col md={6}>
            <LastTenOrders data={data.lastTenOrders} />
          </BS.Col>
          <BS.Col md={6}>
            <RunsByStatusChart data={data.runStatus} />
          </BS.Col>
        </BS.Row>
      );
    })()}
  </BS.Grid>
);

Home.propTypes = {
  data: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  apiErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnChange: PropTypes.func.isRequired,
};

export default Home;