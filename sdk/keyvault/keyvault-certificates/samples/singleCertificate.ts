import { CertificatesClient, SecretsClient } from "../src";
import { CertificatePolicy } from "../src/models";
import { DefaultAzureCredential } from "@azure/identity";

async function main(): Promise<void> {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
  const url = `https://${vaultName}.vault.azure.net`;
  const credential = new DefaultAzureCredential();

  const cc = new CertificatesClient(url, credential);
  const sc = new SecretsClient(url, credential);

  /*
    let result = await cc.createCertificate("Unique123124", {
      certificatePolicy: {
        issuerParameters: { name: "Self" },
        keyProperties: {
          exportable: true,
          keySize: 2048,
          keyType: "RSA",
          reuseKey: true
        },
        lifetimeActions: [
          {
            action: {
              actionType: "EmailContacts"
            },
            trigger: {
              daysBeforeExpiry: 90
            }
          }
        ],
        secretProperties: {
          contentType: "application/x-pkcs12"
        },
        x509CertificateProperties: {
          keyUsage: [
            "cRLSign",
            "dataEncipherment",
            "digitalSignature",
            "keyEncipherment",
            "keyAgreement",
            "keyCertSign"],
          subject: "CN=MyTestPolicy",
          validityInMonths: 12
        }
      }
    });

    console.log(result);
  */
  //let result = await cc.createCertificate("MyCert", { certificatePolicy: { issuerParameters: { name: "Self" }, x509CertificateProperties: { subject: "cn=MyCert" } } })
  let result = await cc.createCertificate("MyCert2", { issuerName: "Self", x509Subject: "cn=MyCert2", })
  let result = await cc.createCertificate("MyCert2", { certificatePolicy: { issuerName: "Self", subjectName: "cn=MyCert2" } });
  //console.log(result);

  /*
  let result = await cc.getAllCertificates();

  for await (let x of result) {
    console.log(x);
  }
  */


  let result = await cc.getCertificate("Unique123124", "");
  let lifetimeActions = result.policy.lifetimeActions[0];
  console.log(lifetimeActions.action);
  console.log(lifetimeActions.trigger);

  // let result = await sc.getSecret("Unique123123");
  // console.log(result);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
