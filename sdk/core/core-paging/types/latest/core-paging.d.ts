import "@azure/core-asynciterator-polyfill";
/**
 * @interface
 * An interface that tracks the settings for paged iteration
 */
export interface PageSettings {
  /**
   * @member {string} [continuationToken] The token that keeps track of where to continue the iterator
   */
  continuationToken?: string;
  /**
   * @member {number} [pageSize] The size of the page during paged iteration
   */
  maxPageSize?: number;
}
/**
 * @interface
 * An interface that allows async iterable iteration both to completion and by page.
 */
export interface PagedAsyncIterableIterator<T, PageT = T[], PageSettingsT = PageSettings> {
  /**
   * @member {Promise} [next] The next method, part of the iteration protocol
   */
  next(): Promise<IteratorResult<T, T>>;
  /**
   * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
   */
  [Symbol.asyncIterator](): PagedAsyncIterableIterator<T, PageT, PageSettingsT>;
  /**
   * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
   */
  byPage: (settings?: PageSettingsT) => AsyncIterableIterator<PageT>;
}
