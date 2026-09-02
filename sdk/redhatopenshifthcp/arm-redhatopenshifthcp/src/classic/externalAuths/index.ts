// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedHatOpenShiftContext } from "../../api/redHatOpenShiftContext.js";
import {
  listByParent,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/externalAuths/operations.js";
import type {
  ExternalAuthsListByParentOptionalParams,
  ExternalAuthsDeleteOptionalParams,
  ExternalAuthsUpdateOptionalParams,
  ExternalAuthsCreateOrUpdateOptionalParams,
  ExternalAuthsGetOptionalParams,
} from "../../api/externalAuths/options.js";
import type { ExternalAuth } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExternalAuths operations. */
export interface ExternalAuthsOperations {
  /** List ExternalAuth resources by HcpOpenShiftCluster */
  listByParent: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    options?: ExternalAuthsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ExternalAuth>;
  /** Delete a ExternalAuth */
  delete: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    externalAuthName: string,
    options?: ExternalAuthsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a ExternalAuth */
  update: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    externalAuthName: string,
    properties: ExternalAuth,
    options?: ExternalAuthsUpdateOptionalParams,
  ) => PollerLike<OperationState<ExternalAuth>, ExternalAuth>;
  /** Create a ExternalAuth */
  createOrUpdate: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    externalAuthName: string,
    resource: ExternalAuth,
    options?: ExternalAuthsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExternalAuth>, ExternalAuth>;
  /** Get a ExternalAuth */
  get: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    externalAuthName: string,
    options?: ExternalAuthsGetOptionalParams,
  ) => Promise<ExternalAuth>;
}

function _getExternalAuths(context: RedHatOpenShiftContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      options?: ExternalAuthsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, hcpOpenShiftClusterName, options),
    delete: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      externalAuthName: string,
      options?: ExternalAuthsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, hcpOpenShiftClusterName, externalAuthName, options),
    update: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      externalAuthName: string,
      properties: ExternalAuth,
      options?: ExternalAuthsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        hcpOpenShiftClusterName,
        externalAuthName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      externalAuthName: string,
      resource: ExternalAuth,
      options?: ExternalAuthsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        hcpOpenShiftClusterName,
        externalAuthName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      externalAuthName: string,
      options?: ExternalAuthsGetOptionalParams,
    ) => get(context, resourceGroupName, hcpOpenShiftClusterName, externalAuthName, options),
  };
}

export function _getExternalAuthsOperations(
  context: RedHatOpenShiftContext,
): ExternalAuthsOperations {
  return {
    ..._getExternalAuths(context),
  };
}
