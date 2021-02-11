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
import { PhoneNumberAdministrationClient } from "../../src";
import { DefaultAzureCredential } from "@azure/identity";
import { parseConnectionString } from "@azure/communication-common";

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

export function createRecordedPhoneNumberAdministrationClientWithToken(
  context: Context
):
  | (RecordedClient<PhoneNumberAdministrationClient> & {
      includePhoneNumberLiveTests: boolean;
    })
  | undefined {
  const recorder = record(context, environmentSetup);
  let credential: TokenCredential;
  const endpoint = parseConnectionString(env.COMMUNICATION_CONNECTION_STRING).endpoint;

  if (isPlaybackMode()) {
    credential = {
      getToken: async (_scopes) => {
        return { token: "testToken", expiresOnTimestamp: 11111 };
      }
    };

    return {
      client: new PhoneNumberAdministrationClient(endpoint, credential),
      recorder,
      includePhoneNumberLiveTests: env.INCLUDE_PHONENUMBER_LIVE_TESTS == "true"
    };
  }

  try {
    credential = new DefaultAzureCredential();
  } catch {
    return undefined;
  }

  return {
    client: new PhoneNumberAdministrationClient(endpoint, credential),
    recorder,
    includePhoneNumberLiveTests: env.INCLUDE_PHONENUMBER_LIVE_TESTS == "true"
  };
}

export const testPollerOptions = {
  pollInterval: isPlaybackMode() ? 0 : undefined
};
