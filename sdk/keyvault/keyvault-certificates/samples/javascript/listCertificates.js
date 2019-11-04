const { CertificatesClient } = require("../../src");
const { DefaultAzureCredential } = require("@azure/identity");

// This sample list previously created certificates in a single chunk and by page,
// then changes one of them and lists all the versions of that certificate,
// then deletes them, then lists the deleted certificates.

async function main() {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;
  const credential = new DefaultAzureCredential();

  const client = new CertificatesClient(url, credential);

  const certificateName1 = "MyCertificate109088";
  const certificateName2 = "MyCertificate209088";

  // Creating two self-signed certificates. They will appear as pending initially.
  await client.createCertificate(certificateName1, {
    issuerName: "Self",
    subjectName: "cn=MyCert"
  });
  await client.createCertificate(certificateName2, {
    issuerName: "Self",
    subjectName: "cn=MyCert"
  });

  // Listing all the available certificates in a single call.
  // The certificates we just created are still pending at this point.
  let listCertificates = client.listCertificates({ includePending: true });
  while (true) {
    let { done, value } = await listCertificates.next();
    if (done) {
      break;
    }
    console.log("Certificate from a single call: ", value);
  }

  // Listing all the available certificates by pages.
  let pageCount = 0;
  let listCertificatesByPage = client.listCertificates({ includePending: true }).byPage();
  while (true) {
    let { done, value } = await listCertificatesByPage.next();
    if (done) {
      break;
    }
    for (const certificate of value) {
      console.log(`Certificate from page ${pageCount}: `, certificate);
    }
    pageCount++;
  }

  // Updating one of the certificates to retrieve the certificate versions afterwards
  const updatedCertificate = await client.updateCertificate(certificateName1, "", {
    tags: {
      customTag: "value"
    }
  });
  console.log("Updated certificate:", updatedCertificate);

  // Listing a certificate's versions
  let listCertificateVersions = client.listCertificateVersions(certificateName1, {
    includePending: true
  });
  while (true) {
    let { done, value } = await listCertificateVersions.next();
    if (done) {
      break;
    }
    const version = value.properties.version;
    const certificate = await client.getCertificateVersion(certificateName1, version);
    console.log(`Certificate from version ${version}: `, certificate);
  }

  // Deleting both certificates
  await client.deleteCertificate(certificateName1);
  await client.deleteCertificate(certificateName2);

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
