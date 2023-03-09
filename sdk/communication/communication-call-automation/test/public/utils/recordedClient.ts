// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { isNode } from "@azure/core-util";
import { Recorder, RecorderStartOptions, env, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { Test } from "mocha";
import { generateToken } from "./connectionUtils";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { CallAutomationClient } from "../../../src";

if (isNode) {
  dotenv.config();
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=redacted",
};

const fakeToken = generateToken();
export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    connectionStringSanitizers: [
      {
        fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"],
        actualConnString: env["COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"] || undefined,
      },
    ],
    bodyKeySanitizers: [{ jsonPath: "$.accessToken.token", value: fakeToken }],
  },
};

export async function createRecorder(context: Test | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.setMatcher("HeaderlessMatcher");
  return recorder;
}

export async function createTestUser(recorder: Recorder): Promise<CommunicationUserIdentifier> {
  const identityClient = new CommunicationIdentityClient(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"),
    recorder.configureClientOptions({})
  );
  return identityClient.createUser();
}

export async function deleteTestUser(testUser: CommunicationUserIdentifier): Promise<void> {
  if (testUser) {
    const identityClient = new CommunicationIdentityClient(
      assertEnvironmentVariable("COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING")
    );
    await identityClient.deleteUser(testUser);
  }
}

export function createCallAutomationClient(recorder: Recorder): CallAutomationClient {
  const connectionString = assertEnvironmentVariable("COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING");

  return new CallAutomationClient(
    connectionString,
    recorder.configureClientOptions({})
  );
}