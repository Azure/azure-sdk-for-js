// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
chai.should();

var Receiver = require('../lib/receiver.js');
var EventHubClient = require('../lib/client.js');
var MessagingEntityNotFoundError = require('../lib/errors.js').MessagingEntityNotFoundError;

describe('EventHubClient', function () {
  describe('#createReceiver', function () {
    it('returns a Receiver', function () {
      var client = EventHubClient.fromConnectionString(process.env.EVENT_HUB_CONNECTION_STRING, process.env.EVENT_HUB_PATH);
      var receiver = client.createReceiver('$Default', '0');
      return receiver.should.eventually.be.instanceOf(Receiver);
    });
  });
});

describe('EventHubReceiver', function () {
  it('emits MessagingEntityNotFoundError when the consumer group doesn\'t exist', function (done) {
    var client = EventHubClient.fromConnectionString(process.env.EVENT_HUB_CONNECTION_STRING, process.env.EVENT_HUB_PATH);
    var promise = client.createReceiver('bad', '0');
    promise.then(function (receiver) {
      receiver.on('errorReceived', function (err) {
        err.should.be.instanceOf(MessagingEntityNotFoundError);
        done();
      });
    });
  });
});