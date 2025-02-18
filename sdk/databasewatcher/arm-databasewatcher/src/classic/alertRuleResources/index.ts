// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherContext } from "../../api/databaseWatcherContext.js";
import {
  alertRuleResourcesListByParent,
  alertRuleResourcesDelete,
  alertRuleResourcesCreateOrUpdate,
  alertRuleResourcesGet,
} from "../../api/alertRuleResources/index.js";
import { AlertRuleResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import {
  AlertRuleResourcesListByParentOptionalParams,
  AlertRuleResourcesDeleteOptionalParams,
  AlertRuleResourcesCreateOrUpdateOptionalParams,
  AlertRuleResourcesGetOptionalParams,
} from "../../api/options.js";

/** Interface representing a AlertRuleResources operations. */
export interface AlertRuleResourcesOperations {
  /** List AlertRuleResource resources by Watcher */
  listByParent: (
    resourceGroupName: string,
    watcherName: string,
    options?: AlertRuleResourcesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<AlertRuleResource>;
  /** Delete a AlertRuleResource */
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
    ) => alertRuleResourcesListByParent(context, resourceGroupName, watcherName, options),
    delete: (
      resourceGroupName: string,
      watcherName: string,
      alertRuleResourceName: string,
      options?: AlertRuleResourcesDeleteOptionalParams,
    ) =>
      alertRuleResourcesDelete(
        context,
        resourceGroupName,
        watcherName,
        alertRuleResourceName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      watcherName: string,
      alertRuleResourceName: string,
      resource: AlertRuleResource,
      options?: AlertRuleResourcesCreateOrUpdateOptionalParams,
    ) =>
      alertRuleResourcesCreateOrUpdate(
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
    ) =>
      alertRuleResourcesGet(
        context,
        resourceGroupName,
        watcherName,
        alertRuleResourceName,
        options,
      ),
  };
}

export function _getAlertRuleResourcesOperations(
  context: DatabaseWatcherContext,
): AlertRuleResourcesOperations {
  return {
    ..._getAlertRuleResources(context),
  };
}
