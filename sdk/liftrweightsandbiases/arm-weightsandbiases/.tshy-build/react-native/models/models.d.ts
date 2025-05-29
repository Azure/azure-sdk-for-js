/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface InstanceResource extends TrackedResource {
    /** The resource-specific properties for this resource. */
    properties?: InstanceProperties;
    /** The managed service identities assigned to this resource. */
    identity?: ManagedServiceIdentity;
}
export declare function instanceResourceSerializer(item: InstanceResource): any;
export declare function instanceResourceDeserializer(item: any): InstanceResource;
/** Properties specific to Instance */
export interface InstanceProperties {
    /** Marketplace details of the resource. */
    marketplace: MarketplaceDetails;
    /** Details of the user. */
    user: UserDetails;
    /** Provisioning state of the resource. */
    readonly provisioningState?: ResourceProvisioningState;
    /** partner properties */
    partnerProperties?: PartnerProperties;
    /** Single sign-on properties */
    singleSignOnProperties?: SingleSignOnPropertiesV2;
}
export declare function instancePropertiesSerializer(item: InstanceProperties): any;
export declare function instancePropertiesDeserializer(item: any): InstanceProperties;
/** Marketplace details for an organization */
export interface MarketplaceDetails {
    /** Azure subscription id for the the marketplace offer is purchased from */
    subscriptionId?: string;
    /** Marketplace subscription status */
    readonly subscriptionStatus?: MarketplaceSubscriptionStatus;
    /** Offer details for the marketplace that is selected by the user */
    offerDetails: OfferDetails;
}
export declare function marketplaceDetailsSerializer(item: MarketplaceDetails): any;
export declare function marketplaceDetailsDeserializer(item: any): MarketplaceDetails;
/** Marketplace subscription status of a resource. */
export declare enum KnownMarketplaceSubscriptionStatus {
    /** Purchased but not yet activated */
    PendingFulfillmentStart = "PendingFulfillmentStart",
    /** Marketplace subscription is activated */
    Subscribed = "Subscribed",
    /** This state indicates that a customer's payment for the Marketplace service was not received */
    Suspended = "Suspended",
    /** Customer has cancelled the subscription */
    Unsubscribed = "Unsubscribed"
}
/**
 * Marketplace subscription status of a resource. \
 * {@link KnownMarketplaceSubscriptionStatus} can be used interchangeably with MarketplaceSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingFulfillmentStart**: Purchased but not yet activated \
 * **Subscribed**: Marketplace subscription is activated \
 * **Suspended**: This state indicates that a customer's payment for the Marketplace service was not received \
 * **Unsubscribed**: Customer has cancelled the subscription
 */
export type MarketplaceSubscriptionStatus = string;
/** Offer details for the marketplace that is selected by the user */
export interface OfferDetails {
    /** Publisher Id for the marketplace offer */
    publisherId: string;
    /** Offer Id for the marketplace offer */
    offerId: string;
    /** Plan Id for the marketplace offer */
    planId: string;
    /** Plan Name for the marketplace offer */
    planName?: string;
    /** Plan Display Name for the marketplace offer */
    termUnit?: string;
    /** Plan Display Name for the marketplace offer */
    termId?: string;
}
export declare function offerDetailsSerializer(item: OfferDetails): any;
export declare function offerDetailsDeserializer(item: any): OfferDetails;
/** User details for an organization */
export interface UserDetails {
    /** First name of the user */
    firstName?: string;
    /** Last name of the user */
    lastName?: string;
    /** Email address of the user */
    emailAddress?: string;
    /** User's principal name */
    upn?: string;
    /** User's phone number */
    phoneNumber?: string;
}
export declare function userDetailsSerializer(item: UserDetails): any;
export declare function userDetailsDeserializer(item: any): UserDetails;
/** The provisioning state of a resource type. */
export declare enum KnownResourceProvisioningState {
    /** Resource has been created. */
    Succeeded = "Succeeded",
    /** Resource creation failed. */
    Failed = "Failed",
    /** Resource creation was canceled. */
    Canceled = "Canceled"
}
/**
 * The provisioning state of a resource type. \
 * {@link KnownResourceProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ResourceProvisioningState = string;
/** Partner's specific Properties */
export interface PartnerProperties {
    /** The region of the instance */
    region: Region;
    /** The subdomain of the instance */
    subdomain: string;
}
export declare function partnerPropertiesSerializer(item: PartnerProperties): any;
export declare function partnerPropertiesDeserializer(item: any): PartnerProperties;
/** The available regions */
export declare enum KnownRegion {
    /** Region: East US */
    Eastus = "eastus",
    /** Region: Central US */
    Centralus = "centralus",
    /** Region: West US */
    Westus = "westus",
    /** Region: West Europe */
    Westeurope = "westeurope",
    /** Region: Japan East */
    Japaneast = "japaneast",
    /** Region: Korea Central */
    Koreacentral = "koreacentral"
}
/**
 * The available regions \
 * {@link KnownRegion} can be used interchangeably with Region,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **eastus**: Region: East US \
 * **centralus**: Region: Central US \
 * **westus**: Region: West US \
 * **westeurope**: Region: West Europe \
 * **japaneast**: Region: Japan East \
 * **koreacentral**: Region: Korea Central
 */
