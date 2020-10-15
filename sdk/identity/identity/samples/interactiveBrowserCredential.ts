// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InteractiveBrowserCredential } from "../src/credentials/interactiveBrowserCredential";

/**
 * The `InteractiveBrowserCredential` pops up a browser window where users
 * are be able to safely authenticate with the Azure Active Directory.
 * 
 * This sample file uses the `InteractiveBrowserCredential` to retrieve a token.
 */
async function main() {
  const credential = new InteractiveBrowserCredential();
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
 *   // To specify a specific port, in case the port 80 is busy, you can do:
 *   // const credential = new identity.InteractiveBrowserCredential({ redirectUri: "http://localhost:8080" });
 *
 *   const credential = new identity.InteractiveBrowserCredential();
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
