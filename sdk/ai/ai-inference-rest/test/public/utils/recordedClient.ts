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
import createClient, { ModelClient } from "../../../src/index.js";

const envSetupForPlayback: Record<string, string> = {
  AZURE_ENDPOINT: "https://endpoint.openai.azure.com/openai/deployments/gpt-4o/",
  AZURE_EMBEDDINGS_ENDPOINT: "https://endpoint.openai.azure.com/openai/deployments/text-embedding-ada-002/",
  SUBSCRIPTION_ID: "azure_subscription_id",
  AZURE_CLIENT_SECRET: "azureclientsecret",
  AZURE_EMBEDDINGS_CLIENT_SECRET: "azureembeddingsclientsecret"
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
  return recorder;
}

export async function createModelClient(
  recorder?: Recorder,
  options?: ClientOptions,
): Promise<ModelClient> {
  const endpoint = assertEnvironmentVariable("AZURE_ENDPOINT");
  const apikey = assertEnvironmentVariable("AZURE_CLIENT_SECRET");
  const credential = new AzureKeyCredential(apikey);
  return createClient(endpoint, credential, recorder?.configureClientOptions(options ?? {}));
}

export async function createEmbeddingsClient(
  recorder?: Recorder,
  options?: ClientOptions,
): Promise<ModelClient> {
  const endpoint = assertEnvironmentVariable("AZURE_EMBEDDINGS_ENDPOINT");
  const apikey = assertEnvironmentVariable("AZURE_EMBEDDINGS_CLIENT_SECRET");
  const credential = new AzureKeyCredential(apikey);
  return createClient(endpoint, credential, recorder?.configureClientOptions(options ?? {}));
}
