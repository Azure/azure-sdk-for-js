// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import { CommunicationIdentityClient, PhoneNumberAdministrationClient } from "../../src";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
  SHOULD_RUN_TNM_TESTS: "false"
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
    (recording: string): string =>
      recording.replace(/"phoneNumber"\s?:\s?"[^"]*"/g, `"phoneNumber":"+18005551234"`),
    (recording: string): string =>
      recording.replace(/"phonePlanIds"\s?:\s?"[^"]*"/g, `"phonePlanIds":"["phone-plan-id-1"]`)
  ],
  queryParametersToSkip: []
};

export function createRecordedCommunicationIdentityClient(
  context: Context
): RecordedClient<CommunicationIdentityClient> {
  const recorder = record(context, environmentSetup);

  return {
    client: new CommunicationIdentityClient(env.COMMUNICATION_CONNECTION_STRING),
    recorder
  };
}

export function createRecordedPhoneNumberAdministrationClient(
  context: Context
): RecordedClient<PhoneNumberAdministrationClient> & {
  shouldRunTNMTests: boolean;
} {
  const recorder = record(context, environmentSetup);

  return {
    client: new PhoneNumberAdministrationClient(env.COMMUNICATION_CONNECTION_STRING),
    recorder,
    shouldRunTNMTests: env.SHOULD_RUN_TNM_TESTS === "true"
  };
}
