import { SecretsClient } from "../src";
import { EnvironmentCredential } from "@azure/identity";

async function main(): Promise<void> {
  // EnvironmentCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
  const url = `https://${vaultName}.vault.azure.net`;
  const credential = new EnvironmentCredential();
  const client = new SecretsClient(url, credential);

  const secretName = "MySecretName";
  const result = await client.setSecret("MySecretName", "MySecretValue");
  console.log("result: ", result);

  const secret = await client.getSecret(secretName);
  console.log("secret: ", secret);

  const updatedSecret = await client.updateSecretAttributes("MySecretName", result.version, { enabled: false });
  console.log("updated secret: ", updatedSecret);

  await client.deleteSecret(secretName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
