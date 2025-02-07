// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { getBaseTransactionHeaders } from "./baseTransactionHeaders.js";

/**
 * @internal
 * Builds an object with the required headers for a Transaction request. For Node
 */
export function getTransactionHeaders(transactionGuid: string): RawHttpHeaders {
  const baseHeaders = getBaseTransactionHeaders(transactionGuid);
  return {
    ...baseHeaders,
    // The below headers are not supported in the browser as they are flagged as "unsafe headers"
    "Accept-Charset": "UTF-8",
    Connection: "Keep-Alive",
  };
}
