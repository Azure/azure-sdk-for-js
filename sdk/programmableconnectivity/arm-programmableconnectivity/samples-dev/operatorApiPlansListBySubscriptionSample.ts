// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list OperatorApiPlan resources by subscription ID.
 *
 * @summary list OperatorApiPlan resources by subscription ID.
 * x-ms-original-file: 2024-01-15-preview/OperatorApiPlans_ListBySubscription_MaximumSet_Gen.json
 */

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

async function operatorApiPlansListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operatorApiPlans.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await operatorApiPlansListBySubscription();
}

main().catch(console.error);
