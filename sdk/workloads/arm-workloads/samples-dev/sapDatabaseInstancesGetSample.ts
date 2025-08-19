// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the SAP Database Instance resource.
 *
 * @summary Gets the SAP Database Instance resource.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPDatabaseInstances_Get.json
 */

import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sapDatabaseInstancesGet(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "6d875e77-e412-4d7d-9af4-8895278b4443";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const databaseInstanceName = "databaseServer";
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPDatabaseInstances.get(
    resourceGroupName,
    sapVirtualInstanceName,
    databaseInstanceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sapDatabaseInstancesGet();
}

main().catch(console.error);
