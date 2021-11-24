// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { BatchPerfTest } from "./batchPerfTest";

/**
 * Conveys the structure of any Perf test.
 * It allows developers to define the optional parameters to receive
 * in a way that aids them to auto-complete these options while adding code inside of each method.
 * It provides methods to parse the assigned options, as well as to set up and tear down any resources
 * at a global level (only one setup and teardown for the whole execution of a Perf test),
 * and at a local level, which happens once for each initialization of the test class
 * (initializations are as many as the "parallel" command line parameter specifies).
 */
export abstract class PerfTest<TOptions = Record<string, unknown>> extends BatchPerfTest<TOptions> {
  public abstract run(abortSignal?: AbortSignalLike): Promise<void>;

  public async runBatch(abortSignal?: AbortSignalLike) {
    await this.run(abortSignal);
    return 1;
  }
}
