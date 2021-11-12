// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { ClientSecretCredential, DefaultAzureCredential } from "@azure/identity";
import {
  DefaultHttpClient,
  HttpClient,
  HttpOperationResponse,
  TokenCredential,
  WebResourceLike,
  isNode
} from "@azure/core-http";
import {
  Recorder,
  RecorderEnvironmentSetup,
  env,
  isPlaybackMode,
  record
} from "@azure-tools/test-recorder";
import { ShortCodesClient, ShortCodesClientOptions } from "../../../src";
import { Context } from "mocha";
import { parseConnectionString } from "@azure/communication-common";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
  AZURE_CLIENT_ID: "SomeClientId",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "SomeTenantId"
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^/'",}]*)/, "$1endpoint"),
    (recording: string): string =>
      recording.replace(
        /[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/gi,
        "00000000-0000-0000-0000-000000000000"
      )
  ],
  queryParametersToSkip: []
};

export function createRecordedClient(context: Context): RecordedClient<ShortCodesClient> {
  const recorder = record(context, environmentSetup);

  // casting is a workaround to enable min-max testing
  return {
    client: new ShortCodesClient(env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING, {
      httpClient: createTestHttpClient()
    } as ShortCodesClientOptions),
    recorder
  };
}

export function createMockToken(): TokenCredential {
  return {
    getToken: async (_scopes) => {
      return { token: "testToken", expiresOnTimestamp: 11111 };
    }
  };
}

export function createRecordedClientWithToken(
  context: Context
): RecordedClient<ShortCodesClient> | undefined {
  const recorder = record(context, environmentSetup);
  let credential: TokenCredential;
  const endpoint = parseConnectionString(env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING)
    .endpoint;
  if (isPlaybackMode()) {
    credential = createMockToken();

    // casting is a workaround to enable min-max testing
    return {
      client: new ShortCodesClient(endpoint, credential, {
        httpClient: createTestHttpClient()
      } as ShortCodesClientOptions),
      recorder
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
    client: new ShortCodesClient(endpoint, credential, {
      httpClient: createTestHttpClient()
    } as ShortCodesClientOptions),
    recorder
  };
}

export const testPollerOptions = {
  pollInterval: isPlaybackMode() ? 0 : undefined
};

function createTestHttpClient(): HttpClient {
  const customHttpClient = new DefaultHttpClient();

  const originalSendRequest = customHttpClient.sendRequest;
  customHttpClient.sendRequest = async function(
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
