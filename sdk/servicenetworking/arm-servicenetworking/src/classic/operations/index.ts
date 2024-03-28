// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceNetworkingContext } from "../../api/ServiceNetworkingContext.js";
import { Operation } from "../../models/models.js";
import { operationsList } from "../../api/operations/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { OperationsListOptions } from "../../models/options.js";

export interface OperationsOperations {
  list: (
    options?: OperationsListOptions,
  ) => PagedAsyncIterableIterator<Operation>;
}

export function getOperations(context: ServiceNetworkingContext) {
  return {
    list: (options?: OperationsListOptions) => operationsList(context, options),
  };
}

export function getOperationsOperations(
  context: ServiceNetworkingContext,
): OperationsOperations {
  return {
    ...getOperations(context),
  };
}
