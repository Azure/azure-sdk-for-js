// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing encryption protector.
 *
 * @summary updates an existing encryption protector.
 * x-ms-original-file: 2025-02-01-preview/EncryptionProtectorCreateOrUpdateKeyVault.json
 */
async function updateTheEncryptionProtectorToKeyVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.encryptionProtectors.createOrUpdate(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "current",
    {
      autoRotationEnabled: false,
      serverKeyName: "someVault_someKey_01234567890123456789012345678901",
      serverKeyType: "AzureKeyVault",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing encryption protector.
 *
 * @summary updates an existing encryption protector.
 * x-ms-original-file: 2025-02-01-preview/EncryptionProtectorCreateOrUpdateKeyVaultWithVersionlessKey.json
 */
async function updateTheEncryptionProtectorToKeyVaultWithVersionlessKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.encryptionProtectors.createOrUpdate(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "current",
    {
      autoRotationEnabled: false,
      serverKeyName: "someVault_someKey",
      serverKeyType: "AzureKeyVault",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing encryption protector.
 *
 * @summary updates an existing encryption protector.
 * x-ms-original-file: 2025-02-01-preview/EncryptionProtectorCreateOrUpdateServiceManaged.json
 */
async function updateTheEncryptionProtectorToServiceManaged() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.encryptionProtectors.createOrUpdate(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "current",
    { serverKeyName: "ServiceManaged", serverKeyType: "ServiceManaged" },
  );
  console.log(result);
}

async function main() {
  await updateTheEncryptionProtectorToKeyVault();
  await updateTheEncryptionProtectorToKeyVaultWithVersionlessKey();
  await updateTheEncryptionProtectorToServiceManaged();
}

main().catch(console.error);
