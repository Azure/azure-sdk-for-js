// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import { NeonRole } from "../../models/models.js";
import {
  NeonRolesListOptionalParams,
  NeonRolesDeleteOptionalParams,
  NeonRolesUpdateOptionalParams,
  NeonRolesCreateOrUpdateOptionalParams,
  NeonRolesGetOptionalParams,
} from "../../api/neonRoles/options.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/neonRoles/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NeonRoles operations. */
export interface NeonRolesOperations {
  /** List NeonRole resources by Branch */
  list: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    options?: NeonRolesListOptionalParams,
  ) => PagedAsyncIterableIterator<NeonRole>;
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
  /** Update a NeonRole */
  update: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    neonRoleName: string,
    properties: NeonRole,
    options?: NeonRolesUpdateOptionalParams,
  ) => PollerLike<OperationState<NeonRole>, NeonRole>;
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
  /** Get a NeonRole */
  get: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    neonRoleName: string,
    options?: NeonRolesGetOptionalParams,
  ) => Promise<NeonRole>;
}

function _getNeonRoles(context: PostgresContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: NeonRolesListOptionalParams,
    ) =>
      list(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        options,
      ),
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
    update: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      neonRoleName: string,
      properties: NeonRole,
      options?: NeonRolesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        neonRoleName,
        properties,
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
    get: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      neonRoleName: string,
      options?: NeonRolesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        neonRoleName,
        options,
      ),
  };
}

export function _getNeonRolesOperations(
  context: PostgresContext,
): NeonRolesOperations {
  return {
    ..._getNeonRoles(context),
  };
}
