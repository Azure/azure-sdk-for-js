// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the operation status for the given operation id.
 *
 * @summary gets the operation status for the given operation id.
 * x-ms-original-file: 2025-05-01/NspOperationStatusGet.json
 */
async function nspOperationStatusGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterOperationStatuses.get(
    "location1",
    "operationId1",
  );
  console.log(result);
}

async function main() {
  await nspOperationStatusGet();
}

main().catch(console.error);
