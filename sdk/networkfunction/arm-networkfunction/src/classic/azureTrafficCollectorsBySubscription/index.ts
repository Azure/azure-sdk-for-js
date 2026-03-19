// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureTrafficCollectorContext } from "../../api/azureTrafficCollectorContext.js";
import { list } from "../../api/azureTrafficCollectorsBySubscription/operations.js";
import type { AzureTrafficCollectorsBySubscriptionListOptionalParams } from "../../api/azureTrafficCollectorsBySubscription/options.js";
import type { AzureTrafficCollector } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AzureTrafficCollectorsBySubscription operations. */
export interface AzureTrafficCollectorsBySubscriptionOperations {
  /** Return list of Azure Traffic Collectors in a subscription */
  list: (
    options?: AzureTrafficCollectorsBySubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<AzureTrafficCollector>;
}

function _getAzureTrafficCollectorsBySubscription(context: AzureTrafficCollectorContext) {
  return {
    list: (options?: AzureTrafficCollectorsBySubscriptionListOptionalParams) =>
      list(context, options),
  };
}

export function _getAzureTrafficCollectorsBySubscriptionOperations(
  context: AzureTrafficCollectorContext,
): AzureTrafficCollectorsBySubscriptionOperations {
  return {
    ..._getAzureTrafficCollectorsBySubscription(context),
  };
}
