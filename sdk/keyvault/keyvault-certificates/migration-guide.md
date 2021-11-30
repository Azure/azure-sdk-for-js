# Guide for migrating to @azure/keyvault-certificates from azure-keyvault

This guide is intended to assist in the migration to `@azure/keyvault-certificates` from `azure-keyvault`. It will focus on side-by-side comparisons for similar operations between the two packages.

Familiarity with the `azure-keyvault` package is assumed. For those new to the Key Vault client libraries for JavaScript, please refer to the [README for @azure/keyvault-certificates][kvc-npm] rather than this guide.

## Table of contents

- [Migration benefits](#migration-benefits)
- [Important changes](#important-changes)
  - [Separate packages and clients](#separate-packages-and-clients)
  - [Client constructors](#client-constructors)
  - [Create a certificate](#create-a-certificate)
  - [Retrieve a certificate](#retrieve-a-certificate)
  - [List properties of certificates](#list-properties-of-certificates)
  - [Delete a certificate](#delete-a-certificate)
- [Additional samples](#additional-samples)

## Migration benefits

A natural question to ask when considering whether or not to adopt a new version or library is what the benefits of doing so would be. As Azure has matured and been embraced by a more diverse group of developers, we have been focused on learning the patterns and practices to best support developer productivity and to understand the gaps that the JavaScript client libraries have.

There were several areas of consistent feedback expressed across the Azure client library ecosystem. One of the most important is that the client libraries for different Azure services have not had a consistent approach to organization, naming, and API structure. Additionally, many developers have felt that the learning curve was difficult, and the APIs did not offer a good, approachable, and consistent onboarding story for those learning Azure or exploring a specific Azure service.

To try and improve the development experience across Azure services, a set of uniform [design guidelines](https://azure.github.io/azure-sdk/general_introduction.html) was created for all languages to drive a consistent experience with established API patterns for all services. A set of [TypeScript specific guidelines][ts-guidelines] was also introduced to ensure that JavaScript clients have a natural and idiomatic feel with respect to the JavaScript and TypeScript ecosystems. Further details are available in the guidelines for those interested.

### Cross Service SDK improvements

The modern Key Vault client libraries also share some of the cross-service improvements made to the Azure development experience, such as:

- Using the new `@azure/identity` library to share a single authentication approach between clients.
- A unified logging and diagnostics pipeline that offers a common view of the activities across each of the client libraries.
- The use of promises rather than callbacks for a simplified programming experience.
- The use of async iterators in paging APIs.

## Important changes

### Separate packages and clients

In the interest of simplifying the API for working with Key Vault keys, secrets and certificates, the `azure-keyvault` package is split into separate packages.

- [`@azure/keyvault-keys`][kvk-npm] contains `KeyClient` for working with Key Vault keys, and `CryptographyClient` for performing cryptographic operations.
- [`@azure/keyvault-secrets`][kvs-npm] contains `SecretClient` for working with Key Vault secrets.
- [`@azure/keyvault-certificates`][kvc-npm] contains `CertificateClient` for working with Key Vault certificates.

### Client constructors

Across all of the new Azure client libraries, clients consistently take an endpoint or connection string along with token credentials on their constructors. This differs from the legacy `KeyVaultClient`, which didn't receive the vault endpoint on the constructor, but required users to pass the vault endpoint as the first parameter to the methods that the `KeyVaultClient` provided.

#### Authenticating

Previously in `azure-keyvault` you could create a `KeyVaultClient` by using credentials from `ms-rest-azure` (up to the version `^2.6.0`. Higher versions are not supported).

```js
var KeyVault = require("azure-keyvault");
var msRestAzure = require("ms-rest-azure");

const clientId = "client id";
const secret = "client secret";
const domain = "tenant id";
const vaultUrl = `https://my-vault.vault.azure.net/`;

async function main() {
  const credentials = await msRestAzure.loginWithServicePrincipalSecret(clientId, secret, domain);
  const client = new KeyVault.KeyVaultClient(credentials);
  const keyVaultCertificate = await client.getCertificate(vaultUrl, "MyCertificate", "");
  console.log(keyVaultCertificate);
}

main().catch((err) => console.error(err));
```

Now in `@azure/keyvault-certificates` you can create a `CertificateClient` using any credential from [`@azure/identity`][identity-npm].

You can install them by simply running the following command at the root of your project:

```
npm install --save @azure/identity @azure/keyvault-certificates
```

Below is a simple example using both `@azure/keyvault-certificates` and [`DefaultAzureCredential`][identity-readme-dac]:

```ts
// The default credential first checks environment variables for configuration as described above.
// If environment configuration is incomplete, it will try managed identity.
const { CertificateClient } = require("@azure/keyvault-certificates");
const { DefaultAzureCredential } = require("@azure/identity");

// Azure SDK clients accept the credential as a parameter
const credential = new DefaultAzureCredential();
const vaultUrl = "https://my-vault.vault.azure.net/";
const client = new CertificateClient(vaultUrl, credential);

async function main(): Promise<void> {
  const keyVaultCertificate = await client.getCertificate("MyCertificate");
  console.log(keyVaultCertificate);
}

main().catch((err) => console.error(err));
```

### Create a certificate

In `azure-keyvault` you could create a certificate by using `KeyVaultClient`'s `createCertificate` method, which required a vault endpoint, certificate name, and a certificate policy. This returned information about the created certificate operation (as a `CertificateOperation`), but you could not poll the certificate operation to know when it completed.

```js
// Example of an old certificate policy
let certificatePolicy = {
  issuerParameters: {
    name: "Self"
  },
  x509CertificateProperties: {
    subject: "CN=CLIGetDefaultPolicy"
  }
};

let certificateOperation = await client.createCertificate(vaultUrl, "MyCertificate", {
  certificatePolicy: certificatePolicy
});
console.log(certificateOperation);
```

A similar approach exists now in `@azure/keyvault-certificates`. You can provide a certificate name and a certificate policy to the method `beginCreateCertificate`, which returns a long operation poller object that can be used to wait/check on the operation. Calling `getResult()` on the poller will return information about the created certificate (as a `KeyVaultCertificateWithPolicy`) without waiting for the operation to complete, but calling `pollUntilDone()` on the poller will wait for the certificate to be fully created.

```ts
// Example of a new certificate policy
const certificatePolicy = {
  issuerName: "Self",
  subject: "cn=MyCert"
};

const poller = await client.beginCreateCertificate("MyCertificate", certificatePolicy);
const keyVaultCertificate = poller.getResult();
console.log(keyVaultCertificate);
await poller.pollUntilDone();
```

### Retrieve a certificate

In `azure-keyvault` you could retrieve a certificate (in a `certificateBundle`) by using `getCertificate` and specifying the desired vault endpoint, certificate name, and certificate version. You could retrieve the versions of a certificate with the `getCertificateVersions` method, which returned an array with certificate items that can be used to retrieve the full certificate afterwards.

```js
const certificateItems = await client.getCertificateVersions(vaultUrl, "MyCertificate");

for (let certificateItem of certificateItems) {
  const version = certificateItem.id.split("/").pop();
  console.log({ version });

  const certificateBundle = await client.getCertificate(vaultUrl, "MyCertificate", version);
  console.log({ certificateBundle });
}
```

Now in `@azure/keyvault-certificates` you can retrieve the latest version of a certificate (as a `KeyVaultCertificate`) by using `getKey` and providing a certificate name. In addition, `listPropertiesOfCertificateVersions` can be used to iterate over the versions of a specific certificate.

```ts
const keyVaultCertificate = await client.getCertificate("MyCertificate");
console.log(keyVaultCertificate.name);
console.log(keyVaultCertificate.properties.version);

for await (let versionProperties of client.listPropertiesOfCertificateVersions("MyCertificate")) {
  console.log("Name:", versionProperties.name, "Version:", versionProperties.version);
  const keyVaultCertificate = await client.getCertificate(versionProperties.name, {
    version: versionProperties.version
  });
  console.log(keyVaultCertificate.properties.version);
}
```

### List properties of certificates

In `azure-keyvault` you could list the properties of certificates in a specified vault with the `getCertificates` method. This returned an array containing the basic properties of each available certificate.

```js
const certificateItems = await client.getCertificates(vaultUrl);
for (let certificateItem of certificateItems) {
  console.log(certificateItem.id);
}
```

Now in `@azure/keyvault-certificates` you can list the properties of certificates in a vault with the `listPropertiesOfCertificates` method. This returns an iterator-like object containing `CertificateProperties` instances.

```ts
for await (let certificateProperties of client.listPropertiesOfCertificates()) {
  console.log("Certificate Id:", certificateProperties.id);
}
```

### Delete a certificate

In `azure-keyvault` you could delete all versions of a certificate with the `deleteCertificate` method. This returned information about the deleted certificate (as a `DeletedCertificateBundle`), but you could not poll the deletion operation to know when it completed. This would be valuable information if you intended to permanently delete the deleted certificate with `purgeDeletedCertificate`.

```js
const deletedKey = await client.deleteCertificate(vaultUrl, "MyCertificate");
console.log(deletedKey.deletedDate);
await client.purgeDeletedCertificate(vaultUrl, "MyCertificate");
```

Now in `@azure/keyvault-certificates` you can delete a certificate with `beginDeleteCertificate`, which returns a long operation poller object that can be used to wait/check on the operation. Calling `getResult()` on the poller will return information about the deleted certificate (as a `DeletedCertificate`) without waiting for the operation to complete, but calling `pollUntilDone()` on the poller will wait for the deletion to complete. Then, `purgeDeletedCertificate` will permanently delete your deleted certificate and make it unrecoverable.

```ts
const deletePoller = await client.beginDeleteCertificate("MyCertificate");
const deletedCertificate = deletePoller.getResult();
await deletePoller.pollUntilDone();
await client.purgeDeletedCertificate(deletedCertificate.name);
```

## Additional samples

- [Key Vault Certificates samples for JavaScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-certificates/samples/v4/javascript)
- [General Key Vault samples for JavaScript](https://docs.microsoft.com/samples/browse/?products=azure-key-vault&languages=javascript)
- [Key Vault Certificates samples for TypeScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript)
- [General Key Vault samples for TypeScript](https://docs.microsoft.com/samples/browse/?products=azure-key-vault&languages=typescript)

[kvk-npm]: https://www.npmjs.com/package/@azure/keyvault-keys
[kvs-npm]: https://www.npmjs.com/package/@azure/keyvault-secrets
[kvc-npm]: https://www.npmjs.com/package/@azure/keyvault-certificates
[ts-guidelines]: https://azure.github.io/azure-sdk/typescript_introduction.html
[identity-npm]: https://www.npmjs.com/package/@azure/identity
[identity-readme-dac]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#defaultazurecredential
