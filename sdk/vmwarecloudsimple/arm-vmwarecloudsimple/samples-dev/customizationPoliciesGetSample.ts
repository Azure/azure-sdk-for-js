// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns customization policy by its name
 *
 * @summary Returns customization policy by its name
 * x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetCustomizationPolicy.json
 */

import { VMwareCloudSimple } from "@azure/arm-vmwarecloudsimple";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCustomizationPolicy(): Promise<void> {
  const subscriptionId = process.env["VMWARECLOUDSIMPLE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const regionId = "myResourceGroup";
  const pcName = "myPrivateCloud";
  const customizationPolicyName = "Linux1";
  const credential = new DefaultAzureCredential();
  const client = new VMwareCloudSimple(credential, subscriptionId);
  const result = await client.customizationPolicies.get(regionId, pcName, customizationPolicyName);
  console.log(result);
}

async function main(): Promise<void> {
  await getCustomizationPolicy();
}

main().catch(console.error);
