// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface OperationOutput {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplayOutput;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: OriginOutput;
  /** Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionTypeOutput;
}

/** Localized display information for and operation. */
export interface OperationDisplayOutput {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  description?: string;
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponseOutput {
  /** The error object. */
  error?: ErrorDetailOutput;
}

/** The error detail. */
export interface ErrorDetailOutput {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: Array<ErrorDetailOutput>;
  /** The error additional info. */
  readonly additionalInfo?: Array<ErrorAdditionalInfoOutput>;
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfoOutput {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

/** The current status of an async operation. */
export interface OperationStatusResultOutput {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: string;
  /** The end time of the operation. */
  endTime?: string;
  /** The operations list. */
  operations: Array<OperationStatusResultOutput>;
  /** If present, details of the operation error. */
  error?: ErrorDetailOutput;
}

/** Asset definition. */
export interface AssetOutput extends TrackedResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: AssetPropertiesOutput;
  /** The extended location. */
  extendedLocation: ExtendedLocationOutput;
}

/** Defines the asset properties. */
export interface AssetPropertiesOutput {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** Resource path to asset type (model) definition. */
  assetType?: string;
  /** Enabled/Disabled status of the asset. */
  enabled?: boolean;
  /** Asset id provided by the customer. */
  externalAssetId?: string;
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the asset. */
  description?: string;
  /** A reference to the asset endpoint profile (connection information) used by brokers to connect to an endpoint that provides data points for this asset. Must have the format <ModuleCR.metadata.namespace>/<ModuleCR.metadata.name>. */
  assetEndpointProfileUri: string;
  /** An integer that is incremented each time the resource is modified. */
  readonly version?: number;
  /** Asset manufacturer name. */
  manufacturer?: string;
  /** Asset manufacturer URI. */
  manufacturerUri?: string;
  /** Asset model name. */
  model?: string;
  /** Asset product code. */
  productCode?: string;
  /** Revision number of the hardware. */
  hardwareRevision?: string;
  /** Revision number of the software. */
  softwareRevision?: string;
  /** Reference to the documentation. */
  documentationUri?: string;
  /** Asset serial number. */
  serialNumber?: string;
  /** A set of key-value pairs that contain custom attributes set by the customer. */
  attributes?: Record<string, any>;
  /** Protocol-specific default configuration for all data points. Each data point can have its own configuration that overrides the default settings here. This assumes that each asset instance has one protocol. */
  defaultDataPointsConfiguration?: string;
  /** Protocol-specific default configuration for all events. Each event can have its own configuration that overrides the default settings here. This assumes that each asset instance has one protocol. */
  defaultEventsConfiguration?: string;
  /** Array of data points that are part of the asset. Each data point can reference an asset type capability and have per-data point configuration. See below for more details for the definition of the dataPoints element. */
  dataPoints?: Array<DataPointOutput>;
  /** Array of events that are part of the asset. Each event can reference an asset type capability and have per-event configuration. See below for more details about the definition of the events element. */
  events?: Array<EventOutput>;
  /** Read only object to reflect changes that have occurred on the Edge. Similar to Kubernetes status property for custom resources. */
  readonly status?: AssetStatusOutput;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningStateOutput;
}

/** Defines the data point properties. */
export interface DataPointOutput {
  /** The name of the data point. */
  name?: string;
  /** The address of the source of the data in the asset (e.g. URL) so that a client can access the data source on the asset. */
  dataSource: string;
  /** The path to the type definition of the capability (e.g. DTMI, OPC UA information model node id, etc.), for example dtmi:com:example:Robot:_contents:__prop1;1. */
  capabilityId?: string;
  /** An indication of how the data point should be mapped to OpenTelemetry. */
  observabilityMode?: DataPointsObservabilityModeOutput;
  /** Protocol-specific configuration for the data point. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  dataPointConfiguration?: string;
}

/** Defines the event properties. */
export interface EventOutput {
  /** The name of the event. */
  name?: string;
  /** The address of the notifier of the event in the asset (e.g. URL) so that a client can access the event on the asset. */
  eventNotifier: string;
  /** The path to the type definition of the capability (e.g. DTMI, OPC UA information model node id, etc.), for example dtmi:com:example:Robot:_contents:__prop1;1. */
  capabilityId?: string;
  /** An indication of how the event should be mapped to OpenTelemetry. */
  observabilityMode?: EventsObservabilityModeOutput;
  /** Protocol-specific configuration for the event. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  eventConfiguration?: string;
}

/** Defines the asset status properties. */
export interface AssetStatusOutput {
  /** Array object to transfer and persist errors that originate from the Edge. */
  errors?: Array<AssetStatusErrorOutput>;
  /** A read only incremental counter indicating the number of times the configuration has been modified from the perspective of the current actual (Edge) state of the Asset. Edge would be the only writer of this value and would sync back up to the cloud. In steady state, this should equal version. */
  version?: number;
}

/** Defines the asset status error properties. */
export interface AssetStatusErrorOutput {
  /** Error code for classification of errors (ex: 400, 404, 500, etc.). */
  code?: number;
  /** Human readable helpful error message to provide additional context for error (ex: “capability Id 'foo' does not exist”). */
  message?: string;
}

/** The extended location. */
export interface ExtendedLocationOutput {
  /** The extended location type. */
  type: string;
  /** The extended location name. */
  name: string;
}

/** The resource model definition for an Azure Resource Manager tracked top level resource */
export interface TrackedResourceBaseOutput extends ArmResourceOutput {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** Common properties for all Azure Resource Manager resources. */
export interface ArmResourceOutput extends ArmResourceBaseOutput {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemDataOutput;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemDataOutput {
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /** The type of identity that created the resource. */
  readonly createdByType?: CreatedByTypeOutput;
  /** The type of identity that created the resource. */
  readonly createdAt?: string;
  /** The identity that last modified the resource. */
  readonly lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  readonly lastModifiedByType?: CreatedByTypeOutput;
  /** The timestamp of resource last modification (UTC) */
  readonly lastModifiedAt?: string;
}

/** Base class used for type definitions */
export interface ArmResourceBaseOutput {}

/** The base proxy resource. */
export interface ProxyResourceBaseOutput extends ArmResourceOutput {}

/** The private endpoint connection resource */
export interface PrivateEndpointConnectionOutput
  extends ProxyResourceBaseOutput {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionPropertiesOutput;
}

/** Properties of he private endpoint connection resource */
export interface PrivateEndpointConnectionPropertiesOutput {
  /** The group identifiers for the private endpoint resource */
  readonly groupIds?: string[];
  /** The private endpoint resource */
  privateEndpoint?: PrivateEndpointOutput;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionStateOutput;
  /** The provisioning state of the private endpoint connection resource. */
  provisioningState?: PrivateEndpointConnectionProvisioningStateOutput;
}

/** The private endpoint resource */
export interface PrivateEndpointOutput {
  /** The resource identifier for private endpoint */
  id?: string;
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionStateOutput {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatusOutput;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export interface PrivateLinkResourceOutput extends ProxyResourceBaseOutput {
  /** Properties of the private link resource. */
  properties?: PrivateLinkResourcePropertiesOutput;
}

/** Properties of a private link resource. */
export interface PrivateLinkResourcePropertiesOutput {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

/** The base extension resource. */
export interface ExtensionResourceBaseOutput extends ArmResourceOutput {}

/** Asset Endpoint Profile definition. */
export interface AssetEndpointProfileOutput extends TrackedResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: AssetEndpointProfilePropertiesOutput;
  /** The extended location. */
  extendedLocation: ExtendedLocationOutput;
}

/** Defines the Asset Endpoint Profile properties. */
export interface AssetEndpointProfilePropertiesOutput {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** The local valid URI specifying the network address/DNS name of a southbound device. The scheme part of the targetAddress URI specifies the type of the device. The additionalConfiguration field holds further connector type specific configuration. */
  targetAddress: string;
  /** Defines the client authentication mechanism to the server. */
  userAuthentication?: UserAuthenticationOutput;
  /** Defines the authentication mechanism for the southbound connector connecting to the shop floor/OT device. */
  transportAuthentication?: TransportAuthenticationOutput;
  /** Contains connectivity type specific further configuration (e.g. OPC UA, Modbus, ONVIF). */
  additionalConfiguration?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningStateOutput;
}

/** Definition of the client authentication mechanism to the server. */
export interface UserAuthenticationOutput {
  /** Defines the mode to authenticate the user of the client at the server. */
  mode: UserAuthenticationModeOutput;
  /** Defines the username and password references when UsernamePassword user authentication mode is selected. */
  usernamePasswordCredentials?: UsernamePasswordCredentialsOutput;
  /** Defines the certificate reference when Certificate user authentication mode is selected. */
  x509Credentials?: X509CredentialsOutput;
}

/** The credentials for authentication mode UsernamePassword. */
export interface UsernamePasswordCredentialsOutput {
  /** A reference to secret containing the username. */
  usernameReference: string;
  /** A reference to secret containing the password. */
  passwordReference: string;
}

/** The x509 certificate for authentication mode Certificate. */
export interface X509CredentialsOutput {
  /** A reference to secret containing the certificate and private key (e.g. stored as .der/.pem or .der/.pfx). */
  certificateReference: string;
}

/** Definition of the authentication mechanism for the southbound connector. */
export interface TransportAuthenticationOutput {
  /** Defines a reference to a secret which contains all certificates and private keys that can be used by the southbound connector connecting to the shop floor/OT device. The accepted extensions are .der for certificates and .pfx/.pem for private keys. */
  ownCertificates: Array<OwnCertificateOutput>;
}

/** Certificate or private key that can be used by the southbound connector connecting to the shop floor/OT device. The accepted extensions are .der for certificates and .pfx/.pem for private keys. */
export interface OwnCertificateOutput {
  /** Certificate thumbprint. */
  certThumbprint?: string;
  /** Secret Reference name (cert and private key). */
  certSecretReference?: string;
  /** Secret Reference Name (Pfx or Pem password). */
  certPasswordReference?: string;
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export type PagedOperationOutput = Paged<OperationOutput>;
/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export type OriginOutput = "user" | "system" | "user,system";
/** Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export type ActionTypeOutput = "Internal";
/** Alias for DataPointsObservabilityModeOutput */
export type DataPointsObservabilityModeOutput =
  | string
  | "none"
  | "counter"
  | "gauge"
  | "histogram"
  | "log";
/** Alias for EventsObservabilityModeOutput */
export type EventsObservabilityModeOutput = string | "none" | "log";
/** The provisioning state of a resource type. */
export type ResourceProvisioningStateOutput =
  | "Succeeded"
  | "Failed"
  | "Canceled";
/** Alias for ProvisioningStateOutput */
export type ProvisioningStateOutput =
  | string
  | ResourceProvisioningStateOutput
  | "Accepted";
/** The kind of entity that created the resource. */
export type CreatedByTypeOutput =
  | "User"
  | "Application"
  | "ManagedIdentity"
  | "Key";
/** The private endpoint connection status */
export type PrivateEndpointServiceConnectionStatusOutput =
  | "Pending"
  | "Approved"
  | "Rejected";
/** The provisioning state of the connection */
export type PrivateEndpointConnectionProvisioningStateOutput =
  | "Succeeded"
  | "Failed"
  | "Canceled"
  | "Creating"
  | "Deleting";
/** Alias for UserAuthenticationModeOutput */
export type UserAuthenticationModeOutput =
  | string
  | "Anonymous"
  | "Certificate"
  | "UsernamePassword";
/** The response of a Asset list operation. */
export type AssetListResultOutput = Paged<AssetOutput>;
/** The response of a AssetEndpointProfile list operation. */
export type AssetEndpointProfileListResultOutput =
  Paged<AssetEndpointProfileOutput>;
