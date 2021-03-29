// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-http";
import { DefaultAzureCredential } from "./credentials/defaultAzureCredential";

export { AuthenticationRecord } from "./msal/types";
export { AuthenticationRequired } from "./msal/errors";
export { deserializeAuthenticationRecord } from "./msal/transformations";
export { TokenCredentialOptions } from "./client/identityClient";
export { PersistentCredentialOptions } from "./credentials/persistentCredentialOptions";
export { InteractiveCredentialOptions } from "./credentials/interactiveCredentialOptions";
export { TokenCachePersistenceOptions } from "./tokenCache/persistencePlatforms";

export { ChainedTokenCredential } from "./credentials/chainedTokenCredential";
export {
  DefaultAzureCredential,
  DefaultAzureCredentialOptions
} from "./credentials/defaultAzureCredential";
export { EnvironmentCredential } from "./credentials/environmentCredential";
export { ClientSecretCredential } from "./credentials/clientSecretCredential";
export { ClientSecretCredentialOptions } from "./credentials/clientSecretCredentialOptions";
export { ClientCertificateCredential } from "./credentials/clientCertificateCredential";
export { ClientCertificateCredentialOptions } from "./credentials/clientCertificateCredentialOptions";
export {
  VisualStudioCodeCredential,
  VisualStudioCodeCredentialOptions
} from "./credentials/visualStudioCodeCredential";
export { AzureCliCredential } from "./credentials/azureCliCredential";
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

export {
  AuthenticationError,
  ErrorResponse,
  AggregateAuthenticationError,
  AuthenticationErrorName,
  AggregateAuthenticationErrorName,
  CredentialUnavailable,
  CredentialUnavailableName
} from "./client/errors";

export { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
export { logger } from "./util/logging";

export { AzureAuthorityHosts } from "./constants";

/**
 * Returns a new instance of the {@link DefaultAzureCredential}.
 */
export function getDefaultAzureCredential(): TokenCredential {
  return new DefaultAzureCredential();
}
