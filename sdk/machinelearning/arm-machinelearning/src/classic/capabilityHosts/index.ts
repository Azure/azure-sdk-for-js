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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CapabilityHosts operations. */
export interface CapabilityHostsOperations {
  /** Delete capabilityHost. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: CapabilityHostsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: CapabilityHostsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: CapabilityHostsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update capabilityHost. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: CapabilityHost,
    options?: CapabilityHostsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CapabilityHost>, CapabilityHost>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: CapabilityHost,
    options?: CapabilityHostsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CapabilityHost>, CapabilityHost>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: CapabilityHost,
    options?: CapabilityHostsCreateOrUpdateOptionalParams,
  ) => Promise<CapabilityHost>;
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: CapabilityHostsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: CapabilityHostsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: CapabilityHost,
      options?: CapabilityHostsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: CapabilityHost,
      options?: CapabilityHostsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: CapabilityHost,
      options?: CapabilityHostsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
    },
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
