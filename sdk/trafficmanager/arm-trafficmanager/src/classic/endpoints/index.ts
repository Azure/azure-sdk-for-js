// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TrafficManagerManagementContext } from "../../api/trafficManagerManagementContext.js";
import { $delete, update, createOrUpdate, get } from "../../api/endpoints/operations.js";
import type {
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "../../api/endpoints/options.js";
import type { Endpoint, DeleteOperationResult, EndpointType } from "../../models/models.js";

/** Interface representing a Endpoints operations. */
export interface EndpointsOperations {
  /** Deletes a Traffic Manager endpoint. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    endpointType: EndpointType,
    endpointName: string,
    options?: EndpointsDeleteOptionalParams,
  ) => Promise<DeleteOperationResult>;
  /** Update a Traffic Manager endpoint. */
  update: (
    resourceGroupName: string,
    profileName: string,
    endpointType: EndpointType,
    endpointName: string,
    parameters: Endpoint,
    options?: EndpointsUpdateOptionalParams,
  ) => Promise<Endpoint>;
  /** Create or update a Traffic Manager endpoint. */
  createOrUpdate: (
    resourceGroupName: string,
    profileName: string,
    endpointType: EndpointType,
    endpointName: string,
    parameters: Endpoint,
    options?: EndpointsCreateOrUpdateOptionalParams,
  ) => Promise<Endpoint>;
  /** Gets a Traffic Manager endpoint. */
  get: (
    resourceGroupName: string,
    profileName: string,
    endpointType: EndpointType,
    endpointName: string,
    options?: EndpointsGetOptionalParams,
  ) => Promise<Endpoint>;
}

function _getEndpoints(context: TrafficManagerManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      profileName: string,
      endpointType: EndpointType,
      endpointName: string,
      options?: EndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, endpointType, endpointName, options),
    update: (
      resourceGroupName: string,
      profileName: string,
      endpointType: EndpointType,
      endpointName: string,
      parameters: Endpoint,
      options?: EndpointsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        profileName,
        endpointType,
        endpointName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      profileName: string,
      endpointType: EndpointType,
      endpointName: string,
      parameters: Endpoint,
      options?: EndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        profileName,
        endpointType,
        endpointName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      profileName: string,
      endpointType: EndpointType,
      endpointName: string,
      options?: EndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, endpointType, endpointName, options),
  };
}

export function _getEndpointsOperations(
  context: TrafficManagerManagementContext,
): EndpointsOperations {
  return {
    ..._getEndpoints(context),
  };
}
