// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list OperatorApiPlan resources by subscription ID.
 *
 * @summary list OperatorApiPlan resources by subscription ID.
 * x-ms-original-file: 2025-03-30-preview/OperatorApiPlans_ListBySubscription_MaximumSet_Gen.json
 */
async function operatorApiPlansListBySubscriptionMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "93519EA0-206F-42A3-8126-A234F19328E0";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operatorApiPlans.listBySubscription({
    filter: "lbnapngejadkls",
    top: 18,
    skip: 2,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await operatorApiPlansListBySubscriptionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
