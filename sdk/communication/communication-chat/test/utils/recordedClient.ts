// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import { ChatClient } from "../../src";
import {
  CommunicationUserIdentifier,
  AzureCommunicationTokenCredential,
  parseClientArguments
} from "@azure/communication-common";
import { CommunicationIdentityClient, CommunicationUserToken } from "@azure/communication-identity";
import { generateToken } from "./connectionUtils";
import { CommunicationIdentifierModel } from "../../src/generated/src/models/index";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient {
  chatClient: ChatClient;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana"
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/"token"\s?:\s?"[^"]*"/g, `"token":"token"`),
    (recording: string): string => recording.replace(/(https:\/\/)([^\/',]*)/, "$1endpoint"),
    (recording: string): string => recording.replace("endpoint:443", "endpoint")
  ],
  queryParametersToSkip: []
};

export async function createTestUser(): Promise<CommunicationUserToken> {
  const identityClient = new CommunicationIdentityClient(env.COMMUNICATION_CONNECTION_STRING);
  return await identityClient.createUserWithToken(["chat"]);
}

export function getCommunicationIdentifier(
  user: CommunicationUserIdentifier
): CommunicationIdentifierModel {
  return {
    communicationUser: { id: user.communicationUserId }
  };
}

export async function deleteTestUser(testUser: CommunicationUserIdentifier) {
  if (testUser) {
    const identityClient = new CommunicationIdentityClient(env.COMMUNICATION_CONNECTION_STRING);
    await identityClient.deleteUser(testUser);
  }
}

export function createRecorder(context: Context): Recorder {
  const recorder = record(context, environmentSetup);
  return recorder;
}

export function createChatClient(userToken: string): ChatClient {
  if (userToken === "token") {
    userToken = generateToken();
  }
  const { url } = parseClientArguments(env.COMMUNICATION_CONNECTION_STRING);
  return new ChatClient(url, new AzureCommunicationTokenCredential(userToken));
}
