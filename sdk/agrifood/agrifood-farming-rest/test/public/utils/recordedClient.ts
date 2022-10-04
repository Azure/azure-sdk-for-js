// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import "./env";

import FarmBeats, { FarmBeatsClient } from "../../../src";
import {
  Recorder,
  env,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { ClientOptions } from "@azure-rest/core-client";
import { Context } from "mocha";

// export const environmentSetup: RecorderEnvironmentSetup = {
//   replaceableVariables,
//   customizationsOnRecordings: [
//     (recording: string): string =>
//       recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`),
//     // If we put ENDPOINT in replaceableVariables above, it will not capture
//     // the endpoint string used with nock, which will be expanded to
//     // https://<endpoint>:443/ and therefore will not match, so we have to do
//     // this instead.
//     (recording: string): string => {
//       const replaced = recording.replace("endpoint:443", "endpoint");
//       return replaced;
//     },
//   ],
//   queryParametersToSkip: [],
// };


export function createClient(options?: ClientOptions): FarmBeatsClient {
  const credential = createTestCredential();

  return FarmBeats(env.FARMBEATS_ENDPOINT as string, credential, { ...options });
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return new Recorder(context.currentTest);
}
