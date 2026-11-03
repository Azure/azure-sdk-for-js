// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a report for the guest configuration assignment, by reportId.
 *
 * @summary get a report for the guest configuration assignment, by reportId.
 * x-ms-original-file: 2024-04-05/getGuestConfigurationConnectedVMwarevSphereAssignmentReportById.json
 */
async function getAGuestConfigurationAssignmentReportByIdForAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionid";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationConnectedVMwarevSphereAssignmentsReports.get(
    "myResourceGroupName",
    "myvm",
    "AuditSecureProtocol",
    "7367cbb8-ae99-47d0-a33b-a283564d2cb1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAGuestConfigurationAssignmentReportByIdForAVirtualMachine();
}

main().catch(console.error);
