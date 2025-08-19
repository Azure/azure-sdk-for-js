// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about the specified private endpoint connection.
 *
 * @summary Gets information about the specified private endpoint connection.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2024-07-01/examples/PrivateEndpointConnectionGet.json
 */

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getPrivateEndpointConnection(): Promise<void> {
  const subscriptionId = process.env["BATCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["BATCH_RESOURCE_GROUP"] || "default-azurebatch-japaneast";
  const accountName = "sampleacct";
  const privateEndpointConnectionName =
    "testprivateEndpointConnection5testprivateEndpointConnection5.24d6b4b5-e65c-4330-bbe9-3a290d62f8e0";
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnectionOperations.get(
    resourceGroupName,
    accountName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateEndpointConnection();
}

main().catch(console.error);
