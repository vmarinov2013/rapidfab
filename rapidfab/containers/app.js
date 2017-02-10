import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import Config                           from 'rapidfab/config'
import { connect }                      from 'react-redux'

import Navbar                           from 'rapidfab/components/navbar'
import Routes                           from 'rapidfab/routes'
import Router                           from 'rapidfab/components/router'

import { IntlProvider }                 from 'react-intl'
import BureauError                      from 'rapidfab/components/bureauError'
import i18n                             from 'rapidfab/i18n'
import * as Selectors                   from 'rapidfab/selectors'
import Tos                              from 'rapidfab/components/tos'


const SessionProvider = ({ bureaus, children, currentUser, fetching, errors, onAcceptTerms }) => {
  if(!currentUser && errors.length) {
    let next = window.location.hash.substr(1);
    window.location = `${Config.HOST.SCYLLA}?nextPath=${next}&subdomain=rapidfab#/login`
  }

  if(currentUser && !fetching) {
    if(!currentUser.tos && !currentUser.impersonating) {
      return <Tos user={currentUser} onAcceptTerms={onAcceptTerms} />
    }
    if(bureaus.length != 1) {
      return (
        <BureauError bureaus={bureaus}/>
      )
    }

    return (
      <div>
        {children}
      </div>
    )
  }

  return <div/>
}

class App extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }
  render() {
    const {
      session,
      routes,
      onNavigate,
      onChangeLocale,
      onAcceptTerms,
      url,
      i18n,
    } = this.props;
    return (
      <IntlProvider
        locale={i18n.locale}
        messages={i18n.messages}
      >
        <SessionProvider {...session} onAcceptTerms={onAcceptTerms}>
          <Navbar
            onChangeLocale={onChangeLocale}
            locale={i18n.locale}
            currentUser={session.currentUser}
            bureaus={session.bureaus}
          />
          <Router
            routes={routes}
            onNavigate={onNavigate}
            hash={url.hash}
          />
        </SessionProvider>
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
    },
    onInitialize: () => {
      dispatch(Actions.Api.pao.sessions.get('')).then(() => {
        Actions.EventStream.subscribe(dispatch, Config.HOST.EVENT)
        dispatch(Actions.Api.wyatt.bureau.list())
      })
      dispatch(Actions.Api.wyatt.bureau.list())
    },
    onAcceptTerms: user => {
      dispatch(Actions.Api.pao.users.put(user.uuid, { tos: true })).then(() => {
        dispatch(Actions.Api.pao.sessions.get(''))
      })
    }
  }
}

function mapStateToProps(state) {
  const {
    url,
    i18n,
  } = state;
  let currentUser = Selectors.getSession(state)
  let bureaus = Selectors.getBureaus(state)
  let fetching = !currentUser || state.ui.wyatt.bureau.list.fetching

  const session = {
    currentUser,
    bureaus,
    fetching,
    errors  : _.concat(
        state.ui.pao.sessions.get.errors,
        state.ui.wyatt.bureau.list.errors
    )
  }
  return {
    session,
    url,
    i18n,
    routes: Routes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
