// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseConnectionString } from "@azure/communication-common";
import { DefaultHttpClient, HttpClient, HttpOperationResponse, isNode, WebResourceLike } from "@azure/core-http";
import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { env, isPlaybackMode, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { SmsClient } from "../../../src";

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
  return new SmsClient(env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING, {
    httpClient: createTestHttpClient()
  });
}

export function createSmsClientWithToken(credential: TokenCredential): SmsClient {
  const { endpoint } = parseConnectionString(env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING);

  return new SmsClient(endpoint, credential, {
    httpClient: createTestHttpClient()
  });
}

function createTestHttpClient(): HttpClient  {
  let customHttpClient = new DefaultHttpClient();

  var originalSendRequest = customHttpClient.sendRequest;
  customHttpClient.sendRequest = async function(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
    let requestResponse = await originalSendRequest.apply(this, [httpRequest]);

    if (requestResponse.status < 200 || requestResponse.status > 299)
      console.log(`MS-CV header for failed request: ${requestResponse.headers.get("ms-cv")}`);

    return requestResponse;
  };

  return customHttpClient;
}
