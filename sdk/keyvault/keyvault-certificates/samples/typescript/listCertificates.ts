import { CertificateClient } from "../../src";
import { DefaultAzureCredential } from "@azure/identity";

// This sample list previously created certificates in a single chunk and by page,
// then changes one of them and lists all the versions of that certificate,
// then deletes them, then lists the deleted certificates.

async function main(): Promise<void> {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  // Creating two self-signed certificates. They will appear as pending initially.
  await client.createCertificate("MyCertificate1", {
    issuerName: "Self",
    subjectName: "cn=MyCert"
  });
  await client.createCertificate("MyCertificate2", {
    issuerName: "Self",
    subjectName: "cn=MyCert"
  });

  // Listing all the available certificates in a single call.
  // The certificates we just created are still pending at this point.
  for await (const certificate of client.listCertificates({ includePending: true })) {
    console.log("Certificate from a single call: ", certificate);
  }

  // Listing all the available certificates by pages.
  let pageCount = 0;
  for await (const page of client.listCertificates({ includePending: true }).byPage()) {
    for (const certificate of page) {
      console.log(`Certificate from page ${pageCount}: `, certificate);
    }
    pageCount++;
  }

  // Updating one of the certificates to retrieve the certificate versions afterwards
  const updatedCertificate = await client.updateCertificate("MyCertificate1", "", {
    tags: {
      customTag: "value"
    }
  });
  console.log("Updated certificate:", updatedCertificate);

  // Listing a certificate's versions
  for await (const item of client.listCertificateVersions("MyCertificate1", {
    includePending: true
  })) {
    const version = item.properties.version!;
    const certificate = await client.getCertificateVersion("MyCertificate1", version);
    console.log(`Certificate from version ${version}: `, certificate);
  }

  // Deleting both certificates
  await client.deleteCertificate("MyCertificate1");
  await client.deleteCertificate("MyCertificate2");
  for await (const certificate of client.listDeletedCertificates({ includePending: true })) {
    console.log("Deleted certificate: ", certificate);
  }
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
