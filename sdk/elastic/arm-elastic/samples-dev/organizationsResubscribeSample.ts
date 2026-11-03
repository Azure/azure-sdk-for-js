// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resubscribe the Elasticsearch Organization.
 *
 * @summary resubscribe the Elasticsearch Organization.
 * x-ms-original-file: 2025-06-01/Organizations_Resubscribe.json
 */
async function organizationsResubscribe(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.organizations.resubscribe("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsResubscribe();
}

main().catch(console.error);
