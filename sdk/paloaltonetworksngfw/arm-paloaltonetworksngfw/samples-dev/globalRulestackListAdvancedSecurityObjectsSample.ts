// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the list of advanced security objects
 *
 * @summary Get the list of advanced security objects
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/GlobalRulestack_listAdvancedSecurityObjects_MaximumSet_Gen.json
 */

import type { GlobalRulestackListAdvancedSecurityObjectsOptionalParams } from "@azure/arm-paloaltonetworksngfw";
import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function globalRulestackListAdvancedSecurityObjectsMaximumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const skip = "a6a321";
  const top = 20;
  const typeParam = "globalRulestacks";
  const options: GlobalRulestackListAdvancedSecurityObjectsOptionalParams = {
    skip,
    top,
  };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listAdvancedSecurityObjects(
    globalRulestackName,
    typeParam,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get the list of advanced security objects
 *
 * @summary Get the list of advanced security objects
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/GlobalRulestack_listAdvancedSecurityObjects_MinimumSet_Gen.json
 */
async function globalRulestackListAdvancedSecurityObjectsMinimumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const typeParam = "globalRulestacks";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listAdvancedSecurityObjects(
    globalRulestackName,
    typeParam,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await globalRulestackListAdvancedSecurityObjectsMaximumSetGen();
  await globalRulestackListAdvancedSecurityObjectsMinimumSetGen();
}

main().catch(console.error);
