// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-04-01-preview/Operations_List.json
 */

import { PortalServicesClient } from "@azure/arm-portalservicescopilot";
import { DefaultAzureCredential } from "@azure/identity";

async function listTheOperationsForTheMicrosoftPortalServicesProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PortalServicesClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheOperationsForTheMicrosoftPortalServicesProvider();
}

main().catch(console.error);
