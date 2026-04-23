// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a CertificateClient to create, update, and delete a certificate's operation.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");
const { retryWithBackoff } = require("./utils.js");

let client;
let certificateName;

async function getAndCancelPendingOperations() {
  // Certificates' operations will be pending for some time right after they're created.
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert",
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
  await retryWithBackoff(() => client.deleteCertificateOperation(certificateName), {
    delayMs: 1000,
    shouldRetry: (e) =>
      /conflict while deleting the pending certificate/i.test(e.message) ||
      /Pending Certificate not found/i.test(e.message),
  });
  try {
    await client.getCertificateOperation(certificateName);
  } catch (e) {
    // getCertificateOperation throws when the operation has been deleted
    console.log("Certificate operation no longer exists:", e.code);
  }
  // There will be no signs of a pending operation at this point
  const certificateWithoutOperation = await client.getCertificate(certificateName);
  console.log("Certificate without operation:", certificateWithoutOperation);
}

async function getACertificateOperation() {
  await client.beginCreateCertificate(certificateName, {
    issuerName: "Unknown",
    subject: "cn=MyCert",
  });

  const poller = await client.getCertificateOperation(certificateName);
  const pendingCertificate = poller.getResult();
  console.log("Pending certificate:", pendingCertificate);

  const certificateOperation = poller.getOperationState().certificateOperation;
  console.log(certificateOperation);
}

async function deleteACertificateOperation() {
  await client.beginCreateCertificate(certificateName, {
    issuerName: "Unknown",
    subject: "cn=MyCert",
  });
  await client.deleteCertificateOperation(certificateName);

  await (async () => {
    try {
      await client.getCertificateOperation(certificateName);
    } catch (e) {
      // getCertificateOperation throws when the operation has been deleted
      console.log(`getCertificateOperation throws after deletion: ${e.message}`);
    }
  })();
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
  certificateName = `operation-${new Date().getTime()}`;
  await getAndCancelPendingOperations();
  await getACertificateOperation();
  await deleteACertificateOperation();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
