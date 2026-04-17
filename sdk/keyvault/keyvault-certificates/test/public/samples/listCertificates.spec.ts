// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary List certificates, lists a certificate's versions, and lists deleted certificates in various ways.
 */

import { CertificateClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";

describe("listCertificates", () => {
  let recorder: Recorder;
  let client: CertificateClient;
  let certificateName1: string;
  let certificateName2: string;

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
          process.env["KEYVAULT_URI"] || "<keyvault-url>",
          new DefaultAzureCredential(),
        ),
    );
    certificateName1 = forPublishing(
      recorder.variable("certificateName1", `list-1${new Date().getTime()}`),
      () => `list-1${new Date().getTime()}`,
    );
    certificateName2 = forPublishing(
      recorder.variable("certificateName2", `list-2${new Date().getTime()}`),
      () => `list-2${new Date().getTime()}`,
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create certificates", async () => {
    // Creating two self-signed certificates. They will appear as pending initially.
    await client.beginCreateCertificate(certificateName1, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    await client.beginCreateCertificate(certificateName2, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
  });

  it("list certificates by page", async () => {
    // Listing all the available certificates by pages.
    let pageCount = 0;
    for await (const page of client
      .listPropertiesOfCertificates({ includePending: true })
      .byPage()) {
      for (const certificate of page) {
        console.log(`Certificate from page ${pageCount}: `, certificate);
      }
      pageCount++;
    }
  });

  it("list all certificates", async () => {
    // Listing all the available certificates in a single call.
    // The certificates we just created are still pending at this point.
    for await (const certificate of client.listPropertiesOfCertificates({
      includePending: true,
    })) {
      console.log("Certificate from a single call: ", certificate);
    }
  });

  it("update and list certificate versions", async () => {
    // Updating one of the certificates to retrieve the certificate versions afterwards
    const updatedCertificate = await client.updateCertificateProperties(certificateName1, "", {
      tags: {
        customTag: "value",
      },
    });
    console.log("Updated certificate:", updatedCertificate);

    // Listing a certificate's versions
    for await (const item of client.listPropertiesOfCertificateVersions(certificateName1, {})) {
      const version = item.version!;
      const certificate = await client.getCertificateVersion(certificateName1, version);
      console.log(`Certificate from version ${version}: `, certificate);
    }
  });

  // Operation snippets

  it("ReadmeSampleListCertificates", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    // @snippet ReadmeSampleListCertificates
    const certificateName = "MyCertificate";
    // @ts-preserve-whitespace
    for await (const certificateProperties of client.listPropertiesOfCertificates()) {
      console.log("Certificate properties: ", certificateProperties);
    }
    for await (const deletedCertificate of client.listDeletedCertificates()) {
      console.log("Deleted certificate: ", deletedCertificate);
    }
    for await (const certificateProperties of client.listPropertiesOfCertificateVersions(
      certificateName,
    )) {
      console.log("Certificate properties: ", certificateProperties);
    }
    // @snippet-end ReadmeSampleListCertificates
  });

  it("ReadmeSampleListCertificatesByPage", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    // @snippet ReadmeSampleListCertificatesByPage
    const certificateName = "MyCertificate";
    // @ts-preserve-whitespace
    for await (const page of client.listPropertiesOfCertificates().byPage()) {
      for (const certificateProperties of page) {
        console.log("Certificate properties: ", certificateProperties);
      }
    }
    for await (const page of client.listDeletedCertificates().byPage()) {
      for (const deletedCertificate of page) {
        console.log("Deleted certificate: ", deletedCertificate);
      }
    }
    for await (const page of client.listPropertiesOfCertificateVersions(certificateName).byPage()) {
      for (const certificateProperties of page) {
        console.log("Properties of certificate: ", certificateProperties);
      }
    }
    // @snippet-end ReadmeSampleListCertificatesByPage
  });

  it("IndexListCertificates", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    // @snippet IndexListCertificates
    // All in one call
    for await (const certificateProperties of client.listPropertiesOfCertificates()) {
      console.log(certificateProperties);
    }
    // @ts-preserve-whitespace
    // By pages
    for await (const page of client.listPropertiesOfCertificates().byPage()) {
      for (const certificateProperties of page) {
        console.log(certificateProperties);
      }
    }
    // @snippet-end IndexListCertificates
  });

  it("IndexListCertificateVersions", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    // @snippet IndexListCertificateVersions
    for await (const certificateProperties of client.listPropertiesOfCertificateVersions(
      "MyCertificate",
    )) {
      console.log(certificateProperties.version!);
    }
    // @snippet-end IndexListCertificateVersions
  });
});
