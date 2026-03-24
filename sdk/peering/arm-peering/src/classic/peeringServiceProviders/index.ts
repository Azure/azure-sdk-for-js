// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import { list } from "../../api/peeringServiceProviders/operations.js";
import type { PeeringServiceProvidersListOptionalParams } from "../../api/peeringServiceProviders/options.js";
import type { PeeringServiceProvider } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PeeringServiceProviders operations. */
export interface PeeringServiceProvidersOperations {
  /** Lists all of the available peering service locations for the specified kind of peering. */
  list: (
    options?: PeeringServiceProvidersListOptionalParams,
  ) => PagedAsyncIterableIterator<PeeringServiceProvider>;
}

function _getPeeringServiceProviders(context: PeeringManagementContext) {
  return {
    list: (options?: PeeringServiceProvidersListOptionalParams) => list(context, options),
  };
}

export function _getPeeringServiceProvidersOperations(
  context: PeeringManagementContext,
): PeeringServiceProvidersOperations {
  return {
    ..._getPeeringServiceProviders(context),
  };
}
