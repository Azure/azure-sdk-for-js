import { AbortController } from "@azure/abort-controller";
import { PerfStressTest } from "./perfStressTest";
import {
  ParsedPerfStressOptions,
  parsePerfStressOption,
  printOptions,
  defaultPerfStressOptions
} from "./perfStressOptions";

export type TestType = "";

export interface PerfStressParallel {
  completedOperations?: number;
  lastMillisecondsElapsed?: number;
}

export class PerfStressProgram {
  private test: PerfStressTest<ParsedPerfStressOptions>;
  public options: ParsedPerfStressOptions = {} as ParsedPerfStressOptions;

  constructor(test: PerfStressTest<ParsedPerfStressOptions>) {
    this.options = parsePerfStressOption(defaultPerfStressOptions, true);
    this.test = test;

    // --help, or -h
    if (this.options.help.value) {
      console.log("=== Help: Default options ===");
      printOptions(this.options, "defaultOptions");
      test.printOptions("nonDefaultOptions");
      return;
    }

    this.test.parseOptions();
  }

  private logResults(parallels: PerfStressParallel[]) {
    const totalOperations = parallels.reduce((sum, i) => sum + i.completedOperations!, 0);
    const operationsPerSecond = parallels.reduce((sum, parallel) => {
      return sum + parallel.completedOperations! / (parallel.lastMillisecondsElapsed! / 1000);
    }, 0);
    const secondsPerOperation = 1 / operationsPerSecond;
    const weightedAverage = totalOperations / operationsPerSecond;
    console.log(
      `Completed ${totalOperations} operations in a weighted-average of ${weightedAverage}s` +
        ` (${operationsPerSecond} ops/s ${secondsPerOperation} s/op)`
    );
  }

  private async runLoop(
    parallel: PerfStressParallel,
    durationMilliseconds: number,
    abortController: AbortController
  ) {
    const startedAt = new Date().getTime();
    while (!abortController.signal.aborted) {
      // The event loop is too busy to listen to the setTimeout...
      if (new Date().getTime() - startedAt >= durationMilliseconds) {
        abortController.abort();
      }
      try {
        await this.test.run(abortController.signal);
      } finally {
      }
      parallel.completedOperations! += 1;
      parallel.lastMillisecondsElapsed = new Date().getTime() - startedAt!;
    }
  }

  private async runTest(
    iterationIndex: number,
    durationSeconds: number,
    title: string
  ): Promise<void> {
    const parallelNumber = Number(this.options.parallel.value);
    const parallels: PerfStressParallel[] = new Array<PerfStressParallel>(parallelNumber);
    const parallelTestPromises: Promise<void>[] = new Array<Promise<void>>(parallelNumber);

    const abortController = new AbortController();
    const durationMilliseconds = durationSeconds * 1000;
    setTimeout(() => abortController.abort(), durationMilliseconds);

    console.log(`=== ${title}, iteration ${iterationIndex} ===`);
    console.log(`Since Last Log\t\tTotal`);

    const parallel = Number(this.options.parallel.value!);
    const millisecondsToLog = Number(this.options["milliseconds-to-log"].value!);

    let lastInIteration = 0;
    const logInterval = setInterval(() => {
      const inTotal = parallels.reduce((sum, i) => sum + i.completedOperations!, 0);
      const sinceLastLog = inTotal - lastInIteration;
      console.log(sinceLastLog + "\t\t\t" + inTotal);
      lastInIteration = inTotal;
    }, millisecondsToLog);

    for (let i = 0; i < parallel; i++) {
      let parallel: PerfStressParallel = {
        completedOperations: 0
      };
      parallels[i] = parallel;
      parallelTestPromises[i] = this.runLoop(parallel, durationMilliseconds, abortController);
    }
    for (const promise of parallelTestPromises) {
      await promise;
    }

    clearInterval(logInterval);

    console.log(`=== ${title}, iteration ${iterationIndex} Results ===`);
    this.logResults(parallels);
  }

  public async run() {
    // There should be no test execution if the help option is passed.
    if (this.options.help.value) {
      return;
    }

    const options = this.options;
    console.log("=== Assigned options ===");
    printOptions(options, "assignedOptions");

    console.log(`=== Assigned options for ${this.test.constructor.name} ===`);
    this.test.printOptions("assignedOptions");

    try {
      console.log(`=== Global setup for ${this.test.constructor.name} ===`);
      if (this.test.globalSetup) {
        await this.test.globalSetup();
      }
      try {
        if (Number(options.warmup.value) > 0) {
          const statistics = await this.runTest(0, Number(options.warmup.value), "warmup");
          console.table([statistics]);
        }

        const iterations = Number(this.options.iterations.value!);
        for (let i = 0; i < iterations; i++) {
          await this.runTest(i, Number(options.duration.value), "test");
        }
      } finally {
        if (!options["no-cleanups"]) {
          if (this.test.cleanup) {
            await this.test.cleanup();
          }
        }
      }
    } finally {
      if (!options["no-cleanups"]) {
        if (this.test.globalCleanup) {
          await this.test.globalCleanup();
        }
      }
    }
  }
}
