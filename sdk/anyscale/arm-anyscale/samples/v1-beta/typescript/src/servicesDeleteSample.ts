// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a service.
 *
 * @summary deletes a service.
 * x-ms-original-file: 2026-09-01/Services_Delete.json
 */
async function servicesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  await client.services.delete("rganyscale", "testcloud", "testproject", "testservice");
}

async function main(): Promise<void> {
  await servicesDelete();
}

main().catch(console.error);
