# Guide for migrating to @azure/keyvault-secrets from azure-keyvault

This guide is intended to assist in the migration to `@azure/keyvault-secrets` from `azure-keyvault`. It will focus on side-by-side comparisons for similar operations between the two packages.

Familiarity with the `azure-keyvault` package is assumed. For those new to the Key Vault client libraries for JavaScript, please refer to the [README for @azure/keyvault-secrets][kvs-npm] rather than this guide.

## Table of contents

* [Migration benefits](#migration-benefits)
* [Important changes](#important-changes)
    - [Separate packages and clients](#separate-packages-and-clients)
    - [Client constructors](#client-constructors)
    - [Create a secret](#create-a-secret)
    - [Retrieve a secret](#retrieve-a-secret)
    - [List properties of secrets](#list-properties-of-secrets)
    - [Delete a secret](#delete-a-secret)
* [Additional samples](#additional-samples)

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

In the interest of simplifying the API for working with Key Vault keys, secrets and certificates, the `azure-keyvault`  package is split into separate packages.

- [`@azure/keyvault-keys`][kvk-npm] contains `KeyClient` for working with Key Vault keys, and `CryptographyClient` for performing cryptographic operations.
- [`@azure/keyvault-secrets`][kvs-npm] contains `SecretClient` for working with Key Vault secrets.
- [`@azure/keyvault-certificates`][kvc-npm] contains `CertificateClient` for working with Key Vault certificates.

### Client constructors

Across all of the new Azure client libraries, clients consistently take an endpoint or connection string along with token credentials on their constructors. This differs from the legacy `KeyVaultClient`, which didn't receive the vault endpoint on the constructor, but required users to pass the vault endpoint as the first parameter to the methods that the `KeyVaultClient` provided.

#### Authenticating

Previously in `azure-keyvault` you could create a `KeyVaultClient` by using credentials from `ms-rest-azure` (up to the version `^2.6.0`. Higher versions are not supported).

```js
var KeyVault = require('azure-keyvault');
var msRestAzure = require('ms-rest-azure');

const clientId = "client id";
const secret = "client secret";
const domain = "tenant id";
const vaultUrl = `https://my-vault.vault.azure.net/`;

async function main() {
  const credentials = await msRestAzure.loginWithServicePrincipalSecret(
    clientId,
    secret,
    domain
  );
  const client = new KeyVault.KeyVaultClient(credentials);
  const keyVaultSecret = await client.getSecret(vaultUrl, "MySecret", "");
  console.log(keyVaultSecret);
}

main().catch((err) => console.error(err));
```

Now in `@azure/keyvault-secrets` you can create a `SecretClient` using any credential from [`@azure/identity`][identity-npm].

You can install them by simply running the following command at the root of your project:

```
npm install --save @azure/identity @azure/keyvault-secrets
```

Below is a simple example using both `@azure/keyvault-secrets` and [`DefaultAzureCredential`][identity-readme-DAC]:

```ts
// The default credential first checks environment variables for configuration as described above.
// If environment configuration is incomplete, it will try managed identity.
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Azure SDK clients accept the credential as a parameter
const credential = new DefaultAzureCredential();
const vaultUrl = "https://my-vault.vault.azure.net/";
const client = new SecretClient(vaultUrl, credential);

async function main(): Promise<void> {
  const keyVaultSecret = await client.getSecret("MySecret");
  console.log(keyVaultSecret);
}

main().catch((err) => console.error(err));
```

### Create a secret

In `azure-keyvault` you could create a secret by using `KeyVaultClient`'s `setSecret` method, which required a vault endpoint, secret name, and the value of the secret. This method returned a `secretBundle` containing the details of the Key Vault secret.

```js
let secretBundle = await client.setSecret(vaultUrl, "MySecret", "My secret value");
console.log(secretBundle);
```

A similar approach exists now in `@azure/keyvault-secrets`. You can provide a secret name and a secret value to the method `setSecret`, which returns a `KeyVaultSecret`.

```ts
const keyVaultSecret = await client.setSecret("MySecret", "My secret value");
console.log(keyVaultSecret);
```

### Retrieve a secret

In `azure-keyvault` you could retrieve a secret (in a `secretBundle`) by using `getSecret` and specifying the desired vault endpoint, secret name, and secret version. You could retrieve the versions of a secret with the `getSecretVersions` method, which returned an array with secret items that can be used to retrieve the full secret afterwards.

```js
const secretItems = await client.getSecretVersions(vaultUrl, "MySecret");

for (let secretItem of secretItems) {
  const version = secretItem.id.split("/").pop();
  console.log({ version });

  const secretBundle = await client.getSecret(vaultUrl, "MySecret", version);
  console.log({ secretBundle });
}
```

Now in `@azure/keyvault-secrets` you can retrieve the latest version of a secret (as a `KeyVaultSecret`) by using `getKey` and providing a secret name. In addition, `listPropertiesOfSecretVersions` can be used to iterate over the versions of a specific secret.

```ts
const keyVaultSecret = await client.getSecret("MySecret");
console.log(keyVaultSecret.name);
console.log(keyVaultSecret.properties.version);

for await (let versionProperties of client.listPropertiesOfSecretVersions("MySecret")) {
  console.log("Name:", versionProperties.name, "Version:", versionProperties.version);
  const keyVaultSecret = await client.getSecret(versionProperties.name, { version: versionProperties.version });
  console.log(keyVaultSecret.properties.version);
}
```

### List properties of secrets

In `azure-keyvault` you could list the properties of secrets in a specified vault with the `getSecrets` method. This returned an array containing the basic properties of each available secret.

```js
const secretItems = await client.getSecrets(vaultUrl);
for (let secretItem of secretItems) {
  console.log(secretItem.id);
}
```

Now in `@azure/keyvault-secrets` you can list the properties of secrets in a vault with the `listPropertiesOfSecrets` method. This returns an iterator-like object containing `SecretProperties` instances.

```ts
for await (let secretProperties of client.listPropertiesOfSecrets()) {
  console.log("Secret Id:", secretProperties.id);
}
```

### Delete a secret

In `azure-keyvault` you could delete all versions of a secret with the `deleteSecret` method. This returned information about the deleted secret (as a `DeletedSecretBundle`), but you could not poll the deletion operation to know when it completed. This would be valuable information if you intended to permanently delete the deleted secret with `purgeDeletedSecret`.

```js
const deletedKey = await client.deleteSecret(vaultUrl, "MySecret");
console.log(deletedKey.deletedDate);
await client.purgeDeletedSecret(vaultUrl, "MySecret");
```

Now in `@azure/keyvault-secrets` you can delete a secret with `beginDeleteSecret`, which returns a long operation poller object that can be used to wait/check on the operation. Calling `getResult()` on the poller will return information about the deleted secret (as a `DeletedSecret`) without waiting for the operation to complete, but calling `pollUntilDone()` on the poller will wait for the deletion to complete. Then, `purgeDeletedSecret` will permanently delete your deleted secret and make it unrecoverable.

```ts
const deletePoller = await client.beginDeleteSecret("MySecret");
const deletedSecret = deletePoller.getResult();
await deletePoller.pollUntilDone();
await client.purgeDeletedSecret(deletedSecret.name);
```

## Additional samples

- [Key Vault Secrets samples for JavaScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-secrets/samples/v4/javascript)
- [General Key Vault samples for JavaScript](https://docs.microsoft.com/samples/browse/?products=azure-key-vault&languages=javascript)
- [Key Vault Secrets samples for TypeScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-secrets/samples/v4/typescript)
- [General Key Vault samples for TypeScript](https://docs.microsoft.com/samples/browse/?products=azure-key-vault&languages=typescript)

[kvk-npm]: https://www.npmjs.com/package/@azure/keyvault-keys
[kvs-npm]: https://www.npmjs.com/package/@azure/keyvault-secrets
[kvc-npm]: https://www.npmjs.com/package/@azure/keyvault-certificates
[ts-guidelines]: https://azure.github.io/azure-sdk/typescript_introduction.html
[identity-npm]: https://www.npmjs.com/package/@azure/identity
[identity-readme-DAC]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#defaultazurecredential
