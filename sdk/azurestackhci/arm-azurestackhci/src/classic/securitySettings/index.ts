// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listByClusters,
  $delete,
  createOrUpdate,
  get,
} from "../../api/securitySettings/operations.js";
import type {
  SecuritySettingsListByClustersOptionalParams,
  SecuritySettingsDeleteOptionalParams,
  SecuritySettingsCreateOrUpdateOptionalParams,
  SecuritySettingsGetOptionalParams,
} from "../../api/securitySettings/options.js";
import type { SecuritySetting } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecuritySettings operations. */
export interface SecuritySettingsOperations {
  /** List SecuritySetting resources by Clusters */
  listByClusters: (
    resourceGroupName: string,
    clusterName: string,
    options?: SecuritySettingsListByClustersOptionalParams,
  ) => PagedAsyncIterableIterator<SecuritySetting>;
  /** Delete a SecuritySetting */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    securitySettingsName: string,
    options?: SecuritySettingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a security setting */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    securitySettingsName: string,
    resource: SecuritySetting,
    options?: SecuritySettingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SecuritySetting>, SecuritySetting>;
  /** Get a SecuritySetting */
  get: (
    resourceGroupName: string,
    clusterName: string,
    securitySettingsName: string,
    options?: SecuritySettingsGetOptionalParams,
  ) => Promise<SecuritySetting>;
}

function _getSecuritySettings(context: AzureStackHCIContext) {
  return {
    listByClusters: (
      resourceGroupName: string,
      clusterName: string,
      options?: SecuritySettingsListByClustersOptionalParams,
    ) => listByClusters(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      securitySettingsName: string,
      options?: SecuritySettingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, securitySettingsName, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      securitySettingsName: string,
      resource: SecuritySetting,
      options?: SecuritySettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        securitySettingsName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      clusterName: string,
      securitySettingsName: string,
      options?: SecuritySettingsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, securitySettingsName, options),
  };
}

export function _getSecuritySettingsOperations(
  context: AzureStackHCIContext,
): SecuritySettingsOperations {
  return {
    ..._getSecuritySettings(context),
  };
}
