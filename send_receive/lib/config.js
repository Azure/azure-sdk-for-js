// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var aziot = require('azure-iot-common');

function ConnectionConfig(connectionString, path) {
  var cn = aziot.ConnectionString.parse(connectionString);

  this.isIotHub = !!cn.HostName; // HostName is present in IoTHub connection strings, Endpoint in the case of Event Hubs
  this.keyName = cn.SharedAccessKeyName;
  this.key = cn.SharedAccessKey;

  if(this.isIotHub) {
    this.host = cn.HostName;
    var hubName = this.host.split('.')[0];
    this.sharedAccessSignature = aziot.SharedAccessSignature.create(this.host, this.keyName, this.key, aziot.anHourFromNow());
    this.path = 'messages/events/';
    this.saslPlainUri  = 'amqps://' +
                        encodeURIComponent(this.keyName) +
                        '%40sas.root.' +
                        hubName +
                        ':' +
                        encodeURIComponent(this.sharedAccessSignature) +
                        '@' +
                        this.host;
  } else {
    var endpoint = cn.Endpoint || '';
    this.host = (endpoint.match('sb://([^/]*)') || [])[1];
    this.path = cn.EntityPath || path;
    this.saslPlainUri  = 'amqps://' +
                        encodeURIComponent(this.keyName) + ':' +
                        encodeURIComponent(this.key) + '@' +
                        this.host;
  }

}

module.exports = ConnectionConfig;