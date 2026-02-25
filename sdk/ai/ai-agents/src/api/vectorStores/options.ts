// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  VectorStoreConfiguration,
  VectorStoreExpirationPolicy,
  VectorStoreChunkingStrategyRequestUnion,
  ListSortOrder,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";
import { PollingOptionsParams } from "../options.js";

/** Optional parameters. */
export interface VectorStoresDeleteVectorStoreOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VectorStoresModifyVectorStoreOptionalParams extends OperationOptions {
  /** The name of the vector store. */
  name?: string | null;
  /** Details on when this vector store expires */
  expiresAfter?: VectorStoreExpirationPolicy | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** Optional parameters. */
export interface VectorStoresGetVectorStoreOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VectorStoresCreateVectorStoreOptionalParams
  extends OperationOptions, PollingOptionsParams {
  /** A list of file IDs that the vector store should use. Useful for tools like `file_search` that can access files. */
  fileIds?: string[];
  /** The name of the vector store. */
  name?: string;
  /** The vector store configuration, used when vector store is created from Azure asset URIs. */
  storeConfiguration?: VectorStoreConfiguration;
  /** Details on when this vector store expires */
  expiresAfter?: VectorStoreExpirationPolicy;
  /** The chunking strategy used to chunk the file(s). If not set, will use the auto strategy. Only applicable if file_ids is non-empty. */
  chunkingStrategy?: VectorStoreChunkingStrategyRequestUnion;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** Optional parameters. */
export interface VectorStoresListVectorStoresOptionalParams extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}
