// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { Recorder, RecorderEnvironmentSetup, env, record } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { EmailClient } from "../../../src";
import { isNode } from "@azure/core-http";
import { parseConnectionString } from "@azure/communication-common";

if (isNode) {
  dotenv.config();
}

export interface RecordedEmailClient {
  client: EmailClient;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_CONNECTION_STRING: "endpoint=https://someEndpoint/;accesskey=someAccessKeyw==",
  SENDER_ADDRESS: "someSender@contoso.com",
  RECIPIENT_ADDRESS: "someRecipient@domain.com",
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables: replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1someEndpoint"),
    (recording: string): string =>
      recording.replace(/("sender":)("(.*?)")/, "$1" + '"someSender@contoso.com"'),
    (recording: string): string =>
      recording.replace(/("email":)("(.*?)")/g, "$1" + '"someRecipient@domain.com"'),
    (recording: string): string =>
      recording.replace(
        /('Operation-Location',[\r\n] {2})'(.*?)'/,
        "$1" + '"someOperationLocation"'
      ),
    (recording: string): string =>
      recording.replace(
        /"operation-location"\s?:\s?"[^"]*"/g,
        '"operation-location": "someOperationLocation"'
      ),
    (recording: string): string =>
      recording.replace(/('x-ms-request-id',[\r\n] {2})'(.*?)'/, "$1" + '"someRequestId"'),
    (recording: string): string =>
      recording.replace(/"x-ms-request-id"\s?:\s?"[^"]*"/g, '"x-ms-request-id": "someRequestId"'),
    (recording: string): string =>
      recording.replace(/("messageId":)("(.*?)")/g, "$1" + '"someRequestId"'),
    (recording: string): string =>
      recording.replace(/emails\/[^"']*/g, "emails/someRequestId/status"),
  ],
  queryParametersToSkip: [],
};

export function createRecordedEmailClientWithConnectionString(
  context: Context
): RecordedEmailClient {
  const recorder = record(context, environmentSetup);

  return {
    client: new EmailClient(env.COMMUNICATION_CONNECTION_STRING),
    recorder,
  };
}

export function createRecordedEmailClientWithKeyCredential(context: Context): RecordedEmailClient {
  const recorder = record(context, environmentSetup);

  const { endpoint, credential } = parseConnectionString(env.COMMUNICATION_CONNECTION_STRING);

  return {
    client: new EmailClient(endpoint, credential),
    recorder,
  };
}
