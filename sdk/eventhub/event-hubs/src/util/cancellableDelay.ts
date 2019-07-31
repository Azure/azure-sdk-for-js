import { AbortSignalLike, AbortError } from "@azure/abort-controller";

export function cancellableDelay(delayInMs: number, abortSignal?: AbortSignalLike): Promise<void> {
  return new Promise((resolve, reject) => {
    if (abortSignal && abortSignal.aborted) {
      return reject(new AbortError(`The delay was cancelled by the user.`));
    }

    const timer = setTimeout(resolve, delayInMs);
    if (abortSignal) {
      abortSignal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new AbortError(`The delay was cancelled by the user.`));
      });
    }
  });
}
