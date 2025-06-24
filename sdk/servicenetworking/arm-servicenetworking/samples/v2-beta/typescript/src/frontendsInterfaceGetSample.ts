// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Frontend
 *
 * @summary get a Frontend
 * x-ms-original-file: 2025-03-01-preview/FrontendGet.json
 */
async function getFrontend(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.frontendsInterface.get("rg1", "tc1", "fe1");
  console.log(result);
}

async function main(): Promise<void> {
  await getFrontend();
}

main().catch(console.error);