export type Region = string;
/** Properties specific to Single Sign On Resource */
export interface SingleSignOnPropertiesV2 {
    /** Type of Single Sign-On mechanism being used */
    type: SingleSignOnType;
    /** State of the Single Sign On for the resource */
    state?: SingleSignOnStates;
    /** AAD enterprise application Id used to setup SSO */
    enterpriseAppId?: string;
    /** URL for SSO to be used by the partner to redirect the user to their system */
    url?: string;
    /** List of AAD domains fetched from Microsoft Graph for user. */
    aadDomains?: string[];
}
export declare function singleSignOnPropertiesV2Serializer(item: SingleSignOnPropertiesV2): any;
export declare function singleSignOnPropertiesV2Deserializer(item: any): SingleSignOnPropertiesV2;
/** Defines the type of Single Sign-On (SSO) mechanism being used */
export declare enum KnownSingleSignOnType {
    /** Security Assertion Markup Language (SAML) based Single Sign-On */
    Saml = "Saml",
    /** OpenID Connect based Single Sign-On. */
    OpenId = "OpenId"
}
/**
 * Defines the type of Single Sign-On (SSO) mechanism being used \
 * {@link KnownSingleSignOnType} can be used interchangeably with SingleSignOnType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Saml**: Security Assertion Markup Language (SAML) based Single Sign-On \
 * **OpenId**: OpenID Connect based Single Sign-On.
 */
export type SingleSignOnType = string;
/** Various states of the SSO resource */
export declare enum KnownSingleSignOnStates {
    /** Initial state of the SSO resource */
    Initial = "Initial",
    /** State of the SSO resource when it is enabled */
    Enable = "Enable",
    /** State of the SSO resource when it is disabled */
    Disable = "Disable"
}
/**
 * Various states of the SSO resource \
 * {@link KnownSingleSignOnStates} can be used interchangeably with SingleSignOnStates,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initial**: Initial state of the SSO resource \
 * **Enable**: State of the SSO resource when it is enabled \
 * **Disable**: State of the SSO resource when it is disabled
 */
export type SingleSignOnStates = string;
/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
    /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
    readonly principalId?: string;
    /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
    readonly tenantId?: string;
    /** The type of managed identity assigned to this resource. */
    type: ManagedServiceIdentityType;
    /** The identities assigned to this resource by the user. */
    userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}
