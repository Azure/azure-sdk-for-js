/**
 * Specifies options for the change feed
 *
 * Some of these options control where and when to start reading from the change feed. The order of precedence is:
 * - continuation
 * - startTime
 * - startFromBeginning
 *
 * If none of those options are set, it will start reading changes from the first `ChangeFeedIterator.executeNext()` call.
 */
export interface ChangeFeedOptions {
  /**
   * Max amount of items to return per page
   */
  maxItemCount?: number;
  /**
   * The continuation token to start from.
   *
   * This is equivalent to the etag and continuation value from the `ChangeFeedResponse`
   */
  continuation?: string;
  /**
   * The session token to use. If not specified, will use the most recent captured session token to start with.
   */
  sessionToken?: string;
  /**
   * Signals whether to start from the beginning or not.
   */
  startFromBeginning?: boolean;
  /**
   * Specified the start time to start reading changes from.
   */
  startTime?: Date;
}
