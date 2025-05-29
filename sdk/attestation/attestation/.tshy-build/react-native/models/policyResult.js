import * as Mappers from "../generated/models/mappers.js";
import { TypeDeserializer } from "../utils/typeDeserializer.js";
import { _attestationSignerFromGenerated } from "./attestationSigner.js";
/**
 * Create a new instance of a {@link PolicyResult} from a raw JSON object.
 * @param rawJson - JSON Policy Result object returned from the Attestation service.
 * @returns a newly created {@link PolicyResult} object whose contents reflect the JSON received from
 *  the attestation service.
 */
export function _policyResultFromGenerated(rawJson) {
    const policyResult = TypeDeserializer.deserialize(rawJson, { PolicyResult: Mappers.PolicyResult, JsonWebKey: Mappers.JsonWebKey }, "PolicyResult");
    return {
        policyResolution: policyResult.policyResolution,
        policyTokenHash: policyResult.policyTokenHash,
        policy: policyResult.policy,
        policySigner: policyResult.policySigner
            ? _attestationSignerFromGenerated(policyResult.policySigner)
            : undefined,
    };
}
//# sourceMappingURL=policyResult.js.map