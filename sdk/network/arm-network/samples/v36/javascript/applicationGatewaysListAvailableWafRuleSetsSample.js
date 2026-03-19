// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all available web application firewall rule sets.
 *
 * @summary Lists all available web application firewall rule sets.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ApplicationGatewayAvailableWafRuleSetsGet.json
 */
async function getAvailableWafRuleSets() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.listAvailableWafRuleSets();
  console.log(result);
}

async function main() {
  await getAvailableWafRuleSets();
}

main().catch(console.error);
