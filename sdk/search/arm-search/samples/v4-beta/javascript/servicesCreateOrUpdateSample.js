// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateService.json
 */
async function searchCreateOrUpdateService() {
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
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateServiceAuthOptions.json
 */
async function searchCreateOrUpdateServiceAuthOptions() {
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
    authOptions: { aadOrApiKey: { aadAuthFailureMode: "http401WithBearerChallenge" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateServiceDisableLocalAuth.json
 */
async function searchCreateOrUpdateServiceDisableLocalAuth() {
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
    disableLocalAuth: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateServiceToAllowAccessFromPrivateEndpoints.json
 */
async function searchCreateOrUpdateServiceToAllowAccessFromPrivateEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    tags: { "app-name": "My e-commerce app" },
    sku: { name: "standard" },
    replicaCount: 3,
    partitionCount: 1,
    publicNetworkAccess: "Disabled",
    hostingMode: "Default",
    computeType: "Default",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateServiceToAllowAccessFromPublicCustomIPs.json
 */
async function searchCreateOrUpdateServiceToAllowAccessFromPublicCustomIPs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    tags: { "app-name": "My e-commerce app" },
    sku: { name: "standard" },
    replicaCount: 1,
    partitionCount: 1,
    networkRuleSet: { ipRules: [{ value: "123.4.5.6" }, { value: "123.4.6.0/18" }] },
    hostingMode: "Default",
    computeType: "Default",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateServiceToAllowAccessFromPublicCustomIPsAndBypass.json
 */
async function searchCreateOrUpdateServiceToAllowAccessFromPublicCustomIPsAndBypass() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "mysearchservice", {
    location: "westus",
    tags: { "app-name": "My e-commerce app" },
    sku: { name: "standard" },
    replicaCount: 1,
    partitionCount: 1,
    networkRuleSet: {
      ipRules: [{ value: "123.4.5.6" }, { value: "123.4.6.0/18" }],
      bypass: "AzurePortal",
    },
    hostingMode: "Default",
    computeType: "Default",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateServiceWithCmkEnforcement.json
 */
async function searchCreateOrUpdateServiceWithCmkEnforcement() {
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
    encryptionWithCmk: { enforcement: "Enabled" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateServiceWithDataExfiltration.json
 */
async function searchCreateOrUpdateServiceWithDataExfiltration() {
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
    dataExfiltrationProtections: ["BlockAll"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateServiceWithIdentity.json
 */
async function searchCreateOrUpdateServiceWithIdentity() {
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
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/user-mi":
          {},
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateServiceWithServerless.json
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
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateServiceWithServiceLevelCmkMultiTenantFederatedIdentity.json
 */
async function searchCreateOrUpdateServiceWithServiceLevelCmkMultiTenantFederatedIdentity() {
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
    encryptionWithCmk: {
      enforcement: "Enabled",
      serviceLevelEncryptionKey: {
        keyName: "myUserManagedEncryptionKey-createdinAzureKeyVault",
        keyVersion: "myKeyVersion-32charAlphaNumericString",
        vaultUri: "https://myKeyVault.vault.azure.net",
        identity: {
          odataType: "#Microsoft.Azure.Search.DataUserAssignedIdentity",
          userAssignedIdentity:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/user-mi",
          federatedIdentityClientId: "f83c6b1b-4d34-47e4-bb34-9d83df58b540",
        },
      },
    },
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/user-mi":
          {},
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @summary creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateWithKnowledgeRetrieval.json
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
 * x-ms-original-file: 2026-03-01-preview/SearchCreateOrUpdateWithSemanticSearch.json
 */
async function searchCreateOrUpdateWithSemanticSearch() {
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
    semanticSearch: "free",
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
  await searchCreateOrUpdateServiceWithServiceLevelCmkMultiTenantFederatedIdentity();
  await searchCreateOrUpdateWithKnowledgeRetrieval();
  await searchCreateOrUpdateWithSemanticSearch();
}

main().catch(console.error);
