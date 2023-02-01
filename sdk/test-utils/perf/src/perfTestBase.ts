// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { multicoreUtils } from "./multicore";
import {
  PerfOptionDictionary,
  parsePerfOption,
  DefaultPerfOptions,
  defaultPerfOptions,
  validateOptions,
  ParsedPerfOptions,
} from "./options";
import { AbortController } from "@azure/abort-controller";
import { Snapshot } from "./snapshot";

/**
 * Defines the behavior of the PerfTest constructor, to use the class as a value.
 */
export interface PerfTestConstructor<
  TOptions extends Record<string, unknown> = Record<string, unknown>
> {
  new (): PerfTestBase<TOptions>;
}

/**
 * Conveys the structure of any Perf test.
 * It allows developers to define the optional parameters to receive
 * in a way that aids them to auto-complete these options while adding code inside of each method.
 * It provides methods to parse the assigned options, as well as to set up and tear down any resources
 * at a global level (only one setup and teardown for the whole execution of a Perf test),
 * and at a local level, which happens once for each initialization of the test class
 * (initializations are as many as the "parallel" command line parameter specifies).
 */
export abstract class PerfTestBase<TOptions = Record<string, unknown>> {
  public completedOperations = 0;
  public lastMillisecondsElapsed = 0;
  private static globalParallelIndex = multicoreUtils.isManager
    ? 0
    : multicoreUtils.workerData.parallelIndexOffset;
  protected readonly parallelIndex: number;

  public abstract options: PerfOptionDictionary<TOptions>;

  public get parsedOptions(): ParsedPerfOptions<TOptions & DefaultPerfOptions> {
    // Only validate the options if they are defined: if (when) parsedOptions is called
    // in the constructor, options will be undefined.
    if (this.options) {
      validateOptions({
        ...this.options,
        ...defaultPerfOptions,
      });
    }

    // we need to handle the manager case as a perf test instance will be created by the manager
    // to run globalSetup
    if (multicoreUtils.isManager) {
      // This cast is needed because TS thinks
      //   ```ts
      //   PerfOptionDictionary<TOptions & DefaultPerfOptions>
      //   ```
      //    is different from
      //   ```ts
      //    PerfOptionDictionary<TOptions> & PerfOptionDictionary<DefaultPerfOptions>
      //   ```
      return parsePerfOption({
        ...this.options,
        ...defaultPerfOptions,
      } as PerfOptionDictionary<TOptions & DefaultPerfOptions>);
    } else {
      // in this case, the parsing will have already been handled by the manager
      // we just assume and cross our fingers that the options are of the correct type
      return multicoreUtils.workerData.options as ParsedPerfOptions<TOptions & DefaultPerfOptions>;
    }
  }

  public constructor() {
    this.parallelIndex = PerfTestBase.globalParallelIndex;
    PerfTestBase.globalParallelIndex++;
  }

  // Before and after running a bunch of the same test.
  public globalSetup?(): void | Promise<void>;
  public globalCleanup?(): void | Promise<void>;

  public postSetup?(): void | Promise<void>;
  public preCleanup?(): void | Promise<void>;

  public setup?(): void | Promise<void>;
  public cleanup?(): void | Promise<void>;

  public abstract runAll(
    durationMilliseconds: number,
    abortController: AbortController
  ): Promise<void>;

  public getSnapshot(): Snapshot {
    return {
      lastMillisecondsElapsed: this.lastMillisecondsElapsed,
      completedOperations: this.completedOperations,
    };
  }
}
