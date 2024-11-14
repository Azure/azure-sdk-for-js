// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * from "./plugins/consumer.js";

export { IdentityPlugin } from "./plugins/provider.js";

import type { TokenCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "./credentials/defaultAzureCredential.js";

export {
  AuthenticationError,
  ErrorResponse,
  AggregateAuthenticationError,
  AuthenticationErrorName,
  AggregateAuthenticationErrorName,
  CredentialUnavailableError,
  CredentialUnavailableErrorName,
  AuthenticationRequiredError,
  AuthenticationRequiredErrorOptions,
} from "./errors.js";

export { AuthenticationRecord } from "./msal/types.js";
export { serializeAuthenticationRecord, deserializeAuthenticationRecord } from "./msal/utils.js";
export { TokenCredentialOptions } from "./tokenCredentialOptions.js";
export { MultiTenantTokenCredentialOptions } from "./credentials/multiTenantTokenCredentialOptions.js";
export { AuthorityValidationOptions } from "./credentials/authorityValidationOptions.js";
// TODO: Export again once we're ready to release this feature.
// export { RegionalAuthority } from "./regionalAuthority";

export { BrokerAuthOptions } from "./credentials/brokerAuthOptions.js";
export {
  BrokerOptions,
  BrokerEnabledOptions,
  BrokerDisabledOptions,
} from "./msal/nodeFlows/brokerOptions.js";
export { InteractiveCredentialOptions } from "./credentials/interactiveCredentialOptions.js";

export { ChainedTokenCredential } from "./credentials/chainedTokenCredential.js";

export { ClientSecretCredential } from "./credentials/clientSecretCredential.js";
export { ClientSecretCredentialOptions } from "./credentials/clientSecretCredentialOptions.js";

export { DefaultAzureCredential } from "./credentials/defaultAzureCredential.js";
export {
  DefaultAzureCredentialOptions,
  DefaultAzureCredentialClientIdOptions,
  DefaultAzureCredentialResourceIdOptions,
} from "./credentials/defaultAzureCredentialOptions.js";

export { EnvironmentCredential } from "./credentials/environmentCredential.js";
export { EnvironmentCredentialOptions } from "./credentials/environmentCredentialOptions.js";

export {
  ClientCertificateCredential,
  ClientCertificateCredentialPEMConfiguration,
  ClientCertificatePEMCertificatePath,
  ClientCertificatePEMCertificate,
} from "./credentials/clientCertificateCredential.js";
export { ClientCertificateCredentialOptions } from "./credentials/clientCertificateCredentialOptions.js";
export { ClientAssertionCredential } from "./credentials/clientAssertionCredential.js";
export { ClientAssertionCredentialOptions } from "./credentials/clientAssertionCredentialOptions.js";
export { CredentialPersistenceOptions } from "./credentials/credentialPersistenceOptions.js";
export { AzureCliCredential } from "./credentials/azureCliCredential.js";
export { AzureCliCredentialOptions } from "./credentials/azureCliCredentialOptions.js";
export { AzureDeveloperCliCredential } from "./credentials/azureDeveloperCliCredential.js";
export { AzureDeveloperCliCredentialOptions } from "./credentials/azureDeveloperCliCredentialOptions.js";
export { InteractiveBrowserCredential } from "./credentials/interactiveBrowserCredential.js";
export {
  InteractiveBrowserCredentialNodeOptions,
  InteractiveBrowserCredentialInBrowserOptions,
  BrowserLoginStyle,
} from "./credentials/interactiveBrowserCredentialOptions.js";
export {
  ManagedIdentityCredential,
  ManagedIdentityCredentialClientIdOptions,
  ManagedIdentityCredentialResourceIdOptions,
  ManagedIdentityCredentialObjectIdOptions,
} from "./credentials/managedIdentityCredential/index.js";
export { DeviceCodeCredential } from "./credentials/deviceCodeCredential.js";
export {
  DeviceCodePromptCallback,
  DeviceCodeInfo,
} from "./credentials/deviceCodeCredentialOptions.js";
export { DeviceCodeCredentialOptions } from "./credentials/deviceCodeCredentialOptions.js";
export { AzurePipelinesCredential as AzurePipelinesCredential } from "./credentials/azurePipelinesCredential.js";
export { AzurePipelinesCredentialOptions as AzurePipelinesCredentialOptions } from "./credentials/azurePipelinesCredentialOptions.js";
export { AuthorizationCodeCredential } from "./credentials/authorizationCodeCredential.js";
export { AuthorizationCodeCredentialOptions } from "./credentials/authorizationCodeCredentialOptions.js";
export { AzurePowerShellCredential } from "./credentials/azurePowerShellCredential.js";
export { AzurePowerShellCredentialOptions } from "./credentials/azurePowerShellCredentialOptions.js";
export {
  OnBehalfOfCredentialOptions,
  OnBehalfOfCredentialSecretOptions,
  OnBehalfOfCredentialCertificateOptions,
  OnBehalfOfCredentialAssertionOptions,
} from "./credentials/onBehalfOfCredentialOptions.js";
export { UsernamePasswordCredential } from "./credentials/usernamePasswordCredential.js";
export { UsernamePasswordCredentialOptions } from "./credentials/usernamePasswordCredentialOptions.js";
export { VisualStudioCodeCredential } from "./credentials/visualStudioCodeCredential.js";
export { VisualStudioCodeCredentialOptions } from "./credentials/visualStudioCodeCredentialOptions.js";
export { OnBehalfOfCredential } from "./credentials/onBehalfOfCredential.js";
export { WorkloadIdentityCredential } from "./credentials/workloadIdentityCredential.js";
export { WorkloadIdentityCredentialOptions } from "./credentials/workloadIdentityCredentialOptions.js";
export { BrowserCustomizationOptions } from "./credentials/browserCustomizationOptions.js";
export { TokenCachePersistenceOptions } from "./msal/nodeFlows/tokenCachePersistenceOptions.js";

export { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
export { logger } from "./util/logging.js";

export { AzureAuthorityHosts } from "./constants.js";

/**
 * Returns a new instance of the {@link DefaultAzureCredential}.
 */
export function getDefaultAzureCredential(): TokenCredential {
  return new DefaultAzureCredential();
}

export { getBearerTokenProvider, GetBearerTokenProviderOptions } from "./tokenProvider.js";
