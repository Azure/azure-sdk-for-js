// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a PrefixListGlobalRulestackResource
 *
 * @summary create a PrefixListGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/PrefixListGlobalRulestack_CreateOrUpdate_MaximumSet_Gen.json
 */
async function prefixListGlobalRulestackCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.prefixListGlobalRulestack.createOrUpdate("praval", "armid1", {
    properties: {
      description: "string",
      auditComment: "comment",
      etag: "2bf4a339-294d-4c25-b0b2-ef649e9f5c27",
      prefixList: ["1.0.0.0/24"],
      provisioningState: "Accepted",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a PrefixListGlobalRulestackResource
 *
 * @summary create a PrefixListGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/PrefixListGlobalRulestack_CreateOrUpdate_MinimumSet_Gen.json
 */
async function prefixListGlobalRulestackCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.prefixListGlobalRulestack.createOrUpdate("praval", "armid1", {
    properties: { prefixList: ["1.0.0.0/24"] },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await prefixListGlobalRulestackCreateOrUpdateMaximumSetGen();
  await prefixListGlobalRulestackCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
