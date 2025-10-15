// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists eligible SKUs for Analysis Services resource provider.
 *
 * @summary Lists eligible SKUs for Analysis Services resource provider.
 * x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/listSkusForNew.json
 */

import { AzureAnalysisServices } from "@azure/arm-analysisservices";
import { DefaultAzureCredential } from "@azure/identity";

async function listEligibleSkUsForANewServer(): Promise<void> {
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const credential = new DefaultAzureCredential();
  const client = new AzureAnalysisServices(credential, subscriptionId);
  const result = await client.servers.listSkusForNew();
  console.log(result);
}

listEligibleSkUsForANewServer().catch(console.error);
