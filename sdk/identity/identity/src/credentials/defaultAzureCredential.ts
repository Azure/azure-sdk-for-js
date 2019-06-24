// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityClientOptions } from "../client/identityClient";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";

export class DefaultAzureCredential extends ChainedTokenCredential {
  constructor(identityClientOptions?: IdentityClientOptions) {
    super(
      new EnvironmentCredential(identityClientOptions),
      new ManagedIdentityCredential(undefined, identityClientOptions)
    );
  }
}
