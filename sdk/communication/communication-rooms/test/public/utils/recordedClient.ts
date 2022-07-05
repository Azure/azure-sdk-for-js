// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { 
  Recorder,
  SanitizerOptions,
  env,
  RecorderStartOptions
} from "@azure-tools/test-recorder";
import { Test } from "mocha";
import { RoomsClient } from "../../../src"

export interface RecordedRoomsClient {
  client: RoomsClient;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
};

const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: env["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"] || undefined,
      fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"]
    },
  ]
}

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: sanitizerOptions
}

export async function createRecorder(context: Test | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  return recorder;
}
