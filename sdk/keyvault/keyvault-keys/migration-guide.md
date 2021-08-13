# Guide for migrating to @azure/keyvault-keys from azure-keyvault

This guide is intended to assist in the migration to `@azure/keyvault-keys` from `azure-keyvault`. It will focus on side-by-side comparisons for similar operations between the two packages.

Familiarity with the `azure-keyvault` package is assumed. For those new to the Key Vault client libraries for JavaScript, please refer to the [README for @azure/keyvault-keys][kvk-npm] rather than this guide.

## Table of contents

- [Migration benefits](#migration-benefits)
- [Important changes](#important-changes)
  - [Separate packages and clients](#separate-packages-and-clients)
  - [Client constructors](#client-constructors)
  - [Create a key](#create-a-key)
  - [Retrieve a key](#retrieve-a-key)
  - [List properties of keys](#list-properties-of-keys)
  - [Delete a key](#delete-a-key)
  - [Perform cryptographic operations](#perform-cryptographic-operations)
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
  const keyVaultKey = await client.getKey(vaultUrl, "MyKey", "");
  console.log(keyVaultKey);
}

main().catch((err) => console.error(err));
```

Now in `@azure/keyvault-keys` you can create a `KeyClient` using any credential from [`@azure/identity`][identity-npm].

You can install them by simply running the following command at the root of your project:

```
npm install --save @azure/identity @azure/keyvault-keys
```

Below is a simple example using both `@azure/keyvault-keys` and [`DefaultAzureCredential`][identity-readme-dac]:

```ts
// The default credential first checks environment variables for configuration as described above.
// If environment configuration is incomplete, it will try managed identity.
const { KeyClient } = require("@azure/keyvault-keys");
const { DefaultAzureCredential } = require("@azure/identity");

// Azure SDK clients accept the credential as a parameter
const credential = new DefaultAzureCredential();
const vaultUrl = "https://my-vault.vault.azure.net/";
const client = new KeyClient(vaultUrl, credential);

async function main(): Promise<void> {
  const keyVaultKey = await client.getKey("MyKey");
  console.log(keyVaultKey);
}

main().catch((err) => console.error(err));
```

The new client also provides a `CryptographyClient` to perform cryptographic operations (encrypt/decrypt, wrap/unwrap, sign/verify) using a particular key. Below is an example.

```ts
const { KeyClient, CryptographyClient } = require("@azure/keyvault-keys");
const { DefaultAzureCredential } = require("@azure/identity");

const credential = new DefaultAzureCredential();
const vaultUrl = "https://my-vault.vault.azure.net/";
const client = new KeyClient(vaultUrl, credential);

async function main(): Promise<void> {
  const keyVaultKey = await client.getKey("MyKey");
  const cryptographyClient = new CryptographyClient(keyVaultKey.id!, credential);
  const signed = await cryptographyClient.signData("RS256", "some data");
  console.log(signed);
}

main().catch((err) => console.error(err));
```

### Create a key

In `azure-keyvault` you could create a key by using `KeyVaultClient`'s `createKey` method, which required a vault endpoint, key name, and key type. This method returned a `KeyBundle` containing the key.

```js
// create an RSA key
let keyBundle = await client.createKey(vaultUrl, "myRSAKey", "RSA");
console.log(keyBundle);

// create an elliptic curve key
keyBundle = await client.createKey(vaultUrl, "myECKey", "EC");
console.log(keyBundle);
```

Now in `@azure/keyvault-keys` there are multiple ways to create keys. You can provide a key name and type to the general `createKey` method, or provide just a name to `createRsaKey` or `createEcKey`. These methods all return the created key as a `KeyVaultKey`.

```ts
// create RSA keys
const rsaKey1 = await client.createKey("MyRSAKey1", "RSA");
console.log(rsaKey1);
const rsaKey2 = await client.createRsaKey("MyRSAKey2");
console.log(rsaKey2);

// create elliptic curve keys
const ecKey1 = await client.createKey("MyECKey1", "EC");
console.log(ecKey1);
const ecKey2 = await client.createEcKey("MyECKey2");
console.log(ecKey2);
```

### Retrieve a key

In `azure-keyvault` you could retrieve a key (in a `KeyBundle`) by using `getKey` and specifying the desired vault endpoint, key name, and key version. You could retrieve the versions of a key with the `getKeyVersions` method, which returned an array with key items that can be used to retrieve the full key afterwards.

```js
const keyItems = await client.getKeyVersions(vaultUrl, "MyKey");

for (let keyItem of keyItems) {
  const version = keyItem.kid.split("/").pop();
  console.log({ version });

  const keyBundle = await client.getKey(vaultUrl, "MyKey", version);
  console.log({ keyBundle });
}
```

Now in `@azure/keyvault-keys` you can retrieve the latest version of a key (as a `KeyVaultKey`) by using `getKey` and providing a key name. In addition, `listPropertiesOfKeyVersions` can be used to iterate over the versions of a specific key.

```ts
const keyVaultKey = await client.getKey("MyKey");
console.log(keyVaultKey.name);
console.log(keyVaultKey.keyType);
console.log(keyVaultKey.properties.version);

for await (let versionProperties of client.listPropertiesOfKeyVersions("MyKey")) {
  console.log("Name:", versionProperties.name, "Version:", versionProperties.version);
  const keyVaultKey = await client.getKey(versionProperties.name, {
    version: versionProperties.version
  });
  console.log(keyVaultKey.properties.version);
}
```

### List properties of keys

In `azure-keyvault` you could list the properties of keys in a specified vault with the `getKeys` method. This returned an array containing the basic properties of each available key.

```js
const keyItems = await client.getKeys(vaultUrl);
for (let keyItem of keyItems) {
  console.log(keyItem.kid);
}
```

Now in `@azure/keyvault-keys` you can list the properties of keys in a vault with the `listPropertiesOfKeys` method. This returns an iterator-like object containing `KeyProperties` instances.

```ts
for await (let keyProperties of client.listPropertiesOfKeys()) {
  console.log("Key Id:", keyProperties.id);
}
```

### Delete a key

In `azure-keyvault` you could delete all versions of a key with the `deleteKey` method. This returned information about the deleted key (as a `DeletedKeyBundle`), but you could not poll the deletion operation to know when it completed. This would be valuable information if you intended to permanently delete the deleted key with `purgeDeletedKey`.

```js
const deletedKey = await client.deleteKey(vaultUrl, "MyKey");
console.log(deletedKey.deletedDate);
await client.purgeDeletedKey(vaultUrl, "MyKey");
```

Now in `@azure/keyvault-keys` you can delete a key with `beginDeleteKey`, which returns a long operation poller object that can be used to wait/check on the operation. Calling `getResult()` on the poller will return information about the deleted key (as a `DeletedKey`) without waiting for the operation to complete, but calling `pollUntilDone()` on the poller will wait for the deletion to complete. Then, `purgeDeletedKey` will permanently delete your deleted key and make it unrecoverable.

```ts
const deletePoller = await client.beginDeleteKey("MyKey");
const deletedKey = deletePoller.getResult();
await deletePoller.pollUntilDone();
await client.purgeDeletedKey(deletedKey.name);
```

### Perform cryptographic operations

In `azure-keyvault` you could perform cryptographic operations with keys by using the `encrypt`/`decrypt`, `wrapKey`/`unwrapKey`, and `sign`/`verify` methods. These methods accept a vault endpoint, key name, key version, and algorithm along with other parameters.

```js
const keyName = "MyKey";
await client.createKey(vaultUrl, keyName, "RSA");
const operationResult = await client.encrypt(
  vaultUrl,
  keyName,
  "",
  "RSA1_5",
  Buffer.from("plaintext")
);
console.log(operationResult.result);
```

Now in `@azure/keyvault-keys` you can perform these cryptographic operations by using a `CryptographyClient`. The key used to create the client will be used for these operations. Some of the Cryptographic operations are now performed locally by the client when it's initialized with the necessary key material or is able to get that material from Key Vault.

```ts
const keyVaultKey = await client.getKey("MyKey");
const cryptographyClient = new CryptographyClient(keyVaultKey.id!, credential);
const operationResult = await cryptographyClient.encrypt("RSA1_5", Buffer.from("plaintext"));
console.log(operationResult.result);
```

## Additional samples

- [Key Vault keys samples for JavaScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-keys/samples/v4/javascript)
- [General Key Vault samples for JavaScript](https://docs.microsoft.com/samples/browse/?products=azure-key-vault&languages=javascript)
- [Key Vault keys samples for TypeScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-keys/samples/v4/typescript)
- [General Key Vault samples for TypeScript](https://docs.microsoft.com/samples/browse/?products=azure-key-vault&languages=typescript)

[kvk-npm]: https://www.npmjs.com/package/@azure/keyvault-keys
[kvs-npm]: https://www.npmjs.com/package/@azure/keyvault-secrets
[kvc-npm]: https://www.npmjs.com/package/@azure/keyvault-certificates
[ts-guidelines]: https://azure.github.io/azure-sdk/typescript_introduction.html
[identity-npm]: https://www.npmjs.com/package/@azure/identity
[identity-readme-dac]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#defaultazurecredential
