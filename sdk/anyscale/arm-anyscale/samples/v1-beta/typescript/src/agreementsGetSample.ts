// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an agreement. Returns the catalog entry (status "Pending") until accepted, then the full signed record.
 *
 * @summary get an agreement. Returns the catalog entry (status "Pending") until accepted, then the full signed record.
 * x-ms-original-file: 2026-09-01/Agreements_Get.json
 */
async function getAnAgreement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.agreements.get("default");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnAgreement();
}

main().catch(console.error);
