// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

var should = chai.should();
chai.use(chaiAsPromised);

var Receiver = require('../lib/receiver.js');
var EventHubClient = require('../lib/client.js');
var ArgumentError = require('azure-iot-common').errors.ArgumentError;
var MessagingEntityNotFoundError = require('../lib/errors').MessagingEntityNotFoundError;

function testFalsyValues(testFn) {
  [null, undefined, '', 0].forEach(function (value) {
    testFn(value);
  });
}

describe('EventHubClient', function () {
  describe('#constructor', function () {
    ['host', 'path', 'keyName', 'key'].forEach(function (prop) {
      it('throws if config.' + prop + ' is falsy', function () {
        testFalsyValues(function (falsyVal) {
          var test = function () {
            var config = { host: 'a', path: 'b', key: 'c', keyName: 'd'};
            config[prop] = falsyVal;
            return new EventHubClient(config);
          };
          test.should.throw(ArgumentError, 'config is missing property ' + prop);
        });
      });
    });
  });

  describe('.fromConnectionString', function () {
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
      var client = EventHubClient.fromConnectionString('Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d');
      client.should.be.an.instanceof(EventHubClient);
    });

    it('creates an EventHubClient from a connection string and an Event Hub path', function () {
      var client = EventHubClient.fromConnectionString('Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c', 'path');
      client.should.be.an.instanceof(EventHubClient);
    });
  });
});

function arrayOfIncreasingNumbersFromZero(length) {
  return Array.apply(null, new Array(length)).map(function (x, i) { return String(i); });
}

function createClient(connectionString, eventHubPath) {
  connectionString = connectionString || process.env.EVENTHUB_CONNECTION_STRING;
  eventHubPath = eventHubPath || process.env.EVENTHUB_PATH;
  return EventHubClient.fromConnectionString(connectionString, eventHubPath);
}

function createClientWithPath(eventHubPath) {
  return createClient(null, eventHubPath);
}

before('validate environment', function () {
  should.exist(process.env.EVENTHUB_CONNECTION_STRING,
    'define EVENTHUB_CONNECTION_STRING in your environment before running integration tests.');
  should.exist(process.env.EVENTHUB_PATH,
    'define EVENTHUB_PATH in your environment before running integration tests.');
});

describe('EventHubClient', function () {
  var client;

  beforeEach('create the client', function () {
    client = createClient();
  });

  afterEach('close the connection', function () {
    return client.close();
  });

  this.timeout(15000);

  describe('#open', function () {
    it('opens a connection to the Event Hub', function () {
      return client.open().should.be.fulfilled;
    });
  });
  
  describe('#close', function () {
    it('is a no-op when the connection is already closed', function () {
      return client.close().should.be.fulfilled;
    });
    
    it('closes an open connection', function () {
      return client.open()
        .then(function () {
          return client.close().should.be.fulfilled;
        });
    });
  });

  describe('#getPartitionIds', function () {
    it('returns an array of partition IDs', function () {
      return client.getPartitionIds()
        .then(function (ids) {
          ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
        });
    });
    
    it('returns MessagingEntityNotFoundError if the server doesn\'t recognize the Event Hub path', function () {
      var client = createClientWithPath('bad' + Math.random());
      return client.getPartitionIds()
        .should.be.rejectedWith(MessagingEntityNotFoundError);
    });
  });

  describe('#createReceiver', function () {
    it('returns a Receiver', function () {
      var receiver = client.createReceiver('$Default', '0');
      return receiver.should.eventually.be.instanceOf(Receiver);
    });
  });
});