// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceGraphClient } = require("@azure/arm-resourcegraph");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries the resources managed by Azure Resource Manager for scopes specified in the request.
 *
 * @summary queries the resources managed by Azure Resource Manager for scopes specified in the request.
 * x-ms-original-file: 2024-04-01/ResourcesBasicQuery.json
 */
async function basicQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resources({
    query: "Resources | project id, name, type, location, tags | limit 3",
    subscriptions: ["cfbbd179-59d2-4052-aa06-9270a38aa9d6"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to queries the resources managed by Azure Resource Manager for scopes specified in the request.
 *
 * @summary queries the resources managed by Azure Resource Manager for scopes specified in the request.
 * x-ms-original-file: 2024-04-01/ResourcesComplexQuery.json
 */
async function complexQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resources({
    query:
      "Resources | project id, name, type, location | where type =~ 'Microsoft.Compute/virtualMachines' | summarize count() by location | top 3 by count_",
    subscriptions: ["cfbbd179-59d2-4052-aa06-9270a38aa9d6"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to queries the resources managed by Azure Resource Manager for scopes specified in the request.
 *
 * @summary queries the resources managed by Azure Resource Manager for scopes specified in the request.
 * x-ms-original-file: 2024-04-01/ResourcesFacetQuery.json
 */
async function queryWithAFacetRequest() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resources({
    facets: [
      { expression: "location", options: { top: 3, sortOrder: "desc" } },
      {
        expression: "properties.storageProfile.osDisk.osType",
        options: { top: 3, sortOrder: "desc" },
      },
      { expression: "nonExistingColumn", options: { top: 3, sortOrder: "desc" } },
      {
        expression: "resourceGroup",
        options: { top: 3, sortBy: "tolower(resourceGroup)", sortOrder: "asc" },
      },
      { expression: "resourceGroup", options: { top: 3, filter: "resourceGroup contains 'test'" } },
    ],
    query:
      "Resources | where type =~ 'Microsoft.Compute/virtualMachines' | project id, name, location, resourceGroup, properties.storageProfile.osDisk.osType | limit 5",
    subscriptions: ["cfbbd179-59d2-4052-aa06-9270a38aa9d6"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to queries the resources managed by Azure Resource Manager for scopes specified in the request.
 *
 * @summary queries the resources managed by Azure Resource Manager for scopes specified in the request.
 * x-ms-original-file: 2024-04-01/ResourcesFilterQuery.json
 */
async function filterResources() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resources({
    query:
      "Resources | project id, name, type, location | where type =~ 'Microsoft.Compute/virtualMachines' | limit 3",
    subscriptions: ["cfbbd179-59d2-4052-aa06-9270a38aa9d6"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to queries the resources managed by Azure Resource Manager for scopes specified in the request.
 *
 * @summary queries the resources managed by Azure Resource Manager for scopes specified in the request.
 * x-ms-original-file: 2024-04-01/ResourcesFirstPageQuery.json
 */
async function firstPageQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resources({
    options: { skip: 0, top: 3 },
    query: "Resources | where name contains 'test' | project id, name, type, location",
    subscriptions: ["cfbbd179-59d2-4052-aa06-9270a38aa9d6"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to queries the resources managed by Azure Resource Manager for scopes specified in the request.
 *
 * @summary queries the resources managed by Azure Resource Manager for scopes specified in the request.
 * x-ms-original-file: 2024-04-01/ResourcesMgBasicQuery.json
 */
async function basicManagementGroupQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resources({
    managementGroups: ["e927f598-c1d4-4f72-8541-95d83a6a4ac8", "ProductionMG"],
    query: "Resources | project id, name, type, location, tags | limit 3",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to queries the resources managed by Azure Resource Manager for scopes specified in the request.
 *
 * @summary queries the resources managed by Azure Resource Manager for scopes specified in the request.
 * x-ms-original-file: 2024-04-01/ResourcesNextPageQuery.json
 */
async function nextPageQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resources({
    options: { skipToken: "eyAibm8iOiAibHVjayIsICJidXQiOiAibmljZSIsICJ0cnkiOiAiISIgfQ==" },
    query: "Resources | where name contains 'test' | project id, name, type, location",
    subscriptions: ["cfbbd179-59d2-4052-aa06-9270a38aa9d6"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to queries the resources managed by Azure Resource Manager for scopes specified in the request.
 *
 * @summary queries the resources managed by Azure Resource Manager for scopes specified in the request.
 * x-ms-original-file: 2024-04-01/ResourcesPropertiesQuery.json
 */
async function accessAPropertiesField() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resources({
    query:
      "Resources | where type =~ 'Microsoft.Compute/virtualMachines' | summarize count() by tostring(properties.storageProfile.osDisk.osType)",
    subscriptions: ["cfbbd179-59d2-4052-aa06-9270a38aa9d6"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to queries the resources managed by Azure Resource Manager for scopes specified in the request.
 *
 * @summary queries the resources managed by Azure Resource Manager for scopes specified in the request.
 * x-ms-original-file: 2024-04-01/ResourcesRandomPageQuery.json
 */
async function randomPageQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resources({
    options: { skip: 10, top: 2 },
    query: "Resources | where name contains 'test' | project id, name, type, location",
    subscriptions: ["cfbbd179-59d2-4052-aa06-9270a38aa9d6"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to queries the resources managed by Azure Resource Manager for scopes specified in the request.
 *
 * @summary queries the resources managed by Azure Resource Manager for scopes specified in the request.
 * x-ms-original-file: 2024-04-01/ResourcesSummarizeQuery.json
 */
async function summarizeResourcesByLocation() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resources({
    query: "Resources | project id, name, type, location | summarize by location",
    subscriptions: ["cfbbd179-59d2-4052-aa06-9270a38aa9d6"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to queries the resources managed by Azure Resource Manager for scopes specified in the request.
 *
 * @summary queries the resources managed by Azure Resource Manager for scopes specified in the request.
 * x-ms-original-file: 2024-04-01/ResourcesTenantBasicQuery.json
 */
async function basicTenantQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resources({
    query: "Resources | project id, name, type, location, tags | limit 3",
  });
  console.log(result);
}

async function main() {
  await basicQuery();
  await complexQuery();
  await queryWithAFacetRequest();
  await filterResources();
  await firstPageQuery();
  await basicManagementGroupQuery();
  await nextPageQuery();
  await accessAPropertiesField();
  await randomPageQuery();
  await summarizeResourcesByLocation();
  await basicTenantQuery();
}

main().catch(console.error);
