// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, SanitizerOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { ChatClient } from "../../../src/index.js";
import type { CommunicationUserIdentifier } from "@azure/communication-common";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import type { CommunicationUserToken } from "@azure/communication-identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import { generateToken } from "./connectionUtils.js";
import { NoOpCredential } from "@azure-tools/test-credential";
import { getConnectionString } from "../../utils/injectables.js";
import * as MOCKS from "../../utils/constants.js";
import { getEndpoint, isPlaybackMode } from "../../utils/injectables.js";

export interface RecordedClient {
  chatClient: ChatClient;
  recorder: Recorder;
}

const fakeToken = generateToken();
const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: getConnectionString(),
      fakeConnString: MOCKS.CONNECTION_STRING,
    },
  ],
  bodyKeySanitizers: [
    {
      jsonPath: "$.accessToken.token",
      value: fakeToken,
    },
  ],
  generalSanitizers: [
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
  removeCentralSanitizers: [
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
    "AZSDK4001",
  ],
};

export async function createTestUser(recorder: Recorder): Promise<CommunicationUserToken> {
  const identityClient = new CommunicationIdentityClient(
    getEndpoint(),
    createTestCredential(),
    recorder.configureClientOptions({}),
  );
  return identityClient.createUserAndToken(["chat"]);
}

export async function deleteTestUser(testUser: CommunicationUserIdentifier): Promise<void> {
  if (testUser) {
    const identityClient = new CommunicationIdentityClient(getEndpoint(), createTestCredential());
    await identityClient.deleteUser(testUser);
  }
}

export async function createRecorder(context: TestInfo | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  return recorder;
}

export function createChatClient(userToken: string, recorder: Recorder): ChatClient {
  return new ChatClient(
    getEndpoint(),
    isPlaybackMode()
      ? new NoOpAzureCommunicationTokenCredential()
      : new AzureCommunicationTokenCredential(userToken === "token" ? generateToken() : userToken),
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
