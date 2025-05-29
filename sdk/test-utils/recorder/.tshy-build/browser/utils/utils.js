// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { env } from "./env.js";
/**
 * A custom error type for failed pipeline requests.
 */
export class RecorderError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "RecorderError";
        this.statusCode = statusCode;
    }
}
/**
 * Helper class to manage the recording state to make sure the proxy-tool is not flooded with unintended requests.
 */
export class RecordingStateManager {
    constructor() {
        this.currentState = "stopped";
    }
    /**
     * validateState
     */
    validateState(nextState) {
        if (nextState === "started") {
            if (this.state === "started") {
                throw new RecorderError("Already started, should not have called start again.");
            }
        }
        if (nextState === "stopped") {
            if (this.state === "stopped") {
                throw new RecorderError("Already stopped, should not have called stop again.");
            }
        }
    }
    get state() {
        return this.currentState;
    }
    set state(nextState) {
        // Validate state transition
        this.validateState(nextState);
        this.currentState = nextState;
    }
}
export function isStringSanitizer(sanitizer) {
    return !sanitizer.regex;
}
/**
 * Throws error message when the `label` is not defined when it should have been defined in the given mode.
 *
 * Returns true if the param exists.
 */
export function ensureExistence(thing, label) {
    if (!thing) {
        throw new RecorderError(`Something went wrong, ${label} should not have been undefined in "${getTestMode()}" mode.`);
    }
    return true; // Since we would throw error if undefined
}
/**
 * Returns the test mode.
 *
 * If TEST_MODE is not defined, defaults to playback.
 */
export function getTestMode() {
    var _a;
    if (isPlaybackMode()) {
        return "playback";
    }
    return (_a = env.TEST_MODE) === null || _a === void 0 ? void 0 : _a.toLowerCase();
}
/** Make a lazy value that can be deferred and only computed once. */
export const once = (make) => {
    let value;
    return () => (value = value !== null && value !== void 0 ? value : make());
};
export function isRecordMode() {
    var _a;
    return ((_a = env.TEST_MODE) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "record";
}
export function isLiveMode() {
    var _a;
    return ((_a = env.TEST_MODE) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "live";
}
export function isPlaybackMode() {
    return !isRecordMode() && !isLiveMode();
}
/**
 * Loads the environment variables in both node and browser modes corresponding to the key-value pairs provided.
 *
 * Example-
 *
 * Suppose `variables` is { ACCOUNT_NAME: "my_account_name", ACCOUNT_KEY: "fake_secret" },
 * `setEnvironmentVariables` loads the ACCOUNT_NAME and ACCOUNT_KEY in the environment accordingly.
 */
export function setEnvironmentVariables(variables) {
    for (const [key, value] of Object.entries(variables)) {
        env[key] = value;
    }
}
/**
 * Returns the environment variable. Throws error if not defined.
 */
export function assertEnvironmentVariable(variable) {
    const value = env[variable];
    if (!value)
        throw new Error(`${variable} is not defined`);
    return value;
}
/**
 * Polling options that don't wait in playback mode.
 */
export const testPollingOptions = {
    updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};
//# sourceMappingURL=utils.js.map