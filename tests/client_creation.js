// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
chai.should();

var makeConfig = require('../lib/config.js');
var EventHubClient = require('../lib/client.js');
var ArgumentError = require('azure-iot-common').errors.ArgumentError;

function testFalsyValues(testFn) {
  [null, undefined, '', 0].forEach(function (value) {
    testFn(value);
  });
}

describe('makeConfig', function () {
  it('populates config.host from the connection string\'s Endpoint', function () {
    var config = makeConfig('Endpoint=sb://abc');
    config.should.have.property('host')
      .that.equals('abc');
  });
  
  it('populates config.keyName from the connection string\'s SharedAccessKeyName', function () {
    var config = makeConfig('SharedAccessKeyName=abc');
    config.should.have.property('keyName')
      .that.equals('abc');
  });
  
  it('populates config.key from the connection string\'s SharedAccessKey', function () {
    var config = makeConfig('SharedAccessKey=abc');
    config.should.have.property('key')
      .that.equals('abc');
  });
  
  it('populates config.path from the connection string\'s EntityPath', function () {
    var config = makeConfig('EntityPath=abc');
    config.should.have.property('path')
      .that.equals('abc');
  });

  it('populates config.path from the path argument if connection string doesn\'t have EntityPath', function () {
    var config = makeConfig('', 'abc');
    config.should.have.property('path')
      .that.equals('abc');
  });
});

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
      var client = EventHubClient.fromConnectionString('Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d');
      client.should.be.an.instanceof(EventHubClient);
    });

    it('creates an EventHubClient from a connection string and an Event Hub path', function () {
      var client = EventHubClient.fromConnectionString('Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c', 'path');
      client.should.be.an.instanceof(EventHubClient);
    });
  });
});