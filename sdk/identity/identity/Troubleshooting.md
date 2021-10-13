## Troubleshooting Azure Identity Authentication Issues

The Azure Identity SDK offers various `TokenCredential` implementations. The most common errors observed for failure scenarios tend to throw `CredentialUnavailableError` and `AuthenticationRequired` errors.

- The `CredentialUnavailableError` indicates that the credential cannot execute in the current environment setup due to lack of required configuration.
- The `AuthenticationRequiredError` indicates that the credential was able to send an authentication request, but then received an error from the authority host. This can happen due to invalid configuration passed in to the credential at construction time.

This troubleshooting guide covers mitigation steps to resolve errors thrown by the credentials in the Azure Identity client library for JavaScript and TypeScript.

## Table of contents

- [Permission issues](#permission-issues)
- [Troubleshoot default Azure credential authentication issues](#troubleshoot-default-azure-credential-authentication-issues)
- [Troubleshoot environment credential authentication issues](#troubleshoot-environment-credential-authentication-issues)
- [Troubleshoot service principal authentication issues](#troubleshoot-service-principal-authentication-issues)
- [Troubleshoot username and password authentication issues](#troubleshoot-username-and-password-authentication-issues)
- [Troubleshoot Managed Identity authentication issues](#troubleshoot-managed-identity-authentication-issues)
- [Troubleshoot Visual Studio Code authentication issues](#troubleshoot-visual-studio-code-authentication-issues)
- [Troubleshoot Azure CLI authentication issues](#troubleshoot-azure-cli-authentication-issues)
- [Troubleshoot Azure PowerShell authentication issues](#troubleshoot-azure-powershell-authentication-issues)

## Permission issues

If you're using app registration to authenticate the service, ensure the app registration has the correct permissions and role assignments in the service you want to use. For example, if you want to have access to the Azure App Configuration service through Azure Active Directory (Azure AD), make sure your app registration has the permissions and the role assignments for access to Azure AD. You can either be assigned the role directly or be in a group that is assigned the role. The "Contributor" and the "Owner" roles allow you to manage the App Configuration resource. In this case, you can either use "App Configuration Data Owner" directly on the user or the Azure AD group. Alternatively, use "Owner" on the Azure AD group. While the App Configuration data can be accessed using access keys, these keys don't grant direct access to the data using Azure AD.

## Troubleshoot default Azure credential authentication issues

### Credential unavailable

The `DefaultAzureCredential` attempts to retrieve an access token by sequentially invoking a chain of credentials. In this scenario, the `CredentialUnavailableError` signifies that all credentials in the chain failed to retrieve the token in the current environment setup/configuration. You need to follow the configuration instructions for the respective credential you're looking to use via the `DefaultAzureCredential` chain, so that the credential can work in your environment.

Follow the configuration instructions in the `Credential unavailable error` sections of the troubleshooting guidelines below for the respective credential/authentication type you're looking to use via `DefaultAzureCredential`:

| Credential Type               | Troubleshoot Guide                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| Environment Credential        | [Environment Credential Troubleshoot Guide](#troubleshoot-environment-credential-authentication-issues) |
| Managed Identity Credential   | [Managed Identity Troubleshoot Guide](#troubleshoot-managed-identity-authentication-issues)             |
| Visual Studio Code Credential | [Visual Studio Code Troubleshoot Guide](#troubleshoot-visual-studio-code-authentication-issues)         |
| Azure CLI Credential          | [Azure CLI Troubleshoot Guide](#troubleshoot-azure-cli-authentication-issues)                           |
| Azure PowerShell Credential   | [Azure PowerShell Troubleshoot Guide](#troubleshoot-azure-powershell-authentication-issues)             |

## Logging

To help diagnose any errors in credentials that encompass multiple credentials like `DefaultAzureCredential`, [enabling logging](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md) will also help you get a better understanding.

Consider a scenario in which you have the following environment variables set up either in your environment or _.env_ file:

- `AZURE_TENANT_ID`
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`

You authenticate using `DefaultAzureCredential` and enable logging. You'll see the following logging statements:

```
azure:identity:info EnvironmentCredential => Found the following environment variables: AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET
azure:identity:info EnvironmentCredential => Invoking ClientSecretCredential with tenant ID: [REDACTED], clientId: [REDACTED] and clientSecret: [REDACTED]
```

These logging statements indicate that the `EnvironmentCredential` is being used for authentication and `ClientSecretCredential` is invoked.

## Troubleshoot environment credential authentication issues

### Credential unavailable error

#### Environment variables not configured

The `EnvironmentCredential` supports the following types of authentication:

- Client Secret
- Client Certificate
- Username and Password

To utilize the desired authentication type via `EnvironmentCredential`, ensure the following environment variables are configured properly and that the app can read them.

##### ClientSecret credential

| Variable Name       | Value                            |
| ------------------- | -------------------------------- |
| AZURE_CLIENT_ID     | ID of an Azure AD app.           |
| AZURE_TENANT_ID     | ID of the app's Azure AD tenant. |
| AZURE_CLIENT_SECRET | One of the app's client secrets. |

##### ClientCertificate credential

| Variable name                 | Value                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| AZURE_CLIENT_ID               | ID of an Azure AD app.                                                                      |
| AZURE_TENANT_ID               | ID of the app's Azure AD tenant.                                                            |
| AZURE_CLIENT_CERTIFICATE_PATH | Path to a PEM-encoded certificate file including private key (without password protection). |

##### Username and password

| Variable name   | Value                                           |
| --------------- | ----------------------------------------------- |
| AZURE_CLIENT_ID | ID of an Azure AD app.                          |
| AZURE_USERNAME  | A username (usually an email address).          |
| AZURE_PASSWORD  | The associated password for the given username. |

### Client authentication error

The `EnvironmentCredential` supports service principal authentication and username and password authentication.
Follow the troubleshooting guidelines below for the respective authentication type that failed.

| Authentication Type             | Troubleshoot Guide                                                                                 |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| ClientSecret/ ClientCertificate | [Service Principal Auth Troubleshoot Guide](#troubleshoot-service-principal-authentication-issues) |
| Username Password               | [Username Password Auth Troubleshoot Guide](#troubleshoot-username-password-authentication-issues) |

## Troubleshoot username and password authentication issues

### Two-factor authentication required error

The `UsernamePassword` credential works only for users whose two-factor authentication has been disabled in Azure AD. You can change the multi-factor authentication in the Azure portal with the steps [here](https://docs.microsoft.com/azure/active-directory/authentication/howto-mfa-userstates#change-the-status-for-a-user).

### Request body must contain the following parameter: 'client_assertion' or 'client_secret'

When you get the error `The request body must contain the following parameter: 'client_assertion' or 'client_secret'`, it happens because of how the AAD app is configured. The AAD app registration seems to be configured as a confidential app. The `UsernamePassword` credential works only with public clients and doesn't support confidential apps. To support confidential apps, use `ClientSecret` or `ClientCertificate` credentials instead.

To allow public client authentication on your Azure AD tenant:

- Go to the Azure portal.
- Go to the `Authentication` page.
- Scroll to the bottom of this page, and you will see something that says: `Allow public client flows`, and close to that, you will see a `yes` and `no` switch. Make sure this is set to `yes`.
  After that, you should not need to specify a client secret to authenticate with this credential.

## Troubleshoot service principal authentication issues

### Invalid argument issues

#### Client Id

The Client ID is the app ID of the registered app / service principal in Azure AD. It's a required parameter for `ClientSecretCredential` and `ClientCertificateCredential`. If you've already created your service principal, you can retrieve the client/app ID by following the instructions [here](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#get-tenant-and-app-id-values-for-signing-in).

#### Tenant Id

The tenant ID is the Global Unique Identifier (GUID) that identifies your organization. It's a required parameter for `ClientSecretCredential` and `ClientCertificateCredential`. If you've already created your service principal, you can retrieve the client/app ID by following the instructions [here](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#get-tenant-and-app-id-values-for-signing-in).

### Client secret credential issues

#### Client secret argument

The client secret is the secret string that the application uses to prove its identity when requesting a token. This can also can be referred to as an application password.
If you've already created a service principal, follow the instructions [here](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#option-2-create-a-new-application-secret) to get the client secret for your app.

### Client certificate credential issues

#### Client certificate argument

The `Client Certificate Credential` accepts `pem` certificates (`pfx` certificates are not supported by JS SDK for now). The certificate needs to be associated with your registered application/service principal. To create and associate a certificate with your registered app. Follow the instructions [here](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#option-1-upload-a-certificate).

### Create a new service principal

If you're looking to create a new service principal and would like to use that, then follow the instructions [here](https://docs.microsoft.com/azure/developer/javascript/how-to/with-sdk/set-up-development-environment?tabs=azure-sdk-for-javascript#1-create-a-service-principal) to create a new service principal.

## Troubleshoot Managed Identity authentication issues

### Credential unavailable error

#### Connection timed out / connection could not be established / target environment could not be determined

The Managed Identity credential runs only on Azure-hosted machines/servers. Ensure that you're running your app on an Azure-hosted resource. Currently, the Azure Identity SDK supports [Managed Identity authentication](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview) in the below listed Azure services. Ensure you're running your app on one of these resources and have enabled the Managed Identity on them by following the instructions at their configuration links below.

| Azure Service                                                                                                                      | Managed Identity Configuration                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Azure Virtual Machines](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/how-to-use-vm-token) | [Configuration Instructions](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm)          |
| [Azure App Service](https://docs.microsoft.com/azure/app-service/overview-managed-identity?tabs=javascript)                        | [Configuration Instructions](https://docs.microsoft.com/azure/app-service/overview-managed-identity?tabs=java)                                             |
| [Azure Kubernetes Service](https://docs.microsoft.com/azure/aks/use-managed-identity)                                              | [Configuration Instructions](https://docs.microsoft.com/azure/aks/use-managed-identity)                                                                    |
| [Azure Cloud Shell](https://docs.microsoft.com/azure/cloud-shell/msi-authorization)                                                |                                                                                                                                                            |
| [Azure Arc](https://docs.microsoft.com/azure/azure-arc/servers/managed-identity-authentication)                                    | [Configuration Instructions](https://docs.microsoft.com/azure/azure-arc/servers/security-overview#using-a-managed-identity-with-azure-arc-enabled-servers) |
| [Azure Service Fabric](https://docs.microsoft.com/azure/service-fabric/concepts-managed-identity)                                  | [Configuration Instructions](https://docs.microsoft.com/azure/service-fabric/configure-existing-cluster-enable-managed-identity-token-service)             |

## Troubleshoot Visual Studio Code authentication issues

### Credential unavailable error

#### Failed to read VS Code credentials / authenticate via Azure Tools plugin in VS Code

The Visual Studio Code credential failed to read the credential details from the cache.

The Visual Studio Code authentication is handled by an integration with the Azure Account extension.
To use this form of authentication, ensure that you have installed the Azure Account extension,
then use View > Command Palette to execute the Azure: Sign In command. This command opens a browser window and displays a page that allows you
to sign in to Azure. After you've completed the login process, you can close the browser as directed. Running your application
(either in the debugger or anywhere on the development machine) will use the credential from your sign-in.

If you already had the Azure Account extension installed and had logged in to your account. Then try logging out and logging in again, as
that will re-populate the cache on the disk and potentially mitigate the error you're getting.

After using the VS Code extension to authenticate once, if you use the `DefaultAzureCredential` outside of the VS Code, it will try to authenticate with the `VSCode credentials`. In this scenario if you stop using VS Code for a while, your VS Code auth token will eventually get expired, and the sign in with `DefaultAzureCredential` will begin to fail. In such cases, you have to log out on the VS Code extension (and log in again if you want to continue using it).

#### MSAL interaction required error

The VS Code credential was able to read the cached credentials from the cache but the cached token is likely expired.
In VS Code, log in to the Azure Account extension via **View** > **Command Palette** > **Azure: Sign In**.

#### ADFS tenant not supported

The ADFS Tenants are not supported via the Azure Account extension in VS Code currently.
The supported clouds are:

| Azure Cloud        | Cloud Authority Host               |
| ------------------ | ---------------------------------- |
| AZURE PUBLIC CLOUD | https://login.microsoftonline.com/ |
| AZURE GERMANY      | https://login.microsoftonline.de/  |
| AZURE CHINA        | https://login.chinacloudapi.cn/    |
| AZURE GOVERNMENT   | https://login.microsoftonline.us/  |

## Troubleshoot Azure CLI authentication issues

### Credential unavailable error

#### Azure CLI not installed

The `Azure CLI Credential` failed to execute as Azure CLI command line tool isn't installed.
To use Azure CLI credential, the Azure CLI needs to be installed, follow the instructions [here](https://aka.ms/azure-cli) to install it for your platform and then try running the credential again.

#### Azure account not logged in

The `Azure CLI Credential` utilizes the current logged in Azure user in Azure CLI to fetch an access token.
You need to login to your account in Azure CLI via `az login` command. You can further read instructions to [Sign in with Azure CLI](https://docs.microsoft.com/cli/azure/authenticate-azure-cli).
Once logged in try running the credential again.

## Troubleshoot Azure PowerShell authentication issues

### Credential unavailable error

#### PowerShell not installed

The `Azure PowerShell Credential` utilizes the locally installed `PowerShell` command line tool to fetch an access token. Ensure it's installed on your platform by following the instructions [here](https://docs.microsoft.com/powershell/scripting/install/installing-powershell?view=powershell-7.1). Then run the credential again.

#### Azure Az Moudle not installed

The Azure PowerShell credential failed to execute, as the Azure Az module isn't installed. To use the Azure PowerShell credential, install the Azure Az PowerShell module:

````powershell
Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force
Then try running the credential again.

#### Azure account not logged in

The Azure PowerShell credential utilizes the currently logged in Azure user in Azure PowerShell to fetch an access token.
You need to log in to your account in Azure PowerShell via the `Connect-AzAccount` command. For further instructions, see [Sign in with Azure PowerShell](https://docs.microsoft.com/powershell/azure/authenticate-azureps?view=azps-6.3.0).
Once logged in, try running the credential again.

#### Deserialization error

The Azure PowerShell credential was able to retrieve a response when attempting to get an access token but failed to parse that response. In your local PowerShell window, run the following command to ensure that Azure PowerShell returns an access token in the correct format:

```powershell
Get-AzAccessToken -ResourceUrl "<Scopes-Url>"
````

If the preceding command isn't working properly, follow the instructions to resolve the Azure PowerShell issue. Then try running the credential again.

If this guide doesn't help you diagnose the errors you're experiencing, [open an issue](https://github.com/Azure/azure-sdk-for-js/issues). To contribute to the SDK, read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).
