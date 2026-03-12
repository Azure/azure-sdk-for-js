// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProgrammableConnectivityClient } = require("@azure/arm-programmableconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list OperatorApiPlan resources by subscription ID.
 *
 * @summary list OperatorApiPlan resources by subscription ID.
 * x-ms-original-file: 2024-01-15-preview/OperatorApiPlans_ListBySubscription_MaximumSet_Gen.json
 */
async function operatorApiPlansListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operatorApiPlans.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await operatorApiPlansListBySubscription();
}

main().catch(console.error);
