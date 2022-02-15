// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { ClientSecretCredential, DefaultAzureCredential } from "@azure/identity";
import {
  Recorder,
  RecorderEnvironmentSetup,
  env,
  isPlaybackMode,
  record,
} from "@azure-tools/test-recorder";
import { CommunicationIdentityClient } from "../../../src";
import { Context } from "mocha";
import { TokenCredential } from "@azure/core-auth";
import { isNode } from "@azure/core-util";
import { parseConnectionString } from "@azure/communication-common";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
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

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording.replace(/"token"\s?:\s?"[^"]*"/g, `"token":"sanitized"`),
    (recording: string): string =>
      recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"sanitized"`),
    (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1endpoint"),
    (recording: string): string => recording.replace(/"id"\s?:\s?"[^"]*"/g, `"id":"sanitized"`),
    (recording: string): string => {
      return recording.replace(
        /(https:\/\/[^/',]*\/identities\/)[^/',]*(\/token)/,
        "$1sanitized$2"
      );
    },
    (recording: string): string =>
      recording.replace(/\/identities\/[^/'",]*/, "/identities/sanitized"),
    (recording: string): string => recording.replace(/\+\d{1}\d{3}\d{3}\d{4}/g, "+18005551234"),
    (recording: string): string =>
      recording.replace(
        /[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/gi,
        "00000000-0000-0000-0000-000000000000"
      ),
  ],
  queryParametersToSkip: [],
};

export function createRecorder(context: Context): Recorder {
  const recorder = record(context, environmentSetup);
  return recorder;
}

export function createRecordedCommunicationIdentityClient(
  context: Context
): RecordedClient<CommunicationIdentityClient> {
  const recorder = record(context, environmentSetup);

  // casting is a workaround to enable min-max testing
  return {
    client: new CommunicationIdentityClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING),
    recorder,
  };
}

export function createRecordedCommunicationIdentityClientWithToken(
  context: Context
): RecordedClient<CommunicationIdentityClient> {
  const recorder = record(context, environmentSetup);
  let credential: TokenCredential;
  const endpoint = parseConnectionString(
    env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING
  ).endpoint;
  if (isPlaybackMode()) {
    credential = {
      getToken: async (_scopes) => {
        return { token: "testToken", expiresOnTimestamp: 11111 };
      },
    };

    // casting is a workaround to enable min-max testing
    return { client: new CommunicationIdentityClient(endpoint, credential), recorder };
  }

  if (isNode) {
    credential = new DefaultAzureCredential();
  } else {
    credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );
  }

  // casting is a workaround to enable min-max testing
  return { client: new CommunicationIdentityClient(endpoint, credential), recorder };
}
