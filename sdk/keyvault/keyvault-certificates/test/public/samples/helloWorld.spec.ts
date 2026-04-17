// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a CertificateClient in various ways to read a certificate as well as update a certificate's tags.
 */

import type { CertificatePolicy, UpdateCertificateOptions } from "../../../src/index.js";
import { CertificateClient, DefaultCertificatePolicy } from "../../../src/index.js";
import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
import { writeFileSync } from "node:fs";

describe("helloWorld", () => {
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
    // Create unique certificate name
    certificateName = forPublishing(
      recorder.variable("certificateName", `hello-world-${new Date().getTime()}`),
      () => `hello-world-${new Date().getTime()}`,
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create a certificate", async () => {
    // Creating a self-signed certificate
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
    );

    // Get the pending certificate before the creation operation is complete
    const pendingCertificate = createPoller.getResult();
    console.log("Certificate: ", pendingCertificate);
  });

  it("get and update certificate", async () => {
    // To read a certificate with their policy
    // Note: It will always read the latest version of the certificate.
    let certificateWithPolicy = await client.getCertificate(certificateName);
    console.log("Certificate with policy:", certificateWithPolicy);

    // To read a certificate from a specific version
    // Note: It will not retrieve the certificate's policy.
    const certificateFromVersion = await client.getCertificateVersion(
      certificateName,
      certificateWithPolicy.properties.version!,
    );
    console.log("Certificate from a specific version:", certificateFromVersion);

    // Update certificate properties
    const version = ""; // latest certificate
    const properties: UpdateCertificateOptions = {
      tags: {
        projectName: "certificate-sample",
        projectOwner: "REPLACE-WITH-YOUR-NAME",
      },
      enabled: true,
    };
    const updatedCertificate = await client.updateCertificateProperties(
      certificateName,
      version,
      properties,
    );
    console.log("Updated certificate:", updatedCertificate);

    // Updating the certificate's policy:
    const policy: CertificatePolicy = {
      issuerName: "Self",
      subject: "cn=MyOtherCert",
      exportable: true,
      enabled: true,
    };
    await client.updateCertificatePolicy(certificateName, policy);

    // Get updated certificate with policy
    certificateWithPolicy = await client.getCertificate(certificateName);
    console.log("updatedCertificate certificate's policy:", certificateWithPolicy.policy);
  });

  it("delete the certificate", async () => {
    // Delete certificate, wait until complete
    const deletePoller = await client.beginDeleteCertificate(certificateName);
    const deletedCertificate = await deletePoller.pollUntilDone();
    console.log("Recovery Id: ", deletedCertificate.recoveryId);
    console.log("Deleted Date: ", deletedCertificate.deletedOn);
    console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);
  });

  // Operation snippets

  it("ReadmeSampleCreateCertificate", async () => {
    // @snippet ReadmeSampleCreateCertificate
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const certificateName = "MyCertificateName";
    // @ts-preserve-whitespace
    // Note: Sending `Self` as the `issuerName` of the certificate's policy will create a self-signed certificate.
    await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    // @snippet-end ReadmeSampleCreateCertificate
  });

  it("ReadmeSampleCreateCertificateWithOptions", async () => {
    // @snippet ReadmeSampleCreateCertificateWithOptions
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const certificateName = "MyCertificateName";
    // @ts-preserve-whitespace
    // Note: Sending `Self` as the `issuerName` of the certificate's policy will create a self-signed certificate.
    const certificatePolicy = {
      issuerName: "Self",
      subject: "cn=MyCert",
    };
    const enabled = true;
    const tags = {
      myCustomTag: "myCustomTagsValue",
    };
    // @ts-preserve-whitespace
    await client.beginCreateCertificate(certificateName, certificatePolicy, {
      enabled,
      tags,
    });
    // @snippet-end ReadmeSampleCreateCertificateWithOptions
  });

  it("ReadmeSampleCreateCertificatePoller", async () => {
    // @snippet ReadmeSampleCreateCertificatePoller
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const certificateName = "MyCertificateName";
    const certificatePolicy = {
      issuerName: "Self",
      subject: "cn=MyCert",
    };
    // @ts-preserve-whitespace
    const poller = await client.beginCreateCertificate(certificateName, certificatePolicy);
    // @ts-preserve-whitespace
    // You can use the pending certificate immediately:
    const pendingCertificate = poller.getResult();
    // @ts-preserve-whitespace
    // Or you can wait until the certificate finishes being signed:
    const keyVaultCertificate = await poller.pollUntilDone();
    console.log(keyVaultCertificate);
    // @snippet-end ReadmeSampleCreateCertificatePoller
  });

  it("ReadmeSampleCreateCertificatePollerIndividualCalls", async () => {
    // @snippet ReadmeSampleCreateCertificatePollerIndividualCalls
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const certificateName = "MyCertificateName";
    const certificatePolicy = {
      issuerName: "Self",
      subject: "cn=MyCert",
    };
    // @ts-preserve-whitespace
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    // @ts-preserve-whitespace
    const poller = await client.beginCreateCertificate(certificateName, certificatePolicy);
    // @ts-preserve-whitespace
    while (!poller.isDone()) {
      await poller.poll();
      await delay(5000);
    }
    // @ts-preserve-whitespace
    console.log(`The certificate ${certificateName} is fully created`);
    // @snippet-end ReadmeSampleCreateCertificatePollerIndividualCalls
  });

  it("ReadmeSampleGetCertificate", async () => {
    // @snippet ReadmeSampleGetCertificate
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const certificateName = "MyCertificateName";
    // @ts-preserve-whitespace
    const latestCertificate = await client.getCertificate(certificateName);
    console.log(`Latest version of the certificate ${certificateName}: `, latestCertificate);
    const specificCertificate = await client.getCertificateVersion(
      certificateName,
      latestCertificate.properties.version,
    );
    console.log(
      `The certificate ${certificateName} at the version ${latestCertificate.properties.version}: `,
      specificCertificate,
    );
    // @snippet-end ReadmeSampleGetCertificate
  });

  it("ReadmeSampleGetCertificateFullInfo", async () => {
    // @snippet ReadmeSampleGetCertificateFullInfo
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const secretClient = new SecretClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    const certificateName = "MyCertificateName";
    // @ts-preserve-whitespace
    // Assuming you've already created a Key Vault certificate,
    // and that certificateName contains the name of your certificate
    const certificateSecret = await secretClient.getSecret(certificateName);
    // @ts-preserve-whitespace
    // Here we can find both the private key and the public certificate, in PKCS 12 format:
    const PKCS12Certificate = certificateSecret.value!;
    // @ts-preserve-whitespace
    // You can write this into a file:
    writeFileSync("myCertificate.p12", PKCS12Certificate);
    // @snippet-end ReadmeSampleGetCertificateFullInfo
  });

  it("ReadmeSampleCreateCertificatePEM", async () => {
    // @snippet ReadmeSampleCreateCertificatePEM
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    const secretClient = new SecretClient(keyVaultUrl, credential);
    // Creating the certificate
    const certificateName = "MyCertificate";
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
      contentType: "application/x-pem-file", // Here you specify you want to work with PEM certificates.
    });
    await createPoller.pollUntilDone();
    // @ts-preserve-whitespace
    // Getting the PEM formatted private key and public certificate:
    const certificateSecret = await secretClient.getSecret(certificateName);
    const PEMPair = certificateSecret.value!;
    // @ts-preserve-whitespace
    console.log(PEMPair);
    // @snippet-end ReadmeSampleCreateCertificatePEM
  });

  it("ReadmeSampleUpdateCertificate", async () => {
    // @snippet ReadmeSampleUpdateCertificate
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    const certificateName = "MyCertificate";
    // @ts-preserve-whitespace
    const result = await client.getCertificate(certificateName);
    await client.updateCertificateProperties(certificateName, result.properties.version, {
      enabled: false,
      tags: {
        myCustomTag: "myCustomTagsValue",
      },
    });
    // @snippet-end ReadmeSampleUpdateCertificate
  });

  it("ReadmeSampleUpdateCertificatePolicy", async () => {
    // @snippet ReadmeSampleUpdateCertificatePolicy
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    const certificateName = "MyCertificate";
    // @ts-preserve-whitespace
    const result = client.getCertificate(certificateName);
    // Note: Sending `Self` as the `issuerName` of the certificate's policy will create a self-signed certificate.
    await client.updateCertificatePolicy(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    // @snippet-end ReadmeSampleUpdateCertificatePolicy
  });

  it("CertificateClientGetCertificate", async () => {
    // @snippet CertificateClientGetCertificate
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    const certificateName = "MyCertificate";
    // @ts-preserve-whitespace
    const result = await client.getCertificate(certificateName);
    console.log(result.name);
    // @snippet-end CertificateClientGetCertificate
  });

  it("CertificateClientGetCertificateVersion", async () => {
    // @snippet CertificateClientGetCertificateVersion
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const certificateName = "MyCertificateName";
    // @ts-preserve-whitespace
    const latestCertificate = await client.getCertificate(certificateName);
    console.log(`Latest version of the certificate ${certificateName}: `, latestCertificate);
    const specificCertificate = await client.getCertificateVersion(
      certificateName,
      latestCertificate.properties.version,
    );
    console.log(
      `The certificate ${certificateName} at the version ${latestCertificate.properties.version}: `,
      specificCertificate,
    );
    // @snippet-end CertificateClientGetCertificateVersion
  });

  it("CertificateClientUpdateCertificate", async () => {
    // @snippet CertificateClientUpdateCertificate
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    // You may pass an empty string for version which will update
    // the latest version of the certificate
    await client.updateCertificateProperties("MyCertificate", "", {
      tags: {
        customTag: "value",
      },
    });
    // @snippet-end CertificateClientUpdateCertificate
  });

  it("CertificateClientGetCertificatePolicy", async () => {
    // @snippet CertificateClientGetCertificatePolicy
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const policy = await client.getCertificatePolicy("MyCertificate");
    console.log(policy);
    // @snippet-end CertificateClientGetCertificatePolicy
  });
});
