// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import type { PollerOptions } from "@azure/ai-form-recognizer";
import { AzureKeyCredential } from "@azure/ai-form-recognizer";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { createClientLogger } from "@azure/logger";
import { createTestCredential } from "@azure-tools/test-credential";
import type { CommonClientOptions } from "@azure/core-client";
import type { PollOperationState } from "@azure/core-lro";
import * as MOCKS from "./constants.js";
import { getEndpoint, getKey, isLiveMode } from "./injectables.js";
import { EnvVarKeys } from "./constants.js";

export const logger = createClientLogger("ai-form-recognizer:test");

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  [EnvVarKeys.ENDPOINT]: MOCKS.ENDPOINT,
};

export const testPollingOptions: PollerOptions<PollOperationState<unknown>> = {
  updateIntervalInMs: isLiveMode() ? undefined : 0,
  onProgress: (state) => logger.verbose("Poll state progressed:", state),
};

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: ["AZSDK3402", "AZSDK4001", "AZSDK2030"],
  sanitizerOptions: {
    bodyKeySanitizers: [
      {
        jsonPath: "$.result.details.[*].sourceUrl",
      },
      {
        jsonPath: "$.urlSource",
      },
      {
        jsonPath: "$.azureBlobSource.containerUrl",
      },
      {
        jsonPath: "$.resultContainerUrl",
      },
    ],
  },
};

export const authMethods = ["AAD", "APIKey"] as const;
export type AuthMethod = (typeof authMethods)[number];

export function makeCredential(authMethod: AuthMethod): TokenCredential | AzureKeyCredential {
  return authMethod === "AAD" ? createTestCredential() : new AzureKeyCredential(getKey());
}

export async function createRecorder(currentTest?: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderOptions);
  return recorder;
}

export async function createRecordedClient<T>(
  currentTest: TestInfo | undefined,
  ctor: {
    new (
      endpoint: string,
      credential: TokenCredential | KeyCredential,
      options?: CommonClientOptions,
    ): T;
  },
  useApiKey: boolean = false,
): Promise<RecordedClient<T>> {
  const recorder = await createRecorder(currentTest);
  return {
    client: new ctor(
      getEndpoint(),
      useApiKey ? new AzureKeyCredential(getKey()) : createTestCredential(),
      recorder.configureClientOptions({}),
    ),
    recorder,
  };
}

export function getRandomNumber(): number {
  return Math.ceil(Math.random() * 1000 + 10000);
}
