// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseConnectionString } from "@azure/communication-common";
import {
  DefaultHttpClient,
  HttpClient,
  HttpOperationResponse,
  isNode,
  WebResourceLike,
} from "@azure/core-http";
import { ClientSecretCredential, DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { env, isPlaybackMode, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { SmsClient, SmsClientOptions } from "../../../src";

export const recorderConfiguration: RecorderEnvironmentSetup = {
  replaceableVariables: {
    COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
    AZURE_PHONE_NUMBER: "+14255550123",
    AZURE_CLIENT_ID: "SomeClientId",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "SomeTenantId",
    COMMUNICATION_SKIP_INT_SMS_TEST: "false",
  },
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1endpoint"),
    (recording: string): string =>
      recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"sanitized"`),
    (recording: string): string =>
      recording.replace(
        /"repeatabilityRequestId"\s?:\s?"[^"]*"/g,
        `"repeatabilityRequestId":"sanitized"`
      ),
    (recording: string): string =>
      recording.replace(
        /"repeatabilityFirstSent"\s?:\s?"[^"]*"/g,
        `"repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"`
      ),
  ],
  queryParametersToSkip: [],
};

function createCredential(): TokenCredential {
  if (isPlaybackMode()) {
    return {
      getToken: async (_scopes) => {
        return { token: "testToken", expiresOnTimestamp: 11111 };
      },
    };
  } else {
    if (isNode) {
      return new DefaultAzureCredential();
    } else {
      return new ClientSecretCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        env.AZURE_CLIENT_SECRET
      );
    }
  }
}

export function createSmsClient(): SmsClient {
  // workaround: casting because min testing has issues with httpClient newer versions having extra optional fields
  return new SmsClient(env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING, {
    httpClient: createTestHttpClient(),
  } as SmsClientOptions);
}

export function createSmsClientWithToken(): SmsClient {
  const { endpoint } = parseConnectionString(env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING);
  const credential: TokenCredential = createCredential();
  // workaround: casting because min testing has issues with httpClient newer versions having extra optional fields
  return new SmsClient(endpoint, credential, {
    httpClient: createTestHttpClient(),
  } as SmsClientOptions);
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
