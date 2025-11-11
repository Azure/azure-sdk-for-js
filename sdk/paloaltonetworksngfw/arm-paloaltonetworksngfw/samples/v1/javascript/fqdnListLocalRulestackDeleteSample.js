// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete a FqdnListLocalRulestackResource
 *
 * @summary Delete a FqdnListLocalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/FqdnListLocalRulestack_Delete_MaximumSet_Gen.json
 */
async function fqdnListLocalRulestackDeleteMaximumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const localRulestackName = "lrs1";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.fqdnListLocalRulestack.beginDeleteAndWait(
    resourceGroupName,
    localRulestackName,
    name,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a FqdnListLocalRulestackResource
 *
 * @summary Delete a FqdnListLocalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/FqdnListLocalRulestack_Delete_MinimumSet_Gen.json
 */
async function fqdnListLocalRulestackDeleteMinimumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const localRulestackName = "lrs1";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.fqdnListLocalRulestack.beginDeleteAndWait(
    resourceGroupName,
    localRulestackName,
    name,
  );
  console.log(result);
}

async function main() {
  await fqdnListLocalRulestackDeleteMaximumSetGen();
  await fqdnListLocalRulestackDeleteMinimumSetGen();
}

main().catch(console.error);
