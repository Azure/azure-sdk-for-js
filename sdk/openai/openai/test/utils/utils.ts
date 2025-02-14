// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "vitest";
import {
  type PipelineRequest,
  type PipelineResponse,
  RestError,
  createDefaultHttpClient,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import type { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import type { AzureChatExtensionConfiguration } from "../../src/types/index.js";
import { getAzureSearchEndpoint, getAzureSearchIndex } from "./injectables.js";
import type {
  ClientsAndDeploymentsInfo,
  ModelCapabilities,
  ModelInfo,
  ResourceInfo,
} from "./types.js";
import { logger } from "./logger.js";
import type { OpenAI } from "openai";
import type { Sku } from "@azure/arm-cognitiveservices";

export const maxRetriesOption = { maxRetries: 0 };

export enum APIVersion {
  Preview = "2025-01-01-preview",
  Stable = "2024-10-21",
  OpenAI = "OpenAI",
}
export const APIMatrix = [APIVersion.Preview, APIVersion.Stable];

function toString(error: any): string {
  return error.error ? JSON.stringify(error.error) : JSON.stringify(error);
}

export async function withDeployments<T>(
  { clientsAndDeployments, count }: ClientsAndDeploymentsInfo,
  run: (client: OpenAI, model: string) => Promise<T>,
  validate?: (result: T) => void,
  modelsListToSkip?: Partial<ModelInfo>[],
): Promise<void> {
  const errors = [];
  const succeeded = [];
  assert.isNotEmpty(clientsAndDeployments, "No deployments found");
  let i = 0;
  for (const { client, deployments } of clientsAndDeployments) {
    for (const deployment of deployments) {
      try {
        logger.info(
          `[${++i}/${count}] testing with deployment: ${deployment.deploymentName} (${deployment.model.name}: ${deployment.model.version})`,
        );
        if (modelsListToSkip && isModelInList(deployment.model, modelsListToSkip)) {
          logger.info(
            `Skipping deployment ${deployment.deploymentName} (${deployment.model.name}: ${deployment.model.version})`,
          );
          continue;
        }
        const res = await run(client, deployment.deploymentName);
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
          errorStr.includes("toolCalls") ||
          error.status === 404
        ) {
          logger.info("Handled error: ", error);
          continue;
        }
        logger.info(`Error in deployment ${deployment.deploymentName}: `, error);
        errors.push(e);
      }
    }
  }
  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
  logger.info(
    `Succeeded with (${succeeded.length}): ${JSON.stringify(succeeded.map(({ deploymentName }) => deploymentName).join(", "))}`,
  );
}

export function filterDeployments(
  resourcesInfo: ResourceInfo[],
  filters: {
    capabilities?: ModelCapabilities;
    sku?: Partial<Sku>;
    deploymentsToSkip?: string[];
    modelsToSkip?: Partial<ModelInfo>[];
  },
): ResourceInfo[] {
  const filtered: ResourceInfo[] = [];
  const { capabilities = {}, sku = {}, deploymentsToSkip = [], modelsToSkip = [] } = filters;
  const deploymentsToSkipSet = new Set(deploymentsToSkip);
  const modelsAndVersionsToSkipSet = new Set<string>();
  const modelsToSkipSet = new Set<string>();

  // Build sets of models (or model:version) to skip
  for (const { name, version } of modelsToSkip) {
    if (name && version) {
      modelsAndVersionsToSkipSet.add(`${name}:${version}`);
    } else if (name) {
      modelsToSkipSet.add(name);
    } else {
      throw new Error("name must be defined");
    }
  }

  // Set to track duplicate model names
  const seenModelNames = new Set<string>();

  for (const { deployments, endpoint } of resourcesInfo) {
    const filteredDeployments = deployments.filter((deployment) => {
      // Ignore all custom models, longest standard model name so far is gpt-4o-realtime-preview
      if (deployment.model.name.length > 25) {
        return false;
      }

      if (seenModelNames.has(`${deployment.model.name}:${deployment.model.version}`)) {
        return false;
      }
      if (deploymentsToSkipSet.has(deployment.deploymentName)) {
        return false;
      }
      if (modelsToSkipSet.has(deployment.model.name)) {
        return false;
      }
      if (modelsAndVersionsToSkipSet.has(`${deployment.model.name}:${deployment.model.version}`)) {
        return false;
      }
      if (
        !(Object.keys(capabilities) as (keyof ModelCapabilities)[]).every(
          (key) =>
            capabilities[key] === undefined || deployment.capabilities[key] === capabilities[key],
        )
      ) {
        return false;
      }
      if (
        !(Object.keys(sku) as (keyof Sku)[]).every(
          (key) => sku[key] === undefined || deployment.sku[key] === sku[key],
        )
      ) {
        return false;
      }

      seenModelNames.add(`${deployment.model.name}:${deployment.model.version}`);
      return true;
    });

    if (filteredDeployments.length > 0) {
      filtered.push({ deployments: filteredDeployments, endpoint });
    }
  }

  return filtered;
}

export async function sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
  const client = createDefaultHttpClient();
  const pipeline = createEmptyPipeline();
  return pipeline.sendRequest(client, request);
}

function isModelInList(
  expectedModel: Partial<ModelInfo>,
  modelsList: Partial<ModelInfo>[],
): boolean {
  for (const model of modelsList) {
    if (
      expectedModel.name === model.name &&
      (!expectedModel.version || expectedModel.version === model.version)
    ) {
      return true;
    }
  }
  return false;
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
  return sendRequest(request);
}

export function createAzureSearchExtension(): AzureChatExtensionConfiguration {
  return {
    type: "azure_search",
    parameters: {
      endpoint: getAzureSearchEndpoint(),
      index_name: getAzureSearchIndex(),
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
