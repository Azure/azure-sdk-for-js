# Azure KeyVault Secrets client library for JS

Azure KeyVault is a service that allows you to encrypt authentication
keys, storage account keys, data encryption keys, .pfx files, and
passwords by using keys that are protected by hardware security
modules (HSMs).

Azure KeyVault Secrets management allows you to securely store and
tightly control access to tokens, passwords, certificates, API keys,
and other secrets.

Use the client library for Azure KeyVault Secrets in your Node.js application to

- Get, set and delete a secret.
- Update a secret and it's attributes.
- Backup and restore a secret.
- Get, purge or recover a deleted secret.
- Get all the versions of a secret.
- Get all secrets.
- Get all deleted secrets.

**Please Note:** This is a preview version of the KeyVault Secrets library

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets) | [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-secrets) | [API Reference Documentation](https://azure.github.io/azure-sdk-for-js/keyvault-secrets) | [Product documentation](https://azure.microsoft.com/en-us/services/key-vault/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets/samples)

## Getting started

### Install the package

Install the Azure Event KeyVault Secrets client library using npm

`npm install @azure/keyvault-secrets`

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[KeyVault resource](https://docs.microsoft.com/en-us/azure/key-vault/quick-create-portal) to use this package.
If you are using this package in a Node.js application, then use Node.js 6.x or higher.

### Configure Typescript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

### Configuring your Key Vault

Use the [Azure Cloud Shell](https://shell.azure.com/bash) snippet below to create/get client secret credentials.

- Create a service principal and configure its access to Azure resources:
  ```Bash
  az ad sp create-for-rbac -n <your-application-name> --skip-assignment
  ```
  Output:
  ```json
  {
    "appId": "generated-app-ID",
    "displayName": "dummy-app-name",
    "name": "http://dummy-app-name",
    "password": "random-password",
    "tenant": "tenant-ID"
  }
  ```
- Use the above returned credentials information to set **AZURE_CLIENT_ID**(appId), **AZURE_CLIENT_SECRET**(password) and **AZURE_TENANT_ID**(tenant) environment variables. The following example shows a way to do this in Bash:

  ```Bash
    export AZURE_CLIENT_ID="generated-app-ID"
    export AZURE_CLIENT_SECRET="random-password"
    export AZURE_TENANT_ID="tenant-ID"
  ```

- Grant the above mentioned application authorization to perform secret operations on the keyvault:

  ```Bash
  az keyvault set-policy --name <your-key-vault-name> --spn $AZURE_CLIENT_ID --secret-permissions backup delete get list create
  ```

  > --secret-permissions:
  > Accepted values: backup, delete, get, list, purge, recover, restore, create

- Use the above mentioned Key Vault name to retrieve details of your Vault which also contains your Key Vault URL:
  ```Bash
  az keyvault show --name <your-key-vault-name>
  ```

### Authenticate the client

To use the key vault from TypeScript/JavaScript, you need to first authenticate with the key vault service. To authenticate, first we import the identity and SecretsClient, which will connect to the key vault.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { SecretsClient } from "@azure/keyvault-secrets";
```

Once these are imported, we can next connect to the key vault service. To do this, we'll need to copy some settings from the key vault we are connecting to into our environment variables. Once they are in our environment, we can access them with the following code:

```typescript
// DefaultAzureCredential expects the following three environment variables:
// * AZURE_TENANT_ID: The tenant ID in Azure Active Directory
// * AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
// * AZURE_CLIENT_SECRET: The client secret for the registered application
const credential = new DefaultAzureCredential();

// Build the URL to reach your key vault
const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

// Lastly, create our secrets client and connect to the service
const client = new SecretsClient(url, credential);
```

## Key concepts

### Creating secrets and secret versions

Azure Key Vault allows you to create secrets that are stored in the key vault. When a secret is first created, it is given a name and a value. This name acts as a way to reach the secret later.

Secrets in the key vault can have multiple versions of the same secret. These are called versions of that secret.

### Getting secrets from the key vault

The simplest way to read secrets back from the vault is to get a secret by name. This will retrieve the most recent version of the secret. You can optionally get a different version of the secret if you also know the version you want.

Key vaults also support listing the secrets they have, as well as listing the all the versions of the given secret.

### Updating secret attributes

Once a secret is created, it is possible to update attributes of the secret. For example, if a secret needs to be temporarily unavailable, the `enabled` attribute can be set to false for a time.

### Working with deleted secrets

Key vaults allow deleting secrets so that they are no longer available.

In key vaults with 'soft delete' enabled, secrets are not immediately removed but instead marked simply as 'deleted'. These deleted secrets can be listed, purged, and recovered.

## Examples

The following sections provide code snippets that cover some of the common tasks using Azure KeyVault Secrets.

Once you have authenticated and created an instance of an `SecretsClient` class (see "Authenticate the client" above), you can create, read, update, and delete secrets:

### Create a secret

`setSecret` creates a secret to be stored in the Azure Key Vault. If a secret with the same name already exists, then a new version of the secret is created.

```javascript
const secretName = "MySecretName";
const result = await client.setSecret(secretName, "MySecretValue");
```

### Get a secret

`getSecret` retrieves a secret previously stored in the Key Vault.

```javascript
const getResult = await client.getSecret(secretName);
console.log("getResult: ", getResult);
```

### List all versions of a secret

`listSecretVersions` will list versions of the given secret.

```javascript
for await (let version of client.listSecretVersions(secretName)) {
  console.log("version: ", version);
}
```

### List all secrets

`listSecrets` will list all secrets in the Key Vault.

```javascript
for await (let listedSecret of client.listSecrets()) {
  console.log("secret: ", listedSecret);
}
```

### Update the attributes of a secret

`updateSecretAttributes` updates the attributes of a secret.

```javascript
const result = getSecret(secretName);
await client.updateSecretAttributes(secretName, result.version, { enabled: false });
```

### Delete a secret

`deleteSecret` deletes a secret previously stored in the Key Vault. When [soft-delete](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete) is not enabled for the Key Vault, this operation permanently deletes the deletes.

```javascript
await client.deleteSecret(secretName);
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the KeyVault Secrets SDK

```bash
export DEBUG=azure*
```

- Getting debug logs from the KeyVault Secrets SDK and the protocol level library.

```bash
export DEBUG=azure*,rhea*
```

- If you are **not interested in viewing the event transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer
```

- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:keyvault-secrets:error,azure-amqp-common:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
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
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets/samples)
directory for detailed examples on how to use this library.

- [helloWorld.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/helloWorld.ts) - Create, read, update, and delete secrets
- [listOperations.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/listOperations.ts) - List secrets all at once, list by page, and list versions of a secret.
- [backupAndRestore.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/backupAndRestore.ts) - Backup a secret and restore it after it has been deleted.
- [deleteAndRecover.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/deleteAndRecover.ts) - Deletes a secret and recovers it after. **Note:** this assumes [soft-delete](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete) is enabled for the key vault.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.microsoft.com.>

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

If you'd like to contribute to this library, please read the [contributing guide](../../../CONTRIBUTING.md) to learn more about how to build and test the code.

To run our tests, first install the dependencies (with `npm install` or `rush install`),
then run the unit tests with: `npm run unit-test`.
Our unit tests that target the behavior of our library against remotely
available endpoints are executed using previously recorded HTTP request and
responses.

Our integration tests will run against the live resources, which are determined
by the environment variables you provide. To run the integration tests, you can
run `npm run integration-test`, but make sure to provide the following
environment variables:

- `AZURE_CLIENT_ID`: The Client ID of your Azure account.
- `AZURE_CLIENT_SECRET`: The secret of your Azure account.
- `AZURE_TENANT_ID`: The Tenant ID of your Azure account.
- `KEYVAULT_NAME`: The name of the KeyVault you want to run the tests against.

**WARNING:** 
Integration tests will wipe all of the existing records in the targetted KeyVault.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/keyvault/keyvault-secrets/README.png)
