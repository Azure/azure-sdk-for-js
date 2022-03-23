// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { Context } from "mocha";

import {
  env,
  isPlaybackMode,
  Recorder,
  record,
  RecorderEnvironmentSetup,
} from "@azure-tools/test-recorder";
import {
  DefaultHttpClient,
  HttpClient,
  HttpOperationResponse,
  isNode,
  TokenCredential,
  WebResourceLike,
} from "@azure/core-http";
import { CommunicationRelayClient, CommunicationRelayClientOptions } from "../../../src";
import { ClientSecretCredential, DefaultAzureCredential } from "@azure/identity";
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
  AZURE_CLIENT_ID: "SomeClientId",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording.replace(/"token"\s?:\s?"[^"]*"/g, `"token":"sanitized"`),
    (recording: string): string =>
      recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"sanitized"`),
    (recording: string): string =>
      recording.replace(/"urls"\s?:\s?\[.*?\]/g, `"urls":["turn.skype.com"]`),
    (recording: string): string =>
      recording.replace(/"username"\s?:\s?"[^"]*"/g, `"username":"sanitized_username"`),
    (recording: string): string =>
      recording.replace(/"credential"\s?:\s?"[^"]*"/g, `"credential":"sanitized_credential"`),
    (recording: string): string =>
      recording.replace(/"expiresOn"\s?:\s?"[^"]*"/g, `"expiresOn":"2022-05-18T12:00:00.00+00:00"`),
    (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1endpoint"),
    (recording: string): string => recording.replace(/"id"\s?:\s?"[^"]*"/g, `"id":"sanitized"`),
    (recording: string): string => {
      return recording.replace(
        /(https:\/\/[^/',]*\/identities\/)[^/',]*(\/token)/,
        "$1sanitized$2"
      );
    },
    (recording: string): string => recording.replace(/\/turn\/[^/'",]*/, "/turn/sanitized"),
    (recording: string): string => recording.replace(/\+\d{1}\d{3}\d{3}\d{4}/g, "+18005551234"),
    (recording: string): string =>
      recording.replace(/[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/gi, "sanitized"),
  ],
  queryParametersToSkip: [],
};

export function createRecordedCommunicationRelayClient(
  context: Context
): RecordedClient<CommunicationRelayClient> {
  const recorder = record(context, environmentSetup);

  // casting is a workaround to enable min-max testing
  return {
    client: new CommunicationRelayClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING, {
      httpClient: createTestHttpClient(),
    } as CommunicationRelayClientOptions),
    recorder,
  };
}

export function createRecordedCommunicationRelayClientWithToken(
  context: Context
): RecordedClient<CommunicationRelayClient> {
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
    return {
      client: new CommunicationRelayClient(endpoint, credential, {
        httpClient: createTestHttpClient(),
      } as CommunicationRelayClientOptions),
      recorder,
    };
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
  return {
    client: new CommunicationRelayClient(endpoint, credential, {
      httpClient: createTestHttpClient(),
    } as CommunicationRelayClientOptions),
    recorder,
  };
}

function createTestHttpClient(): HttpClient {
  const customHttpClient = new DefaultHttpClient();

  const originalSendRequest = customHttpClient.sendRequest;
  customHttpClient.sendRequest = async function (
    httpRequest: WebResourceLike
  ): Promise<HttpOperationResponse> {
    const requestResponse = await originalSendRequest.apply(this, [httpRequest]);

    console.log(
      `MS-CV header for request: ${httpRequest.url} (${
        requestResponse.status
      } - ${requestResponse.headers.get("ms-cv")})`
    );

    return requestResponse;
  };

  return customHttpClient;
}
