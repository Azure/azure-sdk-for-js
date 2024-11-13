// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates, updates and deletes certificate issuers.
 */

// Load the .env file if it exists
const dotenv = require("dotenv");

const { CertificateClient } = require("@azure/keyvault-certificates");
const { DefaultAzureCredential } = require("@azure/identity");

dotenv.config();

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  const uniqueString = new Date().getTime();
  const certificateName = `issuer-${uniqueString}`;
  const issuerName = `issuer${uniqueString}`;

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

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

module.exports = { main };
