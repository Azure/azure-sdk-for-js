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

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- A [Key Vault resource](https://docs.microsoft.com/azure/key-vault/quick-create-portal)

#### Getting Azure credentials

Use the [Azure CLI][azure-cli] snippet below to create/get client secret credentials.

- Create a service principal and configure its access to Azure resources:
  ```PowerShell
  az ad sp create-for-rbac -n <your-application-name> --skip-assignment
  ```
  Output:
  ```json
  {
    "appId": "generated-app-ID",
    "displayName": "some-app-name",
    "name": "http://some-app-name",
    "password": "random-password",
    "tenant": "tenant-ID"
  }
  ```
- Take note of the service principal objectId
  ```PowerShell
  az ad sp show --id <appId> --query objectId
  ```
  Output:
  ```
  "<your-service-principal-object-id>"
  ```
- Use the returned credentials above to set **AZURE_CLIENT_ID** (appId), **AZURE_CLIENT_SECRET** (password), and **AZURE_TENANT_ID** (tenant) environment variables.

#### Get or create an Azure Managed HSM with the Azure CLI

- Create the Managed HSM and grant the above mentioned service principal authorization to perform administrative operations on the Azure Key Vault (replace `<your-resource-group-name>` and `<your-key-vault-name>` with your own, unique names and `<your-service-principal-object-id>` with the value from above):

  ```PowerShell
  az keyvault create --hsm-name <your-key-vault-name> --resource-group <your-resource-group-name> --administrators <your-service-principal-object-id> --location <your-azure-location>
  ```

  This service principal is automatically added to the "Managed HSM Administrators" [built-in role][built_in_roles].

- Use the above mentioned Azure Key Vault name to retrieve details of your Vault which also contains your Azure Key Vault URL:
  ```PowerShell
  az keyvault show --hsm-name <your-key-vault-name>
  ```

#### Activate your managed HSM

All data plane commands are disabled until the HSM is activated. You will not be able to create keys or assign roles. Only the designated administrators that were assigned during the create command can activate the HSM. To activate the HSM you must download the security domain.

To activate your HSM you need:

- Minimum 3 RSA key-pairs (maximum 10)
- Specify minimum number of keys required to decrypt the security domain (quorum)

To activate the HSM you send at least 3 (maximum 10) RSA public keys to the HSM. The HSM encrypts the security domain with these keys and sends it back. Once this security domain is successfully downloaded, your HSM is ready to use. You also need to specify quorum, which is the minimum number of private keys required to decrypt the security domain.

The example below shows how to use openssl to generate 3 self signed certificate.

```PowerShell
openssl req -newkey rsa:2048 -nodes -keyout cert_0.key -x509 -days 365 -out cert_0.cer
openssl req -newkey rsa:2048 -nodes -keyout cert_1.key -x509 -days 365 -out cert_1.cer
openssl req -newkey rsa:2048 -nodes -keyout cert_2.key -x509 -days 365 -out cert_2.cer
```

Use the az keyvault security-domain download command to download the security domain and activate your managed HSM. The example below, uses 3 RSA key pairs (only public keys are needed for this command) and sets the quorum to 2.

```PowerShell
az keyvault security-domain download --hsm-name <your-key-vault-name> --sd-wrapping-keys ./certs/cert_0.cer ./certs/cert_1.cer ./certs/cert_2.cer --sd-quorum 2 --security-domain-file ContosoMHSM-SD.json
```

#### Controlling access to your managed HSM

The designated administrators assigned during creation are automatically added to the "Managed HSM Administrators" [built-in role][built_in_roles],
who are able to download a security domain and [manage roles for data plane access][access_control], among other limited permissions.

To perform other actions on keys, you need to assign principals to other roles such as "Managed HSM Crypto User", which can perform non-destructive key operations:

```PowerShell
az keyvault role assignment create --hsm-name <your-key-vault-name> --role "Managed HSM Crypto User" --scope / --assignee-object-id <principal-or-user-object-ID> --assignee-principal-type <principal-type>
```

Please read [best practices][best_practices] for properly securing your managed HSM.

#### Get or create an Azure Storage Account with the Azure CLI

A storage account is necessary to generate the backup of a Key Vault.

To generate Key Vault backups, you will need to point the `KeyVaultBackupClient` to an existing Storage account.

To create a new Storage Account, you can use the [Azure Portal][storage-account-create-portal],
[Azure PowerShell][storage-account-create-ps], or the [Azure CLI][storage-account-create-cli].
Here's an example using the Azure CLI:

```Powershell
az storage account create --name MyStorageAccount --resource-group MyResourceGroup --location westus --sku Standard_LRS
```

### Configure TypeScript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook][compiler-options] for more information.

### Authenticate the client

In order to control permissions to the Key Vault service or to generate and restore backups of a specific Key Vault, you'll need to create either an instance of the `KeyVaultAccessControlClient` class or an instance of the `KeyVaultBackupClient` class, respectively.

In both cases, you'll need a **vault URL**, which you may see as "DNS Name" in the portal, and a credential object from the [@azure/identity][identity-npm] package which is used to authenticate with Azure Active Directory.

In the below example, we are using a **client secret credentials (client id, client secret, tenant id)**, but you can find more ways to authenticate with [Azure Identity][azure-identity]. To use the [DefaultAzureCredential][dac] provider shown below, or other credential providers provided with the Azure SDK, you should install the [@azure/identity][identity-npm] package:

```PowerShell
npm install @azure/identity
```

#### Create KeyVaultAccessControlClient

Once you've populated the **AZURE_CLIENT_ID**, **AZURE_CLIENT_SECRET** and **AZURE_TENANT_ID** environment variables and replaced **your-vault-url** with the above returned URI, you can create the `KeyVaultAccessControlClient`:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { KeyVaultAccessControlClient } = require("@azure/keyvault-admin");

const credentials = new DefaultAzureCredential();

const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
```

#### Create KeyVaultBackupClient

Once you've populated the **AZURE_CLIENT_ID**, **AZURE_CLIENT_SECRET** and **AZURE_TENANT_ID** environment variables and replaced **your-vault-url** with the above returned URI, you can create the `KeyVaultBackupClient`:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { KeyVaultBackupClient } = require("@azure/keyvault-admin");

const credentials = new DefaultAzureCredential();

const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
const client = new KeyVaultBackupClient(vaultUrl, credentials);
```

## Key concepts

### KeyVaultRoleDefinition

A Role Definition is a collection of permissions. A role definition defines the operations that can be performed, such as read, write, and delete. It can also define the operations that are excluded from allowed operations.

Role definitions can be listed and specified as part of a `KeyVaultRoleAssignment`.

### KeyVaultRoleAssignment.

A Role Assignment is the association of a Role Definition to a service principal. They can be created, listed, fetched individually, and deleted.

### KeyVaultAccessControlClient

A `KeyVaultAccessControlClient` provides operations allowing for management of Role Definitions (instances of `KeyVaultRoleDefinition`) and Role Assignments (instances of `KeyVaultRoleAssignment`).

### KeyVaultBackupClient

A `KeyVaultBackupClient` provides operations for performing full key backups, full key restores, and selective key restores.

### Long running operations

The operations done by the `KeyVaultBackupClient` may take as much time as needed by the Azure resources, requiring a client layer to keep track, serialize, and resume the operations through the lifecycle of the programs that wait for them to finish. This is done via a common abstraction through the package [@azure/core-lro][core-lro].

The `KeyVaultBackupClient` offers three methods that execute long running operations:

- `beginBackup`, starts generating a backup of an Azure Key Vault on the specified Storage Blob account.
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

- [KeyVault Administration Samples (JavaScript)](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin/samples/v4/javascript)
- [KeyVault Administration Samples (TypeScript)](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin/samples/v4/typescript)
- [KeyVault Administration Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin/test/)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fkeyvault%2Fkeyvault-admin%2FREADME.png)

