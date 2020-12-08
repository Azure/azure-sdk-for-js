// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { DeviceCodeCredential } = require("@azure/identity");
const { KeyClient } = require("@azure/keyvault-keys");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const credential = new DeviceCodeCredential(
    // By default, tenantId will be "organizations". You might assign a specific tenant this way.
    process.env.AZURE_TENANT_ID,
    // By default, clientId will be the same used by the Azure CLI. You might assign a specific client ID this way.
    process.env.AZURE_CLIENT_ID
  );
  const keyVaultUrl = `https://key-vault-name.vault.azure.net`;
  const client = new KeyClient(keyVaultUrl, credential);

  // Retrieving the properties of the existing keys in that specific Key Vault.
  console.log(await client.listPropertiesOfKeys().next());
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
