// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a CertificateClient to create, update, and delete a certificate's operation.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { CertificateClient } from "@azure/keyvault-certificates";
// Load the .env file if it exists
import "dotenv/config";

let client: CertificateClient;
let certificateName: string;

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
  await client.deleteCertificateOperation(certificateName);
  let error;
  try {
      await client.getCertificateOperation(certificateName);
      throw Error("Expecting an error but not catching one.");
  }
  catch (e: any) {
      error = e;
  }
  console.log(error.message); // Pending certificate not found
  
  // There will be no signs of a pending operation at this point
  const certificateWithoutOperation = await client.getCertificate(certificateName);
  console.log("Certificate without operation:", certificateWithoutOperation);
}

async function getACertificateOperation() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  const createPoller = await client.beginCreateCertificate("MyCertificate", {
      issuerName: "Self",
      subject: "cn=MyCert",
  });

  const poller = await client.getCertificateOperation("MyCertificate");
  const pendingCertificate = poller.getResult();

  const certificateOperation = poller.getOperationState().certificateOperation;
  console.log(certificateOperation);
}

async function deleteACertificateOperation() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  await client.beginCreateCertificate("MyCertificate", {
      issuerName: "Self",
      subject: "cn=MyCert",
  });
  await client.deleteCertificateOperation("MyCertificate");

  await client.getCertificateOperation("MyCertificate");
}

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  client =
      new CertificateClient(process.env["KEYVAULT_URI"] || "<keyvault-url>", new DefaultAzureCredential());
  certificateName =
      `operation-${new Date().getTime()}`;
  await getAndCancelPendingOperations();
  await getACertificateOperation();
  await deleteACertificateOperation();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
