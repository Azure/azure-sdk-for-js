// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the operation status for the given operation id.
 *
 * @summary Gets the operation status for the given operation id.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/NspOperationStatusGet.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function nspOperationStatusGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const location = "location1";
  const operationId = "operationId1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterOperationStatuses.get(
    location,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspOperationStatusGet();
}

main().catch(console.error);
