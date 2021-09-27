// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export * from "./plugins/consumer";

export { IdentityPlugin } from "./plugins/provider";

import { TokenCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "./credentials/defaultAzureCredential";

export { AuthenticationRecord } from "./msal/types";
export { AuthenticationRequiredError } from "./msal/errors";
export { serializeAuthenticationRecord, deserializeAuthenticationRecord } from "./msal/utils";
export { TokenCredentialOptions } from "./client/identityClient";
export { RegionalAuthority } from "./regionalAuthority";
export { InteractiveCredentialOptions } from "./credentials/interactiveCredentialOptions";

export { ChainedTokenCredential } from "./credentials/chainedTokenCredential";
export {
  DefaultAzureCredential,
  DefaultAzureCredentialOptions
} from "./credentials/defaultAzureCredential";
export {
  EnvironmentCredential,
  EnvironmentCredentialOptions
} from "./credentials/environmentCredential";
export { ClientSecretCredential } from "./credentials/clientSecretCredential";
export { ClientSecretCredentialOptions } from "./credentials/clientSecretCredentialOptions";
export { ClientCertificateCredential } from "./credentials/clientCertificateCredential";
export { ClientCertificateCredentialOptions } from "./credentials/clientCertificateCredentialOptions";
export { CredentialPersistenceOptions } from "./credentials/credentialPersistenceOptions";
export { AzureCliCredential } from "./credentials/azureCliCredential";
export { AzureCliCredentialOptions } from "./credentials/azureCliCredentialOptions";
export { InteractiveBrowserCredential } from "./credentials/interactiveBrowserCredential";
export {
  InteractiveBrowserCredentialOptions,
  InteractiveBrowserCredentialBrowserOptions,
  BrowserLoginStyle
} from "./credentials/interactiveBrowserCredentialOptions";
export { ManagedIdentityCredential } from "./credentials/managedIdentityCredential";
export { DeviceCodeCredential } from "./credentials/deviceCodeCredential";
export {
  DeviceCodePromptCallback,
  DeviceCodeInfo
} from "./credentials/deviceCodeCredentialOptions";
export { DeviceCodeCredentialOptions } from "./credentials/deviceCodeCredentialOptions";
export { UsernamePasswordCredential } from "./credentials/usernamePasswordCredential";
export { UsernamePasswordCredentialOptions } from "./credentials/usernamePasswordCredentialOptions";
export { AuthorizationCodeCredential } from "./credentials/authorizationCodeCredential";
export { AzurePowerShellCredential } from "./credentials/azurePowerShellCredential";
export { AzurePowerShellCredentialOptions } from "./credentials/azurePowerShellCredentialOptions";
export {
  ApplicationCredential,
  ApplicationCredentialOptions
} from "./credentials/applicationCredential";

export {
  VisualStudioCodeCredential,
  VisualStudioCodeCredentialOptions
} from "./credentials/visualStudioCodeCredential";

export {
  OnBehalfOfCredential,
  OnBehalfOfCredentialSecretConfiguration,
  OnBehalfOfCredentialCertificateConfiguration
} from "./credentials/onBehalfOfCredential";
export { OnBehalfOfCredentialOptions } from "./credentials/onBehalfOfCredentialOptions";

export { TokenCachePersistenceOptions } from "./msal/nodeFlows/tokenCachePersistenceOptions";

export {
  AuthenticationError,
  ErrorResponse,
  AggregateAuthenticationError,
  AuthenticationErrorName,
  AggregateAuthenticationErrorName,
  CredentialUnavailableError,
  CredentialUnavailableErrorName
} from "./client/errors";

export { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
export { logger } from "./util/logging";

export { AzureAuthorityHosts } from "./constants";

/**
 * Returns a new instance of the {@link DefaultAzureCredential}.
 */
export function getDefaultAzureCredential(): TokenCredential {
  return new DefaultAzureCredential();
}
