// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import { list } from "../../api/organizationOperations/operations.js";
import { OrganizationOperationsListOptionalParams } from "../../api/organizationOperations/options.js";
import { OperationResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OrganizationOperations operations. */
export interface OrganizationOperationsOperations {
  /** List the operations for the provider */
  list: (
    options?: OrganizationOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<OperationResult>;
}

function _getOrganizationOperations(context: ConfluentManagementContext) {
  return {
    list: (options?: OrganizationOperationsListOptionalParams) => list(context, options),
  };
}

export function _getOrganizationOperationsOperations(
  context: ConfluentManagementContext,
): OrganizationOperationsOperations {
  return {
    ..._getOrganizationOperations(context),
  };
}
