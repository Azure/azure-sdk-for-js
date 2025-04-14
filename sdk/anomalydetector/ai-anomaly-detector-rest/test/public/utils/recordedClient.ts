// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import type { AnomalyDetectorRestClient } from "../../../src/index.js";
import AnomalyDetector from "../../../src/index.js";
import { AzureKeyCredential } from "@azure/core-auth";

const envSetupForPlayback: Record<string, string> = {
  ANOMALY_DETECTOR_ENDPOINT: "https://endpoint/",
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
export async function createRecorder(context: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export async function createClient(recorder: Recorder): Promise<AnomalyDetectorRestClient> {
  const endpoint = assertEnvironmentVariable("ANOMALY_DETECTOR_ENDPOINT");
  const key = assertEnvironmentVariable("ANOMALY_DETECTOR_API_KEY");
  const credential = new AzureKeyCredential(key);
  return AnomalyDetector(endpoint, credential, recorder.configureClientOptions({}));
}
