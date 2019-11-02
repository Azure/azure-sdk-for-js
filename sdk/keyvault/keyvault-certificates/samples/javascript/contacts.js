const { CertificatesClient } = require("../../src");
const { DefaultAzureCredential } = require("@azure/identity");

// This sample creates, updates and deletes certificate contacts.

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

  // Contacts are created independently of the certificates.

  const contacts = [
    {
      emailAddress: "a@a.com",
      name: "a",
      phone: "111111111111"
    },
    {
      emailAddress: "b@b.com",
      name: "b",
      phone: "222222222222"
    }
  ];

  let getResponse;

  await client.setCertificateContacts(contacts);

  getResponse = await client.getCertificateContacts();
  console.log("Contact List:", getResponse.contactList);

  await client.deleteContacts();
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
