// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VectorStoreDataSource,
  VectorStoreChunkingStrategyRequestUnion,
  ListSortOrder,
  VectorStoreFileStatusFilter,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";
import type { PollingOptionsParams } from "../options.js";

/** Optional parameters. */
export interface VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams extends OperationOptions {
  /** Filter by file status. */
  filter?: VectorStoreFileStatusFilter;
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

/** Optional parameters. */
export interface VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams
  extends OperationOptions, PollingOptionsParams {
  /** List of file identifiers. */
  fileIds?: string[];
  /** List of Azure assets. */
  dataSources?: VectorStoreDataSource[];
  /** The chunking strategy used to chunk the file(s). If not set, will use the auto strategy. */
  chunkingStrategy?: VectorStoreChunkingStrategyRequestUnion;
}
