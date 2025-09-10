// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a report for the guest configuration assignment, by reportId.
 *
 * @summary Get a report for the guest configuration assignment, by reportId.
 * x-ms-original-file: specification/guestconfiguration/resource-manager/Microsoft.GuestConfiguration/stable/2022-01-25/examples/getGuestConfigurationHCRPAssignmentReportById.json
 */

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAGuestConfigurationAssignmentReportByIdForAVirtualMachine(): Promise<void> {
  const subscriptionId = process.env["GUESTCONFIGURATION_SUBSCRIPTION_ID"] || "mySubscriptionid";
  const resourceGroupName =
    process.env["GUESTCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroupName";
  const guestConfigurationAssignmentName = "AuditSecureProtocol";
  const reportId = "7367cbb8-ae99-47d0-a33b-a283564d2cb1";
  const machineName = "myMachineName";
  const credential = new DefaultAzureCredential();
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationHcrpAssignmentReports.get(
    resourceGroupName,
    guestConfigurationAssignmentName,
    reportId,
    machineName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAGuestConfigurationAssignmentReportByIdForAVirtualMachine();
}

main().catch(console.error);
