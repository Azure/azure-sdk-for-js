// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/index.js";
import { ConsistencyLevel } from "./ConsistencyLevel.js";
/**
 * Represents a DatabaseAccount in the Azure Cosmos DB database service.
 */
export class DatabaseAccount {
    /**
     * The self-link for Databases in the databaseAccount.
     * @deprecated Use `databasesLink`
     */
    get DatabasesLink() {
        return this.databasesLink;
    }
    /**
     * The self-link for Media in the databaseAccount.
     * @deprecated Use `mediaLink`
     */
    get MediaLink() {
        return this.mediaLink;
    }
    /**
     * Attachment content (media) storage quota in MBs ( Retrieved from gateway ).
     * @deprecated use `maxMediaStorageUsageInMB`
     */
    get MaxMediaStorageUsageInMB() {
        return this.maxMediaStorageUsageInMB;
    }
    /**
     * Current attachment content (media) usage in MBs (Retrieved from gateway )
     *
     * Value is returned from cached information updated periodically and is not guaranteed
     * to be real time.
     *
     * @deprecated use `currentMediaStorageUsageInMB`
     */
    get CurrentMediaStorageUsageInMB() {
        return this.currentMediaStorageUsageInMB;
    }
    /**
     * Gets the UserConsistencyPolicy settings.
     * @deprecated use `consistencyPolicy`
     */
    get ConsistencyPolicy() {
        return this.consistencyPolicy;
    }
    // TODO: body - any
    constructor(body, headers) {
        /** The list of writable locations for a geo-replicated database account. */
        this.writableLocations = [];
        /** The list of readable locations for a geo-replicated database account. */
        this.readableLocations = [];
        this.databasesLink = "/dbs/";
        this.mediaLink = "/media/";
        this.maxMediaStorageUsageInMB = headers[Constants.HttpHeaders.MaxMediaStorageUsageInMB];
        this.currentMediaStorageUsageInMB = headers[Constants.HttpHeaders.CurrentMediaStorageUsageInMB];
        this.consistencyPolicy = body.userConsistencyPolicy
            ? body.userConsistencyPolicy.defaultConsistencyLevel
            : ConsistencyLevel.Session;
        if (body[Constants.WritableLocations] && body.id !== "localhost") {
            this.writableLocations = body[Constants.WritableLocations];
        }
        if (body[Constants.ReadableLocations] && body.id !== "localhost") {
            this.readableLocations = body[Constants.ReadableLocations];
        }
        if (body[Constants.ENABLE_MULTIPLE_WRITABLE_LOCATIONS]) {
            this.enableMultipleWritableLocations =
                body[Constants.ENABLE_MULTIPLE_WRITABLE_LOCATIONS] === true ||
                    body[Constants.ENABLE_MULTIPLE_WRITABLE_LOCATIONS] === "true";
        }
    }
}
//# sourceMappingURL=DatabaseAccount.js.map