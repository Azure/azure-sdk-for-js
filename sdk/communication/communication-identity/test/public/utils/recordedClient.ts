// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context, Test } from "mocha";
import {
  Recorder,
  RecorderStartOptions,
  SanitizerOptions,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { CommunicationIdentityClient } from "../../../src";
import { TokenCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import { parseConnectionString } from "@azure/communication-common";

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
  INCLUDE_PHONENUMBER_LIVE_TESTS: "false",
  COMMUNICATION_ENDPOINT: "https://endpoint/",
  AZURE_CLIENT_ID: "SomeClientId",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "SomeTenantId",
  COMMUNICATION_MSAL_USERNAME: "MSALUsername",
  COMMUNICATION_MSAL_PASSWORD: "MSALPassword",
  COMMUNICATION_M365_APP_ID: "00000000-0000-0000-0000-000000000000",
  COMMUNICATION_M365_AAD_TENANT: "00000000-0000-0000-0000-000000000000",
  COMMUNICATION_M365_SCOPE: "M365Scope",
  COMMUNICATION_EXPIRED_TEAMS_TOKEN: "ExpiredToken",
  SKIP_INT_IDENTITY_EXCHANGE_TOKEN_TEST: "false",
};

const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING,
      fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"],
    },
  ],
  uriSanitizers: [
    {
      regex: true,
      target: `(.*)/identities/(?<secret_content>.*?)[/|?](.*)`,
      value: "sanitized",
      groupForReplace: "secret_content",
    },
  ],
  generalSanitizers: [
    { regex: true, target: `"token"\\s?:\\s?"[^"]*"`, value: `"token":"sanitized"` },
    { regex: true, target: `"id"\\s?:\\s?"[^"]*"`, value: `"id":"sanitized"` },
    { regex: true, target: `"appId"\\s?:\\s?"[^"]*"`, value: `"appId":"sanitized"` },
    { regex: true, target: `"userId"\\s?:\\s?"[^"]*"`, value: `"userId":"sanitized"` },
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

export async function createRecordedCommunicationIdentityClient(
  context: Context
): Promise<RecordedClient<CommunicationIdentityClient>> {
  const recorder = await createRecorder(context.currentTest);

  const client = new CommunicationIdentityClient(
    env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING ?? "",
    recorder.configureClientOptions({})
  );

  return {
    client,
    recorder,
  };
}

export async function createRecordedCommunicationIdentityClientWithToken(
  context: Context
): Promise<RecordedClient<CommunicationIdentityClient>> {
  const recorder = await createRecorder(context.currentTest);

  let credential: TokenCredential;
  const endpoint = parseConnectionString(
    env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING ?? ""
  ).endpoint;
  if (isPlaybackMode()) {
    credential = {
      getToken: async (_scopes: any) => {
        return { token: "testToken", expiresOnTimestamp: 11111 };
      },
    };
  } else {
    credential = createTestCredential();
  }

  const client = new CommunicationIdentityClient(
    endpoint,
    credential,
    recorder.configureClientOptions({})
  );

  return { client, recorder };
}
