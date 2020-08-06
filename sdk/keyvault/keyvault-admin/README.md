# Azure Key Vault Admin client library for JavaScript

Azure Key Vault is a service that allows you to encrypt authentication keys, storage account keys, data encryption keys, .pfx files, and passwords by using secured keys.
If you would like to know more about Azure Key Vault, you may want to review: [What is Azure Key Vault?](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-overview)

The package `@azure/keyvault-admin` provides support for the administrative Key Vault tasks. It includes the backup and restore operations for whole Key Vault instances, and the role-based access control (RBAC) operations.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-admin) | [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-admin) | [API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/keyvault-admin) | [Product documentation](https://azure.microsoft.com/en-us/services/key-vault/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-admin/samples)

## Getting started

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[Key Vault resource](https://docs.microsoft.com/en-us/azure/key-vault/quick-create-portal) to use this package.

If you are using this package in a Node.js application, then use Node.js 8.x or higher.

### Install the package

Install the Azure Key Vault Admin client library using npm:

`npm install @azure/keyvault-admin`

### Install the identity library

Key Vault clients authenticate using the Azure Identity Library. Install it as well using npm

`npm install @azure/identity`

### Configure TypeScript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

### Configuring your Key Vault

## Key concepts

## Authenticating with Azure Active Directory

## Examples

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

You can find more code samples through the following links:

- [KeyVault Admin Samples (JavaScript)](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-admin/samples/javascript)
- [KeyVault Admin Samples (TypeScript)](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-admin/samples/typescript)
- [KeyVault Admin Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-admin/test/)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fkeyvault%2Fkeyvault-admin%2FREADME.png)
