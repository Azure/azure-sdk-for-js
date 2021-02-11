// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { KeyClient } = require("@azure/keyvault-keys");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const client = new KeyClient(url, credential);

  const uniqueString = new Date().getTime();
  const keyName = `KeyName${uniqueString}`;
  const ecKeyName = `ECKeyName${uniqueString}`;
  const rsaKeyName = `RSAKeyName${uniqueString}`;

  // You can create keys using the general method
  const result = await client.createKey(keyName, "EC");
  console.log("key: ", result);

  // Or using specialized key creation methods
  const ecResult = await client.createEcKey(ecKeyName, { curve: "P-256" });
  const rsaResult = await client.createRsaKey(rsaKeyName, { keySize: 2048 });
  console.log("Elliptic curve key: ", ecResult);
  console.log("RSA Key: ", rsaResult);

  // Get a specific key
  const key = await client.getKey(keyName);
  console.log("key: ", key);

  // Or list the keys we have
  let listPropertiesOfKeys = client.listPropertiesOfKeys();
  while (true) {
    let { done, value } = await listPropertiesOfKeys.next();
    if (done) {
      break;
    }

    const key = await client.getKey(value.name);
    console.log("key: ", key);
  }

  // Update the key
  const updatedKey = await client.updateKeyProperties(keyName, result.properties.version, {
    enabled: false
  });
  console.log("updated key: ", updatedKey);

  await client.beginDeleteKey(keyName);
  await client.beginDeleteKey(ecKeyName);
  await client.beginDeleteKey(rsaKeyName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
