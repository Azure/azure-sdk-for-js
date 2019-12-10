// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function runSample(sampleMain: () => Promise<void>) {
  if (!process.env["BATCH_RUN_SAMPLES"]) {
    return sampleMain();
  } else {
    return Promise.resolve();
  }
}
