"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoredAttestationPolicy = void 0;
const tslib_1 = require("tslib");
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const utf8_js_1 = require("../utils/utf8.js");
const typeDeserializer_js_1 = require("../utils/typeDeserializer.js");
const Mappers = tslib_1.__importStar(require("../generated/models/mappers.js"));
/**
 * Represents a stored attestation policy sent to the attestation service.
 */
class StoredAttestationPolicy {
    constructor(value) {
        this.attestationPolicy = (0, utf8_js_1.stringToBytes)(value);
    }
    /**
     * Serializes a StoredAttestationPolicy object to a JSON encoded string.
     *
     * @returns The serialized JSON policy.
     */
    serialize() {
        return typeDeserializer_js_1.TypeDeserializer.serialize(this, { StoredAttestationPolicy: Mappers.StoredAttestationPolicy }, Mappers.StoredAttestationPolicy);
    }
    /**
     * Deserializes a stored attestation policy object returned from the attestation service.
     *
     * @param value - Raw JSON object from service to serialize as an attestation policy.
     * @returns Stored attestation policy.
     */
    static deserialize(value) {
        return typeDeserializer_js_1.TypeDeserializer.deserialize(value, { StoredAttestationPolicy: Mappers.StoredAttestationPolicy }, "StoredAttestationPolicy");
    }
}
exports.StoredAttestationPolicy = StoredAttestationPolicy;
//# sourceMappingURL=storedAttestationPolicy.js.map