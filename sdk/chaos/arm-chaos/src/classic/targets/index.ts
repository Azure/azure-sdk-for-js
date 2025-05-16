// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { Target } from "../../models/models.js";
import {
  TargetsListOptionalParams,
  TargetsDeleteOptionalParams,
  TargetsCreateOrUpdateOptionalParams,
  TargetsGetOptionalParams,
} from "../../api/targets/options.js";
import { list, $delete, createOrUpdate, get } from "../../api/targets/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Targets operations. */
export interface TargetsOperations {
  /** Get a list of Target resources that extend a tracked regional resource. */
  list: (
    resourceGroupName: string,
    parentProviderNamespace: string,
    parentResourceType: string,
    parentResourceName: string,
    options?: TargetsListOptionalParams,
  ) => PagedAsyncIterableIterator<Target>;
  /** Delete a Target resource that extends a tracked regional resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    parentProviderNamespace: string,
    parentResourceType: string,
    parentResourceName: string,
    targetName: string,
    options?: TargetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a Target resource that extends a tracked regional resource. */
  createOrUpdate: (
    resourceGroupName: string,
    parentProviderNamespace: string,
    parentResourceType: string,
    parentResourceName: string,
    targetName: string,
    resource: Target,
    options?: TargetsCreateOrUpdateOptionalParams,
  ) => Promise<Target>;
  /** Get a Target resource that extends a tracked regional resource. */
  get: (
    resourceGroupName: string,
    parentProviderNamespace: string,
    parentResourceType: string,
    parentResourceName: string,
    targetName: string,
    options?: TargetsGetOptionalParams,
  ) => Promise<Target>;
}

function _getTargets(context: ChaosManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      parentProviderNamespace: string,
      parentResourceType: string,
      parentResourceName: string,
      options?: TargetsListOptionalParams,
    ) =>
      list(
        context,
        resourceGroupName,
        parentProviderNamespace,
        parentResourceType,
        parentResourceName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      parentProviderNamespace: string,
      parentResourceType: string,
      parentResourceName: string,
      targetName: string,
      options?: TargetsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        parentProviderNamespace,
        parentResourceType,
        parentResourceName,
        targetName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      parentProviderNamespace: string,
      parentResourceType: string,
      parentResourceName: string,
      targetName: string,
      resource: Target,
      options?: TargetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        parentProviderNamespace,
        parentResourceType,
        parentResourceName,
        targetName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      parentProviderNamespace: string,
      parentResourceType: string,
      parentResourceName: string,
      targetName: string,
      options?: TargetsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        parentProviderNamespace,
        parentResourceType,
        parentResourceName,
        targetName,
        options,
      ),
  };
}

export function _getTargetsOperations(context: ChaosManagementContext): TargetsOperations {
  return {
    ..._getTargets(context),
  };
}
