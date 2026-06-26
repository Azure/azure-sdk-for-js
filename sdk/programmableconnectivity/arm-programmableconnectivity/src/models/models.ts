// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

/** Localized display information for an operation. */
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

/** A Programmable Connectivity Gateway resource. */
export interface Gateway extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: GatewayProperties;
}

export function gatewaySerializer(item: Gateway): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : gatewayPropertiesSerializer(item["properties"]),
  };
}

export function gatewayDeserializer(item: any): Gateway {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : gatewayPropertiesDeserializer(item["properties"]),
  };
}

/** Gateway resource properties. */
export interface GatewayProperties {
  /** List of Operator API Connections selected by the user. */
  readonly operatorApiConnections?: string[];
  /** Base URL of the Gateway resource. This is the URL that the users would use to make Network API requests to the Operators via Azure. */
  readonly gatewayBaseUrl?: string;
  /** The status of the last operation on the Gateway resource. */
  readonly provisioningState?: ProvisioningState;
  /** Details about the Application that would use the Operator's Network APIs. */
  configuredApplication: ApplicationProperties;
  /** Details about the Organization owning the Application that would use the Operator's Network APIs. */
  configuredApplicationOwner: ApplicationOwnerProperties;
}

export function gatewayPropertiesSerializer(item: GatewayProperties): any {
  return {
    configuredApplication: applicationPropertiesSerializer(item["configuredApplication"]),
    configuredApplicationOwner: applicationOwnerPropertiesSerializer(
      item["configuredApplicationOwner"],
    ),
  };
}

export function gatewayPropertiesDeserializer(item: any): GatewayProperties {
  return {
    operatorApiConnections: !item["operatorApiConnections"]
      ? item["operatorApiConnections"]
      : item["operatorApiConnections"].map((p: any) => {
          return p;
        }),
    gatewayBaseUrl: item["gatewayBaseUrl"],
    provisioningState: item["provisioningState"],
    configuredApplication: applicationPropertiesDeserializer(item["configuredApplication"]),
    configuredApplicationOwner: applicationOwnerPropertiesDeserializer(
      item["configuredApplicationOwner"],
    ),
  };
}

/** The provisioning state of a resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned */
  Provisioning = "Provisioning",
  /** The resource is updating */
  Updating = "Updating",
  /** The resource is being deleted */
  Deleting = "Deleting",
  /** The resource create or update request has been accepted */
  Accepted = "Accepted",
}

/**
 * The provisioning state of a resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: The resource is being provisioned \
 * **Updating**: The resource is updating \
 * **Deleting**: The resource is being deleted \
 * **Accepted**: The resource create or update request has been accepted
 */
export type ProvisioningState = string;

/** Details about the Application that would use the Operator's Network APIs. */
export interface ApplicationProperties {
  /** Name of the application. */
  name: string;
  /** Description of the application. */
  applicationDescription: string;
  /** The category of the application. */
  category: Category;
  /** Commercial name of the application. */
  commercialName: string;
  /** Privacy rights request email address. */
  privacyRightsRequestEmailAddress: string;
  /** URL for the organization's privacy policy. */
  privacyPolicyUrl: string;
}

export function applicationPropertiesSerializer(item: ApplicationProperties): any {
  return {
    name: item["name"],
    applicationDescription: item["applicationDescription"],
    category: item["category"],
    commercialName: item["commercialName"],
    privacyRightsRequestEmailAddress: item["privacyRightsRequestEmailAddress"],
    privacyPolicyUrl: item["privacyPolicyUrl"],
  };
}

export function applicationPropertiesDeserializer(item: any): ApplicationProperties {
  return {
    name: item["name"],
    applicationDescription: item["applicationDescription"],
    category: item["category"],
    commercialName: item["commercialName"],
    privacyRightsRequestEmailAddress: item["privacyRightsRequestEmailAddress"],
    privacyPolicyUrl: item["privacyPolicyUrl"],
  };
}

/** Valid values for category based on https://www.tmforum.org/oda/open-apis/directory/open-gateway-onboarding-and-ordering-component-suite-TMF931 */
export enum KnownCategory {
  /** Agriculture */
  Agriculture = "Agriculture",
  /** Art and design */
  ArtAndDesign = "Art and design",
  /** Auto and vehicle */
  AutoAndVehicle = "Auto and vehicle",
  /** Beauty */
  Beauty = "Beauty",
  /** Books and reference */
  BooksAndReference = "Books and reference",
  /** Business */
  Business = "Business",
  /** Construction */
  Construction = "Construction",
  /** Defense */
  Defense = "Defense",
  /** Developer tools */
  DeveloperTools = "Developer tools",
  /** Education */
  Education = "Education",
  /** Engineering */
  Engineering = "Engineering",
  /** Events and entertainment */
  EventsAndEntertainment = "Events and entertainment",
  /** Finance */
  Finance = "Finance",
  /** Food and drink */
  FoodAndDrink = "Food and drink",
  /** Games */
  Games = "Games",
  /** Health and fitness */
  HealthAndFitness = "Health and fitness",
  /** Healthcare */
  Healthcare = "Healthcare",
  /** Information */
  Information = "Information",
  /** Kids */
  Kids = "Kids",
  /** Libraries and demo */
  LibrariesAndDemo = "Libraries and demo",
  /** Lifestyle */
  Lifestyle = "Lifestyle",
  /** Manufacturing */
  Manufacturing = "Manufacturing",
  /** Maps and navigation */
  MapsAndNavigation = "Maps and navigation",
  /** Media */
  Media = "Media",
  /** Medical */
  Medical = "Medical",
  /** Mining */
  Mining = "Mining",
  /** Music and audio */
  MusicAndAudio = "Music and audio",
  /** News and magazines */
  NewsAndMagazines = "News and magazines",
  /** Organizations */
  Organizations = "Organizations",
  /** Other */
  Other = "Other",
  /** Photo and video */
  PhotoAndVideo = "Photo and video",
  /** Productivity */
  Productivity = "Productivity",
  /** Public service */
  PublicService = "Public service",
  /** Real estate */
  RealEstate = "Real estate",
  /** Shopping */
  Shopping = "Shopping",
  /** Social networking and communications */
  SocialNetworkingAndCommunications = "Social networking and communications",
  /** Sports */
  Sports = "Sports",
  /** Tourism */
  Tourism = "Tourism",
  /** Utilities */
  Utilities = "Utilities",
  /** Trading */
  Trading = "Trading",
  /** Transportation */
  Transportation = "Transportation",
  /** Travel and local */
  TravelAndLocal = "Travel and local",
  /** Water */
  Water = "Water",
  /** Weather */
  Weather = "Weather",
}

