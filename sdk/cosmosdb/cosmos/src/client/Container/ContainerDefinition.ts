// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { IndexingPolicy, PartitionKeyDefinition } from "../../documents";
import { ConflictResolutionPolicy } from "../Conflict/ConflictResolutionPolicy";
import { UniqueKeyPolicy } from "./UniqueKeyPolicy";
import { GeospatialType } from "../../documents/GeospatialType";
import { VectorEmbeddingPolicy } from "../../documents/VectorEmbeddingPolicy";
import { ComputedProperty } from "../../documents/ComputedProperty";

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
  /** The vector embedding policy information for storing items in a container. */
  vectorEmbeddingPolicy?: VectorEmbeddingPolicy;
  /** The computed properties of the container */
  computedProperties?: ComputedProperty[];
}
