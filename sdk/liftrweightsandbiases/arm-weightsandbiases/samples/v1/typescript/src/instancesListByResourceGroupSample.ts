// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WeightsAndBiasesClient } from "@azure/arm-weightsandbiases";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list InstanceResource resources by resource group
 *
 * @summary list InstanceResource resources by resource group
 * x-ms-original-file: 2024-09-18/Instances_ListByResourceGroup_MaximumSet_Gen.json
 */
async function instancesListByResourceGroupGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0BCB047F-CB71-4DFE-B0BD-88519F411C2F";
  const client = new WeightsAndBiasesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instances.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list InstanceResource resources by resource group
 *
 * @summary list InstanceResource resources by resource group
 * x-ms-original-file: 2024-09-18/Instances_ListByResourceGroup_MinimumSet_Gen.json
 */
async function instancesListByResourceGroupGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0BCB047F-CB71-4DFE-B0BD-88519F411C2F";
  const client = new WeightsAndBiasesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instances.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await instancesListByResourceGroupGeneratedByMaximumSetRule();
  await instancesListByResourceGroupGeneratedByMinimumSetRule();
}

main().catch(console.error);
