// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, VitestTestContext } from "@azure-tools/test-recorder";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { ClientOptions } from "@azure-rest/core-client";
import type { ModelClient } from "@azure-rest/ai-inference";
import createClient from "@azure-rest/ai-inference";
import type { DeploymentType } from "../types.js";
import { AzureKeyCredential } from "@azure/core-auth";

const envSetupForPlayback: Record<string, string> = {
  AZURE_AAD_COMPLETIONS_ENDPOINT: "https://endpoint.openai.azure.com/openai/deployments/gpt-4o/",
  AZURE_EMBEDDINGS_ENDPOINT:
    "https://endpoint.openai.azure.com/openai/deployments/text-embedding-3-small/",
  AZURE_IMAGE_EMBEDDINGS_ENDPOINT: "https://endpoint.eastus2.models.ai.azure.com",
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
  return recorder;
}

function getEndpointFromResourceType(resourceType: DeploymentType): string {
  switch (resourceType) {
    case "imageEmbeddings":
      return assertEnvironmentVariable("AZURE_IMAGE_EMBEDDINGS_ENDPOINT");
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
  const credential =
    resourceType === "dummy" ? new AzureKeyCredential("foo") : createTestCredential();
  return createClient(
    getEndpointFromResourceType(resourceType),
    credential,
    recorder?.configureClientOptions(
      options ?? { credentials: { scopes: ["https://cognitiveservices.azure.com/.default"] } },
    ),
  );
}
