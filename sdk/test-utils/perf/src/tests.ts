// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { default as minimist, ParsedArgs as MinimistParsedArgs } from "minimist";
import {
  PerfOptionDictionary,
  parsePerfOption,
  DefaultPerfOptions,
  defaultPerfOptions
} from "./options";
import {
  TestProxyHttpClient,
  TestProxyHttpClientV1,
  testProxyHttpPolicy
} from "./testProxyHttpClient";
import { HttpClient } from "@azure/core-http";
import { Pipeline } from "@azure/core-rest-pipeline";

/**
 * Defines the behavior of the PerfTest constructor, to use the class as a value.
 */
export interface PerfTestConstructor<TOptions extends {} = {}> {
  new (): PerfTest<TOptions>;
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
export abstract class PerfTest<TOptions = {}> {
  private readonly testProxy!: string;
  public testProxyHttpClient!: TestProxyHttpClient;
  public testProxyHttpClientV1!: TestProxyHttpClientV1;
  public abstract options: PerfOptionDictionary<TOptions>;

  private static globalParallelIndex: number = 0;
  protected readonly parallelIndex: number;

  public constructor() {
    this.parallelIndex = PerfTest.globalParallelIndex;
    PerfTest.globalParallelIndex++;

    const testProxies = this.parsedOptions["test-proxies"].value;
    if (testProxies) {
      const testProxiesArray = testProxies.split(";");
      this.testProxy = testProxiesArray[this.parallelIndex % testProxiesArray.length];
    }
  }

  public get parsedOptions(): PerfOptionDictionary<TOptions & DefaultPerfOptions> {
    // This cast is needed because TS thinks
    //   PerfOptionDictionary<TOptions & DefaultPerfOptions>
    //   is different from
    //   PerfOptionDictionary<TOptions> & PerfOptionDictionary<DefaultPerfOptions>
    return parsePerfOption({
      ...this.options,
      ...defaultPerfOptions
    }) as PerfOptionDictionary<TOptions & DefaultPerfOptions>;
  }

  // Before and after running a bunch of the same test.
  public globalSetup?(): void | Promise<void>;
  public globalCleanup?(): void | Promise<void>;

  public setup?(): void | Promise<void>;
  public cleanup?(): void | Promise<void>;

  public async run?(abortSignal?: AbortSignalLike): Promise<void>;

  /**
   * configureClientOptionsCoreV1
   *
   * For core-v1 - libraries depending on core-http
   * Apply this method on the client options to get the proxy tool support
   *
   * Note: httpClient must be part of the options bag, it is required for the perf framework to update the underlying client properly
   */
  public configureClientOptionsCoreV1<T>(options: T & { httpClient?: HttpClient }): T {
    if (this.testProxy) {
      this.testProxyHttpClientV1 = new TestProxyHttpClientV1(
        this.testProxy,
        this.parsedOptions["insecure"].value!
      );
      options.httpClient = this.testProxyHttpClientV1;
    }
    return options;
  }

  /**
   * configureClient
   *
   * For core-v2 - libraries depending on core-rest-pipeline
   * Apply this method on the client to get the proxy tool support.
   *
   * Note: Client must expose the pipeline property which is required for the perf framework to add its policies correctly
   */
  public configureClient<T>(client: T & { pipeline: Pipeline }): T {
    if (this.testProxy) {
      this.testProxyHttpClient = new TestProxyHttpClient(
        this.testProxy,
        this.parsedOptions["insecure"].value!
      );
      client.pipeline.addPolicy(
        testProxyHttpPolicy(
          this.testProxyHttpClient,
          this.testProxy.startsWith("https"),
          this.parsedOptions["insecure"].value!
        )
      );
    }
    return client;
  }
}

/**
 * Picks a specific test case by comparing the first command line paramter to the names of the
 * given classes, all of which must extend PerfTest.
 * @param tests An array of classes that extend PerfTest
 */
export function selectPerfTest(
  tests: PerfTestConstructor[]
): PerfTestConstructor {
  const testsNames: string[] = tests.map((test) => test.name);
  const minimistResult: MinimistParsedArgs = minimist(process.argv);
  const testName = minimistResult._[minimistResult._.length - 1];

  const testIndex = testsNames.indexOf(testName);
  if (testIndex === -1) {
    throw new Error(
      `Couldn't find a test named ${testName}. Try with any of the following: ${testsNames.join(
        ", "
      )}`
    );
  }

  return tests[testIndex];
}
