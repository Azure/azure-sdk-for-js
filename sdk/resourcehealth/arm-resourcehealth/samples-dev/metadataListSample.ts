// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the list of metadata entities.
 *
 * @summary Gets the list of metadata entities.
 * x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Metadata_List.json
 */

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.metadata.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getMetadata();
}

main().catch(console.error);
