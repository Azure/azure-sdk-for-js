// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DomainServicesResourceProviderContext } from "../../api/domainServicesResourceProviderContext.js";
import {
  unsuspend,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/domainServices/operations.js";
import type {
  DomainServicesUnsuspendOptionalParams,
  DomainServicesListOptionalParams,
  DomainServicesListByResourceGroupOptionalParams,
  DomainServicesDeleteOptionalParams,
  DomainServicesUpdateOptionalParams,
  DomainServicesCreateOrUpdateOptionalParams,
  DomainServicesGetOptionalParams,
} from "../../api/domainServices/options.js";
import type { DomainService, UnsuspendDomainServiceResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DomainServices operations. */
export interface DomainServicesOperations {
  /** Unsuspend a suspended Domain Service resource. */
  unsuspend: (
    resourceGroupName: string,
    domainServiceName: string,
    options?: DomainServicesUnsuspendOptionalParams,
  ) => Promise<UnsuspendDomainServiceResponse>;
  /** The List Domain Services in Subscription operation lists all the domain services available under the given subscription (and across all resource groups within that subscription). */
  list: (options?: DomainServicesListOptionalParams) => PagedAsyncIterableIterator<DomainService>;
  /** The List Domain Services in Resource Group operation lists all the domain services available under the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DomainServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DomainService>;
  /** The Delete Domain Service operation deletes an existing Domain Service. */
  delete: (
    resourceGroupName: string,
    domainServiceName: string,
    options?: DomainServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    domainServiceName: string,
    options?: DomainServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    domainServiceName: string,
    options?: DomainServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** The Update Domain Service operation can be used to update the existing deployment. The update call only supports the properties listed in the PATCH body. */
  update: (
    resourceGroupName: string,
    domainServiceName: string,
    domainService: DomainService,
    options?: DomainServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<DomainService>, DomainService>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    domainServiceName: string,
    domainService: DomainService,
    options?: DomainServicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DomainService>, DomainService>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    domainServiceName: string,
    domainService: DomainService,
    options?: DomainServicesUpdateOptionalParams,
  ) => Promise<DomainService>;
  /** The Create Domain Service operation creates a new domain service with the specified parameters. If the specific service already exists, then any patchable properties will be updated and any immutable properties will remain unchanged. */
  createOrUpdate: (
    resourceGroupName: string,
    domainServiceName: string,
    domainService: DomainService,
    options?: DomainServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DomainService>, DomainService>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    domainServiceName: string,
    domainService: DomainService,
    options?: DomainServicesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DomainService>, DomainService>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    domainServiceName: string,
    domainService: DomainService,
    options?: DomainServicesCreateOrUpdateOptionalParams,
  ) => Promise<DomainService>;
  /** The Get Domain Service operation retrieves a json representation of the Domain Service. */
  get: (
    resourceGroupName: string,
    domainServiceName: string,
    options?: DomainServicesGetOptionalParams,
  ) => Promise<DomainService>;
}

function _getDomainServices(context: DomainServicesResourceProviderContext) {
  return {
    unsuspend: (
      resourceGroupName: string,
      domainServiceName: string,
      options?: DomainServicesUnsuspendOptionalParams,
    ) => unsuspend(context, resourceGroupName, domainServiceName, options),
    list: (options?: DomainServicesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DomainServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      domainServiceName: string,
      options?: DomainServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, domainServiceName, options),
    beginDelete: async (
      resourceGroupName: string,
      domainServiceName: string,
      options?: DomainServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, domainServiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      domainServiceName: string,
      options?: DomainServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, domainServiceName, options);
    },
    update: (
      resourceGroupName: string,
      domainServiceName: string,
      domainService: DomainService,
      options?: DomainServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, domainServiceName, domainService, options),
    beginUpdate: async (
      resourceGroupName: string,
      domainServiceName: string,
      domainService: DomainService,
      options?: DomainServicesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, domainServiceName, domainService, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      domainServiceName: string,
      domainService: DomainService,
      options?: DomainServicesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, domainServiceName, domainService, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      domainServiceName: string,
      domainService: DomainService,
      options?: DomainServicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, domainServiceName, domainService, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      domainServiceName: string,
      domainService: DomainService,
      options?: DomainServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        domainServiceName,
        domainService,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      domainServiceName: string,
      domainService: DomainService,
      options?: DomainServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        domainServiceName,
        domainService,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      domainServiceName: string,
      options?: DomainServicesGetOptionalParams,
    ) => get(context, resourceGroupName, domainServiceName, options),
  };
}

export function _getDomainServicesOperations(
  context: DomainServicesResourceProviderContext,
): DomainServicesOperations {
  return {
    ..._getDomainServices(context),
  };
}
