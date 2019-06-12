// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { IdentityClientOptions } from "../client/identityClient";
import { AggregateCredential } from "./aggregateCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";

export class SystemCredential extends AggregateCredential {
  constructor(identityClientOptions?: IdentityClientOptions) {
    super(
      new EnvironmentCredential(identityClientOptions),
      new ManagedIdentityCredential(undefined, identityClientOptions)
    );
  }
}
