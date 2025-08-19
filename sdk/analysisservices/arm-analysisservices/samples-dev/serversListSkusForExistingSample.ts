// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists eligible SKUs for an Analysis Services resource.
 *
 * @summary Lists eligible SKUs for an Analysis Services resource.
 * x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/listSkusForExisting.json
 */

import { AzureAnalysisServices } from "@azure/arm-analysisservices";
import { DefaultAzureCredential } from "@azure/identity";

async function listEligibleSkUsForAnExistingServer(): Promise<void> {
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const resourceGroupName = "TestRG";
  const serverName = "azsdktest";
  const credential = new DefaultAzureCredential();
  const client = new AzureAnalysisServices(credential, subscriptionId);
  const result = await client.servers.listSkusForExisting(resourceGroupName, serverName);
  console.log(result);
}

listEligibleSkUsForAnExistingServer().catch(console.error);
