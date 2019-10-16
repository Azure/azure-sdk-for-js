// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RequestPolicy, RequestPolicyOptions } from "@azure/core-http";

import { CredentialPolicy } from "./CredentialPolicy";

/**
 * AnonymousCredentialPolicy is used with HTTP(S) requests that read public resources
 * or for use with Shared Access Signatures (SAS).
 *
 * @export
 * @class AnonymousCredentialPolicy
 * @extends {CredentialPolicy}
 */
export class AnonymousCredentialPolicy extends CredentialPolicy {
  /**
   * Creates an instance of AnonymousCredentialPolicy.
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @memberof AnonymousCredentialPolicy
   */
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }
}
