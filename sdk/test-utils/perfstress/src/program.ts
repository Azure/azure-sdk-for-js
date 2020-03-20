import { AbortSignalLike, AbortController } from "@azure/abort-controller";
import { PerfStressTest } from "./perfStressTest";
import {
  ParsedPerfStressOptions,
  parsePerfStressOption,
  printOptions,
  defaultPerfStressOptions
} from "./perfStressOptions";
import { pickTests } from "./pickTests";

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
    this.options = parsePerfStressOption(defaultPerfStressOptions, true);
    const testQuery = this.options.pick.value;
    if (testQuery) {
      this.tests = pickTests(tests, (testQuery as string).split(","));
    } else {
      this.tests = tests;
    }

    // --help, or -h
    if (this.options.help.value) {
      console.log("=== Help: Default options ===");
      printOptions(this.options, "defaultOptions");
      for (const test of this.tests) {
        test.printOptions("nonDefaultOptions");
      }
      return;
    }

    this.tests.map((test) => test.parseOptions());
  }

  private getTotalElapsedMilliseconds() {
    if (!this.firstOperation) {
      return 0;
    }
    return this.lastOperation!.finishedAt!.getTime() - this.firstOperation!.startedAt!.getTime();
  }

  private cleanStatistics() {
    this.completedOperations = [];
    this.firstOperation = undefined;
    this.lastOperation = undefined;
  }

  private getStatistics(): PerfStressStatistics {
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
    this.cleanStatistics();

    const abortController = new AbortController();
    const durationMilliseconds = durationSeconds * 1000;

    setTimeout(() => abortController.abort(), durationMilliseconds);

    const checkDurationTimeout = () => {
      if (this.getTotalElapsedMilliseconds() >= durationMilliseconds) {
        abortController.abort();
      }
    };

    console.log(`=== ${title} ===`);
    console.log(`Current completed operation\t\tTotal time elapsed in milliseconds`);

    let lastTotalCompleted = 0;
    let lastElapsed = 0;

    const logStats = () => {
      const totalElapsed = this.getTotalElapsedMilliseconds();
      if (totalElapsed - lastElapsed >= this.options["milliseconds-to-log"].value!) {
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
        checkDurationTimeout();
      }
    }

    const {
      completedOperations,
      totalElapsedSeconds,
      averageElapsedSeconds,
      operationsPerSecond,
      secondsPerOperation
    } = this.getStatistics();

    console.log(
      `Completed ${completedOperations} operations in ${totalElapsedSeconds}s` +
        ` in an average of ${averageElapsedSeconds}s` +
        ` (${operationsPerSecond} ops/s, ${secondsPerOperation} s/op)`
    );
  }

  public async run() {
    // No tests should be executed if the help option is passed.
    if (this.options.help.value) {
      return;
    }

    const options = this.options;
    console.log("=== Assigned options ===");
    printOptions(options, "assignedOptions");
    for (const test of this.tests) {
      console.log(`=== Assigned options for ${test.constructor.name} ===`);
      test.printOptions("assignedOptions");
    }

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
  }
}
