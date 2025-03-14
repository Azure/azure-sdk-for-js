// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherContext } from "../../api/databaseWatcherContext.js";
import {
  listByParent,
  $delete,
  createOrUpdate,
  get,
  AlertRuleResourcesListByParentOptionalParams,
  AlertRuleResourcesDeleteOptionalParams,
  AlertRuleResourcesCreateOrUpdateOptionalParams,
  AlertRuleResourcesGetOptionalParams,
} from "../../api/alertRuleResources/index.js";
import { AlertRuleResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AlertRuleResources operations. */
export interface AlertRuleResourcesOperations {
  /** List AlertRuleResource resources by Watcher */
  listByParent: (
    resourceGroupName: string,
    watcherName: string,
    options?: AlertRuleResourcesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<AlertRuleResource>;
  /** Delete a AlertRuleResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    watcherName: string,
    alertRuleResourceName: string,
    options?: AlertRuleResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a AlertRuleResource */
  createOrUpdate: (
    resourceGroupName: string,
    watcherName: string,
    alertRuleResourceName: string,
    resource: AlertRuleResource,
    options?: AlertRuleResourcesCreateOrUpdateOptionalParams,
  ) => Promise<AlertRuleResource>;
  /** Get a AlertRuleResource */
  get: (
    resourceGroupName: string,
    watcherName: string,
    alertRuleResourceName: string,
    options?: AlertRuleResourcesGetOptionalParams,
  ) => Promise<AlertRuleResource>;
}

function _getAlertRuleResources(context: DatabaseWatcherContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      watcherName: string,
      options?: AlertRuleResourcesListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, watcherName, options),
    delete: (
      resourceGroupName: string,
      watcherName: string,
      alertRuleResourceName: string,
      options?: AlertRuleResourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, watcherName, alertRuleResourceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      watcherName: string,
      alertRuleResourceName: string,
      resource: AlertRuleResource,
      options?: AlertRuleResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        watcherName,
        alertRuleResourceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      watcherName: string,
      alertRuleResourceName: string,
      options?: AlertRuleResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, watcherName, alertRuleResourceName, options),
  };
}

export function _getAlertRuleResourcesOperations(
  context: DatabaseWatcherContext,
): AlertRuleResourcesOperations {
  return {
    ..._getAlertRuleResources(context),
  };
}
