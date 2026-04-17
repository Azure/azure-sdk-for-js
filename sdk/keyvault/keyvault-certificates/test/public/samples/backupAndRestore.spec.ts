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

    const pendingCertificate = createPoller.getResult();
    console.log("Certificate: ", pendingCertificate);

    const backup = await client.backupCertificate(certificateName);

    const deletePoller = await client.beginDeleteCertificate(certificateName);
    await deletePoller.pollUntilDone();

    await client.purgeDeletedCertificate(certificateName);

    await client.restoreCertificateBackup(backup!);

    const restoredCertificate = await client.getCertificate(certificateName);

    console.log("Restored certificate: ", restoredCertificate);
  });

  // Operation snippets

  it("CertificateClientBackupCertificate", async () => {
    // @snippet CertificateClientBackupCertificate
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    await client.beginCreateCertificate("MyCertificate", {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    const backup = await client.backupCertificate("MyCertificate");
    // @snippet-end CertificateClientBackupCertificate
  });

  it("CertificateClientRestoreCertificateBackup", async () => {
    // @snippet CertificateClientRestoreCertificateBackup
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    await client.beginCreateCertificate("MyCertificate", {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    const backup = await client.backupCertificate("MyCertificate");
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteCertificate("MyCertificate");
    await poller.pollUntilDone();
    // @ts-preserve-whitespace
    // Some time is required before we're able to restore the certificate
    await client.restoreCertificateBackup(backup!);
    // @snippet-end CertificateClientRestoreCertificateBackup
  });
});
