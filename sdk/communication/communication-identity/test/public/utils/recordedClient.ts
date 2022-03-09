// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  SanitizerOptions,
  env,
  isPlaybackMode,
  RecorderStartOptions,
} from "@azure-tools/test-recorder";

import { CommunicationIdentityClient } from "../../../src";
import { Context } from "mocha";
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
  removeHeaderSanitizer: { headersForRemoval: ["Accept-Language"] },
  uriSanitizers: [
    {
      regex: true,
      target: `/(https:\/\/)(?<host_name>[^/',]*)/`,
      value: "endpoint",
      groupForReplace: "host_name",
    },
    {
      regex: true,
      target: `(.*)\/identities\/(?<secret_content>.*?)[\/|?](.*)`,
      value: "sanitized",
      groupForReplace: "secret_content",
    },
  ],
  generalSanitizers: [
    { regex: true, target: `"access_token"\s?:\s?"[^"]*"`, value: `"access_token":"sanitized"` },
    { regex: true, target: `"token"\s?:\s?"[^"]*"`, value: `"token":"sanitized"` },
    { regex: true, target: `"id_token"\s?:\s?"[^"]*"`, value: `"id_token":"sanitized"` },
    { regex: true, target: `"refresh_token"\s?:\s?"[^"]*"`, value: `"refresh_token":"sanitized"` },
    { regex: true, target: `"id"\s?:\s?"[^"]*"`, value: `"id":"sanitized"` },
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

export async function createRecordedCommunicationIdentityClient(
  context: Context
): Promise<RecordedClient<CommunicationIdentityClient>> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderOptions);

  const client = new CommunicationIdentityClient(
    env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING ?? "",
    recorder.configureClientOptions({})
  );

  // casting is a workaround to enable min-max testing
  return {
    client,
    recorder,
  };
}

export async function createRecordedCommunicationIdentityClientWithToken(
  context: Context
): Promise<RecordedClient<CommunicationIdentityClient>> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderOptions);

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

  // casting is a workaround to enable min-max testing
  return { client, recorder };
}
