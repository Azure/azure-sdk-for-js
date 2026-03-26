// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dscpConfiguration/operations.js";
import type {
  DscpConfigurationListAllOptionalParams,
  DscpConfigurationListOptionalParams,
  DscpConfigurationDeleteOptionalParams,
  DscpConfigurationCreateOrUpdateOptionalParams,
  DscpConfigurationGetOptionalParams,
} from "../../api/dscpConfiguration/options.js";
import type { DscpConfiguration } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DscpConfiguration operations. */
export interface DscpConfigurationOperations {
  /** Gets all dscp configurations in a subscription. */
  listAll: (
    options?: DscpConfigurationListAllOptionalParams,
  ) => PagedAsyncIterableIterator<DscpConfiguration>;
  /** Gets a DSCP Configuration. */
  list: (
    resourceGroupName: string,
    options?: DscpConfigurationListOptionalParams,
  ) => PagedAsyncIterableIterator<DscpConfiguration>;
  /** Deletes a DSCP Configuration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    options?: DscpConfigurationDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    options?: DscpConfigurationDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    options?: DscpConfigurationDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a DSCP Configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    parameters: DscpConfiguration,
    options?: DscpConfigurationCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DscpConfiguration>, DscpConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    parameters: DscpConfiguration,
    options?: DscpConfigurationCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DscpConfiguration>, DscpConfiguration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    parameters: DscpConfiguration,
    options?: DscpConfigurationCreateOrUpdateOptionalParams,
  ) => Promise<DscpConfiguration>;
  /** Gets a DSCP Configuration. */
  get: (
    resourceGroupName: string,
    dscpConfigurationName: string,
    options?: DscpConfigurationGetOptionalParams,
  ) => Promise<DscpConfiguration>;
}

function _getDscpConfiguration(context: NetworkManagementContext) {
  return {
    listAll: (options?: DscpConfigurationListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: DscpConfigurationListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      dscpConfigurationName: string,
      options?: DscpConfigurationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dscpConfigurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      dscpConfigurationName: string,
      options?: DscpConfigurationDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, dscpConfigurationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dscpConfigurationName: string,
      options?: DscpConfigurationDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, dscpConfigurationName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      dscpConfigurationName: string,
      parameters: DscpConfiguration,
      options?: DscpConfigurationCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, dscpConfigurationName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      dscpConfigurationName: string,
      parameters: DscpConfiguration,
      options?: DscpConfigurationCreateOrUpdateOptionalParams,
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
      options?: DscpConfigurationCreateOrUpdateOptionalParams,
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
      options?: DscpConfigurationGetOptionalParams,
    ) => get(context, resourceGroupName, dscpConfigurationName, options),
  };
}

export function _getDscpConfigurationOperations(
  context: NetworkManagementContext,
): DscpConfigurationOperations {
  return {
    ..._getDscpConfiguration(context),
  };
}
