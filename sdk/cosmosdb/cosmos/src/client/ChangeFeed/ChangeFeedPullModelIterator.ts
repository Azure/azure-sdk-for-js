// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Resource } from "../Resource";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse";
/**
 * Use `Items.getChangeFeedIterator()` to return an iterator that can iterate over all the changes for a partition key, feed range or an entire container.
 */
export interface ChangeFeedPullModelIterator<T> {
  /**
   * Always returns true, changefeed is an infinite stream.
   */
  readonly hasMoreResults: boolean;
  /**
   * Returns next set of results for the change feed.
   */
  readNext(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>>;
  /**
   * Gets an async iterator which will yield change feed results.
   * @example Get changefeed for an entire container from now
   * ```typescript
   * const options = { changeFeedStartFrom: ChangeFeedStartFrom.Now() };
   * for await(const res of container.items.getChangeFeedIterator(options).getAsyncIterator()) {
   *   //process res
   * }
   * ```
   */
  getAsyncIterator(): AsyncIterable<ChangeFeedIteratorResponse<Array<T & Resource>>>;
}
