// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestProject } from "vitest/node";
import { EnvironmentVariableNames } from "./envVars.js";
import type {
  AzureSearchResource,
  AzureSearchResources,
  DeploymentInfo,
  ResourceInfo,
  ResourcesInfo,
} from "./types.js";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { SearchManagementClient } from "@azure/arm-search";
import { AzureKeyCredential, SearchIndexClient } from "@azure/search-documents";
import { createLiveCredential } from "@azure-tools/test-credential";
import { logger } from "./logger.js";
import "dotenv/config";
import { readFile, writeFile } from "node:fs/promises";
import type { TokenCredential } from "@azure/identity";

declare module "vitest" {
  interface ProvidedContext {
    resourcesInfo: ResourcesInfo;
    azureSearchResources: AzureSearchResources;
  }
}

function assertEnvironmentVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

async function listDeployments(
  subId: string,
  rgName: string,
  cred: TokenCredential,
): Promise<ResourcesInfo> {
  const mgmtClient = new CognitiveServicesManagementClient(cred, subId);
  let deployments: DeploymentInfo[] = [];
  const resourcesInfo: ResourceInfo[] = [];
  let count = 0;
  for await (const account of mgmtClient.accounts.listByResourceGroup(rgName)) {
    const endpoint = account.properties?.endpoint;
    const accountName = account.name;
    if (
      !accountName ||
      !endpoint ||
      account.kind?.toLowerCase() !== "openai" ||
      account.properties?.provisioningState?.toLowerCase() !== "succeeded" ||
      account.properties.publicNetworkAccess?.toLowerCase() !== "enabled"
    ) {
      continue;
    }
    for await (const deployment of mgmtClient.deployments.list(rgName, accountName)) {
      const deploymentName = deployment.name;
      const modelName = deployment.properties?.model?.name;
      const modelVersion = deployment.properties?.model?.version;
      const capabilities = deployment.properties?.capabilities;
      const sku = deployment.sku;
      const isActive = deployment.properties?.provisioningState?.toLowerCase() === "succeeded";
      if (sku && isActive && deploymentName && modelName && modelVersion) {
        deployments.push({
          deploymentName,
          model: { name: modelName, version: modelVersion },
          sku,
          capabilities: capabilities as DeploymentInfo["capabilities"],
        });
      }
    }

    if (deployments.length > 0) {
      count += deployments.length;
      resourcesInfo.push({
        endpoint,
        deployments,
      });
      deployments = [];
    }
  }

  return { resourcesInfo, count };
}

async function getDeployments(
  subId: string,
  rgName: string,
  cred: TokenCredential,
): Promise<ResourcesInfo> {
  const filePath = "./deployments.json";
  try {
    const content = await readFile(filePath, "utf-8");
    logger.verbose(`Reading deployments from file: ${filePath}: ${content}`);
    return JSON.parse(content);
  } catch {
    const { count, resourcesInfo } = await listDeployments(subId, rgName, cred);
    logger.verbose(`Available deployments [${count}]: ${JSON.stringify(resourcesInfo, null, 2)}`);
    await writeFile(filePath, JSON.stringify({ resourcesInfo, count }, null, 2) + "\n");
    return { resourcesInfo, count };
  }
}

async function listAzureSearchResources(
  subId: string,
  rgName: string,
  cred: TokenCredential,
): Promise<AzureSearchResources> {
  const searchClient = new SearchManagementClient(cred, subId);
  const resources: AzureSearchResource[] = [];
  for await (const service of searchClient.services.listByResourceGroup(rgName)) {
    if (
      !service.name ||
      service.identity?.type !== "SystemAssigned" ||
      service.publicNetworkAccess?.toLowerCase() !== "enabled" ||
      service.provisioningState?.toLowerCase() !== "succeeded" ||
      service.status?.toLowerCase() !== "running"
    ) {
      continue;
    }
    const endpoint = `https://${service.name}.search.windows.net`;
    const { primaryKey } = await searchClient.adminKeys.get(rgName, service.name);
    if (!primaryKey) {
      continue;
    }
    const indexClient = new SearchIndexClient(endpoint, new AzureKeyCredential(primaryKey));

    const indexes: string[] = [];
    for await (const index of indexClient.listIndexes()) {
      const { count = 0 } = await indexClient.getSearchClient(index.name).search("*", {
        top: 1,
        includeTotalCount: true,
      });
      if (count > 0) {
        indexes.push(index.name);
      }
    }

    if (indexes.length > 0) {
      resources.push({
        serviceName: service.name,
        endpoint,
        indexes,
      });
    }
  }
  return { resources };
}

async function getAzureSearchInfo(
  subId: string,
  rgName: string,
  cred: TokenCredential,
): Promise<AzureSearchResources> {
  const filePath = "./searchInfo.json";
  try {
    const content = await readFile(filePath, "utf-8");
    logger.verbose(`Reading Azure Search info from file: ${filePath}: ${content}`);
    return JSON.parse(content);
  } catch {
    const resources = await listAzureSearchResources(subId, rgName, cred);
    logger.verbose(
      `Available Azure Search Indices [${resources.resources.length}]: ${JSON.stringify(resources, null, 2)}`,
    );
    await writeFile(filePath, JSON.stringify(resources, null, 2) + "\n");
    return resources;
  }
}

export default async function ({ provide }: TestProject): Promise<void> {
  const cred = createLiveCredential();
  const subId = assertEnvironmentVariable(EnvironmentVariableNames.SUBSCRIPTION_ID);
  const rgName = assertEnvironmentVariable(EnvironmentVariableNames.RESOURCE_GROUP);
  const deployments = await getDeployments(subId, rgName, cred);
  provide("resourcesInfo", deployments);
  const azureSearchResources = await getAzureSearchInfo(subId, rgName, cred);
  provide("azureSearchResources", azureSearchResources);
}
