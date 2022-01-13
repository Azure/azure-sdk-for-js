// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { BatchPerfTest } from "./batchPerfTest";

/**
 *
 * The `PerfTest` class helps build performance test cases where the functionality being tested in the `run` method consists of a single operation.
 */
export abstract class PerfTest<TOptions = Record<string, unknown>> extends BatchPerfTest<TOptions> {
  public abstract run(abortSignal?: AbortSignalLike): Promise<void>;

  public async runBatch(abortSignal?: AbortSignalLike) {
    await this.run(abortSignal);
    return 1;
  }
}
