// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureSphereContext } from "../../api/AzureSphereContext.js";
import { Operation } from "../../models/models.js";
import { operationsList } from "../../api/operations/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { OperationsListOptions } from "../../models/options.js";

export interface OperationsOperations {
  list: (
    options?: OperationsListOptions,
  ) => PagedAsyncIterableIterator<Operation>;
}

export function getOperations(context: AzureSphereContext) {
  return {
    list: (options?: OperationsListOptions) => operationsList(context, options),
  };
}

export function getOperationsOperations(
  context: AzureSphereContext,
): OperationsOperations {
  return {
    ...getOperations(context),
  };
}
