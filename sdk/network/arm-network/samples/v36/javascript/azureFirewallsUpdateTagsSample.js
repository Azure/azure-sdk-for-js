// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates tags of an Azure Firewall resource.
 *
 * @summary Updates tags of an Azure Firewall resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/AzureFirewallUpdateTags.json
 */
async function updateAzureFirewallTags() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "azfwtest";
  const azureFirewallName = "fw1";
  const parameters = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.beginUpdateTagsAndWait(
    resourceGroupName,
    azureFirewallName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateAzureFirewallTags();
}

main().catch(console.error);
