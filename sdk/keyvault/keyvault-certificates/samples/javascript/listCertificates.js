// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { CertificateClient } = require("@azure/keyvault-certificates");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

// This sample list previously created certificates in a single chunk and by page,
// then changes one of them and lists all the versions of that certificate,
// then deletes them, then lists the deleted certificates.

async function main() {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  const uniqueString = new Date().getTime();
  const certificateName1 = `cert1${uniqueString}`;
  const certificateName2 = `cert2${uniqueString}`;

  // Creating two self-signed certificates. They will appear as pending initially.
  await client.beginCreateCertificate(certificateName1, {
    issuerName: "Self",
    subject: "cn=MyCert"
  });
  await client.beginCreateCertificate(certificateName2, {
    issuerName: "Self",
    subject: "cn=MyCert"
  });

  // Listing all the available certificates in a single call.
  // The certificates we just created are still pending at this point.
  let listPropertiesOfCertificates = client.listPropertiesOfCertificates({ includePending: true });
  while (true) {
    let { done, value } = await listPropertiesOfCertificates.next();
    if (done) {
      break;
    }
    console.log("Certificate from a single call: ", value);
  }

  // Listing all the available certificates by pages.
  let pageCount = 0;
  let listPropertiesOfCertificatesByPage = client
    .listPropertiesOfCertificates({ includePending: true })
    .byPage();
  while (true) {
    let { done, value } = await listPropertiesOfCertificatesByPage.next();
    if (done) {
      break;
    }
    for (const certificateProperties of value) {
      console.log(`Certificate properties from page ${pageCount}: `, certificateProperties);
    }
    pageCount++;
  }

  // Updating one of the certificates to retrieve the certificate versions afterwards
  const updatedCertificate = await client.updateCertificateProperties(certificateName1, "", {
    tags: {
      customTag: "value"
    }
  });
  console.log("Updated certificate:", updatedCertificate);

  // Listing a certificate's versions
  let listPropertiesOfCertificateVersions = client.listPropertiesOfCertificateVersions(
    certificateName1,
    {}
  );
  while (true) {
    let { done, value } = await listPropertiesOfCertificateVersions.next();
    if (done) {
      break;
    }
    const version = value.version;
    const certificate = await client.getCertificateVersion(certificateName1, version);
    console.log(`Certificate from version ${version}: `, certificate);
  }

  // Deleting both certificates
  let deletePoller = await client.beginDeleteCertificate(certificateName1);
  await deletePoller.pollUntilDone();
  deletePoller = await client.beginDeleteCertificate(certificateName2);
  await deletePoller.pollUntilDone();

  let listDeletedCertificates = client.listDeletedCertificates({ includePending: true });
  while (true) {
    let { done, value } = await listDeletedCertificates.next();
    if (done) {
      break;
    }
    console.log("Deleted certificate: ", value);
  }
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
