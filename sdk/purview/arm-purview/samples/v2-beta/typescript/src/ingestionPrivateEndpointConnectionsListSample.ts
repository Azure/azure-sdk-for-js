// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all ingestion private endpoint connections
 *
 * @summary lists all ingestion private endpoint connections
 * x-ms-original-file: 2024-04-01-preview/IngestionPrivateEndpointConnections_List.json
 */
async function ingestionPrivateEndpointConnectionsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ingestionPrivateEndpointConnections.list(
    "SampleResourceGroup",
    "account1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await ingestionPrivateEndpointConnectionsList();
}

main().catch(console.error);
