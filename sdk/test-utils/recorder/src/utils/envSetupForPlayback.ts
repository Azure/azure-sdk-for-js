// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient } from "@azure/core-rest-pipeline";
import { logger } from "../log";
import { addSanitizers } from "../sanitizer";
import { env } from "./env";
import {
  isPlaybackMode,
  isRecordMode,
  setEnvironmentVariables,
  FindReplaceSanitizer,
} from "./utils";

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
  envSetupForPlayback: Record<string, string>
): Promise<void> {
  if (envSetupForPlayback) {
    if (isPlaybackMode()) {
      // Loads the "fake" environment variables in `process.env` or `window.__env__` based on the runtime
      logger.verbose(
        "[handleEnvSetup] Playback mode: updating environment variables to their fake values"
      );
      setEnvironmentVariables(envSetupForPlayback);
    } else if (isRecordMode()) {
      logger.verbose(
        "[handleEnvSetup] Record mode: adding sanitizers to remove environment variables set in envSetupForPlayback:",
        envSetupForPlayback
      );

      // If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode

      const generalSanitizers: FindReplaceSanitizer[] = [];
      for (const [key, value] of Object.entries(envSetupForPlayback)) {
        const envKey = env[key];
        if (envKey) {
          generalSanitizers.push({ target: envKey, value });
        }
      }
      await addSanitizers(httpClient, url, recordingId, {
        generalSanitizers,
      });

      logger.verbose("[handleEnvSetup] Added environment variable sanitizers successfully.");
    }
  }
}
