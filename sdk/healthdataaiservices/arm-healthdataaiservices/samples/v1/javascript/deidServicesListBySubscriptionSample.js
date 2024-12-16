// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthDataAIServicesClient } = require("@azure/arm-healthdataaiservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DeidService resources by subscription ID
 *
 * @summary list DeidService resources by subscription ID
 * x-ms-original-file: 2024-09-20/DeidServices_ListBySubscription_MaximumSet_Gen.json
 */
async function deidServicesListBySubscriptionGeneratedByMaximumSetRuleStable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F21BB31B-C214-42C0-ACF0-DACCA05D3011";
  const client = new HealthDataAIServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.deidServices.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  deidServicesListBySubscriptionGeneratedByMaximumSetRuleStable();
}

main().catch(console.error);
