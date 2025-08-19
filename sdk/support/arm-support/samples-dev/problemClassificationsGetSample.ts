// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get problem classification details for a specific Azure service.
 *
 * @summary Get problem classification details for a specific Azure service.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/GetProblemClassification.json
 */

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsDetailsOfProblemClassificationForAzureService(): Promise<void> {
  const serviceName = "service_guid";
  const problemClassificationName = "problemClassification_guid";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.problemClassifications.get(serviceName, problemClassificationName);
  console.log(result);
}

async function main(): Promise<void> {
  await getsDetailsOfProblemClassificationForAzureService();
}

main().catch(console.error);
