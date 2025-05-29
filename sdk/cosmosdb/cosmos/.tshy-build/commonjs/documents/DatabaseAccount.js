"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAccount = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const index_js_1 = require("../common/index.js");
const ConsistencyLevel_js_1 = require("./ConsistencyLevel.js");
/**
 * Represents a DatabaseAccount in the Azure Cosmos DB database service.
 */
class DatabaseAccount {
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
        this.maxMediaStorageUsageInMB = headers[index_js_1.Constants.HttpHeaders.MaxMediaStorageUsageInMB];
        this.currentMediaStorageUsageInMB = headers[index_js_1.Constants.HttpHeaders.CurrentMediaStorageUsageInMB];
        this.consistencyPolicy = body.userConsistencyPolicy
            ? body.userConsistencyPolicy.defaultConsistencyLevel
            : ConsistencyLevel_js_1.ConsistencyLevel.Session;
        if (body[index_js_1.Constants.WritableLocations] && body.id !== "localhost") {
            this.writableLocations = body[index_js_1.Constants.WritableLocations];
        }
        if (body[index_js_1.Constants.ReadableLocations] && body.id !== "localhost") {
            this.readableLocations = body[index_js_1.Constants.ReadableLocations];
        }
        if (body[index_js_1.Constants.ENABLE_MULTIPLE_WRITABLE_LOCATIONS]) {
            this.enableMultipleWritableLocations =
                body[index_js_1.Constants.ENABLE_MULTIPLE_WRITABLE_LOCATIONS] === true ||
                    body[index_js_1.Constants.ENABLE_MULTIPLE_WRITABLE_LOCATIONS] === "true";
        }
    }
}
exports.DatabaseAccount = DatabaseAccount;
//# sourceMappingURL=DatabaseAccount.js.map