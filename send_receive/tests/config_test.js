// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
chai.should();

var ConnectionConfig = require('../lib/config.js');

describe('ConnectionConfig', function () {
  it('populates config properties from an Event Hubs connection string', function () {
    var config = new ConnectionConfig('Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep');
    config.should.have.property('host').that.equals('hostname.servicebus.windows.net');
    config.should.have.property('keyName').that.equals('sakName');
    config.should.have.property('key').that.equals('sak');
    config.should.have.property('path').that.equals('ep');
    config.should.have.property('saslPlainUri');
  });

  it('populates config properties from an IoT Hub connection string', function () {
    var config = new ConnectionConfig('HostName=hostname.azure-devices.net;SharedAccessKeyName=sakName;SharedAccessKey=sak');
    config.should.have.property('host').that.equals('hostname.azure-devices.net');
    config.should.have.property('keyName').that.equals('sakName');
    config.should.have.property('key').that.equals('sak');
    config.should.have.property('path').that.equals('messages/events/');
    config.should.have.property('sharedAccessSignature');
    config.should.have.property('saslPlainUri');
  });

  it('populates path from the path argument if connection string doesn\'t have EntityPath', function () {
    var config = new ConnectionConfig('', 'abc');
    config.should.have.property('path').that.equals('abc');
  });
});