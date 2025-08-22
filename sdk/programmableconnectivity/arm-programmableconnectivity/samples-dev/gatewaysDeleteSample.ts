// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a Gateway.
 *
 * @summary delete a Gateway.
 * x-ms-original-file: 2024-01-15-preview/Gateways_Delete_MinimumSet_Gen.json
 */

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

async function gatewaysDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  await client.gateways.delete("rgopenapi", "udveaau");
}

async function main(): Promise<void> {
  await gatewaysDelete();
}

main().catch(console.error);
