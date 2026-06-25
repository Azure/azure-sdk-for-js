// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get problem classification details for a specific Azure service.
 *
 * @summary get problem classification details for a specific Azure service.
 * x-ms-original-file: 2026-06-01/GetProblemClassification.json
 */
async function getsDetailsOfProblemClassificationForAzureService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.problemClassifications.get(
    "service_guid",
    "problemClassification_guid",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsDetailsOfProblemClassificationForAzureService();
}

main().catch(console.error);
