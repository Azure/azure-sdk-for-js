import { Point, Range } from "../range";
import { PartitionKeyDefinition } from "./PartitionKeyDefinition";

export interface Document {
    [key: string]: any;
}

export type PartitionKey = PartitionKeyDefinition | Point | Range;

/**
 * <p>Represents the consistency levels supported for Azure Cosmos DB client operations.<br>
 * The requested ConsistencyLevel must match or be weaker than that provisioned for the database account. \
 * Consistency levels.<br>
 * Consistency levels by order of strength are Strong, BoundedStaleness, Session and Eventual.</p>
 * @readonly
 * @enum {string}
 * @property Strong           Strong Consistency guarantees that read operations always return the value \
 * that was last written.
 * @property BoundedStaleness Bounded Staleness guarantees that reads are not too out-of-date. This can \
 * be configured based on number of operations (MaxStalenessPrefix) or time (MaxStalenessIntervalInSeconds).
 * @property Session          Session Consistency guarantees monotonic reads (you never read old data, \
 * then new, then old again), monotonic writes (writes are ordered)
 *                               and read your writes (your writes are immediately visible to your reads) \
 * within any single session.
 * @property Eventual         Eventual Consistency guarantees that reads will return a subset of writes. All writes
 *                          will be eventually be available for reads.
 * @property ConsistentPrefix ConsistentPrefix Consistency guarantees that reads will return some prefix \
 * of all writes with no gaps.
 *                           All writes will be eventually be available for reads.
 */
export enum ConsistencyLevel {
    Strong = "Strong",
    BoundedStaleness = "BoundedStaleness",
    Session = "Session",
    Eventual = "Eventual",
    ConsistentPrefix = "ConsistentPrefix",
}

/**
 * Specifies the supported indexing modes.
 * @readonly
 * @enum {string}
 * @property Consistent     <p>Index is updated synchronously with a create or update operation. <br>
 *                      With consistent indexing, query behavior is the same as the default consistency \
 *                      level for the container. The index is
 *                       always kept up to date with the data. </p>
 * @property Lazy           <p>Index is updated asynchronously with respect to a create or update operation. <br>
 *                      With lazy indexing, queries are eventually consistent. The index is updated when the \
 *                      container is idle.</p>
 */
export enum IndexingMode {
    Consistent = "consistent",
    Lazy = "lazy",
    None = "none",
}

/**
 * Specifies the supported Index types.
 * @readonly
 * @enum {string}
 * @property Hash     This is supplied for a path which has no sorting requirement.
 *                    This kind of an index has better precision than corresponding range index.
 * @property Range    This is supplied for a path which requires sorting.
 * @property Spatial  This is supplied for a path which requires geospatial indexing.
 */
export enum IndexKind {
    Hash = "Hash",
    Range = "Range",
    Spatial = "Spatial",
}

export enum DataType {
    Number = "Number",
    String = "String",
    Point = "Point",
    LineString = "LineString",
    Polygon = "Polygon",
}

export enum PartitionKind {
    Hash = "Hash",
}

export enum ConnectionMode {
    Gateway = 0,
}

export enum QueryCompatibilityMode {
    Default = 0,
    Query = 1,
    SqlQuery = 2,
}

/**
 * Enum for media read mode values.
 * @readonly
 * @enum {sting}
 * @property Buffered Content is buffered at the client and not directly streamed from the content store.
 *                    <p>Use Buffered to reduce the time taken to read and write media files.</p>
 * @property Streamed Content is directly streamed from the content store without any buffering at the client.
 *                    <p>Use Streamed to reduce the client memory overhead of reading and writing media files. </p>
 */
export enum MediaReadMode {
    Buffered = "Buffered",
    Streamed = "Streamed",
}

/**
 * Enum for permission mode values.
 * @readonly
 * @enum {string}
 * @property None Permission not valid.
 * @property Read Permission applicable for read operations only.
 * @property All Permission applicable for all operations.
 */
export enum PermissionMode {
    None = "none",
    Read = "read",
    All = "all",
}

/**
 * Enum for trigger type values.
 * Specifies the type of the trigger.
 * @readonly
 * @enum {string}
 * @property Pre  Trigger should be executed before the associated operation(s).
 * @property Post Trigger should be executed after the associated operation(s).
 */
export enum TriggerType {
    Pre = "pre",
    Post = "post",
}

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
export enum TriggerOperation {
    All = "all",
    Create = "create",
    Update = "update",
    Delete = "delete",
    Replace = "replace",
}

/**
 * Enum for udf type values.
 * Specifies the types of user defined functions.
 * @readonly
 * @enum {string}
 * @property Javascript Javascript type.
 */
export enum UserDefinedFunctionType {
    Javascript = "Javascript",
}
