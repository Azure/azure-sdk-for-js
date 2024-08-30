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
  COMMUNICATION_CONNECTION_STRING_EMAIL:
    "endpoint=https://someEndpoint/;accesskey=someAccessKeyw==",
  SENDER_ADDRESS: "someSender@contoso.com",
  RECIPIENT_ADDRESS: "someRecipient@domain.com",
};

const sanitizerOptions: SanitizerOptions = {
  headerSanitizers: [
    { key: "x-ms-content-sha256", value: "Sanitized" },
    {
      key: "Operation-Location",
      value: "https://someEndpoint/emails/operations/someId?api-version=2024-07-01-preview",
    },
  ],
  uriSanitizers: [
    {
      regex: true,
      target: `https://[^/]+/emails/operations/.*?api`,
      value: "https://someEndpoint/emails/operations/someId?api",
    },
    {
      regex: true,
      target: `https://[^/]+/emails:send\\?api`,
      value: "https://someEndpoint/emails:send?api-version=2024-07-01-preview",
    },
  ],
  bodySanitizers: [
    {
      regex: true,
      target: `"id"\\s?:\\s?"[^"]*"`,
      value: `"id":"someId"`,
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
  context: Context,
): Promise<RecordedEmailClient> {
  const recorder = await createRecorder(context.currentTest);

  const client = new EmailClient(
    env.COMMUNICATION_CONNECTION_STRING_EMAIL ?? "",
    recorder.configureClientOptions({}),
  );
  return {
    client: client,
    recorder,
  };
}
