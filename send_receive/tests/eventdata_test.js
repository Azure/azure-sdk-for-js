// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var EventData = require('../lib/eventdata.js');
var chai = require('chai');
chai.should();

var testAnnotations = {
  descriptor: null,
  "x-opt-enqueued-time": Date.now(),
  "x-opt-offset": "42",
  "x-opt-sequence-number": 1337,
  "x-opt-partition-key": 'key'
};

var testBody = '{ "foo": "bar" }';

var messageProperties = {
  messageId: 'test_id'
};

var applicationProperties = {
  propKey: 'propValue'
};

var testMessage = {
  body: testBody,
  messageAnnotations: testAnnotations,
  properties: messageProperties,
  applicationProperties: applicationProperties
};

describe('EventData', function(){
  describe('.fromAmqpMessage', function () {
    it('returns an instance of EventData', function() {
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.should.be.instanceOf(EventData);
    });

    it('populates annotations with the message annotations', function () {
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.annotations.should.equal(testAnnotations);
    });

    it('populates body with the message body', function () {
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.body.should.equal(testBody);
    });
    
    it('populates the properties with the message properties', function() {
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.properties.should.equal(messageProperties);
    });
    
    it('populates the application properties with the message application properties', function() {
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.applicationProperties.should.equal(applicationProperties);
    });
  });

  describe('#constructor', function () {
    it('populates annotations with the message annotations', function () {
      var testEventData = new EventData(testBody, testAnnotations);
      testEventData.annotations.should.equal(testAnnotations);
    });

    it('populates body with the message body', function () {
      var testEventData = new EventData(testBody, testAnnotations);
      testEventData.body.should.equal(testBody);
    });
    
    it('populates properties with the message properties', function () {
      var testEventData = new EventData(testBody, testAnnotations, messageProperties);
      testEventData.properties.should.equal(messageProperties);
    });

    it('populates properties with the message properties', function () {
      var testEventData = new EventData(testBody, testAnnotations, messageProperties, applicationProperties);
      testEventData.applicationProperties.should.equal(applicationProperties);
    });
  });

  describe('#properties', function() {
    it('enqueuedTimeUtc gets the enqueued time from system properties', function(){
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.enqueuedTimeUtc.should.equal(testAnnotations['x-opt-enqueued-time']);
    });

    it('offset gets the offset from system properties', function(){
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.offset.should.equal(testAnnotations['x-opt-offset']);
    });

    it('sequenceNumber gets the sequence number from system properties', function(){
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.sequenceNumber.should.equal(testAnnotations['x-opt-sequence-number']);
    });

    it('partitionKey gets the sequence number from system properties', function(){
      var testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.partitionKey.should.equal(testAnnotations['x-opt-partition-key']);
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