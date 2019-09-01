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

  const client = new CertificatesClient(url, credential);

  await client.createCertificate("MyCertificate2", {
    issuerParameters: {
      name: "Unknown",
      certificateTransparency: false
    },
    x509CertificateProperties: { subject: "cn=MyCert" }
  });

  const { csr } = await client.getCertificateOperation(certificateName);
  const base64Csr = Buffer.from(csr!).toString("base64");
  const wrappedCsr = `-----BEGIN CERTIFICATE REQUEST-----
${base64Csr}
-----END CERTIFICATE REQUEST-----`;
  fs.writeFileSync("test.csr", wrappedCsr);

  // Certificate available locally made using:
  //   openssl genrsa -out ca.key 2048
  //   openssl req -new -x509 -key ca.key -out ca.crt
  childProcess.execSync("openssl x509 -req -in test.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out test.crt");
  const base64Crt = fs.readFileSync("test.crt").toString().split("\n").slice(1, -1).join("");

  await client.mergeCertificate(certificateName, [Buffer.from(base64Crt)]);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
}); 
