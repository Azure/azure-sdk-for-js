// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CertificateClient, WellKnownIssuer } from "@azure/keyvault-certificates";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// This sample demonstrates how to import both PKCS#12 (PFX) and PEM-formatted certificates
// into Azure Key Vault.
export async function main(): Promise<void> {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  // When importing a PFX containing your key pair, the policy is needed if you want the
  // private key to be exportable or to configure actions when a certificate is close to expiration.
  let importedCertificate = await client.importCertificate(
    `cert${Date.now()}`,
    Buffer.from(samplePfxBase64, "base64"),
    {
      policy: {
        contentType: "application/x-pkcs12",
        issuerName: WellKnownIssuer.Self,
        subject: "CN=contoso.com"
      }
    }
  );

  console.log("importedCertificate", importedCertificate);

  let deletePoller = await client.beginDeleteCertificate(importedCertificate.name);
  let deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Recovery Id: ", deletedCertificate.recoveryId);
  console.log("Deleted Date: ", deletedCertificate.deletedOn);
  console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);

  // PEM-formatted certificates are more common when using tools like openssl. To import a
  // PEM-formatted certificate, you must set a CertificatePolicy that sets the ContentType
  // to Pem or the certificate will fail to import
  importedCertificate = await client.importCertificate(
    `cert${Date.now()}`,
    Buffer.from(samplePem),
    {
      policy: {
        contentType: "application/x-pem-file",
        issuerName: WellKnownIssuer.Self,
        subject: "CN=contoso.com"
      }
    }
  );

  console.log("importedCertificate", importedCertificate);

  deletePoller = await client.beginDeleteCertificate(importedCertificate.name);
  deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Recovery Id: ", deletedCertificate.recoveryId);
  console.log("Deleted Date: ", deletedCertificate.deletedOn);
  console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
