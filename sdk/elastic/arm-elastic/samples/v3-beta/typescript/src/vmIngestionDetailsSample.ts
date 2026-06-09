// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list detailed information about VM ingestion that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance.
 *
 * @summary list detailed information about VM ingestion that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance.
 * x-ms-original-file: 2025-06-01/VMIngestion_Details.json
 */
async function vmIngestionDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.vmIngestion.details("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main(): Promise<void> {
  await vmIngestionDetails();
}

main().catch(console.error);
