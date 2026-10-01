// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a security standard on a scope.
 *
 * @summary delete a security standard on a scope.
 * x-ms-original-file: 2021-08-01-preview/Standards/DeleteStandard_example.json
 */
async function deleteASecurityStandardOverTheSpecifiedScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.standards.delete("myResourceGroup", "8bb8be0a-6010-4789-812f-e4d661c4ed0e");
}

async function main() {
  await deleteASecurityStandardOverTheSpecifiedScope();
}

main().catch(console.error);
