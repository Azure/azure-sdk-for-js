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

  for await (let secretAttr of client.getAllSecrets()) {
    const secret = await client.getSecret(secretAttr.name);
    console.log("secret: ", secret);
  }

  console.log("result: ", result);

  await client.updateSecretAttributes("MySecretName", result.version, { enabled: true });

  await client.setSecret("MySecretName", "My new SecretValue");
  for await (let version of client.getSecretVersions(secretName)) {
    const secret = await client.getSecret(secretName, { version: version.version });
    console.log("secret: ", secret);
  }

  await client.deleteSecret(secretName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
