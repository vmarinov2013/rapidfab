import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Grid, { IdColumn, CapitalizeColumn } from 'rapidfab/components/grid';
import Error from 'rapidfab/components/error';
import Loading from 'rapidfab/components/Loading';

const ShippingsGrid = ({ records }) => (
  <Grid
    data={records}
    columns={['id', 'name', 'region', 'cost']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('shipping'),
        locked: true,
      },
      {
        columnName: 'name',
        displayName: <FormattedMessage id="field.name" defaultMessage="Name" />,
      },
      {
        columnName: 'region',
        customComponent: CapitalizeColumn,
        displayName: (
          <FormattedMessage id="field.region" defaultMessage="Region" />
        ),
      },
      {
        columnName: 'cost',
        displayName: <FormattedMessage id="field.cost" defaultMessage="Cost" />,
      },
    ]}
  />
);

const Shippings = ({ shippings, fetching, apiErrors }) => (
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['shipping']} />

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/shipping"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.shipping.add"
            defaultMessage="Add Shipping"
          />
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr />

    <BS.Row>
      <BS.Col xs={12}>
        <Error errors={apiErrors} />
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? <Loading /> : <ShippingsGrid records={shippings} />}
      </BS.Col>
    </BS.Row>
  </BS.Grid>
);

export default Shippings;