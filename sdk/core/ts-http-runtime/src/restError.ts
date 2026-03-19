// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError as RestErrorBase, isRestError as isRestErrorBase } from "./restErrorCommon.js";
import type { RestErrorOptions } from "./restErrorCommon.js";
import { custom } from "#platform/util/inspect";
import { Sanitizer } from "./util/sanitizer.js";

export type { RestErrorOptions } from "./restErrorCommon.js";

const errorSanitizer = new Sanitizer();

/**
 * A custom error type for failed pipeline requests.
 * Node variant includes custom util.inspect output with sanitized request/response details.
 */
export class RestError extends RestErrorBase {
  constructor(message: string, options: RestErrorOptions = {}) {
    super(message, options);
    Object.setPrototypeOf(this, RestError.prototype);

    // Only include useful agent information in the request for logging, as the full agent object
    // may contain large binary data.
    const agent = this.request?.agent
      ? {
          maxFreeSockets: this.request.agent.maxFreeSockets,
          maxSockets: this.request.agent.maxSockets,
        }
      : undefined;

    // Logging method for util.inspect in Node
    Object.defineProperty(this, custom, {
      value: () => {
        // Extract non-enumerable properties and add them back. This is OK since in this output the request and
        // response get sanitized.
        return `RestError: ${this.message} \n ${errorSanitizer.sanitize({
          ...this,
          request: { ...this.request, agent },
          response: this.response,
        })}`;
      },
      enumerable: false,
    });
  }
}

/**
 * Typeguard for RestError
 * @param e - Something caught by a catch clause.
 */
export function isRestError(e: unknown): e is RestError {
  if (e instanceof RestError) {
    return true;
  }
  return isRestErrorBase(e);
}
