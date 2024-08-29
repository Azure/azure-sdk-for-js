// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Test } from "mocha";

import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";

import { MonitoringClient, MonitoringClientOptionalParams } from "../../../src";

const envSetupForPlayback: { [k: string]: string } = {
  ENDPOINT: "https://testaccount.dev.azuresynapse.net",
};

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export function createClient(options?: {
  recorder?: Recorder;
  clientOptions?: MonitoringClientOptionalParams;
}): MonitoringClient {
  const { recorder, clientOptions = {} } = options || {};
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  return new MonitoringClient(
    createTestCredential(),
    assertEnvironmentVariable("ENDPOINT"),
    updatedOptions,
  );
}

export async function createRecorder(currentTest?: Test): Promise<Recorder> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderStartOptions);
  return recorder;
}
