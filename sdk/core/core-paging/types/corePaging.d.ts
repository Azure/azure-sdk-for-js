/**
 * @interface
 * An interface that tracks the settings for paged iteration
 */
export interface PageSettings {
  /**
   * @member {string} [continuationToken] The token that keeps track of where to continue the iterator
   */
  continuationToken?: string,
  /**
   * @member {number} [pageSize] The size of the page during paged iteration
   */
  pageSize?: number,
}

/**
 * @interface
 * An interface that allows async iterable iteration both to completion and by page.
 */
export interface PagedAsyncIterableIterator<T> {
  /**
   * @member {Promise} [next] The next method, part of the iteration protocol
   */
  next(): Promise<{
    done: boolean;
    value: T;
  } | {
    done: boolean;
    value: undefined;
  }>;
  /**
   * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
   */
  [Symbol.asyncIterator](): PagedAsyncIterableIterator<T>;
  /**
   * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
   */
  byPage: (settings?: PageSettings) => AsyncIterableIterator<T[]>;
}
