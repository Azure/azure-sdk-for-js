// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Creates a certificate with an unknown issuer and signs it using a fake certificate authority and the mergeCertificate API.
 */

const fs = require("fs");
const childProcess = require("child_process");

const { CertificateClient } = require("@azure/keyvault-certificates");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

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

  // Creating a certificate with an Unknown issuer.
  await client.beginCreateCertificate(certificateName, {
    issuerName: "Unknown",
    certificateTransparency: false,
    subject: "cn=MyCert"
  });

  // Retrieving the certificate's signing request
  const operationPoller = await client.getCertificateOperation(certificateName);
  const { csr } = operationPoller.getOperationState().certificateOperation;
  const base64Csr = Buffer.from(csr).toString("base64");
  const wrappedCsr = `-----BEGIN CERTIFICATE REQUEST-----
${base64Csr}
-----END CERTIFICATE REQUEST-----`;
  fs.writeFileSync("test.csr", wrappedCsr);

  // Now, signing the retrieved certificate request with a fake certificate authority.
  // A certificate authority is composed of two pieces, a certificate and a private key.
  //
  // We made these using openssl, as follows:
  //
  //   openssl genrsa -out ca.key 2048
  //   openssl req -new -x509 -key ca.key -out ca.crt
  //
  // For more information on how to set up a local certificate authority
  // go to: https://gist.github.com/Soarez/9688998
  childProcess.execSync(
    "openssl x509 -req -in test.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out test.crt"
  );
  const base64Crt = fs
    .readFileSync("test.crt")
    .toString()
    .split("\n")
    .slice(1, -1)
    .join("");

  // Once we have the response in base64 format, we send it to mergeCertificate
  await client.mergeCertificate(certificateName, [Buffer.from(base64Crt)]);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
