// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HyperExecuteClient } from "@azure/arm-lambdatesthyperexecute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a OrganizationResource
 *
 * @summary get a OrganizationResource
 * x-ms-original-file: 2024-02-01/Organizations_Get_MaximumSet_Gen.json
 */
async function organizationsGetMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "171E7A75-341B-4472-BC4C-7603C5AB9F32";
  const client = new HyperExecuteClient(credential, subscriptionId);
  const result = await client.organizations.get("rgopenapi", "testorg");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
