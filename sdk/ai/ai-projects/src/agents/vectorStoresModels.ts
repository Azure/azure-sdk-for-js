// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VectorStoreChunkingStrategyRequest,
  VectorStoreDataSource,
  VectorStoreFileStatusFilter,
} from "../customization/models.js";

/** Request object for creating a vector store file. */
export interface CreateVectorStoreFileOptions {
  /** A File ID that the vector store should use. Useful for tools like `file_search` that can access files. */
  fileId?: string;

  /** The data sources to be used. This option is mutually exclusive with fileId. */
  dataSources?: Array<VectorStoreDataSource>;

  /** The chunking strategy used to chunk the file(s). If not set, will use the auto strategy. */
  chunkingStrategy?: VectorStoreChunkingStrategyRequest;
}

/** Request object for creating a vector store file batch. */
export interface CreateVectorStoreFileBatchOptions {
  /** A list of File IDs that the vector store should use. Useful for tools like `file_search` that can access files. */
  fileIds?: string[];

  /** The data sources to be used. This option is mutually exclusive with fileId. */
  dataSources?: VectorStoreDataSource[];

  /** The chunking strategy used to chunk the file(s). If not set, will use the auto strategy. */
  chunkingStrategy?: VectorStoreChunkingStrategyRequest;
}

/** Filter by file status. */
export interface FileStatusFilter {
  /**
   * Possible values: "in_progress", "completed", "failed", "cancelled"
   */
  filter?: VectorStoreFileStatusFilter;
}
