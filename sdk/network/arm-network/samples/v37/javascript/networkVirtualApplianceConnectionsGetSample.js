// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of specified NVA connection.
 *
 * @summary retrieves the details of specified NVA connection.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceConnectionGet.json
 */
async function networkVirtualApplianceConnectionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualApplianceConnections.get("rg1", "nva1", "connection1");
  console.log(result);
}

async function main() {
  await networkVirtualApplianceConnectionGet();
}

main().catch(console.error);
