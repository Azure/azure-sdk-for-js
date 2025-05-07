// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env, isLiveMode } from "@azure-tools/test-recorder";
import {
  describe as vitestDescribe,
  it as vitestIt,
  SuiteFactory,
  TestFunction,
  TestOptions,
} from "vitest";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace globalThis {
  let describe: typeof vitestDescribe;
  let it: typeof vitestIt;
  let xit: typeof vitestIt.skip;
  let xdescribe: typeof vitestDescribe.skip;
}

globalThis.describe = vitestDescribe;
globalThis.it = vitestIt;
globalThis.xit = vitestIt.skip;
globalThis.xdescribe = vitestDescribe.skip;

export interface TestFunctionWrapper {
  it: typeof vitestIt;
  xit: typeof vitestIt.skip;
  describe: typeof vitestDescribe;
  xdescribe: typeof vitestDescribe.skip;
}

/**
 * Specifies service versions that a test/test suite supports. This can be a list of
 * version strings, or a range of versions denoted by minVer/maxVer.
 */
export type SupportedVersions =
  | string[]
  | {
      minVer?: string;
      maxVer?: string;
    };

function skipReason(currentVersion: string, supported: SupportedVersions): string {
  if (supported instanceof Array) {
    return `skipping for version ${currentVersion} as it is not in the list [${supported.join()}]`;
  } else {
    return `skipping for version ${currentVersion} as it is not in the range: [min ${
      supported.minVer ?? "<unspecified>"
    }, max ${supported.maxVer ?? "<unspecified>"}]`;
  }
}

/**
 *
 * @param currentVersion current service version to run test with
 * @param supported service versions supported by a test suite or test case
 * @param allVersions all service versions supported by the SDK library being tested.
 *                    NOTE: The versions must be in order from oldest to latest.
 */
export function isVersionInSupportedRange(
  currentVersion: string,
  supported: SupportedVersions,
  allVersions: ReadonlyArray<string>,
): { isSupported: boolean; skipReason?: string } {
  const lessThanOrEqual = function (a: string, b: string) {
    const idxA = allVersions.indexOf(a);
    const idxB = allVersions.indexOf(b);
    if (idxA === -1) {
      throw new Error(`version '${a}' is not in versions supported by the SDK`);
    }
    if (idxB === -1) {
      throw new Error(`version '${b}' is not in versions supported by the SDK`);
    }
    return idxA <= idxB;
  };
  let run: boolean;
  if (supported instanceof Array) {
    // console.log(`Test ${currentVersion} for supported versions [${supported.join()}]?`);

    run = supported.includes(currentVersion);

    if (run) {
      // console.log(`  Running test on ${currentVersion}`);
      return { isSupported: true };
    } else {
      // console.log(`  Skipping test on ${currentVersion}`);
      return {
        isSupported: false,
        skipReason: skipReason(currentVersion, supported),
      };
    }
  } else {
    // console.log(
    //   `Test ${currentVersion} for supported version range: [min ${supported.minVer} max ${supported.maxVer}]?`
    // );
    if (supported.minVer && supported.maxVer) {
      if (
        lessThanOrEqual(supported.minVer, currentVersion) &&
        lessThanOrEqual(currentVersion, supported.maxVer)
      ) {
        // console.log(`  Test ${currentVersion} because it is within range`);
        return { isSupported: true };
      } else {
        // console.log(`  Skipping ${currentVersion} because it is out of range`);
        return {
          isSupported: false,
          skipReason: skipReason(currentVersion, supported),
        };
      }
    } else if (supported.minVer) {
      if (lessThanOrEqual(supported.minVer, currentVersion)) {
        // console.log(`  Test ${currentVersion} because it's above minVer`);
        return { isSupported: true };
      } else {
        // console.log(`  Skip ${currentVersion} because it's below minVer`);
        return {
          isSupported: false,
          skipReason: skipReason(currentVersion, supported),
        };
      }
    } else if (supported.maxVer) {
      if (lessThanOrEqual(currentVersion, supported.maxVer)) {
        // console.log(`  Test ${currentVersion} because it's below maxVer`);
        return { isSupported: true };
      } else {
        // console.log(`  Skip ${currentVersion} because it's above maxVer`);
        return {
          isSupported: false,
          skipReason: skipReason(currentVersion, supported),
        };
      }
    } else {
      throw new Error(
        "Must use either minVer, or maxVer, or both to specify supported version range.",
      );
    }
  }
}

