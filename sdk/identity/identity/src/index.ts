// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenCredential } from "@azure/core-http";
import { EnvironmentCredential } from "./credentials/environmentCredential";

export { AccessToken } from "./credentials/accessToken";
export { AggregateCredential } from "./credentials/aggregateCredential";
export { IdentityClientOptions } from "./client/identityClient";
export { EnvironmentCredential } from "./credentials/environmentCredential";
export { ClientSecretCredential } from "./credentials/clientSecretCredential";

export function getDefaultAzureCredential(): TokenCredential {
  return new EnvironmentCredential();
}
