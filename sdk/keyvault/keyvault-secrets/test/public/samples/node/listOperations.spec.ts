// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Uses a SecretClient to iterate over secrets and their versions.
 */

import { SecretClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("listOperations", () => {
  let recorder: Recorder;
  let client: SecretClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({
      envSetupForPlayback: {
        KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
      },
      removeCentralSanitizers: ["AZSDK3430"],
    });
    // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
    // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
    // about DefaultAzureCredential and the other credentials that are available for use.
    client = forPublishing(
      new SecretClient(
        assertEnvironmentVariable("KEYVAULT_URI"),
        createTestCredential(),
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () =>
        new SecretClient(
          process.env["KEYVAULT_URI"],
          new DefaultAzureCredential(),
        ),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create secrets", async () => {
    const uniqueString = new Date().getTime();
    const bankAccountSecretName = `bankSecret${uniqueString}`;
    const storageAccountSecretName = `storageSecret${uniqueString}`;

    // Create our secrets
    await client.setSecret(bankAccountSecretName, "ABC123");
    await client.setSecret(storageAccountSecretName, "XYZ789");
  });

  it("list secrets by page", async () => {
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
  });

  it("list all secrets", async () => {
    // List the secrets we have, all at once
    console.log("Listing secrets all at once");
    for await (const secretProperties of client.listPropertiesOfSecrets()) {
      if (secretProperties.enabled) {
        const secret = await client.getSecret(secretProperties.name);
        console.log("secret: ", secret);
      }
    }
  });

  it("list secret versions", async () => {
    const uniqueString = new Date().getTime();
    const bankAccountSecretName = `bankSecret${uniqueString}`;

    await client.setSecret(bankAccountSecretName, "ABC123");
    await client.setSecret(bankAccountSecretName, "ABC567");

    // List the versions of BankAccountPassword
    for await (const secretProperties of client.listPropertiesOfSecretVersions(
      bankAccountSecretName,
    )) {
      if (secretProperties.enabled) {
        const secret = await client.getSecret(secretProperties.name, {
          version: secretProperties.version!,
        });
        console.log("secret version: ", secret);
      }
    }

    await client.beginDeleteSecret(bankAccountSecretName);
  });

  it("list all secret types", async () => {
    const uniqueString = new Date().getTime();
    const secretName = `secret${uniqueString}`;
    await client.setSecret(secretName, "MySecretValue");

    // @snippet ReadmeSampleListSecrets
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
    // @snippet-end ReadmeSampleListSecrets
  });

  it("list all secret types by page", async () => {
    const uniqueString = new Date().getTime();
    const secretName = `secret${uniqueString}`;
    await client.setSecret(secretName, "MySecretValue");

    // @snippet ReadmeSampleListSecretsByPage
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
    // @snippet-end ReadmeSampleListSecretsByPage
  });
});
