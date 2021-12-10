## Azure Identity client library for JavaScript

The Azure Identity library provides [Azure Active Directory (Azure AD)](https://docs.microsoft.com/azure/active-directory/fundamentals/active-directory-whatis) token authentication through a set of convenient [TokenCredential](https://docs.microsoft.com/javascript/api/@azure/core-auth/tokencredential) implementations.

For examples of various credentials, see the [Azure Identity examples page](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md).

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity)
- [Package (npm)](https://www.npmjs.com/package/@azure/identity)
- [API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/identity)
- [Product documentation](https://azure.microsoft.com/services/active-directory/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/v2)

## Getting started

### Migrate from v1 to v2 of @azure/identity

If you're using v1 of `@azure/identity`, see the [migration guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/migration-v1-v2.md) to update to v2.

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
  - **Note:** If your application runs on Node.js v8 or lower and you cannot upgrade your Node.js version to latest stable version, then pin your `@azure/identity` dependency to version 1.1.0.
- Latest versions of Safari, Chrome, Edge, and Firefox.
  - **Note**: Among the different credentials exported in this library, `InteractiveBrowserCredential` is the only one that is supported in the browser.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Install the package

Install Azure Identity with `npm`:

```sh
npm install --save @azure/identity
```

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/).
- Optional: The [Azure CLI][azure_cli] and/or [Azure PowerShell][azure_powershell] can also be useful for authenticating in a development environment and managing account roles.

### When to use @azure/identity

The credential classes exposed by `@azure/identity` are focused on providing the most straightforward way to authenticate the Azure SDK clients locally, in your development environments, and in production. We aim for simplicity and reasonable support of the authentication protocols to cover most of the authentication scenarios possible on Azure. We're actively expanding to cover more scenarios. For a full list of the credentials offered, see the [Credential Classes](#credential-classes) section.

All credential types provided by `@azure/identity` are supported in Node.js. For browsers, `InteractiveBrowserCredential` is the credential type to be used for basic authentication scenarios.

Most of the credential types offered by `@azure/identity` use the [Microsoft Authentication Library for JavaScript (MSAL.js)](https://github.com/AzureAD/microsoft-authentication-library-for-js). Specifically, we use the v2 MSAL.js libraries, which use [OAuth 2.0 Authorization Code Flow with PKCE](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) and are [OpenID-compliant](https://docs.microsoft.com/azure/active-directory/develop/v2-protocols-oidc). While `@azure/identity` focuses on simplicity, the MSAL.js libraries, such as [@azure/msal-common](https://www.npmjs.com/package/@azure/msal-common), [@azure/msal-node](https://www.npmjs.com/package/@azure/msal-node), and [@azure/msal-browser](https://www.npmjs.com/package/@azure/msal-browser), are designed to provide robust support for the authentication protocols that Azure supports.

#### When to use something else

The `@azure/identity` credential types are implementations of [@azure/core-auth](https://www.npmjs.com/package/@azure/core-auth)'s `TokenCredential` class. In principle, any object with a `getToken` method that satisfies `getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>` will work as a `TokenCredential`. This means developers can write their own credential types to support authentication cases not covered by `@azure/identity`. To learn more, see [Custom Credentials](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#custom-credentials).

Though our credential types support many advanced cases, developers may want full control of the authentication protocol. For that use case, we recommend using [Microsoft Authentication Library for JavaScript (MSAL.js)](https://github.com/AzureAD/microsoft-authentication-library-for-js) directly. You can read more through the following links:

- We portray some advanced use cases of `@azure/identity` on the [Azure Identity Examples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md) page.
  - There, we specifically have an [Advanced Examples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#advanced-examples) section.
  - We also have a section that shows how to [Authenticate with MSAL directly](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-msal-directly).

For advanced authentication workflows in the browser, we have a section where we showcase how to use the [@azure/msal-browser](https://www.npmjs.com/package/@azure/msal-browser) library directly to authenticate Azure SDK clients.

### Authenticate the client in development environment

While we recommend using managed identity or service principal authentication in your production application, it is typical for a developer to use their own account for authenticating calls to Azure services when debugging and executing code locally. There are several developer tools which can be used to perform this authentication in your development environment.

#### Authenticating via the Azure CLI

Applications using the `AzureCliCredential`, whether directly or via the `DefaultAzureCredential`, can use the Azure CLI account to authenticate calls in the application when running locally.

To authenticate with the [Azure CLI][azure_cli] users can run the command `az login`. For users running on a system with a default web browser the Azure cli will launch the browser to authenticate the user.

![Azure CLI Account Sign In][azureclilogin_image]

For systems without a default web browser, the `az login` command will use the device code authentication flow. The user can also force the Azure CLI to use the device code flow rather than launching a browser by specifying the `--use-device-code` argument.

![Azure CLI Account Device Code Sign In][azureclilogindevicecode_image]

#### Authenticating via Azure PowerShell

Applications using the `AzurePowerShellCredential`, whether directly or via the `DefaultAzureCredential`, can use the account connected to Azure PowerShell to authenticate calls in the application when running locally.

To authenticate with [Azure PowerShell][azure_powershell] users can run the `Connect-AzAccount` cmdlet. By default, ike the Azure CLI, `Connect-AzAccount` will launch the default web browser to authenticate a user account.

![Azure PowerShell Account Sign In][azurepowershelllogin_image]

If interactive authentication cannot be supported in the session, then the `-UseDeviceAuthentication` argument will force the cmdlet to use a device code authentication flow instead, similar to the corresponding option in the Azure CLI credential.

#### Authenticate via Visual Studio Code

Developers using Visual Studio Code can use the [Azure Account extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account) to authenticate via the IDE. Apps using `DefaultAzureCredential` or `VisualStudioCodeCredential` can then use this account to authenticate calls in their app when running locally.

To authenticate in Visual Studio Code, first ensure the Azure Account extension is installed. Once the extension is installed, open the **Command Palette** and run the **Azure: Sign In** command.

Additionally, use the [`@azure/identity-vscode`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity-vscode) plugin package. This package provides the dependencies of `VisualStudioCodeCredential` and enables it. See [Plugins](##plugins).

### Authenticate the client in browsers

To authenticate Azure SDKs within web browsers, we currently offer the `InteractiveBrowserCredential`, which can be set to use redirection or popups to complete the authentication flow. It is necessary to [create an Azure App Registration](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the portal for your web application first.

## Key concepts

If this is your first time using `@azure/identity` or the Microsoft identity platform (Azure Active Directory), we recommend that you read [Using `@azure/identity` with Microsoft Identity Platform](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/using-azure-identity.md) first. This document will give you a deeper understanding of the platform and how to configure your Azure account correctly.

### Credentials

A credential is a class which contains or can obtain the data needed for a service client to authenticate requests. Service clients across Azure SDK accept credentials when they are constructed, and service clients use those credentials to authenticate requests to the service.

The Azure Identity library focuses on OAuth authentication with Azure Active directory, and it offers a variety of credential classes capable of acquiring an AAD token to authenticate service requests. All of the credential classes in this library are implementations of the [TokenCredential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-auth/src/tokenCredential.ts) abstract class, and any of them can be used by to construct service clients capable of authenticating with a TokenCredential.

See [Credential Classes](#credential-classes).

### DefaultAzureCredential

The `DefaultAzureCredential` is appropriate for most scenarios where the application is intended to ultimately be run in the Azure Cloud. This is because the `DefaultAzureCredential` combines credentials commonly used to authenticate when deployed with credentials used to authenticate in a development environment.

> Note: `DefaultAzureCredential` is intended to simplify getting started with the SDK by handling common scenarios with reasonable default behaviors. Developers who want more control or whose scenario isn't served by the default settings should use other credential types.

If used from Node.js, the `DefaultAzureCredential` will attempt to authenticate via the following mechanisms in order:

![DefaultAzureCredential authentication flow][defaultauthflow_image]

- Environment - The `DefaultAzureCredential` will read account information specified via [environment variables](#environment-variables) and use it to authenticate.
- Managed Identity - If the application is deployed to an Azure host with Managed Identity enabled, the `DefaultAzureCredential` will authenticate with that account.
- Visual Studio Code - If the developer has authenticated with the [Visual Studio Code Azure Account extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account), the `DefaultAzureCredential` will authenticate using that account.
- Azure CLI - If the developer has authenticated an account via the Azure CLI `az login` command, the `DefaultAzureCredential` will authenticate with that account.
- Azure PowerShell - If the developer has authenticated using the Azure PowerShell module `Connect-AzAccount` command, the `DefaultAzureCredential` will authenticate with that account.

## Plugins

Azure Identity for JavaScript provides a plugin API that allows us to provide certain functionality through separate _plugin packages_. The `@azure/identity` package exports a top-level function (`useIdentityPlugin`) that can be used to enable a plugin. We provide two plugin packages:

- [`@azure/identity-cache-persistence`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity-cache-persistence), which provides persistent token caching in Node.js using a native secure storage system provided by your operating system. This plugin allows cached `access_token` values to persist across sessions, meaning that an interactive login flow does not need to be repeated as long as a cached token is available.
- [`@azure/identity-vscode`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity-vscode), which provides the dependencies of `VisualStudioCodeCredential` and enables it. Without this plugin, the `VisualStudioCodeCredential` in this package will throw a `CredentialUnavailableError`. The plugin provides the underlying implementation of this credential, enabling it for use both on its own and as part of the `DefaultAzureCredential` described above.

## Environment Variables

`DefaultAzureCredential` and `EnvironmentCredential` can be configured with environment variables. Each type of authentication requires values for specific variables:

#### Service principal with secret

| variable name         | value                                                 |
| --------------------- | ----------------------------------------------------- |
| `AZURE_CLIENT_ID`     | id of an Azure Active Directory application           |
| `AZURE_TENANT_ID`     | id of the application's Azure Active Directory tenant |
| `AZURE_CLIENT_SECRET` | one of the application's client secrets               |

#### Service principal with certificate

| variable name                   | value                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------ |
| `AZURE_CLIENT_ID`               | id of an Azure Active Directory application                                                |
| `AZURE_TENANT_ID`               | id of the application's Azure Active Directory tenant                                      |
| `AZURE_CLIENT_CERTIFICATE_PATH` | path to a PEM-encoded certificate file including private key (without password protection) |

#### Username and password

| variable name     | value                                       |
| ----------------- | ------------------------------------------- |
| `AZURE_CLIENT_ID` | id of an Azure Active Directory application |
| `AZURE_USERNAME`  | a username (usually an email address)       |
| `AZURE_PASSWORD`  | that user's password                        |

Configuration is attempted in the above order. For example, if values for a client secret and certificate are both present, the client secret will be used.

## Examples

You can find more examples of using various credentials in [Azure Identity Examples Page](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md)

### Authenticating with the `DefaultAzureCredential`

This example demonstrates authenticating the `KeyClient` from the [@azure/keyvault-keys](https://www.npmjs.com/package/@azure/keyvault-keys) client library using the `DefaultAzureCredential`.

```javascript
// The default credential first checks environment variables for configuration as described above.
// If environment configuration is incomplete, it will try managed identity.

// Azure Key Vault service to use
const { KeyClient } = require("@azure/keyvault-keys");

// Azure authentication library to access Azure Key Vault
const { DefaultAzureCredential } = require("@azure/identity");

// Azure SDK clients accept the credential as a parameter
const credential = new DefaultAzureCredential();

// Create authenticated client
const client = new KeyClient(vaultUrl, credential);
```

### Specifying a user assigned managed identity with the `DefaultAzureCredential`

A relatively common scenario involves authenticating using a user assigned managed identity for an Azure resource. Explore the [example on Authenticating a user assigned managed identity with DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-assigned-managed-identity-with-defaultazurecredential) to see how this is made a relatively straightforward task that can be configured using environment variables or in code.

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

## Managed Identity Support

The [Managed identity authentication](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview) is supported via either the `DefaultAzureCredential` or the `ManagedIdentityCredential` credential classes directly for the following Azure hosts:

- [Azure Virtual Machines](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/how-to-use-vm-token)
- [Azure App Service](https://docs.microsoft.com/azure/app-service/overview-managed-identity)
- [Azure Kubernetes Service](https://docs.microsoft.com/azure/aks/use-managed-identity)
- [Azure Cloud Shell](https://docs.microsoft.com/azure/cloud-shell/msi-authorization)
- [Azure Arc](https://docs.microsoft.com/azure/azure-arc/servers/managed-identity-authentication)
- [Azure Service Fabric](https://docs.microsoft.com/azure/service-fabric/concepts-managed-identity)

For examples of how to use managed identity for authentication please refer to [the examples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-in-azure-with-managed-identity)

## Cloud configuration

Credentials default to authenticating to the Azure AD endpoint for Azure Public Cloud. To access resources in other clouds, such as Azure Government or a private cloud, configure credentials with the `authorityHost` argument in the constructor. The `AzureAuthorityHosts` interface defines authorities for well-known clouds. For the US Government cloud, you could instantiate a credential this way:

```ts
import { AzureAuthorityHosts, ClientSecretCredential } from "@azure/identity";
const credential = new ClientSecretCredential(
  "<YOUR_TENANT_ID>",
  "<YOUR_CLIENT_ID>",
  "<YOUR_CLIENT_SECRET>",
  {
    authorityHost: AzureAuthorityHosts.AzureGovernment
  }
);
```

Not all credentials require this configuration. Credentials that authenticate through a development tool, such as `AzureCliCredential`, use that tool's configuration. Similarly, `VisualStudioCodeCredential` accepts an `authorityHost` argument but defaults to the `authorityHost` matching Visual Studio Code's **Azure: Cloud** setting.

## Credential Classes

### Authenticating Azure Hosted Applications

| credential                  | usage                                                                                                            | example                                                                                                                                                                               |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DefaultAzureCredential`    | Provides a simplified authentication experience to quickly start developing applications run in the Azure cloud. | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-defaultazurecredential)                      |
| `ChainedTokenCredential`    | Allows users to define custom authentication flows composing multiple credentials.                               | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#chaining-credentials)                                            |
| `EnvironmentCredential`     | Authenticates a service principal or user via credential information specified in environment variables.         | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-service-principal-with-environment-credentials) |
| `ManagedIdentityCredential` | Authenticates the managed identity of an Azure resource.                                                         | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-in-azure-with-managed-identity)                   |

### Authenticating Service Principals

| credential                    | usage                                                  | example                                                                                                                                                                            | reference                                                                                                                        |
| ----------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `ClientSecretCredential`      | Authenticates a service principal using a secret.      | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-service-principal-with-a-client-secret)      | [Service principal authentication](https://docs.microsoft.com/azure/active-directory/develop/app-objects-and-service-principals) |
| `ClientCertificateCredential` | Authenticates a service principal using a certificate. | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-service-principal-with-a-client-certificate) | [Service principal authentication](https://docs.microsoft.com/azure/active-directory/develop/app-objects-and-service-principals) |

### Authenticating Users

| credential                     | usage                                                                                                                                                                                                                     | example                                                                                                                                                                          | reference                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `InteractiveBrowserCredential` | Interactively authenticates a user with the default system browser. Read more about how this happens [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/interactive-browser-credential.md). | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-interactively-in-the-browser) | [OAuth2 authentication code](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) |
| `DeviceCodeCredential`         | Interactively authenticates a user on devices with limited UI.                                                                                                                                                            | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-with-device-code-flow)        | [Device code authentication](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-device-code)    |
| `UsernamePasswordCredential`   | Authenticates a user with a username and password.                                                                                                                                                                        | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-with-username-and-password)   | [Username + password authentication](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth-ropc)    |
| `AuthorizationCodeCredential`  | Authenticate a user with a previously obtained authorization code.                                                                                                                                                        | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-with-auth-code-flow)          | [OAuth2 authentication code](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) |

### Authenticating via Development Tools

| credential                  | usage                                                             | example                                                                                                                                                                   | reference                                                                                           |
| --------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `AzureCliCredential`        | Authenticate in a development environment with the Azure CLI.     | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-with-azure-cli)        | [Azure CLI authentication](https://docs.microsoft.com/cli/azure/authenticate-azure-cli)             |
| `AzurePowerShellCredential` | Authenticate in a development environment using Azure PowerShell. | [example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-with-azure-powershell) | [Azure PowerShell authentication](https://docs.microsoft.com/powershell/azure/authenticate-azureps) |

## Troubleshooting

### Error Handling

Credentials raise `AuthenticationError` when they fail to authenticate. This class has a `message` field which describes why authentication failed. An `AggregateAuthenticationError` will be raised by `ChainedTokenCredential` with an `errors` field containing an array of errors from each credential in the chain.

### Logging

Enabling logging may help uncover useful information about failures. To see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. You can read this environment variable from the *.env* file by explicitly specifying a file path:

```javascript
require("dotenv").config({ path: ".env" });
```

Alternatively, logging can be enabled at runtime by calling `setLogLevel` from the `@azure/logger` package:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For assistance with troubleshooting, see the [troubleshooting guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/Troubleshooting.md).

## Next steps

### Read the documentation

API documentation for this library can be found on our [documentation site](https://docs.microsoft.com/javascript/api/@azure/identity).

### Client library support

Client and management libraries listed on the [Azure SDK releases page](https://azure.github.io/azure-sdk/releases/latest/js.html) that support Azure AD authentication accept credentials from this library. Learn more about using these libraries in their documentation, which is linked from the releases page.

### Known Issues

#### Azure AD B2C support

This library does not support the [Azure AD B2C](https://docs.microsoft.com/azure/active-directory-b2c/overview) service.

### Provide Feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

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
[azure_powershell]: https://docs.microsoft.com/powershell/azure/
[azureclilogin_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/identity/identity/images/AzureCliLogin.png
[azureclilogindevicecode_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/identity/identity/images/AzureCliLoginDeviceCode.png
[azurepowershelllogin_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/identity/identity/images/AzurePowerShellLogin.png
[defaultauthflow_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/identity/identity/images/DefaultAzureCredentialAuthenticationFlow.png

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fidentity%2Fidentity%2FREADME.png)
