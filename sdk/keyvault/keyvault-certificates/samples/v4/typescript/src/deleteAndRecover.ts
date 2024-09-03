// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates a self-signed certificate, deletes it, and then recovers it (soft-delete is required for this sample to run).
 */

// Load the .env file if it exists
import * as dotenv from "dotenv";

import { CertificateClient } from "@azure/keyvault-certificates";
import { DefaultAzureCredential } from "@azure/identity";

dotenv.config();

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  const uniqueString = new Date().getTime();
  const certificateName = `delete-recover-${uniqueString}`;

  // Creating a self-signed certificate
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });

  const pendingCertificate = createPoller.getResult();
  console.log("Certificate: ", pendingCertificate);

  const deletePoller = await client.beginDeleteCertificate(certificateName);
  const deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Deleted certificate: ", deletedCertificate);

  const recoverPoller = await client.beginRecoverDeletedCertificate(certificateName);
  const certificateWithPolicy = await recoverPoller.pollUntilDone();
  console.log("Certificate with policy:", certificateWithPolicy);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
