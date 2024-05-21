// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  Recorder,
  RecorderStartOptions,
  VitestTestContext,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";

import createFaceClient, { FaceClient, FaceClientOptions } from "../../../src/index.js";

const envSetupForPlayback: Record<string, string> = {
  FACE_ENDPOINT: "https://faceendpoint.cognitiveservices.azure.com/",
  FACE_APIKEY: "faceapikey",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: [
    "AZSDK3430",// $..id in the response body is not a secret, it is a random generated id used through recorder.variable()
    "AZSDK2030",// "operation-location" is not a secret in itself, main endpoint is masked through other sanitizers (envSetupForPlayback and generalSanitizers) 
    "AZSDK3496" // $..resourceLocation is not a secret in itself, main endpoint is masked through other sanitizers (envSetupForPlayback and generalSanitizers) 
  ]
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  await recorder.addSanitizers(
    {
      removeHeaderSanitizer: { headersForRemoval: ["Ocp-Apim-Subscription-Key"] },
      generalSanitizers: [
        {
          regex: true,
          target: "https://[a-zA-Z0-9-]*\\.cognitiveservices\\.azure\\.com/",
          value: "https://fakeendpoint.cognitiveservices.azure.com/",
        },
      ],
      bodyKeySanitizers: [{ jsonPath: "authToken", value: "fakeauthtoken" }],
    },
    ["record", "playback"],
  );
  return recorder;
}

export async function createClient(
  recorder?: Recorder,
  options?: FaceClientOptions,
): Promise<FaceClient> {
  const endpoint = assertEnvironmentVariable("FACE_ENDPOINT");
  const apikey = assertEnvironmentVariable("FACE_APIKEY");
  const credential = new AzureKeyCredential(apikey);
  return createFaceClient(endpoint, credential, recorder?.configureClientOptions(options ?? {}));
}
