//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

'use strict';

var Base = require("./base");
//SCRIPT START

var AzureDocuments = Base.defineClass(null, null, 
    {
       /**
         * Represents a DatabaseAccount. A DatabaseAccount is the container for databases.
         * @global
         * @property {string} DatabasesLink 			                        -  The self-link for Databases in the databaseAccount.
         * @property {string} MediaLink  				                        -  The self-link for Media in the databaseAccount.
		 * @property {number} MaxMediaStorageUsageInMB  		                -  Attachment content (media) storage quota in MBs ( Retrieved from gateway ).
		 * @property {number} CurrentMediaStorageUsageInMB                      -  <p> Current attachment content (media) usage in MBs (Retrieved from gateway )<br>
                                                                                    Value is returned from cached information updated periodically and is not guaranteed to be real time. </p>
         * @property {number} CapacityUnitsConsumed                             -  The number is capacity units database account is currently consuming. <br>
                                                                                    Value is returned from cached information updated periodically and is not guaranteed to be real time. </p>
         * @property {number} CapacityUnitsProvisioned                          -  <p> The number of provisioned capacity units for the database account. <br>
                                                                                    Value is returned from cached information updated periodically and is not guaranteed to be real time. </p>         
         * @property {number} ConsumedDocumentStorageInMB  	                    -  <p> The cumulative sum of current sizes of created collection in MB.  <br>
                                                                                    Value is returned from cached information updated periodically and is not guaranteed to be real time. </p>         
         * @property {number} ReservedDocumentStorageInMB                       -  <p> The cumulative sum of maximum sizes of created collection in MB.  <br>       
                                                                                    Value is returned from cached information updated periodically and is not guaranteed to be real time. </p>         
         * @property {number} ProvisionedDocumentStorageInMB                    -  <p> The provisioned documented storage capacity for the database account. <br>    
                                                                                    Value is returned from cached information updated periodically and is not guaranteed to be real time. </p>         
         * @property {object} ConsistencyPolicy                                 -  Gets the UserConsistencyPolicy settings.
         * @property {string} ConsistencyPolicy.defaultConsistencyLevel         -  The default consistency level and it's of type {@link ConsistencyLevel}.
         * @property {number} ConsistencyPolicy.maxStalenessPrefix              -  In bounded staleness consistency, the maximum allowed staleness in terms difference in sequence numbers (aka version).
         * @property {number} ConsistencyPolicy.maxStalenessIntervalInSeconds   -  In bounded staleness consistency, the maximum allowed staleness in terms time interval.
         */
        DatabaseAccount : Base.defineClass(function() {
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
			
			Object.defineProperty(this, "CapacityUnitsConsumed", {
                value: 0,
                writable: true,
                configurable: true,
                enumerable: true
            });
			
			Object.defineProperty(this, "CapacityUnitsProvisioned", {
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
        }),
        
        /**
         * <p>Represents the consistency levels supported for DocumentDB client operations.<br>
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
         */
        ConsistencyLevel : Object.freeze({
            Strong: "Strong",
            BoundedStaleness: "BoundedStaleness",
            Session: "Session",
            Eventual: "Eventual"
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
        IndexingMode : Object.freeze({
            Consistent: "consistent",
            Lazy: "lazy",
        }),
        
		/**
		 * Specifies the supported Index types.
		 * @readonly
         * @enum {string}
		 * @property Hash 	This is supplied for a path which has no sorting requirement.
		 * 					This kind of an index has better precision than corresponding range index.
		 * 
		 * @property Range  This is supplied for a path which requires sorting.
		 */
		 
		IndexType : Object.freeze({
            Hash: "Hash",
            Range: "Range",
        }),

        Protocol : Object.freeze({
            Tcp: 1,
            Https: 2,
        }),

        ConnectionMode : Object.freeze({
            Direct: 0,
            Gateway: 1,
        }),       

        QueryCompatibilityMode: Object.freeze({
            Default: 0,
            Query: 1,
            SqlQuery: 2,
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
        MediaReadMode : Object.freeze({
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
            Post: "post",
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
         * Represents the Connection policy assocated with a DocumentClient.
         * @property {string} MediaReadMode         -  Attachment content (aka media) download mode. Should be one of the values of {@link MediaReadMode}
         * @property {number} MediaRequestTimeout    - Time to wait for response from network peer for attachment content (aka media) operations. Represented in milliseconds.
         * @property {number} RequestTimeout         - Request timeout (time to wait for response from network peer). Represented in milliseconds.
        */
        ConnectionPolicy : Base.defineClass(function() {
            Object.defineProperty(this, "_defaultMaxConnections", {
                value: 20,
                writable: true,
                configurable: true,
                enumerable: false // this is the default value, so it could be excluded during JSON.stringify
            });

            Object.defineProperty(this, "_defaultMaxConcurrentCallsPerConnection", {
                value: 50,
                writable: true,
                configurable: true,
                enumerable: false // this is the default value, so it could be excluded during JSON.stringify
            });

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
            this.ConnectionProtocol = AzureDocuments.Protocol.Https; 
            this.MediaReadMode = AzureDocuments.MediaReadMode.Buffered;
            this.MediaRequestTimeout = this._defaultMediaRequestTimeout;
            this.RequestTimeout = this._defaultRequestTimeout;
            this.MaxCallsPerConnections = this._defaultMaxConcurrentCallsPerConnection; // for direct connectivity
            this.MaxConnections = this._defaultMaxConnections; // for direct connectivity
        })
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
     module.exports = AzureDocuments;
}