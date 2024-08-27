// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context, Test } from "mocha";
import { Recorder, RecorderStartOptions, SanitizerOptions, env } from "@azure-tools/test-recorder";
import MessageClient, { MessagesServiceClient } from "../../../src";
import { parseConnectionString } from "@azure/communication-common";
import { TokenCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";

export interface RecordedMessageClient {
  client: MessagesServiceClient;
  recorder: Recorder;
}

const envSetupForPlayback: Record<string, string> = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING:
    "endpoint=https://someEndpoint/;accesskey=someAccessKeyw==",
  CHANNEL_ID: "test_channel_id",
  RECIPIENT_PHONE_NUMBER: "+14255550123",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING,
      fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"],
    },
  ],
  generalSanitizers: [
    { regex: true, target: `"access_token"\\s?:\\s?"[^"]*"`, value: `"access_token":"sanitized"` },
    {
      regex: true,
      target: `"repeatabilityRequestId"\\s?:\\s?"[^"]*"`,
      value: `"repeatabilityRequestId":"sanitized"`,
    },
    {
      regex: true,
      target: `"repeatabilityFirstSent"\\s?:\\s?"[^"]*"`,
      value: `"repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"`,
    },
  ],
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: sanitizerOptions,
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Test | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  await recorder.setMatcher("CustomDefaultMatcher", {
    excludedHeaders: [
      "Accept-Language", // This is env-dependent
      "x-ms-content-sha256", // This is dependent on the current datetime
      "sec-ch-ua", // This is browser dependent
      // https://developer.mozilla.org/docs/Web/HTTP/Headers/Sec-CH-UA
    ],
  });
  return recorder;
}

export async function createRecorderWithToken(context: Context): Promise<RecordedMessageClient> {
  const recorder = await createRecorder(context.currentTest);

  const credential: TokenCredential = createTestCredential();
  const endpoint = parseConnectionString(
    env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING ?? "",
  ).endpoint;

  return {
    client: MessageClient(endpoint, credential, recorder.configureClientOptions({})),
    recorder,
  };
}

export async function createRecorderWithConnectionString(
  context: Context,
): Promise<RecordedMessageClient> {
  const recorder = await createRecorder(context.currentTest);

  const client = MessageClient(
    env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING ?? "",
    recorder.configureClientOptions({}),
  );

  return { client, recorder };
}
