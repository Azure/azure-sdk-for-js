// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List the security services for rulestack
 *
 * @summary List the security services for rulestack
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/GlobalRulestack_listSecurityServices_MaximumSet_Gen.json
 */

import type { GlobalRulestackListSecurityServicesOptionalParams } from "@azure/arm-paloaltonetworksngfw";
import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function globalRulestackListSecurityServicesMaximumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const skip = "a6a321";
  const top = 20;
  const typeParam = "globalRulestacks";
  const options: GlobalRulestackListSecurityServicesOptionalParams = {
    skip,
    top,
  };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listSecurityServices(
    globalRulestackName,
    typeParam,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to List the security services for rulestack
 *
 * @summary List the security services for rulestack
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/GlobalRulestack_listSecurityServices_MinimumSet_Gen.json
 */
async function globalRulestackListSecurityServicesMinimumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const typeParam = "globalRulestacks";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listSecurityServices(globalRulestackName, typeParam);
  console.log(result);
}

async function main(): Promise<void> {
  await globalRulestackListSecurityServicesMaximumSetGen();
  await globalRulestackListSecurityServicesMinimumSetGen();
}

main().catch(console.error);
