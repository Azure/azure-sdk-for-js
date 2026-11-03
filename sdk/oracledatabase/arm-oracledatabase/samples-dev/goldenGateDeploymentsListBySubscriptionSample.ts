// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list GoldenGateDeployment resources by subscription ID
 *
 * @summary list GoldenGateDeployment resources by subscription ID
 * x-ms-original-file: 2026-06-01/GoldenGateDeployments_ListBySubscription_MaximumSet_Gen.json
 */
async function goldenGateDeploymentsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.goldenGateDeployments.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await goldenGateDeploymentsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
