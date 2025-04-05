// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, SanitizerOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import type { CommunicationUserIdentifier } from "@azure/communication-common";
import { createTestCredential } from "@azure-tools/test-credential";
import { RoomsClient } from "../../../src/index.js";
import type { CommunicationUserToken } from "@azure/communication-identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import { generateToken } from "./connectionUtils.js";
import { getConnectionString, getEndpoint } from "../../utils/injectables.js";
import * as MOCKS from "../../utils/constants.js";

export interface RecordedClient<T> {
  client: T;
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

export async function createRecorder(context: TestInfo | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.setMatcher("HeaderlessMatcher");
  return recorder;
}

export async function createRecordedRoomsClient(
  context: TestInfo,
): Promise<RecordedClient<RoomsClient>> {
  const recorder = await createRecorder(context);

  const client = new RoomsClient(getConnectionString(), recorder.configureClientOptions({}));
  return {
    client,
    recorder,
  };
}

export async function createRecordedRoomsClientWithToken(
  context: TestInfo,
): Promise<RecordedClient<RoomsClient>> {
  const recorder = await createRecorder(context);
  const client = new RoomsClient(
    getEndpoint(),
    createTestCredential(),
    recorder.configureClientOptions({}),
  );
  return {
    client,
    recorder,
  };
}

export async function createTestUser(recorder: Recorder): Promise<CommunicationUserToken> {
  const identityClient = new CommunicationIdentityClient(
    getEndpoint(),
    createTestCredential(),
    recorder.configureClientOptions({}),
  );
  return identityClient.createUserAndToken(["voip"]);
}

export async function deleteTestUser(testUser: CommunicationUserIdentifier): Promise<void> {
  if (testUser) {
    const identityClient = new CommunicationIdentityClient(getEndpoint(), createTestCredential());
    await identityClient.deleteUser(testUser);
  }
}
