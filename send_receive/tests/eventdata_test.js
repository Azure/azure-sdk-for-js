// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var EventData = require('../lib/eventdata.js');
var chai = require('chai');
chai.should();

var testAnnotations = {
  descriptor: null,
  value: {
    "x-opt-enqueued-time": Date.now(),
    "x-opt-offset": "42",
    "x-opt-sequence-number": 1337,
    "x-opt-partition-key": 'key'
  }
};

var testBody = '{ "foo": "bar" }';

var testProperties = {
  propKey: 'propValue'
};

var testMessage = {
  body: testBody,
  annotations: testAnnotations,
  properties: testProperties
};

describe('EventData', function(){
  describe('.fromAmqpMessage', function () {
    it('returns an instance of EventData', function() {
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.should.be.instanceOf(EventData);
    });

    it('populates systemProperties with the message annotations', function () {
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.systemProperties.should.equal(testAnnotations.value);
    });

    it('populates body with the message body', function () {
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.body.should.equal(testBody);
    });
    
    it('populates the properties with the message properties', function() {
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.properties.should.equal(testProperties);
    });
  });

  describe('#constructor', function () {
    it('populates systemProperties with the message annotations', function () {
      var testEventData = new EventData(testBody, testAnnotations.value);
      testEventData.systemProperties.should.equal(testAnnotations.value);
    });

    it('populates body with the message body', function () {
      var testEventData = new EventData(testBody, testAnnotations.value);
      testEventData.body.should.equal(testBody);
    });
    
    it('populates properties with the message properties', function () {
      var testEventData = new EventData(testBody, testAnnotations.value, testProperties);
      testEventData.properties.should.equal(testProperties);
    });
  });

  describe('#properties', function() {
    it('enqueuedTimeUtc gets the enqueued time from system properties', function(){
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.enqueuedTimeUtc.should.equal(testAnnotations.value['x-opt-enqueued-time']);
    });

    it('offset gets the offset from system properties', function(){
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.offset.should.equal(testAnnotations.value['x-opt-offset']);
    });

    it('sequenceNumber gets the sequence number from system properties', function(){
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.sequenceNumber.should.equal(testAnnotations.value['x-opt-sequence-number']);
    });

    it('partitionKey gets the sequence number from system properties', function(){
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.partitionKey.should.equal(testAnnotations.value['x-opt-partition-key']);
    });

    [null, undefined].forEach(function(systemProp) {
      it('enqueuedTimeUtc returns \'null\' if systemProperties are falsy', function(){
        var testEventData = new EventData(testBody, systemProp);
        chai.expect(testEventData.enqueuedTimeUtc).to.equal(null);
      });

      it('offset returns \'\' if systemProperties are falsy', function(){
        var testEventData = new EventData(testBody, systemProp);
        testEventData.offset.should.equal("");
      });

      it('sequenceNumber returns \'0\' if systemProperties are falsy', function(){
        var testEventData = new EventData(testBody, systemProp);
        testEventData.sequenceNumber.should.equal(0);
      });

      it('partitionKey returns \'null\' if systemProperties are falsy', function(){
        var testEventData = new EventData(testBody, systemProp);
        chai.expect(testEventData.partitionKey).to.equal(null);
      });
    });
  });
});