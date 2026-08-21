// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { list } from "../../api/quotaOperation/operations.js";
import { QuotaOperationListOptionalParams } from "../../api/quotaOperation/options.js";
import { OperationResponse } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
