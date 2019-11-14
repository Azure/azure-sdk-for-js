# Azure Key Vault client library for JavaScript

Azure Key Vault is a Microsoft-managed service providing cloud keys, secrets, and certificate storage and utility that is highly available, secure, durable, scalable, and redundant.

This project provides client libraries in JavaScript that makes it easy to consume Microsoft Azure Key Vault service.

- [Source Code - Keys](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-keys)
- [Source Code - Secrets](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets)
- [Source Code - Certificates](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates)
- [Product documentation](https://docs.microsoft.com/en-us/azure/key-vault)
- @azure/keyvault-keys [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-keys)
- @azure/keyvault-secrets [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-secrets)
- @azure/keyvault-certificates [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-certificates)
- [API Reference documentation](https://azure.github.io/azure-sdk-for-js)
- [Azure Key Vault REST APIs](https://docs.microsoft.com/en-us/rest/api/keyvault/)

## Key concepts

### Features

- Key Vault Keys
  - Create keys using elliptic curve or RSA encryption, optionally backed by Hardware Security Modules (HSM).
  - Import keys.
  - Delete keys.
  - Update keys.
  - Get one or more keys.
  - Get one or more deleted keys.
  - Recover a deleted key.
  - Restore a backed up key.
  - Get the versions of a key.
  - As well as obtaining the attributes of a key.
  - Encrypting
  - Decrypting
  - Signing
  - Verifying
  - Wrapping keys
  - Unwrapping keys
- Key Vault Secrets
  - Get, set and delete a secret.
  - Update a secret and it's attributes.
  - Backup and restore a secret.
  - Get, purge or recover a deleted secret.
  - Get all the versions of a secret.
  - Get all secrets.
  - Get all deleted secrets.
- Key Vault Certificates
  - Get, set and delete a certificate.
  - Update a certificate, its attributes, issuer, policy, operation and contacts.
  - Backup and restore a certificate.
  - Get, purge or recover a deleted certificate.
  - Get all the versions of a certificate.
  - Get all certificates.
  - Get all deleted certificates.

### Compatibility

This library is compatible with Node.js and browsers, and validated against LTS Node.js versions (>=8.16.0) and latest versions of Chrome, Firefox and Edge.

#### Compatible with IE11

You need polyfills to make this library work with IE11. The easiest way is to use [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill), or [polyfill service](https://polyfill.io/v2/docs/).

You can also load separate polyfills for missed ES feature(s).
This library depends on following ES features which need external polyfills loaded.

- `Promise`
- `String.prototype.startsWith`
- `String.prototype.endsWith`
- `String.prototype.repeat`
- `String.prototype.includes`
- `Array.prototype.includes`
- `Object.assign`
- `Object.keys` (Override IE11's `Object.keys` with ES6 polyfill to enable [ES6 behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Notes))
- `Symbol`

## Getting Started

The preferred way to install the Azure Key Vault client libraries for JavaScript is to use the npm package manager. Take "@azure/keyvault-secrets" for example.

Simply type the following into a terminal window:

```bash
npm install @azure/keyvault-secrets
```

In your TypeScript or JavaScript file, import via following:

```JavaScript
import * as KeyVaultSecrets from "@azure/keyvault-secrets";
```

Or

```JavaScript
const KeyVaultSecrets = require("@azure/keyvault-secrets");
```

## Examples

## Code Samples

```typescript
import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";

async function main(): Promise<void> {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new SecretClient(url, credential);

  // Create a secret
  const secretName = "MySecretName";
  const result = await client.setSecret(secretName, "MySecretValue");
  console.log("result: ", result);

  // Read the secret we created
  const secret = await client.getSecret(secretName);
  console.log("secret: ", secret);

  // Update the secret with different attributes
  const updatedSecret = await client.updateSecretProperties(
    secretName,
    result.properties.version!,
    {
      enabled: false
    }
  );
  console.log("updated secret: ", updatedSecret);

  // Delete the secret
  // If we don't want to purge the secret later, we don't need to wait until this finishes
  await client.beginDeleteSecret(secretName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
```

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

More samples

- [Key Vault Keys Examples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-keys/samples)
- [Key Vault Secrets Examples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets/samples)
- [Key Vault Certificates Examples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates/samples)

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.microsoft.com.>

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fkeyvault%2FREADME.png)
