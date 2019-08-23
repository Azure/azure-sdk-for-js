import { AbortSignalLike } from "@azure/core-http";

export type Context = { [key: string]: number | string | boolean | Context };

/**
 * Decorator of AborterSignalLike object. As protocol layer doesn't provide a way to allow convenience
 * layer pass down any context into pipeline policies. ContextAborter will decorate abortSignal with context
 * support which can be accessed by pipeline.
 *
 * @export
 * @class ContextAborter
 * @implements {AbortSignalLike}
 */
export class ContextAborter implements AbortSignalLike {
  constructor(private readonly aborter: AbortSignalLike, public readonly context: Context = {}) {}

  public get aborted(): boolean {
    return this.aborter.aborted;
  }

  public addEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any): void {
    this.aborter.addEventListener(type, listener);
  }

  public removeEventListener(
    type: "abort",
    listener: (this: AbortSignalLike, ev: any) => any
  ): void {
    this.aborter.removeEventListener(type, listener);
  }
}
