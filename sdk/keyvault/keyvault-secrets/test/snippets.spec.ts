// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Build the URL to reach your key vault
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    // Lastly, create our keys client and connect to the service
    const client = new SecretClient(url, credential);
  });

  it("ReadmeSampleCreateClientWithVersion", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Build the URL to reach your key vault
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    // Change the Azure Key Vault service API version being used via the `serviceVersion` option
    const client = new SecretClient(url, credential, {
      serviceVersion: "7.0", // Or 7.1
    });
  });

  it("ReadmeSampleCreateSecret", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const result = await client.setSecret(secretName, "MySecretValue");
    console.log("result: ", result);
  });

  it("ReadmeSampleGetSecret", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const latestSecret = await client.getSecret(secretName);
    console.log(`Latest version of the secret ${secretName}: `, latestSecret);
    // @ts-preserve-whitespace
    const specificSecret = await client.getSecret(secretName, {
      version: latestSecret.properties.version!,
    });
    console.log(
      `The secret ${secretName} at the version ${latestSecret.properties.version!}: `,
      specificSecret,
    );
  });

  it("ReadmeSampleCreateSecretWithAttributes", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const result = await client.setSecret(secretName, "MySecretValue", {
      enabled: false,
    });
  });

  it("ReadmeSampleUpdateSecretAttributes", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const result = await client.getSecret(secretName);
    await client.updateSecretProperties(secretName, result.properties.version, { enabled: false });
  });

  it("ReadmeSampleGetDeletedSecret", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const result = await client.getDeletedSecret("MyDeletedSecret");
  });

  it("ReadmeSampleDeleteSecret", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    await client.beginDeleteSecret(secretName);
  });

  it("ReadmeSamplePurgeDeletedSecret", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const deletePoller = await client.beginDeleteSecret(secretName);
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    await client.purgeDeletedSecret(secretName);
  });

  it("ReadmeSampleRecoverDeletedSecret", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const deletePoller = await client.beginDeleteSecret(secretName);
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    const recoverPoller = await client.beginRecoverDeletedSecret(secretName);
    const deletedSecret = await recoverPoller.pollUntilDone();
    console.log(deletedSecret);
  });

  it("ReadmeSampleBackupSecret", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const backupResult = await client.backupSecret(secretName);
  });

  it("ReadmeSampleRestoreSecret", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const backupResult = await client.backupSecret(secretName);
    // @ts-preserve-whitespace
    await client.restoreSecretBackup(backupResult);
  });

  it("ReadmeSampleDeleteSecretSoftDelete", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteSecret(secretName);
    // @ts-preserve-whitespace
    // You can use the deleted secret immediately:
    const deletedSecret = poller.getResult();
    // @ts-preserve-whitespace
    // The secret is being deleted. Only wait for it if you want to restore it or purge it.
    await poller.pollUntilDone();
    // @ts-preserve-whitespace
    // You can also get the deleted secret this way:
    await client.getDeletedSecret(secretName);
    // @ts-preserve-whitespace
    // Deleted secrets can also be recovered or purged.
    // @ts-preserve-whitespace
    // recoverDeletedSecret returns a poller, just like beginDeleteSecret.
    const recoverPoller = await client.beginRecoverDeletedSecret(secretName);
    await recoverPoller.pollUntilDone();
    // @ts-preserve-whitespace
    // And then, to purge the deleted secret:
    await client.purgeDeletedSecret(secretName);
  });

  it("ReadmeSampleDeleteSecretWait", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteSecret(secretName);
    // @ts-preserve-whitespace
    // You can use the deleted secret immediately:
    let deletedSecret = poller.getResult();
    // @ts-preserve-whitespace
    // Or you can wait until the secret finishes being deleted:
    deletedSecret = await poller.pollUntilDone();
    console.log(deletedSecret);
  });

  it("ReadmeSampleDeleteSecretWaitIndividually", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteSecret(secretName);
    while (!poller.isDone()) {
      await poller.poll();
      await delay(5000);
    }
    // @ts-preserve-whitespace
    console.log(`The secret ${secretName} is fully deleted`);
  });

  it("ReadmeSampleListSecrets", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    for await (const secretProperties of client.listPropertiesOfSecrets()) {
      console.log("Secret properties: ", secretProperties);
    }
    // @ts-preserve-whitespace
    for await (const deletedSecret of client.listDeletedSecrets()) {
      console.log("Deleted secret: ", deletedSecret);
    }
    // @ts-preserve-whitespace
    for await (const versionProperties of client.listPropertiesOfSecretVersions(secretName)) {
      console.log("Version properties: ", versionProperties);
    }
  });

  it("ReadmeSampleListSecretsByPage", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const secretName = "MySecretName";
    // @ts-preserve-whitespace
    for await (const page of client.listPropertiesOfSecrets().byPage()) {
      for (const secretProperties of page) {
        console.log("Secret properties: ", secretProperties);
      }
    }
    for await (const page of client.listDeletedSecrets().byPage()) {
      for (const deletedSecret of page) {
        console.log("Deleted secret: ", deletedSecret);
      }
    }
    for await (const page of client.listPropertiesOfSecretVersions(secretName).byPage()) {
      for (const versionProperties of page) {
        console.log("Version properties: ", versionProperties);
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
