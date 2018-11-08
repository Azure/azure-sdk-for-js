import {
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "ms-rest-js";

import { CredentialPolicy } from "../policies/CredentialPolicy";

/**
 * Credential is an abstract class for Azure Storage HTTP requests signing. This
 * class will host an credentialPolicyCreator factory which generates CredentialPolicy.
 *
 * @export
 * @abstract
 * @class Credential
 */
export abstract class Credential implements RequestPolicyFactory {
  /**
   * Creates a RequestPolicy object.
   *
   * @param {RequestPolicy} _nextPolicy
   * @param {RequestPolicyOptions} _options
   * @returns {RequestPolicy}
   * @memberof Credential
   */
  public create(
    // tslint:disable-next-line:variable-name
    _nextPolicy: RequestPolicy,
    // tslint:disable-next-line:variable-name
    _options: RequestPolicyOptions
  ): RequestPolicy {
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
