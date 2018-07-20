import { ConsistencyLevel } from ".";

/**
 * Represents a DatabaseAccount in the Azure Cosmos DB database service.
 */
export class DatabaseAccount {
  // tslint:disable:variable-name
  /**
   * @ignore
   * @hidden
   */
  public _writableLocations: LocationsType = []; // TODO: naming is bad here.
  // I think we're trying to do an "internal" thing.
  /**
   * @ignore
   * @hidden
   */
  public _readableLocations: LocationsType = []; // TODO: any location
  /** The self-link for Databases in the databaseAccount. */
  public DatabasesLink: string;
  /** The self-link for Media in the databaseAccount. */
  public MediaLink: string;
  /** Attachment content (media) storage quota in MBs ( Retrieved from gateway ). */
  public MaxMediaStorageUsageInMB: number;
  /**
   * <p> Current attachment content (media) usage in MBs (Retrieved from gateway )<br>
   *  Value is returned from cached information updated periodically and is not guaranteed
   * to be real time. </p>
   */
  public CurrentMediaStorageUsageInMB: number;
  public ConsumedDocumentStorageInMB: number;
  public ReservedDocumentStorageInMB: number;
  public ProvisionedDocumentStorageInMB: number;
  /** Gets the UserConsistencyPolicy settings. */
  public ConsistencyPolicy: ConsistencyLevel;
  /** The list of writable locations for a geo-replicated database account. */
  get WritableLocations(): LocationsType {
    return this._writableLocations;
  }
  /** The list of readable locations for a geo-replicated database account. */
  get ReadableLocations(): LocationsType {
    return this._readableLocations;
  }
}

/**
 * Used to specify the locations that are available, read is index 1 and write is index 0.
 */
export type LocationsType = Array<{ [key: string]: string }>;
