// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceCodeCredential } from "../src/credentials/deviceCodeCredential";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

/**
 * The `DeviceCodeCredential` prints a URL and a code. The URL allows users to authenticate with the printed code.
 * 
 * This sample file uses the `DeviceCodeCredential` to retrieve a token.
 */
async function main() {
  const credential = new DeviceCodeCredential(
    // By default, tenantId will be "organizations". You might assign a specific tenant this way.
    process.env.AZURE_TENANT_ID!,
    // By default, clientId will be the same used by the Azure CLI. You might assign a specific client ID this way.
    process.env.AZURE_CLIENT_ID!
  );
  const token = await credential.getToken('https://vault.azure.net/.default');
  console.log({ token });
}
  
main().then(console.log).catch((e) => console.error(e));
  
/** 
 * As an example authenticating a specific Azure SDK client, here we can see how to
 * authenticate the Key Vault Keys client to retrieve the properties of the existing keys:
 *
 * ```ts
 * const identity = require("@azure/identity");
 * const { KeyClient } = require("@azure/keyvault-keys");
 * 
 * async function main() {
 *   const credential = new identity.DeviceCodeCredential();
 *   const keyVaultUrl = `https://key-vault-name.vault.azure.net`;
 *   const client = new KeyClient(keyVaultUrl, credential);
 * 
 *   // Retrieving the properties of the existing keys in that specific Key Vault.
 *   console.log(await client.listPropertiesOfKeys().next());
 * }
 * 
 * main().then(console.log).catch((e) => console.error(e));
 * ```
 */