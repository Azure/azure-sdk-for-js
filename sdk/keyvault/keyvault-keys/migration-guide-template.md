# Guide for migrating to @azure/keyvault-keys from azure-keyvault

This guide is intended to assist in the migration to `@azure/keyvault-keys` from `azure-keyvault`. It will focus on side-by-side comparisons for similar operations between the two packages.

Familiarity with the `azure-keyvault` package is assumed. For those new to the Key Vault client libraries for JavaScript, please refer to the [README for name of new package here][kvk-readme] rather than this guide.

## Table of contents

* [Migration benefits](#migration-benefits)
* [Important changes](#important-changes)
    - [Separate packages and clients](#separate-packages-and-clients)
    - [Client constructors](#client-constructors)
    - [Create a key](#create-a-key)
    - [Retrieve a key](#retrieve-a-key)
    - [List properties of keys](#list-properties-of-keys)
    - [Delete a key](#delete-a-key)
    - [Perform cryptographic operations](#perform-cryptographic-operations)
* [Additional samples](#additional-samples)

## Migration benefits

A natural question to ask when considering whether or not to adopt a new version or library is what the benefits of doing so would be. As Azure has matured and been embraced by a more diverse group of developers, we have been focused on learning the patterns and practices to best support developer productivity and to understand the gaps that the JavaScript client libraries have.

There were several areas of consistent feedback expressed across the Azure client library ecosystem. One of the most important is that the client libraries for different Azure services have not had a consistent approach to organization, naming, and API structure. Additionally, many developers have felt that the learning curve was difficult, and the APIs did not offer a good, approachable, and consistent onboarding story for those learning Azure or exploring a specific Azure service.

To try and improve the development experience across Azure services, a set of uniform [design guidelines](https://azure.github.io/azure-sdk/general_introduction.html) was created for all languages to drive a consistent experience with established API patterns for all services. A set of [add language here-specific guidelines][ts-guidelines] was also introduced to ensure that JavaScript clients have a natural and idiomatic feel with respect to the JavaScript and TypeScript ecosystems. Further details are available in the guidelines for those interested.

### Cross Service SDK improvements

The modern Key Vault client libraries also provide the ability to share in some of the cross-service improvements made to the Azure development experience, such as 
- using the new Azure.Identity library to share a single authentication approach between clients
- a unified logging and diagnostics pipeline offering a common view of the activities across each of the client libraries
- (In case of JS) use of promises rather than callbacks for a simplified programming experience
- (In case of JS) use of async iterators in paging APIs

### Performance improvements

Use this section to advertise the performance improvements in new package when compared to the old one. Skip this section if no perf improvements are found yet.

## Important changes

### Separate packages and clients

In the interest of simplifying the API `azure-keyvault` and `KeyVaultClient` were split into separate packages and clients:

- [`azure-keyvault-keys`][kvk-readme] contains `KeyClient` for working with keys and `CryptographyClient` for performing cryptographic operations.
- [`azure-keyvault-secrets`][kvs-readme] contains `SecretClient` for working with secrets.
- [`@azure/keyvault-certificates`][kvc-readme] contains `CertificateClient` for working with certificates.

### Client constructors

Across all modern Azure client libraries, clients consistently take an endpoint or connection string along with token credentials. This differs from `KeyVaultClient`, which took an authentication delegate and could be used for multiple Key Vault endpoints.

#### Authenticating

Previously in `azure-keyvault` you could create a `KeyVaultClient` by using credentials from `ms-rest-azure` (up to the version `2.6.0`. Higher versions are not supported):

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
  const keyVaultKey = await client.getKey(vaultUrl, "MyKey", "");
  console.log(keyVaultKey);
}

main().catch((err) => console.error(err));
```

Now in `@azure/keyvault-keys` you can create a `KeyClient` using any credential from [`@azure/identity`][identity-readme]. Below is an example using [`DefaultAzureCredential`][identity-readme-DAC]:

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

You can also create a `CryptographyClient` to perform cryptographic operations (encrypt/decrypt, wrap/unwrap, sign/verify) using a particular key.

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
keyBundle = await client.createKey(vaultUrl, "myECKey", "EC")
console.log(keyBundle);
```

Now in `@azure/keyvault-keys` there are multiple ways to create keys. You can provide a key name and type to the general `createKey` method, or provide just a name to `createRsaKey` or `createEcKey`. These methods all return the created key as a `KeyVaultKey`.

```ts
const rsaKey1 = await client.createKey("MyRSAKey1", "RSA");
const rsaKey2 = await client.createRsaKey("MyRSAKey2");
const ecKey1 = await client.createKey("MyECKey1", "EC");
const ecKey2 = await client.createEcKey("MyECKey2");
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
  console.log("Version properties: ", versionProperties);
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
    console.log("Key name: ", keyProperties.name);
}
```

### Delete a key

In `azure-keyvault` you could delete all versions of a key with the `delete_key` method. This returned information about the deleted key (as a `DeletedKeyBundle`), but you could not poll the deletion operation to know when it completed. This would be valuable information if you intended to permanently delete the deleted key with `purge_deleted_key`.

```python
deleted_key = client.delete_key(vault_base_url="https://my-vault.vault.azure.net/", key_name="key-name")

# this purge would fail if deletion hadn't finished
client.purge_deleted_key(vault_base_url="https://my-vault.vault.azure.net/", key_name="key-name")
```

Now in `azure-keyvault-keys` you can delete a key with `begin_delete_key`, which returns a long operation poller object that can be used to wait/check on the operation. Calling `result()` on the poller will return information about the deleted key (as a `DeletedKey`) without waiting for the operation to complete, but calling `wait()` will wait for the deletion to complete. Again, `purge_deleted_key` will permanently delete your deleted key and make it unrecoverable.

```python
deleted_key_poller = key_client.begin_delete_key(name="key-name")
deleted_key = deleted_key_poller.result()

deleted_key_poller.wait()
key_client.purge_deleted_key(name="key-name")
```

### Perform cryptographic operations

In `azure-keyvault` you could perform cryptographic operations with keys by using the `encrypt`/`decrypt`, `wrap_key`/`unwrap_key`, and `sign`/`verify` methods. Each of these methods accepted a vault endpoint, key name, key version, and algorithm along with other parameters.

```python
from azure.keyvault import KeyId

key_bundle = client.create_key(
    vault_base_url="https://my-vault.vault.azure.net/",
    key_name="key-name",
    kty="RSA"
)
key = key_bundle.key
key_id = KeyId(key.kid)
key_version = key_id.version

plaintext = b"plaintext"

# encrypt data using the key
operation_result = client.encrypt(
    vault_base_url="https://my-vault.vault.azure.net/",
    key_name="key-name",
    key_version=key_version,
    algorithm="RSA-OAEP-256",
    value=plaintext
)
ciphertext = operation_result.result
```

Now in `azure-keyvault-keys` you can perform these cryptographic operations by using a `CryptographyClient`. The key used to create the client will be used for these operations. Cryptographic operations are now performed locally by the client when it's intialized with the necessary key material or is able to get that material from Key Vault, and are only performed by the Key Vault service when required key material is unavailable.

```python
from azure.keyvault.keys.crypto import CryptographyClient, EncryptionAlgorithm

key = key_client.get_key(name="key-name")
crypto_client = CryptographyClient(key=key, credential=credential)

plaintext = b"plaintext"

# encrypt data using the key
result = crypto_client.encrypt(algorithm=EncryptionAlgorithm.rsa_oaep_256, plaintext=plaintext)
ciphertext = result.ciphertext
```

## Additional samples

* [Key Vault keys samples for Python](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/keyvault/azure-keyvault-keys/samples)
* [General Key Vault samples for Python](https://docs.microsoft.com/samples/browse/?products=azure-key-vault&languages=python)

[kvk-readme]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-keys/README.md
[kvs-readme]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/README.md
[kvc-readme]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/README.md
[ts-guidelines]: https://azure.github.io/azure-sdk/typescript_introduction.html
[identity-readme]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md
[identity-readme-DAC]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md#defaultazurecredential
