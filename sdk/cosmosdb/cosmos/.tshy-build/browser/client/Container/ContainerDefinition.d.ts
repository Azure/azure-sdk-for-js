import type { IndexingPolicy, PartitionKeyDefinition } from "../../documents/index.js";
import type { ConflictResolutionPolicy } from "../Conflict/ConflictResolutionPolicy.js";
import type { UniqueKeyPolicy } from "./UniqueKeyPolicy.js";
import type { GeospatialType } from "../../documents/GeospatialType.js";
import type { ChangeFeedPolicy } from "../ChangeFeed/ChangeFeedPolicy.js";
import type { ComputedProperty } from "../../documents/ComputedProperty.js";
import type { VectorEmbeddingPolicy } from "../../documents/VectorEmbeddingPolicy.js";
import type { FullTextPolicy } from "../../documents/FullTextPolicy.js";
import { ClientEncryptionPolicy } from "../../encryption/index.js";
export interface ContainerDefinition {
    /** The id of the container. */
    id?: string;
    /** The partition key for the container. */
    partitionKey?: PartitionKeyDefinition;
    /** The indexing policy associated with the container. */
    indexingPolicy?: IndexingPolicy;
    /** The default time to live in seconds for items in a container. */
    defaultTtl?: number;
    /** The conflict resolution policy used to resolve conflicts in a container. */
    conflictResolutionPolicy?: ConflictResolutionPolicy;
    /** Policy for additional keys that must be unique per partition key */
    uniqueKeyPolicy?: UniqueKeyPolicy;
    /** Geospatial configuration for a collection. Type is set to Geography by default */
    geospatialConfig?: {
        type: GeospatialType;
    };
    /** Change feed policy related to the container */
    changeFeedPolicy?: ChangeFeedPolicy;
    /** The computed properties of the container */
    computedProperties?: ComputedProperty[];
    /** The vector embedding policy information for storing items in a container. */
    vectorEmbeddingPolicy?: VectorEmbeddingPolicy;
    /** The full text policy information for storing items in a container. */
    fullTextPolicy?: FullTextPolicy;
    /** Encryption policy for the container, contains path that needs to be encrypted */
    clientEncryptionPolicy?: ClientEncryptionPolicy;
}
//# sourceMappingURL=ContainerDefinition.d.ts.map