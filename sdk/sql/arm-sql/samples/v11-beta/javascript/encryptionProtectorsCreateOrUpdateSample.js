// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates an existing encryption protector.
 *
 * @summary Updates an existing encryption protector.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/EncryptionProtectorCreateOrUpdateKeyVault.json
 */
async function updateTheEncryptionProtectorToKeyVault() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const serverName = "sqlcrudtest-4645";
  const encryptionProtectorName = "current";
  const parameters = {
    autoRotationEnabled: false,
    serverKeyName: "someVault_someKey_01234567890123456789012345678901",
    serverKeyType: "AzureKeyVault",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.encryptionProtectors.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    encryptionProtectorName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing encryption protector.
 *
 * @summary Updates an existing encryption protector.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/EncryptionProtectorCreateOrUpdateServiceManaged.json
 */
async function updateTheEncryptionProtectorToServiceManaged() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const serverName = "sqlcrudtest-4645";
  const encryptionProtectorName = "current";
  const parameters = {
    serverKeyName: "ServiceManaged",
    serverKeyType: "ServiceManaged",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.encryptionProtectors.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    encryptionProtectorName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateTheEncryptionProtectorToKeyVault();
  await updateTheEncryptionProtectorToServiceManaged();
}

main().catch(console.error);
