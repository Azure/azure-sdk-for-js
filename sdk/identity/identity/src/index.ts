// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential } from "@azure/core-http";
import { DefaultAzureCredential } from "./credentials/defaultAzureCredential";

export { ChainedTokenCredential } from "./credentials/chainedTokenCredential";
export { IdentityClientOptions } from "./client/identityClient";
export { EnvironmentCredential } from "./credentials/environmentCredential";
export { ClientSecretCredential } from "./credentials/clientSecretCredential";
export { ClientCertificateCredential } from "./credentials/clientCertificateCredential";
export { InteractiveBrowserCredential } from "./credentials/interactiveBrowserCredential";
export {
  InteractiveBrowserCredentialOptions,
  BrowserLoginStyle
} from "./credentials/interactiveBrowserCredentialOptions";
export { ManagedIdentityCredential } from "./credentials/managedIdentityCredential";
export {
  DeviceCodeCredential,
  DeviceCodePromptCallback,
  DeviceCodeDetails
} from "./credentials/deviceCodeCredential";

export { DeviceCodeCredentialOptions } from "./credentials/deviceCodeCredentialOptions";
export { DefaultAzureCredential } from "./credentials/defaultAzureCredential";
export { UsernamePasswordCredential } from "./credentials/usernamePasswordCredential";
export { AuthorizationCodeCredential } from "./credentials/authorizationCodeCredential";
export { AuthorizationCodeCredentialOptions } from "./credentials/authorizationCodeCredentialOptions";
export {
  AuthenticationError,
  ErrorResponse,
  AggregateAuthenticationError,
  AuthenticationErrorName,
  AggregateAuthenticationErrorName
} from "./client/errors";

export { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
export { logger } from "./util/logging";

/**
 * Returns a new instance of the {@link DefaultAzureCredential}.
 */
export function getDefaultAzureCredential(): TokenCredential {
  return new DefaultAzureCredential();
}
