// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets the list of replication extensions in the given vault.
 *
 * @summary gets the list of replication extensions in the given vault.
 * x-ms-original-file: 2024-09-01/ReplicationExtension_List.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function listsTheReplicationExtensions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationExtension.list(
    "rgrecoveryservicesdatareplication",
    "4",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheReplicationExtensions();
}

main().catch(console.error);
