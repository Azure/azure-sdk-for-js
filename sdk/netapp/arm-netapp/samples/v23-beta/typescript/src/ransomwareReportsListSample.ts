// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all ransomware reports for the volume
 * Returns a list of the Advanced Ransomware Protection (ARP) reports for the volume.
 * ARP reports are created with a list of suspected files when it detects any combination of high data entropy, abnormal volume activity with data encryption, and unusual file extensions.
 * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data"
 *
 * @summary list all ransomware reports for the volume
 * Returns a list of the Advanced Ransomware Protection (ARP) reports for the volume.
 * ARP reports are created with a list of suspected files when it detects any combination of high data entropy, abnormal volume activity with data encryption, and unusual file extensions.
 * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data"
 * x-ms-original-file: 2025-09-01-preview/RansomwareReports_List.json
 */
async function ransomwareReportsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ransomwareReports.list("myRG", "account1", "pool1", "volume1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await ransomwareReportsList();
}

main().catch(console.error);
