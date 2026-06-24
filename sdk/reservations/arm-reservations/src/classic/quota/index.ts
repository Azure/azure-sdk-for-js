// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPIContext } from "../../api/azureReservationAPIContext.js";
import { list, update, createOrUpdate, get } from "../../api/quota/operations.js";
import {
  QuotaListOptionalParams,
  QuotaUpdateOptionalParams,
  QuotaCreateOrUpdateOptionalParams,
  QuotaGetOptionalParams,
} from "../../api/quota/options.js";
import { CurrentQuotaLimitBase } from "../../models/quota/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Quota operations. */
export interface QuotaOperations {
  /** Gets a list of current quotas (service limits) and usage for all resources. The response from the list quota operation can be leveraged to request quota updates. */
  list: (
    subscriptionId: string,
    providerId: string,
    location: string,
    options?: QuotaListOptionalParams,
  ) => PagedAsyncIterableIterator<CurrentQuotaLimitBase>;
  /**
   * Update the quota (service limits) of this resource to the requested value.
   * • To get the quota information for specific resource, send a GET request.
   * • To increase the quota, update the limit field from the GET response to a new value.
   * • To update the quota value, submit the JSON response to the quota request API to update the quota.
   * • To update the quota. use the PATCH operation.
   */
  update: (
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaUpdateOptionalParams,
  ) => PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase>;
  /** @deprecated use update instead */
  beginUpdate: (
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaUpdateOptionalParams,
  ) => Promise<CurrentQuotaLimitBase>;
  /**
   * Create or update the quota (service limits) of a resource to the requested value.
   * Steps:
   * 1. Make the Get request to get the quota information for specific resource.
   * 2. To increase the quota, update the limit field in the response from Get request to new value.
   * 3. Submit the JSON to the quota request API to update the quota.
   * The Create quota request may be constructed as follows. The PUT operation can be used to update the quota.
   */
  createOrUpdate: (
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaCreateOrUpdateOptionalParams,
  ) => Promise<CurrentQuotaLimitBase>;
  /** Get the current quota (service limit) and usage of a resource. You can use the response from the GET operation to submit quota update request. */
  get: (
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    options?: QuotaGetOptionalParams,
  ) => Promise<CurrentQuotaLimitBase>;
}

function _getQuota(context: AzureReservationAPIContext) {
  return {
    list: (
      subscriptionId: string,
      providerId: string,
      location: string,
      options?: QuotaListOptionalParams,
    ) => list(context, subscriptionId, providerId, location, options),
    update: (
      subscriptionId: string,
      providerId: string,
      location: string,
      resourceName: string,
      createQuotaRequest: CurrentQuotaLimitBase,
      options?: QuotaUpdateOptionalParams,
    ) =>
      update(
        context,
        subscriptionId,
        providerId,
        location,
        resourceName,
        createQuotaRequest,
        options,
      ),
    beginUpdate: async (
      subscriptionId: string,
      providerId: string,
      location: string,
      resourceName: string,
      createQuotaRequest: CurrentQuotaLimitBase,
      options?: QuotaUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        subscriptionId,
        providerId,
        location,
        resourceName,
        createQuotaRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      subscriptionId: string,
      providerId: string,
      location: string,
      resourceName: string,
      createQuotaRequest: CurrentQuotaLimitBase,
      options?: QuotaUpdateOptionalParams,
    ) => {
      return await update(
        context,
        subscriptionId,
        providerId,
        location,
        resourceName,
        createQuotaRequest,
        options,
      );
    },
    createOrUpdate: (
      subscriptionId: string,
      providerId: string,
      location: string,
      resourceName: string,
      createQuotaRequest: CurrentQuotaLimitBase,
      options?: QuotaCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        subscriptionId,
        providerId,
        location,
        resourceName,
        createQuotaRequest,
        options,
      ),
    beginCreateOrUpdate: async (
      subscriptionId: string,
      providerId: string,
      location: string,
      resourceName: string,
      createQuotaRequest: CurrentQuotaLimitBase,
      options?: QuotaCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        subscriptionId,
        providerId,
        location,
        resourceName,
        createQuotaRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      subscriptionId: string,
      providerId: string,
      location: string,
      resourceName: string,
      createQuotaRequest: CurrentQuotaLimitBase,
      options?: QuotaCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        subscriptionId,
        providerId,
        location,
        resourceName,
        createQuotaRequest,
        options,
      );
    },
    get: (
      subscriptionId: string,
      providerId: string,
      location: string,
      resourceName: string,
      options?: QuotaGetOptionalParams,
    ) => get(context, subscriptionId, providerId, location, resourceName, options),
  };
}

export function _getQuotaOperations(context: AzureReservationAPIContext): QuotaOperations {
  return {
    ..._getQuota(context),
  };
}
