// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DisconnectedOperationsManagementClient } from "@azure/arm-disconnectedoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DisconnectedOperation
 *
 * @summary get a DisconnectedOperation
 * x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_Get_MaximumSet_Gen.json
 */
async function disconnectedOperationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "301DCB09-82EC-4777-A56C-6FFF26BCC814";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const result = await client.disconnectedOperations.get(
    "rgdisconnectedoperations",
    "demo-resource",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disconnectedOperationsGet();
}

main().catch(console.error);
