// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets Azure services' emerging issues.
 *
 * @summary gets Azure services' emerging issues.
 * x-ms-original-file: 2025-05-01/EmergingIssues_Get.json
 */
async function getEmergingIssues(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const result = await client.emergingIssues.get("default");
  console.log(result);
}

async function main(): Promise<void> {
  await getEmergingIssues();
}

main().catch(console.error);
