import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getUsers } from 'rapidfab/selectors';

import Users from 'rapidfab/components/admin/Users';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return <Users {...this.props} />;
  }
}

UsersContainer.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(Actions.Api.pao.users.list()),
});

const mapStateToProps = state => ({ users: getUsers(state) });

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
