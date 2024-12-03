import React from "react";
import jquery from 'jquery';
import createReactClass from 'create-react-class';
import { Router } from "react-router-dom";
import { render } from "react-dom";
import {Provider} from "overmind-react";
import {overmind} from './other/OvermindHelper'
import { history } from "./_helpers";
import {theme} from './other/Theme'
import { accountService } from "./_services";
import { App } from "./app";
import{ThemeProvider} from '@mui/styles'
import reportWebVitals from './reportWebVitals';
import './_helpers/globals';
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-designer.min';
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
import '@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css';
import '@boldreports/javascript-reporting-controls/Content/material/bold.reportdesigner.min.css';
//Data-Visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
//Reports react base
import '@boldreports/react-reporting-components/Scripts/bold.reports.react.min';


// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() {
window.React = React;
window.createReactClass = createReactClass;
window.ReactDOM = ReactDOM;
window.$ = window.jQuery = jquery;
  render(
    <React.StrictMode>
      <Provider value={overmind}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <App />
        </Router>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById("app")
  );
  reportWebVitals();
}
