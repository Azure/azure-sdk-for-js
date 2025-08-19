// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks the resource name availability.
 *
 * @summary checks the resource name availability.
 * x-ms-original-file: 2024-09-01/CheckNameAvailability_Post.json
 */
async function performsTheResourceNameAvailabilityCheck(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.checkNameAvailability.post("trfqtbtmusswpibw", {
    body: { name: "updkdcixs", type: "gngmcancdauwhdixjjvqnfkvqc" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await performsTheResourceNameAvailabilityCheck();
}

main().catch(console.error);
