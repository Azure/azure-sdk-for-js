# Azure KeyVault Keys client library for JS

Azure KeyVault is a service that allows you to encrypt authentication
keys, storage account keys, data encryption keys, .pfx files, and
passwords by using keys that are protected by hardware security
modules (HSMs).

Azure KeyVault Key management allows you to create and control
encryption keys that encrypt your data.

Use the client library for Azure KeyVault Keys in your Node.js application to

- Create keys (EC, EC-HSM, RSA, RSA-HSM).
- Import keys.
- Delete keys.
- Update keys.
- Get one or more keys.
- Get one or more deleted keys.
- Recover a deleted key.
- Restore a backed up key.
- Get the versions of a key.
- As well as obtaining the attributes of a key.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-keys) | [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-keys) | [API Reference Documentation](https://docs.microsoft.com/en-us/javascript/api/%40azure/keyvault/) | [Product documentation](https://azure.microsoft.com/en-us/services/keyvault/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-services/samples)

## Getting started

### Install the package

Install the Azure Event KeyVault Keys client library using npm

`npm install @azure/keyvault-keys`

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[KeyVault resource](https://docs.microsoft.com/en-us/azure/key-vault/quick-create-portal) to use this package.
If you are using this package in a Node.js application, then use Node.js 6.x or higher.

### Configure Typescript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

### Authenticate the client

To use the key vault from TypeScript/JavaScript, you need to first authenticate with the key vault service. To authenticate, first we import the identity and SecretsClient, which will connect to the key vault.

```typescript
import { EnvironmentCredential } from "@azure/identity";
import { KeysClient } from "@azure/keyvault-keys";
```

Once these are imported, we can next connect to the key vault service. To do this, we'll need to copy some settings from the key vault we are connecting to into our environment variables. Once they are in our environment, we can access them with the following code:

```typescript
// EnvironmentCredential expects the following three environment variables:
// * AZURE_TENANT_ID: The tenant ID in Azure Active Directory
// * AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
// * AZURE_CLIENT_SECRET: The client secret for the registered application
const credential = new EnvironmentCredential();

// Build the URL to reach your key vault
const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

// Lastly, create our keys client and connect to the service
const client = new KeysClient(url, credential);
```

## Key concepts

Azure Key Vault allows you to create and store keys in the key vault. Azure supports RSA keys and elliptic curve keys, each with corresponding support in hardware security modules (HSM).

Multiple keys, and multiple versions of the same key, can be kept in the key vault. Keys can be listed, as well as versions of the same key. Keys can have attributes (Eg, if it is enabled) updated after they are created. Keys can also be deleted, and -- in key vaults with soft delete -- these deleted keys can be recovered.

### Creating keys and key versions

Azure Key Vault allows you to create keys that are stored in the key vault. When a key is first created, it is given a name. This name acts as a way to reach the key later.

Keys in the key vault can have multiple versions of the same key. These are called versions of that key.

Keys can be created using either RSA or elliptic curve algorithms, each with corresponding support for hardware security modules (HSMs).

In addition to creating keys, existing key data can be imported into a key vault.

### Getting keys from the key vault

The simplest way to read keys back from the vault is to get a key by name. This will retrieve the most recent version of the key. You can optionally get a different version of the key if you also know the version you want.

Key vaults also support listing the keys they have, as well as listing the all the versions of the given key.

### Updating key attributes

Once a key is created, it is possible to update attributes of the key. For example, if a key needs to be temporarily unavailable, the `enabled` attribute can be set to false for a time.

### Working with deleted keys

Key vaults allow deleting keys so that they are no longer available.

In key vaults with 'soft delete' enabled, keys are not immediately removed but instead marked simply as 'deleted'. These deleted keys can be listed, purged, and recovered.

## Example

The following sections provide code snippets that cover some of the common tasks using Azure KeyVault Secrets. 

Once you have authenticated and created an instance of an `SecretsClient` class (see "Authenticate the client" above), you can create, read, update, and delete keys:

```javascript
const keyName = "MyKeyName";

// Create a key using the RSA algorithm
const result = await client.createKey(keyName, "RSA");
console.log("result: ", result);

// Get the key we just created
const getResult = await client.getKey(keyName);
console.log("getResult: ", getResult);

// List all the versions of the key in the key vault
for await (let version of client.listKeyVersions(keyName)) {
  console.log("version: ", version);
}

// We can also list all the keys in our key vault
for await (let listedKey of client.listKeys()) {
  console.log("key: ", listedKey);
}

// Delete the key we just created
await client.deleteKey(keyName);
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the KeyVault Keys SDK

```bash
export DEBUG=azure*
```

- Getting debug logs from the KeyVault Keys SDK and the protocol level library.

```bash
export DEBUG=azure*,rhea*
```

- If you are **not interested in viewing the event transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer
```

- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:keyvault-keys:error,azure-amqp-common:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
```

### Logging to a file

- Set the `DEBUG` environment variable as shown above and then run your test script as follows:
  - Logging statements from your test script go to `out.log` and logging statements from the sdk go to `debug.log`.
    ```bash
    node your-test-script.js > out.log 2>debug.log
    ```
  - Logging statements from your test script and the sdk go to the same file `out.log` by redirecting stderr to stdout (&1), and then redirect stdout to a file:
    ```bash
    node your-test-script.js >out.log 2>&1
    ```
  - Logging statements from your test script and the sdk go to the same file `out.log`.
    ```bash
      node your-test-script.js &> out.log
    ```
    
## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-keys/samples)
directory for detailed examples on how to use this library.

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/keyvault/keyvault-keys/README.png)
