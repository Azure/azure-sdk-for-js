// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checkin the manifest.
 *
 * @summary checkin the manifest.
 * x-ms-original-file: 2024-09-01/CheckinManifest.json
 */
async function checkinManifest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.checkinManifest("Microsoft.Contoso", {
    baselineArmManifestLocation: "EastUS2EUAP",
    environment: "Prod",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkinManifest();
}

main().catch(console.error);
