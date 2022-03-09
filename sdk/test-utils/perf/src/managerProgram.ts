import { exec } from "child_process";
import os from "os";
import { performStage } from "./barrier";
import {
  ReportResultsMessage,
  StatusUpdateMessage,
  WorkerToManagerMessageWithId,
} from "./messages";
import { ManagerMulticoreUtils, multicoreUtils } from "./multicore";
import { DefaultPerfOptions, ParsedPerfOptions } from "./options";
import { PerfParallel } from "./parallel";
import { PerfTestBase, PerfTestConstructor } from "./perfTestBase";
import { PerfProgram } from "./program";
import { formatDuration } from "./utils";

/**
 * PerfProgram
 * receives a class extending PerfTest with specific command line parameter names (or just "string"),
 * then gets the test ready for a performance/stress test run.
 *
 * Use it like:
 *
 * ```ts
 * export class Delay500ms extends PerfTest {
 *   public options = {};
 *   async run(): Promise<void> {
 *     await delay(500);
 *   }
 * }
 *
 * const perfProgram = new PerfProgram(Delay500ms);
 *
 * perfProgram.run();
 * ```
 */
export class ManagerPerfProgram implements PerfProgram {
  private testName: string;
  private parallelNumber: number;
  private lastCompleted: number = 0;
  private startMillis: number = 0;
  private managerUtils: ManagerMulticoreUtils;
  private parsedOptions: ParsedPerfOptions<DefaultPerfOptions>;

  /** Dummy instance of the test class used for global setup and cleanup. */
  private testInstanceForGlobalSetup: PerfTestBase;

  /**
   * Receives a test class to instantiate and execute.
   * Parses the test's options and creates some shortcuts.
   * It will instantiate the same test class as many times as the "parallel" command line parameter specifies,
   * which defaults to 1.
   *
   * @param testClass The testClass to be instantiated.
   */
  constructor(testClass: PerfTestConstructor) {
    if (!multicoreUtils.isManager) {
      throw new Error("Must be manager");
    }

    this.managerUtils = multicoreUtils;

    this.testName = testClass.name;
    this.testInstanceForGlobalSetup = new testClass();
    this.parsedOptions = this.testInstanceForGlobalSetup.parsedOptions;
    this.parallelNumber = Number(this.parsedOptions.parallel.value);
  }

  private getCompletedOperations(parallels: PerfParallel[]): number {
    return parallels.reduce((sum, i) => sum + i.completedOperations, 0);
  }

  private getOperationsPerSecond(parallels: PerfParallel[]): number {
    return parallels.reduce((sum, parallel) => {
      let parallelResult = 0;
      if (parallel.completedOperations > 0) {
        parallelResult = parallel.completedOperations / (parallel.lastMillisecondsElapsed / 1000);
      }
      return sum + parallelResult;
    }, 0);
  }

  /**
   * Does some calculations based on the parallel executions provided,
   * then logs them in a friendly way.
   *
   * In languages supporting threads, "parallels" mean new threads created in which we run
   * as many functions as possible. Keep in mind that we currently don't support multiple threads in NodeJS.
   * We might be using workers eventually, but for now, "parallel" executions are
   * promises that are executed one after the other without waiting for the previous one to finish.
   * We wait for all of the promises to resolve to consider the "parallel" execution finished.
   *
   * The information logged consists of:
   *
   * - The total operations executed on that parallel run.
   * - The operations per second, which is made through adding up each one of the parallel's
   *   completed operations, divided by the seconds elapsed.
   * - Seconds per operation, which is 1 / operationsPerSecond.
   * - An average of the total operations by the operations per second, which we call weighted-average.
   *
   * @param parallels Parallel executions
   */
  private logResults(parallels: PerfParallel[]): void {
    const totalOperations = this.getCompletedOperations(parallels);
    const operationsPerSecond = this.getOperationsPerSecond(parallels);
    const secondsPerOperation = 1 / operationsPerSecond;
    const weightedAverage = totalOperations / operationsPerSecond;
    console.log(
      `Completed ${totalOperations.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })} ` +
        `operations in a weighted-average of ` +
        `${weightedAverage.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}s ` +
        `(${operationsPerSecond.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })} ops/s, ` +
        `${secondsPerOperation.toLocaleString(undefined, {
          maximumFractionDigits: 3,
          minimumFractionDigits: 3,
        })} s/op)`
    );
  }

  private logUpdate(parallels: PerfParallel[]): void {
    const totalCompleted = this.getCompletedOperations(parallels);
    const currentCompleted = totalCompleted - this.lastCompleted;
    const averageCompleted = this.getOperationsPerSecond(parallels);
    const elapsedTime = formatDuration(new Date().getTime() - this.startMillis);

    this.lastCompleted = totalCompleted;

    console.log(
      `${elapsedTime}\t\t${currentCompleted}\t\t${totalCompleted}\t\t${averageCompleted.toFixed(2)}`
    );
  }

