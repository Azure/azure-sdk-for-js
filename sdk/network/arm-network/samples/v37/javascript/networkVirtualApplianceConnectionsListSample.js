// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists NetworkVirtualApplianceConnections under the NVA.
 *
 * @summary lists NetworkVirtualApplianceConnections under the NVA.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceConnectionList.json
 */
async function networkVirtualApplianceConnectionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkVirtualApplianceConnections.list("rg1", "nva1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkVirtualApplianceConnectionList();
}

main().catch(console.error);
