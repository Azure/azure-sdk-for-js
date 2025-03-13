// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest } from "../../interfaces.js";
import { logger } from "../../log.js";

/**
 * Checks if the request is allowed to be sent over an insecure connection.
 *
 * A request is allowed to be sent over an insecure connection when:
 * - The `allowInsecureConnection` option is set to `true`.
 * - The request has the `allowInsecureConnection` property set to `true`.
 * - The request is being sent to `localhost` or `127.0.0.1`
 */
export function allowInsecureConnection(
  request: PipelineRequest,
  options: { allowInsecureConnection?: boolean },
): boolean {
  if (options.allowInsecureConnection && request.allowInsecureConnection) {
    const url = new URL(request.url);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return true;
    }
  }

  return false;
}

/**
 * Logs a warning about sending a bearer token over an insecure connection.
 *
 * This function will emit a node warning once, but log the warning every time.
 */
export function emitInsecureConnectionWarning(): void {
  const warning =
    "Sending bearer token over insecure transport. Assume any token issued is compromised.";

  logger.warning(warning);

  if (typeof process?.emitWarning === "function" && !emitInsecureConnectionWarning.warned) {
    emitInsecureConnectionWarning.warned = true;
    process.emitWarning(warning);
  }
}

emitInsecureConnectionWarning.warned = false; // Prime TypeScript to allow the property. Used to only emit warning once.
