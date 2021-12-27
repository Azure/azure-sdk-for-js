// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
