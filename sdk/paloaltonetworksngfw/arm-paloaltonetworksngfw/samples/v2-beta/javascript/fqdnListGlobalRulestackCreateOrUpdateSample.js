// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a FqdnListGlobalRulestackResource
 *
 * @summary create a FqdnListGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/FqdnListGlobalRulestack_CreateOrUpdate_MaximumSet_Gen.json
 */
async function fqdnListGlobalRulestackCreateOrUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.fqdnListGlobalRulestack.createOrUpdate("praval", "armid1", {
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
 * This sample demonstrates how to create a FqdnListGlobalRulestackResource
 *
 * @summary create a FqdnListGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/FqdnListGlobalRulestack_CreateOrUpdate_MinimumSet_Gen.json
 */
async function fqdnListGlobalRulestackCreateOrUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.fqdnListGlobalRulestack.createOrUpdate("praval", "armid1", {
    properties: { fqdnList: ["string1", "string2"] },
  });
  console.log(result);
}

async function main() {
  await fqdnListGlobalRulestackCreateOrUpdateMaximumSetGen();
  await fqdnListGlobalRulestackCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
