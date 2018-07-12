import { IndexingPolicy, PartitionKey, PartitionKeyDefinition } from "../../documents";

export interface ContainerDefinition {
  /** The id of the container. */
  id?: string;
  /**  TODO */
  partitionKey?: PartitionKeyDefinition;
  /** The indexing policy associated with the container. */
  indexingPolicy?: IndexingPolicy;
  /** The default time to live in seconds for items in a container. */
  defaultTtl?: number;
}
