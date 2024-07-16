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
import { DeploymentType } from "../types.js";

const envSetupForPlayback: Record<string, string> = {
  AZURE_ENDPOINT: "https://endpoint.openai.azure.com/openai/deployments/gpt-4o/",
  AZURE_EMBEDDINGS_ENDPOINT: "https://endpoint.openai.azure.com/openai/deployments/text-embedding-ada-002/",
  SUBSCRIPTION_ID: "azure_subscription_id",
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

function getEndpointAndAPIKeyFromResourceType(resourceType: DeploymentType): {
  endpoint: string;
  apiKey: string;
} {
  switch (resourceType) {
    case "embeddings":
      return {
        endpoint: assertEnvironmentVariable("AZURE_EMBEDDINGS_ENDPOINT"),
        apiKey: assertEnvironmentVariable("AZURE_EMBEDDINGS_CLIENT_SECRET"),
      };
    case "completions":
      return {
        endpoint: assertEnvironmentVariable("AZURE_ENDPOINT"),
        apiKey: assertEnvironmentVariable("AZURE_CLIENT_SECRET"),
      };
  }
}

export async function createModelClient(
  resourceType: DeploymentType,
  recorder?: Recorder,
  options?: ClientOptions,
): Promise<ModelClient> {
  const { endpoint, apiKey } = getEndpointAndAPIKeyFromResourceType(resourceType);
  const credential = new AzureKeyCredential(apiKey);
  return createClient(endpoint, credential, recorder?.configureClientOptions(options ?? {}));
}
