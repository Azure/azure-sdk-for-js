"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEnvSetup = handleEnvSetup;
const log_js_1 = require("../log.js");
const sanitizer_js_1 = require("../sanitizer.js");
const utils_js_1 = require("./utils.js");
const env_js_1 = require("./env.js");
/**
 * Supposed to be used in record and playback modes.
 * Has no effect in live mode.
 *
 *  1. The key-value pairs will be used as the environment variables in playback mode.
 *  2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
 */
async function handleEnvSetup(httpClient, url, recordingId, envSetupForPlayback) {
    if (envSetupForPlayback) {
        if ((0, utils_js_1.isPlaybackMode)()) {
            // Loads the "fake" environment variables in `process.env` or `window.__env__` based on the runtime
            log_js_1.logger.verbose("[handleEnvSetup] Playback mode: updating environment variables to their fake values");
            (0, utils_js_1.setEnvironmentVariables)(envSetupForPlayback);
        }
        else if ((0, utils_js_1.isRecordMode)()) {
            log_js_1.logger.verbose("[handleEnvSetup] Record mode: adding sanitizers to remove environment variables set in envSetupForPlayback:", envSetupForPlayback);
            // If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
            const valueToReplacementPairs = Object.entries(envSetupForPlayback)
                // Map the values from the environment to their replacements
                .map(([key, value]) => [env_js_1.env[key], value])
                // Don't perform a replacement if the environment variable to replace is not actually defined
                .filter(([key]) => key !== undefined);
            // Sort so that we add the sanitizers from longest replacement value to shortest to ensure if one value is a substring of another,
            // the replacement of the shorter value doesn't interfere with the replacement of the longer value.
            const generalSanitizers = valueToReplacementPairs
                .sort(([aKey], [bKey]) => bKey.length - aKey.length)
                .map(([envKey, value]) => ({ target: envKey, value }));
            await (0, sanitizer_js_1.addSanitizers)(httpClient, url, recordingId, {
                generalSanitizers,
            });
            log_js_1.logger.verbose("[handleEnvSetup] Added environment variable sanitizers successfully.");
        }
    }
}
//# sourceMappingURL=envSetupForPlayback.js.map