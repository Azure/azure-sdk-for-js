// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a PrefixListResource
 *
 * @summary create a PrefixListResource
 * x-ms-original-file: 2025-10-08/PrefixListLocalRulestack_CreateOrUpdate_MaximumSet_Gen.json
 */
async function prefixListLocalRulestackCreateOrUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.prefixListLocalRulestack.createOrUpdate(
    "rgopenapi",
    "lrs1",
    "armid1",
    {
      properties: {
        description: "string",
        auditComment: "comment",
        etag: "2bf4a339-294d-4c25-b0b2-ef649e9f5c27",
        prefixList: ["1.0.0.0/24"],
        provisioningState: "Accepted",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a PrefixListResource
 *
 * @summary create a PrefixListResource
 * x-ms-original-file: 2025-10-08/PrefixListLocalRulestack_CreateOrUpdate_MinimumSet_Gen.json
 */
async function prefixListLocalRulestackCreateOrUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.prefixListLocalRulestack.createOrUpdate(
    "rgopenapi",
    "lrs1",
    "armid1",
    { properties: { prefixList: ["1.0.0.0/24"] } },
  );
  console.log(result);
}

async function main() {
  await prefixListLocalRulestackCreateOrUpdateMaximumSetGen();
  await prefixListLocalRulestackCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
