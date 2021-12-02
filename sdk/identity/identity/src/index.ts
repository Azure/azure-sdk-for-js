// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export * from "./plugins/consumer";

export { IdentityPlugin } from "./plugins/provider";

import { TokenCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "./credentials/defaultAzureCredential";

export {
  AuthenticationError,
  ErrorResponse,
  AggregateAuthenticationError,
  AuthenticationErrorName,
  AggregateAuthenticationErrorName,
  CredentialUnavailableError,
  CredentialUnavailableErrorName,
  AuthenticationRequiredError,
  AuthenticationRequiredErrorOptions
} from "./errors";

export { AuthenticationRecord } from "./msal/types";
export { serializeAuthenticationRecord, deserializeAuthenticationRecord } from "./msal/utils";
export { TokenCredentialOptions } from "./tokenCredentialOptions";

// TODO: Export again once we're ready to release this feature.
// export { RegionalAuthority } from "./regionalAuthority";

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
export {
  ClientCertificateCredential,
  ClientCertificateCredentialPEMConfiguration
} from "./credentials/clientCertificateCredential";
export { ClientCertificateCredentialOptions } from "./credentials/clientCertificateCredentialOptions";
export { CredentialPersistenceOptions } from "./credentials/credentialPersistenceOptions";
export { AzureCliCredential } from "./credentials/azureCliCredential";
export { AzureCliCredentialOptions } from "./credentials/azureCliCredentialOptions";
export { InteractiveBrowserCredential } from "./credentials/interactiveBrowserCredential";
export {
  InteractiveBrowserCredentialNodeOptions,
  InteractiveBrowserCredentialInBrowserOptions,
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
  VisualStudioCodeCredential,
  VisualStudioCodeCredentialOptions
} from "./credentials/visualStudioCodeCredential";

export { OnBehalfOfCredential } from "./credentials/onBehalfOfCredential";
export {
  OnBehalfOfCredentialOptions,
  OnBehalfOfCredentialSecretOptions,
  OnBehalfOfCredentialCertificateOptions
} from "./credentials/onBehalfOfCredentialOptions";

export { TokenCachePersistenceOptions } from "./msal/nodeFlows/tokenCachePersistenceOptions";

export { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
export { logger } from "./util/logging";

export { AzureAuthorityHosts } from "./constants";

/**
 * Returns a new instance of the {@link DefaultAzureCredential}.
 */
export function getDefaultAzureCredential(): TokenCredential {
  return new DefaultAzureCredential();
}
