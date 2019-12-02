const { CertificateClient } = require("../../dist");
const { DefaultAzureCredential } = require("@azure/identity");

// This sample creates, updates and deletes certificate issuers.

async function main() {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  const certificateName = "MyCertificate6892342";
  const issuerName = "issuerName";

  // Create
  await client.createIssuer(issuerName, "Test", {
    accountId: "keyvaultuser",
    administratorContacts: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "admin@microsoft.com",
        phone: "4255555555"
      }
    ]
  });

  // We can create a certificate with that issuer's name.
  await client.createCertificate(certificateName, {
    issuerName,
    subject: "cn=MyCert"
  });

  // Reading the certificate will give us back the issuer name, but no other information.
  const createPoller = await client.beginCreateCertificate("MyCertificate", {
    issuerName,
    subject: "cn=MyCert"
  });
  const pendingCertificate = createPoller.getResult();
  console.log("Certificate: ", pendingCertificate);

  // We can retrieve the issuer this way:
  const getResponse = await client.getIssuer(issuerName);
  console.log("Certificate issuer: ", getResponse);

  // We can also delete the issuer.
  await client.deleteIssuer(issuerName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