export declare function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any;
export declare function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity;
/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export declare enum KnownManagedServiceIdentityType {
    /** No managed identity. */
    None = "None",
    /** System assigned managed identity. */
    SystemAssigned = "SystemAssigned",
    /** User assigned managed identity. */
    UserAssigned = "UserAssigned",
    /** System and user assigned managed identity. */
    SystemAssignedUserAssigned = "SystemAssigned,UserAssigned"
}
/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;
/** User assigned identity properties */
export interface UserAssignedIdentity {
    /** The client ID of the assigned identity. */
    readonly clientId?: string;
    /** The principal ID of the assigned identity. */
    readonly principalId?: string;
}
export declare function userAssignedIdentitySerializer(item: UserAssignedIdentity): any;
export declare function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity;
/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
    /** Resource tags. */
    tags?: Record<string, string>;
    /** The geo-location where the resource lives */
    location: string;
}
export declare function trackedResourceSerializer(item: TrackedResource): any;
export declare function trackedResourceDeserializer(item: any): TrackedResource;
/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
    /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
    readonly id?: string;
    /** The name of the resource */
    readonly name?: string;
    /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
    readonly type?: string;
    /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
    readonly systemData?: SystemData;
}
export declare function resourceSerializer(item: Resource): any;
export declare function resourceDeserializer(item: any): Resource;
/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
    /** The identity that created the resource. */
    createdBy?: string;
    /** The type of identity that created the resource. */
    createdByType?: CreatedByType;
    /** The timestamp of resource creation (UTC). */
    createdAt?: Date;
    /** The identity that last modified the resource. */
    lastModifiedBy?: string;
    /** The type of identity that last modified the resource. */
    lastModifiedByType?: CreatedByType;
    /** The timestamp of resource last modification (UTC) */
    lastModifiedAt?: Date;
}
export declare function systemDataDeserializer(item: any): SystemData;
/** The kind of entity that created the resource. */
export declare enum KnownCreatedByType {
    /** The entity was created by a user. */
    User = "User",
    /** The entity was created by an application. */
    Application = "Application",
    /** The entity was created by a managed identity. */
    ManagedIdentity = "ManagedIdentity",
    /** The entity was created by a key. */
    Key = "Key"
}
/**
 * The kind of entity that created the resource. \
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;
/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
    /** The error object. */
    error?: ErrorDetail;
}
export declare function errorResponseDeserializer(item: any): ErrorResponse;
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
export declare function errorDetailDeserializer(item: any): ErrorDetail;
export declare function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[];
export declare function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[];
/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
    /** The additional info type. */
    readonly type?: string;
    /** The additional info. */
    readonly info?: Record<string, any>;
}
export declare function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo;
/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {
}
export declare function _errorAdditionalInfoInfoDeserializer(item: any): _ErrorAdditionalInfoInfo;
/** The type used for update operations of the Instance Resource. */
export interface InstanceResourceUpdate {
    /** Resource tags. */
    tags?: Record<string, string>;
    /** The managed service identities assigned to this resource. */
    identity?: ManagedServiceIdentity;
}
export declare function instanceResourceUpdateSerializer(item: InstanceResourceUpdate): any;
/** The response of a InstanceResource list operation. */
export interface _InstanceResourceListResult {
    /** The InstanceResource items on this page */
    value: InstanceResource[];
    /** The link to the next page of items */
    nextLink?: string;
}
export declare function _instanceResourceListResultDeserializer(item: any): _InstanceResourceListResult;
export declare function instanceResourceArraySerializer(result: Array<InstanceResource>): any[];
export declare function instanceResourceArrayDeserializer(result: Array<InstanceResource>): any[];
/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
    /** The Operation items on this page */
    value: Operation[];
    /** The link to the next page of items */
    nextLink?: string;
}
export declare function _operationListResultDeserializer(item: any): _OperationListResult;
export declare function operationArrayDeserializer(result: Array<Operation>): any[];
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
    /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
    readonly actionType?: ActionType;
}
export declare function operationDeserializer(item: any): Operation;
/** Localized display information for and operation. */
export interface OperationDisplay {
    /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
    readonly provider?: string;
    /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
    readonly resource?: string;
    /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
    readonly operation?: string;
    /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
    readonly description?: string;
}
export declare function operationDisplayDeserializer(item: any): OperationDisplay;
/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export declare enum KnownOrigin {
    /** Indicates the operation is initiated by a user. */
    User = "user",
    /** Indicates the operation is initiated by a system. */
    System = "system",
    /** Indicates the operation is initiated by a user or system. */
    UserSystem = "user,system"
}
/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;
/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export declare enum KnownActionType {
    /** Actions are for internal-only APIs. */
    Internal = "Internal"
}
/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;
/** The available API versions. */
export declare enum KnownVersions {
    /** 2024-09-18 version */
    V20240918Preview = "2024-09-18-preview"
}
//# sourceMappingURL=models.d.ts.map