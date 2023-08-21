// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Resource } from "../Resource";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse";
/**
 * Use `Items.getChangeFeedIterator()` to return an iterator that can iterate over all the changes for a partition key, feed range or an entire container.
 */
export abstract class ChangeFeedPullModelIterator<T> {
  /**
   * Always returns true, changefeed is an infinite stream.
   */
  abstract get hasMoreResults(): boolean;
  /**
   * Returns next set of results for the change feed.
   */
  abstract readNextAsync(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>>;
}
