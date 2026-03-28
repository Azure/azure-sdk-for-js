// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the named value specified by its identifier.
 *
 * @summary gets the details of the named value specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetNamedValue.json
 */
async function apiManagementGetNamedValue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.namedValue.get("rg1", "apimService1", "testarmTemplateproperties2");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the details of the named value specified by its identifier.
 *
 * @summary gets the details of the named value specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetNamedValueWithKeyVault.json
 */
async function apiManagementGetNamedValueWithKeyVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.namedValue.get("rg1", "apimService1", "testprop6");
  console.log(result);
}

async function main() {
  await apiManagementGetNamedValue();
  await apiManagementGetNamedValueWithKeyVault();
}

main().catch(console.error);
