// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dscpConfigurationOperations/operations.js";
import type {
  DscpConfigurationOperationsListAllOptionalParams,
  DscpConfigurationOperationsListOptionalParams,
  DscpConfigurationOperationsDeleteOptionalParams,
  DscpConfigurationOperationsCreateOrUpdateOptionalParams,
  DscpConfigurationOperationsGetOptionalParams,
} from "../../api/dscpConfigurationOperations/options.js";
import type { DscpConfiguration } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DscpConfigurationOperations operations. */
export interface DscpConfigurationOperationsOperations {
  /** Gets all dscp configurations in a subscription. */
  listAll: (
    options?: DscpConfigurationOperationsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<DscpConfiguration>;
  /** Gets a DSCP Configuration. */
  list: (
    resourceGroupName: string,
    options?: DscpConfigurationOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<DscpConfiguration>;
  /** Deletes a DSCP Configuration. */
  delete: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    options?: DscpConfigurationOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    options?: DscpConfigurationOperationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    options?: DscpConfigurationOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a DSCP Configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    parameters: DscpConfiguration,
    options?: DscpConfigurationOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DscpConfiguration>, DscpConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    parameters: DscpConfiguration,
    options?: DscpConfigurationOperationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DscpConfiguration>, DscpConfiguration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    parameters: DscpConfiguration,
    options?: DscpConfigurationOperationsCreateOrUpdateOptionalParams,
  ) => Promise<DscpConfiguration>;
  /** Gets a DSCP Configuration. */
  get: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    options?: DscpConfigurationOperationsGetOptionalParams,
  ) => Promise<DscpConfiguration>;
}

function _getDscpConfigurationOperations(context: NetworkManagementContext) {
  return {
    listAll: (options?: DscpConfigurationOperationsListAllOptionalParams) =>
      listAll(context, options),
    list: (resourceGroupName: string, options?: DscpConfigurationOperationsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      dscpConfigurationName: string,
      options?: DscpConfigurationOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dscpConfigurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      dscpConfigurationName: string,
      options?: DscpConfigurationOperationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, dscpConfigurationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dscpConfigurationName: string,
      options?: DscpConfigurationOperationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, dscpConfigurationName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      dscpConfigurationName: string,
      parameters: DscpConfiguration,
      options?: DscpConfigurationOperationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, dscpConfigurationName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      dscpConfigurationName: string,
      parameters: DscpConfiguration,
      options?: DscpConfigurationOperationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        dscpConfigurationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      dscpConfigurationName: string,
      parameters: DscpConfiguration,
      options?: DscpConfigurationOperationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        dscpConfigurationName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      dscpConfigurationName: string,
      options?: DscpConfigurationOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, dscpConfigurationName, options),
  };
}

export function _getDscpConfigurationOperationsOperations(
  context: NetworkManagementContext,
): DscpConfigurationOperationsOperations {
  return {
    ..._getDscpConfigurationOperations(context),
  };
}
