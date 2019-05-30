## Azure KeyVault secrets client SDK for JavaScript and TypeScript

This package contains an isomorphic SDK for KeyVault's secrets.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets) | [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-secrets) | [API Reference Documentation](https://docs.microsoft.com/en-us/javascript/api/%40azure/keyvault/) | [Product documentation](https://azure.microsoft.com/en-us/services/keyvault/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-services/samples)

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```
npm install @azure/keyvault-secrets
```

### How to use

### How to use

#### nodejs - Authentication, client creation and setSecret as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```ts
import { SecretsClient } from "@azure/keyvault-secrets";
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
```
 
## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/keyvault/keyvault/README.png)
