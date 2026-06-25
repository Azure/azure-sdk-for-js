// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list OperatorApiConnection resources by resource group.
 *
 * @summary list OperatorApiConnection resources by resource group.
 * x-ms-original-file: 2025-03-30-preview/OperatorApiConnections_ListByResourceGroup_MaximumSet_Gen.json
 */
async function operatorApiConnectionsListByResourceGroupMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "93519EA0-206F-42A3-8126-A234F19328E0";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operatorApiConnections.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await operatorApiConnectionsListByResourceGroupMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
