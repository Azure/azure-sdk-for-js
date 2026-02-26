// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MemorySearchOptions, InputItemUnion, PageOrder } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaMemoryStoresDeleteScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaMemoryStoresGetUpdateResultOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaMemoryStoresUpdateMemoriesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Conversation items from which to extract memories. */
  items?: InputItemUnion[];
  /** The unique ID of the previous update request, enabling incremental memory updates from where the last operation left off. */
  previousUpdateId?: string;
  /**
   * Timeout period before processing the memory update in seconds.
   * If a new update request is received during this period, it will cancel the current request and reset the timeout.
   * Set to 0 to immediately trigger the update without delay.
   * Defaults to 300 (5 minutes).
   */
  updateDelayInSecs?: number;
}

/** Optional parameters. */
export interface BetaMemoryStoresSearchMemoriesOptionalParams extends OperationOptions {
  /** Items for which to search for relevant memories. */
  items?: InputItemUnion[];
  /** The unique ID of the previous search request, enabling incremental memory search from where the last operation left off. */
  previousSearchId?: string;
  /** Memory search options. */
  options?: MemorySearchOptions;
}

/** Optional parameters. */
export interface BetaMemoryStoresDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaMemoryStoresListOptionalParams extends OperationOptions {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and`desc`
   * for descending order.
   */
  order?: PageOrder;
  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include after=obj_foo in order to fetch the next page of the list.
   */
  after?: string;
  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include before=obj_foo in order to fetch the previous page of the list.
   */
  before?: string;
}

/** Optional parameters. */
export interface BetaMemoryStoresGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaMemoryStoresUpdateOptionalParams extends OperationOptions {
  /** A human-readable description of the memory store. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the memory store. */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface BetaMemoryStoresCreateOptionalParams extends OperationOptions {
  /** A human-readable description of the memory store. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the memory store. */
  metadata?: Record<string, string>;
}
