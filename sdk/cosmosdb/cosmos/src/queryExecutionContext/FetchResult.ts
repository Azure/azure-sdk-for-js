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
   * @constructor DocumentProducer
   * @param {object} feedReponse                  - The response the document producer got back on a successful fetch
   * @param {object} error                        - The exception meant to be buffered on an unsuccessful fetch
   * @ignore
   */
  constructor(feedResponse: any, error: any) {
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
