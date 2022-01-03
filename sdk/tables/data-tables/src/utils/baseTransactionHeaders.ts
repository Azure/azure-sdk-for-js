// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";

/**
 * @internal
 * Builds an object with the required headers for a Transaction request. For both Node and Browser
 */
export function getBaseTransactionHeaders(transactionGuid: string): RawHttpHeaders {
  return {
    accept: "application/json",
    "x-ms-version": "2019-02-02",
    DataServiceVersion: "3.0;",
    MaxDataServiceVersion: "3.0;NetFx",
    "Content-Type": `multipart/mixed; boundary=batch_${transactionGuid}`,
  };
}
