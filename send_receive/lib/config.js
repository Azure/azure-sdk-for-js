// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var ConnectionString = require('azure-iot-common').ConnectionString;

function ConnectionConfig(connectionString, path) {
  var cn = ConnectionString.parse(connectionString);
  var endpoint = cn.Endpoint || ''; 

  this.host = (endpoint.match('sb://([^/]*)') || [])[1];
  this.path = cn.EntityPath || path;
  this.keyName = cn.SharedAccessKeyName;
  this.key = cn.SharedAccessKey;
}

ConnectionConfig.prototype.saslPlainUri = function makeSaslPlainUri() {
  return 'amqps://' +
    encodeURIComponent(this.keyName) + ':' +
    encodeURIComponent(this.key) + '@' +
    this.host;
};

module.exports = ConnectionConfig;