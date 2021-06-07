// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RestError } from "@azure/core-http";

/**
 * An error thrown when an operation is interrupted and can be continued later on.
 */
export class DataLakeAclChangeFailedError extends Error {
  /**
   * Continuation token to continue next batch of operations.
   */
  public continuationToken?: string;

  /**
   * Internal error.
   */
  public innerError: RestError | Error;

  constructor(error: RestError | Error, continuationToken?: string) {
    super(error.message);
    this.name = "DataLakeAclChangeFailedError";
    this.innerError = error;
    this.continuationToken = continuationToken;
    Object.setPrototypeOf(this, DataLakeAclChangeFailedError.prototype);
  }
}
