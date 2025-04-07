// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, SanitizerOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { CommunicationIdentityClient } from "../../../src/index.js";
import { createTestCredential } from "@azure-tools/test-credential";
import * as MOCKS from "../../utils/constants.js";
import { getConnectionString, getEndpoint } from "../../utils/injectables.js";

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: getConnectionString(),
      fakeConnString: MOCKS.CONNECTION_STRING,
    },
  ],
  generalSanitizers: [
    { regex: true, target: `"token"\\s?:\\s?"[^"]*"`, value: `"token":"sanitized"` },
    { regex: true, target: `"id"\\s?:\\s?"[^"]*"`, value: `"id":"sanitized"` },
    { regex: true, target: `"appId"\\s?:\\s?"[^"]*"`, value: `"appId":"sanitized"` },
    { regex: true, target: `"userId"\\s?:\\s?"[^"]*"`, value: `"userId":"sanitized"` },
    {
      regex: true,
      target: `[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}`,
      value: `sanitized`,
    },
    {
      regex: true,
      target: "8:acs:[A-Za-z0-9-_]+",
      value: "Sanitized",
    },
  ],
  uriSanitizers: [
    {
      regex: true,
      target: `(.*)/identities/(?<secret_content>.*?)[/|?](.*)`,
      value: "sanitized",
      groupForReplace: "secret_content",
    },
    {
      target: getEndpoint(),
      value: MOCKS.ENDPOINT,
    },
  ],
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {},
  sanitizerOptions: sanitizerOptions,
  removeCentralSanitizers: ["AZSDK4001"],
};

export async function createRecorder(context: TestInfo | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.setMatcher("CustomDefaultMatcher", {
    excludedHeaders: [
      "Accept-Language", // This is env-dependent
      "x-ms-content-sha256", // This is dependent on the current datetime
    ],
  });
  return recorder;
}

export async function createRecordedCommunicationIdentityClient(
  context: TestInfo,
): Promise<RecordedClient<CommunicationIdentityClient>> {
  const recorder = await createRecorder(context);

  const client = new CommunicationIdentityClient(
    getConnectionString(),
    recorder.configureClientOptions({}),
  );

  return {
    client,
    recorder,
  };
}

export async function createRecordedCommunicationIdentityClientWithToken(
  context: TestInfo,
): Promise<RecordedClient<CommunicationIdentityClient>> {
  const recorder = await createRecorder(context);
  const client = new CommunicationIdentityClient(
    getEndpoint(),
    createTestCredential(),
    recorder.configureClientOptions({}),
  );

  return { client, recorder };
}
