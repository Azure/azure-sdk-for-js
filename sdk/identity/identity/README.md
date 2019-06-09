## Azure Identity client library for Javascript

This library simplifies authentication against Azure Active Directory for Azure SDK libraries.
It provides a set of `TokenCredential` implementations which can be passed into SDK libraries
to authenticate API requests.

## Examples

### Examples for SDK Users

The `@azure/keyvault-keys` library supports the use of `TokenCredential` for authenticating
requests to Azure Key Vault.  Here's how you would use the `ClientSecretCredential` to authenticate
SDK calls:

```javascript
import { KeysClient } from "@azure/keyvault-keys";
import { ClientSecretCredential } from "@azure/identity";

const clientId = process.env["CLIENT_ID"] || "";
const clientSecret = process.env["CLIENT_SECRET"] || "";
const tenantId = process.env["TENANT_ID"] || "";
const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"

const url = `https://${vaultName}.vault.azure.net`;
const credential = new ClientSecretCredential(tenantId, clientId, clientSecret)
const client = new KeysClient(url, credential);
const getResult = await client.getKey("MyKeyName");
```

If you use the standard environment variable names `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, and
`AZURE_CLIENT_SECRET` for storing your AAD client credentials, the previous example can be simplified by using `EnvironmentCredential`:

```javascript
import { KeysClient } from "@azure/keyvault-keys";
import { EnvironmentCredential } from "@azure/identity";

const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
const url = `https://${vaultName}.vault.azure.net`;
const credential = new EnvironmentCredential();
const client = new KeysClient(url, credential);
const getResult = await client.getKey("MyKeyName");
```

### Examples for SDK Authors

To integrate this library into an Azure SDK library, you can follow these steps:

1. Replace the `@azure/ms-rest-js` dependency with `@azure/core-http`

2. Add an overload to your SDK client's constructor which accepts a `TokenCredential`

3. When constructing your `ServiceClient`, pass in the `TokenCredential` in the `credentials` parameter.
   If you're building your own `RequestPolicyFactory` list, you can use `@azure/core-http`'s `bearerTokenAuthenticationPolicy`
   instead of `signingPolicy` as it takes a `TokenCredential` parameter.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/identity/identity/README.png)
