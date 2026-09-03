// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DomainRegistrationManagementContext } from "../../api/domainRegistrationManagementContext.js";
import { listOperations } from "../../api/domainRegistrationProvider/operations.js";
import type { DomainRegistrationProviderListOperationsOptionalParams } from "../../api/domainRegistrationProvider/options.js";
import type { CsmOperationDescription } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DomainRegistrationProvider operations. */
export interface DomainRegistrationProviderOperations {
  /** Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
  listOperations: (
    options?: DomainRegistrationProviderListOperationsOptionalParams,
  ) => PagedAsyncIterableIterator<CsmOperationDescription>;
}

function _getDomainRegistrationProvider(context: DomainRegistrationManagementContext) {
  return {
    listOperations: (options?: DomainRegistrationProviderListOperationsOptionalParams) =>
      listOperations(context, options),
  };
}

export function _getDomainRegistrationProviderOperations(
  context: DomainRegistrationManagementContext,
): DomainRegistrationProviderOperations {
  return {
    ..._getDomainRegistrationProvider(context),
  };
}
