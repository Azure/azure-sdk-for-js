// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
chai.should();

var errors = require('../lib/errors.js');

describe('errors', function () {
  describe('.translate', function () {
    it('acts as a passthrough if the input is not an AMQPError', function () {
      var MyError = function () {};
      var err = new MyError();
      errors.translate(err).should.equal(err);
    });
  });
});
