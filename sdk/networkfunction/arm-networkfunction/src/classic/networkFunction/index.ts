// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureTrafficCollectorContext } from "../../api/azureTrafficCollectorContext.js";
import { listOperations } from "../../api/networkFunction/operations.js";
import type { NetworkFunctionListOperationsOptionalParams } from "../../api/networkFunction/options.js";
import type { Operation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkFunction operations. */
export interface NetworkFunctionOperations {
  /** Lists all of the available NetworkFunction Rest API operations. */
  listOperations: (
    options?: NetworkFunctionListOperationsOptionalParams,
  ) => PagedAsyncIterableIterator<Operation>;
}

function _getNetworkFunction(context: AzureTrafficCollectorContext) {
  return {
    listOperations: (options?: NetworkFunctionListOperationsOptionalParams) =>
      listOperations(context, options),
  };
}

export function _getNetworkFunctionOperations(
  context: AzureTrafficCollectorContext,
): NetworkFunctionOperations {
  return {
    ..._getNetworkFunction(context),
  };
}
