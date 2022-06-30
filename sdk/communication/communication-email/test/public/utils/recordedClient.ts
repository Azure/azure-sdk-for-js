// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context, Test } from "mocha";
import { Recorder, SanitizerOptions, env } from "@azure-tools/test-recorder";
import { EmailClient } from "../../../src";

export interface RecordedEmailClient {
  client: EmailClient;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_CONNECTION_STRING: "endpoint=https://someEndpoint/;accesskey=someAccessKeyw==",
  SENDER_ADDRESS: "someSender@contoso.com",
  RECIPIENT_ADDRESS: "someRecipient@domain.com",
};

const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: env.COMMUNICATION_CONNECTION_STRING,
      fakeConnString: envSetupForPlayback["COMMUNICATION_CONNECTION_STRING"],
    },
  ],
  headerSanitizers: [
    { key: "repeatability-first-sent", value: "Sanitized" },
    { key: "repeatability-request-id", value: "Sanitized" },
    { key: "x-ms-client-request-id", value: "Sanitized" },
    { key: "x-ms-date", value: "Sanitized" },
    { key: "Date", value: "Sanitized" },
    { key: "Date", value: "Sanitized" },
    { key: "X-Azure-Ref", value: "Sanitized" },
    { key: "x-ms-request-id", value: "Sanitized" },
    { key: "Operation-Location", value: "https://someEndpoint/emails/someMessageId/status" },
  ],
  uriSanitizers: [
    {
      regex: true,
      target: `emails/.*/status`,
      value: "emails/Sanitized/status",
    },
  ],
  bodySanitizers: [
    {
      regex: true,
      target: `"messageId"\\s?:\\s?"[^"]*"`,
      value: `"messageId":"Sanitized"`,
    },
  ],
};

export async function createRecorder(context: Test | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start({ envSetupForPlayback });
  await recorder.addSanitizers(sanitizerOptions, ["record", "playback"]);
  await recorder.setMatcher("CustomDefaultMatcher", {
    excludedHeaders: [
      "Accept-Language", // This is env-dependent
      "x-ms-content-sha256", // This is dependent on the current datetime
    ],
  });
  return recorder;
}

export async function createRecordedEmailClientWithConnectionString(
  context: Context
): Promise<RecordedEmailClient> {
  const recorder = await createRecorder(context.currentTest);

  const client = new EmailClient(
    env.COMMUNICATION_CONNECTION_STRING ?? "",
    recorder.configureClientOptions({})
  );
  return {
    client: client,
    recorder,
  };
}
