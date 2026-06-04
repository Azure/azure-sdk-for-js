// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all relevant custom recommendations over a scope
 *
 * @summary get a list of all relevant custom recommendations over a scope
 * x-ms-original-file: 2024-08-01/CustomRecommendations/ListByManagementGroupCustomRecommendations_example.json
 */
async function listCustomRecommendationsByManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.customRecommendations.list(
    "providers/Microsoft.Management/managementGroups/contoso",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get a list of all relevant custom recommendations over a scope
 *
 * @summary get a list of all relevant custom recommendations over a scope
 * x-ms-original-file: 2024-08-01/CustomRecommendations/ListBySecurityConnectorCustomRecommendations_example.json
 */
async function listCustomRecommendationsBySecurityConnectorScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.customRecommendations.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get a list of all relevant custom recommendations over a scope
 *
 * @summary get a list of all relevant custom recommendations over a scope
 * x-ms-original-file: 2024-08-01/CustomRecommendations/ListBySubscriptionCustomRecommendations_example.json
 */
async function listCustomRecommendationsBySubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.customRecommendations.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCustomRecommendationsByManagementGroupScope();
  await listCustomRecommendationsBySecurityConnectorScope();
  await listCustomRecommendationsBySubscriptionScope();
}

main().catch(console.error);
