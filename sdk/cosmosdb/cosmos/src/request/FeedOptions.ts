import { IHeaders } from "..";

/**
 * The feed options and query methods.
 */
export interface FeedOptions {
  /** Opaque token for continuing the enumeration. */
  continuation?: string;
  /**
   * DisableRUPerMinuteUsage is used to enable/disable Request Units(RUs)/minute capacity to serve
   * the request if regular provisioned RUs/second is exhausted.
   */
  disableRUPerMinuteUsage?: boolean;
  /**
   * A value indicating whether users are enabled to send more than one request to execute the query in the Azure Cosmos DB database service.
   *
   * More than one request is necessary if the query is not scoped to single partition key value.
   */
  enableCrossPartitionQuery?: boolean;
  /** Allow scan on the queries which couldn't be served as indexing was opted out on the requested paths. */
  enableScanInQuery?: boolean;
  /**
   * The maximum number of concurrent operations that run client side during parallel query execution in the
   * Azure Cosmos DB database service. Negative values make the system automatically decides the number of
   * concurrent operations to run.
   */
  maxDegreeOfParallelism?: number;
  /** Max number of items to be returned in the enumeration operation. */
  maxItemCount?: number;
  /** Specifies a partition key definition for a particular path in the Azure Cosmos DB database service. */
  partitionKey?: string;
  /** Token for use with Session consistency. */
  sessionToken?: string;
  /** (Advanced use case) Initial headers to start with when sending requests to Cosmos */
  initialHeaders?: IHeaders;
  /** Indicates a change feed request. Must be set to "Incremental feed", or omitted otherwise. */
  a_im?: string;
  /** Conditions Associated with the request. */
  accessCondition?: {
    /** Conditional HTTP method header type (IfMatch or IfNoneMatch). */
    type: string;
    /** Conditional HTTP method header value (the _etag field from the last version you read). */
    condition: string;
  };
  /** Enable returning query metrics in response headers */
  populateQueryMetrics?: boolean;
}
