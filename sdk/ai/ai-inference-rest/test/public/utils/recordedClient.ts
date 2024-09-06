// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Recorder,
  RecorderStartOptions,
  VitestTestContext,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { ClientOptions } from "@azure-rest/core-client";
import createClient, { ModelClient } from "../../../src/index.js";
import { DeploymentType } from "../types.js";
import { AzureKeyCredential } from "@azure/core-auth";

const envSetupForPlayback: Record<string, string> = {
  AZURE_AAD_COMPLETIONS_ENDPOINT: "https://endpoint.openai.azure.com/openai/deployments/gpt-4o/",
  AZURE_EMBEDDINGS_ENDPOINT: "https://endpoint.openai.azure.com/openai/deployments/text-embedding-3-small/",
  SUBSCRIPTION_ID: "azure_subscription_id"
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

function getEndpointFromResourceType(resourceType: DeploymentType): string {
  switch (resourceType) {
    case "embeddings":
      return assertEnvironmentVariable("AZURE_EMBEDDINGS_ENDPOINT");
    case "completions":
    case "dummy":
      return assertEnvironmentVariable("AZURE_AAD_COMPLETIONS_ENDPOINT");
    case resourceType as never:
      throw new Error("unexpected resource type");
  }
}

export async function createModelClient(
  resourceType: DeploymentType,
  recorder?: Recorder,
  options?: ClientOptions,
): Promise<ModelClient> {
  const credential = resourceType === "dummy" ? new AzureKeyCredential("foo") : createTestCredential()
  return createClient(getEndpointFromResourceType(resourceType), credential, recorder?.configureClientOptions(options ?? { credentials: { scopes: ["https://cognitiveservices.azure.com/.default"] } }));
}
