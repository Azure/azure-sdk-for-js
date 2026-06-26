// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPIContext } from "../../api/azureReservationAPIContext.js";
import { list, get } from "../../api/quotaRequestStatus/operations.js";
import {
  QuotaRequestStatusListOptionalParams,
  QuotaRequestStatusGetOptionalParams,
} from "../../api/quotaRequestStatus/options.js";
import { QuotaRequestDetails } from "../../models/quota/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a QuotaRequestStatus operations. */
export interface QuotaRequestStatusOperations {
  /** For the specified Azure region (location), subscription, and resource provider, get the history of the quota requests for the past year. To select specific quota requests, use the oData filter. */
  list: (
    subscriptionId: string,
    providerId: string,
    location: string,
    options?: QuotaRequestStatusListOptionalParams,
  ) => PagedAsyncIterableIterator<QuotaRequestDetails>;
  /** For the specified Azure region (location), get the details and status of the quota request by the quota request ID for the resources of the resource provider. The PUT request for the quota (service limit) returns a response with the requestId parameter. */
  get: (
    subscriptionId: string,
    providerId: string,
    location: string,
    id: string,
    options?: QuotaRequestStatusGetOptionalParams,
  ) => Promise<QuotaRequestDetails>;
}

function _getQuotaRequestStatus(context: AzureReservationAPIContext) {
  return {
    list: (
      subscriptionId: string,
      providerId: string,
      location: string,
      options?: QuotaRequestStatusListOptionalParams,
    ) => list(context, subscriptionId, providerId, location, options),
    get: (
      subscriptionId: string,
      providerId: string,
      location: string,
      id: string,
      options?: QuotaRequestStatusGetOptionalParams,
    ) => get(context, subscriptionId, providerId, location, id, options),
  };
}

export function _getQuotaRequestStatusOperations(
  context: AzureReservationAPIContext,
): QuotaRequestStatusOperations {
  return {
    ..._getQuotaRequestStatus(context),
  };
}
