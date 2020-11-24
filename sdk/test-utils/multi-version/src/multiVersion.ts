// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isLiveMode } from "@azure/test-utils-recorder";
import { getGlobalObject } from "./global";

export interface TestFunctionWrapper {
  it:
    | Mocha.TestFunction
    | (Mocha.PendingTestFunction & {
        only: Mocha.ExclusiveTestFunction;
      });
  xit: Mocha.PendingTestFunction;
  describe:
    | Mocha.SuiteFunction
    | (Mocha.PendingSuiteFunction & {
        only: Mocha.ExclusiveSuiteFunction;
      });
  xdescribe: Mocha.PendingSuiteFunction;
  global: NodeJS.Global;
}

function lessThanOrEqual(
  a: string,
  b: string,
  compareFunc?: (a: string, b: string) => number
): boolean {
  if (compareFunc) {
    return compareFunc(a, b) <= 0;
  }
  return a <= b;
}

function skipReason(
  currentVersion: string,
  supported: string[] | { minVer?: string; maxVer?: string }
): string {
  if (supported instanceof Array) {
    return `Skipping for version ${currentVersion} as it's not in the list [${supported.join()}]`;
  } else {
    return `Skipping for version ${currentVersion} as it's not in the range: [min ${supported.minVer ??
      "<unspecified>"}, max ${supported.maxVer ?? "<unspecified>"}]`;
  }
}

export function isVersionInSupportedRange(
  currentVersion: string,
  supported: string[] | { minVer?: string; maxVer?: string },
  compareFunc?: (a: string, b: string) => number
): { isSupported: boolean; skipReason?: string } {
  let run: boolean;
  if (supported instanceof Array) {
    console.log(`Test ${currentVersion} for supported versions ${supported.join()}?`);
    supported.sort(compareFunc);

    run = supported.includes(currentVersion);

    if (run) {
      console.log(`  Running test on ${currentVersion}`);
      return { isSupported: true };
    } else {
      console.log(`  Skipping test on ${currentVersion}`);
      return {
        isSupported: false,
        skipReason: skipReason(currentVersion, supported)
      };
    }
  } else {
    console.log(
      `Test ${currentVersion} for supported version range: min ${supported.minVer} max ${supported.maxVer}`
    );
    if (supported.minVer && supported.maxVer) {
      if (
        lessThanOrEqual(supported.minVer, currentVersion) &&
        lessThanOrEqual(currentVersion, supported.maxVer)
      ) {
        console.log(`  Test ${currentVersion} because it's within range`);
        return { isSupported: true };
      } else {
        console.log(`  Skipping ${currentVersion} because it's out of range`);
        return {
          isSupported: false,
          skipReason: skipReason(currentVersion, supported)
        };
      }
    } else if (supported.minVer) {
      if (lessThanOrEqual(supported.minVer, currentVersion)) {
        console.log(`  Test ${currentVersion} because it's above minVer`);
        return { isSupported: true };
      } else {
        console.log(`  Skip ${currentVersion} because it's below minVer`);
        return {
          isSupported: false,
          skipReason: skipReason(currentVersion, supported)
        };
      }
    } else if (supported.maxVer) {
      if (lessThanOrEqual(currentVersion, supported.maxVer)) {
        console.log(`  Test ${currentVersion} because it's below maxVer`);
        return { isSupported: true };
      } else {
        console.log(`  Skip ${currentVersion} because it's above maxVer`);
        return {
          isSupported: false,
          skipReason: skipReason(currentVersion, supported)
        };
      }
    } else {
      throw new Error(
        "Must use either minVer, or maxVer, or both to specify supported version range."
      );
    }
  }
}

/**
 * Returns a Mocha wrapper that runs or skips a test/test suite for currentVersion, given a list
 * of versions or a range of versions supported by the test/test suite.
 * @param currentVersion version to check wether to run or skip
 * @param supported supported versions for a test/test suite
 * @param compareFunc custom string comparison function to determine the order of versions
 */
export function supports(
  currentVersion: string,
  supported: string[] | { minVer?: string; maxVer?: string },
  compareFunc?: (a: string, b: string) => number
): TestFunctionWrapper {
  const run = isVersionInSupportedRange(currentVersion, supported, compareFunc);
  const either = function(match: any, skip: any) {
    return run.isSupported
      ? match
      : isLiveMode()
      ? // only append skip reason to titles in live TEST_MODE.
        // Record and playback depends on titles for recording file names so keeping them
        // in order to be compatible with existing recordings.
        function(title: string, fn: Mocha.Func | Mocha.AsyncFunc) {
          return skip(`${title} (${run.skipReason})`, fn);
        }
      : skip;
  };

  const it = either(supports.global.it, supports.global.xit);
  Object.defineProperty(it, "only", {
    value: either(supports.global.it.only, supports.global.xit)
  });

  // add current service version to suite titles in Live TEST_MODE
  // Record and playback depends on titles for recording file names so keeping them
  // in order to be compatible with existing recordings.
  const wrappedDescribe = isLiveMode()
    ? function(title: string, fn: Mocha.Func | Mocha.AsyncFunc) {
        return supports.global.describe(`${title} (service version ${currentVersion})`, fn);
      }
    : supports.global.describe;
  const wrappedDescribeOnly = isLiveMode()
    ? function(title: string, fn: Mocha.Func | Mocha.AsyncFunc) {
        return supports.global.describe.only(`${title} (service version ${currentVersion})`, fn);
      }
    : supports.global.describe.only;

  const describe = either(wrappedDescribe, supports.global.xdescribe);
  Object.defineProperty(describe, "only", {
    value: either(wrappedDescribeOnly, supports.global.xdescribe)
  });

  const chain: TestFunctionWrapper = {
    global: getGlobalObject(),
    it,
    xit: supports.global.xit,
    describe,
    xdescribe: supports.global.xdescribe
  };

  return chain;
}

supports.global = getGlobalObject();

/**
 * Options to multi-service-version tests
 */
export interface MultiVersionTestOptions {
  /**
   * version to used for record/playback
   */
  versionForRecording?: string;
  /**
   * Compare function to determine the ascending order of a list of service versions.
   */
  compareFunc?: (a: string, b: string) => number;
}

/**
 * Determines the set of service versions used to run tests based on TEST_MODE
 * - For live tests loop through all the versions and run tests for each version.
 * - For record and playback, use the defaultVersion in options if specified, otherwise use the latest version.
 * @param versions list of service versions to run the tests
 * @param options options
 */
export function versionsToTest(
  versions: string[],
  options: MultiVersionTestOptions = {}
): string[] {
  if (versions.length <= 0) {
    throw new Error("invalid list of service versions to run the tests.");
  }
  versions.sort(options.compareFunc);

  // all versions are used in live TEST_MODE
  if (isLiveMode()) {
    return versions;
  }

  return options.versionForRecording
    ? [options.versionForRecording]
    : versions.slice(versions.length - 1);
}
