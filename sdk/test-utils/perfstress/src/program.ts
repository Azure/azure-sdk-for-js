import { AbortSignalLike } from "@azure/abort-controller";
import { PerfStressTest } from "./PerfStressTest";
import { ParsedPerfStressOptions, parsePerfStressOption, printOptions } from "./PerfStressOptions";
import { defaultPerfStressOptions } from "./defaults";

export type TestType = "";

export interface TestOperation {
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
  private completedOperations: TestOperation[] = [];
  private tests: PerfStressTest<ParsedPerfStressOptions>[];

  constructor(tests: PerfStressTest<ParsedPerfStressOptions>[]) {
    this.tests = tests;
  }

  private getTotalElapsedMilliseconds() {
    const operations = this.completedOperations;
    const firstOperation: TestOperation = operations[0];
    const lastOperation: TestOperation = operations[operations.length - 1];
    return (lastOperation.finishedAt!.getTime() - firstOperation.startedAt!.getTime()) / 1000;
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
  ): Promise<TestOperation> {
    const operation: TestOperation = {};
    this.completedOperations.push(operation);
    operation.startedAt = new Date();
    await test.run(abortSignal);
    operation.finishedAt = new Date();
    operation.elapsedMilliseconds = operation.finishedAt.getTime() - operation.startedAt.getTime();
    return operation;
  }

  private async runTests(durationSeconds: number, title: string) {
    const abortController = new AbortController();

    setTimeout(() => {
      abortController.abort();
    }, durationSeconds * 1000);

    console.log(`=== ${title} ===`);
    console.log(`Current\t\tTotal`);

    for (const test of this.tests) {
      const operation = await this.runOperation(test, abortController.signal);
      console.log(`${operation.elapsedMilliseconds}\t\t${this.getTotalElapsedMilliseconds()}`);
    }
  }

  public async run() {
    console.log("=== Setup ===");

    const options = parsePerfStressOption(...defaultPerfStressOptions);
    console.log("=== Default options ===");
    printOptions(options, "defaultOptions");

    try {
      for (const test of this.tests) {
        console.log(`=== Global setup for ${test.constructor.name} ===`);
        await test.globalSetup!();
      }
      try {
        if (Number(options.warmup.value) > 0) {
          await this.runTests(Number(options.warmup.value), "warmup");
        }
        await this.runTests(Number(options.warmup.value), "tests");
      } finally {
        if (!options["no-cleanups"]) {
          for (const test of this.tests) {
            await test.cleanup!();
          }
        }
      }
    } finally {
      if (!options["no-cleanups"]) {
        for (const test of this.tests) {
          await test.globalCleanup!();
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
      `Completed ${completedOperations} operations in ${totalElapsedSeconds}` +
        ` in an average of ${averageElapsedSeconds}s` +
        ` (${operationsPerSecond} ops/s, ${secondsPerOperation} s/op)`
    );
  }
}
