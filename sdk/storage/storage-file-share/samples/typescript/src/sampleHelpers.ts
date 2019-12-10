// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
dotenv.config();

export function runSample(sampleMain: () => Promise<void>): Promise<void> {
  if (!process.env["BATCH_RUN_SAMPLES"]) {
    return sampleMain();
  } else {
    return Promise.resolve();
  }
}
