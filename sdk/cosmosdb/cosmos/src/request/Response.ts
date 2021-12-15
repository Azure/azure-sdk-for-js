// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosException } from "../client/Diagnostics/Diagnostic";
import { CosmosHeaders } from "../index";

/**
 * @hidden
 */
export interface Response<T> {
  headers: CosmosHeaders;
  result?: T;
  code?: number;
  substatus?: number;
  cosmosException?: CosmosException;
}
