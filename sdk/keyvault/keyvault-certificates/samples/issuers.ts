import { CertificatesClient } from "../src";
import { DefaultAzureCredential } from "@azure/identity";

// This sample creates, updates and deletes certificate issuers.

async function main(): Promise<void> {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;
  const credential = new DefaultAzureCredential();

  const client = new CertificatesClient(url, credential);

  const issuerName = "issuerName";

  // Create
  await client.setCertificateIssuer(issuerName, "Test", {
    credentials: {
      accountId: "keyvaultuser",
    },
    organizationDetails: {
      adminDetails: [{
        firstName: "John",
        lastName: "Doe",
        emailAddress: "admin@microsoft.com",
        phone: "4255555555"
      }]
    }
  });

  // We can create a certificate with that issuer's name.
  await client.createCertificate("MyCertificate", {
    issuerParameters: { name: issuerName },
    x509CertificateProperties: { subject: "cn=MyCert" }
  }); 

  // Reading the certificate will give us back the issuer name, but no other information.
  const certificate = await client.getCertificate("MyCertificate", "");

  // We can retrieve the issuer this way:
  const getResponse = await client.getCertificateIssuer(issuerName);
  console.log("Certificate issuer: ", getResponse);

  // We can also delete the issuer.
  await client.deleteCertificateIssuer(issuerName);
  let error;
  try {
    await client.getCertificateIssuer(issuerName);
    throw Error("Expecting an error but not catching one.");
  } catch (e) {
    error = e;
  }

  console.log(error.message); // Issuer not found
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
