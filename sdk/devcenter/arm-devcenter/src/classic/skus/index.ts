// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { listBySubscription, listByProject } from "../../api/skus/operations.js";
import type {
  SkusListBySubscriptionOptionalParams,
  SkusListByProjectOptionalParams,
} from "../../api/skus/options.js";
import type { DevCenterSku } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Skus operations. */
export interface SkusOperations {
  /** Lists the Microsoft.DevCenter SKUs available in a subscription. */
  listBySubscription: (
    options?: SkusListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DevCenterSku>;
  /** Lists SKUs available to the project. */
  listByProject: (
    resourceGroupName: string,
    projectName: string,
    options?: SkusListByProjectOptionalParams,
  ) => PagedAsyncIterableIterator<DevCenterSku>;
}

function _getSkus(context: DevCenterContext) {
  return {
    listBySubscription: (options?: SkusListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByProject: (
      resourceGroupName: string,
      projectName: string,
      options?: SkusListByProjectOptionalParams,
    ) => listByProject(context, resourceGroupName, projectName, options),
  };
}

export function _getSkusOperations(context: DevCenterContext): SkusOperations {
  return {
    ..._getSkus(context),
  };
}
