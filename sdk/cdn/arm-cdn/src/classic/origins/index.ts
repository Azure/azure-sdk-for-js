// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import { listByEndpoint, $delete, update, create, get } from "../../api/origins/operations.js";
import type {
  OriginsListByEndpointOptionalParams,
  OriginsDeleteOptionalParams,
  OriginsUpdateOptionalParams,
  OriginsCreateOptionalParams,
  OriginsGetOptionalParams,
} from "../../api/origins/options.js";
import type { Origin, OriginUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Origins operations. */
export interface OriginsOperations {
  /** Lists all of the existing origins within an endpoint. */
  listByEndpoint: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: OriginsListByEndpointOptionalParams,
  ) => PagedAsyncIterableIterator<Origin>;
  /** Deletes an existing origin within an endpoint. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originName: string,
    options?: OriginsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing origin within an endpoint. */
  update: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originName: string,
    originUpdateProperties: OriginUpdateParameters,
    options?: OriginsUpdateOptionalParams,
  ) => PollerLike<OperationState<Origin>, Origin>;
  /** Creates a new origin within the specified endpoint. */
  create: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originName: string,
    origin: Origin,
    options?: OriginsCreateOptionalParams,
  ) => PollerLike<OperationState<Origin>, Origin>;
  /** Gets an existing origin within an endpoint. */
  get: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originName: string,
    options?: OriginsGetOptionalParams,
  ) => Promise<Origin>;
}

function _getOrigins(context: CdnManagementContext) {
  return {
    listByEndpoint: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: OriginsListByEndpointOptionalParams,
    ) => listByEndpoint(context, resourceGroupName, profileName, endpointName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originName: string,
      options?: OriginsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, endpointName, originName, options),
    update: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originName: string,
      originUpdateProperties: OriginUpdateParameters,
      options?: OriginsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        originName,
        originUpdateProperties,
        options,
      ),
    create: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originName: string,
      origin: Origin,
      options?: OriginsCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, endpointName, originName, origin, options),
    get: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originName: string,
      options?: OriginsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, endpointName, originName, options),
  };
}

export function _getOriginsOperations(context: CdnManagementContext): OriginsOperations {
  return {
    ..._getOrigins(context),
  };
}
