// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a devcenter.
 *
 * @summary deletes a devcenter.
 * x-ms-original-file: 2026-01-01-preview/DevCenters_Delete.json
 */
async function devCentersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.devCenters.delete("rg1", "Contoso");
}

async function main(): Promise<void> {
  await devCentersDelete();
}

main().catch(console.error);
