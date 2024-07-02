// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createTestCredential } from "@azure-tools/test-credential";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
  env,
} from "@azure-tools/test-recorder";

import { createClientLogger } from "@azure/logger";
import { LogsIngestionClient } from "../../../src";
import { ExponentialRetryPolicyOptions } from "@azure/core-rest-pipeline";
import { AdditionalPolicyConfig } from "@azure/core-client";
export const loggerForTest = createClientLogger("test");
const envSetupForPlayback: Record<string, string> = {
  LOGS_INGESTION_ENDPOINT:
    "https://thisurl-logsingestion-somethinglocation123abcrd.monitor.azure.com",
  DATA_COLLECTION_RULE_ID: "dcr-abcdefghijklmnopqrstuvwxyztyuiop",
};
const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
};
export interface RecorderAndLogsClient {
  client: LogsIngestionClient;
  recorder: Recorder;
}
export const testEnv = new Proxy(envSetupForPlayback, {
  get: (target, key: string) => {
    return env[key] || target[key];
  },
});
export async function createClientAndStartRecorder(
  recorder: Recorder,
  additionalPolicies?: AdditionalPolicyConfig[],
  retryOptions?: ExponentialRetryPolicyOptions,
): Promise<RecorderAndLogsClient> {
  await recorder.start(recorderOptions);
  const client = new LogsIngestionClient(
    getLogsIngestionEndpoint(),
    createTestCredential(),
    recorder.configureClientOptions({
      retryOptions,
      additionalPolicies,
    }),
  );
  return {
    client,
    recorder,
  };
}

export function getLogsIngestionEndpoint(): string {
  return assertEnvironmentVariable("LOGS_INGESTION_ENDPOINT");
}

export function getDcrId(): string {
  return assertEnvironmentVariable("DATA_COLLECTION_RULE_ID");
}
