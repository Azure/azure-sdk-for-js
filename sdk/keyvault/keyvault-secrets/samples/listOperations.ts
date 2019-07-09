import { SecretsClient } from "../src";
import { EnvironmentCredential } from "@azure/identity";

async function main(): Promise<void> {
  // EnvironmentCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new EnvironmentCredential();

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
  const url = `https://${vaultName}.vault.azure.net`;
  const client = new SecretsClient(url, credential);

  const bankAccountSecretName = "BankAccountPassword15";
  const storageAccountSecretName = "StorageAccountPassword15";

  // Create our secrets
  await client.setSecret(bankAccountSecretName, "ABC123");
  await client.setSecret(storageAccountSecretName, "XYZ789");

  // List the secrets we have, by page
  console.log("Listing secrets by page");
  for await (const page of client.listSecrets().byPage({ maxPageSize: 2 })) {
    for (const secretAttr of page) {
      const secret = await client.getSecret(secretAttr.name);
      console.log("secret: ", secret);
    }
    console.log("--page--");
  }

  // List the secrets we have, all at once
  console.log("Listing secrets all at once");
  for await (const secretAttr of client.listSecrets()) {
    const secret = await client.getSecret(secretAttr.name);
    console.log("secret: ", secret);
  }

  await client.setSecret(bankAccountSecretName, "ABC567");

  // List the versions of BankAccountPassword
  for await (const secretAttr of client.listSecretVersions(bankAccountSecretName)) {
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
