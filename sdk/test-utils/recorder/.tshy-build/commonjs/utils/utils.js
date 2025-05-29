"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPollingOptions = exports.once = exports.RecordingStateManager = exports.RecorderError = void 0;
exports.isStringSanitizer = isStringSanitizer;
exports.ensureExistence = ensureExistence;
exports.getTestMode = getTestMode;
exports.isRecordMode = isRecordMode;
exports.isLiveMode = isLiveMode;
exports.isPlaybackMode = isPlaybackMode;
exports.setEnvironmentVariables = setEnvironmentVariables;
exports.assertEnvironmentVariable = assertEnvironmentVariable;
const env_js_1 = require("./env.js");
/**
 * A custom error type for failed pipeline requests.
 */
class RecorderError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "RecorderError";
        this.statusCode = statusCode;
    }
}
exports.RecorderError = RecorderError;
/**
 * Helper class to manage the recording state to make sure the proxy-tool is not flooded with unintended requests.
 */
class RecordingStateManager {
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
exports.RecordingStateManager = RecordingStateManager;
function isStringSanitizer(sanitizer) {
    return !sanitizer.regex;
}
/**
 * Throws error message when the `label` is not defined when it should have been defined in the given mode.
 *
 * Returns true if the param exists.
 */
function ensureExistence(thing, label) {
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
function getTestMode() {
    var _a;
    if (isPlaybackMode()) {
        return "playback";
    }
    return (_a = env_js_1.env.TEST_MODE) === null || _a === void 0 ? void 0 : _a.toLowerCase();
}
/** Make a lazy value that can be deferred and only computed once. */
const once = (make) => {
    let value;
    return () => (value = value !== null && value !== void 0 ? value : make());
};
exports.once = once;
function isRecordMode() {
    var _a;
    return ((_a = env_js_1.env.TEST_MODE) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "record";
}
function isLiveMode() {
    var _a;
    return ((_a = env_js_1.env.TEST_MODE) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "live";
}
function isPlaybackMode() {
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
function setEnvironmentVariables(variables) {
    for (const [key, value] of Object.entries(variables)) {
        env_js_1.env[key] = value;
    }
}
/**
 * Returns the environment variable. Throws error if not defined.
 */
function assertEnvironmentVariable(variable) {
    const value = env_js_1.env[variable];
    if (!value)
        throw new Error(`${variable} is not defined`);
    return value;
}
/**
 * Polling options that don't wait in playback mode.
 */
exports.testPollingOptions = {
    updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};
//# sourceMappingURL=utils.js.map