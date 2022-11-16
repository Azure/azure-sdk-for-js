// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import "./env";
import AnomalyDetector, { AnomalyDetectorRestClient } from "../../../src";
import { AzureKeyCredential } from "@azure/core-auth";

const envSetupForPlayback: Record<string, string> = {
  ANOMALY_DETECTOR_ENDPOINT: "https://endpoint",
  ANOMALY_DETECTOR_API_KEY: "fake_key",
  ANOMALY_DETECTOR_DATA_URL: "https://endpoint-docs/data",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export async function createClient(recorder: Recorder): Promise<AnomalyDetectorRestClient> {
  const endpoint = assertEnvironmentVariable("ANOMALY_DETECTOR_ENDPOINT");
  const key = assertEnvironmentVariable("ANOMALY_DETECTOR_API_KEY");
  const credential = new AzureKeyCredential(key);
  const apiVersion = "v1.1";
  return AnomalyDetector(endpoint, apiVersion, credential, recorder.configureClientOptions({}));
}
