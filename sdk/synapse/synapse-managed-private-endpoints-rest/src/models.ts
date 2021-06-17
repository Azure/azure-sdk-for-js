// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ManagedPrivateEndpoint {
  /** Fully qualified resource Id for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  id?: string;
  /** The name of the resource */
  name?: string;
  /** The type of the resource. Ex- Microsoft.Compute/virtualMachines or Microsoft.Storage/storageAccounts. */
  type?: string;
  /** Managed private endpoint properties */
  properties?: ManagedPrivateEndpointProperties;
}

export interface ManagedPrivateEndpointProperties {
  /** The ARM resource ID of the resource to which the managed private endpoint is created */
  privateLinkResourceId?: string;
  /** The groupId to which the managed private endpoint is created */
  groupId?: string;
  /** The managed private endpoint provisioning state */
  provisioningState?: string;
  /** The managed private endpoint connection state */
  connectionState?: ManagedPrivateEndpointConnectionState;
  /** Denotes whether the managed private endpoint is reserved */
  isReserved?: boolean;
}

export interface ManagedPrivateEndpointConnectionState {
  /** The approval status */
  status?: string;
  /** The managed private endpoint description */
  description?: string;
  /** The actions required on the managed private endpoint */
  actionsRequired?: string;
}

export interface ManagedPrivateEndpointListResponse {
  /** List of managed private endpoints */
  value?: Array<ManagedPrivateEndpoint>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}
