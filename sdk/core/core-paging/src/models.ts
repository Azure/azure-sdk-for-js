// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * An interface that tracks the settings for paged iteration
 */
export interface PageSettings {
  /**
   * The token that keeps track of where to continue the iterator
   */
  continuationToken?: string;
  /**
   * The size of the page during paged iteration
   */
  maxPageSize?: number;
}
/**
 * An interface that allows async iterable iteration both to completion and by page.
 */
export interface PagedAsyncIterableIterator<T, PageT = T[], PageSettingsT = PageSettings> {
  /**
   * The next method, part of the iteration protocol
   */
  next(): Promise<IteratorResult<T, T>>;
  /**
   * The connection to the async iterator, part of the iteration protocol
   */
  [Symbol.asyncIterator](): PagedAsyncIterableIterator<T, PageT, PageSettingsT>;
  /**
   * Return an AsyncIterableIterator that works a page at a time
   */
  byPage: (settings?: PageSettingsT) => AsyncIterableIterator<PageT>;
}
