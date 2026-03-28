// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists developer portal's revisions.
 *
 * @summary lists developer portal's revisions.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListPortalRevisions.json
 */
async function apiManagementListPortalRevisions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.portalRevision.listByService("rg1", "apimService1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListPortalRevisions();
}

main().catch(console.error);
