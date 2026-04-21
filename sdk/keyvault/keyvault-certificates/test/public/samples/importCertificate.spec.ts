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
// Load the .env file if it exists
import "dotenv/config";

// This sample demonstrates how to import both PKCS#12 (PFX) and PEM-formatted certificates
// into Azure Key Vault.
describe("importCertificate", () => {
  let recorder: Recorder;
  let client: CertificateClient;
  let secretClient: SecretClient;

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
    secretClient = forPublishing(
      new SecretClient(
        assertEnvironmentVariable("KEYVAULT_URI"),
        createTestCredential(),
        recorder.configureClientOptions({}),
      ),
      () =>
        new SecretClient(
          process.env["KEYVAULT_URI"] || "<keyvault-url>",
          new DefaultAzureCredential(),
        ),
    );
  });

  async function createSourceCertificateValue(
    certificateName: string,
    contentType: "application/x-pkcs12" | "application/x-pem-file",
  ): Promise<string> {
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "CN=contoso.com",
      contentType,
    });
    await createPoller.pollUntilDone();

    const certificateSecret = await secretClient.getSecret(certificateName);
    if (!certificateSecret.value) {
      throw new Error(`Expected certificate secret ${certificateName} to contain a value.`);
    }

    return certificateSecret.value;
  }

  afterEach(async () => {
    await recorder.stop();
  });

  it("import a PKCS12 certificate", async () => {
    // Demonstrates how to import a base64 encoded PFX certificate into Azure Key Vault.
    // When importing a PFX containing your key pair, the policy is needed if you want the
    // private key to be exportable or to configure actions when a certificate is close to expiration.
    const certificateName = forPublishing(
      recorder.variable("certificateName", `import-${Date.now()}`),
      () => `import-${Date.now()}`,
    );
    const sourceCertificateName = recorder.variable(
      "sourceCertificateName",
      `source-pfx-${Date.now()}`,
    );
    const samplePfxBase64 = forPublishing(
      await createSourceCertificateValue(sourceCertificateName, "application/x-pkcs12"),
      () => process.env.SAMPLE_PFX_BASE_64 || "",
    );

    const importedCertificate = await client.importCertificate(
      certificateName,
      Buffer.from(samplePfxBase64, "base64"),
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
    const certificateName = forPublishing(
      recorder.variable("certificateName", `cert${Date.now()}`),
      () => `cert${Date.now()}`,
    );
    const sourceCertificateName = recorder.variable(
      "sourceCertificateName",
      `source-pem-${Date.now()}`,
    );
    const samplePem = forPublishing(
      await createSourceCertificateValue(sourceCertificateName, "application/x-pem-file"),
      () => process.env.SAMPLE_PEM || "",
    );

    const importedCertificate = await client.importCertificate(
      certificateName,
      Buffer.from(samplePem), // PEM certificates are not base64 encoded, so we don't need to decode them
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

  it("import a certificate", async () => {
    const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
    // @ts-preserve-whitespace
    const client = forPublishing(
      new CertificateClient(url, credential, recorder.configureClientOptions({})),
      () => new CertificateClient(url, credential),
    );
    const secretClient = forPublishing(
      new SecretClient(url, credential, recorder.configureClientOptions({})),
      () => new SecretClient(url, credential),
    );
    // @ts-preserve-whitespace
    // @snippet CertificateClientImportCertificate
    const sourceCertificateName = forPublishing(
      recorder.variable("sourceCertificateName", `source-${Date.now()}`),
      () => "MySourceCertificate",
    );
    const importedCertificateName = forPublishing(
      recorder.variable("importedCertificateName", `imported-${Date.now()}`),
      () => "MyCertificate",
    );
    if (forPublishing(true, () => false)) {
      const createPoller = await client.beginCreateCertificate(sourceCertificateName, {
        issuerName: "Self",
        subject: "cn=MyCert",
      });
      await createPoller.pollUntilDone();
    }
    const certificateSecret = await secretClient.getSecret(sourceCertificateName);
    const base64EncodedCertificate = certificateSecret.value!;
    // @ts-preserve-whitespace
    const buffer = isNodeLike
      ? Buffer.from(base64EncodedCertificate, "base64")
      : Uint8Array.from(atob(base64EncodedCertificate), (c) => c.charCodeAt(0));
    await client.importCertificate(importedCertificateName, buffer);
    // @snippet-end CertificateClientImportCertificate
  });
});
