// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listByManagementGroupId,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/tenantActionGroups/operations.js";
import type {
  TenantActionGroupsListByManagementGroupIdOptionalParams,
  TenantActionGroupsDeleteOptionalParams,
  TenantActionGroupsUpdateOptionalParams,
  TenantActionGroupsCreateOrUpdateOptionalParams,
  TenantActionGroupsGetOptionalParams,
} from "../../api/tenantActionGroups/options.js";
import type {
  TenantActionGroupsTenantActionGroupResource,
  TenantActionGroupsActionGroupPatchBody,
} from "../../models/tenantActionGroups/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TenantActionGroups operations. */
export interface TenantActionGroupsOperations {
  /** Get a list of all tenant action groups in a management group. */
  listByManagementGroupId: (
    managementGroupId: string,
    xMsClientTenantId: string,
    options?: TenantActionGroupsListByManagementGroupIdOptionalParams,
  ) => PagedAsyncIterableIterator<TenantActionGroupsTenantActionGroupResource>;
  /** Delete a tenant action group. */
  delete: (
    managementGroupId: string,
    tenantActionGroupName: string,
    xMsClientTenantId: string,
    options?: TenantActionGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing tenant action group's tags. To update other fields use the CreateOrUpdate method. */
  update: (
    managementGroupId: string,
    tenantActionGroupName: string,
    xMsClientTenantId: string,
    tenantActionGroupPatch: TenantActionGroupsActionGroupPatchBody,
    options?: TenantActionGroupsUpdateOptionalParams,
  ) => Promise<TenantActionGroupsTenantActionGroupResource>;
  /** Create a new tenant action group or update an existing one. */
  createOrUpdate: (
    managementGroupId: string,
    tenantActionGroupName: string,
    xMsClientTenantId: string,
    actionGroup: TenantActionGroupsTenantActionGroupResource,
    options?: TenantActionGroupsCreateOrUpdateOptionalParams,
  ) => Promise<TenantActionGroupsTenantActionGroupResource>;
  /** Get a tenant action group. */
  get: (
    managementGroupId: string,
    tenantActionGroupName: string,
    xMsClientTenantId: string,
    options?: TenantActionGroupsGetOptionalParams,
  ) => Promise<TenantActionGroupsTenantActionGroupResource>;
}

function _getTenantActionGroups(context: MonitorContext) {
  return {
    listByManagementGroupId: (
      managementGroupId: string,
      xMsClientTenantId: string,
      options?: TenantActionGroupsListByManagementGroupIdOptionalParams,
    ) => listByManagementGroupId(context, managementGroupId, xMsClientTenantId, options),
    delete: (
      managementGroupId: string,
      tenantActionGroupName: string,
      xMsClientTenantId: string,
      options?: TenantActionGroupsDeleteOptionalParams,
    ) => $delete(context, managementGroupId, tenantActionGroupName, xMsClientTenantId, options),
    update: (
      managementGroupId: string,
      tenantActionGroupName: string,
      xMsClientTenantId: string,
      tenantActionGroupPatch: TenantActionGroupsActionGroupPatchBody,
      options?: TenantActionGroupsUpdateOptionalParams,
    ) =>
      update(
        context,
        managementGroupId,
        tenantActionGroupName,
        xMsClientTenantId,
        tenantActionGroupPatch,
        options,
      ),
    createOrUpdate: (
      managementGroupId: string,
      tenantActionGroupName: string,
      xMsClientTenantId: string,
      actionGroup: TenantActionGroupsTenantActionGroupResource,
      options?: TenantActionGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        managementGroupId,
        tenantActionGroupName,
        xMsClientTenantId,
        actionGroup,
        options,
      ),
    get: (
      managementGroupId: string,
      tenantActionGroupName: string,
      xMsClientTenantId: string,
      options?: TenantActionGroupsGetOptionalParams,
    ) => get(context, managementGroupId, tenantActionGroupName, xMsClientTenantId, options),
  };
}

export function _getTenantActionGroupsOperations(
  context: MonitorContext,
): TenantActionGroupsOperations {
  return {
    ..._getTenantActionGroups(context),
  };
}
