// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates a self-signed certificate, deletes it, and then recovers it (soft-delete is required for this sample to run).
 */

import { CertificateClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("deleteAndRecover", () => {
  let recorder: Recorder;
  let client: CertificateClient;
  let certificateName: string;

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
    certificateName = forPublishing(
      recorder.variable("certificateName", `delete-recover-${new Date().getTime()}`),
      () => `delete-recover-${new Date().getTime()}`,
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create a certificate", async () => {
    // Creating a self-signed certificate
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });

    const pendingCertificate = createPoller.getResult();
    console.log("Certificate: ", pendingCertificate);
  });

  it("delete and recover a certificate", async () => {
    const certificateName = forPublishing(
      recorder.variable("certificateName", `delete-recover-${new Date().getTime()}`),
      () => "MyCertificateDR",
    );
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    await createPoller.pollUntilDone();

    const deletePoller = await client.beginDeleteCertificate(certificateName);
    const deletedCertificate = await deletePoller.pollUntilDone();
    console.log("Deleted certificate: ", deletedCertificate);

    const recoverPoller = await client.beginRecoverDeletedCertificate(certificateName);
    const certificateWithPolicy = await recoverPoller.pollUntilDone();
    console.log("Certificate with policy:", certificateWithPolicy);
  });

  // Operation snippets

  it("delete a certificate", async () => {
    const certificateName = forPublishing(
      recorder.variable("certificateName", `delete-recover-${new Date().getTime()}`),
      () => "MyCertificateDelete",
    );
    // @snippet ReadmeSampleDeleteCertificate
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    await createPoller.pollUntilDone();
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteCertificate(certificateName);
    // @ts-preserve-whitespace
    // You can use the deleted certificate immediately:
    const deletedCertificate = poller.getResult();
    // @ts-preserve-whitespace
    // The certificate is being deleted. Only wait for it if you want to restore it or purge it.
    await poller.pollUntilDone();
    // @ts-preserve-whitespace
    // You can also get the deleted certificate this way:
    await client.getDeletedCertificate(certificateName);
    // @ts-preserve-whitespace
    // Deleted certificates can also be recovered or purged.
    // @ts-preserve-whitespace
    // recoverDeletedCertificate returns a poller, just like beginDeleteCertificate.
    // @ts-preserve-whitespace
    // If a certificate is done and the Key Vault has soft-delete enabled, the certificate can be purged with:
    await client.purgeDeletedCertificate(certificateName);
    // @snippet-end ReadmeSampleDeleteCertificate
  });

  it("list deleted certificates", async () => {
    // @snippet CertificateClientListDeletedCertificates
    if (forPublishing(true, () => false)) {
      const deletedCertificateName = recorder.variable(
        "deletedCertificateName",
        `deleted-${new Date().getTime()}`,
      );
      const createPoller = await client.beginCreateCertificate(deletedCertificateName, {
        issuerName: "Self",
        subject: "cn=MyCert",
      });
      await createPoller.pollUntilDone();
      const deletePoller = await client.beginDeleteCertificate(deletedCertificateName);
      await deletePoller.pollUntilDone();
    }
    for await (const deletedCertificate of client.listDeletedCertificates()) {
      console.log(deletedCertificate);
    }
    // @ts-preserve-whitespace
    for await (const page of client.listDeletedCertificates().byPage()) {
      for (const deletedCertificate of page) {
        console.log(deletedCertificate);
      }
    }
    // @snippet-end CertificateClientListDeletedCertificates
  });

  it("get a deleted certificate", async () => {
    const certificateName = forPublishing(
      recorder.variable("certificateName", `delete-recover-${new Date().getTime()}`),
      () => "MyCertificateGetDeleted",
    );
    // @snippet CertificateClientGetDeletedCertificate
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    await createPoller.pollUntilDone();
    const deletePoller = await client.beginDeleteCertificate(certificateName);
    await deletePoller.pollUntilDone();
    const deletedCertificate = await client.getDeletedCertificate(certificateName);
    console.log("Deleted certificate:", deletedCertificate);
    // @snippet-end CertificateClientGetDeletedCertificate
  });

  it("purge a deleted certificate", async () => {
    const certificateName = forPublishing(
      recorder.variable("certificateName", `delete-recover-${new Date().getTime()}`),
      () => "MyCertificatePurge",
    );
    // @snippet CertificateClientPurgeDeletedCertificate
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    await createPoller.pollUntilDone();
    const deletePoller = await client.beginDeleteCertificate(certificateName);
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    // Deleting a certificate takes time, make sure to wait before purging it
    await client.purgeDeletedCertificate(certificateName);
    // @snippet-end CertificateClientPurgeDeletedCertificate
  });

  it("recover a deleted certificate", async () => {
    const certificateName = forPublishing(
      recorder.variable("certificateName", `delete-recover-${new Date().getTime()}`),
      () => "MyCertificateRecover",
    );
    // @snippet CertificateClientRecoverDeletedCertificate
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    await createPoller.pollUntilDone();
    const deletePoller = await client.beginDeleteCertificate(certificateName);
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    const recoverPoller = await client.beginRecoverDeletedCertificate(certificateName);
    // @ts-preserve-whitespace
    // Waiting until it's done
    const certificate = await recoverPoller.pollUntilDone();
    console.log(certificate);
    // @snippet-end CertificateClientRecoverDeletedCertificate
  });
});
