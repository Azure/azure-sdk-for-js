// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to removes the policy.
 *
 * @summary removes the policy.
 * x-ms-original-file: 2024-09-01/Policy_Delete.json
 */
async function deletesThePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  await client.policy.delete("rgrecoveryservicesdatareplication", "4", "wqfscsdv");
}

async function main(): Promise<void> {
  await deletesThePolicy();
}

main().catch(console.error);
