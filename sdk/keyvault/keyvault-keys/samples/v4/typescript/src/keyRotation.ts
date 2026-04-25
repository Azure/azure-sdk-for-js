// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates and updates a key's automated rotation policy, and rotates a key on-demand.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { KeyClient } from "@azure/keyvault-keys";

let client: KeyClient;

async function createRotationPolicyAndRotate() {
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
  // For more information on the ISO 8601 Duration standard, please refer to the Wikipedia page on Durations:
  // https://wikipedia.org/wiki/ISO_8601#Durations
  const updatedPolicy = await client.updateKeyRotationPolicy(key.name, {
    lifetimeActions: [
      {
        action: "Notify",
        timeBeforeExpiry: "P30D",
      },
    ],
    expiresIn: "P90D",
  });
  console.log("updated policy", updatedPolicy);
  // Rotate the key on-demand, generating a new version of the key.
  const newKeyVersion = await client.rotateKey(key.name);
  console.log("rotated key", newKeyVersion);
}

async function getAKeyRotationPolicy() {
  const keyName = `MyKeyNameGetRotPolicy-${Date.now()}`;

  await client.createKey(keyName, "EC");

  // Set a rotation policy first so the result is meaningful
  await client.updateKeyRotationPolicy(keyName, {
    lifetimeActions: [{ action: "Notify", timeBeforeExpiry: "P30D" }],
    expiresIn: "P90D",
  });

  const result = await client.getKeyRotationPolicy(keyName);
  console.log("result: ", result);
}

async function updateAKeyRotationPolicy() {
  const keyName = `MyKeyNameUpdateRotPolicy-${Date.now()}`;

  await client.createKey(keyName, "EC");

  // Update the rotation policy with meaningful lifetime actions
  const setPolicy = await client.updateKeyRotationPolicy(keyName, {
    lifetimeActions: [{ action: "Notify", timeBeforeExpiry: "P10D" }],
    expiresIn: "P60D",
  });
  console.log("setPolicy: ", setPolicy);
}

async function rotateAKey() {
  const keyName = `MyKeyNameRotate-${Date.now()}`;

  await client.createKey(keyName, "EC");

  // Set the key's automated rotation policy to rotate the key 30 days before expiry.
  const policy = await client.updateKeyRotationPolicy(keyName, {
    lifetimeActions: [
      {
        action: "Rotate",
        timeBeforeExpiry: "P30D",
      },
    ],
    // You may also specify the duration after which any newly rotated key will expire.
    // In this case, any new key versions will expire after 90 days.
    expiresIn: "P90D",
  });
  console.log("policy: ", policy);

  // You can get the current key rotation policy of a given key by calling the getKeyRotationPolicy method.
  const currentPolicy = await client.getKeyRotationPolicy(keyName);
  console.log("currentPolicy: ", currentPolicy);

  // Finally, you can rotate a key on-demand by creating a new version of the given key.
  const rotatedKey = await client.rotateKey(keyName);
  console.log("rotatedKey: ", rotatedKey);
}

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  client = new KeyClient(process.env["KEYVAULT_URI"]!, new DefaultAzureCredential());
  await createRotationPolicyAndRotate();
  await getAKeyRotationPolicy();
  await updateAKeyRotationPolicy();
  await rotateAKey();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
