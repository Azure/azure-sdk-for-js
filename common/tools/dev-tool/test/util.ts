// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { updateBackend } from "../src/util/printer";

export function silenceLogger(): void {
  updateBackend({
    error: () => {
      /* do nothing */
    },
    warn: () => {
      /* do nothing */
    },
    info: () => {
      /* do nothing */
    },
    log: () => {
      /* do nothing */
    },
  });
}
