// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Test } from "mocha";

import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { ChatClient } from "../../../src";
import {
  AzureCommunicationTokenCredential,
  CommunicationUserIdentifier,
  parseClientArguments,
} from "@azure/communication-common";
import { CommunicationIdentityClient, CommunicationUserToken } from "@azure/communication-identity";
import { generateToken } from "./connectionUtils";
import { NoOpCredential } from "@azure-tools/test-credential";

export interface RecordedClient {
  chatClient: ChatClient;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
};

const fakeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTc2MzQ4MDguMTd9.Rx6RqlnKsM09viqebSbPDKRcUp3EIKDEHNVXq3Wb0ms";
export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    connectionStringSanitizers: [
      {
        fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"],
        actualConnString: env["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"] || undefined,
      },
    ],
    bodyKeySanitizers: [{ jsonPath: "$.accessToken.token", value: fakeToken }],
  },
  removeCentralSanitizers: [
    "AZSDK4001", // url need not be sanitized, fake conn string handles it already
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export async function createTestUser(recorder: Recorder): Promise<CommunicationUserToken> {
  const identityClient = new CommunicationIdentityClient(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"),
    recorder.configureClientOptions({}),
  );
  return identityClient.createUserAndToken(["chat"]);
}

export async function deleteTestUser(testUser: CommunicationUserIdentifier): Promise<void> {
  if (testUser) {
    const identityClient = new CommunicationIdentityClient(
      assertEnvironmentVariable("COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"),
    );
    await identityClient.deleteUser(testUser);
  }
}

export async function createRecorder(context: Test | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  return recorder;
}

export function createChatClient(userToken: string, recorder: Recorder): ChatClient {
  if (userToken === "token") {
    userToken = generateToken();
  }
  const { url } = parseClientArguments(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"),
  );

  return new ChatClient(
    url,
    isPlaybackMode()
      ? new NoOpAzureCommunicationTokenCredential()
      : new AzureCommunicationTokenCredential(userToken),
    recorder.configureClientOptions({}),
  );
}

/**
 * `TokenCredential` implementation for playback.
 * If your regular AAD credentials don't take the recorder httpClient option, the AAD traffic won't be recorded.
 * In this case, you'll need to bypass the AAD requests with no-op.
 *
 * Using this NoOpAzureCommunicationTokenCredential as your credential in playback mode would help you bypass the AAD traffic.
 */
export class NoOpAzureCommunicationTokenCredential extends NoOpCredential {
  public dispose(): void {
    /* intentionally empty */
  }
}
