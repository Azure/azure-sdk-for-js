// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { logger, logErrorStackTrace } from "../log";

/**
 * @internal
 * @hidden
 * Logs and Throws TypeError if given parameter is undefined or null
 * @param methodName Name of the method that was passed the parameter
 * @param parameterName Name of the parameter to check
 * @param parameterValue Value of the parameter to check
 */
export function throwTypeErrorIfParameterMissing(
  methodName: string,
  parameterName: string,
  parameterValue: any
): void {
  if (parameterValue === undefined || parameterValue === null) {
    const error = new TypeError(
      `${methodName} called without required argument "${parameterName}"`
    );
    logger.warning(error.message);
    logErrorStackTrace(error);
    throw error;
  }
}
