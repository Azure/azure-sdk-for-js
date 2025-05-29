import { describe as vitestDescribe, it as vitestIt } from "vitest";
declare namespace globalThis {
    let describe: typeof vitestDescribe;
    let it: typeof vitestIt;
    let xit: typeof vitestIt.skip;
    let xdescribe: typeof vitestDescribe.skip;
}
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
export type SupportedVersions = string[] | {
    minVer?: string;
    maxVer?: string;
};
/**
 *
 * @param currentVersion current service version to run test with
 * @param supported service versions supported by a test suite or test case
 * @param allVersions all service versions supported by the SDK library being tested.
 *                    NOTE: The versions must be in order from oldest to latest.
 */
export declare function isVersionInSupportedRange(currentVersion: string, supported: SupportedVersions, allVersions: ReadonlyArray<string>): {
    isSupported: boolean;
    skipReason?: string;
};
/**
 * Returns a Vitest wrapper that runs or skips a test/test suite for currentVersion, given a list
 * of versions or a range of versions supported by the test/test suite.
 * @param currentVersion version to check wether to run or skip
 * @param supported supported versions for a test/test suite
 * @param allVersions all service versions supported by the SDK library being tested.
 *                    NOTE: The versions must be in order from oldest to latest.
 */
export declare function supports(currentVersion: string, supported: SupportedVersions, allVersions: ReadonlyArray<string>): TestFunctionWrapper;
export declare namespace supports {
    var global: typeof globalThis;
}
/**
 * Options to multi-service-version tests
 */
export interface MultiVersionTestOptions {
    /**
     * version to used for record/playback
     */
    versionForRecording?: string;
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
export declare function versionsToTest(versions: ReadonlyArray<string>, options: MultiVersionTestOptions | undefined, handler: (serviceVersion: string, onVersions: (supported: SupportedVersions) => TestFunctionWrapper) => void): void;
export {};
//# sourceMappingURL=multiVersion.d.ts.map