/**
 * Valid values for category based on https://www.tmforum.org/oda/open-apis/directory/open-gateway-onboarding-and-ordering-component-suite-TMF931 \
 * {@link KnownCategory} can be used interchangeably with Category,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Agriculture** \
 * **Art and design** \
 * **Auto and vehicle** \
 * **Beauty** \
 * **Books and reference** \
 * **Business** \
 * **Construction** \
 * **Defense** \
 * **Developer tools** \
 * **Education** \
 * **Engineering** \
 * **Events and entertainment** \
 * **Finance** \
 * **Food and drink** \
 * **Games** \
 * **Health and fitness** \
 * **Healthcare** \
 * **Information** \
 * **Kids** \
 * **Libraries and demo** \
 * **Lifestyle** \
 * **Manufacturing** \
 * **Maps and navigation** \
 * **Media** \
 * **Medical** \
 * **Mining** \
 * **Music and audio** \
 * **News and magazines** \
 * **Organizations** \
 * **Other** \
 * **Photo and video** \
 * **Productivity** \
 * **Public service** \
 * **Real estate** \
 * **Shopping** \
 * **Social networking and communications** \
 * **Sports** \
 * **Tourism** \
 * **Utilities** \
 * **Trading** \
 * **Transportation** \
 * **Travel and local** \
 * **Water** \
 * **Weather**
 */
export type Category = string;

/** Details about the Application Owner (i.e. organization) that would use the Operator's Network APIs. */
export interface ApplicationOwnerProperties {
  /** Common name of the organization owning the application. */
  name: string;
  /** Legal name of the organization owning the application. */
  legalName: string;
  /** Trading name of the organization owning the application. */
  tradingName: string;
  /** A description of the organization owning the application. */
  organizationDescription: string;
  /** Unique Tax Number for the user's organization in the country/region the APC Gateway is being purchased. */
  taxNumber: string;
  /** The type of organization that the Application Owner is. */
  organizationType: OrganizationType;
  /** ID number for official identification of the organization. */
  organizationIdentificationId: string;
  /** Issuing organization of the ID for official identification of the organization. */
  organizationIdentificationIssuer: string;
  /** Type of official identification of the organization. */
  organizationIdentificationType: string;
  /** Email address for the person responsible for the use of Network APIs in this application. */
  contactEmailAddress: string;
  /** Legal representative of the organization. */
  legalRepresentative: Person;
  /** Privacy manager of the organization. */
  privacyManager: Person;
  /** Data Protection Officer of the organization. */
  dataProtectionOfficer: Person;
  /** Registered Geographic address. */
  registeredGeographicAddress: GeographicAddress;
  /** URL for the organization's privacy policy. */
  privacyPolicyUrl: string;
  /** List of local representatives. */
  localRepresentatives: LocalRepresentative[];
}

export function applicationOwnerPropertiesSerializer(item: ApplicationOwnerProperties): any {
  return {
    name: item["name"],
    legalName: item["legalName"],
    tradingName: item["tradingName"],
    organizationDescription: item["organizationDescription"],
    taxNumber: item["taxNumber"],
    organizationType: item["organizationType"],
    organizationIdentificationId: item["organizationIdentificationId"],
    organizationIdentificationIssuer: item["organizationIdentificationIssuer"],
    organizationIdentificationType: item["organizationIdentificationType"],
    contactEmailAddress: item["contactEmailAddress"],
    legalRepresentative: personSerializer(item["legalRepresentative"]),
    privacyManager: personSerializer(item["privacyManager"]),
    dataProtectionOfficer: personSerializer(item["dataProtectionOfficer"]),
    registeredGeographicAddress: geographicAddressSerializer(item["registeredGeographicAddress"]),
    privacyPolicyUrl: item["privacyPolicyUrl"],
    localRepresentatives: localRepresentativeArraySerializer(item["localRepresentatives"]),
  };
}

export function applicationOwnerPropertiesDeserializer(item: any): ApplicationOwnerProperties {
  return {
    name: item["name"],
    legalName: item["legalName"],
    tradingName: item["tradingName"],
    organizationDescription: item["organizationDescription"],
    taxNumber: item["taxNumber"],
    organizationType: item["organizationType"],
    organizationIdentificationId: item["organizationIdentificationId"],
    organizationIdentificationIssuer: item["organizationIdentificationIssuer"],
    organizationIdentificationType: item["organizationIdentificationType"],
    contactEmailAddress: item["contactEmailAddress"],
    legalRepresentative: personDeserializer(item["legalRepresentative"]),
    privacyManager: personDeserializer(item["privacyManager"]),
    dataProtectionOfficer: personDeserializer(item["dataProtectionOfficer"]),
    registeredGeographicAddress: geographicAddressDeserializer(item["registeredGeographicAddress"]),
    privacyPolicyUrl: item["privacyPolicyUrl"],
    localRepresentatives: localRepresentativeArrayDeserializer(item["localRepresentatives"]),
  };
}

/** Valid values for the Organization Type based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. */
export enum KnownOrganizationType {
  /** Academic scientific organization */
  AcademicScientificOrganization = "Academic scientific organization",
  /** For profit organization */
  ForProfitOrganization = "For profit organization",
  /** Governmental organization */
  GovernmentalOrganization = "Governmental organization",
  /** Industry consortium */
  IndustryConsortium = "Industry consortium",
  /** International organization */
  InternationalOrganization = "International organization",
  /** Non-governmental organization */
  NonGovernmentalOrganization = "Non-governmental organization",
  /** Non-profit organization */
  NonProfitOrganization = "Non-profit organization",
  /** Organizational unit */
  OrganizationalUnit = "Organizational unit",
}

/**
 * Valid values for the Organization Type based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. \
 * {@link KnownOrganizationType} can be used interchangeably with OrganizationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Academic scientific organization** \
 * **For profit organization** \
 * **Governmental organization** \
 * **Industry consortium** \
 * **International organization** \
 * **Non-governmental organization** \
 * **Non-profit organization** \
 * **Organizational unit**
 */
export type OrganizationType = string;

/** Model defining a contactable person. */
export interface Person {
  /** Family name of the contactable person. */
  familyName: string;
  /** Given name of the contactable person. */
  givenName: string;
  /** Email address of the contactable person. */
  emailAddress: string;
}

export function personSerializer(item: Person): any {
  return {
    familyName: item["familyName"],
    givenName: item["givenName"],
    emailAddress: item["emailAddress"],
  };
}

export function personDeserializer(item: any): Person {
  return {
    familyName: item["familyName"],
    givenName: item["givenName"],
    emailAddress: item["emailAddress"],
  };
}

/** Model defining a geographic address. */
export interface GeographicAddress {
  /** Street Number of the address. */
  streetNumber?: string;
  /** Street Name of the address. */
  streetName?: string;
  /** Locality of the address. */
  locality?: string;
  /** City of the address. */
  city?: string;
  /** State or province of the address. */
  stateOrProvince?: string;
  /** Postal code of the address. */
  postalCode?: string;
  /** Country code of the address. */
  countryCode: string;
}

export function geographicAddressSerializer(item: GeographicAddress): any {
  return {
    streetNumber: item["streetNumber"],
    streetName: item["streetName"],
    locality: item["locality"],
    city: item["city"],
    stateOrProvince: item["stateOrProvince"],
    postalCode: item["postalCode"],
    countryCode: item["countryCode"],
  };
}

export function geographicAddressDeserializer(item: any): GeographicAddress {
  return {
    streetNumber: item["streetNumber"],
    streetName: item["streetName"],
    locality: item["locality"],
    city: item["city"],
    stateOrProvince: item["stateOrProvince"],
    postalCode: item["postalCode"],
    countryCode: item["countryCode"],
  };
}

export function localRepresentativeArraySerializer(result: Array<LocalRepresentative>): any[] {
  return result.map((item) => {
    return localRepresentativeSerializer(item);
  });
}

