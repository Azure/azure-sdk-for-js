// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get a CertificateObjectGlobalRulestackResource
 *
 * @summary Get a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/CertificateObjectGlobalRulestack_Get_MaximumSet_Gen.json
 */
async function certificateObjectGlobalRulestackGetMaximumSetGen() {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.get(globalRulestackName, name);
  console.log(result);
}

/**
 * This sample demonstrates how to Get a CertificateObjectGlobalRulestackResource
 *
 * @summary Get a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/CertificateObjectGlobalRulestack_Get_MinimumSet_Gen.json
 */
async function certificateObjectGlobalRulestackGetMinimumSetGen() {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.get(globalRulestackName, name);
  console.log(result);
}

async function main() {
  await certificateObjectGlobalRulestackGetMaximumSetGen();
  await certificateObjectGlobalRulestackGetMinimumSetGen();
}

main().catch(console.error);
