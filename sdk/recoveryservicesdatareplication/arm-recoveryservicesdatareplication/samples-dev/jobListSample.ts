// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of jobs in the given vault.
 *
 * @summary gets the list of jobs in the given vault.
 * x-ms-original-file: 2024-09-01/Job_List.json
 */
async function listsTheJobs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.job.list("rgrecoveryservicesdatareplication", "4", {
    continuationToken: "rdavrzbethhslmkqgajontnxsue",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheJobs();
}

main().catch(console.error);
