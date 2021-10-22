// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  env,
  isPlaybackMode,
  isRecordMode,
  setEnvironmentVariables
} from "@azure-tools/test-recorder";
import { Sanitizer } from "../sanitizer";

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
) {
  if (envSetupForPlayback) {
    if (isPlaybackMode()) {
      // Loads the "fake" environment variables in `process.env` or `window.__env__` based on the runtime
      setEnvironmentVariables(env, envSetupForPlayback);
    } else if (isRecordMode()) {
      // If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
      await sanitizer.addSanitizers({
        generalRegexSanitizers: Object.keys(envSetupForPlayback).map((key) => {
          return { regex: env[key], value: envSetupForPlayback[key] };
        })
      });
    }
  }
}
