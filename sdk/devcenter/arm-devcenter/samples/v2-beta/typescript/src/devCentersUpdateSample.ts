// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to partially updates a devcenter.
 *
 * @summary partially updates a devcenter.
 * x-ms-original-file: 2026-01-01-preview/DevCenters_Patch.json
 */
async function devCentersUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devCenters.update("rg1", "Contoso", { tags: { CostCode: "12345" } });
  console.log(result);
}

async function main(): Promise<void> {
  await devCentersUpdate();
}

main().catch(console.error);
