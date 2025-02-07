// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics, CosmosHeaders } from "../index";

/**
 * @hidden
 */
export interface Response<T> {
  headers: CosmosHeaders;
  result?: T;
  code?: number;
  substatus?: number;
  diagnostics?: CosmosDiagnostics;
}
