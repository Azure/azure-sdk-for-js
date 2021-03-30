# Azure Identity Examples

Authenticating your application, users, and principals is an integral part of working with the Azure Client Libraries. The Azure Identity library provides multiple ways to authenticate, each with a flexible configuration that covers most scenarios. In this document we highlight some of these scenarios and how you might use Azure Identity to authenticate with other client libraries.

## Table of contents

- [Authenticating with `DefaultAzureCredential`](#authenticating-with-defaultazurecredential)
- [Authenticating a user assigned managed identity with `DefaultAzureCredential`](#authenticating-a-user-assigned-managed-identity-with-defaultazurecredential)
- [Authenticating a user in Azure Toolkit for IntelliJ with `DefaultAzureCredential`](authenticating-a-user-in-azure-toolkit-for-intellij-with-defaultazurecredential)
- [Authenticating a service principal with a client secret](#authenticating-a-service-principal-with-a-client-secret)
- [Authenticating a service principal with a client certificate](#authenticating-a-service-principal-with-a-client-certificate)
- [Authenticating a user account with device code flow](#authenticating-a-user-account-with-device-code-flow)
- [Authenticating a user account with username and password](#authenticating-a-user-account-with-username-and-password)
- [Authenticating a user account interactively in the browser](#authenticating-a-user-account-interactively-in-the-browser)
- [Authenticating a user account with auth code flow](#authenticating-a-user-account-with-auth-code-flow)
- [Authenticating a user account with Azure CLI](#authenticating-a-user-account-with-azure-cli)
- [Authenticating a user account with IntelliJ IDEA](#authenticating-a-user-account-with-intellij-idea)
- [Authenticating a user account with Visual Studio Code](#authenticating-a-user-account-with-visual-studio-code)'
- [Authenticating in Azure with managed identity](#authenticating-in-azure-with-managed-identity)
- [Chaining credentials](#chaining-credentials)
- [Authenticating with Azure Stack using Azure Identity](#authenticating-with-azure-stack-using-azure-identity)

## Authenticating with `DefaultAzureCredential`

This example demonstrates authenticating the `SecretClient` from the [@azure/keyvault-secrets][secrets_client_library] client library using the `DefaultAzureCredential`. ~There's also [a compilable sample](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java) to create a Key Vault secret client you can copy-paste.~

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

See more how to configure the `DefaultAzureCredential` on your workstation or Azure in [Configure DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#configure-defaultazurecredential).

### Authenticating a user assigned managed identity with `DefaultAzureCredential`

This example demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `DefaultAzureCredential`, deployed to an Azure resource with a user assigned managed identity configured.

See more about how to configure a user assigned managed identity for an Azure resource in [Enable managed identity for Azure resources](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#enable-managed-identity-for-azure-resources).

<!-- embedme ../../keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L242-L255 -->

```java
/**
 * The default credential will use the user assigned managed identity with the specified client ID.
 */
public void createDefaultAzureCredentialForUserAssignedManagedIdentity() {
    DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
        .managedIdentityClientId("<MANAGED_IDENTITY_CLIENT_ID>")
        .build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(defaultCredential)
        .buildClient();
}
```

### Authenticating a user in Azure Toolkit for IntelliJ with `DefaultAzureCredential`

This example demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `DefaultAzureCredential`, on a workstation with IntelliJ IDEA installed, and the user has signed in with an Azure account to the Azure Toolkit for IntelliJ.

See more about how to configure your IntelliJ IDEA in [Sign in Azure Toolkit for IntelliJ for IntelliJCredential](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#sign-in-azure-toolkit-for-intellij-for-intellijcredential).

<!-- embedme ../../keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L257-L271 -->

```java
/**
 * The default credential will use the KeePass database path to find the user account in IntelliJ on Windows.
 */
public void createDefaultAzureCredentialForIntelliJ() {
    DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
        // KeePass configuration required only for Windows. No configuration needed for Linux / Mac
        .intelliJKeePassDatabasePath("C:\\Users\\user\\AppData\\Roaming\\JetBrains\\IdeaIC2020.1\\c.kdbx")
        .build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(defaultCredential)
        .buildClient();
}
```

## Authenticating a service principal with a client secret

This example demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `ClientSecretCredential`. There's also [a compilable sample](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java) to create a Key Vault secret client you can copy-paste.

See more about how to create a service principal and get these values in [Creating a Service Principal with the Azure CL](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#creating-a-service-principal-with-the-azure-cli).

<!-- embedme https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L54-L69 -->

```java
/**
 *  Authenticate with client secret.
 */
public void createClientSecretCredential() {
    ClientSecretCredential clientSecretCredential = new ClientSecretCredentialBuilder()
        .clientId("<YOUR_CLIENT_ID>")
        .clientSecret("<YOUR_CLIENT_SECRET>")
        .tenantId("<YOUR_TENANT_ID>")
        .build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(clientSecretCredential)
        .buildClient();
}
```

## Authenticating a service principal with a client certificate

This example demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `ClientCertificateCredential`. There's also [a compilable sample](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java) to create a Key Vault secret client you can copy-paste.

See more about how to create a service principal and get these values in [Creating a Service Principal with the Azure CL](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#creating-a-service-principal-with-the-azure-cli).

<!-- embedme https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L71-L88 -->

```java
/**
 *  Authenticate with a client certificate.
 */
public void createClientCertificateCredential() {
    ClientCertificateCredential clientCertificateCredential = new ClientCertificateCredentialBuilder()
        .clientId("<YOUR_CLIENT_ID>")
        .pemCertificate("<PATH TO PEM CERTIFICATE>")
        // choose between either a PEM certificate or a PFX certificate
        //.pfxCertificate("<PATH TO PFX CERTIFICATE>", "PFX CERTIFICATE PASSWORD")
        .tenantId("<YOUR_TENANT_ID>")
        .build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(clientCertificateCredential)
        .buildClient();
}
```

## Authenticating a user account with device code flow

This example demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `DeviceCodeCredential` on an IoT device. There's also [a compilable sample](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java) to create a Key Vault secret client you can copy-paste.

See more about how to configure an AAD application for device code flow in [Enable applications for device code flow](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#enable-applications-for-device-code-flow)

<!-- embedme https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L90-L106 -->

```java
/**
 * Authenticate with device code credential.
 */
public void createDeviceCodeCredential() {
    DeviceCodeCredential deviceCodeCredential = new DeviceCodeCredentialBuilder()
        .challengeConsumer(challenge -> {
            // lets user know of the challenge
            System.out.println(challenge.getMessage());
        })
        .build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(deviceCodeCredential)
        .buildClient();
}
```

## Authenticating a user account with username and password

This example demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `UsernamePasswordCredential`. The user must **not** have Multi-factor auth turned on. There's also [a compilable sample](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java) to create a Key Vault secret client you can copy-paste.

<!-- embedme https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L108-L123 -->

```java
/**
 * Authenticate with username, password.
 */
public void createUserNamePasswordCredential() {
    UsernamePasswordCredential usernamePasswordCredential = new UsernamePasswordCredentialBuilder()
        .clientId("<YOUR_CLIENT_ID>")
        .username("<YOUR_USERNAME>")
        .password("<YOUR_PASSWORD>")
        .build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(usernamePasswordCredential)
        .buildClient();
}
```

## Authenticating a user account interactively in the browser

This example demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `InteractiveBrowserCredential`. There's also [a compilable sample](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java) to create a Key Vault secret client you can copy-paste.

See more about how to configure an AAD application for interactive browser authentication and listen on a port locally in [Enable applications for interactive browser oauth 2 flow](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#enable-applications-for-interactive-browser-oauth-2-flow)

<!-- embedme https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L125-L139 -->

```java
/**
 * Authenticate interactively in the browser.
 */
public void createInteractiveBrowserCredential() {
    InteractiveBrowserCredential interactiveBrowserCredential = new InteractiveBrowserCredentialBuilder()
        .clientId("<YOUR CLIENT ID>")
        .redirectUrl("http://localhost:8765"). //The registered redirect URL of the public client application
        .build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(interactiveBrowserCredential)
        .buildClient();
}
```

## Authenticating a user account with auth code flow

This example demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `AuthorizationCodeCredential` on a web application.

First, prompt the user to login at the URL documented at [Microsoft identity platform and OAuth 2.0 authorization code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow#request-an-authorization-code). You will need the client id, tenant id, redirect URL, and the scopes your application plans to access.

Then create an API at the redirect URL with the following code to access the Key Vault service.

See more about how to configure an AAD application for oauth 2 auth code flow in [Enable applications for oauth 2 auth code flow](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#enable-applications-for-oauth-2-auth-code-flow).

<!-- embedme https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L141-L155 -->

```java
/**
 * Authenticate with authorization code.
 */
public void createAuthCodeCredential() {
    AuthorizationCodeCredential authCodeCredential = new AuthorizationCodeCredentialBuilder()
        .clientId("<YOUR CLIENT ID>")
        .authorizationCode("<AUTH CODE FROM QUERY PARAMETERS")
        .redirectUrl("<THE REDIRECT URL>")
        .build();
    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(authCodeCredential)
        .buildClient();
}
```

## Authenticating a user account with Azure CLI

This example demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `AzureCliCredential` on a workstation with Azure CLI installed and signed in.

See more about how to configure Azure CLI in [Sign in Azure CLI for AzureCliCredential](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#sign-in-azure-cli-for-azureclicredential).

<!-- embedme https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L157-L168 -->

```java
/**
 * Authenticate with Azure CLI.
 */
public void createAzureCliCredential() {
    AzureCliCredential cliCredential = new AzureCliCredentialBuilder().build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(cliCredential)
        .buildClient();
}
```

## Authenticating a user account with IntelliJ IDEA

This example demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `IntelliJCredential` on a workstation with IntelliJ IDEA installed, and the user has signed in with an Azure account.

See more about how to configure your IntelliJ IDEA in [Sign in Azure Toolkit for IntelliJ for IntelliJCredential](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#sign-in-azure-toolkit-for-intellij-for-intellijcredential).

<!-- embedme https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L170-L184 -->

```java
/**
 * Authenticate with IntelliJ IDEA.
 */
public void createIntelliJCredential() {
    IntelliJCredential intelliJCredential = new IntelliJCredentialBuilder()
        // KeePass configuration required only for Windows. No configuration needed for Linux / Mac
        .keePassDatabasePath("C:\\Users\\user\\AppData\\Roaming\\JetBrains\\IdeaIC2020.1\\c.kdbx")
        .build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(intelliJCredential)
        .buildClient();
}
```

## Authenticating a user account with Visual Studio Code

This example demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `VisualStudioCodeCredential` on a workstation with Visual Studio Code installed, and the user has signed in with an Azure account.

See more about how to configure your Visual Studio Code in [Sign in Visual Studio Code Azure Account Extension for VisualStudioCodeCredential](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#sign-in-visual-studio-code-azure-account-extension-for-visualstudiocodecredential)

<!-- embedme https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L186-L197 -->

```java
/**
 * Authenticate with Visual Studio Code.
 */
public void createVisualStudioCodeCredential() {
    VisualStudioCodeCredential visualStudioCodeCredential = new VisualStudioCodeCredentialBuilder().build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(visualStudioCodeCredential)
        .buildClient();
}
```

## Authenticating in Azure with managed identity

This examples demonstrates authenticating the `SecretClient` from the [azure-security-keyvault-secrets][secrets_client_library] client library using the `ManagedIdentityCredential` in a virtual machine, app service, function app, cloud shell, or AKS environment on Azure, with system assigned, or user assigned managed identity enabled.

see more about how to configure your Azure resource for managed identity in [Enable managed identity for Azure resources](https://github.com/Azure/azure-sdk-for-java/wiki/Set-up-Your-Environment-for-Authentication#enable-managed-identity-for-azure-resources)

<!-- embedme https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L199-L212 -->

```java
/**
 * Authenticate with a managed identity.
 */
public void createManagedIdentityCredential() {
    ManagedIdentityCredential managedIdentityCredential = new ManagedIdentityCredentialBuilder()
        .clientId("<USER ASSIGNED MANAGED IDENTITY CLIENT ID>") // only required for user assigned
        .build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(managedIdentityCredential)
        .buildClient();
}
```

## Chaining credentials

The `ChainedTokenCredential` class provides the ability to link together multiple credential instances to be tried sequentially when authenticating. The following example demonstrates creating a credential which will attempt to authenticate using managed identity, and fall back to certificate authentication if a managed identity is unavailable in the current environment. This example authenticates an `EventHubClient` from the [azure-eventhubs][eventhubs_client_library] client library using the `ChainedTokenCredential`. There's also [a compilable sample](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java) to create a Key Vault secret client you can copy-paste.

<!-- embedme https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/keyvault/azure-security-keyvault-secrets/src/samples/java/com/azure/security/keyvault/secrets/IdentityReadmeSamples.java#L214-L240 -->

```java
/**
 * Authenticate with chained credentials.
 */
public void createChainedCredential() {
    ManagedIdentityCredential managedIdentityCredential = new ManagedIdentityCredentialBuilder()
        .clientId("<YOUR_CLIENT_ID>")
        .build();

    ClientSecretCredential secondServicePrincipal = new ClientSecretCredentialBuilder()
        .clientId("<YOUR_CLIENT_ID>")
        .clientSecret("<YOUR_CLIENT_SECRET>")
        .tenantId("<YOUR_TENANT_ID>")
        .build();

    // when an access token is requested, the chain will try each
    // credential in order, stopping when one provides a token
    ChainedTokenCredential credentialChain = new ChainedTokenCredentialBuilder()
        .addLast(managedIdentityCredential)
        .addLast(secondServicePrincipal)
        .build();

    // Azure SDK client builders accept the credential as a parameter
    SecretClient client = new SecretClientBuilder()
        .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
        .credential(credentialChain)
        .buildClient();
}
```

## Authenticating With Azure Stack using Azure Identity

#### Determine the Azure Authority Host for Azure Stack

If you don't know the Azure Authority Host of your Azure Stack, follow the instructions here:

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

The ActiveDirectory Authority in the output will be your Azure Authoirty Host

### Determine the Tenant Id for Azure Stack

If the Identity provider of your Azure Stack is Azure Active Directory (Azure AD) then contact your Azure Stack Administrator to find out your tenant Id.
else, if the Identity provider of your Azure Stack is Active Directory Federation Services (AD FS) then your tenant id is `adfs`.

#### Authentication example

**Code Setup**

In the Code Setup below, we use the Azure Identity client library to connect to the Azure Key Vault hosted in Azure Stack and then create a secret in the Key Vault.

```java
public static void main(String[] args) {

    String vaultUrl = "<Vault-URL-Of-KeyVault-Instance-In-AzureStack";

    ClientSecretCredential credential = new ClientSecretCredentialBuilder()
                                        .authorityHost("Azure Stack Authority Host From Previous Step")
                                        .tenantId("Tenant Id from previous step")
                                        .clientSecret("Your-Service-Principal-Client-Secret")
                                        .clientId("Your-Service-Principal-Client-Id")
                                        .build();

    SecretClient secretClient = new SecretClientBuilder()
                                        .vaultUrl(vaultUrl)
                                        .credential(credential)
                                        .buildClient();

    KeyVaultSecret secret = secretClient.setSecret("DummySecret", "DummyValue");

    System.out.println(String.format("Successfully created the secret with name %s and value %s",
            secret.getName(), secret.getValue()));

}
```

<!-- LINKS -->

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[source]: ./
[aad_doc]: https://docs.microsoft.com/azure/active-directory/
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[keys_client_library]: ../../keyvault/azure-security-keyvault-keys
[secrets_client_library]: ../../keyvault/azure-security-keyvault-secrets
[eventhubs_client_library]: ../../eventhubs/azure-messaging-eventhubs
[azure_core_library]: ../../core
[javadoc]: http://azure.github.io/azure-sdk-for-java
