## Azure Identity client library for JavaScript

This library simplifies authentication against Azure Active Directory for Azure SDK libraries.
It provides a set of `TokenCredential` implementations which can be passed into SDK libraries
to authenticate API requests. It supports token authentication using an Azure Active Directory [service principal](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli) or [managed identity](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview).

## Getting started

### Prerequisites

- Node.js 8 LTS or higher
- An Azure subscription.
    - You can sign up for a [free account](https://azure.microsoft.com/free/).
- The [Azure CLI][azure_cli] can also be useful for authenticating in a development environment, creating accounts, and managing account roles.

#### Authenticating via Visual Studio Code

Developers using Visual Studio Code can use the [Azure Account Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account), to authenticate via the IDE. Applications using the `DefaultAzureCredential` or the `VisualStudioCodeCredential` can then use this account to authenticate calls in their application when running locally.

To authenticate in Visual Studio Code, first ensure the [Azure Account Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account) is installed. Once the extension is installed, press `F1` to open the command palette and run the `Azure: Sign In` command.

![Visual Studio Code Account Sign In][VsCodeLoginCommand_image]

#### Authenticating via the Azure CLI

Applications using the `AzureCliCredential`, rather directly or via the `DefaultAzureCredential`, can use the Azure CLI account to authenticate calls in the application when running locally.

To authenticate with the [Azure CLI][azure_cli] users can run the command `az login`. For users running on a system with a default web browser the azure cli will launch the browser to authenticate the user.

![Azure CLI Account Sign In][AzureCliLogin_image]

For systems without a default web browser, the `az login` command will use the device code authentication flow. The user can also force the Azure ClI to use the device code flow rather than launching a browser by specifying the `--use-device-code` argument.

![Azure CLI Account Device Code Sign In][AzureCliLoginDeviceCode_image]

### Install the package

Install Azure Identity with `npm`:

```sh
npm install --save @azure/identity
```

## Key concepts

If this is your first time using `@azure/identity` or the Microsoft identity platform (Azure Active Directory), we recommend that you read [Using `@azure/identity` with Microsoft Identity Platform](https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/using-azure-identity.md) first. This document will give you a deeper understanding of the platform and how to configure your Azure account correctly.

### Credentials

A credential is a class which contains or can obtain the data needed for a service client to authenticate requests. Service clients across Azure SDK accept credentials when they are constructed, and service clients use those credentials to authenticate requests to the service.

The Azure Identity library focuses on OAuth authentication with Azure Active directory, and it offers a variety of credential classes capable of acquiring an AAD token to authenticate service requests. All of the credential classes in this library are implementations of the [TokenCredential](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/core/core-auth/src/tokenCredential.ts) abstract class, and any of them can be used by to construct service clients capable of authenticating with a TokenCredential.

See [Credential Classes](#credential-classes).

### DefaultAzureCredential

The `DefaultAzureCredential` is appropriate for most scenarios where the application is intended to ultimately be run in the Azure Cloud. This is because the `DefaultAzureCredential` combines credentials commonly used to authenticate when deployed, with credentials used to authenticate in a development environment. The `DefaultAzureCredential` will attempt to authenticate via the following mechanisms in order.

![DefaultAzureCredential authentication flow][DefaultAuthFlow_image]

- Environment - The `DefaultAzureCredential` will read account information specified via [environment variables](#Environment-variables) and use it to authenticate.
- Managed Identity - If the application is deployed to an Azure host with Managed Identity enabled, the `DefaultAzureCredential` will authenticate with that account.
- Visual Studio Code - If the developer has authenticated via the Visual Studio Code Azure Account plugin, the `DefaultAzureCredential` will authenticate with that account.
- Azure CLI - If the developer has authenticated an account via the Azure CLI `az login` command, the `DefaultAzureCredential` will authenticate with that account.

### Environment variables

`DefaultAzureCredential` and `EnvironmentCredential` are configured for service principal authentication with these environment variables:

| variable name                   | value                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `AZURE_CLIENT_ID`               | service principal's app id                                                                           |
| `AZURE_TENANT_ID`               | id of the principal's Azure Active Directory tenant                                                  |
| `AZURE_CLIENT_SECRET`           | one of the service principal's client secrets (implies `ClientSecretCredential`)                     |
| `AZURE_CLIENT_CERTIFICATE_PATH` | path to a PEM-encoded certificate file including private key (implies `ClientCertificateCredential`) |
| `AZURE_USERNAME`                | the username of a user in the tenant (implies `UsernamePasswordCredential`)                          |
| `AZURE_PASSWORD`                | the password of the user specified in `AZURE_USERNAME`                                               |

## Examples

### Authenticating with the `DefaultAzureCredential`

This example demonstrates authenticating the `KeyClient` from the [@azure/keyvault-keys](https://www.npmjs.com/package/@azure/keyvault-keys) client library using the `DefaultAzureCredential`.

```javascript
// The default credential first checks environment variables for configuration as described above.
// If environment configuration is incomplete, it will try managed identity.
const { KeyClient } = require("@azure/keyvault-keys");
const { DefaultAzureCredential } = require("@azure/identity");

// Azure SDK clients accept the credential as a parameter
const credential = new DefaultAzureCredential();
const client = new KeyClient(vaultUrl, credential);
const getResult = await client.getKey("MyKeyName");
```

### Specifying a user assigned managed identity with the `DefaultAzureCredential`

Many Azure hosts allow the assignment of a user assigned managed identity. This example demonstrates configuring the `DefaultAzureCredential` to authenticate a user assigned identity when deployed to an azure host. It then authenticates a `KeyClient` from the [@azure/keyvault-keys](https://www.npmjs.com/package/@azure/keyvault-keys) client library with credential.

```ts
const { KeyClient } = require("@azure/keyvault-keys");
const { DefaultAzureCredential } = require("@azure/identity");

// when deployed to an azure host the default azure credential will authenticate the specified user assigned managed identity
var credential = new DefaultAzureCredential({ managedIdentityClientId: userAssignedClientId });

const client = new KeyClient(vaultUrl, credential);
```

### Define a custom authentication flow with the `ChainedTokenCredential`

While the `DefaultAzureCredential` is generally the quickest way to get started developing applications for Azure, more advanced users may want to customize the credentials considered when authenticating. The `ChainedTokenCredential` enables users to combine multiple credential instances to define a customized chain of credentials. This example demonstrates creating a `ChainedTokenCredential` which will attempt to authenticate using two differently configured instances of `ClientSecretCredential`, to then authenticate the `KeyClient` from the [@azure/keyvault-keys](https://www.npmjs.com/package/@azure/keyvault-keys):

```javascript
const { ClientSecretCredential, ChainedTokenCredential } = require("@azure/identity");

// When an access token is requested, the chain will try each
// credential in order, stopping when one provides a token
const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);

// The chain can be used anywhere a credential is required
const { KeyClient } = require("@azure/keyvault-keys");
const client = new KeyClient(vaultUrl, credentialChain);
```

## Credential Classes

### Authenticating Azure Hosted Applications

|credential  | usage
|-|-
|`DefaultAzureCredential`|provides a simplified authentication experience to quickly start developing applications run in the Azure cloud
|`ChainedTokenCredential`|allows users to define custom authentication flows composing multiple credentials
|`EnvironmentCredential`|authenticates a service principal or user via credential information specified in environment variables
|`ManagedIdentityCredential`|authenticates the managed identity of an azure resource

### Authenticating Service Principals

|credential  | usage
|-|-
|`ClientSecretCredential`|authenticates a service principal using a secret
|`ClientCertificateCredential`|authenticates a service principal using a certificate

### Authenticating Users

|credential  | usage
|-|-
|`InteractiveBrowserCredential`|interactively authenticates a user with the default system browser
|`DeviceCodeCredential`|interactively authenticates a user on devices with limited UI
|`UserPasswordCredential`|authenticates a user with a username and password
|`AuthorizationCodeCredential`|authenticate a user with a previously obtained authorization code

### Authenticating via Development Tools


|credential  | usage
|-|-
|`AzureCliCredential`|authenticate in a development environment with the Azure CLI
|`VisualStudioCodeCredential`|authenticate in a development environment with Visual Studio Code

## Troubleshooting

### Error Handling

Credentials raise `AuthenticationError` when they fail to authenticate. This class has a `message` field which describes why authentication failed. An `AggregateAuthenticationError` will be raised by `ChainedTokenCredential` with an `errors` field containing an array of errors from each credential in the chain.

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

### Client libraries supporting authentication with Azure Identity

Currently, the following client libraries support authenticating with `TokenCredential` and the Azure Identity library. You can learn more about their use, and find additional documentation on use of these client libraries along samples with can be found in the links below.

- [@azure/event-hubs](http://npmjs.com/package/@azure/event-hubs)
- [@azure/keyvault-keys](http://npmjs.com/package/@azure/keyvault-keys)
- [@azure/keyvault-secrets](http://npmjs.com/package/@azure/keyvault-secrets)
- [@azure/keyvault-certificates](http://npmjs.com/package/@azure/keyvault-certificates)
- [@azure/storage-blob](http://npmjs.com/package/@azure/storage-blob)
- [@azure/storage-queue](http://npmjs.com/package/@azure/storage-queue)

### Read the documentation

API documentation for this library can be found on our [documentation site](https://docs.microsoft.com/javascript/api/@azure/identity).

### Provide Feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

[1]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/defaultazurecredential.html
[2]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/managedidentitycredential.html
[3]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/environmentcredential.html
[4]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/clientsecretcredential.html
[5]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/clientcertificatecredential.html
[6]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/devicecodecredential.html
[7]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/authorizationcodecredential.html
[8]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/interactivebrowsercredential.html
[9]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/usernamepasswordcredential.html
[azure_cli]: https://docs.microsoft.com/cli/azure
[VsCodeLoginCommand_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/sdk/identity/identity/images/VsCodeLoginCommand.png
[AzureCliLogin_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/sdk/identity/identity/images/AzureCliLogin.png
[AzureCliLoginDeviceCode_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/sdk/identity/identity/images/AzureCliLoginDeviceCode.png
[DefaultAuthFlow_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/sdk/identity/identity/images/DefaultAzureCredentialAuthenticationFlow.png

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fidentity%2Fidentity%2FREADME.png)
