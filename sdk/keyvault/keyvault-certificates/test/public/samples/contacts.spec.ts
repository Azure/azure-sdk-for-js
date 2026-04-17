// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates, updates, and deletes certificate contacts.
 */

import { CertificateClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";

describe("contacts", () => {
  let recorder: Recorder;
  let client: CertificateClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({
      envSetupForPlayback: {
        KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
      },
      removeCentralSanitizers: ["AZSDK3430", "AZSDK3493"],
    });
    // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
    // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
    // about DefaultAzureCredential and the other credentials that are available for use.
    // If you're using MSI, DefaultAzureCredential should "just work".
    client = forPublishing(
      new CertificateClient(
        assertEnvironmentVariable("KEYVAULT_URI"),
        createTestCredential(),
        recorder.configureClientOptions({}),
      ),
      () =>
        new CertificateClient(
          process.env["KEYVAULT_URI"] || "<keyvault-url>",
          new DefaultAzureCredential(),
        ),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("manage certificate contacts", async () => {
    // Contacts are created independently of the certificates.

    const contacts = [
      {
        email: "a@a.com",
        name: "a",
        phone: "111111111111",
      },
      {
        email: "b@b.com",
        name: "b",
        phone: "222222222222",
      },
    ];

    await client.setContacts(contacts);

    const getResponse = await client.getContacts();
    console.log("Contact List:", getResponse);

    await client.deleteContacts();

    let error;
    try {
      await client.getContacts();
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }

    console.log("err: ", error);
  });

  // Operation snippets

  it("CertificateClientDeleteContacts", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    // @snippet CertificateClientDeleteContacts
    await client.deleteContacts();
    // @snippet-end CertificateClientDeleteContacts
  });

  it("CertificateClientSetContacts", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    // @snippet CertificateClientSetContacts
    await client.setContacts([
      {
        email: "b@b.com",
        name: "b",
        phone: "222222222222",
      },
    ]);
    // @snippet-end CertificateClientSetContacts
  });

  it("CertificateClientGetContacts", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    // @snippet CertificateClientGetContacts
    const contacts = await client.getContacts();
    for (const contact of contacts) {
      console.log(contact);
    }
    // @snippet-end CertificateClientGetContacts
  });
});
