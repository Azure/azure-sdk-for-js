// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Imports a PFX and PEM certificate and then deletes them.
 */

// Load the .env file if it exists
import "dotenv/config";
import { isNodeLike } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";
import { CertificateClient, WellKnownIssuer } from "@azure/keyvault-certificates";
import { SecretClient } from "@azure/keyvault-secrets";

let client: CertificateClient;

async function importAPkcs12Certificate() {
  // Demonstrates how to import a base64 encoded PFX certificate into Azure Key Vault.
  // When importing a PFX containing your key pair, the policy is needed if you want the
  // private key to be exportable or to configure actions when a certificate is close to expiration.
  const importedCertificate = await client.importCertificate(`import-${Date.now()}`, Buffer.from(process.env.SAMPLE_PFX_BASE_64 || "", "base64"), {
      policy: {
          contentType: "application/x-pkcs12",
          issuerName: WellKnownIssuer.Self,
          subject: "CN=contoso.com",
      },
  });
  console.log("importedCertificate", importedCertificate);
  const deletePoller = await client.beginDeleteCertificate(importedCertificate.name);
  const deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Recovery Id: ", deletedCertificate.recoveryId);
  console.log("Deleted Date: ", deletedCertificate.deletedOn);
  console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);
}

async function importAPemCertificate() {
  // PEM-formatted certificates are more common when using tools like openssl. To import a
  // PEM-formatted certificate, you must set a CertificatePolicy that sets the ContentType
  // to Pem or the certificate will fail to import
  const importedCertificate = await client.importCertificate(`cert${Date.now()}`, Buffer.from(process.env.SAMPLE_PEM || ""), // PEM certificates are not base64 encoded, so we don't need to decode them
  {
      policy: {
          contentType: "application/x-pem-file",
          issuerName: WellKnownIssuer.Self,
          subject: "CN=contoso.com",
      },
  });
  console.log("importedCertificate", importedCertificate);
  const deletePoller = await client.beginDeleteCertificate(importedCertificate.name);
  const deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Recovery Id: ", deletedCertificate.recoveryId);
  console.log("Deleted Date: ", deletedCertificate.deletedOn);
  console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);
}

async function importACertificate() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);
  const secretClient = new SecretClient(url, credential);

  const certificateSecret = await secretClient.getSecret("MyCertificate");
  const base64EncodedCertificate = certificateSecret.value!;

  const buffer = isNodeLike
      ? Buffer.from(base64EncodedCertificate, "base64")
      : Uint8Array.from(atob(base64EncodedCertificate), (c) => c.charCodeAt(0));
  await client.importCertificate("MyCertificate", buffer);

}

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  client =
      new CertificateClient(process.env["KEYVAULT_URI"] || "<keyvault-url>", new DefaultAzureCredential());
  await importAPkcs12Certificate();
  await importAPemCertificate();
  await importACertificate();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
