// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { Addon } from "../../models/models.js";
import {
  AddonsDeleteOptionalParams,
  AddonsCreateOrUpdateOptionalParams,
  AddonsGetOptionalParams,
  AddonsListOptionalParams,
} from "../../api/addons/options.js";
import { $delete, createOrUpdate, get, list } from "../../api/addons/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Addons operations. */
export interface AddonsOperations {
  /** Delete a Addon */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    addonName: string,
    options?: AddonsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Addon */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    addonName: string,
    addon: Addon,
    options?: AddonsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Addon>, Addon>;
  /** Get a Addon */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    addonName: string,
    options?: AddonsGetOptionalParams,
  ) => Promise<Addon>;
  /** List Addon resources by PrivateCloud */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: AddonsListOptionalParams,
  ) => PagedAsyncIterableIterator<Addon>;
}

function _getAddons(context: AzureVMwareSolutionAPIContext) {
  return {
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      addonName: string,
      options?: AddonsDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, privateCloudName, addonName, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      addonName: string,
      addon: Addon,
      options?: AddonsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        addonName,
        addon,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      addonName: string,
      options?: AddonsGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, privateCloudName, addonName, options),
    list: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: AddonsListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, privateCloudName, options),
  };
}

export function _getAddonsOperations(context: AzureVMwareSolutionAPIContext): AddonsOperations {
  return {
    ..._getAddons(context),
  };
}
