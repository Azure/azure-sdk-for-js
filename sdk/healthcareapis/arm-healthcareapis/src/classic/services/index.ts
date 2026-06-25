// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import {
  checkNameAvailability,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/services/operations.js";
import {
  ServicesCheckNameAvailabilityOptionalParams,
  ServicesListOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "../../api/services/options.js";
import {
  ServicesDescription,
  ServicesPatchDescription,
  CheckNameAvailabilityParameters,
  ServicesNameAvailabilityInfo,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Services operations. */
export interface ServicesOperations {
  /** Check if a service instance name is available. */
  checkNameAvailability: (
    checkNameAvailabilityInputs: CheckNameAvailabilityParameters,
    options?: ServicesCheckNameAvailabilityOptionalParams,
  ) => Promise<ServicesNameAvailabilityInfo>;
  /** Get all the service instances in a subscription. */
  list: (options?: ServicesListOptionalParams) => PagedAsyncIterableIterator<ServicesDescription>;
  /** Get all the service instances in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ServicesDescription>;
  /** Delete a service instance. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the metadata of a service instance. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    servicePatchDescription: ServicesPatchDescription,
    options?: ServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<ServicesDescription>, ServicesDescription>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    servicePatchDescription: ServicesPatchDescription,
    options?: ServicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServicesDescription>, ServicesDescription>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    servicePatchDescription: ServicesPatchDescription,
    options?: ServicesUpdateOptionalParams,
  ) => Promise<ServicesDescription>;
  /** Create or update the metadata of a service instance. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    serviceDescription: ServicesDescription,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServicesDescription>, ServicesDescription>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    serviceDescription: ServicesDescription,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServicesDescription>, ServicesDescription>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    serviceDescription: ServicesDescription,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => Promise<ServicesDescription>;
  /** Get the metadata of a service instance. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: ServicesGetOptionalParams,
  ) => Promise<ServicesDescription>;
}

function _getServices(context: HealthcareApisManagementContext) {
  return {
    checkNameAvailability: (
      checkNameAvailabilityInputs: CheckNameAvailabilityParameters,
      options?: ServicesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, checkNameAvailabilityInputs, options),
    list: (options?: ServicesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, options);
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      servicePatchDescription: ServicesPatchDescription,
      options?: ServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, servicePatchDescription, options),
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      servicePatchDescription: ServicesPatchDescription,
      options?: ServicesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        resourceName,
        servicePatchDescription,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      servicePatchDescription: ServicesPatchDescription,
      options?: ServicesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        resourceName,
        servicePatchDescription,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      serviceDescription: ServicesDescription,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, serviceDescription, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      serviceDescription: ServicesDescription,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        serviceDescription,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      serviceDescription: ServicesDescription,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        serviceDescription,
        options,
      );
    },
    get: (resourceGroupName: string, resourceName: string, options?: ServicesGetOptionalParams) =>
      get(context, resourceGroupName, resourceName, options),
  };
}

export function _getServicesOperations(
  context: HealthcareApisManagementContext,
): ServicesOperations {
  return {
    ..._getServices(context),
  };
}
