// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseConnectionString } from "@azure/communication-common";
import {
  DefaultHttpClient,
  HttpClient,
  HttpOperationResponse,
  isNode,
  WebResourceLike
} from "@azure/core-http";
import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { env, isPlaybackMode, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { SmsClient, SmsClientOptions } from "../../../src";

export const recorderConfiguration: RecorderEnvironmentSetup = {
  replaceableVariables: {
    AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
    AZURE_PHONE_NUMBER: "+14255550123",
    AZURE_CLIENT_ID: "SomeClientId",
    AZURE_CLIENT_SECRET: "SomeClientSecret",
    AZURE_TENANT_ID: "SomeTenantId"
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
      )
  ],
  queryParametersToSkip: []
};

export function createCredential(): TokenCredential | undefined {
  if (isPlaybackMode() && isNode) {
    return {
      getToken: async (_scopes) => {
        return { token: "testToken", expiresOnTimestamp: 11111 };
      }
    };
  } else {
    try {
      return new DefaultAzureCredential();
    } catch {
      return undefined;
    }
  }
}

export function createSmsClient(): SmsClient {
  // workaround: casting because min testing has issues with httpClient newer versions having extra optional fields
  return new SmsClient(env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING, {
    httpClient: createTestHttpClient()
  } as SmsClientOptions);
}

export function createSmsClientWithToken(credential: TokenCredential): SmsClient {
  const { endpoint } = parseConnectionString(env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING);

  // workaround: casting because min testing has issues with httpClient newer versions having extra optional fields
  return new SmsClient(endpoint, credential, {
    httpClient: createTestHttpClient()
  } as SmsClientOptions);
}

function createTestHttpClient(): HttpClient {
  const customHttpClient = new DefaultHttpClient();

  const originalSendRequest = customHttpClient.sendRequest;
  customHttpClient.sendRequest = async function(
    httpRequest: WebResourceLike
  ): Promise<HttpOperationResponse> {
    const requestResponse = await originalSendRequest.apply(this, [httpRequest]);

    console.log(`MS-CV header for request: ${requestResponse.headers.get("ms-cv")} (${requestResponse.status} - ${httpRequest.url})`);

    return requestResponse;
  };

  return customHttpClient;
}
