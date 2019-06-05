## Azure Identity client library for Javascript

This library simplifies authentication against Azure Active Directory for Azure SDK libraries.
It provides a set of `TokenCredential` implementations which can be passed into SDK libraries
to authenticate API requests.

## Examples

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/identity/identity/README.png)
