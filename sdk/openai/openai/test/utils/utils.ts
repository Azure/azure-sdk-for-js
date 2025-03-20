// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, test, describe } from "vitest";
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
import { getSearchInfo } from "./injectables.js";
import type {
  ClientsAndDeploymentsInfo,
  DeploymentInfo,
  ModelCapabilities,
  ModelInfo,
  ResourceInfo,
} from "./types.js";
import { logger } from "./logger.js";
import type { OpenAI } from "openai";
import type { Sku } from "@azure/arm-cognitiveservices";

export type AcceptableErrors = {
  messageSubstring: string[];
};

const GlobalAcceptedErrors: AcceptableErrors = {
  messageSubstring: ["Rate limit is exceeded"],
};

export const maxRetriesOption = { maxRetries: 0 };

export enum APIVersion {
  Preview = "2025-01-01-preview",
  Stable = "2024-10-21",
  OpenAI = "OpenAI",
  "2024_10_01_preview" = "2024-10-01-preview",
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
      logger.info(
        `[${++i}/${count}] testing with deployment: ${deployment.deploymentName} (${deployment.model.name}: ${deployment.model.version})`,
      );
      if (modelsListToSkip && isModelInList(deployment.model, modelsListToSkip)) {
        logger.info(
          `Skipping deployment ${deployment.deploymentName} (${deployment.model.name}: ${deployment.model.version})`,
        );
        continue;
      }
      try {
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
          ].includes(error.code) ||
          error.type === "invalid_request_error" ||
          error.name === "AbortError" ||
          errorStr.includes("Connection error") ||
          errorStr.includes("toolCalls") ||
          [
            "ManagedIdentityIsNotEnabled",
            "Rate limit is exceeded",
            "Invalid AzureCognitiveSearch configuration detected",
            "Unsupported Model",
            "does not support 'system' with this model",
            "Cannot cancel run with status 'completed'",
          ].some((match) => error.message.includes(match))
        ) {
          logger.warning("WARNING: Handled error: ", error.message);
          continue;
        }
        logger.error(`Error in deployment ${deployment.deploymentName}: `, error);
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

export type DeploymentTestingParameters<T> = {
  clientsAndDeploymentsInfo: ClientsAndDeploymentsInfo;
  run: (client: OpenAI, model: string) => Promise<T>;
  validate?: (result: T) => void;
  modelsListToSkip?: Partial<ModelInfo>[];
  acceptableErrors?: AcceptableErrors;
};

/**
 * Test with deployments invokes `test` call, so it should be inside of `describe` and not `it`.
 * @param clientsAndDeployments -
 * @param run -
 * @param validate -
 * @param modelsListToSkip -
 * @param acceptableErrors -
 */
export async function testWithDeployments<T>({
  clientsAndDeploymentsInfo,
  run,
  validate,
  modelsListToSkip,
  acceptableErrors,
}: DeploymentTestingParameters<T>): Promise<void> {
  assert.isNotEmpty(clientsAndDeploymentsInfo.clientsAndDeployments, "No deployments found");
  describe.concurrent.each(clientsAndDeploymentsInfo.clientsAndDeployments)(
    "$client.baseURL",
    async function ({ client, deployments }) {
      for (const deployment of deployments) {
        test.concurrent(`${deployment.model.name} (${deployment.model.version})`, async (done) => {
          if (modelsListToSkip && isModelInList(deployment.model, modelsListToSkip)) {
            done.skip(`Skipping ${deployment.model.name} : ${deployment.model.version}`);
          }

          let result;
          try {
            result = await run(client, deployment.deploymentName);
          } catch (e) {
            const error = e as any;
            if (acceptableErrors?.messageSubstring.some((match) => error.message.includes(match))) {
              done.skip(`Skipping due to acceptable error: ${error}`);
            }
            if (
              GlobalAcceptedErrors.messageSubstring.some((match) => error.message.includes(match))
            ) {
              done.skip(`Skipping due to global acceptable error: ${error}`);
            }
            throw e;
          }
          validate?.(result);
          return;
        });
      }
    },
  );
}

export function filterDeployments<DeploymentsT extends Pick<ResourceInfo, "deployments">>(
  resourcesInfo: DeploymentsT[],
  filters: {
    capabilities?: ModelCapabilities;
    sku?: Partial<Sku>;
    deploymentsToSkip?: string[];
    modelsToSkip?: Partial<ModelInfo>[];
  },
): { resourcesInfo: DeploymentsT[]; count: number } {
  const filtered: DeploymentsT[] = [];
  const { capabilities = {}, sku = {}, deploymentsToSkip = [], modelsToSkip = [] } = filters;
  const deploymentsToSkipSet = new Set(deploymentsToSkip);
  const modelsAndVersionsToSkipSet = new Set<string>();
  const modelsToSkipSet = new Set<string>();

  for (const { name, version } of modelsToSkip) {
    if (name && version) {
      modelsAndVersionsToSkipSet.add(`${name}:${version}`);
    } else if (name) {
      modelsToSkipSet.add(name);
    } else {
      throw new Error("name must be defined");
    }
  }

  const globalBestDeployments = new Map<string, DeploymentInfo>();

  for (const resourceInfo of resourcesInfo) {
    for (const deployment of resourceInfo.deployments) {
      // Ignore custom models (assuming standard model names are <= 25 characters)
      if (deployment.model.name.length > 25) {
        continue;
      }
      const modelAndVersion = `${deployment.model.name}:${deployment.model.version}`;

      if (deploymentsToSkipSet.has(deployment.deploymentName)) {
        continue;
      }
      if (modelsToSkipSet.has(deployment.model.name)) {
        continue;
      }
      if (modelsAndVersionsToSkipSet.has(modelAndVersion)) {
        continue;
      }
      if (
        !(Object.keys(capabilities) as (keyof ModelCapabilities)[]).every(
          (key) =>
            capabilities[key] === undefined || deployment.capabilities[key] === capabilities[key],
        )
      ) {
        continue;
      }
      if (
        !(Object.keys(sku) as (keyof Sku)[]).every(
          (key) => sku[key] === undefined || deployment.sku[key] === sku[key],
        )
      ) {
        continue;
      }
      const current = globalBestDeployments.get(modelAndVersion);
      const currentCapacity = current?.sku.capacity ?? 0;
      const newCapacity = deployment.sku.capacity ?? 0;
      if (!current || newCapacity > currentCapacity) {
        globalBestDeployments.set(modelAndVersion, deployment);
      }
    }
  }

  let count = 0;
  for (const resourceInfo of resourcesInfo) {
    const filteredDeployments = resourceInfo.deployments.filter(
      (deployment) =>
        globalBestDeployments.get(`${deployment.model.name}:${deployment.model.version}`) ===
        deployment,
    );
    if (filteredDeployments.length > 0) {
      count += filteredDeployments.length;
      filtered.push({ ...resourceInfo, deployments: filteredDeployments });
    }
  }

  return { resourcesInfo: filtered, count };
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
      (!expectedModel.version || !model.version || expectedModel.version === model.version)
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

export function createAzureSearchExtensions(): Array<AzureChatExtensionConfiguration> {
  const output = [];
  for (const { endpoint, indexes } of getSearchInfo().resources) {
    for (const index_name of indexes) {
      output.push({
        type: "azure_search",
        parameters: {
          endpoint,
          index_name,
          authentication: {
            type: "system_assigned_managed_identity",
          },
        },
      });
    }
  }
  return output;
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
