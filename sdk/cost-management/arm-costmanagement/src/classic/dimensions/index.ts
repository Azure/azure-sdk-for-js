// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import { listByExternalCloudProviderType, list } from "../../api/dimensions/operations.js";
import {
  DimensionsListByExternalCloudProviderTypeOptionalParams,
  DimensionsListOptionalParams,
} from "../../api/dimensions/options.js";
import { Dimension, ExternalCloudProviderType } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Dimensions operations. */
export interface DimensionsOperations {
  /** Lists the dimensions by the external cloud provider type. */
  listByExternalCloudProviderType: (
    externalCloudProviderType: ExternalCloudProviderType,
    externalCloudProviderId: string,
    options?: DimensionsListByExternalCloudProviderTypeOptionalParams,
  ) => PagedAsyncIterableIterator<Dimension>;
  /** Lists the dimensions by the defined scope. */
  list: (
    scope: string,
    options?: DimensionsListOptionalParams,
  ) => PagedAsyncIterableIterator<Dimension>;
}

function _getDimensions(context: CostManagementContext) {
  return {
    listByExternalCloudProviderType: (
      externalCloudProviderType: ExternalCloudProviderType,
      externalCloudProviderId: string,
      options?: DimensionsListByExternalCloudProviderTypeOptionalParams,
    ) =>
      listByExternalCloudProviderType(
        context,
        externalCloudProviderType,
        externalCloudProviderId,
        options,
      ),
    list: (scope: string, options?: DimensionsListOptionalParams) => list(context, scope, options),
  };
}

export function _getDimensionsOperations(context: CostManagementContext): DimensionsOperations {
  return {
    ..._getDimensions(context),
  };
}
