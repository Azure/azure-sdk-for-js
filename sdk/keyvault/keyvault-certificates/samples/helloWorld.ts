import { CertificatesClient } from "../src";
import { EnvironmentCredential } from "@azure/identity";

export function delay<T>(t: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

async function main(): Promise<void> {
  // EnvironmentCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
  const url = `https://${vaultName}.vault.azure.net`;
  const credential = new EnvironmentCredential();

  const cc = new CertificatesClient(url, credential);

  let result = await cc.createCertificate("MyCertificate2", { certificatePolicy: { issuerParameters: { name: "Self" }, x509CertificateProperties: { subject: "cn=MyCert" } }});
  console.log("result: ", result);

  // await delay(150000);

  let result2 = await cc.getCertificate("MyCertificate2", "");
  console.log("result: ", result2);

  for await (let cert of cc.listCertificates()) {
    console.log("cert: ", cert);
    for await (let version of cc.listCertificateVersions(cert.name)) {
      console.log("version: ", version);

      let backedUp = await cc.backupCertificate(cert.name);
      console.log("backedup: ", backedUp);

      let policy = await cc.getCertificatePolicy(cert.name);
      console.log("policy: ", policy);

      let operation = await cc.getCertificateOperation(cert.name);
      console.log("operation: ", operation);
    }
  }

  for await (let issuer of cc.listCertificateIssuers()) {
    console.log("issuer: ", issuer);
  }

  // let contacts = await cc.getCertificateContacts();
  // console.log("contact: ", contacts);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
