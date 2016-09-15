import React, { PropTypes, Component }        from "react"
import _                                      from "lodash"
import * as BS                                from 'react-bootstrap'
import Fa                                     from 'react-fontawesome'
import Error                                  from 'rapidfab/components/error'
import Grid, { IdColumn }                     from 'rapidfab/components/grid'
import {
  FormattedDate,
  FormattedDuration,
  FormattedMessage,
  FormattedVolume
} from 'rapidfab/i18n'
import {
  FormControlSelect
} from 'rapidfab/components/formTools'

const SaveButtonTitle = () => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const FormRow = ({id, defaultMessage, children, controlId}) => (
  <BS.FormGroup controlId={controlId}>
    <BS.Col xs={3}>
      <BS.ControlLabel><FormattedMessage id={id} defaultMessage={defaultMessage}/>:</BS.ControlLabel>
    </BS.Col>
    <BS.Col xs={9}>
      { children }
    </BS.Col>
  </BS.FormGroup>
);

const LinkField = ({uri, location}) => {
  if(!uri) {
    return (<BS.FormControl.Static> - </BS.FormControl.Static>);
  }
  const uuid = uri.substr(uri.length - 37, 36);
  const display = uuid.substr(uuid.length - 6);
  const fullLocation = location + uuid
  return (<BS.FormControl.Static><a href={fullLocation}>{display}</a></BS.FormControl.Static>);
};

const EditRun = ({ fields, handleSubmit, onDelete, apiErrors, statuses, prints }) => (
  <BS.Form horizontal onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item>
              <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/plan/runs">
              <Fa name='files-o'/> <FormattedMessage id="plan.runs" defaultMessage='Runs'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='file-o'/> {fields.id.value}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/plan/runs" bsSize="small">
            <Fa name='arrow-left'/> <FormattedMessage id="plan.runs" defaultMessage='Runs'/>
          </BS.Button>
        </BS.Col>
        <BS.Col xs={6}>
          <BS.ButtonToolbar className="pull-right">
            <BS.SplitButton id="uxSaveDropdown" type="submit" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
              <BS.MenuItem eventKey={1} onClick={() => onDelete(fields.uuid.value)}>
                <Fa name='ban'/> <FormattedMessage id="button.delete" defaultMessage='Delete'/>
              </BS.MenuItem>
            </BS.SplitButton>
          </BS.ButtonToolbar>
        </BS.Col>
      </BS.Row>

      <hr/>

      <BS.Row>
        <BS.Col xs={12}>
          <Error errors={apiErrors}/>
        </BS.Col>
      </BS.Row>

      <BS.Row>

        <BS.Col xs={4}>
          <BS.Panel bsStyle="info">
            <BS.ListGroup fill>
              <BS.ListGroupItem header={<FormattedMessage id="field.estimatedPrintTime" defaultMessage='Estimated Print Time'/>}>
                {fields.estimates.time.print.value ?
                  <FormattedDuration value={fields.estimates.time.print.value}/> :
                    (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
                }
              </BS.ListGroupItem>

              <BS.ListGroupItem header={<FormattedMessage id="field.estimatedPostProcessingTime" defaultMessage='Estimated Post Processing Time'/>}>
                {fields.estimates.time.post_processing.value ?
                  <FormattedDuration value={fields.estimates.time.post_processing.value}/> :
                    (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
                }
              </BS.ListGroupItem>

              <BS.ListGroupItem header={<FormattedMessage id="field.estimatedMaterialUsed" defaultMessage='Estimated Material Used'/>}>
                {fields.estimates.materials.base.value ?
                  <FormattedVolume value={fields.estimates.materials.base.value}/> :
                    (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
                }
              </BS.ListGroupItem>
              <BS.ListGroupItem header={<FormattedMessage id="field.estimatedSupportUsed" defaultMessage='Estimated Support Used'/>}>
                {fields.estimates.materials.support.value ?
                  <FormattedVolume value={fields.estimates.materials.support.value}/> :
                    (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
                }
              </BS.ListGroupItem>
            </BS.ListGroup>
          </BS.Panel>

          <BS.Panel bsStyle="success">
            <BS.ListGroup fill>
              <BS.ListGroupItem header={<FormattedMessage id="field.actualPrintTime" defaultMessage='Actual Print Time'/>}>
                {fields.actuals.time.print.value ?
                  <FormattedDuration value={fields.actuals.time.print.value}/> :
                    (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
                }
              </BS.ListGroupItem>

              <BS.ListGroupItem header={<FormattedMessage id="field.actualPostProcessingTime" defaultMessage='Actual Post Processing Time'/>}>
                {fields.actuals.time.post_processing.value ?
                  <FormattedDuration value={fields.actuals.time.post_processing.value}/> :
                    (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
                }
              </BS.ListGroupItem>

              <BS.ListGroupItem header={<FormattedMessage id="field.actualMaterialUsed" defaultMessage='Actual Material Used'/>}>
                {fields.actuals.materials.base.value ?
                  <FormattedVolume value={fields.actuals.materials.base.value}/> :
                    (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
                }
              </BS.ListGroupItem>
              <BS.ListGroupItem header={<FormattedMessage id="field.actualSupportUsed" defaultMessage='Actual Support Used'/>}>
                {fields.actuals.materials.support.value ?
                  <FormattedVolume value={fields.actuals.materials.support.value}/> :
                    (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
                }
              </BS.ListGroupItem>
            </BS.ListGroup>
          </BS.Panel>

        </BS.Col>

        <BS.Col xs={8}>
          <FormRow id="field.id" defaultMessage="ID">
            <BS.FormControl.Static>{fields.id.value}</BS.FormControl.Static>
          </FormRow>

          <FormRow id="field.status" defaultMessage="Status">
            <FormControlSelect {...fields.status}>
              <option value="" disabled>Select a Status</option>
              {statuses.map(status => (<option key={status} value={status}>{_.capitalize(status)}</option>))}
            </FormControlSelect>
          </FormRow>

          <FormRow controlId="uxCreated" id="field.created" defaultMessage="Created">
            <BS.FormControl.Static>
              {fields.created.value ?
                <FormattedDate value={fields.created.value}/> :
                  (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
              }
            </BS.FormControl.Static>
          </FormRow>

          <FormRow id="field.printer" defaultMessage="Printer">
            <LinkField uri={fields.printer.value} location="#/records/printer/"/>
          </FormRow>

          <FormRow id="field.printerType" defaultMessage="Printer Type">
            <LinkField uri={fields.printer_type.value} location="#/records/printer-type/"/>
          </FormRow>

          <FormRow id="field.postProcessor" defaultMessage="Post-Processor">
            <LinkField uri={fields.post_processor.value} location="#/records/post-processor/"/>
          </FormRow>

          <Grid
            data={prints}
            columns={[
              "id",
              "order",
            ]}
            columnMeta={[{
              displayName: <FormattedMessage id="field.id" defaultMessage='Print Id'/>,
              columnName: "print.id",
              customComponent: IdColumn("print"),
              locked: true
            }, {
              displayName: <FormattedMessage id="field.order" defaultMessage='Order Id'/>,
              columnName: "order.id",
              customComponent: IdColumn("order"),
            }]}
          />

        </BS.Col>


      </BS.Row>
    </BS.Grid>
  </BS.Form>

)

export default EditRun