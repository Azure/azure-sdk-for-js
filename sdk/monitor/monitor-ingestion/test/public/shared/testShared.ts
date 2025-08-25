// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, env } from "@azure-tools/test-recorder";
import { createClientLogger } from "@azure/logger";
import { LogsIngestionClient } from "@azure/monitor-ingestion";
import type { ExponentialRetryPolicyOptions } from "@azure/core-rest-pipeline";
import type { AdditionalPolicyConfig } from "@azure/core-client";
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
