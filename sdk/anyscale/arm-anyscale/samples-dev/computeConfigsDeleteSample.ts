// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a compute config.
 *
 * @summary deletes a compute config.
 * x-ms-original-file: 2026-09-01/ComputeConfigs_Delete.json
 */
async function computeConfigsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  await client.computeConfigs.delete("rganyscale", "testcloud", "testcomputeconfig");
}

async function main(): Promise<void> {
  await computeConfigsDelete();
}

main().catch(console.error);
