// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { isNode } from "@azure/core-util";
import { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { Test } from "mocha";
import { generateToken } from "../../public/utils/connection";

if (isNode) {
  dotenv.config();
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
};

const fakeToken = generateToken();
export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    bodyKeySanitizers: [{ jsonPath: "$.accessToken.token", value: fakeToken }],
  },
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export async function createRecorder(context: Test | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.setMatcher("HeaderlessMatcher");
  return recorder;
}
