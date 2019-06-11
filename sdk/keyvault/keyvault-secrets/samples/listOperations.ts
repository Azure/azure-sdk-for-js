import { SecretsClient } from "../src";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

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

  const client = new SecretsClient(url, credential);

  // Create our secrets
  await client.setSecret("BankAccountPassword", "ABC123");
  await client.setSecret("StorageAccountPassword", "XYZ789");

  // List the secrets we have
  for await (let secretAttr of client.getSecrets()) {
    const secret = await client.getSecret(secretAttr.name);
    console.log("secret: ", secret);
  }

  await client.setSecret("BankAccountPassword", "ABC567");

  // List the versions of BankAccountPassword
  for await (let secretAttr of client.getSecretVersions("BankAccountPassword")) {
    const secret = await client.getSecret(secretAttr.name);
    console.log("secret version: ", secret);
  }

  await client.deleteSecret("BankAccountPassword");
  await client.deleteSecret("StorageAccountPassword");

}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
