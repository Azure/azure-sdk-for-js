// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchUpdateService.json
 */
async function searchUpdateService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    replicaCount: 2,
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchUpdateServiceAuthOptions.json
 */
async function searchUpdateServiceAuthOptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    authOptions: { aadOrApiKey: { aadAuthFailureMode: "http401WithBearerChallenge" } },
    replicaCount: 2,
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchUpdateServiceDisableLocalAuth.json
 */
async function searchUpdateServiceDisableLocalAuth(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    disableLocalAuth: true,
    replicaCount: 2,
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchUpdateServiceToAllowAccessFromPrivateEndpoints.json
 */
async function searchUpdateServiceToAllowAccessFromPrivateEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    partitionCount: 1,
    publicNetworkAccess: "Disabled",
    replicaCount: 1,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchUpdateServiceToAllowAccessFromPublicCustomIPs.json
 */
async function searchUpdateServiceToAllowAccessFromPublicCustomIPs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    networkRuleSet: { ipRules: [{ value: "123.4.5.6" }, { value: "123.4.6.0/18" }] },
    partitionCount: 1,
    publicNetworkAccess: "Enabled",
    replicaCount: 3,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchUpdateServiceToAllowAccessFromPublicCustomIPsAndBypass.json
 */
async function searchUpdateServiceToAllowAccessFromPublicCustomIPsAndBypass(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    networkRuleSet: {
      bypass: "AzureServices",
      ipRules: [{ value: "123.4.5.6" }, { value: "123.4.6.0/18" }],
    },
    partitionCount: 1,
    publicNetworkAccess: "Enabled",
    replicaCount: 3,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchUpdateServiceToRemoveIdentity.json
 */
async function searchUpdateServiceToRemoveIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    identity: { type: "None" },
    sku: { name: "standard" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchUpdateServiceWithCmkEnforcement.json
 */
async function searchUpdateServiceWithCmkEnforcement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    encryptionWithCmk: { enforcement: "Enabled" },
    replicaCount: 2,
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchUpdateServiceWithDataExfiltration.json
 */
async function searchUpdateServiceWithDataExfiltration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    dataExfiltrationProtections: ["BlockAll"],
    replicaCount: 2,
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchUpdateServiceWithSemanticSearch.json
 */
async function searchUpdateServiceWithSemanticSearch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    replicaCount: 2,
    semanticSearch: "standard",
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing search service in the given resource group.
 *
 * @summary updates an existing search service in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchUpdateServiceWithSku.json
 */
async function searchUpdateServiceWithSku(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.update("rg1", "mysearchservice", {
    sku: { name: "standard2" },
    tags: { "app-name": "My e-commerce app", "new-tag": "Adding a new tag" },
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
  await searchUpdateServiceWithSemanticSearch();
  await searchUpdateServiceWithSku();
}

main().catch(console.error);
