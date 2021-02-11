// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { CertificateClient } = require("@azure/keyvault-certificates");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

// This sample creates, updates and deletes a certificate's operation.

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
  const certificateName = `cert${uniqueString}`;

  // Certificates' operations will be pending for some time right after they're created.
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert"
  });

  const pendingCertificate = createPoller.getResult();
  console.log({ pendingCertificate });

  // Reading the certificate's operation (it will be pending)
  const operationPoller = await client.getCertificateOperation(certificateName);
  let operation = operationPoller.getResult();
  console.log("Certificate operation:", operation);

  // Cancelling the certificate's operation
  await operationPoller.cancelOperation();
  operation = operationPoller.getResult();
  console.log("Cancelled certificate operation:", operation);

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
