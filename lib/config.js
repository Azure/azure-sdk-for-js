// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var ConnectionString = require('azure-iot-common').ConnectionString;

function makeConfig(connectionString, path) {
  var cn = ConnectionString.parse(connectionString);
  var endpoint = cn.Endpoint || ''; 
  
  return {
    host: (endpoint.match('sb://([^/]*)') || [])[1],
    path: cn.EntityPath || path
  };
}

module.exports = makeConfig;