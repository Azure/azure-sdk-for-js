// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to create, get, update, check and delete an External Key Manager (EKM) connection for Managed HSM.
 */

const { KeyVaultEkmClient } = require("@azure/keyvault-admin");
const { DefaultAzureCredential } = require("@azure/identity");
const { readFileSync } = require("node:fs");
// Load the .env file if it exists
require("dotenv/config");

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  const credential = new DefaultAzureCredential();
  const url = process.env["AZURE_MANAGEDHSM_URI"];
  if (!url) {
    throw new Error("Missing environment variable AZURE_MANAGEDHSM_URI.");
  }
  const client = new KeyVaultEkmClient(url, credential);

  // The EKM proxy FQDN (Fully Qualified Domain Name) that Managed HSM connects to.
  const host = process.env["EKM_PROXY_HOST"];
  if (!host) {
    throw new Error("Missing environment variable EKM_PROXY_HOST.");
  }

  // The root CA certificate that issued the EKM proxy server's certificate, in DER format.
  const serverCaCertificatePath = process.env["EKM_SERVER_CA_CERTIFICATE_PATH"];
  if (!serverCaCertificatePath) {
    throw new Error("Missing environment variable EKM_SERVER_CA_CERTIFICATE_PATH.");
  }
  const serverCaCertificate = new Uint8Array(readFileSync(serverCaCertificatePath));

  // Create a new EKM connection.
  const ekmConnection = {
    host,
    serverCaCertificates: [serverCaCertificate],
    serverSubjectCommonName: host.split(":")[0],
  };
  await client.createEkmConnection(ekmConnection);

  // Retrieve the current EKM connection.
  const current = await client.getEkmConnection();
  console.log("EKM connection host: ", current.host);

  // Update the EKM connection, for example after rotating the proxy server certificate.
  current.serverCaCertificates = [serverCaCertificate];
  await client.updateEkmConnection(current);

  // Check the connectivity and authentication with the EKM proxy.
  const proxyInfo = await client.checkEkmConnection();
  console.log("EKM proxy vendor: ", proxyInfo.proxyVendor);
  console.log("EKM proxy API version: ", proxyInfo.apiVersion);

  // Retrieve the client certificate Managed HSM uses to authenticate to the EKM proxy.
  const certificateInfo = await client.getEkmCertificate();
  console.log("EKM client certificate subject: ", certificateInfo.subjectCommonName);

  // Delete the EKM connection.
  await client.deleteEkmConnection();
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});

module.exports = { main };
