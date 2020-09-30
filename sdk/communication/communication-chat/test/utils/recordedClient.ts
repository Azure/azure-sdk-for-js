// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import { ChatClient } from "../../src";
import { CommunicationUser, AzureCommunicationUserCredential } from "@azure/communication-common";
import {
  CommunicationIdentityClient,
  CommunicationUserToken
} from "@azure/communication-administration";
import { generateToken } from "./connectionUtils";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient {
  chatClient: ChatClient;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
  BASE_URL: "https://endpoint"
};

export const testEnv = new Proxy(replaceableVariables, {
  get: (target, key: string) => {
    return env[key] || target[key];
  }
});

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/"token"\s?:\s?"[^"]*"/g, `"token":"token"`),
    (recording: string): string => recording.replace(/(https:\/\/)([^\/',]*)/, "$1endpoint"),
    (recording: string): string => recording.replace("endpoint:443", "endpoint")
  ],
  queryParametersToSkip: []
};

export async function createTestUser(
  connectionString: string = testEnv.COMMUNICATION_CONNECTION_STRING
): Promise<CommunicationUserToken> {
  const identityClient = new CommunicationIdentityClient(connectionString);
  const testUser = await identityClient.createUser();
  return await identityClient.issueToken(testUser, ["chat"]);
}

export async function deleteTestUser(
  testUser: CommunicationUser,
  connectionString: string = testEnv.COMMUNICATION_CONNECTION_STRING
) {
  if (testUser) {
    const identityClient = new CommunicationIdentityClient(connectionString);
    await identityClient.deleteUser(testUser);
  }
}

export function createRecorder(context: Context): Recorder {
  const recorder = record(context, environmentSetup);
  return recorder;
}

export function createChatClient(
  userToken: string,
  baseUrl: string = testEnv.BASE_URL
): ChatClient {
  if (userToken === "token") {
    userToken = generateToken();
  }
  return new ChatClient(baseUrl, new AzureCommunicationUserCredential(userToken));
}
