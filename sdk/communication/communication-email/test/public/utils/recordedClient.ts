// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { SanitizerOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { EmailClient } from "@azure/communication-email";
import {
  getConnectionString,
  getEndpoint,
  getRecipientAddress,
  getSecondRecipientAddress,
  getSenderAddress,
} from "../../utils/injectables.js";
import * as MOCKS from "../../utils/constants.js";
import { createTestCredential } from "@azure-tools/test-credential";

export interface RecordedEmailClient {
  client: EmailClient;
  recorder: Recorder;
}

const sanitizerOptions: SanitizerOptions = {
  headerSanitizers: [
    { key: "x-ms-content-sha256", value: "Sanitized" },
    {
      key: "operation-location",
      value: MOCKS.ENDPOINT,
      target: getEndpoint(),
    },
  ],
  uriSanitizers: [
    {
      target: getEndpoint(),
      value: MOCKS.ENDPOINT,
    },
  ],
  connectionStringSanitizers: [
    {
      actualConnString: getConnectionString(),
      fakeConnString: MOCKS.CONNECTION_STRING,
    },
  ],
  bodySanitizers: [
    {
      regex: true,
      target: `"id"\\s?:\\s?"[^"]*"`,
      value: `"id":"someId"`,
    },
    {
      target: getSenderAddress(),
      value: MOCKS.SENDER_ADDRESS,
    },
    {
      target: getRecipientAddress(),
      value: MOCKS.RECIPIENT_ADDRESS,
    },
    {
      target: getSecondRecipientAddress(),
      value: MOCKS.SECOND_RECIPIENT_ADDRESS,
    },
  ],
};

export async function createRecorder(context: TestInfo | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start({
    envSetupForPlayback: {},
    removeCentralSanitizers: ["AZSDK4001", "AZSDK2030"],
  });
  await recorder.addSanitizers(sanitizerOptions, ["record", "playback"]);
  await recorder.setMatcher("CustomDefaultMatcher", {
    excludedHeaders: [
      "Accept-Language", // This is env-dependent
      "x-ms-content-sha256", // This is dependent on the current datetime
    ],
  });
  return recorder;
}

export async function createClient(context: TestInfo): Promise<RecordedEmailClient> {
  const recorder = await createRecorder(context);

  const client = new EmailClient(
    getEndpoint(),
    createTestCredential(),
    recorder.configureClientOptions({}),
  );
  return {
    client: client,
    recorder,
  };
}
