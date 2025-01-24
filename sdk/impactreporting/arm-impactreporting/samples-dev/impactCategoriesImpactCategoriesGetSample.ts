// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ImpactCategory
 *
 * @summary get a ImpactCategory
 * x-ms-original-file: 2024-05-01-preview/ImpactCategories_Get.json
 */
async function getWorkloadImpactResourceByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.impactCategories.ImpactCategories_get("ARMOperation.Create");
  console.log(result);
}

async function main(): Promise<void> {
  await getWorkloadImpactResourceByName();
}

main().catch(console.error);
