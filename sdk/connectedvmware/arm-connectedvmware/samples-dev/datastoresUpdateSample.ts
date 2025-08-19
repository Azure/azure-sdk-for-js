// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to API to update certain properties of the datastore resource.
 *
 * @summary API to update certain properties of the datastore resource.
 * x-ms-original-file: specification/connectedvmware/resource-manager/Microsoft.ConnectedVMwarevSphere/stable/2023-10-01/examples/UpdateDatastore.json
 */

import type { ResourcePatch, DatastoresUpdateOptionalParams } from "@azure/arm-connectedvmware";
import { AzureArcVMwareManagementServiceAPI } from "@azure/arm-connectedvmware";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateDatastore(): Promise<void> {
  const subscriptionId =
    process.env["CONNECTEDVMWARE_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["CONNECTEDVMWARE_RESOURCE_GROUP"] || "testrg";
  const datastoreName = "HRDatastore";
  const body: ResourcePatch = { tags: { tag1: "value1", tag2: "value2" } };
  const options: DatastoresUpdateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new AzureArcVMwareManagementServiceAPI(credential, subscriptionId);
  const result = await client.datastores.update(resourceGroupName, datastoreName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await updateDatastore();
}

main().catch(console.error);
