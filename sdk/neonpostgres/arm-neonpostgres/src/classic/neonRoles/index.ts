// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgresContext } from "../../api/postgresContext.js";
import { $delete, createOrUpdate, list } from "../../api/neonRoles/operations.js";
import type {
  NeonRolesDeleteOptionalParams,
  NeonRolesCreateOrUpdateOptionalParams,
  NeonRolesListOptionalParams,
} from "../../api/neonRoles/options.js";
import type { NeonRole } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NeonRoles operations. */
export interface NeonRolesOperations {
  /** Delete a NeonRole */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    neonRoleName: string,
    options?: NeonRolesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a NeonRole */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    neonRoleName: string,
    resource: NeonRole,
    options?: NeonRolesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NeonRole>, NeonRole>;
  /** List NeonRole resources by Branch */
  list: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    options?: NeonRolesListOptionalParams,
  ) => PagedAsyncIterableIterator<NeonRole>;
}

function _getNeonRoles(context: PostgresContext) {
  return {
    delete: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      neonRoleName: string,
      options?: NeonRolesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        neonRoleName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      neonRoleName: string,
      resource: NeonRole,
      options?: NeonRolesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        neonRoleName,
        resource,
        options,
      ),
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: NeonRolesListOptionalParams,
    ) => list(context, resourceGroupName, organizationName, projectName, branchName, options),
  };
}

export function _getNeonRolesOperations(context: PostgresContext): NeonRolesOperations {
  return {
    ..._getNeonRoles(context),
  };
}
