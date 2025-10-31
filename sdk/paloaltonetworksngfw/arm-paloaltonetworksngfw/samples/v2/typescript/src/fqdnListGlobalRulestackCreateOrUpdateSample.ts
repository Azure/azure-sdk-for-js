// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a FqdnListGlobalRulestackResource
 *
 * @summary create a FqdnListGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/FqdnListGlobalRulestack_CreateOrUpdate_MaximumSet_Gen.json
 */
async function fqdnListGlobalRulestackCreateOrUpdateMaximumSetGen(): Promise<void> {
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
async function fqdnListGlobalRulestackCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.fqdnListGlobalRulestack.createOrUpdate("praval", "armid1", {
    properties: { fqdnList: ["string1", "string2"] },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await fqdnListGlobalRulestackCreateOrUpdateMaximumSetGen();
  await fqdnListGlobalRulestackCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
