import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  ButtonToolbar,
  MenuItem,
  Modal,
  OverlayTrigger,
  SplitButton,
  Tooltip,
} from 'react-bootstrap';

import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const SaveTooltip = <Tooltip id="saved">Saved</Tooltip>;

const SaveDropdownButton = ({
  cancellable,
  handleConfirm,
  handleOpen,
  onSubmit,
  modal,
}) => (
  <ButtonToolbar className="clearfix">
    <div className="pull-right">
      <OverlayTrigger
        delay={1000}
        trigger="click"
        placement="bottom"
        overlay={SaveTooltip}
        rootClose
      >
        <SplitButton
          id="actions"
          type="submit"
          bsStyle="success"
          bsSize="small"
          title={<SaveButtonTitle />}
          onClick={onSubmit}
        >
          {cancellable && (
            <MenuItem eventKey={0} onClick={() => handleOpen('cancel')}>
              <Fa name="ban" />
              {` `}
              <FormattedMessage id="button.cancel" defaultMessage="Cancel" />
            </MenuItem>
          )}
          <MenuItem eventKey={1} onClick={() => handleOpen('delete')}>
            <Fa name="times" />
            {` `}
            <FormattedMessage id="button.delete" defaultMessage="Delete" />
          </MenuItem>
        </SplitButton>
      </OverlayTrigger>
    </div>
    <Modal show={modal} onHide={() => handleOpen('')}>
      <Modal.Body>
        <p>Are you really sure you want to {modal}?</p>
        <p>This cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={handleConfirm}>
          {modal}
        </Button>
        <Button bsStyle="primary" onClick={() => handleOpen('')}>
          Back
        </Button>
      </Modal.Footer>
    </Modal>
  </ButtonToolbar>
);

SaveDropdownButton.defaultProps = {
  onSubmit: null,
};

SaveDropdownButton.propTypes = {
  cancellable: PropTypes.bool.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  modal: PropTypes.string.isRequired,
};

class SaveDropdownButtonContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { modal: '' };
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleConfirm() {
    const { modal } = this.state;
    if (modal === 'cancel') {
      this.props.onCancel();
    } else if (modal === 'delete') {
      this.props.onDelete();
    }
    this.handleOpen('');
  }

  handleOpen(modal) {
    this.setState({ modal });
  }

  render() {
    return (
      <SaveDropdownButton
        {...this.props}
        {...this.state}
        cancellable={!!this.props.onCancel}
        handleConfirm={this.handleConfirm}
        handleOpen={this.handleOpen}
      />
    );
  }
}

SaveDropdownButtonContainer.defaultProps = {
  onCancel: null,
  onSubmit: null,
};

SaveDropdownButtonContainer.propTypes = {
  onCancel: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default SaveDropdownButtonContainer;
