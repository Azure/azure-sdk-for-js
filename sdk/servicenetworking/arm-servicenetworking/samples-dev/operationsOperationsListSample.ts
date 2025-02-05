// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-01-01/OperationsList.json
 */
async function getOperationsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ServiceNetworkingManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (let item of client.operations.Operations_list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  getOperationsList();
}

main().catch(console.error);
