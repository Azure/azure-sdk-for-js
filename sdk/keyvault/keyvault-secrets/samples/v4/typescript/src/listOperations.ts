// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses a SecretClient to iterate over secrets and their versions.
 */

import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const client = new SecretClient(url, credential);

  const uniqueString = new Date().getTime();
  const bankAccountSecretName = `bankSecret${uniqueString}`;
  const storageAccountSecretName = `storageSecret${uniqueString}`;

  // Create our secrets
  await client.setSecret(bankAccountSecretName, "ABC123");
  await client.setSecret(storageAccountSecretName, "XYZ789");

  // List the secrets we have, by page
  console.log("Listing secrets by page");
  for await (const page of client.listPropertiesOfSecrets().byPage({ maxPageSize: 2 })) {
    for (const secretProperties of page) {
      if (secretProperties.enabled) {
        const secret = await client.getSecret(secretProperties.name);
        console.log("secret: ", secret);
      }
    }
    console.log("--page--");
  }

  // List the secrets we have, all at once
  console.log("Listing secrets all at once");
  for await (const secretProperties of client.listPropertiesOfSecrets()) {
    if (secretProperties.enabled) {
      const secret = await client.getSecret(secretProperties.name);
      console.log("secret: ", secret);
    }
  }

  await client.setSecret(bankAccountSecretName, "ABC567");

  // List the versions of BankAccountPassword
  for await (const secretProperties of client.listPropertiesOfSecretVersions(
    bankAccountSecretName
  )) {
    if (secretProperties.enabled) {
      const secret = await client.getSecret(secretProperties.name);
      console.log("secret version: ", secret);
    }
  }

  await client.beginDeleteSecret(bankAccountSecretName);
  await client.beginDeleteSecret(storageAccountSecretName);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
