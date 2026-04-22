// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a SecretClient to create, read, and update a secret in various ways.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

let client: SecretClient;

async function createAndReadASecret() {
  // Create a secret
  // The secret can be a string of any kind. For example,
  // a multiline text block such as an RSA private key with newline characters,
  // or a stringified JSON object, like `JSON.stringify({ mySecret: 'MySecretValue'})`.
  const secretName = "MySecretName";

  const result = await client.setSecret(secretName, "MySecretValue");
  console.log("result: ", result);

  // Read the secret we created
  const latestSecret = await client.getSecret(secretName);
  console.log(`Latest version of the secret ${secretName}: `, latestSecret);

  const specificSecret = await client.getSecret(secretName, {
    version: latestSecret.properties.version!,
  });
  console.log(
    `The secret ${secretName} at the version ${latestSecret.properties.version!}: `,
    specificSecret,
  );
}

async function updateSecretProperties() {
  const secretName = "MySecretName";
  await client.setSecret(secretName, "MySecretValue");

  // Update the secret with different attributes
  const result = await client.getSecret(secretName);
  await client.updateSecretProperties(secretName, result.properties.version!, {
    enabled: false,
  });
}

async function deleteTheSecret() {
  const secretName = "MySecretName";
  await client.setSecret(secretName, "MySecretValue");

  // Delete the secret
  // If we don't want to purge the secret later, we don't need to wait until this finishes
  await client.beginDeleteSecret(secretName);
}

async function createASecretWithAttributes() {
  const secretName = "MySecretName";

  const result = await client.setSecret(secretName, "MySecretValue", {
    enabled: false,
  });
  console.log("result: ", result);
}

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  client = new SecretClient(
    process.env["KEYVAULT_URI"] || "<keyvault-url>",
    new DefaultAzureCredential(),
  );
  await createAndReadASecret();
  await updateSecretProperties();
  await deleteTheSecret();
  await createASecretWithAttributes();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
