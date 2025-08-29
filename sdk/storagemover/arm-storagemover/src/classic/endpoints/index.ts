// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverContext } from "../../api/storageMoverContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/endpoints/operations.js";
import {
  EndpointsListOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "../../api/endpoints/options.js";
import { Endpoint, EndpointBaseUpdateParameters } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Endpoints operations. */
export interface EndpointsOperations {
  /** Lists all Endpoints in a Storage Mover. */
  list: (
    resourceGroupName: string,
    storageMoverName: string,
    options?: EndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<Endpoint>;
  /** Deletes an Endpoint resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storageMoverName: string,
    endpointName: string,
    options?: EndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged. */
  update: (
    resourceGroupName: string,
    storageMoverName: string,
    endpointName: string,
    endpointParam: EndpointBaseUpdateParameters,
    options?: EndpointsUpdateOptionalParams,
  ) => Promise<Endpoint>;
  /** Creates or updates an Endpoint resource, which represents a data transfer source or destination. */
  createOrUpdate: (
    resourceGroupName: string,
    storageMoverName: string,
    endpointName: string,
    endpointParam: Endpoint,
    options?: EndpointsCreateOrUpdateOptionalParams,
  ) => Promise<Endpoint>;
  /** Gets an Endpoint resource. */
  get: (
    resourceGroupName: string,
    storageMoverName: string,
    endpointName: string,
    options?: EndpointsGetOptionalParams,
  ) => Promise<Endpoint>;
}

function _getEndpoints(context: StorageMoverContext) {
  return {
    list: (
      resourceGroupName: string,
      storageMoverName: string,
      options?: EndpointsListOptionalParams,
    ) => list(context, resourceGroupName, storageMoverName, options),
    delete: (
      resourceGroupName: string,
      storageMoverName: string,
      endpointName: string,
      options?: EndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageMoverName, endpointName, options),
    update: (
      resourceGroupName: string,
      storageMoverName: string,
      endpointName: string,
      endpointParam: EndpointBaseUpdateParameters,
      options?: EndpointsUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageMoverName, endpointName, endpointParam, options),
    createOrUpdate: (
      resourceGroupName: string,
      storageMoverName: string,
      endpointName: string,
      endpointParam: Endpoint,
      options?: EndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        storageMoverName,
        endpointName,
        endpointParam,
        options,
      ),
    get: (
      resourceGroupName: string,
      storageMoverName: string,
      endpointName: string,
      options?: EndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, storageMoverName, endpointName, options),
  };
}

export function _getEndpointsOperations(context: StorageMoverContext): EndpointsOperations {
  return {
    ..._getEndpoints(context),
  };
}
