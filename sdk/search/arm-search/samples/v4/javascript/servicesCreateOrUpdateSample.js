// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateService.json
 */
async function searchCreateOrUpdateService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    computeType: "Default",
    hostingMode: "Default",
    partitionCount: 1,
    replicaCount: 3,
    sku: { name: "standard" },
    tags: { "app-name": "My e-commerce app" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateServiceAuthOptions.json
 */
async function searchCreateOrUpdateServiceAuthOptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    authOptions: { aadOrApiKey: { aadAuthFailureMode: "http401WithBearerChallenge" } },
    computeType: "Default",
    hostingMode: "Default",
    partitionCount: 1,
    replicaCount: 3,
    sku: { name: "standard" },
    tags: { "app-name": "My e-commerce app" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateServiceDisableLocalAuth.json
 */
async function searchCreateOrUpdateServiceDisableLocalAuth() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    computeType: "Default",
    disableLocalAuth: true,
    hostingMode: "Default",
    partitionCount: 1,
    replicaCount: 3,
    sku: { name: "standard" },
    tags: { "app-name": "My e-commerce app" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateServiceToAllowAccessFromPrivateEndpoints.json
 */
async function searchCreateOrUpdateServiceToAllowAccessFromPrivateEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    computeType: "Default",
    hostingMode: "Default",
    partitionCount: 1,
    publicNetworkAccess: "Disabled",
    replicaCount: 3,
    sku: { name: "standard" },
    tags: { "app-name": "My e-commerce app" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateServiceToAllowAccessFromPublicCustomIPs.json
 */
async function searchCreateOrUpdateServiceToAllowAccessFromPublicCustomIPs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    computeType: "Default",
    hostingMode: "Default",
    networkRuleSet: { ipRules: [{ value: "123.4.5.6" }, { value: "123.4.6.0/18" }] },
    partitionCount: 1,
    replicaCount: 1,
    sku: { name: "standard" },
    tags: { "app-name": "My e-commerce app" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateServiceToAllowAccessFromPublicCustomIPsAndBypass.json
 */
async function searchCreateOrUpdateServiceToAllowAccessFromPublicCustomIPsAndBypass() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    computeType: "Default",
    hostingMode: "Default",
    networkRuleSet: {
      bypass: "AzureServices",
      ipRules: [{ value: "123.4.5.6" }, { value: "123.4.6.0/18" }],
    },
    partitionCount: 1,
    replicaCount: 1,
    sku: { name: "standard" },
    tags: { "app-name": "My e-commerce app" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateServiceWithCmkEnforcement.json
 */
async function searchCreateOrUpdateServiceWithCmkEnforcement() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    computeType: "Default",
    encryptionWithCmk: { enforcement: "Enabled" },
    hostingMode: "Default",
    partitionCount: 1,
    replicaCount: 3,
    sku: { name: "standard" },
    tags: { "app-name": "My e-commerce app" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateServiceWithDataExfiltration.json
 */
async function searchCreateOrUpdateServiceWithDataExfiltration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    computeType: "Default",
    dataExfiltrationProtections: ["BlockAll"],
    hostingMode: "Default",
    partitionCount: 1,
    replicaCount: 3,
    sku: { name: "standard" },
    tags: { "app-name": "My e-commerce app" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateServiceWithIdentity.json
 */
async function searchCreateOrUpdateServiceWithIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/user-mi":
          {},
      },
    },
    location: "westus",
    computeType: "Default",
    hostingMode: "Default",
    partitionCount: 1,
    replicaCount: 3,
    sku: { name: "standard" },
    tags: { "app-name": "My e-commerce app" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateServiceWithServerless.json
 */
async function searchCreateOrUpdateServiceWithServerless() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "myserverlessservice", {
    location: "westus",
    tags: { "app-name": "My e-commerce app" },
    sku: { name: "serverless" },
    hostingMode: "Default",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateWithKnowledgeRetrieval.json
 */
async function searchCreateOrUpdateWithKnowledgeRetrieval() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    tags: { "app-name": "My e-commerce app" },
    sku: { name: "standard" },
    replicaCount: 3,
    partitionCount: 1,
    hostingMode: "Default",
    computeType: "Default",
    knowledgeRetrieval: "free",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-11-01/SearchCreateOrUpdateWithSemanticSearch.json
 */
async function searchCreateOrUpdateWithSemanticSearch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    computeType: "Default",
    hostingMode: "Default",
    partitionCount: 1,
    replicaCount: 3,
    semanticSearch: "free",
    sku: { name: "standard" },
    tags: { "app-name": "My e-commerce app" },
  });
  console.log(result);
}

async function main() {
  await searchCreateOrUpdateService();
  await searchCreateOrUpdateServiceAuthOptions();
  await searchCreateOrUpdateServiceDisableLocalAuth();
  await searchCreateOrUpdateServiceToAllowAccessFromPrivateEndpoints();
  await searchCreateOrUpdateServiceToAllowAccessFromPublicCustomIPs();
  await searchCreateOrUpdateServiceToAllowAccessFromPublicCustomIPsAndBypass();
  await searchCreateOrUpdateServiceWithCmkEnforcement();
  await searchCreateOrUpdateServiceWithDataExfiltration();
  await searchCreateOrUpdateServiceWithIdentity();
  await searchCreateOrUpdateServiceWithServerless();
  await searchCreateOrUpdateWithKnowledgeRetrieval();
  await searchCreateOrUpdateWithSemanticSearch();
}

main().catch(console.error);
