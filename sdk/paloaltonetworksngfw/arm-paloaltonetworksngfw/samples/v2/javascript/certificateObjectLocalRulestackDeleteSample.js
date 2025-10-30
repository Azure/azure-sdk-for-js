// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a CertificateObjectLocalRulestackResource
 *
 * @summary delete a CertificateObjectLocalRulestackResource
 * x-ms-original-file: 2025-10-08/CertificateObjectLocalRulestack_Delete_MaximumSet_Gen.json
 */
async function certificateObjectLocalRulestackDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.certificateObjectLocalRulestack.delete("rgopenapi", "lrs1", "armid1");
}

/**
 * This sample demonstrates how to delete a CertificateObjectLocalRulestackResource
 *
 * @summary delete a CertificateObjectLocalRulestackResource
 * x-ms-original-file: 2025-10-08/CertificateObjectLocalRulestack_Delete_MinimumSet_Gen.json
 */
async function certificateObjectLocalRulestackDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.certificateObjectLocalRulestack.delete("rgopenapi", "lrs1", "armid1");
}

async function main() {
  await certificateObjectLocalRulestackDeleteMaximumSetGen();
  await certificateObjectLocalRulestackDeleteMinimumSetGen();
}

main().catch(console.error);
