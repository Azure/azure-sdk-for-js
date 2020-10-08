// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RestError } from "@azure/core-http";

/**
 * An error thrown when an operation is interrupted and can be continued later on.
 *
 * @export
 * @class DataLakeAclChangeFailedError
 * @extends {Error}
 */
export class DataLakeAclChangeFailedError extends Error {
  /**
   * Continuation token to continue next batch of operations.
   *
   * @type {string}
   * @memberof DataLakeAclChangeFailedError
   */
  public continuationToken?: string;

  /**
   * Internal error.
   *
   * @type {(RestError | Error)}
   * @memberof DataLakeAclChangeFailedError
   */
  public internalError: RestError | Error;

  constructor(error: RestError | Error, continuationToken?: string) {
    super(error.message);
    this.name = "DataLakeAclChangeFailedError";
    this.internalError = error;
    this.continuationToken = continuationToken;
    Object.setPrototypeOf(this, DataLakeAclChangeFailedError.prototype);
  }
}
