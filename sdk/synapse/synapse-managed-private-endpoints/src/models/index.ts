// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";

/**
 * Managed private endpoint
 */
export interface ManagedPrivateEndpoint {
  /**
   * Fully qualified resource Id for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * The name of the resource
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * The type of the resource. Ex- Microsoft.Compute/virtualMachines or Microsoft.Storage/storageAccounts.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /**
   * Managed private endpoint properties
   */
  properties?: ManagedPrivateEndpointProperties;
}

/**
 * Properties of a managed private endpoint
 */
export interface ManagedPrivateEndpointProperties {
  /**
   * The ARM resource ID of the resource to which the managed private endpoint is created
   */
  privateLinkResourceId?: string;
  /**
   * The groupId to which the managed private endpoint is created
   */
  groupId?: string;
  /**
   * The managed private endpoint provisioning state
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /**
   * The managed private endpoint connection state
   */
  connectionState?: ManagedPrivateEndpointConnectionState;
  /**
   * Denotes whether the managed private endpoint is reserved
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly isReserved?: boolean;
}

/**
 * The connection state of a managed private endpoint
 */
export interface ManagedPrivateEndpointConnectionState {
  /**
   * The approval status
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly status?: string;
  /**
   * The managed private endpoint description
   */
  description?: string;
  /**
   * The actions required on the managed private endpoint
   */
  actionsRequired?: string;
}

/**
 * A list of managed private endpoints
 */
export interface ManagedPrivateEndpointListResponse {
  /**
   * List of managed private endpoints
   */
  value?: ManagedPrivateEndpoint[];
  /**
   * The link to the next page of results, if any remaining results exist.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly nextLink?: string;
}

/**
 * Contains response data for the get operation.
 */
export type ManagedPrivateEndpointsGetResponse = ManagedPrivateEndpoint & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ManagedPrivateEndpoint;
  };
};

/**
 * Contains response data for the create operation.
 */
export type ManagedPrivateEndpointsCreateResponse = ManagedPrivateEndpoint & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ManagedPrivateEndpoint;
  };
};

/**
 * Contains response data for the list operation.
 */
export type ManagedPrivateEndpointsListResponse = ManagedPrivateEndpointListResponse & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ManagedPrivateEndpointListResponse;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type ManagedPrivateEndpointsListNextResponse = ManagedPrivateEndpointListResponse & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ManagedPrivateEndpointListResponse;
  };
};

/**
 * Optional parameters.
 */
export interface ManagedPrivateEndpointsClientOptionalParams extends coreHttp.ServiceClientOptions {
  /**
   * Api Version
   */
  apiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
