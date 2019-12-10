// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  runSample(sampleMain) {
    if (!process.env["BATCH_RUN_SAMPLES"]) {
      return sampleMain();
    } else {
      return Promise.resolve();
    }
  }
};
