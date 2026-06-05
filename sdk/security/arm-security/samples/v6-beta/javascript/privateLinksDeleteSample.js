// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a private link resource. This operation will remove the private link infrastructure and disconnect all associated private endpoints. This operation is asynchronous and may take several minutes to complete.
 *
 * @summary delete a private link resource. This operation will remove the private link infrastructure and disconnect all associated private endpoints. This operation is asynchronous and may take several minutes to complete.
 * x-ms-original-file: 2026-01-01/PrivateLinks/PrivateLinks_Delete.json
 */
async function deletePrivateLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.privateLinks.delete("rg", "spl");
}

async function main() {
  await deletePrivateLink();
}

main().catch(console.error);
