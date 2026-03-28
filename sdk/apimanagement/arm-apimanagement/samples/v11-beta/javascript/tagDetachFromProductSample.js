// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to detach the tag from the Product.
 *
 * @summary detach the tag from the Product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteProductTag.json
 */
async function apiManagementDeleteProductTag() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.tag.detachFromProduct(
    "rg1",
    "apimService1",
    "59d5b28d1f7fab116c282650",
    "59d5b28e1f7fab116402044e",
  );
}

async function main() {
  await apiManagementDeleteProductTag();
}

main().catch(console.error);
