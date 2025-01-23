// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Frontend
 *
 * @summary update a Frontend
 * x-ms-original-file: 2025-01-01/FrontendPatch.json
 */
async function updateFrontend(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.frontendsInterface.FrontendsInterface_update("rg1", "tc1", "fe1", {});
  console.log(result);
}

async function main(): Promise<void> {
  updateFrontend();
}

main().catch(console.error);
