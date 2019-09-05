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

  // Contacts are created independently of the certificates.

  const contacts = [{
    emailAddress: "a@a.com",
    name: "a",
    phone: "111111111111"
  }, {
    emailAddress: "b@b.com",
    name: "b",
    phone: "222222222222" 
  }];

  let getResponse: any;

  await client.setCertificateContacts(contacts);

  getResponse = await client.getCertificateContacts();
  assert.equal(getResponse.contactList![0].name, "a")
  assert.equal(getResponse.contactList![1].name, "b")

  await client.deleteCertificateContacts();

  let error;
  try {
    await client.getCertificateContacts();
    throw Error("Expecting an error but not catching one.");
  } catch (e) {
    error = e;
  }

  console.log(error.message); // Contacts not found
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
}); 
