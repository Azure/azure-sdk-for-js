// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenCredential } from "@azure/core-http";
import { SystemCredential } from "./credentials/systemCredential";

export { AggregateCredential } from "./credentials/aggregateCredential";
export { IdentityClientOptions } from "./client/identityClient";
export { EnvironmentCredential } from "./credentials/environmentCredential";
export { ClientSecretCredential } from "./credentials/clientSecretCredential";
export { ClientCertificateCredential } from "./credentials/clientCertificateCredential";
export { ManagedIdentityCredential } from "./credentials/managedIdentityCredential";
export { SystemCredential } from "./credentials/systemCredential";

export { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";

export function getDefaultAzureCredential(): TokenCredential {
  return new SystemCredential();
}
