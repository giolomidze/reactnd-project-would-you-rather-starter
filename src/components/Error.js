import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Error extends Component {
  render() {
    return (
      <div class="page-wrap d-flex flex-row align-items-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12 text-center">
              <span class="display-1 d-block">404</span>
              <div class="mb-4 lead">
                The page you are looking for was not found.
              </div>
              <NavLink to="/" class="btn btn-link">
                Back to Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
