// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import {
  EndpointResource,
  EndpointAccessResource,
  IngressGatewayResource,
  ManagedProxyRequest,
  ManagedProxyResource,
} from "../../models/models.js";
import {
  EndpointsListManagedProxyDetailsOptionalParams,
  EndpointsListIngressGatewayCredentialsOptionalParams,
  EndpointsListCredentialsOptionalParams,
  EndpointsListOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "../../api/endpoints/options.js";
import {
  listManagedProxyDetails,
  listIngressGatewayCredentials,
  listCredentials,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/endpoints/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Endpoints operations. */
export interface EndpointsOperations {
  /** Fetches the managed proxy details */
  listManagedProxyDetails: (
    resourceUri: string,
    endpointName: string,
    managedProxyRequest: ManagedProxyRequest,
    options?: EndpointsListManagedProxyDetailsOptionalParams,
  ) => Promise<ManagedProxyResource>;
  /** Gets the ingress gateway endpoint credentials */
  listIngressGatewayCredentials: (
    resourceUri: string,
    endpointName: string,
    options?: EndpointsListIngressGatewayCredentialsOptionalParams,
  ) => Promise<IngressGatewayResource>;
  /** Gets the endpoint access credentials to the resource. */
  listCredentials: (
    resourceUri: string,
    endpointName: string,
    options?: EndpointsListCredentialsOptionalParams,
  ) => Promise<EndpointAccessResource>;
  /** List of endpoints to the target resource. */
  list: (
    resourceUri: string,
    options?: EndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointResource>;
  /** Deletes the endpoint access to the target resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    endpointName: string,
    options?: EndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the endpoint to the target resource. */
  update: (
    resourceUri: string,
    endpointName: string,
    endpointResource: EndpointResource,
    options?: EndpointsUpdateOptionalParams,
  ) => Promise<EndpointResource>;
  /** Create or update the endpoint to the target resource. */
  createOrUpdate: (
    resourceUri: string,
    endpointName: string,
    endpointResource: EndpointResource,
    options?: EndpointsCreateOrUpdateOptionalParams,
  ) => Promise<EndpointResource>;
  /** Gets the endpoint to the resource. */
  get: (
    resourceUri: string,
    endpointName: string,
    options?: EndpointsGetOptionalParams,
  ) => Promise<EndpointResource>;
}

function _getEndpoints(context: HybridConnectivityManagementAPIContext) {
  return {
    listManagedProxyDetails: (
      resourceUri: string,
      endpointName: string,
      managedProxyRequest: ManagedProxyRequest,
      options?: EndpointsListManagedProxyDetailsOptionalParams,
    ) => listManagedProxyDetails(context, resourceUri, endpointName, managedProxyRequest, options),
    listIngressGatewayCredentials: (
      resourceUri: string,
      endpointName: string,
      options?: EndpointsListIngressGatewayCredentialsOptionalParams,
    ) => listIngressGatewayCredentials(context, resourceUri, endpointName, options),
    listCredentials: (
      resourceUri: string,
      endpointName: string,
      options?: EndpointsListCredentialsOptionalParams,
    ) => listCredentials(context, resourceUri, endpointName, options),
    list: (resourceUri: string, options?: EndpointsListOptionalParams) =>
      list(context, resourceUri, options),
    delete: (resourceUri: string, endpointName: string, options?: EndpointsDeleteOptionalParams) =>
      $delete(context, resourceUri, endpointName, options),
    update: (
      resourceUri: string,
      endpointName: string,
      endpointResource: EndpointResource,
      options?: EndpointsUpdateOptionalParams,
    ) => update(context, resourceUri, endpointName, endpointResource, options),
    createOrUpdate: (
      resourceUri: string,
      endpointName: string,
      endpointResource: EndpointResource,
      options?: EndpointsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, endpointName, endpointResource, options),
    get: (resourceUri: string, endpointName: string, options?: EndpointsGetOptionalParams) =>
      get(context, resourceUri, endpointName, options),
  };
}

export function _getEndpointsOperations(
  context: HybridConnectivityManagementAPIContext,
): EndpointsOperations {
  return {
    ..._getEndpoints(context),
  };
}
