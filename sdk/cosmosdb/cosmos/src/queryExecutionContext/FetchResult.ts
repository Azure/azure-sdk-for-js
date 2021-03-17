// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/** @hidden */
export enum FetchResultType {
  "Done" = 0,
  "Exception" = 1,
  "Result" = 2
}

/** @hidden */
export class FetchResult {
  public feedResponse: any;
  public fetchResultType: FetchResultType;
  public error: any;
  /**
   * Wraps fetch results for the document producer.
   * This allows the document producer to buffer exceptions so that actual results don't get flushed during splits.
   *
   * @param feedReponse - The response the document producer got back on a successful fetch
   * @param error - The exception meant to be buffered on an unsuccessful fetch
   * @hidden
   */
  constructor(feedResponse: unknown, error: unknown) {
    // TODO: feedResponse/error
    if (feedResponse) {
      this.feedResponse = feedResponse;
      this.fetchResultType = FetchResultType.Result;
    } else {
      this.error = error;
      this.fetchResultType = FetchResultType.Exception;
    }
  }
}
