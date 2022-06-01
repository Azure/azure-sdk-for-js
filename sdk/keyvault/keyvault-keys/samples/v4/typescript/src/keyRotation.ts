// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Creates and updates a key's automated rotation policy, and rotates a key on-demand.
 */

import { KeyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

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

  const keyName = `key-rotation-sample-key-${Date.now()}`;
  const key = await client.createKey(keyName, "EC");
  console.log("created key", key);

  // Set the key's automated rotation policy to rotate the key 30 days after the key is created.
  const policy = await client.updateKeyRotationPolicy(key.name, {
    lifetimeActions: [
      {
        action: "Rotate",
        timeAfterCreate: "P30D",
      },
    ],
  });
  console.log("created policy", policy);

  // Get the key's current rotation policy
  const currentPolicy = await client.getKeyRotationPolicy(key.name);
  console.log("fetched policy", currentPolicy);

  // Update the key's automated rotation policy to notify 30 days before the key expires.
  // By using the ISO8601 duration standard, interoperability with any 3rd party library that supports Durations is supported.
  // In this example, we'll use Day.js (documented in https://day.js.org) to create the duration.
  // For more information on the ISO 8601 Duration standard, please refer to the Wikipedia page on Durations:
  // https://wikipedia.org/wiki/ISO_8601#Durations
  const updatedPolicy = await client.updateKeyRotationPolicy(key.name, {
    lifetimeActions: [
      {
        action: "Notify",
        timeBeforeExpiry: dayjs.duration({ days: 30 }).toISOString(),
      },
    ],
    expiresIn: "P90D",
  });
  console.log("updated policy", updatedPolicy);

  // Rotate the key on-demand, generating a new version of the key.
  const newKeyVersion = await client.rotateKey(key.name);
  console.log("rotated key", newKeyVersion);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
