// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to adds an Product to the specified Client Application via link.
 *
 * @summary adds an Product to the specified Client Application via link.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateClientApplicationProductLink.json
 */
async function apiManagementCreateClientApplicationProductLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.clientApplicationProductLink.create(
    "rg1",
    "apimService1",
    "testAppId",
    "link1",
    {
      productId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/products/starter",
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateClientApplicationProductLink();
}

main().catch(console.error);
