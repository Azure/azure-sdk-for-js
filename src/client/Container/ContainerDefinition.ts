import { IndexingPolicy, PartitionKey, PartitionKeyDefinition } from "../../documents";
import { ConflictResolutionPolicy } from "../Conflict/ConflictResolutionPolicy";

export interface ContainerDefinition {
  /** The id of the container. */
  id?: string;
  /**  TODO */
  partitionKey?: PartitionKeyDefinition;
  /** The indexing policy associated with the container. */
  indexingPolicy?: IndexingPolicy;
  /** The default time to live in seconds for items in a container. */
  defaultTtl?: number;
  /** The conflict resolution policy used to resolve conflicts in a container. */
  conflictResolutionPolicy?: ConflictResolutionPolicy;
}
