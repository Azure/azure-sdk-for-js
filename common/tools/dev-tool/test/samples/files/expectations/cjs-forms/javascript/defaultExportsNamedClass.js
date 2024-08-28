// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

class Base {
  message;
  constructor(message) {
    this.message = message;
  }

  say() {
    console.log(this.message);
  }
}

module.exports = { default: Base };
