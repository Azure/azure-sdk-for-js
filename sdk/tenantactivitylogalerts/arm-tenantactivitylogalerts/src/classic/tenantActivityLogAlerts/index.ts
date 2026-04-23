// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TenantActivityLogAlertsManagementContext } from "../../api/tenantActivityLogAlertsManagementContext.js";
import {
  listByManagementGroup,
  $delete,
  update,
  createOrUpdate,
  get,
  listByTenant,
} from "../../api/tenantActivityLogAlerts/operations.js";
import type {
  TenantActivityLogAlertsListByManagementGroupOptionalParams,
  TenantActivityLogAlertsDeleteOptionalParams,
  TenantActivityLogAlertsUpdateOptionalParams,
  TenantActivityLogAlertsCreateOrUpdateOptionalParams,
  TenantActivityLogAlertsGetOptionalParams,
  TenantActivityLogAlertsListByTenantOptionalParams,
} from "../../api/tenantActivityLogAlerts/options.js";
import type {
  TenantActivityLogAlertResource,
  TenantAlertRulePatchObject,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TenantActivityLogAlerts operations. */
export interface TenantActivityLogAlertsOperations {
  /** Get a list of all Tenant Activity Log Alert rules in a management group. */
  listByManagementGroup: (
    managementGroupName: string,
    options?: TenantActivityLogAlertsListByManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<TenantActivityLogAlertResource>;
  /** Delete a Tenant Activity Log Alert rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    managementGroupName: string,
    alertRuleName: string,
    options?: TenantActivityLogAlertsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates 'tags' and 'enabled' fields in an existing Tenant Alert rule. This method is used to update the Alert rule tags, and to enable or disable the Alert rule. To update other fields use CreateOrUpdate operation. */
  update: (
    managementGroupName: string,
    alertRuleName: string,
    tenantActivityLogAlertRulePatch: TenantAlertRulePatchObject,
    options?: TenantActivityLogAlertsUpdateOptionalParams,
  ) => Promise<TenantActivityLogAlertResource>;
  /** Create a new Tenant Activity Log Alert rule or update an existing one. */
  createOrUpdate: (
    managementGroupName: string,
    alertRuleName: string,
    tenantActivityLogAlertRule: TenantActivityLogAlertResource,
    options?: TenantActivityLogAlertsCreateOrUpdateOptionalParams,
  ) => Promise<TenantActivityLogAlertResource>;
  /** Get Tenant Activity Log Alert rule. */
  get: (
    managementGroupName: string,
    alertRuleName: string,
    options?: TenantActivityLogAlertsGetOptionalParams,
  ) => Promise<TenantActivityLogAlertResource>;
  /** Get a list of all Tenant Activity Log Alert rules in the tenant. */
  listByTenant: (
    options?: TenantActivityLogAlertsListByTenantOptionalParams,
  ) => PagedAsyncIterableIterator<TenantActivityLogAlertResource>;
}

function _getTenantActivityLogAlerts(context: TenantActivityLogAlertsManagementContext) {
  return {
    listByManagementGroup: (
      managementGroupName: string,
      options?: TenantActivityLogAlertsListByManagementGroupOptionalParams,
    ) => listByManagementGroup(context, managementGroupName, options),
    delete: (
      managementGroupName: string,
      alertRuleName: string,
      options?: TenantActivityLogAlertsDeleteOptionalParams,
    ) => $delete(context, managementGroupName, alertRuleName, options),
    update: (
      managementGroupName: string,
      alertRuleName: string,
      tenantActivityLogAlertRulePatch: TenantAlertRulePatchObject,
      options?: TenantActivityLogAlertsUpdateOptionalParams,
    ) =>
      update(context, managementGroupName, alertRuleName, tenantActivityLogAlertRulePatch, options),
    createOrUpdate: (
      managementGroupName: string,
      alertRuleName: string,
      tenantActivityLogAlertRule: TenantActivityLogAlertResource,
      options?: TenantActivityLogAlertsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        managementGroupName,
        alertRuleName,
        tenantActivityLogAlertRule,
        options,
      ),
    get: (
      managementGroupName: string,
      alertRuleName: string,
      options?: TenantActivityLogAlertsGetOptionalParams,
    ) => get(context, managementGroupName, alertRuleName, options),
    listByTenant: (options?: TenantActivityLogAlertsListByTenantOptionalParams) =>
      listByTenant(context, options),
  };
}

export function _getTenantActivityLogAlertsOperations(
  context: TenantActivityLogAlertsManagementContext,
): TenantActivityLogAlertsOperations {
  return {
    ..._getTenantActivityLogAlerts(context),
  };
}
