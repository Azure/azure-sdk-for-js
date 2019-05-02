import { ConsistencyLevel } from ".";
import { Constants } from "../common";
import { IHeaders } from "../queryExecutionContext";

/**
 * Represents a DatabaseAccount in the Azure Cosmos DB database service.
 */
export class DatabaseAccount {
  /** The list of writable locations for a geo-replicated database account. */
  public readonly writableLocations: Location[] = [];
  /** The list of readable locations for a geo-replicated database account. */
  public readonly readableLocations: Location[] = [];
  /** The self-link for Databases in the databaseAccount. */
  public readonly DatabasesLink: string;
  /** The self-link for Media in the databaseAccount. */
  public readonly MediaLink: string;
  /** Attachment content (media) storage quota in MBs ( Retrieved from gateway ). */
  public readonly MaxMediaStorageUsageInMB: number;
  /**
   * Current attachment content (media) usage in MBs (Retrieved from gateway )
   *
   * Value is returned from cached information updated periodically and is not guaranteed
   * to be real time.
   */
  public readonly CurrentMediaStorageUsageInMB: number;
  /** Gets the UserConsistencyPolicy settings. */
  public readonly ConsistencyPolicy: ConsistencyLevel;
  public readonly enableMultipleWritableLocations: boolean;

  // TODO: body - any
  public constructor(body: { [key: string]: any }, headers: IHeaders) {
    this.DatabasesLink = "/dbs/";
    this.MediaLink = "/media/";
    this.MaxMediaStorageUsageInMB = headers[Constants.HttpHeaders.MaxMediaStorageUsageInMB];
    this.CurrentMediaStorageUsageInMB = headers[Constants.HttpHeaders.CurrentMediaStorageUsageInMB];
    this.ConsistencyPolicy = body.UserConsistencyPolicy
      ? (body.UserConsistencyPolicy.defaultConsistencyLevel as ConsistencyLevel)
      : ConsistencyLevel.Session;
    if (body[Constants.WritableLocations] && body.id !== "localhost") {
      this.writableLocations = body[Constants.WritableLocations] as Location[];
    }
    if (body[Constants.ReadableLocations] && body.id !== "localhost") {
      this.readableLocations = body[Constants.ReadableLocations] as Location[];
    }
    if (body[Constants.ENABLE_MULTIPLE_WRITABLE_LOCATIONS]) {
      this.enableMultipleWritableLocations =
        body[Constants.ENABLE_MULTIPLE_WRITABLE_LOCATIONS] === true ||
        body[Constants.ENABLE_MULTIPLE_WRITABLE_LOCATIONS] === "true";
    }
  }
}

/**
 * Used to specify the locations that are available, read is index 1 and write is index 0.
 */
export interface Location {
  name: string;
  databaseAccountEndpoint: string;
}
