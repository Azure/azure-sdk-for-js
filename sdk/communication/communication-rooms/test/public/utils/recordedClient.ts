// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  SanitizerOptions,
  assertEnvironmentVariable,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { TokenCredential } from "@azure/core-auth";
import { CommunicationUserIdentifier, parseConnectionString } from "@azure/communication-common";
import { createTestCredential } from "@azure-tools/test-credential";
import { Context, Test } from "mocha";
import { RoomsClient } from "../../../src";
import { CommunicationIdentityClient, CommunicationUserToken } from "@azure/communication-identity";
import { generateToken } from "./connectionUtils";

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
};

const fakeToken = generateToken();
const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: env["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"] || undefined,
      fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"],
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
  ],
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: sanitizerOptions,
};

export async function createRecorder(context: Test | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.setMatcher("HeaderlessMatcher");
  return recorder;
}

export async function createRecordedRoomsClient(
  context: Context
): Promise<RecordedClient<RoomsClient>> {
  const recorder = await createRecorder(context.currentTest);

  const client = new RoomsClient(
    env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING ?? "",
    recorder.configureClientOptions({})
  );
  return {
    client,
    recorder,
  };
}

export async function createRecordedRoomsClientWithToken(
  context: Context
): Promise<RecordedClient<RoomsClient>> {
  const recorder = await createRecorder(context.currentTest);

  let credential: TokenCredential;
  const endpoint = parseConnectionString(
    env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING ?? ""
  ).endpoint;

  if (isPlaybackMode()) {
    credential = {
      getToken: async (_scopes: any) => {
        return { token: "testToken", expiresOnTimestamp: 11111 };
      },
    };
  } else {
    credential = createTestCredential();
  }

  const client = new RoomsClient(endpoint, credential, recorder.configureClientOptions({}));
  return {
    client,
    recorder,
  };
}

export async function createTestUser(recorder: Recorder): Promise<CommunicationUserToken> {
  const identityClient = new CommunicationIdentityClient(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"),
    recorder.configureClientOptions({})
  );
  return identityClient.createUserAndToken(["voip"]);
}

export async function deleteTestUser(testUser: CommunicationUserIdentifier): Promise<void> {
  if (testUser) {
    const identityClient = new CommunicationIdentityClient(
      assertEnvironmentVariable("COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING")
    );
    await identityClient.deleteUser(testUser);
  }
}
