// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "./env.js";
import { RecorderError } from "./utils.js";

export function relativeRecordingsPath(): string {
  if (env.RECORDINGS_RELATIVE_PATH) {
    return env.RECORDINGS_RELATIVE_PATH;
  } else {
    throw new RecorderError(
      "RECORDINGS_RELATIVE_PATH was not set while in browser mode. Ensure that process.env.RELATIVE_RECORDINGS_PATH has been set properly in your Karma configuration.",
    );
  }
}
