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
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import {
  EnvironmentVariableNamesAzureCommon,
  EnvironmentVariableNamesForAzureSearch,
  EnvironmentVariableNamesForCompletions,
  EnvironmentVariableNamesForDalle,
  EnvironmentVariableNamesForWhisper,
} from "./envVars.js";
import { logger } from "@azure/identity";

export type AuthMethod = "AAD" | "DummyAPIKey";
export type DeploymentType = "dalle" | "whisper" | "completions";
export enum APIVersion {
  Latest = "2024-05-01-preview",
  Stable = "2024-06-01",
  OpenAI = "OpenAI",
}
export const latestAPIPreview = APIVersion.Latest;
export const APIMatrix = [APIVersion.Latest, APIVersion.Stable];
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
    if (deployment === "gpt-35-turbo-0301") {
      continue;
    }
    try {
      logger.info(`[${++i}/${deployments.length}] testing with ${deployment}`);
      const res = await run(deployment);
      validate(res);
      succeeded.push(deployment);
    } catch (e) {
      const error = e as any;
      if (!e) continue;
      const errorStr = toString(error);
      if (
        [
          "OperationNotSupported",
          "model_not_found",
          "rate_limit_exceeded",
          "ModelDeprecated",
          "429",
          400,
        ].includes(error.code) ||
        error.type === "invalid_request_error" ||
        error.name === "AbortError" ||
        errorStr.includes("JSON parse failure")
      ) {
        logger.info(`Handled error: ${errorStr}`);
        continue;
      }
      logger.warning(`Error in deployment ${deployment}: ${errorStr}`);
      errors.push(errorStr);
    }
  }
  if (errors.length > 0) {
    throw new Error(`Errors list: ${errors.join("\n")}`);
  }
  assert.isNotEmpty(succeeded, "No deployments succeeded");
  logger.info(`Succeeded with (${succeeded.length}): ${succeeded.join(", ")}`);
  return succeeded;
}

export async function sendRequestWithRecorder(request: PipelineRequest): Promise<PipelineResponse> {
  const client = createDefaultHttpClient();
  const pipeline = createEmptyPipeline();
  return pipeline.sendRequest(client, request);
}

async function listDeployments(
  subId: string,
  rgName: string,
  accountName: string,
): Promise<string[]> {
  const deployments: string[] = [];
  const mgmtClient = new CognitiveServicesManagementClient(createTestCredential(), subId);
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

export async function getDeployments(deploymentType: DeploymentType): Promise<string[]> {
  return listDeployments(
    assertEnvironmentVariable(EnvironmentVariableNamesAzureCommon.SUBSCRIPTION_ID),
    assertEnvironmentVariable(EnvironmentVariableNamesAzureCommon.RESOURCE_GROUP),
    getAccountNameFromResourceType(deploymentType),
  );
}

export async function bufferAsyncIterable<T>(iter: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = [];
  for await (const item of iter) {
    result.push(item);
  }
  return result;
}

export async function get(url: string): Promise<PipelineResponse> {
  const request = createPipelineRequest({
    url,
    method: "GET",
    headers: createHttpHeaders(),
    streamResponseStatusCodes: new Set([200]),
  });
  return sendRequestWithRecorder(request);
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
