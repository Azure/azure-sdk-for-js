// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Imports a PFX and PEM certificate and then deletes them.
 */

import { CertificateClient, WellKnownIssuer } from "../../../src/index.js";
import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
import { isNodeLike } from "@azure/core-util";

// This sample demonstrates how to import both PKCS#12 (PFX) and PEM-formatted certificates
// into Azure Key Vault.
describe("importCertificate", () => {
  let recorder: Recorder;
  let client: CertificateClient;

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
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("import a PKCS12 certificate", async () => {
    // Demonstrates how to import a base64 encoded PFX certificate into Azure Key Vault.
    // When importing a PFX containing your key pair, the policy is needed if you want the
    // private key to be exportable or to configure actions when a certificate is close to expiration.
    const importedCertificate = await client.importCertificate(
      `import-${Date.now()}`,
      Buffer.from(process.env.SAMPLE_PFX_BASE_64 || "", "base64"),
      {
        policy: {
          contentType: "application/x-pkcs12",
          issuerName: WellKnownIssuer.Self,
          subject: "CN=contoso.com",
        },
      },
    );

    console.log("importedCertificate", importedCertificate);

    const deletePoller = await client.beginDeleteCertificate(importedCertificate.name);
    const deletedCertificate = await deletePoller.pollUntilDone();
    console.log("Recovery Id: ", deletedCertificate.recoveryId);
    console.log("Deleted Date: ", deletedCertificate.deletedOn);
    console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);
  });

  it("import a PEM certificate", async () => {
    // PEM-formatted certificates are more common when using tools like openssl. To import a
    // PEM-formatted certificate, you must set a CertificatePolicy that sets the ContentType
    // to Pem or the certificate will fail to import
    const importedCertificate = await client.importCertificate(
      `cert${Date.now()}`,
      Buffer.from(process.env.SAMPLE_PEM || ""), // PEM certificates are not base64 encoded, so we don't need to decode them
      {
        policy: {
          contentType: "application/x-pem-file",
          issuerName: WellKnownIssuer.Self,
          subject: "CN=contoso.com",
        },
      },
    );

    console.log("importedCertificate", importedCertificate);

    const deletePoller = await client.beginDeleteCertificate(importedCertificate.name);
    const deletedCertificate = await deletePoller.pollUntilDone();
    console.log("Recovery Id: ", deletedCertificate.recoveryId);
    console.log("Deleted Date: ", deletedCertificate.deletedOn);
    console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);
  });

  // Operation snippets

  it("CertificateClientImportCertificate", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    const secretClient = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    // @snippet CertificateClientImportCertificate
    const certificateSecret = await secretClient.getSecret("MyCertificate");
    const base64EncodedCertificate = certificateSecret.value!;
    // @ts-preserve-whitespace
    const buffer = isNodeLike
      ? Buffer.from(base64EncodedCertificate, "base64")
      : Uint8Array.from(atob(base64EncodedCertificate), (c) => c.charCodeAt(0));
    await client.importCertificate("MyCertificate", buffer);
    // @snippet-end CertificateClientImportCertificate
  });
});
