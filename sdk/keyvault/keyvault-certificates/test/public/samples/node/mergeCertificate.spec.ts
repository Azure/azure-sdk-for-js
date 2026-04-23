// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates a certificate with an unknown issuer and signs it using a fake certificate authority and the mergeCertificate API.
 */

import { CertificateClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
// Load the .env file if it exists
import "dotenv/config";

describe("mergeCertificate", () => {
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
    await recorder.setMatcher("CustomDefaultMatcher", { compareBodies: false });
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
      recorder.variable("certificateName", `merge-${new Date().getTime()}`),
      () => `merge-${new Date().getTime()}`,
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("merge a certificate", async () => {
    // Creating a certificate with an Unknown issuer.
    await client.beginCreateCertificate(certificateName, {
      issuerName: "Unknown",
      certificateTransparency: false,
      subject: "cn=MyCert",
    });

    // Retrieving the certificate's signing request
    const operationPoller = await client.getCertificateOperation(certificateName);
    const { csr } = operationPoller.getOperationState().certificateOperation!;
    const base64Csr = Buffer.from(csr!).toString("base64");
    const wrappedCsr = `-----BEGIN CERTIFICATE REQUEST-----
${base64Csr}
-----END CERTIFICATE REQUEST-----`;
    writeFileSync("test.csr", wrappedCsr);

    // Now, signing the retrieved certificate request with a fake certificate authority.
    // A certificate authority is composed of two pieces, a certificate and a private key.
    //
    // We made these using openssl, as follows:
    //
    //   openssl genrsa -out ca.key 2048
    //   openssl req -new -x509 -key ca.key -out ca.crt
    //
    // For more information on how to set up a local certificate authority
    // go to: https://gist.github.com/Soarez/9688998
    execSync(
      "openssl x509 -req -in test.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out test.crt",
    );
    const base64Crt = readFileSync("test.crt").toString().split("\n").slice(1, -1).join("");

    // Once we have the response in base64 format, we send it to mergeCertificate
    await client.mergeCertificate(certificateName, [Buffer.from(base64Crt)]);
  });

  // Operation snippets

  it("merge a certificate", async () => {
    // @snippet CertificateClientMergeCertificate
    await client.beginCreateCertificate(certificateName, {
      issuerName: "Unknown",
      subject: "cn=MyCert",
    });
    const poller = await client.getCertificateOperation(certificateName);
    const { csr } = poller.getOperationState().certificateOperation!;
    const base64Csr = Buffer.from(csr!).toString("base64");
    const wrappedCsr = [
      "-----BEGIN CERTIFICATE REQUEST-----",
      base64Csr,
      "-----END CERTIFICATE REQUEST-----",
    ].join("\n");
    // @ts-preserve-whitespace
    writeFileSync("test.csr", wrappedCsr);
    // @ts-preserve-whitespace
    // Certificate available locally made using:
    //   openssl genrsa -out ca.key 2048
    //   openssl req -new -x509 -key ca.key -out ca.crt
    // You can read more about how to create a fake certificate authority here: https://gist.github.com/Soarez/9688998
    // @ts-preserve-whitespace
    execSync(
      "openssl x509 -req -in test.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out test.crt",
    );
    const base64Crt = readFileSync("test.crt").toString().split("\n").slice(1, -1).join("");
    // @ts-preserve-whitespace
    await client.mergeCertificate(certificateName, [Buffer.from(base64Crt)]);
    // @snippet-end CertificateClientMergeCertificate
  });
});
