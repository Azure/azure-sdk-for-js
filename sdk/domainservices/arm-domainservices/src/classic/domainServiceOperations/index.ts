// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DomainServicesResourceProviderContext } from "../../api/domainServicesResourceProviderContext.js";
import { list } from "../../api/domainServiceOperations/operations.js";
import type { DomainServiceOperationsListOptionalParams } from "../../api/domainServiceOperations/options.js";
import type { OperationEntity } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DomainServiceOperations operations. */
export interface DomainServiceOperationsOperations {
  /** Lists all the available Domain Services operations. */
  list: (
    options?: DomainServiceOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<OperationEntity>;
}

function _getDomainServiceOperations(context: DomainServicesResourceProviderContext) {
  return {
    list: (options?: DomainServiceOperationsListOptionalParams) => list(context, options),
  };
}

export function _getDomainServiceOperationsOperations(
  context: DomainServicesResourceProviderContext,
): DomainServiceOperationsOperations {
  return {
    ..._getDomainServiceOperations(context),
  };
}
