// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestProject } from "vitest/node";
import { EnvironmentVariableNames } from "./envVars.js";
import type { DeploymentInfo, ResourceInfo, ResourcesInfo } from "./types.js";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { createTestCredential } from "@azure-tools/test-credential";
import { logger } from "./logger.js";
import "dotenv/config";
import { readFile, writeFile } from "node:fs/promises";

declare module "vitest" {
  interface ProvidedContext {
    resourcesInfo: ResourcesInfo;
    [EnvironmentVariableNames.AZURE_SEARCH_ENDPOINT]: string;
    [EnvironmentVariableNames.AZURE_SEARCH_INDEX]: string;
  }
}

function assertEnvironmentVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

function getAccountNamesAndEndpoints(): { accountName: string; endpoint: string }[] {
  return [
    {
      accountName: assertEnvironmentVariable(EnvironmentVariableNames.ACCOUNT_NAME_COMPLETIONS),
      endpoint: assertEnvironmentVariable(EnvironmentVariableNames.ENDPOINT_COMPLETIONS),
    },
    {
      accountName: assertEnvironmentVariable(EnvironmentVariableNames.ACCOUNT_NAME_VISION),
      endpoint: assertEnvironmentVariable(EnvironmentVariableNames.ENDPOINT_VISION),
    },
    {
      accountName: assertEnvironmentVariable(EnvironmentVariableNames.ACCOUNT_NAME_AUDIO),
      endpoint: assertEnvironmentVariable(EnvironmentVariableNames.ENDPOINT_AUDIO),
    },
  ];
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
    const capabilities = deployment.properties?.capabilities;
    const sku = deployment.sku;
    const isActive = deployment.properties?.provisioningState === "Succeeded";
    if (sku && isActive && deploymentName && modelName && modelVersion) {
      deployments.push({
        deploymentName,
        model: { name: modelName, version: modelVersion },
        sku,
        capabilities: capabilities as DeploymentInfo["capabilities"],
      });
    }
  }
  return deployments;
}

export async function getDeployments(): Promise<ResourcesInfo> {
  const filePath = "./deployments.json";
  try {
    const content = await readFile(filePath, "utf-8");
    logger.info(`Reading deployments from file: ${filePath}: ${content}`);
    return JSON.parse(content);
  } catch {
    const resourcesInfo: Omit<ResourceInfo, "count">[] = [];
    let count = 0;
    for (const { accountName, endpoint } of getAccountNamesAndEndpoints()) {
      const deployments = await listDeployments(
        assertEnvironmentVariable(EnvironmentVariableNames.SUBSCRIPTION_ID),
        assertEnvironmentVariable(EnvironmentVariableNames.RESOURCE_GROUP),
        accountName,
      );
      count += deployments.length;
      if (deployments.length > 0) {
        resourcesInfo.push({
          endpoint,
          deployments,
        });
      }
    }
    logger.info(`Available deployments [${count}]: ${JSON.stringify(resourcesInfo, null, 2)}`);
    await writeFile(filePath, JSON.stringify({ resourcesInfo, count }, null, 2));
    return { resourcesInfo, count };
  }
}

export default async function ({ provide }: TestProject): Promise<void> {
  provide("resourcesInfo", await getDeployments());
  provide(
    EnvironmentVariableNames.AZURE_SEARCH_ENDPOINT,
    assertEnvironmentVariable(EnvironmentVariableNames.AZURE_SEARCH_ENDPOINT),
  );
  provide(
    EnvironmentVariableNames.AZURE_SEARCH_INDEX,
    assertEnvironmentVariable(EnvironmentVariableNames.AZURE_SEARCH_INDEX),
  );
}
