import { PartitionKey } from "../documents";
import { CosmosHeaders } from "../index";

/**
 * Options that can be specified for a requested issued to the Azure Cosmos DB servers.=
 */
export interface SharedOptions {
  /** Specifies a partition key definition for a particular path in the Azure Cosmos DB database service. */
  partitionKey?: PartitionKey | PartitionKey[];
  /** Enables/disables getting document container quota related stats for document container read requests. */
  sessionToken?: string;
  /** (Advanced use case) Initial headers to start with when sending requests to Cosmos */
  initialHeaders?: CosmosHeaders;
  /**
   * abortSignal to pass to all underlying network requests created by this method call. See https://developer.mozilla.org/en-US/docs/Web/API/AbortController
   * @example Cancel a read request
   * ```typescript
   * const controller = new AbortController()
   * const {result: item} = await items.query('SELECT * from c', { abortSignal: controller.signal});
   * controller.abort()
   * ```
   */
  abortSignal?: AbortSignal;
}
