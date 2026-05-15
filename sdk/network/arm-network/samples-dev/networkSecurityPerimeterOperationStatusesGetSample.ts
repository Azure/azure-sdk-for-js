// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the operation status for the given operation id.
 *
 * @summary gets the operation status for the given operation id.
 * x-ms-original-file: 2025-05-01/NspOperationStatusGet.json
 */
async function nspOperationStatusGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterOperationStatuses.get(
    "location1",
    "operationId1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspOperationStatusGet();
}

main().catch(console.error);
