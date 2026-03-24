// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get tag associated with the Operation.
 *
 * @summary get tag associated with the Operation.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetApiOperationTag.json
 */
async function apiManagementGetApiOperationTag() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tag.getByOperation(
    "rg1",
    "apimService1",
    "59d6bb8f1f7fab13dc67ec9b",
    "59d6bb8f1f7fab13dc67ec9a",
    "59306a29e4bbd510dc24e5f9",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetApiOperationTag();
}

main().catch(console.error);
