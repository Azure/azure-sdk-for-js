// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get a CertificateObjectLocalRulestackResource
 *
 * @summary Get a CertificateObjectLocalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/CertificateObjectLocalRulestack_Get_MaximumSet_Gen.json
 */
async function certificateObjectLocalRulestackGetMaximumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const localRulestackName = "lrs1";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.certificateObjectLocalRulestack.get(
    resourceGroupName,
    localRulestackName,
    name,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get a CertificateObjectLocalRulestackResource
 *
 * @summary Get a CertificateObjectLocalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/CertificateObjectLocalRulestack_Get_MinimumSet_Gen.json
 */
async function certificateObjectLocalRulestackGetMinimumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const localRulestackName = "lrs1";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.certificateObjectLocalRulestack.get(
    resourceGroupName,
    localRulestackName,
    name,
  );
  console.log(result);
}

async function main() {
  await certificateObjectLocalRulestackGetMaximumSetGen();
  await certificateObjectLocalRulestackGetMinimumSetGen();
}

main().catch(console.error);
