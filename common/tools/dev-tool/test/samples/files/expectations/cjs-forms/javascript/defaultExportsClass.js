// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const Base = require("./defaultExportsNamedClass").default;

module.exports = {
  default: class extends Base {
    constructor() {
      super("Hello world!");
    }
  },
};
