// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isLiveMode, isPlaybackMode } from "@azure/test-utils-recorder";
import { getGlobalObject } from "./global";
//import { getGlobalObject } from "./global.browser";

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

function isVersionInSupportedRange(
  currentVersion: string,
  supported: string[] | { minVer?: string; maxVer?: string },
  compareFunc?: (a: string, b: string) => number
): boolean {
  let run: boolean;
  if (supported instanceof Array) {
    console.log(`Test ${currentVersion} for supported versions ${supported.join()}?`);
    supported.sort(compareFunc);

    run = supported.includes(currentVersion);

    if (run) {
      console.log(`  Running test on ${currentVersion}`);
    } else {
      console.log(`  Skipping test on ${currentVersion}`);
    }
    return run;
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
      } else {
        console.log(`  Skipping ${currentVersion} because it's out of range`);
      }

      return (
        lessThanOrEqual(supported.minVer, currentVersion) &&
        lessThanOrEqual(currentVersion, supported.maxVer)
      );
    } else if (supported.minVer) {
      if (lessThanOrEqual(supported.minVer, currentVersion)) {
        console.log(`  Test ${currentVersion} because it's above minVer`);
      } else {
        console.log(`  Skip ${currentVersion} because it's below minVer`);
      }
      return lessThanOrEqual(supported.minVer, currentVersion);
    } else if (supported.maxVer) {
      if (lessThanOrEqual(currentVersion, supported.maxVer)) {
        console.log(`  Test ${currentVersion} because it's below maxVer`);
      } else {
        console.log(`  Skip ${currentVersion} because it's above maxVer`);
      }
      return lessThanOrEqual(currentVersion, supported.maxVer);
    } else {
      throw new Error(
        "Must use either minVer, or maxVer, or both to specify supported version range."
      );
    }
  }
}

/**
 * Returns a Mocha wrapper that runs or skips tests for currentVersion, given a list
 * of support versions, or a range of supported versions
 * @param currentVersion version to check wether to run or skip
 * @param supported specifies the supported versions for a test suite or a test.
 * @param compareFunc custom string comparison function to determine the order of versions.
 */
export function supports(
  currentVersion: string,
  supported: string[] | { minVer?: string; maxVer?: string },
  compareFunc?: (a: string, b: string) => number
): TestFunctionWrapper {
  const proxy = function() {
    const run = isVersionInSupportedRange(currentVersion, supported, compareFunc);
    return function(match: any, skip: any) {
      return run ? match : skip;
    };
  };
  const either = proxy();
  const it = either(supports.global.it, supports.global.xit);
  Object.defineProperty(it, "only", {
    value: either(supports.global.it.only, supports.global.xit)
  });
  const describe = either(supports.global.describe, supports.global.xdescribe);
  Object.defineProperty(describe, "only", {
    value: either(supports.global.describe.only, supports.global.xdescribe)
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

export interface MultiVersionTestOptions {
  defaultVersion?: string;
  compareFunc?: (a: string, b: string) => number;
}

/**
 * Determines the set of service versions used to run tests based on TEST_MODE
 * - For live tests all the version is used.
 * - For playback, use the defaultVersion in options if specified, otherwise use the latest version.
 * - For recording, use the latest version.
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
  if (isLiveMode()) {
    return versions;
  }

  if (isPlaybackMode()) {
    return options.defaultVersion ? [options.defaultVersion] : versions.slice(versions.length - 1);
  }

  // recording for latest version
  return versions.slice(versions.length - 1);
}
