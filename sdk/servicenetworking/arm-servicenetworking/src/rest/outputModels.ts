// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

/** Association Subresource of Traffic Controller */
export interface AssociationOutput extends TrackedResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: AssociationPropertiesOutput;
}

/** Association Properties. */
export interface AssociationPropertiesOutput {
  /** Association Type */
  associationType: AssociationTypeOutput;
  /** Association Subnet */
  subnet?: AssociationSubnetOutput;
  /** Provisioning State of Traffic Controller Association Resource */
  readonly provisioningState?: ProvisioningStateOutput;
}

/** Association Subnet. */
export interface AssociationSubnetOutput {
  /** Association ID. */
  id: string;
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
  /**
   * The type of identity that created the resource.
   *
   * Possible values: "User", "Application", "ManagedIdentity", "Key"
   */
  readonly createdByType?: string;
  /** The type of identity that created the resource. */
  readonly createdAt?: string;
  /** The identity that last modified the resource. */
  readonly lastModifiedBy?: string;
  /**
   * The type of identity that last modified the resource.
   *
   * Possible values: "User", "Application", "ManagedIdentity", "Key"
   */
  readonly lastModifiedByType?: string;
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
  /**
   * The provisioning state of the private endpoint connection resource.
   *
   * Possible values: "Succeeded", "Failed", "Canceled", "Creating", "Deleting"
   */
  provisioningState?: string;
}

/** The private endpoint resource */
export interface PrivateEndpointOutput {
  /** The resource identifier for private endpoint */
  id?: string;
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionStateOutput {
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

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface TrafficControllerOutput extends TrackedResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: TrafficControllerPropertiesOutput;
}

/** Traffic Controller Properties. */
export interface TrafficControllerPropertiesOutput {
  /** Configuration Endpoints. */
  readonly configurationEndpoints?: string[];
  /** Frontends References List */
  readonly frontends?: Array<ResourceIdOutput>;
  /** Associations References List */
  readonly associations?: Array<ResourceIdOutput>;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningStateOutput;
}

/** Resource ID definition used by parent to reference child resources. */
export interface ResourceIdOutput {
  /** Resource ID of child resource. */
  id: string;
}

/** Frontend Subresource of Traffic Controller. */
export interface FrontendOutput extends TrackedResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: FrontendPropertiesOutput;
}

/** Frontend Properties. */
export interface FrontendPropertiesOutput {
  /** The Fully Qualified Domain Name of the DNS record associated to a Traffic Controller frontend. */
  readonly fqdn?: string;
  /** Provisioning State of Traffic Controller Frontend Resource */
  readonly provisioningState?: ProvisioningStateOutput;
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

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface OperationOutput {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplayOutput;
  /**
   * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system"
   *
   * Possible values: "user", "system", "user,system"
   */
  readonly origin?: string;
  /**
   * Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs.
   *
   * Possible values: "Internal"
   */
  actionType?: string;
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

/** Alias for AssociationTypeOutput */
export type AssociationTypeOutput = string | "subnets";
/** Alias for ProvisioningStateOutput */
export type ProvisioningStateOutput =
  | string
  | "Provisioning"
  | "Updating"
  | "Deleting"
  | "Accepted"
  | "Succeeded"
  | "Failed"
  | "Canceled";
/** The response of a Association list operation. */
export type AssociationListResultOutput = Paged<AssociationOutput>;
/** The response of a Frontend list operation. */
export type FrontendListResultOutput = Paged<FrontendOutput>;
/** The response of a TrafficController list operation. */
export type TrafficControllerListResultOutput = Paged<TrafficControllerOutput>;
/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export type PagedOperationOutput = Paged<OperationOutput>;
