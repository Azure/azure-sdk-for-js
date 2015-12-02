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
    
    it('translates \'amqp:not-found\' into MessagingEntityNotFoundError', function () {
      var err = new AMQPError('amqp:not-found');
      errors.translate(err).should.be.an.instanceof(errors.MessagingEntityNotFoundError);
    });
  });
});
