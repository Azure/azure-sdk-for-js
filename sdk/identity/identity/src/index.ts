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
export { DeviceCodeCredential } from "./credentials/deviceCodeCredential";
export { DefaultAzureCredential } from "./credentials/defaultAzureCredential";
export { UsernamePasswordCredential } from "./credentials/usernamePasswordCredential";
export { AuthorizationCodeCredential } from "./credentials/authorizationCodeCredential";
export {
  AuthenticationError,
  AggregateAuthenticationError,
  AuthenticationErrorName,
  AggregateAuthenticationErrorName
} from "./client/errors";

export { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";

export function getDefaultAzureCredential(): TokenCredential {
  return new DefaultAzureCredential();
}
