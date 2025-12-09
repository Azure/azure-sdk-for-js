// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to "Clear ransomware suspects for the given Advanced Ransomware Protection report. You should evaluate the report to determine whether the activity is acceptable (false positive) or whether an attack seems malicious.
 * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data",
 *
 * @summary "Clear ransomware suspects for the given Advanced Ransomware Protection report. You should evaluate the report to determine whether the activity is acceptable (false positive) or whether an attack seems malicious.
 * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data",
 * x-ms-original-file: 2025-09-01-preview/RansomwareReports_ClearSuspects.json
 */
async function ransomwareReportsClearSuspects() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.ransomwareReports.clearSuspects(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    "ransomwareReport1",
    { resolution: "PotentialThreat", extensions: [".threat"] },
  );
}

async function main() {
  await ransomwareReportsClearSuspects();
}

main().catch(console.error);
