// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-https";
import { getBaseBatchHeaders } from "./baseBatchHeaders";

/**
 * @internal
 * Builds an object with the required headers for a Batch request. For Node
 */
export function getBatchHeaders(batchGuid: string): RawHttpHeaders {
  const baseHeaders = getBaseBatchHeaders(batchGuid);
  return {
    ...baseHeaders,
    // The below headers are not supported in the browser as they are flagged as "unsafe headers"
    "Accept-Charset": "UTF-8",
    Connection: "Keep-Alive"
  };
}
