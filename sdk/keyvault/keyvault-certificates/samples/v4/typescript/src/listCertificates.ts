// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary List certificates, lists a certificate's versions, and lists deleted certificates in various ways.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { CertificateClient } from "@azure/keyvault-certificates";

let client: CertificateClient;
let certificateName1: string;
let certificateName2: string;

async function createCertificates() {
  // Creating two self-signed certificates. They will appear as pending initially.
  const createPoller1 = await client.beginCreateCertificate(certificateName1, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await createPoller1.pollUntilDone();
  const createPoller2 = await client.beginCreateCertificate(certificateName2, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await createPoller2.pollUntilDone();
}

async function updateAndListCertificateVersions() {
  const createPoller = await client.beginCreateCertificate(certificateName1, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await createPoller.pollUntilDone();
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
}

async function listAllCertificates() {
  for await (const certificateProperties of client.listPropertiesOfCertificates()) {
    console.log("Certificate properties: ", certificateProperties);
  }
  for await (const deletedCertificate of client.listDeletedCertificates()) {
    console.log("Deleted certificate: ", deletedCertificate);
  }
  for await (const certificateProperties of client.listPropertiesOfCertificateVersions(
    certificateName1,
  )) {
    console.log("Certificate properties: ", certificateProperties);
  }
}

async function listCertificatesByPage() {
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
  for await (const page of client.listPropertiesOfCertificateVersions(certificateName2).byPage()) {
    for (const certificateProperties of page) {
      console.log("Properties of certificate: ", certificateProperties);
    }
  }
}

async function listCertificateProperties() {
  // All in one call
  for await (const certificateProperties of client.listPropertiesOfCertificates()) {
    console.log(certificateProperties);
  }

  // By pages
  for await (const page of client.listPropertiesOfCertificates().byPage()) {
    for (const certificateProperties of page) {
      console.log(certificateProperties);
    }
  }
}

async function listCertificateVersions() {
  for await (const certificateProperties of client.listPropertiesOfCertificateVersions(
    certificateName1,
  )) {
    console.log(certificateProperties.version!);
  }
}

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  client = new CertificateClient(process.env["KEYVAULT_URI"], new DefaultAzureCredential());
  certificateName1 = `list-1${new Date().getTime()}`;
  certificateName2 = `list-2${new Date().getTime()}`;
  await createCertificates();
  await updateAndListCertificateVersions();
  await listAllCertificates();
  await listCertificatesByPage();
  await listCertificateProperties();
  await listCertificateVersions();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
