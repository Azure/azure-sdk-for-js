// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "vitest";
import {
  PipelineRequest,
  PipelineResponse,
  RestError,
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
  EnvironmentVariableNamesForVision,
  EnvironmentVariableNamesForAudio,
} from "./envVars.js";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { createClientLogger } from "@azure/logger";
import { AzureChatExtensionConfiguration } from "../../../src/types/models.js";

const logger = createClientLogger("openai");

export const maxRetriesOption = { maxRetries: 0 };
export interface Metadata {
  foo: string;
}
export type DeploymentType = "vision" | "audio" | "completions";
export interface DeploymentInfo {
  deploymentName: string;
  model: ModelInfo;
}
interface ModelInfo {
  name: string;
  version: string;
}
export enum APIVersion {
  Preview = "2024-07-01-preview",
  Stable = "2024-06-01",
  OpenAI = "OpenAI",
}
export const APIMatrix = [APIVersion.Preview, APIVersion.Stable];
function toString(error: any): string {
  return error instanceof Error ? error.toString() + "\n" + error.stack : JSON.stringify(error);
}

export async function withDeployments<T>(
  deploymentsInfo: DeploymentInfo[] = [],
  run: (model: string) => Promise<T>,
  validate: (result: T) => void,
  modelsListToSkip?: ModelInfo[],
): Promise<DeploymentInfo[]> {
  const errors = [];
  const succeeded = [];
  assert.isNotEmpty(deploymentsInfo, "No deployments found");
  let i = 0;
  for (const deployment of deploymentsInfo) {
    try {
      logger.info(
        `[${++i}/${deploymentsInfo.length}] testing with deployment: ${deployment.deploymentName} - model: ${deployment.model.name} ${deployment.model.version}`,
      );
      if (modelsListToSkip && !isModelInList(deployment.model, modelsListToSkip)) {
        logger.info(
          `Skipping deployment ${deployment.deploymentName} - model: ${deployment.model.name} ${deployment.model.version}`,
        );
        continue;
      }
      const res = await run(deployment.deploymentName);
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
        errorStr.includes("Connection error") ||
        errorStr.includes("InternalServerError") ||
        errorStr.includes("toolCalls")
      ) {
        logger.info(`Handled error: ${errorStr}`);
        continue;
      }
      logger.warning(`Error in deployment ${deployment.deploymentName}: ${errorStr}`);
      errors.push(errorStr);
    }
  }
  if (errors.length > 0) {
    throw new Error(`Errors list: ${errors.join("\n")}`);
  }
  assert.isNotEmpty(succeeded, "No deployments succeeded");
  logger.info(`Succeeded with (${succeeded.length}): ${JSON.stringify(succeeded.join(", "))}`);
  return succeeded;
}

export async function sendRequestWithRecorder(request: PipelineRequest): Promise<PipelineResponse> {
  const client = createDefaultHttpClient();
  const pipeline = createEmptyPipeline();
  return pipeline.sendRequest(client, request);
}

function isModelInList(expectedModel: ModelInfo, modelsList: ModelInfo[]): boolean {
  for (const model of modelsList) {
    if (expectedModel.name === model.name && expectedModel.version === model.version) {
      return true;
    }
  }
  return false;
}
async function listDeployments(
  subId: string,
  rgName: string,
  accountName: string,
): Promise<DeploymentInfo[]> {
  const deployments: DeploymentInfo[] = [];
  const mgmtClient = new CognitiveServicesManagementClient(createTestCredential(), subId);
  for await (const deployment of mgmtClient.deployments.list(rgName, accountName)) {
    const deploymentName = deployment.name;
    const modelName = deployment.properties?.model?.name;
    const modelVersion = deployment.properties?.model?.version;
    if (deploymentName && modelName && modelVersion) {
      deployments.push({ deploymentName, model: { name: modelName, version: modelVersion } });
    }
  }
  logger.info(`Available deployments (${deployments.length}): ${JSON.stringify(deployments)}`);
  return deployments;
}

export function updateWithSucceeded(
  succeeded: DeploymentInfo[],
  deployments: DeploymentInfo[],
): void {
  if (deployments.length === 0) {
    deployments.push(...succeeded);
  }
}

export function getSucceeded(
  deployments: DeploymentInfo[],
  succeededDeployments: DeploymentInfo[],
): DeploymentInfo[] {
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
    case "vision":
      return assertEnvironmentVariable(EnvironmentVariableNamesForVision.ACCOUNT_NAME_VISION);
    case "audio":
      return assertEnvironmentVariable(EnvironmentVariableNamesForAudio.ACCOUNT_NAME_AUDIO);
  }
}

export async function getDeployments(deploymentType: DeploymentType): Promise<DeploymentInfo[]> {
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

export function createAzureSearchExtension(): AzureChatExtensionConfiguration {
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

export function isRateLimitRun(run: Run): boolean {
  if (run.status === "failed") {
    if (run.last_error?.message.includes("Rate limit")) {
      logger.info(`Rate limit error: ${run.last_error.message}`);
      return true;
    }
    throw new RestError(`Run failed with unexpected error: ${run.last_error?.message}`, {
      code: run.last_error?.code,
    });
  }
  if (!["completed", "requires_action"].includes(run.status)) {
    throw new RestError(`Run failed with unexpected status: ${run.status}`);
  }
  return false;
}
