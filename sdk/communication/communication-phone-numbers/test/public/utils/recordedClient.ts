// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, SanitizerOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { PhoneNumbersClient } from "../../../src/index.js";
import type { TokenCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { createMSUserAgentPolicy } from "./msUserAgentPolicy.js";
import { getConnectionString, getEndpoint, isPlaybackMode } from "../../utils/injectables.js";
import * as MOCKS from "../../utils/constants.js";

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: getConnectionString(),
      fakeConnString: MOCKS.CONNECTION_STRING,
    },
  ],
  generalSanitizers: [
    { regex: true, target: `"access_token"\\s?:\\s?"[^"]*"`, value: `"access_token":"sanitized"` },
    {
      regex: true,
      target: `(https://)([^/'",}]*)`,
      value: `$1endpoint`,
    },
    {
      regex: true,
      target: `\\d{1}\\d{3}\\d{3}\\d{4}`,
      value: `14155550100`,
    },
    {
      regex: true,
      target: `[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}`,
      value: `sanitized`,
    },
  ],
  uriSanitizers: [
    {
      target: getEndpoint(),
      value: MOCKS.ENDPOINT,
    },
  ],
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {},
  sanitizerOptions: sanitizerOptions,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
    "AZSDK4001",
  ],
};

export async function createRecorder(context: TestInfo | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.setMatcher("CustomDefaultMatcher", {
    excludedHeaders: [
      "Accept-Language", // This is env-dependent
      "x-ms-content-sha256", // This is dependent on the current datetime
    ],
  });
  return recorder;
}

export async function createRecordedClient(
  context: TestInfo,
): Promise<RecordedClient<PhoneNumbersClient>> {
  const recorder = await createRecorder(context);

  const client = new PhoneNumbersClient(
    getConnectionString(),
    recorder.configureClientOptions({
      additionalPolicies: [
        {
          policy: createMSUserAgentPolicy(),
          position: "perCall",
        },
      ],
    }),
  );

  // casting is a workaround to enable min-max testing
  return { client, recorder };
}

export function createMockToken(): TokenCredential {
  return {
    getToken: async (_scopes) => {
      return { token: "testToken", expiresOnTimestamp: 11111 };
    },
  };
}

export async function createRecordedClientWithToken(
  context: TestInfo,
): Promise<RecordedClient<PhoneNumbersClient>> {
  const recorder = await createRecorder(context);
  const client = new PhoneNumbersClient(
    getEndpoint(),
    createTestCredential(),
    recorder.configureClientOptions({
      additionalPolicies: [
        {
          policy: createMSUserAgentPolicy(),
          position: "perCall",
        },
      ],
    }),
  );

  // casting is a workaround to enable min-max testing
  return { client, recorder };
}

export const testPollerOptions = {
  pollInterval: isPlaybackMode() ? 0 : undefined,
};
