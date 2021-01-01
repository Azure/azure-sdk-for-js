// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../request";

/**
 * @internal
 * @hidden
 */
export interface ExecutionContext {
  nextItem: () => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: () => Promise<Response<any>>; // TODO: code smell
}
