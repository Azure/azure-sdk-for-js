// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a report for the VMSS guest configuration assignment, by reportId.
 *
 * @summary get a report for the VMSS guest configuration assignment, by reportId.
 * x-ms-original-file: 2024-04-05/getVMSSGuestConfigurationAssignmentReportById.json
 */
async function getAGuestConfigurationAssignmentReportByIdForAVirtualMachineScaleSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionid";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationAssignmentReportsVmss.get(
    "myResourceGroupName",
    "myvmss",
    "AuditSecureProtocol",
    "7367cbb8-ae99-47d0-a33b-a283564d2cb1",
  );
  console.log(result);
}

async function main() {
  await getAGuestConfigurationAssignmentReportByIdForAVirtualMachineScaleSet();
}

main().catch(console.error);
