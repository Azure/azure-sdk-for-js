// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list OperatorApiConnection resources by subscription ID.
 *
 * @summary list OperatorApiConnection resources by subscription ID.
 * x-ms-original-file: 2025-03-30-preview/OperatorApiConnections_ListBySubscription_MaximumSet_Gen.json
 */
async function operatorApiConnectionsListBySubscriptionMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "93519EA0-206F-42A3-8126-A234F19328E0";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operatorApiConnections.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await operatorApiConnectionsListBySubscriptionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
