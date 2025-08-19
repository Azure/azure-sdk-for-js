// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the SAP Central Services Instance resource. <br><br>This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the Virtual Instance for SAP solutions resource, using the delete operation on it.
 *
 * @summary Deletes the SAP Central Services Instance resource. <br><br>This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the Virtual Instance for SAP solutions resource, using the delete operation on it.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPCentralInstances_Delete.json
 */

import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sapCentralInstancesDelete(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "6d875e77-e412-4d7d-9af4-8895278b4443";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const centralInstanceName = "centralServer";
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPCentralInstances.beginDeleteAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    centralInstanceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sapCentralInstancesDelete();
}

main().catch(console.error);
