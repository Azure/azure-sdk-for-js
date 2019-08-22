# Azure KeyVault Certificates client library for JS

Azure KeyVault is a service that allows you to encrypt authentication
keys, storage account keys, data encryption keys, .pfx files, and
passwords by using keys that are protected by hardware security
modules (HSMs).

Azure KeyVault Certificates allows you to securely manage, store and
tightly control your certificates.
 
Use the client library for Azure KeyVault Certificates in your Node.js application to:

- Get, set and delete a certificate.
- Update a certificate, it's attributes, issuer, policy, operation and contacts.
- Backup and restore a certificate.
- Get, purge or recover a deleted certificate.
- Get all the versions of a certificate.
- Get all certificates.
- Get all deleted certificates.

**Please Note:** This is a preview version of the KeyVault Certificates library.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates) | [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-certificates) | [API Reference Documentation](https://azure.github.io/azure-sdk-for-js/keyvault-certificates) | [Product documentation](https://azure.microsoft.com/en-us/services/key-vault/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates/samples)

## Getting started

### Install the package

Install the Azure Event KeyVault Certificates client library using npm

`npm install @azure/keyvault-certificates`

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

- Grant the above mentioned application authorization to perform certificate operations on the keyvault:

  ```Bash
  az keyvault set-policy --name <your-key-vault-name> --spn $AZURE_CLIENT_ID --certificate-permissions backup delete get list create deleteissuers getissuers import list listissuers managecontacts manageissuers purge recover restore setissuers update
  ```

  > --certificate-permissions:
  > Accepted values: backup, create, delete, deleteissuers, get, getissuers, import, list, listissuers, managecontacts, manageissuers, purge, recover, restore, setissuers, update

- Use the above mentioned Key Vault name to retrieve details of your Vault which also contains your Key Vault URL:
  ```Bash
  az keyvault show --name <your-key-vault-name>
  ```

### Authenticate the client

To use the key vault from TypeScript/JavaScript, you need to first authenticate with the key vault service. To authenticate, first we import the identity and CertificatesClient, which will connect to the key vault.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { CertificatesClient } from "@azure/keyvault-certificates";
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

// Lastly, create our certificates client and connect to the service
const client = new CertificatesClient(url, credential);
```

## Key concepts

### Creating certificates and certificate versions

Azure Key Vault allows you to create certificates that are stored in the key vault. When a certificate is first created, it is given a name and some additional properties, such as a policy or tags. This name acts as a way to reach the certificate later.

Certificates in the key vault can have multiple versions, which are created with the same name an can be retrieved, updated or deleted independently.

### Getting certificates from the key vault

The simplest way to read certificates back from the vault is to get it using its name. This will retrieve the most recent version of the certificate. You can optionally get a different version of the certificate by passing the specific version as a second parameter.

Key vaults also support listing all the certificates available in them, as well as listing the all the versions of a specific certificate.

### Updating certificates

Once a certificate is created, it is possible to update it. You can update the provider of the certificate, their credentials, the details of the organization behind the certificate, as well as wether its issuer is enabled or not.

### Working with deleted certificates

Key vaults allow deleting certificates so that they are no longer available.

In key vaults with 'soft delete' enabled, certificates are not immediately removed but instead marked simply as 'deleted'. These deleted certificates can be listed, purged, and recovered.

## Examples

The following sections provide code snippets that cover some of the common tasks using Azure KeyVault Certificates.

Once you have authenticated and created an instance of an `CertificatesClient` class (see "Authenticate the client" above), you can create, read, update, and delete certificates:

### Create a certificate

`setCertificate` creates a certificate to be stored in the Azure Key Vault. If a certificate with the same name already exists, then a new version of the certificate is created.

```javascript
const certificateName = "MyCertificateName";
const result = await client.createCertificate(certificateName, {
  certificatePolicy: {
    issuerParameters: { name: "Self" },
  }
});
```

### Get a certificate

`getCertificate` retrieves a certificate previously stored in the Key Vault.

```javascript
const getResult = await client.getCertificate(certificateName, "");
console.log("getResult: ", getResult);
```

### List all versions of a certificate

`listCertificateVersions` will list versions of the given certificate.

```javascript
for await (let certificate of client.listCertificateVersions(certificateName)) {
  console.log("version: ", certificate.version);
}
```

### List all certificates

`listCertificates` will list all certificates in the Key Vault.

```javascript
for await (let listedCertificate of client.listCertificates()) {
  console.log("certificate: ", listedCertificate);
}
```

### Update a certificate

`updateCertificate` updates the attributes of a certificate.

```javascript
const result = getCertificate(certificateName, "");
await client.updateCertificate(certificateName, result.version, {
  tags: {
    customTag: "value"
  }
});
```

### Delete a certificate

`deleteCertificate` deletes a certificate previously stored in the Key Vault. When [soft-delete](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete) is not enabled for the Key Vault, this operation permanently deletes the deletes.

```javascript
await client.deleteCertificate(certificateName);
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the KeyVault Certificates SDK

```bash
export DEBUG=azure*
```

- Getting debug logs from the KeyVault Certificates SDK and the protocol level library.

```bash
export DEBUG=azure*,rhea*
```

- If you are **not interested in viewing the event transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer
```

- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:keyvault-certificates:error,azure-amqp-common:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
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
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates/samples)
directory for detailed examples on how to use this library.

TODO:
List the samples.

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/keyvault/keyvault-certificates/README.png)
