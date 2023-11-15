// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context, Test } from "mocha";
import * as dotenv from "dotenv";

import {
  Recorder,
  RecorderStartOptions,
  env,
  isPlaybackMode,
  SanitizerOptions,
} from "@azure-tools/test-recorder";
import { PhoneNumbersClient } from "../../../src";
import { parseConnectionString } from "@azure/communication-common";
import { TokenCredential } from "@azure/identity";
import { isNode } from "@azure/test-utils";
import { createTestCredential } from "@azure-tools/test-credential";
import { createMSUserAgentPolicy } from "./msUserAgentPolicy";
import { AdditionalPolicyConfig } from "@azure/core-client";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
  INCLUDE_PHONENUMBER_LIVE_TESTS: "false",
  SKIP_UPDATE_CAPABILITIES_LIVE_TESTS: "false",
  COMMUNICATION_ENDPOINT: "https://endpoint/",
  AZURE_CLIENT_ID: "SomeClientId",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "SomeTenantId",
  AZURE_PHONE_NUMBER: "+14155550100",
  COMMUNICATION_SKIP_INT_PHONENUMBERS_TESTS: "false",
};

const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING,
      fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"],
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
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: sanitizerOptions,
};

export async function createRecorder(context: Test | undefined): Promise<Recorder> {
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
  context: Context,
  mockedAPI: boolean = false
): Promise<RecordedClient<PhoneNumbersClient>> {
  const recorder = await createRecorder(context.currentTest);
  const policies = getAdditionalPolicies(mockedAPI);

  const client = new PhoneNumbersClient(
    env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING ?? "",
    recorder.configureClientOptions({ additionalPolicies: policies })
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
  context: Context,
  mockedAPI: boolean = false
): Promise<RecordedClient<PhoneNumbersClient>> {
  const recorder = await createRecorder(context.currentTest);
  const policies = getAdditionalPolicies(mockedAPI);

  let credential: TokenCredential;
  const endpoint = parseConnectionString(
    env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING ?? ""
  ).endpoint;

  if (isPlaybackMode()) {
    credential = createMockToken();
  } else {
    credential = createTestCredential();
  }

  const client = new PhoneNumbersClient(
    endpoint,
    credential,
    recorder.configureClientOptions({ additionalPolicies: policies })
  );

  // casting is a workaround to enable min-max testing
  return { client, recorder };
}

export const testPollerOptions = {
  pollInterval: isPlaybackMode() ? 0 : undefined,
};

export function getAdditionalPolicies(mockedApi: boolean): AdditionalPolicyConfig[] {
  const additionalPolicies: AdditionalPolicyConfig[] = [
    {
      policy: createMSUserAgentPolicy(mockedApi),
      position: "perRetry",
    },
  ];

  return additionalPolicies;
}
