// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RequestPolicy, RequestPolicyOptions } from "@azure/core-http";

import { AnonymousCredentialPolicy } from "../policies/AnonymousCredentialPolicy";
import { Credential } from "./Credential";

/**
 * AnonymousCredential provides a credentialPolicyCreator member used to create
 * AnonymousCredentialPolicy objects. AnonymousCredentialPolicy is used with
 * HTTP(S) requests that read public resources or for use with Shared Access
 * Signatures (SAS).
 *
 * @export
 * @class AnonymousCredential
 * @extends {Credential}
 */
export class AnonymousCredential extends Credential {
  /**
   * Creates an {@link AnonymousCredentialPolicy} object.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {AnonymousCredentialPolicy}
   * @memberof AnonymousCredential
   */
  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): AnonymousCredentialPolicy {
    return new AnonymousCredentialPolicy(nextPolicy, options);
  }
}
