// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateService.json
 */
async function searchUpdateService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
    replicaCount: 2,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateServiceAuthOptions.json
 */
async function searchUpdateServiceAuthOptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
    replicaCount: 2,
    authOptions: { aadOrApiKey: { aadAuthFailureMode: "http401WithBearerChallenge" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateServiceDisableLocalAuth.json
 */
async function searchUpdateServiceDisableLocalAuth(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
    replicaCount: 2,
    disableLocalAuth: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateServiceToAllowAccessFromPrivateEndpoints.json
 */
async function searchUpdateServiceToAllowAccessFromPrivateEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    replicaCount: 1,
    partitionCount: 1,
    publicNetworkAccess: "Disabled",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateServiceToAllowAccessFromPublicCustomIPs.json
 */
async function searchUpdateServiceToAllowAccessFromPublicCustomIPs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    replicaCount: 3,
    partitionCount: 1,
    publicNetworkAccess: "Enabled",
    networkRuleSet: {
      ipRules: [{ value: "123.4.5.6" }, { value: "123.4.6.0/18" }],
      bypass: "None",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateServiceToAllowAccessFromPublicCustomIPsAndBypass.json
 */
async function searchUpdateServiceToAllowAccessFromPublicCustomIPsAndBypass(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    replicaCount: 3,
    partitionCount: 1,
    publicNetworkAccess: "Enabled",
    networkRuleSet: {
      ipRules: [{ value: "123.4.5.6" }, { value: "123.4.6.0/18" }],
      bypass: "AzurePortal",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateServiceToRemoveIdentity.json
 */
async function searchUpdateServiceToRemoveIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    sku: { name: "standard" },
    identity: { type: "None" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateServiceWithCmkEnforcement.json
 */
async function searchUpdateServiceWithCmkEnforcement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
    replicaCount: 2,
    encryptionWithCmk: { enforcement: "Enabled" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateServiceWithDataExfiltration.json
 */
async function searchUpdateServiceWithDataExfiltration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
    replicaCount: 2,
    dataExfiltrationProtections: ["BlockAll"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateServiceWithKnowledgeRetrieval.json
 */
async function searchUpdateServiceWithKnowledgeRetrieval(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
    replicaCount: 2,
    knowledgeRetrieval: "standard",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateServiceWithSemanticSearch.json
 */
async function searchUpdateServiceWithSemanticSearch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
    replicaCount: 2,
    semanticSearch: "standard",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/SearchUpdateServiceWithSku.json
 */
async function searchUpdateServiceWithSku(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
    sku: { name: "standard2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await searchUpdateService();
  await searchUpdateServiceAuthOptions();
  await searchUpdateServiceDisableLocalAuth();
  await searchUpdateServiceToAllowAccessFromPrivateEndpoints();
  await searchUpdateServiceToAllowAccessFromPublicCustomIPs();
  await searchUpdateServiceToAllowAccessFromPublicCustomIPsAndBypass();
  await searchUpdateServiceToRemoveIdentity();
  await searchUpdateServiceWithCmkEnforcement();
  await searchUpdateServiceWithDataExfiltration();
  await searchUpdateServiceWithKnowledgeRetrieval();
  await searchUpdateServiceWithSemanticSearch();
  await searchUpdateServiceWithSku();
}

main().catch(console.error);
