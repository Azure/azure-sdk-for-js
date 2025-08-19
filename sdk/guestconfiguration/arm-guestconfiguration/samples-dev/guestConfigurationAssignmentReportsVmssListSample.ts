// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all reports for the VMSS guest configuration assignment, latest report first.
 *
 * @summary List all reports for the VMSS guest configuration assignment, latest report first.
 * x-ms-original-file: specification/guestconfiguration/resource-manager/Microsoft.GuestConfiguration/stable/2022-01-25/examples/listAllVMSSGuestConfigurationAssignmentReports.json
 */

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllReportsForTheVmssGuestConfigurationAssignmentWithLatestReportFirst(): Promise<void> {
  const subscriptionId = process.env["GUESTCONFIGURATION_SUBSCRIPTION_ID"] || "mySubscriptionid";
  const resourceGroupName =
    process.env["GUESTCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroupName";
  const vmssName = "myVMSSName";
  const name = "AuditSecureProtocol";
  const credential = new DefaultAzureCredential();
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.guestConfigurationAssignmentReportsVmss.list(
    resourceGroupName,
    vmssName,
    name,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllReportsForTheVmssGuestConfigurationAssignmentWithLatestReportFirst();
}

main().catch(console.error);
