// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WeightsAndBiasesClient } = require("@azure/arm-weightsandbiases");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list InstanceResource resources by subscription ID
 *
 * @summary list InstanceResource resources by subscription ID
 * x-ms-original-file: 2024-09-18-preview/Instances_ListBySubscription_MaximumSet_Gen.json
 */
async function instancesListBySubscriptionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0BCB047F-CB71-4DFE-B0BD-88519F411C2F";
  const client = new WeightsAndBiasesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instances.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list InstanceResource resources by subscription ID
 *
 * @summary list InstanceResource resources by subscription ID
 * x-ms-original-file: 2024-09-18-preview/Instances_ListBySubscription_MinimumSet_Gen.json
 */
async function instancesListBySubscriptionGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0BCB047F-CB71-4DFE-B0BD-88519F411C2F";
  const client = new WeightsAndBiasesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instances.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await instancesListBySubscriptionGeneratedByMaximumSetRule();
  await instancesListBySubscriptionGeneratedByMinimumSetRule();
}

main().catch(console.error);
