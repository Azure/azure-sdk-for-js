import type { FullResult, TestCase, TestResult, FullConfig, Reporter, Suite } from "@playwright/test/reporter";
import type { ReporterConfiguration } from "../common/types.js";
/**
 * @public
 *
 * Extends Playwright's Reporter class to enable Microsoft Playwright Testing's Reporting
 * feature to publish test results and related artifacts and
 * view them in the service portal for faster and easier troubleshooting.
 *
 * @example
 *
 * ```
 * import { defineConfig } from "@playwright/test";
 *
 * export default defineConfig({
 *  reporter: [["@azure/microsoft-playwright-testing/reporter"]]
 * });
 * ```
 */
declare class MPTReporter implements Reporter {
    private isTokenValid;
    private enableGitHubSummary;
    private isRegionValid;
    private shard;
    private isTestRunStartSuccess;
    private ciInfo;
    private serviceClient;
    private storageClient;
    private reporterUtils;
    private envVariables;
    private testRawResults;
    private promiseOnBegin;
    private _testEndPromises;
    private testResultBatch;
    private errorMessages;
    private informationalMessages;
    private processedErrorMessageKeys;
    private sasUri;
    private uploadMetadata;
    private numWorkers;
    private testRunUrl;
    private enableResultPublish;
    constructor(config: Partial<ReporterConfiguration>);
    private _addError;
    private _addInformationalMessage;
    private _addKeyToInformationMessage;
    private _isInformationMessagePresent;
    private _reporterFailureHandler;
    /**
     * @public
     *
     * Called once before running tests.
     *
     * @param config - Resolved configuration.
     * @param suite - The root suite that contains all projects, files and test cases.
     */
    onBegin(config: FullConfig, suite: Suite): void;
    /**
     * @public
     *
     * Called after a test has been finished in the worker process.
     *
     * @param test - Test that has been finished.
     * @param result - Result of the test run.
     */
    onTestEnd(test: TestCase, result: TestResult): void;
    /**
     * @public
     *
     * Called after all tests have been run, or testing has been interrupted. Note that this method may return a [Promise]
     * and Playwright Test will await it. Reporter is allowed to override the status and hence affect the exit code of the
     * test runner.
     *
     * @param result - Result of the full test run, `status` can be one of:
     * - `'passed'` - Everything went as expected.
     * - `'failed'` - Any test has failed.
     * - `'timedout'` - The
     * {@link https://playwright.dev/docs/api/class-testconfig#test-config-global-timeout | testConfig.globalTimeout} has
     * been reached.
     * - `'interrupted'` - Interrupted by the user.
     */
    onEnd(result: FullResult): Promise<void>;
    private _onBegin;
    private _onTestEnd;
    private _onEnd;
    private renewSasUriIfNeeded;
    private _uploadTestResultAttachments;
    private initializeMPTReporter;
    private displayAdditionalInformation;
    private processTestResult;
    /**
     * @public
     *
     * Whether this reporter uses stdio for reporting. When it does not, Playwright Test could add some output to enhance
     * user experience. If your reporter does not print to the terminal, it is strongly recommended to return `false`.
     */
    printsToStdio(): boolean;
}
export default MPTReporter;
//# sourceMappingURL=mptReporter.d.ts.map