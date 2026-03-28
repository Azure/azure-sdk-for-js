// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the developer portal's revision specified by its identifier.
 *
 * @summary gets the developer portal's revision specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetPortalRevision.json
 */
async function apiManagementGetPortalRevision() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.portalRevision.get("rg1", "apimService1", "20201112101010");
  console.log(result);
}

async function main() {
  await apiManagementGetPortalRevision();
}

main().catch(console.error);
