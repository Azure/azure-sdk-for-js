// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
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
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

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

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
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
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

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

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Address Resource. */
export interface AddressResource extends TrackedResource {
  /** Properties of an address. */
  properties: AddressProperties;
}

export function addressResourceSerializer(item: AddressResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: addressPropertiesSerializer(item["properties"]),
  };
}

export function addressResourceDeserializer(item: any): AddressResource {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: addressPropertiesDeserializer(item["properties"]),
  };
}

/** Address Properties. */
export interface AddressProperties {
  /** Type of address based on its usage context. */
  addressClassification?: AddressClassification;
  /** Shipping details for the address. */
  shippingAddress?: ShippingAddress;
  /** Contact details for the address. */
  contactDetails?: ContactDetails;
  /** Status of address validation. */
  readonly addressValidationStatus?: AddressValidationStatus;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
}

export function addressPropertiesSerializer(item: AddressProperties): any {
  return {
    addressClassification: item["addressClassification"],
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressSerializer(item["shippingAddress"]),
    contactDetails: !item["contactDetails"]
      ? item["contactDetails"]
      : contactDetailsSerializer(item["contactDetails"]),
  };
}

export function addressPropertiesDeserializer(item: any): AddressProperties {
  return {
    addressClassification: item["addressClassification"],
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressDeserializer(item["shippingAddress"]),
    contactDetails: !item["contactDetails"]
      ? item["contactDetails"]
      : contactDetailsDeserializer(item["contactDetails"]),
    addressValidationStatus: item["addressValidationStatus"],
    provisioningState: item["provisioningState"],
  };
}

/** Type of address based on its usage context. */
export enum KnownAddressClassification {
  /** Shipping address for the order. */
  Shipping = "Shipping",
  /** Site Address. */
  Site = "Site",
}

/**
 * Type of address based on its usage context. \
 * {@link KnownAddressClassification} can be used interchangeably with AddressClassification,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Shipping**: Shipping address for the order. \
 * **Site**: Site Address.
 */
export type AddressClassification = string;

/** Shipping address where customer wishes to receive the device. */
export interface ShippingAddress {
  /** Street Address line 1. */
  streetAddress1?: string;
  /** Street Address line 2. */
  streetAddress2?: string;
  /** Street Address line 3. */
  streetAddress3?: string;
  /** Name of the City. */
  city?: string;
  /** Name of the State or Province. */
  stateOrProvince?: string;
  /** Name of the Country. */
  country: string;
  /** Postal code. */
  postalCode?: string;
  /** Extended Zip Code. */
  zipExtendedCode?: string;
  /** Name of the company. */
  companyName?: string;
  /** Type of address. */
  addressType?: AddressType;
}

export function shippingAddressSerializer(item: ShippingAddress): any {
  return {
    streetAddress1: item["streetAddress1"],
    streetAddress2: item["streetAddress2"],
    streetAddress3: item["streetAddress3"],
    city: item["city"],
    stateOrProvince: item["stateOrProvince"],
    country: item["country"],
    postalCode: item["postalCode"],
    zipExtendedCode: item["zipExtendedCode"],
    companyName: item["companyName"],
    addressType: item["addressType"],
  };
}

export function shippingAddressDeserializer(item: any): ShippingAddress {
  return {
    streetAddress1: item["streetAddress1"],
    streetAddress2: item["streetAddress2"],
    streetAddress3: item["streetAddress3"],
    city: item["city"],
    stateOrProvince: item["stateOrProvince"],
    country: item["country"],
    postalCode: item["postalCode"],
    zipExtendedCode: item["zipExtendedCode"],
    companyName: item["companyName"],
    addressType: item["addressType"],
  };
}

/** Type of address. */
export enum KnownAddressType {
  /** Address type not known. */
  None = "None",
  /** Residential Address. */
  Residential = "Residential",
  /** Commercial Address. */
  Commercial = "Commercial",
}

/**
 * Type of address. \
 * {@link KnownAddressType} can be used interchangeably with AddressType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Address type not known. \
 * **Residential**: Residential Address. \
 * **Commercial**: Commercial Address.
 */
export type AddressType = string;

/** Contact Details. */
export interface ContactDetails {
  /** Contact name of the person. */
  contactName?: string;
  /** Phone number of the contact person. */
  phone?: string;
  /** Phone extension number of the contact person. */
  phoneExtension?: string;
  /** Mobile number of the contact person. */
  mobile?: string;
  /** List of Email-ids to be notified about job progress. */
  emailList?: string[];
}

export function contactDetailsSerializer(item: ContactDetails): any {
  return {
    contactName: item["contactName"],
    phone: item["phone"],
    phoneExtension: item["phoneExtension"],
    mobile: item["mobile"],
    emailList: !item["emailList"]
      ? item["emailList"]
      : item["emailList"].map((p: any) => {
          return p;
        }),
  };
}

export function contactDetailsDeserializer(item: any): ContactDetails {
  return {
    contactName: item["contactName"],
    phone: item["phone"],
    phoneExtension: item["phoneExtension"],
    mobile: item["mobile"],
    emailList: !item["emailList"]
      ? item["emailList"]
      : item["emailList"].map((p: any) => {
          return p;
        }),
  };
}

/** Status of address validation. */
export enum KnownAddressValidationStatus {
  /** Address provided is valid. */
  Valid = "Valid",
  /** Address provided is invalid or not supported. */
  Invalid = "Invalid",
  /** Address provided is ambiguous, please choose one of the alternate addresses returned. */
  Ambiguous = "Ambiguous",
}

/**
 * Status of address validation. \
 * {@link KnownAddressValidationStatus} can be used interchangeably with AddressValidationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Valid**: Address provided is valid. \
 * **Invalid**: Address provided is invalid or not supported. \
 * **Ambiguous**: Address provided is ambiguous, please choose one of the alternate addresses returned.
 */
export type AddressValidationStatus = string;

/** Provisioning state */
export enum KnownProvisioningState {
  /** Creating state. */
  Creating = "Creating",
  /** Succeeded state. */
  Succeeded = "Succeeded",
  /** Failed state. */
  Failed = "Failed",
  /** Canceled state. */
  Canceled = "Canceled",
}

/**
 * Provisioning state \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating state. \
 * **Succeeded**: Succeeded state. \
 * **Failed**: Failed state. \
 * **Canceled**: Canceled state.
 */
export type ProvisioningState = string;

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: item["tags"],
    location: item["location"],
  };
}

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

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

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

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
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

/** The Address update parameters. */
export interface AddressUpdateParameter {
  /** Properties of an address to be updated. */
  properties?: AddressUpdateProperties;
  /** The list of key value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). */
  tags?: Record<string, string>;
}

export function addressUpdateParameterSerializer(item: AddressUpdateParameter): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : addressUpdatePropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Address Update Properties. */
export interface AddressUpdateProperties {
  /** Shipping details for the address. */
  shippingAddress?: ShippingAddress;
  /** Contact details for the address. */
  contactDetails?: ContactDetails;
}

export function addressUpdatePropertiesSerializer(item: AddressUpdateProperties): any {
  return {
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressSerializer(item["shippingAddress"]),
    contactDetails: !item["contactDetails"]
      ? item["contactDetails"]
      : contactDetailsSerializer(item["contactDetails"]),
  };
}

