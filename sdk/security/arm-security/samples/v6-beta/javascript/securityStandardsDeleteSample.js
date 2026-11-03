// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a security standard over a given scope
 *
 * @summary delete a security standard over a given scope
 * x-ms-original-file: 2024-08-01/SecurityStandards/DeleteByManagementGroupSecurityStandard_example.json
 */
async function deleteASecurityStandardOverManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.securityStandards.delete(
    "providers/Microsoft.Management/managementGroups/contoso",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
}

/**
 * This sample demonstrates how to delete a security standard over a given scope
 *
 * @summary delete a security standard over a given scope
 * x-ms-original-file: 2024-08-01/SecurityStandards/DeleteBySecurityConnectorSecurityStandard_example.json
 */
async function deleteASecurityStandardOverSecurityConnectorScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.securityStandards.delete(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
}

/**
 * This sample demonstrates how to delete a security standard over a given scope
 *
 * @summary delete a security standard over a given scope
 * x-ms-original-file: 2024-08-01/SecurityStandards/DeleteBySubscriptionSecurityStandard_example.json
 */
async function deleteASecurityStandardOverSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.securityStandards.delete(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
}

async function main() {
  await deleteASecurityStandardOverManagementGroupScope();
  await deleteASecurityStandardOverSecurityConnectorScope();
  await deleteASecurityStandardOverSubscriptionScope();
}

main().catch(console.error);
