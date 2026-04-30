// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the operation status for the given operation id.
 *
 * @summary Gets the operation status for the given operation id.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspOperationStatusGet.json
 */
async function nspOperationStatusGet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const location = "location1";
  const operationId = "operationId1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterOperationStatuses.get(location, operationId);
  console.log(result);
}

async function main() {
  await nspOperationStatusGet();
}

main().catch(console.error);
