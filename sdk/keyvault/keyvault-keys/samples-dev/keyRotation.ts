// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Creates and updates a key's automated rotation policy, and rotates a key on-demand.
 */

import { KeyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const client = new KeyClient(url, credential);

  const uniqueString = `KeyRotationSample${Date.now()}`;
  const keyName = `KeyName${uniqueString}`;
  const key = await client.createKey(keyName, "EC");
  console.log("created key", key);

  // Set the key's automated rotation policy to rotate 30 days before the key expires.
  const policy = await client.updateKeyRotationPolicy(key.name, {
    lifetimeActions: [
      {
        action: "Rotate",
        timeBeforeExpiry: "P30D"
      }
    ],
    expiresIn: "P90D"
  });
  console.log("created policy", policy);

  // Get the key's current rotation policy
  const currentPolicy = await client.getKeyRotationPolicy(key.name);
  console.log("fetched policy", currentPolicy);

  // Update the key's automated rotation policy to notify 30 days after the key was created
  const updatedPolicy = await client.updateKeyRotationPolicy(key.name, {
    lifetimeActions: [
      {
        action: "Notify",
        timeAfterCreate: "P30D"
      }
    ]
  });
  console.log("updated policy", updatedPolicy);

  // Rotate the key on-demand, generating a new version of the key.
  const newKeyVersion = await client.rotateKey(key.name);
  console.log("rotated key", newKeyVersion);

  // Delete the key. Deleting a key is a long running operation; however, for this sample we will
  // fire-and-forget the process and assume the key was successfully deleted.
  await client.beginDeleteKey(key.name);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
