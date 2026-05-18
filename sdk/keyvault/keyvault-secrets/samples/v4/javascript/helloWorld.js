// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a SecretClient to create, read, and update a secret in various ways.
 */

const { SecretClient, KnownContentType } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  const client = new SecretClient(url, credential);

  // Create a secret
  // The secret can be a string of any kind. For example,
  // a multiline text block such as an RSA private key with newline characters,
  // or a stringified JSON object, like `JSON.stringify({ mySecret: 'MySecretValue'})`.
  const uniqueString = new Date().getTime();
  const secretName = `secret${uniqueString}`;
  const result = await client.setSecret(secretName, "MySecretValue");
  console.log("result: ", result);

  // Read the secret we created
  const secret = await client.getSecret(secretName);
  console.log("secret: ", secret);

  // For certificate-backed secrets, you can retrieve the value in a different format using outContentType.
  // For example, to get a PFX-backed secret as PEM:
  // const pemSecret = await client.getSecret(secretName, { outContentType: KnownContentType.PEM });

  // Update the secret with different attributes
  const updatedSecret = await client.updateSecretProperties(secretName, result.properties.version, {
    enabled: false,
  });
  console.log("updated secret: ", updatedSecret);

  // Create a new version to demonstrate previousVersion tracking
  const newResult = await client.setSecret(secretName, "MyUpdatedSecretValue");
  console.log("new secret version: ", newResult.properties.version);

  // For secrets created after June 1, 2025, previousVersion tracks version history.
  if (newResult.properties.previousVersion) {
    console.log("previous version: ", newResult.properties.previousVersion);
  }

  // Delete the secret
  // If we don't want to purge the secret later, we don't need to wait until this finishes
  await client.beginDeleteSecret(secretName);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

module.exports = { main };
