import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import Fa                       from 'react-fontawesome';
import { FormattedMessage }     from 'react-intl';


const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const UserForm = ({ fields, handleSubmit, load, submitting, onDelete }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item href="#/inventory">
              <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/users">
              <Fa name='industry'/> <FormattedMessage id="inventory.users" defaultMessage='Users'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='industry'/> {fields.id.value || <FormattedMessage id="record.user.new" defaultMessage='New User'/>}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/users" bsSize="small">
            <Fa name='arrow-left'/> <FormattedMessage id="inventory.users" defaultMessage='Users'/>
          </BS.Button>
        </BS.Col>
        <BS.Col xs={6}>
          <BS.ButtonToolbar className="pull-right">
            <BS.SplitButton id="uxSaveDropdown" type="submit" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
              <BS.MenuItem eventKey={1} onClick={() => onDelete(fields.uuid.value)} disabled={!fields.id.value}>
                <Fa name='ban'/> <FormattedMessage id="button.delete" defaultMessage='Delete'/>
              </BS.MenuItem>
            </BS.SplitButton>
          </BS.ButtonToolbar>
        </BS.Col>
      </BS.Row>

      <hr/>

      <BS.Row>
        <BS.Col xs={12}>
          <BS.FormGroup controlId="uxEmail">
            <BS.ControlLabel><FormattedMessage id="field.email" defaultMessage='Email'/>:</BS.ControlLabel>
            <BS.FormControl name="email" type="text" required {...fields.email}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxName">
            <BS.ControlLabel><FormattedMessage id="field.name" defaultMessage='Name'/>:</BS.ControlLabel>
            <BS.FormControl name="name" type="text" required {...fields.name}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxUsername">
            <BS.ControlLabel><FormattedMessage id="field.username" defaultMessage='Username'/>:</BS.ControlLabel>
            <BS.FormControl name="username" type="text" required {...fields.username}/>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
)

export default UserForm
