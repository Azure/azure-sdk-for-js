// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a CertificateObjectLocalRulestackResource
 *
 * @summary get a CertificateObjectLocalRulestackResource
 * x-ms-original-file: 2025-10-08/CertificateObjectLocalRulestack_Get_MaximumSet_Gen.json
 */
async function certificateObjectLocalRulestackGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.certificateObjectLocalRulestack.get("rgopenapi", "lrs1", "armid1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a CertificateObjectLocalRulestackResource
 *
 * @summary get a CertificateObjectLocalRulestackResource
 * x-ms-original-file: 2025-10-08/CertificateObjectLocalRulestack_Get_MinimumSet_Gen.json
 */
async function certificateObjectLocalRulestackGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.certificateObjectLocalRulestack.get("rgopenapi", "lrs1", "armid1");
  console.log(result);
}

async function main() {
  await certificateObjectLocalRulestackGetMaximumSetGen();
  await certificateObjectLocalRulestackGetMinimumSetGen();
}

main().catch(console.error);
