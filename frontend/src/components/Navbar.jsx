import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes.jsx';

class Navbar extends Component {
  render() {
    return (
    <div id="header" role="banner">
      <div id="header-main" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div id="header-main-row" className="row">
            <div className="col-sm-3 col-md-2 col-lg-2 header-main-left">
              <div id="logo">
                <a id="gov-logo" href="http://gov.bc.ca"><img src="./assets/images/gov3_bc_logo.png" alt="Province of British Columbia" title="Province of British Columbia logo" /></a>
              </div>
              <div id="access">
                <ul>
                  <li aria-label="Keyboard Tab Skip">
                    <a accessKey="0" href="#main-content-anchor" aria-label="Skip to main content">Skip to main content</a>
                  </li>
                  <li aria-label="Keyboard Tab Skip">
                    <a accessKey="0" href="#navigation-anchor" aria-label="Skip to navigation" aria-label="Skip to navigation">Skip to navigation</a>
                  </li>
                  <li aria-label="Keyboard Tab Skip">
                    <a accessKey="0" href="http://gov.bc.ca/webaccessibility/" aria-label="Accessibility Statement">Accessibility Statement</a>
                  </li>
                </ul>
              </div>
              <button type="button" className="navbar-toggle env-button-custom collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="true" aria-label="Burger Navigation">
                      <img src="./assets/images/menu-open-mobile.png" />
              </button>
            </div>
            <div className="col-sm-8 col-md-8 col-lg-8 hidden-xs">
              <div className="bcgov-title">
                <h1>Transportation Fuels Reporting System</h1>
              </div>
            </div>
            <div id="navbar" className="collapse navbar-collapse" role="navigation">
              <a id="navigation-anchor"></a>
              <ul className="nav navbar-nav">
                <li><Link id="collapse-navbar-dashboard" to={Routes.HOME}>Dashboard</Link></li>
                <li><Link id="collapse-navbar-organization" to={Routes.ORGANIZATIONS}>Fuel Suppliers</Link></li>
			          <li><Link id="collapse-navbar-account-activity" to={Routes.ACCOUNT_ACTIVITY}>Account Activity</Link></li>
				        <li><Link id="collapse-navbar-notifications" to={Routes.NOTIFICATIONS}>Notifications</Link></li>
                <li><Link id="collapse-navbar-settings" to={Routes.SETTINGS}>Settings</Link></li>
                <li><Link id="collapse-navbar-administration" to={Routes.ADMINISTRATION}>Administration</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="navigationRibbon hidden-xs">
          <div className="level2Navigation">
            <div className="container">
              <Link id="navbar-dashboard" to={Routes.HOME}>Dashboard</Link>
              <Link id="navbar-organizations" to={Routes.ORGANIZATIONS}>Fuel Suppliers</Link>
              <Link id="navbar-account-activity" to={Routes.ACCOUNT_ACTIVITY}>Account Activity</Link>
              <Link id="navbar-notifications" to={Routes.NOTIFICATIONS}>Notifications</Link>
              <Link id="navbar-settings" to={Routes.SETTINGS}>Settings</Link>
              <Link id="navbar-administration" to={Routes.ADMINISTRATION}>Administration</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Navbar;
