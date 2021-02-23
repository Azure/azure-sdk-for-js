// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestPolicy, RequestPolicyOptions } from "@azure/core-http";

import { CredentialPolicy } from "./CredentialPolicy";

/**
 * AnonymousCredentialPolicy is used with HTTP(S) requests that read public resources
 * or for use with Shared Access Signatures (SAS).
 */
export class AnonymousCredentialPolicy extends CredentialPolicy {
  /**
   * Creates an instance of AnonymousCredentialPolicy.
   * @param nextPolicy -
   * @param options -
   */
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }
}
