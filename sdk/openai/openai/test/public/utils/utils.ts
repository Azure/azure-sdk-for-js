// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "vitest";
import {
  PipelineRequest,
  PipelineResponse,
  createDefaultHttpClient,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { createTestCredential } from "@azure-tools/test-credential";
import {
  Recorder,
  assertEnvironmentVariable,
  isLiveMode,
  isRecordMode,
} from "@azure-tools/test-recorder";
import {
  EnvironmentVariableNamesAzureCommon,
  EnvironmentVariableNamesForAzureSearch,
  EnvironmentVariableNamesForCompletions,
  EnvironmentVariableNamesForDalle,
  EnvironmentVariableNamesForWhisper,
} from "./envVars.js";

export type AuthMethod = "AAD" | "DummyAPIKey";
export type DeploymentType = "dalle" | "whisper" | "completions";
export type APIVersion = "2024-05-01-preview" | "2024-02-01";

export const latestAPIPreview = "2024-05-01-preview" as const;
export const APIMatrix = ["2024-05-01-preview", "2024-02-01"] as const;
export const authTypes = ["AAD"] as AuthMethod[];
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
    // FIXME: Skip this deployment for "calling function" tests
    if (deployment === "gpt-35-turbo-0301"){
      continue;
    }
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
        ["OperationNotSupported", "model_not_found", "rate_limit_exceeded", "ModelDeprecated", "429", 400].includes(
          error.code,
        ) ||
        error.type === "invalid_request_error" ||
        error.name === "AbortError"
      ) {
        // console.log(`Handled error: ${errorStr}`);
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
  // console.log(`Available deployments (${deployments.length}): ${deployments.join(", ")}`);
  return deployments;
}

export function updateWithSucceeded(succeeded: string[], deployments: string[]): void {
  if (deployments.length === 0) {
    deployments.push(...succeeded);
  }
}

export function getSucceeded(deployments: string[], succeededDeployments: string[]): string[] {
  if (succeededDeployments.length > 0) {
    return succeededDeployments;
  }
  return deployments;
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

// TODO: Update this once we add Azure specific feature tests
export function createAzureSearchExtension(): {
  type: string;
  parameters: {
    endpoint: string;
    index_name: string;
    authentication: { type: string };
  };
} {
  return {
    type: "azure_search",
    parameters: {
      endpoint: assertEnvironmentVariable(
        EnvironmentVariableNamesForAzureSearch.AZURE_SEARCH_ENDPOINT,
      ),
      index_name: assertEnvironmentVariable(
        EnvironmentVariableNamesForAzureSearch.AZURE_SEARCH_INDEX,
      ),
      authentication: {
        type: "system_assigned_managed_identity",
      },
    },
  };
}
