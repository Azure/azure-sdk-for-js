// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  getInstanceView,
  get,
} from "../../api/vmApplications/operations.js";
import type {
  VmApplicationsListOptionalParams,
  VmApplicationsDeleteOptionalParams,
  VmApplicationsUpdateOptionalParams,
  VmApplicationsCreateOrUpdateOptionalParams,
  VmApplicationsGetInstanceViewOptionalParams,
  VmApplicationsGetOptionalParams,
} from "../../api/vmApplications/options.js";
import type { VmApplication, VmApplicationUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VmApplications operations. */
export interface VmApplicationsOperations {
  /** Lists the VM applications installed on a hybrid machine. */
  list: (
    resourceGroupName: string,
    machineName: string,
    options?: VmApplicationsListOptionalParams,
  ) => PagedAsyncIterableIterator<VmApplication>;
  /** Deletes a VM application. */
  delete: (
    resourceGroupName: string,
    machineName: string,
    applicationName: string,
    options?: VmApplicationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    machineName: string,
    applicationName: string,
    options?: VmApplicationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    machineName: string,
    applicationName: string,
    options?: VmApplicationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a VM application. */
  update: (
    resourceGroupName: string,
    machineName: string,
    applicationName: string,
    properties: VmApplicationUpdate,
    options?: VmApplicationsUpdateOptionalParams,
  ) => PollerLike<OperationState<VmApplication>, VmApplication>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    machineName: string,
    applicationName: string,
    properties: VmApplicationUpdate,
    options?: VmApplicationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VmApplication>, VmApplication>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    machineName: string,
    applicationName: string,
    properties: VmApplicationUpdate,
    options?: VmApplicationsUpdateOptionalParams,
  ) => Promise<VmApplication>;
  /** Creates or updates a VM application. */
  createOrUpdate: (
    resourceGroupName: string,
    machineName: string,
    applicationName: string,
    resource: VmApplication,
    options?: VmApplicationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VmApplication>, VmApplication>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    machineName: string,
    applicationName: string,
    resource: VmApplication,
    options?: VmApplicationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VmApplication>, VmApplication>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    machineName: string,
    applicationName: string,
    resource: VmApplication,
    options?: VmApplicationsCreateOrUpdateOptionalParams,
  ) => Promise<VmApplication>;
  /** Gets the instance view of a VM application. */
  getInstanceView: (
    resourceGroupName: string,
    machineName: string,
    applicationName: string,
    options?: VmApplicationsGetInstanceViewOptionalParams,
  ) => Promise<VmApplication>;
  /** Gets a VM application. */
  get: (
    resourceGroupName: string,
    machineName: string,
    applicationName: string,
    options?: VmApplicationsGetOptionalParams,
  ) => Promise<VmApplication>;
}

function _getVmApplications(context: HybridComputeManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      machineName: string,
      options?: VmApplicationsListOptionalParams,
    ) => list(context, resourceGroupName, machineName, options),
    delete: (
      resourceGroupName: string,
      machineName: string,
      applicationName: string,
      options?: VmApplicationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, machineName, applicationName, options),
    beginDelete: async (
      resourceGroupName: string,
      machineName: string,
      applicationName: string,
      options?: VmApplicationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, machineName, applicationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      machineName: string,
      applicationName: string,
      options?: VmApplicationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, machineName, applicationName, options);
    },
    update: (
      resourceGroupName: string,
      machineName: string,
      applicationName: string,
      properties: VmApplicationUpdate,
      options?: VmApplicationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, machineName, applicationName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      machineName: string,
      applicationName: string,
      properties: VmApplicationUpdate,
      options?: VmApplicationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        machineName,
        applicationName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      machineName: string,
      applicationName: string,
      properties: VmApplicationUpdate,
      options?: VmApplicationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        machineName,
        applicationName,
        properties,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      machineName: string,
      applicationName: string,
      resource: VmApplication,
      options?: VmApplicationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, machineName, applicationName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      machineName: string,
      applicationName: string,
      resource: VmApplication,
      options?: VmApplicationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        machineName,
        applicationName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      machineName: string,
      applicationName: string,
      resource: VmApplication,
      options?: VmApplicationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        machineName,
        applicationName,
        resource,
        options,
      );
    },
    getInstanceView: (
      resourceGroupName: string,
      machineName: string,
      applicationName: string,
      options?: VmApplicationsGetInstanceViewOptionalParams,
    ) => getInstanceView(context, resourceGroupName, machineName, applicationName, options),
    get: (
      resourceGroupName: string,
      machineName: string,
      applicationName: string,
      options?: VmApplicationsGetOptionalParams,
    ) => get(context, resourceGroupName, machineName, applicationName, options),
  };
}

export function _getVmApplicationsOperations(
  context: HybridComputeManagementContext,
): VmApplicationsOperations {
  return {
    ..._getVmApplications(context),
  };
}
