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

/**
 * An interface that describes how to communicate with the service.
 */
export interface PagedResult<TGetRequestOptions, TResponse, TPage> {
  /**
   * A method that send a GET request to the service and returns a response with a page of results.
   */
  fetchPage: (url: string, options: TGetRequestOptions) => Promise<TResponse>;
  /**
   * A method to process a page of items from the response. The default is returning
   * the `results` property of the response as is.
   */
  processPage: (response: TResponse) => TPage;
}

/**
 * Options to control the behavior of how paging works.
 */
export interface PagedAsyncIteratorOptions<TResponse, TPage, TPageSettings> {
  /**
   * The name of the service parameter that specifies the max page size. The default is `top`.
   */
  maxPageSizeParam?: string;
  /**
   * a function to implement the `byPage` method on the paged async iterator. The default is
   * one that sets the `maxPageSizeParam` from `settings.maxPageSize` and uses `settings.continuationToken`
   * if exists.
   */
  byPage?: (settings?: TPageSettings | undefined) => AsyncIterableIterator<TPage>;
  /**
   * A method that extracts the link to the next page of results from the response. The
   * default is `nextLink`.
   */
  getNextLink?: (response: TResponse) => string | undefined;
}
