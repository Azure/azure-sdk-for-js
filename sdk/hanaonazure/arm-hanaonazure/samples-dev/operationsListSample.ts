// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HanaManagementClient } from "@azure/arm-hanaonazure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets a list of SAP HANA management operations.
 *
 * @summary Gets a list of SAP HANA management operations.
 * x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/HanaOperations_List.json
 */
async function listAllHanaManagementOperationsSupportedByHanaRp(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new HanaManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listAllHanaManagementOperationsSupportedByHanaRp().catch(console.error);
