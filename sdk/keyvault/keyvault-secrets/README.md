# Azure Key Vault Secrets client library for JS

Azure Key Vault is a service that allows you to encrypt authentication keys,
storage account keys, data encryption keys, .pfx files, and passwords by using
keys that are protected by hardware security modules (HSMs). If you would like
to know more about Azure Key Vault, you may want to review "[What is Azure Key
Vault?](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-overview)".

Azure Key Vault Secrets management allows you to securely store and
tightly control access to tokens, passwords, certificates, API keys,
and other secrets.

Use the client library for Azure Key Vault Secrets in your Node.js application to

- Get, set and delete a secret.
- Update a secret and it's attributes.
- Backup and restore a secret.
- Get, purge or recover a deleted secret.
- Get all the versions of a secret.
- Get all secrets.
- Get all deleted secrets.

**Please Note:** This is a preview version of the Key Vault Secrets library

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets) | [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-secrets) | [API Reference Documentation](https://azure.github.io/azure-sdk-for-js/keyvault-secrets) | [Product documentation](https://azure.microsoft.com/en-us/services/key-vault/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets/samples)

## Getting started

### Install the package

Install the Azure Key Vault Secrets client library using npm:

`npm install @azure/keyvault-secrets`

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[Key Vault resource](https://docs.microsoft.com/en-us/azure/key-vault/quick-create-portal) to use this package.
If you are using this package in a Node.js application, then use Node.js 6.x or higher.

To quickly create the needed Key Vault resources in Azure and to receive a connection string for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Fkeyvault-secrets%2Ftests-resources.json)

### Configure TypeScript

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
  az keyvault set-policy --name <your-key-vault-name> --spn $AZURE_CLIENT_ID --secret-permissions backup delete get list purge recover restore set
  ```

  > --secret-permissions:
  > Accepted values: backup, delete, get, list, purge, recover, restore, set

- Use the above mentioned Key Vault name to retrieve details of your Vault which also contains your Key Vault URL:
  ```Bash
  az keyvault show --name <your-key-vault-name>
  ```

## Key concepts

- The **Secrets client** is the primary interface to interact with the API methods
  related to secrets in the Azure Key Vault API from a JavaScript application.
  Once initialized, it provides a basic set of methods that can be used to
  create, read, update and delete secrets.
- A **Secret version** is a version of a secret in the Key Vault.
  Each time a user assigns a value to a unique secret name, a new **version**
  of that secret is created. Retrieving a secret by a name will always return
  the latest value assigned, unless a specific version is provided to the
  query.
- **Soft delete** allows Key Vaults to support deletion and purging as two
  separate steps, so deleted secrets are not immediately lost. This only happens if the Key Vault
  has [soft-delete](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete)
  enabled.
- A **Secret backup** can be generated from any created secret. These backups come as
  binary data, and can only be used to regenerate a previously deleted secret.

## Authenticating the client

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

## Examples

The following sections provide code snippets that cover some of the common
tasks using Azure Key Vault Secrets. The scenarios that are covered here consist of:

- [Creating and setting a secret](#creating-and-setting-a-secret).
- [Getting a secret](#getting-a-secret).
- [Creating and updating secrets with attributes](#creating-and-updating-secrets-with-attributes).
- [Deleting a secret](#deleting-a-secret).
- [Iterating lists of secrets](#iterating-lists-of-secrets).

### Creating and setting a secret

`setSecret` assigns a provided value to the specified secret name. If a secret
with the same name already exists, then a new version of the secret is created.

```javascript
const secretName = "MySecretName";
const result = await client.setSecret(secretName, "MySecretValue");
```

### Getting a secret

The simplest way to read secrets back from the vault is to get a secret by
name. This will retrieve the most recent version of the secret. You can
optionally get a different version of the key if you specify it as part of the
optional parameters.

```javascript
const latestSecret = await client.getSecret(secretName);
console.log(`Latest version of the secret ${secretName}: `, latestSecret);
const specificSecret = await client.getSecret(secretName, { version: latestSecret.version! });
console.log(`The secret ${secretName} at the version ${latestSecret.version!}: `, specificSecret);
```

### Creating and updating secrets with attributes

A secret can have more information than its name and its value. They can also include
the following attributes:

- `tags`: Any set of key-values that can be used to search and filter secrets.
- `contentType`: Any string that can be used to help the receiver of the secret understand how to use the secret value.
- `enabled`: A boolean value that determines whether the secret value can be read or not.
- `notBefore`: A given date after which the secret value can be retrieved.
- `expires`: A given date after which the secret value cannot be retrieved.

An object with these attributes can be sent as the third parameter of
`setSecret`, right after the secret's name and value, as follows:

```javascript
const result = await client.setSecret(secretName, "MySecretValue", {
  enabled: false
});
```

This will create a new version of the same secret, which will have the latest
provided attributes.

Attributes can also be updated to an existing secret version with
`updateSecretAttributes`, as follows:

```javascript
const result = client.getSecret(secretName);
await client.updateSecretAttributes(secretName, result.parameters.version, { enabled: false });
```

### Deleting a secret

The `beginDeleteSecret` method starts the deletion of a Secret.
This process will happen in the background as soon as the necessary resources
are available.

```javascript
await client.beginDeleteSecret(secretName);
```

If [soft-delete](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete)
is enabled for the Key Vault, this operation will only label the secret as a
_deleted_ secret. A deleted secret can't be updated. They can only be either
read, recovered or purged.

```javascript
const poller = await client.beginDeleteSecret(secretName)

// You can use the deleted secret immediately:
const deletedSecret = poller.getResult();

// The secret is being deleted. Only wait for it if you want to restore it or purge it.
await poller.pollUntilDone();

// You can also get the deleted secret this way:
await client.getDeletedSecret(secretName);

// Deleted secrets can also be recovered or purged.

// recoverDeletedSecret returns a poller, just like beginDeleteSecret.
const recoverPoller = await client.beginRecoverDeletedSecret(secretName)
const recoverPoller.pollUntilDone();

// And then, to purge the deleted secret:
await client.purgeDeletedSecret(secretName);
```

Since Secrets take some time to get fully deleted, `beginDeleteSecret`
returns a Poller object that keeps track of the underlying Long Running
Operation according to our guidelines:
https://azure.github.io/azure-sdk/typescript_design.html#ts-lro

The received poller will allow you to get the deleted secret by calling to `poller.getResult()`.
You can also wait until the deletion finishes, either by running individual service
calls until the secret is deleted, or by waiting until the process is done:

```typescript
const poller = await client.beginDeleteSecret(certificateName, certificatePolicy);

// You can use the deleted secret immediately:
let deletedSecret = poller.getResult();

await poller.poll(); // On each poll, the poller checks whether the secret has been deleted or not.
console.log(poller.isDone()) // The poller will be done once the secret is fully deleted.

// Alternatively, you can keep polling automatically until the operation finishes with pollUntilDone:
deletedSecret = await poller.pollUntilDone();
console.log(deletedSecret);
```

### Iterating lists of secrets

Using the SecretsClient, you can retrieve and iterate through all of the
secrets in a Key Vault, as well as through all of the deleted secrets and the
versions of a specific secret. The following API methods are available:

- `listPropertiesOfSecrets` will list all of your non-deleted secrets by their names, only
  at their latest versions.
- `listDeletedSecrets` will list all of your deleted secrets by their names,
  only at their latest versions.
- `listPropertiesOfSecretVersions` will list all the versions of a secret based on a secret
  name.

Which can be used as follows:

```javascript
for await (let secretProperties of client.listPropertiesOfSecrets()) {
  console.log("Secret properties: ", secretProperties);
}
for await (let deletedSecret of client.listDeletedSecrets()) {
  console.log("Deleted secret: ", deletedSecret);
}
for await (let versionProperties of client.listPropertiesOfSecretVersions(secretName)) {
  console.log("Version properties: ", versionProperties);
}
```

All of these methods will return **all of the available results** at once. To
retrieve them by pages, add `.byPage()` right after invoking the API method you
want to use, as follows:

```javascript
for await (let page of client.listPropertiesOfSecrets().byPage()) {
  for (let secretProperties of page) {
    console.log("Secret properties: ", secretProperties);
  }
}
for await (let page of client.listDeletedSecrets().byPage()) {
  for (let deletedSecret of page) {
    console.log("Deleted secret: ", deletedSecret);
  }
}
for await (let page of client.listPropertiesOfSecretVersions(secretName).byPage()) {
  for (let versionProperties of page) {
    console.log("Version properties: ", versionProperties);
  }
}
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Key Vault Secrets SDK

```bash
export DEBUG=azure*
```

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets/samples)
directory for detailed examples on how to use this library.

## Contributing

This project welcomes contributions and suggestions. Please read the
[contributing guidelines](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md)
for detailed information about how to contribute and what to expect while contributing.

### Testing

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
- `KEYVAULT_NAME`: The name of the Key Vault you want to run the tests against.

**WARNING:**
Integration tests will wipe all of the existing records in the targeted Key Vault.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/keyvault/keyvault-secrets/README.png)
