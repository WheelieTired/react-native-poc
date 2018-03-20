// These React components are rendered with JSX tags, so the linter can't
// detect them.

/*eslint-disable no-unused-vars*/
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
/*eslint-enable no-unused-vars*/

import ReactDOM from 'react-dom';

// The React components below are inserted by the React router
import Main from './app/containers/main';

import MapPage from './app/containers/map-page';
import ListPage from './app/containers/list-page';
import LoginPage from './app/containers/login-page';
import LogoutPage from './app/containers/logout-page';
import RegisterPage from './app/containers/register-page';
import ForgotPasswordPage from './app/containers/forgot-password-page';
import ResetPasswordPage from './app/containers/reset-password-page';
import ThanksPageForgotPassword from './app/containers/thanks-page-forgot-password';
import ThanksPageResetPassword from './app/containers/thanks-page-reset-password';
import ThanksPage from './app/containers/thanks-page';
import LoadingPage from './app/containers/loading-page';
//import RoutePage from './app/containers/route-page';
import FilterPage from './app/containers/filter-page';
import SettingsPage from './app/containers/settings-page';
import PublishPage from './app/containers/publish-page';
import AboutPage from './app/containers/about-page';
import OnboardingPage from './app/containers/onboarding';

import AddServicePage from './app/containers/wizard/add-service-page';
import UpdateServicePage from './app/containers/wizard/update-service-page';
import AddAlertPage from './app/containers/wizard/add-alert-page';

import PointLocation from './app/components/wizard/point-location';
import ServiceName from './app/components/wizard/service-name';
import ServiceDescription from './app/components/wizard/service-description';
import ServiceHours from './app/components/wizard/service-hours';
import ServiceAmenities from './app/components/wizard/service-amenities';
import AlertNameDescription from './app/components/wizard/alert-name-description';

import PeekPointCard from './app/components/point-card/peek-point-card';
import ViewPointCard from './app/components/point-card/view-point-card';
import RatingPointCard from './app/components/point-card/rating-point-card';

import FlagPointCard from './app/components/point-card/flag-point-card';

// A hash-based history module for use with the react router
import history from './app/history';

// Import the database (which implicitly connects our models)
import './app/database';
import store from './app/store';

// These allow us to automatically handle network state changes and to
// maintain the period of replication.
import { NetworkStateAgent } from './app/reducers/network';
import { ReplicationAgent, reloadPoints } from './app/reducers/points';

// Fix tap events so material-ui components work
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// When Cordova has loaded, assemble the application components and start them.
//
//  2. Start the NetworkStateAgent and ReplicationAgent
//  4. Pull all locally available points into the store
//  5. Start the React Router
//
// In order for this event to be fired, cordova.js must already be loaded via
// a <script> tag. Also, a <div class="main" /> is required in the body. We
// render the application into that div.
document.addEventListener( 'deviceReady', () => {
  const network = new NetworkStateAgent( store );
  network.run();

  const replicator = new ReplicationAgent( store );
  replicator.run();

  store.dispatch( reloadPoints() );

  ReactDOM.render( (
    <MuiThemeProvider>
      <Provider store={ store }>
        <Router history={ history }>
          <Route path="/"
            component={ Main }>
            <Route component={ MapPage }>
              <IndexRoute />
              <Route path="peek-point/:id"
                component={ PeekPointCard } />
              <Route path="view-point/:id"
                component={ ViewPointCard } />
              <Route path="rate-point/:id"
                component={ RatingPointCard } />
              <Route path="flag-point/:id"
                component={ FlagPointCard } />
            </Route>
            <Route path="list"
              component={ ListPage } />
            <Route path="settings"
              component={ SettingsPage } />
            <Route path="about"
              component={ AboutPage } />
            <Route path="onboarding"
              component={ OnboardingPage } />
            <Route path="publish"
              component={ PublishPage } />
            <Route path="login"
              component={ LoginPage } />
            <Route path="register"
              component={ RegisterPage } />
            <Route path="forgot-password"
              component={ ForgotPasswordPage } />
            <Route path="/reset-password/:verification"
              component={ ResetPasswordPage } />
            <Route path="logout"
              component={ LogoutPage } />
            <Route path="thanks-forgot-password"
              component={ ThanksPageForgotPassword } />
            <Route path="thanks-reset-password"
              component={ ThanksPageResetPassword } />
            <Route path="thanks"
              component={ ThanksPage } />
            <Route path="/loading/:id"
              component={ LoadingPage } />
            <Route path="add-service"
              component={ AddServicePage }>
              <IndexRoute component={ PointLocation } />
              <Route path="location"
                component={ PointLocation } />
              <Route path="name"
                component={ ServiceName } />
              <Route path="description"
                component={ ServiceDescription } />
              <Route path="hours"
                component={ ServiceHours } />
              <Route path="amenities"
                component={ ServiceAmenities } />
            </Route>
            <Route path="/update-service/:id"
              component={ UpdateServicePage }>
              <IndexRoute component={ ServiceName } />
              <Route path="name"
                component={ ServiceName } />
              <Route path="description"
                component={ ServiceDescription } />
              <Route path="hours"
                component={ ServiceHours } />
              <Route path="amenities"
                component={ ServiceAmenities } />
            </Route>
            <Route path="add-alert"
              component={ AddAlertPage }>
              <IndexRoute component={ PointLocation } />
              <Route path="location"
                component={ PointLocation } />
              <Route path="name"
                component={ AlertNameDescription } />
            </Route>
            <Route path="/routes"
              component={ RoutePage } />
            <Route path="/filter"
              component={ FilterPage } />
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
    ), document.getElementById( 'main' ) );
} );
