// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific security standard for the requested scope by standardId
 *
 * @summary get a specific security standard for the requested scope by standardId
 * x-ms-original-file: 2024-08-01/SecurityStandards/GetByManagementGroupSecurityStandard_example.json
 */
async function getASecurityStandardOverManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.securityStandards.get(
    "providers/Microsoft.Management/managementGroups/contoso",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a specific security standard for the requested scope by standardId
 *
 * @summary get a specific security standard for the requested scope by standardId
 * x-ms-original-file: 2024-08-01/SecurityStandards/GetBySecurityConnectorSecurityStandard_example.json
 */
async function getASecurityStandardOverSecurityConnectorScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.securityStandards.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a specific security standard for the requested scope by standardId
 *
 * @summary get a specific security standard for the requested scope by standardId
 * x-ms-original-file: 2024-08-01/SecurityStandards/GetBySubscriptionSecurityStandard_example.json
 */
async function getASecurityStandardOverSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.securityStandards.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
  );
  console.log(result);
}

async function main() {
  await getASecurityStandardOverManagementGroupScope();
  await getASecurityStandardOverSecurityConnectorScope();
  await getASecurityStandardOverSubscriptionScope();
}

main().catch(console.error);
