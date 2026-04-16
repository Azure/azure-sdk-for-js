// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete a CertificateObjectGlobalRulestackResource
 *
 * @summary Delete a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/CertificateObjectGlobalRulestack_Delete_MaximumSet_Gen.json
 */
async function certificateObjectGlobalRulestackDeleteMaximumSetGen() {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.beginDeleteAndWait(
    globalRulestackName,
    name,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a CertificateObjectGlobalRulestackResource
 *
 * @summary Delete a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/CertificateObjectGlobalRulestack_Delete_MinimumSet_Gen.json
 */
async function certificateObjectGlobalRulestackDeleteMinimumSetGen() {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.beginDeleteAndWait(
    globalRulestackName,
    name,
  );
  console.log(result);
}

async function main() {
  await certificateObjectGlobalRulestackDeleteMaximumSetGen();
  await certificateObjectGlobalRulestackDeleteMinimumSetGen();
}

main().catch(console.error);
