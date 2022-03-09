// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Sanitizer } from "../sanitizer";
import { env } from "./env";
import { isPlaybackMode, isRecordMode, setEnvironmentVariables, RegexSanitizer } from "./utils";

/**
 * Supposed to be used in record and playback modes.
 * Has no effect in live mode.
 *
 *  1. The key-value pairs will be used as the environment variables in playback mode.
 *  2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
 */
export async function handleEnvSetup(
  envSetupForPlayback: Record<string, string>,
  sanitizer: Sanitizer
): Promise<void> {
  if (envSetupForPlayback) {
    if (isPlaybackMode()) {
      // Loads the "fake" environment variables in `process.env` or `window.__env__` based on the runtime
      setEnvironmentVariables(envSetupForPlayback);
    } else if (isRecordMode()) {
      // If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode

      const generalRegexSanitizers: RegexSanitizer[] = [];
      for (const [key, value] of Object.entries(envSetupForPlayback)) {
        const envKey = env[key];
        if (envKey) {
          generalRegexSanitizers.push({ regex: envKey, value });
        }
      }
      await sanitizer.addSanitizers({
        generalRegexSanitizers,
      });
    }
  }
}
