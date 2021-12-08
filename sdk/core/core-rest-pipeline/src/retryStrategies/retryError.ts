// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "../restError";
import { custom } from "../util/inspect";
import { Sanitizer } from "../util/sanitizer";

const errorSanitizer = new Sanitizer();

/**
 * An error that keeps track of failed retry requests.
 */
export class RetryError extends Error {
  constructor(message: string = "Failed to retry.") {
    super(message);
    this.name = "RetryError";
    this.errors = [];
    Object.setPrototypeOf(this, RestError.prototype);
  }

  /**
   * List of errors accumulated throughout retries.
   */
  public errors: RestError[];

  /**
   * Logging method for util.inspect in Node.
   */
  [custom](): string {
    return (
      `RetryError: Total errors ${this.errors.length}\n` +
      this.errors
        .map((error) => `RestError: ${error.message} \n ${errorSanitizer.sanitize(error)}`)
        .join("\n")
    );
  }
}
