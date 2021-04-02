// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../index";

/**
 * @hidden
 */
export interface Response<T> {
  headers: CosmosHeaders;
  result?: T;
  code?: number;
  substatus?: number;
}
