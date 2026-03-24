// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to detach the tag from the Operation.
 *
 * @summary detach the tag from the Operation.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiOperationTag.json
 */
async function apiManagementDeleteApiOperationTag() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.tag.detachFromOperation(
    "rg1",
    "apimService1",
    "59d5b28d1f7fab116c282650",
    "59d5b28d1f7fab116c282651",
    "59d5b28e1f7fab116402044e",
  );
}

async function main() {
  await apiManagementDeleteApiOperationTag();
}

main().catch(console.error);
