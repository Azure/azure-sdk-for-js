// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a Frontend
 *
 * @summary delete a Frontend
 * x-ms-original-file: 2025-03-01-preview/FrontendDelete.json
 */

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteFrontend(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  await client.frontendsInterface.delete("rg1", "tc1", "fe1");
}

async function main(): Promise<void> {
  await deleteFrontend();
}

main().catch(console.error);
