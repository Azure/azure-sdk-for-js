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
  const bankAccountSecretName = "BankAccountPassword15";
  const storageAccountSecretName = "StorageAccountPassword15";

  // Create our secrets
  await client.setSecret(bankAccountSecretName, "ABC123");
  await client.setSecret(storageAccountSecretName, "XYZ789");

  // List the secrets we have, by page
  console.log("Listing secrets by page");
  for await (let page of client.listSecrets().byPage({ maxPageSize: 2 })) {
    for (const secretAttr of page) {
      const secret = await client.getSecret(secretAttr.name);
      console.log("secret: ", secret);
    }
    console.log("--page--");
  }

  // List the secrets we have, all at once
  console.log("Listing secrets all at once");
  for await (let secretAttr of client.listSecrets()) {
    const secret = await client.getSecret(secretAttr.name);
    console.log("secret: ", secret);
  }

  await client.setSecret(bankAccountSecretName, "ABC567");

  // List the versions of BankAccountPassword
  for await (let secretAttr of client.listSecretVersions(bankAccountSecretName)) {
    const secret = await client.getSecret(secretAttr.name);
    console.log("secret version: ", secret);
  }

  await client.deleteSecret(bankAccountSecretName);
  await client.deleteSecret(storageAccountSecretName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
