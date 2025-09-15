// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DisconnectedOperationsManagementClient } = require("@azure/arm-disconnectedoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DisconnectedOperation
 *
 * @summary delete a DisconnectedOperation
 * x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_Delete_MaximumSet_Gen.json
 */
async function disconnectedOperationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "301DCB09-82EC-4777-A56C-6FFF26BCC814";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  await client.disconnectedOperations.delete("rgdisconnectedoperations", "demo-resource");
}

async function main() {
  await disconnectedOperationsDelete();
}

main().catch(console.error);
