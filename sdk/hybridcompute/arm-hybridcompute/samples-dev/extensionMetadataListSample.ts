// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all Extension versions based on location, publisher, extensionType
 *
 * @summary gets all Extension versions based on location, publisher, extensionType
 * x-ms-original-file: 2025-09-16-preview/extension/ExtensionMetadata_List.json
 */
async function getAListOfExtensions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extensionMetadata.list(
    "EastUS",
    "microsoft.azure.monitor",
    "azuremonitorlinuxagent",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfExtensions();
}

main().catch(console.error);
