// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes a NVA connection.
 *
 * @summary Deletes a NVA connection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceConnectionDelete.json
 */
async function networkVirtualApplianceConnectionDelete() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva1";
  const connectionName = "connection1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualApplianceConnections.beginDeleteAndWait(
    resourceGroupName,
    networkVirtualApplianceName,
    connectionName,
  );
  console.log(result);
}

async function main() {
  await networkVirtualApplianceConnectionDelete();
}

main().catch(console.error);
