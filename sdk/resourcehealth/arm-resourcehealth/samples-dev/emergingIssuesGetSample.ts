// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets Azure services' emerging issues.
 *
 * @summary Gets Azure services' emerging issues.
 * x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/EmergingIssues_Get.json
 */

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getEmergingIssues(): Promise<void> {
  const issueName = "default";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const result = await client.emergingIssues.get(issueName);
  console.log(result);
}

async function main(): Promise<void> {
  await getEmergingIssues();
}

main().catch(console.error);
