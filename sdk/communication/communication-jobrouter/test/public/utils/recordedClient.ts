// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import {
  DefaultHttpClient,
  HttpClient,
  HttpOperationResponse,
  WebResourceLike,
  isNode
} from "@azure/core-http";
import { Recorder, RecorderStartOptions, env } from "@azure-tools/test-recorder";
import { Test } from "mocha";
import { generateToken } from "./connectionUtils";

if (isNode) {
  dotenv.config();
}

export async function createRecorder(context: Test | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  return recorder;
}

export function createTestHttpClient(): HttpClient {
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

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana"
};

const fakeToken = generateToken();
export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    connectionStringSanitizers: [
      {
        fakeConnString: envSetupForPlayback["COMMUNICATION_CONNECTION_STRING"],
        actualConnString: env["COMMUNICATION_CONNECTION_STRING"] || undefined
      }
    ],
    bodyKeySanitizers: [{ jsonPath: "$.accessToken.token", value: fakeToken }]
  }
};
