// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get Global Rulestack associated with the Firewall
 *
 * @summary Get Global Rulestack associated with the Firewall
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/Firewalls_getGlobalRulestack_MaximumSet_Gen.json
 */
async function firewallsGetGlobalRulestackMaximumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "firewall-rg";
  const firewallName = "firewall1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.getGlobalRulestack(resourceGroupName, firewallName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get Global Rulestack associated with the Firewall
 *
 * @summary Get Global Rulestack associated with the Firewall
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/Firewalls_getGlobalRulestack_MinimumSet_Gen.json
 */
async function firewallsGetGlobalRulestackMinimumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "firewall-rg";
  const firewallName = "firewall1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.getGlobalRulestack(resourceGroupName, firewallName);
  console.log(result);
}

async function main() {
  await firewallsGetGlobalRulestackMaximumSetGen();
  await firewallsGetGlobalRulestackMinimumSetGen();
}

main().catch(console.error);
