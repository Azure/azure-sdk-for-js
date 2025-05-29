/**
 * Models vector clock bases session token. Session token has the following format:
 * `{Version}#{GlobalLSN}#{RegionId1}={LocalLsn1}#{RegionId2}={LocalLsn2}....#{RegionIdN}={LocalLsnN}`
 * 'Version' captures the configuration number of the partition which returned this session token.
 * 'Version' is incremented everytime topology of the partition is updated (say due to Add/Remove/Failover).
 *
 * The choice of separators '#' and '=' is important. Separators ';' and ',' are used to delimit
 * per-partitionKeyRange session token
 * @hidden
 *
 */
export declare class VectorSessionToken {
    private readonly version;
    private readonly globalLsn;
    private readonly localLsnByregion;
    private readonly sessionToken?;
    private static readonly SEGMENT_SEPARATOR;
    private static readonly REGION_PROGRESS_SEPARATOR;
    constructor(version: number, globalLsn: number, localLsnByregion: Map<number, string>, sessionToken?: string);
    static create(sessionToken: string): VectorSessionToken | null;
    equals(other: VectorSessionToken): boolean;
    merge(other: VectorSessionToken): VectorSessionToken;
    toString(): string | undefined;
    private areRegionProgressEqual;
}
//# sourceMappingURL=VectorSessionToken.d.ts.map