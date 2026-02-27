// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * from "./plugins/consumer.js";

export type { IdentityPlugin } from "./plugins/provider.js";

import type { TokenCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "./credentials/defaultAzureCredential.js";

export {
  AuthenticationError,
  type ErrorResponse,
  AggregateAuthenticationError,
  AuthenticationErrorName,
  AggregateAuthenticationErrorName,
  CredentialUnavailableError,
  CredentialUnavailableErrorName,
  AuthenticationRequiredError,
  type AuthenticationRequiredErrorOptions,
} from "./errors.js";

export type { AuthenticationRecord } from "./msal/types.js";
export { serializeAuthenticationRecord, deserializeAuthenticationRecord } from "./msal/utils.js";
export type { TokenCredentialOptions } from "./tokenCredentialOptions.js";
export type { MultiTenantTokenCredentialOptions } from "./credentials/multiTenantTokenCredentialOptions.js";
export type { AuthorityValidationOptions } from "./credentials/authorityValidationOptions.js";
// TODO: Export again once we're ready to release this feature.
// export { RegionalAuthority } from "./regionalAuthority";

export type { BrokerAuthOptions } from "./credentials/brokerAuthOptions.js";
export type {
  BrokerOptions,
  BrokerEnabledOptions,
  BrokerDisabledOptions,
} from "./msal/nodeFlows/brokerOptions.js";
export type { InteractiveCredentialOptions } from "./credentials/interactiveCredentialOptions.js";

export { ChainedTokenCredential } from "./credentials/chainedTokenCredential.js";

export { ClientSecretCredential } from "./credentials/clientSecretCredential.js";
export type { ClientSecretCredentialOptions } from "./credentials/clientSecretCredentialOptions.js";

export { DefaultAzureCredential } from "./credentials/defaultAzureCredential.js";
export type {
  DefaultAzureCredentialOptions,
  DefaultAzureCredentialClientIdOptions,
  DefaultAzureCredentialResourceIdOptions,
  DefaultAzureCredentialEnvVars,
} from "./credentials/defaultAzureCredentialOptions.js";

export { EnvironmentCredential } from "./credentials/environmentCredential.js";
export type { EnvironmentCredentialOptions } from "./credentials/environmentCredentialOptions.js";

export { ClientCertificateCredential } from "./credentials/clientCertificateCredential.js";
export type {
  ClientCertificateCredentialPEMConfiguration,
  ClientCertificatePEMCertificatePath,
  ClientCertificatePEMCertificate,
} from "./credentials/clientCertificateCredentialModels.js";
export type { ClientCertificateCredentialOptions } from "./credentials/clientCertificateCredentialOptions.js";
export { ClientAssertionCredential } from "./credentials/clientAssertionCredential.js";
export type { ClientAssertionCredentialOptions } from "./credentials/clientAssertionCredentialOptions.js";
export type { CredentialPersistenceOptions } from "./credentials/credentialPersistenceOptions.js";
export { AzureCliCredential } from "./credentials/azureCliCredential.js";
export type { AzureCliCredentialOptions } from "./credentials/azureCliCredentialOptions.js";
export { AzureDeveloperCliCredential } from "./credentials/azureDeveloperCliCredential.js";
export type { AzureDeveloperCliCredentialOptions } from "./credentials/azureDeveloperCliCredentialOptions.js";
export { InteractiveBrowserCredential } from "./credentials/interactiveBrowserCredential.js";
export type {
  InteractiveBrowserCredentialNodeOptions,
  InteractiveBrowserCredentialInBrowserOptions,
  BrowserLoginStyle,
} from "./credentials/interactiveBrowserCredentialOptions.js";
export { ManagedIdentityCredential } from "./credentials/managedIdentityCredential/index.js";
export type {
  ManagedIdentityCredentialClientIdOptions,
  ManagedIdentityCredentialResourceIdOptions,
  ManagedIdentityCredentialObjectIdOptions,
} from "./credentials/managedIdentityCredential/options.js";
export { DeviceCodeCredential } from "./credentials/deviceCodeCredential.js";
export type {
  DeviceCodePromptCallback,
  DeviceCodeInfo,
} from "./credentials/deviceCodeCredentialOptions.js";
export type { DeviceCodeCredentialOptions } from "./credentials/deviceCodeCredentialOptions.js";
export { AzurePipelinesCredential as AzurePipelinesCredential } from "./credentials/azurePipelinesCredential.js";
export type { AzurePipelinesCredentialOptions as AzurePipelinesCredentialOptions } from "./credentials/azurePipelinesCredentialOptions.js";
export { AuthorizationCodeCredential } from "./credentials/authorizationCodeCredential.js";
export type { AuthorizationCodeCredentialOptions } from "./credentials/authorizationCodeCredentialOptions.js";
export { AzurePowerShellCredential } from "./credentials/azurePowerShellCredential.js";
export type { AzurePowerShellCredentialOptions } from "./credentials/azurePowerShellCredentialOptions.js";
export type {
  OnBehalfOfCredentialOptions,
  OnBehalfOfCredentialSecretOptions,
  OnBehalfOfCredentialCertificateOptions,
  OnBehalfOfCredentialAssertionOptions,
} from "./credentials/onBehalfOfCredentialOptions.js";
export { UsernamePasswordCredential } from "./credentials/usernamePasswordCredential.js";
export type { UsernamePasswordCredentialOptions } from "./credentials/usernamePasswordCredentialOptions.js";
export { VisualStudioCodeCredential } from "./credentials/visualStudioCodeCredential.js";
export type { VisualStudioCodeCredentialOptions } from "./credentials/visualStudioCodeCredentialOptions.js";
export { OnBehalfOfCredential } from "./credentials/onBehalfOfCredential.js";
export { WorkloadIdentityCredential } from "./credentials/workloadIdentityCredential.js";
export type { WorkloadIdentityCredentialOptions } from "./credentials/workloadIdentityCredentialOptions.js";
export type { BrowserCustomizationOptions } from "./credentials/browserCustomizationOptions.js";
export type { TokenCachePersistenceOptions } from "./msal/nodeFlows/tokenCachePersistenceOptions.js";

export { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
export { logger } from "./util/logging.js";

export { AzureAuthorityHosts } from "./constants.js";

/**
 * Returns a new instance of the {@link DefaultAzureCredential}.
 */
export function getDefaultAzureCredential(): TokenCredential {
  return new DefaultAzureCredential();
}

export { getBearerTokenProvider, type GetBearerTokenProviderOptions } from "./tokenProvider.js";
