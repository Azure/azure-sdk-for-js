// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the API link for the tag.
 *
 * @summary gets the API link for the tag.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetTagApiLink.json
 */
async function apiManagementGetTagApiLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tagApiLink.get("rg1", "apimService1", "tag1", "link1");
  console.log(result);
}

async function main() {
  await apiManagementGetTagApiLink();
}

main().catch(console.error);
