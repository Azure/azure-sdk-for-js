import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * @param delayInMs - The number of milliseconds to be delayed.
 * @param abortSignal - The abortSignal associated with the containing operation.
 * @internal
 */
export declare function delayWithoutThrow(delayInMs: number, abortSignal?: AbortSignalLike): Promise<void>;
//# sourceMappingURL=delayWithoutThrow.d.ts.map