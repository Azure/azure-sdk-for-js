// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes the specified Azure Firewall.
 *
 * @summary Deletes the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/AzureFirewallDelete.json
 */
async function deleteAzureFirewall() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const azureFirewallName = "azurefirewall";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.beginDeleteAndWait(
    resourceGroupName,
    azureFirewallName,
  );
  console.log(result);
}

async function main() {
  await deleteAzureFirewall();
}

main().catch(console.error);
