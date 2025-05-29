export interface TestContext {
    suiteTitle: string;
    testTitle: string;
}
export declare function sessionFilePath(testContext: TestContext): string;
/**
 * Generates a file path with the following structure:
 *
 *  `{node|browsers}/<describe-block-title>/recording_<test-title>.json`
 */
export declare function recordingFilePath(testContext: TestContext): string;
export declare function assetsJsonPath(): string;
//# sourceMappingURL=sessionFilePath.d.ts.map