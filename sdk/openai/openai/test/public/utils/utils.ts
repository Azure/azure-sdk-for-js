// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  capabilities?: Record<string, string>;
}
interface ModelInfo {
  name: string;
  version: string;
}

export const APIVersion = {
  Preview: { name: "2024-08-01-preview", beta: true, azure: true },
  Stable: { name: "2024-06-01", beta: false, azure: true },
  OpenAI: { name: "OpenAI", beta: true, azure: false },
} as const;

export type AnyApiVersion = (typeof APIVersion)[keyof typeof APIVersion];

export const APIMatrix = Object.values(APIVersion);

function toString(error: any): string {
  return error.error ? JSON.stringify(error.error) : JSON.stringify(error);
}

function stringifyDeployment(deployment: DeploymentInfo): string {
  return JSON.stringify(deployment);
}

export async function withDeployments<T>(
  deploymentsInfo: DeploymentInfo[] = [],
  run: (model: string) => Promise<T>,
  options: {
    validate?: (result: T) => void;
    setup?: () => Promise<() => Promise<void>>;
    filterModels?: (model: ModelInfo) => boolean;
  } = {},
): Promise<DeploymentInfo[]> {
  const { setup, validate, filterModels } = options;
  const errors = [];
  const succeeded = [];
  assert.isNotEmpty(deploymentsInfo, "No deployments found");
  const tearDown = await setup?.();
  let i = 0;
  for (const deployment of deploymentsInfo) {
    if (!filterModels?.(deployment.model)) {
      logger.info(`Skipping deployment ${stringifyDeployment(deployment)}`);
      continue;
    }
    logger.info(
      `[${++i}/${deploymentsInfo.length}] testing with deployment: ${stringifyDeployment(
        deployment,
      )}`,
    );
    try {
      const res = await run(deployment.deploymentName);
      validate?.(res);
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
          "UserError",
          400,
        ].includes(error.code) ||
        error.type === "invalid_request_error" ||
        error.name === "AbortError" ||
        errorStr.includes("Connection error") ||
        errorStr.includes("toolCalls")
      ) {
        logger.info(`Handled error: ${errorStr}`);
        continue;
      }
      logger.warning(`Error in deployment ${deployment.deploymentName}: ${errorStr}`);
      errors.push(errorStr);
    }
  }
  await tearDown?.();
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

export function isModelInList(expectedModel: ModelInfo, modelsList: ModelInfo[]): boolean {
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
  const csManagementClient = new CognitiveServicesManagementClient(createTestCredential(), subId);
  for await (const deployment of csManagementClient.deployments.list(rgName, accountName)) {
    const { name, properties } = deployment;
    const { model, provisioningState, capabilities } = properties || {};
    const deploymentName = name;
    const modelName = model?.name;
    const modelVersion = model?.version;
    if (deploymentName && modelName && modelVersion && provisioningState === "Succeeded") {
      deployments.push({
        deploymentName,
        model: { name: modelName, version: modelVersion },
        capabilities,
      });
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
