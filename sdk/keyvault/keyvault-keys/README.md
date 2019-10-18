# Azure Key Vault Keys client library for JS

Azure Key Vault is a service that allows you to encrypt authentication
keys, storage account keys, data encryption keys, .pfx files, and
passwords by using keys that are protected by hardware security
modules (HSMs). If you would like to know more about Azure Key Vault, you may
want to review "[What is Azure Key Vault?](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-overview)".

Azure Key Vault Key management allows you to create and control
encryption keys that encrypt your data.

Use the client library for Azure Key Vault Keys in your Node.js application to

- Create keys (using eliptic curve or RSA encryption, optionally backed by an HSM).
- Import keys.
- Delete keys.
- Update keys.
- Get one or more keys.
- Get one or more deleted keys.
- Recover a deleted key.
- Restore a backed up key.
- Get the versions of a key.
- As well as obtaining the attributes of a key.

Using the cryptography client available in this library you also have access to

- Encrypting
- Decrypting
- Signing
- Verifying
- Wrapping keys
- Unwrapping keys

**Please Note:** This is a preview version of the Key Vault Keys library

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-keys) | [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-keys) | [API Reference Documentation](https://azure.github.io/azure-sdk-for-js/keyvault-keys) | [Product documentation](https://azure.microsoft.com/en-us/services/key-vault/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-keys/samples)

## Getting started

### Install the package

Install the Azure Key Vault Keys client library using npm

`npm install @azure/keyvault-keys`

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[Key Vault resource](https://docs.microsoft.com/en-us/azure/key-vault/quick-create-portal) to use this package.
If you are using this package in a Node.js application, then use Node.js 6.x or higher.

To quickly create the needed Key Vault resources in Azure and to receive a connection string for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Fkeyvault-keys%2Ftests-resources.json)

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

- Grant the above mentioned application authorization to perform key operations on the keyvault:

  ```Bash
  az keyvault set-policy --name <your-key-vault-name> --spn $AZURE_CLIENT_ID --key-permissions backup create decrypt delete encrypt get import list purge recover restore sign unwrapKey update verify wrapKey
  ```

  > --secret-permissions:
  > Accepted values: backup, create, decrypt, delete, encrypt, get, import, list, purge, recover, restore, sign, unwrapKey, update, verify, wrapKey

- Use the above mentioned Key Vault name to retrieve details of your Vault which also contains your Key Vault URL:
  ```Bash
  az keyvault show --name <your-key-vault-name>
  ```

## Key concepts

- The **Keys client** is the primary interface to interact with the API methods
  related to keys in the Azure Key Vault API from a JavaScript application.
  Once initialized, it provides a basic set of methods that can be used to
  create, read, update and delete keys.
- A **Key version** is a version of a key in the Key Vault.
  Each time a user assigns a value to a unique key name, a new **version**
  of that key is created. Retrieving a key by a name will always return
  the latest value assigned, unless a specific version is provided to the
  query.
- **Soft delete** allows Key Vaults to support deletion and purging as two
  separate steps, so deleted keys are not immediately lost. This only happens if the Key Vault
  has [soft-delete](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete)
  enabled.
- A **Key backup** can be generated from any created key. These backups come as
  binary data, and can only be used to regenerate a previously deleted key.
- The **Cryptography client** is a separate interface that interacts with the
  keys API methods in the Key Vault API. This client focuses only in the
  cryptography operations that can be executed using a key that has been
  already created in the Key Vault. More about this client in the
  [Cryptography](#cryptography) section.

## Authenticating the client

To use the key vault from TypeScript/JavaScript, you need to first authenticate with the key vault service. To authenticate, first we import the identity and KeysClient, which will connect to the key vault.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { KeysClient } from "@azure/keyvault-keys";
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

// Lastly, create our keys client and connect to the service
const client = new KeysClient(url, credential);
```

## Examples

The following sections provide code snippets that cover some of the common
tasks using Azure Key Vault Keys. The scenarios that are covered here consist of:

- [Creating a key](#creating-a-key).
- [Getting a key](#getting-a-key).
- [Creating and updating keys with attributes](#creating-and-updating-keys-with-attributes).
- [Deleting a key](#deleting-a-key).
- [Iterating lists of keys](#iterating-lists-of-keys).

### Creating a key

`createKey` creates a Key to be stored in the Azure Key Vault. If a key with
the same name already exists, then a new version of the key is created.

```javascript
const keyName = "MyKeyName";

const result = await client.createKey(keyName, "RSA");
console.log("result: ", result);
```

The second parameter sent to `createKey` is the type of the key. Keys can
either be of type: `EC`, `EC-HSM`, `RSA` or `RSA-HSM`.

### Getting a key

The simplest way to read keys back from the vault is to get a key by name. This
will retrieve the most recent version of the key. You can optionally get a
different version of the key if you specify it as part of the optional
parameters.

`getKey` retrieves a key previous stores in the Key Vault.

```javascript
const latestKey = await client.getKey(keyName);
console.log(`Latest version of the key ${keyName}: `, latestKey);
const specificKey = await client.getKey(keyName, { version: latestKey.version! });
console.log(`The key ${keyName} at the version ${latestKey.version!}: `, specificKey);
```

### Creating and updating keys with attributes

The following attributes can also be assigned to any key in a Key Vault:

- `tags`: Any set of key-values that can be used to search and filter keys.
- `keyOps`: An array of the operations that this key will be able to perform (`encrypt`, `decrypt`, `sign`, `verify`, `wrapKey`, `unwrapKey`).
- `enabled`: A boolean value that determines whether the key value can be read or not.
- `notBefore`: A given date after which the key value can be retrieved.
- `expires`: A given date after which the key value cannot be retrieved.

An object with these attributes can be sent as the third parameter of
`createKey`, right after the key's name and value, as follows:

```javascript
const result = await client.createKey(keyName, "RSA", {
  enabled: false
});
```

This will create a new version of the same key, which will have the latest
provided attributes.

Attributes can also be updated to an existing key version with
`updateKey`, as follows:

```javascript
const result = await client.createKey(keyName, "RSA");
await client.updateKey(keyName, result.properties.version, {
  enabled: false
});
```

### Deleting a key

The `beginDeleteKey` method starts the deletion of a key.
This process will happen in the background as soon as the necessary resources
are available.

```javascript
const poller = await client.beginDeleteKey(keyName);
await poller.pollUntilDone();
```

If [soft-delete](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete)
is enabled for the Key Vault, this operation will only label the key as a
_deleted_ key. A deleted key can't be updated. They can only be either
read, recovered or purged.

```javascript
const poller = await client.beginDeleteKey(keyName)

// You can use the deleted key immediately:
const deletedKey = poller.getDeletedKey();

// The key is being deleted. Only wait for it if you want to restore it or purge it.
await poller.pollUntilDone();

// You can also get the deleted key this way:
await client.getDeletedKey(keyName);

// Deleted keys can also be recovered or purged:

// recoverDeletedKey also returns a poller, just like beginDeleteKey.
const recoverPoller = await client.beginRecoverDeletedKey(keyName)
const recoverPoller.pollUntilDone();

// And here is how to purge a deleted key
await client.purgeDeletedKey(keyName);
```

Since Keys take some time to get fully deleted, `beginDeleteKey`
returns a Poller object that keeps track of the underlying Long Running
Operation according to our guidelines:
https://azure.github.io/azure-sdk/typescript_design.html#ts-lro

The received poller will allow you to get the deleted key by calling to `poller.getDeletedKey()`.
You can also wait until the deletion finishes, either by running individual service
calls until the key is deleted, or by waiting until the process is done:

```typescript
const poller = await client.beginDeleteKey(certificateName, certificatePolicy);

// You can use the deleted key immediately:
let deletedKey = poller.getDeletedKey();
 
await poller.poll(); // On each poll, the poller checks whether the key has been deleted or not.
console.log(poller.isDone()) // The poller will be done once the key is fully deleted.

// Alternatively, you can keep polling automatically until the operation finishes with pollUntilDone:
deletedKey = await poller.pollUntilDone();
console.log(deletedKey);
```

### Iterating lists of keys

Using the KeysClient, you can retrieve and iterate through all of the
keys in a Key Vault, as well as through all of the deleted keys and the
versions of a specific key. The following API methods are available:

- `listPropertiesOfKeys` will list all of your non-deleted keys by their names, only
  at their latest versions.
- `listDeletedKeys` will list all of your deleted keys by their names,
  only at their latest versions.
- `listPropertiesOfKeyVersions` will list all the versions of a key based on a key
  name.

Which can be used as follows:

```javascript
for await (let key of client.listPropertiesOfKeys()) {
  console.log("Key: ", key);
}
for await (let deletedKey of client.listDeletedKeys()) {
  console.log("Deleted key: ", deletedKey);
}
for await (let version of client.listPropertiesOfKeyVersions(keyName)) {
  console.log("Version: ", version);
}
```

All of these methods will return **all of the available results** at once. To
retrieve them by pages, add `.byPage()` right after invoking the API method you
want to use, as follows:

```javascript
for await (let page of client.listPropertiesOfKeys().byPage()) {
  for (let key of page) {
    console.log("Key: ", key);
  }
}
for await (let page of client.listDeletedKeys().byPage()) {
  for (let deletedKey of page) {
    console.log("Deleted key: ", deletedKey);
  }
}
for await (let page of client.listPropertiesOfKeyVersions(keyName).byPage()) {
  for (let version of page) {
    console.log("Version: ", version);
  }
}
```

## Cryptography

This library also offers a set of cryptographic utilities available through
`CryptographyClient`. Similar to the `KeysClient`, `CryptographyClient` will
connect to Azure Key Vault with the provided set of credentials. Once
connected, `CryptographyClient` can encrypt, decrypt, sign, verify, wrap keys,
and unwrap keys.

We can next connect to the key vault service just as we do with the KeysClient.
We'll need to copy some settings from the key vault we are
connecting to into our environment variables. Once they are in our environment,
we can access them with the following code:

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { KeysClient, CryptographyClient } from "@azure/keyvault-keys";

// DefaultAzureCredential expects the following three environment variables:
// * AZURE_TENANT_ID: The tenant ID in Azure Active Directory
// * AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
// * AZURE_CLIENT_SECRET: The client secret for the registered application
const credential = new DefaultAzureCredential();

// Build the URL to reach your key vault
const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

// Connect to the key vault service
const keysClient = new KeysClient(url, credential);

// Create or retrieve a key from the keyvault
let myKey = await keysClient.createKey("MyKey", "RSA");

// Lastly, create our cryptography client and connect to the service
// This example uses the URL that is part of the key we created (called key ID or kid)
const cryptographyClient = new CryptographyClient(url, myKey.keyMaterial!.kid!, credential);
```

### Encrypt

`encrypt` will encrypt a message. The following algorithms are currently supported: "RSA-OAEP", "RSA-OAEP-256", and "RSA1_5".

```javascript
const encryptResult = await cryptographyClient.encrypt("RSA1_5", Buffer.from("My Message"));
console.log("encrypt result: ", encryptResult.result);
```

### Decrypt

`decrypt` will decrypt an encrypted message. The following algorithms are currently supported: "RSA-OAEP", "RSA-OAEP-256", and "RSA1_5".

```javascript
const decryptResult = await cryptographyClient.decrypt("RSA1_5", encryptResult.result);
console.log("decrypt result: ", decryptResult.result.toString());
```

### Sign

`sign` will cryptographically sign the digest (hash) of a message with a signature. The following algorithms are currently supported: "PS256", "PS384", "PS512", "RS256", "RS384", "RS512", "ES256","ES256K", "ES384", and "ES512".

```javascript
const signatureValue = "MySignature";
let hash = crypto.createHash("sha256");

let digest = hash.update(signatureValue).digest();
console.log("digest: ", digest);

const signResult = await cryptographyClient.sign("RS256", digest);
console.log("sign result: ", signResult.result);
```

### Sign Data

`signData` will cryptographically sign a message with a signature. The following algorithms are currently supported: "PS256", "PS384", "PS512", "RS256", "RS384", "RS512", "ES256","ES256K", "ES384", and "ES512".

```javascript
const signResult = await cryptographyClient.sign("RS256", Buffer.from("My Message"));
console.log("sign result: ", signResult.result);
```

### Verify

`verify` will cryptographically verify that the signed digest was signed with the given signature. The following algorithms are currently supported: "PS256", "PS384", "PS512", "RS256", "RS384", "RS512", "ES256","ES256K", "ES384", and "ES512".

```javascript
const verifyResult = await cryptographyClient.verify("RS256", digest, signature.result);
console.log("verify result: ", verifyResult.result);
```

### Verify Data

`verifyData` will cryptographically verify that the signed message was signed with the given signature. The following algorithms are currently supported: "PS256", "PS384", "PS512", "RS256", "RS384", "RS512", "ES256","ES256K", "ES384", and "ES512".

```javascript
const buffer = Buffer.from("My Message");
const verifyResult = await cryptographyClient.verifyData("RS256", buffer, signature.result);
console.log("verify result: ", verifyResult.result);
```

### Wrap Key

`wrapKey` will wrap a key with an encryption layer. The following algorithms are currently supported: "RSA-OAEP", "RSA-OAEP-256", and "RSA1_5".

```javascript
const wrapResult = await cryptographyClient.wrapKey("RSA-OAEP", Buffer.from("My Key"));
console.log("wrap result:", wrapResult.result);
```

### Unwrap Key

`unwrapKey` will unwrap a wrapped key. The following algorithms are currently supported: "RSA-OAEP", "RSA-OAEP-256", and "RSA1_5".

```javascript
const unwrapResult = await cryptographyClient.unwrapKey("RSA-OAEP", wrapResult.result);
console.log("unwrap result: ", unwrapResult.result);
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Key Vault Keys SDK

```bash
export DEBUG=azure*
```

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-keys/samples)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/keyvault/keyvault-keys/README.png)
