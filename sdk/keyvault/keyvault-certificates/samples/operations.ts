import { CertificatesClient } from "../src";
import { DefaultAzureCredential } from "@azure/identity";

// This sample creates, updates and deletes a certificate's operation.

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
  const certificateName = "MyCertificate";

  let getResponse: any;

  // Read
  getResponse = await client.getCertificateOperation(certificateName);
  console.log("Certificate operation:", getResponse);

  // Cancel
  await client.cancelCertificateOperation(certificateName);
  getResponse = await client.getCertificateOperation(certificateName);
  console.log("Cancelled certificate operation:", getResponse);

  // Delete
  await client.deleteCertificateOperation(certificateName);

  let error;
  try {
    await client.getCertificateOperation(certificateName);
    throw Error("Expecting an error but not catching one.");
  } catch (e) {
    error = e;
  }
  console.log(error.message); // Pending certificate not found
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
