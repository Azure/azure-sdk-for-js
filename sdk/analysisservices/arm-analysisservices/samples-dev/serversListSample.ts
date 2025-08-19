// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the Analysis Services servers for the given subscription.
 *
 * @summary Lists all the Analysis Services servers for the given subscription.
 * x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/listServers.json
 */

import { AzureAnalysisServices } from "@azure/arm-analysisservices";
import { DefaultAzureCredential } from "@azure/identity";

async function listExistingServersUnderTheSubscription(): Promise<void> {
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const credential = new DefaultAzureCredential();
  const client = new AzureAnalysisServices(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.servers.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listExistingServersUnderTheSubscription().catch(console.error);
