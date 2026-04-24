// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates, updates and deletes certificate issuers.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

let client;
let certificateName;
let issuerName;

async function manageCertificateIssuers() {
  // Create
  await client.createIssuer(issuerName, "Test", {
    accountId: "keyvaultuser",
    administratorContacts: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "admin@microsoft2.com",
        phone: "4255555555",
      },
    ],
  });
  // We can create a certificate with that issuer's name.
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName,
    subject: "cn=MyCert",
  });
  const pendingCertificate = createPoller.getResult();
  console.log("Certificate: ", pendingCertificate);
  // We can retrieve the issuer this way:
  const getResponse = await client.getIssuer(issuerName);
  console.log("Certificate issuer: ", getResponse);
  // We can also list properties for all issuers:
  for await (const issuerProperties of client.listPropertiesOfIssuers()) {
    console.log("Certificate properties: ", issuerProperties);
  }
  // We can also delete the issuer.
  await client.deleteIssuer(issuerName);
}

async function listCertificateIssuers() {
  await client.createIssuer(issuerName, "Test");

  // All in one call
  for await (const issuerProperties of client.listPropertiesOfIssuers()) {
    console.log(issuerProperties);
  }

  // By pages
  for await (const page of client.listPropertiesOfIssuers().byPage()) {
    for (const issuerProperties of page) {
      console.log(issuerProperties);
    }
  }
}

async function createACertificateIssuer() {
  await client.createIssuer(issuerName, "Test");
}

async function updateACertificateIssuer() {
  await client.createIssuer(issuerName, "Test");
  await client.updateIssuer(issuerName, {
    accountId: "updated-keyvaultuser",
  });
}

async function getACertificateIssuer() {
  const certificateIssuer = await client.getIssuer(issuerName);
  console.log(certificateIssuer);
}

async function deleteACertificateIssuer() {
  await client.deleteIssuer(issuerName);
}

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  client = new CertificateClient(process.env["KEYVAULT_URI"], new DefaultAzureCredential());
  certificateName = `issuer-${new Date().getTime()}`;
  issuerName = `issuer${new Date().getTime()}`;
  await manageCertificateIssuers();
  await listCertificateIssuers();
  await createACertificateIssuer();
  await updateACertificateIssuer();
  await getACertificateIssuer();
  await deleteACertificateIssuer();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
