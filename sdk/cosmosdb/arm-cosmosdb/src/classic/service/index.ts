// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list, $delete, create, get } from "../../api/service/operations.js";
import type {
  ServiceListOptionalParams,
  ServiceDeleteOptionalParams,
  ServiceCreateOptionalParams,
  ServiceGetOptionalParams,
} from "../../api/service/options.js";
import type {
  ServiceResource,
  ServiceResourceCreateUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Service operations. */
export interface ServiceOperations {
  /** Gets the status of service. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: ServiceListOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceResource>;
  /** Deletes service with the given serviceName. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    serviceName: string,
    options?: ServiceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    serviceName: string,
    options?: ServiceDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    serviceName: string,
    options?: ServiceDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a service. */
  create: (
    resourceGroupName: string,
    accountName: string,
    serviceName: string,
    createUpdateParameters: ServiceResourceCreateUpdateParameters,
    options?: ServiceCreateOptionalParams,
  ) => PollerLike<OperationState<ServiceResource>, ServiceResource>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    accountName: string,
    serviceName: string,
    createUpdateParameters: ServiceResourceCreateUpdateParameters,
    options?: ServiceCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServiceResource>, ServiceResource>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    accountName: string,
    serviceName: string,
    createUpdateParameters: ServiceResourceCreateUpdateParameters,
    options?: ServiceCreateOptionalParams,
  ) => Promise<ServiceResource>;
  /** Gets the status of service. */
  get: (
    resourceGroupName: string,
    accountName: string,
    serviceName: string,
    options?: ServiceGetOptionalParams,
  ) => Promise<ServiceResource>;
}

function _getService(context: CosmosDBManagementContext) {
  return {
    list: (resourceGroupName: string, accountName: string, options?: ServiceListOptionalParams) =>
      list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      serviceName: string,
      options?: ServiceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, serviceName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      serviceName: string,
      options?: ServiceDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, serviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      serviceName: string,
      options?: ServiceDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, serviceName, options);
    },
    create: (
      resourceGroupName: string,
      accountName: string,
      serviceName: string,
      createUpdateParameters: ServiceResourceCreateUpdateParameters,
      options?: ServiceCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, accountName, serviceName, createUpdateParameters, options),
    beginCreate: async (
      resourceGroupName: string,
      accountName: string,
      serviceName: string,
      createUpdateParameters: ServiceResourceCreateUpdateParameters,
      options?: ServiceCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        accountName,
        serviceName,
        createUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      serviceName: string,
      createUpdateParameters: ServiceResourceCreateUpdateParameters,
      options?: ServiceCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        accountName,
        serviceName,
        createUpdateParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      serviceName: string,
      options?: ServiceGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, serviceName, options),
  };
}

export function _getServiceOperations(context: CosmosDBManagementContext): ServiceOperations {
  return {
    ..._getService(context),
  };
}
