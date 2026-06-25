// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Gateway resource by name.
 *
 * @summary get a Gateway resource by name.
 * x-ms-original-file: 2025-03-30-preview/Gateways_Get_MaximumSet_Gen.json
 */
async function gatewaysGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "93519EA0-206F-42A3-8126-A234F19328E0";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const result = await client.gateways.get("rgopenapi", "GatewayName");
  console.log(result);
}

async function main(): Promise<void> {
  await gatewaysGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
