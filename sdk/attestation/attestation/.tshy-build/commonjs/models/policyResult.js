"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._policyResultFromGenerated = _policyResultFromGenerated;
const tslib_1 = require("tslib");
const Mappers = tslib_1.__importStar(require("../generated/models/mappers.js"));
const typeDeserializer_js_1 = require("../utils/typeDeserializer.js");
const attestationSigner_js_1 = require("./attestationSigner.js");
/**
 * Create a new instance of a {@link PolicyResult} from a raw JSON object.
 * @param rawJson - JSON Policy Result object returned from the Attestation service.
 * @returns a newly created {@link PolicyResult} object whose contents reflect the JSON received from
 *  the attestation service.
 */
function _policyResultFromGenerated(rawJson) {
    const policyResult = typeDeserializer_js_1.TypeDeserializer.deserialize(rawJson, { PolicyResult: Mappers.PolicyResult, JsonWebKey: Mappers.JsonWebKey }, "PolicyResult");
    return {
        policyResolution: policyResult.policyResolution,
        policyTokenHash: policyResult.policyTokenHash,
        policy: policyResult.policy,
        policySigner: policyResult.policySigner
            ? (0, attestationSigner_js_1._attestationSignerFromGenerated)(policyResult.policySigner)
            : undefined,
    };
}
//# sourceMappingURL=policyResult.js.map