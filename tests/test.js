// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
// var Promise = require('bluebird');
var chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

var ConnectionString = require('azure-iot-common').ConnectionString;

function EventHubClient() {}
EventHubClient.fromConnectionString = function (connectionString) {
  if (!connectionString) throw Error();
  var cn = ConnectionString.parse(connectionString);
  if (!cn.EntityPath) throw Error();
  return new EventHubClient();
};

function testFalsyValues(testFn) {
  [null, undefined, '', 0].forEach(function (value) {
    testFn(value);
  });
}

describe('EventHubClient', function () {
  describe('#fromConnectionString', function () {
    it('creates an EventHubClient', function () {
      var client = EventHubClient.fromConnectionString('EntityPath=abc');
      client.should.be.an.instanceof(EventHubClient);
    });
	
    it('throws when there\'s no connection string', function () {
      testFalsyValues(function (value) {
        var test = function () {
          return EventHubClient.fromConnectionString(value);
        };
        test.should.throw(Error);
      });
    });
    
    it('throws when it can\'t find the Event Hub path', function () {
      var test = function () {
        return EventHubClient.fromConnectionString('abc');
      };
      test.should.throw(Error);
    });
  });
});