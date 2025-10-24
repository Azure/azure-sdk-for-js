// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Schema resources by SchemaRegistry
 *
 * @summary list Schema resources by SchemaRegistry
 * x-ms-original-file: 2025-10-01/List_Schemas_BySchemaRegistry.json
 */
async function listSchemasSchemaRegistry(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schemas.listBySchemaRegistry(
    "myResourceGroup",
    "my-schema-registry",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSchemasSchemaRegistry();
}

main().catch(console.error);
