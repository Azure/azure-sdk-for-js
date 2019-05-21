## Azure KeyVaultClient SDK for JavaScript

This package contains an isomorphic SDK for KeyVaultClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/keyvault
```

### How to use

#### nodejs - Authentication, client creation

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

1. Use `AzureCliCredentials` exported from `@azure/ms-rest-nodeauth`.
   **Please make sure to install Azure CLI and login using `az login`.**

```typescript
import { AzureCliCredentials } from "@azure/ms-rest-nodeauth";
import { KeyVaultClient } from "@azure/keyvault";

async function main(): Promise<void> {
  try {
    const creds = await AzureCliCredentials.create({
      resource: "https://batch.core.windows.net/"
    });
    const client = new KeyVaultClient(creds);
  } catch (err) {
    console.log(err);
  }
}
```

2. Use the `ApplicationTokenCredentials` exported from `@azure/ms-rest-nodeauth`.

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { KeyVaultClient } from "@azure/keyvault";

async function main(): Promise<void> {
  try {
    const creds = await msRestNodeAuth.loginWithServicePrincipalSecret(
      "clientId",
      "secret",
      "tenantId"
    );
    const client = new KeyVaultClient(creds);
  } catch (err) {
    console.log(err);
  }
}
```

3. Use the `MSIVmTokenCredentials` exported from `@azure/ms-rest-nodeauth`.

```typescript
import { MSIVmTokenCredentials } from "@azure/ms-rest-nodeauth";
import { KeyVaultClient } from "@azure/keyvault";

async function main(): Promise<void> {
  try {
    const creds = await msRestNodeAuth.loginWithVmMSI({
      resource: "https://vault.azure.net"
    });
    const client = new KeyVaultClient(creds);
  } catch (err) {
    console.log(err);
  }
}
```

##### Sample code for getting the key as an example written in TypeScript.

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { KeyVaultClient, KeyVaultModels } from "@azure/keyvault";

async function main(): Promise<void> {
  try {
    const creds = await msRestNodeAuth.interactiveLogin();
    // OR const creds = await msRestNodeAuth.AzureCliCredentials.create({resource: "https://vault.azure.net"});
    // OR const creds = await msRestNodeAuth.loginWithServicePrincipalSecret("clientId", "secret", "domain");
    // OR any other login method from msRestNodeAuth.
    const client = new KeyVaultClient(creds);
    const vaultBaseUrl = "http://testaccount.vault.azure.net";
    const keyName = "testkeyName";
    const keyVersion = "testkeyVersion";
    const result = await client.getKey(vaultBaseUrl, keyName, keyVersion);
    console.log("The result is:");
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/keyvault/keyvault/README.png)
