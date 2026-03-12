// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create or update an APC Gateway.
 *
 * @summary create or update an APC Gateway.
 * x-ms-original-file: 2024-01-15-preview/Gateways_CreateOrUpdate_MaximumSet_Gen.json
 */

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

async function gatewaysCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const result = await client.gateways.createOrUpdate("rgopenapi", "pgzk", {
    properties: {},
    tags: { key2642: "ykmlftvwwpvcmriffxqh" },
    location: "oryhozfmeohscezl",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await gatewaysCreateOrUpdate();
}

main().catch(console.error);
