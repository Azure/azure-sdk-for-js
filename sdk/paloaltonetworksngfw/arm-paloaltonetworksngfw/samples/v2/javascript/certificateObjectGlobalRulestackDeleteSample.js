// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a CertificateObjectGlobalRulestackResource
 *
 * @summary delete a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/CertificateObjectGlobalRulestack_Delete_MaximumSet_Gen.json
 */
async function certificateObjectGlobalRulestackDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.certificateObjectGlobalRulestack.delete("praval", "armid1");
}

/**
 * This sample demonstrates how to delete a CertificateObjectGlobalRulestackResource
 *
 * @summary delete a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/CertificateObjectGlobalRulestack_Delete_MinimumSet_Gen.json
 */
async function certificateObjectGlobalRulestackDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.certificateObjectGlobalRulestack.delete("praval", "armid1");
}

async function main() {
  await certificateObjectGlobalRulestackDeleteMaximumSetGen();
  await certificateObjectGlobalRulestackDeleteMinimumSetGen();
}

main().catch(console.error);
