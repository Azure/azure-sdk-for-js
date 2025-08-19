// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve a list of reports within a given configuration profile assignment
 *
 * @summary Retrieve a list of reports within a given configuration profile assignment
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/listReportsByconfigurationProfileHCRPAssignment.json
 */

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listReportsByHcrpConfigurationProfilesAssignment(): Promise<void> {
  const subscriptionId = process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName = process.env["AUTOMANAGE_RESOURCE_GROUP"] || "myResourceGroupName";
  const machineName = "myMachineName";
  const configurationProfileAssignmentName = "default";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hcrpReports.listByConfigurationProfileAssignments(
    resourceGroupName,
    machineName,
    configurationProfileAssignmentName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listReportsByHcrpConfigurationProfilesAssignment();
}

main().catch(console.error);
