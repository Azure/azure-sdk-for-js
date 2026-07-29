// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get governance assignments on all of your resources inside a scope
 *
 * @summary get governance assignments on all of your resources inside a scope
 * x-ms-original-file: 2022-01-01-preview/GovernanceAssignments/ListGovernanceAssignments_example.json
 */
async function listGovernanceAssignments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.governanceAssignments.list(
    "subscriptions/c32e05d9-7207-4e22-bdf4-4f7d9c72e5fd",
    "6b9421dd-5555-2251-9b3d-2be58e2f82cd",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGovernanceAssignments();
}

main().catch(console.error);
