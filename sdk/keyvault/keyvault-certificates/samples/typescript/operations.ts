import { CertificateClient } from "../../src";
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

  const client = new CertificateClient(url, credential);
  const certificateName = "MyCertificate";

  let getResponse: any;

  // Certficates' operations will be pending for some time right after they're created.
  await client.createCertificate(certificateName, {
    issuerName: "Self",
    subjectName: "cn=MyCert"
  });

  // The pending state of the certificate will be visible.
  const pendingCertificate = await client.getCertificate(certificateName);
  console.log({ pendingCertificate });

  // Reading the certificate's operation (it will be pending)
  getResponse = await client.getCertificateOperation(certificateName);
  console.log("Certificate operation:", getResponse);

  // Cancelling the certificate's operation
  await client.cancelCertificateOperation(certificateName);
  getResponse = await client.getCertificateOperation(certificateName);
  console.log("Cancelled certificate operation:", getResponse);

  // Deleting the certificate's operation
  await client.deleteCertificateOperation(certificateName);

  let error;
  try {
    await client.getCertificateOperation(certificateName);
    throw Error("Expecting an error but not catching one.");
  } catch (e) {
    error = e;
  }
  console.log(error.message); // Pending certificate not found

  // There will be no signs of a pending operation at this point
  const certificateWithoutOperation = await client.getCertificate(certificateName);
  console.log("Certificate without operation:", certificateWithoutOperation);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
