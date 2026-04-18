// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Deletes a secret and then recovers a deleted secret (this sample requires soft-delete to run).
 */

import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
// Load the .env file if it exists
import "dotenv/config";

let client: SecretClient;

async function createSecrets() {
  const uniqueString = new Date().getTime();
  const bankAccountSecretName = `bankSecret${uniqueString}`;
  const storageAccountSecretName = `storageSecret${uniqueString}`;
  // Create our secrets
  console.log("Creating our secrets");
  await client.setSecret(bankAccountSecretName, "ABC123");
  await client.setSecret(storageAccountSecretName, "XYZ789");
}

async function deleteAndRecoverASecret() {
  const uniqueString = new Date().getTime();
  const bankAccountSecretName = `bankSecret${uniqueString}`;
  await client.setSecret(bankAccountSecretName, "ABC123");

  // Oops, what happens if we delete the wrong one?
  console.log("Deleting secret: ", bankAccountSecretName);
  const deletePoller = await client.beginDeleteSecret(bankAccountSecretName);
  await deletePoller.pollUntilDone();

  console.log("Recovering secret");
  const recoverPoller = await client.beginRecoverDeletedSecret(bankAccountSecretName);
  const recoveredSecret = await recoverPoller.pollUntilDone();
  console.log(recoveredSecret);
}

async function deleteAndPurgeASecret() {
  const uniqueString = new Date().getTime();
  const bankAccountSecretName = `bankSecret${uniqueString}`;
  await client.setSecret(bankAccountSecretName, "ABC123");

  // To actually delete it, we delete and then purge the secret
  // Delete the secret
  console.log("about to delete");
  const deletePoller = await client.beginDeleteSecret(bankAccountSecretName);
  await deletePoller.pollUntilDone();

  // Purge the deleted secret
  console.log("about to purge");
  await client.purgeDeletedSecret(bankAccountSecretName);

  for await (const deletedSecret of client.listDeletedSecrets()) {
      console.log(deletedSecret);
  }
}

async function getADeletedSecret() {
  const uniqueString = new Date().getTime();
  const secretName = `secret${uniqueString}`;
  await client.setSecret(secretName, "MySecretValue");
  const deletePoller = await client.beginDeleteSecret(secretName);
  await deletePoller.pollUntilDone();

  const result = await client.getDeletedSecret(secretName);

  console.log(result);
}

async function softDeleteLifecycle() {
  const uniqueString = new Date().getTime();
  const secretName = `secret${uniqueString}`;
  await client.setSecret(secretName, "MySecretValue");

  const poller = await client.beginDeleteSecret(secretName);

  // You can use the deleted secret immediately:
  const deletedSecret = poller.getResult();

  // The secret is being deleted. Only wait for it if you want to restore it or purge it.
  await poller.pollUntilDone();

  // You can also get the deleted secret this way:
  await client.getDeletedSecret(secretName);

  // Deleted secrets can also be recovered or purged.

  // recoverDeletedSecret returns a poller, just like beginDeleteSecret.
  const recoverPoller = await client.beginRecoverDeletedSecret(secretName);
  await recoverPoller.pollUntilDone();

  // And then, to purge the deleted secret:
  await client.purgeDeletedSecret(secretName);
}

async function deleteAndWait() {
  const uniqueString = new Date().getTime();
  const secretName = `secret${uniqueString}`;
  await client.setSecret(secretName, "MySecretValue");

  const poller = await client.beginDeleteSecret(secretName);

  // You can use the deleted secret immediately:
  let deletedSecret = poller.getResult();

  // Or you can wait until the secret finishes being deleted:
  deletedSecret = await poller.pollUntilDone();
  console.log(deletedSecret);
}

async function deleteAndPollIndividually() {
  const uniqueString = new Date().getTime();
  const secretName = `secret${uniqueString}`;
  await client.setSecret(secretName, "MySecretValue");

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const poller = await client.beginDeleteSecret(secretName);
  while (!poller.isDone()) {
      await poller.poll();
      await delay(5000);
  }

  console.log(`The secret ${secretName} is fully deleted`);
}

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  client =
      new SecretClient(process.env["KEYVAULT_URI"] || "<keyvault-url>", new DefaultAzureCredential());
  await createSecrets();
  await deleteAndRecoverASecret();
  await deleteAndPurgeASecret();
  await getADeletedSecret();
  await softDeleteLifecycle();
  await deleteAndWait();
  await deleteAndPollIndividually();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
