// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadManagerContext } from "../../api/workloadManagerContext.js";
import {
  listByWorkloadSpace,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/capabilities/operations.js";
import type {
  CapabilitiesListByWorkloadSpaceOptionalParams,
  CapabilitiesDeleteOptionalParams,
  CapabilitiesUpdateOptionalParams,
  CapabilitiesCreateOrUpdateOptionalParams,
  CapabilitiesGetOptionalParams,
} from "../../api/capabilities/options.js";
import type { Capability, CapabilityUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Capabilities operations. */
export interface CapabilitiesOperations {
  /** Lists capabilities in a workload space. */
  listByWorkloadSpace: (
    resourceGroupName: string,
    spaceName: string,
    options?: CapabilitiesListByWorkloadSpaceOptionalParams,
  ) => PagedAsyncIterableIterator<Capability>;
  /** Disables and deletes a capability. */
  delete: (
    resourceGroupName: string,
    spaceName: string,
    capabilityName: string,
    options?: CapabilitiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates mutable capability properties. */
  update: (
    resourceGroupName: string,
    spaceName: string,
    capabilityName: string,
    properties: CapabilityUpdate,
    options?: CapabilitiesUpdateOptionalParams,
  ) => PollerLike<OperationState<Capability>, Capability>;
  /** Creates or replaces a capability. */
  createOrUpdate: (
    resourceGroupName: string,
    spaceName: string,
    capabilityName: string,
    resource: Capability,
    options?: CapabilitiesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Capability>, Capability>;
  /** Gets a capability. */
  get: (
    resourceGroupName: string,
    spaceName: string,
    capabilityName: string,
    options?: CapabilitiesGetOptionalParams,
  ) => Promise<Capability>;
}

function _getCapabilities(context: WorkloadManagerContext) {
  return {
    listByWorkloadSpace: (
      resourceGroupName: string,
      spaceName: string,
      options?: CapabilitiesListByWorkloadSpaceOptionalParams,
    ) => listByWorkloadSpace(context, resourceGroupName, spaceName, options),
    delete: (
      resourceGroupName: string,
      spaceName: string,
      capabilityName: string,
      options?: CapabilitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, spaceName, capabilityName, options),
    update: (
      resourceGroupName: string,
      spaceName: string,
      capabilityName: string,
      properties: CapabilityUpdate,
      options?: CapabilitiesUpdateOptionalParams,
    ) => update(context, resourceGroupName, spaceName, capabilityName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      spaceName: string,
      capabilityName: string,
      resource: Capability,
      options?: CapabilitiesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, spaceName, capabilityName, resource, options),
    get: (
      resourceGroupName: string,
      spaceName: string,
      capabilityName: string,
      options?: CapabilitiesGetOptionalParams,
    ) => get(context, resourceGroupName, spaceName, capabilityName, options),
  };
}

export function _getCapabilitiesOperations(
  context: WorkloadManagerContext,
): CapabilitiesOperations {
  return {
    ..._getCapabilities(context),
  };
}
