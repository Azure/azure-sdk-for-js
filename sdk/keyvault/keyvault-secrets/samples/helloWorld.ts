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
