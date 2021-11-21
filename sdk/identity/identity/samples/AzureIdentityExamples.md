# Table of contents

- [Introduction](#introduction)
- [Authenticating client-side browser applications](#authenticating-client-side-browser-applications)
- [Authenticating server-side applications](#authenticating-server-side-applications)
  - [Authenticating User Accounts](#authenticating-user-accounts)
  - [Authenticating User Accounts with developer tools](#authenticating-user-accounts-with-developer-tools)
  - [Authenticating Service Principals](#authenticating-service-principals)
  - [Authenticating Azure Hosted Applications](#authenticating-azure-hosted-applications)
- [Chaining credentials](#chaining-credentials)
- [Authenticating With Azure Stack using Azure Identity](#authenticating-with-azure-stack-using-azure-identity)
- [Advanced Examples](#advanced-examples)
  - [Custom Credentials](#custom-credentials)
  - [Implementing the TokenCredential Interface](#implementing-the-tokencredential-interface).
  - [Authenticating with a pre-fetched access token](#authenticating-with-a-pre-fetched-access-token).
  - [Authenticating with MSAL directly](#authenticating-with-msal-directly).
    - [Authenticating with the @azure/msal-node Confidential Client](#authenticating-with-the-@azure/msal-node-confidential-client).
    - [Authenticating with the @azure/msal-browser Public Client](#authenticating-with-the-@azure/msal-browser-public-client).
  - [Authenticating with Key Vault Certificates](#authenticating-with-key-vault-certificates)
  - [Rolling Certificates](#rolling-certificates)
  - [Authenticate on behalf of](#authenticate-on-behalf-of)
  - [Control user interaction](#control-user-interaction)
  - [Persist user authentication data](#persist-user-authentication-data)
    - [Persist the token cache](#persist-the-token-cache)
    - [Use a named token cache](#use-a-named-token-cache)
    - [Persist the authentication record](#persist-the-authentication-record)
    - [Silent authentication with authentication record and token cache persistence options](#silent-authentication-with-authentication-record-and-token-cache-persistence-options)
    - [Allow unencrypted storage](#allow-unencrypted-storage)
  - [Authenticate national clouds](#authenticate-national-clouds)

## Introduction

Authenticating your application, users, and principals is an integral part of working with the Azure client libraries. The Azure Identity library provides multiple ways to gain access to the Azure services, each with a flexible configuration that covers most scenarios. There is sample code in [JavaScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity/samples/javascript) and [TypeScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity/samples/typescript) to cover the basic authentication scenarios. This document covers several use cases of Identity with greater context and links to the underlying authentication flows and other available documentation.

## Authenticating client-side browser applications

For client-side applications running in the browser, the `InteractiveBrowserCredential` provides the most direct user authentication experience. It's the only credential type that we support in the browser. To get started, register your application in the Microsoft Identity platform and set the proper permissions.

- [Register a single page application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the Microsoft identity platform
- Configure the app registration with a redirect URI to specify where the Microsoft identity platform should redirect the client along with any security tokens.
  - If using v1 of `@azure/identity` package, follow the instructions at [Redirect URI: MSAL.js 1.0 with implicit flow](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-10-with-implicit-flow) to set the redirect URI.
  - If using v2 of `@azure/identity` package, follow the instructions at [Redirect URI: MSAL.js 2.0 with auth code flow](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-20-with-auth-code-flow)
- Ensure that your application has the correct permission for the APIs it intends to use.
  - In your app registration in the Azure portal, go to `API Permissions`
  - Click on `Add a permission`
  - Select the API you want to use. For example, if you're using any of our management/control plane packages (the ones whose name starts with `@azure/arm-`), you should select **Azure Service Management**.
- Ensure that your AAD Application has enabled public authentication flows:
  - Go to Azure Active Directory in the Azure portal and find your app registration.
  - Navigate to the **Authentication** section.
  - Under **Advanced settings**, select **yes** on the option **Allow public client flows**.

Copy the client ID and tenant ID from the **Overview** section of your app registration in the Azure portal and use it in the below code snippet where we authenticate a `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] using the `InteractiveBrowserCredential`.

```ts
function withInteractiveBrowserCredential() {
  const credential = new InteractiveBrowserCredential({
    tenantId: "<YOUR_TENANT_ID>",
    clientId: "<YOUR_CLIENT_ID>"
  });

  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

If your project is already using MSAL to authenticate on the browser, or if you're looking for more advanced authentication scenarios in the browser, the Azure SDK makes it easy to use MSAL directly to authenticate our clients: [Authenticating with the @azure/msal-browser Public Client](#authenticating-with-the-@azure/msal-browser-public-client).

## Authenticating server-side applications

For server-side applications, we provide options that vary from a minimal configuration with sensible defaults using the `DefaultAzureCredential` to more specialized credentials.

- To get started, you can always rely on interactive authentication of your user account, which requires minimal setup.
- As you develop your application, you may want to sign in using the developer tools like Azure CLI or Azure PowerShell, to avoid signing in interactively every time you run your application.
- As you deploy your application to Azure App Service or run it in a virtual machine, you may want to use [Managed Identity](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview).

We also provide a way to chain multiple credentials so that they try to authenticate sequentially until one of them succeeds. Chaining credentials will allow your code to work in multiple environments, including your local development tools. For more information, go to the section: [Chaining credentials](#chaining-credentials).

One such chained credential that we provide out of the box is `DefaultAzureCredential`.

### Authenticating User Accounts

Authenticating user accounts is the easiest way to get started with minimal set up. For production scenarios, we recommend authenticating using service principals or managed identities, which are listed in the later sections.

| Credential with example                                                                     | Usage                                                                                                                   | Setup required                                                   |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [InteractiveBrowserCredential](#authenticating-a-user-account-interactively-in-the-browser) | Interactively authenticates a user with the default system browser.                                                     | None                                                             |
| [DeviceCodeCredential](#authenticating-a-user-account-with-device-code-flow)                | Interactively authenticates a user by having user post the provided code in the given url on same or different machine. | None                                                             |
| [AuthorizationCodeCredential](#authenticating-a-user-account-with-auth-code-flow)           | Authenticate a user with a previously obtained authorization.                                                           | Yes, please see the linked example.                              |
| [UsernamePasswordCredential](#authenticating-a-user-account-with-username-and-password)     | Authenticates a user with a username and password.                                                                      | [Application Registration][quickstart-register-app] is required. |

### Authenticating User Accounts with developer tools

| Credential with example                                                           | Usage                                                                                                                                                                                                                                                                                                                  | Setup                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AzureCliCredential](#authenticating-a-user-account-with-azure-cli)               | Authenticate in a development environment with the Azure CLI.                                                                                                                                                                                                                                                          | [Install Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli) and [login using az cli command](https://docs.microsoft.com/cli/azure/authenticate-azure-cli)                                |
| [AzurePowerShellCredential](#authenticating-a-user-account-with-azure-powershell) | Authenticate in a development environment with Azure PowerShell.                                                                                                                                                                                                                                                       | [Install Azure PowerShell](https://docs.microsoft.com/powershell/azure/install-az-ps) and [login using the `Connect-AzAccount` cmdlet](https://docs.microsoft.com/powershell/azure/authenticate-azureps) |
| [DefaultAzureCredential](#authenticating-with-defaultazurecredential)             | Tries `AzureCliCredential`, `AzurePowerShellCredential`, and other credentials sequentially until one of them succeeds. Use this to have your application authenticate using developer tools, service principals or managed identity based on what is available in the current environment without changing your code. |

### Authenticating Service Principals

An Azure service principal is an identity created for use with applications, hosted services, and automated tools to access Azure resources. The roles assigned by the service principal will determine what resources are accessible. For security reasons, use service principals through automation rather than allowing them to log in with a user identity.

To learn more, read [Application and service principal objects in Azure Active Directory][app-register-service-principal]

**Setup**:

- [Application registration][quickstart-register-app]
- [Create a Service Principal with the Azure CLI][service_principal_azure_cli] or [Create an Azure service principal with Azure PowerShell][service_principal_azure_powershell]

| Credential with example                                                                      | Usage                                                                                                                                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ClientSecretCredential](#authenticating-a-service-principal-with-a-client-secret)           | Authenticates a service principal using a secret.                                                                                                                                                                                                                                                                                               |
| [ClientCertificateCredential](#authenticating-a-service-principal-with-a-client-certificate) | Authenticates a service principal using a certificate.                                                                                                                                                                                                                                                                                          |
| [EnvironmentCredential](#authenticating-a-service-principal-with-environment-credentials)    | Authenticates a service principal or user via credential information specified in environment variables.                                                                                                                                                                                                                                        |
| [DefaultAzureCredential](#authenticating-with-defaultazurecredential)                        | Tries `EnvironmentCredential`, `AzureCliCredential`, `AzurePowerShellCredential`, and other credentials sequentially until one of them succeeds. Use this to have your application authenticate using developer tools, service principals, or managed identity based on what's available in the current environment without changing your code. |

### Authenticating Azure Hosted Applications

If your application is hosted in Azure, you can make use of [Managed Identity](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview) for hassle free authentication in your production environments.

| Credential with example                                                     | Usage                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ManagedIdentityCredential](#authenticating-in-azure-with-managed-identity) | Authenticate in a virtual machine, App Service, Functions app, Cloud Shell, or AKS environment on Azure, with system-assigned managed identity, user-assigned managed identity, or app registration (when working with AKS pod identity).                                                                                                                                    |
| [DefaultAzureCredential](#authenticating-with-defaultazurecredential)       | Tries `EnvironmentCredential`, `ManagedIdentityCredential`, `AzureCliCredential`, `AzurePowerShellCredential`, and other credentials sequentially until one of them succeeds. Use this to have your application authenticate using developer tools, service principals or managed identity based on what is available in the current environment without changing your code. |

### Examples

#### Authenticating with `DefaultAzureCredential`

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `DefaultAzureCredential`. There's also [a runnable sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/typescript/src/defaultAzureCredential.ts) to create a Key Vault key client you can copy-paste. The `DefaultAzureCredential` makes for a terrific starting point as it provides sane defaults with minimal configuration and chains multiple credentials together. While you may outgrow it eventually, it is a sensible first choice for most scenarios where the application is intended to ultimately be run in the Azure Cloud.

```ts
/**
 * The default credential first checks environment variables for configuration.
 * If the environment configuration is incomplete, it will try managed identity.
 */
function withDefaultAzureCredential() {
  const credential = new DefaultAzureCredential();
  const client = new SecretClient(`https://key-vault-name.vault.azure.net`, credential);
}
```

#### Authenticating a user-assigned managed identity with `DefaultAzureCredential`

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `DefaultAzureCredential`, deployed to an Azure resource with a user-assigned managed identity configured.

For more information about configuring a user-assigned managed identity for an Azure resource, refer to [What are managed identities for Azure resources][azure_managed_identities].

```ts
/**
 * The default credential will use the user-assigned managed identity with the specified client ID.
 */
function withDefaultAzureCredential() {
  // Alternatively, you may set the environment variable AZURE_CLIENT_ID="<MANAGED_IDENTITY_CLIENT_ID>" and omit the `managedIdentityClientId`
  // option when using `DefaultAzureCredential` - the two approaches are equivalent.
  const credential = new DefaultAzureCredential({
    managedIdentityClientId: "<MANAGED_IDENTITY_CLIENT_ID>"
  });
  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

#### Authenticating a user account interactively in the browser

For clients with a default browser available and client-side applications running in the browser, the `InteractiveBrowserCredential` provides the most direct user authentication experience. In the sample below, an application authenticates a `SecretClient` from the [@azure/service-bus][service_bus_client_library] using the `InteractiveBrowserCredential`.

For Node.js, if a `clientId` is provided, the Azure Active Directory application will need to be configured to have a "Mobile and desktop applications" redirect endpoint. Follow our guide on [setting up Redirect URIs for Desktop apps that calls to web APIs](https://docs.microsoft.com/azure/active-directory/develop/scenario-desktop-app-registration#redirect-uris).

For client-side applications running in the browser, the `InteractiveBrowserCredential` is the only credential type that is supported. For more information, see [Authenticating client-side browser applications](#authenticating-client-side-browser-applications).

```ts
function withInteractiveBrowserCredential() {
  const credential = new InteractiveBrowserCredential({
    tenantId: "<YOUR_TENANT_ID>",
    clientId: "<YOUR_CLIENT_ID>"
  });
  const client = new ServiceBusClient("<your-service-bus-endpoint>", credential);
}
```

#### Authenticating a service principal with a client secret

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `ClientSecretCredential`. There's also [a runnable sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/typescript/src/clientSecretCredential.ts) to create a Key Vault key client you can copy-paste.

You'll need to:

- [Create an application registration][quickstart-register-app]
- [Create a Service Principal with the Azure CLI][service_principal_azure_cli] or [Create an Azure service principal with Azure PowerShell][service_principal_azure_powershell]

To learn more about service principals, see [Application and service principal objects in Azure Active Directory][app-register-service-principal].

In the following sample, an application authenticates a `SecretClient` from the [@azure/service-bus][service_bus_client_library] using the `ClientSecretCredential`:

```ts
/**
 *  Authenticate with client secret.
 */
function withClientSecretCredential() {
  const credential = new ClientSecretCredential(
    "<YOUR_TENANT_ID>",
    "<YOUR_CLIENT_ID>",
    "<YOUR_CLIENT_SECRET>"
  );
  const client = new ServiceBusClient("<your-service-bus-endpoint>", credential);
}
```

#### Authenticating a service principal with environment credentials

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `EnvironmentCredential`. The `EnvironmentCredential`:

- Looks for well-known environment variable names to determine how it should authenticate.
- Acts as a wrapper for the `ClientSecretCredential`, `ClientCertificateCredential`, or `UsernamePasswordCredential`, depending on which environment variables are present.

You'll need to:

- [Create an application registration][quickstart-register-app]
- [Create a Service Principal with the Azure CLI][service_principal_azure_cli] or [Create an Azure service principal with Azure PowerShell][service_principal_azure_powershell]
- Provide the environment variables:
  - `AZURE_TENANT_ID`, containing the AD tenant ID or name.
  - `AZURE_CLIENT_ID`, containing the ID of the user/service principal to authenticate as.
  - `AZURE_CLIENT_SECRET`, containing a client secret created belonging to the same user/service principal.

To learn more about service principals, see [Application and service principal objects in Azure Active Directory][app-register-service-principal].

```ts
/**
 *  Authenticate using the AZURE_TENANT_ID, AZURE_CLIENT_ID, and AZURE_CLIENT_SECRET environment variables.
 */
function withEnvironmentCredential() {
  let credential = new EnvironmentCredential();
  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

#### Authenticating a service principal with a client certificate

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `ClientCertificateCredential`.

You'll need to:

- [Create an application registration][quickstart-register-app]
- [Create a Service Principal with the Azure CLI][service_principal_azure_cli] or [Create an Azure service principal with Azure PowerShell][service_principal_azure_powershell]

To learn more about service principals, see [Application and service principal objects in Azure Active Directory][app-register-service-principal].

```ts
/**
 *  Authenticate with a client certificate.
 */
function withClientCertificateCredential() {
  let credential = new ClientCertificateCredential(
    "<YOUR_TENANT_ID>",
    "<YOUR_CLIENT_ID>",
    "<PATH_TO_CERTIFICATE>"
  );
  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

#### Authenticating a user account with device code flow

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `DeviceCodeCredential`. The `DeviceCodeCredential` offers a credential that can be used with little to no setup. The user can use the browser of their choice to complete the authentication process.

To authenticate a user through device code flow, complete the following steps:

1. Go to Azure Active Directory in Azure portal and find your app registration.
2. Navigate to the **Authentication** section.
3. Under **Advanced settings**, select `yes` on the option `Allow public client flows`.

You also need to be the administrator of your tenant to grant consent to your application when you log in for the first time.

If you can't configure the device code flow option on your Active Directory, it may require your app to be multi-tenant. To make your app multi-tenant:

1. Navigate to the **Authentication** panel.
2. Select **Accounts in any organizational directory**.
3. Select **yes** for **Treat application as Public Client**.

```ts
/**
 *  Authenticate with a device code.
 */
function withDeviceCodeCredential() {
  let credential = new DeviceCodeCredential(
    process.env.AZURE_TENANT_ID,
    process.env.AZURE_CLIENT_ID,
    // In this scenario you may also omit this parameter since the default behavior is to log the message to the console
    (deviceCodeInfo) => {
      console.log(deviceCodeInfo.message);
    }
  );
  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

#### Authenticating a user account with username and password

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `UsernamePasswordCredential`. The user must **not** have Multi-factor auth turned on.

Apart from user name and password, this credential requires you to know the tenant ID and client ID. To get the client ID, first [register your application][quickstart-register-app].

```ts
/**
 *  Authenticate with a client certificate.
 */
function withClientCertificateCredential() {
  let credential = new UsernamePasswordCredential(
    "<YOUR_TENANT_ID>",
    "<YOUR_CLIENT_ID>",
    "<USERNAME>",
    "<PASSWORD>"
  );
  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

#### Authenticating a user account with auth code flow

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `AuthorizationCodeCredential` on a Node.js service intended as the back-end for a web application. This can be useful when you want complete control over the authentication flow or when the `InteractiveBrowserCredential` doesn't fit your use case.

First, [register your application][quickstart-register-app] and get your client ID, tenant ID and redirect URL.

Next, prompt the user to login at the URL documented at [Microsoft identity platform and OAuth 2.0 authorization code flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow#request-an-authorization-code). You'll need the client ID, tenant ID, redirect URL, and the scopes your application plans to access.

Then create an API at the redirect URL with the following code to access the Key Vault service.

To learn more about scopes and permissions, see [Scopes and permissions](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent#scopes-and-permissions).

For a complete example using the authorization code flow in Electron, please refer to [our electron sample](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/electron/ts/src/authProvider.ts)

```ts
/**
 * Authenticate with authorization code.
 */
function withAuthCodeCredential() {
  const credential = new AuthorizationCodeCredential(
    "<YOUR_TENANT_ID>",
    "<YOUR_CLIENT_ID>",
    "<AUTH_CODE_FROM_QUERY_PARAMETERS>",
    "<REDIRECT_URL>"
  );

  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

#### Authenticating a user account with Azure CLI

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `AzureCliCredential` on a workstation with Azure CLI installed and signed in.

##### Configure the Azure CLI

Sign in using the [Azure CLI][azure_cli]

```bash
# As a user:
az login

# As a service principal:
az login --service-principal --username <client-id> --password <client-secret> --tenant <tenant-id>
```

If the account / service principal has access to multiple tenants, make sure the desired tenant or subscription is in the state "Enabled" in the output from command:

```bash
az account list
```

Before you use AzureCliCredential in the code, run:

```bash
az account get-access-token
```

to verify the account has been successfully configured.

##### Use the Azure CLI Credential

```ts
/**
 * Authenticate with Azure CLI.
 */
function withAzureCliCredential() {
  // As you can see in this example, the AzureCliCredential does not take any parameters,
  // instead relying on the Azure CLI authenticated user to authenticate.
  const credential = new AzureCliCredential();

  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

#### Authenticating a User Account with Azure PowerShell

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `AzurePowerShellCredential` on a workstation with Azure PowerShell installed and authenticated.

##### Configure Azure PowerShell

Sign in using [Azure PowerShell][azure_powershell]:

```powershell
PS> Connect-AzAccount
```

If the account/service principal has access to multiple tenants (subscriptions), ensure that the `Get-AzContext` cmdlet returns the correct subscription:

```powershell
PS> Get-AzContext

... <subscription information here> ...

```

If the wrong subscription ID is shown, use the `Set-AzContext` cmdlet to change the active Azure context:

```powershell
PS> Set-AzContext -Subscription "<subscription id>"
```

To verify that the account has been successfully configured, try running the `Get-AzAccessToken` cmdlet:

```powershell
PS> Get-AzAccessToken

Token     : eyJ... <full access token will be shown in terminal> ...
ExpiresOn : 11/12/2013 5:43:21 AM +00:00
Type      : Bearer
TenantId  : <tenant id>
UserId    : <user id>

```

##### Use the Azure PowerShell Credential

```ts
/**
 * Authenticate with Azure PowerShell
 */
function withAzurePowerShellCredential() {
  // Like the Azure CLI Credential, the Azure PowerShell Credential does not accept any
  // options or parameters, and uses the current user session within the Az.Account PowerShell
  // module.
  const credential = new AzurePowerShellCredential();

  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

#### Authenticating in Azure with managed identity

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] using the `ManagedIdentityCredential` in a virtual machine, App Service, Functions app, Cloud Shell, or AKS environment on Azure, with system-assigned or user-assigned managed identity enabled.

For more information about configuring your Azure resource for managed identity, see [Configure managed identities for Azure resources](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/qs-configure-cli-windows-vm).

```ts
/**
 * Authenticate with a system-assigned managed identity.
 */
function withSystemAssignedManagedIdentityCredential() {
  const credential = new ManagedIdentityCredential();

  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}

/**
 * Authenticate with a user-assigned managed identity.
 */
function withUserManagedIdentityCredential() {
  const credential = new ManagedIdentityCredential("<USER_ASSIGNED_MANAGED_IDENTITY_CLIENT_ID>");

  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

## Chaining credentials

The `ChainedTokenCredential` class provides the ability to link together multiple credential instances to be tried sequentially when authenticating. The following example demonstrates creating a credential that will attempt to authenticate a `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] using managed identity and fall back to certificate authentication if a managed identity is unavailable in the current environment.

```ts
function withChainedTokenCredential() {
  const credential = new ChainedTokenCredential(
    new ManagedIdentityCredential("<YOUR_CLIENT_ID>"),
    new ClientSecretCredential("<YOUR_TENANT_ID>", "<YOUR_CLIENT_ID>", "<YOUR_CLIENT_SECRET>")
  );
  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

## Authenticating With Azure Stack using Azure Identity

### Determine the Azure Authority Host for Azure Stack

In PowerShell, run this command or have your Azure Stack administrator run this command:

```powershell
Get-AzEnvironment -Name <Name-of-Azure-Stack-Instance>
```

The output will be in the following format:

```
Name Resource-Manager-Url ActiveDirectory-Authority
---- -------------------- -------------------------
<Name> <Resource-Manager-Url> <ActiveDirectory-Authority>
```

The ActiveDirectory Authority in the output will be your Azure Authority Host

### Determine the Tenant ID for Azure Stack

If the Identity provider of your Azure Stack is Azure Active Directory (Azure AD), contact your Azure Stack administrator to find your tenant ID. Otherwise, if the Identity provider of your Azure Stack is Active Directory Federation Services (ADFS), your tenant ID is `adfs`.

### Authentication example

**Code Setup**

The following example demonstrates authenticating a `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] against an Azure Key Vault hosted in Azure Stack.

```ts
function main() {
  const credential = new ClientSecretCredential(
    "<YOUR_TENANT_ID>",
    "<YOUR_CLIENT_ID>",
    "<YOUR_CLIENT_SECRET>",
    {
      authorityHost: "Azure Stack Authority Host From Previous Step"
    }
  );

  const client = new SecretClient("<KEYVAULT_URL_IN_AZURE_STACK>", credential);
}
```

## Advanced Examples

### Custom Credentials

The `@azure/identity` library covers a broad range of Azure Active Directory authentication scenarios. However, we understand there are cases in which the credentials provided might not meet the specific needs of your application. Some applications might avoid taking a dependency on the `@azure/identity` package. In such cases, you may want to write your custom credential.

In this section, we'll examine some such scenarios.

### Implementing the TokenCredential Interface

The [@azure/core-auth][core_auth] package exports a `TokenCredential` interface. The interface is used by the `@azure/identity` package to define a standard public API for all of the Identity credentials we offer. Here's how this type looks in `@azure/core-auth`:

```ts
export interface TokenCredential {
  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}
```

To satisfy this interface, one has to provide an object with a `getToken` function. This function will always receive a `scope` parameter, and should generally receive a second parameter, an options object. This `getToken` function is expected to return an object compatible with `@azure/core-auth`'s `AccessToken` interface, which is defined as follows:

```ts
export interface AccessToken {
  expiresOnTimestamp: number;
  token: string;
}
```

As long as a valid `AccessToken` is returned, the parameters are not required to be used by a method implementing the `TokenCredential` interface. So, the simplest possible object compatible with the `TokenCredential` interface is one that has a `getToken` method that may return either null, or an object with two properties, a numeric property called `expiresOnTimestamp`, and a string property called `token`. Example:

```ts
const mySimpleCredential = {
  getToken() {
    return {
      expiresOnTimestamp: Date.now() + 1000, // Expires in a second
      token: "my access token"
    };
  }
};
```

### Authenticating with a pre-fetched access token

There are cases in which it's convenient to create custom credentials. For example, when a token is pre-fetched, a custom `TokenCredential` can return that token as an `AccessToken` to the Azure SDK clients.

In this example, `StaticTokenCredential` implements the `TokenCredential` abstraction. It takes a pre-fetched access token in its constructor as an [AccessToken](https://docs.microsoft.com/javascript/api/@azure/core-auth/accesstoken) and returns that from its implementation of `getToken()`.

**Prerequisites**

Install the [@azure/core-auth][core_auth] package.

```ts
import { TokenCredential, AccessToken } from "@azure/core-auth";

class StaticTokenCredential implements TokenCredential {
  // AccessToken is an object with two properties:
  // - A "token" property with a string value.
  // - And an "expiresOnTimestamp" property with a numeric unix timestamp as its value.
  constructor(private accessToken: AccessToken) {}
  async getToken(): Promise<AccessToken> {
    return this.accessToken;
  }
}
```

Once the application has defined this credential, it can authenticate Azure SDK clients with a pre-fetched `AccessToken`. The following example shows how an application already using some other mechanism for acquiring tokens (the hypothetical method `getTokenForScope()`) could use the `StaticTokenCredential` to authenticate a `SecretClient` from `@azure/keyvault-secrets`.

```ts
import { SecretClient } from "@azure/keyvault-secrets";

// StaticTokenCredential would be defined before the main() function...

async function main() {
  const accessToken = getTokenForScope("https://vault.azure.net/.default");

  // In this case, `accessToken` has to contain two properties:
  // - A "token" property with a string value.
  // - And an "expiresOnTimestamp" property with a numeric unix timestamp as its value.

  const credential = new StaticTokenCredential(accessToken);

  const client = new SecretClient("https://myvault.vault.azure.net/", credential);
}
```

When using this custom credential type, it's the caller's responsibility to ensure the token is valid and contains the correct claims needed to authenticate calls from the particular service client. In the preceding case, the token must have the scope `https://vault.azure.net/.default` to authorize calls to Azure Blob Storage.

### Authenticating with MSAL Directly

Some applications already use the [@azure/msal-node][msal_node_npm] or [@azure/msal-browser][msal_browser_npm] package to authenticate portions of their application. In these cases, the application might want to use the same to authenticate Azure SDK clients, to take advantage of the token caching the MSAL client application is doing, and preventing unnecessary authentication calls.

#### Authenticating with the @azure/msal-node Confidential Client

In this example, the [ConfidentialClientApplicationCredential](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/master/lib/msal-node/docs/initialize-confidential-client-application.md) is constructed with an instance of `ConfidentialClientApplication` it then implements `getToken()` using the `acquireTokenByClientCredential()` method to acquire a token.

**Prerequisites**

Install the [@azure/msal-node][msal_node_npm] and [@azure/core-auth][core_auth].

> For more information about MSAL for Node.js, see [the README of the `@azure/msal-node` package][msal_node_readme].
> For more information about working with the Confidential Client of MSAL, see [Initialization of MSAL (Node.js)](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/master/lib/msal-node/docs/initialize-confidential-client-application.md).

```ts
import { TokenCredential, AccessToken } from "@azure/core-auth";
import * as msalNode from "@azure/msal-node";

class ConfidentialClientCredential implements TokenCredential {
  constructor(private confidentialApp: msalNode.ConfidentialClientApplication) {}
  async getToken(scopes: string | string[]): Promise<AccessToken> {
    const result = await this.confidentialApp.acquireTokenByClientCredential({
      scopes: Array.isArray(scopes) ? scopes : [scopes]
    });
    return {
      token: result.accessToken,
      expiresOnTimestamp: result.expiresOn.getTime()
    };
  }
}
```

Users could then use the `ConfidentialClientApplicationCredential` to authenticate a `SecretClient` from `@azure/keyvault-secrets` with an MSAL `ConfidentialClientApplication`:

```ts
import { SecretClient } from "@azure/keyvault-secrets";
import * as msalNode from "@azure/msal-node";

async function main() {
  const confidentialClient = new msalNode.ConfidentialClientApplication({
    // MSAL Configuration
  });

  const client = new SecretClient(
    "https://myvault.vault.azure.net/",
    new ConfidentialClientCredential(confidentialClient)
  );
}
```

#### Authenticating with the @azure/msal-browser Public Client

While `@azure/identity` provides some browser support, for users that need the complete feature set offered by `@azure/msal-browser`, it's possible to implement a `TokenCredential` on top of MSAL's public API for the browsers.

For this example, you'll define a `BrowserCredential` class with the following methods:

- `getToken` &mdash; Will use the Silent Authentication flow, retrieving the account from memory to prevent unnecessary redirections.
- `prepare` &mdash; Will try either to check if the account has previously authenticated or to parse the redirection URI values if present.
- `hasAuthenticated` &mdash; Can be used to determine if the authentication has taken place.
- `loginRedirect` &mdash; If called, this method triggers the authentication via redirection.

**Prerequisites**

Install the [@azure/msal-browser][msal_browser_npm] and [@azure/core-auth][core_auth] packages.

> For more information about MSAL for browsers, see [the README of the `@azure/msal-browser` package][msal_browser_readme].

```ts
import { TokenCredential, AccessToken } from "@azure/core-auth";
import * as msalBrowser from "@azure/msal-browser";

class BrowserCredential implements TokenCredential {
  private publicApp: msalBrowser.PublicClientApplication;
  private hasAuthenticated: boolean = false;

  constructor(clientId, redirectUri) {
    this.publicApp = new msalBrowser.PublicClientApplication({
      auth: {
        clientId,
        redirectUri
      }
    });
  }

  // Either confirm the account already exists in memory, or tries to parse the redirect URI values.
  async prepare(): Promise<void> {
    try {
      if (await this.publicApp.getActiveAccount()) {
        this.hasAuthenticated = true;
        return;
      }
      await this.publicApp.handleRedirectPromise();
      this.hasAuthenticated = true;
    } catch (e) {
      console.error("BrowserCredential prepare() failed", e);
    }
  }

  // Should be true if prepare() was successful.
  isAuthenticated(): boolean {
    return this.hasAuthenticated;
  }

  // If called, triggers authentication via redirection.
  async loginRedirect(scopes: string | string[]): Promise<void> {
    const loginRequest = {
      scopes: Array.isArray(scopes) ? scopes : [scopes]
    };
    await this.app.loginRedirect(loginRequest);
  }

  // Tries to retrieve the token without triggering a redirection.
  async getToken(scopes: string | string[]): Promise<AccessToken> {
    if (!this.hasAuthenticated) {
      throw new Error("Authentication required");
    }

    const parameters: msalBrowser.SilentRequest = {
      account: await this.publicApp.getActiveAccount(),
      scopes
    };

    const result = await this.publicApp.acquireTokenSilent(parameters);
    return {
      token: result.accessToken,
      expiresOnTimestamp: result.expiresOn.getTime()
    };
  }
}
```

The following example shows how the `BrowserCredential` could be used to authenticate a `ServiceBusClient`. For this example to work, the redirect URI configured in the AAD application should point to the same page that runs this code originally. For example, `http://localhost:80`.

```ts
import { ServiceBusClient } from "@azure/service-bus";

async function main() {
  const browserCredential = new BrowserCredential(clientId, location.origin);

  await browserCredential.prepare();

  if (!browserCredential.isAuthenticated()) {
    await browserCredential.loginRedirect("https://servicebus.azure.net/.default");
  }

  const client = new ServiceBusClient(serviceBusEndpoint, browserCredential);
}
```

### Authenticating with Key Vault Certificates

Azure Key Vault supports creating secure certificates that can be used to authenticate Azure SDK clients.

There are different ways to create Key Vault certificates. For example, through the Azure CLI: [Quickstart: Set and retrieve a certificate from Azure Key Vault using Azure CLI](https://docs.microsoft.com/azure/key-vault/certificates/quick-create-cli).

Once you have a certificate, you may export the certificate with the Azure CLI following the steps at [Export certificates from Azure Key Vault](https://docs.microsoft.com/azure/key-vault/certificates/how-to-export-certificate?tabs=azure-cli).

You can also export your certificate through the Azure portal. Navigate to your Key Vault resource, go to a specific certificate, then download the certificate in PFX/PEM format.

Once you have a Key Vault certificate downloaded, go to Azure Active Directory. Find the Enterprise app you want to authenticate with, go to **Certificates & secrets**, and upload the certificate.

After that, you can authenticate by pointing the `@azure/identity`'s `ClientCertificateCredential` to the PEM certificate's path, as follows:

```ts
const credential = new ClientCertificateCredential(
  "<your-tenant-id>",
  "<your-client-id>",
  "<the-path-to-your-certificate-in-PEM-format>"
);
```

### Rolling Certificates

Long-running applications may need to roll certificates during process execution. At the moment, the `ClientCertificateCredential` doesn't support certificate rotation. The credential treats the certificate provided as immutable. Therefore, clients constructed with a `ClientCertificateCredential` using a particular certificate would fail to authenticate requests after that certificate rolls and the original is no longer valid.

However, if an application wants to roll this certificate without creating new service clients, it can accomplish this by creating its own `TokenCredential` implementation, which wraps the `ClientCertificateCredential`. Implementing this custom `TokenCredential` would somewhat depend on how the application handles certificate rotation.

#### Explicit rotation

If the application gets notified of certificate rotations and can directly respond, it might choose to wrap the `ClientCertificateCredential` in a custom credential which provides a means for rotating the certificate.

**Prerequisites**

Install the [@azure/core-auth][core_auth] package.

```ts
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import { ClientCertificateCredential } from "@azure/identity";

class RotatableCertificateCredential implements TokenCredential {
  private readonly tenantId: string;
  private readonly clientId: string;
  private credential: ClientCertificateCredential;

  constructor(tenantId: string, clientId: string, PEMCertificatePath: string) {
    this.tenantId = tenantId;
    this.clientId = clientId;
    this.credential = new ClientCertificateCredential(tenantId, clientId, PEMCertificatePath);
  }

  async getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken> {
    return this.credential.getToken(scopes, options);
  }

  rotateCertificate(PEMCertificatePath: string) {
    this.credential = new ClientCertificateCredential(
      this.tenantId,
      this.clientId,
      PEMCertificatePath
    );
  }
}
```

The preceding example shows a custom credential type `RotatableCertificateCredential`, which provides a `rotateCertificate`. The implementation internally relies on an instance of `ClientCertificateCredential`. `rotateCertificate` replaces this instance with a new one using the new certificate path.

#### Implicit rotation

Some applications might want to respond to certificate rotations that are external to the application. For instance, a separate process rotates the certificate by updating it on disk. Here the application creates a custom credential that checks for certificate updates when tokens are requested.

```ts
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import { ClientCertificateCredential } from "@azure/identity";
import * as fs from "fs";

class RotatingCertificateCredential implements TokenCredential {
  private readonly tenantId: string;
  private readonly clientId: string;
  private readonly certificatePath: string;
  private promise: Promise<void> | null = null;
  private credential: ClientCertificateCredential;
  private lastModified: number = 0;

  constructor(tenantId: string, clientId: string, certificatePath: string) {
    this.tenantId = tenantId;
    this.clientId = clientId;
    this.certificatePath = certificatePath;

    this.refreshCertificate();
  }

  async getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken> {
    await this.refreshCertificate();

    return this.credential.getToken(scopes, options);
  }

  refreshCertificate(): Promise<void> {
    if (this.promise) {
      return this.promise;
    }
    return new Promise((resolve, reject) => {
      fs.stat(this.certificatePath, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          if (this.lastModified < stats.mtime.getTime()) {
            this.lastModified = stats.mtime.getTime();
            this.credential = new ClientCertificateCredential(
              this.tenantId,
              this.clientId,
              this.certificatePath
            );
            this.promise = null;
          }
          resolve();
        }
      });
    });
  }
}
```

In this example, the custom credential type `RotatingCertificateCredential` again uses a `ClientCertificateCredential` instance to retrieve tokens. However, in this case, it will attempt to refresh the certificate before obtaining the token. The method `RefreshCertificate` will query to see if the certificate has changed. If so, it will replace `this.credential` with a new instance of the certificate credential using the same certificate path.

### Authenticate on behalf of

Many multi-user apps use the [On-Behalf-Of (OBO) flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow) to make authenticated requests between two services that would otherwise be unreachable. The Identity SDK provides an `OnBehalfOfCredential` that supports this form of authentication.

Two accounts participate in the OBO flow:

- A user, which aims to obtain a special access level. Typically, the `AuthorizationCodeCredential` would be used. We'll call this identity the **User Account**.
- An app registration, which will act as the provider of the special access level. We'll call this identity the **Target App Registration**.

Both accounts must belong to the same Azure AD tenant.

While other credentials authenticate requesting access to a set of resources, the OBO flow requires the user token to have access specifically to the scope of the Azure AD app that will delegate its access to the users. For this authentication flow to work, the **Target App Registration** must be configured with a custom scope. To create a scope through the Azure portal:

1. Select **Active Directory** > **App registrations**.
2. Go to the app you want to authenticate against.
3. On the left menu, select **Expose an API** > **Add a scope**.

The **Target App Registration** must also have admin consent, which can be granted as follows:

1. Select **Active Directory** > **App registrations**.
2. Go to the app you want to authenticate against.
3. On the left menu, select **API permissions** > **Grant admin consent**.

Once the **Target App Registration** is fully configured, no further configurations are needed on the **User Account** side for the credentials that allow skipping the client ID. In case a specific client ID wants to be specified for the **User Account**, like in the case of the `AuthorizationCodeCredential`, the App Registration used to authenticate in that step must be allowed to authenticate using the scope of the **Target App Registration**. This permission is granted as follows:

1. Select **Active Directory** > **App registrations**.
2. Go to the app you want to authenticate against.
3. On the left menu, select **API permissions** > **Add a permission** > **My APIs**.
4. Select the permission related to the scope that we created for our **Target App Registration**.
5. Select the **user_impersonation** permission checkbox. Then select **Add permissions**.

After everything is set, the code below will work. It will:

1. Authenticate a **User Account** with a credential (in this case, the `InteractiveBrowserCredential`), using the **Target App Registration**'s scope (in this example, `api://AAD_APP_CLIENT_ID/Read`).
  - If a specific app registration is the desired approach, make sure to use the **User Account** app registration that we mentioned above.
2. Once the token is retrieved, pass it in the `userAssertionToken` property of the `OnBehalfOfCredentialOptions`, along with `tenantId`, `clientId`, and `clientSecret` of the **Target App Registration**.
3. Once initialized, this credential will have granted the **User Account** access to the resources available to the **Target App Registration**.

```ts
import { InteractiveBrowserCredential, OnBehalfOfCredential } from "@azure/identity";

async function main(): Promise<void> {
  // Most On-Behalf-Of scenarios would likely use the AuthorizationCodeCredential.
  const credential = new InteractiveBrowserCredential();

  const token = await credential.getToken("api://AAD_APP_CLIENT_ID/Read");

  const oboCred = new OnBehalfOfCredential({
    tenantId: "TENANT",
    clientId: "AAD_APP_CLIENT_ID",
    clientSecret: "AAD_APP_CLIENT_SECRET",
    userAssertionToken: token.token
  });

  // Now, the originally authenticated user will be granted access by the app registration
  // to previously inaccessible resources.
  const token2 = await oboCred.getToken("https://storage.azure.com/.default");
  console.log({ token, token2 });
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
  process.exit(1);
});
```

### Control user interaction

In many cases, applications require tight control over user interaction. In these applications, automatically blocking on required user interaction is often undesired or impractical. For this reason, credentials in the `@azure/identity` library that interact with the user offer mechanisms to fully control user interaction. These settings are available under `InteractiveCredentialOptions` in both Node.js and the browser.

```ts
const credential = new InteractiveBrowserCredential({
  disableAutomaticAuthentication: true
});
await credential.authenticate("https://vault.azure.net/.default");
const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
```

In the preceding sample, the application is again using the `InteractiveBrowserCredential` to authenticate a `SecretClient`. There are two major differences from our first example. In this example:

- The application is explicitly forcing any user interaction to happen before the credential is given to the client by calling the `authenticate` method.
- The application is preventing the credential from automatically initiating user interaction. Even though the application authenticates the user before the credential is used, further interaction might still be needed. For instance, in the case that the user's refresh token expires or that a specific method requires additional consent or authentication.

If `disableAutomaticAuthentication` is `false`, the user doesn't use `authenticate()`, and the user has never authenticated before, `getToken` will prompt the user to authenticate.

By setting the option `disableAutomaticAuthentication` to `true`, the credential will fail to automatically authenticate calls in which user interaction is necessary. Instead, the credential will throw an `AuthenticationRequiredError`. If `disableAutomaticAuthentication` is set to `true`, the user doesn't use `authenticate()`, and the user has never authenticated before, `getToken` should fail hard.
The following example demonstrates an application handling such an exception to prompt the user to authenticate only after some application logic has completed.

```ts
try {
  await client.getSecret("secret-name");
} catch (e) {
  if (e.name === "AuthenticationRequiredError") {
    await credential.authenticate(e.scopes);
    console.log("Secret", await client.getSecret("secret-name"));
  } else {
    throw e;
  }
}
```

### Persist user authentication data

Quite often, applications desire the ability to be run multiple times without re-authenticating the user on each execution. This requires that data from credentials be persisted outside of the application memory to authenticate silently on subsequent executions. Applications can persist this data using `tokenCachePersistenceOptions` when constructing the credential and persisting the `authenticationRecord` returned from `authenticate`.

Many credential implementations in the `@azure/identity` library have an underlying token cache that persists sensitive authentication data such as account information, access tokens, and refresh tokens. By default, this data exists in an in-memory cache, which is specific to the credential instance. However, there are scenarios in which an application needs to persist it across executions to share the token cache across credentials. To accomplish this, the `@azure/identity` library provides the `tokenCachePersistenceOptions`.

> IMPORTANT! The token cache contains sensitive data and MUST be protected to prevent compromising accounts. All application decisions regarding the persistence of the token cache must consider that a breach of its content will fully compromise all the accounts it contains.

Starting in version 2 of `@azure/identity`, the `@azure/identity-cache-persistence` package can be used. This package provides a plugin to the `@azure/identity` package to enable persistent token caching. The package `@azure/identity-cache-persistence` exports a plugin object that you must pass as an argument to the top-level `useIdentityPlugin` function from the `@azure/identity` package.

```
npm install --save @azure/identity-cache-persistence
```

Enable token cache persistence in your application as follows:

```ts
import { useIdentityPlugin } from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";

useIdentityPlugin(cachePersistencePlugin);
```

After calling `useIdentityPlugin`, the persistent token cache plugin is registered to the `@azure/identity` package and will be available on all credentials that support persistent token caching (those that have `tokenCachePersistenceOptions` in their constructor options).

#### Persist the token cache

The credential handles persisting all the data needed to silently authenticate one or many accounts. It manages sensitive data, such as refresh tokens and access tokens, which must be protected to prevent compromising the accounts related to them. The `@azure/identity` library will protect and cache sensitive token data, using available platform data protection, if `@azure/identity-cache-persistence` is configured. Otherwise, it will use only in-memory caching.

To configure a credential, such as the `InteractiveBrowserCredential`, to persist token data, set the `tokenCachePersistenceOptions` option. The simplest way to persist the token data for a credential is to use the default `tokenCachePersistenceOptions`. This will persist and read token data from a shared persisted token cache protected to the current account.

```ts
import { useIdentityPlugin, InteractiveBrowserCredential } from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";

useIdentityPlugin(cachePersistencePlugin);

const credential = new InteractiveBrowserCredential({
  tokenCachePersistenceOptions: {
    enabled: true
  }
});
```

#### Use a named token cache

Some applications may prefer to isolate the token cache they use and provide a unique identifier, instead of using the default. To accomplish this, specify the `tokenCachePersistenceOptions` when creating the credential and provide a `name` for the persisted cache instance.

```ts
const credential = new InteractiveBrowserCredential({
  tokenCachePersistenceOptions: {
    enabled: true,
    name: "my_application_name"
  }
});
```

#### Persist the authentication record

The `AuthenticationRecord` which is returned from the `authenticate`, contains data identifying an authenticated account. It's needed to identify the appropriate entry in the persisted token cache to silently authenticate on subsequent executions. There's no sensitive data in the `AuthenticationRecord`, so it can be persisted in a non-protected state. Ensure that you pass the appropriate scopes for your service to the `authenticate` method.

The following example stores the `AuthenticationRecord` to the local file system after authenticating the user:

```ts
import {
  useIdentityPlugin,
  InteractiveBrowserCredential,
  AuthenticationRecord,
  serializeAuthenticationRecord
} from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
import { writeFileSync } from "fs";
import path from "path";

useIdentityPlugin(cachePersistencePlugin);

export async function main(): Promise<void> {
  const AUTH_RECORD_PATH = "./tokencache.bin";
  const credential = new InteractiveBrowserCredential({
    tokenCachePersistenceOptions: {
      enabled: true
    }
  });
  const authRecord: AuthenticationRecord = await credential.authenticate(
    "https://service/.default"
  );
  const content = serializeAuthenticationRecord(authRecord);
  writeFileSsync(path.join(process.cwd(), AUTH_RECORD_PATH), content);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
  process.exit(1);
});
```

#### Silent authentication with authentication record and token cache persistence options

Once an application has configured a credential to persist token data and an `AuthenticationRecord`, it's possible to silently authenticate. The following example demonstrates setting the `tokenCachePersistenceOptions` and retrieving an `AuthenticationRecord` from the local file system to create an `InteractiveBrowserCredential` capable of silent authentication.

```ts
import {
  useIdentityPlugin,
  InteractiveBrowserCredential,
  AuthenticationRecord,
  deserializeAuthenticationRecord
} from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
import { readFileSync } from "fs";
import path from "path";

useIdentityPlugin(cachePersistencePlugin);

export async function main(): Promise<void> {
  const AUTH_RECORD_PATH = "./tokencache.bin";
  const fileContent = readFileSync(path.join(process.cwd(), AUTH_RECORD_PATH), {
    encoding: "utf-8"
  });
  const authRecord: AuthenticationRecord = deserializeAuthenticationRecord(fileContent);

  const credential = new InteractiveBrowserCredential({
    tokenCachePersistenceOptions: {
      enabled: true
    },
    authenticationRecord: authRecord
  });
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
  process.exit(1);
});
```

The credential created in the preceding example will silently authenticate, given that a valid token corresponding to the `AuthenticationRecord` still exists in the persisted token data. There are some cases where interaction will still be required, such as on token expiry or when additional authentication is required for a particular resource.

#### Allow unencrypted storage

By default, the token cache will protect any data that is persisted using the user data protection APIs available on the current platform. However, there are cases where no data protection is available, and applications may choose to still persist the token cache in an unencrypted state. This is accomplished with the `unsafeAllowUnencryptedStorage` option.

```ts
import { useIdentityPlugin, InteractiveBrowserCredential } from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";

useIdentityPlugin(cachePersistencePlugin);

const credential = new InteractiveBrowserCredential({
  tokenCachePersistenceOptions: {
    enabled: true,
    unsafeAllowUnencryptedStorage: true
  }
});
```

By setting `unsafeAllowUnencryptedStorage` to `true`, the credential will encrypt the contents of the token cache before persisting it, if data protection is available on the current platform. If platform data protection is unavailable, it will write and read the persisted token data to an unencrypted local file with access permissions restricted to the current user. If `unsafeAllowUnencryptedStorage` is `false` (the default), a `CredentialUnavailableError` will be thrown in the case that no data protection is available.

### Authenticate national clouds

National clouds are physically isolated instances of Azure. These regions of Azure are designed to make sure that data residency, sovereignty, and compliance requirements are honored within geographical boundaries. Including the global cloud, Azure Active Directory (Azure AD) is deployed in the following national clouds:

- Azure Government
- Azure Germany
- Azure China 21Vianet

All credentials have `authorityHost` as a setting in the constructor at some level. To authenticate for various national cloud or a private cloud, we can send the most appropriate `authorityHost`. We provide a set of common values through the `AzureAuthorityHosts` interface. So, for the US Government cloud, you could instantiate a credential this way:

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

The following table shows common values provided through the `AzureAuthorityHosts`.

| National Cloud                      | Azure AD authentication endpoint  | AzureAuthorityHost                     |
| ----------------------------------- | --------------------------------- | -------------------------------------- |
| Azure AD for US Government          | https://login.microsoftonline.us  | `AzureAuthorityHosts.AzureGovernment`  |
| Azure AD Germany                    | https://login.microsoftonline.de  | `AzureAuthorityHosts.AzureGermany`     |
| Azure AD China operated by 21Vianet | https://login.chinacloudapi.cn    | `AzureAuthorityHosts.AzureChina`       |
| Azure AD (global service)           | https://login.microsoftonline.com | `AzureAuthorityHosts.AzurePublicCloud` |

To learn more about Azure Authentication for National Clouds, see [National clouds](https://docs.microsoft.com/azure/active-directory/develop/authentication-national-cloud).

<!-- LINKS -->

[azure_cli]: https://docs.microsoft.com/cli/azure
[secrets_client_library]: https://www.npmjs.com/package/@azure/keyvault-secrets
[service_bus_client_library]: https://www.npmjs.com/package/@azure/service-bus
[azure_managed_identities]: https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview
[service_principal_azure_cli]: https://docs.microsoft.com/cli/azure/create-an-azure-service-principal-azure-cli
[device_code_flow]: https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#enable-applications-for-device-code-flow
[quickstart-register-app]: https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app
[app-register-service-principal]: https://docs.microsoft.com/azure/active-directory/develop/app-objects-and-service-principals
[service_principal_azure_powershell]: https://docs.microsoft.com/powershell/azure/create-azure-service-principal-azureps
[msal_node_readme]: https://github.com/sadasant/microsoft-authentication-library-for-js/tree/master/lib/msal-node
[msal_node_npm]: https://www.npmjs.com/package/@azure/msal-node
[msal_browser_readme]: https://github.com/sadasant/microsoft-authentication-library-for-js/tree/master/lib/msal-browser
[msal_browser_npm]: https://www.npmjs.com/package/@azure/msal-browser
[core_auth]: https://www.npmjs.com/package/@azure/core-auth
