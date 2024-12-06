// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse";
import type { Container, Resource } from "../../client";
import type { ClientContext } from "../../ClientContext";
import type { ChangeFeedPullModelIterator } from "./ChangeFeedPullModelIterator";
import type { ChangeFeedIteratorOptions } from "./ChangeFeedIteratorOptions";
import { changeFeedIteratorBuilder } from "./changeFeedIteratorBuilder";
import type { PartitionKeyRangeCache } from "../../routing";

/**
 * @hidden
 * Provides iterator for change feed.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */

export class ChangeFeedIteratorBuilder<T> implements ChangeFeedPullModelIterator<T> {
  private iterator: ChangeFeedPullModelIterator<T>;
  private isInstantiated: boolean;
  /**
   * @internal
   */
  constructor(
    private cfOptions: ChangeFeedIteratorOptions,
    private clientContext: ClientContext,
    private container: Container,
    private partitionKeyRangeCache: PartitionKeyRangeCache,
  ) {
    this.isInstantiated = false;
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
    if (!this.isInstantiated) {
      await this.instantiateIterator();
    }
    do {
      const result = await this.iterator.readNext();
      yield result;
    } while (this.hasMoreResults);
  }

  /**
   * Returns the result of change feed from Azure Cosmos DB.
   */
  public async readNext(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    if (!this.isInstantiated) {
      await this.instantiateIterator();
    }
    return this.iterator.readNext();
  }

  private async instantiateIterator(): Promise<void> {
    const iterator = await changeFeedIteratorBuilder(
      this.cfOptions,
      this.clientContext,
      this.container,
      this.partitionKeyRangeCache,
    );
    this.isInstantiated = true;
    this.iterator = iterator;
  }
}
