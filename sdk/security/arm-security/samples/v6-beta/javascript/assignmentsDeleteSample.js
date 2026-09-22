// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a standard assignment over a given scope
 *
 * @summary delete a standard assignment over a given scope
 * x-ms-original-file: 2021-08-01-preview/Assignments/DeleteAssignment_example.json
 */
async function deleteSecurityAssignment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.assignments.delete("myResourceGroup", "8bb8be0a-6010-4789-812f-e4d661c4ed0e");
}

async function main() {
  await deleteSecurityAssignment();
}

main().catch(console.error);
