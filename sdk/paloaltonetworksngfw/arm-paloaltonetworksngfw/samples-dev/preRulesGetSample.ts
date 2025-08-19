// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a PreRulesResource
 *
 * @summary Get a PreRulesResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/PreRules_Get_MaximumSet_Gen.json
 */

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function preRulesGetMaximumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.get(globalRulestackName, priority);
  console.log(result);
}

/**
 * This sample demonstrates how to Get a PreRulesResource
 *
 * @summary Get a PreRulesResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/PreRules_Get_MinimumSet_Gen.json
 */
async function preRulesGetMinimumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.get(globalRulestackName, priority);
  console.log(result);
}

async function main(): Promise<void> {
  await preRulesGetMaximumSetGen();
  await preRulesGetMinimumSetGen();
}

main().catch(console.error);
