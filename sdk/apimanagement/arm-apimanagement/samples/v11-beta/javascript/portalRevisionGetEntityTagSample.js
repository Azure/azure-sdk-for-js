// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the developer portal revision specified by its identifier.
 *
 * @summary gets the developer portal revision specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadPortalRevision.json
 */
async function apiManagementHeadPortalRevision() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.portalRevision.getEntityTag("rg1", "apimService1", "20201112101010");
}

async function main() {
  await apiManagementHeadPortalRevision();
}

main().catch(console.error);
