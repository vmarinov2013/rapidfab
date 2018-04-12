import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Grid, Row } from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Griddle, {
  ColumnDefinition,
  RowDefinition,
  plugins,
} from 'griddle-react';

import griddleStyleConfig from 'rapidfab/components/griddle/griddleStyleConfig';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import GriddleLayout from 'rapidfab/components/griddle/GriddleLayout';
import IdColumn from 'rapidfab/components/griddle/IdColumn';
import Loading from 'rapidfab/components/Loading';

const ThirdPartyProvidersGrid = ({ providers }) => (
  <Griddle
    components={{ Layout: GriddleLayout }}
    data={providers}
    plugins={[plugins.LocalPlugin]}
    styleConfig={griddleStyleConfig}
  >
    <RowDefinition>
      <ColumnDefinition
        id="id"
        customComponent={props => (
          <IdColumn {...props} resource={'third-party-provider'} />
        )}
        customHeadingComponent={() => (
          <FormattedMessage id="field.id" defaultMessage="Id" />
        )}
      />
      <ColumnDefinition
        id="name"
        customHeadingComponent={() => (
          <FormattedMessage id="field.name" defaultMessage="Name" />
        )}
      />
      <ColumnDefinition
        id="description"
        customHeadingComponent={() => (
          <FormattedMessage
            id="field.description"
            defaultMessage="Description"
          />
        )}
      />
      <ColumnDefinition
        id="description"
        customHeadingComponent={() => (
          <FormattedMessage
            id="field.description"
            defaultMessage="Description"
          />
        )}
      />
    </RowDefinition>
  </Griddle>
);

ThirdPartyProvidersGrid.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ThirdPartyProviders = ({ providers, fetching }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['thirdPartyProviders']} />

    <Row>
      <Col xs={12}>
        <Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/third-party-provider"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.thirdPartyProvider.add"
            defaultMessage="Add Third Party Provider"
          />
        </Button>
      </Col>
    </Row>

    <hr />

    <FlashMessages />

    <Row>
      <Col xs={12}>
        {fetching ? (
          <Loading />
        ) : (
          <ThirdPartyProvidersGrid providers={providers} />
        )}
      </Col>
    </Row>
  </Grid>
);

ThirdPartyProviders.propTypes = {
  fetching: PropTypes.bool.isRequired,
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ThirdPartyProviders;
