// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";

import { Recorder, RecorderStartOptions, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { TokenCredential } from "@azure/identity";
import { parseConnectionString } from "@azure/communication-common";
import { Context, Test } from "mocha";
import { isNode } from "@azure/test-utils";
import { DomainVerificationClient } from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";
import { createMSUserAgentPolicy } from "./msUserAgentPolicy";
import { AdditionalPolicyConfig } from "@azure/core-client";

if (isNode) {
  dotenv.config({ path: __dirname });
}

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
  AZURE_CLIENT_ID: "SomeClientId",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "SomeTenantId",
  AZURE_USERAGENT_OVERRIDE: "fake-useragent",
};

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    connectionStringSanitizers: [
      {
        actualConnString: env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING,
        fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"],
      },
    ],
    generalSanitizers: [
      {
        regex: true,
        target: `[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}`,
        value: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
};

export function createMockToken(): TokenCredential {
  return {
    getToken: async (_scopes) => {
      return { token: "testToken", expiresOnTimestamp: 11111 };
    },
  };
}

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
): Promise<RecordedClient<DomainVerificationClient>> {
  const recorder = await createRecorder(context.currentTest);
  const policies = getAdditionalPolicies(mockedAPI);

  return {
    client: new DomainVerificationClient(
      env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING ?? "",
      recorder.configureClientOptions({ additionalPolicies: policies })
    ),
    recorder,
  };
}

export async function createRecordedClientWithToken(
  context: Context,
  mockedAPI: boolean = false
): Promise<RecordedClient<DomainVerificationClient>> {
  const recorder = await createRecorder(context.currentTest);
  let credential: TokenCredential;
  const policies = getAdditionalPolicies(mockedAPI);

  const endpoint = parseConnectionString(
    env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING ?? ""
  ).endpoint;

  if (isPlaybackMode()) {
    credential = createMockToken();
  } else {
    credential = createTestCredential();
  }

  const client = new DomainVerificationClient(
    endpoint,
    credential,
    recorder.configureClientOptions({ additionalPolicies: policies })
  );

  return { client, recorder };
}

export function getAdditionalPolicies(mockedApi: boolean): AdditionalPolicyConfig[] {
  const additionalPolicies: AdditionalPolicyConfig[] = [
    {
      policy: createMSUserAgentPolicy(mockedApi),
      position: "perRetry",
    },
  ];

  return additionalPolicies;
}