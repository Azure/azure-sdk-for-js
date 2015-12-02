// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/*jshint expr: true*/

'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

var EventHubClient = require('../lib/client.js');
var MessagingEntityNotFoundError = require('../lib/errors.js').MessagingEntityNotFoundError;

function arrayOfIncreasingNumbersFromZero(length) {
  return Array.apply(null, Array(length)).map(function (x, i) { return String(i); });
}

function createClient(connectionString, eventHubPath) {
  connectionString = connectionString || process.env.EVENT_HUB_CONNECTION_STRING;
  eventHubPath = eventHubPath || process.env.EVENT_HUB_PATH;
  return EventHubClient.fromConnectionString(connectionString, eventHubPath);
}

function createClientWithPath(eventHubPath) { return createClient(null, eventHubPath); }

describe('EventHubClient', function () {
  var client;

  beforeEach('create the client', function () {
    client = createClient();
  });

  afterEach('close the connection', function () {
    return client.close();
  });

  this.timeout(15000);

  describe('#getPartitionIds', function () {
    it('returns an array of partition IDs', function () {
      return client.getPartitionIds()
        .then(function (ids) {
          ids.should.not.be.empty;
          ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
        });
    });
    
    it('returns MessagingEntityNotFoundError if the server doesn\'t recognize the Event Hub path', function () {
      var client = createClientWithPath('bad' + Math.random());
      return client.getPartitionIds()
        .should.be.rejectedWith(MessagingEntityNotFoundError);
    });
  });
});