// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { 
  IdentityPlugin,
  useIdentityPlugin,
  MultiTenantTokenCredentialOptions,
  AuthenticationRecord,
  serializeAuthenticationRecord, 
  deserializeAuthenticationRecord,
  TokenCredentialOptions,
  TokenCachePersistenceOptions,
  logger,
  AzureAuthorityHosts,
  AuthenticationError,
  ErrorResponse,
  AggregateAuthenticationError,
  AuthenticationErrorName,
  AggregateAuthenticationErrorName,
  CredentialUnavailableError,
  CredentialUnavailableErrorName,
  AuthenticationRequiredError,
  AuthenticationRequiredErrorOptions } from "@azure/identity-common";

import { DefaultAzureCredential } from "./credentials/defaultAzureCredential";

export {
  IdentityPlugin,
  useIdentityPlugin,
  MultiTenantTokenCredentialOptions,
  AuthenticationRecord,
  serializeAuthenticationRecord, 
  deserializeAuthenticationRecord,
  TokenCredentialOptions,
  TokenCachePersistenceOptions,
  logger,
  AzureAuthorityHosts,
  AuthenticationError,
  ErrorResponse,
  AggregateAuthenticationError,
  AuthenticationErrorName,
  AggregateAuthenticationErrorName,
  CredentialUnavailableError,
  CredentialUnavailableErrorName,
  AuthenticationRequiredError,
  AuthenticationRequiredErrorOptions
};

// TODO: Export again once we're ready to release this feature.
// export { RegionalAuthority } from "./regionalAuthority";

export { InteractiveCredentialOptions } from "./credentials/interactiveCredentialOptions";

export { ChainedTokenCredential } from "./credentials/chainedTokenCredential";

export { ClientSecretCredential } from "./credentials/clientSecretCredential";
export { ClientSecretCredentialOptions } from "./credentials/clientSecretCredentialOptions";

export { DefaultAzureCredential } from "./credentials/defaultAzureCredential";
export {
  DefaultAzureCredentialOptions,
  DefaultAzureCredentialClientIdOptions,
  DefaultAzureCredentialResourceIdOptions,
} from "./credentials/defaultAzureCredentialOptions";

export { EnvironmentCredential } from "./credentials/environmentCredential";
export { EnvironmentCredentialOptions } from "./credentials/environmentCredentialOptions";

export {
  ClientCertificateCredential,
  ClientCertificateCredentialPEMConfiguration,
  ClientCertificatePEMCertificatePath,
  ClientCertificatePEMCertificate,
} from "./credentials/clientCertificateCredential";
export { ClientCertificateCredentialOptions } from "./credentials/clientCertificateCredentialOptions";
export { ClientAssertionCredential } from "./credentials/clientAssertionCredential";
export { ClientAssertionCredentialOptions } from "./credentials/clientAssertionCredentialOptions";
export { CredentialPersistenceOptions } from "./credentials/credentialPersistenceOptions";
export { AzureCliCredential } from "./credentials/azureCliCredential";
export { AzureCliCredentialOptions } from "./credentials/azureCliCredentialOptions";
export { InteractiveBrowserCredential } from "./credentials/interactiveBrowserCredential";
export {
  InteractiveBrowserCredentialNodeOptions,
  InteractiveBrowserCredentialInBrowserOptions,
  BrowserLoginStyle,
} from "./credentials/interactiveBrowserCredentialOptions";
export {
  ManagedIdentityCredential,
  ManagedIdentityCredentialClientIdOptions,
  ManagedIdentityCredentialResourceIdOptions,
} from "./credentials/managedIdentityCredential";
export { DeviceCodeCredential } from "./credentials/deviceCodeCredential";
export {
  DeviceCodePromptCallback,
  DeviceCodeInfo,
} from "./credentials/deviceCodeCredentialOptions";
export { DeviceCodeCredentialOptions } from "./credentials/deviceCodeCredentialOptions";

export { AuthorizationCodeCredential } from "./credentials/authorizationCodeCredential";
export { AuthorizationCodeCredentialOptions } from "./credentials/authorizationCodeCredentialOptions";
export { AzurePowerShellCredential } from "./credentials/azurePowerShellCredential";
export { AzurePowerShellCredentialOptions } from "./credentials/azurePowerShellCredentialOptions";
export {
  OnBehalfOfCredentialOptions,
  OnBehalfOfCredentialSecretOptions,
  OnBehalfOfCredentialCertificateOptions,
} from "./credentials/onBehalfOfCredentialOptions";
export { UsernamePasswordCredential } from "./credentials/usernamePasswordCredential";
export { UsernamePasswordCredentialOptions } from "./credentials/usernamePasswordCredentialOptions";
export { VisualStudioCodeCredential } from "./credentials/visualStudioCodeCredential";
export { VisualStudioCodeCredentialOptions } from "./credentials/visualStudioCodeCredentialOptions";
export { OnBehalfOfCredential } from "./credentials/onBehalfOfCredential";

export { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";

/**
 * Returns a new instance of the {@link DefaultAzureCredential}.
 */
export function getDefaultAzureCredential(): TokenCredential {
  return new DefaultAzureCredential();
}
