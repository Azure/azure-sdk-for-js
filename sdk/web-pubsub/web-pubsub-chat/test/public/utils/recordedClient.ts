// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, type VitestTestContext } from "@azure-tools/test-recorder";
import recorderOptions from "../../testEnv.js";

/**
 * Creates and starts the recorder for a test context.
 * Client creation is done separately in each test suite.
 */
export async function createRecorder(context: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  return recorder;
}
