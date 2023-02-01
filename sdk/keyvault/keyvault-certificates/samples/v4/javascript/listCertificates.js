// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary List certificates, lists a certificate's versions, and lists deleted certificates in various ways.
 */

// Load the .env file if it exists
const dotenv = require("dotenv");

const { CertificateClient } = require("@azure/keyvault-certificates");
const { DefaultAzureCredential } = require("@azure/identity");

dotenv.config();

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  const uniqueString = new Date().getTime();
  const certificateName1 = `list-1${uniqueString}`;
  const certificateName2 = `list-2${uniqueString}`;

  // Creating two self-signed certificates. They will appear as pending initially.
  await client.beginCreateCertificate(certificateName1, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await client.beginCreateCertificate(certificateName2, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });

  // Listing all the available certificates in a single call.
  // The certificates we just created are still pending at this point.
  for await (const certificate of client.listPropertiesOfCertificates({ includePending: true })) {
    console.log("Certificate from a single call: ", certificate);
  }

  // Listing all the available certificates by pages.
  let pageCount = 0;
  for await (const page of client.listPropertiesOfCertificates({ includePending: true }).byPage()) {
    for (const certificate of page) {
      console.log(`Certificate from page ${pageCount}: `, certificate);
    }
    pageCount++;
  }

  // Updating one of the certificates to retrieve the certificate versions afterwards
  const updatedCertificate = await client.updateCertificateProperties(certificateName1, "", {
    tags: {
      customTag: "value",
    },
  });
  console.log("Updated certificate:", updatedCertificate);

  // Listing a certificate's versions
  for await (const item of client.listPropertiesOfCertificateVersions(certificateName1, {})) {
    const version = item.version;
    const certificate = await client.getCertificateVersion(certificateName1, version);
    console.log(`Certificate from version ${version}: `, certificate);
  }

  // Deleting both certificates
  let deletePoller = await client.beginDeleteCertificate(certificateName1);
  await deletePoller.pollUntilDone();
  deletePoller = await client.beginDeleteCertificate(certificateName2);
  await deletePoller.pollUntilDone();

  for await (const certificate of client.listDeletedCertificates({ includePending: true })) {
    console.log("Deleted certificate: ", certificate);
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

module.exports = { main };
