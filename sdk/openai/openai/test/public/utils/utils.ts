// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import {
  PipelineRequest,
  PipelineResponse,
  createDefaultHttpClient,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { randomUUID } from "@azure/core-util";
import { KeyCredential } from "@azure/core-auth";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { createTestCredential } from "@azure-tools/test-credential";
import {
  Recorder,
  assertEnvironmentVariable,
  isLiveMode,
  isRecordMode,
} from "@azure-tools/test-recorder";
import { AzureSearchChatExtensionConfiguration, OpenAIKeyCredential } from "../../../src/index.js";
import {
  EnvironmentVariableNamesAzureCommon,
  EnvironmentVariableNamesForAzureSearch,
  EnvironmentVariableNamesForCompletions,
  EnvironmentVariableNamesForDalle,
  EnvironmentVariableNamesForWhisper,
  EnvironmentVariableNamesOpenAI,
} from "./envVars.js";
import { AuthMethod, DeploymentType } from "../types.js";

function toString(error: any): string {
  return error instanceof Error ? error.toString() + "\n" + error.stack : JSON.stringify(error);
}

export async function withDeployments<T>(
  deployments: string[],
  run: (model: string) => Promise<T>,
  validate: (result: T) => void,
): Promise<string[]> {
  const errors = [];
  const succeeded = [];
  assert.isNotEmpty(deployments, "No deployments found");
  let i = 0;
  for (const deployment of deployments) {
    try {
      console.log(`[${++i}/${deployments.length}] testing with ${deployment}`);
      const res = await run(deployment);
      if (!isRecordMode()) {
        validate(res);
      }
      succeeded.push(deployment);
    } catch (e) {
      const error = e as any;
      if (!e) continue;
      const errorStr = toString(error);
      if (
        ["OperationNotSupported", "model_not_found", "rate_limit_exceeded", "429", 400].includes(
          error.code,
        ) ||
        error.type === "invalid_request_error" ||
        error.name === "AbortError"
      ) {
        console.log(`Handled error: ${errorStr}`);
        continue;
      }
      console.warn(`Error in deployment ${deployment}: ${errorStr}`);
      errors.push(errorStr);
    }
  }
  if (errors.length > 0) {
    throw new Error(`Errors list: ${errors.join("\n")}`);
  }
  assert.isNotEmpty(succeeded, "No deployments succeeded");
  console.log(`Succeeded with (${succeeded.length}): ${succeeded.join(", ")}`);
  return succeeded;
}

export async function sendRequestWithRecorder(
  request: PipelineRequest,
  recorder: Recorder,
): Promise<PipelineResponse> {
  const client = createDefaultHttpClient();
  const pipeline = createEmptyPipeline();
  if (!isLiveMode()) {
    for (const p of recorder.configureClientOptions({}).additionalPolicies ?? []) {
      pipeline.addPolicy(p.policy);
    }
  }
  return pipeline.sendRequest(client, request);
}

async function listOpenAIModels(cred: KeyCredential, recorder: Recorder): Promise<string[]> {
  const request = createPipelineRequest({
    url: "https://api.openai.com/v1/models",
    headers: createHttpHeaders({
      Authorization: cred.key,
    }),
    method: "GET",
    timeout: 0,
    withCredentials: false,
    requestId: randomUUID(),
  });
  const response = await sendRequestWithRecorder(request, recorder);

  const body = JSON.parse(response.bodyAsText as string);
  type Model = { id: string; owned_by: string };
  const models = (body.data as Model[])
    .filter(({ owned_by }) => ["system", "openai"].includes(owned_by))
    .map(({ id }) => id);
  console.log(`Available models (${models.length}): ${models.join(", ")}`);
  return models;
}

async function listDeployments(
  subId: string,
  rgName: string,
  accountName: string,
  recorder: Recorder,
): Promise<string[]> {
  const deployments: string[] = [];
  const mgmtClient = new CognitiveServicesManagementClient(
    createTestCredential(),
    subId,
    recorder.configureClientOptions({}),
  );
  for await (const deployment of mgmtClient.deployments.list(rgName, accountName)) {
    const deploymentName = deployment.name;
    if (deploymentName) {
      deployments.push(deploymentName);
    }
  }
  console.log(`Available deployments (${deployments.length}): ${deployments.join(", ")}`);
  return deployments;
}

export function updateWithSucceeded(
  succeeded: string[],
  deployments: string[],
  models: string[],
  authMethod: AuthMethod,
): void {
  if (authMethod === "OpenAIKey") {
    if (models.length === 0) {
      models.push(...succeeded);
    }
  } else {
    if (deployments.length === 0) {
      deployments.push(...succeeded);
    }
  }
}

export function getSucceeded(
  authMethod: AuthMethod,
  deployments: string[],
  models: string[],
  succeededDeployments: string[],
  succeededModels: string[],
): string[] {
  if (authMethod === "OpenAIKey") {
    if (succeededModels.length > 0) {
      return succeededModels;
    }
    return models;
  } else {
    if (succeededDeployments.length > 0) {
      return succeededDeployments;
    }
    return deployments;
  }
}

function getAccountNameFromResourceType(deploymentType: DeploymentType): string {
  switch (deploymentType) {
    case "completions":
      return assertEnvironmentVariable(
        EnvironmentVariableNamesForCompletions.ACCOUNT_NAME_COMPLETIONS,
      );
    case "dalle":
      return assertEnvironmentVariable(EnvironmentVariableNamesForDalle.ACCOUNT_NAME_DALLE);
    case "whisper":
      return assertEnvironmentVariable(EnvironmentVariableNamesForWhisper.ACCOUNT_NAME_WHISPER);
  }
}

export async function getDeployments(
  deploymentType: DeploymentType,
  recorder: Recorder,
): Promise<string[]> {
  return listDeployments(
    assertEnvironmentVariable(EnvironmentVariableNamesAzureCommon.SUBSCRIPTION_ID),
    assertEnvironmentVariable(EnvironmentVariableNamesAzureCommon.RESOURCE_GROUP),
    getAccountNameFromResourceType(deploymentType),
    recorder,
  );
}

export async function getModels(recorder: Recorder): Promise<string[]> {
  return listOpenAIModels(
    new OpenAIKeyCredential(
      assertEnvironmentVariable(EnvironmentVariableNamesOpenAI.OPENAI_API_KEY),
    ),
    recorder,
  );
}

export async function bufferAsyncIterable<T>(iter: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = [];
  for await (const item of iter) {
    result.push(item);
  }
  return result;
}

export async function get(url: string, recorder: Recorder): Promise<PipelineResponse> {
  const request = createPipelineRequest({
    url,
    method: "GET",
    headers: createHttpHeaders(),
    streamResponseStatusCodes: new Set([200]),
  });
  return sendRequestWithRecorder(request, recorder);
}

export function createAzureSearchExtension(): AzureSearchChatExtensionConfiguration {
  return {
    type: "azure_search",
    endpoint: assertEnvironmentVariable(EnvironmentVariableNamesForAzureSearch.ENDPOINT_SEARCH),
    indexName: assertEnvironmentVariable(EnvironmentVariableNamesForAzureSearch.AZURE_SEARCH_INDEX),
    authentication: {
      type: "api_key",
      key: assertEnvironmentVariable(EnvironmentVariableNamesForAzureSearch.AZURE_API_KEY_SEARCH),
    },
  };
}
