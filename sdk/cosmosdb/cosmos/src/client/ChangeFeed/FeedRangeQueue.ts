// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ChangeFeedRange } from "./ChangeFeedRange";
/**
 * @hidden
 * A queue for iterating over specified Epk ranges and fetch change feed for the given epk ranges.
 */
export class FeedRangeQueue<T> {
  private elements: ChangeFeedRange[];

  constructor() {
    this.elements = [];
  }

  public modifyFirstElement(newItem: ChangeFeedRange): void {
    if (!this.isEmpty()) {
      this.elements[0] = newItem;
    }
  }

  public enqueue(item: ChangeFeedRange): void {
    this.elements.push(item);
  }

  public dequeue(): ChangeFeedRange {
    return this.elements.shift();
  }

  public peek(): T | ChangeFeedRange {
    return !this.isEmpty() ? this.elements[0] : undefined;
  }

  public isEmpty(): boolean {
    return this.elements.length === 0;
  }

  public moveFirstElementToTheEnd(): void {
    if (!this.isEmpty()) {
      this.elements.push(this.dequeue());
    }
  }
  /**
   * Returns a snapshot of the queue as an array to be used as Continuation token.
   */
  public returnSnapshot(): ChangeFeedRange[] {
    const allFeedRanges: ChangeFeedRange[] = [];
    this.elements.map((element) => {
      const minInclusive = element.epkMinHeader ? element.epkMinHeader : element.minInclusive;
      const maxExclusive = element.epkMaxHeader ? element.epkMaxHeader : element.maxExclusive;
      const feedRangeElement = new ChangeFeedRange(
        minInclusive,
        maxExclusive,
        element.continuationToken,
      );
      allFeedRanges.push(feedRangeElement);
    });
    return allFeedRanges;
  }
}