export function localRepresentativeArrayDeserializer(result: Array<LocalRepresentative>): any[] {
  return result.map((item) => {
    return localRepresentativeDeserializer(item);
  });
}

/** Model defining a local representative for a country/region. */
export interface LocalRepresentative {
  /** Country code for the country/region the local representative is representing. */
  countryCode: string;
  /** Local representative for this country/region. */
  representative: Person;
}

export function localRepresentativeSerializer(item: LocalRepresentative): any {
  return {
    countryCode: item["countryCode"],
    representative: personSerializer(item["representative"]),
  };
}

export function localRepresentativeDeserializer(item: any): LocalRepresentative {
  return {
    countryCode: item["countryCode"],
    representative: personDeserializer(item["representative"]),
  };
}

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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
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

export function resourceSerializer(_item: Resource): any {
  return {};
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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The type used for updating tags in Gateway resources. */
export interface GatewayTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function gatewayTagsUpdateSerializer(item: GatewayTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a Gateway list operation. */
export interface _GatewayListResult {
  /** The Gateway items on this page */
  value: Gateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _gatewayListResultDeserializer(item: any): _GatewayListResult {
  return {
    value: gatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gatewayArraySerializer(result: Array<Gateway>): any[] {
  return result.map((item) => {
    return gatewaySerializer(item);
  });
}

export function gatewayArrayDeserializer(result: Array<Gateway>): any[] {
  return result.map((item) => {
    return gatewayDeserializer(item);
  });
}

/** A Programmable Connectivity Operator API Connection resource */
export interface OperatorApiConnection extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: OperatorApiConnectionProperties;
}

export function operatorApiConnectionSerializer(item: OperatorApiConnection): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : operatorApiConnectionPropertiesSerializer(item["properties"]),
  };
}

export function operatorApiConnectionDeserializer(item: any): OperatorApiConnection {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : operatorApiConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Operator API Connection resource properties that cannot be updated once a resource has been created. */
export interface OperatorApiConnectionProperties {
  /** Reference to the Operator API Plan Resource ID. */
  operatorApiPlanId: string;
  /** Reference to the APC Gateway resource ID. */
  gatewayId: string;
  /** Name of the Operator in the linked Operator API Plan belongs to. */
  readonly operatorName?: string;
  /** The Network API for the current operator in the country/region provided in the linked Operator API Plan. */
  readonly camaraApiName?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** The status of the OperatorApiConnection resource. */
  readonly status?: Status;
  /**
   * Whether the caller has accepted the Terms and Conditions of the associated Operator API Plan.
   * After creation, the planTermsAndConditionsLink property is set to the Terms and Conditions that
   * have been accepted.
   *
   * Must be set to True, as the Terms and Conditions must be accepted.
   */
  planTermsAndConditionsAccepted: boolean;
  /** Links to the Terms and Conditions of the Operator API Plan that were accepted on creation. */
  readonly planTermsAndConditionsLinks?: string[];
  /** The purpose for which the Application will use the API. Max Items 1 currently as Operators do not support multiple. */
  purposes: Purpose[];
  /** Explanation of the reason that justifies the purpose: specifically why is the API used for the application's use case. */
  purposeReason: string;
  /** List of ways the data returned on this API is processed. */
  dataProcessingList: DataProcessing[];
}

export function operatorApiConnectionPropertiesSerializer(
  item: OperatorApiConnectionProperties,
): any {
  return {
    operatorApiPlanId: item["operatorApiPlanId"],
    gatewayId: item["gatewayId"],
    planTermsAndConditionsAccepted: item["planTermsAndConditionsAccepted"],
    purposes: item["purposes"].map((p: any) => {
      return p;
    }),
    purposeReason: item["purposeReason"],
    dataProcessingList: dataProcessingArraySerializer(item["dataProcessingList"]),
  };
}

export function operatorApiConnectionPropertiesDeserializer(
  item: any,
): OperatorApiConnectionProperties {
  return {
    operatorApiPlanId: item["operatorApiPlanId"],
    gatewayId: item["gatewayId"],
    operatorName: item["operatorName"],
    camaraApiName: item["camaraApiName"],
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : statusDeserializer(item["status"]),
    planTermsAndConditionsAccepted: item["planTermsAndConditionsAccepted"],
    planTermsAndConditionsLinks: !item["planTermsAndConditionsLinks"]
      ? item["planTermsAndConditionsLinks"]
      : item["planTermsAndConditionsLinks"].map((p: any) => {
          return p;
        }),
    purposes: item["purposes"].map((p: any) => {
      return p;
    }),
    purposeReason: item["purposeReason"],
    dataProcessingList: dataProcessingArrayDeserializer(item["dataProcessingList"]),
  };
}

/** Description of the current status of the OperatorApiConnection resource. */
export interface Status {
  /** Current state of the OperatorApiConnection resource. */
  state?: string;
  /** Explanation of the current state of the OperatorApiConnection resource. */
  reason?: string;
}

export function statusDeserializer(item: any): Status {
  return {
    state: item["state"],
    reason: item["reason"],
  };
}

/** Valid values for the purpose based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. */
export enum KnownPurpose {
  /** Academic Research */
  AcademicResearch = "Academic Research",
  /** Account Management */
  AccountManagement = "Account Management",
  /** Advertising */
  Advertising = "Advertising",
  /** Age Verification */
  AgeVerification = "Age Verification",
  /** Combat Climate Change */
  CombatClimateChange = "Combat Climate Change",
  /** Commercial Purpose */
  CommercialPurpose = "Commercial Purpose",
  /** Commercial Research */
  CommercialResearch = "Commercial Research",
  /** Communication For Customer Care */
  CommunicationForCustomerCare = "Communication For Customer Care",
  /** Communication Management */
  CommunicationManagement = "Communication Management",
  /** Counter Money Laundering */
  CounterMoneyLaundering = "Counter Money Laundering",
  /** Counter-terrorism */
  Counterterrorism = "Counter-terrorism",
  /** Credit Checking */
  CreditChecking = "Credit Checking",
  /** Customer Care */
  CustomerCare = "Customer Care",
  /** Customer Claims Management */
  CustomerClaimsManagement = "Customer Claims Management",
  /** Customer Management */
  CustomerManagement = "Customer Management",
  /** Customer Order Management */
  CustomerOrderManagement = "Customer Order Management",
  /** Customer Relationship Management */
  CustomerRelationshipManagement = "Customer Relationship Management",
  /** Customer Solvency Monitoring */
  CustomerSolvencyMonitoring = "Customer Solvency Monitoring",
  /** Data Altruism */
  DataAltruism = "Data Altruism",
  /** Delivery Of Goods */
  DeliveryOfGoods = "Delivery Of Goods",
  /** Direct Marketing */
  DirectMarketing = "Direct Marketing",
  /** Dispute Management */
  DisputeManagement = "Dispute Management",
  /** Enforce Access Control */
  EnforceAccessControl = "Enforce Access Control",
  /** Enforce Security */
  EnforceSecurity = "Enforce Security",
  /** Establish Contractual Agreement */
  EstablishContractualAgreement = "Establish Contractual Agreement",
  /** Fraud Prevention And Detection */
  FraudPreventionAndDetection = "Fraud Prevention And Detection",
  /** Fulfillment Of Contractual Obligation */
  FulfillmentOfContractualObligation = "Fulfillment Of Contractual Obligation",
  /** Fulfillment Of Obligation */
  FulfillmentOfObligation = "Fulfillment Of Obligation",
  /** Human Resource Management */
  HumanResourceManagement = "Human Resource Management",
  /** Identity Authentication */
  IdentityAuthentication = "Identity Authentication",
  /** Identity Verification */
  IdentityVerification = "Identity Verification",
  /** Improve Existing Products And Services */
  ImproveExistingProductsAndServices = "Improve Existing Products And Services",
  /** Improve Healthcare */
  ImproveHealthcare = "Improve Healthcare",
  /** Improve Internal CRM Processes */
  ImproveInternalCRMProcesses = "Improve Internal CRM Processes",
  /** Improve Public Services */
  ImprovePublicServices = "Improve Public Services",
  /** Improve Transport Mobility */
  ImproveTransportMobility = "Improve Transport Mobility",
  /** Increase Service Robustness */
  IncreaseServiceRobustness = "Increase Service Robustness",
  /** Internal Resource Optimization */
  InternalResourceOptimization = "Internal Resource Optimization",
  /** Legal Compliance */
  LegalCompliance = "Legal Compliance",
  /** Maintain Credit Checking Database */
  MaintainCreditCheckingDatabase = "Maintain Credit Checking Database",
  /** Maintain Credit Rating Database */
  MaintainCreditRatingDatabase = "Maintain Credit Rating Database",
  /** Maintain Fraud Database */
  MaintainFraudDatabase = "Maintain Fraud Database",
  /** Marketing */
  Marketing = "Marketing",
  /** Member Partner Management */
  MemberPartnerManagement = "Member Partner Management",
  /** Misuse Prevention And Detection */
  MisusePreventionAndDetection = "Misuse Prevention And Detection",
  /** Non Commercial Purpose */
  NonCommercialPurpose = "Non Commercial Purpose",
  /** Non Commercial Research */
  NonCommercialResearch = "Non Commercial Research",
  /** Optimization For Consumer */
  OptimizationForConsumer = "Optimization For Consumer",
  /** Optimization For Controller */
  OptimizationForController = "Optimization For Controller",
  /** Optimize User Interface */
  OptimizeUserInterface = "Optimize User Interface",
  /** Organization Compliance Management */
  OrganizationComplianceManagement = "Organization Compliance Management",
  /** Organization Governance */
  OrganizationGovernance = "Organization Governance",
  /** Organization Risk Management */
  OrganizationRiskManagement = "Organization Risk Management",
  /** Payment Management */
  PaymentManagement = "Payment Management",
  /** Personalization */
  Personalization = "Personalization",
  /** Personalized Advertising */
  PersonalizedAdvertising = "Personalized Advertising",
  /** Personalized Benefits */
  PersonalizedBenefits = "Personalized Benefits",
  /** Personnel Hiring */
  PersonnelHiring = "Personnel Hiring",
  /** Personnel Management */
  PersonnelManagement = "Personnel Management",
  /** Personnel Payment */
  PersonnelPayment = "Personnel Payment",
  /** Protection Of IPR */
  ProtectionOfIPR = "Protection Of IPR",
  /** Protection Of National Security */
  ProtectionOfNationalSecurity = "Protection Of National Security",
  /** Protection Of Public Security */
  ProtectionOfPublicSecurity = "Protection Of Public Security",
  /** Provide Event Recommendations */
  ProvideEventRecommendations = "Provide Event Recommendations",
  /** Provide Official Statistics */
  ProvideOfficialStatistics = "Provide Official Statistics",
  /** Provide Personalized Recommendations */
  ProvidePersonalizedRecommendations = "Provide Personalized Recommendations",
  /** Provide Product Recommendations */
  ProvideProductRecommendations = "Provide Product Recommendations",
  /** Public Benefit */
  PublicBenefit = "Public Benefit",
  /** Public Policy Making */
  PublicPolicyMaking = "Public Policy Making",
  /** Public Relations */
  PublicRelations = "Public Relations",
  /** Record Management */
  RecordManagement = "Record Management",
  /** Repair Impairments */
  RepairImpairments = "Repair Impairments",
  /** Requested Service Provision */
  RequestedServiceProvision = "Requested Service Provision",
  /** Research And Development */
  ResearchAndDevelopment = "Research And Development",
  /** Rights Fulfillment */
  RightsFulfillment = "Rights Fulfillment",
  /** Scientific Research */
  ScientificResearch = "Scientific Research",
  /** Search Functionalities */
  SearchFunctionalities = "Search Functionalities",
  /** Sell Data To Third Parties */
  SellDataToThirdParties = "Sell Data To Third Parties",
  /** Sell Insights From Data */
  SellInsightsFromData = "Sell Insights From Data",
  /** Sell Products */
  SellProducts = "Sell Products",
  /** Sell Products To Data Subject */
  SellProductsToDataSubject = "Sell Products To Data Subject",
  /** Service Optimization */
  Serviceoptimization = "Service Optimization",
  /** Service Personalization */
  ServicePersonalization = "Service Personalization",
  /** Service Provision */
  ServiceProvision = "Service Provision",
  /** Service Registration */
  ServiceRegistration = "Service Registration",
  /** Service Usage Analytics */
  ServiceUsageAnalytics = "Service Usage Analytics",
  /** Social Media Marketing */
  SocialMediaMarketing = "Social Media Marketing",
  /** Targeted Advertising */
  TargetedAdvertising = "Targeted Advertising",
  /** Technical Service Provision */
  TechnicalServiceProvision = "Technical Service Provision",
  /** User Interface Personalization */
  UserInterfacePersonalization = "User Interface Personalization",
  /** Vendor Management */
  VendorManagement = "Vendor Management",
  /** Vendor Payment */
  VendorPayment = "Vendor Payment",
  /** Vendor Records Management */
  VendorRecordsManagement = "Vendor Records Management",
  /** Vendor Selection Assessment */
  VendorSelectionAssessment = "Vendor Selection Assessment",
  /** Verification */
  Verification = "Verification",
}

/**
 * Valid values for the purpose based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. \
 * {@link KnownPurpose} can be used interchangeably with Purpose,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Academic Research** \
 * **Account Management** \
 * **Advertising** \
 * **Age Verification** \
 * **Combat Climate Change** \
 * **Commercial Purpose** \
 * **Commercial Research** \
 * **Communication For Customer Care** \
 * **Communication Management** \
 * **Counter Money Laundering** \
 * **Counter-terrorism** \
 * **Credit Checking** \
 * **Customer Care** \
 * **Customer Claims Management** \
 * **Customer Management** \
 * **Customer Order Management** \
 * **Customer Relationship Management** \
 * **Customer Solvency Monitoring** \
 * **Data Altruism** \
 * **Delivery Of Goods** \
 * **Direct Marketing** \
 * **Dispute Management** \
 * **Enforce Access Control** \
 * **Enforce Security** \
 * **Establish Contractual Agreement** \
 * **Fraud Prevention And Detection** \
 * **Fulfillment Of Contractual Obligation** \
 * **Fulfillment Of Obligation** \
 * **Human Resource Management** \
 * **Identity Authentication** \
 * **Identity Verification** \
 * **Improve Existing Products And Services** \
 * **Improve Healthcare** \
 * **Improve Internal CRM Processes** \
 * **Improve Public Services** \
 * **Improve Transport Mobility** \
 * **Increase Service Robustness** \
 * **Internal Resource Optimization** \
 * **Legal Compliance** \
 * **Maintain Credit Checking Database** \
 * **Maintain Credit Rating Database** \
 * **Maintain Fraud Database** \
 * **Marketing** \
 * **Member Partner Management** \
 * **Misuse Prevention And Detection** \
 * **Non Commercial Purpose** \
 * **Non Commercial Research** \
 * **Optimization For Consumer** \
 * **Optimization For Controller** \
 * **Optimize User Interface** \
 * **Organization Compliance Management** \
 * **Organization Governance** \
 * **Organization Risk Management** \
 * **Payment Management** \
 * **Personalization** \
 * **Personalized Advertising** \
 * **Personalized Benefits** \
 * **Personnel Hiring** \
 * **Personnel Management** \
 * **Personnel Payment** \
 * **Protection Of IPR** \
 * **Protection Of National Security** \
 * **Protection Of Public Security** \
 * **Provide Event Recommendations** \
 * **Provide Official Statistics** \
 * **Provide Personalized Recommendations** \
 * **Provide Product Recommendations** \
 * **Public Benefit** \
 * **Public Policy Making** \
 * **Public Relations** \
 * **Record Management** \
 * **Repair Impairments** \
 * **Requested Service Provision** \
 * **Research And Development** \
 * **Rights Fulfillment** \
 * **Scientific Research** \
 * **Search Functionalities** \
 * **Sell Data To Third Parties** \
 * **Sell Insights From Data** \
 * **Sell Products** \
 * **Sell Products To Data Subject** \
 * **Service Optimization** \
 * **Service Personalization** \
 * **Service Provision** \
 * **Service Registration** \
 * **Service Usage Analytics** \
 * **Social Media Marketing** \
 * **Targeted Advertising** \
 * **Technical Service Provision** \
 * **User Interface Personalization** \
 * **Vendor Management** \
 * **Vendor Payment** \
 * **Vendor Records Management** \
 * **Vendor Selection Assessment** \
 * **Verification**
 */
export type Purpose = string;

export function dataProcessingArraySerializer(result: Array<DataProcessing>): any[] {
  return result.map((item) => {
    return dataProcessingSerializer(item);
  });
}

export function dataProcessingArrayDeserializer(result: Array<DataProcessing>): any[] {
  return result.map((item) => {
    return dataProcessingDeserializer(item);
  });
}

/** Model defining how received data is processed. */
export interface DataProcessing {
  /** The operation that is performed on the data received. */
  processingOperation: ProcessingOperation;
  /** The contexts in which the data is processed. */
  contexts: Context[];
  /** The duration or temporal limitation of the data processing. */
  duration: Duration;
  /** The frequency of the data processing. */
  frequency: Frequency;
  /** The countries/regions the data transits through. */
  transitRegions: DataRegions[];
  /** The countries/regions the data is stored in. */
  storageRegions: DataRegions[];
}

export function dataProcessingSerializer(item: DataProcessing): any {
  return {
    processingOperation: item["processingOperation"],
    contexts: item["contexts"].map((p: any) => {
      return p;
    }),
    duration: item["duration"],
    frequency: item["frequency"],
    transitRegions: dataRegionsArraySerializer(item["transitRegions"]),
    storageRegions: dataRegionsArraySerializer(item["storageRegions"]),
  };
}

export function dataProcessingDeserializer(item: any): DataProcessing {
  return {
    processingOperation: item["processingOperation"],
    contexts: item["contexts"].map((p: any) => {
      return p;
    }),
    duration: item["duration"],
    frequency: item["frequency"],
    transitRegions: dataRegionsArrayDeserializer(item["transitRegions"]),
    storageRegions: dataRegionsArrayDeserializer(item["storageRegions"]),
  };
}

/** Valid values for the processing operation based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. */
export enum KnownProcessingOperation {
  /** Access */
  Access = "Access",
  /** Acquire */
  Acquire = "Acquire",
  /** Adapt */
  Adapt = "Adapt",
  /** Aggregate */
  Aggregate = "Aggregate",
  /** Align */
  Align = "Align",
  /** Alter */
  Alter = "Alter",
  /** Analyze */
  Analyze = "Analyze",
  /** Anonymize */
  Anonymize = "Anonymize",
  /** Assess */
  Assess = "Assess",
  /** Collect */
  Collect = "Collect",
  /** Combine */
  Combine = "Combine",
  /** Consult */
  Consult = "Consult",
  /** Copy */
  Copy = "Copy",
  /** Cross border transfer */
  CrossBorderTransfer = "Cross border transfer",
  /** Delete */
  Delete = "Delete",
  /** Derive */
  Derive = "Derive",
  /** Destruct */
  Destruct = "Destruct",
  /** Disclose */
  Disclose = "Disclose",
  /** Disclose by transmission */
  DiscloseByTransmission = "Disclose by transmission",
  /** Display */
  Display = "Display",
  /** Disseminate */
  Disseminate = "Disseminate",
  /** Download */
  Download = "Download",
  /** Erase */
  Erase = "Erase",
  /** Export */
  Export = "Export",
  /** Filter */
  Filter = "Filter",
  /** Format */
  Format = "Format",
  /** Generate */
  Generate = "Generate",
  /** Infer */
  Infer = "Infer",
  /** Make available */
  MakeAvailable = "Make available",
  /** Match */
  Match = "Match",
  /** Modify */
  Modify = "Modify",
  /** Monitor */
  Monitor = "Monitor",
  /** Move */
  Move = "Move",
  /** Observe */
  Observe = "Observe",
  /** Obtain */
  Obtain = "Obtain",
  /** Organize */
  Organize = "Organize",
  /** Profiling */
  Profiling = "Profiling",
  /** Pseudonymize */
  Pseudonymize = "Pseudonymize",
  /** Query */
  Query = "Query",
  /** Record */
  Record = "Record",
  /** Reformat */
  Reformat = "Reformat",
  /** Remove */
  Remove = "Remove",
  /** Restrict */
  Restrict = "Restrict",
  /** Retrieve */
  Retrieve = "Retrieve",
  /** Screen */
  Screen = "Screen",
  /** Share */
  Share = "Share",
  /** Store */
  Store = "Store",
  /** Structure */
  Structure = "Structure",
  /** Transfer */
  Transfer = "Transfer",
  /** Transform */
  Transform = "Transform",
  /** Transmit */
  Transmit = "Transmit",
  /** Use */
  Use = "Use",
}

/**
 * Valid values for the processing operation based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. \
 * {@link KnownProcessingOperation} can be used interchangeably with ProcessingOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Access** \
 * **Acquire** \
 * **Adapt** \
 * **Aggregate** \
 * **Align** \
 * **Alter** \
 * **Analyze** \
 * **Anonymize** \
 * **Assess** \
 * **Collect** \
 * **Combine** \
 * **Consult** \
 * **Copy** \
 * **Cross border transfer** \
 * **Delete** \
 * **Derive** \
 * **Destruct** \
 * **Disclose** \
 * **Disclose by transmission** \
 * **Display** \
 * **Disseminate** \
 * **Download** \
 * **Erase** \
 * **Export** \
 * **Filter** \
 * **Format** \
 * **Generate** \
 * **Infer** \
 * **Make available** \
 * **Match** \
 * **Modify** \
 * **Monitor** \
 * **Move** \
 * **Observe** \
 * **Obtain** \
 * **Organize** \
 * **Profiling** \
 * **Pseudonymize** \
 * **Query** \
 * **Record** \
 * **Reformat** \
 * **Remove** \
 * **Restrict** \
 * **Retrieve** \
 * **Screen** \
 * **Share** \
 * **Store** \
 * **Structure** \
 * **Transfer** \
 * **Transform** \
 * **Transmit** \
 * **Use**
 */
export type ProcessingOperation = string;

/** Valid values for the context based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. */
export enum KnownContext {
  /** Algorithmic logic */
  AlgorithmicLogic = "Algorithmic logic",
  /** Assistive automation */
  AssistiveAutomation = "Assistive automation",
  /** Automated decision making */
  AutomatedDecisionMaking = "Automated decision making",
  /** Automated scoring of individuals */
  AutomatedScoringOfIndividuals = "Automated scoring of individuals",
  /** Automation level */
  AutomationLevel = "Automation level",
  /** Autonomous */
  Autonomous = "Autonomous",
  /** Cannot challenge process */
  CannotChallengeProcess = "Cannot challenge process",
  /** Cannot challenge process input */
  CannotChallengeProcessInput = "Cannot challenge process input",
  /** Cannot challenge process output */
  CannotChallengeProcessOutput = "Cannot challenge process output",
  /** Cannot correct process */
  CannotCorrectProcess = "Cannot correct process",
  /** Cannot correct process input */
  CannotCorrectProcessInput = "Cannot correct process input",
  /** Cannot correct process output */
  CannotCorrectProcessOutput = "Cannot correct process output",
  /** Cannot object to process */
  CannotObjectToProcess = "Cannot object to process",
  /** Cannot opt in to process */
  CannotOptInToProcess = "Cannot opt in to process",
  /** Cannot opt out from process */
  CannotOptOutFromProcess = "Cannot opt out from process",
  /** Cannot reverse process effects */
  CannotReverseProcessEffects = "Cannot reverse process effects",
  /** Cannot reverse process input */
  CannotReverseProcessInput = "Cannot reverse process input",
  /** Cannot reverse process output */
  CannotReverseProcessOutput = "Cannot reverse process output",
  /** Cannot withdraw from process */
  CannotWithdrawFromProcess = "Cannot withdraw from process",
  /** Challenging process */
  ChallengingProcess = "Challenging process",
  /** Challenging process input */
  ChallengingProcessInput = "Challenging process input",
  /** Challenging process output */
  ChallengingProcessOutput = "Challenging process output",
  /** Conditional automation */
  ConditionalAutomation = "Conditional automation",
  /** Consent control */
  ConsentControl = "Consent control",
  /** Correcting process */
  CorrectingProcess = "Correcting process",
  /** Correcting process input */
  CorrectingProcessInput = "Correcting process input",
  /** Correcting process output */
  CorrectingProcessOutput = "Correcting process output",
  /** Completely manual processing */
  CompletelyManualProcessing = "Completely manual processing",
  /** Data controller data source */
  DataControllerDataSource = "Data controller data source",
  /** Data published by data subject */
  DataPublishedByDataSubject = "Data published by data subject",
  /** Data source */
  DataSource = "Data source",
  /** Data subject */
  DataSubject = "Data subject",
  /** Data subject data source */
  DataSubjectDataSource = "Data subject data source",
  /** Data subject scale */
  DataSubjectScale = "Data subject scale",
  /** Data volume */
  DataVolume = "Data volume",
  /** Decision making */
  DecisionMaking = "Decision making",
  /** Entity active involvement */
  EntityActiveInvolvement = "Entity active involvement",
  /** Entity involvement */
  EntityInvolvement = "Entity involvement",
  /** Entity non involvement */
  EntityNonInvolvement = "Entity non involvement",
  /** Entity non permissive involvement */
  EntityNonPermissiveInvolvement = "Entity non permissive involvement",
  /** Entity passive involvement */
  EntityPassiveInvolvement = "Entity passive involvement",
  /** Entity permissive involvement */
  EntityPermissiveInvolvement = "Entity permissive involvement",
  /** Evaluation of individuals */
  EvaluationOfIndividuals = "Evaluation of individuals",
  /** Evaluation scoring */
  EvaluationScoring = "Evaluation scoring",
  /** Full automation */
  FullAutomation = "Full automation",
  /** Geographic coverage */
  GeographicCoverage = "Geographic coverage",
  /** Global scale */
  GlobalScale = "Global scale",
  /** High automation */
  HighAutomation = "High automation",
  /** Huge data volume */
  HugeDataVolume = "Huge data volume",
  /** Huge scale of data subjects */
  HugeScaleOfDataSubjects = "Huge scale of data subjects",
  /** Human involved */
  HumanInvolved = "Human involved",
  /** Human involvement */
  HumanInvolvement = "Human involvement",
  /** Human involvement for control */
  HumanInvolvementForControl = "Human involvement for control",
  /** Human involvement for decision */
  HumanInvolvementForDecision = "Human involvement for decision",
  /** Human involvement for input */
  HumanInvolvementForInput = "Human involvement for input",
  /** Human involvement for intervention */
  HumanInvolvementForIntervention = "Human involvement for intervention",
  /** Human involvement for oversight */
  HumanInvolvementForOversight = "Human involvement for oversight",
  /** Human involvement for verification */
  HumanInvolvementForVerification = "Human involvement for verification",
  /** Human not involved */
  HumanNotInvolved = "Human not involved",
  /** Innovative use of existing technology */
  InnovativeUseOfExistingTechnology = "Innovative use of existing technology",
  /** Innovative use of new technologies */
  InnovativeUseOfNewTechnologies = "Innovative use of new technologies",
  /** Innovative use of technology */
  InnovativeUseOfTechnology = "Innovative use of technology",
  /** Large data volume */
  LargeDataVolume = "Large data volume",
  /** Large scale of data subjects */
  LargeScaleOfDataSubjects = "Large scale of data subjects",
  /** Large scale processing */
  LargeScaleProcessing = "Large scale processing",
  /** Local environment scale */
  LocalEnvironmentScale = "Local environment scale",
  /** Locality scale */
  LocalityScale = "Locality scale",
  /** Medium data volume */
  MediumDataVolume = "Medium data volume",
  /** Medium scale of data subjects */
  MediumScaleOfDataSubjects = "Medium scale of data subjects",
  /** Medium scale processing */
  MediumScaleProcessing = "Medium scale processing",
  /** Multi national scale */
  MultiNationalScale = "Multi national scale",
  /** National scale */
  NationalScale = "National scale",
  /** Nearly global scale */
  NearlyGlobalScale = "Nearly global scale",
  /** Non public data source */
  NonPublicDataSource = "Non public data source",
  /** Not automated */
  NotAutomated = "Not automated",
  /** Objecting to process */
  ObjectingToProcess = "Objecting to process",
  /** Obtain consent */
  ObtainConsent = "Obtain consent",
  /** Opting in to process */
  OptingInToProcess = "Opting in to process",
  /** Opting out from process */
  OptingOutFromProcess = "Opting out from process",
  /** Partial automation */
  PartialAutomation = "Partial automation",
  /** Processing condition */
  ProcessingCondition = "Processing condition",
  /** Processing duration */
  ProcessingDuration = "Processing duration",
  /** Processing location */
  ProcessingLocation = "Processing location",
  /** Processing scale */
  ProcessingScale = "Processing scale",
  /** Provide consent */
  ProvideConsent = "Provide consent",
  /** Public data source */
  PublicDataSource = "Public data source",
  /** Reaffirm consent */
  ReaffirmConsent = "Reaffirm consent",
  /** Regional scale */
  RegionalScale = "Regional scale",
  /** Reversing process effects */
  ReversingProcessEffects = "Reversing process effects",
  /** Reversing process input */
  ReversingProcessInput = "Reversing process input",
  /** Reversing process output */
  ReversingProcessOutput = "Reversing process output",
  /** Scale */
  Scale = "Scale",
  /** Scoring of individuals */
  ScoringOfIndividuals = "Scoring of individuals",
  /** Singular data volume */
  SingularDataVolume = "Singular data volume",
  /** Singular scale of data subjects */
  SingularScaleOfDataSubjects = "Singular scale of data subjects",
  /** Small data volume */
  SmallDataVolume = "Small data volume",
  /** Small scale of data subjects */
  SmallScaleOfDataSubjects = "Small scale of data subjects",
  /** Small scale processing */
  SmallScaleProcessing = "Small scale processing",
  /** Sporadic data volume */
  SporadicDataVolume = "Sporadic data volume",
  /** Sporadic scale of data subjects */
  SporadicScaleOfDataSubjects = "Sporadic scale of data subjects",
  /** Storage condition */
  StorageCondition = "Storage condition",
  /** Storage deletion */
  StorageDeletion = "Storage deletion",
  /** Storage duration */
  StorageDuration = "Storage duration",
  /** Storage location */
  StorageLocation = "Storage location",
  /** Storage restoration */
  StorageRestoration = "Storage restoration",
  /** Systematic monitoring */
  SystematicMonitoring = "Systematic monitoring",
  /** Third party data source */
  ThirdPartyDataSource = "Third party data source",
  /** Withdraw consent */
  WithdrawConsent = "Withdraw consent",
  /** Withdrawing from process */
  WithdrawingFromProcess = "Withdrawing from process",
}

/**
 * Valid values for the context based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. \
 * {@link KnownContext} can be used interchangeably with Context,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Algorithmic logic** \
 * **Assistive automation** \
 * **Automated decision making** \
 * **Automated scoring of individuals** \
 * **Automation level** \
 * **Autonomous** \
 * **Cannot challenge process** \
 * **Cannot challenge process input** \
 * **Cannot challenge process output** \
 * **Cannot correct process** \
 * **Cannot correct process input** \
 * **Cannot correct process output** \
 * **Cannot object to process** \
 * **Cannot opt in to process** \
 * **Cannot opt out from process** \
 * **Cannot reverse process effects** \
 * **Cannot reverse process input** \
 * **Cannot reverse process output** \
 * **Cannot withdraw from process** \
 * **Challenging process** \
 * **Challenging process input** \
 * **Challenging process output** \
 * **Conditional automation** \
 * **Consent control** \
 * **Correcting process** \
 * **Correcting process input** \
 * **Correcting process output** \
 * **Completely manual processing** \
 * **Data controller data source** \
 * **Data published by data subject** \
 * **Data source** \
 * **Data subject** \
 * **Data subject data source** \
 * **Data subject scale** \
 * **Data volume** \
 * **Decision making** \
 * **Entity active involvement** \
 * **Entity involvement** \
 * **Entity non involvement** \
 * **Entity non permissive involvement** \
 * **Entity passive involvement** \
 * **Entity permissive involvement** \
 * **Evaluation of individuals** \
 * **Evaluation scoring** \
 * **Full automation** \
 * **Geographic coverage** \
 * **Global scale** \
 * **High automation** \
 * **Huge data volume** \
 * **Huge scale of data subjects** \
 * **Human involved** \
 * **Human involvement** \
 * **Human involvement for control** \
 * **Human involvement for decision** \
 * **Human involvement for input** \
 * **Human involvement for intervention** \
 * **Human involvement for oversight** \
 * **Human involvement for verification** \
 * **Human not involved** \
 * **Innovative use of existing technology** \
 * **Innovative use of new technologies** \
 * **Innovative use of technology** \
 * **Large data volume** \
 * **Large scale of data subjects** \
 * **Large scale processing** \
 * **Local environment scale** \
 * **Locality scale** \
 * **Medium data volume** \
 * **Medium scale of data subjects** \
 * **Medium scale processing** \
 * **Multi national scale** \
 * **National scale** \
 * **Nearly global scale** \
 * **Non public data source** \
 * **Not automated** \
 * **Objecting to process** \
 * **Obtain consent** \
 * **Opting in to process** \
 * **Opting out from process** \
 * **Partial automation** \
 * **Processing condition** \
 * **Processing duration** \
 * **Processing location** \
 * **Processing scale** \
 * **Provide consent** \
 * **Public data source** \
 * **Reaffirm consent** \
 * **Regional scale** \
 * **Reversing process effects** \
 * **Reversing process input** \
 * **Reversing process output** \
 * **Scale** \
 * **Scoring of individuals** \
 * **Singular data volume** \
 * **Singular scale of data subjects** \
 * **Small data volume** \
 * **Small scale of data subjects** \
 * **Small scale processing** \
 * **Sporadic data volume** \
 * **Sporadic scale of data subjects** \
 * **Storage condition** \
 * **Storage deletion** \
 * **Storage duration** \
 * **Storage location** \
 * **Storage restoration** \
 * **Systematic monitoring** \
 * **Third party data source** \
 * **Withdraw consent** \
 * **Withdrawing from process**
 */
export type Context = string;

/** Valid values for the duration based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. */
export enum KnownDuration {
  /** Endless */
  EndlessDuration = "Endless",
  /** Fixed occurrences */
  FixedOccurrencesDuration = "Fixed occurrences",
  /** Indeterminate */
  IndeterminateDuration = "Indeterminate",
  /** Temporal */
  TemporalDuration = "Temporal",
  /** Until event */
  UntilEventDuration = "Until event",
  /** Until time */
  UntilTimeDuration = "Until time",
}

/**
 * Valid values for the duration based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. \
 * {@link KnownDuration} can be used interchangeably with Duration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Endless** \
 * **Fixed occurrences** \
 * **Indeterminate** \
 * **Temporal** \
 * **Until event** \
 * **Until time**
 */
export type Duration = string;

/** Valid values for the frequency based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. */
export enum KnownFrequency {
  /** Continuous */
  ContinuousFrequency = "Continuous",
  /** Often */
  OftenFrequency = "Often",
  /** Singular */
  SingularFrequency = "Singular",
  /** Sporadic */
  SporadicFrequency = "Sporadic",
}

/**
 * Valid values for the frequency based on W3C Data Privacy Vocabulary v2 https://w3c.github.io/dpv/2.0/dpv/. \
 * {@link KnownFrequency} can be used interchangeably with Frequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Continuous** \
 * **Often** \
 * **Singular** \
 * **Sporadic**
 */
export type Frequency = string;

export function dataRegionsArraySerializer(result: Array<DataRegions>): any[] {
  return result.map((item) => {
    return dataRegionsSerializer(item);
  });
}

export function dataRegionsArrayDeserializer(result: Array<DataRegions>): any[] {
  return result.map((item) => {
    return dataRegionsDeserializer(item);
  });
}

/** Model defining the information required about the countries/regions the data transits through or is stored in. */
export interface DataRegions {
  /** The country code of the country/region the data transits through or is stored in. */
  countryCode: string;
  /** The commercial organization who is managing the data. */
  commercialOrganization?: string;
  /** Flag to indicate if commercial activity applies to this data management. */
  commercialActivity: boolean;
  /** URL of the organization or governmental data privacy framework. */
  dataPrivacyFrameworkUrl: string;
}

export function dataRegionsSerializer(item: DataRegions): any {
  return {
    countryCode: item["countryCode"],
    commercialOrganization: item["commercialOrganization"],
    commercialActivity: item["commercialActivity"],
    dataPrivacyFrameworkUrl: item["dataPrivacyFrameworkUrl"],
  };
}

export function dataRegionsDeserializer(item: any): DataRegions {
  return {
    countryCode: item["countryCode"],
    commercialOrganization: item["commercialOrganization"],
    commercialActivity: item["commercialActivity"],
    dataPrivacyFrameworkUrl: item["dataPrivacyFrameworkUrl"],
  };
}

/** The type used for update operations of the OperatorApiConnection. */
export interface OperatorApiConnectionUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: OperatorApiConnectionUpdateProperties;
}

export function operatorApiConnectionUpdateSerializer(item: OperatorApiConnectionUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : operatorApiConnectionUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the OperatorApiConnection. */
export interface OperatorApiConnectionUpdateProperties {
  /** Reference to the Operator API Plan Resource ID. */
  operatorApiPlanId?: string;
  /**
   * Whether the caller has accepted the Terms and Conditions of the associated Operator API Plan.
   * After creation, the planTermsAndConditionsLink property is set to the Terms and Conditions that
   * have been accepted.
   *
   * Must be set to True, as the Terms and Conditions must be accepted.
   */
  planTermsAndConditionsAccepted?: boolean;
  /** The purpose for which the Application will use the API. Max Items 1 currently as Operators do not support multiple. */
  purposes?: Purpose[];
  /** Explanation of the reason that justifies the purpose: specifically why is the API used for the application's use case. */
  purposeReason?: string;
  /** List of ways the data returned on this API is processed. */
  dataProcessingList?: DataProcessing[];
}

export function operatorApiConnectionUpdatePropertiesSerializer(
  item: OperatorApiConnectionUpdateProperties,
): any {
  return {
    operatorApiPlanId: item["operatorApiPlanId"],
    planTermsAndConditionsAccepted: item["planTermsAndConditionsAccepted"],
    purposes: !item["purposes"]
      ? item["purposes"]
      : item["purposes"].map((p: any) => {
          return p;
        }),
    purposeReason: item["purposeReason"],
    dataProcessingList: !item["dataProcessingList"]
      ? item["dataProcessingList"]
      : dataProcessingArraySerializer(item["dataProcessingList"]),
  };
}

/** The response of a OperatorApiConnection list operation. */
export interface _OperatorApiConnectionListResult {
  /** The OperatorApiConnection items on this page */
  value: OperatorApiConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operatorApiConnectionListResultDeserializer(
  item: any,
): _OperatorApiConnectionListResult {
  return {
    value: operatorApiConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operatorApiConnectionArraySerializer(result: Array<OperatorApiConnection>): any[] {
  return result.map((item) => {
    return operatorApiConnectionSerializer(item);
  });
}

export function operatorApiConnectionArrayDeserializer(
  result: Array<OperatorApiConnection>,
): any[] {
  return result.map((item) => {
    return operatorApiConnectionDeserializer(item);
  });
}

/** A Programmable Connectivity Operator API Plans resource. This is a readonly resource that indicates which Operator Network APIs are available in the user's subscription. */
export interface OperatorApiPlan extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: OperatorApiPlanProperties;
}

export function operatorApiPlanDeserializer(item: any): OperatorApiPlan {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : operatorApiPlanPropertiesDeserializer(item["properties"]),
  };
}

/** Operator API Plan properties. */
export interface OperatorApiPlanProperties {
  /** Name of the Operator this plan belongs to. */
  operatorName?: string;
  /** Standardized Network API name defined by CAMARA specifications. */
  camaraApiName?: string;
  /** List of Azure regions where this offer is supported. */
  supportedLocations?: string[];
  /** List of country/region names where this plan is being supported by the Operator. */
  operatorRegions?: string[];
  /** List of country/region names where this plan is being supported by Azure Marketplace. */
  markets?: string[];
  /** The limits, if any, will be imposed by the operator. */
  limits?: string;
  /** Azure marketplace properties for this plan. */
  marketplaceProperties?: MarketplaceProperties;
  /** The status of the last operation on the Gateway resource. */
  readonly provisioningState?: ProvisioningState;
}

export function operatorApiPlanPropertiesDeserializer(item: any): OperatorApiPlanProperties {
  return {
    operatorName: item["operatorName"],
    camaraApiName: item["camaraApiName"],
    supportedLocations: !item["supportedLocations"]
      ? item["supportedLocations"]
      : item["supportedLocations"].map((p: any) => {
          return p;
        }),
    operatorRegions: !item["operatorRegions"]
      ? item["operatorRegions"]
      : item["operatorRegions"].map((p: any) => {
          return p;
        }),
    markets: !item["markets"]
      ? item["markets"]
      : item["markets"].map((p: any) => {
          return p;
        }),
    limits: item["limits"],
    marketplaceProperties: !item["marketplaceProperties"]
      ? item["marketplaceProperties"]
      : marketplacePropertiesDeserializer(item["marketplaceProperties"]),
    provisioningState: item["provisioningState"],
  };
}

/** Azure marketplace properties for a plan. */
export interface MarketplaceProperties {
  /** Azure marketplace Offer ID for this plan. */
  offerId?: string;
  /** Azure marketplace Publisher ID for this plan. */
  publisherId?: string;
  /** Azure marketplace Plan ID for this plan. */
  planId?: string;
  /**
   * Links to the Terms and Conditions of the Plan that must be accepted to create an
   * associated Operator Api Connection
   */
  readonly planTermsAndConditionsLinks: string[];
}

export function marketplacePropertiesDeserializer(item: any): MarketplaceProperties {
  return {
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    planId: item["planId"],
    planTermsAndConditionsLinks: item["planTermsAndConditionsLinks"].map((p: any) => {
      return p;
    }),
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

/** The response of a OperatorApiPlan list operation. */
export interface _OperatorApiPlanListResult {
  /** The OperatorApiPlan items on this page */
  value: OperatorApiPlan[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operatorApiPlanListResultDeserializer(item: any): _OperatorApiPlanListResult {
  return {
    value: operatorApiPlanArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operatorApiPlanArrayDeserializer(result: Array<OperatorApiPlan>): any[] {
  return result.map((item) => {
    return operatorApiPlanDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-01-15-preview API version. */
  V20240115Preview = "2024-01-15-preview",
  /** The 2025-03-30-preview API version. */
  V20250330Preview = "2025-03-30-preview",
}
