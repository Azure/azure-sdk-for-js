# Table of contents

- [Introduction](#introduction)
- [Authenticating client side browser applications](#authenticating-client-side-browser-applications)
- [Authenticating server side applications](#authenticating-server-side-applications)
- [Chaining credentials](#chaining-credentials)
- [Authenticating With Azure Stack using Azure Identity](#authenticating-with-azure-stack-using-azure-identity)

## Introduction

Authenticating your application, users, and principals is an integral part of working with the Azure Client Libraries. The Azure Identity library provides multiple ways to authenticate, each with a flexible configuration that covers most scenarios. In this document we will go over some of these scenarios and provide small examples that can be used as a starting point for your needs.

## Authenticating client side browser applications

For client side applications running in the browser, the `SinglePageApplicationCredential` provides the simplest user authentication experience and is the only credential type that we support in the browser. To get started, you will want to configure an AAD application for interactive browser authentication. Please refer to the [Single-page application: App registration guide](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) for additional information on how to configure your app registration for the browser.

Note that this credential can only be used with Azure services that support CORS. For example, `@azure/service-bus`.

An example follows:

```ts
import { ServiceBusClient } from "@azure/service-bus";

function withSinglePageApplicationCredential() {
  const credential = new SinglePageApplicationCredential({
    tenantId: "<YOUR_TENANT_ID>",
    clientId: "<YOUR_CLIENT_ID>",
    redirectUri: "<YOUR_REDIRECT_URI>"
  });

  const client = new ServiceBusClient("hostname.servicebus.windows.net", credential);
}
```

## Authenticating server side applications

For server side applications we provide options that vary from minimal configuration with sensible defaults using the `DefaultAzureCredential` to more specialized credentials that can support your specific scenario. Please feel free to navigate to the specific credentials below to explore what we offer:

- [Authenticating with `DefaultAzureCredential`](#authenticating-with-defaultazurecredential)
- [Authenticating a user assigned managed identity with `DefaultAzureCredential`](#authenticating-a-user-assigned-managed-identity-with-defaultazurecredential)
- [Authenticating a user account interactively in the browser](#authenticating-a-user-account-interactively-in-the-browser)
- [Authenticating a service principal with a client secret](#authenticating-a-service-principal-with-a-client-secret)
- [Authenticating a service principal with a client certificate](#authenticating-a-service-principal-with-a-client-certificate)
- [Authenticating a service principal with environment credentials](#authenticating-a-service-principal-with-environment-credentials)
- [Authenticating a user account with device code flow](#authenticating-a-user-account-with-device-code-flow)
- [Authenticating a user account with username and password](#authenticating-a-user-account-with-username-and-password)
- [Authenticating a user account with auth code flow](#authenticating-a-user-account-with-auth-code-flow)
- [Authenticating a user account with Azure CLI](#authenticating-a-user-account-with-azure-cli)
- [Authenticating a user account with Visual Studio Code](#authenticating-a-user-account-with-visual-studio-code)
- [Authenticating in Azure with managed identity](#authenticating-in-azure-with-managed-identity)

### Authenticating with `DefaultAzureCredential`

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `DefaultAzureCredential`. There's also [a runnable sample](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/typescript/src/defaultAzureCredential.ts) to create a Key Vault key client you can copy-paste. The `DefaultAzureCredential` makes for a terrific starting point as it provides sane defaults with minimal configuration and chains multiple credentials together. While you may outgrow it eventually, it is a sensible first choice for most scenarios where the application is intended to ultimately be run in the Azure Cloud.

```ts
/**
 * The default credential first checks environment variables for configuration.
 * If environment configuration is incomplete, it will try managed identity.
 */
function withDefaultAzureCredential() {
  const credential = new DefaultAzureCredential();
  const client = new SecretClient(`https://key-vault-name.vault.azure.net`, credential);
}
```

#### Authenticating a user assigned managed identity with `DefaultAzureCredential`

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `DefaultAzureCredential`, deployed to an Azure resource with a user assigned managed identity configured.

For more information about how to configure a user assigned managed identity for an Azure resource please refer to [What are managed identities for Azure resources][azure_managed_identities].

```ts
/**
 * The default credential will use the user assigned managed identity with the specified client ID.
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

### Authenticating with the default system browser

For clients that have a default browser available and for client-side applications running in the browser, the `InteractiveBrowserCredential` provides the simplest user authentication experience. In the sample below an application authenticates a `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] using the `InteractiveBrowserCredential`.

```ts
function withInteractiveBrowserCredential() {
  const credential = new InteractiveBrowserCredential({
    tenantId: "<YOUR_TENANT_ID>",
    clientId: "<YOUR_CLIENT_ID>"
  });

  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

### Authenticating a service principal with a client secret

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `ClientSecretCredential`. There's also [a runnable sample](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/typescript/src/clientSecretCredential.ts) to create a Key Vault key client you can copy-paste.

For more information about how to create a service principal and get these values please refer to [Creating a Service Principal with the Azure CLI][service_principal_azure_cli].

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
  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

### Authenticating a service principal with environment credentials

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `EnvironmentCredential`. The `EnvironmentCredential` looks for well-known environment variable names to determine how it should authenticate. It effectively acts as a wrapper for the `ClientSecretCredential`, `ClientCertificateCredential` or `UsernamePasswordCredential` depending on which environment variables are present.

For more information about how to create a service principal and get these values please refer to [Creating a Service Principal with the Azure CLI][service_principal_azure_cli].

```ts
/**
 *  Authenticate with a client certificate.
 */
function withEnvironmentCredential() {
  let credential = new EnvironmentCredential();
  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

### Authenticating a service principal with a client certificate

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `ClientCertificateCredential`.

For more information about how to create a service principal and get these values please refer to [Creating a Service Principal with the Azure CLI][service_principal_azure_cli].

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

### Authenticating a user account with device code flow

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `DeviceCodeCredential`.

For more information about how to configure an AAD application for device code flow please refer to [Enable applications for device code flow][device_code_flow].

> The `DeviceCodeCredential` offers a credential that can be used with little to no setup - the user is free to use whatever browser they choose to complete the authentication process.

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

### Authenticating a user account with username and password

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `UsernamePasswordCredential`. The user must **not** have Multi-factor auth turned on.

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

### Authenticating a user account with auth code flow

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `AuthorizationCodeCredential` on a web application. This can be useful when you want complete control over the authentication flow or when the `InteractiveBrowserCredential` does not fit your use-case.

First, prompt the user to login at the URL documented at [Microsoft identity platform and OAuth 2.0 authorization code flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow#request-an-authorization-code). You will need the client id, tenant id, redirect URL, and the scopes your application plans to access.

Then create an API at the redirect URL with the following code to access the Key Vault service.

For a complete example using the authorization code flow in Electron please refer to [our electron sample](https://github.com/Azure/azure-sdk-for-js/blob/master/samples/frameworks/electron/ts/src/authProvider.ts)

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

### Authenticating a user account with Azure CLI

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `AzureCliCredential` on a workstation with Azure CLI installed and signed in.

#### Configure the Azure CLI

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

#### Use the Azure CLI Credential

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

### Authenticating a user account with Visual Studio Code

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `VisualStudioCodeCredential` on a workstation with Visual Studio Code installed, and the user has signed in with an Azure account.

See more about how to configure your Visual Studio Code in the [Azure Account Extension page](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account)

```ts
function withVisualStudioCodeCredential() {
  // As you can see in this example, the AzureCliCredential does not take any parameters,
  // instead relying on the Azure CLI authenticated user to authenticate.
  const credential = new AzureCliCredential();

  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

### Authenticating in Azure with managed identity

This examples demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `ManagedIdentityCredential` in a virtual machine, app service, function app, cloud shell, or AKS environment on Azure, with system assigned, or user assigned managed identity enabled.

For more information about how to configure your Azure resource for managed identity please refer to [Configure managed identities for Azure resources](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/qs-configure-cli-windows-vm).

```ts
/**
 * Authenticate with a managed identity.
 */
function withManagedIdentityCredential() {
  const credential = new ManagedIdentityCredential("<USER_ASSIGNED_MANAGED_IDENTITY_CLIENT_ID>");

  const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
}
```

## Chaining credentials

The `ChainedTokenCredential` class provides the ability to link together multiple credential instances to be tried sequentially when authenticating. The following example demonstrates creating a credential which will attempt to authenticate a `SecretClient` from the [@azure/keyvault-secrerts][secrets_client_library] using managed identity, and fall back to certificate authentication if a managed identity is unavailable in the current environment.

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

In powershell run this command or have your Azure Stack Administrator run this command:

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

### Determine the Tenant Id for Azure Stack

If the Identity provider of your Azure Stack is Azure Active Directory (Azure AD) then contact your Azure Stack Administrator to find out your tenant Id.
else, if the Identity provider of your Azure Stack is Active Directory Federation Services (AD FS) then your tenant id is `adfs`.

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

<!-- LINKS -->

[azure_cli]: https://docs.microsoft.com/cli/azure
[secrets_client_library]: https://www.npmjs.com/package/@azure/keyvault-secrets
[azure_managed_identities]: https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview
[service_principal_azure_cli]: https://docs.microsoft.com/cli/azure/create-an-azure-service-principal-azure-cli
[device_code_flow]: https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#enable-applications-for-device-code-flow
