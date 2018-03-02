/*
The MIT License (MIT)
Copyright (c) 2017 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

var Base = require("./base"),
    RetryOptions = require("./retryOptions");
//SCRIPT START

var AzureDocuments = Base.defineClass(null, null,
    {
       /**
         * Represents a DatabaseAccount in the Azure Cosmos DB database service. A DatabaseAccount is the container for databases.
         * @global
         * @property {string} DatabasesLink                                     -  The self-link for Databases in the databaseAccount.
         * @property {string} MediaLink                                         -  The self-link for Media in the databaseAccount.
         * @property {number} MaxMediaStorageUsageInMB                          -  Attachment content (media) storage quota in MBs ( Retrieved from gateway ).
         * @property {number} CurrentMediaStorageUsageInMB                      -  <p> Current attachment content (media) usage in MBs (Retrieved from gateway )<br>
                                                                                    Value is returned from cached information updated periodically and is not guaranteed to be real time. </p>
         * @property {object} ConsistencyPolicy                                 -  Gets the UserConsistencyPolicy settings.
         * @property {string} ConsistencyPolicy.defaultConsistencyLevel         -  The default consistency level and it's of type {@link ConsistencyLevel}.
         * @property {number} ConsistencyPolicy.maxStalenessPrefix              -  In bounded staleness consistency, the maximum allowed staleness in terms difference in sequence numbers (aka version).
         * @property {number} ConsistencyPolicy.maxStalenessIntervalInSeconds   -  In bounded staleness consistency, the maximum allowed staleness in terms time interval.
         
         * @property {Array}  WritableLocations                                 -  The list of writable locations for a geo-replicated database account.
         * @property {Array}  ReadableLocations                                 -  The list of readable locations for a geo-replicated database account.
         */
        DatabaseAccount: Base.defineClass(function () {
            this._writableLocations = [];
            this._readableLocations = [];

            Object.defineProperty(this, "DatabasesLink", {
                value: "",
                writable: true,
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "MediaLink", {
                value: "",
                writable: true,
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "MaxMediaStorageUsageInMB", {
                value: 0,
                writable: true,
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "CurrentMediaStorageUsageInMB", {
                value: 0,
                writable: true,
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "ConsumedDocumentStorageInMB", {
                value: 0,
                writable: true,
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "ReservedDocumentStorageInMB", {
                value: 0,
                writable: true,
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "ProvisionedDocumentStorageInMB", {
                value: 0,
                writable: true,
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "ConsistencyPolicy", {
                value: "",
                writable: true,
                configurable: true,
                enumerable: true
            });
        
            Object.defineProperty(this, "WritableLocations", {
                get: function () {
                    return this._writableLocations;
                },
                enumerable: true
            });

            Object.defineProperty(this, "ReadableLocations", {
                get: function () {
                    return this._readableLocations;
                },
                enumerable: true
            });
        }),

        /**
         * <p>Represents the consistency levels supported for Azure Cosmos DB client operations.<br>
         * The requested ConsistencyLevel must match or be weaker than that provisioned for the database account. Consistency levels.<br>
         * Consistency levels by order of strength are Strong, BoundedStaleness, Session and Eventual.</p>
         * @readonly
         * @enum {string}
         * @property Strong           Strong Consistency guarantees that read operations always return the value that was last written.
         * @property BoundedStaleness Bounded Staleness guarantees that reads are not too out-of-date. This can be configured based on number of operations (MaxStalenessPrefix) or time (MaxStalenessIntervalInSeconds).
         * @property Session          Session Consistency guarantees monotonic reads (you never read old data, then new, then old again), monotonic writes (writes are ordered)
                                      and read your writes (your writes are immediately visible to your reads) within any single session.
         * @property Eventual         Eventual Consistency guarantees that reads will return a subset of writes. All writes
                                      will be eventually be available for reads.
         * @property ConsistentPrefix ConsistentPrefix Consistency guarantees that reads will return some prefix of all writes with no gaps.
                                      All writes will be eventually be available for reads.                          
         */
        ConsistencyLevel: Object.freeze({
            Strong: "Strong",
            BoundedStaleness: "BoundedStaleness",
            Session: "Session",
            Eventual: "Eventual",
            ConsistentPrefix: "ConsistentPrefix"
        }),


        /**
         * Specifies the supported indexing modes.
         * @readonly
         * @enum {string}
         * @property Consistent     <p>Index is updated synchronously with a create or update operation. <br>
                                    With consistent indexing, query behavior is the same as the default consistency level for the collection. The index is
                                    always kept up to date with the data. </p>
         * @property Lazy           <p>Index is updated asynchronously with respect to a create or update operation. <br>
                                    With lazy indexing, queries are eventually consistent. The index is updated when the collection is idle.</p>
         */
        IndexingMode: Object.freeze({
            Consistent: "consistent",
            Lazy: "lazy",
            None: "none"
        }),

        /**
         * Specifies the supported Index types.
         * @readonly
         * @enum {string}
         * @property Hash     This is supplied for a path which has no sorting requirement.
         *                    This kind of an index has better precision than corresponding range index.
         * @property Range    This is supplied for a path which requires sorting.
         * @property Spatial  This is supplied for a path which requires geospatial indexing.
         */

        IndexKind: Object.freeze({
            Hash: "Hash",
            Range: "Range",
            Spatial: "Spatial"
        }),

        DataType: Object.freeze({
            Number: "Number",
            String: "String",
            Point: "Point",
            LineString: "LineString",
            Polygon: "Polygon"
        }),

        PartitionKind: Object.freeze({
            Hash: "Hash"
        }),

        ConnectionMode: Object.freeze({
            Gateway: 0
        }),

        QueryCompatibilityMode: Object.freeze({
            Default: 0,
            Query: 1,
            SqlQuery: 2
        }),

        /**
         * Enum for media read mode values.
         * @readonly
         * @enum {sting}
         * @property Buffered Content is buffered at the client and not directly streamed from the content store.
                              <p>Use Buffered to reduce the time taken to read and write media files.</p>
         * @property Streamed Content is directly streamed from the content store without any buffering at the client.
                              <p>Use Streamed to reduce the client memory overhead of reading and writing media files. </p>
         */
        MediaReadMode: Object.freeze({
            Buffered: "Buffered",
            Streamed: "Streamed"
        }),

        /**
         * Enum for permission mode values.
         * @readonly
         * @enum {string}
         * @property None Permission not valid.
         * @property Read Permission applicable for read operations only.
         * @property All Permission applicable for all operations.
         */
        PermissionMode: Object.freeze({
            None: "none",
            Read: "read",
            All: "all"
        }),

        /**
         * Enum for trigger type values.
         * Specifies the type of the trigger.
         * @readonly
         * @enum {string}
         * @property Pre  Trigger should be executed before the associated operation(s).
         * @property Post Trigger should be executed after the associated operation(s).
         */
        TriggerType: Object.freeze({
            Pre: "pre",
            Post: "post"
        }),

        /**
         * Enum for trigger operation values.
         * specifies the operations on which a trigger should be executed.
         * @readonly
         * @enum {string}
         * @property All All operations.
         * @property Create Create operations only.
         * @property Update Update operations only.
         * @property Delete Delete operations only.
         * @property Replace Replace operations only.
         */
        TriggerOperation: Object.freeze({
            All: "all",
            Create: "create",
            Update: "update",
            Delete: "delete",
            Replace: "replace"
        }),

        /**
         * Enum for udf type values.
         * Specifies the types of user defined functions.
         * @readonly
         * @enum {string}
         * @property Javascript Javascript type.
         */
        UserDefinedFunctionType: Object.freeze({
            Javascript: "Javascript"
        }),

        /**
         * @global
         * Represents the Connection policy associated with a DocumentClient in the Azure Cosmos DB database service.
         * @property {string} MediaReadMode                - Attachment content (aka media) download mode. Should be one of the values of {@link MediaReadMode}
         * @property {number} MediaRequestTimeout          - Time to wait for response from network peer for attachment content (aka media) operations. Represented in milliseconds.
         * @property {number} RequestTimeout               - Request timeout (time to wait for response from network peer). Represented in milliseconds.
         * @property {bool} EnableEndpointDiscovery        - Flag to enable/disable automatic redirecting of requests based on read/write operations.
         * @property {Array} PreferredLocations            - List of azure regions to be used as preferred locations for read requests.
         * @property {RetryOptions} RetryOptions           - RetryOptions instance which defines several configurable properties used during retry.
         * @property {bool} DisableSSLVerification         - Flag to disable SSL verification for the requests. SSL verification is enabled by default. Don't set this when targeting production endpoints.
         *                                                   This is intended to be used only when targeting emulator endpoint to avoid failing your requests with SSL related error.
         * @property {string} ProxyUrl                     - Http/Https proxy url
        */
        ConnectionPolicy: Base.defineClass(function() {
            Object.defineProperty(this, "_defaultRequestTimeout", {
                value: 60000,
                writable: true,
                configurable: true,
                enumerable: false // this is the default value, so it could be excluded during JSON.stringify
            });

            // defaultMediaRequestTimeout is based upon the blob client timeout and the retry policy.
            Object.defineProperty(this, "_defaultMediaRequestTimeout", {
                value: 300000,
                writable: true,
                configurable: true,
                enumerable: false // this is the default value, so it could be excluded during JSON.stringify
            });

            this.ConnectionMode = AzureDocuments.ConnectionMode.Gateway;
            this.MediaReadMode = AzureDocuments.MediaReadMode.Buffered;
            this.MediaRequestTimeout = this._defaultMediaRequestTimeout;
            this.RequestTimeout = this._defaultRequestTimeout;
            this.EnableEndpointDiscovery = true;
            this.PreferredLocations = [];
            this.RetryOptions = new RetryOptions();
            this.DisableSSLVerification = false;
            this.ProxyUrl = "";
        })
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = AzureDocuments;
}