// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Association Subresource of Traffic Controller */
export interface Association extends TrackedResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: AssociationProperties;
}

/** Association Properties. */
export interface AssociationProperties {
  /** Association Type */
  associationType: AssociationType;
  /** Association Subnet */
  subnet?: AssociationSubnet;
}

/** Association Subnet. */
export interface AssociationSubnet {
  /** Association ID. */
  id: string;
}

/** The resource model definition for an Azure Resource Manager tracked top level resource */
export interface TrackedResourceBase extends ArmResource {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** Common properties for all Azure Resource Manager resources. */
export interface ArmResource extends ArmResourceBase {}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {}

/** Base class used for type definitions */
export interface ArmResourceBase {}

/** The base proxy resource. */
export interface ProxyResourceBase extends ArmResource {}

/** The private endpoint connection resource */
export interface PrivateEndpointConnection extends ProxyResourceBase {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
}

/** Properties of he private endpoint connection resource */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint resource */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /**
   * The provisioning state of the private endpoint connection resource.
   *
   * Possible values: "Succeeded", "Failed", "Canceled", "Creating", "Deleting"
   */
  provisioningState?: string;
}

/** The private endpoint resource */
export interface PrivateEndpoint {
  /** The resource identifier for private endpoint */
  id?: string;
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /**
   * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
   *
   * Possible values: "Pending", "Approved", "Rejected"
   */
  status?: string;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export interface PrivateLinkResource extends ProxyResourceBase {
  /** Properties of the private link resource. */
  properties?: PrivateLinkResourceProperties;
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

/** The base extension resource. */
export interface ExtensionResourceBase extends ArmResource {}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface TrafficController extends TrackedResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: TrafficControllerProperties;
}

/** Traffic Controller Properties. */
export interface TrafficControllerProperties {}

/** Resource ID definition used by parent to reference child resources. */
export interface ResourceId {
  /** Resource ID of child resource. */
  id: string;
}

/** Frontend Subresource of Traffic Controller. */
export interface Frontend extends TrackedResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: FrontendProperties;
}

/** Frontend Properties. */
export interface FrontendProperties {}

/** The type used for update operations of the Association. */
export interface AssociationUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  properties?: AssociationUpdateProperties;
}

/** The updatable properties of the Association. */
export interface AssociationUpdateProperties {
  /** Association Type */
  associationType?: AssociationType;
  /** Association Subnet */
  subnet?: AssociationSubnet;
}

/** The type used for update operations of the Frontend. */
export interface FrontendUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** The type used for update operations of the TrafficController. */
export interface TrafficControllerUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** Alias for AssociationType */
export type AssociationType = string | "subnets";
/** Alias for ProvisioningState */
export type ProvisioningState =
  | string
  | "Provisioning"
  | "Updating"
  | "Deleting"
  | "Accepted"
  | "Succeeded"
  | "Failed"
  | "Canceled";
