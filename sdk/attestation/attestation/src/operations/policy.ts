// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-client";
import { AttestationClient } from "../attestationClient";
import {
  PolicyGetResponse,
  PolicyResetResponse,
  PolicySetModelResponse
} from "../generated/models";
import { AttestationType } from "../models";

/**
 * Class representing a Policy.
 */
export class Policy {
  private readonly client: AttestationClient;

  /**
   * Initialize a new instance of the class Policy class.
   * @param client - Reference to the service client
   */
  constructor(client: AttestationClient) {
    this.client = client;
  }

  /**
   * Retrieves the current policy for an attestation type.
   * @param attestationType - Specifies the trusted execution environment to be used to validate the
   *                          evidence
   * @param options - The options parameters.
   */
  get(
    attestationType: AttestationType,
    options?: coreHttp.OperationOptions
  ): Promise<PolicyGetResponse> {
    return this.client.getGeneratedClient().policy.get(attestationType, options);
  }

  /**
   * Sets the policy for a given attestation type.
   * @param attestationType - Specifies the trusted execution environment to be used to validate the
   *                        - evidence
   * @param newAttestationPolicy - JWT Expressing the new policy whose body is a StoredAttestationPolicy
   *                               object.
   * @param options - The options parameters.
   */
  set(
    attestationType: AttestationType,
    newAttestationPolicy: string,
    options?: coreHttp.OperationOptions
  ): Promise<PolicySetModelResponse> {
    return this.client
      .getGeneratedClient()
      .policy.set(attestationType, newAttestationPolicy, options);
  }

  /**
   * Resets the attestation policy for the specified tenant and reverts to the default policy.
   * @param attestationType - Specifies the trusted execution environment to be used to validate the
   *                          evidence
   * @param policyJws - JSON Web Signature with an empty policy document
   * @param options - The options parameters.
   */
  reset(
    attestationType: AttestationType,
    policyJws: string,
    options?: coreHttp.OperationOptions
  ): Promise<PolicyResetResponse> {
    return this.client.getGeneratedClient().policy.reset(attestationType, policyJws, options);
  }
}
