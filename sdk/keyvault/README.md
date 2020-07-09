# Azure Key Vault client library for JavaScript

Azure Key Vault is a Microsoft-managed service providing cloud keys, secrets, and certificate storage and utility that is highly available, secure, durable, scalable, and redundant.

This project provides client libraries in JavaScript that makes it easy to consume Microsoft Azure Key Vault service.

- [Source Code - Keys](./keyvault-keys)
- [Source Code - Secrets](./keyvault-secrets)
- [Source Code - Certificates](./keyvault-certificates)
- [Product documentation](https://docs.microsoft.com/azure/key-vault)
- @azure/keyvault-keys [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-keys)
- @azure/keyvault-secrets [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-secrets)
- @azure/keyvault-certificates [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-certificates)
- [API Reference documentation](https://docs.microsoft.com/javascript/api/overview/azure/key-vault-index)
- [Azure Key Vault REST APIs](https://docs.microsoft.com/rest/api/keyvault/)

## Getting started

### Features

- Key Vault Keys
  - Create keys using elliptic curve or RSA encryption, optionally backed by Hardware Security Modules (HSM).
  - Import, delete and update keys.
  - Get one or more keys and deleted keys.
  - Recover a deleted key and restore a backed up key.
  - Get the versions and the attributes of a key.
  - Encrypting, decrypting, signing, verifying, wrapping and unwrapping data with keys.
- Key Vault Secrets
  - Get, set and delete a secret.
  - Update a secret and it's attributes.
  - Backup and restore a secret.
  - Get, purge or recover a deleted secret.
  - Get all the versions of a secret, or secrets, or deleted secrets.
- Key Vault Certificates
  - Get, set and delete a certificate.
  - Update a certificate, its attributes, issuer, policy, operation and contacts.
  - Backup and restore a certificate.
  - Get, purge or recover a deleted certificate.
  - Get all the versions of a certificate, or certificates, or deleted certificates.

### Compatibility

This library is compatible with Node.js and browsers, and validated against LTS Node.js versions (>=8.16.0) and latest versions of Chrome, Firefox and Edge.

#### Compatible with IE11

You need polyfills to make this library work with IE11. The easiest way is to use [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill), or [polyfill service](https://polyfill.io/v2/docs/).

You can also load separate polyfills for missed ES feature(s).
This library depends on following ES features which need external polyfills loaded.

- `Promise`
- `String.prototype.startsWith`
- `String.prototype.endsWith`
- `String.prototype.repeat`
- `String.prototype.includes`
- `Array.prototype.includes`
- `Object.assign`
- `Object.keys` (Override IE11's `Object.keys` with ES6 polyfill to enable [ES6 behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Notes))
- `Symbol`

## Getting Started

The preferred way to install the Azure Key Vault client libraries for JavaScript is to use the npm package manager. Take "@azure/keyvault-secrets" for example.

Simply type the following into a terminal window:

```bash
npm install @azure/keyvault-secrets
```

In your TypeScript or JavaScript file, import via following:

```JavaScript
import * as KeyVaultSecrets from "@azure/keyvault-secrets";
```

Or

```JavaScript
const KeyVaultSecrets = require("@azure/keyvault-secrets");
```

## Examples

## Code Samples

- [KeyVault Keys Samples (JavaScript)](./keyvault-keys/samples/javascript)
- [KeyVault Keys Samples (TypeScript)](./keyvault-keys/samples/typescript)
- [KeyVault Keys Test Cases](./keyvault-keys/test/)
- [KeyVault Secrets Samples (JavaScript)](./keyvault-secrets/samples/javascript)
- [KeyVault Secrets Samples (TypeScript)](./keyvault-secrets/samples/typescript)
- [KeyVault Secrets Test Cases](./keyvault-secrets/test/)
- [KeyVault Certificates Samples (JavaScript)](./keyvault-certificates/samples/javascript)
- [KeyVault Certificates Samples (TypeScript)](./keyvault-certificates/samples/typescript)
- [KeyVault Certificates Test Cases](./keyvault-certificates/test/)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fkeyvault%2FREADME.png)
