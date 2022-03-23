// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const Base = require("./defaultExportsNamedClass").default;

module.exports = {
  default: class extends Base {
    constructor() {
      super("Hello world!");
    }
  },
};
