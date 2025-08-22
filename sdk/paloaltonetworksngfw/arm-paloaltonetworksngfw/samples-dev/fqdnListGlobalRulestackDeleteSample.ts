// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a FqdnListGlobalRulestackResource
 *
 * @summary Delete a FqdnListGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/FqdnListGlobalRulestack_Delete_MaximumSet_Gen.json
 */

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function fqdnListGlobalRulestackDeleteMaximumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.fqdnListGlobalRulestack.beginDeleteAndWait(globalRulestackName, name);
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a FqdnListGlobalRulestackResource
 *
 * @summary Delete a FqdnListGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/FqdnListGlobalRulestack_Delete_MinimumSet_Gen.json
 */
async function fqdnListGlobalRulestackDeleteMinimumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.fqdnListGlobalRulestack.beginDeleteAndWait(globalRulestackName, name);
  console.log(result);
}

async function main(): Promise<void> {
  await fqdnListGlobalRulestackDeleteMaximumSetGen();
  await fqdnListGlobalRulestackDeleteMinimumSetGen();
}

main().catch(console.error);
