// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import {
  DefaultHttpClient,
  HttpClient,
  HttpOperationResponse,
  isNode,
  WebResourceLike
} from "@azure/core-http";
import { ChatClient } from "../../../src";
import {
  CommunicationUserIdentifier,
  AzureCommunicationTokenCredential,
  parseClientArguments
} from "@azure/communication-common";
import { CommunicationIdentityClient, CommunicationUserToken } from "@azure/communication-identity";
import { generateToken } from "./connectionUtils";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient {
  chatClient: ChatClient;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana"
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/"token"\s?:\s?"[^"]*"/g, `"token":"token"`),
    (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1endpoint"),
    (recording: string): string => recording.replace("endpoint:443", "endpoint")
  ],
  queryParametersToSkip: []
};

export async function createTestUser(): Promise<CommunicationUserToken> {
  const identityClient = new CommunicationIdentityClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);
  return identityClient.createUserAndToken(["chat"]);
}

export async function deleteTestUser(testUser: CommunicationUserIdentifier): Promise<void> {
  if (testUser) {
    const identityClient = new CommunicationIdentityClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);
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
  const { url } = parseClientArguments(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);

  return new ChatClient(url, new AzureCommunicationTokenCredential(userToken), {
    httpClient: createTestHttpClient()
  });
}

function createTestHttpClient(): HttpClient {
  const customHttpClient = new DefaultHttpClient();

  const originalSendRequest = customHttpClient.sendRequest;
  customHttpClient.sendRequest = async function(
    httpRequest: WebResourceLike
  ): Promise<HttpOperationResponse> {
    const requestResponse = await originalSendRequest.apply(this, [httpRequest]);

    console.log(
      `MS-CV header for request: ${httpRequest.url} (${
        requestResponse.status
      } - ${requestResponse.headers.get("ms-cv")})`
    );

    return requestResponse;
  };

  return customHttpClient;
}
