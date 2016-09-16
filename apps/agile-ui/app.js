/* eslint-disable */
(function() {
    'use strict';

    const chalk = require('chalk');
    const express = require('express');
    const compression = require('compression');
    const serveStatic = require('serve-static');
    var httpProxy = require('http-proxy');
    var apiProxy = httpProxy.createProxyServer();
    var baseAPI = 'http://localhost:8080',
        dataServer = 'http://localhost:9000'

    const app = express();

    let serverPort = process.env.AGILE_CLIENT_PORT || 1337;

    app.all("/api/*", function(req, res) {
      console.log('redirecting to API');
      apiProxy.web(req, res, {target: baseAPI});
    });

    app.all("/data/*", function(req, res) {
      console.log('redirecting to DataServer');
      apiProxy.web(req, res, {target: dataServer});
    });

    app.use(compression());
    app.use(serveStatic(__dirname + '/public', {
        'index': ['index.html']
    }));

    app.listen(serverPort, function() {
      console.log(chalk.cyan('Agile Client listening on port '+ serverPort));
    });
})();
