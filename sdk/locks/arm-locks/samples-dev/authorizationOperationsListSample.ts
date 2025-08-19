// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementLockClient } from "@azure/arm-locks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Lists all of the available Microsoft.Authorization REST API operations.
 *
 * @summary Lists all of the available Microsoft.Authorization REST API operations.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ListProviderOperations.json
 */
async function listProviderOperations(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authorizationOperations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listProviderOperations().catch(console.error);
