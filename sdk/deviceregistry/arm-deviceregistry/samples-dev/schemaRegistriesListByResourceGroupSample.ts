// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SchemaRegistry resources by resource group
 *
 * @summary list SchemaRegistry resources by resource group
 * x-ms-original-file: 2025-10-01/List_SchemaRegistries_ByResourceGroup.json
 */
async function listSchemaRegistriesResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schemaRegistries.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSchemaRegistriesResourceGroup();
}

main().catch(console.error);
