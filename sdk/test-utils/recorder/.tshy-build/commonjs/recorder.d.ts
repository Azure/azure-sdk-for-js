import { RecorderStartOptions } from "./utils/utils.js";
import { TestContext } from "./utils/sessionFilePath.js";
import { SanitizerOptions } from "./utils/utils.js";
import { CustomMatcherOptions } from "./matcher.js";
import { Transform } from "./transform.js";
import { AdditionalPolicyConfig } from "@azure/core-client";
import { TestInfo } from "./testInfo.js";
/**
 * Caculates session file path and JSON assets path from test context
 *
 * @internal
 */
export declare function calculatePaths(testContext: TestInfo): TestContext;
/**
 * This client manages the recorder life cycle and interacts with the proxy-tool to do the recording,
 * eventually save them in record mode and playing them back in playback mode.
 *
 * - Use the `configureClient` method to add recorder policy on your client.
 *
 * Other than configuring your clients, use `start`, `stop`, `addSanitizers` methods to use the recorder.
 */
export declare class Recorder {
    private testContext?;
    private static url;
    recordingId?: string;
    private stateManager;
    private httpClient?;
    private sessionFile?;
    private assetsJson?;
    private variables;
    private matcherSet;
    constructor(testContext?: TestInfo | undefined);
    /**
     * redirectRequest updates the request in record and playback modes to hit the proxy-tool with appropriate headers.
     * recorderHttpPolicy calls this method on the request.
     */
    private redirectRequest;
    /**
     * revertRequestChanges reverts the request in record and playback modes back to the existing url.
     *
     * Workflow:
     *   - recorderHttpPolicy calls this method after the request is made
     *   1. "redirectRequest" method is called to update the request with the proxy-tool url
     *   2. Request hits the proxy tool, proxy-tool hits the service and returns the response
     *   3. Using `revertRequestChanges`, we revert the request back to the original url
     */
    private revertRequestChanges;
    /**
     * addSanitizers adds the sanitizers for the current recording which will be applied on it before being saved.
     *
     * Takes SanitizerOptions as the input, passes on to the proxy-tool.
     *
     * By default, it applies only to record mode.
     *
     * If you want this to be applied in a specific mode or in a combination of modes, use the "mode" argument.
     */
    addSanitizers(options: SanitizerOptions, mode?: ("record" | "playback")[]): Promise<void>;
    /**
     * addSessionSanitizers adds the sanitizers for all the following recordings which will be applied on it before being saved.
     * This lets you call addSessionSanitizers once (e.g. in a global before() in your tests). The sanitizers will be applied
     * to every subsequent test.
     *
     * Takes SanitizerOptions as the input, passes on to the proxy-tool.
     *
     * By default, it applies only to record mode.
     *
     * If you want this to be applied in a specific mode or in a combination of modes, use the "mode" argument.
     */
    static addSessionSanitizers(options: SanitizerOptions, mode?: ("record" | "playback")[]): Promise<void>;
    addTransform(transform: Transform): Promise<void>;
    private preStart;
    /**
     * Call this method to ping the proxy-tool with a start request
     * signalling to start recording in the record mode
     * or to start playing back in the playback mode.
     *
     * Takes RecorderStartOptions as the input, which will get used in record and playback modes.
     * Includes
     * - envSetupForPlayback - The key-value pairs will be used as the environment variables in playback mode. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values.
     * - sanitizerOptions - Generated recordings are updated by the "proxy-tool" based on the sanitizer options provided, these santizers are applied only in "record" mode.
     */
    start(options: RecorderStartOptions): Promise<void>;
    /**
     * Call this method to ping the proxy-tool with a stop request, this helps saving the recording in record mode.
     */
    stop(): Promise<void>;
    /**
     * Sets the matcher for the current recording to the matcher specified.
     */
    setMatcher(matcher: "HeaderlessMatcher" | "BodilessMatcher"): Promise<void>;
    /**
     * Sets the matcher for the current recording to the matcher specified.
     */
    setMatcher(matcher: "CustomDefaultMatcher", options?: CustomMatcherOptions): Promise<void>;
    transformsInfo(): Promise<string | null | undefined>;
    /**
     * For core-v2 - libraries depending on core-rest-pipeline.
     * This method adds the recording policy to the additionalPolicies in the client options.
     *
     * Helps in redirecting the requests to the proxy tool instead of directly going to the service.
     *
     * Note: Client Options must have "additionalPolicies" as part of the options.
     */
    configureClientOptions<T, U extends {
        position: "perCall" | "perRetry";
        policy: unknown;
    } = AdditionalPolicyConfig>(options: T & {
        additionalPolicies?: U[];
    }): T & {
        additionalPolicies?: U[];
    };
    private handleTestProxyErrors;
    /**
     * recorderHttpPolicy that can be added as a pipeline policy for any of the core-v2 SDKs(SDKs depending on core-rest-pipeline)
     */
    private recorderHttpPolicy;
    private fixedMultipartBoundaryPolicy;
    /**
     * Register a variable to be stored with the recording. The behavior of this function
     * depends on whether the recorder is in record/live mode or in playback mode.
     *
     * In record or live mode, the function will store the value provided with the recording
     * as a variable and return that value.
     *
     * In playback mode, the function will fetch the value from the variables stored as part of the recording
     * and return the retrieved variable, throwing an error if it is not found.
     *
     * @param name - the name of the variable to be stored in the recording
     * @param value - the value of the variable. In record mode, this value will be stored
     *                with the recording; in playback mode, this parameter is ignored.
     * @returns in record and live mode, `value` without modification.
     *          In playback mode, the variable's value from the recording.
     */
    variable(name: string, value: string): string;
    /**
     * Convenience overload in case you want to reference the same variable multiple times in a test without
     * declaring a variable of your own, or if you know you're in playback mode and don't want to specify an
     * initial value. Throws an error in record and live mode if a call to variable(name, value) has not been
     * made previously.
     *
     * @param name - the name of the variable stored in the recording
     * @returns the value of the variable -- in record and live mode, the value set
     *          in a previous call to variable(name, value). In playback mode, the variable's
     *          value from the recording.
     */
    variable(name: string): string;
}
//# sourceMappingURL=recorder.d.ts.map