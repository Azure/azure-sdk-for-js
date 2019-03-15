import { SecretsClient } from "../lib/secretsClient";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

async function main(): Promise<void> {
  const clientId = process.env["CLIENT_ID"] || "";
  const clientSecret = process.env["CLIENT_SECRET"] || "";
  const tenantId = process.env["TENANT_ID"] || "";

  
  const url = "https://your-keyvault.vault.azure.net";
  const credential = await msRestNodeAuth.loginWithServicePrincipalSecret(
    clientId,
    clientSecret, 
    tenantId,
    {
      tokenAudience: 'https://vault.azure.net'
    }
  );
  
  const client = new SecretsClient(url, credential);

  const result = await client.setSecret("MySecretName", "MySecretValue");
  console.log("result: ", result);

  const secret = await client.getSecret("Hello123", "3597ab0798b043d398cde46f309010ea");
  console.log("secret: ", secret);

}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
