// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import { PolicyModification } from "./index";
import * as Mappers from "../generated/models/mappers";

import { PolicyResult as GeneratedPolicyResult } from "../generated/models";

import { TypeDeserializer } from "../utils/typeDeserializer";
import { AttestationSigner, _attestationSignerFromGenerated } from "./attestationSigner";

/**
 * The result of a policy certificate modification
 */
export interface PolicyResult {
  /**
   * The result of the operation
   */
  policyResolution: PolicyModification;
  /**
   * The SHA256 hash of the policy object modified
   */
  policyTokenHash: Uint8Array;
  /**
   * The certificate used to sign the policy object, if specified
   */
  policySigner?: AttestationSigner;
  /**
   * A JSON Web Token containing a StoredAttestationPolicy object with the attestation policy
   */
  policy?: string;
}

/**
 * Create a new instance of a {@link PolicyResult} from a raw JSON object.
 * @param rawJson - JSON Policy Result object returned from the Attestation service.
 * @returns a newly created {@link PolicyResult} object whose contents reflect the JSON received from
 *  the attestation service.
 */
export function _policyResultFromGenerated(rawJson: unknown): PolicyResult {
  const policyResult: GeneratedPolicyResult = TypeDeserializer.deserialize(
    rawJson,
    { PolicyResult: Mappers.PolicyResult, JsonWebKey: Mappers.JsonWebKey },
    "PolicyResult"
  ) as GeneratedPolicyResult;
  return {
    policyResolution: policyResult.policyResolution,
    policyTokenHash: policyResult.policyTokenHash,
    policy: policyResult.policy,
    policySigner: policyResult.policySigner
      ? _attestationSignerFromGenerated(policyResult.policySigner)
      : undefined,
  };
}
