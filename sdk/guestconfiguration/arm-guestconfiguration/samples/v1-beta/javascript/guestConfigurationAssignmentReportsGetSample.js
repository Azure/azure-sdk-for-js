// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a report for the guest configuration assignment, by reportId.
 *
 * @summary get a report for the guest configuration assignment, by reportId.
 * x-ms-original-file: 2024-04-05/getGuestConfigurationAssignmentReportById.json
 */
async function getAGuestConfigurationAssignmentReportByIdForAVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionid";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationAssignmentReports.get(
    "myResourceGroupName",
    "myvm",
    "AuditSecureProtocol",
    "7367cbb8-ae99-47d0-a33b-a283564d2cb1",
  );
  console.log(result);
}

async function main() {
  await getAGuestConfigurationAssignmentReportByIdForAVirtualMachine();
}

main().catch(console.error);
