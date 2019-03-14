import { SecretsClient } from "../lib/secretsClient";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

async function main(): Promise<void> {
  const clientId = process.env["CLIENT_ID"] || "";
  const clientSecret = process.env["CLIENT_SECRET"] || "";
  const tenantId = process.env["TENANT_ID"] || "";

  // Authenticate with Azure AD interactively
  const url = "https://<keyvault-name>.vault.azure.net";
  const authResponse = await msRestNodeAuth.interactiveLoginWithAuthResponse({
    tokenAudience: 'https://vault.azure.net'
  });
  const client = new SecretsClient(url, authResponse.credentials,
    {
      telemetry: { value: "My Customized user agent string"},
      retryOptions: { maxTries: 5 }
    });

  // Or authenticate with Azure AD using MSI to get TokenCredential.
  // const credential = await msRestNodeAuth.loginWithServicePrincipalSecret(
  //   clientId,
  //   clientSecret, 
  //   tenantId,
  //   {
  //     tokenAudience: 'https://vault.azure.net'
  //   }
  // );
  // const client = new SecretsClient(url, c.credentials);

  const secret = await client.getSecret("Hello", "3597ab0798b043d398cde46f309010ea");
  console.log("secret: ", secret);

  const result = await client.setSecret("name", "secret");
  console.log("result: ", result);

  const versions = await client.getSecretVersions("name");
  console.log("versions: ", versions);
}

main().catch((err) => {
console.log("error: ", err);
});