/** Address Resource Collection. */
export interface _AddressResourceList {
  /** The AddressResource items on this page */
  readonly value: AddressResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _addressResourceListDeserializer(item: any): _AddressResourceList {
  return {
    value: addressResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function addressResourceArraySerializer(result: Array<AddressResource>): any[] {
  return result.map((item) => {
    return addressResourceSerializer(item);
  });
}

export function addressResourceArrayDeserializer(result: Array<AddressResource>): any[] {
  return result.map((item) => {
    return addressResourceDeserializer(item);
  });
}

/** Represents order item resource. */
export interface OrderItemResource extends TrackedResource {
  /** Order item properties. */
  properties: OrderItemProperties;
  /** Msi identity of the resource */
  identity?: ResourceIdentity;
}

export function orderItemResourceSerializer(item: OrderItemResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: orderItemPropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
  };
}

export function orderItemResourceDeserializer(item: any): OrderItemResource {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: orderItemPropertiesDeserializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : resourceIdentityDeserializer(item["identity"]),
  };
}

/** Represents order item properties. */
export interface OrderItemProperties {
  /** Represents order item details. */
  orderItemDetails: OrderItemDetails;
  /** Represents shipping and return address for order item. */
  addressDetails?: AddressDetails;
  /** Start time of order item. */
  readonly startTime?: Date;
  /** Id of the order to which order item belongs to. */
  orderId: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
}

export function orderItemPropertiesSerializer(item: OrderItemProperties): any {
  return {
    orderItemDetails: orderItemDetailsSerializer(item["orderItemDetails"]),
    addressDetails: !item["addressDetails"]
      ? item["addressDetails"]
      : addressDetailsSerializer(item["addressDetails"]),
    orderId: item["orderId"],
  };
}

export function orderItemPropertiesDeserializer(item: any): OrderItemProperties {
  return {
    orderItemDetails: orderItemDetailsDeserializer(item["orderItemDetails"]),
    addressDetails: !item["addressDetails"]
      ? item["addressDetails"]
      : addressDetailsDeserializer(item["addressDetails"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    orderId: item["orderId"],
    provisioningState: item["provisioningState"],
  };
}

/** Order item details. */
export interface OrderItemDetails {
  /** Represents product details. */
  productDetails: ProductDetails;
  /** Order item type. */
  orderItemType: OrderItemType;
  /** Defines the mode of the Order item. */
  orderItemMode?: OrderMode;
  /** Site Related Details. */
  siteDetails?: SiteDetails;
  /** Current Order item Status. */
  readonly currentStage?: StageDetails;
  /** Order item status history. */
  readonly orderItemStageHistory?: StageDetails[];
  /** Customer notification Preferences. */
  preferences?: Preferences;
  /** Forward Package Shipping details. */
  readonly forwardShippingDetails?: ForwardShippingDetails;
  /** Reverse Package Shipping details. */
  readonly reverseShippingDetails?: ReverseShippingDetails;
  /** Additional notification email list. */
  notificationEmailList?: string[];
  /** Cancellation reason. */
  readonly cancellationReason?: string;
  /** Describes whether the order item is cancellable or not. */
  readonly cancellationStatus?: OrderItemCancellationEnum;
  /** Describes whether the order item is deletable or not. */
  readonly deletionStatus?: ActionStatusEnum;
  /** Return reason. */
  readonly returnReason?: string;
  /** Describes whether the order item is returnable or not. */
  readonly returnStatus?: OrderItemReturnEnum;
  /** List of parent RP details supported for configuration. */
  readonly managementRpDetailsList?: ResourceProviderDetails[];
  /** Top level error for the job. */
  readonly error?: ErrorDetail;
}

export function orderItemDetailsSerializer(item: OrderItemDetails): any {
  return {
    productDetails: productDetailsSerializer(item["productDetails"]),
    orderItemType: item["orderItemType"],
    orderItemMode: item["orderItemMode"],
    siteDetails: !item["siteDetails"]
      ? item["siteDetails"]
      : siteDetailsSerializer(item["siteDetails"]),
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesSerializer(item["preferences"]),
    notificationEmailList: !item["notificationEmailList"]
      ? item["notificationEmailList"]
      : item["notificationEmailList"].map((p: any) => {
          return p;
        }),
  };
}

export function orderItemDetailsDeserializer(item: any): OrderItemDetails {
  return {
    productDetails: productDetailsDeserializer(item["productDetails"]),
    orderItemType: item["orderItemType"],
    orderItemMode: item["orderItemMode"],
    siteDetails: !item["siteDetails"]
      ? item["siteDetails"]
      : siteDetailsDeserializer(item["siteDetails"]),
    currentStage: !item["currentStage"]
      ? item["currentStage"]
      : stageDetailsDeserializer(item["currentStage"]),
    orderItemStageHistory: !item["orderItemStageHistory"]
      ? item["orderItemStageHistory"]
      : stageDetailsArrayDeserializer(item["orderItemStageHistory"]),
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesDeserializer(item["preferences"]),
    forwardShippingDetails: !item["forwardShippingDetails"]
      ? item["forwardShippingDetails"]
      : forwardShippingDetailsDeserializer(item["forwardShippingDetails"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsDeserializer(item["reverseShippingDetails"]),
    notificationEmailList: !item["notificationEmailList"]
      ? item["notificationEmailList"]
      : item["notificationEmailList"].map((p: any) => {
          return p;
        }),
    cancellationReason: item["cancellationReason"],
    cancellationStatus: item["cancellationStatus"],
    deletionStatus: item["deletionStatus"],
    returnReason: item["returnReason"],
    returnStatus: item["returnStatus"],
    managementRpDetailsList: !item["managementRpDetailsList"]
      ? item["managementRpDetailsList"]
      : resourceProviderDetailsArrayDeserializer(item["managementRpDetailsList"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Represents product details. */
export interface ProductDetails {
  /** Display details of the product. */
  displayInfo?: DisplayInfo;
  /** Hierarchy of the product which uniquely identifies the product. */
  hierarchyInformation: HierarchyInformation;
  /** Double encryption status of the configuration. Read-only field. */
  readonly productDoubleEncryptionStatus?: DoubleEncryptionStatus;
  /** Identification type of the configuration. */
  readonly identificationType?: IdentificationType;
  /** Device details of the parent configuration. */
  readonly parentDeviceDetails?: DeviceDetails;
  /** Device Provisioning Details for Parent. */
  parentProvisioningDetails?: ProvisioningDetails;
  /** List of additional configurations customer wants in the order item apart from the ones included in the base configuration. */
  optInAdditionalConfigurations?: AdditionalConfiguration[];
  /** Details of all child configurations that are part of the order item. */
  readonly childConfigurationDeviceDetails?: ConfigurationDeviceDetails[];
  /** Term Commitment Information of the Device. */
  readonly termCommitmentInformation?: TermCommitmentInformation;
}

export function productDetailsSerializer(item: ProductDetails): any {
  return {
    displayInfo: !item["displayInfo"]
      ? item["displayInfo"]
      : displayInfoSerializer(item["displayInfo"]),
    hierarchyInformation: hierarchyInformationSerializer(item["hierarchyInformation"]),
    parentProvisioningDetails: !item["parentProvisioningDetails"]
      ? item["parentProvisioningDetails"]
      : provisioningDetailsSerializer(item["parentProvisioningDetails"]),
    optInAdditionalConfigurations: !item["optInAdditionalConfigurations"]
      ? item["optInAdditionalConfigurations"]
      : additionalConfigurationArraySerializer(item["optInAdditionalConfigurations"]),
  };
}

export function productDetailsDeserializer(item: any): ProductDetails {
  return {
    displayInfo: !item["displayInfo"]
      ? item["displayInfo"]
      : displayInfoDeserializer(item["displayInfo"]),
    hierarchyInformation: hierarchyInformationDeserializer(item["hierarchyInformation"]),
    productDoubleEncryptionStatus: item["productDoubleEncryptionStatus"],
    identificationType: item["identificationType"],
    parentDeviceDetails: !item["parentDeviceDetails"]
      ? item["parentDeviceDetails"]
      : deviceDetailsDeserializer(item["parentDeviceDetails"]),
    parentProvisioningDetails: !item["parentProvisioningDetails"]
      ? item["parentProvisioningDetails"]
      : provisioningDetailsDeserializer(item["parentProvisioningDetails"]),
    optInAdditionalConfigurations: !item["optInAdditionalConfigurations"]
      ? item["optInAdditionalConfigurations"]
      : additionalConfigurationArrayDeserializer(item["optInAdditionalConfigurations"]),
    childConfigurationDeviceDetails: !item["childConfigurationDeviceDetails"]
      ? item["childConfigurationDeviceDetails"]
      : configurationDeviceDetailsArrayDeserializer(item["childConfigurationDeviceDetails"]),
    termCommitmentInformation: !item["termCommitmentInformation"]
      ? item["termCommitmentInformation"]
      : termCommitmentInformationDeserializer(item["termCommitmentInformation"]),
  };
}

/** Describes product display information. */
export interface DisplayInfo {
  /** Product family display name. */
  readonly productFamilyDisplayName?: string;
  /** Configuration display name. */
  readonly configurationDisplayName?: string;
}

export function displayInfoSerializer(item: DisplayInfo): any {
  return item;
}

export function displayInfoDeserializer(item: any): DisplayInfo {
  return {
    productFamilyDisplayName: item["productFamilyDisplayName"],
    configurationDisplayName: item["configurationDisplayName"],
  };
}

/** Holds details about product hierarchy information. */
export interface HierarchyInformation {
  /** Represents product family name that uniquely identifies product family. */
  productFamilyName?: string;
  /** Represents product line name that uniquely identifies product line. */
  productLineName?: string;
  /** Represents product name that uniquely identifies product. */
  productName?: string;
  /** Represents configuration name that uniquely identifies configuration. */
  configurationName?: string;
  /** Represents Model Display Name. */
  configurationIdDisplayName?: string;
}

export function hierarchyInformationSerializer(item: HierarchyInformation): any {
  return {
    productFamilyName: item["productFamilyName"],
    productLineName: item["productLineName"],
    productName: item["productName"],
    configurationName: item["configurationName"],
    configurationIdDisplayName: item["configurationIdDisplayName"],
  };
}

export function hierarchyInformationDeserializer(item: any): HierarchyInformation {
  return {
    productFamilyName: item["productFamilyName"],
    productLineName: item["productLineName"],
    productName: item["productName"],
    configurationName: item["configurationName"],
    configurationIdDisplayName: item["configurationIdDisplayName"],
  };
}

/** Double encryption status as entered by the customer. It is compulsory to give this parameter if the 'Deny' or 'Disabled' policy is configured. */
export enum KnownDoubleEncryptionStatus {
  /** Double encryption is disabled. */
  Disabled = "Disabled",
  /** Double encryption is enabled. */
  Enabled = "Enabled",
}

/**
 * Double encryption status as entered by the customer. It is compulsory to give this parameter if the 'Deny' or 'Disabled' policy is configured. \
 * {@link KnownDoubleEncryptionStatus} can be used interchangeably with DoubleEncryptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Double encryption is disabled. \
 * **Enabled**: Double encryption is enabled.
 */
export type DoubleEncryptionStatus = string;

/** Identification type of the configuration. */
export enum KnownIdentificationType {
  /** Product does not have any explicit identifier. */
  NotSupported = "NotSupported",
  /** Product is identifiable by serial number. */
  SerialNumber = "SerialNumber",
}

/**
 * Identification type of the configuration. \
 * {@link KnownIdentificationType} can be used interchangeably with IdentificationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSupported**: Product does not have any explicit identifier. \
 * **SerialNumber**: Product is identifiable by serial number.
 */
export type IdentificationType = string;

/** Device details. */
export interface DeviceDetails {
  /** Device serial number. */
  readonly serialNumber?: string;
  /** Device serial number to be displayed. */
  readonly displaySerialNumber?: string;
  /** Management Resource Id. */
  readonly managementResourceId?: string;
  /** Management Resource Tenant ID. */
  readonly managementResourceTenantId?: string;
  /** Determining nature of provisioning that the configuration supports. */
  readonly provisioningSupport?: ProvisioningSupport;
  /** Provisioning Details for the device. */
  readonly provisioningDetails?: ProvisioningDetails;
}

export function deviceDetailsDeserializer(item: any): DeviceDetails {
  return {
    serialNumber: item["serialNumber"],
    displaySerialNumber: item["displaySerialNumber"],
    managementResourceId: item["managementResourceId"],
    managementResourceTenantId: item["managementResourceTenantId"],
    provisioningSupport: item["provisioningSupport"],
    provisioningDetails: !item["provisioningDetails"]
      ? item["provisioningDetails"]
      : provisioningDetailsDeserializer(item["provisioningDetails"]),
  };
}

/** Determining nature of provisioning that the configuration supports. */
export enum KnownProvisioningSupport {
  /** The configuration can be provisioned from the cloud. */
  CloudBased = "CloudBased",
  /** The configuration need to be provisioned manually by the end user. */
  Manual = "Manual",
}

/**
 * Determining nature of provisioning that the configuration supports. \
 * {@link KnownProvisioningSupport} can be used interchangeably with ProvisioningSupport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CloudBased**: The configuration can be provisioned from the cloud. \
 * **Manual**: The configuration need to be provisioned manually by the end user.
 */
export type ProvisioningSupport = string;

/** Details Related To Provision Resource. */
export interface ProvisioningDetails {
  /** Quantity of the devices. */
  quantity?: number;
  /** Provisioning Resource Arm ID. */
  provisioningArmId?: string;
  /** Provisioning End Point. */
  provisioningEndPoint?: string;
  /** Serial Number for the Device. */
  serialNumber?: string;
  /** Vendor Name for the Device , (for 1P devices - Microsoft). */
  vendorName?: string;
  /** Arc Enabled Resource Arm id. */
  readyToConnectArmId?: string;
  /** Management Resource ArmId. */
  managementResourceArmId?: string;
  /** Unique Identity for a Device. */
  readonly uniqueDeviceIdentifier?: string;
  /** Auto Provisioning Details. */
  autoProvisioningStatus?: AutoProvisioningStatus;
  /** Proof of possession details. */
  devicePresenceVerification?: DevicePresenceVerificationDetails;
}

export function provisioningDetailsSerializer(item: ProvisioningDetails): any {
  return {
    quantity: item["quantity"],
    provisioningArmId: item["provisioningArmId"],
    provisioningEndPoint: item["provisioningEndPoint"],
    serialNumber: item["serialNumber"],
    vendorName: item["vendorName"],
    readyToConnectArmId: item["readyToConnectArmId"],
    managementResourceArmId: item["managementResourceArmId"],
    autoProvisioningStatus: item["autoProvisioningStatus"],
    devicePresenceVerification: !item["devicePresenceVerification"]
      ? item["devicePresenceVerification"]
      : devicePresenceVerificationDetailsSerializer(item["devicePresenceVerification"]),
  };
}

export function provisioningDetailsDeserializer(item: any): ProvisioningDetails {
  return {
    quantity: item["quantity"],
    provisioningArmId: item["provisioningArmId"],
    provisioningEndPoint: item["provisioningEndPoint"],
    serialNumber: item["serialNumber"],
    vendorName: item["vendorName"],
    readyToConnectArmId: item["readyToConnectArmId"],
    managementResourceArmId: item["managementResourceArmId"],
    uniqueDeviceIdentifier: item["uniqueDeviceIdentifier"],
    autoProvisioningStatus: item["autoProvisioningStatus"],
    devicePresenceVerification: !item["devicePresenceVerification"]
      ? item["devicePresenceVerification"]
      : devicePresenceVerificationDetailsDeserializer(item["devicePresenceVerification"]),
  };
}

/** Auto Provisioning Details. */
export enum KnownAutoProvisioningStatus {
  /** Provisioning Enabled. Will act as pre-approved, and arc extension will be enabled as soon as the device is verified to be at the right edge location. */
  Enabled = "Enabled",
  /** Provisioning Disabled. */
  Disabled = "Disabled",
}

/**
 * Auto Provisioning Details. \
 * {@link KnownAutoProvisioningStatus} can be used interchangeably with AutoProvisioningStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Provisioning Enabled. Will act as pre-approved, and arc extension will be enabled as soon as the device is verified to be at the right edge location. \
 * **Disabled**: Provisioning Disabled.
 */
export type AutoProvisioningStatus = string;

/** Proof of possession details. */
export interface DevicePresenceVerificationDetails {
  /** Proof of possession status. */
  readonly status?: DevicePresenceVerificationStatus;
  /** Insights on current status. */
  readonly message?: string;
}

export function devicePresenceVerificationDetailsSerializer(
  item: DevicePresenceVerificationDetails,
): any {
  return item;
}

export function devicePresenceVerificationDetailsDeserializer(
  item: any,
): DevicePresenceVerificationDetails {
  return {
    status: item["status"],
    message: item["message"],
  };
}

/** Proof of possession status. */
export enum KnownDevicePresenceVerificationStatus {
  /** The device has not yet been verified to be with the right edge operator or at the right location. */
  NotInitiated = "NotInitiated",
  /** Confirms that the device is verified to be with the right edge operator or at the right location. */
  Completed = "Completed",
}

/**
 * Proof of possession status. \
 * {@link KnownDevicePresenceVerificationStatus} can be used interchangeably with DevicePresenceVerificationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotInitiated**: The device has not yet been verified to be with the right edge operator or at the right location. \
 * **Completed**: Confirms that the device is verified to be with the right edge operator or at the right location.
 */
export type DevicePresenceVerificationStatus = string;

export function additionalConfigurationArraySerializer(
  result: Array<AdditionalConfiguration>,
): any[] {
  return result.map((item) => {
    return additionalConfigurationSerializer(item);
  });
}

export function additionalConfigurationArrayDeserializer(
  result: Array<AdditionalConfiguration>,
): any[] {
  return result.map((item) => {
    return additionalConfigurationDeserializer(item);
  });
}

/** Additional Configuration details. */
export interface AdditionalConfiguration {
  /** Hierarchy of the product which uniquely identifies the configuration. */
  hierarchyInformation: HierarchyInformation;
  /** Quantity of the product. */
  quantity: number;
  /** List Provisioning Details for Devices in Additional Config. */
  provisioningDetails?: ProvisioningDetails[];
}

export function additionalConfigurationSerializer(item: AdditionalConfiguration): any {
  return {
    hierarchyInformation: hierarchyInformationSerializer(item["hierarchyInformation"]),
    quantity: item["quantity"],
    provisioningDetails: !item["provisioningDetails"]
      ? item["provisioningDetails"]
      : provisioningDetailsArraySerializer(item["provisioningDetails"]),
  };
}

export function additionalConfigurationDeserializer(item: any): AdditionalConfiguration {
  return {
    hierarchyInformation: hierarchyInformationDeserializer(item["hierarchyInformation"]),
    quantity: item["quantity"],
    provisioningDetails: !item["provisioningDetails"]
      ? item["provisioningDetails"]
      : provisioningDetailsArrayDeserializer(item["provisioningDetails"]),
  };
}

export function provisioningDetailsArraySerializer(result: Array<ProvisioningDetails>): any[] {
  return result.map((item) => {
    return provisioningDetailsSerializer(item);
  });
}

export function provisioningDetailsArrayDeserializer(result: Array<ProvisioningDetails>): any[] {
  return result.map((item) => {
    return provisioningDetailsDeserializer(item);
  });
}

export function configurationDeviceDetailsArrayDeserializer(
  result: Array<ConfigurationDeviceDetails>,
): any[] {
  return result.map((item) => {
    return configurationDeviceDetailsDeserializer(item);
  });
}

/** Device details for configuration. */
export interface ConfigurationDeviceDetails {
  /** Display details of the product. */
  displayInfo?: DisplayInfo;
  /** Hierarchy of the product which uniquely identifies the configuration. */
  readonly hierarchyInformation?: HierarchyInformation;
  /** Quantity of the product. */
  readonly quantity?: number;
  /** Identification type of the configuration. */
  readonly identificationType?: IdentificationType;
  /** List of device details. */
  readonly deviceDetails?: DeviceDetails[];
  /** Term Commitment Information of the Device. */
  readonly termCommitmentInformation?: TermCommitmentInformation;
}

export function configurationDeviceDetailsDeserializer(item: any): ConfigurationDeviceDetails {
  return {
    displayInfo: !item["displayInfo"]
      ? item["displayInfo"]
      : displayInfoDeserializer(item["displayInfo"]),
    hierarchyInformation: !item["hierarchyInformation"]
      ? item["hierarchyInformation"]
      : hierarchyInformationDeserializer(item["hierarchyInformation"]),
    quantity: item["quantity"],
    identificationType: item["identificationType"],
    deviceDetails: !item["deviceDetails"]
      ? item["deviceDetails"]
      : deviceDetailsArrayDeserializer(item["deviceDetails"]),
    termCommitmentInformation: !item["termCommitmentInformation"]
      ? item["termCommitmentInformation"]
      : termCommitmentInformationDeserializer(item["termCommitmentInformation"]),
  };
}

export function deviceDetailsArrayDeserializer(result: Array<DeviceDetails>): any[] {
  return result.map((item) => {
    return deviceDetailsDeserializer(item);
  });
}

/** Term Commitment Information. */
export interface TermCommitmentInformation {
  /** Term Commitment Type */
  termCommitmentType: TermCommitmentType;
  /** Term Commitment Duration. Currently Supporting P365D, P1095D */
  readonly termCommitmentTypeDuration?: string;
  /** Number of Days Pending for Term Commitment */
  readonly pendingDaysForTerm?: number;
}

export function termCommitmentInformationDeserializer(item: any): TermCommitmentInformation {
  return {
    termCommitmentType: item["termCommitmentType"],
    termCommitmentTypeDuration: item["termCommitmentTypeDuration"],
    pendingDaysForTerm: item["pendingDaysForTerm"],
  };
}

/** Term Commitment Type */
export enum KnownTermCommitmentType {
  /** Pay as you go Term Commitment Model. */
  None = "None",
  /** Trial Term Commitment Model. */
  Trial = "Trial",
  /** Time based Term Commitment Model. */
  Timed = "Timed",
}

/**
 * Term Commitment Type \
 * {@link KnownTermCommitmentType} can be used interchangeably with TermCommitmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Pay as you go Term Commitment Model. \
 * **Trial**: Trial Term Commitment Model. \
 * **Timed**: Time based Term Commitment Model.
 */
export type TermCommitmentType = string;

/** Order item type. */
export enum KnownOrderItemType {
  /** Purchase OrderItem. */
  Purchase = "Purchase",
  /** Rental OrderItem. */
  Rental = "Rental",
  /** Orders placed outside of azure. */
  External = "External",
}

/**
 * Order item type. \
 * {@link KnownOrderItemType} can be used interchangeably with OrderItemType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Purchase**: Purchase OrderItem. \
 * **Rental**: Rental OrderItem. \
 * **External**: Orders placed outside of azure.
 */
export type OrderItemType = string;

/** Defines the mode of the Order item. */
export enum KnownOrderMode {
  /** Default Order mode. */
  Default = "Default",
  /** Mode in which the Order will not be fulfilled. */
  DoNotFulfill = "DoNotFulfill",
}

/**
 * Defines the mode of the Order item. \
 * {@link KnownOrderMode} can be used interchangeably with OrderMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default Order mode. \
 * **DoNotFulfill**: Mode in which the Order will not be fulfilled.
 */
export type OrderMode = string;

/** Represents Site Related Details. */
export interface SiteDetails {
  /** Unique Id, Identifying A Site. */
  siteId: string;
}

export function siteDetailsSerializer(item: SiteDetails): any {
  return { siteId: item["siteId"] };
}

export function siteDetailsDeserializer(item: any): SiteDetails {
  return {
    siteId: item["siteId"],
  };
}

/** Resource stage details. */
export interface StageDetails {
  /** Stage status. */
  readonly stageStatus?: StageStatus;
  /** Stage name. */
  readonly stageName?: StageName;
  /** Display name of the resource stage. */
  readonly displayName?: string;
  /** Stage start time. */
  readonly startTime?: Date;
}

export function stageDetailsDeserializer(item: any): StageDetails {
  return {
    stageStatus: item["stageStatus"],
    stageName: item["stageName"],
    displayName: item["displayName"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
  };
}

/** Stage status. */
export enum KnownStageStatus {
  /** No status available yet. */
  None = "None",
  /** Stage is in progress. */
  InProgress = "InProgress",
  /** Stage has succeeded. */
  Succeeded = "Succeeded",
  /** Stage has failed. */
  Failed = "Failed",
  /** Stage has been cancelled. */
  Cancelled = "Cancelled",
  /** Stage is cancelling. */
  Cancelling = "Cancelling",
}

/**
 * Stage status. \
 * {@link KnownStageStatus} can be used interchangeably with StageStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No status available yet. \
 * **InProgress**: Stage is in progress. \
 * **Succeeded**: Stage has succeeded. \
 * **Failed**: Stage has failed. \
 * **Cancelled**: Stage has been cancelled. \
 * **Cancelling**: Stage is cancelling.
 */
export type StageStatus = string;

/** Stage name. */
export enum KnownStageName {
  /** Currently in draft mode and can still be cancelled. */
  Placed = "Placed",
  /** Order is currently in draft mode and can still be cancelled. */
  InReview = "InReview",
  /** Order is confirmed. */
  Confirmed = "Confirmed",
  /** Order is ready to ship. */
  ReadyToShip = "ReadyToShip",
  /** Order is in transit to customer. */
  Shipped = "Shipped",
  /** Order is delivered to customer. */
  Delivered = "Delivered",
  /** Order is ready to get cloud connected. */
  ReadyToSetup = "ReadyToSetup",
  /** Order is in use at customer site. */
  InUse = "InUse",
  /** Return has been initiated by customer. */
  ReturnInitiated = "ReturnInitiated",
  /** Order is in transit from customer to Microsoft. */
  ReturnPickedUp = "ReturnPickedUp",
  /** Order has been received back to Microsoft. */
  ReturnedToMicrosoft = "ReturnedToMicrosoft",
  /** Return has now completed. */
  ReturnCompleted = "ReturnCompleted",
  /** Order has been cancelled. */
  Cancelled = "Cancelled",
}

/**
 * Stage name. \
 * {@link KnownStageName} can be used interchangeably with StageName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Placed**: Currently in draft mode and can still be cancelled. \
 * **InReview**: Order is currently in draft mode and can still be cancelled. \
 * **Confirmed**: Order is confirmed. \
 * **ReadyToShip**: Order is ready to ship. \
 * **Shipped**: Order is in transit to customer. \
 * **Delivered**: Order is delivered to customer. \
 * **ReadyToSetup**: Order is ready to get cloud connected. \
 * **InUse**: Order is in use at customer site. \
 * **ReturnInitiated**: Return has been initiated by customer. \
 * **ReturnPickedUp**: Order is in transit from customer to Microsoft. \
 * **ReturnedToMicrosoft**: Order has been received back to Microsoft. \
 * **ReturnCompleted**: Return has now completed. \
 * **Cancelled**: Order has been cancelled.
 */
export type StageName = string;

export function stageDetailsArrayDeserializer(result: Array<StageDetails>): any[] {
  return result.map((item) => {
    return stageDetailsDeserializer(item);
  });
}

/** Preferences related to the order. */
export interface Preferences {
  /** Notification preferences. */
  notificationPreferences?: NotificationPreference[];
  /** Preferences related to the shipment logistics of the order. */
  transportPreferences?: TransportPreferences;
  /** Preferences related to the Encryption. */
  encryptionPreferences?: EncryptionPreferences;
  /** Preferences related to the Management resource. */
  managementResourcePreferences?: ManagementResourcePreferences;
  /** Preferences related to the Term commitment. */
  termCommitmentPreferences?: TermCommitmentPreferences;
}

export function preferencesSerializer(item: Preferences): any {
  return {
    notificationPreferences: !item["notificationPreferences"]
      ? item["notificationPreferences"]
      : notificationPreferenceArraySerializer(item["notificationPreferences"]),
    transportPreferences: !item["transportPreferences"]
      ? item["transportPreferences"]
      : transportPreferencesSerializer(item["transportPreferences"]),
    encryptionPreferences: !item["encryptionPreferences"]
      ? item["encryptionPreferences"]
      : encryptionPreferencesSerializer(item["encryptionPreferences"]),
    managementResourcePreferences: !item["managementResourcePreferences"]
      ? item["managementResourcePreferences"]
      : managementResourcePreferencesSerializer(item["managementResourcePreferences"]),
    termCommitmentPreferences: !item["termCommitmentPreferences"]
      ? item["termCommitmentPreferences"]
      : termCommitmentPreferencesSerializer(item["termCommitmentPreferences"]),
  };
}

export function preferencesDeserializer(item: any): Preferences {
  return {
    notificationPreferences: !item["notificationPreferences"]
      ? item["notificationPreferences"]
      : notificationPreferenceArrayDeserializer(item["notificationPreferences"]),
    transportPreferences: !item["transportPreferences"]
      ? item["transportPreferences"]
      : transportPreferencesDeserializer(item["transportPreferences"]),
    encryptionPreferences: !item["encryptionPreferences"]
      ? item["encryptionPreferences"]
      : encryptionPreferencesDeserializer(item["encryptionPreferences"]),
    managementResourcePreferences: !item["managementResourcePreferences"]
      ? item["managementResourcePreferences"]
      : managementResourcePreferencesDeserializer(item["managementResourcePreferences"]),
    termCommitmentPreferences: !item["termCommitmentPreferences"]
      ? item["termCommitmentPreferences"]
      : termCommitmentPreferencesDeserializer(item["termCommitmentPreferences"]),
  };
}

export function notificationPreferenceArraySerializer(
  result: Array<NotificationPreference>,
): any[] {
  return result.map((item) => {
    return notificationPreferenceSerializer(item);
  });
}

export function notificationPreferenceArrayDeserializer(
  result: Array<NotificationPreference>,
): any[] {
  return result.map((item) => {
    return notificationPreferenceDeserializer(item);
  });
}

/** Notification preference for a job stage. */
export interface NotificationPreference {
  /** Name of the stage. */
  stageName: NotificationStageName;
  /** Notification is required or not. */
  sendNotification: boolean;
}

export function notificationPreferenceSerializer(item: NotificationPreference): any {
  return {
    stageName: item["stageName"],
    sendNotification: item["sendNotification"],
  };
}

export function notificationPreferenceDeserializer(item: any): NotificationPreference {
  return {
    stageName: item["stageName"],
    sendNotification: item["sendNotification"],
  };
}

/** Name of the stage. */
export enum KnownNotificationStageName {
  /** Notification at order item shipped from microsoft datacenter. */
  Shipped = "Shipped",
  /** Notification at order item delivered to customer. */
  Delivered = "Delivered",
}

/**
 * Name of the stage. \
 * {@link KnownNotificationStageName} can be used interchangeably with NotificationStageName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Shipped**: Notification at order item shipped from microsoft datacenter. \
 * **Delivered**: Notification at order item delivered to customer.
 */
export type NotificationStageName = string;

/** Preferences related to the shipment logistics of the sku. */
export interface TransportPreferences {
  /** Indicates Shipment Logistics type that the customer preferred. */
  preferredShipmentType: TransportShipmentTypes;
}

export function transportPreferencesSerializer(item: TransportPreferences): any {
  return { preferredShipmentType: item["preferredShipmentType"] };
}

export function transportPreferencesDeserializer(item: any): TransportPreferences {
  return {
    preferredShipmentType: item["preferredShipmentType"],
  };
}

/** Indicates Shipment Logistics type that the customer preferred. */
export enum KnownTransportShipmentTypes {
  /** Shipment Logistics is handled by the customer. */
  CustomerManaged = "CustomerManaged",
  /** Shipment Logistics is handled by Microsoft. */
  MicrosoftManaged = "MicrosoftManaged",
}

/**
 * Indicates Shipment Logistics type that the customer preferred. \
 * {@link KnownTransportShipmentTypes} can be used interchangeably with TransportShipmentTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CustomerManaged**: Shipment Logistics is handled by the customer. \
 * **MicrosoftManaged**: Shipment Logistics is handled by Microsoft.
 */
export type TransportShipmentTypes = string;

/** Preferences related to the double encryption. */
export interface EncryptionPreferences {
  /** Double encryption status as entered by the customer. It is compulsory to give this parameter if the 'Deny' or 'Disabled' policy is configured. */
  doubleEncryptionStatus?: DoubleEncryptionStatus;
}

export function encryptionPreferencesSerializer(item: EncryptionPreferences): any {
  return { doubleEncryptionStatus: item["doubleEncryptionStatus"] };
}

export function encryptionPreferencesDeserializer(item: any): EncryptionPreferences {
  return {
    doubleEncryptionStatus: item["doubleEncryptionStatus"],
  };
}

/** Management resource preference to link device. */
export interface ManagementResourcePreferences {
  /** Customer preferred Management resource ARM ID. */
  preferredManagementResourceId?: string;
}

export function managementResourcePreferencesSerializer(item: ManagementResourcePreferences): any {
  return {
    preferredManagementResourceId: item["preferredManagementResourceId"],
  };
}

export function managementResourcePreferencesDeserializer(
  item: any,
): ManagementResourcePreferences {
  return {
    preferredManagementResourceId: item["preferredManagementResourceId"],
  };
}

/** Term Commitment preference received from customer. */
export interface TermCommitmentPreferences {
  /** Term Commitment Type */
  preferredTermCommitmentType: TermCommitmentType;
  /** Customer preferred Term Duration. */
  preferredTermCommitmentDuration?: string;
}

export function termCommitmentPreferencesSerializer(item: TermCommitmentPreferences): any {
  return {
    preferredTermCommitmentType: item["preferredTermCommitmentType"],
    preferredTermCommitmentDuration: item["preferredTermCommitmentDuration"],
  };
}

export function termCommitmentPreferencesDeserializer(item: any): TermCommitmentPreferences {
  return {
    preferredTermCommitmentType: item["preferredTermCommitmentType"],
    preferredTermCommitmentDuration: item["preferredTermCommitmentDuration"],
  };
}

/** Forward shipment details. */
export interface ForwardShippingDetails {
  /** Name of the carrier. */
  readonly carrierName?: string;
  /** Carrier Name for display purpose. Not to be used for any processing. */
  readonly carrierDisplayName?: string;
  /** TrackingId of the package. */
  readonly trackingId?: string;
  /** TrackingUrl of the package. */
  readonly trackingUrl?: string;
}

export function forwardShippingDetailsDeserializer(item: any): ForwardShippingDetails {
  return {
    carrierName: item["carrierName"],
    carrierDisplayName: item["carrierDisplayName"],
    trackingId: item["trackingId"],
    trackingUrl: item["trackingUrl"],
  };
}

/** Reverse shipment details. */
export interface ReverseShippingDetails {
  /** SAS key to download the reverse shipment label of the package. */
  readonly sasKeyForLabel?: string;
  /** Name of the carrier. */
  readonly carrierName?: string;
  /** Carrier Name for display purpose. Not to be used for any processing. */
  readonly carrierDisplayName?: string;
  /** TrackingId of the package. */
  readonly trackingId?: string;
  /** TrackingUrl of the package. */
  readonly trackingUrl?: string;
}

export function reverseShippingDetailsDeserializer(item: any): ReverseShippingDetails {
  return {
    sasKeyForLabel: item["sasKeyForLabel"],
    carrierName: item["carrierName"],
    carrierDisplayName: item["carrierDisplayName"],
    trackingId: item["trackingId"],
    trackingUrl: item["trackingUrl"],
  };
}

/** Describes whether the order item is cancellable or not. */
export enum KnownOrderItemCancellationEnum {
  /** Order item can be cancelled without fee. */
  Cancellable = "Cancellable",
  /** Order item can be cancelled with fee. */
  CancellableWithFee = "CancellableWithFee",
  /** Order item not cancellable. */
  NotCancellable = "NotCancellable",
}

/**
 * Describes whether the order item is cancellable or not. \
 * {@link KnownOrderItemCancellationEnum} can be used interchangeably with OrderItemCancellationEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cancellable**: Order item can be cancelled without fee. \
 * **CancellableWithFee**: Order item can be cancelled with fee. \
 * **NotCancellable**: Order item not cancellable.
 */
export type OrderItemCancellationEnum = string;

/** Describes whether the order item is deletable or not. */
export enum KnownActionStatusEnum {
  /** Allowed flag. */
  Allowed = "Allowed",
  /** Not Allowed flag. */
  NotAllowed = "NotAllowed",
}

/**
 * Describes whether the order item is deletable or not. \
 * {@link KnownActionStatusEnum} can be used interchangeably with ActionStatusEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allowed**: Allowed flag. \
 * **NotAllowed**: Not Allowed flag.
 */
export type ActionStatusEnum = string;

/** Describes whether the order item is returnable or not. */
export enum KnownOrderItemReturnEnum {
  /** Order item can be returned without fee. */
  Returnable = "Returnable",
  /** Order item can be returned with fee. */
  ReturnableWithFee = "ReturnableWithFee",
  /** Order item not returnable. */
  NotReturnable = "NotReturnable",
}

/**
 * Describes whether the order item is returnable or not. \
 * {@link KnownOrderItemReturnEnum} can be used interchangeably with OrderItemReturnEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Returnable**: Order item can be returned without fee. \
 * **ReturnableWithFee**: Order item can be returned with fee. \
 * **NotReturnable**: Order item not returnable.
 */
export type OrderItemReturnEnum = string;

export function resourceProviderDetailsArrayDeserializer(
  result: Array<ResourceProviderDetails>,
): any[] {
  return result.map((item) => {
    return resourceProviderDetailsDeserializer(item);
  });
}

/** Management RP details. */
export interface ResourceProviderDetails {
  /** Resource provider namespace. */
  readonly resourceProviderNamespace?: string;
}

export function resourceProviderDetailsDeserializer(item: any): ResourceProviderDetails {
  return {
    resourceProviderNamespace: item["resourceProviderNamespace"],
  };
}

/** Address details for an order item. */
export interface AddressDetails {
  /** Customer address and contact details. */
  forwardAddress: AddressProperties;
  /** Return shipping address. */
  readonly returnAddress?: AddressProperties;
}

export function addressDetailsSerializer(item: AddressDetails): any {
  return {
    forwardAddress: addressPropertiesSerializer(item["forwardAddress"]),
  };
}

export function addressDetailsDeserializer(item: any): AddressDetails {
  return {
    forwardAddress: addressPropertiesDeserializer(item["forwardAddress"]),
    returnAddress: !item["returnAddress"]
      ? item["returnAddress"]
      : addressPropertiesDeserializer(item["returnAddress"]),
  };
}

/** Msi identity details of the resource */
export interface ResourceIdentity {
  /** Identity type */
  type?: string;
  /** Service Principal Id backing the Msi */
  readonly principalId?: string;
  /** Home Tenant Id */
  readonly tenantId?: string;
  /** User Assigned Identities */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function resourceIdentitySerializer(item: ResourceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function resourceIdentityDeserializer(item: any): ResourceIdentity {
  return {
    type: item["type"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Updates order item parameters. */
export interface OrderItemUpdateParameter {
  /** Order item update properties. */
  properties?: OrderItemUpdateProperties;
  /** The list of key value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). */
  tags?: Record<string, string>;
  /** Msi identity of the resource */
  identity?: ResourceIdentity;
}

export function orderItemUpdateParameterSerializer(item: OrderItemUpdateParameter): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : orderItemUpdatePropertiesSerializer(item["properties"]),
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
  };
}

/** Order item update properties. */
export interface OrderItemUpdateProperties {
  /** Updates forward shipping address and contact details. */
  forwardAddress?: AddressProperties;
  /** Customer preference. */
  preferences?: Preferences;
  /** Additional notification email list. */
  notificationEmailList?: string[];
  /** Represents order item details. */
  orderItemDetails?: OrderItemDetailsUpdateParameter;
}

export function orderItemUpdatePropertiesSerializer(item: OrderItemUpdateProperties): any {
  return {
    forwardAddress: !item["forwardAddress"]
      ? item["forwardAddress"]
      : addressPropertiesSerializer(item["forwardAddress"]),
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesSerializer(item["preferences"]),
    notificationEmailList: !item["notificationEmailList"]
      ? item["notificationEmailList"]
      : item["notificationEmailList"].map((p: any) => {
          return p;
        }),
    orderItemDetails: !item["orderItemDetails"]
      ? item["orderItemDetails"]
      : orderItemDetailsUpdateParameterSerializer(item["orderItemDetails"]),
  };
}

/** Order item details Patchable Properties. */
export interface OrderItemDetailsUpdateParameter {
  /** Represents product details. */
  productDetails?: ProductDetailsUpdateParameter;
  /** Site Related Details. */
  siteDetails?: SiteDetails;
}

export function orderItemDetailsUpdateParameterSerializer(
  item: OrderItemDetailsUpdateParameter,
): any {
  return {
    productDetails: !item["productDetails"]
      ? item["productDetails"]
      : productDetailsUpdateParameterSerializer(item["productDetails"]),
    siteDetails: !item["siteDetails"]
      ? item["siteDetails"]
      : siteDetailsSerializer(item["siteDetails"]),
  };
}

/** Represents product details patchable properties. */
export interface ProductDetailsUpdateParameter {
  /** Device Provisioning Details for Parent. */
  parentProvisioningDetails?: ProvisioningDetails;
}

export function productDetailsUpdateParameterSerializer(item: ProductDetailsUpdateParameter): any {
  return {
    parentProvisioningDetails: !item["parentProvisioningDetails"]
      ? item["parentProvisioningDetails"]
      : provisioningDetailsSerializer(item["parentProvisioningDetails"]),
  };
}

/** List of order items. */
export interface _OrderItemResourceList {
  /** The OrderItemResource items on this page */
  readonly value: OrderItemResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _orderItemResourceListDeserializer(item: any): _OrderItemResourceList {
  return {
    value: orderItemResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function orderItemResourceArraySerializer(result: Array<OrderItemResource>): any[] {
  return result.map((item) => {
    return orderItemResourceSerializer(item);
  });
}

export function orderItemResourceArrayDeserializer(result: Array<OrderItemResource>): any[] {
  return result.map((item) => {
    return orderItemResourceDeserializer(item);
  });
}

/** Reason for cancellation. */
export interface CancellationReason {
  /** Reason for cancellation. */
  reason: string;
}

export function cancellationReasonSerializer(item: CancellationReason): any {
  return { reason: item["reason"] };
}

/** Return order item request body. */
export interface ReturnOrderItemDetails {
  /** Customer return address. */
  returnAddress?: AddressProperties;
  /** Return Reason. */
  returnReason: string;
  /** Service tag (located on the bottom-right corner of the device). */
  serviceTag?: string;
  /** Shipping Box required. */
  shippingBoxRequired?: boolean;
}

export function returnOrderItemDetailsSerializer(item: ReturnOrderItemDetails): any {
  return {
    returnAddress: !item["returnAddress"]
      ? item["returnAddress"]
      : addressPropertiesSerializer(item["returnAddress"]),
    returnReason: item["returnReason"],
    serviceTag: item["serviceTag"],
    shippingBoxRequired: item["shippingBoxRequired"],
  };
}

/** The request has succeeded. */
export interface OkResponse {}

export function okResponseDeserializer(item: any): OkResponse {
  return item;
}

/** Specifies the properties or parameters for an order. Order is a grouping of one or more order items. */
export interface OrderResource extends ProxyResource {
  /** Order properties. */
  properties: OrderProperties;
}

export function orderResourceDeserializer(item: any): OrderResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: orderPropertiesDeserializer(item["properties"]),
  };
}

/** Represents order details. */
export interface OrderProperties {
  /** List of order item ARM Ids which are part of an order. */
  readonly orderItemIds?: string[];
  /** Order current status. */
  readonly currentStage?: StageDetails;
  /** Order status history. */
  readonly orderStageHistory?: StageDetails[];
  /** Order mode. */
  readonly orderMode?: OrderMode;
}

export function orderPropertiesDeserializer(item: any): OrderProperties {
  return {
    orderItemIds: !item["orderItemIds"]
      ? item["orderItemIds"]
      : item["orderItemIds"].map((p: any) => {
          return p;
        }),
    currentStage: !item["currentStage"]
      ? item["currentStage"]
      : stageDetailsDeserializer(item["currentStage"]),
    orderStageHistory: !item["orderStageHistory"]
      ? item["orderStageHistory"]
      : stageDetailsArrayDeserializer(item["orderStageHistory"]),
    orderMode: item["orderMode"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** List of orders. */
export interface _OrderResourceList {
  /** The OrderResource items on this page */
  readonly value: OrderResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _orderResourceListDeserializer(item: any): _OrderResourceList {
  return {
    value: orderResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function orderResourceArrayDeserializer(result: Array<OrderResource>): any[] {
  return result.map((item) => {
    return orderResourceDeserializer(item);
  });
}

/** Configuration request object. */
export interface ConfigurationsRequest {
  /** Holds details about product hierarchy information and filterable property. */
  configurationFilter?: ConfigurationFilter;
  /** Customer subscription properties. Clients can display available products to unregistered customers by explicitly passing subscription details. */
  customerSubscriptionDetails?: CustomerSubscriptionDetails;
}

export function configurationsRequestSerializer(item: ConfigurationsRequest): any {
  return {
    configurationFilter: !item["configurationFilter"]
      ? item["configurationFilter"]
      : configurationFilterSerializer(item["configurationFilter"]),
    customerSubscriptionDetails: !item["customerSubscriptionDetails"]
      ? item["customerSubscriptionDetails"]
      : customerSubscriptionDetailsSerializer(item["customerSubscriptionDetails"]),
  };
}

/** Configuration filters. */
export interface ConfigurationFilter {
  /** Product hierarchy information. */
  hierarchyInformation: HierarchyInformation;
  /** Filters specific to product. */
  filterableProperty?: FilterableProperty[];
  /** Filter to fetch specific child configurations that exist in the configuration. This must be passed to either fetch a list of specific child configurations, or all child configurations of specific types of child configurations. */
  childConfigurationFilter?: ChildConfigurationFilter;
}

export function configurationFilterSerializer(item: ConfigurationFilter): any {
  return {
    hierarchyInformation: hierarchyInformationSerializer(item["hierarchyInformation"]),
    filterableProperty: !item["filterableProperty"]
      ? item["filterableProperty"]
      : filterablePropertyArraySerializer(item["filterableProperty"]),
    childConfigurationFilter: !item["childConfigurationFilter"]
      ? item["childConfigurationFilter"]
      : childConfigurationFilterSerializer(item["childConfigurationFilter"]),
  };
}

export function filterablePropertyArraySerializer(result: Array<FilterableProperty>): any[] {
  return result.map((item) => {
    return filterablePropertySerializer(item);
  });
}

export function filterablePropertyArrayDeserializer(result: Array<FilterableProperty>): any[] {
  return result.map((item) => {
    return filterablePropertyDeserializer(item);
  });
}

/** Different types of filters supported and its values. */
export interface FilterableProperty {
  /** Type of product filter. */
  type: SupportedFilterTypes;
  /** Values to be filtered. */
  supportedValues: string[];
}

export function filterablePropertySerializer(item: FilterableProperty): any {
  return {
    type: item["type"],
    supportedValues: item["supportedValues"].map((p: any) => {
      return p;
    }),
  };
}

export function filterablePropertyDeserializer(item: any): FilterableProperty {
  return {
    type: item["type"],
    supportedValues: item["supportedValues"].map((p: any) => {
      return p;
    }),
  };
}

/** Type of product filter. */
export enum KnownSupportedFilterTypes {
  /** Ship to country. */
  ShipToCountries = "ShipToCountries",
  /** Double encryption status. */
  DoubleEncryptionStatus = "DoubleEncryptionStatus",
}

/**
 * Type of product filter. \
 * {@link KnownSupportedFilterTypes} can be used interchangeably with SupportedFilterTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ShipToCountries**: Ship to country. \
 * **DoubleEncryptionStatus**: Double encryption status.
 */
export type SupportedFilterTypes = string;

/** Child configuration filter. */
export interface ChildConfigurationFilter {
  /** The list of child configuration hierarchy customer wants to filter for the given configuration. */
  hierarchyInformations?: HierarchyInformation[];
  /** Filter to fetch all child configurations belonging to the given list of configuration types. */
  childConfigurationTypes?: ChildConfigurationType[];
}

export function childConfigurationFilterSerializer(item: ChildConfigurationFilter): any {
  return {
    hierarchyInformations: !item["hierarchyInformations"]
      ? item["hierarchyInformations"]
      : hierarchyInformationArraySerializer(item["hierarchyInformations"]),
    childConfigurationTypes: !item["childConfigurationTypes"]
      ? item["childConfigurationTypes"]
      : item["childConfigurationTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function hierarchyInformationArraySerializer(result: Array<HierarchyInformation>): any[] {
  return result.map((item) => {
    return hierarchyInformationSerializer(item);
  });
}

export function hierarchyInformationArrayDeserializer(result: Array<HierarchyInformation>): any[] {
  return result.map((item) => {
    return hierarchyInformationDeserializer(item);
  });
}

/** Known values of {@link ChildConfigurationType} that the service accepts. */
export enum KnownChildConfigurationType {
  /** Child configuration is a device configuration. */
  DeviceConfiguration = "DeviceConfiguration",
  /** Child configuration is an additional configuration. */
  AdditionalConfiguration = "AdditionalConfiguration",
}

/** Type of ChildConfigurationType */
export type ChildConfigurationType = string;

/** Holds Customer subscription details. Clients can display available products to unregistered customers by explicitly passing subscription details. */
export interface CustomerSubscriptionDetails {
  /** List of registered feature flags for subscription. */
  registeredFeatures?: CustomerSubscriptionRegisteredFeatures[];
  /** Location placement Id of a subscription. */
  locationPlacementId?: string;
  /** Quota ID of a subscription. */
  quotaId: string;
}

export function customerSubscriptionDetailsSerializer(item: CustomerSubscriptionDetails): any {
  return {
    registeredFeatures: !item["registeredFeatures"]
      ? item["registeredFeatures"]
      : customerSubscriptionRegisteredFeaturesArraySerializer(item["registeredFeatures"]),
    locationPlacementId: item["locationPlacementId"],
    quotaId: item["quotaId"],
  };
}

export function customerSubscriptionRegisteredFeaturesArraySerializer(
  result: Array<CustomerSubscriptionRegisteredFeatures>,
): any[] {
  return result.map((item) => {
    return customerSubscriptionRegisteredFeaturesSerializer(item);
  });
}

/** Represents subscription registered features. */
export interface CustomerSubscriptionRegisteredFeatures {
  /** Name of subscription registered feature. */
  name?: string;
  /** State of subscription registered feature. */
  state?: string;
}

export function customerSubscriptionRegisteredFeaturesSerializer(
  item: CustomerSubscriptionRegisteredFeatures,
): any {
  return { name: item["name"], state: item["state"] };
}

/** The list of configurations. */
export interface _Configurations {
  /** The Configuration items on this page */
  readonly value: Configuration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _configurationsDeserializer(item: any): _Configurations {
  return {
    value: configurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function configurationArrayDeserializer(result: Array<Configuration>): any[] {
  return result.map((item) => {
    return configurationDeserializer(item);
  });
}

/** Configuration object. */
export interface Configuration {
  /** Properties of configuration. */
  readonly properties?: ConfigurationProperties;
}

export function configurationDeserializer(item: any): Configuration {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : configurationPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of configuration. */
export interface ConfigurationProperties extends CommonProperties {
  /** Specifications of the configuration. */
  readonly specifications?: Specification[];
  /** Dimensions of the configuration. */
  readonly dimensions?: Dimensions;
  /** Determining nature of provisioning that the configuration supports. */
  readonly provisioningSupport?: ProvisioningSupport;
  /** Different types of child configurations which exist for this configuration, these can be used to populate the child configuration filter. */
  readonly childConfigurationTypes?: ChildConfigurationType[];
  /** Child configurations present for the configuration after applying child configuration filter, grouped by the category name of the child configuration. */
  readonly groupedChildConfigurations?: GroupedChildConfigurations[];
  /** The Term Commitment Durations that are supported for a configuration. */
  readonly supportedTermCommitmentDurations?: string[];
}

export function configurationPropertiesDeserializer(item: any): ConfigurationProperties {
  return {
    filterableProperties: !item["filterableProperties"]
      ? item["filterableProperties"]
      : filterablePropertyArrayDeserializer(item["filterableProperties"]),
    displayName: item["displayName"],
    description: !item["description"]
      ? item["description"]
      : descriptionDeserializer(item["description"]),
    imageInformation: !item["imageInformation"]
      ? item["imageInformation"]
      : imageInformationArrayDeserializer(item["imageInformation"]),
    costInformation: !item["costInformation"]
      ? item["costInformation"]
      : costInformationDeserializer(item["costInformation"]),
    availabilityInformation: !item["availabilityInformation"]
      ? item["availabilityInformation"]
      : availabilityInformationDeserializer(item["availabilityInformation"]),
    hierarchyInformation: !item["hierarchyInformation"]
      ? item["hierarchyInformation"]
      : hierarchyInformationDeserializer(item["hierarchyInformation"]),
    fulfilledBy: item["fulfilledBy"],
    specifications: !item["specifications"]
      ? item["specifications"]
      : specificationArrayDeserializer(item["specifications"]),
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionsDeserializer(item["dimensions"]),
    provisioningSupport: item["provisioningSupport"],
    childConfigurationTypes: !item["childConfigurationTypes"]
      ? item["childConfigurationTypes"]
      : item["childConfigurationTypes"].map((p: any) => {
          return p;
        }),
    groupedChildConfigurations: !item["groupedChildConfigurations"]
      ? item["groupedChildConfigurations"]
      : groupedChildConfigurationsArrayDeserializer(item["groupedChildConfigurations"]),
    supportedTermCommitmentDurations: !item["supportedTermCommitmentDurations"]
      ? item["supportedTermCommitmentDurations"]
      : item["supportedTermCommitmentDurations"].map((p: any) => {
          return p;
        }),
  };
}

export function specificationArrayDeserializer(result: Array<Specification>): any[] {
  return result.map((item) => {
    return specificationDeserializer(item);
  });
}

/** Specification of the configurations. */
export interface Specification {
  /** Name of the specification. */
  readonly name?: string;
  /** Value of the specification. */
  readonly value?: string;
}

export function specificationDeserializer(item: any): Specification {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Dimensions of a configuration. */
export interface Dimensions {
  /** Length of the device. */
  readonly length?: number;
  /** Height of the device. */
  readonly height?: number;
  /** Width of the device. */
  readonly width?: number;
  /** Unit for the dimensions of length, height and width. */
  readonly lengthHeightUnit?: LengthHeightUnit;
  /** Weight of the device. */
  readonly weight?: number;
  /** Depth of the device. */
  readonly depth?: number;
  /** Unit for the dimensions of weight. */
  readonly weightUnit?: WeightMeasurementUnit;
}

export function dimensionsDeserializer(item: any): Dimensions {
  return {
    length: item["length"],
    height: item["height"],
    width: item["width"],
    lengthHeightUnit: item["lengthHeightUnit"],
    weight: item["weight"],
    depth: item["depth"],
    weightUnit: item["weightUnit"],
  };
}

/** Unit for the dimensions of length, height and width. */
export enum KnownLengthHeightUnit {
  /** Inch, applicable for West US. */
  IN = "IN",
  /** Centimeter. */
  CM = "CM",
}

/**
 * Unit for the dimensions of length, height and width. \
 * {@link KnownLengthHeightUnit} can be used interchangeably with LengthHeightUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IN**: Inch, applicable for West US. \
 * **CM**: Centimeter.
 */
export type LengthHeightUnit = string;

/** Unit for the dimensions of weight. */
export enum KnownWeightMeasurementUnit {
  /** Pounds. */
  LBS = "LBS",
  /** Kilograms. */
  KGS = "KGS",
}

/**
 * Unit for the dimensions of weight. \
 * {@link KnownWeightMeasurementUnit} can be used interchangeably with WeightMeasurementUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LBS**: Pounds. \
 * **KGS**: Kilograms.
 */
export type WeightMeasurementUnit = string;

export function groupedChildConfigurationsArrayDeserializer(
  result: Array<GroupedChildConfigurations>,
): any[] {
  return result.map((item) => {
    return groupedChildConfigurationsDeserializer(item);
  });
}

/** Grouped child configuration object. */
export interface GroupedChildConfigurations {
  /** Category information. */
  readonly categoryInformation?: CategoryInformation;
  /** List of child configurations. */
  readonly childConfigurations?: ChildConfiguration[];
}

export function groupedChildConfigurationsDeserializer(item: any): GroupedChildConfigurations {
  return {
    categoryInformation: !item["categoryInformation"]
      ? item["categoryInformation"]
      : categoryInformationDeserializer(item["categoryInformation"]),
    childConfigurations: !item["childConfigurations"]
      ? item["childConfigurations"]
      : childConfigurationArrayDeserializer(item["childConfigurations"]),
  };
}

/** Category related properties of a child configuration. */
export interface CategoryInformation {
  /** Category name of the child configuration. */
  categoryName?: string;
  /** Category display name of the child configuration. */
  categoryDisplayName?: string;
  /** Description text for the category. */
  description?: string;
  /** Links for the category. */
  links?: Link[];
}

export function categoryInformationDeserializer(item: any): CategoryInformation {
  return {
    categoryName: item["categoryName"],
    categoryDisplayName: item["categoryDisplayName"],
    description: item["description"],
    links: !item["links"] ? item["links"] : linkArrayDeserializer(item["links"]),
  };
}

export function linkArrayDeserializer(result: Array<Link>): any[] {
  return result.map((item) => {
    return linkDeserializer(item);
  });
}

/** Returns link related to the product. */
export interface Link {
  /** Type of link. */
  readonly linkType?: LinkType;
  /** Url of the link. */
  readonly linkUrl?: string;
}

export function linkDeserializer(item: any): Link {
  return {
    linkType: item["linkType"],
    linkUrl: item["linkUrl"],
  };
}

/** Type of link. */
export enum KnownLinkType {
  /** Generic link. */
  Generic = "Generic",
  /** Terms and conditions link. */
  TermsAndConditions = "TermsAndConditions",
  /** Link to product specification. */
  Specification = "Specification",
  /** Link to product documentation. */
  Documentation = "Documentation",
  /** Link to know more. */
  KnowMore = "KnowMore",
  /** Link to sign up for products. */
  SignUp = "SignUp",
  /** Link to order the product from another source and not from Azure Edge Hardware Center. */
  Discoverable = "Discoverable",
}

/**
 * Type of link. \
 * {@link KnownLinkType} can be used interchangeably with LinkType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Generic**: Generic link. \
 * **TermsAndConditions**: Terms and conditions link. \
 * **Specification**: Link to product specification. \
 * **Documentation**: Link to product documentation. \
 * **KnowMore**: Link to know more. \
 * **SignUp**: Link to sign up for products. \
 * **Discoverable**: Link to order the product from another source and not from Azure Edge Hardware Center.
 */
export type LinkType = string;

export function childConfigurationArrayDeserializer(result: Array<ChildConfiguration>): any[] {
  return result.map((item) => {
    return childConfigurationDeserializer(item);
  });
}

/** Child configuration object. */
export interface ChildConfiguration {
  /** Properties of child configuration. */
  readonly properties?: ChildConfigurationProperties;
}

export function childConfigurationDeserializer(item: any): ChildConfiguration {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : childConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of child configuration. */
export interface ChildConfigurationProperties {
  /** Child configuration type. */
  readonly childConfigurationType?: ChildConfigurationType;
  /** Flag to indicate if the child configuration is part of the base configuration, which means the customer need not pass this configuration in OptInAdditionalConfigurations while placing an order, it will be shipped by default. */
  readonly isPartOfBaseConfiguration?: boolean;
  /** Minimum quantity a customer can order while choosing this configuration. */
  readonly minimumQuantity?: number;
  /** Maximum quantity a customer can order while choosing this configuration. */
  readonly maximumQuantity?: number;
  /** Specifications of the configuration. */
  readonly specifications?: Specification[];
  /** Dimensions of the configuration. */
  readonly dimensions?: Dimensions;
  /** Determining nature of provisioning that the configuration supports. */
  readonly provisioningSupport?: ProvisioningSupport;
  /** Different types of child configurations which exist for this configuration, these can be used to populate the child configuration filter. */
  readonly childConfigurationTypes?: ChildConfigurationType[];
  /** Child configurations present for the configuration after applying child configuration filter, grouped by the category name of the child configuration. */
  readonly groupedChildConfigurations?: GroupedChildConfigurations[];
  /** The Term Commitment Durations that are supported for a configuration. */
  readonly supportedTermCommitmentDurations?: string[];
  /** List of filters supported for a product. */
  readonly filterableProperties?: FilterableProperty[];
  /** Display Name for the product system. */
  readonly displayName?: string;
  /** Description related to the product system. */
  readonly description?: Description;
  /** Image information for the product system. */
  readonly imageInformation?: ImageInformation[];
  /** Cost information for the product system. */
  readonly costInformation?: CostInformation;
  /** Availability information of the product system. */
  readonly availabilityInformation?: AvailabilityInformation;
  /** Hierarchy information of a product. */
  readonly hierarchyInformation?: HierarchyInformation;
  /** The entity responsible for fulfillment of the item at the given hierarchy level. */
  readonly fulfilledBy?: FulfillmentType;
}

export function childConfigurationPropertiesDeserializer(item: any): ChildConfigurationProperties {
  return {
    childConfigurationType: item["childConfigurationType"],
    isPartOfBaseConfiguration: item["isPartOfBaseConfiguration"],
    minimumQuantity: item["minimumQuantity"],
    maximumQuantity: item["maximumQuantity"],
    specifications: !item["specifications"]
      ? item["specifications"]
      : specificationArrayDeserializer(item["specifications"]),
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionsDeserializer(item["dimensions"]),
    provisioningSupport: item["provisioningSupport"],
    childConfigurationTypes: !item["childConfigurationTypes"]
      ? item["childConfigurationTypes"]
      : item["childConfigurationTypes"].map((p: any) => {
          return p;
        }),
    groupedChildConfigurations: !item["groupedChildConfigurations"]
      ? item["groupedChildConfigurations"]
      : groupedChildConfigurationsArrayDeserializer(item["groupedChildConfigurations"]),
    supportedTermCommitmentDurations: !item["supportedTermCommitmentDurations"]
      ? item["supportedTermCommitmentDurations"]
      : item["supportedTermCommitmentDurations"].map((p: any) => {
          return p;
        }),
    filterableProperties: !item["filterableProperties"]
      ? item["filterableProperties"]
      : filterablePropertyArrayDeserializer(item["filterableProperties"]),
    displayName: item["displayName"],
    description: !item["description"]
      ? item["description"]
      : descriptionDeserializer(item["description"]),
    imageInformation: !item["imageInformation"]
      ? item["imageInformation"]
      : imageInformationArrayDeserializer(item["imageInformation"]),
    costInformation: !item["costInformation"]
      ? item["costInformation"]
      : costInformationDeserializer(item["costInformation"]),
    availabilityInformation: !item["availabilityInformation"]
      ? item["availabilityInformation"]
      : availabilityInformationDeserializer(item["availabilityInformation"]),
    hierarchyInformation: !item["hierarchyInformation"]
      ? item["hierarchyInformation"]
      : hierarchyInformationDeserializer(item["hierarchyInformation"]),
    fulfilledBy: item["fulfilledBy"],
  };
}

/** Description related properties of a product system. */
export interface Description {
  /** Type of description. */
  readonly descriptionType?: DescriptionType;
  /** Short description of the product system. */
  readonly shortDescription?: string;
  /** Long description of the product system. */
  readonly longDescription?: string;
  /** Keywords for the product system. */
  readonly keywords?: string[];
  /** Attributes for the product system. */
  readonly attributes?: string[];
  /** Links for the product system. */
  readonly links?: Link[];
}

export function descriptionDeserializer(item: any): Description {
  return {
    descriptionType: item["descriptionType"],
    shortDescription: item["shortDescription"],
    longDescription: item["longDescription"],
    keywords: !item["keywords"]
      ? item["keywords"]
      : item["keywords"].map((p: any) => {
          return p;
        }),
    attributes: !item["attributes"]
      ? item["attributes"]
      : item["attributes"].map((p: any) => {
          return p;
        }),
    links: !item["links"] ? item["links"] : linkArrayDeserializer(item["links"]),
  };
}

/** Type of description. */
export enum KnownDescriptionType {
  /** Base description. */
  Base = "Base",
}

/**
 * Type of description. \
 * {@link KnownDescriptionType} can be used interchangeably with DescriptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Base**: Base description.
 */
export type DescriptionType = string;

export function imageInformationArrayDeserializer(result: Array<ImageInformation>): any[] {
  return result.map((item) => {
    return imageInformationDeserializer(item);
  });
}

/** Image for the product. */
export interface ImageInformation {
  /** Type of the image. */
  readonly imageType?: ImageType;
  /** Url of the image. */
  readonly imageUrl?: string;
}

export function imageInformationDeserializer(item: any): ImageInformation {
  return {
    imageType: item["imageType"],
    imageUrl: item["imageUrl"],
  };
}

/** Type of the image. */
export enum KnownImageType {
  /** Main image. */
  MainImage = "MainImage",
  /** Bullet image. */
  BulletImage = "BulletImage",
  /** Generic image. */
  GenericImage = "GenericImage",
}

/**
 * Type of the image. \
 * {@link KnownImageType} can be used interchangeably with ImageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MainImage**: Main image. \
 * **BulletImage**: Bullet image. \
 * **GenericImage**: Generic image.
 */
export type ImageType = string;

/** Cost information for the product system. */
export interface CostInformation {
  /** Details on the various billing aspects for the product system. */
  readonly billingMeterDetails?: BillingMeterDetails[];
  /** Default url to display billing information. */
  readonly billingInfoUrl?: string;
}

export function costInformationDeserializer(item: any): CostInformation {
  return {
    billingMeterDetails: !item["billingMeterDetails"]
      ? item["billingMeterDetails"]
      : billingMeterDetailsArrayDeserializer(item["billingMeterDetails"]),
    billingInfoUrl: item["billingInfoUrl"],
  };
}

export function billingMeterDetailsArrayDeserializer(result: Array<BillingMeterDetails>): any[] {
  return result.map((item) => {
    return billingMeterDetailsDeserializer(item);
  });
}

/** Holds billing meter details for each type of billing. */
export interface BillingMeterDetails {
  /** Represents Billing type name. */
  readonly name?: string;
  /** Represents MeterDetails. */
  readonly meterDetails?: MeterDetailsUnion;
  /** Represents Metering type (eg one-time or recurrent). */
  readonly meteringType?: MeteringType;
  /** Frequency of recurrence. */
  readonly frequency?: string;
  /** Represent Term Type details. */
  readonly termTypeDetails?: TermTypeDetails;
}

export function billingMeterDetailsDeserializer(item: any): BillingMeterDetails {
  return {
    name: item["name"],
    meterDetails: !item["meterDetails"]
      ? item["meterDetails"]
      : meterDetailsUnionDeserializer(item["meterDetails"]),
    meteringType: item["meteringType"],
    frequency: item["frequency"],
    termTypeDetails: !item["termTypeDetails"]
      ? item["termTypeDetails"]
      : termTypeDetailsDeserializer(item["termTypeDetails"]),
  };
}

/** Holds details about billing type and its meter guids. */
export interface MeterDetails {
  /** Represents billing type. */
  /** The discriminator possible values: Pav2, Purchase */
  billingType: BillingType;
  /** Billing unit applicable for Pav2 billing. */
  readonly multiplier?: number;
  /** Charging type. */
  readonly chargingType?: ChargingType;
}

export function meterDetailsDeserializer(item: any): MeterDetails {
  return {
    billingType: item["billingType"],
    multiplier: item["multiplier"],
    chargingType: item["chargingType"],
  };
}

/** Alias for MeterDetailsUnion */
export type MeterDetailsUnion = Pav2MeterDetails | PurchaseMeterDetails | MeterDetails;

export function meterDetailsUnionDeserializer(item: any): MeterDetailsUnion {
  switch (item.billingType) {
    case "Pav2":
      return pav2MeterDetailsDeserializer(item as Pav2MeterDetails);

    case "Purchase":
      return purchaseMeterDetailsDeserializer(item as PurchaseMeterDetails);

    default:
      return meterDetailsDeserializer(item);
  }
}

/** Represents billing type. */
export enum KnownBillingType {
  /** PaV2 billing. */
  Pav2 = "Pav2",
  /** Purchase billing. */
  Purchase = "Purchase",
}

/**
 * Represents billing type. \
 * {@link KnownBillingType} can be used interchangeably with BillingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pav2**: PaV2 billing. \
 * **Purchase**: Purchase billing.
 */
export type BillingType = string;

/** Charging type. */
export enum KnownChargingType {
  /** Per order charging type. */
  PerOrder = "PerOrder",
  /** Per device charging type. */
  PerDevice = "PerDevice",
}

/**
 * Charging type. \
 * {@link KnownChargingType} can be used interchangeably with ChargingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PerOrder**: Per order charging type. \
 * **PerDevice**: Per device charging type.
 */
export type ChargingType = string;

/** Billing type PAV2 meter details. */
export interface Pav2MeterDetails extends MeterDetails {
  /** Validation status of requested data center and transport. */
  readonly meterGuid?: string;
  /** Represents billing type. */
  billingType: "Pav2";
}

export function pav2MeterDetailsDeserializer(item: any): Pav2MeterDetails {
  return {
    billingType: item["billingType"],
    multiplier: item["multiplier"],
    chargingType: item["chargingType"],
    meterGuid: item["meterGuid"],
  };
}

/** Billing type Purchase meter details. */
export interface PurchaseMeterDetails extends MeterDetails {
  /** Product Id. */
  readonly productId?: string;
  /** Sku Id. */
  readonly skuId?: string;
  /** Term Id. */
  readonly termId?: string;
  /** Represents billing type. */
  billingType: "Purchase";
}

export function purchaseMeterDetailsDeserializer(item: any): PurchaseMeterDetails {
  return {
    billingType: item["billingType"],
    multiplier: item["multiplier"],
    chargingType: item["chargingType"],
    productId: item["productId"],
    skuId: item["skuId"],
    termId: item["termId"],
  };
}

/** Represents Metering type (eg one-time or recurrent). */
export enum KnownMeteringType {
  /** One time billing. */
  OneTime = "OneTime",
  /** Recurring billing. */
  Recurring = "Recurring",
  /** Adhoc billing. */
  Adhoc = "Adhoc",
}

/**
 * Represents Metering type (eg one-time or recurrent). \
 * {@link KnownMeteringType} can be used interchangeably with MeteringType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OneTime**: One time billing. \
 * **Recurring**: Recurring billing. \
 * **Adhoc**: Adhoc billing.
 */
export type MeteringType = string;

/** Holds details about term type and duration. */
export interface TermTypeDetails {
  /** Term Commitment Type */
  termType: TermCommitmentType;
  /** Duration for the term type. */
  termTypeDuration: string;
}

export function termTypeDetailsDeserializer(item: any): TermTypeDetails {
  return {
    termType: item["termType"],
    termTypeDuration: item["termTypeDuration"],
  };
}

/** Availability information of a product system. */
export interface AvailabilityInformation {
  /** Current availability stage of the product. */
  readonly availabilityStage?: AvailabilityStage;
  /** Reason why the product is disabled. */
  readonly disabledReason?: DisabledReason;
  /** Message for why the product is disabled. */
  readonly disabledReasonMessage?: string;
}

export function availabilityInformationDeserializer(item: any): AvailabilityInformation {
  return {
    availabilityStage: item["availabilityStage"],
    disabledReason: item["disabledReason"],
    disabledReasonMessage: item["disabledReasonMessage"],
  };
}

/** Current availability stage of the product. */
export enum KnownAvailabilityStage {
  /** Product is available. */
  Available = "Available",
  /** Product is in preview. */
  Preview = "Preview",
  /** Product is available only on signup. */
  Signup = "Signup",
  /** Product is not available in our service but can be discovered from other sources. */
  Discoverable = "Discoverable",
  /** Product is coming soon. */
  ComingSoon = "ComingSoon",
  /** Product is not available. */
  Unavailable = "Unavailable",
  /** Product is deprecated. */
  Deprecated = "Deprecated",
}

/**
 * Current availability stage of the product. \
 * {@link KnownAvailabilityStage} can be used interchangeably with AvailabilityStage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: Product is available. \
 * **Preview**: Product is in preview. \
 * **Signup**: Product is available only on signup. \
 * **Discoverable**: Product is not available in our service but can be discovered from other sources. \
 * **ComingSoon**: Product is coming soon. \
 * **Unavailable**: Product is not available. \
 * **Deprecated**: Product is deprecated.
 */
export type AvailabilityStage = string;

/** Reason why the product is disabled. */
export enum KnownDisabledReason {
  /** Not disabled. */
  None = "None",
  /** Not available in the requested country. */
  Country = "Country",
  /** Not available to push data to the requested Azure region. */
  Region = "Region",
  /** Required features are not enabled. */
  Feature = "Feature",
  /** Subscription does not have required offer types. */
  OfferType = "OfferType",
  /** Subscription has not registered to Microsoft.DataBox and Service does not have the subscription notification. */
  NoSubscriptionInfo = "NoSubscriptionInfo",
  /** The product is not yet available. */
  NotAvailable = "NotAvailable",
  /** The product is out of stock. */
  OutOfStock = "OutOfStock",
}

/**
 * Reason why the product is disabled. \
 * {@link KnownDisabledReason} can be used interchangeably with DisabledReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Not disabled. \
 * **Country**: Not available in the requested country. \
 * **Region**: Not available to push data to the requested Azure region. \
 * **Feature**: Required features are not enabled. \
 * **OfferType**: Subscription does not have required offer types. \
 * **NoSubscriptionInfo**: Subscription has not registered to Microsoft.DataBox and Service does not have the subscription notification. \
 * **NotAvailable**: The product is not yet available. \
 * **OutOfStock**: The product is out of stock.
 */
export type DisabledReason = string;

/** The entity responsible for fulfillment of the item at the given hierarchy level. */
export enum KnownFulfillmentType {
  /** The fulfillment (the whole journey of the product offering) is handled by microsoft. */
  Microsoft = "Microsoft",
  /** The fulfillment (the whole journey of the product offering) is handled by external third party entities. */
  External = "External",
}

/**
 * The entity responsible for fulfillment of the item at the given hierarchy level. \
 * {@link KnownFulfillmentType} can be used interchangeably with FulfillmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft**: The fulfillment (the whole journey of the product offering) is handled by microsoft. \
 * **External**: The fulfillment (the whole journey of the product offering) is handled by external third party entities.
 */
export type FulfillmentType = string;

/** Represents common properties across product hierarchy. */
export interface CommonProperties extends BasicInformation {
  /** List of filters supported for a product. */
  readonly filterableProperties?: FilterableProperty[];
}

export function commonPropertiesDeserializer(item: any): CommonProperties {
  return {
    displayName: item["displayName"],
    description: !item["description"]
      ? item["description"]
      : descriptionDeserializer(item["description"]),
    imageInformation: !item["imageInformation"]
      ? item["imageInformation"]
      : imageInformationArrayDeserializer(item["imageInformation"]),
    costInformation: !item["costInformation"]
      ? item["costInformation"]
      : costInformationDeserializer(item["costInformation"]),
    availabilityInformation: !item["availabilityInformation"]
      ? item["availabilityInformation"]
      : availabilityInformationDeserializer(item["availabilityInformation"]),
    hierarchyInformation: !item["hierarchyInformation"]
      ? item["hierarchyInformation"]
      : hierarchyInformationDeserializer(item["hierarchyInformation"]),
    fulfilledBy: item["fulfilledBy"],
    filterableProperties: !item["filterableProperties"]
      ? item["filterableProperties"]
      : filterablePropertyArrayDeserializer(item["filterableProperties"]),
  };
}

/** Basic information for any product system. */
export interface BasicInformation {
  /** Display Name for the product system. */
  readonly displayName?: string;
  /** Description related to the product system. */
  readonly description?: Description;
  /** Image information for the product system. */
  readonly imageInformation?: ImageInformation[];
  /** Cost information for the product system. */
  readonly costInformation?: CostInformation;
  /** Availability information of the product system. */
  readonly availabilityInformation?: AvailabilityInformation;
  /** Hierarchy information of a product. */
  readonly hierarchyInformation?: HierarchyInformation;
  /** The entity responsible for fulfillment of the item at the given hierarchy level. */
  readonly fulfilledBy?: FulfillmentType;
}

export function basicInformationDeserializer(item: any): BasicInformation {
  return {
    displayName: item["displayName"],
    description: !item["description"]
      ? item["description"]
      : descriptionDeserializer(item["description"]),
    imageInformation: !item["imageInformation"]
      ? item["imageInformation"]
      : imageInformationArrayDeserializer(item["imageInformation"]),
    costInformation: !item["costInformation"]
      ? item["costInformation"]
      : costInformationDeserializer(item["costInformation"]),
    availabilityInformation: !item["availabilityInformation"]
      ? item["availabilityInformation"]
      : availabilityInformationDeserializer(item["availabilityInformation"]),
    hierarchyInformation: !item["hierarchyInformation"]
      ? item["hierarchyInformation"]
      : hierarchyInformationDeserializer(item["hierarchyInformation"]),
    fulfilledBy: item["fulfilledBy"],
  };
}

/** The filters for showing the product families. */
export interface ProductFamiliesRequest {
  /** Dictionary of filterable properties on product family. */
  filterableProperties: Record<string, FilterableProperty[]>;
  /** Customer subscription properties. Clients can display available products to unregistered customers by explicitly passing subscription details. */
  customerSubscriptionDetails?: CustomerSubscriptionDetails;
}

export function productFamiliesRequestSerializer(item: ProductFamiliesRequest): any {
  return {
    filterableProperties: filterablePropertyArrayRecordSerializer(item["filterableProperties"]),
    customerSubscriptionDetails: !item["customerSubscriptionDetails"]
      ? item["customerSubscriptionDetails"]
      : customerSubscriptionDetailsSerializer(item["customerSubscriptionDetails"]),
  };
}

export function filterablePropertyArrayRecordSerializer(
  item: Record<string, Array<FilterableProperty>>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : filterablePropertyArraySerializer(item[key]);
  });
  return result;
}

export function filterablePropertyArrayRecordDeserializer(
  item: Record<string, any>,
): Record<string, Array<FilterableProperty>> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : filterablePropertyArrayDeserializer(item[key]);
  });
  return result;
}

/** The list of product families. */
export interface _ProductFamilies {
  /** The ProductFamily items on this page */
  readonly value: ProductFamily[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _productFamiliesDeserializer(item: any): _ProductFamilies {
  return {
    value: productFamilyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function productFamilyArrayDeserializer(result: Array<ProductFamily>): any[] {
  return result.map((item) => {
    return productFamilyDeserializer(item);
  });
}

/** Product Family. */
export interface ProductFamily {
  /** Properties of product family. */
  readonly properties?: ProductFamilyProperties;
}

export function productFamilyDeserializer(item: any): ProductFamily {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : productFamilyPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of product family. */
export interface ProductFamilyProperties extends CommonProperties {
  /** List of product lines supported in the product family. */
  readonly productLines?: ProductLine[];
  /** Contains details related to resource provider. */
  resourceProviderDetails?: ResourceProviderDetails[];
}

export function productFamilyPropertiesDeserializer(item: any): ProductFamilyProperties {
  return {
    filterableProperties: !item["filterableProperties"]
      ? item["filterableProperties"]
      : filterablePropertyArrayDeserializer(item["filterableProperties"]),
    displayName: item["displayName"],
    description: !item["description"]
      ? item["description"]
      : descriptionDeserializer(item["description"]),
    imageInformation: !item["imageInformation"]
      ? item["imageInformation"]
      : imageInformationArrayDeserializer(item["imageInformation"]),
    costInformation: !item["costInformation"]
      ? item["costInformation"]
      : costInformationDeserializer(item["costInformation"]),
    availabilityInformation: !item["availabilityInformation"]
      ? item["availabilityInformation"]
      : availabilityInformationDeserializer(item["availabilityInformation"]),
    hierarchyInformation: !item["hierarchyInformation"]
      ? item["hierarchyInformation"]
      : hierarchyInformationDeserializer(item["hierarchyInformation"]),
    fulfilledBy: item["fulfilledBy"],
    productLines: !item["productLines"]
      ? item["productLines"]
      : productLineArrayDeserializer(item["productLines"]),
    resourceProviderDetails: !item["resourceProviderDetails"]
      ? item["resourceProviderDetails"]
      : resourceProviderDetailsArrayDeserializer(item["resourceProviderDetails"]),
  };
}

export function productLineArrayDeserializer(result: Array<ProductLine>): any[] {
  return result.map((item) => {
    return productLineDeserializer(item);
  });
}

/** Product line. */
export interface ProductLine {
  /** Properties of product line. */
  readonly properties?: ProductLineProperties;
}

export function productLineDeserializer(item: any): ProductLine {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : productLinePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of product line. */
export interface ProductLineProperties extends CommonProperties {
  /** List of products in the product line. */
  readonly products?: Product[];
}

export function productLinePropertiesDeserializer(item: any): ProductLineProperties {
  return {
    filterableProperties: !item["filterableProperties"]
      ? item["filterableProperties"]
      : filterablePropertyArrayDeserializer(item["filterableProperties"]),
    displayName: item["displayName"],
    description: !item["description"]
      ? item["description"]
      : descriptionDeserializer(item["description"]),
    imageInformation: !item["imageInformation"]
      ? item["imageInformation"]
      : imageInformationArrayDeserializer(item["imageInformation"]),
    costInformation: !item["costInformation"]
      ? item["costInformation"]
      : costInformationDeserializer(item["costInformation"]),
    availabilityInformation: !item["availabilityInformation"]
      ? item["availabilityInformation"]
      : availabilityInformationDeserializer(item["availabilityInformation"]),
    hierarchyInformation: !item["hierarchyInformation"]
      ? item["hierarchyInformation"]
      : hierarchyInformationDeserializer(item["hierarchyInformation"]),
    fulfilledBy: item["fulfilledBy"],
    products: !item["products"] ? item["products"] : productArrayDeserializer(item["products"]),
  };
}

export function productArrayDeserializer(result: Array<Product>): any[] {
  return result.map((item) => {
    return productDeserializer(item);
  });
}

/** Represents a product. */
export interface Product {
  /** Properties of product. */
  readonly properties?: ProductProperties;
}

export function productDeserializer(item: any): Product {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : productPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of product. */
export interface ProductProperties extends CommonProperties {
  /** List of configurations for the product. */
  readonly configurations?: Configuration[];
}

export function productPropertiesDeserializer(item: any): ProductProperties {
  return {
    filterableProperties: !item["filterableProperties"]
      ? item["filterableProperties"]
      : filterablePropertyArrayDeserializer(item["filterableProperties"]),
    displayName: item["displayName"],
    description: !item["description"]
      ? item["description"]
      : descriptionDeserializer(item["description"]),
    imageInformation: !item["imageInformation"]
      ? item["imageInformation"]
      : imageInformationArrayDeserializer(item["imageInformation"]),
    costInformation: !item["costInformation"]
      ? item["costInformation"]
      : costInformationDeserializer(item["costInformation"]),
    availabilityInformation: !item["availabilityInformation"]
      ? item["availabilityInformation"]
      : availabilityInformationDeserializer(item["availabilityInformation"]),
    hierarchyInformation: !item["hierarchyInformation"]
      ? item["hierarchyInformation"]
      : hierarchyInformationDeserializer(item["hierarchyInformation"]),
    fulfilledBy: item["fulfilledBy"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : configurationArrayDeserializer(item["configurations"]),
  };
}

/** Holds details about product family metadata. */
export interface _ProductFamiliesMetadata {
  /** The ProductFamiliesMetadataDetails items on this page */
  readonly value: ProductFamiliesMetadataDetails[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _productFamiliesMetadataDeserializer(item: any): _ProductFamiliesMetadata {
  return {
    value: productFamiliesMetadataDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function productFamiliesMetadataDetailsArrayDeserializer(
  result: Array<ProductFamiliesMetadataDetails>,
): any[] {
  return result.map((item) => {
    return productFamiliesMetadataDetailsDeserializer(item);
  });
}

/** Product families metadata details. */
export interface ProductFamiliesMetadataDetails {
  /** Product family properties. */
  readonly properties?: ProductFamilyProperties;
}

export function productFamiliesMetadataDetailsDeserializer(
  item: any,
): ProductFamiliesMetadataDetails {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : productFamilyPropertiesDeserializer(item["properties"]),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-02-01 API version. */
  V20240201 = "2024-02-01",
}
