// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImpactClient } = require("@azure/arm-impactreporting");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ImpactCategory
 *
 * @summary get a ImpactCategory
 * x-ms-original-file: 2024-05-01-preview/ImpactCategories_Get.json
 */
async function getWorkloadImpactResourceByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.impactCategories.get("ARMOperation.Create");
  console.log(result);
}

async function main() {
  await getWorkloadImpactResourceByName();
}

main().catch(console.error);
