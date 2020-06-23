// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Our Key Vault Keys client currently only supports the Azure Key Vault service versions `7.0` and `7.1-preview`,
// which we specify as part of the options that can be passed through the constructor.
// The latest supported API version is `7.1-preview`, which is available as the `LATEST_API_VERSION` export.

const { DefaultAzureCredential } = require("@azure/identity");
const { KeyClient, LATEST_API_VERSION } = require("@azure/keyvault-keys");

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;
  
  // Users can specify an Azure Key Vault service API version.
  // Here we're setting it to undefined so that we can show how we're using the LATEST_API_VERSION export
  const apiVersion: string | undefined = undefined;
  
  const client = new KeyClient(url, credential, {
    // Internally we default to the LATEST_API_VERSION export, just like how we're doing here:
    apiVersion: apiVersion || LATEST_API_VERSION
  });

  const uniqueString = new Date().getTime();
  const keyName = `KeyName${uniqueString}`;

  // You can create keys using the general method
  const result = await client.createKey(keyName, "EC");
  console.log("key: ", result);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
