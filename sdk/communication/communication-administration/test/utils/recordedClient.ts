// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import {
  env,
  Recorder,
  record,
  RecorderEnvironmentSetup,
  isPlaybackMode
} from "@azure/test-utils-recorder";
import { isNode, TokenCredential } from "@azure/core-http";
import { CommunicationIdentityClient, PhoneNumberAdministrationClient } from "../../src";
import { DefaultAzureCredential } from "@azure/identity";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
  INCLUDE_PHONENUMBER_LIVE_TESTS: "false",
  COMMUNICATION_ENDPOINT_STRING: "https://endpoint/",
  AZURE_CLIENT_ID: "SomeClientId",
  AZURE_CLIENT_SECRET: "SomeClientSecret",
  AZURE_TENANT_ID: "SomeTenantId"
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording.replace(/"token"\s?:\s?"[^"]*"/g, `"token":"sanitized"`),
    (recording: string): string => recording.replace(/(https:\/\/)([^\/',]*)/, "$1endpoint"),
    /**
     * Must replace date saved to tokensValidFrom as to not
     * break playback tests.
     */
    (recording: string): string => {
      return recording.replace(
        /"tokensValidFrom"\s?:\s?"[^"]*"/g,
        `"tokensValidFrom":"2020-10-10T00:00:00.000Z"`
      );
    },
    (recording: string): string => recording.replace(/"id"\s?:\s?"[^"]*"/g, `"id":"sanitized"`),
    (recording: string): string => {
      return recording.replace(
        /(https:\/\/[^\/',]*\/identities\/)[^\/',]*(\/token)/,
        "$1sanitized$2"
      );
    },
    (recording: string): string =>
      recording.replace(/\/identities\/[^\/'",]*/, "/identities/sanitized"),
    (recording: string): string => recording.replace(/\+\d{1}\d{3}\d{3}\d{4}/g, "+18005551234"),
    (recording: string): string =>
      recording.replace(/[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/gi, "sanitized")
  ],
  queryParametersToSkip: []
};

export function createRecordedCommunicationIdentityClient(
  context: Context,
  withToken: boolean = false
): RecordedClient<CommunicationIdentityClient> {
  try {
    const recorder = record(context, environmentSetup);

    if (!withToken) {
      return {
        client: new CommunicationIdentityClient(env.COMMUNICATION_CONNECTION_STRING),
        recorder
      };
    }
    
    let credential: TokenCredential = isPlaybackMode()
      ? {
          getToken: async (_scopes) => {
            return { token: "testToken", expiresOnTimestamp: 11111 };
          }
        }
      : new DefaultAzureCredential();

    return {
      client: new CommunicationIdentityClient(env.COMMUNICATION_ENDPOINT_STRING, credential),
      recorder
    };
  } catch (e) {
    throw e;
  }
}

export function createRecordedPhoneNumberAdministrationClient(
  context: Context
): RecordedClient<PhoneNumberAdministrationClient> & {
  includePhoneNumberLiveTests: boolean;
} {
  const recorder = record(context, environmentSetup);

  return {
    client: new PhoneNumberAdministrationClient(env.COMMUNICATION_CONNECTION_STRING),
    recorder,
    includePhoneNumberLiveTests: env.INCLUDE_PHONENUMBER_LIVE_TESTS == "true"
  };
}

export const testPollerOptions = {
  pollInterval: isPlaybackMode() ? 0 : undefined
};
