// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listServices,
  listAddressLocations,
  updateServices,
  updateAddressLocations,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/serviceGateways/operations.js";
import type {
  ServiceGatewaysListServicesOptionalParams,
  ServiceGatewaysListAddressLocationsOptionalParams,
  ServiceGatewaysUpdateServicesOptionalParams,
  ServiceGatewaysUpdateAddressLocationsOptionalParams,
  ServiceGatewaysListAllOptionalParams,
  ServiceGatewaysListOptionalParams,
  ServiceGatewaysDeleteOptionalParams,
  ServiceGatewaysUpdateTagsOptionalParams,
  ServiceGatewaysCreateOrUpdateOptionalParams,
  ServiceGatewaysGetOptionalParams,
} from "../../api/serviceGateways/options.js";
import type {
  TagsObject,
  ServiceGateway,
  ServiceGatewayUpdateAddressLocationsRequest,
  ServiceGatewayUpdateServicesRequest,
  ServiceGatewayService,
  ServiceGatewayAddressLocationResponse,
} from "../../models/microsoft/network/models.js";
import type { NoContentResponse } from "../../models/typeSpec/http/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServiceGateways operations. */
export interface ServiceGatewaysOperations {
  /** Get Services in service gateway. */
  listServices: (
    resourceGroupName: string,
    serviceGatewayName: string,
    options?: ServiceGatewaysListServicesOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceGatewayService>;
  /** Get address locations in service gateway. */
  listAddressLocations: (
    resourceGroupName: string,
    serviceGatewayName: string,
    options?: ServiceGatewaysListAddressLocationsOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceGatewayAddressLocationResponse>;
  /**
   * Creates, updates, or deletes services within the service gateway.
   * The request supports both full and partial update modes at the service level.
   *
   * Full update replaces all existing services with the new list provided in the request.
   * Partial update modifies only the specified services.
   */
  updateServices: (
    resourceGroupName: string,
    serviceGatewayName: string,
    parameters: ServiceGatewayUpdateServicesRequest,
    options?: ServiceGatewaysUpdateServicesOptionalParams,
  ) => PollerLike<OperationState<NoContentResponse>, NoContentResponse>;
  /** @deprecated use updateServices instead */
  beginUpdateServices: (
    resourceGroupName: string,
    serviceGatewayName: string,
    parameters: ServiceGatewayUpdateServicesRequest,
    options?: ServiceGatewaysUpdateServicesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NoContentResponse>, NoContentResponse>>;
  /** @deprecated use updateServices instead */
  beginUpdateServicesAndWait: (
    resourceGroupName: string,
    serviceGatewayName: string,
    parameters: ServiceGatewayUpdateServicesRequest,
    options?: ServiceGatewaysUpdateServicesOptionalParams,
  ) => Promise<NoContentResponse>;
  /**
   * Creates or updates address locations within the service gateway.
   *
   * The request supports both full and partial update modes at two levels: location and address.
   *
   * Full update replaces all existing data.
   *
   * Partial update modifies only the specified entries:
   *
   * For location-level partial updates, if no address is provided, the existing address will be deleted.
   *
   * For address-level partial updates, if no services are provided, the existing services will be considered for deletion.
   */
  updateAddressLocations: (
    resourceGroupName: string,
    serviceGatewayName: string,
    parameters: ServiceGatewayUpdateAddressLocationsRequest,
    options?: ServiceGatewaysUpdateAddressLocationsOptionalParams,
  ) => PollerLike<OperationState<NoContentResponse>, NoContentResponse>;
  /** @deprecated use updateAddressLocations instead */
  beginUpdateAddressLocations: (
    resourceGroupName: string,
    serviceGatewayName: string,
    parameters: ServiceGatewayUpdateAddressLocationsRequest,
    options?: ServiceGatewaysUpdateAddressLocationsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NoContentResponse>, NoContentResponse>>;
  /** @deprecated use updateAddressLocations instead */
  beginUpdateAddressLocationsAndWait: (
    resourceGroupName: string,
    serviceGatewayName: string,
    parameters: ServiceGatewayUpdateAddressLocationsRequest,
    options?: ServiceGatewaysUpdateAddressLocationsOptionalParams,
  ) => Promise<NoContentResponse>;
  /** Gets all the service gateways in a subscription. */
  listAll: (
    options?: ServiceGatewaysListAllOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceGateway>;
  /** Gets all the service gateways in a resource group. */
  list: (
    resourceGroupName: string,
    options?: ServiceGatewaysListOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceGateway>;
  /** Deletes the specified service gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceGatewayName: string,
    options?: ServiceGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serviceGatewayName: string,
    options?: ServiceGatewaysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serviceGatewayName: string,
    options?: ServiceGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a service gateway tags. */
  updateTags: (
    resourceGroupName: string,
    serviceGatewayName: string,
    parameters: TagsObject,
    options?: ServiceGatewaysUpdateTagsOptionalParams,
  ) => Promise<ServiceGateway>;
  /** Creates or updates a service gateway. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceGatewayName: string,
    parameters: ServiceGateway,
    options?: ServiceGatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServiceGateway>, ServiceGateway>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serviceGatewayName: string,
    parameters: ServiceGateway,
    options?: ServiceGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServiceGateway>, ServiceGateway>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serviceGatewayName: string,
    parameters: ServiceGateway,
    options?: ServiceGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<ServiceGateway>;
  /** Gets the specified service gateway. */
  get: (
    resourceGroupName: string,
    serviceGatewayName: string,
    options?: ServiceGatewaysGetOptionalParams,
  ) => Promise<ServiceGateway>;
}

function _getServiceGateways(context: NetworkManagementContext) {
  return {
    listServices: (
      resourceGroupName: string,
      serviceGatewayName: string,
      options?: ServiceGatewaysListServicesOptionalParams,
    ) => listServices(context, resourceGroupName, serviceGatewayName, options),
    listAddressLocations: (
      resourceGroupName: string,
      serviceGatewayName: string,
      options?: ServiceGatewaysListAddressLocationsOptionalParams,
    ) => listAddressLocations(context, resourceGroupName, serviceGatewayName, options),
    updateServices: (
      resourceGroupName: string,
      serviceGatewayName: string,
      parameters: ServiceGatewayUpdateServicesRequest,
      options?: ServiceGatewaysUpdateServicesOptionalParams,
    ) => updateServices(context, resourceGroupName, serviceGatewayName, parameters, options),
    beginUpdateServices: async (
      resourceGroupName: string,
      serviceGatewayName: string,
      parameters: ServiceGatewayUpdateServicesRequest,
      options?: ServiceGatewaysUpdateServicesOptionalParams,
    ) => {
      const poller = updateServices(
        context,
        resourceGroupName,
        serviceGatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateServicesAndWait: async (
      resourceGroupName: string,
      serviceGatewayName: string,
      parameters: ServiceGatewayUpdateServicesRequest,
      options?: ServiceGatewaysUpdateServicesOptionalParams,
    ) => {
      return await updateServices(
        context,
        resourceGroupName,
        serviceGatewayName,
        parameters,
        options,
      );
    },
    updateAddressLocations: (
      resourceGroupName: string,
      serviceGatewayName: string,
      parameters: ServiceGatewayUpdateAddressLocationsRequest,
      options?: ServiceGatewaysUpdateAddressLocationsOptionalParams,
    ) =>
      updateAddressLocations(context, resourceGroupName, serviceGatewayName, parameters, options),
    beginUpdateAddressLocations: async (
      resourceGroupName: string,
      serviceGatewayName: string,
      parameters: ServiceGatewayUpdateAddressLocationsRequest,
      options?: ServiceGatewaysUpdateAddressLocationsOptionalParams,
    ) => {
      const poller = updateAddressLocations(
        context,
        resourceGroupName,
        serviceGatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAddressLocationsAndWait: async (
      resourceGroupName: string,
      serviceGatewayName: string,
      parameters: ServiceGatewayUpdateAddressLocationsRequest,
      options?: ServiceGatewaysUpdateAddressLocationsOptionalParams,
    ) => {
      return await updateAddressLocations(
        context,
        resourceGroupName,
        serviceGatewayName,
        parameters,
        options,
      );
    },
    listAll: (options?: ServiceGatewaysListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: ServiceGatewaysListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      serviceGatewayName: string,
      options?: ServiceGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceGatewayName, options),
    beginDelete: async (
      resourceGroupName: string,
      serviceGatewayName: string,
      options?: ServiceGatewaysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serviceGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serviceGatewayName: string,
      options?: ServiceGatewaysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serviceGatewayName, options);
    },
    updateTags: (
      resourceGroupName: string,
      serviceGatewayName: string,
      parameters: TagsObject,
      options?: ServiceGatewaysUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, serviceGatewayName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceGatewayName: string,
      parameters: ServiceGateway,
      options?: ServiceGatewaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceGatewayName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serviceGatewayName: string,
      parameters: ServiceGateway,
      options?: ServiceGatewaysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serviceGatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serviceGatewayName: string,
      parameters: ServiceGateway,
      options?: ServiceGatewaysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serviceGatewayName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serviceGatewayName: string,
      options?: ServiceGatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, serviceGatewayName, options),
  };
}

export function _getServiceGatewaysOperations(
  context: NetworkManagementContext,
): ServiceGatewaysOperations {
  return {
    ..._getServiceGateways(context),
  };
}
