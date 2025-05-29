"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVersionInSupportedRange = isVersionInSupportedRange;
exports.supports = supports;
exports.versionsToTest = versionsToTest;
const test_recorder_1 = require("@azure-tools/test-recorder");
const vitest_1 = require("vitest");
globalThis.describe = vitest_1.describe;
globalThis.it = vitest_1.it;
globalThis.xit = vitest_1.it.skip;
globalThis.xdescribe = vitest_1.describe.skip;
function skipReason(currentVersion, supported) {
    var _a, _b;
    if (supported instanceof Array) {
        return `skipping for version ${currentVersion} as it is not in the list [${supported.join()}]`;
    }
    else {
        return `skipping for version ${currentVersion} as it is not in the range: [min ${(_a = supported.minVer) !== null && _a !== void 0 ? _a : "<unspecified>"}, max ${(_b = supported.maxVer) !== null && _b !== void 0 ? _b : "<unspecified>"}]`;
    }
}
/**
 *
 * @param currentVersion current service version to run test with
 * @param supported service versions supported by a test suite or test case
 * @param allVersions all service versions supported by the SDK library being tested.
 *                    NOTE: The versions must be in order from oldest to latest.
 */
function isVersionInSupportedRange(currentVersion, supported, allVersions) {
    const lessThanOrEqual = function (a, b) {
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
    let run;
    if (supported instanceof Array) {
        // console.log(`Test ${currentVersion} for supported versions [${supported.join()}]?`);
        run = supported.includes(currentVersion);
        if (run) {
            // console.log(`  Running test on ${currentVersion}`);
            return { isSupported: true };
        }
        else {
            // console.log(`  Skipping test on ${currentVersion}`);
            return {
                isSupported: false,
                skipReason: skipReason(currentVersion, supported),
            };
        }
    }
    else {
        // console.log(
        //   `Test ${currentVersion} for supported version range: [min ${supported.minVer} max ${supported.maxVer}]?`
        // );
        if (supported.minVer && supported.maxVer) {
            if (lessThanOrEqual(supported.minVer, currentVersion) &&
                lessThanOrEqual(currentVersion, supported.maxVer)) {
                // console.log(`  Test ${currentVersion} because it is within range`);
                return { isSupported: true };
            }
            else {
                // console.log(`  Skipping ${currentVersion} because it is out of range`);
                return {
                    isSupported: false,
                    skipReason: skipReason(currentVersion, supported),
                };
            }
        }
        else if (supported.minVer) {
            if (lessThanOrEqual(supported.minVer, currentVersion)) {
                // console.log(`  Test ${currentVersion} because it's above minVer`);
                return { isSupported: true };
            }
            else {
                // console.log(`  Skip ${currentVersion} because it's below minVer`);
                return {
                    isSupported: false,
                    skipReason: skipReason(currentVersion, supported),
                };
            }
        }
        else if (supported.maxVer) {
            if (lessThanOrEqual(currentVersion, supported.maxVer)) {
                // console.log(`  Test ${currentVersion} because it's below maxVer`);
                return { isSupported: true };
            }
            else {
                // console.log(`  Skip ${currentVersion} because it's above maxVer`);
                return {
                    isSupported: false,
                    skipReason: skipReason(currentVersion, supported),
                };
            }
        }
        else {
            throw new Error("Must use either minVer, or maxVer, or both to specify supported version range.");
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
function supports(currentVersion, supported, allVersions) {
    const run = isVersionInSupportedRange(currentVersion, supported, allVersions);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const either = function (match, skip) {
        return run.isSupported
            ? match
            : (0, test_recorder_1.isLiveMode)()
                ? // only append skip reason to titles in live TEST_MODE.
                    // Record and playback depends on titles for recording file names so keeping them
                    // in order to be compatible with existing recordings.
                    function (
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
                    title, fn, options) {
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
    const wrappedDescribe = (0, test_recorder_1.isLiveMode)()
        ? function (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        title, fn, options) {
            return supports.global.describe(`${title} (service version ${currentVersion})`, fn, options);
        }
        : supports.global.describe;
    const wrappedDescribeOnly = (0, test_recorder_1.isLiveMode)()
        ? function (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        title, fn, options) {
            return supports.global.describe.only(`${title} (service version ${currentVersion})`, fn, options);
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
    const chain = {
        it,
        xit: supports.global.xit,
        describe,
        xdescribe: supports.global.xdescribe,
    };
    return chain;
}
supports.global = globalThis;
function isMultiVersionDisabled() {
    return Boolean(test_recorder_1.env.DISABLE_MULTI_VERSION_TESTING);
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
function versionsToTest(versions, options = {}, handler) {
    if (versions.length <= 0) {
        throw new Error("invalid list of service versions to run the tests.");
    }
    let toTest;
    // all versions are used in live TEST_MODE
    if ((0, test_recorder_1.isLiveMode)() && !isMultiVersionDisabled()) {
        toTest = versions;
    }
    else {
        toTest = options.versionForRecording
            ? [options.versionForRecording]
            : versions.slice(versions.length - 1);
    }
    toTest.forEach((serviceVersion) => {
        const onVersions = function (supported) {
            return supports(serviceVersion, supported, versions);
        };
        handler(serviceVersion, onVersions);
    });
}
//# sourceMappingURL=multiVersion.js.map