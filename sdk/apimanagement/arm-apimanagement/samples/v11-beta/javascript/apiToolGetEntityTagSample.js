// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the API tool specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the API tool specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadApiTool.json
 */
async function apiManagementHeadApiTool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiTool.getEntityTag(
    "rg1",
    "apimService1",
    "57d2ef278aa04f0888cba3f3",
    "57d2ef278aa04f0ad01d6cdc",
  );
}

async function main() {
  await apiManagementHeadApiTool();
}

main().catch(console.error);
