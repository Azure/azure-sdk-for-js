// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a CertificateObjectGlobalRulestackResource
 *
 * @summary get a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/CertificateObjectGlobalRulestack_Get_MaximumSet_Gen.json
 */
async function certificateObjectGlobalRulestackGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.get("praval", "armid1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a CertificateObjectGlobalRulestackResource
 *
 * @summary get a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/CertificateObjectGlobalRulestack_Get_MinimumSet_Gen.json
 */
async function certificateObjectGlobalRulestackGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.get("praval", "armid1");
  console.log(result);
}

async function main() {
  await certificateObjectGlobalRulestackGetMaximumSetGen();
  await certificateObjectGlobalRulestackGetMinimumSetGen();
}

main().catch(console.error);
