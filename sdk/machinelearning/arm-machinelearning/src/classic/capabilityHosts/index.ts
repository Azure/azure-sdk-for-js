// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { $delete, createOrUpdate, get } from "../../api/capabilityHosts/operations.js";
import type {
  CapabilityHostsDeleteOptionalParams,
  CapabilityHostsCreateOrUpdateOptionalParams,
  CapabilityHostsGetOptionalParams,
} from "../../api/capabilityHosts/options.js";
import type { CapabilityHost } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CapabilityHosts operations. */
export interface CapabilityHostsOperations {
  /** Delete capabilityHost. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: CapabilityHostsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update capabilityHost. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: CapabilityHost,
    options?: CapabilityHostsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CapabilityHost>, CapabilityHost>;
  /** Get capabilityHost. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: CapabilityHostsGetOptionalParams,
  ) => Promise<CapabilityHost>;
}

function _getCapabilityHosts(context: AzureMachineLearningServicesManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: CapabilityHostsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: CapabilityHost,
      options?: CapabilityHostsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: CapabilityHostsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getCapabilityHostsOperations(
  context: AzureMachineLearningServicesManagementContext,
): CapabilityHostsOperations {
  return {
    ..._getCapabilityHosts(context),
  };
}
