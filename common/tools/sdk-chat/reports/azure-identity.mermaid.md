```mermaid
classDiagram
    class AzureAuthorityHosts {
    }
    class AuthorityValidationOptions {
        +disableInstanceDiscovery boolean
    }
    class AuthorizationCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AuthorizationCodeCredential(string  or  "common", string, string, string, string, AuthorizationCodeCredentialOptions)
        +AuthorizationCodeCredential(string  or  "common", string, string, string, AuthorizationCodeCredentialOptions)
    }
    class AuthorizationCodeCredentialOptions {
    }
    class AzureCliCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzureCliCredential(AzureCliCredentialOptions)
    }
    class AzureCliCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
        +subscription string
    }
    class AzureDeveloperCliCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzureDeveloperCliCredential(AzureDeveloperCliCredentialOptions)
    }
    class AzureDeveloperCliCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
    }
    class AzurePipelinesCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzurePipelinesCredential(string, string, string, string, AzurePipelinesCredentialOptions)
    }
    class AzurePipelinesCredentialOptions {
    }
    class AzurePowerShellCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzurePowerShellCredential(AzurePowerShellCredentialOptions)
    }
    class AzurePowerShellCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
    }
    class BrokerAuthOptions {
        +brokerOptions BrokerOptions
    }
    class BrowserCustomizationOptions {
        +browserCustomizationOptions (
        /**
         * Format for error messages for display in browser
         */
        errorMessage?: string;
        /**
         * Format for success messages for display in browser
         */
        successMessage?: string;
    )
    }
    class ChainedTokenCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ChainedTokenCredential(TokenCredential[])
    }
    class ClientAssertionCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientAssertionCredential(string, string, () =~ Promise~string~, ClientAssertionCredentialOptions)
    }
    class ClientAssertionCredentialOptions {
    }
    class ClientCertificateCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientCertificateCredential(string, string, string  or  ClientCertificateCredentialPEMConfiguration, ClientCertificateCredentialOptions)
    }
    class ClientCertificatePEMCertificate {
        +certificate string
        +certificatePassword string
    }
    class ClientCertificatePEMCertificatePath {
        +certificatePath string
        +certificatePassword string
    }
    class ClientCertificateCredentialPEMConfiguration {
    }
    class ClientCertificateCredentialOptions {
        +sendCertificateChain boolean
    }
    class ClientSecretCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientSecretCredential(string, string, string, ClientSecretCredentialOptions)
    }
    class ClientSecretCredentialOptions {
    }
    class CredentialPersistenceOptions {
        +tokenCachePersistenceOptions TokenCachePersistenceOptions
    }
    class DefaultAzureCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +DefaultAzureCredential(TokenCredentialOptions)
    }
    class DefaultAzureCredentialClientIdOptions {
        +managedIdentityClientId string
        +workloadIdentityClientId string
    }
    class DefaultAzureCredentialResourceIdOptions {
        +managedIdentityResourceId string
    }
    class DefaultAzureCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
        +requiredEnvVars DefaultAzureCredentialEnvVars  or  DefaultAzureCredentialEnvVars[]
    }
    class DefaultAzureCredentialEnvVars {
    }
    class DeviceCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +DeviceCodeCredential(DeviceCodeCredentialOptions)
    }
    class DeviceCodeInfo {
        +userCode string
        +verificationUri string
        +message string
    }
    class DeviceCodeCredentialOptions {
        +tenantId string
        +clientId string
        +userPromptCallback DeviceCodePromptCallback
    }
    class DeviceCodePromptCallback {
    }
    class EnvironmentCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +EnvironmentCredential(EnvironmentCredentialOptions)
    }
    class EnvironmentCredentialOptions {
    }
    class InteractiveBrowserCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +authenticate(string  or  string[], GetTokenOptions)
        +InteractiveBrowserCredential(InteractiveBrowserCredentialInBrowserOptions  or  InteractiveBrowserCredentialNodeOptions)
    }
    class InteractiveBrowserCredentialNodeOptions {
        +redirectUri string  or  (() =~ string)
        +tenantId string
        +clientId string
        +loginHint string
    }
    class InteractiveBrowserCredentialInBrowserOptions {
        +redirectUri string  or  (() =~ string)
        +tenantId string
        +clientId string
        +loginStyle BrowserLoginStyle
        +loginHint string
    }
    class BrowserLoginStyle {
    }
    class InteractiveCredentialOptions {
        +authenticationRecord AuthenticationRecord
        +disableAutomaticAuthentication boolean
    }
    class ManagedIdentityCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ManagedIdentityCredential(string, TokenCredentialOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialClientIdOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialResourceIdOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialObjectIdOptions)
    }
    class ManagedIdentityCredentialClientIdOptions {
        +clientId string
    }
    class ManagedIdentityCredentialResourceIdOptions {
        +resourceId string
    }
    class ManagedIdentityCredentialObjectIdOptions {
        +objectId string
    }
    class MultiTenantTokenCredentialOptions {
        +additionallyAllowedTenants string[]
    }
    class OnBehalfOfCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +OnBehalfOfCredential(OnBehalfOfCredentialOptions)
    }
    class OnBehalfOfCredentialSecretOptions {
        +tenantId string
        +clientId string
        +clientSecret string
        +userAssertionToken string
    }
    class OnBehalfOfCredentialCertificateOptions {
        +tenantId string
        +clientId string
        +certificatePath string
        +userAssertionToken string
        +sendCertificateChain boolean
    }
    class OnBehalfOfCredentialAssertionOptions {
        +getAssertion()
        +tenantId string
        +clientId string
        +userAssertionToken string
    }
    class OnBehalfOfCredentialOptions {
    }
    class UsernamePasswordCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +UsernamePasswordCredential(string, string, string, string, UsernamePasswordCredentialOptions)
    }
    class UsernamePasswordCredentialOptions {
    }
    class VisualStudioCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +VisualStudioCodeCredential(VisualStudioCodeCredentialOptions)
    }
    class VisualStudioCodeCredentialOptions {
        +tenantId string
    }
    class WorkloadIdentityCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +WorkloadIdentityCredential(WorkloadIdentityCredentialOptions)
    }
    class WorkloadIdentityCredentialOptions {
        +tenantId string
        +clientId string
        +tokenFilePath string
        +enableAzureProxy boolean
    }
    class CredentialUnavailableError {
        +CredentialUnavailableError(string, (
        cause?: unknown;
    ))
    }
    class AuthenticationError {
        +AuthenticationError(number, object  or  string  or  undefined  or  null, (
        cause?: unknown;
    ))
        +statusCode number
        +errorResponse ErrorResponse
    }
    class AggregateAuthenticationError {
        +AggregateAuthenticationError(any[], string)
        +errors any[]
    }
    class AuthenticationRequiredError {
        +AuthenticationRequiredError(AuthenticationRequiredErrorOptions)
        +scopes string[]
        +getTokenOptions GetTokenOptions
    }
    class ErrorResponse {
        +error string
        +errorDescription string
        +errorCodes number[]
        +timestamp string
        +traceId string
        +correlationId string
    }
    class AuthenticationRequiredErrorOptions {
        +scopes string[]
        +getTokenOptions GetTokenOptions
        +message string
        +cause unknown
    }
    class BrokerDisabledOptions {
        +enabled false
        +legacyEnableMsaPassthrough undefined
        +parentWindowHandle undefined
    }
    class BrokerEnabledOptions {
        +enabled true
        +legacyEnableMsaPassthrough boolean
        +parentWindowHandle Uint8Array
        +useDefaultBrokerAccount boolean
    }
    class BrokerOptions {
    }
    class TokenCachePersistenceOptions {
        +enabled boolean
        +name string
        +unsafeAllowUnencryptedStorage boolean
    }
    class AuthenticationRecord {
        +authority string
        +homeAccountId string
        +clientId string
        +tenantId string
        +username string
    }
    class IdentityPlugin {
    }
    class TokenCredentialOptions {
        +authorityHost string
        +loggingOptions LogPolicyOptions & (
        /**
         * Allows logging account information once the authentication flow succeeds.
         */
        allowLoggingAccountIdentifiers?: boolean;
        /**
         * Allows logging personally identifiable information for customer support.
         */
        enableUnsafeSupportLogging?: boolean;
    )
    }
    class GetBearerTokenProviderOptions {
        +abortSignal AbortSignal
        +tracingOptions (
        /**
         * Tracing Context for the current request to get a token.
         */
        tracingContext?: TracingContext;
    )
    }
    class AzureAuthorityHosts {
    }
    class AuthorityValidationOptions {
        +disableInstanceDiscovery boolean
    }
    class AuthorizationCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AuthorizationCodeCredential(string  or  "common", string, string, string, string, AuthorizationCodeCredentialOptions)
        +AuthorizationCodeCredential(string  or  "common", string, string, string, AuthorizationCodeCredentialOptions)
    }
    class AuthorizationCodeCredentialOptions {
    }
    class AzureCliCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzureCliCredential(AzureCliCredentialOptions)
    }
    class AzureCliCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
        +subscription string
    }
    class AzureDeveloperCliCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzureDeveloperCliCredential(AzureDeveloperCliCredentialOptions)
    }
    class AzureDeveloperCliCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
    }
    class AzurePipelinesCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzurePipelinesCredential(string, string, string, string, AzurePipelinesCredentialOptions)
    }
    class AzurePipelinesCredentialOptions {
    }
    class AzurePowerShellCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzurePowerShellCredential(AzurePowerShellCredentialOptions)
    }
    class AzurePowerShellCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
    }
    class BrokerAuthOptions {
        +brokerOptions BrokerOptions
    }
    class BrowserCustomizationOptions {
        +browserCustomizationOptions (
        /**
         * Format for error messages for display in browser
         */
        errorMessage?: string;
        /**
         * Format for success messages for display in browser
         */
        successMessage?: string;
    )
    }
    class ChainedTokenCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ChainedTokenCredential(TokenCredential[])
    }
    class ClientAssertionCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientAssertionCredential(string, string, () =~ Promise~string~, ClientAssertionCredentialOptions)
    }
    class ClientAssertionCredentialOptions {
    }
    class ClientCertificateCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientCertificateCredential(string, string, string, ClientCertificateCredentialOptions)
        +ClientCertificateCredential(string, string, ClientCertificatePEMCertificatePath, ClientCertificateCredentialOptions)
        +ClientCertificateCredential(string, string, ClientCertificatePEMCertificate, ClientCertificateCredentialOptions)
    }
    class ClientCertificatePEMCertificate {
        +certificate string
        +certificatePassword string
    }
    class ClientCertificatePEMCertificatePath {
        +certificatePath string
        +certificatePassword string
    }
    class ClientCertificateCredentialPEMConfiguration {
    }
    class ClientCertificateCredentialOptions {
        +sendCertificateChain boolean
    }
    class ClientSecretCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientSecretCredential(string, string, string, ClientSecretCredentialOptions)
    }
    class ClientSecretCredentialOptions {
    }
    class CredentialPersistenceOptions {
        +tokenCachePersistenceOptions TokenCachePersistenceOptions
    }
    class DefaultAzureCredential {
        +DefaultAzureCredential(DefaultAzureCredentialClientIdOptions)
        +DefaultAzureCredential(DefaultAzureCredentialResourceIdOptions)
        +DefaultAzureCredential(DefaultAzureCredentialOptions)
    }
    class DefaultAzureCredentialClientIdOptions {
        +managedIdentityClientId string
        +workloadIdentityClientId string
    }
    class DefaultAzureCredentialResourceIdOptions {
        +managedIdentityResourceId string
    }
    class DefaultAzureCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
        +requiredEnvVars DefaultAzureCredentialEnvVars  or  DefaultAzureCredentialEnvVars[]
    }
    class DefaultAzureCredentialEnvVars {
    }
    class DeviceCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +authenticate(string  or  string[], GetTokenOptions)
        +DeviceCodeCredential(DeviceCodeCredentialOptions)
    }
    class DeviceCodeInfo {
        +userCode string
        +verificationUri string
        +message string
    }
    class DeviceCodeCredentialOptions {
        +tenantId string
        +clientId string
        +userPromptCallback DeviceCodePromptCallback
    }
    class DeviceCodePromptCallback {
    }
    class EnvironmentCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +EnvironmentCredential(EnvironmentCredentialOptions)
    }
    class EnvironmentCredentialOptions {
    }
    class InteractiveBrowserCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +authenticate(string  or  string[], GetTokenOptions)
        +InteractiveBrowserCredential(InteractiveBrowserCredentialNodeOptions  or  InteractiveBrowserCredentialInBrowserOptions)
    }
    class InteractiveBrowserCredentialNodeOptions {
        +redirectUri string  or  (() =~ string)
        +tenantId string
        +clientId string
        +loginHint string
    }
    class InteractiveBrowserCredentialInBrowserOptions {
        +redirectUri string  or  (() =~ string)
        +tenantId string
        +clientId string
        +loginStyle BrowserLoginStyle
        +loginHint string
    }
    class BrowserLoginStyle {
    }
    class InteractiveCredentialOptions {
        +authenticationRecord AuthenticationRecord
        +disableAutomaticAuthentication boolean
    }
    class ManagedIdentityCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ManagedIdentityCredential(string, TokenCredentialOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialClientIdOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialResourceIdOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialObjectIdOptions)
    }
    class ManagedIdentityCredentialClientIdOptions {
        +clientId string
    }
    class ManagedIdentityCredentialResourceIdOptions {
        +resourceId string
    }
    class ManagedIdentityCredentialObjectIdOptions {
        +objectId string
    }
    class MultiTenantTokenCredentialOptions {
        +additionallyAllowedTenants string[]
    }
    class OnBehalfOfCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +OnBehalfOfCredential(OnBehalfOfCredentialCertificateOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions)
        +OnBehalfOfCredential(OnBehalfOfCredentialSecretOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions)
        +OnBehalfOfCredential(OnBehalfOfCredentialAssertionOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions)
    }
    class OnBehalfOfCredentialSecretOptions {
        +tenantId string
        +clientId string
        +clientSecret string
        +userAssertionToken string
    }
    class OnBehalfOfCredentialCertificateOptions {
        +tenantId string
        +clientId string
        +certificatePath string
        +userAssertionToken string
        +sendCertificateChain boolean
    }
    class OnBehalfOfCredentialAssertionOptions {
        +getAssertion()
        +tenantId string
        +clientId string
        +userAssertionToken string
    }
    class OnBehalfOfCredentialOptions {
    }
    class UsernamePasswordCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +UsernamePasswordCredential(string, string, string, string, UsernamePasswordCredentialOptions)
    }
    class UsernamePasswordCredentialOptions {
    }
    class VisualStudioCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +VisualStudioCodeCredential(VisualStudioCodeCredentialOptions)
    }
    class VisualStudioCodeCredentialOptions {
        +tenantId string
    }
    class WorkloadIdentityCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +WorkloadIdentityCredential(WorkloadIdentityCredentialOptions)
    }
    class WorkloadIdentityCredentialOptions {
        +tenantId string
        +clientId string
        +tokenFilePath string
        +enableAzureProxy boolean
    }
    class CredentialUnavailableError {
        +CredentialUnavailableError(string, (
        cause?: unknown;
    ))
    }
    class AuthenticationError {
        +AuthenticationError(number, object  or  string  or  undefined  or  null, (
        cause?: unknown;
    ))
        +statusCode number
        +errorResponse ErrorResponse
    }
    class AggregateAuthenticationError {
        +AggregateAuthenticationError(any[], string)
        +errors any[]
    }
    class AuthenticationRequiredError {
        +AuthenticationRequiredError(AuthenticationRequiredErrorOptions)
        +scopes string[]
        +getTokenOptions GetTokenOptions
    }
    class ErrorResponse {
        +error string
        +errorDescription string
        +errorCodes number[]
        +timestamp string
        +traceId string
        +correlationId string
    }
    class AuthenticationRequiredErrorOptions {
        +scopes string[]
        +getTokenOptions GetTokenOptions
        +message string
        +cause unknown
    }
    class BrokerDisabledOptions {
        +enabled false
        +legacyEnableMsaPassthrough undefined
        +parentWindowHandle undefined
    }
    class BrokerEnabledOptions {
        +enabled true
        +legacyEnableMsaPassthrough boolean
        +parentWindowHandle Uint8Array
        +useDefaultBrokerAccount boolean
    }
    class BrokerOptions {
    }
    class TokenCachePersistenceOptions {
        +enabled boolean
        +name string
        +unsafeAllowUnencryptedStorage boolean
    }
    class AuthenticationRecord {
        +authority string
        +homeAccountId string
        +clientId string
        +tenantId string
        +username string
    }
    class IdentityPlugin {
    }
    class TokenCredentialOptions {
        +authorityHost string
        +loggingOptions LogPolicyOptions & (
        /**
         * Allows logging account information once the authentication flow succeeds.
         */
        allowLoggingAccountIdentifiers?: boolean;
        /**
         * Allows logging personally identifiable information for customer support.
         */
        enableUnsafeSupportLogging?: boolean;
    )
    }
    class GetBearerTokenProviderOptions {
        +abortSignal AbortSignal
        +tracingOptions (
        /**
         * Tracing Context for the current request to get a token.
         */
        tracingContext?: TracingContext;
    )
    }
    class AzureAuthorityHosts {
    }
    class AuthorityValidationOptions {
        +disableInstanceDiscovery boolean
    }
    class AuthorizationCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AuthorizationCodeCredential(string  or  "common", string, string, string, string, AuthorizationCodeCredentialOptions)
        +AuthorizationCodeCredential(string  or  "common", string, string, string, AuthorizationCodeCredentialOptions)
    }
    class AuthorizationCodeCredentialOptions {
    }
    class AzureCliCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzureCliCredential(AzureCliCredentialOptions)
    }
    class AzureCliCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
        +subscription string
    }
    class AzureDeveloperCliCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzureDeveloperCliCredential(AzureDeveloperCliCredentialOptions)
    }
    class AzureDeveloperCliCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
    }
    class AzurePipelinesCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzurePipelinesCredential(string, string, string, string, AzurePipelinesCredentialOptions)
    }
    class AzurePipelinesCredentialOptions {
    }
    class AzurePowerShellCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzurePowerShellCredential(AzurePowerShellCredentialOptions)
    }
    class AzurePowerShellCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
    }
    class BrokerAuthOptions {
        +brokerOptions BrokerOptions
    }
    class BrowserCustomizationOptions {
        +browserCustomizationOptions (
        /**
         * Format for error messages for display in browser
         */
        errorMessage?: string;
        /**
         * Format for success messages for display in browser
         */
        successMessage?: string;
    )
    }
    class ChainedTokenCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ChainedTokenCredential(TokenCredential[])
    }
    class ClientAssertionCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientAssertionCredential(string, string, () =~ Promise~string~, ClientAssertionCredentialOptions)
    }
    class ClientAssertionCredentialOptions {
    }
    class ClientCertificateCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientCertificateCredential(string, string, string, ClientCertificateCredentialOptions)
        +ClientCertificateCredential(string, string, ClientCertificatePEMCertificatePath, ClientCertificateCredentialOptions)
        +ClientCertificateCredential(string, string, ClientCertificatePEMCertificate, ClientCertificateCredentialOptions)
    }
    class ClientCertificatePEMCertificate {
        +certificate string
        +certificatePassword string
    }
    class ClientCertificatePEMCertificatePath {
        +certificatePath string
        +certificatePassword string
    }
    class ClientCertificateCredentialPEMConfiguration {
    }
    class ClientCertificateCredentialOptions {
        +sendCertificateChain boolean
    }
    class ClientSecretCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientSecretCredential(string, string, string, ClientSecretCredentialOptions)
    }
    class ClientSecretCredentialOptions {
    }
    class CredentialPersistenceOptions {
        +tokenCachePersistenceOptions TokenCachePersistenceOptions
    }
    class DefaultAzureCredential {
        +DefaultAzureCredential(DefaultAzureCredentialClientIdOptions)
        +DefaultAzureCredential(DefaultAzureCredentialResourceIdOptions)
        +DefaultAzureCredential(DefaultAzureCredentialOptions)
    }
    class DefaultAzureCredentialClientIdOptions {
        +managedIdentityClientId string
        +workloadIdentityClientId string
    }
    class DefaultAzureCredentialResourceIdOptions {
        +managedIdentityResourceId string
    }
    class DefaultAzureCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
        +requiredEnvVars DefaultAzureCredentialEnvVars  or  DefaultAzureCredentialEnvVars[]
    }
    class DefaultAzureCredentialEnvVars {
    }
    class DeviceCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +authenticate(string  or  string[], GetTokenOptions)
        +DeviceCodeCredential(DeviceCodeCredentialOptions)
    }
    class DeviceCodeInfo {
        +userCode string
        +verificationUri string
        +message string
    }
    class DeviceCodeCredentialOptions {
        +tenantId string
        +clientId string
        +userPromptCallback DeviceCodePromptCallback
    }
    class DeviceCodePromptCallback {
    }
    class EnvironmentCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +EnvironmentCredential(EnvironmentCredentialOptions)
    }
    class EnvironmentCredentialOptions {
    }
    class InteractiveBrowserCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +authenticate(string  or  string[], GetTokenOptions)
        +InteractiveBrowserCredential(InteractiveBrowserCredentialNodeOptions  or  InteractiveBrowserCredentialInBrowserOptions)
    }
    class InteractiveBrowserCredentialNodeOptions {
        +redirectUri string  or  (() =~ string)
        +tenantId string
        +clientId string
        +loginHint string
    }
    class InteractiveBrowserCredentialInBrowserOptions {
        +redirectUri string  or  (() =~ string)
        +tenantId string
        +clientId string
        +loginStyle BrowserLoginStyle
        +loginHint string
    }
    class BrowserLoginStyle {
    }
    class InteractiveCredentialOptions {
        +authenticationRecord AuthenticationRecord
        +disableAutomaticAuthentication boolean
    }
    class ManagedIdentityCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ManagedIdentityCredential(string, TokenCredentialOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialClientIdOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialResourceIdOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialObjectIdOptions)
    }
    class ManagedIdentityCredentialClientIdOptions {
        +clientId string
    }
    class ManagedIdentityCredentialResourceIdOptions {
        +resourceId string
    }
    class ManagedIdentityCredentialObjectIdOptions {
        +objectId string
    }
    class MultiTenantTokenCredentialOptions {
        +additionallyAllowedTenants string[]
    }
    class OnBehalfOfCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +OnBehalfOfCredential(OnBehalfOfCredentialCertificateOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions)
        +OnBehalfOfCredential(OnBehalfOfCredentialSecretOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions)
        +OnBehalfOfCredential(OnBehalfOfCredentialAssertionOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions)
    }
    class OnBehalfOfCredentialSecretOptions {
        +tenantId string
        +clientId string
        +clientSecret string
        +userAssertionToken string
    }
    class OnBehalfOfCredentialCertificateOptions {
        +tenantId string
        +clientId string
        +certificatePath string
        +userAssertionToken string
        +sendCertificateChain boolean
    }
    class OnBehalfOfCredentialAssertionOptions {
        +getAssertion()
        +tenantId string
        +clientId string
        +userAssertionToken string
    }
    class OnBehalfOfCredentialOptions {
    }
    class UsernamePasswordCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +UsernamePasswordCredential(string, string, string, string, UsernamePasswordCredentialOptions)
    }
    class UsernamePasswordCredentialOptions {
    }
    class VisualStudioCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +VisualStudioCodeCredential(VisualStudioCodeCredentialOptions)
    }
    class VisualStudioCodeCredentialOptions {
        +tenantId string
    }
    class WorkloadIdentityCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +WorkloadIdentityCredential(WorkloadIdentityCredentialOptions)
    }
    class WorkloadIdentityCredentialOptions {
        +tenantId string
        +clientId string
        +tokenFilePath string
        +enableAzureProxy boolean
    }
    class CredentialUnavailableError {
        +CredentialUnavailableError(string, (
        cause?: unknown;
    ))
    }
    class AuthenticationError {
        +AuthenticationError(number, object  or  string  or  undefined  or  null, (
        cause?: unknown;
    ))
        +statusCode number
        +errorResponse ErrorResponse
    }
    class AggregateAuthenticationError {
        +AggregateAuthenticationError(any[], string)
        +errors any[]
    }
    class AuthenticationRequiredError {
        +AuthenticationRequiredError(AuthenticationRequiredErrorOptions)
        +scopes string[]
        +getTokenOptions GetTokenOptions
    }
    class ErrorResponse {
        +error string
        +errorDescription string
        +errorCodes number[]
        +timestamp string
        +traceId string
        +correlationId string
    }
    class AuthenticationRequiredErrorOptions {
        +scopes string[]
        +getTokenOptions GetTokenOptions
        +message string
        +cause unknown
    }
    class BrokerDisabledOptions {
        +enabled false
        +legacyEnableMsaPassthrough undefined
        +parentWindowHandle undefined
    }
    class BrokerEnabledOptions {
        +enabled true
        +legacyEnableMsaPassthrough boolean
        +parentWindowHandle Uint8Array
        +useDefaultBrokerAccount boolean
    }
    class BrokerOptions {
    }
    class TokenCachePersistenceOptions {
        +enabled boolean
        +name string
        +unsafeAllowUnencryptedStorage boolean
    }
    class AuthenticationRecord {
        +authority string
        +homeAccountId string
        +clientId string
        +tenantId string
        +username string
    }
    class IdentityPlugin {
    }
    class TokenCredentialOptions {
        +authorityHost string
        +loggingOptions LogPolicyOptions & (
        /**
         * Allows logging account information once the authentication flow succeeds.
         */
        allowLoggingAccountIdentifiers?: boolean;
        /**
         * Allows logging personally identifiable information for customer support.
         */
        enableUnsafeSupportLogging?: boolean;
    )
    }
    class GetBearerTokenProviderOptions {
        +abortSignal AbortSignal
        +tracingOptions (
        /**
         * Tracing Context for the current request to get a token.
         */
        tracingContext?: TracingContext;
    )
    }
    class AzureAuthorityHosts {
    }
    class AuthorityValidationOptions {
        +disableInstanceDiscovery boolean
    }
    class AuthorizationCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AuthorizationCodeCredential(string  or  "common", string, string, string, string, AuthorizationCodeCredentialOptions)
        +AuthorizationCodeCredential(string  or  "common", string, string, string, AuthorizationCodeCredentialOptions)
    }
    class AuthorizationCodeCredentialOptions {
    }
    class AzureCliCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzureCliCredential(AzureCliCredentialOptions)
    }
    class AzureCliCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
        +subscription string
    }
    class AzureDeveloperCliCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzureDeveloperCliCredential(AzureDeveloperCliCredentialOptions)
    }
    class AzureDeveloperCliCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
    }
    class AzurePipelinesCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzurePipelinesCredential(string, string, string, string, AzurePipelinesCredentialOptions)
    }
    class AzurePipelinesCredentialOptions {
    }
    class AzurePowerShellCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +AzurePowerShellCredential(AzurePowerShellCredentialOptions)
    }
    class AzurePowerShellCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
    }
    class BrokerAuthOptions {
        +brokerOptions BrokerOptions
    }
    class BrowserCustomizationOptions {
        +browserCustomizationOptions (
        /**
         * Format for error messages for display in browser
         */
        errorMessage?: string;
        /**
         * Format for success messages for display in browser
         */
        successMessage?: string;
    )
    }
    class ChainedTokenCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ChainedTokenCredential(TokenCredential[])
    }
    class ClientAssertionCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientAssertionCredential(string, string, () =~ Promise~string~, ClientAssertionCredentialOptions)
    }
    class ClientAssertionCredentialOptions {
    }
    class ClientCertificateCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientCertificateCredential(string, string, string, ClientCertificateCredentialOptions)
        +ClientCertificateCredential(string, string, ClientCertificatePEMCertificatePath, ClientCertificateCredentialOptions)
        +ClientCertificateCredential(string, string, ClientCertificatePEMCertificate, ClientCertificateCredentialOptions)
    }
    class ClientCertificatePEMCertificate {
        +certificate string
        +certificatePassword string
    }
    class ClientCertificatePEMCertificatePath {
        +certificatePath string
        +certificatePassword string
    }
    class ClientCertificateCredentialPEMConfiguration {
    }
    class ClientCertificateCredentialOptions {
        +sendCertificateChain boolean
    }
    class ClientSecretCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ClientSecretCredential(string, string, string, ClientSecretCredentialOptions)
    }
    class ClientSecretCredentialOptions {
    }
    class CredentialPersistenceOptions {
        +tokenCachePersistenceOptions TokenCachePersistenceOptions
    }
    class DefaultAzureCredential {
        +DefaultAzureCredential(DefaultAzureCredentialClientIdOptions)
        +DefaultAzureCredential(DefaultAzureCredentialResourceIdOptions)
        +DefaultAzureCredential(DefaultAzureCredentialOptions)
    }
    class DefaultAzureCredentialClientIdOptions {
        +managedIdentityClientId string
        +workloadIdentityClientId string
    }
    class DefaultAzureCredentialResourceIdOptions {
        +managedIdentityResourceId string
    }
    class DefaultAzureCredentialOptions {
        +tenantId string
        +processTimeoutInMs number
        +requiredEnvVars DefaultAzureCredentialEnvVars  or  DefaultAzureCredentialEnvVars[]
    }
    class DefaultAzureCredentialEnvVars {
    }
    class DeviceCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +authenticate(string  or  string[], GetTokenOptions)
        +DeviceCodeCredential(DeviceCodeCredentialOptions)
    }
    class DeviceCodeInfo {
        +userCode string
        +verificationUri string
        +message string
    }
    class DeviceCodeCredentialOptions {
        +tenantId string
        +clientId string
        +userPromptCallback DeviceCodePromptCallback
    }
    class DeviceCodePromptCallback {
    }
    class EnvironmentCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +EnvironmentCredential(EnvironmentCredentialOptions)
    }
    class EnvironmentCredentialOptions {
    }
    class InteractiveBrowserCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +authenticate(string  or  string[], GetTokenOptions)
        +InteractiveBrowserCredential(InteractiveBrowserCredentialNodeOptions  or  InteractiveBrowserCredentialInBrowserOptions)
    }
    class InteractiveBrowserCredentialNodeOptions {
        +redirectUri string  or  (() =~ string)
        +tenantId string
        +clientId string
        +loginHint string
    }
    class InteractiveBrowserCredentialInBrowserOptions {
        +redirectUri string  or  (() =~ string)
        +tenantId string
        +clientId string
        +loginStyle BrowserLoginStyle
        +loginHint string
    }
    class BrowserLoginStyle {
    }
    class InteractiveCredentialOptions {
        +authenticationRecord AuthenticationRecord
        +disableAutomaticAuthentication boolean
    }
    class ManagedIdentityCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +ManagedIdentityCredential(string, TokenCredentialOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialClientIdOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialResourceIdOptions)
        +ManagedIdentityCredential(ManagedIdentityCredentialObjectIdOptions)
    }
    class ManagedIdentityCredentialClientIdOptions {
        +clientId string
    }
    class ManagedIdentityCredentialResourceIdOptions {
        +resourceId string
    }
    class ManagedIdentityCredentialObjectIdOptions {
        +objectId string
    }
    class MultiTenantTokenCredentialOptions {
        +additionallyAllowedTenants string[]
    }
    class OnBehalfOfCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +OnBehalfOfCredential(OnBehalfOfCredentialCertificateOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions)
        +OnBehalfOfCredential(OnBehalfOfCredentialSecretOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions)
        +OnBehalfOfCredential(OnBehalfOfCredentialAssertionOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions)
    }
    class OnBehalfOfCredentialSecretOptions {
        +tenantId string
        +clientId string
        +clientSecret string
        +userAssertionToken string
    }
    class OnBehalfOfCredentialCertificateOptions {
        +tenantId string
        +clientId string
        +certificatePath string
        +userAssertionToken string
        +sendCertificateChain boolean
    }
    class OnBehalfOfCredentialAssertionOptions {
        +getAssertion()
        +tenantId string
        +clientId string
        +userAssertionToken string
    }
    class OnBehalfOfCredentialOptions {
    }
    class UsernamePasswordCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +UsernamePasswordCredential(string, string, string, string, UsernamePasswordCredentialOptions)
    }
    class UsernamePasswordCredentialOptions {
    }
    class VisualStudioCodeCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +VisualStudioCodeCredential(VisualStudioCodeCredentialOptions)
    }
    class VisualStudioCodeCredentialOptions {
        +tenantId string
    }
    class WorkloadIdentityCredential {
        +getToken(string  or  string[], GetTokenOptions)
        +WorkloadIdentityCredential(WorkloadIdentityCredentialOptions)
    }
    class WorkloadIdentityCredentialOptions {
        +tenantId string
        +clientId string
        +tokenFilePath string
        +enableAzureProxy boolean
    }
    class CredentialUnavailableError {
        +CredentialUnavailableError(string, (
        cause?: unknown;
    ))
    }
    class AuthenticationError {
        +AuthenticationError(number, object  or  string  or  undefined  or  null, (
        cause?: unknown;
    ))
        +statusCode number
        +errorResponse ErrorResponse
    }
    class AggregateAuthenticationError {
        +AggregateAuthenticationError(any[], string)
        +errors any[]
    }
    class AuthenticationRequiredError {
        +AuthenticationRequiredError(AuthenticationRequiredErrorOptions)
        +scopes string[]
        +getTokenOptions GetTokenOptions
    }
    class ErrorResponse {
        +error string
        +errorDescription string
        +errorCodes number[]
        +timestamp string
        +traceId string
        +correlationId string
    }
    class AuthenticationRequiredErrorOptions {
        +scopes string[]
        +getTokenOptions GetTokenOptions
        +message string
        +cause unknown
    }
    class BrokerDisabledOptions {
        +enabled false
        +legacyEnableMsaPassthrough undefined
        +parentWindowHandle undefined
    }
    class BrokerEnabledOptions {
        +enabled true
        +legacyEnableMsaPassthrough boolean
        +parentWindowHandle Uint8Array
        +useDefaultBrokerAccount boolean
    }
    class BrokerOptions {
    }
    class TokenCachePersistenceOptions {
        +enabled boolean
        +name string
        +unsafeAllowUnencryptedStorage boolean
    }
    class AuthenticationRecord {
        +authority string
        +homeAccountId string
        +clientId string
        +tenantId string
        +username string
    }
    class IdentityPlugin {
    }
    class TokenCredentialOptions {
        +authorityHost string
        +loggingOptions LogPolicyOptions & (
        /**
         * Allows logging account information once the authentication flow succeeds.
         */
        allowLoggingAccountIdentifiers?: boolean;
        /**
         * Allows logging personally identifiable information for customer support.
         */
        enableUnsafeSupportLogging?: boolean;
    )
    }
    class GetBearerTokenProviderOptions {
        +abortSignal AbortSignal
        +tracingOptions (
        /**
         * Tracing Context for the current request to get a token.
         */
        tracingContext?: TracingContext;
    )
    }
    AuthorizationCodeCredential --> AuthorizationCodeCredentialOptions : uses
    AzureCliCredential --> AzureCliCredentialOptions : uses
    AzureDeveloperCliCredential --> AzureDeveloperCliCredentialOptions : uses
    AzurePipelinesCredential --> AzurePipelinesCredentialOptions : uses
    AzurePowerShellCredential --> AzurePowerShellCredentialOptions : uses
    BrokerAuthOptions --> BrokerOptions : has
    ClientAssertionCredential --> ClientAssertionCredentialOptions : uses
    ClientCertificateCredential --> ClientCertificateCredentialOptions : uses
    ClientSecretCredential --> ClientSecretCredentialOptions : uses
    CredentialPersistenceOptions --> TokenCachePersistenceOptions : has
    DefaultAzureCredential --> TokenCredentialOptions : uses
    DeviceCodeCredential --> DeviceCodeCredentialOptions : uses
    DeviceCodeCredentialOptions --> DeviceCodePromptCallback : has
    EnvironmentCredential --> EnvironmentCredentialOptions : uses
    InteractiveBrowserCredentialInBrowserOptions --> BrowserLoginStyle : has
    InteractiveCredentialOptions --> AuthenticationRecord : has
    ManagedIdentityCredential --> TokenCredentialOptions : uses
    ManagedIdentityCredential --> ManagedIdentityCredentialClientIdOptions : uses
    ManagedIdentityCredential --> ManagedIdentityCredentialResourceIdOptions : uses
    ManagedIdentityCredential --> ManagedIdentityCredentialObjectIdOptions : uses
    OnBehalfOfCredential --> OnBehalfOfCredentialOptions : uses
    UsernamePasswordCredential --> UsernamePasswordCredentialOptions : uses
    VisualStudioCodeCredential --> VisualStudioCodeCredentialOptions : uses
    WorkloadIdentityCredential --> WorkloadIdentityCredentialOptions : uses
    AuthenticationError --> ErrorResponse : has
    AuthenticationRequiredError --> AuthenticationRequiredErrorOptions : uses
    ClientCertificateCredential --> ClientCertificatePEMCertificatePath : uses
    ClientCertificateCredential --> ClientCertificatePEMCertificate : uses
    DefaultAzureCredential --> DefaultAzureCredentialClientIdOptions : uses
    DefaultAzureCredential --> DefaultAzureCredentialResourceIdOptions : uses
    DefaultAzureCredential --> DefaultAzureCredentialOptions : uses
```
