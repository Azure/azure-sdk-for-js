// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  env,
  isPlaybackMode,
  isRecordMode,
  setEnvironmentVariables
} from "@azure-tools/test-recorder";
import { Sanitizer } from "../sanitizer";

export async function handleEnvSetupForPlayback(
  envSetupForPlayback: Record<string, string>,
  sanitizer: Sanitizer
) {
  if (envSetupForPlayback) {
    if (isPlaybackMode()) {
      setEnvironmentVariables(env, envSetupForPlayback);
    } else if (isRecordMode()) {
      await sanitizer.addSanitizers({
        generalRegexSanitizers: Object.keys(envSetupForPlayback).map((key) => {
          return { regex: env[key], value: envSetupForPlayback[key] };
        })
      });
    }
  }
}
