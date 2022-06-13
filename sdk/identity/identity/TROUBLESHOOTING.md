## Troubleshooting Azure Identity Authentication Issues

This troubleshooting guide covers the following areas of the Azure Identity client library for JavaScript/TypeScript:

- Failure investigation techniques
- Common errors for the credential types
- Mitigation steps to resolve errors

## Table of contents

- [Handle Azure Identity errors](#handle-azure-identity-errors)
  - [AuthenticationRequiredError](#authenticationrequirederror)
  - [CredentialUnavailableError](#credentialunavailableerror)
  - [AuthenticationError](#authenticationerror)
- [Find relevant information in error messages](#find-relevant-information-in-error-messages)
- [Enable and configure logging](#enable-and-configure-logging)
- [Permission issues](#permission-issues)
- [Troubleshoot default Azure credential authentication issues](#troubleshoot-default-azure-credential-authentication-issues)
- [Troubleshoot environment credential authentication issues](#troubleshoot-environment-credential-authentication-issues)
- [Troubleshoot service principal authentication issues](#troubleshoot-service-principal-authentication-issues)
- [Troubleshoot username and password authentication issues](#troubleshoot-username-and-password-authentication-issues)
- [Troubleshoot Managed Identity authentication issues](#troubleshoot-managed-identity-authentication-issues)
  - [Azure Virtual Machine Managed Identity](#azure-virtual-machine-managed-identity)
  - [Azure App Service and Azure Functions Managed Identity](#azure-app-service-and-azure-functions-managed-identity)
- [Troubleshoot Visual Studio Code authentication issues](#troubleshoot-visual-studio-code-authentication-issues)
- [Troubleshoot Azure CLI authentication issues](#troubleshoot-azure-cli-authentication-issues)
- [Troubleshoot Azure PowerShell authentication issues](#troubleshoot-azure-powershell-authentication-issues)

## Handle Azure Identity errors

### AuthenticationRequiredError

Errors arising from authentication issues can be thrown on any service client method that makes a request to the service. This is because the token is requested from the credential on the first call to the service and on any subsequent call that needs to refresh the token.

To distinguish these failures from failures in the service client, Azure Identity classes throw the `AuthenticationRequiredError`. Details describing the source of the error are provided in the error message. Depending on the application, these errors may or may not be recoverable.

```ts
import * from "@azure/identity";
import * from "@azure/keyvault-secrets";

async function main() {
  // Create a key client using the DefaultAzureCredential
  const keyVaultUrl = "https://key-vault-name.vault.azure.net";
  const credential = new DefaultAzureCredential();
  const client = new KeyClient(keyVaultUrl, credential);

  try {
    // Retrieving the properties of the existing keys in that specific Key Vault.
    console.log(await client.listPropertiesOfKeys().next());
  } catch (error) {
    console.log("Authentication Failed", error.message);
  }
}

main();
```

### CredentialUnavailableError

The `CredentialUnavailableError` is used to indicate that the credential can't authenticate in the current environment due to lack of required configuration or setup. This error is also used as a signal to chained credential types, such as `DefaultAzureCredential` and `ChainedTokenCredential`, that the chained credential should continue to try other credential types later in the chain. In `ManagedIdentityCredential`, it can also trigger if the authentication endpoint (like the IMDS endpoint) is unavailable.

### AuthenticationError

The `AuthenticationError` is used to indicate a failure to authenticate with Azure Active Directory (Azure AD). The `errorResponse` field contains more details about the specific failure.

```ts
import * from "@azure/identity";
import * from "@azure/keyvault-secrets";

async function main() {
  // Create a key client using the DefaultAzureCredential
  const keyVaultUrl = "https://key-vault-name.vault.azure.net";
  const credential = new DefaultAzureCredential();
  const client = new KeyClient(keyVaultUrl, credential);

  try {
    // Retrieving the properties of the existing keys in that specific Key Vault.
    console.log(await client.listPropertiesOfKeys().next());
  } catch (error) {
    console.log("Azure Active Directory service response with error", error.errorResponse);
  }
}

main();
```

## Find relevant information in error messages

`AuthenticationRequiredError` is thrown when unexpected errors occurred while a credential is authenticating. This can include errors received from requests to the Azure AD Security Token Service (STS) and often contains information helpful to diagnosis. Consider the following `AuthenticationRequiredError` message:

` AuthenticationRequiredError: invalid_request: 9002331 - [2022-02-04 00:28:06Z]: AADSTS9002331: Application '6b666991-4567-4982-9981-61877200efy1'(kaghiya-identity) is configured for use by Microsoft Account users only. Please use the /consumers endpoint to serve this request.
Trace ID: 00a7e15c-4557-4974-91d5-886428b00e00
Correlation ID: 20267531-0284-4543-93d7-cf50919fd841
Timestamp: 2022-02-04 00:28:06Z - Correlation ID: 20267531-0284-4543-93d7-cf50919fd841 - Trace ID: 00a7e15c-4557-4974-91d5-886428b00e00`

This error contains several pieces of information:


- **Failing Credential Type**: The type of credential that failed to authenticate. This can be helpful when diagnosing issues with chained credential types, such as `DefaultAzureCredential` or `ChainedTokenCredential`.

- **STS Error Code and Message**: The error code and message returned from the Azure AD STS. This can give insight into the specific reason the request failed. In this specific case, the request failed because the provided client secret is incorrect. For more information, see [Azure AD STS error codes](https://docs.microsoft.com/azure/active-directory/develop/reference-aadsts-error-codes#aadsts-error-codes).

- **Correlation ID and Timestamp**: The correlation ID and call timestamp used to identify the request in server-side logs. This information can be useful to support engineers when diagnosing unexpected STS failures.

### Enable and configure logging

The Azure Identity library has the same [logging capabilities](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core#logging) as the rest of the Azure SDK.

For help with debugging authentication issues or diagnosing errors in credentials that encompass multiple credentials, like `DefaultAzureCredential`, see [Logging](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#logging).

```ts
import { setLogLevel } from "@azure/logger";
// set up the log level to enable the logger
setLogLevel("info");
```

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

> CAUTION: Requests and responses in the Azure Identity library contain sensitive information. Precaution must be taken to protect logs when customizing the output to avoid compromising account security.

## Permission issues

If you're using app registration to authenticate the service, ensure the app registration has the correct permissions and role assignments in the service you want to use. For example, if you want to have access to the Azure App Configuration service through Azure AD, ensure your app registration has the permissions and role assignments for access to Azure AD. You can either be assigned the role directly or be in a group that's assigned the role. The "Contributor" and the "Owner" roles allow you to manage the App Configuration resource. In this case, you can either use "App Configuration Data Owner" directly on the user or the Azure AD group. Alternatively, use "Owner" on the Azure AD group. While the App Configuration data can be accessed using access keys, these keys don't grant direct access to the data using Azure AD.

## Troubleshoot default Azure credential authentication issues

### Credential unavailable

The `DefaultAzureCredential` attempts to retrieve an access token by sequentially invoking a chain of credentials. In this scenario, the `CredentialUnavailableError` signifies that all credentials in the chain failed to retrieve the token in the current environment setup/configuration. You need to follow the configuration instructions for the respective credential you're looking to use via the `DefaultAzureCredential` chain, so that the credential can work in your environment.

| Error |Description| Mitigation |
|---|---|---|
|`CredentialUnavailableError` thrown with message `DefaultAzureCredential failed to retrieve a token from the included credentials.`|All credentials in the `DefaultAzureCredential` chain failed to retrieve a token, each throwing a `CredentialUnavailableError` themselves.|<ul><li>[Enable logging](#enabling-and-configuring-logging) to verify the credentials being tried, and get further diagnostic information.</li><li>Consult the troubleshooting guide for underlying credential types for more information.</li><ul><li>[EnvironmentCredential](#troubleshoot-environment-credential-authentication-issues)</li><li>[ManagedIdentityCredential](#troubleshoot-managed-identity-authentication-issues)</li><li>[VisualStudioCodeCredential](#troubleshoot-visual-studio-code-authentication-issues)</li><li>[VisualStudioCredential](#troubleshoot-visualstudio-credential-authentication-issues)</li><li>[AzureCLICredential](#troubleshoot-azure-cli-authentication-issues)</li><li>[AzurePowershellCredential](#troubleshoot-azure-powershell-authentication-issues)</li></ul>|
|`RestError` raised from the client with a status code of 401 or 403.|Authentication succeeded but the authorizing Azure service responded with a 401 (Authenticate), or 403 (Forbidden) status code. This can often be caused by the `DefaultAzureCredential` authenticating an account other than the intended or that the required role assignment is not configured.|<ul><li>[Enable logging](#enabling-and-configuring-logging) to determine which credential in the chain returned the authenticating token.</li><li>In the case a credential other than the expected is returning a token, bypass this by either signing out of the corresponding development tool, or excluding the credential with the ExcludeXXXCredential property in the `DefaultAzureCredentialOptions`</li><li>Confirm that the correct RBAC role is assigned to the identity being used to authenticate. For example, the resource specific role rather than just the inherited "Owner" role.</li></ul>|

## Troubleshoot environment credential authentication issues

### CredentialUnavailableError

| Error Message |Description| Mitigation |
|---|---|---|
|Environment variables aren't fully configured.|A valid combination of environment variables wasn't set.|Ensure the appropriate environment variables are set **prior to application startup** for the intended authentication method.<p/>  <ul><li>To authenticate a service principal using a client secret, ensure the variables `AZURE_CLIENT_ID`, `AZURE_TENANT_ID` and `AZURE_CLIENT_SECRET` are properly set.</li><li>To authenticate a service principal using a certificate, ensure the variables `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_CERTIFICATE_PATH` are properly set.</li><li>To authenticate a user using a password, ensure the variables `AZURE_USERNAME` and `AZURE_PASSWORD` are properly set.</li><ul>|

### Client authentication error

The `EnvironmentCredential` supports service principal authentication and username and password authentication.
Follow the troubleshooting guidelines below for the respective authentication type that failed.

| Authentication Type            | Troubleshooting Guide                                                                     |
| ------------------------------ | ----------------------------------------------------------------------------------------- |
| ClientSecret/ClientCertificate | [Service principal auth guide](#troubleshoot-service-principal-authentication-issues)     |
| Username and password          | [Username and password auth guide](#troubleshoot-username-password-authentication-issues) |

## Troubleshoot username and password authentication issues

### AuthenticationRequiredError
| Error Code | Issue | Mitigation |
|---|---|---|
|AADSTS50126|The provided username or password is invalid|Ensure the `username` and `password` provided when constructing the credential are valid.|

### Two-factor authentication required error

The `UsernamePasswordCredential` works only for users whose two-factor authentication has been disabled in Azure AD. You can change the multi-factor authentication in the Azure portal with the steps [here](https://docs.microsoft.com/azure/active-directory/authentication/howto-mfa-userstates#change-the-status-for-a-user).

### Request body must contain the following parameter: 'client_assertion' or 'client_secret'

The error `The request body must contain the following parameter: 'client_assertion' or 'client_secret'`, occurs because of how the Azure AD app is configured. The Azure AD app registration seems to be configured as a confidential app. The `UsernamePasswordCredential` works only with public clients and doesn't support confidential apps. To support confidential apps, use either `ClientSecretCredential` or `ClientCertificateCredential` instead.

To allow public client authentication on your Azure AD tenant:

1. In the Azure portal, navigate to the **Authentication** page.
2. Scroll to the bottom of the page. You'll see something that says **Allow public client flows**. Near that, you'll see a **yes** / **no** toggle. Set this toggle to **yes**.

After that, you shouldn't need to specify a client secret to authenticate with this credential.

## Troubleshoot service principal authentication issues

### Invalid argument issues

#### Client Id

The Client ID is the app ID of the registered app / service principal in Azure AD. It's a required parameter for `ClientSecretCredential` and `ClientCertificateCredential`. If you've already created your service principal, you can retrieve the client/app ID by following the instructions [here](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#get-tenant-and-app-id-values-for-signing-in).

#### Tenant Id

The tenant ID is the Global Unique Identifier (GUID) that identifies your organization. It's a required parameter for `ClientSecretCredential` and `ClientCertificateCredential`. If you've already created your service principal, you can retrieve the client/app ID by following the instructions [here](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#get-tenant-and-app-id-values-for-signing-in).

| Error Code | Description | Mitigation |
|---|---|---|
| `endpoints_resolution_error` | Could not resolve endpoints. Please check network and try again. Detail: ClientAuthError: openid_config_error: Could not retrieve endpoints. Check your authority and verify the .well-known/openid-configuration endpoint returns the required endpoints.| Ensure the specified `tenantId` is correct for your application registration. For multi-tenant apps, ensure the application has been added to the desired tenant by a tenant admin. To add a new application in the desired tenant, follow the instructions [here](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#option-2-create-a-new-application-secret).|

### Client secret credential issues

#### AuthenticationRequiredError

| Error Code | Description | Mitigation |
|---|---|---|
|AADSTS7000215|An invalid client secret was provided.|Ensure the `clientSecret` provided when constructing the credential is valid. If unsure, create a new client secret using the Azure portal. Details on creating a new client secret can be found [here](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#option-2-create-a-new-application-secret).|
|AADSTS7000222|An expired client secret was provided.|Create a new client secret using the Azure portal. Details on creating a new client secret can be found [here](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#option-2-create-a-new-application-secret).| 
|AADSTS700016|The specified application wasn't found in the specified tenant.|Ensure the specified `clientId` and `tenantId` are correct for your application registration.  For multi-tenant apps, ensure the application has been added to the desired tenant by a tenant admin. To add a new application in the desired tenant, follow the instructions [here](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#option-2-create-a-new-application-secret).|

### Client certificate credential issues

#### AuthenticationRequiredError

| Error Code | Description | Mitigation |
|---|---|---|
|AADSTS700016|The specified application wasn’t found in the specified tenant.| Ensure the specified `clientId` and `tenantId` are correct for your application registration. For multi-tenant apps, ensure the application has been added to the desired tenant by a tenant admin. To add a new application in the desired tenant, follow the instructions [here](https://docs.microsoft.com/azure/developer/javascript/how-to/with-sdk/set-up-development-environment?tabs=azure-sdk-for-javascript#1-create-a-service-principal).|
#### Client certificate argument

These errors will be thrown by the JS Identity SDK and thus will have no error codes from the service.

| Error Code | Description | Mitigation |
|---|---|---|
|No error code| ClientCertificateCredential: Provide either a PEM certificate in string form, or the path to that certificate in the filesystem. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.| The `ClientCertificateCredential` accepts PEM certificates and the path for the certificate needs to be provided(`pfx` certificates aren't supported by the JavaScript library for now). The certificate needs to be associated with your registered app/service principal. To create and associate a certificate with your registered app, follow the instructions [here](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#option-1-upload-a-certificate).|
|No error code| The file at the specified path doesn't contain a PEM-encoded certificate.| Provide only PEM certificates for `ClientCertificateCredential`. `pfx` certificates aren't supported by the JavaScript library for now.|
## Troubleshoot Managed Identity authentication issues

The `ManagedIdentityCredential` is designed to work on a variety of Azure hosts that provide [managed identity](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview). Configuring the managed identity and troubleshooting failures varies from hosts. The below table lists the Azure hosts that can be assigned a managed identity, and are supported by the `ManagedIdentityCredential`. Ensure you're running your app on one of these resources and have enabled the managed identity on them by following the instructions at their configuration links below.

|Host Environment|Configuration |Troubleshoot |
|---|---|---|
|Azure Virtual Machines and Scale Sets|[Configuration](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm)|[Troubleshooting](#azure-virtual-machine-managed-identity)|
|Azure App Service and Azure Functions|[Configuration](https://docs.microsoft.com/azure/app-service/overview-managed-identity)|[Troubleshooting](#azure-app-service-and-azure-functions-managed-identity)|
|Azure Kubernetes Service|[Configuration](https://docs.microsoft.com/azure/aks/use-managed-identity)|Not Available|
|Azure Arc|[Configuration](https://docs.microsoft.com/azure/azure-arc/servers/security-overview#using-a-managed-identity-with-azure-arc-enabled-servers)|Not Available|
|Azure Service Fabric|[Configuration](https://docs.microsoft.com/azure/service-fabric/configure-existing-cluster-enable-managed-identity-token-service)|Not Available|

### Azure Virtual Machine Managed Identity

#### CredentialUnavailableError

| Error Message |Description| Mitigation |
|---|---|---|
|The requested identity hasn't been assigned to this resource.|The IMDS endpoint responded with a status code of 400, indicating the requested identity isn’t assigned to the VM.|If using a user-assigned identity, ensure the specified `clientId` is correct.<p/><p/>If using a system-assigned identity, make sure it has been enabled properly. Instructions to enable the system assigned identity on an Azure VM can be found [here](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm#enable-system-assigned-managed-identity-on-an-existing-vm).|
|The request failed due to a gateway error.|The request to the IMDS endpoint failed due to a gateway error, 502 or 504 status code.|Calls via proxy or gateway aren’t supported by IMDS. Disable proxies or gateways running on the VM for calls to the IMDS endpoint `http://169.254.169.254/`|
|No response received from the managed identity endpoint.|No response was received for the request to IMDS or the request timed out.|<ul><li>Ensure managed identity has been properly configured on the VM. Instructions for configuring the managed identity can be found [here](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm).</li><li>Verify the IMDS endpoint is reachable on the VM, see [below](#verify-imds-is-available-on-the-vm) for instructions.</li></ul>|
|Multiple attempts failed to obtain a token from the managed identity endpoint.|Retries to retrieve a token from the IMDS endpoint have been exhausted.|<ul><li>Refer to inner error messages for more details on specific failures. If the data has been truncated, more detail can be obtained by [collecting logs](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/identity/Azure.Identity#logging).</li><li>Ensure managed identity has been properly configured on the VM. Instructions for configuring the manged identity can be found [here](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm).</li><li>Verify the IMDS endpoint is reachable on the VM, see [below](#verify-imds-is-available-on-the-vm) for instructions.</li></ul>|

#### Verify IMDS is available on the VM

If you have access to the VM, you can verify the manged identity endpoint is available via the command line using curl. 

```bash
curl 'http://169.254.169.254/metadata/identity/oauth2/token?resource=https://management.core.windows.net&api-version=2018-02-01' -H "Metadata: true"
```

> Note that output of this command will contain a valid access token, and SHOULD NOT BE SHARED to avoid compromising account security.

### Azure App Service and Azure Functions Managed Identity

#### CredentialUnavailableError


| Error Message |Description| Mitigation |
|---|---|---|
|ManagedIdentityCredential authentication unavailable.|The environment variables configured by the App Services host weren't present.|<ul><li>Ensure the managed identity has been properly configured on the App Service. Instructions for configuring the managed identity can be found [here](https://docs.microsoft.com/azure/app-service/overview-managed-identity?tabs=portal%2Cjavascript).</li><li>Verify the App Service environment is properly configured and the managed identity endpoint is available. See [below](#verify-the-app-service-managed-identity-endpoint-is-available) for instructions.</li></ul>|

#### Verify the App Service managed identity endpoint is available

If you have access to SSH into the App Service, you can verify managed identity is available in the environment. First, ensure the environment variables `MSI_ENDPOINT` and `MSI_SECRET` have been set in the environment. Then you can verify the managed identity endpoint is available using curl.

```bash
curl 'http://169.254.169.254/metadata/identity/oauth2/token?resource=https://management.core.windows.net&api-version=2018-02-01' -H "Metadata: true"
```

> Note that the output of this command will contain a valid access token, and SHOULD NOT BE SHARED to avoid compromising account security.

## Troubleshoot Visual Studio Code authentication issues

> It's a [known issue](https://github.com/Azure/azure-sdk-for-js/issues/20500) that `VisualStudioCodeCredential` doesn't work with [Azure Account extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account) versions newer than **0.9.11**. A long-term fix to this problem is in progress. In the meantime, consider [authenticating via the Azure CLI](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#authenticating-via-the-azure-cli).

### CredentialUnavailableError

| Error Message |Description| Mitigation |
|---|---|---|
|Failed To Read VS Code Credentials<p/><p/>OR<p/>Authenticate via Azure Tools plugin in VS Code.|No Azure account information was found in the VS Code configuration.|<ul><li>Ensure the [Azure Account extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account) is properly installed.</li><li>Use **View** > **Command Palette** to execute the **Azure: Sign In** command. This command opens a browser window and displays a page that allows you to sign in to Azure.</li><li>If you already had the Azure Account extension installed and had logged in to your account, try logging out and logging in again as that will repopulate the cache and potentially mitigate the error you're getting.</li></ul>|
|MSAL Interaction Required Error|The `VisualStudioCodeCredential` was able to read the cached credentials from the cache but the cached token is likely expired.|Log into the VS Code *Azure Account* extension via **View** > **Command Palette** to execute the **Azure: Sign In** command.|
#### Failed to read VS Code credentials / authenticate via Azure Tools plugin in VS Code

The Visual Studio Code credential failed to read the credential details from the cache.

Visual Studio Code authentication is handled by an integration with the Azure Account extension. To use this form of authentication, ensure that you've installed the Azure Account extension. Then select **View** > **Command Palette** > **Azure: Sign In**. This command opens a browser window and displays a page that allows you to sign in to Azure. After you've completed the login process, you can close the browser as directed. Running your app (either in the debugger or anywhere on the development machine) will use the credential from your sign-in.

If you already had the Azure Account extension installed and had logged in to your account. Then try logging out and logging in again, as
that will re-populate the cache on the disk and potentially mitigate the error you're getting.

After using the VS Code extension to authenticate once, if you use the `DefaultAzureCredential` outside of the VS Code, it will try to authenticate with the `VSCode credentials`. In this scenario, if you stop using VS Code for a while, your VS Code auth token will eventually expire. The sign-in with `DefaultAzureCredential` will begin to fail. In such cases, you have to log out of the VS Code extension (and log in again if you want to continue using it).

#### ADFS tenant not supported

The ADFS tenants aren't currently supported via the Azure Account extension in VS Code.
The supported clouds are:

| Azure Cloud        | Cloud Authority Host               |
| ------------------ | ---------------------------------- |
| AZURE PUBLIC CLOUD | https://login.microsoftonline.com/ |
| AZURE GERMANY      | https://login.microsoftonline.de/  |
| AZURE CHINA        | https://login.chinacloudapi.cn/    |
| AZURE GOVERNMENT   | https://login.microsoftonline.us/  |

## Troubleshoot Azure CLI authentication issues

### CredentialUnavailableError

| Error Message |Description| Mitigation |
|---|---|---|
|Azure CLI not installed|The Azure CLI isn't installed or couldn't be found.|<ul><li>Ensure the Azure CLI is properly installed. Installation instructions can be found [here](https://docs.microsoft.com/cli/azure/install-azure-cli).</li><li>Validate the installation location has been added to the `PATH` environment variable.</li></ul>|
|Please run 'az login' to set up account|No account is currently logged into the Azure CLI, or the login has expired.|<ul><li>Log into the Azure CLI using the `az login` command. More information on authentication in the Azure CLI can be found [here](https://docs.microsoft.com/cli/azure/authenticate-azure-cli).</li><li>Validate that the Azure CLI can obtain tokens. See [below](#verify-the-azure-cli-can-obtain-tokens) for instructions.</li></ul>|

#### Verify the Azure CLI can obtain tokens

You can manually verify that the Azure CLI is properly authenticated and can obtain tokens. First, use the `account` command to verify the account which is currently logged into the Azure CLI. 

```azurecli
az account show
```

Once you've verified the Azure CLI is using the correct account, you can validate it's able to obtain tokens for this account.

```azurecli
az account get-access-token --output json --resource https://management.core.windows.net
```
>Note that output of this command will contain a valid access token, and SHOULD NOT BE SHARED to avoid compromising account security.

## Troubleshoot Azure PowerShell authentication issues

### CredentialUnavailableError

| Error Message |Description| Mitigation |
|---|---|---|
|PowerShell isn't installed.|No local installation of PowerShell was found.|Ensure that PowerShell is properly installed on the machine. Instructions for installing PowerShell can be found [here](https://docs.microsoft.com/powershell/scripting/install/installing-powershell).|
|Az.Account module >= 2.2.0 isn’t installed.|The `Az.Account` module needed for authentication in Azure PowerShell isn't installed.|Install the latest `Az.Account` module. Installation instructions can be found [here](https://docs.microsoft.com/powershell/azure/install-az-ps). To use the Azure PowerShell credential, install the Azure Az PowerShell module: Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force|
|Please run 'Connect-AzAccount' to set up account.|No account is currently logged into Azure PowerShell.|<ul><li>Login to Azure PowerShell using the `Connect-AzAccount` command. More instructions for authenticating Azure PowerShell can be found [here](https://docs.microsoft.com/powershell/azure/authenticate-azureps)</li><li>Validate that Azure PowerShell can obtain tokens. See [below](#verify-azure-powershell-can-obtain-tokens) for instructions.</li></ul>|

#### Verify Azure PowerShell can obtain tokens

You can manually verify that Azure PowerShell is properly authenticated, and can obtain tokens. First, use the `Get-AzContext` command to verify the account which is currently logged into the Azure CLI. 

```
PS C:\> Get-AzContext
Name                                     Account             SubscriptionName    Environment         TenantId
----                                     -------             ----------------    -----------         --------
Subscription1 (xxxxxxxx-xxxx-xxxx-xxx... test@outlook.com    Subscription1       AzureCloud          xxxxxxxx-x...
```

Once you've verified Azure PowerShell is using the correct account, you can validate that it's able to obtain tokens for this account.

```powershell
Get-AzAccessToken -ResourceUrl "https://management.core.windows.net"
```
If the preceding command isn't working properly, follow the instructions to resolve the Azure PowerShell issue. Then try running the credential again.

>Note that output of this command will contain a valid access token, and SHOULD NOT BE SHARED to avoid compromising account security.

------------------------------------------------------------------------------------------------------------------------------------
If this guide doesn't help you diagnose the errors you're experiencing, [open an issue](https://github.com/Azure/azure-sdk-for-js/issues). To contribute to the SDK, read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).
