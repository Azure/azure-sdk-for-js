import { CertificatesClient } from "../src";
import { DefaultAzureCredential } from "@azure/identity";

// This sample creates a self-signed certificate, then deletes it, then recovers it.

export function delay<T>(t: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

async function main(): Promise<void> {
	// If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
  const url = `https://${vaultName}.vault.azure.net`;
  const credential = new DefaultAzureCredential();

  const client = new CertificatesClient(url, credential);

  // Creating a self-signed certificate
  const certificate = await.createCertificate("MyCertificate", {
    issuerParameters: { name: "Self" },
    x509CertificateProperties: { subject: "cn=MyCert" } 
  });

  console.log("Certificate: ", certificate);

  await client.deleteCertificate("MyCertificate");

  // It might take less time, or more, depending on your location, internet speed and other factors.
  await delay(10000);

  const deletedCertificate = await client.getDeletedCertificate("MyCertificate");
  console.log("Deleted certificate: ", deletedCertificate);

  await client.recoverDeletedCertificate("MyCertificate");

  // It might take less time, or more, depending on your location, internet speed and other factors.
  await delay(10000);
 
  const certificateWithPolicy = await client.getCertificateWithPolicy(certificateName);
  console.log("Certificate with policy:", certificateWithPolicy);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
