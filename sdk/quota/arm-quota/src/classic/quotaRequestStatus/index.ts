// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { list, get } from "../../api/quotaRequestStatus/operations.js";
import type {
  QuotaRequestStatusListOptionalParams,
  QuotaRequestStatusGetOptionalParams,
} from "../../api/quotaRequestStatus/options.js";
import type { QuotaRequestDetails } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a QuotaRequestStatus operations. */
export interface QuotaRequestStatusOperations {
  /** For the specified scope, get the current quota requests for a one year period ending at the time is made. Use the **oData** filter to select quota requests. */
  list: (
    scope: string,
    options?: QuotaRequestStatusListOptionalParams,
  ) => PagedAsyncIterableIterator<QuotaRequestDetails>;
  /** Get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation. */
  get: (
    id: string,
    scope: string,
    options?: QuotaRequestStatusGetOptionalParams,
  ) => Promise<QuotaRequestDetails>;
}

function _getQuotaRequestStatus(context: AzureQuotaExtensionAPIContext) {
  return {
    list: (scope: string, options?: QuotaRequestStatusListOptionalParams) =>
      list(context, scope, options),
    get: (id: string, scope: string, options?: QuotaRequestStatusGetOptionalParams) =>
      get(context, id, scope, options),
  };
}

export function _getQuotaRequestStatusOperations(
  context: AzureQuotaExtensionAPIContext,
): QuotaRequestStatusOperations {
  return {
    ..._getQuotaRequestStatus(context),
  };
}
