// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all reports for the guest configuration assignment, latest report first.
 *
 * @summary list all reports for the guest configuration assignment, latest report first.
 * x-ms-original-file: 2024-04-05/listAllGuestConfigurationHCRPAssignmentReports.json
 */
async function listAllGuestConfigurationAssignmentsForAVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionid";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationHcrpAssignmentReports.list(
    "myResourceGroupName",
    "myMachineName",
    "AuditSecureProtocol",
  );
  console.log(result);
}

async function main() {
  await listAllGuestConfigurationAssignmentsForAVirtualMachine();
}

main().catch(console.error);
