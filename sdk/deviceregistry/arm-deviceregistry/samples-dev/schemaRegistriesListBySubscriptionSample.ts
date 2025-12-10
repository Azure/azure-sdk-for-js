// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SchemaRegistry resources by subscription ID
 *
 * @summary list SchemaRegistry resources by subscription ID
 * x-ms-original-file: 2025-10-01/List_SchemaRegistries_BySubscription.json
 */
async function listSchemaRegistriesSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schemaRegistries.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSchemaRegistriesSubscription();
}

main().catch(console.error);
