// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { logger } from "./logger.js";
import { createDefaultHttpClient, createHttpHeaders } from "@azure/core-rest-pipeline";
import { randomUUID } from "@azure/core-util";
import { KeyCredential } from "@azure/core-auth";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { createTestCredential } from "@azure-tools/test-credential";
import { AuthMethod } from "./recordedClient.js";
import { assertEnvironmentVariable, isPlaybackMode } from "@azure-tools/test-recorder";
import { OpenAIKeyCredential } from "../../../src/OpenAIKeyCredential.js";

export async function withDeployment<T>(
  deployments: string[],
  run: (model: string) => Promise<T>
): Promise<string[]> {
  const errors = [];
  const succeeded = [];
  assert.isNotEmpty(deployments, "No deployments found");
  for (const deployment of deployments) {
    try {
      logger.verbose(`testing with ${deployment}`);
      await run(deployment);
      succeeded.push(deployment);
    } catch (e) {
      const error = e as any;
      if (
        ["OperationNotSupported", "model_not_found"].includes(error.code) ||
        error.type === "invalid_request_error"
      ) {
        logger.verbose(error.toString());
        continue;
      }
      logger.warning(`Error in deployment ${deployment}: ${error.toString()}`);
      errors.push(error.toString());
    }
  }
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
  assert.isNotEmpty(succeeded, "No deployments succeeded");
  logger.info(`Succeeded with (${succeeded.length}): ${succeeded.join(", ")}`);
  return succeeded;
}

async function listOpenAIModels(cred: KeyCredential): Promise<string[]> {
  const openaiClient = createDefaultHttpClient();
  const response = await openaiClient.sendRequest({
    url: "https://api.openai.com/v1/models",
    headers: createHttpHeaders({
      Authorization: cred.key,
    }),
    method: "GET",
    timeout: 0,
    withCredentials: false,
    requestId: randomUUID(),
  });
  const body = JSON.parse(response.bodyAsText as string);
  const models = body.data.map((model: { id: string }) => model.id);
  logger.verbose(`Available models (${models.length}): ${models.join(", ")}`);
  return models;
}

async function listDeployments(
  subId: string,
  rgName: string,
  accountName: string
): Promise<string[]> {
  const deployments: string[] = [];
  const mgmtClient = new CognitiveServicesManagementClient(createTestCredential(), subId);
  for await (const deployment of mgmtClient.deployments.list(rgName, accountName)) {
    const deploymentName = deployment.name;
    if (deploymentName) {
      deployments.push(deploymentName);
    }
  }
  logger.verbose(`Available deployments (${deployments.length}): ${deployments.join(", ")}`);
  return deployments;
}

export function updateWithSucceeded(
  succeeded: string[],
  deployments: string[],
  models: string[],
  authMethod: AuthMethod
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
  succeededModels: string[]
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

export async function getDeployments(): Promise<string[]> {
  return isPlaybackMode()
    ? ["gpt-4", "text-davinci-003"]
    : listDeployments(
        assertEnvironmentVariable("SUBSCRIPTION_ID"),
        assertEnvironmentVariable("RESOURCE_GROUP"),
        assertEnvironmentVariable("ACCOUNT_NAME")
      );
}

export async function getModels(): Promise<string[]> {
  return isPlaybackMode()
    ? ["gpt-3.5-turbo-0613", "text-davinci-003"]
    : listOpenAIModels(new OpenAIKeyCredential(assertEnvironmentVariable("OPENAI_API_KEY")));
}
