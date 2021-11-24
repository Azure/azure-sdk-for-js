// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { BatchPerfTest } from "./batchPerfTest";

/**
 * Extends BatchPerfTest.
 * 
 * This is helpful when the method being tested in the "run" method counts as one operation for one call.
 */
export abstract class PerfTest<TOptions = Record<string, unknown>> extends BatchPerfTest<TOptions> {
  public abstract run(abortSignal?: AbortSignalLike): Promise<void>;

  public async runBatch(abortSignal?: AbortSignalLike) {
    await this.run(abortSignal);
    return 1;
  }
}
