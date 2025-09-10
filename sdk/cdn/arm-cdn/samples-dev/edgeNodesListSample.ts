// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Edgenodes are the global Point of Presence (POP) locations used to deliver CDN content to end users.
 *
 * @summary Edgenodes are the global Point of Presence (POP) locations used to deliver CDN content to end users.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/EdgeNodes_List.json
 */

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function edgeNodesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.edgeNodes.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await edgeNodesList();
}

main().catch(console.error);
