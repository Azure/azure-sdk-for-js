// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a Relationship
 *
 * @summary delete a Relationship
 * x-ms-original-file: 2025-05-01-preview/Relationships_Delete.json
 */

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

async function relationshipsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.relationships.delete("rgopenapi", "model1", "rel1");
}

async function main(): Promise<void> {
  await relationshipsDelete();
}

main().catch(console.error);
