// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists Azure services' emerging issues.
 *
 * @summary lists Azure services' emerging issues.
 * x-ms-original-file: 2025-05-01/EmergingIssues_List.json
 */
async function getEmergingIssues(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.emergingIssues.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getEmergingIssues();
}

main().catch(console.error);
