// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { CredentialPolicy } from "../policies/CredentialPolicy";

/**
 * Credential is an abstract class for Azure Storage HTTP requests signing. This
 * class will host an credentialPolicyCreator factory which generates CredentialPolicy.
 */
export abstract class Credential implements RequestPolicyFactory {
  /**
   * Creates a RequestPolicy object.
   *
   * @param _nextPolicy -
   * @param _options -
   */
  public create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptions): RequestPolicy {
    throw new Error("Method should be implemented in children classes.");
  }
}

/**
 * A factory function that creates a new CredentialPolicy that uses the provided nextPolicy.
 */
export type CredentialPolicyCreator = (
  nextPolicy: RequestPolicy,
  options: RequestPolicyOptions
) => CredentialPolicy;
