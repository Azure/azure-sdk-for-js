// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureChangeAnalysisManagementClient } from "@azure/arm-changeanalysis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Lists all the supported operations by the Microsoft.ChangeAnalysis resource provider along with their descriptions.
 *
 * @summary Lists all the supported operations by the Microsoft.ChangeAnalysis resource provider along with their descriptions.
 * x-ms-original-file: specification/changeanalysis/resource-manager/Microsoft.ChangeAnalysis/stable/2021-04-01/examples/OperationsList.json
 */
async function operationsList(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AzureChangeAnalysisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

operationsList().catch(console.error);
