import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'

import Routes                           from 'rapidfab/routes'
import Router                           from 'rapidfab/components/router'

import { IntlProvider }                 from 'react-intl'
import i18n                             from 'rapidfab/i18n'
import Navbar                           from 'rapidfab/components/navbar'


class App extends Component {
  render() {
    const {
      routes,
      onNavigate,
      onChangeLocale,
      url,
      i18n
    } = this.props;

    return (
      <IntlProvider
        locale={i18n.locale}
        messages={i18n.messages}
      >
        <div>
          <Navbar
            onChangeLocale={onChangeLocale}
            locale={i18n.locale}
          />
          <Router
            routes={routes}
            onNavigate={onNavigate}
            hash={url.hash}
          />
        </div>
      </IntlProvider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onNavigate: (currentHash, newHash) => {
      if(currentHash !== newHash) {
        dispatch(Actions.Url.change(currentHash, newHash))
      }
    },
    onChangeLocale: (currentLocale, newLocale) => {
      if(currentLocale !== newLocale) {
        dispatch(Actions.I18n.change(currentLocale, newLocale))
      }
    }
  }
}

function mapStateToProps(state) {
  const routes = Routes;
  const {
    url,
    i18n
  } = state;

  return {
    url,
    i18n,
    routes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)