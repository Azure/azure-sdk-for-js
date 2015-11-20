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

module.exports = {
  MessagingEntityNotFoundError: MessagingEntityNotFoundError
};
