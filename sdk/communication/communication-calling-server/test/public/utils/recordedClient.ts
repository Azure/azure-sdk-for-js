// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential, DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { RecorderEnvironmentSetup, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { CallingServerClient } from "../../../src";
import { isNode } from "@azure/core-http";
import { parseConnectionString } from "@azure/communication-common";

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
  COMMUNICATION_LIVETEST_STATIC_RESOURCE_IDENTIFIER: "016a7064-0581-40b9-be73-6dde64d69d72",
  AZURE_PHONE_NUMBER: "+15551234567",
  ALTERNATE_CALLERID: "+18445764430",
  AUDIO_FILE_URI: "https://endpoint/acs-audio-files/sample-message.wav"
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1endpoint"),
    (recording: string): string => recording.replace("endpoint:443", "endpoint")
  ],
  queryParametersToSkip: []
};

function createCredential(): TokenCredential {
  if (isPlaybackMode()) {
    return {
      getToken: async (_scopes) => {
        return { token: "testToken", expiresOnTimestamp: 11111 };
      }
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

export function createCallingServerClient(): CallingServerClient {
  // workaround: casting because min testing has issues with httpClient newer versions having extra optional fields
  return new CallingServerClient(env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING);
}

export function createCallingServerClientWithToken(): CallingServerClient {
  const { endpoint } = parseConnectionString(env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING);
  const credential: TokenCredential = createCredential();
  // workaround: casting because min testing has issues with httpClient newer versions having extra optional fields
  return new CallingServerClient(endpoint, credential);
}
