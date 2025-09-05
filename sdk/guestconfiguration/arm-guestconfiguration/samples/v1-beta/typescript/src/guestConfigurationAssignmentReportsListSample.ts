// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all reports for the guest configuration assignment, latest report first.
 *
 * @summary list all reports for the guest configuration assignment, latest report first.
 * x-ms-original-file: 2024-04-05/listAllGuestConfigurationAssignmentReports.json
 */
async function listAllGuestConfigurationAssignmentsForAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionid";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationAssignmentReports.list(
    "myResourceGroupName",
    "myVMName",
    "AuditSecureProtocol",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listAllGuestConfigurationAssignmentsForAVirtualMachine();
}

main().catch(console.error);
