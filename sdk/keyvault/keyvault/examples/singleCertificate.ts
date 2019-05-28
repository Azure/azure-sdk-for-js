import { CertificatesClient, SecretsClient } from "../src";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { CertificatePolicy } from "../src/models";

async function main(): Promise<void> {
  const clientId = process.env["CLIENT_ID"] || "";
  const clientSecret = process.env["CLIENT_SECRET"] || "";
  const tenantId = process.env["TENANT_ID"] || "";
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"

  const url = `https://${vaultName}.vault.azure.net`;
  const credential = await msRestNodeAuth.loginWithServicePrincipalSecret(
    clientId,
    clientSecret,
    tenantId,
    {
      tokenAudience: 'https://vault.azure.net'
    }
  );

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
