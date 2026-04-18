// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a CertificateClient in various ways to read a certificate as well as update a certificate's tags.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { CertificateClient, DefaultCertificatePolicy } from "@azure/keyvault-certificates";
import type { CertificatePolicy, UpdateCertificateOptions } from "@azure/keyvault-certificates";
import { SecretClient } from "@azure/keyvault-secrets";
// Load the .env file if it exists
import "dotenv/config";
import { writeFileSync } from "node:fs";

let client: CertificateClient;
let certificateName: string;

async function createACertificate() {
  // Creating a self-signed certificate
  const createPoller = await client.beginCreateCertificate(certificateName, DefaultCertificatePolicy);
  // Get the pending certificate before the creation operation is complete
  const pendingCertificate = createPoller.getResult();
  console.log("Certificate: ", pendingCertificate);
}

async function getAndUpdateCertificate() {
  // To read a certificate with their policy
  // Note: It will always read the latest version of the certificate.
  let certificateWithPolicy = await client.getCertificate(certificateName);
  console.log("Certificate with policy:", certificateWithPolicy);
  // To read a certificate from a specific version
  // Note: It will not retrieve the certificate's policy.
  const certificateFromVersion = await client.getCertificateVersion(certificateName, certificateWithPolicy.properties.version!);
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
  const updatedCertificate = await client.updateCertificateProperties(certificateName, version, properties);
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
}

async function deleteTheCertificate() {
  // Delete certificate, wait until complete
  const deletePoller = await client.beginDeleteCertificate(certificateName);
  const deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Recovery Id: ", deletedCertificate.recoveryId);
  console.log("Deleted Date: ", deletedCertificate.deletedOn);
  console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);
}

async function createACertificate2() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  const certificateName = "MyCertificateName";

  // Note: Sending `Self` as the `issuerName` of the certificate's policy will create a self-signed certificate.
  await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
  });
}

async function createACertificateWithOptions() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  const certificateName = "MyCertificateName";

  // Note: Sending `Self` as the `issuerName` of the certificate's policy will create a self-signed certificate.
  const certificatePolicy = {
      issuerName: "Self",
      subject: "cn=MyCert",
  };
  const enabled = true;
  const tags = {
      myCustomTag: "myCustomTagsValue",
  };

  await client.beginCreateCertificate(certificateName, certificatePolicy, {
      enabled,
      tags,
  });
}

async function createACertificateWithPolling() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  const certificateName = "MyCertificateName";
  const certificatePolicy = {
      issuerName: "Self",
      subject: "cn=MyCert",
  };

  const poller = await client.beginCreateCertificate(certificateName, certificatePolicy);

  // You can use the pending certificate immediately:
  const pendingCertificate = poller.getResult();

  // Or you can wait until the certificate finishes being signed:
  const keyVaultCertificate = await poller.pollUntilDone();
  console.log(keyVaultCertificate);
}

async function createACertificateAndPollIndividually() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  const certificateName = "MyCertificateName";
  const certificatePolicy = {
      issuerName: "Self",
      subject: "cn=MyCert",
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const poller = await client.beginCreateCertificate(certificateName, certificatePolicy);

  while (!poller.isDone()) {
      await poller.poll();
      await delay(5000);
  }

  console.log(`The certificate ${certificateName} is fully created`);
}

async function getACertificate() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  const certificateName = "MyCertificateName";

  const latestCertificate = await client.getCertificate(certificateName);
  console.log(`Latest version of the certificate ${certificateName}: `, latestCertificate);
  const specificCertificate = await client.getCertificateVersion(certificateName, latestCertificate.properties.version);
  console.log(`The certificate ${certificateName} at the version ${latestCertificate.properties.version}: `, specificCertificate);
}

async function getCertificateWithFullInformation() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const keyVaultUrl = `https://${vaultName}.vault.azure.net`;

  const secretClient = new SecretClient(keyVaultUrl, credential);

  const certificateName = "MyCertificateName";

  // Assuming you've already created a Key Vault certificate,
  // and that certificateName contains the name of your certificate
  const certificateSecret = await secretClient.getSecret(certificateName);

  // Here we can find both the private key and the public certificate, in PKCS 12 format:
  const PKCS12Certificate = certificateSecret.value!;

  // You can write this into a file:
  writeFileSync("myCertificate.p12", PKCS12Certificate);
}

async function createAPemCertificate() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const keyVaultUrl = `https://${vaultName}.vault.azure.net`;

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

  // Getting the PEM formatted private key and public certificate:
  const certificateSecret = await secretClient.getSecret(certificateName);
  const PEMPair = certificateSecret.value!;

  console.log(PEMPair);
}

async function updateACertificate() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const keyVaultUrl = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(keyVaultUrl, credential);

  const certificateName = "MyCertificate";

  const result = await client.getCertificate(certificateName);
  await client.updateCertificateProperties(certificateName, result.properties.version, {
      enabled: false,
      tags: {
          myCustomTag: "myCustomTagsValue",
      },
  });
}

async function updateACertificatePolicy() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const keyVaultUrl = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(keyVaultUrl, credential);

  const certificateName = "MyCertificate";

  const result = client.getCertificate(certificateName);
  // Note: Sending `Self` as the `issuerName` of the certificate's policy will create a self-signed certificate.
  await client.updateCertificatePolicy(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
  });
}

async function getCertificateProperties() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const keyVaultUrl = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(keyVaultUrl, credential);

  const certificateName = "MyCertificate";

  const result = await client.getCertificate(certificateName);
  console.log(result.name);
}

async function getASpecificCertificateVersion() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  const certificateName = "MyCertificateName";

  const latestCertificate = await client.getCertificate(certificateName);
  console.log(`Latest version of the certificate ${certificateName}: `, latestCertificate);
  const specificCertificate = await client.getCertificateVersion(certificateName, latestCertificate.properties.version);
  console.log(`The certificate ${certificateName} at the version ${latestCertificate.properties.version}: `, specificCertificate);
}

async function updateCertificateProperties() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  // You may pass an empty string for version which will update
  // the latest version of the certificate
  await client.updateCertificateProperties("MyCertificate", "", {
      tags: {
          customTag: "value",
      },
  });
}

async function getACertificatePolicy() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  const policy = await client.getCertificatePolicy("MyCertificate");
  console.log(policy);
}

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  client =
      new CertificateClient(process.env["KEYVAULT_URI"] || "<keyvault-url>", new DefaultAzureCredential());
  // Create unique certificate name
  certificateName =
      `hello-world-${new Date().getTime()}`;
  await createACertificate();
  await getAndUpdateCertificate();
  await deleteTheCertificate();
  await createACertificate2();
  await createACertificateWithOptions();
  await createACertificateWithPolling();
  await createACertificateAndPollIndividually();
  await getACertificate();
  await getCertificateWithFullInformation();
  await createAPemCertificate();
  await updateACertificate();
  await updateACertificatePolicy();
  await getCertificateProperties();
  await getASpecificCertificateVersion();
  await updateCertificateProperties();
  await getACertificatePolicy();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
