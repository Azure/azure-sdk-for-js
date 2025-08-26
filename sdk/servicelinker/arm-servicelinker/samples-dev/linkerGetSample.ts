// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns Linker resource for a given name.
 *
 * @summary Returns Linker resource for a given name.
 * x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/preview/2024-07-01-preview/examples/Linker.json
 */

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function linker(): Promise<void> {
  const resourceUri =
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app";
  const linkerName = "linkName";
  const credential = new DefaultAzureCredential();
  const client = new ServiceLinkerManagementClient(credential);
  const result = await client.linker.get(resourceUri, linkerName);
  console.log(result);
}

async function main(): Promise<void> {
  await linker();
}

main().catch(console.error);
