// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackManagementClient } from "@azure/arm-azurestack";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Returns the list of supported REST operations.
 *
 * @summary Returns the list of supported REST operations.
 * x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Operation/List.json
 */
async function returnsTheListOfSupportedRestOperations(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

returnsTheListOfSupportedRestOperations().catch(console.error);
