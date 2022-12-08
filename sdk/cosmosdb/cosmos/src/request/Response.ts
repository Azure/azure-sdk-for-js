// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../index";
import { WithRequired } from "../utils/typeUtils";

/**
 * @hidden
 */
export interface Response<T> {
  headers: CosmosHeaders;
  result?: T;
  code?: number;
  substatus?: number;
}

export type MaterializedResponse<T> = WithRequired<Response<T>, "result" | "code">