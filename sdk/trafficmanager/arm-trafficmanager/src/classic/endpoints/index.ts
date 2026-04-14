// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TrafficManagerManagementContext } from "../../api/trafficManagerManagementContext.js";
import { $delete, updateV2, createOrUpdate, get } from "../../api/endpoints/operations.js";
import type {
  EndpointsDeleteOptionalParams,
  EndpointsUpdateV2OptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "../../api/endpoints/options.js";
import type {
  Endpoint,
  EndpointUpdate,
  DeleteOperationResult,
  EndpointType,
} from "../../models/models.js";

/** Interface representing a Endpoints operations. */
export interface EndpointsOperations {
  /** Deletes a Traffic Manager endpoint. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    profileName: string,
    endpointType: EndpointType,
    endpointName: string,
    options?: EndpointsDeleteOptionalParams,
  ) => Promise<DeleteOperationResult>;
  /** Update a Traffic Manager endpoint. */
  updateV2: (
    resourceGroupName: string,
    profileName: string,
    endpointType: EndpointType,
    endpointName: string,
    parameters: EndpointUpdate,
    options?: EndpointsUpdateV2OptionalParams,
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
    updateV2: (
      resourceGroupName: string,
      profileName: string,
      endpointType: EndpointType,
      endpointName: string,
      parameters: EndpointUpdate,
      options?: EndpointsUpdateV2OptionalParams,
    ) =>
      updateV2(
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
