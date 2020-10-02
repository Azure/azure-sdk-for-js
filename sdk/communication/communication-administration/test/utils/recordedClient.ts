// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import { CommunicationIdentityClient } from "../../src";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient {
  client: CommunicationIdentityClient;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana"
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
      recording.replace(/\/identities\/[^\/'",]*/, "/identities/sanitized")
  ],
  queryParametersToSkip: []
};

export function createRecordedCommunicationIdentityClient(context: Context): RecordedClient {
  const recorder = record(context, environmentSetup);

  return {
    client: new CommunicationIdentityClient(env.COMMUNICATION_CONNECTION_STRING),
    recorder
  };
}
