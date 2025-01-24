// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Frontend
 *
 * @summary create a Frontend
 * x-ms-original-file: 2025-01-01/FrontendPut.json
 */
async function putFrontend(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.frontendsInterface.FrontendsInterface_createOrUpdate(
    "rg1",
    "tc1",
    "fe1",
    { location: "NorthCentralUS", properties: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  putFrontend();
}

main().catch(console.error);
