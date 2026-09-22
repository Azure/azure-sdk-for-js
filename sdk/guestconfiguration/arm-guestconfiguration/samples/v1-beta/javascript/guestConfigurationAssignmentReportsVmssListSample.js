// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all reports for the VMSS guest configuration assignment, latest report first.
 *
 * @summary list all reports for the VMSS guest configuration assignment, latest report first.
 * x-ms-original-file: 2024-04-05/listAllVMSSGuestConfigurationAssignmentReports.json
 */
async function listAllReportsForTheVmssGuestConfigurationAssignmentWithLatestReportFirst() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionid";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.guestConfigurationAssignmentReportsVmss.list(
    "myResourceGroupName",
    "myVMSSName",
    "AuditSecureProtocol",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllReportsForTheVmssGuestConfigurationAssignmentWithLatestReportFirst();
}

main().catch(console.error);
