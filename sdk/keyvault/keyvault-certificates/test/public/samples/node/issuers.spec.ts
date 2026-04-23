// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates, updates and deletes certificate issuers.
 */

import { CertificateClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("issuers", () => {
  let recorder: Recorder;
  let client: CertificateClient;
  let certificateName: string;
  let issuerName: string;

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
    // If you're using MSI, DefaultAzureCredential should "just work".
    client = forPublishing(
      new CertificateClient(
        assertEnvironmentVariable("KEYVAULT_URI"),
        createTestCredential(),
        recorder.configureClientOptions({}),
      ),
      () =>
        new CertificateClient(
          process.env["KEYVAULT_URI"],
          new DefaultAzureCredential(),
        ),
    );
    certificateName = forPublishing(
      recorder.variable("certificateName", `issuer-${new Date().getTime()}`),
      () => `issuer-${new Date().getTime()}`,
    );
    issuerName = forPublishing(
      recorder.variable("issuerName", `issuer${new Date().getTime()}`),
      () => `issuer${new Date().getTime()}`,
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("manage certificate issuers", async () => {
    // Create
    await client.createIssuer(issuerName, "Test", {
      accountId: "keyvaultuser",
      administratorContacts: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "admin@microsoft2.com",
          phone: "4255555555",
        },
      ],
    });

    // We can create a certificate with that issuer's name.
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName,
      subject: "cn=MyCert",
    });
    const pendingCertificate = createPoller.getResult();
    console.log("Certificate: ", pendingCertificate);

    // We can retrieve the issuer this way:
    const getResponse = await client.getIssuer(issuerName);
    console.log("Certificate issuer: ", getResponse);

    // We can also list properties for all issuers:
    for await (const issuerProperties of client.listPropertiesOfIssuers()) {
      console.log("Certificate properties: ", issuerProperties);
    }

    // We can also delete the issuer.
    await client.deleteIssuer(issuerName);
  });

  // Operation snippets

  it("list certificate issuers", async () => {
    // @snippet CertificateClientListIssuers
    await client.createIssuer(issuerName, "Test");
    // @ts-preserve-whitespace
    // All in one call
    for await (const issuerProperties of client.listPropertiesOfIssuers()) {
      console.log(issuerProperties);
    }
    // @ts-preserve-whitespace
    // By pages
    for await (const page of client.listPropertiesOfIssuers().byPage()) {
      for (const issuerProperties of page) {
        console.log(issuerProperties);
      }
    }
    // @snippet-end CertificateClientListIssuers
  });

  it("create a certificate issuer", async () => {
    // @snippet CertificateClientCreateIssuer
    await client.createIssuer(issuerName, "Test");
    // @snippet-end CertificateClientCreateIssuer
  });

  it("update a certificate issuer", async () => {
    // @snippet CertificateClientUpdateIssuer
    await client.createIssuer(issuerName, "Test");
    await client.updateIssuer(issuerName, {
      accountId: "updated-keyvaultuser",
    });
    // @snippet-end CertificateClientUpdateIssuer
  });

  it("get a certificate issuer", async () => {
    // @snippet CertificateClientGetIssuer
    if (forPublishing(true, () => false)) {
      await client.createIssuer(issuerName, "Test");
    }
    const certificateIssuer = await client.getIssuer(issuerName);
    console.log(certificateIssuer);
    // @snippet-end CertificateClientGetIssuer
  });

  it("delete a certificate issuer", async () => {
    // @snippet CertificateClientDeleteIssuer
    if (forPublishing(true, () => false)) {
      await client.createIssuer(issuerName, "Test");
    }
    await client.deleteIssuer(issuerName);
    // @snippet-end CertificateClientDeleteIssuer
  });
});