  private createWorkers(globals: unknown): void {
    const cpuOption = this.parsedOptions.cpus.value ?? 1;
    const cpus = cpuOption === 0 ? os.cpus.length : cpuOption;

    const parallels = this.parsedOptions.parallel.value ?? 1;

    const baseParallelsPerCpu = Math.floor(parallels / cpus);
    const remainder = parallels % cpus;

    const allocations = Array(cpuOption).fill(baseParallelsPerCpu);

    // add the remainder evenly
    for (let i = 0; i < remainder; ++i) {
      ++allocations[i];
    }

    for (let alloc of allocations) {
      this.managerUtils.createWorker({
        testClassName: this.testName,
        assignedParallels: alloc,
        options: this.parsedOptions,
        globals,
      });
    }
  }

  private async runTests(iterationIndex: number, title: "warmup" | "test"): Promise<void> {
    const stage = performStage(title);

    this.lastCompleted = 0;
    this.startMillis = new Date().getTime();

    // This is how we customize how frequently we log how many completed operations have been executed.
    // We don't enforce this inside of runLoop, so it might never be executed, depending on the number
    // of operations running.
    const millisecondsToLog = Number(this.parsedOptions["milliseconds-to-log"].value);
    console.log(
      `\n=== ${title} mode, iteration ${iterationIndex + 1}. Logs every ${
        millisecondsToLog / 1000
      }s ===`
    );
    console.log(`ElapsedTime\tCurrent\t\tTotal\t\tAverage`);

    let done = false;

    const handleUpdate = (messages: WorkerToManagerMessageWithId[]) => {
      if (done) return;

      const parallels = messages.map((m) => (m as StatusUpdateMessage).parallels).flat();
      this.logUpdate(parallels);
      this.managerUtils.getMessageFromAll((m) => m.tag === "statusUpdate").then(handleUpdate);
    };
    this.managerUtils.getMessageFromAll((m) => m.tag === "statusUpdate").then(handleUpdate);

    const resultMessages = (await this.managerUtils.getMessageFromAll(
      (m) => m.tag === "reportResults"
    )) as ReportResultsMessage[];

    // stop the handleUpdate part when it next gets a chance
    // TODO use AbortController
    done = true;

    const results = resultMessages.map((m) => m.parallels).flat();

    console.log(`=== ${title} mode, results of iteration ${iterationIndex + 1} ===`);
    this.logResults(results);

    await stage;
  }

  private async logPackageVersions(listTransitiveDeps: boolean): Promise<void> {
    return new Promise((resolve) => {
      console.log("=== Versions ===");
      exec(`npm list --prod ${listTransitiveDeps ? "" : "--depth=0"}`, (_error, stdout) => {
        for (const dependency of stdout.split("\n").filter((line) => line.includes("@azure"))) {
          console.log(dependency);
        }
        resolve();
      });
    });
  }

  /**
   * The run() public method lets developers specify when to begin running the selected test
   * under the conditions provided by the command line options.
   * If the command line option for help (--help or -h) is passed in, the program will output
   * the information available of all of the options and close, with no test executions.
   *
   * This method will invoke the test class's "globalSetup" and "globalCleanup" exactly once,
   * and the "setup" and "cleanup" as many times as tests were instantiated
   * (up to the "parallel" command line parameter, which defaults to 1).
   *
   * If the "warmup" command line parameter is defined, the tests will be called
   * until as many seconds as the "warmup" parameter says. This is to adjust
   * to any possible real-time optimizations that the JavaScript runtime might
   * do while executing something repeatedly. This is also a requirement to align with the
   * Perf framework in other languages.
   *
   * If any exception is encountered, the whole process will stop, unless
   * these exceptions are instances of the class PerfTestError, which defines expected errors.
   */
  public async run(): Promise<void> {
    // There should be no test execution if the help option is passed.
    // --help, or -h
    if (this.parsedOptions.help.value) {
      console.log(`=== Help: Options that can be sent to ${this.testName} ===`);
      console.table(this.testInstanceForGlobalSetup.parsedOptions);
      return;
    }

    await this.logPackageVersions(
      this.parsedOptions["list-transitive-dependencies"].value ?? false
    );

    const options = this.testInstanceForGlobalSetup.parsedOptions;
    console.log("=== Parsed options ===");
    console.table(options);

    if (this.testInstanceForGlobalSetup.globalSetup) {
      console.log(
        `=== Calling globalSetup() once for (all) the instance(s) of ${this.testName} ===`
      );
      await this.testInstanceForGlobalSetup.globalSetup();
    }

    this.createWorkers(this.testInstanceForGlobalSetup.globals);

    console.log(
      `=== Calling setup() for the ${this.parallelNumber} instantiated ${this.testName} tests ===`
    );

    await performStage("setup");

    await performStage("postSetup");

    if (Number(options.warmup.value) > 0) {
      await this.runTests(0, "warmup");
    }

    const iterations = Number(options.iterations.value);
    for (let i = 0; i < iterations; i++) {
      await this.runTests(i, "test");
    }

    await performStage("preCleanup");

    if (!options["no-cleanup"].value) {
      console.log(
        `=== Calling cleanup() for the ${this.parallelNumber} instantiated ${this.testName} tests ===`
      );
      await performStage("cleanup");
    }

    if (!options["no-cleanup"].value) {
      if (this.testInstanceForGlobalSetup.globalCleanup) {
        console.log(
          `=== Calling globalCleanup() once for (all) the instance(s) of ${this.testName} ===`
        );
        await this.testInstanceForGlobalSetup.globalCleanup();
      }
    }
  }
}