<!-- LINKS -->

[dac]: https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/identity/Azure.Identity/README.md
[jwk]: https://tools.ietf.org/html/rfc7517
[access_control]: https://docs.microsoft.com/azure/key-vault/managed-hsm/access-control
[api-rest]: https://docs.microsoft.com/rest/api/keyvault/
[azure-cli]: https://docs.microsoft.com/cli/azure
[azure-identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[azure-sub]: https://azure.microsoft.com/free/
[backup_client]: ./src/KeyVaultBackupClient.cs
[best_practices]: https://docs.microsoft.com/azure/key-vault/managed-hsm/best-practices
[built_in_roles]: https://docs.microsoft.com/azure/key-vault/managed-hsm/built-in-roles
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[compiler-options]: https://www.typescriptlang.org/docs/handbook/compiler-options.html
[core-lro]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-lro
[docs-overview]: https://docs.microsoft.com/azure/key-vault/key-vault-overview
[docs-service]: https://azure.microsoft.com/services/key-vault/
[docs]: https://docs.microsoft.com/javascript/api/@azure/keyvault-admin

[dotenv]: https://www.npmjs.com/package/dotenv]
[identity-npm]: https://www.npmjs.com/package/@azure/identity
[keyvault_docs]: https://docs.microsoft.com/azure/key-vault/
[logging]: https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.ts.com/Azure/azure-sdk-for-net/blob/main/sdk/keyvault/Microsoft.Azure.KeyVault/CONTRIBUTING.md
[managedhsm]: https://docs.microsoft.com/azure/key-vault/managed-hsm/overview
[npm]: https://www.npmjs.com/
[package-gh]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin
[package-npm]: https://www.npmjs.com/package/@azure/keyvault-admin
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin/samples
[storage-account-create-cli]: https://docs.microsoft.com/azure/storage/common/storage-quickstart-create-account?tabs=azure-cli
[storage-account-create-portal]: https://docs.microsoft.com/azure/storage/common/storage-quickstart-create-account?tabs=azure-portal
[storage-account-create-ps]: https://docs.microsoft.com/azure/storage/common/storage-quickstart-create-account?tabs=azure-powershell

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-net%2Fsdk%2Ftables%2FAzure.Data.Tables%2FREADME.png)
