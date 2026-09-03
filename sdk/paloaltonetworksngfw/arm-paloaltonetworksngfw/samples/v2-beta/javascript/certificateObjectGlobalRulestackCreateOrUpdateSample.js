// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a CertificateObjectGlobalRulestackResource
 *
 * @summary create a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/CertificateObjectGlobalRulestack_CreateOrUpdate_MaximumSet_Gen.json
 */
async function certificateObjectGlobalRulestackCreateOrUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.createOrUpdate("praval", "armid1", {
    description: "description",
    auditComment: "comment",
    certificateSelfSigned: "TRUE",
    certificateSignerResourceId: "",
    etag: "2bf4a339-294d-4c25-b0b2-ef649e9f5c27",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a CertificateObjectGlobalRulestackResource
 *
 * @summary create a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/CertificateObjectGlobalRulestack_CreateOrUpdate_MinimumSet_Gen.json
 */
async function certificateObjectGlobalRulestackCreateOrUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.createOrUpdate("praval", "armid1", {
    certificateSelfSigned: "TRUE",
  });
  console.log(result);
}

async function main() {
  await certificateObjectGlobalRulestackCreateOrUpdateMaximumSetGen();
  await certificateObjectGlobalRulestackCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
