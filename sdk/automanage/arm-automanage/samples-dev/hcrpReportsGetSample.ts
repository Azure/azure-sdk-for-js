// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get information about a report associated with a configuration profile assignment run
 *
 * @summary Get information about a report associated with a configuration profile assignment run
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/getHCRPReport.json
 */

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAReportForAHcrpConfigurationProfileAssignment(): Promise<void> {
  const subscriptionId = process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName = process.env["AUTOMANAGE_RESOURCE_GROUP"] || "myResourceGroupName";
  const machineName = "myMachineName";
  const configurationProfileAssignmentName = "default";
  const reportName = "b4e9ee6b-1717-4ff0-a8d2-e6d72c33d5f4";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const result = await client.hcrpReports.get(
    resourceGroupName,
    machineName,
    configurationProfileAssignmentName,
    reportName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAReportForAHcrpConfigurationProfileAssignment();
}

main().catch(console.error);
