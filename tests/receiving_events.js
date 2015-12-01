// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
chai.should();

var EventHubClient = require('../lib/client.js');
var MessagingEntityNotFoundError = require('../lib/errors.js').MessagingEntityNotFoundError;

describe('EventHubClient', function () {
  describe('#createReceiver', function () {
    it('returns MessagingEntityNotFoundError when the consumer group doesn\'t exist', function () {
      var client = EventHubClient.fromConnectionString(process.env.EVENT_HUB_CONNECTION_STRING, process.env.EVENT_HUB_PATH);
      var receiver = client.createReceiver('bad', "1");
      return receiver.should.be.rejectedWith(MessagingEntityNotFoundError);
    });
  });
});