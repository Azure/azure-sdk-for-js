// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExternalIdentitiesConfigurationClient } from "@azure/arm-azureadexternalidentities";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Lists the operations available from this provider.
 *
 * @summary Lists the operations available from this provider.
 * x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/OperationsList.json
 */
async function operationsList(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ExternalIdentitiesConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

operationsList().catch(console.error);
