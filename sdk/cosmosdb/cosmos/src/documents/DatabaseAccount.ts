// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Constants } from "../common";
import { CosmosHeaders } from "../queryExecutionContext";
import { ConsistencyLevel } from "./ConsistencyLevel";

/**
 * Represents a DatabaseAccount in the Azure Cosmos DB database service.
 */
export class DatabaseAccount {
  /** The list of writable locations for a geo-replicated database account. */
  public readonly writableLocations: Location[] = [];
  /** The list of readable locations for a geo-replicated database account. */
  public readonly readableLocations: Location[] = [];
  /**
   * The self-link for Databases in the databaseAccount.
   * @deprecated Use `databasesLink`
   */
  public get DatabasesLink() {
    return this.databasesLink;
  }
  /** The self-link for Databases in the databaseAccount. */
  public readonly databasesLink: string;
  /**
   * The self-link for Media in the databaseAccount.
   * @deprecated Use `mediaLink`
   */
  public get MediaLink() {
    return this.mediaLink;
  }
  /** The self-link for Media in the databaseAccount. */
  public readonly mediaLink: string;
  /**
   * Attachment content (media) storage quota in MBs ( Retrieved from gateway ).
   * @deprecated use `maxMediaStorageUsageInMB
   */
  public get MaxMediaStorageUsageInMB() {
    return this.maxMediaStorageUsageInMB;
  }
  /** Attachment content (media) storage quota in MBs ( Retrieved from gateway ). */
  public readonly maxMediaStorageUsageInMB: number;
  /**
   * Current attachment content (media) usage in MBs (Retrieved from gateway )
   *
   * Value is returned from cached information updated periodically and is not guaranteed
   * to be real time.
   *
   * @deprecated use `currentMediaStorageUsageInMB`
   */
  public get CurrentMediaStorageUsageInMB() {
    return this.currentMediaStorageUsageInMB;
  }
  /**
   * Current attachment content (media) usage in MBs (Retrieved from gateway )
   *
   * Value is returned from cached information updated periodically and is not guaranteed
   * to be real time.
   */
  public readonly currentMediaStorageUsageInMB: number;
  /**
   * Gets the UserConsistencyPolicy settings.
   * @deprecated use `consistencyPolicy`
   */
  public get ConsistencyPolicy() {
    return this.consistencyPolicy;
  }
  /** Gets the UserConsistencyPolicy settings. */
  public readonly consistencyPolicy: ConsistencyLevel;
  public readonly enableMultipleWritableLocations: boolean;

  // TODO: body - any
  public constructor(body: { [key: string]: any }, headers: CosmosHeaders) {
    this.databasesLink = "/dbs/";
    this.mediaLink = "/media/";
    this.maxMediaStorageUsageInMB = headers[Constants.HttpHeaders.MaxMediaStorageUsageInMB];
    this.currentMediaStorageUsageInMB = headers[Constants.HttpHeaders.CurrentMediaStorageUsageInMB];
    this.consistencyPolicy = body.UserConsistencyPolicy
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
  unavailable?: boolean;
}
