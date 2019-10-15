# Azure Key Vault Certificates client library for JS

Azure Key Vault is a service that allows you to encrypt authentication
keys, storage account keys, data encryption keys, .pfx files, and
passwords by using keys that are protected by hardware security
modules (HSMs). If you would like to know more about Azure Key Vault, you may
want to review "[What is Azure Key Vault?](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-overview)".

Azure Key Vault Certificates allows you to securely manage, store and
tightly control your certificates.

Use the client library for Azure Key Vault Certificates in your Node.js application to:

- Get, set and delete a certificate.
- Update a certificate, it's attributes, issuer, policy, operation and contacts.
- Backup and restore a certificate.
- Get, purge or recover a deleted certificate.
- Get all the versions of a certificate.
- Get all certificates.
- Get all deleted certificates.

**Please Note:** This is a preview version of the Key Vault Certificates library.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates) | [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-certificates) | [API Reference Documentation](https://azure.github.io/azure-sdk-for-js/keyvault-certificates) | [Product documentation](https://azure.microsoft.com/en-us/services/key-vault/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates/samples)

## Getting started

### Install the package

Install the Azure Key Vault Certificates client library using npm

`npm install @azure/keyvault-certificates`

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[Key Vault resource](https://docs.microsoft.com/en-us/azure/key-vault/quick-create-portal) to use this package.
If you are using this package in a Node.js application, then use Node.js 6.x or higher.

To quickly create the needed Key Vault resources in Azure and to receive a connection string for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Fkeyvault-certificates%2Ftests-resources.json)

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

- Grant the above mentioned application authorization to perform certificate operations on the keyvault:

  ```Bash
  az keyvault set-policy --name <your-key-vault-name> --spn $AZURE_CLIENT_ID --certificate-permissions backup create delete deleteissuers get getissuers import list listissuers managecontacts manageissuers purge recover restore setissuers update
  ```

  > --certificate-permissions:
  > Accepted values: backup, create, delete, deleteissuers, get, getissuers, import, list, listissuers, managecontacts, manageissuers, purge, recover, restore, setissuers, update

- Use the above mentioned Key Vault name to retrieve details of your Vault which also contains your Key Vault URL:
  ```Bash
  az keyvault show --name <your-key-vault-name>
  ```

## Key concepts

- The **Certificates client** is the primary interface to interact with the API methods
  related to certificates in the Azure Key Vault API from a JavaScript application.
  Once initialized, it provides a basic set of methods that can be used to
  create, read, update and delete certificates.
- A **Certificate version** is a version of a certificate in the Key Vault.
  Each time a user assigns a value to a unique certificate name, a new **version**
  of that certificate is created. Retrieving a certificate by a name will always return
  the latest value assigned, unless a specific version is provided to the
  query.
- **Soft delete** allows Key Vaults to support deletion and purging as two
  separate steps, so deleted certificates are not immediately lost. This only happens if the Key Vault
  has [soft-delete](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete)
  enabled.
- A **Certificate backup** can be generated from any created certificate. These backups come as
  binary data, and can only be used to regenerate a previously deleted certificate.

## Authenticating the client

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

## Examples

The following sections provide code snippets that cover some of the common
tasks using Azure Key Vault Certificates. The scenarios that are covered here consist of:

- [Creating and setting a certificate](#creating-and-setting-a-certificate).
- [Getting a certificate](#getting-a-certificate).
- [Certificate attributes](#certificate-attributes).
- [Updating a certificate](#updating-a-certificate).
- [Deleting a certificate](#deleting-a-certificate).
- [Iterating lists of certificates](#iterating-lists-of-certificates).

### Creating and setting a certificate

`beginCreateCertificate` creates a certificate to be stored in the Azure Key Vault. If
a certificate with the same name already exists, a new version of the
certificate is created.

```javascript
const certificateName = "MyCertificateName";
const poller = await client.beginCreateCertificate(certificateName, {
  issuerName: "Self"
});
// Keep reading to see how to get the final value from the poller
```

Besides the name of the certificate, you can also pass the following attributes:

- `certificatePolicy`: The policy of the certificate.
- `enabled`: A boolean value that determines whether the certificate can be used or not.
- `tags`: Any set of key-values that can be used to search and filter certificates.

```javascript
const certificateName = "MyCertificateName";
const certificatePolicy = {
  issuerName: "Self"
};
const enabled = true;
const tags = {
  myCustomTag: "myCustomTagsValue"
};
const poller = await client.beginCreateCertificate(
  certificateName,
  certificatePolicy,
  {
    enabled,
    tags
  }
);
// Keep reading to see how to get the final value from the poller
```

Calling to `beginCreateCertificate` with the same name will create a new version of
the same certificate, which will have the latest provided attributes.

Certificates take some time to get fully created since they need to be signed
by their respective Certificate Authority. For this purpose,
`beginCreateCertificate` returns a Poller object that keeps track
of the underlying Long Running Operation according to our guidelines:
https://azure.github.io/azure-sdk/typescript_design.html#ts-lro

Once you receive the poller, you'll be able to get the pending certificate by
checking on the state of the poller, as follows:

```typescript
const certificateName = "MyCertificateName";
const certificatePolicy = {
  issuerName: "Self"
};

const poller = await client.beginCreateCertificate(certificateName, certificatePolicy);

const certificate = poller.getPendingCertificate();
console.log(certificate);
```

You can also wait until the cerificate finishes being signed, as follows:

```typescript
const certificateName = "MyCertificateName";
const certificatePolicy = {
  issuerName: "Self"
};

const poller = await client.beginCreateCertificate(certificateName, certificatePolicy);

// This might take a while
const certificate = await poller.pollUntilDone();
console.log(certificate);
```

### Get a certificate

The simplest way to read certificates back from the vault is to get a
certificate by name. `getCertificateWithPolicy` will retrieve the most recent
version of the certificate, along with the certificate's policy. You can
optionally get a different version of the certificate by calling
`getCertificate` if you specify the version. `getCertificate` does not return
the certificate's policy.

```javascript
const latestCertificate = await client.getCertificateWithPolicy(certificateName);
console.log(`Latest version of the certificate ${certificateName}: `, latestCertificate);
const specificCertificate = await client.getCertificate(certificateName, latestCertificate.properties.version!);
console.log(`The certificate ${certificateName} at the version ${latestCertificate.properties.version!}: `, specificCertificate);
```

### List all versions of a certificate

`listCertificateVersions` will list versions of the given certificate.

```javascript
for await (let certificate of client.listCertificateVersions(certificateName)) {
  console.log("version: ", certificate.properties.version);
}
```

### List all certificates

`listCertificates` will list all certificates in the Key Vault.

```javascript
for await (let listedCertificate of client.listCertificates()) {
  console.log("certificate: ", listedCertificate);
}
```

### Updating a certificate

The certificate attributes can be updated to an existing certificate version with
`updateCertificate`, as follows:

```javascript
const result = client.getCertificateWithPolicy(certificateName);
await client.updateCertificate(certificateName, result.properties.version, {
  certificatePolicy: {
    issuerName: "Self"
  },
  certificateAttributes: {
    enabled: false
  },
  tags: {
    myCustomTag: "myCustomTagsValue"
  }
});
```

The certificate's policy can also be updated individually with `updateCertificatePolicy`, as follows:

```javascript
const result = client.getCertificateWithPolicy(certificateName);
await client.updateCertificatePolicy(certificateName, {
  issuerName: "Self"
});
```

### Deleting a certificate

The `deleteCertificate` method sets a certificate up for deletion. This process will
happen in the background as soon as the necessary resources are available.

```javascript
await client.deleteCertificate(certificateName);
```

If [soft-delete](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete)
is enabled for the Key Vault, this operation will only label the certificate as a
_deleted_ certificate. A deleted certificate can't be updated. They can only be either
read, recovered or purged.

```javascript
await client.deleteCertificate(certificateName);

// If soft-delete is enabled, we can eventually do:
await client.getDeletedCertificate(certificateName);
// Deleted certificates can also be recovered or purged:
await client.recoverDeletedCertificate(certificateName);
// await client.purgeDeletedCertificate(certificateName);
```

Since the deletion of a certificate won't happen instantly, some time is needed
after the `deleteCertificate` method is called before the deleted certificate is
available to be read, recovered or purged.

### Iterating lists of certificates

Using the CertificatesClient, you can retrieve and iterate through all of the
certificates in a Certificate Vault, as well as through all of the deleted certificates and the
versions of a specific certificate. The following API methods are available:

- `listCertificates` will list all of your non-deleted certificates by their names, only
  at their latest versions.
- `listDeletedCertificates` will list all of your deleted certificates by their names,
  only at their latest versions.
- `listCertificateVersions` will list all the versions of a certificate based on a certificate
  name.

Which can be used as follows:

```javascript
for await (let certificate of client.listCertificates()) {
  console.log("Certificate: ", certificate);
}
for await (let deletedCertificate of client.listDeletedCertificates()) {
  console.log("Deleted certificate: ", deletedCertificate);
}
for await (let version of client.listCertificateVersions(certificateName)) {
  console.log("Version: ", version);
}
```

All of these methods will return **all of the available results** at once. To
retrieve them by pages, add `.byPage()` right after invoking the API method you
want to use, as follows:

```javascript
for await (let page of client.listCertificates().byPage()) {
  for (let certificate of page) {
    console.log("Certificate: ", certificate);
  }
}
for await (let page of client.listDeletedCertificates().byPage()) {
  for (let deletedCertificate of page) {
    console.log("Deleted certificate: ", deletedCertificate);
  }
}
for await (let page of client.listCertificateVersions(certificateName).byPage()) {
  for (let version of page) {
    console.log("Version: ", version);
  }
}
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Key Vault Certificates SDK

```bash
export DEBUG=azure*
```

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates/samples)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/keyvault/keyvault-certificates/README.png)
