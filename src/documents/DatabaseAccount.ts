import { ConsistencyLevel } from ".";

/**
 * Represents a DatabaseAccount in the Azure Cosmos DB database service. \
 * A DatabaseAccount is the container for databases.
 * @global
 * @property {string} DatabasesLink                                     -  \
 * The self-link for Databases in the databaseAccount.
 * @property {string} MediaLink                                         -  \
 * The self-link for Media in the databaseAccount.
 * @property {number} MaxMediaStorageUsageInMB                          -  \
 * Attachment content (media) storage quota in MBs ( Retrieved from gateway ).
 * @property {number} CurrentMediaStorageUsageInMB                      -  \
 * <p> Current attachment content (media) usage in MBs (Retrieved from gateway )<br>
 *  Value is returned from cached information updated periodically and is not guaranteed
 * to be real time. </p>
 * @property {object} ConsistencyPolicy                                 -  \
 * Gets the UserConsistencyPolicy settings.
 * @property {string} ConsistencyPolicy.defaultConsistencyLevel         -  \
 * The default consistency level and it's of type {@link ConsistencyLevel}.
 * @property {number} ConsistencyPolicy.maxStalenessPrefix              -  \
 * In bounded staleness consistency, the maximum allowed staleness in terms difference in \
 * sequence numbers (aka version).
 * @property {number} ConsistencyPolicy.maxStalenessIntervalInSeconds   -  \
 * In bounded staleness consistency, the maximum allowed staleness in terms time interval.
 * @property {Array}  WritableLocations                                 -  \
 * The list of writable locations for a geo-replicated database account.
 * @property {Array}  ReadableLocations                                 -  \
 * The list of readable locations for a geo-replicated database account.
 */
export class DatabaseAccount {
    // tslint:disable:variable-name
    public _writableLocations: LocationsType = []; // TODO: naming is bad here.
                                              // I think we're trying to do an "internal" thing.
    public _readableLocations: LocationsType = []; // TODO: any location
    public DatabasesLink: string;
    public MediaLink: string;
    public MaxMediaStorageUsageInMB: number;
    public CurrentMediaStorageUsageInMB: number;
    public ConsumedDocumentStorageInMB: number;
    public ReservedDocumentStorageInMB: number;
    public ProvisionedDocumentStorageInMB: number;
    public ConsistencyPolicy: ConsistencyLevel;
    get WritableLocations(): Array<{[key: string]: string}> {
        return this._writableLocations;
    }
    get ReadableLocations(): Array<{[key: string]: string}> {
        return this._readableLocations;
    }
}

export type LocationsType = Array<{[key: string]: string}>; // TODO: any (kind of) code smell at best
