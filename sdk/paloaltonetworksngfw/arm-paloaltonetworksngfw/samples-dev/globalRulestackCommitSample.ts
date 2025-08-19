// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Commit rulestack configuration
 *
 * @summary Commit rulestack configuration
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/GlobalRulestack_commit_MaximumSet_Gen.json
 */

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function globalRulestackCommitMaximumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.beginCommitAndWait(globalRulestackName);
  console.log(result);
}

/**
 * This sample demonstrates how to Commit rulestack configuration
 *
 * @summary Commit rulestack configuration
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/GlobalRulestack_commit_MinimumSet_Gen.json
 */
async function globalRulestackCommitMinimumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.beginCommitAndWait(globalRulestackName);
  console.log(result);
}

async function main(): Promise<void> {
  await globalRulestackCommitMaximumSetGen();
  await globalRulestackCommitMinimumSetGen();
}

main().catch(console.error);
