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
 * an interface that describes how to communicate with the service and how to build a page of items.
 */
export interface PagedResult<TOptions extends Record<string, any>, TResponse, TPage> {
  /**
   * The name of the service parameter that specifies the max page size. The default is `top`.
   */
  maxPageSizeParam?: string;
  /**
   * A method that send a GET request to the service and returns a response.
   */
  sendGetRequest: (path: string, options: TOptions) => Promise<TResponse>;
  /**
   * A method that extracts the link to the next page of results from the response. The
   * default is `nextLink`.
   */
  getNextLink?: (response: TResponse) => string | undefined;
  /**
   * A method to build a page of items from the response. The default is returning
   * the `results` property of the response as is.
   */
  buildPage?: (response: TResponse) => TPage;
}
