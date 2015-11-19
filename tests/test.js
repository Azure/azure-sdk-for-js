// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

var ArgumentError = require('azure-iot-common').errors.ArgumentError;
var ConnectionString = require('azure-iot-common').ConnectionString;

function EventHubClient() {}
EventHubClient.fromConnectionString = function (connectionString, path) {
  if (!connectionString) {
    throw new ArgumentError('Missing argument connectionString');
  }

  var cn = ConnectionString.parse(connectionString);
  if (!cn.EntityPath && !path) {
    throw new ArgumentError('Connection string doesn\'t have EntityPath, or missing argument path');
  }

  return new EventHubClient();
};

function testFalsyValues(testFn) {
  [null, undefined, '', 0].forEach(function (value) {
    testFn(value);
  });
}

describe('EventHubClient', function () {
  describe('#fromConnectionString', function () {
    it('throws when there\'s no connection string', function () {
      testFalsyValues(function (value) {
        var test = function () {
          return EventHubClient.fromConnectionString(value);
        };
        test.should.throw(ArgumentError, 'Missing argument connectionString');
      });
    });

    it('throws when it can\'t find the Event Hub path', function () {
      var test = function () {
        return EventHubClient.fromConnectionString('abc');
      };
      test.should.throw(ArgumentError, 'Connection string doesn\'t have EntityPath, or missing argument path');
    });

    it('creates an EventHubClient from a connection string', function () {
      var client = EventHubClient.fromConnectionString('EntityPath=abc');
      client.should.be.an.instanceof(EventHubClient);
    });

    it('creates an EventHubClient from a connection string and an Event Hub path', function () {
      var client = EventHubClient.fromConnectionString('abc', 'path');
      client.should.be.an.instanceof(EventHubClient);
    });
  });
});