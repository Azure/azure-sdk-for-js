import { IHeaders } from "..";

/**
 * The feed options
 * @typedef {Object} FeedOptions                    -       \
 * The feed options and query methods.
 * @property {string} [continuation]                -       Opaque token for continuing the enumeration.
 * @property {boolean} [disableRUPerMinuteUsage]    -       \
 * DisableRUPerMinuteUsage is used to enable/disable Request Units(RUs)/minute capacity to serve the \
 * request if regular provisioned RUs/second is exhausted.
 * @property {boolean} [enableCrossPartitionQuery]  -       \
 * A value indicating whether users are enabled to send more than one request to execute the query \
 * in the Azure Cosmos DB database service.
 * <p>More than one request is necessary if the query is not scoped to single partition key value.</p>
 * @property {boolean} [enableScanInQuery]          -       \
 * Allow scan on the queries which couldn't be served as indexing was opted out on the requested paths.
 * @property {number} [maxDegreeOfParallelism]      -       \
 * The maximum number of concurrent operations that run client side during parallel query execution \
 * in the Azure Cosmos DB database service. Negative values make the system automatically decides the \
 * number of concurrent operations to run.
 * @property {number} [maxItemCount]                -       \
 * Max number of items to be returned in the enumeration operation.
 * @property {string} [partitionKey]                -       \
 * Specifies a partition key definition for a particular path in the Azure Cosmos DB database service.
 * @property {string} [sessionToken]                -       Token for use with Session consistency.
 */
export interface FeedOptions {
  continuation?: string;
  disableRUPerMinuteUsage?: boolean;
  enableCrossPartitionQuery?: boolean;
  enableScanInQuery?: boolean;
  maxDegreeOfParallelism?: number;
  maxItemCount?: number;
  partitionKey?: string;
  sessionToken?: string;
  initialHeaders?: IHeaders;
  a_im?: string;
  accessCondition?: any; // TODO: any
  populateQueryMetrics?: boolean;
}
