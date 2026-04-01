// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * loop.ts — Generic isTerminal → act loop with abort support.
 */

export interface Loop<T> {
  /** Return true to stop the loop, false to continue. */
  isTerminal: (ctx: T, iteration: number) => Promise<boolean>;
  /** Produce the improvement action. */
  act: (ctx: T, iteration: number) => Promise<void>;
  /** Release resources. Called in finally — always runs. */
  cleanup?: (ctx: T) => Promise<void> | void;
}

/** Returns the number of iterations executed. */
export async function loop<T>(
  config: Loop<T>,
  ctx: T,
  maxIterations: number,
  signal?: AbortSignal,
): Promise<number> {
  try {
    for (let i = 1; i <= maxIterations; i++) {
      if (signal?.aborted) return i - 1;
      if (await config.isTerminal(ctx, i)) return i;
      if (signal?.aborted) return i;
      // Don't call act() on the final iteration — the result would never be
      // verified by isTerminal and the caller typically rolls back anyway.
      if (i === maxIterations) break;
      try {
        await config.act(ctx, i);
      } catch (err) {
        // If act() fails (e.g. JSON parse error), skip this iteration
        // and let isTerminal re-run the test on the next iteration
        if (i < maxIterations - 1) continue;
        throw err;
      }
    }
    return maxIterations;
  } finally {
    if (config.cleanup) await config.cleanup(ctx);
  }
}
