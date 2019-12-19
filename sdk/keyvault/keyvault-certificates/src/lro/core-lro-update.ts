import { PollerLike as CorePollerLike, Poller as CorePoller } from "@azure/core-lro";

/**
 * Abstract representation of a poller, intended to expose just the minimal that the user needs to work with.
 *
 * This edit of the original interface also exposes a getState() method that helps to expose
 * the operation state of the poller, but defined by the abstract TState type
 * and not only by the basic properties in PollOperationState<TResult>.
 */
export interface PollerLike<TState, TResult> extends CorePollerLike<TState, TResult> {
  /**
   * Exposes the abstract TState to the user.
   */
  getState(): TState;
}

/**
 * A class that represents the definition of a program that polls through consecutive requests
 * until it reaches a state of completion.
 *
 * This edit of the original interface also exposes a getState() method that helps to expose
 * the operation state of the poller, but defined by the abstract TState type
 * and not only by the basic properties in PollOperationState<TResult>.
 */
export abstract class Poller<TState, TResult> extends CorePoller<TState, TResult> {
  /**
   * Exposes the abstract TState to the user.
   */
  public abstract getState(): TState;
}
