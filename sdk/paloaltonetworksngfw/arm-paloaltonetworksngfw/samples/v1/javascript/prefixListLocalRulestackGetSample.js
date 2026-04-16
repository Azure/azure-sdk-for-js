// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get a PrefixListResource
 *
 * @summary Get a PrefixListResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PrefixListLocalRulestack_Get_MaximumSet_Gen.json
 */
async function prefixListLocalRulestackGetMaximumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const localRulestackName = "lrs1";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.prefixListLocalRulestack.get(
    resourceGroupName,
    localRulestackName,
    name,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get a PrefixListResource
 *
 * @summary Get a PrefixListResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PrefixListLocalRulestack_Get_MinimumSet_Gen.json
 */
async function prefixListLocalRulestackGetMinimumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const localRulestackName = "lrs1";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.prefixListLocalRulestack.get(
    resourceGroupName,
    localRulestackName,
    name,
  );
  console.log(result);
}

async function main() {
  await prefixListLocalRulestackGetMaximumSetGen();
  await prefixListLocalRulestackGetMinimumSetGen();
}

main().catch(console.error);
