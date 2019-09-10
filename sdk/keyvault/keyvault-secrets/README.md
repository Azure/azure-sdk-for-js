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

Install the Azure KeyVault Secrets client library using npm

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

To use the Key Vault from TypeScript/JavaScript, you need to first authenticate with the Key Vault service. To authenticate, first we import the identity and SecretsClient, which will connect to the key vault.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { SecretsClient } from "@azure/keyvault-secrets";
```

Once these are imported, we can next connect to the Key Vault service. To do this, we'll need to copy some settings from the Key Vault we are connecting to into our environment variables. Once they are in our environment, we can access them with the following code:

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

### Key Vault

The Key Vault is the name given to the Azure product that specializes in the
management of keys, secrets and certificates. An overview of all the benefits and how
to accquire this service can be obtained here: https://azure.microsoft.com/en-us/services/key-vault/

### Secrets

Anytime your application or project needs access to sensible information that
cannot be either publicly accessible, nor stored in plain text format, the good
practice of storing secret values arises. The Azure Key Vault allows you to
create, store and manage your application secrets.  When a secret is first
created, it is given a name and a value (among other attributes). You can later
retieve the protected secret using the name you initially used.

### Secret Versions

Secrets in the Key Vault can have multiple versions. A new version of a secret
is created each time to assign a secret value to the same name. Retrieving a
secret by a name will always return the latest value assigned, unless a
specific version is provided to the query.

### Secret Attributes

A secret can have more information than its name and its value. They can either
be enabled or not, contain tags, a content type or expire after a certain date.
These are called the **secret attributes**, and they can either be sent through
during the creation of a secret, as part of a newer version of the same secret,
or sent as an update to a specific version of a secret. The attributes are:

- `tags`: Any set of key-values that can be used to search and filter secrets.
- `contentType`: Any string that can be used to help the receiver of the secret understand how to use the secret value.
- `enabled`: A boolean value that determines wether the secret value can be read or not.
- `notBefore`: A given date after which the secret value can be retrieved.
- `expires`: A given date after which the secret value cannot be retrieved.

### Deleted Secrets and Soft Deletes

Key vaults allow deleting secrets so that they are no longer available.

Deleted secrets will be gone forever unless the user creates the Key Vault with
[soft-delete](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete)
enabled, after which if a secret is deleted, they're not immediately removed,
but instead only marked as "deleted", hidden from retrieval unless the client
application specifically calls to retrieve deleted secrets. Deleted secrets can
also be recovered and purged.

### Backups

A Key Vault in Azure will allow you to generate backups of any created secret.
These backups come as binary data, and can only be used to regenerate a
previously deleted secret by calling to the `restoreSecret` method.

## Examples

The following sections provide code snippets that cover some of the common
tasks using Azure KeyVault Secrets.

Once you have authenticated and created an instance of an `SecretsClient` class
(see "Authenticate the client" above), you can create, read, update, and delete
secrets, as follows:

### Create a secret

`setSecret` assigns a provided value to the specified secret name. If a secret
with the same name already exists, then a new version of the secret is created.
You can also send **secret attributes** to this method.

```javascript
const secretName = "MySecretName";
const result = await client.setSecret(secretName, "MySecretValue");
```

### Get a secret

The simplest way to read secrets back from the vault is to get a secret by
name. This will retrieve the most recent version of the secret. You can
optionally get a different version of the secret if you also know the version
you want.

`getSecret` retrieves a secret previously stored in the Key Vault.

```javascript
const latestSecret = await client.getSecret(secretName);
console.log(`Latest version of the secret ${secretName}: `, getResult);
const specificSecret = await client.getSecret(secretName, { version: latestSecret.version! });
console.log(`The secret ${secretName} at the version ${latestSecret.version!}: `, getResult);
```

### Update the attributes of a secret

`updateSecretAttributes` allows to update the attributes of a secret without creating a new version.

```javascript
const result = getSecret(secretName);
await client.updateSecretAttributes(secretName, result.version, { enabled: false });
```

### Delete a secret

`deleteSecret` deletes a secret previously stored in the Key Vault. When
[soft-delete](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete)
is not enabled for the Key Vault, this operation permanently deletes the
deletes.

```javascript
await client.deleteSecret(secretName);
```

### Iterating lists of secrets

Using the SecretsClient, you can retrieve and iterate all of your secrets,
deleted secrets as well as through all the versions of a specific secret.  Here
are all the API methods that allow you to retrieve and iterate sets of secrets:

- `listSecrets` will list all of your non-deleted secrets by their names, only at their latest versions.
- `listDeletedSecrets` will list all of your deleted secrets by their names, only at their latest versions.
- `listSecretVersions` will list all the versions of a secret based on a secret name.

Some examples follow:

```javascript
for await (let secret of client.listSecrets()) {
  console.log("Secret: ", secret);
}
for await (let deletedSecret of client.listDeletedSecrets()) {
  console.log("Deleted secret: ", deletedSecret);
}
for await (let version of client.listSecretVersions(secretName)) {
  console.log("Version: ", version);
}
```

All of these methods will return **all of the available results** at once. To retrieve them by pages,
add `.byPage()` right after invoking the API method you want to use, as follows:

```javascript
for await (let page of client.listSecrets().byPage()) {
  for (let secret of page) {
    console.log("Secret: ", secret);
  }
}
for await (let page of client.listDeletedSecrets().byPage()) {
  for (let deletedSecret of page) {
    console.log("Deleted secret: ", deletedSecret);
  }
}
for await (let page of client.listSecretVersions(secretName).byPage()) {
  for (let version of page) {
    console.log("Version: ", version);
  }
}
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
Integration tests will wipe all of the existing records in the targeted KeyVault.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/keyvault/keyvault-secrets/README.png)
