// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the SAP Application Server Instance resource. <br><br>This operation will be used by service only. Delete by end user will return a Bad Request error.
 *
 * @summary Deletes the SAP Application Server Instance resource. <br><br>This operation will be used by service only. Delete by end user will return a Bad Request error.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPApplicationServerInstances_Delete.json
 */

import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sapApplicationServerInstancesDelete(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "6d875e77-e412-4d7d-9af4-8895278b4443";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const applicationInstanceName = "app01";
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPApplicationServerInstances.beginDeleteAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    applicationInstanceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sapApplicationServerInstancesDelete();
}

main().catch(console.error);
