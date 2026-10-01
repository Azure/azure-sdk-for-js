// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a standard assignment over a given scope
 *
 * @summary delete a standard assignment over a given scope
 * x-ms-original-file: 2021-08-01-preview/Assignments/DeleteAssignment_example.json
 */
async function deleteSecurityAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.assignments.delete("myResourceGroup", "8bb8be0a-6010-4789-812f-e4d661c4ed0e");
}

async function main(): Promise<void> {
  await deleteSecurityAssignment();
}

main().catch(console.error);
