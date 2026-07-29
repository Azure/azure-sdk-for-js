// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all relevant security standards over a scope
 *
 * @summary get a list of all relevant security standards over a scope
 * x-ms-original-file: 2024-08-01/SecurityStandards/ListByManagementGroupSecurityStandards_example.json
 */
async function listSecurityStandardsByManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.securityStandards.list(
    "providers/Microsoft.Management/managementGroups/contoso",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get a list of all relevant security standards over a scope
 *
 * @summary get a list of all relevant security standards over a scope
 * x-ms-original-file: 2024-08-01/SecurityStandards/ListBySecurityConnectorSecurityStandards_example.json
 */
async function listSecurityStandardsBySecurityConnectorScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.securityStandards.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get a list of all relevant security standards over a scope
 *
 * @summary get a list of all relevant security standards over a scope
 * x-ms-original-file: 2024-08-01/SecurityStandards/ListBySubscriptionSecurityStandards_example.json
 */
async function listSecurityStandardsBySubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.securityStandards.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSecurityStandardsByManagementGroupScope();
  await listSecurityStandardsBySecurityConnectorScope();
  await listSecurityStandardsBySubscriptionScope();
}

main().catch(console.error);
