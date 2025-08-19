// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve a list of reports within a given configuration profile assignment
 *
 * @summary Retrieve a list of reports within a given configuration profile assignment
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/listReportsByconfigurationProfileAssignment.json
 */
async function listReportsByConfigurationProfilesAssignment(): Promise<void> {
  const subscriptionId = process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName = process.env["AUTOMANAGE_RESOURCE_GROUP"] || "myResourceGroupName";
  const configurationProfileAssignmentName = "default";
  const vmName = "myVMName";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reports.listByConfigurationProfileAssignments(
    resourceGroupName,
    configurationProfileAssignmentName,
    vmName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listReportsByConfigurationProfilesAssignment();
}

main().catch(console.error);
