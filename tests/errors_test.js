// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
chai.should();

var errors = require('../lib/errors.js');

function AMQPError(conditionStr) {
  this.condition = { contents: conditionStr };
}

describe('errors', function () {
  describe('.translate', function () {
    it('acts as a passthrough if the input is not an AMQPError', function () {
      var MyError = function () {};
      var err = new MyError();
      errors.translate(err).should.equal(err);
    });
    
    [
      { from: 'amqp:not-found', to: 'MessagingEntityNotFoundError' },
      { from: 'com.microsoft:argument-out-of-range', to: 'ArgumentOutOfRangeError' },
      { from: '<unknown>', to: 'Error' }
    ]
    .forEach(function (mapping) {
      it('translates ' + mapping.from + ' into ' + mapping.to, function () {
        var err = new AMQPError(mapping.from);
        var errorClass = errors.translate(err).constructor.name;
        errorClass.should.equal(mapping.to);
      });
      
      it('attaches the original ' + mapping.from + ' error as the \'transport\' property', function () {
        var err = new AMQPError(mapping.from);
        var result = errors.translate(err);
        result.should.have.property('transport')
          .that.equals(err);
      });
    });
  });
});
