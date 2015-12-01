// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
chai.should();

var EventHubClient = require('../lib/client.js');
var Receiver = require('../lib/receiver.js');

describe('EventHubClient', function () {
  describe('#createReceiver', function () {
    it('returns a Receiver', function () {
      var client = EventHubClient.fromConnectionString(process.env.EVENT_HUB_CONNECTION_STRING, process.env.EVENT_HUB_PATH);
      var receiver = client.createReceiver('$Default', '0');
      return receiver.should.be.eventually.be.instanceOf(Receiver);
    });
  });
});