// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpClient } from "@azure/core-rest-pipeline";
import { logger } from "../log.js";
import { addSanitizers } from "../sanitizer.js";
import {
  isPlaybackMode,
  isRecordMode,
  setEnvironmentVariables,
  FindReplaceSanitizer,
} from "./utils.js";
import { env } from "./env.js";

/**
 * Supposed to be used in record and playback modes.
 * Has no effect in live mode.
 *
 *  1. The key-value pairs will be used as the environment variables in playback mode.
 *  2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
 */
export async function handleEnvSetup(
  httpClient: HttpClient,
  url: string,
  recordingId: string,
  envSetupForPlayback: Record<string, string>,
): Promise<void> {
  if (envSetupForPlayback) {
    if (isPlaybackMode()) {
      // Loads the "fake" environment variables in `process.env` or `window.__env__` based on the runtime
      logger.verbose(
        "[handleEnvSetup] Playback mode: updating environment variables to their fake values",
      );
      setEnvironmentVariables(envSetupForPlayback);
    } else if (isRecordMode()) {
      logger.verbose(
        "[handleEnvSetup] Record mode: adding sanitizers to remove environment variables set in envSetupForPlayback:",
        envSetupForPlayback,
      );

      // If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
      const valueToReplacementPairs = Object.entries(envSetupForPlayback)
        // Map the values from the environment to their replacements
        .map(([key, value]) => [env[key], value])
        // Don't perform a replacement if the environment variable to replace is not actually defined
        .filter(([key]) => key !== undefined) as [string, string][];

      // Sort so that we add the sanitizers from longest replacement value to shortest to ensure if one value is a substring of another,
      // the replacement of the shorter value doesn't interfere with the replacement of the longer value.
      const generalSanitizers: FindReplaceSanitizer[] = valueToReplacementPairs
        .sort(([aKey], [bKey]) => bKey.length - aKey.length)
        .map(([envKey, value]) => ({ target: envKey, value }));

      await addSanitizers(httpClient, url, recordingId, {
        generalSanitizers,
      });

      logger.verbose("[handleEnvSetup] Added environment variable sanitizers successfully.");
    }
  }
}
