// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-https";

/**
 * @internal
 * Builds an object with the required headers for a Batch request. For both Node and Browser
 */
export function getBaseBatchHeaders(batchGuid: string): RawHttpHeaders {
  return {
    accept: "application/json",
    "x-ms-version": "2019-02-02",
    DataServiceVersion: "3.0;",
    MaxDataServiceVersion: "3.0;NetFx",
    "Content-Type": `multipart/mixed; boundary=batch_${batchGuid}`
  };
}
