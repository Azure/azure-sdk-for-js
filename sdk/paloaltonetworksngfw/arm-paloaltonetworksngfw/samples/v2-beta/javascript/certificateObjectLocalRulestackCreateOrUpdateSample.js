// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a CertificateObjectLocalRulestackResource
 *
 * @summary create a CertificateObjectLocalRulestackResource
 * x-ms-original-file: 2025-10-08/CertificateObjectLocalRulestack_CreateOrUpdate_MaximumSet_Gen.json
 */
async function certificateObjectLocalRulestackCreateOrUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.certificateObjectLocalRulestack.createOrUpdate(
    "rgopenapi",
    "lrs1",
    "armid1",
    {
      properties: {
        description: "description",
        auditComment: "comment",
        certificateSelfSigned: "TRUE",
        certificateSignerResourceId: "",
        etag: "2bf4a339-294d-4c25-b0b2-ef649e9f5c27",
        provisioningState: "Accepted",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a CertificateObjectLocalRulestackResource
 *
 * @summary create a CertificateObjectLocalRulestackResource
 * x-ms-original-file: 2025-10-08/CertificateObjectLocalRulestack_CreateOrUpdate_MinimumSet_Gen.json
 */
async function certificateObjectLocalRulestackCreateOrUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.certificateObjectLocalRulestack.createOrUpdate(
    "rgopenapi",
    "lrs1",
    "armid1",
    { properties: { certificateSelfSigned: "TRUE" } },
  );
  console.log(result);
}

async function main() {
  await certificateObjectLocalRulestackCreateOrUpdateMaximumSetGen();
  await certificateObjectLocalRulestackCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
