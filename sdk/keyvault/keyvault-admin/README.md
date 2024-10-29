# Azure Key Vault Administration client library for JavaScript

Azure Key Vault Managed HSM is a fully-managed, highly-available, single-tenant, standards-compliant cloud service that enables you to safeguard cryptographic keys for your cloud applications using FIPS 140-2 Level 3 validated HSMs. If you would like to know more about Azure Key Vault Managed HSM, you may want to review: [What is Azure Key Vault Managed HSM?][managedhsm]

The package `@azure/keyvault-admin` provides support for administrative Key Vault tasks such as full backup / restore and key-level role-based access control (RBAC).

> Note: The Administration library only works with [Azure Key Vault Managed HSM][managedhsm] - functions targeting a Key Vault will fail.
>
> Note: This package cannot be used in the browser due to Azure Key Vault service limitations, please refer to [this document](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/cors/ts/README.md) for guidance.

Key links:

- [Source code][package-gh]
- [Package (npm)][package-npm]
- [API Reference Documentation][docs]
- [Product documentation][docs-service]
- [Samples][samples]

## Getting started

### Install the package

Install the Azure Key Vault administration client library for JavaScript and TypeScript with [NPM][npm]:

```PowerShell
npm install @azure/keyvault-admin
```

### Configure TypeScript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook][compiler-options] for more information.

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- An existing [Key Vault Managed HSM][azure_keyvault_mhsm]. If you need to create a Managed HSM, you can do so using the Azure CLI by following the steps in [this document][azure_keyvault_mhsm_cli].

## Authenticate the client

In order to interact with the Azure Key Vault service, you will need to create an instance of either the [`KeyVaultAccessControlClient`](#create-keyvaultaccesscontrolclient) class or the [`KeyVaultBackupClient`](#create-keyvaultbackupclient) class, as well as a **vault url** (which you may see as "DNS Name" in the Azure Portal) and a credential object. The examples shown in this document use a credential object named [`DefaultAzureCredential`][default_azure_credential], which is appropriate for most scenarios, including local development and production environments. Additionally, we recommend using a [managed identity][managed_identity] for authentication in production environments.

You can find more information on different ways of authenticating and their corresponding credential types in the [Azure Identity documentation][azure_identity].

### Create KeyVaultAccessControlClient

Once you've authenticated with [the authentication method that suits you best][default_azure_credential], you can create a `KeyVaultAccessControlClient` as follows, substituting in your Managed HSM URL in the constructor:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { KeyVaultAccessControlClient } = require("@azure/keyvault-admin");

const credentials = new DefaultAzureCredential();

const client = new KeyVaultAccessControlClient(`<your Managed HSM URL>`, credentials);
```

### Create KeyVaultBackupClient

Once you've authenticated with [the authentication method that suits you best][default_azure_credential], you can create a `KeyVaultBackupClient` as follows, substituting in your Managed HSM URL in the constructor:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { KeyVaultBackupClient } = require("@azure/keyvault-admin");

const credentials = new DefaultAzureCredential();

const client = new KeyVaultBackupClient(`<your Managed HSM URL>`, credentials);
```

## Key concepts

### KeyVaultRoleDefinition

A Role Definition is a collection of permissions. A role definition defines the operations that can be performed, such as read, write, and delete. It can also define the operations that are excluded from allowed operations.

Role definitions can be listed and specified as part of a `KeyVaultRoleAssignment`.

### KeyVaultRoleAssignment

A Role Assignment is the association of a Role Definition to a service principal. They can be created, listed, fetched individually, and deleted.

### KeyVaultAccessControlClient

A `KeyVaultAccessControlClient` provides operations allowing for management of Role Definitions (instances of `KeyVaultRoleDefinition`) and Role Assignments (instances of `KeyVaultRoleAssignment`).

### KeyVaultBackupClient

A `KeyVaultBackupClient` provides operations for performing full key backups, full key restores, and selective key restores.

### Long running operations

The operations done by the `KeyVaultBackupClient` may take as much time as needed by the Azure resources, requiring a client layer to keep track, serialize, and resume the operations through the lifecycle of the programs that wait for them to finish. This is done via a common abstraction through the package [@azure/core-lro][core-lro].

The `KeyVaultBackupClient` offers three methods that execute long running operations:

- `beginBackup`, starts generating a backup of an Azure Key Vault Managed HSM on the specified Storage Blob account.
- `beginRestore`, starts restoring all key materials using the SAS token pointing to a previously stored Azure Blob storage backup folder.
- `beginSelectiveRestore`, starts restoring all key versions of a given key using user supplied SAS token pointing to a previously stored Azure Blob storage backup folder.

The methods that begin long running operations return a poller that allows you to wait indefinitely until the operation is complete. More information is available in the examples below.

## Examples

We have samples both in JavaScript and TypeScript that show the access control and backup/restore features in this package. Please follow the corresponding readmes for detailed steps to run the samples.

- [Readme for JavaScript samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-admin/samples/v4/javascript/README.md)
- [Readme for TypeScript samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-admin/samples/v4/typescript/README.md)

## Troubleshooting

See our [troubleshooting guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-admin/TROUBLESHOOTING.md) for details on how to diagnose various failure scenarios.

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

## Next steps

You can find more code samples through the following links:

- [Key Vault Administration Samples (JavaScript)](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin/samples/v4/javascript)
- [Key Vault Administration Samples (TypeScript)](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin/samples/v4/typescript)
- [Key Vault Administration Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin/test/)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fkeyvault%2Fkeyvault-admin%2FREADME.png)

<!-- LINKS -->

[compiler-options]: https://www.typescriptlang.org/docs/handbook/compiler-options.html
[core-lro]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-lro
[docs-service]: https://azure.microsoft.com/services/key-vault/
[docs]: https://docs.microsoft.com/javascript/api/@azure/keyvault-admin
[managedhsm]: https://docs.microsoft.com/azure/key-vault/managed-hsm/overview
[npm]: https://www.npmjs.com/
[package-gh]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin
[package-npm]: https://www.npmjs.com/package/@azure/keyvault-admin
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin/samples
[azure_keyvault_mhsm]: https://docs.microsoft.com/azure/key-vault/managed-hsm/overview
[azure_keyvault_mhsm_cli]: https://docs.microsoft.com/azure/key-vault/managed-hsm/quick-create-cli
[default_azure_credential]: https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential?view=azure-node-latest
[managed_identity]: https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview
[azure_identity]: https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest
