# Azure Key Vault Admin client library for JavaScript

Azure Key Vault is a service that allows you to encrypt authentication keys, storage account keys, data encryption keys, .pfx files, and passwords by using secured keys.
If you would like to know more about Azure Key Vault, you may want to review: [What is Azure Key Vault?](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-overview)

The package `@azure/keyvault-admin` provides support for the administrative Key Vault tasks. It includes the backup and restore operations for whole Key Vault instances, and the role-based access control (RBAC) operations.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-admin) | [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-admin) | [API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/keyvault-admin) | [Product documentation](https://azure.microsoft.com/en-us/services/key-vault/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-admin/samples)

## Getting started

### Install the package

Install the Azure Key Vault administration client library for JavaScript and TypeScript with [NPM][NPM]:

```PowerShell
npm install @azure/keyvault-admin
```

### Prerequisites

* An [Azure subscription][azure_sub].
* An existing Azure Key Vault. If you need to create an Azure Key Vault, you can use the [Azure CLI][azure_cli].

See the final two steps in the next section for details on creating the Key Vault with the Azure CLI.

### Authenticate the client

In order to control permissions to the Key Vault service, you'll need to create an instance of the `KeyVaultAccessControlClient` class.

You need a **vault URL**, which you may see as "DNS Name" in the portal,  and **client secret credentials (client id, client secret, tenant id)** to instantiate a client object.

Client secret credential authentication is being used in this getting started section but you can find more ways to authenticate with [Azure identity][azure_identity]. To use the [DefaultAzureCredential][DefaultAzureCredential] provider shown below, or other credential providers provided with the Azure SDK, you should install the `@azure/azure-admin` package:

```PowerShell
npm install @azure/identity
```

#### Create/Get credentials

Use the [Azure CLI][azure_cli] snippet below to create/get client secret credentials.

 * Create a service principal and configure its access to Azure resources:
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
* Take note of the service principal objectId
    ```PowerShell
    az ad sp show --id <appId> --query objectId
    ```
    Output:
    ```
    "<your-service-principal-object-id>"
    ```
* Use the returned credentials above to set  **AZURE_CLIENT_ID** (appId), **AZURE_CLIENT_SECRET** (password), and **AZURE_TENANT_ID** (tenant) 
environment variables. For example, you can use the [dotenv][dotenv] project and add a `.env` file to your project with hte following contents:
    ```PowerShell
    AZURE_TENANT_ID=<tenant-ID>
    AZURE_CLIENT_ID=<generated-app-ID>
    AZURE_CLIENT_SECRET=<random-password>
    ```

* Create the Key Vault and grant the above mentioned application authorization to perform administrative operations on the Azure Key Vault 
(replace `<your-resource-group-name>` and `<your-key-vault-name>` with your own, unique names and `<your-service-principal-object-id>` with the value from above):
    ```
    az keyvault create --hsm-name <your-key-vault-name> --resource-group <your-resource-group-name> --administrators <your-service-principal-object-id> --location <your-azure-location>
    ```

* Use the above mentioned Azure Key Vault name to retrieve details of your Vault which also contains your Azure Key Vault URL:
    ```PowerShell
    az keyvault show --hsm-name <your-key-vault-name>
    ```

---
TODO:
Also need to create storage account.
---

#### Create KeyVaultAccessControlClient
Once you've populated the **AZURE_CLIENT_ID**, **AZURE_CLIENT_SECRET** and **AZURE_TENANT_ID** environment variables and replaced **your-vault-url** 
with the above returned URI, you can create the [KeyVaultAccessControlClient][rbac_client]:

```C# Snippet:HelloCreateKeyVaultAccessControlClient
KeyVaultAccessControlClient client = new KeyVaultAccessControlClient(new Uri(keyVaultUrl), new DefaultAzureCredential());
```

#### Create KeyVaultBackupClient
Once you've populated the **AZURE_CLIENT_ID**, **AZURE_CLIENT_SECRET** and **AZURE_TENANT_ID** environment variables and replaced **your-vault-url** 
with the above returned URI, you can create the [KeyVaultBackupClient][backup_client]:

```C# Snippet:HelloCreateKeyVaultBackupClient
KeyVaultBackupClient client = new KeyVaultBackupClient(new Uri(keyVaultUrl), new DefaultAzureCredential());
```

## Key concepts

### KeyVaultRoleDefinition
A `KeyVaultRoleDefinition` is a collection of permissions. A role definition defines the operations that can be performed, such as read, write, 
and delete. It can also define the operations that are excluded from allowed operations.

KeyVaultRoleDefinitions can be listed and specified as part of a `KeyVaultRoleAssignment`.

### KeyVaultRoleAssignment. 
A `KeyVaultRoleAssignment` is the association of a KeyVaultRoleDefinition to a service principal. They can be created, listed, fetched individually, and deleted.

### KeyVaultAccessControlClient
A `KeyVaultAccessControlClient` provides both synchronous and asynchronous operations allowing for management of `KeyVaultRoleDefinition` and `KeyVaultRoleAssignment` objects.

### KeyVaultBackupClient

A `KeyVaultBackupClient` provides both synchronous and asynchronous operations for performing full key backups, full key restores, and selective key restores.

### BackupOperation

A `BackupOperation` represents a long running operation for a full key backup.

### RestoreOperation

A `RestoreOperation` represents a long running operation for both a full key and selective key restore.

## Examples
The Azure.Security.KeyVault.Administration package supports synchronous and asynchronous APIs.

The following section provides several code snippets using the `client` created above for either [access control](#create-keyvaultaccesscontrolclient) or [backup](#create-KeyVaultBackupClient) clients, covering some of the most common Azure Key Vault access control related tasks:

### Sync examples
- Access control
    - [Listing All Role Definitions](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_RbacHelloWorldSync.md#listing-all-role-definitions-sync)
    - [Listing All Role Assignments](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_RbacHelloWorldSync.md#listing-all-role-assignments)
    - [Creating a Role Assignment](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_RbacHelloWorldSync.md#creating-a-role-assignment)
    - [Getting a Role Assignment](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_RbacHelloWorldSync.md#getting-a-role-assignment)
    - [Deleting a Role Assignment](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_RbacHelloWorldSync.md#deleting-a-role-assignment)
- Backup and restore
    - [Performing a full key backup](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_BackupHelloWorldSync.md#performing-a-full-key-backup)
    - [Performing a full key restore](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_BackupHelloWorldSync.md#performing-a-full-key-restore)

### Async examples
- Access control
    - [Listing All Role Definitions](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_RbacHelloWorldAsync.md#listing-all-role-definitions-sync)
    - [Listing All Role Assignments](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_RbacHelloWorldAsync.md#listing-all-role-assignments)
    - [Creating a Role Assignment](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_RbacHelloWorldAsync.md#creating-a-role-assignment)
    - [Getting a Role Assignment](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_RbacHelloWorldAsync.md#getting-a-role-assignment)
    - [Deleting a Role Assignment](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_RbacHelloWorldAsync.md#deleting-a-role-assignment)
- Backup and restore
    - [Performing a full key backup](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_BackupHelloWorldAsync.md#performing-a-full-key-backup)
    - [Performing a full key restore](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples/Sample1_BackupHelloWorldAsync.md#performing-a-full-key-restore)

## Troubleshooting

When you interact with the Azure Key Vault administration library using the .NET SDK, errors returned by the service correspond to the same HTTP status codes returned for [REST API][keyvault_rest] requests.

For example, if you try to retrieve a role assignment that doesn't exist in your Azure Key Vault, a `404` error is returned, indicating "Not Found".

```C# Snippet:RoleAssignmentNotFound
try
{
    KeyVaultRoleAssignment roleAssignment = client.GetRoleAssignment(KeyVaultRoleScope.Global, "example-name");
}
catch (RequestFailedException ex)
{
    Console.WriteLine(ex.ToString());
}
```

```
Azure.RequestFailedException: Service request failed.
Status: 404 (Not Found)

Content:
{"error":{"code":"RoleAssignmentNotFound","message":"Requested role assignment not found (Activity ID: a67f09f4-b68e-11ea-bd6d-0242ac120006)"}}

Headers:
X-Content-Type-Options: REDACTED
x-ms-request-id: a67f09f4-b68e-11ea-bd6d-0242ac120006
Content-Length: 143
Content-Type: application/json
```

### Setting up console logging
The simplest way to see the logs is to enable the console logging.
To create an Azure SDK log listener that outputs messages to console use AzureEventSourceListener.CreateConsoleLogger method.

```
// Setup a listener to monitor logged events.
using AzureEventSourceListener listener = AzureEventSourceListener.CreateConsoleLogger();
```

To learn more about other logging mechanisms see [here][logging].

## Next steps

Get started with our [samples][admin_client_samples].

## Contributing

This project welcomes contributions and suggestions.  Most contributions require
you to agree to a Contributor License Agreement (CLA) declaring that you have
the right to, and actually do, grant us the rights to use your contribution. For
details, visit [cla.microsoft.com][cla].

This project has adopted the [Microsoft Open Source Code of Conduct][coc].
For more information see the [Code of Conduct FAQ][coc_faq]
or contact [opencode@microsoft.com][coc_contact] with any
additional questions or comments.

<!-- LINKS -->
[NPM]: https://www.npmjs.com/
[azure_sub]: https://azure.microsoft.com/free/
[azure_cli]: https://docs.microsoft.com/cli/azure
[rbac_client]: https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/src/KeyVaultAccessControlClient.cs
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[dotenv][https://www.npmjs.com/package/dotenv]

[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[backup_client]: https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Azure.Security.KeyVault.Administration/src/KeyVaultBackupClient.cs
[keyvault_docs]: https://docs.microsoft.com/azure/key-vault/
[keyvault_rest]: https://docs.microsoft.com/rest/api/keyvault/
[admin_client_nuget_package]: https://www.nuget.org/packages?q=Azure.Security.KeyVault.Administration
[admin_client_samples]: https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/keyvault/Azure.Security.KeyVault.Administration/samples
[admin_client_src]: https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/keyvault/Azure.Security.KeyVault.Administration/src
[JWK]: https://tools.ietf.org/html/rfc7517
[DefaultAzureCredential]: https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/identity/Azure.Identity/README.md
[logging]: https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/core/Azure.Core/samples/Diagnostics.md
[contributing]: https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/keyvault/Microsoft.Azure.KeyVault/CONTRIBUTING.md


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-net%2Fsdk%2Ftables%2FAzure.Data.Tables%2FREADME.png)

---

---

---

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
