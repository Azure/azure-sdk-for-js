// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Traffic Manager endpoint.
 *
 * @summary update a Traffic Manager endpoint.
 * x-ms-original-file: 2024-04-01-preview/Endpoint-PATCH-External-Target.json
 */
async function endpointPatchExternalTarget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.updateV2(
    "azuresdkfornetautoresttrafficmanager1421",
    "azsmnet6386",
    "ExternalEndpoints",
    "azsmnet7187",
    { properties: { target: "another.foobar.contoso.com" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointPatchExternalTarget();
}

main().catch(console.error);
