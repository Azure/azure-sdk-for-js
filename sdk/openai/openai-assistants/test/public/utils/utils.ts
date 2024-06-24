// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure-tools/test-utils";
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
import { AuthMethod } from "./recordedClient.js";
import {
  Recorder,
  assertEnvironmentVariable,
  isLiveMode,
  isRecordMode,
} from "@azure-tools/test-recorder";
import { OpenAIKeyCredential } from "../../../src/index.js";

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
  for (const deployment of deployments) {
    try {
      console.log(`testing with ${deployment}`);
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
        ["OperationNotSupported", "model_not_found", "rate_limit_exceeded"].includes(error.code) ||
        error.type === "invalid_request_error"
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
  const models = body.data
    .map((model: { id: string }) => model.id)
    .filter((id: string) => !id.match(/fine/));
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
  void subId;
  void rgName;
  void accountName;
  void recorder;
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

export async function getDeployments(recorder: Recorder): Promise<string[]> {
  return listDeployments(
    assertEnvironmentVariable("SUBSCRIPTION_ID"),
    assertEnvironmentVariable("RESOURCE_GROUP"),
    assertEnvironmentVariable("ACCOUNT_NAME"),
    recorder,
  );
}

export async function getModels(recorder: Recorder): Promise<string[]> {
  return listOpenAIModels(
    new OpenAIKeyCredential(assertEnvironmentVariable("OPENAI_API_KEY")),
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
