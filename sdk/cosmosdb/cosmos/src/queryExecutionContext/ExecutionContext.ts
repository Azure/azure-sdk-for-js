// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../request";

/** @hidden */
export interface ExecutionContext {
  nextItem: () => Promise<Response<any>>;
  current: () => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: () => Promise<Response<any>>; // TODO: code smell
}
