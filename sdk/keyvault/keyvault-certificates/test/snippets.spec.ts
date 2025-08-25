// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateClient } from "@azure/keyvault-certificates";
import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { isNodeLike } from "@azure/core-util";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Build the URL to reach your key vault
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    // Lastly, create our certificates client and connect to the service
    const client = new CertificateClient(url, credential);
  });

  it("ReadmeSampleCreateClientWithVersion", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    // Change the Azure Key Vault service API version being used via the `serviceVersion` option
    const client = new CertificateClient(url, credential, {
      serviceVersion: "7.5",
    });
  });

  it("ReadmeSampleCreateCertificate", async () => {
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
  });

  it("ReadmeSampleCreateCertificateWithOptions", async () => {
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
  });

  it("ReadmeSampleCreateCertificatePoller", async () => {
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
  });

  it("ReadmeSampleCreateCertificatePollerIndividualCalls", async () => {
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
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // @ts-preserve-whitespace
    const poller = await client.beginCreateCertificate(certificateName, certificatePolicy);
    // @ts-preserve-whitespace
    while (!poller.isDone()) {
      await poller.poll();
      await delay(5000);
    }
    // @ts-preserve-whitespace
    console.log(`The certificate ${certificateName} is fully created`);
  });

  it("ReadmeSampleGetCertificate", async () => {
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
  });

  it("ReadmeSampleGetCertificateFullInfo", async () => {
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
  });

  it("ReadmeSampleCreateCertificatePEM", async () => {
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
  });

  it("ReadmeSampleListCertificates", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    for await (const certificateProperties of client.listPropertiesOfCertificates()) {
      console.log("Certificate properties: ", certificateProperties);
    }
  });

  it("ReadmeSampleUpdateCertificate", async () => {
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
  });

  it("ReadmeSampleUpdateCertificatePolicy", async () => {
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
  });

  it("ReadmeSampleDeleteCertificate", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    const certificateName = "MyCertificate";
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
    // const recoverPoller = await client.beginRecoverDeletedCertificate(certificateName);
    // await recoverPoller.pollUntilDone();
    // @ts-preserve-whitespace
    // If a certificate is done and the Key Vault has soft-delete enabled, the certificate can be purged with:
    await client.purgeDeletedCertificate(certificateName);
  });

  it("ReadmeSampleListCertificates", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
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
  });

  it("ReadmeSampleListCertificatesByPage", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
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
  });

  it("IndexListCertificates", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
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
  });

  it("IndexListCertificateVersions", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    for await (const certificateProperties of client.listPropertiesOfCertificateVersions(
      "MyCertificate",
    )) {
      console.log(certificateProperties.version!);
    }
  });

  it("CertificateClientDeleteContacts", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    await client.deleteContacts();
  });

  it("CertificateClientSetContacts", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    await client.setContacts([
      {
        email: "b@b.com",
        name: "b",
        phone: "222222222222",
      },
    ]);
  });

  it("CertificateClientGetContacts", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    const contacts = await client.getContacts();
    for (const contact of contacts) {
      console.log(contact);
    }
  });

  it("CertificateClientListIssuers", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    await client.createIssuer("IssuerName", "Test");
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
  });

  it("CertificateClientCreateIssuer", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    await client.createIssuer("IssuerName", "Test");
  });

  it("CertificateClientUpdateIssuer", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    await client.updateIssuer("IssuerName", {
      provider: "Provider2",
    });
  });

  it("CertificateClientGetIssuer", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    const certificateIssuer = await client.getIssuer("IssuerName");
    console.log(certificateIssuer);
  });

  it("CertificateClientDeleteIssuer", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    await client.deleteIssuer("IssuerName");
  });

  it("CertificateClientGetCertificate", async () => {
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
  });

  it("CertificateClientGetCertificateVersion", async () => {
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
  });

  it("CertificateClientImportCertificate", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    const secretClient = new SecretClient(url, credential);
    // @ts-preserve-whitespace
    const certificateSecret = await secretClient.getSecret("MyCertificate");
    const base64EncodedCertificate = certificateSecret.value!;
    // @ts-preserve-whitespace
    const buffer = isNodeLike
      ? Buffer.from(base64EncodedCertificate, "base64")
      : Uint8Array.from(atob(base64EncodedCertificate), (c) => c.charCodeAt(0));
    await client.importCertificate("MyCertificate", buffer);
  });

  it("CertificateClientGetCertificatePolicy", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const policy = await client.getCertificatePolicy("MyCertificate");
    console.log(policy);
  });

  it("CertificateClientUpdateCertificate", async () => {
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
  });

  it("CertificateClientGetCertificateOperation", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const createPoller = await client.beginCreateCertificate("MyCertificate", {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    // @ts-preserve-whitespace
    const poller = await client.getCertificateOperation("MyCertificate");
    const pendingCertificate = poller.getResult();
    // @ts-preserve-whitespace
    const certificateOperation = poller.getOperationState().certificateOperation;
    console.log(certificateOperation);
  });

  it("CertificateClientDeleteCertificateOperation", async () => {
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
    await client.deleteCertificateOperation("MyCertificate");
    // @ts-preserve-whitespace
    await client.getCertificateOperation("MyCertificate");
    // Throws error: Pending certificate not found: "MyCertificate"
  });

  it("CertificateClientMergeCertificate", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    await client.beginCreateCertificate("MyCertificate", {
      issuerName: "Unknown",
      subject: "cn=MyCert",
    });
    const poller = await client.getCertificateOperation("MyCertificate");
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
    await client.mergeCertificate("MyCertificate", [Buffer.from(base64Crt)]);
  });

  it("CertificateClientBackupCertificate", async () => {
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
  });

  it("CertificateClientRestoreCertificateBackup", async () => {
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
  });

  it("CertificateClientListDeletedCertificates", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    for await (const deletedCertificate of client.listDeletedCertificates()) {
      console.log(deletedCertificate);
    }
    // @ts-preserve-whitespace
    for await (const page of client.listDeletedCertificates().byPage()) {
      for (const deletedCertificate of page) {
        console.log(deletedCertificate);
      }
    }
  });

  it("CertificateClientGetDeletedCertificate", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const deletedCertificate = await client.getDeletedCertificate("MyDeletedCertificate");
    console.log("Deleted certificate:", deletedCertificate);
  });

  it("CertificateClientPurgeDeletedCertificate", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const deletePoller = await client.beginDeleteCertificate("MyCertificate");
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    // Deleting a certificate takes time, make sure to wait before purging it
    client.purgeDeletedCertificate("MyCertificate");
  });

  it("CertificateClientRecoverDeletedCertificate", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @ts-preserve-whitespace
    const deletePoller = await client.beginDeleteCertificate("MyCertificate");
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    const recoverPoller = await client.beginRecoverDeletedCertificate("MyCertificate");
    // @ts-preserve-whitespace
    // Waiting until it's done
    const certificate = await recoverPoller.pollUntilDone();
    console.log(certificate);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
