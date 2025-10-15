// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to support info for rulestack.
 *
 * @summary support info for rulestack.
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/LocalRulestacks_getSupportInfo_MaximumSet_Gen.json
 */

import type { LocalRulestacksGetSupportInfoOptionalParams } from "@azure/arm-paloaltonetworksngfw";
import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function localRulestacksGetSupportInfoMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const localRulestackName = "lrs1";
  const email = "user1@domain.com";
  const options: LocalRulestacksGetSupportInfoOptionalParams = { email };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.getSupportInfo(
    resourceGroupName,
    localRulestackName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to support info for rulestack.
 *
 * @summary support info for rulestack.
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/LocalRulestacks_getSupportInfo_MinimumSet_Gen.json
 */
async function localRulestacksGetSupportInfoMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const localRulestackName = "lrs1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.getSupportInfo(resourceGroupName, localRulestackName);
  console.log(result);
}

async function main(): Promise<void> {
  await localRulestacksGetSupportInfoMaximumSetGen();
  await localRulestacksGetSupportInfoMinimumSetGen();
}

main().catch(console.error);
