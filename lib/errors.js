// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

function MessagingEntityNotFoundError(message) {
  this.message = message;
  this.stack = (new Error()).stack;
  Error.call(this, message);
}

MessagingEntityNotFoundError.prototype = Object.create(Error.prototype);
MessagingEntityNotFoundError.prototype.constructor = MessagingEntityNotFoundError;
MessagingEntityNotFoundError.prototype.name = 'MessagingEntityNotFoundError';

function ArgumentOutOfRangeError(message) {
  this.message = message;
  this.stack = (new Error()).stack;
  Error.call(this, message);
}

ArgumentOutOfRangeError.prototype = Object.create(Error.prototype);
ArgumentOutOfRangeError.prototype.constructor = ArgumentOutOfRangeError;
ArgumentOutOfRangeError.prototype.name = 'ArgumentOutOfRangeError';

function translateError(err) {
  var error = err;

  if (err.constructor.name === 'AMQPError') {
    if (err.condition.contents === 'amqp:not-found') {
      error = new MessagingEntityNotFoundError(err.description);
    }
    else if (err.condition.contents === 'com.microsoft:argument-out-of-range') {
      error = new ArgumentOutOfRangeError(err.description);
    }
    else {
      error = new Error(err.description);
    }
    error.transport = err;
  }

  return error;
}

module.exports = {
  translate: translateError,
  ArgumentOutOfRangeError: ArgumentOutOfRangeError,
  MessagingEntityNotFoundError: MessagingEntityNotFoundError
};
