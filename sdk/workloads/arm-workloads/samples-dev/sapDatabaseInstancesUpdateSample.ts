// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  UpdateSAPDatabaseInstanceRequest,
  SAPDatabaseInstancesUpdateOptionalParams,
} from "@azure/arm-workloads";
import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the Database resource.
 *
 * @summary Updates the Database resource.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPDatabaseInstances_Update.json
 */
async function sapDatabaseInstancesUpdate(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "6d875e77-e412-4d7d-9af4-8895278b4443";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const databaseInstanceName = "databaseServer";
  const body: UpdateSAPDatabaseInstanceRequest = { tags: { key1: "value1" } };
  const options: SAPDatabaseInstancesUpdateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPDatabaseInstances.beginUpdateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    databaseInstanceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sapDatabaseInstancesUpdate();
}

main().catch(console.error);
