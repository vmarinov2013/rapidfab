import React, { Component, PropTypes }     from "react"
import ReactDOM                            from "react-dom"
import * as BS                             from 'react-bootstrap'
import _                                   from "lodash"
import Fa                                  from 'react-fontawesome'
import { FormattedMessage }                from 'react-intl'
import { Currencies }                      from 'rapidfab/constants'


const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

class NewOrderForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()

    const state = this.state

    const payload = {
      bureau: this.props.bureau.uri,
      currency: state.currency,
      materials: {
        base: state.baseMaterial,
        support: state.supportMaterial,
      },
      model: ReactDOM.findDOMNode(this.refs.file).files,
      name: state.name,
      quantity: _.parseInt(state.quantity),
      shipping: {
        name: state.shippingName,
        address: state.shippingAddress,
        tracking: state.shippingTracking,
        uri: state.shippingType,
      },
      template: state.template,
      third_party_provider: state.thirdPartyProvider,
    }
    debugger
    this.props.onSubmit(payload)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const { materials, shippings, providers, templates } = this.props;
    const baseMaterials = _.filter(materials, {type: "base"});
    const supportMaterials = _.filter(materials, {type: "support"});

    return(
      <form onSubmit={this.onSubmit}>
        <BS.Row>
          <BS.Col xs={6}>
            <BS.Button href="#/plan/orders" bsSize="small">
              <Fa name='arrow-left'/> <FormattedMessage id="plan.orders" defaultMessage='Orders'/>
            </BS.Button>
          </BS.Col>
          <BS.Col xs={6}>
            <BS.ButtonToolbar className="pull-right">
              <BS.Button id="uxSave" type="submit" bsStyle="success" bsSize="small">
                <SaveButtonTitle />
              </BS.Button>
            </BS.ButtonToolbar>
          </BS.Col>
        </BS.Row>

        <hr/>

        <BS.Row>
          <BS.Col xs={12}>
            <BS.FormGroup controlId="uxName">
              <BS.ControlLabel><FormattedMessage id="field.name" defaultMessage='Name'/>:</BS.ControlLabel>
              <BS.FormControl type="text" required maxLength="255" onChange={this.handleChange} name="name"/>
            </BS.FormGroup>

            <BS.FormGroup controlId="uxModel">
              <BS.ControlLabel><FormattedMessage id="field.model" defaultMessage='Model'/>:</BS.ControlLabel>
              <BS.FormControl type="file" accept=".stl" ref="file" required name="file"/>
            </BS.FormGroup>

            <BS.FormGroup controlId="uxQuantity">
              <BS.ControlLabel><FormattedMessage id="field.quantity" defaultMessage='Quantity'/>:</BS.ControlLabel>
              <BS.FormControl type="number" min="1" required onChange={this.handleChange} name="quantity"/>
            </BS.FormGroup>

            <BS.FormGroup controlId="uxBaseMaterials">
              <BS.ControlLabel><FormattedMessage id="field.baseMaterials" defaultMessage='Base Materials'/>:</BS.ControlLabel>
              <BS.FormControl componentClass="select" required onChange={this.handleChange} name="baseMaterial">
                <option key="placeholder" value="" selected disabled>Select a Base Material</option>
                {_.map(baseMaterials, material => (
                  <option key={material.uri} value={material.uri}>{material.name}</option>
                ))}
              </BS.FormControl>
            </BS.FormGroup>
            {
              supportMaterials.length > 0 ?
              <BS.FormGroup controlId="uxSupportMaterials">
                <BS.ControlLabel><FormattedMessage id="field.supportMaterials" defaultMessage='Support Materials'/>:</BS.ControlLabel>
                <BS.FormControl componentClass="select" onChange={this.handleChange} name="supportMaterial">
                  <option key="placeholder" value="" selected>No Support</option>
                  {_.map(supportMaterials, material => (
                    <option key={material.uri} value={material.uri}>{material.name}</option>
                  ))}
                </BS.FormControl>
              </BS.FormGroup>
              : null
            }
            <BS.FormGroup controlId="uxShippingName">
              <BS.ControlLabel><FormattedMessage id="field.shippingName" defaultMessage='Shipping Name'/>:</BS.ControlLabel>
              <BS.FormControl type="text" onChange={this.handleChange} name="shippingName"/>
            </BS.FormGroup>

            <BS.FormGroup controlId="uxShippingAddress">
              <BS.ControlLabel><FormattedMessage id="field.shippingAddress" defaultMessage='Shipping Address'/>:</BS.ControlLabel>
              <BS.FormControl type="text" onChange={this.handleChange} name="shippingAddress"/>
            </BS.FormGroup>

            <BS.FormGroup controlId="uxTrackingNumber">
              <BS.ControlLabel><FormattedMessage id="field.trackingNumber" defaultMessage='Tracking Number'/>:</BS.ControlLabel>
              <BS.FormControl type="text" onChange={this.handleChange} name="shippingTracking"/>
            </BS.FormGroup>

            <BS.FormGroup controlId="uxshippingType">
              <BS.ControlLabel><FormattedMessage id="field.shippingType" defaultMessage='Shipping Type'/>:</BS.ControlLabel>
              <BS.FormControl componentClass="select" required onChange={this.handleChange} name="shippingType">
                <option key="placeholder" value="" selected disabled>Select a shipping type</option>
                {_.map(shippings, shipping => (
                  <option key={shipping.uri} value={shipping.uri}>{shipping.name}</option>
                ))}
              </BS.FormControl>
            </BS.FormGroup>
            {
              providers.length > 0 ?
              <BS.FormGroup controlId="uxThirdPartyProvider">
                <BS.ControlLabel><FormattedMessage id="field.thirdPartyProvider" defaultMessage='Third Party Provider'/>:</BS.ControlLabel>
                <BS.FormControl componentClass="select" onChange={this.handleChange} name="thirdPartyProvider">
                  <option key="placeholder" value="" selected disabled>Select a Third Party Provider</option>
                  {_.map(providers, provider => (
                    <option key={provider.uri} value={provider.uri}>{provider.name}</option>
                  ))}
                </BS.FormControl>
              </BS.FormGroup>
              : null
            }
            <BS.FormGroup controlId="uxTemplate">
              <BS.ControlLabel><FormattedMessage id="field.template" defaultMessage='Template'/>:</BS.ControlLabel>
              <BS.FormControl componentClass="select" onChange={this.handleChange} name="template">
                <option key="placeholder" value="" selected>Select a Template</option>
                {_.map(templates, template => (
                  <option key={template.uri} value={template.uri}>{template.name}</option>
                ))}
              </BS.FormControl>
            </BS.FormGroup>

            <BS.FormGroup controlId="uxCurrency">
              <BS.ControlLabel><FormattedMessage id="field.currency" defaultMessage='Currency'/>:</BS.ControlLabel>
              <BS.FormControl componentClass="select" required onChange={this.handleChange} name="currency" placeholder="Select a Currency">
                <option key="placeholder" value="" selected disabled>Select a Currency</option>
                {_.map(Currencies, currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </BS.FormControl>
            </BS.FormGroup>
          </BS.Col>
        </BS.Row>
      </form>
    )
  }
}

export default NewOrderForm
