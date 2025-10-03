// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { list } from "../../api/quotaOperation/operations.js";
import type { QuotaOperationListOptionalParams } from "../../api/quotaOperation/options.js";
import type { OperationResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a QuotaOperation operations. */
export interface QuotaOperationOperations {
  /** List the operations for the provider */
  list: (
    options?: QuotaOperationListOptionalParams,
  ) => PagedAsyncIterableIterator<OperationResponse>;
}

function _getQuotaOperation(context: AzureQuotaExtensionAPIContext) {
  return {
    list: (options?: QuotaOperationListOptionalParams) => list(context, options),
  };
}

export function _getQuotaOperationOperations(
  context: AzureQuotaExtensionAPIContext,
): QuotaOperationOperations {
  return {
    ..._getQuotaOperation(context),
  };
}