/**
 * Returns a Vitest wrapper that runs or skips a test/test suite for currentVersion, given a list
 * of versions or a range of versions supported by the test/test suite.
 * @param currentVersion version to check wether to run or skip
 * @param supported supported versions for a test/test suite
 * @param allVersions all service versions supported by the SDK library being tested.
 *                    NOTE: The versions must be in order from oldest to latest.
 */
export function supports(
  currentVersion: string,
  supported: SupportedVersions,
  allVersions: ReadonlyArray<string>,
): TestFunctionWrapper {
  const run = isVersionInSupportedRange(currentVersion, supported, allVersions);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const either = function (match: any, skip: any) {
    return run.isSupported
      ? match
      : isLiveMode()
        ? // only append skip reason to titles in live TEST_MODE.
          // Record and playback depends on titles for recording file names so keeping them
          // in order to be compatible with existing recordings.
          function (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
            title: string | Function,
            fn?: TestFunction | undefined,
            options?: number | TestOptions,
          ) {
            return skip(`${title} (${run.skipReason})`, fn, options);
          }
        : skip;
  };

  const it = either(supports.global.it, supports.global.xit);
  Object.defineProperty(it, "onlyWithReason", {
    value: either(supports.global.it.only, supports.global.xit),
    configurable: true,
  });
  Object.defineProperty(it, "skipWithReason", {
    value: supports.global.it.skip,
    configurable: true,
  });

  // add current service version to suite titles in Live TEST_MODE
  // Record and playback depends on titles for recording file names so keeping them
  // in order to be compatible with existing recordings.
  const wrappedDescribe = isLiveMode()
    ? function (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        title: string | Function,
        fn?: SuiteFactory | undefined,
        options?: number | TestOptions,
      ) {
        return supports.global.describe(
          `${title} (service version ${currentVersion})`,
          fn,
          options,
        );
      }
    : supports.global.describe;
  const wrappedDescribeOnly = isLiveMode()
    ? function (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        title: string | Function,
        fn?: SuiteFactory | undefined,
        options?: number | TestOptions,
      ) {
        return supports.global.describe.only(
          `${title} (service version ${currentVersion})`,
          fn,
          options,
        );
      }
    : supports.global.describe.only;

  const describe = either(wrappedDescribe, supports.global.xdescribe);
  Object.defineProperty(describe, "onlyWithReason", {
    value: either(wrappedDescribeOnly, supports.global.xdescribe),
    configurable: true,
  });
  Object.defineProperty(describe, "skipWithReason", {
    value: supports.global.describe.skip,
    configurable: true,
  });

  const chain: TestFunctionWrapper = {
    it,
    xit: supports.global.xit,
    describe,
    xdescribe: supports.global.xdescribe,
  };

  return chain;
}

supports.global = globalThis;

/**
 * Options to multi-service-version tests
 */
export interface MultiVersionTestOptions {
  /**
   * version to used for record/playback
   */
  versionForRecording?: string;
}

function isMultiVersionDisabled(): boolean {
  return Boolean(env.DISABLE_MULTI_VERSION_TESTING);
}

/**
 * Determines the set of service versions used to run tests based on TEST_MODE
 * - For live tests loop through all the versions and run tests for each version.
 * - For record and playback, use the defaultVersion in options if specified, otherwise use the latest version.
 * @param versions list of service versions to run the tests
 * @param options Optional settings such as version to use for record/playback, and
 *                custom string comparison function to determines order of version strings.
 * @param handler the function to run with each service version
 */
export function versionsToTest(
  versions: ReadonlyArray<string>,
  options: MultiVersionTestOptions = {},
  handler: (
    serviceVersion: string,
    onVersions: (supported: SupportedVersions) => TestFunctionWrapper,
  ) => void,
): void {
  if (versions.length <= 0) {
    throw new Error("invalid list of service versions to run the tests.");
  }
  let toTest: ReadonlyArray<string>;
  // all versions are used in live TEST_MODE
  if (isLiveMode() && !isMultiVersionDisabled()) {
    toTest = versions;
  } else {
    toTest = options.versionForRecording
      ? [options.versionForRecording]
      : versions.slice(versions.length - 1);
  }

  toTest.forEach((serviceVersion) => {
    const onVersions = function (supported: SupportedVersions) {
      return supports(serviceVersion, supported, versions);
    };
    handler(serviceVersion, onVersions);
  });
}
