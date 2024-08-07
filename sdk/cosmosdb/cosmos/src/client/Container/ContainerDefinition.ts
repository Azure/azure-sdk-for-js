// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { IndexingPolicy, PartitionKeyDefinition } from "../../documents";
import { ConflictResolutionPolicy } from "../Conflict/ConflictResolutionPolicy";
import { UniqueKeyPolicy } from "./UniqueKeyPolicy";
import { GeospatialType } from "../../documents/GeospatialType";
import { ClientEncryptionPolicy } from "../../encryption";
import { ChangeFeedPolicy } from "../ChangeFeed/ChangeFeedPolicy";
import { ComputedProperty } from "../../documents/ComputedProperty";
import { VectorEmbeddingPolicy } from "../../documents/VectorEmbeddingPolicy";

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
  /** Encryption policy for the container, contains path that needs to be encrypted */
  clientEncryptionPolicy?: ClientEncryptionPolicy;
  /** Change feed policy related to the container */
  changeFeedPolicy?: ChangeFeedPolicy;
  /** The computed properties of the container */
  computedProperties?: ComputedProperty[];
  /** The vector embedding policy information for storing items in a container. */
  vectorEmbeddingPolicy?: VectorEmbeddingPolicy;
}
