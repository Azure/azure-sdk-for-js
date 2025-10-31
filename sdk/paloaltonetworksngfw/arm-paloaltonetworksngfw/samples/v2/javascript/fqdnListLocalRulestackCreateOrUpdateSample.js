// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a FqdnListLocalRulestackResource
 *
 * @summary create a FqdnListLocalRulestackResource
 * x-ms-original-file: 2025-10-08/FqdnListLocalRulestack_CreateOrUpdate_MaximumSet_Gen.json
 */
async function fqdnListLocalRulestackCreateOrUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.fqdnListLocalRulestack.createOrUpdate("rgopenapi", "lrs1", "armid1", {
    properties: {
      description: "string",
      auditComment: "string",
      etag: "aaaaaaaaaaaaaaaaaa",
      fqdnList: ["string1", "string2"],
      provisioningState: "Accepted",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a FqdnListLocalRulestackResource
 *
 * @summary create a FqdnListLocalRulestackResource
 * x-ms-original-file: 2025-10-08/FqdnListLocalRulestack_CreateOrUpdate_MinimumSet_Gen.json
 */
async function fqdnListLocalRulestackCreateOrUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.fqdnListLocalRulestack.createOrUpdate("rgopenapi", "lrs1", "armid1", {
    properties: { fqdnList: ["string1", "string2"] },
  });
  console.log(result);
}

async function main() {
  await fqdnListLocalRulestackCreateOrUpdateMaximumSetGen();
  await fqdnListLocalRulestackCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
