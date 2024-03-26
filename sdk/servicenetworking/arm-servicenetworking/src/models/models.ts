// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface PagedOperation {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  description?: string;
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
/** "user", "system", "user,system" */
export type Origin = string;
/** Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
/** "Internal" */
export type ActionType = string;

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

/** Base class used for type definitions */
export interface ArmResourceBase {}

/** Common properties for all Azure Resource Manager resources. */
export interface ArmResource extends ArmResourceBase {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /** The type of identity that created the resource. */
  readonly createdByType?: createdByType;
  /** The type of identity that created the resource. */
  readonly createdAt?: Date;
  /** The identity that last modified the resource. */
  readonly lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  readonly lastModifiedByType?: createdByType;
  /** The timestamp of resource last modification (UTC) */
  readonly lastModifiedAt?: Date;
}

/** The kind of entity that created the resource. */
/** "User", "Application", "ManagedIdentity", "Key" */
export type createdByType = string;

/** The resource model definition for an Azure Resource Manager tracked top level resource */
export interface TrackedResourceBase extends ArmResource {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface TrafficController extends TrackedResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: TrafficControllerProperties;
}

/** Traffic Controller Properties. */
export interface TrafficControllerProperties {
  /** Configuration Endpoints. */
  readonly configurationEndpoints?: string[];
  /** Frontends References List */
  readonly frontends?: ResourceId[];
  /** Associations References List */
  readonly associations?: ResourceId[];
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

/** Resource ID definition used by parent to reference child resources. */
export interface ResourceId {
  /** Resource ID of child resource. */
  id: string;
}

/** Type of ProvisioningState */
/** "Provisioning", "Updating", "Deleting", "Accepted", "Succeeded", "Failed", "Canceled" */
export type ProvisioningState = string;

/** The type used for update operations of the TrafficController. */
export interface TrafficControllerUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** The provisioning state of a resource type. */
/** "Succeeded", "Failed", "Canceled" */
export type ResourceProvisioningState = string;

/** The response of a TrafficController list operation. */
export interface TrafficControllerListResult {
  /** The TrafficController items on this page */
  value: TrafficController[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** Frontend Subresource of Traffic Controller. */
export interface Frontend extends TrackedResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: FrontendProperties;
}

/** Frontend Properties. */
export interface FrontendProperties {
  /** The Fully Qualified Domain Name of the DNS record associated to a Traffic Controller frontend. */
  readonly fqdn?: string;
  /** Provisioning State of Traffic Controller Frontend Resource */
  readonly provisioningState?: ProvisioningState;
}

/** The type used for update operations of the Frontend. */
export interface FrontendUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** The response of a Frontend list operation. */
export interface FrontendListResult {
  /** The Frontend items on this page */
  value: Frontend[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

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
  /** Provisioning State of Traffic Controller Association Resource */
  readonly provisioningState?: ProvisioningState;
}

/** Type of AssociationType */
/** "subnets" */
export type AssociationType = string;

/** Association Subnet. */
export interface AssociationSubnet {
  /** Association ID. */
  id: string;
}

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

/** The response of a Association list operation. */
export interface AssociationListResult {
  /** The Association items on this page */
  value: Association[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}
