// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  VitestTestContext,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";

import createFaceClient, { FaceClient, FaceClientOptions } from "../../../src/index.js";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
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
  options?: ClientOptions,
): Promise<FaceClient> {
  const endpoint = assertEnvironmentVariable("FACE_ENDPOINT");
  const apikey = assertEnvironmentVariable("FACE_APIKEY");
  const credential = new AzureKeyCredential(apikey);
  return createFaceClient(
    endpoint,
    credential,
    recorder?.configureClientOptions(options ?? {}) as FaceClientOptions,
  );
}
