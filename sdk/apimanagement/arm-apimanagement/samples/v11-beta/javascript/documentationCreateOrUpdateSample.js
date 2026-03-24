// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new Documentation or updates an existing one.
 *
 * @summary creates a new Documentation or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateDocumentation.json
 */
async function apiManagementCreateDocumentation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.documentation.createOrUpdate(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    { content: "content", title: "Title" },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateDocumentation();
}

main().catch(console.error);
