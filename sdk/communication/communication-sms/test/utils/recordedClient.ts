// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";
import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { isPlaybackMode, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";

export const recorderConfiguration: RecorderEnvironmentSetup = {
  replaceableVariables: {
    AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
    AZURE_PHONE_NUMBER: "+18005551234",
    AZURE_CLIENT_ID: "SomeClientId",
    AZURE_CLIENT_SECRET: "SomeClientSecret",
    AZURE_TENANT_ID: "SomeTenantId"
  },
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1endpoint"),
    (recording: string): string =>
      recording.replace(/"messageId"\s?:\s?"[^"]*"/g, `"messageId":"sanitized"`),
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
  if (isNode && isPlaybackMode()) {
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
