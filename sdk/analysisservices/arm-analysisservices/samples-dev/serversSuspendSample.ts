// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Suspends operation of the specified Analysis Services server instance.
 *
 * @summary Suspends operation of the specified Analysis Services server instance.
 * x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/suspendServer.json
 */

import { AzureAnalysisServices } from "@azure/arm-analysisservices";
import { DefaultAzureCredential } from "@azure/identity";

async function suspendAServer(): Promise<void> {
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const resourceGroupName = "TestRG";
  const serverName = "azsdktest";
  const credential = new DefaultAzureCredential();
  const client = new AzureAnalysisServices(credential, subscriptionId);
  const result = await client.servers.beginSuspendAndWait(resourceGroupName, serverName);
  console.log(result);
}

suspendAServer().catch(console.error);
