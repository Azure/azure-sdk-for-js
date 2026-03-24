// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** model interface ResourceProviderManifest */
export interface ResourceProviderManifest {
  /** The provider authentication. */
  providerAuthentication?: ResourceProviderManifestProviderAuthentication;
  /** The provider authorizations. */
  providerAuthorizations?: ResourceProviderAuthorization[];
  /** The namespace. */
  namespace?: string;
  /** The services. */
  services?: ResourceProviderService[];
  /** The service name. */
  serviceName?: string;
  /** The provider version. */
  providerVersion?: string;
  /** The provider type. */
  providerType?: ResourceProviderType;
  /** The required features. */
  requiredFeatures?: string[];
  /** The features rule. */
  featuresRule?: ResourceProviderManifestFeaturesRule;
  /** The request header options. */
  requestHeaderOptions?: ResourceProviderManifestRequestHeaderOptions;
  /** The resource types. */
  resourceTypes?: ResourceType[];
  /** The resource provider management. */
  management?: ResourceProviderManifestManagement;
  /** The capabilities. */
  capabilities?: ResourceProviderCapabilities[];
  /** The cross tenant token validation. */
  crossTenantTokenValidation?: CrossTenantTokenValidation;
  /** The metadata. */
  metadata?: any;
  /** The global notification endpoints. */
  globalNotificationEndpoints?: ResourceProviderEndpoint[];
  /** The re-register subscription metadata. */
  reRegisterSubscriptionMetadata?: ResourceProviderManifestReRegisterSubscriptionMetadata;
  /** Whether tenant linked notification is enabled. */
  enableTenantLinkedNotification?: boolean;
  /** The notifications. */
  notifications?: Notification[];
  /** The linked notification rules. */
  linkedNotificationRules?: FanoutLinkedNotificationRule[];
  /** The resource provider authorization rules. */
  resourceProviderAuthorizationRules?: ResourceProviderAuthorizationRules;
}

export function resourceProviderManifestDeserializer(item: any): ResourceProviderManifest {
  return {
    providerAuthentication: !item["providerAuthentication"]
      ? item["providerAuthentication"]
      : resourceProviderManifestProviderAuthenticationDeserializer(item["providerAuthentication"]),
    providerAuthorizations: !item["providerAuthorizations"]
      ? item["providerAuthorizations"]
      : resourceProviderAuthorizationArrayDeserializer(item["providerAuthorizations"]),
    namespace: item["namespace"],
    services: !item["services"]
      ? item["services"]
      : resourceProviderServiceArrayDeserializer(item["services"]),
    serviceName: item["serviceName"],
    providerVersion: item["providerVersion"],
    providerType: item["providerType"],
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceProviderManifestFeaturesRuleDeserializer(item["featuresRule"]),
    requestHeaderOptions: !item["requestHeaderOptions"]
      ? item["requestHeaderOptions"]
      : resourceProviderManifestRequestHeaderOptionsDeserializer(item["requestHeaderOptions"]),
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : resourceTypeArrayDeserializer(item["resourceTypes"]),
    management: !item["management"]
      ? item["management"]
      : resourceProviderManifestManagementDeserializer(item["management"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : resourceProviderCapabilitiesArrayDeserializer(item["capabilities"]),
    crossTenantTokenValidation: item["crossTenantTokenValidation"],
    metadata: item["metadata"],
    globalNotificationEndpoints: !item["globalNotificationEndpoints"]
      ? item["globalNotificationEndpoints"]
      : resourceProviderEndpointArrayDeserializer(item["globalNotificationEndpoints"]),
    reRegisterSubscriptionMetadata: !item["reRegisterSubscriptionMetadata"]
      ? item["reRegisterSubscriptionMetadata"]
      : resourceProviderManifestReRegisterSubscriptionMetadataDeserializer(
          item["reRegisterSubscriptionMetadata"],
        ),
    enableTenantLinkedNotification: item["enableTenantLinkedNotification"],
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArrayDeserializer(item["notifications"]),
    linkedNotificationRules: !item["linkedNotificationRules"]
      ? item["linkedNotificationRules"]
      : fanoutLinkedNotificationRuleArrayDeserializer(item["linkedNotificationRules"]),
    resourceProviderAuthorizationRules: !item["resourceProviderAuthorizationRules"]
      ? item["resourceProviderAuthorizationRules"]
      : resourceProviderAuthorizationRulesDeserializer(item["resourceProviderAuthorizationRules"]),
  };
}

/** The provider authentication. */
export interface ResourceProviderManifestProviderAuthentication extends ResourceProviderAuthentication {}

export function resourceProviderManifestProviderAuthenticationDeserializer(
  item: any,
): ResourceProviderManifestProviderAuthentication {
  return {
    allowedAudiences: item["allowedAudiences"].map((p: any) => {
      return p;
    }),
  };
}

export function resourceProviderAuthorizationArraySerializer(
  result: Array<ResourceProviderAuthorization>,
): any[] {
  return result.map((item) => {
    return resourceProviderAuthorizationSerializer(item);
  });
}

export function resourceProviderAuthorizationArrayDeserializer(
  result: Array<ResourceProviderAuthorization>,
): any[] {
  return result.map((item) => {
    return resourceProviderAuthorizationDeserializer(item);
  });
}

/** model interface ResourceProviderAuthorization */
export interface ResourceProviderAuthorization {
  /** The application id. */
  applicationId?: string;
  /** The role definition id. */
  roleDefinitionId?: string;
  /** The managed by role definition id. */
  managedByRoleDefinitionId?: string;
  /** Managed by authorization. */
  managedByAuthorization?: ResourceProviderAuthorizationManagedByAuthorization;
  /** The allowed third party extensions. */
  allowedThirdPartyExtensions?: ThirdPartyExtension[];
  /** The grouping tag. */
  groupingTag?: string;
}

export function resourceProviderAuthorizationSerializer(item: ResourceProviderAuthorization): any {
  return {
    applicationId: item["applicationId"],
    roleDefinitionId: item["roleDefinitionId"],
    managedByRoleDefinitionId: item["managedByRoleDefinitionId"],
    managedByAuthorization: !item["managedByAuthorization"]
      ? item["managedByAuthorization"]
      : resourceProviderAuthorizationManagedByAuthorizationSerializer(
          item["managedByAuthorization"],
        ),
    allowedThirdPartyExtensions: !item["allowedThirdPartyExtensions"]
      ? item["allowedThirdPartyExtensions"]
      : thirdPartyExtensionArraySerializer(item["allowedThirdPartyExtensions"]),
    groupingTag: item["groupingTag"],
  };
}

export function resourceProviderAuthorizationDeserializer(
  item: any,
): ResourceProviderAuthorization {
  return {
    applicationId: item["applicationId"],
    roleDefinitionId: item["roleDefinitionId"],
    managedByRoleDefinitionId: item["managedByRoleDefinitionId"],
    managedByAuthorization: !item["managedByAuthorization"]
      ? item["managedByAuthorization"]
      : resourceProviderAuthorizationManagedByAuthorizationDeserializer(
          item["managedByAuthorization"],
        ),
    allowedThirdPartyExtensions: !item["allowedThirdPartyExtensions"]
      ? item["allowedThirdPartyExtensions"]
      : thirdPartyExtensionArrayDeserializer(item["allowedThirdPartyExtensions"]),
    groupingTag: item["groupingTag"],
  };
}

/** Managed by authorization. */
export interface ResourceProviderAuthorizationManagedByAuthorization {
  additionalAuthorizations?: AdditionalAuthorization[];
  /** The managed by resource role definition ID for the application. */
  managedByResourceRoleDefinitionId?: string;
  /** Indicates whether the managed by resource role definition ID should be inherited. */
  allowManagedByInheritance?: boolean;
}

export function resourceProviderAuthorizationManagedByAuthorizationSerializer(
  item: ResourceProviderAuthorizationManagedByAuthorization,
): any {
  return {
    additionalAuthorizations: !item["additionalAuthorizations"]
      ? item["additionalAuthorizations"]
      : additionalAuthorizationArraySerializer(item["additionalAuthorizations"]),
    managedByResourceRoleDefinitionId: item["managedByResourceRoleDefinitionId"],
    allowManagedByInheritance: item["allowManagedByInheritance"],
  };
}

export function resourceProviderAuthorizationManagedByAuthorizationDeserializer(
  item: any,
): ResourceProviderAuthorizationManagedByAuthorization {
  return {
    additionalAuthorizations: !item["additionalAuthorizations"]
      ? item["additionalAuthorizations"]
      : additionalAuthorizationArrayDeserializer(item["additionalAuthorizations"]),
    managedByResourceRoleDefinitionId: item["managedByResourceRoleDefinitionId"],
    allowManagedByInheritance: item["allowManagedByInheritance"],
  };
}

export function additionalAuthorizationArraySerializer(
  result: Array<AdditionalAuthorization>,
): any[] {
  return result.map((item) => {
    return additionalAuthorizationSerializer(item);
  });
}

export function additionalAuthorizationArrayDeserializer(
  result: Array<AdditionalAuthorization>,
): any[] {
  return result.map((item) => {
    return additionalAuthorizationDeserializer(item);
  });
}

/** model interface AdditionalAuthorization */
export interface AdditionalAuthorization {
  applicationId?: string;
  roleDefinitionId?: string;
}

export function additionalAuthorizationSerializer(item: AdditionalAuthorization): any {
  return { applicationId: item["applicationId"], roleDefinitionId: item["roleDefinitionId"] };
}

export function additionalAuthorizationDeserializer(item: any): AdditionalAuthorization {
  return {
    applicationId: item["applicationId"],
    roleDefinitionId: item["roleDefinitionId"],
  };
}

export function thirdPartyExtensionArraySerializer(result: Array<ThirdPartyExtension>): any[] {
  return result.map((item) => {
    return thirdPartyExtensionSerializer(item);
  });
}

export function thirdPartyExtensionArrayDeserializer(result: Array<ThirdPartyExtension>): any[] {
  return result.map((item) => {
    return thirdPartyExtensionDeserializer(item);
  });
}

/** model interface ThirdPartyExtension */
export interface ThirdPartyExtension {
  /** Name of third party extension. */
  name?: string;
}

export function thirdPartyExtensionSerializer(item: ThirdPartyExtension): any {
  return { name: item["name"] };
}

export function thirdPartyExtensionDeserializer(item: any): ThirdPartyExtension {
  return {
    name: item["name"],
  };
}

export function resourceProviderServiceArraySerializer(
  result: Array<ResourceProviderService>,
): any[] {
  return result.map((item) => {
    return resourceProviderServiceSerializer(item);
  });
}

export function resourceProviderServiceArrayDeserializer(
  result: Array<ResourceProviderService>,
): any[] {
  return result.map((item) => {
    return resourceProviderServiceDeserializer(item);
  });
}

/** Resource provider service. */
export interface ResourceProviderService {
  /** The service name. */
  serviceName?: string;
  /** The status. */
  status?: ServiceStatus;
}

export function resourceProviderServiceSerializer(item: ResourceProviderService): any {
  return { serviceName: item["serviceName"], status: item["status"] };
}

export function resourceProviderServiceDeserializer(item: any): ResourceProviderService {
  return {
    serviceName: item["serviceName"],
    status: item["status"],
  };
}

/** The status. */
export enum KnownServiceStatus {
  /** Active */
  Active = "Active",
  /** Inactive */
  Inactive = "Inactive",
}

/**
 * The status. \
 * {@link KnownServiceStatus} can be used interchangeably with ServiceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Inactive**
 */
export type ServiceStatus = string;

/** The provider type. */
export enum KnownResourceProviderType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Internal */
  Internal = "Internal",
  /** External */
  External = "External",
  /** Hidden */
  Hidden = "Hidden",
  /** RegistrationFree */
  RegistrationFree = "RegistrationFree",
  /** LegacyRegistrationRequired */
  LegacyRegistrationRequired = "LegacyRegistrationRequired",
  /** TenantOnly */
  TenantOnly = "TenantOnly",
  /** AuthorizationFree */
  AuthorizationFree = "AuthorizationFree",
}

/**
 * The provider type. \
 * {@link KnownResourceProviderType} can be used interchangeably with ResourceProviderType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Internal** \
 * **External** \
 * **Hidden** \
 * **RegistrationFree** \
 * **LegacyRegistrationRequired** \
 * **TenantOnly** \
 * **AuthorizationFree**
 */
export type ResourceProviderType = string;

/** The features rule. */
export interface ResourceProviderManifestFeaturesRule extends FeaturesRule {}

export function resourceProviderManifestFeaturesRuleDeserializer(
  item: any,
): ResourceProviderManifestFeaturesRule {
  return {
    requiredFeaturesPolicy: item["requiredFeaturesPolicy"],
  };
}

/** The request header options. */
export interface ResourceProviderManifestRequestHeaderOptions extends RequestHeaderOptions {}

export function resourceProviderManifestRequestHeaderOptionsDeserializer(
  item: any,
): ResourceProviderManifestRequestHeaderOptions {
  return {
    optInHeaders: item["optInHeaders"],
    optOutHeaders: item["optOutHeaders"],
  };
}

export function resourceTypeArrayDeserializer(result: Array<ResourceType>): any[] {
  return result.map((item) => {
    return resourceTypeDeserializer(item);
  });
}

/** model interface ResourceType */
export interface ResourceType {
  /** The resource type name. */
  name?: string;
  /** The resource routing type. */
  routingType?: RoutingType;
  /** The additional options. */
  additionalOptions?: AdditionalOptions;
  /** The cross tenant token validation. */
  crossTenantTokenValidation?: CrossTenantTokenValidation;
  /** The resource validation. */
  resourceValidation?: ResourceValidation;
  /** The allowed unauthorized actions. */
  allowedUnauthorizedActions?: string[];
  /** The allowed unauthorized actions extensions. */
  allowedUnauthorizedActionsExtensions?: AllowedUnauthorizedActionsExtension[];
  /** The authorization action mappings. */
  authorizationActionMappings?: AuthorizationActionMapping[];
  /** The linked access checks. */
  linkedAccessChecks?: LinkedAccessCheck[];
  /** The default api version. */
  defaultApiVersion?: string;
  /** The logging rules. */
  loggingRules?: LoggingRule[];
  /** The throttling rules. */
  throttlingRules?: ThrottlingRule[];
  /** The endpoints. */
  endpoints?: ResourceProviderEndpoint[];
  /** The marketplace type. */
  marketplaceType?: MarketplaceType;
  /** The identity management. */
  identityManagement?: ResourceTypeIdentityManagement;
  /** The metadata. */
  metadata?: any;
  /** The required features. */
  requiredFeatures?: string[];
  /** The features rule. */
  featuresRule?: ResourceTypeFeaturesRule;
  /** The subscription state rules. */
  subscriptionStateRules?: SubscriptionStateRule[];
  /** The service tree infos. */
  serviceTreeInfos?: ServiceTreeInfo[];
  /** The request header options. */
  requestHeaderOptions?: ResourceTypeRequestHeaderOptions;
  /** The sku link. */
  skuLink?: string;
  /** The disallowed action verbs. */
  disallowedActionVerbs?: string[];
  /** The template deployment policy. */
  templateDeploymentPolicy?: ResourceTypeTemplateDeploymentPolicy;
  /** The extended locations. */
  extendedLocations?: ExtendedLocationOptions[];
  /** The linked operation rules. */
  linkedOperationRules?: LinkedOperationRule[];
  /** The resource deletion policy. */
  resourceDeletionPolicy?: ManifestResourceDeletionPolicy;
  /** The quota rule. */
  quotaRule?: QuotaRule;
  /** The notifications. */
  notifications?: Notification[];
  /** The linked notification rules. */
  linkedNotificationRules?: LinkedNotificationRule[];
  /** The resource provider authorization rules. */
  resourceProviderAuthorizationRules?: ResourceProviderAuthorizationRules;
}

export function resourceTypeDeserializer(item: any): ResourceType {
  return {
    name: item["name"],
    routingType: item["routingType"],
    additionalOptions: item["additionalOptions"],
    crossTenantTokenValidation: item["crossTenantTokenValidation"],
    resourceValidation: item["resourceValidation"],
    allowedUnauthorizedActions: !item["allowedUnauthorizedActions"]
      ? item["allowedUnauthorizedActions"]
      : item["allowedUnauthorizedActions"].map((p: any) => {
          return p;
        }),
    allowedUnauthorizedActionsExtensions: !item["allowedUnauthorizedActionsExtensions"]
      ? item["allowedUnauthorizedActionsExtensions"]
      : allowedUnauthorizedActionsExtensionArrayDeserializer(
          item["allowedUnauthorizedActionsExtensions"],
        ),
    authorizationActionMappings: !item["authorizationActionMappings"]
      ? item["authorizationActionMappings"]
      : authorizationActionMappingArrayDeserializer(item["authorizationActionMappings"]),
    linkedAccessChecks: !item["linkedAccessChecks"]
      ? item["linkedAccessChecks"]
      : linkedAccessCheckArrayDeserializer(item["linkedAccessChecks"]),
    defaultApiVersion: item["defaultApiVersion"],
    loggingRules: !item["loggingRules"]
      ? item["loggingRules"]
      : loggingRuleArrayDeserializer(item["loggingRules"]),
    throttlingRules: !item["throttlingRules"]
      ? item["throttlingRules"]
      : throttlingRuleArrayDeserializer(item["throttlingRules"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : resourceProviderEndpointArrayDeserializer(item["endpoints"]),
    marketplaceType: item["marketplaceType"],
    identityManagement: !item["identityManagement"]
      ? item["identityManagement"]
      : resourceTypeIdentityManagementDeserializer(item["identityManagement"]),
    metadata: item["metadata"],
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceTypeFeaturesRuleDeserializer(item["featuresRule"]),
    subscriptionStateRules: !item["subscriptionStateRules"]
      ? item["subscriptionStateRules"]
      : subscriptionStateRuleArrayDeserializer(item["subscriptionStateRules"]),
    serviceTreeInfos: !item["serviceTreeInfos"]
      ? item["serviceTreeInfos"]
      : serviceTreeInfoArrayDeserializer(item["serviceTreeInfos"]),
    requestHeaderOptions: !item["requestHeaderOptions"]
      ? item["requestHeaderOptions"]
      : resourceTypeRequestHeaderOptionsDeserializer(item["requestHeaderOptions"]),
    skuLink: item["skuLink"],
    disallowedActionVerbs: !item["disallowedActionVerbs"]
      ? item["disallowedActionVerbs"]
      : item["disallowedActionVerbs"].map((p: any) => {
          return p;
        }),
    templateDeploymentPolicy: !item["templateDeploymentPolicy"]
      ? item["templateDeploymentPolicy"]
      : resourceTypeTemplateDeploymentPolicyDeserializer(item["templateDeploymentPolicy"]),
    extendedLocations: !item["extendedLocations"]
      ? item["extendedLocations"]
      : extendedLocationOptionsArrayDeserializer(item["extendedLocations"]),
    linkedOperationRules: !item["linkedOperationRules"]
      ? item["linkedOperationRules"]
      : linkedOperationRuleArrayDeserializer(item["linkedOperationRules"]),
    resourceDeletionPolicy: item["resourceDeletionPolicy"],
    quotaRule: !item["quotaRule"] ? item["quotaRule"] : quotaRuleDeserializer(item["quotaRule"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArrayDeserializer(item["notifications"]),
    linkedNotificationRules: !item["linkedNotificationRules"]
      ? item["linkedNotificationRules"]
      : linkedNotificationRuleArrayDeserializer(item["linkedNotificationRules"]),
    resourceProviderAuthorizationRules: !item["resourceProviderAuthorizationRules"]
      ? item["resourceProviderAuthorizationRules"]
      : resourceProviderAuthorizationRulesDeserializer(item["resourceProviderAuthorizationRules"]),
  };
}

/** The routing type. */
export enum KnownRoutingType {
  /** The resource routing type is default. */
  Default = "Default",
  /** The resource routing type is proxy only. */
  ProxyOnly = "ProxyOnly",
  /** The resource routing type is host based. */
  HostBased = "HostBased",
  /** The resource routing type is extension. */
  Extension = "Extension",
  /** The resource routing type is tenant. */
  Tenant = "Tenant",
  /** The resource routing type is fanout. */
  Fanout = "Fanout",
  /** The resource routing type is location based. */
  LocationBased = "LocationBased",
  /** The resource routing type is failover. */
  Failover = "Failover",
  /** The resource routing type is cascade extension. */
  CascadeExtension = "CascadeExtension",
  /** The resource routing type is child fanout. */
  ChildFanout = "ChildFanout",
  /** The resource routing type is cascade authorized extension. */
  CascadeAuthorizedExtension = "CascadeAuthorizedExtension",
  /** The resource routing type is bypass endpoint selection optimization. */
  BypassEndpointSelectionOptimization = "BypassEndpointSelectionOptimization",
  /** The resource routing type is location mapping. */
  LocationMapping = "LocationMapping",
  /** The resource routing type is service fanout. */
  ServiceFanout = "ServiceFanout",
}

/**
 * The routing type. \
 * {@link KnownRoutingType} can be used interchangeably with RoutingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: The resource routing type is default. \
 * **ProxyOnly**: The resource routing type is proxy only. \
 * **HostBased**: The resource routing type is host based. \
 * **Extension**: The resource routing type is extension. \
 * **Tenant**: The resource routing type is tenant. \
 * **Fanout**: The resource routing type is fanout. \
 * **LocationBased**: The resource routing type is location based. \
 * **Failover**: The resource routing type is failover. \
 * **CascadeExtension**: The resource routing type is cascade extension. \
 * **ChildFanout**: The resource routing type is child fanout. \
 * **CascadeAuthorizedExtension**: The resource routing type is cascade authorized extension. \
 * **BypassEndpointSelectionOptimization**: The resource routing type is bypass endpoint selection optimization. \
 * **LocationMapping**: The resource routing type is location mapping. \
 * **ServiceFanout**: The resource routing type is service fanout.
 */
export type RoutingType = string;

/** The additional options. */
export enum KnownAdditionalOptions {
  /** ProtectedAsyncOperationPolling */
  ProtectedAsyncOperationPolling = "ProtectedAsyncOperationPolling",
  /** ProtectedAsyncOperationPollingAuditOnly */
  ProtectedAsyncOperationPollingAuditOnly = "ProtectedAsyncOperationPollingAuditOnly",
}

/**
 * The additional options. \
 * {@link KnownAdditionalOptions} can be used interchangeably with AdditionalOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ProtectedAsyncOperationPolling** \
 * **ProtectedAsyncOperationPollingAuditOnly**
 */
export type AdditionalOptions = string;

/** The cross tenant token validation. */
export enum KnownCrossTenantTokenValidation {
  /** EnsureSecureValidation */
  EnsureSecureValidation = "EnsureSecureValidation",
  /** PassthroughInsecureToken */
  PassthroughInsecureToken = "PassthroughInsecureToken",
}

/**
 * The cross tenant token validation. \
 * {@link KnownCrossTenantTokenValidation} can be used interchangeably with CrossTenantTokenValidation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EnsureSecureValidation** \
 * **PassthroughInsecureToken**
 */
export type CrossTenantTokenValidation = string;

/** The resource validation. */
export enum KnownResourceValidation {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** ReservedWords */
  ReservedWords = "ReservedWords",
  /** ProfaneWords */
  ProfaneWords = "ProfaneWords",
}

/**
 * The resource validation. \
 * {@link KnownResourceValidation} can be used interchangeably with ResourceValidation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **ReservedWords** \
 * **ProfaneWords**
 */
export type ResourceValidation = string;

export function allowedUnauthorizedActionsExtensionArraySerializer(
  result: Array<AllowedUnauthorizedActionsExtension>,
): any[] {
  return result.map((item) => {
    return allowedUnauthorizedActionsExtensionSerializer(item);
  });
}

export function allowedUnauthorizedActionsExtensionArrayDeserializer(
  result: Array<AllowedUnauthorizedActionsExtension>,
): any[] {
  return result.map((item) => {
    return allowedUnauthorizedActionsExtensionDeserializer(item);
  });
}

/** model interface AllowedUnauthorizedActionsExtension */
export interface AllowedUnauthorizedActionsExtension {
  /** The action. */
  action?: string;
  /** The intent. */
  intent?: Intent;
}

export function allowedUnauthorizedActionsExtensionSerializer(
  item: AllowedUnauthorizedActionsExtension,
): any {
  return { action: item["action"], intent: item["intent"] };
}

export function allowedUnauthorizedActionsExtensionDeserializer(
  item: any,
): AllowedUnauthorizedActionsExtension {
  return {
    action: item["action"],
    intent: item["intent"],
  };
}

/** The intent. */
export enum KnownIntent {
  /** Default value. */
  NOTSpecified = "NOT_SPECIFIED",
  /** Data is not sensitive and ok to access. */
  LOWPrivilege = "LOW_PRIVILEGE",
  /** Used for RP's using a custom authorization check outside of ARM. */
  DeferredAccessCheck = "DEFERRED_ACCESS_CHECK",
  /** RP contract allows certain operations to be unauthorized action. */
  RPContract = "RP_CONTRACT",
}

/**
 * The intent. \
 * {@link KnownIntent} can be used interchangeably with Intent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NOT_SPECIFIED**: Default value. \
 * **LOW_PRIVILEGE**: Data is not sensitive and ok to access. \
 * **DEFERRED_ACCESS_CHECK**: Used for RP's using a custom authorization check outside of ARM. \
 * **RP_CONTRACT**: RP contract allows certain operations to be unauthorized action.
 */
export type Intent = string;

export function authorizationActionMappingArraySerializer(
  result: Array<AuthorizationActionMapping>,
): any[] {
  return result.map((item) => {
    return authorizationActionMappingSerializer(item);
  });
}

export function authorizationActionMappingArrayDeserializer(
  result: Array<AuthorizationActionMapping>,
): any[] {
  return result.map((item) => {
    return authorizationActionMappingDeserializer(item);
  });
}

/** model interface AuthorizationActionMapping */
export interface AuthorizationActionMapping {
  /** The original action name. */
  original?: string;
  /** The desired action name. */
  desired?: string;
}

export function authorizationActionMappingSerializer(item: AuthorizationActionMapping): any {
  return { original: item["original"], desired: item["desired"] };
}

export function authorizationActionMappingDeserializer(item: any): AuthorizationActionMapping {
  return {
    original: item["original"],
    desired: item["desired"],
  };
}

export function linkedAccessCheckArraySerializer(result: Array<LinkedAccessCheck>): any[] {
  return result.map((item) => {
    return linkedAccessCheckSerializer(item);
  });
}

export function linkedAccessCheckArrayDeserializer(result: Array<LinkedAccessCheck>): any[] {
  return result.map((item) => {
    return linkedAccessCheckDeserializer(item);
  });
}

/** model interface LinkedAccessCheck */
export interface LinkedAccessCheck {
  /** The action name. */
  actionName?: string;
  /** The linked property. */
  linkedProperty?: string;
  /** The linked action. */
  linkedAction?: string;
  /** The linked action verb. */
  linkedActionVerb?: string;
  /** The linked type. */
  linkedType?: string;
}

export function linkedAccessCheckSerializer(item: LinkedAccessCheck): any {
  return {
    actionName: item["actionName"],
    linkedProperty: item["linkedProperty"],
    linkedAction: item["linkedAction"],
    linkedActionVerb: item["linkedActionVerb"],
    linkedType: item["linkedType"],
  };
}

export function linkedAccessCheckDeserializer(item: any): LinkedAccessCheck {
  return {
    actionName: item["actionName"],
    linkedProperty: item["linkedProperty"],
    linkedAction: item["linkedAction"],
    linkedActionVerb: item["linkedActionVerb"],
    linkedType: item["linkedType"],
  };
}

export function loggingRuleArraySerializer(result: Array<LoggingRule>): any[] {
  return result.map((item) => {
    return loggingRuleSerializer(item);
  });
}

export function loggingRuleArrayDeserializer(result: Array<LoggingRule>): any[] {
  return result.map((item) => {
    return loggingRuleDeserializer(item);
  });
}

/** model interface LoggingRule */
export interface LoggingRule {
  /** The action. */
  action: string;
  /** The direction. */
  direction: LoggingDirections;
  /** The detail level. */
  detailLevel: LoggingDetails;
  /** The hidden property paths. */
  hiddenPropertyPaths?: LoggingRuleHiddenPropertyPaths;
}

export function loggingRuleSerializer(item: LoggingRule): any {
  return {
    action: item["action"],
    direction: item["direction"],
    detailLevel: item["detailLevel"],
    hiddenPropertyPaths: !item["hiddenPropertyPaths"]
      ? item["hiddenPropertyPaths"]
      : loggingRuleHiddenPropertyPathsSerializer(item["hiddenPropertyPaths"]),
  };
}

export function loggingRuleDeserializer(item: any): LoggingRule {
  return {
    action: item["action"],
    direction: item["direction"],
    detailLevel: item["detailLevel"],
    hiddenPropertyPaths: !item["hiddenPropertyPaths"]
      ? item["hiddenPropertyPaths"]
      : loggingRuleHiddenPropertyPathsDeserializer(item["hiddenPropertyPaths"]),
  };
}

/** The direction. */
export enum KnownLoggingDirections {
  /** None */
  None = "None",
  /** Request */
  Request = "Request",
  /** Response */
  Response = "Response",
}

/**
 * The direction. \
 * {@link KnownLoggingDirections} can be used interchangeably with LoggingDirections,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Request** \
 * **Response**
 */
export type LoggingDirections = string;

/** The detail level. */
export enum KnownLoggingDetails {
  /** None */
  None = "None",
  /** Body */
  Body = "Body",
}

/**
 * The detail level. \
 * {@link KnownLoggingDetails} can be used interchangeably with LoggingDetails,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Body**
 */
export type LoggingDetails = string;

/** The hidden property paths. */
export interface LoggingRuleHiddenPropertyPaths extends LoggingHiddenPropertyPath {}

export function loggingRuleHiddenPropertyPathsSerializer(
  item: LoggingRuleHiddenPropertyPaths,
): any {
  return {
    hiddenPathsOnRequest: !item["hiddenPathsOnRequest"]
      ? item["hiddenPathsOnRequest"]
      : item["hiddenPathsOnRequest"].map((p: any) => {
          return p;
        }),
    hiddenPathsOnResponse: !item["hiddenPathsOnResponse"]
      ? item["hiddenPathsOnResponse"]
      : item["hiddenPathsOnResponse"].map((p: any) => {
          return p;
        }),
  };
}

export function loggingRuleHiddenPropertyPathsDeserializer(
  item: any,
): LoggingRuleHiddenPropertyPaths {
  return {
    hiddenPathsOnRequest: !item["hiddenPathsOnRequest"]
      ? item["hiddenPathsOnRequest"]
      : item["hiddenPathsOnRequest"].map((p: any) => {
          return p;
        }),
    hiddenPathsOnResponse: !item["hiddenPathsOnResponse"]
      ? item["hiddenPathsOnResponse"]
      : item["hiddenPathsOnResponse"].map((p: any) => {
          return p;
        }),
  };
}

export function throttlingRuleArraySerializer(result: Array<ThrottlingRule>): any[] {
  return result.map((item) => {
    return throttlingRuleSerializer(item);
  });
}

export function throttlingRuleArrayDeserializer(result: Array<ThrottlingRule>): any[] {
  return result.map((item) => {
    return throttlingRuleDeserializer(item);
  });
}

/** model interface ThrottlingRule */
export interface ThrottlingRule {
  /** The action. */
  action: string;
  /** The metrics. */
  metrics: ThrottlingMetric[];
  /** The required features. */
  requiredFeatures?: string[];
  /** The application id. */
  applicationId?: string[];
}

export function throttlingRuleSerializer(item: ThrottlingRule): any {
  return {
    action: item["action"],
    metrics: throttlingMetricArraySerializer(item["metrics"]),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    applicationId: !item["applicationId"]
      ? item["applicationId"]
      : item["applicationId"].map((p: any) => {
          return p;
        }),
  };
}

export function throttlingRuleDeserializer(item: any): ThrottlingRule {
  return {
    action: item["action"],
    metrics: throttlingMetricArrayDeserializer(item["metrics"]),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    applicationId: !item["applicationId"]
      ? item["applicationId"]
      : item["applicationId"].map((p: any) => {
          return p;
        }),
  };
}

export function throttlingMetricArraySerializer(result: Array<ThrottlingMetric>): any[] {
  return result.map((item) => {
    return throttlingMetricSerializer(item);
  });
}

export function throttlingMetricArrayDeserializer(result: Array<ThrottlingMetric>): any[] {
  return result.map((item) => {
    return throttlingMetricDeserializer(item);
  });
}

/** model interface ThrottlingMetric */
export interface ThrottlingMetric {
  /** The throttling metric type */
  type: ThrottlingMetricType;
  /** The limit. */
  limit: number;
  /** The interval. */
  interval?: string;
}

export function throttlingMetricSerializer(item: ThrottlingMetric): any {
  return { type: item["type"], limit: item["limit"], interval: item["interval"] };
}

export function throttlingMetricDeserializer(item: any): ThrottlingMetric {
  return {
    type: item["type"],
    limit: item["limit"],
    interval: item["interval"],
  };
}

/** The throttling metric type */
export enum KnownThrottlingMetricType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** NumberOfRequests */
  NumberOfRequests = "NumberOfRequests",
  /** NumberOfResources */
  NumberOfResources = "NumberOfResources",
}

/**
 * The throttling metric type \
 * {@link KnownThrottlingMetricType} can be used interchangeably with ThrottlingMetricType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **NumberOfRequests** \
 * **NumberOfResources**
 */
export type ThrottlingMetricType = string;

export function resourceProviderEndpointArraySerializer(
  result: Array<ResourceProviderEndpoint>,
): any[] {
  return result.map((item) => {
    return resourceProviderEndpointSerializer(item);
  });
}

export function resourceProviderEndpointArrayDeserializer(
  result: Array<ResourceProviderEndpoint>,
): any[] {
  return result.map((item) => {
    return resourceProviderEndpointDeserializer(item);
  });
}

/** model interface ResourceProviderEndpoint */
export interface ResourceProviderEndpoint {
  /** Whether the endpoint is enabled. */
  enabled?: boolean;
  /** The api versions. */
  apiVersions?: string[];
  /** The endpoint uri. */
  endpointUri?: string;
  /** The locations. */
  locations?: string[];
  /** The required features. */
  requiredFeatures?: string[];
  /** The feature rules. */
  featuresRule?: ResourceProviderEndpointFeaturesRule;
  /** The timeout. */
  timeout?: string;
  /** The endpoint type. */
  endpointType?: EndpointType;
  /** The sku link. */
  skuLink?: string;
}

export function resourceProviderEndpointSerializer(item: ResourceProviderEndpoint): any {
  return {
    enabled: item["enabled"],
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    endpointUri: item["endpointUri"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceProviderEndpointFeaturesRuleSerializer(item["featuresRule"]),
    timeout: item["timeout"],
    endpointType: item["endpointType"],
    skuLink: item["skuLink"],
  };
}

export function resourceProviderEndpointDeserializer(item: any): ResourceProviderEndpoint {
  return {
    enabled: item["enabled"],
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    endpointUri: item["endpointUri"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceProviderEndpointFeaturesRuleDeserializer(item["featuresRule"]),
    timeout: item["timeout"],
    endpointType: item["endpointType"],
    skuLink: item["skuLink"],
  };
}

/** The feature rules. */
export interface ResourceProviderEndpointFeaturesRule extends FeaturesRule {}

export function resourceProviderEndpointFeaturesRuleSerializer(
  item: ResourceProviderEndpointFeaturesRule,
): any {
  return { requiredFeaturesPolicy: item["requiredFeaturesPolicy"] };
}

export function resourceProviderEndpointFeaturesRuleDeserializer(
  item: any,
): ResourceProviderEndpointFeaturesRule {
  return {
    requiredFeaturesPolicy: item["requiredFeaturesPolicy"],
  };
}

/** The endpoint type. */
export enum KnownEndpointType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Canary */
  Canary = "Canary",
  /** Production */
  Production = "Production",
  /** TestInProduction */
  TestInProduction = "TestInProduction",
}

/**
 * The endpoint type. \
 * {@link KnownEndpointType} can be used interchangeably with EndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Canary** \
 * **Production** \
 * **TestInProduction**
 */
export type EndpointType = string;
/** The marketplace type. */
export type MarketplaceType = "NotSpecified" | "AddOn" | "Bypass" | "Store";

/** The identity management. */
export interface ResourceTypeIdentityManagement extends IdentityManagement {}

export function resourceTypeIdentityManagementDeserializer(
  item: any,
): ResourceTypeIdentityManagement {
  return {
    type: item["type"],
  };
}

/** The features rule. */
export interface ResourceTypeFeaturesRule extends FeaturesRule {}

export function resourceTypeFeaturesRuleDeserializer(item: any): ResourceTypeFeaturesRule {
  return {
    requiredFeaturesPolicy: item["requiredFeaturesPolicy"],
  };
}

export function subscriptionStateRuleArraySerializer(result: Array<SubscriptionStateRule>): any[] {
  return result.map((item) => {
    return subscriptionStateRuleSerializer(item);
  });
}

export function subscriptionStateRuleArrayDeserializer(
  result: Array<SubscriptionStateRule>,
): any[] {
  return result.map((item) => {
    return subscriptionStateRuleDeserializer(item);
  });
}

/** model interface SubscriptionStateRule */
export interface SubscriptionStateRule {
  /** The subscription state. */
  state?: SubscriptionState;
  /** The allowed actions. */
  allowedActions?: string[];
}

export function subscriptionStateRuleSerializer(item: SubscriptionStateRule): any {
  return {
    state: item["state"],
    allowedActions: !item["allowedActions"]
      ? item["allowedActions"]
      : item["allowedActions"].map((p: any) => {
          return p;
        }),
  };
}

export function subscriptionStateRuleDeserializer(item: any): SubscriptionStateRule {
  return {
    state: item["state"],
    allowedActions: !item["allowedActions"]
      ? item["allowedActions"]
      : item["allowedActions"].map((p: any) => {
          return p;
        }),
  };
}

/** The subscription state. */
export enum KnownSubscriptionState {
  /** NotDefined */
  NotDefined = "NotDefined",
  /** Enabled */
  Enabled = "Enabled",
  /** Warned */
  Warned = "Warned",
  /** PastDue */
  PastDue = "PastDue",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleted */
  Deleted = "Deleted",
}

/**
 * The subscription state. \
 * {@link KnownSubscriptionState} can be used interchangeably with SubscriptionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotDefined** \
 * **Enabled** \
 * **Warned** \
 * **PastDue** \
 * **Disabled** \
 * **Deleted**
 */
export type SubscriptionState = string;

export function serviceTreeInfoArraySerializer(result: Array<ServiceTreeInfo>): any[] {
  return result.map((item) => {
    return serviceTreeInfoSerializer(item);
  });
}

export function serviceTreeInfoArrayDeserializer(result: Array<ServiceTreeInfo>): any[] {
  return result.map((item) => {
    return serviceTreeInfoDeserializer(item);
  });
}

/** model interface ServiceTreeInfo */
export interface ServiceTreeInfo {
  /** The service id. */
  serviceId?: string;
  /** The component id. */
  componentId?: string;
  /** The readiness. */
  readiness?: Readiness;
}

export function serviceTreeInfoSerializer(item: ServiceTreeInfo): any {
  return {
    serviceId: item["serviceId"],
    componentId: item["componentId"],
    readiness: item["readiness"],
  };
}

export function serviceTreeInfoDeserializer(item: any): ServiceTreeInfo {
  return {
    serviceId: item["serviceId"],
    componentId: item["componentId"],
    readiness: item["readiness"],
  };
}

/** The readiness. */
export enum KnownReadiness {
  /** ClosingDown */
  ClosingDown = "ClosingDown",
  /** Deprecated */
  Deprecated = "Deprecated",
  /** GA */
  GA = "GA",
  /** InDevelopment */
  InDevelopment = "InDevelopment",
  /** InternalOnly */
  InternalOnly = "InternalOnly",
  /** PrivatePreview */
  PrivatePreview = "PrivatePreview",
  /** PublicPreview */
  PublicPreview = "PublicPreview",
  /** RemovedFromARM */
  RemovedFromARM = "RemovedFromARM",
  /** Retired */
  Retired = "Retired",
}

/**
 * The readiness. \
 * {@link KnownReadiness} can be used interchangeably with Readiness,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ClosingDown** \
 * **Deprecated** \
 * **GA** \
 * **InDevelopment** \
 * **InternalOnly** \
 * **PrivatePreview** \
 * **PublicPreview** \
 * **RemovedFromARM** \
 * **Retired**
 */
export type Readiness = string;

/** The request header options. */
export interface ResourceTypeRequestHeaderOptions extends RequestHeaderOptions {}

export function resourceTypeRequestHeaderOptionsDeserializer(
  item: any,
): ResourceTypeRequestHeaderOptions {
  return {
    optInHeaders: item["optInHeaders"],
    optOutHeaders: item["optOutHeaders"],
  };
}

/** The template deployment policy. */
export interface ResourceTypeTemplateDeploymentPolicy extends TemplateDeploymentPolicy {}

export function resourceTypeTemplateDeploymentPolicyDeserializer(
  item: any,
): ResourceTypeTemplateDeploymentPolicy {
  return {
    capabilities: item["capabilities"],
    preflightOptions: item["preflightOptions"],
    preflightNotifications: item["preflightNotifications"],
  };
}

export function extendedLocationOptionsArraySerializer(
  result: Array<ExtendedLocationOptions>,
): any[] {
  return result.map((item) => {
    return extendedLocationOptionsSerializer(item);
  });
}

export function extendedLocationOptionsArrayDeserializer(
  result: Array<ExtendedLocationOptions>,
): any[] {
  return result.map((item) => {
    return extendedLocationOptionsDeserializer(item);
  });
}

/** model interface ExtendedLocationOptions */
export interface ExtendedLocationOptions {
  /** The type. */
  type?: ExtendedLocationType;
  supportedPolicy?: ResourceTypeExtendedLocationPolicy;
}

export function extendedLocationOptionsSerializer(item: ExtendedLocationOptions): any {
  return { type: item["type"], supportedPolicy: item["supportedPolicy"] };
}

export function extendedLocationOptionsDeserializer(item: any): ExtendedLocationOptions {
  return {
    type: item["type"],
    supportedPolicy: item["supportedPolicy"],
  };
}

/** The extended location type. */
export enum KnownExtendedLocationType {
  /** The extended location type is not specified. */
  NotSpecified = "NotSpecified",
  /** The extended location type is custom location. */
  CustomLocation = "CustomLocation",
  /** The extended location type is edge zone. */
  EdgeZone = "EdgeZone",
  /** The extended location type is arc zone. */
  ArcZone = "ArcZone",
}

/**
 * The extended location type. \
 * {@link KnownExtendedLocationType} can be used interchangeably with ExtendedLocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The extended location type is not specified. \
 * **CustomLocation**: The extended location type is custom location. \
 * **EdgeZone**: The extended location type is edge zone. \
 * **ArcZone**: The extended location type is arc zone.
 */
export type ExtendedLocationType = string;

/** Known values of {@link ResourceTypeExtendedLocationPolicy} that the service accepts. */
export enum KnownResourceTypeExtendedLocationPolicy {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** All */
  All = "All",
}

/** Type of ResourceTypeExtendedLocationPolicy */
export type ResourceTypeExtendedLocationPolicy = string;

export function linkedOperationRuleArraySerializer(result: Array<LinkedOperationRule>): any[] {
  return result.map((item) => {
    return linkedOperationRuleSerializer(item);
  });
}

export function linkedOperationRuleArrayDeserializer(result: Array<LinkedOperationRule>): any[] {
  return result.map((item) => {
    return linkedOperationRuleDeserializer(item);
  });
}

/** model interface LinkedOperationRule */
export interface LinkedOperationRule {
  /** The linked operation. */
  linkedOperation: LinkedOperation;
  /** The linked action. */
  linkedAction: LinkedAction;
  /** Depends on types. */
  dependsOnTypes?: string[];
}

export function linkedOperationRuleSerializer(item: LinkedOperationRule): any {
  return {
    linkedOperation: item["linkedOperation"],
    linkedAction: item["linkedAction"],
    dependsOnTypes: !item["dependsOnTypes"]
      ? item["dependsOnTypes"]
      : item["dependsOnTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function linkedOperationRuleDeserializer(item: any): LinkedOperationRule {
  return {
    linkedOperation: item["linkedOperation"],
    linkedAction: item["linkedAction"],
    dependsOnTypes: !item["dependsOnTypes"]
      ? item["dependsOnTypes"]
      : item["dependsOnTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** The linked operation. */
export enum KnownLinkedOperation {
  /** None */
  None = "None",
  /** CrossResourceGroupResourceMove */
  CrossResourceGroupResourceMove = "CrossResourceGroupResourceMove",
  /** CrossSubscriptionResourceMove */
  CrossSubscriptionResourceMove = "CrossSubscriptionResourceMove",
}

/**
 * The linked operation. \
 * {@link KnownLinkedOperation} can be used interchangeably with LinkedOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **CrossResourceGroupResourceMove** \
 * **CrossSubscriptionResourceMove**
 */
export type LinkedOperation = string;

/** The linked action. */
export enum KnownLinkedAction {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Blocked */
  Blocked = "Blocked",
  /** Validate */
  Validate = "Validate",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * The linked action. \
 * {@link KnownLinkedAction} can be used interchangeably with LinkedAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Blocked** \
 * **Validate** \
 * **Enabled**
 */
export type LinkedAction = string;

/** The resource deletion policy. */
export enum KnownManifestResourceDeletionPolicy {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Cascade */
  Cascade = "Cascade",
  /** Force */
  Force = "Force",
}

/**
 * The resource deletion policy. \
 * {@link KnownManifestResourceDeletionPolicy} can be used interchangeably with ManifestResourceDeletionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Cascade** \
 * **Force**
 */
export type ManifestResourceDeletionPolicy = string;

/** model interface QuotaRule */
export interface QuotaRule {
  /** The quota policy. */
  quotaPolicy?: QuotaPolicy;
  /** The location rules. */
  locationRules?: LocationQuotaRule[];
  /** The required features. */
  requiredFeatures?: string[];
}

export function quotaRuleSerializer(item: QuotaRule): any {
  return {
    quotaPolicy: item["quotaPolicy"],
    locationRules: !item["locationRules"]
      ? item["locationRules"]
      : locationQuotaRuleArraySerializer(item["locationRules"]),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
  };
}

export function quotaRuleDeserializer(item: any): QuotaRule {
  return {
    quotaPolicy: item["quotaPolicy"],
    locationRules: !item["locationRules"]
      ? item["locationRules"]
      : locationQuotaRuleArrayDeserializer(item["locationRules"]),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link QuotaPolicy} that the service accepts. */
export enum KnownQuotaPolicy {
  /** Default */
  Default = "Default",
  /** None */
  None = "None",
  /** Restricted */
  Restricted = "Restricted",
}

/** Type of QuotaPolicy */
export type QuotaPolicy = string;

export function locationQuotaRuleArraySerializer(result: Array<LocationQuotaRule>): any[] {
  return result.map((item) => {
    return locationQuotaRuleSerializer(item);
  });
}

export function locationQuotaRuleArrayDeserializer(result: Array<LocationQuotaRule>): any[] {
  return result.map((item) => {
    return locationQuotaRuleDeserializer(item);
  });
}

/** model interface LocationQuotaRule */
export interface LocationQuotaRule {
  /** The policy. */
  policy?: QuotaPolicy;
  /** The quota id. */
  quotaId?: string;
  /** The location. */
  location?: string;
}

export function locationQuotaRuleSerializer(item: LocationQuotaRule): any {
  return { policy: item["policy"], quotaId: item["quotaId"], location: item["location"] };
}

export function locationQuotaRuleDeserializer(item: any): LocationQuotaRule {
  return {
    policy: item["policy"],
    quotaId: item["quotaId"],
    location: item["location"],
  };
}

export function notificationArraySerializer(result: Array<Notification>): any[] {
  return result.map((item) => {
    return notificationSerializer(item);
  });
}

export function notificationArrayDeserializer(result: Array<Notification>): any[] {
  return result.map((item) => {
    return notificationDeserializer(item);
  });
}

/** model interface Notification */
export interface Notification {
  /** The notification type. */
  notificationType?: NotificationType;
  /** Whether notifications should be skipped. */
  skipNotifications?: SkipNotifications;
}

export function notificationSerializer(item: Notification): any {
  return {
    notificationType: item["notificationType"],
    skipNotifications: item["skipNotifications"],
  };
}

export function notificationDeserializer(item: any): Notification {
  return {
    notificationType: item["notificationType"],
    skipNotifications: item["skipNotifications"],
  };
}

/** The notification type. */
export enum KnownNotificationType {
  /** Unspecified */
  Unspecified = "Unspecified",
  /** SubscriptionNotification */
  SubscriptionNotification = "SubscriptionNotification",
}

/**
 * The notification type. \
 * {@link KnownNotificationType} can be used interchangeably with NotificationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unspecified** \
 * **SubscriptionNotification**
 */
export type NotificationType = string;

/** Whether notifications should be skipped. */
export enum KnownSkipNotifications {
  /** Unspecified */
  Unspecified = "Unspecified",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether notifications should be skipped. \
 * {@link KnownSkipNotifications} can be used interchangeably with SkipNotifications,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unspecified** \
 * **Enabled** \
 * **Disabled**
 */
export type SkipNotifications = string;

export function linkedNotificationRuleArraySerializer(
  result: Array<LinkedNotificationRule>,
): any[] {
  return result.map((item) => {
    return linkedNotificationRuleSerializer(item);
  });
}

export function linkedNotificationRuleArrayDeserializer(
  result: Array<LinkedNotificationRule>,
): any[] {
  return result.map((item) => {
    return linkedNotificationRuleDeserializer(item);
  });
}

/** model interface LinkedNotificationRule */
export interface LinkedNotificationRule {
  /** The actions. */
  actions?: string[];
  /** The actions on failed operation. */
  actionsOnFailedOperation?: string[];
  /** The fast path actions. */
  fastPathActions?: string[];
  /** The fast path action on failed operation. */
  fastPathActionsOnFailedOperation?: string[];
  /** This is a TimeSpan property. */
  linkedNotificationTimeout?: string;
}

export function linkedNotificationRuleSerializer(item: LinkedNotificationRule): any {
  return {
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    actionsOnFailedOperation: !item["actionsOnFailedOperation"]
      ? item["actionsOnFailedOperation"]
      : item["actionsOnFailedOperation"].map((p: any) => {
          return p;
        }),
    fastPathActions: !item["fastPathActions"]
      ? item["fastPathActions"]
      : item["fastPathActions"].map((p: any) => {
          return p;
        }),
    fastPathActionsOnFailedOperation: !item["fastPathActionsOnFailedOperation"]
      ? item["fastPathActionsOnFailedOperation"]
      : item["fastPathActionsOnFailedOperation"].map((p: any) => {
          return p;
        }),
    linkedNotificationTimeout: item["linkedNotificationTimeout"],
  };
}

export function linkedNotificationRuleDeserializer(item: any): LinkedNotificationRule {
  return {
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    actionsOnFailedOperation: !item["actionsOnFailedOperation"]
      ? item["actionsOnFailedOperation"]
      : item["actionsOnFailedOperation"].map((p: any) => {
          return p;
        }),
    fastPathActions: !item["fastPathActions"]
      ? item["fastPathActions"]
      : item["fastPathActions"].map((p: any) => {
          return p;
        }),
    fastPathActionsOnFailedOperation: !item["fastPathActionsOnFailedOperation"]
      ? item["fastPathActionsOnFailedOperation"]
      : item["fastPathActionsOnFailedOperation"].map((p: any) => {
          return p;
        }),
    linkedNotificationTimeout: item["linkedNotificationTimeout"],
  };
}

/** model interface ResourceProviderAuthorizationRules */
export interface ResourceProviderAuthorizationRules {
  /** The async operation polling rules. */
  asyncOperationPollingRules?: AsyncOperationPollingRules;
}

export function resourceProviderAuthorizationRulesSerializer(
  item: ResourceProviderAuthorizationRules,
): any {
  return {
    asyncOperationPollingRules: !item["asyncOperationPollingRules"]
      ? item["asyncOperationPollingRules"]
      : asyncOperationPollingRulesSerializer(item["asyncOperationPollingRules"]),
  };
}

export function resourceProviderAuthorizationRulesDeserializer(
  item: any,
): ResourceProviderAuthorizationRules {
  return {
    asyncOperationPollingRules: !item["asyncOperationPollingRules"]
      ? item["asyncOperationPollingRules"]
      : asyncOperationPollingRulesDeserializer(item["asyncOperationPollingRules"]),
  };
}

/** model interface AsyncOperationPollingRules */
export interface AsyncOperationPollingRules {
  /** The authorization actions. */
  authorizationActions?: string[];
  /** The additional options. */
  additionalOptions?: AdditionalOptionsAsyncOperation;
}

export function asyncOperationPollingRulesSerializer(item: AsyncOperationPollingRules): any {
  return {
    authorizationActions: !item["authorizationActions"]
      ? item["authorizationActions"]
      : item["authorizationActions"].map((p: any) => {
          return p;
        }),
    additionalOptions: item["additionalOptions"],
  };
}

export function asyncOperationPollingRulesDeserializer(item: any): AsyncOperationPollingRules {
  return {
    authorizationActions: !item["authorizationActions"]
      ? item["authorizationActions"]
      : item["authorizationActions"].map((p: any) => {
          return p;
        }),
    additionalOptions: item["additionalOptions"],
  };
}

/** The additional options. */
export enum KnownAdditionalOptionsAsyncOperation {
  /** ProtectedAsyncOperationPolling */
  ProtectedAsyncOperationPolling = "ProtectedAsyncOperationPolling",
  /** ProtectedAsyncOperationPollingAuditOnly */
  ProtectedAsyncOperationPollingAuditOnly = "ProtectedAsyncOperationPollingAuditOnly",
}

/**
 * The additional options. \
 * {@link KnownAdditionalOptionsAsyncOperation} can be used interchangeably with AdditionalOptionsAsyncOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ProtectedAsyncOperationPolling** \
 * **ProtectedAsyncOperationPollingAuditOnly**
 */
export type AdditionalOptionsAsyncOperation = string;

/** The resource provider management. */
export interface ResourceProviderManifestManagement extends ResourceProviderManagement {}

export function resourceProviderManifestManagementDeserializer(
  item: any,
): ResourceProviderManifestManagement {
  return {
    schemaOwners: !item["schemaOwners"]
      ? item["schemaOwners"]
      : item["schemaOwners"].map((p: any) => {
          return p;
        }),
    manifestOwners: !item["manifestOwners"]
      ? item["manifestOwners"]
      : item["manifestOwners"].map((p: any) => {
          return p;
        }),
    authorizationOwners: !item["authorizationOwners"]
      ? item["authorizationOwners"]
      : item["authorizationOwners"].map((p: any) => {
          return p;
        }),
    incidentRoutingService: item["incidentRoutingService"],
    incidentRoutingTeam: item["incidentRoutingTeam"],
    incidentContactEmail: item["incidentContactEmail"],
    serviceTreeInfos: !item["serviceTreeInfos"]
      ? item["serviceTreeInfos"]
      : serviceTreeInfoArrayDeserializer(item["serviceTreeInfos"]),
    resourceAccessPolicy: item["resourceAccessPolicy"],
    resourceAccessRoles: !item["resourceAccessRoles"]
      ? item["resourceAccessRoles"]
      : resourceAccessRoleArrayDeserializer(item["resourceAccessRoles"]),
    expeditedRolloutSubmitters: !item["expeditedRolloutSubmitters"]
      ? item["expeditedRolloutSubmitters"]
      : item["expeditedRolloutSubmitters"].map((p: any) => {
          return p;
        }),
    errorResponseMessageOptions: !item["errorResponseMessageOptions"]
      ? item["errorResponseMessageOptions"]
      : resourceProviderManagementErrorResponseMessageOptionsDeserializer(
          item["errorResponseMessageOptions"],
        ),
    expeditedRolloutMetadata: !item["expeditedRolloutMetadata"]
      ? item["expeditedRolloutMetadata"]
      : resourceProviderManagementExpeditedRolloutMetadataDeserializer(
          item["expeditedRolloutMetadata"],
        ),
    canaryManifestOwners: !item["canaryManifestOwners"]
      ? item["canaryManifestOwners"]
      : item["canaryManifestOwners"].map((p: any) => {
          return p;
        }),
    pcCode: item["pcCode"],
    profitCenterProgramId: item["profitCenterProgramId"],
  };
}

export function resourceProviderCapabilitiesArraySerializer(
  result: Array<ResourceProviderCapabilities>,
): any[] {
  return result.map((item) => {
    return resourceProviderCapabilitiesSerializer(item);
  });
}

export function resourceProviderCapabilitiesArrayDeserializer(
  result: Array<ResourceProviderCapabilities>,
): any[] {
  return result.map((item) => {
    return resourceProviderCapabilitiesDeserializer(item);
  });
}

/** model interface ResourceProviderCapabilities */
export interface ResourceProviderCapabilities {
  /** The quota id. */
  quotaId: string;
  /** The effect. */
  effect: ResourceProviderCapabilitiesEffect;
  /** The required features. */
  requiredFeatures?: string[];
}

export function resourceProviderCapabilitiesSerializer(item: ResourceProviderCapabilities): any {
  return {
    quotaId: item["quotaId"],
    effect: item["effect"],
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
  };
}

export function resourceProviderCapabilitiesDeserializer(item: any): ResourceProviderCapabilities {
  return {
    quotaId: item["quotaId"],
    effect: item["effect"],
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
  };
}

/** The effect. */
export enum KnownResourceProviderCapabilitiesEffect {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Allow */
  Allow = "Allow",
  /** Disallow */
  Disallow = "Disallow",
}

/**
 * The effect. \
 * {@link KnownResourceProviderCapabilitiesEffect} can be used interchangeably with ResourceProviderCapabilitiesEffect,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Allow** \
 * **Disallow**
 */
export type ResourceProviderCapabilitiesEffect = string;

/** The re-register subscription metadata. */
export interface ResourceProviderManifestReRegisterSubscriptionMetadata extends ReRegisterSubscriptionMetadata {}

export function resourceProviderManifestReRegisterSubscriptionMetadataDeserializer(
  item: any,
): ResourceProviderManifestReRegisterSubscriptionMetadata {
  return {
    enabled: item["enabled"],
    concurrencyLimit: item["concurrencyLimit"],
  };
}

export function fanoutLinkedNotificationRuleArraySerializer(
  result: Array<FanoutLinkedNotificationRule>,
): any[] {
  return result.map((item) => {
    return fanoutLinkedNotificationRuleSerializer(item);
  });
}

export function fanoutLinkedNotificationRuleArrayDeserializer(
  result: Array<FanoutLinkedNotificationRule>,
): any[] {
  return result.map((item) => {
    return fanoutLinkedNotificationRuleDeserializer(item);
  });
}

/** model interface FanoutLinkedNotificationRule */
export interface FanoutLinkedNotificationRule {
  /** The token auth configuration. */
  tokenAuthConfiguration?: TokenAuthConfiguration;
  /** The actions. */
  actions?: string[];
  /** The endpoints. */
  endpoints?: ResourceProviderEndpoint[];
  /** The dsts configuration. */
  dstsConfiguration?: FanoutLinkedNotificationRuleDstsConfiguration;
}

export function fanoutLinkedNotificationRuleSerializer(item: FanoutLinkedNotificationRule): any {
  return {
    tokenAuthConfiguration: !item["tokenAuthConfiguration"]
      ? item["tokenAuthConfiguration"]
      : tokenAuthConfigurationSerializer(item["tokenAuthConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : resourceProviderEndpointArraySerializer(item["endpoints"]),
    dstsConfiguration: !item["dstsConfiguration"]
      ? item["dstsConfiguration"]
      : fanoutLinkedNotificationRuleDstsConfigurationSerializer(item["dstsConfiguration"]),
  };
}

export function fanoutLinkedNotificationRuleDeserializer(item: any): FanoutLinkedNotificationRule {
  return {
    tokenAuthConfiguration: !item["tokenAuthConfiguration"]
      ? item["tokenAuthConfiguration"]
      : tokenAuthConfigurationDeserializer(item["tokenAuthConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : resourceProviderEndpointArrayDeserializer(item["endpoints"]),
    dstsConfiguration: !item["dstsConfiguration"]
      ? item["dstsConfiguration"]
      : fanoutLinkedNotificationRuleDstsConfigurationDeserializer(item["dstsConfiguration"]),
  };
}

/** model interface TokenAuthConfiguration */
export interface TokenAuthConfiguration {
  /** The authentication scheme. */
  authenticationScheme?: AuthenticationScheme;
  /** The signed request scope. */
  signedRequestScope?: SignedRequestScope;
  /** Whether certification authentication fallback is disabled. */
  disableCertificateAuthenticationFallback?: boolean;
}

export function tokenAuthConfigurationSerializer(item: TokenAuthConfiguration): any {
  return {
    authenticationScheme: item["authenticationScheme"],
    signedRequestScope: item["signedRequestScope"],
    disableCertificateAuthenticationFallback: item["disableCertificateAuthenticationFallback"],
  };
}

export function tokenAuthConfigurationDeserializer(item: any): TokenAuthConfiguration {
  return {
    authenticationScheme: item["authenticationScheme"],
    signedRequestScope: item["signedRequestScope"],
    disableCertificateAuthenticationFallback: item["disableCertificateAuthenticationFallback"],
  };
}

/** The authentication scheme. */
export enum KnownAuthenticationScheme {
  /** PoP */
  PoP = "PoP",
  /** Bearer */
  Bearer = "Bearer",
}

/**
 * The authentication scheme. \
 * {@link KnownAuthenticationScheme} can be used interchangeably with AuthenticationScheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PoP** \
 * **Bearer**
 */
export type AuthenticationScheme = string;

/** The signed request scope. */
export enum KnownSignedRequestScope {
  /** ResourceUri */
  ResourceUri = "ResourceUri",
  /** Endpoint */
  Endpoint = "Endpoint",
}

/**
 * The signed request scope. \
 * {@link KnownSignedRequestScope} can be used interchangeably with SignedRequestScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ResourceUri** \
 * **Endpoint**
 */
export type SignedRequestScope = string;

/** The dsts configuration. */
export interface FanoutLinkedNotificationRuleDstsConfiguration extends DstsConfiguration {}

export function fanoutLinkedNotificationRuleDstsConfigurationSerializer(
  item: FanoutLinkedNotificationRuleDstsConfiguration,
): any {
  return { serviceName: item["serviceName"], serviceDnsName: item["serviceDnsName"] };
}

export function fanoutLinkedNotificationRuleDstsConfigurationDeserializer(
  item: any,
): FanoutLinkedNotificationRuleDstsConfiguration {
  return {
    serviceName: item["serviceName"],
    serviceDnsName: item["serviceDnsName"],
  };
}

/** model interface ResourceProviderAuthentication */
export interface ResourceProviderAuthentication {
  /** The allowed audiences. */
  allowedAudiences: string[];
}

export function resourceProviderAuthenticationSerializer(
  item: ResourceProviderAuthentication,
): any {
  return {
    allowedAudiences: item["allowedAudiences"].map((p: any) => {
      return p;
    }),
  };
}

export function resourceProviderAuthenticationDeserializer(
  item: any,
): ResourceProviderAuthentication {
  return {
    allowedAudiences: item["allowedAudiences"].map((p: any) => {
      return p;
    }),
  };
}

/** model interface FeaturesRule */
export interface FeaturesRule {
  /** The required feature policy. */
  requiredFeaturesPolicy: FeaturesPolicy;
}

export function featuresRuleSerializer(item: FeaturesRule): any {
  return { requiredFeaturesPolicy: item["requiredFeaturesPolicy"] };
}

export function featuresRuleDeserializer(item: any): FeaturesRule {
  return {
    requiredFeaturesPolicy: item["requiredFeaturesPolicy"],
  };
}

/** The required feature policy. */
export enum KnownFeaturesPolicy {
  /** Any */
  Any = "Any",
  /** All */
  All = "All",
}

/**
 * The required feature policy. \
 * {@link KnownFeaturesPolicy} can be used interchangeably with FeaturesPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Any** \
 * **All**
 */
export type FeaturesPolicy = string;

/** model interface RequestHeaderOptions */
export interface RequestHeaderOptions {
  /** The opt in headers. */
  optInHeaders?: OptInHeaderType;
  /** The opt out headers. */
  optOutHeaders?: OptOutHeaderType;
}

export function requestHeaderOptionsSerializer(item: RequestHeaderOptions): any {
  return { optInHeaders: item["optInHeaders"], optOutHeaders: item["optOutHeaders"] };
}

export function requestHeaderOptionsDeserializer(item: any): RequestHeaderOptions {
  return {
    optInHeaders: item["optInHeaders"],
    optOutHeaders: item["optOutHeaders"],
  };
}

/** The opt in headers. */
export enum KnownOptInHeaderType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** SignedUserToken */
  SignedUserToken = "SignedUserToken",
  /** ClientGroupMembership */
  ClientGroupMembership = "ClientGroupMembership",
  /** SignedAuxiliaryTokens */
  SignedAuxiliaryTokens = "SignedAuxiliaryTokens",
  /** UnboundedClientGroupMembership */
  UnboundedClientGroupMembership = "UnboundedClientGroupMembership",
  /** PrivateLinkId */
  PrivateLinkId = "PrivateLinkId",
  /** PrivateLinkResourceId */
  PrivateLinkResourceId = "PrivateLinkResourceId",
  /** ManagementGroupAncestorsEncoded */
  ManagementGroupAncestorsEncoded = "ManagementGroupAncestorsEncoded",
  /** PrivateLinkVnetTrafficTag */
  PrivateLinkVnetTrafficTag = "PrivateLinkVnetTrafficTag",
  /** ResourceGroupLocation */
  ResourceGroupLocation = "ResourceGroupLocation",
  /** ClientPrincipalNameEncoded */
  ClientPrincipalNameEncoded = "ClientPrincipalNameEncoded",
  /** MSIResourceIdEncoded */
  MSIResourceIdEncoded = "MSIResourceIdEncoded",
}

/**
 * The opt in headers. \
 * {@link KnownOptInHeaderType} can be used interchangeably with OptInHeaderType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **SignedUserToken** \
 * **ClientGroupMembership** \
 * **SignedAuxiliaryTokens** \
 * **UnboundedClientGroupMembership** \
 * **PrivateLinkId** \
 * **PrivateLinkResourceId** \
 * **ManagementGroupAncestorsEncoded** \
 * **PrivateLinkVnetTrafficTag** \
 * **ResourceGroupLocation** \
 * **ClientPrincipalNameEncoded** \
 * **MSIResourceIdEncoded**
 */
export type OptInHeaderType = string;

/** The opt out headers. */
export enum KnownOptOutHeaderType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** SystemDataCreatedByLastModifiedBy */
  SystemDataCreatedByLastModifiedBy = "SystemDataCreatedByLastModifiedBy",
}

/**
 * The opt out headers. \
 * {@link KnownOptOutHeaderType} can be used interchangeably with OptOutHeaderType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **SystemDataCreatedByLastModifiedBy**
 */
export type OptOutHeaderType = string;

/** model interface LoggingHiddenPropertyPath */
export interface LoggingHiddenPropertyPath {
  /** The hidden paths on request. */
  hiddenPathsOnRequest?: string[];
  /** The hidden paths on response. */
  hiddenPathsOnResponse?: string[];
}

export function loggingHiddenPropertyPathSerializer(item: LoggingHiddenPropertyPath): any {
  return {
    hiddenPathsOnRequest: !item["hiddenPathsOnRequest"]
      ? item["hiddenPathsOnRequest"]
      : item["hiddenPathsOnRequest"].map((p: any) => {
          return p;
        }),
    hiddenPathsOnResponse: !item["hiddenPathsOnResponse"]
      ? item["hiddenPathsOnResponse"]
      : item["hiddenPathsOnResponse"].map((p: any) => {
          return p;
        }),
  };
}

export function loggingHiddenPropertyPathDeserializer(item: any): LoggingHiddenPropertyPath {
  return {
    hiddenPathsOnRequest: !item["hiddenPathsOnRequest"]
      ? item["hiddenPathsOnRequest"]
      : item["hiddenPathsOnRequest"].map((p: any) => {
          return p;
        }),
    hiddenPathsOnResponse: !item["hiddenPathsOnResponse"]
      ? item["hiddenPathsOnResponse"]
      : item["hiddenPathsOnResponse"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface IdentityManagement */
export interface IdentityManagement {
  /** The type. */
  type?: IdentityManagementTypes;
}

export function identityManagementDeserializer(item: any): IdentityManagement {
  return {
    type: item["type"],
  };
}

/** The type. */
export enum KnownIdentityManagementTypes {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** Actor */
  Actor = "Actor",
  /** DelegatedResourceIdentity */
  DelegatedResourceIdentity = "DelegatedResourceIdentity",
}

/**
 * The type. \
 * {@link KnownIdentityManagementTypes} can be used interchangeably with IdentityManagementTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **SystemAssigned** \
 * **UserAssigned** \
 * **Actor** \
 * **DelegatedResourceIdentity**
 */
export type IdentityManagementTypes = string;

/** model interface TemplateDeploymentPolicy */
export interface TemplateDeploymentPolicy {
  /** The capabilities. */
  capabilities: TemplateDeploymentCapabilities;
  /** The preflight options. */
  preflightOptions: TemplateDeploymentPreflightOptions;
  /** The preflight notifications. */
  preflightNotifications?: TemplateDeploymentPreflightNotifications;
}

export function templateDeploymentPolicySerializer(item: TemplateDeploymentPolicy): any {
  return {
    capabilities: item["capabilities"],
    preflightOptions: item["preflightOptions"],
    preflightNotifications: item["preflightNotifications"],
  };
}

export function templateDeploymentPolicyDeserializer(item: any): TemplateDeploymentPolicy {
  return {
    capabilities: item["capabilities"],
    preflightOptions: item["preflightOptions"],
    preflightNotifications: item["preflightNotifications"],
  };
}

/** The capabilities. */
export enum KnownTemplateDeploymentCapabilities {
  /** Default */
  Default = "Default",
  /** Preflight */
  Preflight = "Preflight",
}

/**
 * The capabilities. \
 * {@link KnownTemplateDeploymentCapabilities} can be used interchangeably with TemplateDeploymentCapabilities,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **Preflight**
 */
export type TemplateDeploymentCapabilities = string;

/** The preflight options. */
export enum KnownTemplateDeploymentPreflightOptions {
  /** None */
  None = "None",
  /** ValidationRequests */
  ValidationRequests = "ValidationRequests",
  /** DeploymentRequests */
  DeploymentRequests = "DeploymentRequests",
  /** TestOnly */
  TestOnly = "TestOnly",
  /** RegisteredOnly */
  RegisteredOnly = "RegisteredOnly",
}

/**
 * The preflight options. \
 * {@link KnownTemplateDeploymentPreflightOptions} can be used interchangeably with TemplateDeploymentPreflightOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **ValidationRequests** \
 * **DeploymentRequests** \
 * **TestOnly** \
 * **RegisteredOnly**
 */
export type TemplateDeploymentPreflightOptions = string;

/** The preflight notifications. */
export enum KnownTemplateDeploymentPreflightNotifications {
  /** None */
  None = "None",
  /** UnregisteredSubscriptions */
  UnregisteredSubscriptions = "UnregisteredSubscriptions",
}

/**
 * The preflight notifications. \
 * {@link KnownTemplateDeploymentPreflightNotifications} can be used interchangeably with TemplateDeploymentPreflightNotifications,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **UnregisteredSubscriptions**
 */
export type TemplateDeploymentPreflightNotifications = string;

/** model interface ResourceProviderManagement */
export interface ResourceProviderManagement {
  /** The schema owners. */
  schemaOwners?: string[];
  /** The manifest owners. */
  manifestOwners?: string[];
  /** The authorization owners. */
  authorizationOwners?: string[];
  /** The incident routing service. */
  incidentRoutingService?: string;
  /** The incident routing team. */
  incidentRoutingTeam?: string;
  /** The incident contact email. */
  incidentContactEmail?: string;
  /** The service tree infos. */
  serviceTreeInfos?: ServiceTreeInfo[];
  /** The resource access policy. */
  resourceAccessPolicy?: ResourceAccessPolicy;
  /** The resource access roles. */
  resourceAccessRoles?: ResourceAccessRole[];
  /** List of expedited rollout submitters. */
  expeditedRolloutSubmitters?: string[];
  /** Options for error response messages. */
  errorResponseMessageOptions?: ResourceProviderManagementErrorResponseMessageOptions;
  /** Metadata for expedited rollout. */
  expeditedRolloutMetadata?: ResourceProviderManagementExpeditedRolloutMetadata;
  /** List of manifest owners for canary. */
  canaryManifestOwners?: string[];
  /** The profit center code for the subscription. */
  pcCode?: string;
  /** The profit center program id for the subscription. */
  profitCenterProgramId?: string;
}

export function resourceProviderManagementSerializer(item: ResourceProviderManagement): any {
  return {
    schemaOwners: !item["schemaOwners"]
      ? item["schemaOwners"]
      : item["schemaOwners"].map((p: any) => {
          return p;
        }),
    manifestOwners: !item["manifestOwners"]
      ? item["manifestOwners"]
      : item["manifestOwners"].map((p: any) => {
          return p;
        }),
    authorizationOwners: !item["authorizationOwners"]
      ? item["authorizationOwners"]
      : item["authorizationOwners"].map((p: any) => {
          return p;
        }),
    incidentRoutingService: item["incidentRoutingService"],
    incidentRoutingTeam: item["incidentRoutingTeam"],
    incidentContactEmail: item["incidentContactEmail"],
    serviceTreeInfos: !item["serviceTreeInfos"]
      ? item["serviceTreeInfos"]
      : serviceTreeInfoArraySerializer(item["serviceTreeInfos"]),
    resourceAccessPolicy: item["resourceAccessPolicy"],
    resourceAccessRoles: !item["resourceAccessRoles"]
      ? item["resourceAccessRoles"]
      : resourceAccessRoleArraySerializer(item["resourceAccessRoles"]),
    expeditedRolloutSubmitters: !item["expeditedRolloutSubmitters"]
      ? item["expeditedRolloutSubmitters"]
      : item["expeditedRolloutSubmitters"].map((p: any) => {
          return p;
        }),
    errorResponseMessageOptions: !item["errorResponseMessageOptions"]
      ? item["errorResponseMessageOptions"]
      : resourceProviderManagementErrorResponseMessageOptionsSerializer(
          item["errorResponseMessageOptions"],
        ),
    expeditedRolloutMetadata: !item["expeditedRolloutMetadata"]
      ? item["expeditedRolloutMetadata"]
      : resourceProviderManagementExpeditedRolloutMetadataSerializer(
          item["expeditedRolloutMetadata"],
        ),
    canaryManifestOwners: !item["canaryManifestOwners"]
      ? item["canaryManifestOwners"]
      : item["canaryManifestOwners"].map((p: any) => {
          return p;
        }),
    pcCode: item["pcCode"],
    profitCenterProgramId: item["profitCenterProgramId"],
  };
}

export function resourceProviderManagementDeserializer(item: any): ResourceProviderManagement {
  return {
    schemaOwners: !item["schemaOwners"]
      ? item["schemaOwners"]
      : item["schemaOwners"].map((p: any) => {
          return p;
        }),
    manifestOwners: !item["manifestOwners"]
      ? item["manifestOwners"]
      : item["manifestOwners"].map((p: any) => {
          return p;
        }),
    authorizationOwners: !item["authorizationOwners"]
      ? item["authorizationOwners"]
      : item["authorizationOwners"].map((p: any) => {
          return p;
        }),
    incidentRoutingService: item["incidentRoutingService"],
    incidentRoutingTeam: item["incidentRoutingTeam"],
    incidentContactEmail: item["incidentContactEmail"],
    serviceTreeInfos: !item["serviceTreeInfos"]
      ? item["serviceTreeInfos"]
      : serviceTreeInfoArrayDeserializer(item["serviceTreeInfos"]),
    resourceAccessPolicy: item["resourceAccessPolicy"],
    resourceAccessRoles: !item["resourceAccessRoles"]
      ? item["resourceAccessRoles"]
      : resourceAccessRoleArrayDeserializer(item["resourceAccessRoles"]),
    expeditedRolloutSubmitters: !item["expeditedRolloutSubmitters"]
      ? item["expeditedRolloutSubmitters"]
      : item["expeditedRolloutSubmitters"].map((p: any) => {
          return p;
        }),
    errorResponseMessageOptions: !item["errorResponseMessageOptions"]
      ? item["errorResponseMessageOptions"]
      : resourceProviderManagementErrorResponseMessageOptionsDeserializer(
          item["errorResponseMessageOptions"],
        ),
    expeditedRolloutMetadata: !item["expeditedRolloutMetadata"]
      ? item["expeditedRolloutMetadata"]
      : resourceProviderManagementExpeditedRolloutMetadataDeserializer(
          item["expeditedRolloutMetadata"],
        ),
    canaryManifestOwners: !item["canaryManifestOwners"]
      ? item["canaryManifestOwners"]
      : item["canaryManifestOwners"].map((p: any) => {
          return p;
        }),
    pcCode: item["pcCode"],
    profitCenterProgramId: item["profitCenterProgramId"],
  };
}

/** The resource access policy. */
export type ResourceAccessPolicy = "NotSpecified" | "AcisReadAllowed" | "AcisActionAllowed";

export function resourceAccessRoleArraySerializer(result: Array<ResourceAccessRole>): any[] {
  return result.map((item) => {
    return resourceAccessRoleSerializer(item);
  });
}

export function resourceAccessRoleArrayDeserializer(result: Array<ResourceAccessRole>): any[] {
  return result.map((item) => {
    return resourceAccessRoleDeserializer(item);
  });
}

/** model interface ResourceAccessRole */
export interface ResourceAccessRole {
  /** The allowed group claims. */
  allowedGroupClaims?: string[];
  /** The actions. */
  actions?: string[];
}

export function resourceAccessRoleSerializer(item: ResourceAccessRole): any {
  return {
    allowedGroupClaims: !item["allowedGroupClaims"]
      ? item["allowedGroupClaims"]
      : item["allowedGroupClaims"].map((p: any) => {
          return p;
        }),
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

export function resourceAccessRoleDeserializer(item: any): ResourceAccessRole {
  return {
    allowedGroupClaims: !item["allowedGroupClaims"]
      ? item["allowedGroupClaims"]
      : item["allowedGroupClaims"].map((p: any) => {
          return p;
        }),
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

/** Options for error response messages. */
export interface ResourceProviderManagementErrorResponseMessageOptions {
  /** Type of server failure response message. */
  serverFailureResponseMessageType?: ServerFailureResponseMessageType;
}

export function resourceProviderManagementErrorResponseMessageOptionsSerializer(
  item: ResourceProviderManagementErrorResponseMessageOptions,
): any {
  return { serverFailureResponseMessageType: item["serverFailureResponseMessageType"] };
}

export function resourceProviderManagementErrorResponseMessageOptionsDeserializer(
  item: any,
): ResourceProviderManagementErrorResponseMessageOptions {
  return {
    serverFailureResponseMessageType: item["serverFailureResponseMessageType"],
  };
}

/** Type of server failure response message. */
export enum KnownServerFailureResponseMessageType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** OutageReporting */
  OutageReporting = "OutageReporting",
}

/**
 * Type of server failure response message. \
 * {@link KnownServerFailureResponseMessageType} can be used interchangeably with ServerFailureResponseMessageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **OutageReporting**
 */
export type ServerFailureResponseMessageType = string;

/** Metadata for expedited rollout. */
export interface ResourceProviderManagementExpeditedRolloutMetadata {
  /** Expedited rollout enabled? */
  enabled?: boolean;
  /** Expedited rollout intent. */
  expeditedRolloutIntent?: ExpeditedRolloutIntent;
}

export function resourceProviderManagementExpeditedRolloutMetadataSerializer(
  item: ResourceProviderManagementExpeditedRolloutMetadata,
): any {
  return { enabled: item["enabled"], expeditedRolloutIntent: item["expeditedRolloutIntent"] };
}

export function resourceProviderManagementExpeditedRolloutMetadataDeserializer(
  item: any,
): ResourceProviderManagementExpeditedRolloutMetadata {
  return {
    enabled: item["enabled"],
    expeditedRolloutIntent: item["expeditedRolloutIntent"],
  };
}

/** Expedited rollout intent. */
export enum KnownExpeditedRolloutIntent {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Hotfix */
  Hotfix = "Hotfix",
}

/**
 * Expedited rollout intent. \
 * {@link KnownExpeditedRolloutIntent} can be used interchangeably with ExpeditedRolloutIntent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Hotfix**
 */
export type ExpeditedRolloutIntent = string;

/** model interface ReRegisterSubscriptionMetadata */
export interface ReRegisterSubscriptionMetadata {
  /** Whether it's enabled or not. */
  enabled: boolean;
  /** The concurrency limit. */
  concurrencyLimit?: number;
}

export function reRegisterSubscriptionMetadataDeserializer(
  item: any,
): ReRegisterSubscriptionMetadata {
  return {
    enabled: item["enabled"],
    concurrencyLimit: item["concurrencyLimit"],
  };
}

/** model interface DstsConfiguration */
export interface DstsConfiguration {
  /** The service name. */
  serviceName: string;
  /** This is a URI property. */
  serviceDnsName?: string;
}

export function dstsConfigurationSerializer(item: DstsConfiguration): any {
  return { serviceName: item["serviceName"], serviceDnsName: item["serviceDnsName"] };
}

export function dstsConfigurationDeserializer(item: any): DstsConfiguration {
  return {
    serviceName: item["serviceName"],
    serviceDnsName: item["serviceDnsName"],
  };
}

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

/** model interface CheckinManifestParams */
export interface CheckinManifestParams {
  /** The environment supplied to the checkin manifest operation. */
  environment: string;
  /** The baseline ARM manifest location supplied to the checkin manifest operation. */
  baselineArmManifestLocation: string;
}

export function checkinManifestParamsSerializer(item: CheckinManifestParams): any {
  return {
    environment: item["environment"],
    baselineArmManifestLocation: item["baselineArmManifestLocation"],
  };
}

/** model interface CheckinManifestInfo */
export interface CheckinManifestInfo {
  /** Whether the manifest is checked in. */
  isCheckedIn: boolean;
  /** The status message. */
  statusMessage: string;
  /** The pull request. */
  pullRequest?: string;
  /** The commit id. */
  commitId?: string;
}

export function checkinManifestInfoSerializer(item: CheckinManifestInfo): any {
  return {
    isCheckedIn: item["isCheckedIn"],
    statusMessage: item["statusMessage"],
    pullRequest: item["pullRequest"],
    commitId: item["commitId"],
  };
}

export function checkinManifestInfoDeserializer(item: any): CheckinManifestInfo {
  return {
    isCheckedIn: item["isCheckedIn"],
    statusMessage: item["statusMessage"],
    pullRequest: item["pullRequest"],
    commitId: item["commitId"],
  };
}

/** model interface _OperationsDefinitionArrayResponseWithContinuation */
export interface _OperationsDefinitionArrayResponseWithContinuation {
  /** The value. */
  value?: OperationsDefinition[];
  /** The URL to get to the next set of results, if there are any. */
  nextLink?: string;
}

export function _operationsDefinitionArrayResponseWithContinuationDeserializer(
  item: any,
): _OperationsDefinitionArrayResponseWithContinuation {
  return {
    value: !item["value"] ? item["value"] : operationsDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationsDefinitionArrayDeserializer(result: Array<OperationsDefinition>): any[] {
  return result.map((item) => {
    return operationsDefinitionDeserializer(item);
  });
}

/** Properties of an Operation. */
export interface OperationsDefinition {
  /** Name of the operation. */
  name: string;
  /** Indicates whether the operation applies to data-plane. */
  isDataAction?: boolean;
  /** The origin. */
  origin?: OperationOrigins;
  /** Display information of the operation. */
  display: OperationsDefinitionDisplay;
  /** The action type. */
  actionType?: OperationActionType;
  /** Anything */
  properties?: any;
}

export function operationsDefinitionDeserializer(item: any): OperationsDefinition {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    origin: item["origin"],
    display: operationsDefinitionDisplayDeserializer(item["display"]),
    actionType: item["actionType"],
    properties: item["properties"],
  };
}

/** The origin. */
export type OperationOrigins = "NotSpecified" | "User" | "System";

/** Display information of the operation. */
export interface OperationsDefinitionDisplay extends OperationsDisplayDefinition {}

export function operationsDefinitionDisplayDeserializer(item: any): OperationsDefinitionDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The action type. */
export type OperationActionType = "NotSpecified" | "Internal";

/** model interface OperationsDisplayDefinition */
export interface OperationsDisplayDefinition {
  /** The provider. */
  provider: string;
  /** The resource. */
  resource: string;
  /** The operation. */
  operation: string;
  /** The description. */
  description: string;
}

export function operationsDisplayDefinitionSerializer(item: OperationsDisplayDefinition): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function operationsDisplayDefinitionDeserializer(item: any): OperationsDisplayDefinition {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface OperationsPutContent extends ProxyResource {
  properties?: OperationsPutContentProperties;
}

export function operationsPutContentSerializer(item: OperationsPutContent): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : operationsPutContentPropertiesSerializer(item["properties"]),
  };
}

export function operationsPutContentDeserializer(item: any): OperationsPutContent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : operationsPutContentPropertiesDeserializer(item["properties"]),
  };
}

/** model interface OperationsPutContentProperties */
export interface OperationsPutContentProperties extends OperationsContentProperties {}

export function operationsPutContentPropertiesSerializer(
  item: OperationsPutContentProperties,
): any {
  return {
    contents: !item["contents"]
      ? item["contents"]
      : localizedOperationDefinitionArraySerializer(item["contents"]),
  };
}

export function operationsPutContentPropertiesDeserializer(
  item: any,
): OperationsPutContentProperties {
  return {
    contents: !item["contents"]
      ? item["contents"]
      : localizedOperationDefinitionArrayDeserializer(item["contents"]),
  };
}

/** model interface OperationsContentProperties */
export interface OperationsContentProperties {
  /** Operations content. */
  contents?: LocalizedOperationDefinition[];
}

export function operationsContentPropertiesSerializer(item: OperationsContentProperties): any {
  return {
    contents: !item["contents"]
      ? item["contents"]
      : localizedOperationDefinitionArraySerializer(item["contents"]),
  };
}

export function operationsContentPropertiesDeserializer(item: any): OperationsContentProperties {
  return {
    contents: !item["contents"]
      ? item["contents"]
      : localizedOperationDefinitionArrayDeserializer(item["contents"]),
  };
}

export function localizedOperationDefinitionArraySerializer(
  result: Array<LocalizedOperationDefinition>,
): any[] {
  return result.map((item) => {
    return localizedOperationDefinitionSerializer(item);
  });
}

export function localizedOperationDefinitionArrayDeserializer(
  result: Array<LocalizedOperationDefinition>,
): any[] {
  return result.map((item) => {
    return localizedOperationDefinitionDeserializer(item);
  });
}

/** model interface LocalizedOperationDefinition */
export interface LocalizedOperationDefinition {
  /** Name of the operation. */
  name: string;
  /** Indicates whether the operation applies to data-plane. */
  isDataAction?: boolean;
  /** The origin. */
  origin?: OperationOrigins;
  /** Display information of the operation. */
  display: LocalizedOperationDefinitionDisplay;
  /** The action type. */
  actionType?: OperationActionType;
}

export function localizedOperationDefinitionSerializer(item: LocalizedOperationDefinition): any {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    origin: item["origin"],
    display: localizedOperationDefinitionDisplaySerializer(item["display"]),
    actionType: item["actionType"],
  };
}

export function localizedOperationDefinitionDeserializer(item: any): LocalizedOperationDefinition {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    origin: item["origin"],
    display: localizedOperationDefinitionDisplayDeserializer(item["display"]),
    actionType: item["actionType"],
  };
}

/** Display information of the operation. */
export interface LocalizedOperationDefinitionDisplay extends LocalizedOperationDisplayDefinition {}

export function localizedOperationDefinitionDisplaySerializer(
  item: LocalizedOperationDefinitionDisplay,
): any {
  return {
    default: localizedOperationDisplayDefinitionDefaultSerializer(item["default"]),
    en: !item["en"] ? item["en"] : localizedOperationDisplayDefinitionEnSerializer(item["en"]),
    cs: !item["cs"] ? item["cs"] : localizedOperationDisplayDefinitionCsSerializer(item["cs"]),
    de: !item["de"] ? item["de"] : localizedOperationDisplayDefinitionDeSerializer(item["de"]),
    es: !item["es"] ? item["es"] : localizedOperationDisplayDefinitionEsSerializer(item["es"]),
    fr: !item["fr"] ? item["fr"] : localizedOperationDisplayDefinitionFrSerializer(item["fr"]),
    hu: !item["hu"] ? item["hu"] : localizedOperationDisplayDefinitionHuSerializer(item["hu"]),
    it: !item["it"] ? item["it"] : localizedOperationDisplayDefinitionItSerializer(item["it"]),
    ja: !item["ja"] ? item["ja"] : localizedOperationDisplayDefinitionJaSerializer(item["ja"]),
    ko: !item["ko"] ? item["ko"] : localizedOperationDisplayDefinitionKoSerializer(item["ko"]),
    nl: !item["nl"] ? item["nl"] : localizedOperationDisplayDefinitionNlSerializer(item["nl"]),
    pl: !item["pl"] ? item["pl"] : localizedOperationDisplayDefinitionPlSerializer(item["pl"]),
    ptBR: !item["ptBR"]
      ? item["ptBR"]
      : localizedOperationDisplayDefinitionPtBRSerializer(item["ptBR"]),
    ptPT: !item["ptPT"]
      ? item["ptPT"]
      : localizedOperationDisplayDefinitionPtPTSerializer(item["ptPT"]),
    ru: !item["ru"] ? item["ru"] : localizedOperationDisplayDefinitionRuSerializer(item["ru"]),
    sv: !item["sv"] ? item["sv"] : localizedOperationDisplayDefinitionSvSerializer(item["sv"]),
    zhHans: !item["zhHans"]
      ? item["zhHans"]
      : localizedOperationDisplayDefinitionZhHansSerializer(item["zhHans"]),
    zhHant: !item["zhHant"]
      ? item["zhHant"]
      : localizedOperationDisplayDefinitionZhHantSerializer(item["zhHant"]),
  };
}

export function localizedOperationDefinitionDisplayDeserializer(
  item: any,
): LocalizedOperationDefinitionDisplay {
  return {
    default: localizedOperationDisplayDefinitionDefaultDeserializer(item["default"]),
    en: !item["en"] ? item["en"] : localizedOperationDisplayDefinitionEnDeserializer(item["en"]),
    cs: !item["cs"] ? item["cs"] : localizedOperationDisplayDefinitionCsDeserializer(item["cs"]),
    de: !item["de"] ? item["de"] : localizedOperationDisplayDefinitionDeDeserializer(item["de"]),
    es: !item["es"] ? item["es"] : localizedOperationDisplayDefinitionEsDeserializer(item["es"]),
    fr: !item["fr"] ? item["fr"] : localizedOperationDisplayDefinitionFrDeserializer(item["fr"]),
    hu: !item["hu"] ? item["hu"] : localizedOperationDisplayDefinitionHuDeserializer(item["hu"]),
    it: !item["it"] ? item["it"] : localizedOperationDisplayDefinitionItDeserializer(item["it"]),
    ja: !item["ja"] ? item["ja"] : localizedOperationDisplayDefinitionJaDeserializer(item["ja"]),
    ko: !item["ko"] ? item["ko"] : localizedOperationDisplayDefinitionKoDeserializer(item["ko"]),
    nl: !item["nl"] ? item["nl"] : localizedOperationDisplayDefinitionNlDeserializer(item["nl"]),
    pl: !item["pl"] ? item["pl"] : localizedOperationDisplayDefinitionPlDeserializer(item["pl"]),
    ptBR: !item["ptBR"]
      ? item["ptBR"]
      : localizedOperationDisplayDefinitionPtBRDeserializer(item["ptBR"]),
    ptPT: !item["ptPT"]
      ? item["ptPT"]
      : localizedOperationDisplayDefinitionPtPTDeserializer(item["ptPT"]),
    ru: !item["ru"] ? item["ru"] : localizedOperationDisplayDefinitionRuDeserializer(item["ru"]),
    sv: !item["sv"] ? item["sv"] : localizedOperationDisplayDefinitionSvDeserializer(item["sv"]),
    zhHans: !item["zhHans"]
      ? item["zhHans"]
      : localizedOperationDisplayDefinitionZhHansDeserializer(item["zhHans"]),
    zhHant: !item["zhHant"]
      ? item["zhHant"]
      : localizedOperationDisplayDefinitionZhHantDeserializer(item["zhHant"]),
  };
}

/** model interface LocalizedOperationDisplayDefinition */
export interface LocalizedOperationDisplayDefinition {
  /** Display information of the operation. */
  default: LocalizedOperationDisplayDefinitionDefault;
  /** Display information of the operation for en locale. */
  en?: LocalizedOperationDisplayDefinitionEn;
  /** Display information of the operation for cs locale. */
  cs?: LocalizedOperationDisplayDefinitionCs;
  /** Display information of the operation for de locale. */
  de?: LocalizedOperationDisplayDefinitionDe;
  /** Display information of the operation for es locale. */
  es?: LocalizedOperationDisplayDefinitionEs;
  /** Display information of the operation for fr locale. */
  fr?: LocalizedOperationDisplayDefinitionFr;
  /** Display information of the operation for hu locale. */
  hu?: LocalizedOperationDisplayDefinitionHu;
  /** Display information of the operation for it locale. */
  it?: LocalizedOperationDisplayDefinitionIt;
  /** Display information of the operation for ja locale. */
  ja?: LocalizedOperationDisplayDefinitionJa;
  /** Display information of the operation for ko locale. */
  ko?: LocalizedOperationDisplayDefinitionKo;
  /** Display information of the operation for nl locale. */
  nl?: LocalizedOperationDisplayDefinitionNl;
  /** Display information of the operation for pl locale. */
  pl?: LocalizedOperationDisplayDefinitionPl;
  /** Display information of the operation for pt-BR locale. */
  ptBR?: LocalizedOperationDisplayDefinitionPtBR;
  /** Display information of the operation for pt-PT locale. */
  ptPT?: LocalizedOperationDisplayDefinitionPtPT;
  /** Display information of the operation for ru locale. */
  ru?: LocalizedOperationDisplayDefinitionRu;
  /** Display information of the operation for sv locale. */
  sv?: LocalizedOperationDisplayDefinitionSv;
  /** Display information of the operation for zh-Hans locale. */
  zhHans?: LocalizedOperationDisplayDefinitionZhHans;
  /** Display information of the operation for zh-Hant locale. */
  zhHant?: LocalizedOperationDisplayDefinitionZhHant;
}

export function localizedOperationDisplayDefinitionSerializer(
  item: LocalizedOperationDisplayDefinition,
): any {
  return {
    default: localizedOperationDisplayDefinitionDefaultSerializer(item["default"]),
    en: !item["en"] ? item["en"] : localizedOperationDisplayDefinitionEnSerializer(item["en"]),
    cs: !item["cs"] ? item["cs"] : localizedOperationDisplayDefinitionCsSerializer(item["cs"]),
    de: !item["de"] ? item["de"] : localizedOperationDisplayDefinitionDeSerializer(item["de"]),
    es: !item["es"] ? item["es"] : localizedOperationDisplayDefinitionEsSerializer(item["es"]),
    fr: !item["fr"] ? item["fr"] : localizedOperationDisplayDefinitionFrSerializer(item["fr"]),
    hu: !item["hu"] ? item["hu"] : localizedOperationDisplayDefinitionHuSerializer(item["hu"]),
    it: !item["it"] ? item["it"] : localizedOperationDisplayDefinitionItSerializer(item["it"]),
    ja: !item["ja"] ? item["ja"] : localizedOperationDisplayDefinitionJaSerializer(item["ja"]),
    ko: !item["ko"] ? item["ko"] : localizedOperationDisplayDefinitionKoSerializer(item["ko"]),
    nl: !item["nl"] ? item["nl"] : localizedOperationDisplayDefinitionNlSerializer(item["nl"]),
    pl: !item["pl"] ? item["pl"] : localizedOperationDisplayDefinitionPlSerializer(item["pl"]),
    ptBR: !item["ptBR"]
      ? item["ptBR"]
      : localizedOperationDisplayDefinitionPtBRSerializer(item["ptBR"]),
    ptPT: !item["ptPT"]
      ? item["ptPT"]
      : localizedOperationDisplayDefinitionPtPTSerializer(item["ptPT"]),
    ru: !item["ru"] ? item["ru"] : localizedOperationDisplayDefinitionRuSerializer(item["ru"]),
    sv: !item["sv"] ? item["sv"] : localizedOperationDisplayDefinitionSvSerializer(item["sv"]),
    zhHans: !item["zhHans"]
      ? item["zhHans"]
      : localizedOperationDisplayDefinitionZhHansSerializer(item["zhHans"]),
    zhHant: !item["zhHant"]
      ? item["zhHant"]
      : localizedOperationDisplayDefinitionZhHantSerializer(item["zhHant"]),
  };
}

export function localizedOperationDisplayDefinitionDeserializer(
  item: any,
): LocalizedOperationDisplayDefinition {
  return {
    default: localizedOperationDisplayDefinitionDefaultDeserializer(item["default"]),
    en: !item["en"] ? item["en"] : localizedOperationDisplayDefinitionEnDeserializer(item["en"]),
    cs: !item["cs"] ? item["cs"] : localizedOperationDisplayDefinitionCsDeserializer(item["cs"]),
    de: !item["de"] ? item["de"] : localizedOperationDisplayDefinitionDeDeserializer(item["de"]),
    es: !item["es"] ? item["es"] : localizedOperationDisplayDefinitionEsDeserializer(item["es"]),
    fr: !item["fr"] ? item["fr"] : localizedOperationDisplayDefinitionFrDeserializer(item["fr"]),
    hu: !item["hu"] ? item["hu"] : localizedOperationDisplayDefinitionHuDeserializer(item["hu"]),
    it: !item["it"] ? item["it"] : localizedOperationDisplayDefinitionItDeserializer(item["it"]),
    ja: !item["ja"] ? item["ja"] : localizedOperationDisplayDefinitionJaDeserializer(item["ja"]),
    ko: !item["ko"] ? item["ko"] : localizedOperationDisplayDefinitionKoDeserializer(item["ko"]),
    nl: !item["nl"] ? item["nl"] : localizedOperationDisplayDefinitionNlDeserializer(item["nl"]),
    pl: !item["pl"] ? item["pl"] : localizedOperationDisplayDefinitionPlDeserializer(item["pl"]),
    ptBR: !item["ptBR"]
      ? item["ptBR"]
      : localizedOperationDisplayDefinitionPtBRDeserializer(item["ptBR"]),
    ptPT: !item["ptPT"]
      ? item["ptPT"]
      : localizedOperationDisplayDefinitionPtPTDeserializer(item["ptPT"]),
    ru: !item["ru"] ? item["ru"] : localizedOperationDisplayDefinitionRuDeserializer(item["ru"]),
    sv: !item["sv"] ? item["sv"] : localizedOperationDisplayDefinitionSvDeserializer(item["sv"]),
    zhHans: !item["zhHans"]
      ? item["zhHans"]
      : localizedOperationDisplayDefinitionZhHansDeserializer(item["zhHans"]),
    zhHant: !item["zhHant"]
      ? item["zhHant"]
      : localizedOperationDisplayDefinitionZhHantDeserializer(item["zhHant"]),
  };
}

/** Display information of the operation. */
export interface LocalizedOperationDisplayDefinitionDefault extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionDefaultSerializer(
  item: LocalizedOperationDisplayDefinitionDefault,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionDefaultDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionDefault {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for en locale. */
export interface LocalizedOperationDisplayDefinitionEn extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionEnSerializer(
  item: LocalizedOperationDisplayDefinitionEn,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionEnDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionEn {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for cs locale. */
export interface LocalizedOperationDisplayDefinitionCs extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionCsSerializer(
  item: LocalizedOperationDisplayDefinitionCs,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionCsDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionCs {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for de locale. */
export interface LocalizedOperationDisplayDefinitionDe extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionDeSerializer(
  item: LocalizedOperationDisplayDefinitionDe,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionDeDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionDe {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for es locale. */
export interface LocalizedOperationDisplayDefinitionEs extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionEsSerializer(
  item: LocalizedOperationDisplayDefinitionEs,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionEsDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionEs {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for fr locale. */
export interface LocalizedOperationDisplayDefinitionFr extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionFrSerializer(
  item: LocalizedOperationDisplayDefinitionFr,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionFrDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionFr {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for hu locale. */
export interface LocalizedOperationDisplayDefinitionHu extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionHuSerializer(
  item: LocalizedOperationDisplayDefinitionHu,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionHuDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionHu {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for it locale. */
export interface LocalizedOperationDisplayDefinitionIt extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionItSerializer(
  item: LocalizedOperationDisplayDefinitionIt,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionItDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionIt {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for ja locale. */
export interface LocalizedOperationDisplayDefinitionJa extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionJaSerializer(
  item: LocalizedOperationDisplayDefinitionJa,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionJaDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionJa {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for ko locale. */
export interface LocalizedOperationDisplayDefinitionKo extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionKoSerializer(
  item: LocalizedOperationDisplayDefinitionKo,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionKoDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionKo {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for nl locale. */
export interface LocalizedOperationDisplayDefinitionNl extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionNlSerializer(
  item: LocalizedOperationDisplayDefinitionNl,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionNlDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionNl {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for pl locale. */
export interface LocalizedOperationDisplayDefinitionPl extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionPlSerializer(
  item: LocalizedOperationDisplayDefinitionPl,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionPlDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionPl {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for pt-BR locale. */
export interface LocalizedOperationDisplayDefinitionPtBR extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionPtBRSerializer(
  item: LocalizedOperationDisplayDefinitionPtBR,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionPtBRDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionPtBR {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for pt-PT locale. */
export interface LocalizedOperationDisplayDefinitionPtPT extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionPtPTSerializer(
  item: LocalizedOperationDisplayDefinitionPtPT,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionPtPTDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionPtPT {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for ru locale. */
export interface LocalizedOperationDisplayDefinitionRu extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionRuSerializer(
  item: LocalizedOperationDisplayDefinitionRu,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionRuDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionRu {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for sv locale. */
export interface LocalizedOperationDisplayDefinitionSv extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionSvSerializer(
  item: LocalizedOperationDisplayDefinitionSv,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionSvDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionSv {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for zh-Hans locale. */
export interface LocalizedOperationDisplayDefinitionZhHans extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionZhHansSerializer(
  item: LocalizedOperationDisplayDefinitionZhHans,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionZhHansDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionZhHans {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Display information of the operation for zh-Hant locale. */
export interface LocalizedOperationDisplayDefinitionZhHant extends OperationsDisplayDefinition {}

export function localizedOperationDisplayDefinitionZhHantSerializer(
  item: LocalizedOperationDisplayDefinitionZhHant,
): any {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

export function localizedOperationDisplayDefinitionZhHantDeserializer(
  item: any,
): LocalizedOperationDisplayDefinitionZhHant {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
}

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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface CustomRollout extends ProxyResource {
  /** Properties of the rollout. */
  properties: CustomRolloutProperties;
}

export function customRolloutSerializer(item: CustomRollout): any {
  return { properties: customRolloutPropertiesSerializer(item["properties"]) };
}

export function customRolloutDeserializer(item: any): CustomRollout {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: customRolloutPropertiesDeserializer(item["properties"]),
  };
}

/** model interface CustomRolloutProperties */
export interface CustomRolloutProperties {
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The specification. */
  specification: CustomRolloutPropertiesSpecification;
  /** The status. */
  status?: CustomRolloutPropertiesStatus;
}

export function customRolloutPropertiesSerializer(item: CustomRolloutProperties): any {
  return {
    specification: customRolloutPropertiesSpecificationSerializer(item["specification"]),
    status: !item["status"]
      ? item["status"]
      : customRolloutPropertiesStatusSerializer(item["status"]),
  };
}

export function customRolloutPropertiesDeserializer(item: any): CustomRolloutProperties {
  return {
    provisioningState: item["provisioningState"],
    specification: customRolloutPropertiesSpecificationDeserializer(item["specification"]),
    status: !item["status"]
      ? item["status"]
      : customRolloutPropertiesStatusDeserializer(item["status"]),
  };
}

/** Known values of {@link ProvisioningState} that the service accepts. */
export enum KnownProvisioningState {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Accepted */
  Accepted = "Accepted",
  /** Running */
  Running = "Running",
  /** Creating */
  Creating = "Creating",
  /** Created */
  Created = "Created",
  /** Deleting */
  Deleting = "Deleting",
  /** Deleted */
  Deleted = "Deleted",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** MovingResources */
  MovingResources = "MovingResources",
  /** TransientFailure */
  TransientFailure = "TransientFailure",
  /** RolloutInProgress */
  RolloutInProgress = "RolloutInProgress",
}

/** Type of ProvisioningState */
export type ProvisioningState = string;

/** The specification. */
export interface CustomRolloutPropertiesSpecification extends CustomRolloutSpecification {}

export function customRolloutPropertiesSpecificationSerializer(
  item: CustomRolloutPropertiesSpecification,
): any {
  return {
    autoProvisionConfig: !item["autoProvisionConfig"]
      ? item["autoProvisionConfig"]
      : customRolloutSpecificationAutoProvisionConfigSerializer(item["autoProvisionConfig"]),
    canary: !item["canary"]
      ? item["canary"]
      : customRolloutSpecificationCanarySerializer(item["canary"]),
    releaseScopes: !item["releaseScopes"]
      ? item["releaseScopes"]
      : item["releaseScopes"].map((p: any) => {
          return p;
        }),
    refreshSubscriptionRegistration: item["refreshSubscriptionRegistration"],
    skipReleaseScopeValidation: item["skipReleaseScopeValidation"],
    providerRegistration: !item["providerRegistration"]
      ? item["providerRegistration"]
      : customRolloutSpecificationProviderRegistrationSerializer(item["providerRegistration"]),
    resourceTypeRegistrations: !item["resourceTypeRegistrations"]
      ? item["resourceTypeRegistrations"]
      : resourceTypeRegistrationArraySerializer(item["resourceTypeRegistrations"]),
  };
}

export function customRolloutPropertiesSpecificationDeserializer(
  item: any,
): CustomRolloutPropertiesSpecification {
  return {
    autoProvisionConfig: !item["autoProvisionConfig"]
      ? item["autoProvisionConfig"]
      : customRolloutSpecificationAutoProvisionConfigDeserializer(item["autoProvisionConfig"]),
    canary: !item["canary"]
      ? item["canary"]
      : customRolloutSpecificationCanaryDeserializer(item["canary"]),
    releaseScopes: !item["releaseScopes"]
      ? item["releaseScopes"]
      : item["releaseScopes"].map((p: any) => {
          return p;
        }),
    refreshSubscriptionRegistration: item["refreshSubscriptionRegistration"],
    skipReleaseScopeValidation: item["skipReleaseScopeValidation"],
    providerRegistration: !item["providerRegistration"]
      ? item["providerRegistration"]
      : customRolloutSpecificationProviderRegistrationDeserializer(item["providerRegistration"]),
    resourceTypeRegistrations: !item["resourceTypeRegistrations"]
      ? item["resourceTypeRegistrations"]
      : resourceTypeRegistrationArrayDeserializer(item["resourceTypeRegistrations"]),
  };
}

/** The status. */
export interface CustomRolloutPropertiesStatus extends CustomRolloutStatus {}

export function customRolloutPropertiesStatusSerializer(item: CustomRolloutPropertiesStatus): any {
  return {
    completedRegions: !item["completedRegions"]
      ? item["completedRegions"]
      : item["completedRegions"].map((p: any) => {
          return p;
        }),
    failedOrSkippedRegions: !item["failedOrSkippedRegions"]
      ? item["failedOrSkippedRegions"]
      : extendedErrorInfoRecordSerializer(item["failedOrSkippedRegions"]),
    manifestCheckinStatus: !item["manifestCheckinStatus"]
      ? item["manifestCheckinStatus"]
      : customRolloutStatusManifestCheckinStatusSerializer(item["manifestCheckinStatus"]),
  };
}

export function customRolloutPropertiesStatusDeserializer(
  item: any,
): CustomRolloutPropertiesStatus {
  return {
    completedRegions: !item["completedRegions"]
      ? item["completedRegions"]
      : item["completedRegions"].map((p: any) => {
          return p;
        }),
    failedOrSkippedRegions: !item["failedOrSkippedRegions"]
      ? item["failedOrSkippedRegions"]
      : extendedErrorInfoRecordDeserializer(item["failedOrSkippedRegions"]),
    manifestCheckinStatus: !item["manifestCheckinStatus"]
      ? item["manifestCheckinStatus"]
      : customRolloutStatusManifestCheckinStatusDeserializer(item["manifestCheckinStatus"]),
  };
}

/** model interface CustomRolloutSpecification */
export interface CustomRolloutSpecification {
  /** The auto provisioning configuration. */
  autoProvisionConfig?: CustomRolloutSpecificationAutoProvisionConfig;
  /** The canary region configuration. */
  canary?: CustomRolloutSpecificationCanary;
  /** The list of ARM regions scoped for the release. */
  releaseScopes?: string[];
  /** Whether refreshing subscription registration is enabled or disabled. */
  refreshSubscriptionRegistration?: boolean;
  /** Whether release scope validation should be skipped. */
  skipReleaseScopeValidation?: boolean;
  /** The provider registration. */
  providerRegistration?: CustomRolloutSpecificationProviderRegistration;
  /** The resource type registrations. */
  resourceTypeRegistrations?: ResourceTypeRegistration[];
}

export function customRolloutSpecificationSerializer(item: CustomRolloutSpecification): any {
  return {
    autoProvisionConfig: !item["autoProvisionConfig"]
      ? item["autoProvisionConfig"]
      : customRolloutSpecificationAutoProvisionConfigSerializer(item["autoProvisionConfig"]),
    canary: !item["canary"]
      ? item["canary"]
      : customRolloutSpecificationCanarySerializer(item["canary"]),
    releaseScopes: !item["releaseScopes"]
      ? item["releaseScopes"]
      : item["releaseScopes"].map((p: any) => {
          return p;
        }),
    refreshSubscriptionRegistration: item["refreshSubscriptionRegistration"],
    skipReleaseScopeValidation: item["skipReleaseScopeValidation"],
    providerRegistration: !item["providerRegistration"]
      ? item["providerRegistration"]
      : customRolloutSpecificationProviderRegistrationSerializer(item["providerRegistration"]),
    resourceTypeRegistrations: !item["resourceTypeRegistrations"]
      ? item["resourceTypeRegistrations"]
      : resourceTypeRegistrationArraySerializer(item["resourceTypeRegistrations"]),
  };
}

export function customRolloutSpecificationDeserializer(item: any): CustomRolloutSpecification {
  return {
    autoProvisionConfig: !item["autoProvisionConfig"]
      ? item["autoProvisionConfig"]
      : customRolloutSpecificationAutoProvisionConfigDeserializer(item["autoProvisionConfig"]),
    canary: !item["canary"]
      ? item["canary"]
      : customRolloutSpecificationCanaryDeserializer(item["canary"]),
    releaseScopes: !item["releaseScopes"]
      ? item["releaseScopes"]
      : item["releaseScopes"].map((p: any) => {
          return p;
        }),
    refreshSubscriptionRegistration: item["refreshSubscriptionRegistration"],
    skipReleaseScopeValidation: item["skipReleaseScopeValidation"],
    providerRegistration: !item["providerRegistration"]
      ? item["providerRegistration"]
      : customRolloutSpecificationProviderRegistrationDeserializer(item["providerRegistration"]),
    resourceTypeRegistrations: !item["resourceTypeRegistrations"]
      ? item["resourceTypeRegistrations"]
      : resourceTypeRegistrationArrayDeserializer(item["resourceTypeRegistrations"]),
  };
}

/** The auto provisioning configuration. */
export interface CustomRolloutSpecificationAutoProvisionConfig {
  storage?: boolean;
  resourceGraph?: boolean;
}

export function customRolloutSpecificationAutoProvisionConfigSerializer(
  item: CustomRolloutSpecificationAutoProvisionConfig,
): any {
  return { storage: item["storage"], resourceGraph: item["resourceGraph"] };
}

export function customRolloutSpecificationAutoProvisionConfigDeserializer(
  item: any,
): CustomRolloutSpecificationAutoProvisionConfig {
  return {
    storage: item["storage"],
    resourceGraph: item["resourceGraph"],
  };
}

/** The canary region configuration. */
export interface CustomRolloutSpecificationCanary extends TrafficRegions {}

export function customRolloutSpecificationCanarySerializer(
  item: CustomRolloutSpecificationCanary,
): any {
  return {
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

export function customRolloutSpecificationCanaryDeserializer(
  item: any,
): CustomRolloutSpecificationCanary {
  return {
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

/** The provider registration. */
export interface CustomRolloutSpecificationProviderRegistration extends ProviderRegistration {}

export function customRolloutSpecificationProviderRegistrationSerializer(
  item: CustomRolloutSpecificationProviderRegistration,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : providerRegistrationPropertiesSerializer(item["properties"]),
    kind: item["kind"],
  };
}

export function customRolloutSpecificationProviderRegistrationDeserializer(
  item: any,
): CustomRolloutSpecificationProviderRegistration {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : providerRegistrationPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

export function resourceTypeRegistrationArraySerializer(
  result: Array<ResourceTypeRegistration>,
): any[] {
  return result.map((item) => {
    return resourceTypeRegistrationSerializer(item);
  });
}

export function resourceTypeRegistrationArrayDeserializer(
  result: Array<ResourceTypeRegistration>,
): any[] {
  return result.map((item) => {
    return resourceTypeRegistrationDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface ResourceTypeRegistration extends ProxyResource {
  properties?: ResourceTypeRegistrationProperties;
  /** Resource type registration kind. This Metadata is also used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: ResourceTypeRegistrationKind;
}

export function resourceTypeRegistrationSerializer(item: ResourceTypeRegistration): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : resourceTypeRegistrationPropertiesSerializer(item["properties"]),
    kind: item["kind"],
  };
}

export function resourceTypeRegistrationDeserializer(item: any): ResourceTypeRegistration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : resourceTypeRegistrationPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
  };
}

/** model interface ResourceTypeRegistrationProperties */
export interface ResourceTypeRegistrationProperties {
  /** The resource routing type. */
  routingType?: RoutingType;
  /** The additional options. */
  additionalOptions?: AdditionalOptionsResourceTypeRegistration;
  /** The cross tenant token validation. */
  crossTenantTokenValidation?: CrossTenantTokenValidation;
  /** The regionality. */
  regionality?: Regionality;
  /** The extensions. */
  endpoints?: ResourceTypeEndpoint[];
  /** The extension options. */
  extensionOptions?: ResourceTypeRegistrationPropertiesExtensionOptions;
  /** The marketplace type. */
  marketplaceType?: MarketplaceType;
  /** The swagger specifications. */
  swaggerSpecifications?: SwaggerSpecification[];
  /** The allowed unauthorized actions. */
  allowedUnauthorizedActions?: string[];
  /** The allowed unauthorized actions extensions. */
  allowedUnauthorizedActionsExtensions?: AllowedUnauthorizedActionsExtension[];
  /** The authorization action mappings */
  authorizationActionMappings?: AuthorizationActionMapping[];
  /** The linked access checks. */
  linkedAccessChecks?: LinkedAccessCheck[];
  /** The default api version. */
  defaultApiVersion?: string;
  /** The logging rules. */
  loggingRules?: LoggingRule[];
  /** The throttling rules. */
  throttlingRules?: ThrottlingRule[];
  /** The required features. */
  requiredFeatures?: string[];
  /** The features rule. */
  featuresRule?: ResourceTypeRegistrationPropertiesFeaturesRule;
  /** Whether async operation is enabled. */
  enableAsyncOperation?: boolean;
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Whether third party S2S is enabled. */
  enableThirdPartyS2S?: boolean;
  /** The subscription lifecycle notification specifications. */
  subscriptionLifecycleNotificationSpecifications?: ResourceTypeRegistrationPropertiesSubscriptionLifecycleNotificationSpecifications;
  /** Whether it is pure proxy. */
  isPureProxy?: boolean;
  /** The identity management. */
  identityManagement?: ResourceTypeRegistrationPropertiesIdentityManagement;
  /** The check name availability specifications. */
  checkNameAvailabilitySpecifications?: ResourceTypeRegistrationPropertiesCheckNameAvailabilitySpecifications;
  /** The disallowed action verbs. */
  disallowedActionVerbs?: string[];
  /** The service tree infos. */
  serviceTreeInfos?: ServiceTreeInfo[];
  /** The request header options. */
  requestHeaderOptions?: ResourceTypeRegistrationPropertiesRequestHeaderOptions;
  /** The subscription state rules. */
  subscriptionStateRules?: SubscriptionStateRule[];
  /** The template deployment options. */
  templateDeploymentOptions?: ResourceTypeRegistrationPropertiesTemplateDeploymentOptions;
  /** The extended locations. */
  extendedLocations?: ExtendedLocationOptions[];
  /** The resource move policy. */
  resourceMovePolicy?: ResourceTypeRegistrationPropertiesResourceMovePolicy;
  /** The resource deletion policy. */
  resourceDeletionPolicy?: ResourceDeletionPolicy;
  /** The resource concurrency control options. */
  resourceConcurrencyControlOptions?: Record<string, ResourceConcurrencyControlOption>;
  /** The resource graph configuration. */
  resourceGraphConfiguration?: ResourceTypeRegistrationPropertiesResourceGraphConfiguration;
  /** The resource provider management. */
  management?: ResourceTypeRegistrationPropertiesManagement;
  /** The open api configuration. */
  openApiConfiguration?: OpenApiConfiguration;
  /** The on behalf of tokens. */
  onBehalfOfTokens?: ResourceTypeOnBehalfOfToken;
  /** The category. */
  category?: ResourceTypeCategory;
  /** The resource validation. */
  resourceValidation?: ResourceValidation;
  /** The disallowed end user operations. */
  disallowedEndUserOperations?: string[];
  /** The metadata. */
  metadata?: Record<string, any>;
  /** The sku link. */
  skuLink?: string;
  /** The quota rule. */
  quotaRule?: QuotaRule;
  /** The notifications. */
  notifications?: Notification[];
  /** The linked notification rules. */
  linkedNotificationRules?: LinkedNotificationRule[];
  /** The resource provider authorization rules. */
  resourceProviderAuthorizationRules?: ResourceProviderAuthorizationRules;
  /** The token auth configuration. */
  tokenAuthConfiguration?: TokenAuthConfiguration;
  /** The template deployment policy. */
  templateDeploymentPolicy?: ResourceTypeRegistrationPropertiesTemplateDeploymentPolicy;
  /** The allow empty role assignments. */
  allowEmptyRoleAssignments?: boolean;
  /** The policy execution type. */
  policyExecutionType?: PolicyExecutionType;
  /** The availability zone rule. */
  availabilityZoneRule?: ResourceTypeRegistrationPropertiesAvailabilityZoneRule;
  /** The dsts configuration. */
  dstsConfiguration?: ResourceTypeRegistrationPropertiesDstsConfiguration;
  /** Async timeout rules */
  asyncTimeoutRules?: AsyncTimeoutRule[];
  /** Common API versions for the resource type. */
  commonApiVersions?: string[];
  /** The api profiles. */
  apiProfiles?: ApiProfile[];
  /** The linked operation rules. */
  linkedOperationRules?: LinkedOperationRule[];
  /** The legacy name. */
  legacyName?: string;
  /** The legacy names. */
  legacyNames?: string[];
  /** Allowed template deployment reference actions. */
  allowedTemplateDeploymentReferenceActions?: string[];
  /** The legacy policy. */
  legacyPolicy?: ResourceTypeRegistrationPropertiesLegacyPolicy;
  /** Manifest link. */
  manifestLink?: string;
  /** Capacity rule. */
  capacityRule?: ResourceTypeRegistrationPropertiesCapacityRule;
  /** Marketplace options. */
  marketplaceOptions?: ResourceTypeRegistrationPropertiesMarketplaceOptions;
  /** The allowed resource names. */
  allowedResourceNames?: AllowedResourceName[];
  /** Resource cache options. */
  resourceCache?: ResourceTypeRegistrationPropertiesResourceCache;
  /** Resource query management options. */
  resourceQueryManagement?: ResourceTypeRegistrationPropertiesResourceQueryManagement;
  /** Whether tags are supported. */
  supportsTags?: boolean;
  /** Resource management options. */
  resourceManagementOptions?: ResourceTypeRegistrationPropertiesResourceManagementOptions;
  /** Grouping tag. */
  groupingTag?: string;
  /** Add resource list target locations? */
  addResourceListTargetLocations?: boolean;
  /** Resource type common attribute management. */
  resourceTypeCommonAttributeManagement?: ResourceTypeRegistrationPropertiesResourceTypeCommonAttributeManagement;
  /** Routing rule. */
  routingRule?: ResourceTypeRegistrationPropertiesRoutingRule;
  /** The frontdoor request mode. */
  frontdoorRequestMode?: FrontdoorRequestMode;
  /** The resource sub type. */
  resourceSubType?: ResourceSubType;
  /** The async operation resource type name. */
  asyncOperationResourceTypeName?: string;
}

export function resourceTypeRegistrationPropertiesSerializer(
  item: ResourceTypeRegistrationProperties,
): any {
  return {
    routingType: item["routingType"],
    additionalOptions: item["additionalOptions"],
    crossTenantTokenValidation: item["crossTenantTokenValidation"],
    regionality: item["regionality"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : resourceTypeEndpointArraySerializer(item["endpoints"]),
    extensionOptions: !item["extensionOptions"]
      ? item["extensionOptions"]
      : resourceTypeRegistrationPropertiesExtensionOptionsSerializer(item["extensionOptions"]),
    marketplaceType: item["marketplaceType"],
    swaggerSpecifications: !item["swaggerSpecifications"]
      ? item["swaggerSpecifications"]
      : swaggerSpecificationArraySerializer(item["swaggerSpecifications"]),
    allowedUnauthorizedActions: !item["allowedUnauthorizedActions"]
      ? item["allowedUnauthorizedActions"]
      : item["allowedUnauthorizedActions"].map((p: any) => {
          return p;
        }),
    allowedUnauthorizedActionsExtensions: !item["allowedUnauthorizedActionsExtensions"]
      ? item["allowedUnauthorizedActionsExtensions"]
      : allowedUnauthorizedActionsExtensionArraySerializer(
          item["allowedUnauthorizedActionsExtensions"],
        ),
    authorizationActionMappings: !item["authorizationActionMappings"]
      ? item["authorizationActionMappings"]
      : authorizationActionMappingArraySerializer(item["authorizationActionMappings"]),
    linkedAccessChecks: !item["linkedAccessChecks"]
      ? item["linkedAccessChecks"]
      : linkedAccessCheckArraySerializer(item["linkedAccessChecks"]),
    defaultApiVersion: item["defaultApiVersion"],
    loggingRules: !item["loggingRules"]
      ? item["loggingRules"]
      : loggingRuleArraySerializer(item["loggingRules"]),
    throttlingRules: !item["throttlingRules"]
      ? item["throttlingRules"]
      : throttlingRuleArraySerializer(item["throttlingRules"]),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceTypeRegistrationPropertiesFeaturesRuleSerializer(item["featuresRule"]),
    enableAsyncOperation: item["enableAsyncOperation"],
    enableThirdPartyS2S: item["enableThirdPartyS2S"],
    subscriptionLifecycleNotificationSpecifications: !item[
      "subscriptionLifecycleNotificationSpecifications"
    ]
      ? item["subscriptionLifecycleNotificationSpecifications"]
      : resourceTypeRegistrationPropertiesSubscriptionLifecycleNotificationSpecificationsSerializer(
          item["subscriptionLifecycleNotificationSpecifications"],
        ),
    isPureProxy: item["isPureProxy"],
    identityManagement: !item["identityManagement"]
      ? item["identityManagement"]
      : resourceTypeRegistrationPropertiesIdentityManagementSerializer(item["identityManagement"]),
    checkNameAvailabilitySpecifications: !item["checkNameAvailabilitySpecifications"]
      ? item["checkNameAvailabilitySpecifications"]
      : resourceTypeRegistrationPropertiesCheckNameAvailabilitySpecificationsSerializer(
          item["checkNameAvailabilitySpecifications"],
        ),
    disallowedActionVerbs: !item["disallowedActionVerbs"]
      ? item["disallowedActionVerbs"]
      : item["disallowedActionVerbs"].map((p: any) => {
          return p;
        }),
    serviceTreeInfos: !item["serviceTreeInfos"]
      ? item["serviceTreeInfos"]
      : serviceTreeInfoArraySerializer(item["serviceTreeInfos"]),
    requestHeaderOptions: !item["requestHeaderOptions"]
      ? item["requestHeaderOptions"]
      : resourceTypeRegistrationPropertiesRequestHeaderOptionsSerializer(
          item["requestHeaderOptions"],
        ),
    subscriptionStateRules: !item["subscriptionStateRules"]
      ? item["subscriptionStateRules"]
      : subscriptionStateRuleArraySerializer(item["subscriptionStateRules"]),
    templateDeploymentOptions: !item["templateDeploymentOptions"]
      ? item["templateDeploymentOptions"]
      : resourceTypeRegistrationPropertiesTemplateDeploymentOptionsSerializer(
          item["templateDeploymentOptions"],
        ),
    extendedLocations: !item["extendedLocations"]
      ? item["extendedLocations"]
      : extendedLocationOptionsArraySerializer(item["extendedLocations"]),
    resourceMovePolicy: !item["resourceMovePolicy"]
      ? item["resourceMovePolicy"]
      : resourceTypeRegistrationPropertiesResourceMovePolicySerializer(item["resourceMovePolicy"]),
    resourceDeletionPolicy: item["resourceDeletionPolicy"],
    resourceConcurrencyControlOptions: !item["resourceConcurrencyControlOptions"]
      ? item["resourceConcurrencyControlOptions"]
      : resourceConcurrencyControlOptionRecordSerializer(item["resourceConcurrencyControlOptions"]),
    resourceGraphConfiguration: !item["resourceGraphConfiguration"]
      ? item["resourceGraphConfiguration"]
      : resourceTypeRegistrationPropertiesResourceGraphConfigurationSerializer(
          item["resourceGraphConfiguration"],
        ),
    management: !item["management"]
      ? item["management"]
      : resourceTypeRegistrationPropertiesManagementSerializer(item["management"]),
    openApiConfiguration: !item["openApiConfiguration"]
      ? item["openApiConfiguration"]
      : openApiConfigurationSerializer(item["openApiConfiguration"]),
    onBehalfOfTokens: !item["onBehalfOfTokens"]
      ? item["onBehalfOfTokens"]
      : resourceTypeOnBehalfOfTokenSerializer(item["onBehalfOfTokens"]),
    category: item["category"],
    resourceValidation: item["resourceValidation"],
    disallowedEndUserOperations: !item["disallowedEndUserOperations"]
      ? item["disallowedEndUserOperations"]
      : item["disallowedEndUserOperations"].map((p: any) => {
          return p;
        }),
    metadata: item["metadata"],
    skuLink: item["skuLink"],
    quotaRule: !item["quotaRule"] ? item["quotaRule"] : quotaRuleSerializer(item["quotaRule"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArraySerializer(item["notifications"]),
    linkedNotificationRules: !item["linkedNotificationRules"]
      ? item["linkedNotificationRules"]
      : linkedNotificationRuleArraySerializer(item["linkedNotificationRules"]),
    resourceProviderAuthorizationRules: !item["resourceProviderAuthorizationRules"]
      ? item["resourceProviderAuthorizationRules"]
      : resourceProviderAuthorizationRulesSerializer(item["resourceProviderAuthorizationRules"]),
    tokenAuthConfiguration: !item["tokenAuthConfiguration"]
      ? item["tokenAuthConfiguration"]
      : tokenAuthConfigurationSerializer(item["tokenAuthConfiguration"]),
    templateDeploymentPolicy: !item["templateDeploymentPolicy"]
      ? item["templateDeploymentPolicy"]
      : resourceTypeRegistrationPropertiesTemplateDeploymentPolicySerializer(
          item["templateDeploymentPolicy"],
        ),
    allowEmptyRoleAssignments: item["allowEmptyRoleAssignments"],
    policyExecutionType: item["policyExecutionType"],
    availabilityZoneRule: !item["availabilityZoneRule"]
      ? item["availabilityZoneRule"]
      : resourceTypeRegistrationPropertiesAvailabilityZoneRuleSerializer(
          item["availabilityZoneRule"],
        ),
    dstsConfiguration: !item["dstsConfiguration"]
      ? item["dstsConfiguration"]
      : resourceTypeRegistrationPropertiesDstsConfigurationSerializer(item["dstsConfiguration"]),
    asyncTimeoutRules: !item["asyncTimeoutRules"]
      ? item["asyncTimeoutRules"]
      : asyncTimeoutRuleArraySerializer(item["asyncTimeoutRules"]),
    commonApiVersions: !item["commonApiVersions"]
      ? item["commonApiVersions"]
      : item["commonApiVersions"].map((p: any) => {
          return p;
        }),
    apiProfiles: !item["apiProfiles"]
      ? item["apiProfiles"]
      : apiProfileArraySerializer(item["apiProfiles"]),
    linkedOperationRules: !item["linkedOperationRules"]
      ? item["linkedOperationRules"]
      : linkedOperationRuleArraySerializer(item["linkedOperationRules"]),
    legacyName: item["legacyName"],
    legacyNames: !item["legacyNames"]
      ? item["legacyNames"]
      : item["legacyNames"].map((p: any) => {
          return p;
        }),
    allowedTemplateDeploymentReferenceActions: !item["allowedTemplateDeploymentReferenceActions"]
      ? item["allowedTemplateDeploymentReferenceActions"]
      : item["allowedTemplateDeploymentReferenceActions"].map((p: any) => {
          return p;
        }),
    legacyPolicy: !item["legacyPolicy"]
      ? item["legacyPolicy"]
      : resourceTypeRegistrationPropertiesLegacyPolicySerializer(item["legacyPolicy"]),
    manifestLink: item["manifestLink"],
    capacityRule: !item["capacityRule"]
      ? item["capacityRule"]
      : resourceTypeRegistrationPropertiesCapacityRuleSerializer(item["capacityRule"]),
    marketplaceOptions: !item["marketplaceOptions"]
      ? item["marketplaceOptions"]
      : resourceTypeRegistrationPropertiesMarketplaceOptionsSerializer(item["marketplaceOptions"]),
    allowedResourceNames: !item["allowedResourceNames"]
      ? item["allowedResourceNames"]
      : allowedResourceNameArraySerializer(item["allowedResourceNames"]),
    resourceCache: !item["resourceCache"]
      ? item["resourceCache"]
      : resourceTypeRegistrationPropertiesResourceCacheSerializer(item["resourceCache"]),
    resourceQueryManagement: !item["resourceQueryManagement"]
      ? item["resourceQueryManagement"]
      : resourceTypeRegistrationPropertiesResourceQueryManagementSerializer(
          item["resourceQueryManagement"],
        ),
    supportsTags: item["supportsTags"],
    resourceManagementOptions: !item["resourceManagementOptions"]
      ? item["resourceManagementOptions"]
      : resourceTypeRegistrationPropertiesResourceManagementOptionsSerializer(
          item["resourceManagementOptions"],
        ),
    groupingTag: item["groupingTag"],
    addResourceListTargetLocations: item["addResourceListTargetLocations"],
    resourceTypeCommonAttributeManagement: !item["resourceTypeCommonAttributeManagement"]
      ? item["resourceTypeCommonAttributeManagement"]
      : resourceTypeRegistrationPropertiesResourceTypeCommonAttributeManagementSerializer(
          item["resourceTypeCommonAttributeManagement"],
        ),
    routingRule: !item["routingRule"]
      ? item["routingRule"]
      : resourceTypeRegistrationPropertiesRoutingRuleSerializer(item["routingRule"]),
    frontdoorRequestMode: item["frontdoorRequestMode"],
    resourceSubType: item["resourceSubType"],
    asyncOperationResourceTypeName: item["asyncOperationResourceTypeName"],
  };
}

export function resourceTypeRegistrationPropertiesDeserializer(
  item: any,
): ResourceTypeRegistrationProperties {
  return {
    routingType: item["routingType"],
    additionalOptions: item["additionalOptions"],
    crossTenantTokenValidation: item["crossTenantTokenValidation"],
    regionality: item["regionality"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : resourceTypeEndpointArrayDeserializer(item["endpoints"]),
    extensionOptions: !item["extensionOptions"]
      ? item["extensionOptions"]
      : resourceTypeRegistrationPropertiesExtensionOptionsDeserializer(item["extensionOptions"]),
    marketplaceType: item["marketplaceType"],
    swaggerSpecifications: !item["swaggerSpecifications"]
      ? item["swaggerSpecifications"]
      : swaggerSpecificationArrayDeserializer(item["swaggerSpecifications"]),
    allowedUnauthorizedActions: !item["allowedUnauthorizedActions"]
      ? item["allowedUnauthorizedActions"]
      : item["allowedUnauthorizedActions"].map((p: any) => {
          return p;
        }),
    allowedUnauthorizedActionsExtensions: !item["allowedUnauthorizedActionsExtensions"]
      ? item["allowedUnauthorizedActionsExtensions"]
      : allowedUnauthorizedActionsExtensionArrayDeserializer(
          item["allowedUnauthorizedActionsExtensions"],
        ),
    authorizationActionMappings: !item["authorizationActionMappings"]
      ? item["authorizationActionMappings"]
      : authorizationActionMappingArrayDeserializer(item["authorizationActionMappings"]),
    linkedAccessChecks: !item["linkedAccessChecks"]
      ? item["linkedAccessChecks"]
      : linkedAccessCheckArrayDeserializer(item["linkedAccessChecks"]),
    defaultApiVersion: item["defaultApiVersion"],
    loggingRules: !item["loggingRules"]
      ? item["loggingRules"]
      : loggingRuleArrayDeserializer(item["loggingRules"]),
    throttlingRules: !item["throttlingRules"]
      ? item["throttlingRules"]
      : throttlingRuleArrayDeserializer(item["throttlingRules"]),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceTypeRegistrationPropertiesFeaturesRuleDeserializer(item["featuresRule"]),
    enableAsyncOperation: item["enableAsyncOperation"],
    provisioningState: item["provisioningState"],
    enableThirdPartyS2S: item["enableThirdPartyS2S"],
    subscriptionLifecycleNotificationSpecifications: !item[
      "subscriptionLifecycleNotificationSpecifications"
    ]
      ? item["subscriptionLifecycleNotificationSpecifications"]
      : resourceTypeRegistrationPropertiesSubscriptionLifecycleNotificationSpecificationsDeserializer(
          item["subscriptionLifecycleNotificationSpecifications"],
        ),
    isPureProxy: item["isPureProxy"],
    identityManagement: !item["identityManagement"]
      ? item["identityManagement"]
      : resourceTypeRegistrationPropertiesIdentityManagementDeserializer(
          item["identityManagement"],
        ),
    checkNameAvailabilitySpecifications: !item["checkNameAvailabilitySpecifications"]
      ? item["checkNameAvailabilitySpecifications"]
      : resourceTypeRegistrationPropertiesCheckNameAvailabilitySpecificationsDeserializer(
          item["checkNameAvailabilitySpecifications"],
        ),
    disallowedActionVerbs: !item["disallowedActionVerbs"]
      ? item["disallowedActionVerbs"]
      : item["disallowedActionVerbs"].map((p: any) => {
          return p;
        }),
    serviceTreeInfos: !item["serviceTreeInfos"]
      ? item["serviceTreeInfos"]
      : serviceTreeInfoArrayDeserializer(item["serviceTreeInfos"]),
    requestHeaderOptions: !item["requestHeaderOptions"]
      ? item["requestHeaderOptions"]
      : resourceTypeRegistrationPropertiesRequestHeaderOptionsDeserializer(
          item["requestHeaderOptions"],
        ),
    subscriptionStateRules: !item["subscriptionStateRules"]
      ? item["subscriptionStateRules"]
      : subscriptionStateRuleArrayDeserializer(item["subscriptionStateRules"]),
    templateDeploymentOptions: !item["templateDeploymentOptions"]
      ? item["templateDeploymentOptions"]
      : resourceTypeRegistrationPropertiesTemplateDeploymentOptionsDeserializer(
          item["templateDeploymentOptions"],
        ),
    extendedLocations: !item["extendedLocations"]
      ? item["extendedLocations"]
      : extendedLocationOptionsArrayDeserializer(item["extendedLocations"]),
    resourceMovePolicy: !item["resourceMovePolicy"]
      ? item["resourceMovePolicy"]
      : resourceTypeRegistrationPropertiesResourceMovePolicyDeserializer(
          item["resourceMovePolicy"],
        ),
    resourceDeletionPolicy: item["resourceDeletionPolicy"],
    resourceConcurrencyControlOptions: !item["resourceConcurrencyControlOptions"]
      ? item["resourceConcurrencyControlOptions"]
      : resourceConcurrencyControlOptionRecordDeserializer(
          item["resourceConcurrencyControlOptions"],
        ),
    resourceGraphConfiguration: !item["resourceGraphConfiguration"]
      ? item["resourceGraphConfiguration"]
      : resourceTypeRegistrationPropertiesResourceGraphConfigurationDeserializer(
          item["resourceGraphConfiguration"],
        ),
    management: !item["management"]
      ? item["management"]
      : resourceTypeRegistrationPropertiesManagementDeserializer(item["management"]),
    openApiConfiguration: !item["openApiConfiguration"]
      ? item["openApiConfiguration"]
      : openApiConfigurationDeserializer(item["openApiConfiguration"]),
    onBehalfOfTokens: !item["onBehalfOfTokens"]
      ? item["onBehalfOfTokens"]
      : resourceTypeOnBehalfOfTokenDeserializer(item["onBehalfOfTokens"]),
    category: item["category"],
    resourceValidation: item["resourceValidation"],
    disallowedEndUserOperations: !item["disallowedEndUserOperations"]
      ? item["disallowedEndUserOperations"]
      : item["disallowedEndUserOperations"].map((p: any) => {
          return p;
        }),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    skuLink: item["skuLink"],
    quotaRule: !item["quotaRule"] ? item["quotaRule"] : quotaRuleDeserializer(item["quotaRule"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArrayDeserializer(item["notifications"]),
    linkedNotificationRules: !item["linkedNotificationRules"]
      ? item["linkedNotificationRules"]
      : linkedNotificationRuleArrayDeserializer(item["linkedNotificationRules"]),
    resourceProviderAuthorizationRules: !item["resourceProviderAuthorizationRules"]
      ? item["resourceProviderAuthorizationRules"]
      : resourceProviderAuthorizationRulesDeserializer(item["resourceProviderAuthorizationRules"]),
    tokenAuthConfiguration: !item["tokenAuthConfiguration"]
      ? item["tokenAuthConfiguration"]
      : tokenAuthConfigurationDeserializer(item["tokenAuthConfiguration"]),
    templateDeploymentPolicy: !item["templateDeploymentPolicy"]
      ? item["templateDeploymentPolicy"]
      : resourceTypeRegistrationPropertiesTemplateDeploymentPolicyDeserializer(
          item["templateDeploymentPolicy"],
        ),
    allowEmptyRoleAssignments: item["allowEmptyRoleAssignments"],
    policyExecutionType: item["policyExecutionType"],
    availabilityZoneRule: !item["availabilityZoneRule"]
      ? item["availabilityZoneRule"]
      : resourceTypeRegistrationPropertiesAvailabilityZoneRuleDeserializer(
          item["availabilityZoneRule"],
        ),
    dstsConfiguration: !item["dstsConfiguration"]
      ? item["dstsConfiguration"]
      : resourceTypeRegistrationPropertiesDstsConfigurationDeserializer(item["dstsConfiguration"]),
    asyncTimeoutRules: !item["asyncTimeoutRules"]
      ? item["asyncTimeoutRules"]
      : asyncTimeoutRuleArrayDeserializer(item["asyncTimeoutRules"]),
    commonApiVersions: !item["commonApiVersions"]
      ? item["commonApiVersions"]
      : item["commonApiVersions"].map((p: any) => {
          return p;
        }),
    apiProfiles: !item["apiProfiles"]
      ? item["apiProfiles"]
      : apiProfileArrayDeserializer(item["apiProfiles"]),
    linkedOperationRules: !item["linkedOperationRules"]
      ? item["linkedOperationRules"]
      : linkedOperationRuleArrayDeserializer(item["linkedOperationRules"]),
    legacyName: item["legacyName"],
    legacyNames: !item["legacyNames"]
      ? item["legacyNames"]
      : item["legacyNames"].map((p: any) => {
          return p;
        }),
    allowedTemplateDeploymentReferenceActions: !item["allowedTemplateDeploymentReferenceActions"]
      ? item["allowedTemplateDeploymentReferenceActions"]
      : item["allowedTemplateDeploymentReferenceActions"].map((p: any) => {
          return p;
        }),
    legacyPolicy: !item["legacyPolicy"]
      ? item["legacyPolicy"]
      : resourceTypeRegistrationPropertiesLegacyPolicyDeserializer(item["legacyPolicy"]),
    manifestLink: item["manifestLink"],
    capacityRule: !item["capacityRule"]
      ? item["capacityRule"]
      : resourceTypeRegistrationPropertiesCapacityRuleDeserializer(item["capacityRule"]),
    marketplaceOptions: !item["marketplaceOptions"]
      ? item["marketplaceOptions"]
      : resourceTypeRegistrationPropertiesMarketplaceOptionsDeserializer(
          item["marketplaceOptions"],
        ),
    allowedResourceNames: !item["allowedResourceNames"]
      ? item["allowedResourceNames"]
      : allowedResourceNameArrayDeserializer(item["allowedResourceNames"]),
    resourceCache: !item["resourceCache"]
      ? item["resourceCache"]
      : resourceTypeRegistrationPropertiesResourceCacheDeserializer(item["resourceCache"]),
    resourceQueryManagement: !item["resourceQueryManagement"]
      ? item["resourceQueryManagement"]
      : resourceTypeRegistrationPropertiesResourceQueryManagementDeserializer(
          item["resourceQueryManagement"],
        ),
    supportsTags: item["supportsTags"],
    resourceManagementOptions: !item["resourceManagementOptions"]
      ? item["resourceManagementOptions"]
      : resourceTypeRegistrationPropertiesResourceManagementOptionsDeserializer(
          item["resourceManagementOptions"],
        ),
    groupingTag: item["groupingTag"],
    addResourceListTargetLocations: item["addResourceListTargetLocations"],
    resourceTypeCommonAttributeManagement: !item["resourceTypeCommonAttributeManagement"]
      ? item["resourceTypeCommonAttributeManagement"]
      : resourceTypeRegistrationPropertiesResourceTypeCommonAttributeManagementDeserializer(
          item["resourceTypeCommonAttributeManagement"],
        ),
    routingRule: !item["routingRule"]
      ? item["routingRule"]
      : resourceTypeRegistrationPropertiesRoutingRuleDeserializer(item["routingRule"]),
    frontdoorRequestMode: item["frontdoorRequestMode"],
    resourceSubType: item["resourceSubType"],
    asyncOperationResourceTypeName: item["asyncOperationResourceTypeName"],
  };
}

/** The additional options. */
export enum KnownAdditionalOptionsResourceTypeRegistration {
  /** ProtectedAsyncOperationPolling */
  ProtectedAsyncOperationPolling = "ProtectedAsyncOperationPolling",
  /** ProtectedAsyncOperationPollingAuditOnly */
  ProtectedAsyncOperationPollingAuditOnly = "ProtectedAsyncOperationPollingAuditOnly",
}

/**
 * The additional options. \
 * {@link KnownAdditionalOptionsResourceTypeRegistration} can be used interchangeably with AdditionalOptionsResourceTypeRegistration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ProtectedAsyncOperationPolling** \
 * **ProtectedAsyncOperationPollingAuditOnly**
 */
export type AdditionalOptionsResourceTypeRegistration = string;

/** The regionality. */
export enum KnownRegionality {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Global */
  Global = "Global",
  /** Regional */
  Regional = "Regional",
}

/**
 * The regionality. \
 * {@link KnownRegionality} can be used interchangeably with Regionality,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Global** \
 * **Regional**
 */
export type Regionality = string;

export function resourceTypeEndpointArraySerializer(result: Array<ResourceTypeEndpoint>): any[] {
  return result.map((item) => {
    return resourceTypeEndpointSerializer(item);
  });
}

export function resourceTypeEndpointArrayDeserializer(result: Array<ResourceTypeEndpoint>): any[] {
  return result.map((item) => {
    return resourceTypeEndpointDeserializer(item);
  });
}

/** model interface ResourceTypeEndpoint */
export interface ResourceTypeEndpoint {
  /** Resource type endpoint kind. This Metadata is also used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: ResourceTypeEndpointKind;
  /** Whether the endpoint is enabled. */
  enabled?: boolean;
  /** The api versions. */
  apiVersions?: string[];
  /** The locations. */
  locations?: string[];
  /** The required features. */
  requiredFeatures?: string[];
  /** The features rule. */
  featuresRule?: ResourceTypeEndpointFeaturesRule;
  /** The extensions. */
  extensions?: ResourceTypeExtension[];
  /** The timeout. */
  timeout?: string;
  /** The endpoint type. */
  endpointType?: EndpointTypeResourceType;
  /** The token auth configuration. */
  tokenAuthConfiguration?: TokenAuthConfiguration;
  /** The sku link. */
  skuLink?: string;
  /** The endpoint uri. */
  endpointUri?: string;
  /** Api version. */
  apiVersion?: string;
  /** List of zones. */
  zones?: string[];
  /** The dsts configuration. */
  dstsConfiguration?: ResourceTypeEndpointDstsConfiguration;
  /** The data boundary. */
  dataBoundary?: DataBoundary;
}

export function resourceTypeEndpointSerializer(item: ResourceTypeEndpoint): any {
  return {
    kind: item["kind"],
    enabled: item["enabled"],
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceTypeEndpointFeaturesRuleSerializer(item["featuresRule"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : resourceTypeExtensionArraySerializer(item["extensions"]),
    timeout: item["timeout"],
    endpointType: item["endpointType"],
    tokenAuthConfiguration: !item["tokenAuthConfiguration"]
      ? item["tokenAuthConfiguration"]
      : tokenAuthConfigurationSerializer(item["tokenAuthConfiguration"]),
    skuLink: item["skuLink"],
    endpointUri: item["endpointUri"],
    apiVersion: item["apiVersion"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    dstsConfiguration: !item["dstsConfiguration"]
      ? item["dstsConfiguration"]
      : resourceTypeEndpointDstsConfigurationSerializer(item["dstsConfiguration"]),
    dataBoundary: item["dataBoundary"],
  };
}

export function resourceTypeEndpointDeserializer(item: any): ResourceTypeEndpoint {
  return {
    kind: item["kind"],
    enabled: item["enabled"],
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceTypeEndpointFeaturesRuleDeserializer(item["featuresRule"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : resourceTypeExtensionArrayDeserializer(item["extensions"]),
    timeout: item["timeout"],
    endpointType: item["endpointType"],
    tokenAuthConfiguration: !item["tokenAuthConfiguration"]
      ? item["tokenAuthConfiguration"]
      : tokenAuthConfigurationDeserializer(item["tokenAuthConfiguration"]),
    skuLink: item["skuLink"],
    endpointUri: item["endpointUri"],
    apiVersion: item["apiVersion"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    dstsConfiguration: !item["dstsConfiguration"]
      ? item["dstsConfiguration"]
      : resourceTypeEndpointDstsConfigurationDeserializer(item["dstsConfiguration"]),
    dataBoundary: item["dataBoundary"],
  };
}

/** Resource type endpoint kind. This Metadata is also used by portal/tooling/etc to render different UX experiences for resources of the same type. */
export enum KnownResourceTypeEndpointKind {
  /** Endpoint served by ProviderHub service */
  Managed = "Managed",
  /** Endpoint served by the onboarded Resource Provider Service. */
  Direct = "Direct",
}

/**
 * Resource type endpoint kind. This Metadata is also used by portal/tooling/etc to render different UX experiences for resources of the same type. \
 * {@link KnownResourceTypeEndpointKind} can be used interchangeably with ResourceTypeEndpointKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed**: Endpoint served by ProviderHub service \
 * **Direct**: Endpoint served by the onboarded Resource Provider Service.
 */
export type ResourceTypeEndpointKind = string;

/** The features rule. */
export interface ResourceTypeEndpointFeaturesRule extends FeaturesRule {}

export function resourceTypeEndpointFeaturesRuleSerializer(
  item: ResourceTypeEndpointFeaturesRule,
): any {
  return { requiredFeaturesPolicy: item["requiredFeaturesPolicy"] };
}

export function resourceTypeEndpointFeaturesRuleDeserializer(
  item: any,
): ResourceTypeEndpointFeaturesRule {
  return {
    requiredFeaturesPolicy: item["requiredFeaturesPolicy"],
  };
}

export function resourceTypeExtensionArraySerializer(result: Array<ResourceTypeExtension>): any[] {
  return result.map((item) => {
    return resourceTypeExtensionSerializer(item);
  });
}

export function resourceTypeExtensionArrayDeserializer(
  result: Array<ResourceTypeExtension>,
): any[] {
  return result.map((item) => {
    return resourceTypeExtensionDeserializer(item);
  });
}

/** model interface ResourceTypeExtension */
export interface ResourceTypeExtension {
  /** The endpoint uri. */
  endpointUri?: string;
  /** The extension categories. */
  extensionCategories?: ExtensionCategory[];
  /** The timeout. */
  timeout?: string;
}

export function resourceTypeExtensionSerializer(item: ResourceTypeExtension): any {
  return {
    endpointUri: item["endpointUri"],
    extensionCategories: !item["extensionCategories"]
      ? item["extensionCategories"]
      : item["extensionCategories"].map((p: any) => {
          return p;
        }),
    timeout: item["timeout"],
  };
}

export function resourceTypeExtensionDeserializer(item: any): ResourceTypeExtension {
  return {
    endpointUri: item["endpointUri"],
    extensionCategories: !item["extensionCategories"]
      ? item["extensionCategories"]
      : item["extensionCategories"].map((p: any) => {
          return p;
        }),
    timeout: item["timeout"],
  };
}

/** Known values of {@link ExtensionCategory} that the service accepts. */
export enum KnownExtensionCategory {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** ResourceCreationValidate */
  ResourceCreationValidate = "ResourceCreationValidate",
  /** ResourceCreationBegin */
  ResourceCreationBegin = "ResourceCreationBegin",
  /** ResourceCreationCompleted */
  ResourceCreationCompleted = "ResourceCreationCompleted",
  /** ResourceReadValidate */
  ResourceReadValidate = "ResourceReadValidate",
  /** ResourceReadBegin */
  ResourceReadBegin = "ResourceReadBegin",
  /** ResourcePatchValidate */
  ResourcePatchValidate = "ResourcePatchValidate",
  /** ResourcePatchCompleted */
  ResourcePatchCompleted = "ResourcePatchCompleted",
  /** ResourceDeletionValidate */
  ResourceDeletionValidate = "ResourceDeletionValidate",
  /** ResourceDeletionBegin */
  ResourceDeletionBegin = "ResourceDeletionBegin",
  /** ResourceDeletionCompleted */
  ResourceDeletionCompleted = "ResourceDeletionCompleted",
  /** ResourcePostAction */
  ResourcePostAction = "ResourcePostAction",
  /** SubscriptionLifecycleNotification */
  SubscriptionLifecycleNotification = "SubscriptionLifecycleNotification",
  /** ResourcePatchBegin */
  ResourcePatchBegin = "ResourcePatchBegin",
  /** ResourceMoveBegin */
  ResourceMoveBegin = "ResourceMoveBegin",
  /** ResourceMoveCompleted */
  ResourceMoveCompleted = "ResourceMoveCompleted",
  /** BestMatchOperationBegin */
  BestMatchOperationBegin = "BestMatchOperationBegin",
  /** SubscriptionLifecycleNotificationDeletion */
  SubscriptionLifecycleNotificationDeletion = "SubscriptionLifecycleNotificationDeletion",
}

/** Type of ExtensionCategory */
export type ExtensionCategory = string;

/** The endpoint type. */
export enum KnownEndpointTypeResourceType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Canary */
  Canary = "Canary",
  /** Production */
  Production = "Production",
  /** TestInProduction */
  TestInProduction = "TestInProduction",
}

/**
 * The endpoint type. \
 * {@link KnownEndpointTypeResourceType} can be used interchangeably with EndpointTypeResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Canary** \
 * **Production** \
 * **TestInProduction**
 */
export type EndpointTypeResourceType = string;

/** The dsts configuration. */
export interface ResourceTypeEndpointDstsConfiguration extends DstsConfiguration {}

export function resourceTypeEndpointDstsConfigurationSerializer(
  item: ResourceTypeEndpointDstsConfiguration,
): any {
  return { serviceName: item["serviceName"], serviceDnsName: item["serviceDnsName"] };
}

export function resourceTypeEndpointDstsConfigurationDeserializer(
  item: any,
): ResourceTypeEndpointDstsConfiguration {
  return {
    serviceName: item["serviceName"],
    serviceDnsName: item["serviceDnsName"],
  };
}

/** The data boundary. */
export enum KnownDataBoundary {
  /** NotDefined */
  NotDefined = "NotDefined",
  /** Global */
  Global = "Global",
  /** EU */
  EU = "EU",
  /** US */
  US = "US",
}

/**
 * The data boundary. \
 * {@link KnownDataBoundary} can be used interchangeably with DataBoundary,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotDefined** \
 * **Global** \
 * **EU** \
 * **US**
 */
export type DataBoundary = string;

/** The extension options. */
export interface ResourceTypeRegistrationPropertiesExtensionOptions extends ResourceTypeExtensionOptions {}

export function resourceTypeRegistrationPropertiesExtensionOptionsSerializer(
  item: ResourceTypeRegistrationPropertiesExtensionOptions,
): any {
  return {
    resourceCreationBegin: !item["resourceCreationBegin"]
      ? item["resourceCreationBegin"]
      : resourceTypeExtensionOptionsResourceCreationBeginSerializer(item["resourceCreationBegin"]),
  };
}

export function resourceTypeRegistrationPropertiesExtensionOptionsDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesExtensionOptions {
  return {
    resourceCreationBegin: !item["resourceCreationBegin"]
      ? item["resourceCreationBegin"]
      : resourceTypeExtensionOptionsResourceCreationBeginDeserializer(
          item["resourceCreationBegin"],
        ),
  };
}

export function swaggerSpecificationArraySerializer(result: Array<SwaggerSpecification>): any[] {
  return result.map((item) => {
    return swaggerSpecificationSerializer(item);
  });
}

export function swaggerSpecificationArrayDeserializer(result: Array<SwaggerSpecification>): any[] {
  return result.map((item) => {
    return swaggerSpecificationDeserializer(item);
  });
}

/** model interface SwaggerSpecification */
export interface SwaggerSpecification {
  /** The api versions. */
  apiVersions?: string[];
  /** The swagger spec folder uri. */
  swaggerSpecFolderUri?: string;
}

export function swaggerSpecificationSerializer(item: SwaggerSpecification): any {
  return {
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    swaggerSpecFolderUri: item["swaggerSpecFolderUri"],
  };
}

export function swaggerSpecificationDeserializer(item: any): SwaggerSpecification {
  return {
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    swaggerSpecFolderUri: item["swaggerSpecFolderUri"],
  };
}

/** The features rule. */
export interface ResourceTypeRegistrationPropertiesFeaturesRule extends FeaturesRule {}

export function resourceTypeRegistrationPropertiesFeaturesRuleSerializer(
  item: ResourceTypeRegistrationPropertiesFeaturesRule,
): any {
  return { requiredFeaturesPolicy: item["requiredFeaturesPolicy"] };
}

export function resourceTypeRegistrationPropertiesFeaturesRuleDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesFeaturesRule {
  return {
    requiredFeaturesPolicy: item["requiredFeaturesPolicy"],
  };
}

/** The subscription lifecycle notification specifications. */
export interface ResourceTypeRegistrationPropertiesSubscriptionLifecycleNotificationSpecifications extends SubscriptionLifecycleNotificationSpecifications {}

export function resourceTypeRegistrationPropertiesSubscriptionLifecycleNotificationSpecificationsSerializer(
  item: ResourceTypeRegistrationPropertiesSubscriptionLifecycleNotificationSpecifications,
): any {
  return {
    subscriptionStateOverrideActions: !item["subscriptionStateOverrideActions"]
      ? item["subscriptionStateOverrideActions"]
      : subscriptionStateOverrideActionArraySerializer(item["subscriptionStateOverrideActions"]),
    softDeleteTTL: item["softDeleteTTL"],
  };
}

export function resourceTypeRegistrationPropertiesSubscriptionLifecycleNotificationSpecificationsDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesSubscriptionLifecycleNotificationSpecifications {
  return {
    subscriptionStateOverrideActions: !item["subscriptionStateOverrideActions"]
      ? item["subscriptionStateOverrideActions"]
      : subscriptionStateOverrideActionArrayDeserializer(item["subscriptionStateOverrideActions"]),
    softDeleteTTL: item["softDeleteTTL"],
  };
}

/** The identity management. */
export interface ResourceTypeRegistrationPropertiesIdentityManagement extends IdentityManagementProperties {}

export function resourceTypeRegistrationPropertiesIdentityManagementSerializer(
  item: ResourceTypeRegistrationPropertiesIdentityManagement,
): any {
  return {
    type: item["type"],
    applicationId: item["applicationId"],
    applicationIds: !item["applicationIds"]
      ? item["applicationIds"]
      : item["applicationIds"].map((p: any) => {
          return p;
        }),
    delegationAppIds: !item["delegationAppIds"]
      ? item["delegationAppIds"]
      : item["delegationAppIds"].map((p: any) => {
          return p;
        }),
  };
}

export function resourceTypeRegistrationPropertiesIdentityManagementDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesIdentityManagement {
  return {
    type: item["type"],
    applicationId: item["applicationId"],
    applicationIds: !item["applicationIds"]
      ? item["applicationIds"]
      : item["applicationIds"].map((p: any) => {
          return p;
        }),
    delegationAppIds: !item["delegationAppIds"]
      ? item["delegationAppIds"]
      : item["delegationAppIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The check name availability specifications. */
export interface ResourceTypeRegistrationPropertiesCheckNameAvailabilitySpecifications extends CheckNameAvailabilitySpecifications {}

export function resourceTypeRegistrationPropertiesCheckNameAvailabilitySpecificationsSerializer(
  item: ResourceTypeRegistrationPropertiesCheckNameAvailabilitySpecifications,
): any {
  return {
    enableDefaultValidation: item["enableDefaultValidation"],
    resourceTypesWithCustomValidation: !item["resourceTypesWithCustomValidation"]
      ? item["resourceTypesWithCustomValidation"]
      : item["resourceTypesWithCustomValidation"].map((p: any) => {
          return p;
        }),
  };
}

export function resourceTypeRegistrationPropertiesCheckNameAvailabilitySpecificationsDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesCheckNameAvailabilitySpecifications {
  return {
    enableDefaultValidation: item["enableDefaultValidation"],
    resourceTypesWithCustomValidation: !item["resourceTypesWithCustomValidation"]
      ? item["resourceTypesWithCustomValidation"]
      : item["resourceTypesWithCustomValidation"].map((p: any) => {
          return p;
        }),
  };
}

/** The request header options. */
export interface ResourceTypeRegistrationPropertiesRequestHeaderOptions extends RequestHeaderOptions {}

export function resourceTypeRegistrationPropertiesRequestHeaderOptionsSerializer(
  item: ResourceTypeRegistrationPropertiesRequestHeaderOptions,
): any {
  return { optInHeaders: item["optInHeaders"], optOutHeaders: item["optOutHeaders"] };
}

export function resourceTypeRegistrationPropertiesRequestHeaderOptionsDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesRequestHeaderOptions {
  return {
    optInHeaders: item["optInHeaders"],
    optOutHeaders: item["optOutHeaders"],
  };
}

/** The template deployment options. */
export interface ResourceTypeRegistrationPropertiesTemplateDeploymentOptions extends TemplateDeploymentOptions {}

export function resourceTypeRegistrationPropertiesTemplateDeploymentOptionsSerializer(
  item: ResourceTypeRegistrationPropertiesTemplateDeploymentOptions,
): any {
  return {
    preflightSupported: item["preflightSupported"],
    preflightOptions: !item["preflightOptions"]
      ? item["preflightOptions"]
      : item["preflightOptions"].map((p: any) => {
          return p;
        }),
  };
}

export function resourceTypeRegistrationPropertiesTemplateDeploymentOptionsDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesTemplateDeploymentOptions {
  return {
    preflightSupported: item["preflightSupported"],
    preflightOptions: !item["preflightOptions"]
      ? item["preflightOptions"]
      : item["preflightOptions"].map((p: any) => {
          return p;
        }),
  };
}

/** The resource move policy. */
export interface ResourceTypeRegistrationPropertiesResourceMovePolicy extends ResourceMovePolicy {}

export function resourceTypeRegistrationPropertiesResourceMovePolicySerializer(
  item: ResourceTypeRegistrationPropertiesResourceMovePolicy,
): any {
  return {
    validationRequired: item["validationRequired"],
    crossResourceGroupMoveEnabled: item["crossResourceGroupMoveEnabled"],
    crossSubscriptionMoveEnabled: item["crossSubscriptionMoveEnabled"],
  };
}

export function resourceTypeRegistrationPropertiesResourceMovePolicyDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesResourceMovePolicy {
  return {
    validationRequired: item["validationRequired"],
    crossResourceGroupMoveEnabled: item["crossResourceGroupMoveEnabled"],
    crossSubscriptionMoveEnabled: item["crossSubscriptionMoveEnabled"],
  };
}

/** The resource deletion policy. */
export enum KnownResourceDeletionPolicy {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** CascadeDeleteAll */
  CascadeDeleteAll = "CascadeDeleteAll",
  /** CascadeDeleteProxyOnlyChildren */
  CascadeDeleteProxyOnlyChildren = "CascadeDeleteProxyOnlyChildren",
}

/**
 * The resource deletion policy. \
 * {@link KnownResourceDeletionPolicy} can be used interchangeably with ResourceDeletionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **CascadeDeleteAll** \
 * **CascadeDeleteProxyOnlyChildren**
 */
export type ResourceDeletionPolicy = string;

export function resourceConcurrencyControlOptionRecordSerializer(
  item: Record<string, ResourceConcurrencyControlOption>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : resourceConcurrencyControlOptionSerializer(item[key]);
  });
  return result;
}

export function resourceConcurrencyControlOptionRecordDeserializer(
  item: Record<string, any>,
): Record<string, ResourceConcurrencyControlOption> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : resourceConcurrencyControlOptionDeserializer(item[key]);
  });
  return result;
}

/** model interface ResourceConcurrencyControlOption */
export interface ResourceConcurrencyControlOption {
  /** The policy. */
  policy?: Policy;
}

export function resourceConcurrencyControlOptionSerializer(
  item: ResourceConcurrencyControlOption,
): any {
  return { policy: item["policy"] };
}

export function resourceConcurrencyControlOptionDeserializer(
  item: any,
): ResourceConcurrencyControlOption {
  return {
    policy: item["policy"],
  };
}

/** The policy. */
export enum KnownPolicy {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** SynchronizeBeginExtension */
  SynchronizeBeginExtension = "SynchronizeBeginExtension",
}

/**
 * The policy. \
 * {@link KnownPolicy} can be used interchangeably with Policy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **SynchronizeBeginExtension**
 */
export type Policy = string;

/** The resource graph configuration. */
export interface ResourceTypeRegistrationPropertiesResourceGraphConfiguration extends ResourceGraphConfiguration {}

export function resourceTypeRegistrationPropertiesResourceGraphConfigurationSerializer(
  item: ResourceTypeRegistrationPropertiesResourceGraphConfiguration,
): any {
  return { enabled: item["enabled"], apiVersion: item["apiVersion"] };
}

export function resourceTypeRegistrationPropertiesResourceGraphConfigurationDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesResourceGraphConfiguration {
  return {
    enabled: item["enabled"],
    apiVersion: item["apiVersion"],
  };
}

/** The resource provider management. */
export interface ResourceTypeRegistrationPropertiesManagement extends ResourceProviderManagement {}

export function resourceTypeRegistrationPropertiesManagementSerializer(
  item: ResourceTypeRegistrationPropertiesManagement,
): any {
  return {
    schemaOwners: !item["schemaOwners"]
      ? item["schemaOwners"]
      : item["schemaOwners"].map((p: any) => {
          return p;
        }),
    manifestOwners: !item["manifestOwners"]
      ? item["manifestOwners"]
      : item["manifestOwners"].map((p: any) => {
          return p;
        }),
    authorizationOwners: !item["authorizationOwners"]
      ? item["authorizationOwners"]
      : item["authorizationOwners"].map((p: any) => {
          return p;
        }),
    incidentRoutingService: item["incidentRoutingService"],
    incidentRoutingTeam: item["incidentRoutingTeam"],
    incidentContactEmail: item["incidentContactEmail"],
    serviceTreeInfos: !item["serviceTreeInfos"]
      ? item["serviceTreeInfos"]
      : serviceTreeInfoArraySerializer(item["serviceTreeInfos"]),
    resourceAccessPolicy: item["resourceAccessPolicy"],
    resourceAccessRoles: !item["resourceAccessRoles"]
      ? item["resourceAccessRoles"]
      : resourceAccessRoleArraySerializer(item["resourceAccessRoles"]),
    expeditedRolloutSubmitters: !item["expeditedRolloutSubmitters"]
      ? item["expeditedRolloutSubmitters"]
      : item["expeditedRolloutSubmitters"].map((p: any) => {
          return p;
        }),
    errorResponseMessageOptions: !item["errorResponseMessageOptions"]
      ? item["errorResponseMessageOptions"]
      : resourceProviderManagementErrorResponseMessageOptionsSerializer(
          item["errorResponseMessageOptions"],
        ),
    expeditedRolloutMetadata: !item["expeditedRolloutMetadata"]
      ? item["expeditedRolloutMetadata"]
      : resourceProviderManagementExpeditedRolloutMetadataSerializer(
          item["expeditedRolloutMetadata"],
        ),
    canaryManifestOwners: !item["canaryManifestOwners"]
      ? item["canaryManifestOwners"]
      : item["canaryManifestOwners"].map((p: any) => {
          return p;
        }),
    pcCode: item["pcCode"],
    profitCenterProgramId: item["profitCenterProgramId"],
  };
}

export function resourceTypeRegistrationPropertiesManagementDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesManagement {
  return {
    schemaOwners: !item["schemaOwners"]
      ? item["schemaOwners"]
      : item["schemaOwners"].map((p: any) => {
          return p;
        }),
    manifestOwners: !item["manifestOwners"]
      ? item["manifestOwners"]
      : item["manifestOwners"].map((p: any) => {
          return p;
        }),
    authorizationOwners: !item["authorizationOwners"]
      ? item["authorizationOwners"]
      : item["authorizationOwners"].map((p: any) => {
          return p;
        }),
    incidentRoutingService: item["incidentRoutingService"],
    incidentRoutingTeam: item["incidentRoutingTeam"],
    incidentContactEmail: item["incidentContactEmail"],
    serviceTreeInfos: !item["serviceTreeInfos"]
      ? item["serviceTreeInfos"]
      : serviceTreeInfoArrayDeserializer(item["serviceTreeInfos"]),
    resourceAccessPolicy: item["resourceAccessPolicy"],
    resourceAccessRoles: !item["resourceAccessRoles"]
      ? item["resourceAccessRoles"]
      : resourceAccessRoleArrayDeserializer(item["resourceAccessRoles"]),
    expeditedRolloutSubmitters: !item["expeditedRolloutSubmitters"]
      ? item["expeditedRolloutSubmitters"]
      : item["expeditedRolloutSubmitters"].map((p: any) => {
          return p;
        }),
    errorResponseMessageOptions: !item["errorResponseMessageOptions"]
      ? item["errorResponseMessageOptions"]
      : resourceProviderManagementErrorResponseMessageOptionsDeserializer(
          item["errorResponseMessageOptions"],
        ),
    expeditedRolloutMetadata: !item["expeditedRolloutMetadata"]
      ? item["expeditedRolloutMetadata"]
      : resourceProviderManagementExpeditedRolloutMetadataDeserializer(
          item["expeditedRolloutMetadata"],
        ),
    canaryManifestOwners: !item["canaryManifestOwners"]
      ? item["canaryManifestOwners"]
      : item["canaryManifestOwners"].map((p: any) => {
          return p;
        }),
    pcCode: item["pcCode"],
    profitCenterProgramId: item["profitCenterProgramId"],
  };
}

/** model interface OpenApiConfiguration */
export interface OpenApiConfiguration {
  /** The open api validation. */
  validation?: OpenApiValidation;
}

export function openApiConfigurationSerializer(item: OpenApiConfiguration): any {
  return {
    validation: !item["validation"]
      ? item["validation"]
      : openApiValidationSerializer(item["validation"]),
  };
}

export function openApiConfigurationDeserializer(item: any): OpenApiConfiguration {
  return {
    validation: !item["validation"]
      ? item["validation"]
      : openApiValidationDeserializer(item["validation"]),
  };
}

/** model interface OpenApiValidation */
export interface OpenApiValidation {
  /** Indicates whether a non compliance response is allowed for a LIST call */
  allowNoncompliantCollectionResponse?: boolean;
}

export function openApiValidationSerializer(item: OpenApiValidation): any {
  return { allowNoncompliantCollectionResponse: item["allowNoncompliantCollectionResponse"] };
}

export function openApiValidationDeserializer(item: any): OpenApiValidation {
  return {
    allowNoncompliantCollectionResponse: item["allowNoncompliantCollectionResponse"],
  };
}

/** model interface ResourceTypeOnBehalfOfToken */
export interface ResourceTypeOnBehalfOfToken {
  /** The action name. */
  actionName?: string;
  /** This is a TimeSpan property. */
  lifeTime?: string;
}

export function resourceTypeOnBehalfOfTokenSerializer(item: ResourceTypeOnBehalfOfToken): any {
  return { actionName: item["actionName"], lifeTime: item["lifeTime"] };
}

export function resourceTypeOnBehalfOfTokenDeserializer(item: any): ResourceTypeOnBehalfOfToken {
  return {
    actionName: item["actionName"],
    lifeTime: item["lifeTime"],
  };
}

/** The category. */
export enum KnownResourceTypeCategory {
  /** None */
  None = "None",
  /** FreeForm */
  FreeForm = "FreeForm",
  /** Internal */
  Internal = "Internal",
  /** PureProxy */
  PureProxy = "PureProxy",
}

/**
 * The category. \
 * {@link KnownResourceTypeCategory} can be used interchangeably with ResourceTypeCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **FreeForm** \
 * **Internal** \
 * **PureProxy**
 */
export type ResourceTypeCategory = string;

/** The template deployment policy. */
export interface ResourceTypeRegistrationPropertiesTemplateDeploymentPolicy extends TemplateDeploymentPolicy {}

export function resourceTypeRegistrationPropertiesTemplateDeploymentPolicySerializer(
  item: ResourceTypeRegistrationPropertiesTemplateDeploymentPolicy,
): any {
  return {
    capabilities: item["capabilities"],
    preflightOptions: item["preflightOptions"],
    preflightNotifications: item["preflightNotifications"],
  };
}

export function resourceTypeRegistrationPropertiesTemplateDeploymentPolicyDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesTemplateDeploymentPolicy {
  return {
    capabilities: item["capabilities"],
    preflightOptions: item["preflightOptions"],
    preflightNotifications: item["preflightNotifications"],
  };
}

/** The policy execution type. */
export enum KnownPolicyExecutionType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** ExecutePolicies */
  ExecutePolicies = "ExecutePolicies",
  /** BypassPolicies */
  BypassPolicies = "BypassPolicies",
  /** ExpectPartialPutRequests */
  ExpectPartialPutRequests = "ExpectPartialPutRequests",
}

/**
 * The policy execution type. \
 * {@link KnownPolicyExecutionType} can be used interchangeably with PolicyExecutionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **ExecutePolicies** \
 * **BypassPolicies** \
 * **ExpectPartialPutRequests**
 */
export type PolicyExecutionType = string;

/** The availability zone rule. */
export interface ResourceTypeRegistrationPropertiesAvailabilityZoneRule {
  availabilityZonePolicy?: AvailabilityZonePolicy;
}

export function resourceTypeRegistrationPropertiesAvailabilityZoneRuleSerializer(
  item: ResourceTypeRegistrationPropertiesAvailabilityZoneRule,
): any {
  return { availabilityZonePolicy: item["availabilityZonePolicy"] };
}

export function resourceTypeRegistrationPropertiesAvailabilityZoneRuleDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesAvailabilityZoneRule {
  return {
    availabilityZonePolicy: item["availabilityZonePolicy"],
  };
}

/** Known values of {@link AvailabilityZonePolicy} that the service accepts. */
export enum KnownAvailabilityZonePolicy {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** SingleZoned */
  SingleZoned = "SingleZoned",
  /** MultiZoned */
  MultiZoned = "MultiZoned",
}

/** Type of AvailabilityZonePolicy */
export type AvailabilityZonePolicy = string;

/** The dsts configuration. */
export interface ResourceTypeRegistrationPropertiesDstsConfiguration extends DstsConfiguration {}

export function resourceTypeRegistrationPropertiesDstsConfigurationSerializer(
  item: ResourceTypeRegistrationPropertiesDstsConfiguration,
): any {
  return { serviceName: item["serviceName"], serviceDnsName: item["serviceDnsName"] };
}

export function resourceTypeRegistrationPropertiesDstsConfigurationDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesDstsConfiguration {
  return {
    serviceName: item["serviceName"],
    serviceDnsName: item["serviceDnsName"],
  };
}

export function asyncTimeoutRuleArraySerializer(result: Array<AsyncTimeoutRule>): any[] {
  return result.map((item) => {
    return asyncTimeoutRuleSerializer(item);
  });
}

export function asyncTimeoutRuleArrayDeserializer(result: Array<AsyncTimeoutRule>): any[] {
  return result.map((item) => {
    return asyncTimeoutRuleDeserializer(item);
  });
}

/** model interface AsyncTimeoutRule */
export interface AsyncTimeoutRule {
  actionName?: string;
  /** This is a TimeSpan property */
  timeout?: string;
}

export function asyncTimeoutRuleSerializer(item: AsyncTimeoutRule): any {
  return { actionName: item["actionName"], timeout: item["timeout"] };
}

export function asyncTimeoutRuleDeserializer(item: any): AsyncTimeoutRule {
  return {
    actionName: item["actionName"],
    timeout: item["timeout"],
  };
}

export function apiProfileArraySerializer(result: Array<ApiProfile>): any[] {
  return result.map((item) => {
    return apiProfileSerializer(item);
  });
}

export function apiProfileArrayDeserializer(result: Array<ApiProfile>): any[] {
  return result.map((item) => {
    return apiProfileDeserializer(item);
  });
}

/** model interface ApiProfile */
export interface ApiProfile {
  /** Profile version. */
  profileVersion?: string;
  /** Api version. */
  apiVersion?: string;
}

export function apiProfileSerializer(item: ApiProfile): any {
  return { profileVersion: item["profileVersion"], apiVersion: item["apiVersion"] };
}

export function apiProfileDeserializer(item: any): ApiProfile {
  return {
    profileVersion: item["profileVersion"],
    apiVersion: item["apiVersion"],
  };
}

/** The legacy policy. */
export interface ResourceTypeRegistrationPropertiesLegacyPolicy {
  disallowedLegacyOperations?: LegacyOperation[];
  disallowedConditions?: LegacyDisallowedCondition[];
}

export function resourceTypeRegistrationPropertiesLegacyPolicySerializer(
  item: ResourceTypeRegistrationPropertiesLegacyPolicy,
): any {
  return {
    disallowedLegacyOperations: !item["disallowedLegacyOperations"]
      ? item["disallowedLegacyOperations"]
      : item["disallowedLegacyOperations"].map((p: any) => {
          return p;
        }),
    disallowedConditions: !item["disallowedConditions"]
      ? item["disallowedConditions"]
      : legacyDisallowedConditionArraySerializer(item["disallowedConditions"]),
  };
}

export function resourceTypeRegistrationPropertiesLegacyPolicyDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesLegacyPolicy {
  return {
    disallowedLegacyOperations: !item["disallowedLegacyOperations"]
      ? item["disallowedLegacyOperations"]
      : item["disallowedLegacyOperations"].map((p: any) => {
          return p;
        }),
    disallowedConditions: !item["disallowedConditions"]
      ? item["disallowedConditions"]
      : legacyDisallowedConditionArrayDeserializer(item["disallowedConditions"]),
  };
}

/** Known values of {@link LegacyOperation} that the service accepts. */
export enum KnownLegacyOperation {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Create */
  Create = "Create",
  /** Delete */
  Delete = "Delete",
  /** Waiting */
  Waiting = "Waiting",
  /** AzureAsyncOperationWaiting */
  AzureAsyncOperationWaiting = "AzureAsyncOperationWaiting",
  /** ResourceCacheWaiting */
  ResourceCacheWaiting = "ResourceCacheWaiting",
  /** Action */
  Action = "Action",
  /** Read */
  Read = "Read",
  /** EvaluateDeploymentOutput */
  EvaluateDeploymentOutput = "EvaluateDeploymentOutput",
  /** DeploymentCleanup */
  DeploymentCleanup = "DeploymentCleanup",
}

/** Type of LegacyOperation */
export type LegacyOperation = string;

export function legacyDisallowedConditionArraySerializer(
  result: Array<LegacyDisallowedCondition>,
): any[] {
  return result.map((item) => {
    return legacyDisallowedConditionSerializer(item);
  });
}

export function legacyDisallowedConditionArrayDeserializer(
  result: Array<LegacyDisallowedCondition>,
): any[] {
  return result.map((item) => {
    return legacyDisallowedConditionDeserializer(item);
  });
}

/** model interface LegacyDisallowedCondition */
export interface LegacyDisallowedCondition {
  /** The disallowed legacy operations. */
  disallowedLegacyOperations?: LegacyOperation[];
  /** Feature string. */
  feature?: string;
}

export function legacyDisallowedConditionSerializer(item: LegacyDisallowedCondition): any {
  return {
    disallowedLegacyOperations: !item["disallowedLegacyOperations"]
      ? item["disallowedLegacyOperations"]
      : item["disallowedLegacyOperations"].map((p: any) => {
          return p;
        }),
    feature: item["feature"],
  };
}

export function legacyDisallowedConditionDeserializer(item: any): LegacyDisallowedCondition {
  return {
    disallowedLegacyOperations: !item["disallowedLegacyOperations"]
      ? item["disallowedLegacyOperations"]
      : item["disallowedLegacyOperations"].map((p: any) => {
          return p;
        }),
    feature: item["feature"],
  };
}

/** Capacity rule. */
export interface ResourceTypeRegistrationPropertiesCapacityRule {
  /** Capacity policy. */
  capacityPolicy?: CapacityPolicy;
  /** Sku alias */
  skuAlias?: string;
}

export function resourceTypeRegistrationPropertiesCapacityRuleSerializer(
  item: ResourceTypeRegistrationPropertiesCapacityRule,
): any {
  return { capacityPolicy: item["capacityPolicy"], skuAlias: item["skuAlias"] };
}

export function resourceTypeRegistrationPropertiesCapacityRuleDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesCapacityRule {
  return {
    capacityPolicy: item["capacityPolicy"],
    skuAlias: item["skuAlias"],
  };
}

/** Capacity policy. */
export enum KnownCapacityPolicy {
  /** Default */
  Default = "Default",
  /** Restricted */
  Restricted = "Restricted",
}

/**
 * Capacity policy. \
 * {@link KnownCapacityPolicy} can be used interchangeably with CapacityPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **Restricted**
 */
export type CapacityPolicy = string;

/** Marketplace options. */
export interface ResourceTypeRegistrationPropertiesMarketplaceOptions {
  /** Add-on plan conversion allowed. */
  addOnPlanConversionAllowed?: boolean;
}

export function resourceTypeRegistrationPropertiesMarketplaceOptionsSerializer(
  item: ResourceTypeRegistrationPropertiesMarketplaceOptions,
): any {
  return { addOnPlanConversionAllowed: item["addOnPlanConversionAllowed"] };
}

export function resourceTypeRegistrationPropertiesMarketplaceOptionsDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesMarketplaceOptions {
  return {
    addOnPlanConversionAllowed: item["addOnPlanConversionAllowed"],
  };
}

export function allowedResourceNameArraySerializer(result: Array<AllowedResourceName>): any[] {
  return result.map((item) => {
    return allowedResourceNameSerializer(item);
  });
}

export function allowedResourceNameArrayDeserializer(result: Array<AllowedResourceName>): any[] {
  return result.map((item) => {
    return allowedResourceNameDeserializer(item);
  });
}

/** model interface AllowedResourceName */
export interface AllowedResourceName {
  /** Resource name. */
  name?: string;
  /** Get action verb. */
  getActionVerb?: string;
}

export function allowedResourceNameSerializer(item: AllowedResourceName): any {
  return { name: item["name"], getActionVerb: item["getActionVerb"] };
}

export function allowedResourceNameDeserializer(item: any): AllowedResourceName {
  return {
    name: item["name"],
    getActionVerb: item["getActionVerb"],
  };
}

/** Resource cache options. */
export interface ResourceTypeRegistrationPropertiesResourceCache {
  /** Enable resource cache. */
  enableResourceCache?: boolean;
  /** Resource cache expiration timespan. This is a TimeSpan property. */
  resourceCacheExpirationTimespan?: string;
}

export function resourceTypeRegistrationPropertiesResourceCacheSerializer(
  item: ResourceTypeRegistrationPropertiesResourceCache,
): any {
  return {
    enableResourceCache: item["enableResourceCache"],
    resourceCacheExpirationTimespan: item["resourceCacheExpirationTimespan"],
  };
}

export function resourceTypeRegistrationPropertiesResourceCacheDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesResourceCache {
  return {
    enableResourceCache: item["enableResourceCache"],
    resourceCacheExpirationTimespan: item["resourceCacheExpirationTimespan"],
  };
}

/** Resource query management options. */
export interface ResourceTypeRegistrationPropertiesResourceQueryManagement {
  /** Filter option. */
  filterOption?: FilterOption;
}

export function resourceTypeRegistrationPropertiesResourceQueryManagementSerializer(
  item: ResourceTypeRegistrationPropertiesResourceQueryManagement,
): any {
  return { filterOption: item["filterOption"] };
}

export function resourceTypeRegistrationPropertiesResourceQueryManagementDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesResourceQueryManagement {
  return {
    filterOption: item["filterOption"],
  };
}

/** Filter option. */
export enum KnownFilterOption {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** EnableSubscriptionFilterOnTenant */
  EnableSubscriptionFilterOnTenant = "EnableSubscriptionFilterOnTenant",
}

/**
 * Filter option. \
 * {@link KnownFilterOption} can be used interchangeably with FilterOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **EnableSubscriptionFilterOnTenant**
 */
export type FilterOption = string;

/** Resource management options. */
export interface ResourceTypeRegistrationPropertiesResourceManagementOptions {
  /** Batch provisioning support. */
  batchProvisioningSupport?: ResourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupport;
  /** Delete dependencies. */
  deleteDependencies?: DeleteDependency[];
  /** Nested provisioning support. */
  nestedProvisioningSupport?: ResourceTypeRegistrationPropertiesResourceManagementOptionsNestedProvisioningSupport;
}

export function resourceTypeRegistrationPropertiesResourceManagementOptionsSerializer(
  item: ResourceTypeRegistrationPropertiesResourceManagementOptions,
): any {
  return {
    batchProvisioningSupport: !item["batchProvisioningSupport"]
      ? item["batchProvisioningSupport"]
      : resourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupportSerializer(
          item["batchProvisioningSupport"],
        ),
    deleteDependencies: !item["deleteDependencies"]
      ? item["deleteDependencies"]
      : deleteDependencyArraySerializer(item["deleteDependencies"]),
    nestedProvisioningSupport: !item["nestedProvisioningSupport"]
      ? item["nestedProvisioningSupport"]
      : resourceTypeRegistrationPropertiesResourceManagementOptionsNestedProvisioningSupportSerializer(
          item["nestedProvisioningSupport"],
        ),
  };
}

export function resourceTypeRegistrationPropertiesResourceManagementOptionsDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesResourceManagementOptions {
  return {
    batchProvisioningSupport: !item["batchProvisioningSupport"]
      ? item["batchProvisioningSupport"]
      : resourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupportDeserializer(
          item["batchProvisioningSupport"],
        ),
    deleteDependencies: !item["deleteDependencies"]
      ? item["deleteDependencies"]
      : deleteDependencyArrayDeserializer(item["deleteDependencies"]),
    nestedProvisioningSupport: !item["nestedProvisioningSupport"]
      ? item["nestedProvisioningSupport"]
      : resourceTypeRegistrationPropertiesResourceManagementOptionsNestedProvisioningSupportDeserializer(
          item["nestedProvisioningSupport"],
        ),
  };
}

/** Batch provisioning support. */
export interface ResourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupport {
  /** Supported operations. */
  supportedOperations?: SupportedOperations;
}

export function resourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupportSerializer(
  item: ResourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupport,
): any {
  return { supportedOperations: item["supportedOperations"] };
}

export function resourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupportDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupport {
  return {
    supportedOperations: item["supportedOperations"],
  };
}

/** Supported operations. */
export enum KnownSupportedOperations {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Get */
  Get = "Get",
  /** Delete */
  Delete = "Delete",
}

/**
 * Supported operations. \
 * {@link KnownSupportedOperations} can be used interchangeably with SupportedOperations,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Get** \
 * **Delete**
 */
export type SupportedOperations = string;

export function deleteDependencyArraySerializer(result: Array<DeleteDependency>): any[] {
  return result.map((item) => {
    return deleteDependencySerializer(item);
  });
}

export function deleteDependencyArrayDeserializer(result: Array<DeleteDependency>): any[] {
  return result.map((item) => {
    return deleteDependencyDeserializer(item);
  });
}

/** model interface DeleteDependency */
export interface DeleteDependency {
  /** Required features. */
  requiredFeatures?: string[];
  /** Linked property. */
  linkedProperty?: string;
  /** Linked type. */
  linkedType?: string;
}

export function deleteDependencySerializer(item: DeleteDependency): any {
  return {
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    linkedProperty: item["linkedProperty"],
    linkedType: item["linkedType"],
  };
}

export function deleteDependencyDeserializer(item: any): DeleteDependency {
  return {
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    linkedProperty: item["linkedProperty"],
    linkedType: item["linkedType"],
  };
}

/** Nested provisioning support. */
export interface ResourceTypeRegistrationPropertiesResourceManagementOptionsNestedProvisioningSupport {
  /** Minimum API version. */
  minimumApiVersion?: string;
}

export function resourceTypeRegistrationPropertiesResourceManagementOptionsNestedProvisioningSupportSerializer(
  item: ResourceTypeRegistrationPropertiesResourceManagementOptionsNestedProvisioningSupport,
): any {
  return { minimumApiVersion: item["minimumApiVersion"] };
}

export function resourceTypeRegistrationPropertiesResourceManagementOptionsNestedProvisioningSupportDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesResourceManagementOptionsNestedProvisioningSupport {
  return {
    minimumApiVersion: item["minimumApiVersion"],
  };
}

/** Resource type common attribute management. */
export interface ResourceTypeRegistrationPropertiesResourceTypeCommonAttributeManagement {
  /** Common api versions merge mode. */
  commonApiVersionsMergeMode?: CommonApiVersionsMergeMode;
}

export function resourceTypeRegistrationPropertiesResourceTypeCommonAttributeManagementSerializer(
  item: ResourceTypeRegistrationPropertiesResourceTypeCommonAttributeManagement,
): any {
  return { commonApiVersionsMergeMode: item["commonApiVersionsMergeMode"] };
}

export function resourceTypeRegistrationPropertiesResourceTypeCommonAttributeManagementDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesResourceTypeCommonAttributeManagement {
  return {
    commonApiVersionsMergeMode: item["commonApiVersionsMergeMode"],
  };
}

/** Common api versions merge mode. */
export enum KnownCommonApiVersionsMergeMode {
  /** Merge */
  Merge = "Merge",
  /** Overwrite */
  Overwrite = "Overwrite",
}

/**
 * Common api versions merge mode. \
 * {@link KnownCommonApiVersionsMergeMode} can be used interchangeably with CommonApiVersionsMergeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Merge** \
 * **Overwrite**
 */
export type CommonApiVersionsMergeMode = string;

/** Routing rule. */
export interface ResourceTypeRegistrationPropertiesRoutingRule {
  /** Hosted resource type. */
  hostResourceType?: string;
}

export function resourceTypeRegistrationPropertiesRoutingRuleSerializer(
  item: ResourceTypeRegistrationPropertiesRoutingRule,
): any {
  return { hostResourceType: item["hostResourceType"] };
}

export function resourceTypeRegistrationPropertiesRoutingRuleDeserializer(
  item: any,
): ResourceTypeRegistrationPropertiesRoutingRule {
  return {
    hostResourceType: item["hostResourceType"],
  };
}

/** The frontdoor request mode. */
export enum KnownFrontdoorRequestMode {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** UseManifest */
  UseManifest = "UseManifest",
}

/**
 * The frontdoor request mode. \
 * {@link KnownFrontdoorRequestMode} can be used interchangeably with FrontdoorRequestMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **UseManifest**
 */
export type FrontdoorRequestMode = string;

/** The resource sub type. */
export enum KnownResourceSubType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** AsyncOperation */
  AsyncOperation = "AsyncOperation",
}

/**
 * The resource sub type. \
 * {@link KnownResourceSubType} can be used interchangeably with ResourceSubType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **AsyncOperation**
 */
export type ResourceSubType = string;

/** Resource type registration kind. This Metadata is also used by portal/tooling/etc to render different UX experiences for resources of the same type. */
export enum KnownResourceTypeRegistrationKind {
  /** Resource type served by the ProviderHub service. */
  Managed = "Managed",
  /** Resource type served by both the ProviderHub & the onboarded Resource Provider Services (i.e. The type has a mix of managed and direct endpoints). */
  Hybrid = "Hybrid",
  /** Resource type served by the onboarded Resource Provider Service. */
  Direct = "Direct",
}

/**
 * Resource type registration kind. This Metadata is also used by portal/tooling/etc to render different UX experiences for resources of the same type. \
 * {@link KnownResourceTypeRegistrationKind} can be used interchangeably with ResourceTypeRegistrationKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed**: Resource type served by the ProviderHub service. \
 * **Hybrid**: Resource type served by both the ProviderHub & the onboarded Resource Provider Services (i.e. The type has a mix of managed and direct endpoints). \
 * **Direct**: Resource type served by the onboarded Resource Provider Service.
 */
export type ResourceTypeRegistrationKind = string;

/** model interface TrafficRegions */
export interface TrafficRegions {
  regions?: string[];
}

export function trafficRegionsSerializer(item: TrafficRegions): any {
  return {
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

export function trafficRegionsDeserializer(item: any): TrafficRegions {
  return {
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface ProviderRegistration extends ProxyResource {
  properties?: ProviderRegistrationProperties;
  /** Provider registration kind. This Metadata is also used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: ProviderRegistrationKind;
}

export function providerRegistrationSerializer(item: ProviderRegistration): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : providerRegistrationPropertiesSerializer(item["properties"]),
    kind: item["kind"],
  };
}

export function providerRegistrationDeserializer(item: any): ProviderRegistration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : providerRegistrationPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
  };
}

/** model interface ProviderRegistrationProperties */
export interface ProviderRegistrationProperties extends ResourceProviderManifestProperties {
  /** The provider hub metadata. */
  providerHubMetadata?: ProviderRegistrationPropertiesProviderHubMetadata;
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** The subscription lifecycle notification specifications. */
  subscriptionLifecycleNotificationSpecifications?: ProviderRegistrationPropertiesSubscriptionLifecycleNotificationSpecifications;
  /** The private resource provider configuration. */
  privateResourceProviderConfiguration?: ProviderRegistrationPropertiesPrivateResourceProviderConfiguration;
  /** The token auth configuration. */
  tokenAuthConfiguration?: TokenAuthConfiguration;
}

export function providerRegistrationPropertiesSerializer(
  item: ProviderRegistrationProperties,
): any {
  return {
    providerAuthentication: !item["providerAuthentication"]
      ? item["providerAuthentication"]
      : resourceProviderManifestPropertiesProviderAuthenticationSerializer(
          item["providerAuthentication"],
        ),
    providerAuthorizations: !item["providerAuthorizations"]
      ? item["providerAuthorizations"]
      : resourceProviderAuthorizationArraySerializer(item["providerAuthorizations"]),
    namespace: item["namespace"],
    services: !item["services"]
      ? item["services"]
      : resourceProviderServiceArraySerializer(item["services"]),
    serviceName: item["serviceName"],
    providerVersion: item["providerVersion"],
    providerType: item["providerType"],
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceProviderManifestPropertiesFeaturesRuleSerializer(item["featuresRule"]),
    requestHeaderOptions: !item["requestHeaderOptions"]
      ? item["requestHeaderOptions"]
      : resourceProviderManifestPropertiesRequestHeaderOptionsSerializer(
          item["requestHeaderOptions"],
        ),
    management: !item["management"]
      ? item["management"]
      : resourceProviderManifestPropertiesManagementSerializer(item["management"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : resourceProviderCapabilitiesArraySerializer(item["capabilities"]),
    crossTenantTokenValidation: item["crossTenantTokenValidation"],
    metadata: item["metadata"],
    templateDeploymentOptions: !item["templateDeploymentOptions"]
      ? item["templateDeploymentOptions"]
      : resourceProviderManifestPropertiesTemplateDeploymentOptionsSerializer(
          item["templateDeploymentOptions"],
        ),
    globalNotificationEndpoints: !item["globalNotificationEndpoints"]
      ? item["globalNotificationEndpoints"]
      : resourceProviderEndpointArraySerializer(item["globalNotificationEndpoints"]),
    enableTenantLinkedNotification: item["enableTenantLinkedNotification"],
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArraySerializer(item["notifications"]),
    linkedNotificationRules: !item["linkedNotificationRules"]
      ? item["linkedNotificationRules"]
      : fanoutLinkedNotificationRuleArraySerializer(item["linkedNotificationRules"]),
    resourceProviderAuthorizationRules: !item["resourceProviderAuthorizationRules"]
      ? item["resourceProviderAuthorizationRules"]
      : resourceProviderAuthorizationRulesSerializer(item["resourceProviderAuthorizationRules"]),
    dstsConfiguration: !item["dstsConfiguration"]
      ? item["dstsConfiguration"]
      : resourceProviderManifestPropertiesDstsConfigurationSerializer(item["dstsConfiguration"]),
    notificationOptions: item["notificationOptions"],
    resourceHydrationAccounts: !item["resourceHydrationAccounts"]
      ? item["resourceHydrationAccounts"]
      : resourceHydrationAccountArraySerializer(item["resourceHydrationAccounts"]),
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : resourceProviderManifestPropertiesNotificationSettingsSerializer(
          item["notificationSettings"],
        ),
    managementGroupGlobalNotificationEndpoints: !item["managementGroupGlobalNotificationEndpoints"]
      ? item["managementGroupGlobalNotificationEndpoints"]
      : resourceProviderEndpointArraySerializer(item["managementGroupGlobalNotificationEndpoints"]),
    optionalFeatures: !item["optionalFeatures"]
      ? item["optionalFeatures"]
      : item["optionalFeatures"].map((p: any) => {
          return p;
        }),
    resourceGroupLockOptionDuringMove: !item["resourceGroupLockOptionDuringMove"]
      ? item["resourceGroupLockOptionDuringMove"]
      : resourceProviderManifestPropertiesResourceGroupLockOptionDuringMoveSerializer(
          item["resourceGroupLockOptionDuringMove"],
        ),
    responseOptions: !item["responseOptions"]
      ? item["responseOptions"]
      : resourceProviderManifestPropertiesResponseOptionsSerializer(item["responseOptions"]),
    legacyNamespace: item["legacyNamespace"],
    legacyRegistrations: !item["legacyRegistrations"]
      ? item["legacyRegistrations"]
      : item["legacyRegistrations"].map((p: any) => {
          return p;
        }),
    customManifestVersion: item["customManifestVersion"],
    providerHubMetadata: !item["providerHubMetadata"]
      ? item["providerHubMetadata"]
      : providerRegistrationPropertiesProviderHubMetadataSerializer(item["providerHubMetadata"]),
    subscriptionLifecycleNotificationSpecifications: !item[
      "subscriptionLifecycleNotificationSpecifications"
    ]
      ? item["subscriptionLifecycleNotificationSpecifications"]
      : providerRegistrationPropertiesSubscriptionLifecycleNotificationSpecificationsSerializer(
          item["subscriptionLifecycleNotificationSpecifications"],
        ),
    privateResourceProviderConfiguration: !item["privateResourceProviderConfiguration"]
      ? item["privateResourceProviderConfiguration"]
      : providerRegistrationPropertiesPrivateResourceProviderConfigurationSerializer(
          item["privateResourceProviderConfiguration"],
        ),
    tokenAuthConfiguration: !item["tokenAuthConfiguration"]
      ? item["tokenAuthConfiguration"]
      : tokenAuthConfigurationSerializer(item["tokenAuthConfiguration"]),
  };
}

export function providerRegistrationPropertiesDeserializer(
  item: any,
): ProviderRegistrationProperties {
  return {
    providerAuthentication: !item["providerAuthentication"]
      ? item["providerAuthentication"]
      : resourceProviderManifestPropertiesProviderAuthenticationDeserializer(
          item["providerAuthentication"],
        ),
    providerAuthorizations: !item["providerAuthorizations"]
      ? item["providerAuthorizations"]
      : resourceProviderAuthorizationArrayDeserializer(item["providerAuthorizations"]),
    namespace: item["namespace"],
    services: !item["services"]
      ? item["services"]
      : resourceProviderServiceArrayDeserializer(item["services"]),
    serviceName: item["serviceName"],
    providerVersion: item["providerVersion"],
    providerType: item["providerType"],
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceProviderManifestPropertiesFeaturesRuleDeserializer(item["featuresRule"]),
    requestHeaderOptions: !item["requestHeaderOptions"]
      ? item["requestHeaderOptions"]
      : resourceProviderManifestPropertiesRequestHeaderOptionsDeserializer(
          item["requestHeaderOptions"],
        ),
    management: !item["management"]
      ? item["management"]
      : resourceProviderManifestPropertiesManagementDeserializer(item["management"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : resourceProviderCapabilitiesArrayDeserializer(item["capabilities"]),
    crossTenantTokenValidation: item["crossTenantTokenValidation"],
    metadata: item["metadata"],
    templateDeploymentOptions: !item["templateDeploymentOptions"]
      ? item["templateDeploymentOptions"]
      : resourceProviderManifestPropertiesTemplateDeploymentOptionsDeserializer(
          item["templateDeploymentOptions"],
        ),
    globalNotificationEndpoints: !item["globalNotificationEndpoints"]
      ? item["globalNotificationEndpoints"]
      : resourceProviderEndpointArrayDeserializer(item["globalNotificationEndpoints"]),
    enableTenantLinkedNotification: item["enableTenantLinkedNotification"],
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArrayDeserializer(item["notifications"]),
    linkedNotificationRules: !item["linkedNotificationRules"]
      ? item["linkedNotificationRules"]
      : fanoutLinkedNotificationRuleArrayDeserializer(item["linkedNotificationRules"]),
    resourceProviderAuthorizationRules: !item["resourceProviderAuthorizationRules"]
      ? item["resourceProviderAuthorizationRules"]
      : resourceProviderAuthorizationRulesDeserializer(item["resourceProviderAuthorizationRules"]),
    dstsConfiguration: !item["dstsConfiguration"]
      ? item["dstsConfiguration"]
      : resourceProviderManifestPropertiesDstsConfigurationDeserializer(item["dstsConfiguration"]),
    notificationOptions: item["notificationOptions"],
    resourceHydrationAccounts: !item["resourceHydrationAccounts"]
      ? item["resourceHydrationAccounts"]
      : resourceHydrationAccountArrayDeserializer(item["resourceHydrationAccounts"]),
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : resourceProviderManifestPropertiesNotificationSettingsDeserializer(
          item["notificationSettings"],
        ),
    managementGroupGlobalNotificationEndpoints: !item["managementGroupGlobalNotificationEndpoints"]
      ? item["managementGroupGlobalNotificationEndpoints"]
      : resourceProviderEndpointArrayDeserializer(
          item["managementGroupGlobalNotificationEndpoints"],
        ),
    optionalFeatures: !item["optionalFeatures"]
      ? item["optionalFeatures"]
      : item["optionalFeatures"].map((p: any) => {
          return p;
        }),
    resourceGroupLockOptionDuringMove: !item["resourceGroupLockOptionDuringMove"]
      ? item["resourceGroupLockOptionDuringMove"]
      : resourceProviderManifestPropertiesResourceGroupLockOptionDuringMoveDeserializer(
          item["resourceGroupLockOptionDuringMove"],
        ),
    responseOptions: !item["responseOptions"]
      ? item["responseOptions"]
      : resourceProviderManifestPropertiesResponseOptionsDeserializer(item["responseOptions"]),
    legacyNamespace: item["legacyNamespace"],
    legacyRegistrations: !item["legacyRegistrations"]
      ? item["legacyRegistrations"]
      : item["legacyRegistrations"].map((p: any) => {
          return p;
        }),
    customManifestVersion: item["customManifestVersion"],
    providerHubMetadata: !item["providerHubMetadata"]
      ? item["providerHubMetadata"]
      : providerRegistrationPropertiesProviderHubMetadataDeserializer(item["providerHubMetadata"]),
    provisioningState: item["provisioningState"],
    subscriptionLifecycleNotificationSpecifications: !item[
      "subscriptionLifecycleNotificationSpecifications"
    ]
      ? item["subscriptionLifecycleNotificationSpecifications"]
      : providerRegistrationPropertiesSubscriptionLifecycleNotificationSpecificationsDeserializer(
          item["subscriptionLifecycleNotificationSpecifications"],
        ),
    privateResourceProviderConfiguration: !item["privateResourceProviderConfiguration"]
      ? item["privateResourceProviderConfiguration"]
      : providerRegistrationPropertiesPrivateResourceProviderConfigurationDeserializer(
          item["privateResourceProviderConfiguration"],
        ),
    tokenAuthConfiguration: !item["tokenAuthConfiguration"]
      ? item["tokenAuthConfiguration"]
      : tokenAuthConfigurationDeserializer(item["tokenAuthConfiguration"]),
  };
}

/** The provider hub metadata. */
export interface ProviderRegistrationPropertiesProviderHubMetadata extends ProviderHubMetadata {}

export function providerRegistrationPropertiesProviderHubMetadataSerializer(
  item: ProviderRegistrationPropertiesProviderHubMetadata,
): any {
  return {
    providerAuthorizations: !item["providerAuthorizations"]
      ? item["providerAuthorizations"]
      : resourceProviderAuthorizationArraySerializer(item["providerAuthorizations"]),
    providerAuthentication: !item["providerAuthentication"]
      ? item["providerAuthentication"]
      : providerHubMetadataProviderAuthenticationSerializer(item["providerAuthentication"]),
    thirdPartyProviderAuthorization: !item["thirdPartyProviderAuthorization"]
      ? item["thirdPartyProviderAuthorization"]
      : providerHubMetadataThirdPartyProviderAuthorizationSerializer(
          item["thirdPartyProviderAuthorization"],
        ),
    directRpRoleDefinitionId: item["directRpRoleDefinitionId"],
    regionalAsyncOperationResourceTypeName: item["regionalAsyncOperationResourceTypeName"],
    globalAsyncOperationResourceTypeName: item["globalAsyncOperationResourceTypeName"],
  };
}

export function providerRegistrationPropertiesProviderHubMetadataDeserializer(
  item: any,
): ProviderRegistrationPropertiesProviderHubMetadata {
  return {
    providerAuthorizations: !item["providerAuthorizations"]
      ? item["providerAuthorizations"]
      : resourceProviderAuthorizationArrayDeserializer(item["providerAuthorizations"]),
    providerAuthentication: !item["providerAuthentication"]
      ? item["providerAuthentication"]
      : providerHubMetadataProviderAuthenticationDeserializer(item["providerAuthentication"]),
    thirdPartyProviderAuthorization: !item["thirdPartyProviderAuthorization"]
      ? item["thirdPartyProviderAuthorization"]
      : providerHubMetadataThirdPartyProviderAuthorizationDeserializer(
          item["thirdPartyProviderAuthorization"],
        ),
    directRpRoleDefinitionId: item["directRpRoleDefinitionId"],
    regionalAsyncOperationResourceTypeName: item["regionalAsyncOperationResourceTypeName"],
    globalAsyncOperationResourceTypeName: item["globalAsyncOperationResourceTypeName"],
  };
}

/** The subscription lifecycle notification specifications. */
export interface ProviderRegistrationPropertiesSubscriptionLifecycleNotificationSpecifications extends SubscriptionLifecycleNotificationSpecifications {}

export function providerRegistrationPropertiesSubscriptionLifecycleNotificationSpecificationsSerializer(
  item: ProviderRegistrationPropertiesSubscriptionLifecycleNotificationSpecifications,
): any {
  return {
    subscriptionStateOverrideActions: !item["subscriptionStateOverrideActions"]
      ? item["subscriptionStateOverrideActions"]
      : subscriptionStateOverrideActionArraySerializer(item["subscriptionStateOverrideActions"]),
    softDeleteTTL: item["softDeleteTTL"],
  };
}

export function providerRegistrationPropertiesSubscriptionLifecycleNotificationSpecificationsDeserializer(
  item: any,
): ProviderRegistrationPropertiesSubscriptionLifecycleNotificationSpecifications {
  return {
    subscriptionStateOverrideActions: !item["subscriptionStateOverrideActions"]
      ? item["subscriptionStateOverrideActions"]
      : subscriptionStateOverrideActionArrayDeserializer(item["subscriptionStateOverrideActions"]),
    softDeleteTTL: item["softDeleteTTL"],
  };
}

/** The private resource provider configuration. */
export interface ProviderRegistrationPropertiesPrivateResourceProviderConfiguration extends PrivateResourceProviderConfiguration {}

export function providerRegistrationPropertiesPrivateResourceProviderConfigurationSerializer(
  item: ProviderRegistrationPropertiesPrivateResourceProviderConfiguration,
): any {
  return {
    allowedSubscriptions: !item["allowedSubscriptions"]
      ? item["allowedSubscriptions"]
      : item["allowedSubscriptions"].map((p: any) => {
          return p;
        }),
  };
}

export function providerRegistrationPropertiesPrivateResourceProviderConfigurationDeserializer(
  item: any,
): ProviderRegistrationPropertiesPrivateResourceProviderConfiguration {
  return {
    allowedSubscriptions: !item["allowedSubscriptions"]
      ? item["allowedSubscriptions"]
      : item["allowedSubscriptions"].map((p: any) => {
          return p;
        }),
  };
}

/** Provider registration kind. This Metadata is also used by portal/tooling/etc to render different UX experiences for resources of the same type. */
export enum KnownProviderRegistrationKind {
  /** Resource Provider with all the resource types 'managed' by the ProviderHub service. */
  Managed = "Managed",
  /** Resource Provider with a mix of 'managed' and 'direct' resource types. */
  Hybrid = "Hybrid",
  /** Resource Provider with all the resource types 'managed' on by itself. */
  Direct = "Direct",
}

/**
 * Provider registration kind. This Metadata is also used by portal/tooling/etc to render different UX experiences for resources of the same type. \
 * {@link KnownProviderRegistrationKind} can be used interchangeably with ProviderRegistrationKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed**: Resource Provider with all the resource types 'managed' by the ProviderHub service. \
 * **Hybrid**: Resource Provider with a mix of 'managed' and 'direct' resource types. \
 * **Direct**: Resource Provider with all the resource types 'managed' on by itself.
 */
export type ProviderRegistrationKind = string;

/** model interface ProviderHubMetadata */
export interface ProviderHubMetadata {
  /** The provider authorizations. */
  providerAuthorizations?: ResourceProviderAuthorization[];
  /** The provider authentication. */
  providerAuthentication?: ProviderHubMetadataProviderAuthentication;
  /** The third party provider authorization. */
  thirdPartyProviderAuthorization?: ProviderHubMetadataThirdPartyProviderAuthorization;
  /** The direct RP role definition id. */
  directRpRoleDefinitionId?: string;
  /** The regional async operation resource type name. */
  regionalAsyncOperationResourceTypeName?: string;
  /** The global async operation resource type name. */
  globalAsyncOperationResourceTypeName?: string;
}

export function providerHubMetadataSerializer(item: ProviderHubMetadata): any {
  return {
    providerAuthorizations: !item["providerAuthorizations"]
      ? item["providerAuthorizations"]
      : resourceProviderAuthorizationArraySerializer(item["providerAuthorizations"]),
    providerAuthentication: !item["providerAuthentication"]
      ? item["providerAuthentication"]
      : providerHubMetadataProviderAuthenticationSerializer(item["providerAuthentication"]),
    thirdPartyProviderAuthorization: !item["thirdPartyProviderAuthorization"]
      ? item["thirdPartyProviderAuthorization"]
      : providerHubMetadataThirdPartyProviderAuthorizationSerializer(
          item["thirdPartyProviderAuthorization"],
        ),
    directRpRoleDefinitionId: item["directRpRoleDefinitionId"],
    regionalAsyncOperationResourceTypeName: item["regionalAsyncOperationResourceTypeName"],
    globalAsyncOperationResourceTypeName: item["globalAsyncOperationResourceTypeName"],
  };
}

export function providerHubMetadataDeserializer(item: any): ProviderHubMetadata {
  return {
    providerAuthorizations: !item["providerAuthorizations"]
      ? item["providerAuthorizations"]
      : resourceProviderAuthorizationArrayDeserializer(item["providerAuthorizations"]),
    providerAuthentication: !item["providerAuthentication"]
      ? item["providerAuthentication"]
      : providerHubMetadataProviderAuthenticationDeserializer(item["providerAuthentication"]),
    thirdPartyProviderAuthorization: !item["thirdPartyProviderAuthorization"]
      ? item["thirdPartyProviderAuthorization"]
      : providerHubMetadataThirdPartyProviderAuthorizationDeserializer(
          item["thirdPartyProviderAuthorization"],
        ),
    directRpRoleDefinitionId: item["directRpRoleDefinitionId"],
    regionalAsyncOperationResourceTypeName: item["regionalAsyncOperationResourceTypeName"],
    globalAsyncOperationResourceTypeName: item["globalAsyncOperationResourceTypeName"],
  };
}

/** The provider authentication. */
export interface ProviderHubMetadataProviderAuthentication extends ResourceProviderAuthentication {}

export function providerHubMetadataProviderAuthenticationSerializer(
  item: ProviderHubMetadataProviderAuthentication,
): any {
  return {
    allowedAudiences: item["allowedAudiences"].map((p: any) => {
      return p;
    }),
  };
}

export function providerHubMetadataProviderAuthenticationDeserializer(
  item: any,
): ProviderHubMetadataProviderAuthentication {
  return {
    allowedAudiences: item["allowedAudiences"].map((p: any) => {
      return p;
    }),
  };
}

/** The third party provider authorization. */
export interface ProviderHubMetadataThirdPartyProviderAuthorization extends ThirdPartyProviderAuthorization {}

export function providerHubMetadataThirdPartyProviderAuthorizationSerializer(
  item: ProviderHubMetadataThirdPartyProviderAuthorization,
): any {
  return {
    authorizations: !item["authorizations"]
      ? item["authorizations"]
      : lightHouseAuthorizationArraySerializer(item["authorizations"]),
    managedByTenantId: item["managedByTenantId"],
  };
}

export function providerHubMetadataThirdPartyProviderAuthorizationDeserializer(
  item: any,
): ProviderHubMetadataThirdPartyProviderAuthorization {
  return {
    authorizations: !item["authorizations"]
      ? item["authorizations"]
      : lightHouseAuthorizationArrayDeserializer(item["authorizations"]),
    managedByTenantId: item["managedByTenantId"],
  };
}

/** model interface ThirdPartyProviderAuthorization */
export interface ThirdPartyProviderAuthorization {
  /** The authorizations. */
  authorizations?: LightHouseAuthorization[];
  /** The managed by tenant id. */
  managedByTenantId?: string;
}

export function thirdPartyProviderAuthorizationSerializer(
  item: ThirdPartyProviderAuthorization,
): any {
  return {
    authorizations: !item["authorizations"]
      ? item["authorizations"]
      : lightHouseAuthorizationArraySerializer(item["authorizations"]),
    managedByTenantId: item["managedByTenantId"],
  };
}

export function thirdPartyProviderAuthorizationDeserializer(
  item: any,
): ThirdPartyProviderAuthorization {
  return {
    authorizations: !item["authorizations"]
      ? item["authorizations"]
      : lightHouseAuthorizationArrayDeserializer(item["authorizations"]),
    managedByTenantId: item["managedByTenantId"],
  };
}

export function lightHouseAuthorizationArraySerializer(
  result: Array<LightHouseAuthorization>,
): any[] {
  return result.map((item) => {
    return lightHouseAuthorizationSerializer(item);
  });
}

export function lightHouseAuthorizationArrayDeserializer(
  result: Array<LightHouseAuthorization>,
): any[] {
  return result.map((item) => {
    return lightHouseAuthorizationDeserializer(item);
  });
}

/** model interface LightHouseAuthorization */
export interface LightHouseAuthorization {
  /** The principal id. */
  principalId: string;
  /** The role definition id. */
  roleDefinitionId: string;
}

export function lightHouseAuthorizationSerializer(item: LightHouseAuthorization): any {
  return { principalId: item["principalId"], roleDefinitionId: item["roleDefinitionId"] };
}

export function lightHouseAuthorizationDeserializer(item: any): LightHouseAuthorization {
  return {
    principalId: item["principalId"],
    roleDefinitionId: item["roleDefinitionId"],
  };
}

/** model interface SubscriptionLifecycleNotificationSpecifications */
export interface SubscriptionLifecycleNotificationSpecifications {
  /** The subscription state override actions. */
  subscriptionStateOverrideActions?: SubscriptionStateOverrideAction[];
  /** The soft delete TTL. */
  softDeleteTTL?: string;
}

export function subscriptionLifecycleNotificationSpecificationsSerializer(
  item: SubscriptionLifecycleNotificationSpecifications,
): any {
  return {
    subscriptionStateOverrideActions: !item["subscriptionStateOverrideActions"]
      ? item["subscriptionStateOverrideActions"]
      : subscriptionStateOverrideActionArraySerializer(item["subscriptionStateOverrideActions"]),
    softDeleteTTL: item["softDeleteTTL"],
  };
}

export function subscriptionLifecycleNotificationSpecificationsDeserializer(
  item: any,
): SubscriptionLifecycleNotificationSpecifications {
  return {
    subscriptionStateOverrideActions: !item["subscriptionStateOverrideActions"]
      ? item["subscriptionStateOverrideActions"]
      : subscriptionStateOverrideActionArrayDeserializer(item["subscriptionStateOverrideActions"]),
    softDeleteTTL: item["softDeleteTTL"],
  };
}

export function subscriptionStateOverrideActionArraySerializer(
  result: Array<SubscriptionStateOverrideAction>,
): any[] {
  return result.map((item) => {
    return subscriptionStateOverrideActionSerializer(item);
  });
}

export function subscriptionStateOverrideActionArrayDeserializer(
  result: Array<SubscriptionStateOverrideAction>,
): any[] {
  return result.map((item) => {
    return subscriptionStateOverrideActionDeserializer(item);
  });
}

/** model interface SubscriptionStateOverrideAction */
export interface SubscriptionStateOverrideAction {
  /** The state. */
  state: SubscriptionTransitioningState;
  /** The action. */
  action: SubscriptionNotificationOperation;
}

export function subscriptionStateOverrideActionSerializer(
  item: SubscriptionStateOverrideAction,
): any {
  return { state: item["state"], action: item["action"] };
}

export function subscriptionStateOverrideActionDeserializer(
  item: any,
): SubscriptionStateOverrideAction {
  return {
    state: item["state"],
    action: item["action"],
  };
}

/** The state. */
export enum KnownSubscriptionTransitioningState {
  /** Registered */
  Registered = "Registered",
  /** Unregistered */
  Unregistered = "Unregistered",
  /** Warned */
  Warned = "Warned",
  /** Suspended */
  Suspended = "Suspended",
  /** Deleted */
  Deleted = "Deleted",
  /** WarnedToRegistered */
  WarnedToRegistered = "WarnedToRegistered",
  /** WarnedToSuspended */
  WarnedToSuspended = "WarnedToSuspended",
  /** WarnedToDeleted */
  WarnedToDeleted = "WarnedToDeleted",
  /** WarnedToUnregistered */
  WarnedToUnregistered = "WarnedToUnregistered",
  /** SuspendedToRegistered */
  SuspendedToRegistered = "SuspendedToRegistered",
  /** SuspendedToWarned */
  SuspendedToWarned = "SuspendedToWarned",
  /** SuspendedToDeleted */
  SuspendedToDeleted = "SuspendedToDeleted",
  /** SuspendedToUnregistered */
  SuspendedToUnregistered = "SuspendedToUnregistered",
}

/**
 * The state. \
 * {@link KnownSubscriptionTransitioningState} can be used interchangeably with SubscriptionTransitioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Registered** \
 * **Unregistered** \
 * **Warned** \
 * **Suspended** \
 * **Deleted** \
 * **WarnedToRegistered** \
 * **WarnedToSuspended** \
 * **WarnedToDeleted** \
 * **WarnedToUnregistered** \
 * **SuspendedToRegistered** \
 * **SuspendedToWarned** \
 * **SuspendedToDeleted** \
 * **SuspendedToUnregistered**
 */
export type SubscriptionTransitioningState = string;

/** The action. */
export enum KnownSubscriptionNotificationOperation {
  /** NotDefined */
  NotDefined = "NotDefined",
  /** DeleteAllResources */
  DeleteAllResources = "DeleteAllResources",
  /** SoftDeleteAllResources */
  SoftDeleteAllResources = "SoftDeleteAllResources",
  /** NoOp */
  NoOp = "NoOp",
  /** BillingCancellation */
  BillingCancellation = "BillingCancellation",
  /** UndoSoftDelete */
  UndoSoftDelete = "UndoSoftDelete",
}

/**
 * The action. \
 * {@link KnownSubscriptionNotificationOperation} can be used interchangeably with SubscriptionNotificationOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotDefined** \
 * **DeleteAllResources** \
 * **SoftDeleteAllResources** \
 * **NoOp** \
 * **BillingCancellation** \
 * **UndoSoftDelete**
 */
export type SubscriptionNotificationOperation = string;

/** model interface PrivateResourceProviderConfiguration */
export interface PrivateResourceProviderConfiguration {
  /** The allowed subscriptions. */
  allowedSubscriptions?: string[];
}

export function privateResourceProviderConfigurationSerializer(
  item: PrivateResourceProviderConfiguration,
): any {
  return {
    allowedSubscriptions: !item["allowedSubscriptions"]
      ? item["allowedSubscriptions"]
      : item["allowedSubscriptions"].map((p: any) => {
          return p;
        }),
  };
}

export function privateResourceProviderConfigurationDeserializer(
  item: any,
): PrivateResourceProviderConfiguration {
  return {
    allowedSubscriptions: !item["allowedSubscriptions"]
      ? item["allowedSubscriptions"]
      : item["allowedSubscriptions"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface ResourceProviderManifestProperties */
export interface ResourceProviderManifestProperties {
  /** The provider authentication. */
  providerAuthentication?: ResourceProviderManifestPropertiesProviderAuthentication;
  /** The provider authorizations. */
  providerAuthorizations?: ResourceProviderAuthorization[];
  /** The namespace. */
  namespace?: string;
  /** The services. */
  services?: ResourceProviderService[];
  /** The service name. */
  serviceName?: string;
  /** The provider version. */
  providerVersion?: string;
  /** The provider type. */
  providerType?: ResourceProviderType;
  /** The required features. */
  requiredFeatures?: string[];
  /** The features rule. */
  featuresRule?: ResourceProviderManifestPropertiesFeaturesRule;
  /** The request header options. */
  requestHeaderOptions?: ResourceProviderManifestPropertiesRequestHeaderOptions;
  /** The resource provider management. */
  management?: ResourceProviderManifestPropertiesManagement;
  /** The capabilities. */
  capabilities?: ResourceProviderCapabilities[];
  /** The cross tenant token validation. */
  crossTenantTokenValidation?: CrossTenantTokenValidation;
  /** The metadata. */
  metadata?: any;
  /** The template deployment options. */
  templateDeploymentOptions?: ResourceProviderManifestPropertiesTemplateDeploymentOptions;
  /** The global notification endpoints. */
  globalNotificationEndpoints?: ResourceProviderEndpoint[];
  /** The enable tenant linked notification. */
  enableTenantLinkedNotification?: boolean;
  /** The notifications. */
  notifications?: Notification[];
  /** The linked notification rules. */
  linkedNotificationRules?: FanoutLinkedNotificationRule[];
  /** The resource provider authorization rules. */
  resourceProviderAuthorizationRules?: ResourceProviderAuthorizationRules;
  /** The dsts configuration. */
  dstsConfiguration?: ResourceProviderManifestPropertiesDstsConfiguration;
  /** Notification options. */
  notificationOptions?: NotificationOptions;
  /** resource hydration accounts */
  resourceHydrationAccounts?: ResourceHydrationAccount[];
  /** Notification settings. */
  notificationSettings?: ResourceProviderManifestPropertiesNotificationSettings;
  /** Management groups global notification endpoints. */
  managementGroupGlobalNotificationEndpoints?: ResourceProviderEndpoint[];
  /** Optional features. */
  optionalFeatures?: string[];
  /** Resource group lock option during move. */
  resourceGroupLockOptionDuringMove?: ResourceProviderManifestPropertiesResourceGroupLockOptionDuringMove;
  /** Response options. */
  responseOptions?: ResourceProviderManifestPropertiesResponseOptions;
  /** Legacy namespace. */
  legacyNamespace?: string;
  /** Legacy registrations. */
  legacyRegistrations?: string[];
  /** Custom manifest version. */
  customManifestVersion?: string;
}

export function resourceProviderManifestPropertiesSerializer(
  item: ResourceProviderManifestProperties,
): any {
  return {
    providerAuthentication: !item["providerAuthentication"]
      ? item["providerAuthentication"]
      : resourceProviderManifestPropertiesProviderAuthenticationSerializer(
          item["providerAuthentication"],
        ),
    providerAuthorizations: !item["providerAuthorizations"]
      ? item["providerAuthorizations"]
      : resourceProviderAuthorizationArraySerializer(item["providerAuthorizations"]),
    namespace: item["namespace"],
    services: !item["services"]
      ? item["services"]
      : resourceProviderServiceArraySerializer(item["services"]),
    serviceName: item["serviceName"],
    providerVersion: item["providerVersion"],
    providerType: item["providerType"],
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceProviderManifestPropertiesFeaturesRuleSerializer(item["featuresRule"]),
    requestHeaderOptions: !item["requestHeaderOptions"]
      ? item["requestHeaderOptions"]
      : resourceProviderManifestPropertiesRequestHeaderOptionsSerializer(
          item["requestHeaderOptions"],
        ),
    management: !item["management"]
      ? item["management"]
      : resourceProviderManifestPropertiesManagementSerializer(item["management"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : resourceProviderCapabilitiesArraySerializer(item["capabilities"]),
    crossTenantTokenValidation: item["crossTenantTokenValidation"],
    metadata: item["metadata"],
    templateDeploymentOptions: !item["templateDeploymentOptions"]
      ? item["templateDeploymentOptions"]
      : resourceProviderManifestPropertiesTemplateDeploymentOptionsSerializer(
          item["templateDeploymentOptions"],
        ),
    globalNotificationEndpoints: !item["globalNotificationEndpoints"]
      ? item["globalNotificationEndpoints"]
      : resourceProviderEndpointArraySerializer(item["globalNotificationEndpoints"]),
    enableTenantLinkedNotification: item["enableTenantLinkedNotification"],
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArraySerializer(item["notifications"]),
    linkedNotificationRules: !item["linkedNotificationRules"]
      ? item["linkedNotificationRules"]
      : fanoutLinkedNotificationRuleArraySerializer(item["linkedNotificationRules"]),
    resourceProviderAuthorizationRules: !item["resourceProviderAuthorizationRules"]
      ? item["resourceProviderAuthorizationRules"]
      : resourceProviderAuthorizationRulesSerializer(item["resourceProviderAuthorizationRules"]),
    dstsConfiguration: !item["dstsConfiguration"]
      ? item["dstsConfiguration"]
      : resourceProviderManifestPropertiesDstsConfigurationSerializer(item["dstsConfiguration"]),
    notificationOptions: item["notificationOptions"],
    resourceHydrationAccounts: !item["resourceHydrationAccounts"]
      ? item["resourceHydrationAccounts"]
      : resourceHydrationAccountArraySerializer(item["resourceHydrationAccounts"]),
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : resourceProviderManifestPropertiesNotificationSettingsSerializer(
          item["notificationSettings"],
        ),
    managementGroupGlobalNotificationEndpoints: !item["managementGroupGlobalNotificationEndpoints"]
      ? item["managementGroupGlobalNotificationEndpoints"]
      : resourceProviderEndpointArraySerializer(item["managementGroupGlobalNotificationEndpoints"]),
    optionalFeatures: !item["optionalFeatures"]
      ? item["optionalFeatures"]
      : item["optionalFeatures"].map((p: any) => {
          return p;
        }),
    resourceGroupLockOptionDuringMove: !item["resourceGroupLockOptionDuringMove"]
      ? item["resourceGroupLockOptionDuringMove"]
      : resourceProviderManifestPropertiesResourceGroupLockOptionDuringMoveSerializer(
          item["resourceGroupLockOptionDuringMove"],
        ),
    responseOptions: !item["responseOptions"]
      ? item["responseOptions"]
      : resourceProviderManifestPropertiesResponseOptionsSerializer(item["responseOptions"]),
    legacyNamespace: item["legacyNamespace"],
    legacyRegistrations: !item["legacyRegistrations"]
      ? item["legacyRegistrations"]
      : item["legacyRegistrations"].map((p: any) => {
          return p;
        }),
    customManifestVersion: item["customManifestVersion"],
  };
}

export function resourceProviderManifestPropertiesDeserializer(
  item: any,
): ResourceProviderManifestProperties {
  return {
    providerAuthentication: !item["providerAuthentication"]
      ? item["providerAuthentication"]
      : resourceProviderManifestPropertiesProviderAuthenticationDeserializer(
          item["providerAuthentication"],
        ),
    providerAuthorizations: !item["providerAuthorizations"]
      ? item["providerAuthorizations"]
      : resourceProviderAuthorizationArrayDeserializer(item["providerAuthorizations"]),
    namespace: item["namespace"],
    services: !item["services"]
      ? item["services"]
      : resourceProviderServiceArrayDeserializer(item["services"]),
    serviceName: item["serviceName"],
    providerVersion: item["providerVersion"],
    providerType: item["providerType"],
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    featuresRule: !item["featuresRule"]
      ? item["featuresRule"]
      : resourceProviderManifestPropertiesFeaturesRuleDeserializer(item["featuresRule"]),
    requestHeaderOptions: !item["requestHeaderOptions"]
      ? item["requestHeaderOptions"]
      : resourceProviderManifestPropertiesRequestHeaderOptionsDeserializer(
          item["requestHeaderOptions"],
        ),
    management: !item["management"]
      ? item["management"]
      : resourceProviderManifestPropertiesManagementDeserializer(item["management"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : resourceProviderCapabilitiesArrayDeserializer(item["capabilities"]),
    crossTenantTokenValidation: item["crossTenantTokenValidation"],
    metadata: item["metadata"],
    templateDeploymentOptions: !item["templateDeploymentOptions"]
      ? item["templateDeploymentOptions"]
      : resourceProviderManifestPropertiesTemplateDeploymentOptionsDeserializer(
          item["templateDeploymentOptions"],
        ),
    globalNotificationEndpoints: !item["globalNotificationEndpoints"]
      ? item["globalNotificationEndpoints"]
      : resourceProviderEndpointArrayDeserializer(item["globalNotificationEndpoints"]),
    enableTenantLinkedNotification: item["enableTenantLinkedNotification"],
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArrayDeserializer(item["notifications"]),
    linkedNotificationRules: !item["linkedNotificationRules"]
      ? item["linkedNotificationRules"]
      : fanoutLinkedNotificationRuleArrayDeserializer(item["linkedNotificationRules"]),
    resourceProviderAuthorizationRules: !item["resourceProviderAuthorizationRules"]
      ? item["resourceProviderAuthorizationRules"]
      : resourceProviderAuthorizationRulesDeserializer(item["resourceProviderAuthorizationRules"]),
    dstsConfiguration: !item["dstsConfiguration"]
      ? item["dstsConfiguration"]
      : resourceProviderManifestPropertiesDstsConfigurationDeserializer(item["dstsConfiguration"]),
    notificationOptions: item["notificationOptions"],
    resourceHydrationAccounts: !item["resourceHydrationAccounts"]
      ? item["resourceHydrationAccounts"]
      : resourceHydrationAccountArrayDeserializer(item["resourceHydrationAccounts"]),
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : resourceProviderManifestPropertiesNotificationSettingsDeserializer(
          item["notificationSettings"],
        ),
    managementGroupGlobalNotificationEndpoints: !item["managementGroupGlobalNotificationEndpoints"]
      ? item["managementGroupGlobalNotificationEndpoints"]
      : resourceProviderEndpointArrayDeserializer(
          item["managementGroupGlobalNotificationEndpoints"],
        ),
    optionalFeatures: !item["optionalFeatures"]
      ? item["optionalFeatures"]
      : item["optionalFeatures"].map((p: any) => {
          return p;
        }),
    resourceGroupLockOptionDuringMove: !item["resourceGroupLockOptionDuringMove"]
      ? item["resourceGroupLockOptionDuringMove"]
      : resourceProviderManifestPropertiesResourceGroupLockOptionDuringMoveDeserializer(
          item["resourceGroupLockOptionDuringMove"],
        ),
    responseOptions: !item["responseOptions"]
      ? item["responseOptions"]
      : resourceProviderManifestPropertiesResponseOptionsDeserializer(item["responseOptions"]),
    legacyNamespace: item["legacyNamespace"],
    legacyRegistrations: !item["legacyRegistrations"]
      ? item["legacyRegistrations"]
      : item["legacyRegistrations"].map((p: any) => {
          return p;
        }),
    customManifestVersion: item["customManifestVersion"],
  };
}

/** The provider authentication. */
export interface ResourceProviderManifestPropertiesProviderAuthentication extends ResourceProviderAuthentication {}

export function resourceProviderManifestPropertiesProviderAuthenticationSerializer(
  item: ResourceProviderManifestPropertiesProviderAuthentication,
): any {
  return {
    allowedAudiences: item["allowedAudiences"].map((p: any) => {
      return p;
    }),
  };
}

export function resourceProviderManifestPropertiesProviderAuthenticationDeserializer(
  item: any,
): ResourceProviderManifestPropertiesProviderAuthentication {
  return {
    allowedAudiences: item["allowedAudiences"].map((p: any) => {
      return p;
    }),
  };
}

/** The features rule. */
export interface ResourceProviderManifestPropertiesFeaturesRule extends FeaturesRule {}

export function resourceProviderManifestPropertiesFeaturesRuleSerializer(
  item: ResourceProviderManifestPropertiesFeaturesRule,
): any {
  return { requiredFeaturesPolicy: item["requiredFeaturesPolicy"] };
}

export function resourceProviderManifestPropertiesFeaturesRuleDeserializer(
  item: any,
): ResourceProviderManifestPropertiesFeaturesRule {
  return {
    requiredFeaturesPolicy: item["requiredFeaturesPolicy"],
  };
}

/** The request header options. */
export interface ResourceProviderManifestPropertiesRequestHeaderOptions extends RequestHeaderOptions {}

export function resourceProviderManifestPropertiesRequestHeaderOptionsSerializer(
  item: ResourceProviderManifestPropertiesRequestHeaderOptions,
): any {
  return { optInHeaders: item["optInHeaders"], optOutHeaders: item["optOutHeaders"] };
}

export function resourceProviderManifestPropertiesRequestHeaderOptionsDeserializer(
  item: any,
): ResourceProviderManifestPropertiesRequestHeaderOptions {
  return {
    optInHeaders: item["optInHeaders"],
    optOutHeaders: item["optOutHeaders"],
  };
}

/** The resource provider management. */
export interface ResourceProviderManifestPropertiesManagement extends ResourceProviderManagement {}

export function resourceProviderManifestPropertiesManagementSerializer(
  item: ResourceProviderManifestPropertiesManagement,
): any {
  return {
    schemaOwners: !item["schemaOwners"]
      ? item["schemaOwners"]
      : item["schemaOwners"].map((p: any) => {
          return p;
        }),
    manifestOwners: !item["manifestOwners"]
      ? item["manifestOwners"]
      : item["manifestOwners"].map((p: any) => {
          return p;
        }),
    authorizationOwners: !item["authorizationOwners"]
      ? item["authorizationOwners"]
      : item["authorizationOwners"].map((p: any) => {
          return p;
        }),
    incidentRoutingService: item["incidentRoutingService"],
    incidentRoutingTeam: item["incidentRoutingTeam"],
    incidentContactEmail: item["incidentContactEmail"],
    serviceTreeInfos: !item["serviceTreeInfos"]
      ? item["serviceTreeInfos"]
      : serviceTreeInfoArraySerializer(item["serviceTreeInfos"]),
    resourceAccessPolicy: item["resourceAccessPolicy"],
    resourceAccessRoles: !item["resourceAccessRoles"]
      ? item["resourceAccessRoles"]
      : resourceAccessRoleArraySerializer(item["resourceAccessRoles"]),
    expeditedRolloutSubmitters: !item["expeditedRolloutSubmitters"]
      ? item["expeditedRolloutSubmitters"]
      : item["expeditedRolloutSubmitters"].map((p: any) => {
          return p;
        }),
    errorResponseMessageOptions: !item["errorResponseMessageOptions"]
      ? item["errorResponseMessageOptions"]
      : resourceProviderManagementErrorResponseMessageOptionsSerializer(
          item["errorResponseMessageOptions"],
        ),
    expeditedRolloutMetadata: !item["expeditedRolloutMetadata"]
      ? item["expeditedRolloutMetadata"]
      : resourceProviderManagementExpeditedRolloutMetadataSerializer(
          item["expeditedRolloutMetadata"],
        ),
    canaryManifestOwners: !item["canaryManifestOwners"]
      ? item["canaryManifestOwners"]
      : item["canaryManifestOwners"].map((p: any) => {
          return p;
        }),
    pcCode: item["pcCode"],
    profitCenterProgramId: item["profitCenterProgramId"],
  };
}

export function resourceProviderManifestPropertiesManagementDeserializer(
  item: any,
): ResourceProviderManifestPropertiesManagement {
  return {
    schemaOwners: !item["schemaOwners"]
      ? item["schemaOwners"]
      : item["schemaOwners"].map((p: any) => {
          return p;
        }),
    manifestOwners: !item["manifestOwners"]
      ? item["manifestOwners"]
      : item["manifestOwners"].map((p: any) => {
          return p;
        }),
    authorizationOwners: !item["authorizationOwners"]
      ? item["authorizationOwners"]
      : item["authorizationOwners"].map((p: any) => {
          return p;
        }),
    incidentRoutingService: item["incidentRoutingService"],
    incidentRoutingTeam: item["incidentRoutingTeam"],
    incidentContactEmail: item["incidentContactEmail"],
    serviceTreeInfos: !item["serviceTreeInfos"]
      ? item["serviceTreeInfos"]
      : serviceTreeInfoArrayDeserializer(item["serviceTreeInfos"]),
    resourceAccessPolicy: item["resourceAccessPolicy"],
    resourceAccessRoles: !item["resourceAccessRoles"]
      ? item["resourceAccessRoles"]
      : resourceAccessRoleArrayDeserializer(item["resourceAccessRoles"]),
    expeditedRolloutSubmitters: !item["expeditedRolloutSubmitters"]
      ? item["expeditedRolloutSubmitters"]
      : item["expeditedRolloutSubmitters"].map((p: any) => {
          return p;
        }),
    errorResponseMessageOptions: !item["errorResponseMessageOptions"]
      ? item["errorResponseMessageOptions"]
      : resourceProviderManagementErrorResponseMessageOptionsDeserializer(
          item["errorResponseMessageOptions"],
        ),
    expeditedRolloutMetadata: !item["expeditedRolloutMetadata"]
      ? item["expeditedRolloutMetadata"]
      : resourceProviderManagementExpeditedRolloutMetadataDeserializer(
          item["expeditedRolloutMetadata"],
        ),
    canaryManifestOwners: !item["canaryManifestOwners"]
      ? item["canaryManifestOwners"]
      : item["canaryManifestOwners"].map((p: any) => {
          return p;
        }),
    pcCode: item["pcCode"],
    profitCenterProgramId: item["profitCenterProgramId"],
  };
}

/** The template deployment options. */
export interface ResourceProviderManifestPropertiesTemplateDeploymentOptions extends TemplateDeploymentOptions {}

export function resourceProviderManifestPropertiesTemplateDeploymentOptionsSerializer(
  item: ResourceProviderManifestPropertiesTemplateDeploymentOptions,
): any {
  return {
    preflightSupported: item["preflightSupported"],
    preflightOptions: !item["preflightOptions"]
      ? item["preflightOptions"]
      : item["preflightOptions"].map((p: any) => {
          return p;
        }),
  };
}

export function resourceProviderManifestPropertiesTemplateDeploymentOptionsDeserializer(
  item: any,
): ResourceProviderManifestPropertiesTemplateDeploymentOptions {
  return {
    preflightSupported: item["preflightSupported"],
    preflightOptions: !item["preflightOptions"]
      ? item["preflightOptions"]
      : item["preflightOptions"].map((p: any) => {
          return p;
        }),
  };
}

/** The dsts configuration. */
export interface ResourceProviderManifestPropertiesDstsConfiguration extends DstsConfiguration {}

export function resourceProviderManifestPropertiesDstsConfigurationSerializer(
  item: ResourceProviderManifestPropertiesDstsConfiguration,
): any {
  return { serviceName: item["serviceName"], serviceDnsName: item["serviceDnsName"] };
}

export function resourceProviderManifestPropertiesDstsConfigurationDeserializer(
  item: any,
): ResourceProviderManifestPropertiesDstsConfiguration {
  return {
    serviceName: item["serviceName"],
    serviceDnsName: item["serviceDnsName"],
  };
}

/** Notification options. */
export enum KnownNotificationOptions {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** None */
  None = "None",
  /** EmitSpendingLimit */
  EmitSpendingLimit = "EmitSpendingLimit",
}

/**
 * Notification options. \
 * {@link KnownNotificationOptions} can be used interchangeably with NotificationOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **None** \
 * **EmitSpendingLimit**
 */
export type NotificationOptions = string;

export function resourceHydrationAccountArraySerializer(
  result: Array<ResourceHydrationAccount>,
): any[] {
  return result.map((item) => {
    return resourceHydrationAccountSerializer(item);
  });
}

export function resourceHydrationAccountArrayDeserializer(
  result: Array<ResourceHydrationAccount>,
): any[] {
  return result.map((item) => {
    return resourceHydrationAccountDeserializer(item);
  });
}

/** model interface ResourceHydrationAccount */
export interface ResourceHydrationAccount {
  /** The max child resource consistency job limit. */
  maxChildResourceConsistencyJobLimit?: number;
  /** The encrypted key. */
  encryptedKey?: string;
  /** The account name. */
  accountName?: string;
  /** The subscription id. */
  subscriptionId?: string;
}

export function resourceHydrationAccountSerializer(item: ResourceHydrationAccount): any {
  return {
    maxChildResourceConsistencyJobLimit: item["maxChildResourceConsistencyJobLimit"],
    encryptedKey: item["encryptedKey"],
    accountName: item["accountName"],
    subscriptionId: item["subscriptionId"],
  };
}

export function resourceHydrationAccountDeserializer(item: any): ResourceHydrationAccount {
  return {
    maxChildResourceConsistencyJobLimit: item["maxChildResourceConsistencyJobLimit"],
    encryptedKey: item["encryptedKey"],
    accountName: item["accountName"],
    subscriptionId: item["subscriptionId"],
  };
}

/** Notification settings. */
export interface ResourceProviderManifestPropertiesNotificationSettings {
  subscriberSettings?: SubscriberSetting[];
}

export function resourceProviderManifestPropertiesNotificationSettingsSerializer(
  item: ResourceProviderManifestPropertiesNotificationSettings,
): any {
  return {
    subscriberSettings: !item["subscriberSettings"]
      ? item["subscriberSettings"]
      : subscriberSettingArraySerializer(item["subscriberSettings"]),
  };
}

export function resourceProviderManifestPropertiesNotificationSettingsDeserializer(
  item: any,
): ResourceProviderManifestPropertiesNotificationSettings {
  return {
    subscriberSettings: !item["subscriberSettings"]
      ? item["subscriberSettings"]
      : subscriberSettingArrayDeserializer(item["subscriberSettings"]),
  };
}

export function subscriberSettingArraySerializer(result: Array<SubscriberSetting>): any[] {
  return result.map((item) => {
    return subscriberSettingSerializer(item);
  });
}

export function subscriberSettingArrayDeserializer(result: Array<SubscriberSetting>): any[] {
  return result.map((item) => {
    return subscriberSettingDeserializer(item);
  });
}

/** model interface SubscriberSetting */
export interface SubscriberSetting {
  /** The filter rules. */
  filterRules?: FilterRule[];
}

export function subscriberSettingSerializer(item: SubscriberSetting): any {
  return {
    filterRules: !item["filterRules"]
      ? item["filterRules"]
      : filterRuleArraySerializer(item["filterRules"]),
  };
}

export function subscriberSettingDeserializer(item: any): SubscriberSetting {
  return {
    filterRules: !item["filterRules"]
      ? item["filterRules"]
      : filterRuleArrayDeserializer(item["filterRules"]),
  };
}

export function filterRuleArraySerializer(result: Array<FilterRule>): any[] {
  return result.map((item) => {
    return filterRuleSerializer(item);
  });
}

export function filterRuleArrayDeserializer(result: Array<FilterRule>): any[] {
  return result.map((item) => {
    return filterRuleDeserializer(item);
  });
}

/** model interface FilterRule */
export interface FilterRule {
  /** The filter query. */
  filterQuery?: string;
  /** The endpoint information. */
  endpointInformation?: EndpointInformation[];
}

export function filterRuleSerializer(item: FilterRule): any {
  return {
    filterQuery: item["filterQuery"],
    endpointInformation: !item["endpointInformation"]
      ? item["endpointInformation"]
      : endpointInformationArraySerializer(item["endpointInformation"]),
  };
}

export function filterRuleDeserializer(item: any): FilterRule {
  return {
    filterQuery: item["filterQuery"],
    endpointInformation: !item["endpointInformation"]
      ? item["endpointInformation"]
      : endpointInformationArrayDeserializer(item["endpointInformation"]),
  };
}

export function endpointInformationArraySerializer(result: Array<EndpointInformation>): any[] {
  return result.map((item) => {
    return endpointInformationSerializer(item);
  });
}

export function endpointInformationArrayDeserializer(result: Array<EndpointInformation>): any[] {
  return result.map((item) => {
    return endpointInformationDeserializer(item);
  });
}

/** model interface EndpointInformation */
export interface EndpointInformation {
  /** The endpoint. */
  endpoint?: string;
  /** The endpoint type. */
  endpointType?: NotificationEndpointType;
  /** The schema version. */
  schemaVersion?: string;
}

export function endpointInformationSerializer(item: EndpointInformation): any {
  return {
    endpoint: item["endpoint"],
    endpointType: item["endpointType"],
    schemaVersion: item["schemaVersion"],
  };
}

export function endpointInformationDeserializer(item: any): EndpointInformation {
  return {
    endpoint: item["endpoint"],
    endpointType: item["endpointType"],
    schemaVersion: item["schemaVersion"],
  };
}

/** The endpoint type. */
export enum KnownNotificationEndpointType {
  /** Webhook */
  Webhook = "Webhook",
  /** Eventhub */
  Eventhub = "Eventhub",
}

/**
 * The endpoint type. \
 * {@link KnownNotificationEndpointType} can be used interchangeably with NotificationEndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Webhook** \
 * **Eventhub**
 */
export type NotificationEndpointType = string;

/** Resource group lock option during move. */
export interface ResourceProviderManifestPropertiesResourceGroupLockOptionDuringMove {
  /** The action verb that will be blocked when the resource group is locked during move. */
  blockActionVerb?: BlockActionVerb;
}

export function resourceProviderManifestPropertiesResourceGroupLockOptionDuringMoveSerializer(
  item: ResourceProviderManifestPropertiesResourceGroupLockOptionDuringMove,
): any {
  return { blockActionVerb: item["blockActionVerb"] };
}

export function resourceProviderManifestPropertiesResourceGroupLockOptionDuringMoveDeserializer(
  item: any,
): ResourceProviderManifestPropertiesResourceGroupLockOptionDuringMove {
  return {
    blockActionVerb: item["blockActionVerb"],
  };
}

/** The action verb that will be blocked when the resource group is locked during move. */
export enum KnownBlockActionVerb {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Read */
  Read = "Read",
  /** Write */
  Write = "Write",
  /** Action */
  Action = "Action",
  /** Delete */
  Delete = "Delete",
  /** Unrecognized */
  Unrecognized = "Unrecognized",
}

/**
 * The action verb that will be blocked when the resource group is locked during move. \
 * {@link KnownBlockActionVerb} can be used interchangeably with BlockActionVerb,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Read** \
 * **Write** \
 * **Action** \
 * **Delete** \
 * **Unrecognized**
 */
export type BlockActionVerb = string;

/** Response options. */
export interface ResourceProviderManifestPropertiesResponseOptions {
  serviceClientOptionsType?: ServiceClientOptionsType;
}

export function resourceProviderManifestPropertiesResponseOptionsSerializer(
  item: ResourceProviderManifestPropertiesResponseOptions,
): any {
  return { serviceClientOptionsType: item["serviceClientOptionsType"] };
}

export function resourceProviderManifestPropertiesResponseOptionsDeserializer(
  item: any,
): ResourceProviderManifestPropertiesResponseOptions {
  return {
    serviceClientOptionsType: item["serviceClientOptionsType"],
  };
}

/** Known values of {@link ServiceClientOptionsType} that the service accepts. */
export enum KnownServiceClientOptionsType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** DisableAutomaticDecompression */
  DisableAutomaticDecompression = "DisableAutomaticDecompression",
}

/** Type of ServiceClientOptionsType */
export type ServiceClientOptionsType = string;

/** model interface TemplateDeploymentOptions */
export interface TemplateDeploymentOptions {
  /** Whether preflight is supported. */
  preflightSupported?: boolean;
  /** The preflight options. */
  preflightOptions?: PreflightOption[];
}

export function templateDeploymentOptionsSerializer(item: TemplateDeploymentOptions): any {
  return {
    preflightSupported: item["preflightSupported"],
    preflightOptions: !item["preflightOptions"]
      ? item["preflightOptions"]
      : item["preflightOptions"].map((p: any) => {
          return p;
        }),
  };
}

export function templateDeploymentOptionsDeserializer(item: any): TemplateDeploymentOptions {
  return {
    preflightSupported: item["preflightSupported"],
    preflightOptions: !item["preflightOptions"]
      ? item["preflightOptions"]
      : item["preflightOptions"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link PreflightOption} that the service accepts. */
export enum KnownPreflightOption {
  /** None */
  None = "None",
  /** ContinueDeploymentOnFailure */
  ContinueDeploymentOnFailure = "ContinueDeploymentOnFailure",
  /** DefaultValidationOnly */
  DefaultValidationOnly = "DefaultValidationOnly",
}

/** Type of PreflightOption */
export type PreflightOption = string;

/** model interface ResourceTypeExtensionOptions */
export interface ResourceTypeExtensionOptions {
  /** Resource creation begin. */
  resourceCreationBegin?: ResourceTypeExtensionOptionsResourceCreationBegin;
}

export function resourceTypeExtensionOptionsSerializer(item: ResourceTypeExtensionOptions): any {
  return {
    resourceCreationBegin: !item["resourceCreationBegin"]
      ? item["resourceCreationBegin"]
      : resourceTypeExtensionOptionsResourceCreationBeginSerializer(item["resourceCreationBegin"]),
  };
}

export function resourceTypeExtensionOptionsDeserializer(item: any): ResourceTypeExtensionOptions {
  return {
    resourceCreationBegin: !item["resourceCreationBegin"]
      ? item["resourceCreationBegin"]
      : resourceTypeExtensionOptionsResourceCreationBeginDeserializer(
          item["resourceCreationBegin"],
        ),
  };
}

/** Resource creation begin. */
export interface ResourceTypeExtensionOptionsResourceCreationBegin extends ExtensionOptions {}

export function resourceTypeExtensionOptionsResourceCreationBeginSerializer(
  item: ResourceTypeExtensionOptionsResourceCreationBegin,
): any {
  return {
    request: !item["request"]
      ? item["request"]
      : item["request"].map((p: any) => {
          return p;
        }),
    response: !item["response"]
      ? item["response"]
      : item["response"].map((p: any) => {
          return p;
        }),
  };
}

export function resourceTypeExtensionOptionsResourceCreationBeginDeserializer(
  item: any,
): ResourceTypeExtensionOptionsResourceCreationBegin {
  return {
    request: !item["request"]
      ? item["request"]
      : item["request"].map((p: any) => {
          return p;
        }),
    response: !item["response"]
      ? item["response"]
      : item["response"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface ExtensionOptions */
export interface ExtensionOptions {
  /** The request. */
  request?: ExtensionOptionType[];
  /** The response. */
  response?: ExtensionOptionType[];
}

export function extensionOptionsSerializer(item: ExtensionOptions): any {
  return {
    request: !item["request"]
      ? item["request"]
      : item["request"].map((p: any) => {
          return p;
        }),
    response: !item["response"]
      ? item["response"]
      : item["response"].map((p: any) => {
          return p;
        }),
  };
}

export function extensionOptionsDeserializer(item: any): ExtensionOptions {
  return {
    request: !item["request"]
      ? item["request"]
      : item["request"].map((p: any) => {
          return p;
        }),
    response: !item["response"]
      ? item["response"]
      : item["response"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link ExtensionOptionType} that the service accepts. */
export enum KnownExtensionOptionType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** DoNotMergeExistingReadOnlyAndSecretProperties */
  DoNotMergeExistingReadOnlyAndSecretProperties = "DoNotMergeExistingReadOnlyAndSecretProperties",
  /** IncludeInternalMetadata */
  IncludeInternalMetadata = "IncludeInternalMetadata",
}

/** Type of ExtensionOptionType */
export type ExtensionOptionType = string;

/** model interface IdentityManagementProperties */
export interface IdentityManagementProperties {
  /** The type. */
  type?: IdentityManagementTypes;
  /** The application id. */
  applicationId?: string;
  /** The application ids. */
  applicationIds?: string[];
  /** The delegation app ids. */
  delegationAppIds?: string[];
}

export function identityManagementPropertiesSerializer(item: IdentityManagementProperties): any {
  return {
    type: item["type"],
    applicationId: item["applicationId"],
    applicationIds: !item["applicationIds"]
      ? item["applicationIds"]
      : item["applicationIds"].map((p: any) => {
          return p;
        }),
    delegationAppIds: !item["delegationAppIds"]
      ? item["delegationAppIds"]
      : item["delegationAppIds"].map((p: any) => {
          return p;
        }),
  };
}

export function identityManagementPropertiesDeserializer(item: any): IdentityManagementProperties {
  return {
    type: item["type"],
    applicationId: item["applicationId"],
    applicationIds: !item["applicationIds"]
      ? item["applicationIds"]
      : item["applicationIds"].map((p: any) => {
          return p;
        }),
    delegationAppIds: !item["delegationAppIds"]
      ? item["delegationAppIds"]
      : item["delegationAppIds"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface CheckNameAvailabilitySpecifications */
export interface CheckNameAvailabilitySpecifications {
  /** Whether default validation is enabled. */
  enableDefaultValidation?: boolean;
  /** The resource types with custom validation. */
  resourceTypesWithCustomValidation?: string[];
}

export function checkNameAvailabilitySpecificationsSerializer(
  item: CheckNameAvailabilitySpecifications,
): any {
  return {
    enableDefaultValidation: item["enableDefaultValidation"],
    resourceTypesWithCustomValidation: !item["resourceTypesWithCustomValidation"]
      ? item["resourceTypesWithCustomValidation"]
      : item["resourceTypesWithCustomValidation"].map((p: any) => {
          return p;
        }),
  };
}

export function checkNameAvailabilitySpecificationsDeserializer(
  item: any,
): CheckNameAvailabilitySpecifications {
  return {
    enableDefaultValidation: item["enableDefaultValidation"],
    resourceTypesWithCustomValidation: !item["resourceTypesWithCustomValidation"]
      ? item["resourceTypesWithCustomValidation"]
      : item["resourceTypesWithCustomValidation"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface ResourceMovePolicy */
export interface ResourceMovePolicy {
  /** Whether validation is required. */
  validationRequired?: boolean;
  /** Whether cross resource group move is enabled. */
  crossResourceGroupMoveEnabled?: boolean;
  /** Whether cross subscription move is enabled. */
  crossSubscriptionMoveEnabled?: boolean;
}

export function resourceMovePolicySerializer(item: ResourceMovePolicy): any {
  return {
    validationRequired: item["validationRequired"],
    crossResourceGroupMoveEnabled: item["crossResourceGroupMoveEnabled"],
    crossSubscriptionMoveEnabled: item["crossSubscriptionMoveEnabled"],
  };
}

export function resourceMovePolicyDeserializer(item: any): ResourceMovePolicy {
  return {
    validationRequired: item["validationRequired"],
    crossResourceGroupMoveEnabled: item["crossResourceGroupMoveEnabled"],
    crossSubscriptionMoveEnabled: item["crossSubscriptionMoveEnabled"],
  };
}

/** model interface ResourceGraphConfiguration */
export interface ResourceGraphConfiguration {
  /** Whether it's enabled. */
  enabled?: boolean;
  /** The api version. */
  apiVersion?: string;
}

export function resourceGraphConfigurationSerializer(item: ResourceGraphConfiguration): any {
  return { enabled: item["enabled"], apiVersion: item["apiVersion"] };
}

export function resourceGraphConfigurationDeserializer(item: any): ResourceGraphConfiguration {
  return {
    enabled: item["enabled"],
    apiVersion: item["apiVersion"],
  };
}

/** model interface CustomRolloutStatus */
export interface CustomRolloutStatus {
  /** The completed regions. */
  completedRegions?: string[];
  /** The failed or skipped regions. */
  failedOrSkippedRegions?: Record<string, ExtendedErrorInfo>;
  /** The manifest checkin status. */
  manifestCheckinStatus?: CustomRolloutStatusManifestCheckinStatus;
}

export function customRolloutStatusSerializer(item: CustomRolloutStatus): any {
  return {
    completedRegions: !item["completedRegions"]
      ? item["completedRegions"]
      : item["completedRegions"].map((p: any) => {
          return p;
        }),
    failedOrSkippedRegions: !item["failedOrSkippedRegions"]
      ? item["failedOrSkippedRegions"]
      : extendedErrorInfoRecordSerializer(item["failedOrSkippedRegions"]),
    manifestCheckinStatus: !item["manifestCheckinStatus"]
      ? item["manifestCheckinStatus"]
      : customRolloutStatusManifestCheckinStatusSerializer(item["manifestCheckinStatus"]),
  };
}

export function customRolloutStatusDeserializer(item: any): CustomRolloutStatus {
  return {
    completedRegions: !item["completedRegions"]
      ? item["completedRegions"]
      : item["completedRegions"].map((p: any) => {
          return p;
        }),
    failedOrSkippedRegions: !item["failedOrSkippedRegions"]
      ? item["failedOrSkippedRegions"]
      : extendedErrorInfoRecordDeserializer(item["failedOrSkippedRegions"]),
    manifestCheckinStatus: !item["manifestCheckinStatus"]
      ? item["manifestCheckinStatus"]
      : customRolloutStatusManifestCheckinStatusDeserializer(item["manifestCheckinStatus"]),
  };
}

export function extendedErrorInfoRecordSerializer(
  item: Record<string, ExtendedErrorInfo>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : extendedErrorInfoSerializer(item[key]);
  });
  return result;
}

export function extendedErrorInfoRecordDeserializer(
  item: Record<string, any>,
): Record<string, ExtendedErrorInfo> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : extendedErrorInfoDeserializer(item[key]);
  });
  return result;
}

/** Error information. */
export interface ExtendedErrorInfo {
  /** The error code. */
  code?: string;
  /** The target of the error. */
  target?: string;
  /** The error message. */
  message?: string;
  /** The error details. */
  details?: ExtendedErrorInfo[];
  /** The additional error information. */
  additionalInfo?: TypedErrorInfo[];
}

export function extendedErrorInfoSerializer(item: ExtendedErrorInfo): any {
  return {
    code: item["code"],
    target: item["target"],
    message: item["message"],
    details: !item["details"] ? item["details"] : extendedErrorInfoArraySerializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : typedErrorInfoArraySerializer(item["additionalInfo"]),
  };
}

export function extendedErrorInfoDeserializer(item: any): ExtendedErrorInfo {
  return {
    code: item["code"],
    target: item["target"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : extendedErrorInfoArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : typedErrorInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function extendedErrorInfoArraySerializer(result: Array<ExtendedErrorInfo>): any[] {
  return result.map((item) => {
    return extendedErrorInfoSerializer(item);
  });
}

export function extendedErrorInfoArrayDeserializer(result: Array<ExtendedErrorInfo>): any[] {
  return result.map((item) => {
    return extendedErrorInfoDeserializer(item);
  });
}

export function typedErrorInfoArraySerializer(result: Array<TypedErrorInfo>): any[] {
  return result.map((item) => {
    return typedErrorInfoSerializer(item);
  });
}

export function typedErrorInfoArrayDeserializer(result: Array<TypedErrorInfo>): any[] {
  return result.map((item) => {
    return typedErrorInfoDeserializer(item);
  });
}

/** Error information. */
export interface TypedErrorInfo {
  /** The type of the error. */
  type: string;
  /** The error information. */
  readonly info?: any;
}

export function typedErrorInfoSerializer(item: TypedErrorInfo): any {
  return { type: item["type"] };
}

export function typedErrorInfoDeserializer(item: any): TypedErrorInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** The manifest checkin status. */
export interface CustomRolloutStatusManifestCheckinStatus extends CheckinManifestInfo {}

export function customRolloutStatusManifestCheckinStatusSerializer(
  item: CustomRolloutStatusManifestCheckinStatus,
): any {
  return {
    isCheckedIn: item["isCheckedIn"],
    statusMessage: item["statusMessage"],
    pullRequest: item["pullRequest"],
    commitId: item["commitId"],
  };
}

export function customRolloutStatusManifestCheckinStatusDeserializer(
  item: any,
): CustomRolloutStatusManifestCheckinStatus {
  return {
    isCheckedIn: item["isCheckedIn"],
    statusMessage: item["statusMessage"],
    pullRequest: item["pullRequest"],
    commitId: item["commitId"],
  };
}

/** Paged collection of CustomRollout items */
export interface _CustomRolloutArrayResponseWithContinuation {
  /** The CustomRollout items on this page */
  value: CustomRollout[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _customRolloutArrayResponseWithContinuationDeserializer(
  item: any,
): _CustomRolloutArrayResponseWithContinuation {
  return {
    value: customRolloutArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function customRolloutArraySerializer(result: Array<CustomRollout>): any[] {
  return result.map((item) => {
    return customRolloutSerializer(item);
  });
}

export function customRolloutArrayDeserializer(result: Array<CustomRollout>): any[] {
  return result.map((item) => {
    return customRolloutDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface DefaultRollout extends ProxyResource {
  /** Properties of the rollout. */
  properties?: DefaultRolloutProperties;
}

export function defaultRolloutSerializer(item: DefaultRollout): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : defaultRolloutPropertiesSerializer(item["properties"]),
  };
}

export function defaultRolloutDeserializer(item: any): DefaultRollout {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : defaultRolloutPropertiesDeserializer(item["properties"]),
  };
}

/** model interface DefaultRolloutProperties */
export interface DefaultRolloutProperties {
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The default rollout specification. */
  specification?: DefaultRolloutPropertiesSpecification;
  /** The default rollout status. */
  status?: DefaultRolloutPropertiesStatus;
}

export function defaultRolloutPropertiesSerializer(item: DefaultRolloutProperties): any {
  return {
    specification: !item["specification"]
      ? item["specification"]
      : defaultRolloutPropertiesSpecificationSerializer(item["specification"]),
    status: !item["status"]
      ? item["status"]
      : defaultRolloutPropertiesStatusSerializer(item["status"]),
  };
}

export function defaultRolloutPropertiesDeserializer(item: any): DefaultRolloutProperties {
  return {
    provisioningState: item["provisioningState"],
    specification: !item["specification"]
      ? item["specification"]
      : defaultRolloutPropertiesSpecificationDeserializer(item["specification"]),
    status: !item["status"]
      ? item["status"]
      : defaultRolloutPropertiesStatusDeserializer(item["status"]),
  };
}

/** The default rollout specification. */
export interface DefaultRolloutPropertiesSpecification extends DefaultRolloutSpecification {}

export function defaultRolloutPropertiesSpecificationSerializer(
  item: DefaultRolloutPropertiesSpecification,
): any {
  return {
    expeditedRollout: !item["expeditedRollout"]
      ? item["expeditedRollout"]
      : defaultRolloutSpecificationExpeditedRolloutSerializer(item["expeditedRollout"]),
    canary: !item["canary"]
      ? item["canary"]
      : defaultRolloutSpecificationCanarySerializer(item["canary"]),
    lowTraffic: !item["lowTraffic"]
      ? item["lowTraffic"]
      : defaultRolloutSpecificationLowTrafficSerializer(item["lowTraffic"]),
    mediumTraffic: !item["mediumTraffic"]
      ? item["mediumTraffic"]
      : defaultRolloutSpecificationMediumTrafficSerializer(item["mediumTraffic"]),
    highTraffic: !item["highTraffic"]
      ? item["highTraffic"]
      : defaultRolloutSpecificationHighTrafficSerializer(item["highTraffic"]),
    restOfTheWorldGroupOne: !item["restOfTheWorldGroupOne"]
      ? item["restOfTheWorldGroupOne"]
      : defaultRolloutSpecificationRestOfTheWorldGroupOneSerializer(item["restOfTheWorldGroupOne"]),
    restOfTheWorldGroupTwo: !item["restOfTheWorldGroupTwo"]
      ? item["restOfTheWorldGroupTwo"]
      : defaultRolloutSpecificationRestOfTheWorldGroupTwoSerializer(item["restOfTheWorldGroupTwo"]),
    providerRegistration: !item["providerRegistration"]
      ? item["providerRegistration"]
      : defaultRolloutSpecificationProviderRegistrationSerializer(item["providerRegistration"]),
    resourceTypeRegistrations: !item["resourceTypeRegistrations"]
      ? item["resourceTypeRegistrations"]
      : resourceTypeRegistrationArraySerializer(item["resourceTypeRegistrations"]),
    autoProvisionConfig: !item["autoProvisionConfig"]
      ? item["autoProvisionConfig"]
      : defaultRolloutSpecificationAutoProvisionConfigSerializer(item["autoProvisionConfig"]),
  };
}

export function defaultRolloutPropertiesSpecificationDeserializer(
  item: any,
): DefaultRolloutPropertiesSpecification {
  return {
    expeditedRollout: !item["expeditedRollout"]
      ? item["expeditedRollout"]
      : defaultRolloutSpecificationExpeditedRolloutDeserializer(item["expeditedRollout"]),
    canary: !item["canary"]
      ? item["canary"]
      : defaultRolloutSpecificationCanaryDeserializer(item["canary"]),
    lowTraffic: !item["lowTraffic"]
      ? item["lowTraffic"]
      : defaultRolloutSpecificationLowTrafficDeserializer(item["lowTraffic"]),
    mediumTraffic: !item["mediumTraffic"]
      ? item["mediumTraffic"]
      : defaultRolloutSpecificationMediumTrafficDeserializer(item["mediumTraffic"]),
    highTraffic: !item["highTraffic"]
      ? item["highTraffic"]
      : defaultRolloutSpecificationHighTrafficDeserializer(item["highTraffic"]),
    restOfTheWorldGroupOne: !item["restOfTheWorldGroupOne"]
      ? item["restOfTheWorldGroupOne"]
      : defaultRolloutSpecificationRestOfTheWorldGroupOneDeserializer(
          item["restOfTheWorldGroupOne"],
        ),
    restOfTheWorldGroupTwo: !item["restOfTheWorldGroupTwo"]
      ? item["restOfTheWorldGroupTwo"]
      : defaultRolloutSpecificationRestOfTheWorldGroupTwoDeserializer(
          item["restOfTheWorldGroupTwo"],
        ),
    providerRegistration: !item["providerRegistration"]
      ? item["providerRegistration"]
      : defaultRolloutSpecificationProviderRegistrationDeserializer(item["providerRegistration"]),
    resourceTypeRegistrations: !item["resourceTypeRegistrations"]
      ? item["resourceTypeRegistrations"]
      : resourceTypeRegistrationArrayDeserializer(item["resourceTypeRegistrations"]),
    autoProvisionConfig: !item["autoProvisionConfig"]
      ? item["autoProvisionConfig"]
      : defaultRolloutSpecificationAutoProvisionConfigDeserializer(item["autoProvisionConfig"]),
  };
}

/** The default rollout status. */
export interface DefaultRolloutPropertiesStatus extends DefaultRolloutStatus {}

export function defaultRolloutPropertiesStatusSerializer(
  item: DefaultRolloutPropertiesStatus,
): any {
  return {
    nextTrafficRegion: item["nextTrafficRegion"],
    nextTrafficRegionScheduledTime: !item["nextTrafficRegionScheduledTime"]
      ? item["nextTrafficRegionScheduledTime"]
      : item["nextTrafficRegionScheduledTime"].toISOString(),
    subscriptionReregistrationResult: item["subscriptionReregistrationResult"],
    manifestCheckinStatus: !item["manifestCheckinStatus"]
      ? item["manifestCheckinStatus"]
      : defaultRolloutStatusManifestCheckinStatusSerializer(item["manifestCheckinStatus"]),
    completedRegions: !item["completedRegions"]
      ? item["completedRegions"]
      : item["completedRegions"].map((p: any) => {
          return p;
        }),
    failedOrSkippedRegions: !item["failedOrSkippedRegions"]
      ? item["failedOrSkippedRegions"]
      : extendedErrorInfoRecordSerializer(item["failedOrSkippedRegions"]),
  };
}

export function defaultRolloutPropertiesStatusDeserializer(
  item: any,
): DefaultRolloutPropertiesStatus {
  return {
    nextTrafficRegion: item["nextTrafficRegion"],
    nextTrafficRegionScheduledTime: !item["nextTrafficRegionScheduledTime"]
      ? item["nextTrafficRegionScheduledTime"]
      : new Date(item["nextTrafficRegionScheduledTime"]),
    subscriptionReregistrationResult: item["subscriptionReregistrationResult"],
    manifestCheckinStatus: !item["manifestCheckinStatus"]
      ? item["manifestCheckinStatus"]
      : defaultRolloutStatusManifestCheckinStatusDeserializer(item["manifestCheckinStatus"]),
    completedRegions: !item["completedRegions"]
      ? item["completedRegions"]
      : item["completedRegions"].map((p: any) => {
          return p;
        }),
    failedOrSkippedRegions: !item["failedOrSkippedRegions"]
      ? item["failedOrSkippedRegions"]
      : extendedErrorInfoRecordDeserializer(item["failedOrSkippedRegions"]),
  };
}

/** model interface DefaultRolloutSpecification */
export interface DefaultRolloutSpecification {
  /** The expedited rollout definition. */
  expeditedRollout?: DefaultRolloutSpecificationExpeditedRollout;
  /** The canary traffic region configuration. */
  canary?: DefaultRolloutSpecificationCanary;
  /** The low traffic region configuration. */
  lowTraffic?: DefaultRolloutSpecificationLowTraffic;
  /** The medium traffic region configuration. */
  mediumTraffic?: DefaultRolloutSpecificationMediumTraffic;
  /** The high traffic region configuration. */
  highTraffic?: DefaultRolloutSpecificationHighTraffic;
  /** The rest of the world group one region configuration. */
  restOfTheWorldGroupOne?: DefaultRolloutSpecificationRestOfTheWorldGroupOne;
  /** The rest of the world group two region configuration. */
  restOfTheWorldGroupTwo?: DefaultRolloutSpecificationRestOfTheWorldGroupTwo;
  /** The provider registration. */
  providerRegistration?: DefaultRolloutSpecificationProviderRegistration;
  /** The resource type registrations. */
  resourceTypeRegistrations?: ResourceTypeRegistration[];
  /** The auto provisioning config. */
  autoProvisionConfig?: DefaultRolloutSpecificationAutoProvisionConfig;
}

export function defaultRolloutSpecificationSerializer(item: DefaultRolloutSpecification): any {
  return {
    expeditedRollout: !item["expeditedRollout"]
      ? item["expeditedRollout"]
      : defaultRolloutSpecificationExpeditedRolloutSerializer(item["expeditedRollout"]),
    canary: !item["canary"]
      ? item["canary"]
      : defaultRolloutSpecificationCanarySerializer(item["canary"]),
    lowTraffic: !item["lowTraffic"]
      ? item["lowTraffic"]
      : defaultRolloutSpecificationLowTrafficSerializer(item["lowTraffic"]),
    mediumTraffic: !item["mediumTraffic"]
      ? item["mediumTraffic"]
      : defaultRolloutSpecificationMediumTrafficSerializer(item["mediumTraffic"]),
    highTraffic: !item["highTraffic"]
      ? item["highTraffic"]
      : defaultRolloutSpecificationHighTrafficSerializer(item["highTraffic"]),
    restOfTheWorldGroupOne: !item["restOfTheWorldGroupOne"]
      ? item["restOfTheWorldGroupOne"]
      : defaultRolloutSpecificationRestOfTheWorldGroupOneSerializer(item["restOfTheWorldGroupOne"]),
    restOfTheWorldGroupTwo: !item["restOfTheWorldGroupTwo"]
      ? item["restOfTheWorldGroupTwo"]
      : defaultRolloutSpecificationRestOfTheWorldGroupTwoSerializer(item["restOfTheWorldGroupTwo"]),
    providerRegistration: !item["providerRegistration"]
      ? item["providerRegistration"]
      : defaultRolloutSpecificationProviderRegistrationSerializer(item["providerRegistration"]),
    resourceTypeRegistrations: !item["resourceTypeRegistrations"]
      ? item["resourceTypeRegistrations"]
      : resourceTypeRegistrationArraySerializer(item["resourceTypeRegistrations"]),
    autoProvisionConfig: !item["autoProvisionConfig"]
      ? item["autoProvisionConfig"]
      : defaultRolloutSpecificationAutoProvisionConfigSerializer(item["autoProvisionConfig"]),
  };
}

export function defaultRolloutSpecificationDeserializer(item: any): DefaultRolloutSpecification {
  return {
    expeditedRollout: !item["expeditedRollout"]
      ? item["expeditedRollout"]
      : defaultRolloutSpecificationExpeditedRolloutDeserializer(item["expeditedRollout"]),
    canary: !item["canary"]
      ? item["canary"]
      : defaultRolloutSpecificationCanaryDeserializer(item["canary"]),
    lowTraffic: !item["lowTraffic"]
      ? item["lowTraffic"]
      : defaultRolloutSpecificationLowTrafficDeserializer(item["lowTraffic"]),
    mediumTraffic: !item["mediumTraffic"]
      ? item["mediumTraffic"]
      : defaultRolloutSpecificationMediumTrafficDeserializer(item["mediumTraffic"]),
    highTraffic: !item["highTraffic"]
      ? item["highTraffic"]
      : defaultRolloutSpecificationHighTrafficDeserializer(item["highTraffic"]),
    restOfTheWorldGroupOne: !item["restOfTheWorldGroupOne"]
      ? item["restOfTheWorldGroupOne"]
      : defaultRolloutSpecificationRestOfTheWorldGroupOneDeserializer(
          item["restOfTheWorldGroupOne"],
        ),
    restOfTheWorldGroupTwo: !item["restOfTheWorldGroupTwo"]
      ? item["restOfTheWorldGroupTwo"]
      : defaultRolloutSpecificationRestOfTheWorldGroupTwoDeserializer(
          item["restOfTheWorldGroupTwo"],
        ),
    providerRegistration: !item["providerRegistration"]
      ? item["providerRegistration"]
      : defaultRolloutSpecificationProviderRegistrationDeserializer(item["providerRegistration"]),
    resourceTypeRegistrations: !item["resourceTypeRegistrations"]
      ? item["resourceTypeRegistrations"]
      : resourceTypeRegistrationArrayDeserializer(item["resourceTypeRegistrations"]),
    autoProvisionConfig: !item["autoProvisionConfig"]
      ? item["autoProvisionConfig"]
      : defaultRolloutSpecificationAutoProvisionConfigDeserializer(item["autoProvisionConfig"]),
  };
}

/** The expedited rollout definition. */
export interface DefaultRolloutSpecificationExpeditedRollout extends ExpeditedRolloutDefinition {}

export function defaultRolloutSpecificationExpeditedRolloutSerializer(
  item: DefaultRolloutSpecificationExpeditedRollout,
): any {
  return { enabled: item["enabled"] };
}

export function defaultRolloutSpecificationExpeditedRolloutDeserializer(
  item: any,
): DefaultRolloutSpecificationExpeditedRollout {
  return {
    enabled: item["enabled"],
  };
}

/** The canary traffic region configuration. */
export interface DefaultRolloutSpecificationCanary extends CanaryTrafficRegionRolloutConfiguration {}

export function defaultRolloutSpecificationCanarySerializer(
  item: DefaultRolloutSpecificationCanary,
): any {
  return {
    skipRegions: !item["skipRegions"]
      ? item["skipRegions"]
      : item["skipRegions"].map((p: any) => {
          return p;
        }),
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

export function defaultRolloutSpecificationCanaryDeserializer(
  item: any,
): DefaultRolloutSpecificationCanary {
  return {
    skipRegions: !item["skipRegions"]
      ? item["skipRegions"]
      : item["skipRegions"].map((p: any) => {
          return p;
        }),
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

/** The low traffic region configuration. */
export interface DefaultRolloutSpecificationLowTraffic extends TrafficRegionRolloutConfiguration {}

export function defaultRolloutSpecificationLowTrafficSerializer(
  item: DefaultRolloutSpecificationLowTraffic,
): any {
  return {
    waitDuration: item["waitDuration"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

export function defaultRolloutSpecificationLowTrafficDeserializer(
  item: any,
): DefaultRolloutSpecificationLowTraffic {
  return {
    waitDuration: item["waitDuration"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

/** The medium traffic region configuration. */
export interface DefaultRolloutSpecificationMediumTraffic extends TrafficRegionRolloutConfiguration {}

export function defaultRolloutSpecificationMediumTrafficSerializer(
  item: DefaultRolloutSpecificationMediumTraffic,
): any {
  return {
    waitDuration: item["waitDuration"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

export function defaultRolloutSpecificationMediumTrafficDeserializer(
  item: any,
): DefaultRolloutSpecificationMediumTraffic {
  return {
    waitDuration: item["waitDuration"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

/** The high traffic region configuration. */
export interface DefaultRolloutSpecificationHighTraffic extends TrafficRegionRolloutConfiguration {}

export function defaultRolloutSpecificationHighTrafficSerializer(
  item: DefaultRolloutSpecificationHighTraffic,
): any {
  return {
    waitDuration: item["waitDuration"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

export function defaultRolloutSpecificationHighTrafficDeserializer(
  item: any,
): DefaultRolloutSpecificationHighTraffic {
  return {
    waitDuration: item["waitDuration"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

/** The rest of the world group one region configuration. */
export interface DefaultRolloutSpecificationRestOfTheWorldGroupOne extends TrafficRegionRolloutConfiguration {}

export function defaultRolloutSpecificationRestOfTheWorldGroupOneSerializer(
  item: DefaultRolloutSpecificationRestOfTheWorldGroupOne,
): any {
  return {
    waitDuration: item["waitDuration"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

export function defaultRolloutSpecificationRestOfTheWorldGroupOneDeserializer(
  item: any,
): DefaultRolloutSpecificationRestOfTheWorldGroupOne {
  return {
    waitDuration: item["waitDuration"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

/** The rest of the world group two region configuration. */
export interface DefaultRolloutSpecificationRestOfTheWorldGroupTwo extends TrafficRegionRolloutConfiguration {}

export function defaultRolloutSpecificationRestOfTheWorldGroupTwoSerializer(
  item: DefaultRolloutSpecificationRestOfTheWorldGroupTwo,
): any {
  return {
    waitDuration: item["waitDuration"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

export function defaultRolloutSpecificationRestOfTheWorldGroupTwoDeserializer(
  item: any,
): DefaultRolloutSpecificationRestOfTheWorldGroupTwo {
  return {
    waitDuration: item["waitDuration"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

/** The provider registration. */
export interface DefaultRolloutSpecificationProviderRegistration extends ProviderRegistration {}

export function defaultRolloutSpecificationProviderRegistrationSerializer(
  item: DefaultRolloutSpecificationProviderRegistration,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : providerRegistrationPropertiesSerializer(item["properties"]),
    kind: item["kind"],
  };
}

export function defaultRolloutSpecificationProviderRegistrationDeserializer(
  item: any,
): DefaultRolloutSpecificationProviderRegistration {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : providerRegistrationPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The auto provisioning config. */
export interface DefaultRolloutSpecificationAutoProvisionConfig {
  /** Whether auto provisioning for storage is enabled. */
  storage?: boolean;
  /** Whether auto provisioning for resource graph is enabled. */
  resourceGraph?: boolean;
}

export function defaultRolloutSpecificationAutoProvisionConfigSerializer(
  item: DefaultRolloutSpecificationAutoProvisionConfig,
): any {
  return { storage: item["storage"], resourceGraph: item["resourceGraph"] };
}

export function defaultRolloutSpecificationAutoProvisionConfigDeserializer(
  item: any,
): DefaultRolloutSpecificationAutoProvisionConfig {
  return {
    storage: item["storage"],
    resourceGraph: item["resourceGraph"],
  };
}

/** model interface ExpeditedRolloutDefinition */
export interface ExpeditedRolloutDefinition {
  /** Indicates whether expedited rollout is enabled/disabled */
  enabled?: boolean;
}

export function expeditedRolloutDefinitionSerializer(item: ExpeditedRolloutDefinition): any {
  return { enabled: item["enabled"] };
}

export function expeditedRolloutDefinitionDeserializer(item: any): ExpeditedRolloutDefinition {
  return {
    enabled: item["enabled"],
  };
}

/** model interface CanaryTrafficRegionRolloutConfiguration */
export interface CanaryTrafficRegionRolloutConfiguration {
  /** The skip regions. */
  skipRegions?: string[];
  /** The regions. */
  regions?: string[];
}

export function canaryTrafficRegionRolloutConfigurationSerializer(
  item: CanaryTrafficRegionRolloutConfiguration,
): any {
  return {
    skipRegions: !item["skipRegions"]
      ? item["skipRegions"]
      : item["skipRegions"].map((p: any) => {
          return p;
        }),
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

export function canaryTrafficRegionRolloutConfigurationDeserializer(
  item: any,
): CanaryTrafficRegionRolloutConfiguration {
  return {
    skipRegions: !item["skipRegions"]
      ? item["skipRegions"]
      : item["skipRegions"].map((p: any) => {
          return p;
        }),
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface TrafficRegionRolloutConfiguration */
export interface TrafficRegionRolloutConfiguration extends TrafficRegions {
  /** The wait duration. */
  waitDuration?: string;
}

export function trafficRegionRolloutConfigurationSerializer(
  item: TrafficRegionRolloutConfiguration,
): any {
  return {
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
    waitDuration: item["waitDuration"],
  };
}

export function trafficRegionRolloutConfigurationDeserializer(
  item: any,
): TrafficRegionRolloutConfiguration {
  return {
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
    waitDuration: item["waitDuration"],
  };
}

/** model interface DefaultRolloutStatus */
export interface DefaultRolloutStatus extends RolloutStatusBase {
  /** The next traffic region. */
  nextTrafficRegion?: TrafficRegionCategory;
  /** The next traffic region scheduled time. */
  nextTrafficRegionScheduledTime?: Date;
  /** The subscription reregistration result. */
  subscriptionReregistrationResult?: SubscriptionReregistrationResult;
  /** The manifest checkin status. */
  manifestCheckinStatus?: DefaultRolloutStatusManifestCheckinStatus;
}

export function defaultRolloutStatusSerializer(item: DefaultRolloutStatus): any {
  return {
    completedRegions: !item["completedRegions"]
      ? item["completedRegions"]
      : item["completedRegions"].map((p: any) => {
          return p;
        }),
    failedOrSkippedRegions: !item["failedOrSkippedRegions"]
      ? item["failedOrSkippedRegions"]
      : extendedErrorInfoRecordSerializer(item["failedOrSkippedRegions"]),
    nextTrafficRegion: item["nextTrafficRegion"],
    nextTrafficRegionScheduledTime: !item["nextTrafficRegionScheduledTime"]
      ? item["nextTrafficRegionScheduledTime"]
      : item["nextTrafficRegionScheduledTime"].toISOString(),
    subscriptionReregistrationResult: item["subscriptionReregistrationResult"],
    manifestCheckinStatus: !item["manifestCheckinStatus"]
      ? item["manifestCheckinStatus"]
      : defaultRolloutStatusManifestCheckinStatusSerializer(item["manifestCheckinStatus"]),
  };
}

export function defaultRolloutStatusDeserializer(item: any): DefaultRolloutStatus {
  return {
    completedRegions: !item["completedRegions"]
      ? item["completedRegions"]
      : item["completedRegions"].map((p: any) => {
          return p;
        }),
    failedOrSkippedRegions: !item["failedOrSkippedRegions"]
      ? item["failedOrSkippedRegions"]
      : extendedErrorInfoRecordDeserializer(item["failedOrSkippedRegions"]),
    nextTrafficRegion: item["nextTrafficRegion"],
    nextTrafficRegionScheduledTime: !item["nextTrafficRegionScheduledTime"]
      ? item["nextTrafficRegionScheduledTime"]
      : new Date(item["nextTrafficRegionScheduledTime"]),
    subscriptionReregistrationResult: item["subscriptionReregistrationResult"],
    manifestCheckinStatus: !item["manifestCheckinStatus"]
      ? item["manifestCheckinStatus"]
      : defaultRolloutStatusManifestCheckinStatusDeserializer(item["manifestCheckinStatus"]),
  };
}

/** The next traffic region. */
export enum KnownTrafficRegionCategory {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Canary */
  Canary = "Canary",
  /** LowTraffic */
  LowTraffic = "LowTraffic",
  /** MediumTraffic */
  MediumTraffic = "MediumTraffic",
  /** HighTraffic */
  HighTraffic = "HighTraffic",
  /** None */
  None = "None",
  /** RestOfTheWorldGroupOne */
  RestOfTheWorldGroupOne = "RestOfTheWorldGroupOne",
  /** RestOfTheWorldGroupTwo */
  RestOfTheWorldGroupTwo = "RestOfTheWorldGroupTwo",
}

/**
 * The next traffic region. \
 * {@link KnownTrafficRegionCategory} can be used interchangeably with TrafficRegionCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Canary** \
 * **LowTraffic** \
 * **MediumTraffic** \
 * **HighTraffic** \
 * **None** \
 * **RestOfTheWorldGroupOne** \
 * **RestOfTheWorldGroupTwo**
 */
export type TrafficRegionCategory = string;

/** The subscription reregistration result. */
export enum KnownSubscriptionReregistrationResult {
  /** NotApplicable */
  NotApplicable = "NotApplicable",
  /** ConditionalUpdate */
  ConditionalUpdate = "ConditionalUpdate",
  /** ForcedUpdate */
  ForcedUpdate = "ForcedUpdate",
  /** Failed */
  Failed = "Failed",
}

/**
 * The subscription reregistration result. \
 * {@link KnownSubscriptionReregistrationResult} can be used interchangeably with SubscriptionReregistrationResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotApplicable** \
 * **ConditionalUpdate** \
 * **ForcedUpdate** \
 * **Failed**
 */
export type SubscriptionReregistrationResult = string;

/** The manifest checkin status. */
export interface DefaultRolloutStatusManifestCheckinStatus extends CheckinManifestInfo {}

export function defaultRolloutStatusManifestCheckinStatusSerializer(
  item: DefaultRolloutStatusManifestCheckinStatus,
): any {
  return {
    isCheckedIn: item["isCheckedIn"],
    statusMessage: item["statusMessage"],
    pullRequest: item["pullRequest"],
    commitId: item["commitId"],
  };
}

export function defaultRolloutStatusManifestCheckinStatusDeserializer(
  item: any,
): DefaultRolloutStatusManifestCheckinStatus {
  return {
    isCheckedIn: item["isCheckedIn"],
    statusMessage: item["statusMessage"],
    pullRequest: item["pullRequest"],
    commitId: item["commitId"],
  };
}

/** model interface RolloutStatusBase */
export interface RolloutStatusBase {
  /** The completed regions. */
  completedRegions?: string[];
  /** The failed or skipped regions. */
  failedOrSkippedRegions?: Record<string, ExtendedErrorInfo>;
}

export function rolloutStatusBaseSerializer(item: RolloutStatusBase): any {
  return {
    completedRegions: !item["completedRegions"]
      ? item["completedRegions"]
      : item["completedRegions"].map((p: any) => {
          return p;
        }),
    failedOrSkippedRegions: !item["failedOrSkippedRegions"]
      ? item["failedOrSkippedRegions"]
      : extendedErrorInfoRecordSerializer(item["failedOrSkippedRegions"]),
  };
}

export function rolloutStatusBaseDeserializer(item: any): RolloutStatusBase {
  return {
    completedRegions: !item["completedRegions"]
      ? item["completedRegions"]
      : item["completedRegions"].map((p: any) => {
          return p;
        }),
    failedOrSkippedRegions: !item["failedOrSkippedRegions"]
      ? item["failedOrSkippedRegions"]
      : extendedErrorInfoRecordDeserializer(item["failedOrSkippedRegions"]),
  };
}

/** model interface FrontloadPayload */
export interface FrontloadPayload {
  /** Properties of the frontload payload. */
  properties: FrontloadPayloadProperties;
}

export function frontloadPayloadSerializer(item: FrontloadPayload): any {
  return { properties: frontloadPayloadPropertiesSerializer(item["properties"]) };
}

/** model interface FrontloadPayloadProperties */
export interface FrontloadPayloadProperties {
  /** The operation type. */
  operationType: string;
  /** The provider namespace. */
  providerNamespace: string;
  /** The frontload location. */
  frontloadLocation: string;
  /** The copy from location. */
  copyFromLocation: string;
  /** The environment type. */
  environmentType: AvailableCheckInManifestEnvironment;
  /** The service feature flag. */
  serviceFeatureFlag: ServiceFeatureFlagAction;
  /** The resource types to include. */
  includeResourceTypes: string[];
  /** The resource types to exclude. */
  excludeResourceTypes: string[];
  /** The manifest level fields to override. */
  overrideManifestLevelFields: FrontloadPayloadPropertiesOverrideManifestLevelFields;
  /** The endpoint level fields to override. */
  overrideEndpointLevelFields: FrontloadPayloadPropertiesOverrideEndpointLevelFields;
  /** The fields to ignore. */
  ignoreFields: string[];
}

export function frontloadPayloadPropertiesSerializer(item: FrontloadPayloadProperties): any {
  return {
    operationType: item["operationType"],
    providerNamespace: item["providerNamespace"],
    frontloadLocation: item["frontloadLocation"],
    copyFromLocation: item["copyFromLocation"],
    environmentType: item["environmentType"],
    serviceFeatureFlag: item["serviceFeatureFlag"],
    includeResourceTypes: item["includeResourceTypes"].map((p: any) => {
      return p;
    }),
    excludeResourceTypes: item["excludeResourceTypes"].map((p: any) => {
      return p;
    }),
    overrideManifestLevelFields: frontloadPayloadPropertiesOverrideManifestLevelFieldsSerializer(
      item["overrideManifestLevelFields"],
    ),
    overrideEndpointLevelFields: frontloadPayloadPropertiesOverrideEndpointLevelFieldsSerializer(
      item["overrideEndpointLevelFields"],
    ),
    ignoreFields: item["ignoreFields"].map((p: any) => {
      return p;
    }),
  };
}

/** The environment type. */
export enum KnownAvailableCheckInManifestEnvironment {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Canary */
  Canary = "Canary",
  /** Prod */
  Prod = "Prod",
  /** All */
  All = "All",
  /** Mooncake */
  Mooncake = "Mooncake",
  /** Fairfax */
  Fairfax = "Fairfax",
}

/**
 * The environment type. \
 * {@link KnownAvailableCheckInManifestEnvironment} can be used interchangeably with AvailableCheckInManifestEnvironment,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Canary** \
 * **Prod** \
 * **All** \
 * **Mooncake** \
 * **Fairfax**
 */
export type AvailableCheckInManifestEnvironment = string;

/** The service feature flag. */
export enum KnownServiceFeatureFlagAction {
  /** DoNotCreate */
  DoNotCreate = "DoNotCreate",
  /** Create */
  Create = "Create",
}

/**
 * The service feature flag. \
 * {@link KnownServiceFeatureFlagAction} can be used interchangeably with ServiceFeatureFlagAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DoNotCreate** \
 * **Create**
 */
export type ServiceFeatureFlagAction = string;

/** The manifest level fields to override. */
export interface FrontloadPayloadPropertiesOverrideManifestLevelFields extends ManifestLevelPropertyBag {}

export function frontloadPayloadPropertiesOverrideManifestLevelFieldsSerializer(
  item: FrontloadPayloadPropertiesOverrideManifestLevelFields,
): any {
  return {
    resourceHydrationAccounts: !item["resourceHydrationAccounts"]
      ? item["resourceHydrationAccounts"]
      : resourceHydrationAccountArraySerializer(item["resourceHydrationAccounts"]),
  };
}

/** The endpoint level fields to override. */
export interface FrontloadPayloadPropertiesOverrideEndpointLevelFields extends ResourceTypeEndpointBase {}

export function frontloadPayloadPropertiesOverrideEndpointLevelFieldsSerializer(
  item: FrontloadPayloadPropertiesOverrideEndpointLevelFields,
): any {
  return {
    enabled: item["enabled"],
    apiVersions: item["apiVersions"].map((p: any) => {
      return p;
    }),
    endpointUri: item["endpointUri"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    requiredFeatures: item["requiredFeatures"].map((p: any) => {
      return p;
    }),
    featuresRule: resourceTypeEndpointBaseFeaturesRuleSerializer(item["featuresRule"]),
    timeout: item["timeout"],
    endpointType: item["endpointType"],
    dstsConfiguration: resourceTypeEndpointBaseDstsConfigurationSerializer(
      item["dstsConfiguration"],
    ),
    skuLink: item["skuLink"],
    apiVersion: item["apiVersion"],
    zones: item["zones"].map((p: any) => {
      return p;
    }),
  };
}

/** model interface ManifestLevelPropertyBag */
export interface ManifestLevelPropertyBag {
  /** The resource hydration accounts. */
  resourceHydrationAccounts?: ResourceHydrationAccount[];
}

export function manifestLevelPropertyBagSerializer(item: ManifestLevelPropertyBag): any {
  return {
    resourceHydrationAccounts: !item["resourceHydrationAccounts"]
      ? item["resourceHydrationAccounts"]
      : resourceHydrationAccountArraySerializer(item["resourceHydrationAccounts"]),
  };
}

/** model interface ResourceTypeEndpointBase */
export interface ResourceTypeEndpointBase {
  /** Whether it's enabled. */
  enabled: boolean;
  /** The api versions. */
  apiVersions: string[];
  /** The endpoint uri. */
  endpointUri: string;
  /** The locations. */
  locations: string[];
  /** The required features. */
  requiredFeatures: string[];
  /** The features rule. */
  featuresRule: ResourceTypeEndpointBaseFeaturesRule;
  /** This is a TimeSpan property. */
  timeout: string;
  /** The endpoint type. */
  endpointType: EndpointType;
  /** The dsts configuration. */
  dstsConfiguration: ResourceTypeEndpointBaseDstsConfiguration;
  /** The sku link. */
  skuLink: string;
  /** The api version. */
  apiVersion: string;
  /** The zones. */
  zones: string[];
}

export function resourceTypeEndpointBaseSerializer(item: ResourceTypeEndpointBase): any {
  return {
    enabled: item["enabled"],
    apiVersions: item["apiVersions"].map((p: any) => {
      return p;
    }),
    endpointUri: item["endpointUri"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    requiredFeatures: item["requiredFeatures"].map((p: any) => {
      return p;
    }),
    featuresRule: resourceTypeEndpointBaseFeaturesRuleSerializer(item["featuresRule"]),
    timeout: item["timeout"],
    endpointType: item["endpointType"],
    dstsConfiguration: resourceTypeEndpointBaseDstsConfigurationSerializer(
      item["dstsConfiguration"],
    ),
    skuLink: item["skuLink"],
    apiVersion: item["apiVersion"],
    zones: item["zones"].map((p: any) => {
      return p;
    }),
  };
}

/** The features rule. */
export interface ResourceTypeEndpointBaseFeaturesRule extends FeaturesRule {}

export function resourceTypeEndpointBaseFeaturesRuleSerializer(
  item: ResourceTypeEndpointBaseFeaturesRule,
): any {
  return { requiredFeaturesPolicy: item["requiredFeaturesPolicy"] };
}

/** The dsts configuration. */
export interface ResourceTypeEndpointBaseDstsConfiguration extends DstsConfiguration {}

export function resourceTypeEndpointBaseDstsConfigurationSerializer(
  item: ResourceTypeEndpointBaseDstsConfiguration,
): any {
  return { serviceName: item["serviceName"], serviceDnsName: item["serviceDnsName"] };
}

/** Paged collection of ProviderRegistration items */
export interface _ProviderRegistrationArrayResponseWithContinuation {
  /** The ProviderRegistration items on this page */
  value: ProviderRegistration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _providerRegistrationArrayResponseWithContinuationDeserializer(
  item: any,
): _ProviderRegistrationArrayResponseWithContinuation {
  return {
    value: providerRegistrationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function providerRegistrationArraySerializer(result: Array<ProviderRegistration>): any[] {
  return result.map((item) => {
    return providerRegistrationSerializer(item);
  });
}

export function providerRegistrationArrayDeserializer(result: Array<ProviderRegistration>): any[] {
  return result.map((item) => {
    return providerRegistrationDeserializer(item);
  });
}

/** Paged collection of DefaultRollout items */
export interface _DefaultRolloutArrayResponseWithContinuation {
  /** The DefaultRollout items on this page */
  value: DefaultRollout[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _defaultRolloutArrayResponseWithContinuationDeserializer(
  item: any,
): _DefaultRolloutArrayResponseWithContinuation {
  return {
    value: defaultRolloutArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function defaultRolloutArraySerializer(result: Array<DefaultRollout>): any[] {
  return result.map((item) => {
    return defaultRolloutSerializer(item);
  });
}

export function defaultRolloutArrayDeserializer(result: Array<DefaultRollout>): any[] {
  return result.map((item) => {
    return defaultRolloutDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface NotificationRegistration extends ProxyResource {
  properties?: NotificationRegistrationProperties;
}

export function notificationRegistrationSerializer(item: NotificationRegistration): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : notificationRegistrationPropertiesSerializer(item["properties"]),
  };
}

export function notificationRegistrationDeserializer(item: any): NotificationRegistration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : notificationRegistrationPropertiesDeserializer(item["properties"]),
  };
}

/** model interface NotificationRegistrationProperties */
export interface NotificationRegistrationProperties {
  /** The notification mode. */
  notificationMode?: NotificationMode;
  /** The message scope. */
  messageScope?: MessageScope;
  /** The included events. */
  includedEvents?: string[];
  /** The notification endpoints. */
  notificationEndpoints?: NotificationEndpoint[];
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function notificationRegistrationPropertiesSerializer(
  item: NotificationRegistrationProperties,
): any {
  return {
    notificationMode: item["notificationMode"],
    messageScope: item["messageScope"],
    includedEvents: !item["includedEvents"]
      ? item["includedEvents"]
      : item["includedEvents"].map((p: any) => {
          return p;
        }),
    notificationEndpoints: !item["notificationEndpoints"]
      ? item["notificationEndpoints"]
      : notificationEndpointArraySerializer(item["notificationEndpoints"]),
  };
}

export function notificationRegistrationPropertiesDeserializer(
  item: any,
): NotificationRegistrationProperties {
  return {
    notificationMode: item["notificationMode"],
    messageScope: item["messageScope"],
    includedEvents: !item["includedEvents"]
      ? item["includedEvents"]
      : item["includedEvents"].map((p: any) => {
          return p;
        }),
    notificationEndpoints: !item["notificationEndpoints"]
      ? item["notificationEndpoints"]
      : notificationEndpointArrayDeserializer(item["notificationEndpoints"]),
    provisioningState: item["provisioningState"],
  };
}

/** The notification mode. */
export enum KnownNotificationMode {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** EventHub */
  EventHub = "EventHub",
  /** WebHook */
  WebHook = "WebHook",
}

/**
 * The notification mode. \
 * {@link KnownNotificationMode} can be used interchangeably with NotificationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **EventHub** \
 * **WebHook**
 */
export type NotificationMode = string;

/** The message scope. */
export enum KnownMessageScope {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** RegisteredSubscriptions */
  RegisteredSubscriptions = "RegisteredSubscriptions",
}

/**
 * The message scope. \
 * {@link KnownMessageScope} can be used interchangeably with MessageScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **RegisteredSubscriptions**
 */
export type MessageScope = string;

export function notificationEndpointArraySerializer(result: Array<NotificationEndpoint>): any[] {
  return result.map((item) => {
    return notificationEndpointSerializer(item);
  });
}

export function notificationEndpointArrayDeserializer(result: Array<NotificationEndpoint>): any[] {
  return result.map((item) => {
    return notificationEndpointDeserializer(item);
  });
}

/** model interface NotificationEndpoint */
export interface NotificationEndpoint {
  /** The notification destination. */
  notificationDestination?: string;
  /** The locations. */
  locations?: string[];
}

export function notificationEndpointSerializer(item: NotificationEndpoint): any {
  return {
    notificationDestination: item["notificationDestination"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
  };
}

export function notificationEndpointDeserializer(item: any): NotificationEndpoint {
  return {
    notificationDestination: item["notificationDestination"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
  };
}

/** Paged collection of NotificationRegistration items */
export interface _NotificationRegistrationArrayResponseWithContinuation {
  /** The NotificationRegistration items on this page */
  value: NotificationRegistration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _notificationRegistrationArrayResponseWithContinuationDeserializer(
  item: any,
): _NotificationRegistrationArrayResponseWithContinuation {
  return {
    value: notificationRegistrationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function notificationRegistrationArraySerializer(
  result: Array<NotificationRegistration>,
): any[] {
  return result.map((item) => {
    return notificationRegistrationSerializer(item);
  });
}

export function notificationRegistrationArrayDeserializer(
  result: Array<NotificationRegistration>,
): any[] {
  return result.map((item) => {
    return notificationRegistrationDeserializer(item);
  });
}

/** Paged collection of ResourceTypeRegistration items */
export interface _ResourceTypeRegistrationArrayResponseWithContinuation {
  /** The ResourceTypeRegistration items on this page */
  value: ResourceTypeRegistration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceTypeRegistrationArrayResponseWithContinuationDeserializer(
  item: any,
): _ResourceTypeRegistrationArrayResponseWithContinuation {
  return {
    value: resourceTypeRegistrationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface SkuResource extends ProxyResource {
  properties?: SkuResourceProperties;
}

export function skuResourceSerializer(item: SkuResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : skuResourcePropertiesSerializer(item["properties"]),
  };
}

export function skuResourceDeserializer(item: any): SkuResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : skuResourcePropertiesDeserializer(item["properties"]),
  };
}

/** model interface SkuResourceProperties */
export interface SkuResourceProperties extends ResourceTypeSku {}

export function skuResourcePropertiesSerializer(item: SkuResourceProperties): any {
  return { skuSettings: skuSettingArraySerializer(item["skuSettings"]) };
}

export function skuResourcePropertiesDeserializer(item: any): SkuResourceProperties {
  return {
    skuSettings: skuSettingArrayDeserializer(item["skuSettings"]),
    provisioningState: item["provisioningState"],
  };
}

/** model interface ResourceTypeSku */
export interface ResourceTypeSku {
  /** The sku settings. */
  skuSettings: SkuSetting[];
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
}

export function resourceTypeSkuSerializer(item: ResourceTypeSku): any {
  return { skuSettings: skuSettingArraySerializer(item["skuSettings"]) };
}

export function resourceTypeSkuDeserializer(item: any): ResourceTypeSku {
  return {
    skuSettings: skuSettingArrayDeserializer(item["skuSettings"]),
    provisioningState: item["provisioningState"],
  };
}

export function skuSettingArraySerializer(result: Array<SkuSetting>): any[] {
  return result.map((item) => {
    return skuSettingSerializer(item);
  });
}

export function skuSettingArrayDeserializer(result: Array<SkuSetting>): any[] {
  return result.map((item) => {
    return skuSettingDeserializer(item);
  });
}

/** model interface SkuSetting */
export interface SkuSetting {
  /** The name. */
  name: string;
  /** The tier. */
  tier?: string;
  /** The size. */
  size?: string;
  /** The family. */
  family?: string;
  /** The kind. */
  kind?: string;
  /** The locations. */
  locations?: string[];
  /** The location info. */
  locationInfo?: SkuLocationInfo[];
  /** The required quota ids. */
  requiredQuotaIds?: string[];
  /** The required features. */
  requiredFeatures?: string[];
  /** The capacity. */
  capacity?: SkuSettingCapacity;
  /** The costs. */
  costs?: SkuCost[];
  /** The capabilities. */
  capabilities?: SkuCapability[];
}

export function skuSettingSerializer(item: SkuSetting): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    kind: item["kind"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    locationInfo: !item["locationInfo"]
      ? item["locationInfo"]
      : skuLocationInfoArraySerializer(item["locationInfo"]),
    requiredQuotaIds: !item["requiredQuotaIds"]
      ? item["requiredQuotaIds"]
      : item["requiredQuotaIds"].map((p: any) => {
          return p;
        }),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    capacity: !item["capacity"] ? item["capacity"] : skuSettingCapacitySerializer(item["capacity"]),
    costs: !item["costs"] ? item["costs"] : skuCostArraySerializer(item["costs"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : skuCapabilityArraySerializer(item["capabilities"]),
  };
}

export function skuSettingDeserializer(item: any): SkuSetting {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    kind: item["kind"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    locationInfo: !item["locationInfo"]
      ? item["locationInfo"]
      : skuLocationInfoArrayDeserializer(item["locationInfo"]),
    requiredQuotaIds: !item["requiredQuotaIds"]
      ? item["requiredQuotaIds"]
      : item["requiredQuotaIds"].map((p: any) => {
          return p;
        }),
    requiredFeatures: !item["requiredFeatures"]
      ? item["requiredFeatures"]
      : item["requiredFeatures"].map((p: any) => {
          return p;
        }),
    capacity: !item["capacity"]
      ? item["capacity"]
      : skuSettingCapacityDeserializer(item["capacity"]),
    costs: !item["costs"] ? item["costs"] : skuCostArrayDeserializer(item["costs"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : skuCapabilityArrayDeserializer(item["capabilities"]),
  };
}

export function skuLocationInfoArraySerializer(result: Array<SkuLocationInfo>): any[] {
  return result.map((item) => {
    return skuLocationInfoSerializer(item);
  });
}

export function skuLocationInfoArrayDeserializer(result: Array<SkuLocationInfo>): any[] {
  return result.map((item) => {
    return skuLocationInfoDeserializer(item);
  });
}

/** model interface SkuLocationInfo */
export interface SkuLocationInfo {
  /** The location. */
  location: string;
  /** The zones. */
  zones?: string[];
  /** The zone details. */
  zoneDetails?: SkuZoneDetail[];
  /** The extended locations. */
  extendedLocations?: string[];
  /** The type. */
  type?: ExtendedLocationType;
}

export function skuLocationInfoSerializer(item: SkuLocationInfo): any {
  return {
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    zoneDetails: !item["zoneDetails"]
      ? item["zoneDetails"]
      : skuZoneDetailArraySerializer(item["zoneDetails"]),
    extendedLocations: !item["extendedLocations"]
      ? item["extendedLocations"]
      : item["extendedLocations"].map((p: any) => {
          return p;
        }),
    type: item["type"],
  };
}

export function skuLocationInfoDeserializer(item: any): SkuLocationInfo {
  return {
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    zoneDetails: !item["zoneDetails"]
      ? item["zoneDetails"]
      : skuZoneDetailArrayDeserializer(item["zoneDetails"]),
    extendedLocations: !item["extendedLocations"]
      ? item["extendedLocations"]
      : item["extendedLocations"].map((p: any) => {
          return p;
        }),
    type: item["type"],
  };
}

export function skuZoneDetailArraySerializer(result: Array<SkuZoneDetail>): any[] {
  return result.map((item) => {
    return skuZoneDetailSerializer(item);
  });
}

export function skuZoneDetailArrayDeserializer(result: Array<SkuZoneDetail>): any[] {
  return result.map((item) => {
    return skuZoneDetailDeserializer(item);
  });
}

/** model interface SkuZoneDetail */
export interface SkuZoneDetail {
  /** The name. */
  name?: string[];
  /** The capabilities. */
  capabilities?: SkuCapability[];
}

export function skuZoneDetailSerializer(item: SkuZoneDetail): any {
  return {
    name: !item["name"]
      ? item["name"]
      : item["name"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : skuCapabilityArraySerializer(item["capabilities"]),
  };
}

export function skuZoneDetailDeserializer(item: any): SkuZoneDetail {
  return {
    name: !item["name"]
      ? item["name"]
      : item["name"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : skuCapabilityArrayDeserializer(item["capabilities"]),
  };
}

export function skuCapabilityArraySerializer(result: Array<SkuCapability>): any[] {
  return result.map((item) => {
    return skuCapabilitySerializer(item);
  });
}

export function skuCapabilityArrayDeserializer(result: Array<SkuCapability>): any[] {
  return result.map((item) => {
    return skuCapabilityDeserializer(item);
  });
}

/** model interface SkuCapability */
export interface SkuCapability {
  /** The name. */
  name: string;
  /** The value. */
  value: string;
}

export function skuCapabilitySerializer(item: SkuCapability): any {
  return { name: item["name"], value: item["value"] };
}

export function skuCapabilityDeserializer(item: any): SkuCapability {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The capacity. */
export interface SkuSettingCapacity extends SkuCapacity {}

export function skuSettingCapacitySerializer(item: SkuSettingCapacity): any {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

export function skuSettingCapacityDeserializer(item: any): SkuSettingCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

export function skuCostArraySerializer(result: Array<SkuCost>): any[] {
  return result.map((item) => {
    return skuCostSerializer(item);
  });
}

export function skuCostArrayDeserializer(result: Array<SkuCost>): any[] {
  return result.map((item) => {
    return skuCostDeserializer(item);
  });
}

/** model interface SkuCost */
export interface SkuCost {
  /** The meter id. */
  meterId: string;
  /** The quantity. */
  quantity?: number;
  /** The extended unit. */
  extendedUnit?: string;
}

export function skuCostSerializer(item: SkuCost): any {
  return {
    meterId: item["meterId"],
    quantity: item["quantity"],
    extendedUnit: item["extendedUnit"],
  };
}

export function skuCostDeserializer(item: any): SkuCost {
  return {
    meterId: item["meterId"],
    quantity: item["quantity"],
    extendedUnit: item["extendedUnit"],
  };
}

/** model interface SkuCapacity */
export interface SkuCapacity {
  /** The minimum. */
  minimum: number;
  /** The maximum. */
  maximum?: number;
  /** The default. */
  default?: number;
  /** The scale type. */
  scaleType?: SkuScaleType;
}

export function skuCapacitySerializer(item: SkuCapacity): any {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

export function skuCapacityDeserializer(item: any): SkuCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

/** The scale type. */
export enum KnownSkuScaleType {
  /** None */
  None = "None",
  /** Manual */
  Manual = "Manual",
  /** Automatic */
  Automatic = "Automatic",
}

/**
 * The scale type. \
 * {@link KnownSkuScaleType} can be used interchangeably with SkuScaleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Manual** \
 * **Automatic**
 */
export type SkuScaleType = string;

/** Paged collection of SkuResource items */
export interface _SkuResourceArrayResponseWithContinuation {
  /** The SkuResource items on this page */
  value: SkuResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _skuResourceArrayResponseWithContinuationDeserializer(
  item: any,
): _SkuResourceArrayResponseWithContinuation {
  return {
    value: skuResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function skuResourceArraySerializer(result: Array<SkuResource>): any[] {
  return result.map((item) => {
    return skuResourceSerializer(item);
  });
}

export function skuResourceArrayDeserializer(result: Array<SkuResource>): any[] {
  return result.map((item) => {
    return skuResourceDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface AuthorizedApplication extends ProxyResource {
  properties?: AuthorizedApplicationProperties;
}

export function authorizedApplicationSerializer(item: AuthorizedApplication): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : authorizedApplicationPropertiesSerializer(item["properties"]),
  };
}

export function authorizedApplicationDeserializer(item: any): AuthorizedApplication {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : authorizedApplicationPropertiesDeserializer(item["properties"]),
  };
}

/** model interface AuthorizedApplicationProperties */
export interface AuthorizedApplicationProperties {
  providerAuthorization?: ApplicationProviderAuthorization;
  /** The authorizations that determine the level of data access permissions on the specified resource types. */
  dataAuthorizations?: ApplicationDataAuthorization[];
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
}

export function authorizedApplicationPropertiesSerializer(
  item: AuthorizedApplicationProperties,
): any {
  return {
    providerAuthorization: !item["providerAuthorization"]
      ? item["providerAuthorization"]
      : applicationProviderAuthorizationSerializer(item["providerAuthorization"]),
    dataAuthorizations: !item["dataAuthorizations"]
      ? item["dataAuthorizations"]
      : applicationDataAuthorizationArraySerializer(item["dataAuthorizations"]),
  };
}

export function authorizedApplicationPropertiesDeserializer(
  item: any,
): AuthorizedApplicationProperties {
  return {
    providerAuthorization: !item["providerAuthorization"]
      ? item["providerAuthorization"]
      : applicationProviderAuthorizationDeserializer(item["providerAuthorization"]),
    dataAuthorizations: !item["dataAuthorizations"]
      ? item["dataAuthorizations"]
      : applicationDataAuthorizationArrayDeserializer(item["dataAuthorizations"]),
    provisioningState: item["provisioningState"],
  };
}

/** model interface ApplicationProviderAuthorization */
export interface ApplicationProviderAuthorization {
  /** The role definition ID for the application. */
  roleDefinitionId?: string;
  /** The managed by role definition ID for the application. */
  managedByRoleDefinitionId?: string;
}

export function applicationProviderAuthorizationSerializer(
  item: ApplicationProviderAuthorization,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    managedByRoleDefinitionId: item["managedByRoleDefinitionId"],
  };
}

export function applicationProviderAuthorizationDeserializer(
  item: any,
): ApplicationProviderAuthorization {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    managedByRoleDefinitionId: item["managedByRoleDefinitionId"],
  };
}

export function applicationDataAuthorizationArraySerializer(
  result: Array<ApplicationDataAuthorization>,
): any[] {
  return result.map((item) => {
    return applicationDataAuthorizationSerializer(item);
  });
}

export function applicationDataAuthorizationArrayDeserializer(
  result: Array<ApplicationDataAuthorization>,
): any[] {
  return result.map((item) => {
    return applicationDataAuthorizationDeserializer(item);
  });
}

/** model interface ApplicationDataAuthorization */
export interface ApplicationDataAuthorization {
  /** The ownership role the application has on the resource types. The service owner role gives the application owner permissions. The limited owner role gives elevated permissions but does not allow all the permissions of a service owner, such as read/write on internal metadata. */
  role: Role;
  /** The resource types from the defined resource types in the provider namespace that the application can access. If no resource types are specified and the role is service owner, the default is * which is all resource types */
  resourceTypes?: string[];
}

export function applicationDataAuthorizationSerializer(item: ApplicationDataAuthorization): any {
  return {
    role: item["role"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function applicationDataAuthorizationDeserializer(item: any): ApplicationDataAuthorization {
  return {
    role: item["role"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** The ownership role the application has on the resource types. The service owner role gives the application owner permissions. The limited owner role gives elevated permissions but does not allow all the permissions of a service owner, such as read/write on internal metadata. */
export enum KnownRole {
  /** ServiceOwner */
  ServiceOwner = "ServiceOwner",
  /** LimitedOwner */
  LimitedOwner = "LimitedOwner",
}

/**
 * The ownership role the application has on the resource types. The service owner role gives the application owner permissions. The limited owner role gives elevated permissions but does not allow all the permissions of a service owner, such as read/write on internal metadata. \
 * {@link KnownRole} can be used interchangeably with Role,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceOwner** \
 * **LimitedOwner**
 */
export type Role = string;

/** Paged collection of AuthorizedApplication items */
export interface _AuthorizedApplicationArrayResponseWithContinuation {
  /** The AuthorizedApplication items on this page */
  value: AuthorizedApplication[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _authorizedApplicationArrayResponseWithContinuationDeserializer(
  item: any,
): _AuthorizedApplicationArrayResponseWithContinuation {
  return {
    value: authorizedApplicationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function authorizedApplicationArraySerializer(result: Array<AuthorizedApplication>): any[] {
  return result.map((item) => {
    return authorizedApplicationSerializer(item);
  });
}

export function authorizedApplicationArrayDeserializer(
  result: Array<AuthorizedApplication>,
): any[] {
  return result.map((item) => {
    return authorizedApplicationDeserializer(item);
  });
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface ProviderMonitorSetting extends TrackedResource {
  properties?: ProviderMonitorSettingProperties;
}

export function providerMonitorSettingSerializer(item: ProviderMonitorSetting): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : providerMonitorSettingPropertiesSerializer(item["properties"]),
  };
}

export function providerMonitorSettingDeserializer(item: any): ProviderMonitorSetting {
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
      : providerMonitorSettingPropertiesDeserializer(item["properties"]),
  };
}

/** model interface ProviderMonitorSettingProperties */
export interface ProviderMonitorSettingProperties {
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
}

export function providerMonitorSettingPropertiesSerializer(
  item: ProviderMonitorSettingProperties,
): any {
  return item;
}

export function providerMonitorSettingPropertiesDeserializer(
  item: any,
): ProviderMonitorSettingProperties {
  return {
    provisioningState: item["provisioningState"],
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

/** Paged collection of ProviderMonitorSetting items */
export interface _ProviderMonitorSettingArrayResponseWithContinuation {
  /** The ProviderMonitorSetting items on this page */
  value: ProviderMonitorSetting[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _providerMonitorSettingArrayResponseWithContinuationDeserializer(
  item: any,
): _ProviderMonitorSettingArrayResponseWithContinuation {
  return {
    value: providerMonitorSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function providerMonitorSettingArraySerializer(
  result: Array<ProviderMonitorSetting>,
): any[] {
  return result.map((item) => {
    return providerMonitorSettingSerializer(item);
  });
}

export function providerMonitorSettingArrayDeserializer(
  result: Array<ProviderMonitorSetting>,
): any[] {
  return result.map((item) => {
    return providerMonitorSettingDeserializer(item);
  });
}

/** model interface ResourceManagementAction */
export interface ResourceManagementAction {
  /** resource management action content. */
  resources?: ResourceManagementEntity[];
}

export function resourceManagementActionSerializer(item: ResourceManagementAction): any {
  return {
    resources: !item["resources"]
      ? item["resources"]
      : resourceManagementEntityArraySerializer(item["resources"]),
  };
}

export function resourceManagementEntityArraySerializer(
  result: Array<ResourceManagementEntity>,
): any[] {
  return result.map((item) => {
    return resourceManagementEntitySerializer(item);
  });
}

/** model interface ResourceManagementEntity */
export interface ResourceManagementEntity {
  /** The resource id. */
  resourceId: string;
  /** The home tenant id. */
  homeTenantId?: string;
  /** The location. */
  location?: string;
  /** The operation status. */
  readonly status?: string;
}

export function resourceManagementEntitySerializer(item: ResourceManagementEntity): any {
  return {
    resourceId: item["resourceId"],
    homeTenantId: item["homeTenantId"],
    location: item["location"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-09-01 API version. */
  V20240901 = "2024-09-01",
}

export type ProviderRegistrationsGenerateOperationsResponse = { body: OperationsDefinition[] };

export type OperationsListByProviderRegistrationResponse = { body: OperationsDefinition[] };
