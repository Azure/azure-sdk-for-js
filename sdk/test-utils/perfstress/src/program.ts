import { AbortSignalLike, AbortController } from "@azure/abort-controller";
import { PerfStressTest } from "./perfStressTest";
import {
  ParsedPerfStressOptions,
  parsePerfStressOption,
  printOptions,
  defaultPerfStressOptions
} from "./perfStressOptions";

export type TestType = "";

export interface PerfStressTestOperation {
  startedAt?: Date;
  finishedAt?: Date;
  elapsedMilliseconds?: number;
}

export interface PerfStressStatistics {
  completedOperations: number;
  totalElapsedSeconds: number;
  averageElapsedSeconds: number;
  operationsPerSecond: number;
  secondsPerOperation: number;
}

export class PerfStressProgram {
  private completedOperations: PerfStressTestOperation[] = [];
  private firstOperation?: PerfStressTestOperation;
  private lastOperation?: PerfStressTestOperation;
  private tests: PerfStressTest<ParsedPerfStressOptions>[];
  public options: ParsedPerfStressOptions = {} as ParsedPerfStressOptions;

  constructor(tests: PerfStressTest<ParsedPerfStressOptions>[]) {
    this.tests = tests;
    this.tests.map((test) => test.parseOptions());
    this.options = parsePerfStressOption(defaultPerfStressOptions, true);
  }

  private getTotalElapsedMilliseconds() {
    if (!this.firstOperation) {
      return 0;
    }
    return this.lastOperation!.finishedAt!.getTime() - this.firstOperation!.startedAt!.getTime();
  }

  private async getStatistics(): Promise<PerfStressStatistics> {
    const operations = this.completedOperations;
    const completedOperations = this.completedOperations.length;
    const totalElapsedSeconds: number = this.getTotalElapsedMilliseconds() / 1000;
    const averageElapsedSeconds = totalElapsedSeconds / operations.length;
    const operationsPerSecond = completedOperations / averageElapsedSeconds;
    const secondsPerOperation = 1 / operationsPerSecond;

    return {
      completedOperations,
      totalElapsedSeconds,
      averageElapsedSeconds,
      operationsPerSecond,
      secondsPerOperation
    };
  }

  private async runOperation(
    test: PerfStressTest<ParsedPerfStressOptions>,
    abortSignal: AbortSignalLike
  ): Promise<PerfStressTestOperation> {
    const operation: PerfStressTestOperation = {};
    this.completedOperations.push(operation);
    operation.startedAt = new Date();
    await test.run(abortSignal);
    operation.finishedAt = new Date();
    operation.elapsedMilliseconds = operation.finishedAt.getTime() - operation.startedAt.getTime();
    if (!this.firstOperation) {
      this.firstOperation = operation;
    }
    this.lastOperation = operation;
    return operation;
  }

  private async runTests(durationSeconds: number, title: string) {
    const abortController = new AbortController();

    setTimeout(() => {
      abortController.abort();
    }, durationSeconds * 1000);

    console.log(`=== ${title} ===`);
    console.log(`Current completed operation\t\tTotal time elapsed in milliseconds`);

    let lastTotalCompleted = 0;
    let lastElapsed = 0;

    const logStats = () => {
      const totalElapsed = this.getTotalElapsedMilliseconds();
      if (totalElapsed - lastElapsed > this.options["milliseconds-to-log"].value!) {
        let totalCompleted = this.completedOperations.length - lastTotalCompleted;
        console.log(`${totalCompleted}\t\t\t\t\t${this.getTotalElapsedMilliseconds()}`);
        lastTotalCompleted = totalCompleted;
        lastElapsed = totalElapsed;
      }
    };

    const iterations = this.options.iterations.value!;
    for (let i = 0; i < iterations; i++) {
      if (abortController.signal.aborted) {
        break;
      }
      for (const test of this.tests) {
        await this.runOperation(test, abortController.signal);
        logStats();
      }
    }
    logStats();
  }

  public async run() {
    console.log("=== Setup ===");

    console.log("=== Default options ===");
    const options = this.options;
    printOptions(options, "nonDefaultOptions");

    try {
      for (const test of this.tests) {
        console.log(`=== Global setup for ${test.constructor.name} ===`);
        if (test.globalSetup) {
          await test.globalSetup();
        }
      }
      try {
        if (Number(options.warmup.value) > 0) {
          await this.runTests(Number(options.warmup.value), "warmup");
        }
        await this.runTests(Number(options.duration.value), "tests");
      } finally {
        if (!options["no-cleanups"]) {
          for (const test of this.tests) {
            if (test.cleanup) {
              await test.cleanup();
            }
          }
        }
      }
    } finally {
      if (!options["no-cleanups"]) {
        for (const test of this.tests) {
          if (test.globalCleanup) {
            await test.globalCleanup();
          }
        }
      }
    }

    const {
      completedOperations,
      totalElapsedSeconds,
      averageElapsedSeconds,
      operationsPerSecond,
      secondsPerOperation
    } = await this.getStatistics();

    console.log(
      `Completed ${completedOperations} operations in ${totalElapsedSeconds}s` +
        ` in an average of ${averageElapsedSeconds}s` +
        ` (${operationsPerSecond} ops/s, ${secondsPerOperation} s/op)`
    );
  }
}
