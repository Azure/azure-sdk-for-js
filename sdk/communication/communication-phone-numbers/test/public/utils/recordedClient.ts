// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as dotenv from "dotenv";
import type { RecorderStartOptions, SanitizerOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
import { parseConnectionString } from "@azure/communication-common";
import type { TokenCredential } from "@azure/identity";
import { isNodeLike } from "@azure/core-util";
import { createTestCredential } from "@azure-tools/test-credential";
import { createMSUserAgentPolicy } from "./msUserAgentPolicy.js";
import { createOperationLocationFixPolicy } from "./operationLocationFixPolicy.js";

if (isNodeLike) {
  dotenv.config();
}

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING:
    "endpoint=https://Sanitized.com/;accesskey=banana",
  COMMUNICATION_ENDPOINT: "https://Sanitized.com/",
  AZURE_CLIENT_ID: "SomeClientId",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "SomeTenantId",
  AZURE_PHONE_NUMBER: "+14155550100",
  AZURE_USERAGENT_OVERRIDE: "fake-useragent",
};

const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING
    ? [
      {
        actualConnString: env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING,
        fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"],
      },
    ]
    : [],
  headerSanitizers: [
    {
      key: "Operation-Location",
      regex: true,
      target: `https://[^/]+(?:\\.int)?\\.communication\\.azure\\.(?:com|net)/(.*)`,
      value: `https://Sanitized.com/$1`,
    },
    {
      key: "operation-location",
      regex: true,
      target: `https://[^/]+(?:\\.int)?\\.communication\\.azure\\.(?:com|net)/(.*)`,
      value: `https://Sanitized.com/$1`,
    },
  ],
  uriSanitizers: [
    {
      regex: true,
      target: `https://[^/]+(?:\\.int)?\\.communication\\.azure\\.(?:com|net)/(.*)`,
      value: `https://Sanitized.com/$1`,
    },
  ],
  generalSanitizers: [
    { regex: true, target: `"access_token"\\s?:\\s?"[^"]*"`, value: `"access_token":"sanitized"` },
    {
      regex: true,
      target: `(https://)([^/'",}]*(?:\\.int)?\\.communication\\.azure\\.(?:com|net))`,
      value: `$1Sanitized.com`,
    },
    {
      regex: true,
      target: `\\d{1}\\d{3}\\d{3}\\d{4}`,
      value: `14155550100`,
    },
    {
      regex: true,
      target: `[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}`,
      value: `00000000-0000-0000-0000-000000000000`,
    },
  ],
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: sanitizerOptions,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
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

  // Use the fake connection string in playback mode, real one in live/record mode
  const connectionString = isPlaybackMode()
    ? envSetupForPlayback["COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"]
    : (env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING ?? "");

  const client = new PhoneNumbersClient(
    connectionString,
    recorder.configureClientOptions({
      additionalPolicies: [
        {
          policy: createMSUserAgentPolicy(),
          position: "perCall",
        },
        {
          policy: createOperationLocationFixPolicy(),
          position: "perRetry",
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

  let credential: TokenCredential;
  let endpoint: string;

  if (isPlaybackMode()) {
    credential = createMockToken();
    endpoint = envSetupForPlayback["COMMUNICATION_ENDPOINT"];
  } else {
    credential = createTestCredential();
    endpoint = parseConnectionString(
      env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING ?? "",
    ).endpoint;
  }

  const client = new PhoneNumbersClient(
    endpoint,
    credential,
    recorder.configureClientOptions({
      additionalPolicies: [
        {
          policy: createMSUserAgentPolicy(),
          position: "perCall",
        },
        {
          policy: createOperationLocationFixPolicy(),
          position: "perRetry",
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
