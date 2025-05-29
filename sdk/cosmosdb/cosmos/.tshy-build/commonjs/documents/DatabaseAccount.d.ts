import type { CosmosHeaders } from "../queryExecutionContext/index.js";
import { ConsistencyLevel } from "./ConsistencyLevel.js";
/**
 * Represents a DatabaseAccount in the Azure Cosmos DB database service.
 */
export declare class DatabaseAccount {
    /** The list of writable locations for a geo-replicated database account. */
    readonly writableLocations: Location[];
    /** The list of readable locations for a geo-replicated database account. */
    readonly readableLocations: Location[];
    /**
     * The self-link for Databases in the databaseAccount.
     * @deprecated Use `databasesLink`
     */
    get DatabasesLink(): string;
    /** The self-link for Databases in the databaseAccount. */
    readonly databasesLink: string;
    /**
     * The self-link for Media in the databaseAccount.
     * @deprecated Use `mediaLink`
     */
    get MediaLink(): string;
    /** The self-link for Media in the databaseAccount. */
    readonly mediaLink: string;
    /**
     * Attachment content (media) storage quota in MBs ( Retrieved from gateway ).
     * @deprecated use `maxMediaStorageUsageInMB`
     */
    get MaxMediaStorageUsageInMB(): number;
    /** Attachment content (media) storage quota in MBs ( Retrieved from gateway ). */
    readonly maxMediaStorageUsageInMB: number;
    /**
     * Current attachment content (media) usage in MBs (Retrieved from gateway )
     *
     * Value is returned from cached information updated periodically and is not guaranteed
     * to be real time.
     *
     * @deprecated use `currentMediaStorageUsageInMB`
     */
    get CurrentMediaStorageUsageInMB(): number;
    /**
     * Current attachment content (media) usage in MBs (Retrieved from gateway )
     *
     * Value is returned from cached information updated periodically and is not guaranteed
     * to be real time.
     */
    readonly currentMediaStorageUsageInMB: number;
    /**
     * Gets the UserConsistencyPolicy settings.
     * @deprecated use `consistencyPolicy`
     */
    get ConsistencyPolicy(): ConsistencyLevel;
    /** Gets the UserConsistencyPolicy settings. */
    readonly consistencyPolicy: ConsistencyLevel;
    readonly enableMultipleWritableLocations: boolean;
    constructor(body: {
        [key: string]: any;
    }, headers: CosmosHeaders);
}
/**
 * Used to specify the locations that are available, read is index 1 and write is index 0.
 */
export interface Location {
    name: string;
    databaseAccountEndpoint: string;
    unavailable?: boolean;
    lastUnavailabilityTimestampInMs?: number;
}
//# sourceMappingURL=DatabaseAccount.d.ts.map