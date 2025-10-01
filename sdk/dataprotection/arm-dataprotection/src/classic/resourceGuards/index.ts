// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import {
  listBackupSecurityPINRequestsObjects,
  getDefaultBackupSecurityPINRequestsObject,
  listDeleteProtectedItemRequestsObjects,
  getDefaultDeleteProtectedItemRequestsObject,
  listUpdateProtectionPolicyRequestsObjects,
  getDefaultUpdateProtectionPolicyRequestsObject,
  listUpdateProtectedItemRequestsObjects,
  getDefaultUpdateProtectedItemRequestsObject,
  listDisableSoftDeleteRequestsObjects,
  getDefaultDisableSoftDeleteRequestsObject,
  listResourcesInSubscription,
  listResourcesInResourceGroup,
  $delete,
  patch,
  put,
  get,
  listDeleteResourceGuardProxyRequestsObjects,
  getDefaultDeleteResourceGuardProxyRequestsObject,
} from "../../api/resourceGuards/operations.js";
import type {
  ResourceGuardsListBackupSecurityPINRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectOptionalParams,
  ResourceGuardsListDeleteProtectedItemRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectOptionalParams,
  ResourceGuardsListUpdateProtectionPolicyRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectOptionalParams,
  ResourceGuardsListUpdateProtectedItemRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectOptionalParams,
  ResourceGuardsListDisableSoftDeleteRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectOptionalParams,
  ResourceGuardsListResourcesInSubscriptionOptionalParams,
  ResourceGuardsListResourcesInResourceGroupOptionalParams,
  ResourceGuardsDeleteOptionalParams,
  ResourceGuardsPatchOptionalParams,
  ResourceGuardsPutOptionalParams,
  ResourceGuardsGetOptionalParams,
  ResourceGuardsListDeleteResourceGuardProxyRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectOptionalParams,
} from "../../api/resourceGuards/options.js";
import type {
  DppBaseResource,
  ResourceGuardResource,
  PatchResourceGuardInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ResourceGuards operations. */
export interface ResourceGuardsOperations {
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  listBackupSecurityPINRequestsObjects: (
    resourceGroupName: string,
    resourceGuardsName: string,
    options?: ResourceGuardsListBackupSecurityPINRequestsObjectsOptionalParams,
  ) => PagedAsyncIterableIterator<DppBaseResource>;
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  getDefaultBackupSecurityPINRequestsObject: (
    resourceGroupName: string,
    resourceGuardsName: string,
    requestName: string,
    options?: ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectOptionalParams,
  ) => Promise<DppBaseResource>;
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  listDeleteProtectedItemRequestsObjects: (
    resourceGroupName: string,
    resourceGuardsName: string,
    options?: ResourceGuardsListDeleteProtectedItemRequestsObjectsOptionalParams,
  ) => PagedAsyncIterableIterator<DppBaseResource>;
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  getDefaultDeleteProtectedItemRequestsObject: (
    resourceGroupName: string,
    resourceGuardsName: string,
    requestName: string,
    options?: ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectOptionalParams,
  ) => Promise<DppBaseResource>;
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  listUpdateProtectionPolicyRequestsObjects: (
    resourceGroupName: string,
    resourceGuardsName: string,
    options?: ResourceGuardsListUpdateProtectionPolicyRequestsObjectsOptionalParams,
  ) => PagedAsyncIterableIterator<DppBaseResource>;
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  getDefaultUpdateProtectionPolicyRequestsObject: (
    resourceGroupName: string,
    resourceGuardsName: string,
    requestName: string,
    options?: ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectOptionalParams,
  ) => Promise<DppBaseResource>;
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  listUpdateProtectedItemRequestsObjects: (
    resourceGroupName: string,
    resourceGuardsName: string,
    options?: ResourceGuardsListUpdateProtectedItemRequestsObjectsOptionalParams,
  ) => PagedAsyncIterableIterator<DppBaseResource>;
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  getDefaultUpdateProtectedItemRequestsObject: (
    resourceGroupName: string,
    resourceGuardsName: string,
    requestName: string,
    options?: ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectOptionalParams,
  ) => Promise<DppBaseResource>;
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  listDisableSoftDeleteRequestsObjects: (
    resourceGroupName: string,
    resourceGuardsName: string,
    options?: ResourceGuardsListDisableSoftDeleteRequestsObjectsOptionalParams,
  ) => PagedAsyncIterableIterator<DppBaseResource>;
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  getDefaultDisableSoftDeleteRequestsObject: (
    resourceGroupName: string,
    resourceGuardsName: string,
    requestName: string,
    options?: ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectOptionalParams,
  ) => Promise<DppBaseResource>;
  /** Returns ResourceGuards collection belonging to a subscription. */
  listResourcesInSubscription: (
    options?: ResourceGuardsListResourcesInSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceGuardResource>;
  /** Returns ResourceGuards collection belonging to a ResourceGroup. */
  listResourcesInResourceGroup: (
    resourceGroupName: string,
    options?: ResourceGuardsListResourcesInResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceGuardResource>;
  /** Deletes a ResourceGuard resource from the resource group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceGuardsName: string,
    options?: ResourceGuardsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a ResourceGuard resource belonging to a resource group. For example, updating tags for a resource. */
  patch: (
    resourceGroupName: string,
    resourceGuardsName: string,
    parameters: PatchResourceGuardInput,
    options?: ResourceGuardsPatchOptionalParams,
  ) => Promise<ResourceGuardResource>;
  /** Creates or updates a ResourceGuard resource belonging to a resource group. */
  put: (
    resourceGroupName: string,
    resourceGuardsName: string,
    parameters: ResourceGuardResource,
    options?: ResourceGuardsPutOptionalParams,
  ) => Promise<ResourceGuardResource>;
  /** Returns a ResourceGuard belonging to a resource group. */
  get: (
    resourceGroupName: string,
    resourceGuardsName: string,
    options?: ResourceGuardsGetOptionalParams,
  ) => Promise<ResourceGuardResource>;
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  listDeleteResourceGuardProxyRequestsObjects: (
    resourceGroupName: string,
    resourceGuardsName: string,
    options?: ResourceGuardsListDeleteResourceGuardProxyRequestsObjectsOptionalParams,
  ) => PagedAsyncIterableIterator<DppBaseResource>;
  /** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
  getDefaultDeleteResourceGuardProxyRequestsObject: (
    resourceGroupName: string,
    resourceGuardsName: string,
    requestName: string,
    options?: ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectOptionalParams,
  ) => Promise<DppBaseResource>;
}

function _getResourceGuards(context: DataProtectionContext) {
  return {
    listBackupSecurityPINRequestsObjects: (
      resourceGroupName: string,
      resourceGuardsName: string,
      options?: ResourceGuardsListBackupSecurityPINRequestsObjectsOptionalParams,
    ) =>
      listBackupSecurityPINRequestsObjects(context, resourceGroupName, resourceGuardsName, options),
    getDefaultBackupSecurityPINRequestsObject: (
      resourceGroupName: string,
      resourceGuardsName: string,
      requestName: string,
      options?: ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectOptionalParams,
    ) =>
      getDefaultBackupSecurityPINRequestsObject(
        context,
        resourceGroupName,
        resourceGuardsName,
        requestName,
        options,
      ),
    listDeleteProtectedItemRequestsObjects: (
      resourceGroupName: string,
      resourceGuardsName: string,
      options?: ResourceGuardsListDeleteProtectedItemRequestsObjectsOptionalParams,
    ) =>
      listDeleteProtectedItemRequestsObjects(
        context,
        resourceGroupName,
        resourceGuardsName,
        options,
      ),
    getDefaultDeleteProtectedItemRequestsObject: (
      resourceGroupName: string,
      resourceGuardsName: string,
      requestName: string,
      options?: ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectOptionalParams,
    ) =>
      getDefaultDeleteProtectedItemRequestsObject(
        context,
        resourceGroupName,
        resourceGuardsName,
        requestName,
        options,
      ),
    listUpdateProtectionPolicyRequestsObjects: (
      resourceGroupName: string,
      resourceGuardsName: string,
      options?: ResourceGuardsListUpdateProtectionPolicyRequestsObjectsOptionalParams,
    ) =>
      listUpdateProtectionPolicyRequestsObjects(
        context,
        resourceGroupName,
        resourceGuardsName,
        options,
      ),
    getDefaultUpdateProtectionPolicyRequestsObject: (
      resourceGroupName: string,
      resourceGuardsName: string,
      requestName: string,
      options?: ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectOptionalParams,
    ) =>
      getDefaultUpdateProtectionPolicyRequestsObject(
        context,
        resourceGroupName,
        resourceGuardsName,
        requestName,
        options,
      ),
    listUpdateProtectedItemRequestsObjects: (
      resourceGroupName: string,
      resourceGuardsName: string,
      options?: ResourceGuardsListUpdateProtectedItemRequestsObjectsOptionalParams,
    ) =>
      listUpdateProtectedItemRequestsObjects(
        context,
        resourceGroupName,
        resourceGuardsName,
        options,
      ),
    getDefaultUpdateProtectedItemRequestsObject: (
      resourceGroupName: string,
      resourceGuardsName: string,
      requestName: string,
      options?: ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectOptionalParams,
    ) =>
      getDefaultUpdateProtectedItemRequestsObject(
        context,
        resourceGroupName,
        resourceGuardsName,
        requestName,
        options,
      ),
    listDisableSoftDeleteRequestsObjects: (
      resourceGroupName: string,
      resourceGuardsName: string,
      options?: ResourceGuardsListDisableSoftDeleteRequestsObjectsOptionalParams,
    ) =>
      listDisableSoftDeleteRequestsObjects(context, resourceGroupName, resourceGuardsName, options),
    getDefaultDisableSoftDeleteRequestsObject: (
      resourceGroupName: string,
      resourceGuardsName: string,
      requestName: string,
      options?: ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectOptionalParams,
    ) =>
      getDefaultDisableSoftDeleteRequestsObject(
        context,
        resourceGroupName,
        resourceGuardsName,
        requestName,
        options,
      ),
    listResourcesInSubscription: (
      options?: ResourceGuardsListResourcesInSubscriptionOptionalParams,
    ) => listResourcesInSubscription(context, options),
    listResourcesInResourceGroup: (
      resourceGroupName: string,
      options?: ResourceGuardsListResourcesInResourceGroupOptionalParams,
    ) => listResourcesInResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceGuardsName: string,
      options?: ResourceGuardsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceGuardsName, options),
    patch: (
      resourceGroupName: string,
      resourceGuardsName: string,
      parameters: PatchResourceGuardInput,
      options?: ResourceGuardsPatchOptionalParams,
    ) => patch(context, resourceGroupName, resourceGuardsName, parameters, options),
    put: (
      resourceGroupName: string,
      resourceGuardsName: string,
      parameters: ResourceGuardResource,
      options?: ResourceGuardsPutOptionalParams,
    ) => put(context, resourceGroupName, resourceGuardsName, parameters, options),
    get: (
      resourceGroupName: string,
      resourceGuardsName: string,
      options?: ResourceGuardsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceGuardsName, options),
    listDeleteResourceGuardProxyRequestsObjects: (
      resourceGroupName: string,
      resourceGuardsName: string,
      options?: ResourceGuardsListDeleteResourceGuardProxyRequestsObjectsOptionalParams,
    ) =>
      listDeleteResourceGuardProxyRequestsObjects(
        context,
        resourceGroupName,
        resourceGuardsName,
        options,
      ),
    getDefaultDeleteResourceGuardProxyRequestsObject: (
      resourceGroupName: string,
      resourceGuardsName: string,
      requestName: string,
      options?: ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectOptionalParams,
    ) =>
      getDefaultDeleteResourceGuardProxyRequestsObject(
        context,
        resourceGroupName,
        resourceGuardsName,
        requestName,
        options,
      ),
  };
}

export function _getResourceGuardsOperations(
  context: DataProtectionContext,
): ResourceGuardsOperations {
  return {
    ..._getResourceGuards(context),
  };
}
