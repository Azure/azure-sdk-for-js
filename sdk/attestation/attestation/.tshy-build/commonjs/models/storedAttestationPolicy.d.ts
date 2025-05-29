/**
 * Represents a stored attestation policy sent to the attestation service.
 */
export declare class StoredAttestationPolicy {
    constructor(value: string);
    /**
     * Serializes a StoredAttestationPolicy object to a JSON encoded string.
     *
     * @returns The serialized JSON policy.
     */
    serialize(): string;
    /**
     * Deserializes a stored attestation policy object returned from the attestation service.
     *
     * @param value - Raw JSON object from service to serialize as an attestation policy.
     * @returns Stored attestation policy.
     */
    static deserialize(value: unknown): StoredAttestationPolicy;
    /**
     * Stored attestation policy, utf8 encoded.
     */
    attestationPolicy: Uint8Array;
}
//# sourceMappingURL=storedAttestationPolicy.d.ts.map