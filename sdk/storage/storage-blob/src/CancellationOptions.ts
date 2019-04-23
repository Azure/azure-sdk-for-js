import { Aborter } from './Aborter';

/**
 * Option interface for passing an {@link Aborter} instance to requests.
 * It contains the following field:
 * @example
 * { abortSignal?: Aborter }
 */
export interface CancellationOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof CancellationOptions
   */
  abortSignal? : Aborter;
}