import { enterStage, exitStage } from "./barrier";
import { AbortController } from "@azure/abort-controller";
import { multicoreUtils, WorkerData, WorkerMulticoreUtils } from "./multicore";
import { PerfParallel } from "./parallel";
import { PerfTestBase, PerfTestConstructor } from "./perfTestBase";
import { PerfProgram } from "./program";
import { DefaultPerfOptions, PerfOptionDictionary } from "./options";

export class WorkerPerfProgram implements PerfProgram {
  private testClass: PerfTestConstructor;
  private tests: PerfTestBase[];
  private workerData: WorkerData;
  private options: PerfOptionDictionary<DefaultPerfOptions>;
  private workerUtils: WorkerMulticoreUtils;

  constructor(testClass: PerfTestConstructor) {
    if (multicoreUtils.isManager) {
      throw new Error("Must be a worker");
    }

    const { workerData } = multicoreUtils;
    this.workerUtils = multicoreUtils;
    this.workerData = workerData;
    this.options = this.workerData.options;

    this.testClass = testClass;
    this.tests = [];
    for (let i = 0; i < workerData.assignedParallels; ++i) {
      this.tests.push(new this.testClass());
    }
  }

  private async runTests(durationSeconds: number) {
    const durationMilliseconds = durationSeconds * 1000;
    const abortController = new AbortController();
    const parallels: PerfParallel[] = this.tests.map(() => ({
      completedOperations: 0,
      lastMillisecondsElapsed: 0,
    }));

    const updateInterval = setInterval(() => {
      this.workerUtils.sendMessage({
        tag: "statusUpdate",
        parallels,
      });
    }, this.options["milliseconds-to-log"].value);

    // Even though we've set a setTimeout here, the eventLoop might get too busy to load it on time.
    // For this reason, we also check if the time has passed inside of runLoop.
    setTimeout(() => abortController.abort(), durationMilliseconds);

    await Promise.all(
      this.tests.map((test, i) => test.runAll(parallels[i], durationMilliseconds, abortController))
    );

    clearInterval(updateInterval);

    this.workerUtils.sendMessage({
      tag: "reportResults",
      parallels,
    });
  }

  public async run(): Promise<void> {
    // Unhandled exceptions should stop the whole Perf process.
    process.on("unhandledRejection", (error) => {
      throw error;
    });

    await enterStage("globalSetup");
    await this.tests[0].globalSetup?.();
    await exitStage("globalSetup");

    await enterStage("setup");
    await Promise.all(this.tests.map((test) => test.setup?.()));
    await exitStage("setup");

    await enterStage("postSetup");
    await Promise.all(this.tests.map((test) => test.postSetup?.()));
    await exitStage("postSetup");

    if (this.options.warmup.value! > 0) {
      await enterStage("warmup");
      await this.runTests(this.options.warmup.value!);
      await exitStage("warmup");
    }

    for (let iteration = 0; iteration < this.options.iterations.value!; ++iteration) {
      await enterStage("test");
      await this.runTests(this.options.duration.value!);
      await exitStage("test");
    }

    await enterStage("preCleanup");
    await Promise.all(this.tests.map((test) => test.preCleanup?.()));
    await exitStage("preCleanup");

    if (!this.options["no-cleanup"]) {
      await enterStage("cleanup");
      await Promise.all(this.tests.map((test) => test.cleanup?.()));
      await exitStage("cleanup");

      await enterStage("globalCleanup");
      await this.tests[0].globalCleanup?.();
      await exitStage("globalCleanup");
    }
  }
}
