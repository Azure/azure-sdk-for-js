// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates a certificate with an unknown issuer and signs it using a fake certificate authority and the mergeCertificate API.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Creates a certificate with an unknown issuer and signs it using a fake certificate authority and the mergeCertificate API.
 */
const childProcess = require("child_process");
// Load the .env file if it exists
require("dotenv/config");
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const { readFileSync, writeFileSync } = require("node:fs");

let client;
let certificateName;

async function mergeACertificate() {
  // Creating a certificate with an Unknown issuer.
  await client.beginCreateCertificate(certificateName, {
    issuerName: "Unknown",
    certificateTransparency: false,
    subject: "cn=MyCert",
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
    "openssl x509 -req -in test.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out test.crt",
  );
  const base64Crt = fs.readFileSync("test.crt").toString().split("\n").slice(1, -1).join("");
  // Once we have the response in base64 format, we send it to mergeCertificate
  await client.mergeCertificate(certificateName, [Buffer.from(base64Crt)]);
}

async function mergeACertificate2() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  await client.beginCreateCertificate("MyCertificate", {
    issuerName: "Unknown",
    subject: "cn=MyCert",
  });
  const poller = await client.getCertificateOperation("MyCertificate");
  const { csr } = poller.getOperationState().certificateOperation;
  const base64Csr = Buffer.from(csr).toString("base64");
  const wrappedCsr = [
    "-----BEGIN CERTIFICATE REQUEST-----",
    base64Csr,
    "-----END CERTIFICATE REQUEST-----",
  ].join("\n");

  writeFileSync("test.csr", wrappedCsr);

  // Certificate available locally made using:
  //   openssl genrsa -out ca.key 2048
  //   openssl req -new -x509 -key ca.key -out ca.crt
  // You can read more about how to create a fake certificate authority here: https://gist.github.com/Soarez/9688998

  execSync("openssl x509 -req -in test.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out test.crt");
  const base64Crt = readFileSync("test.crt").toString().split("\n").slice(1, -1).join("");

  await client.mergeCertificate("MyCertificate", [Buffer.from(base64Crt)]);
}

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  client = new CertificateClient(
    process.env["KEYVAULT_URI"] || "<keyvault-url>",
    new DefaultAzureCredential(),
  );
  certificateName = `merge-${new Date().getTime()}`;
  await mergeACertificate();
  await mergeACertificate2();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
