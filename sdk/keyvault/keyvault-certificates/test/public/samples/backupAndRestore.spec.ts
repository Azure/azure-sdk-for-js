// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates a self-signed certificate, then makes a backup from it, then deletes it and purges it, and finally restores it.
 */

import { CertificateClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("backupAndRestore", () => {
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
      recorder.variable("certificateName", `backup-restore-${new Date().getTime()}`),
      () => `backup-restore-${new Date().getTime()}`,
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("backup and restore a certificate", async () => {
    // Creating a self-signed certificate
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    await createPoller.pollUntilDone();

    const pendingCertificate = createPoller.getResult();
    console.log("Certificate: ", pendingCertificate);

    const backup = await client.backupCertificate(certificateName);

    const deletePoller = await client.beginDeleteCertificate(certificateName);
    await deletePoller.pollUntilDone();

    await client.purgeDeletedCertificate(certificateName);

    await forPublishing(
      (async () => {
        let lastError: unknown;
        for (let i = 0; i < 5; i++) {
          try {
            return await client.restoreCertificateBackup(backup!);
          } catch (error: any) {
            lastError = error;
            if (!/conflict restoring the certificate/i.test(error.message)) throw error;
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }
        throw lastError;
      })(),
      () => client.restoreCertificateBackup(backup!),
    );

    const restoredCertificate = await client.getCertificate(certificateName);

    console.log("Restored certificate: ", restoredCertificate);
  });

  // Operation snippets

  it("back up a certificate", async () => {
    const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
    // @ts-preserve-whitespace
    const client = forPublishing(
      new CertificateClient(url, credential, recorder.configureClientOptions({})),
      () => new CertificateClient(url, credential),
    );
    // @ts-preserve-whitespace
    // @snippet CertificateClientBackupCertificate
    const certificateName = forPublishing(
      recorder.variable("certificateName", `backup-${new Date().getTime()}`),
      () => "MyCertificate",
    );
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    await createPoller.pollUntilDone();
    const backup = await client.backupCertificate(certificateName);
    // @snippet-end CertificateClientBackupCertificate
  });

  it("restore a certificate from backup", async () => {
    const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
    // @ts-preserve-whitespace
    const client = forPublishing(
      new CertificateClient(url, credential, recorder.configureClientOptions({})),
      () => new CertificateClient(url, credential),
    );
    // @ts-preserve-whitespace
    // @snippet CertificateClientRestoreCertificateBackup
    const certificateName = forPublishing(
      recorder.variable("certificateName", `restore-${new Date().getTime()}`),
      () => "MyCertificate",
    );
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    await createPoller.pollUntilDone();
    const backup = await client.backupCertificate(certificateName);
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteCertificate(certificateName);
    await poller.pollUntilDone();
    await client.purgeDeletedCertificate(certificateName);
    // @ts-preserve-whitespace
    // Some time is required before we're able to restore the certificate
    await forPublishing(
      (async () => {
        let lastError: unknown;
        for (let i = 0; i < 5; i++) {
          try {
            return await client.restoreCertificateBackup(backup!);
          } catch (error: any) {
            lastError = error;
            if (!/conflict restoring the certificate/i.test(error.message)) throw error;
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }
        throw lastError;
      })(),
      () => client.restoreCertificateBackup(backup!),
    );
    // @snippet-end CertificateClientRestoreCertificateBackup
  });
});
