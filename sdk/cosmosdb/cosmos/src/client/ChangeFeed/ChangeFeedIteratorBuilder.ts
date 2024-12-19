// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse";
import type { Container, Resource } from "../../client";
import type { ClientContext } from "../../ClientContext";
import type { ChangeFeedPullModelIterator } from "./ChangeFeedPullModelIterator";
import type { ChangeFeedIteratorOptions } from "./ChangeFeedIteratorOptions";
import { buildChangeFeedIterator } from "./buildChangeFeedIterator";
import type { PartitionKeyRangeCache } from "../../routing";
import { ErrorResponse } from "../../request";

/**
 * @hidden
 * Provides iterator for change feed.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */

export class ChangeFeedIteratorBuilder<T> implements ChangeFeedPullModelIterator<T> {
  private iterator: ChangeFeedPullModelIterator<T>;
  private isInitialized: boolean;
  /**
   * @internal
   */
  constructor(
    private cfOptions: ChangeFeedIteratorOptions,
    private clientContext: ClientContext,
    private container: Container,
    private partitionKeyRangeCache: PartitionKeyRangeCache,
  ) {
    this.isInitialized = false;
  }

  /**
   * Change feed is an infinite feed. hasMoreResults is always true.
   */
  get hasMoreResults(): boolean {
    return true;
  }

  /**
   * Gets an async iterator which will yield change feed results.
   */
  public async *getAsyncIterator(): AsyncIterable<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    await this.initializeIterator();
    do {
      const result = await this.iterator.readNext();
      yield result;
    } while (this.hasMoreResults);
  }

  /**
   * Returns the result of change feed from Azure Cosmos DB.
   */
  public async readNext(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    await this.initializeIterator();
    return this.iterator.readNext();
  }

  private async initializeIterator(): Promise<void> {
    if (!this.isInitialized) {
      try {
        const iterator = await buildChangeFeedIterator(
          this.cfOptions,
          this.clientContext,
          this.container,
          this.partitionKeyRangeCache,
        );
        this.isInitialized = true;
        this.iterator = iterator;
      } catch (err) {
        throw new ErrorResponse(err.message);
      }
    }
  }
}
