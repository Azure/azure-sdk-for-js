// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Schema of the AgriService resource from Microsoft.AgriculturePlatform resource provider. */
export interface AgriServiceResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AgriServiceResourceProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku?: Sku;
}

export function agriServiceResourceSerializer(item: AgriServiceResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : agriServiceResourcePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function agriServiceResourceDeserializer(
  item: any,
): AgriServiceResource {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : agriServiceResourcePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** Details of the Agriculture AgriDataManager. */
export interface AgriServiceResourceProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Config of the AgriService instance. */
  config?: AgriServiceConfig;
  /** Managed On Behalf Of Configuration. */
  readonly managedOnBehalfOfConfiguration?: ManagedOnBehalfOfConfiguration;
  /** Data connector credentials of AgriService instance. */
  dataConnectorCredentials?: DataConnectorCredentialMap[];
  /** AgriService installed solutions. */
  installedSolutions?: InstalledSolutionMap[];
}

export function agriServiceResourcePropertiesSerializer(
  item: AgriServiceResourceProperties,
): any {
  return {
    config: !item["config"]
      ? item["config"]
      : agriServiceConfigSerializer(item["config"]),
    dataConnectorCredentials: !item["dataConnectorCredentials"]
      ? item["dataConnectorCredentials"]
      : dataConnectorCredentialMapArraySerializer(
          item["dataConnectorCredentials"],
        ),
    installedSolutions: !item["installedSolutions"]
      ? item["installedSolutions"]
      : installedSolutionMapArraySerializer(item["installedSolutions"]),
  };
}

export function agriServiceResourcePropertiesDeserializer(
  item: any,
): AgriServiceResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    config: !item["config"]
      ? item["config"]
      : agriServiceConfigDeserializer(item["config"]),
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : managedOnBehalfOfConfigurationDeserializer(
          item["managedOnBehalfOfConfiguration"],
        ),
    dataConnectorCredentials: !item["dataConnectorCredentials"]
      ? item["dataConnectorCredentials"]
      : dataConnectorCredentialMapArrayDeserializer(
          item["dataConnectorCredentials"],
        ),
    installedSolutions: !item["installedSolutions"]
      ? item["installedSolutions"]
      : installedSolutionMapArrayDeserializer(item["installedSolutions"]),
  };
}

/** The status of the current operation. */
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
  /** The resource create request has been accepted */
  Accepted = "Accepted",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: The resource is being provisioned \
 * **Updating**: The resource is updating \
 * **Deleting**: The resource is being deleted \
 * **Accepted**: The resource create request has been accepted
 */
export type ProvisioningState = string;

/** Config of the AgriService resource instance. */
export interface AgriServiceConfig {
  /** Instance URI of the AgriService instance. */
  readonly instanceUri?: string;
  /** Version of AgriService instance. */
  readonly version?: string;
  /** App service resource Id. */
  readonly appServiceResourceId?: string;
  /** Cosmos Db resource Id. */
  readonly cosmosDbResourceId?: string;
  /** Storage account resource Id. */
  readonly storageAccountResourceId?: string;
  /** Key vault resource Id. */
  readonly keyVaultResourceId?: string;
  /** Redis cache resource Id. */
  readonly redisCacheResourceId?: string;
}

export function agriServiceConfigSerializer(item: AgriServiceConfig): any {
  return item;
}

export function agriServiceConfigDeserializer(item: any): AgriServiceConfig {
  return {
    instanceUri: item["instanceUri"],
    version: item["version"],
    appServiceResourceId: item["appServiceResourceId"],
    cosmosDbResourceId: item["cosmosDbResourceId"],
    storageAccountResourceId: item["storageAccountResourceId"],
    keyVaultResourceId: item["keyVaultResourceId"],
    redisCacheResourceId: item["redisCacheResourceId"],
  };
}

/** Configuration of the managed on behalf of resource. */
export interface ManagedOnBehalfOfConfiguration {
  /** Associated MoboBrokerResources. */
  readonly moboBrokerResources: MoboBrokerResource[];
}

export function managedOnBehalfOfConfigurationDeserializer(
  item: any,
): ManagedOnBehalfOfConfiguration {
  return {
    moboBrokerResources: moboBrokerResourceArrayDeserializer(
      item["moboBrokerResources"],
    ),
  };
}

export function moboBrokerResourceArrayDeserializer(
  result: Array<MoboBrokerResource>,
): any[] {
  return result.map((item) => {
    return moboBrokerResourceDeserializer(item);
  });
}

/** MoboBroker resource. */
export interface MoboBrokerResource {
  /**
   * The fully qualified resource ID of the MoboBroker resource.
   * Example: `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}`
   */
  readonly id: string;
}

export function moboBrokerResourceDeserializer(item: any): MoboBrokerResource {
  return {
    id: item["id"],
  };
}

export function dataConnectorCredentialMapArraySerializer(
  result: Array<DataConnectorCredentialMap>,
): any[] {
  return result.map((item) => {
    return dataConnectorCredentialMapSerializer(item);
  });
}

export function dataConnectorCredentialMapArrayDeserializer(
  result: Array<DataConnectorCredentialMap>,
): any[] {
  return result.map((item) => {
    return dataConnectorCredentialMapDeserializer(item);
  });
}

/** Mapping of data connector credentials. */
export interface DataConnectorCredentialMap {
  /** The key representing the credential. */
  key: string;
  /** The data connector credential value. */
  value: DataConnectorCredentials;
}

export function dataConnectorCredentialMapSerializer(
  item: DataConnectorCredentialMap,
): any {
  return {
    key: item["key"],
    value: dataConnectorCredentialsSerializer(item["value"]),
  };
}

export function dataConnectorCredentialMapDeserializer(
  item: any,
): DataConnectorCredentialMap {
  return {
    key: item["key"],
    value: dataConnectorCredentialsDeserializer(item["value"]),
  };
}

/** The properties related to an AgriService data connector. */
export interface DataConnectorCredentials {
  /** Type of credential. */
  kind?: AuthCredentialsKind;
  /** Client Id associated with the provider, if type of credentials is OAuthClientCredentials. */
  clientId?: string;
  /** Uri of the key vault */
  keyVaultUri?: string;
  /** Name of the key vault key. */
  keyName?: string;
  /** Version of the key vault key. */
  keyVersion?: string;
}

export function dataConnectorCredentialsSerializer(
  item: DataConnectorCredentials,
): any {
  return {
    kind: item["kind"],
    clientId: item["clientId"],
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

export function dataConnectorCredentialsDeserializer(
  item: any,
): DataConnectorCredentials {
  return {
    kind: item["kind"],
    clientId: item["clientId"],
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

/** Types of different kind of Data connector auth credentials supported. */
export enum KnownAuthCredentialsKind {
  /** OAuth Client Credential type */
  OAuthClientCredentials = "OAuthClientCredentials",
  /** API Key Auth Credential type */
  ApiKeyAuthCredentials = "ApiKeyAuthCredentials",
}

/**
 * Types of different kind of Data connector auth credentials supported. \
 * {@link KnownAuthCredentialsKind} can be used interchangeably with AuthCredentialsKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OAuthClientCredentials**: OAuth Client Credential type \
 * **ApiKeyAuthCredentials**: API Key Auth Credential type
 */
export type AuthCredentialsKind = string;

export function installedSolutionMapArraySerializer(
  result: Array<InstalledSolutionMap>,
): any[] {
  return result.map((item) => {
    return installedSolutionMapSerializer(item);
  });
}

export function installedSolutionMapArrayDeserializer(
  result: Array<InstalledSolutionMap>,
): any[] {
  return result.map((item) => {
    return installedSolutionMapDeserializer(item);
  });
}

/** Mapping of installed solutions. */
export interface InstalledSolutionMap {
  /** The key representing the installed solution. */
  key: string;
  /** The installed solution value. */
  value: Solution;
}

export function installedSolutionMapSerializer(
  item: InstalledSolutionMap,
): any {
  return { key: item["key"], value: solutionSerializer(item["value"]) };
}

export function installedSolutionMapDeserializer(
  item: any,
): InstalledSolutionMap {
  return {
    key: item["key"],
    value: solutionDeserializer(item["value"]),
  };
}

/** Installed data manager for Agriculture solution detail. */
export interface Solution {
  /** Application name of the solution. */
  applicationName?: string;
  /** Partner Id. */
  partnerId?: string;
  /** Marketplace publisher Id. */
  marketPlacePublisherId?: string;
  /** Saas subscription Id. */
  saasSubscriptionId?: string;
  /** Saas subscription name. */
  saasSubscriptionName?: string;
  /** Plan Id. */
  planId?: string;
}

export function solutionSerializer(item: Solution): any {
  return {
    applicationName: item["applicationName"],
    partnerId: item["partnerId"],
    marketPlacePublisherId: item["marketPlacePublisherId"],
    saasSubscriptionId: item["saasSubscriptionId"],
    saasSubscriptionName: item["saasSubscriptionName"],
    planId: item["planId"],
  };
}

export function solutionDeserializer(item: any): Solution {
  return {
    applicationName: item["applicationName"],
    partnerId: item["partnerId"],
    marketPlacePublisherId: item["marketPlacePublisherId"],
    saasSubscriptionId: item["saasSubscriptionId"],
    saasSubscriptionName: item["saasSubscriptionName"],
    planId: item["planId"],
  };
}

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

export function managedServiceIdentitySerializer(
  item: ManagedServiceIdentity,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(
  item: any,
): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
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

export function userAssignedIdentitySerializer(
  item: UserAssignedIdentity,
): any {
  return item;
}

export function userAssignedIdentityDeserializer(
  item: any,
): UserAssignedIdentity {
  return {
    clientId: item["clientId"],
    principalId: item["principalId"],
  };
}

/** The resource model definition representing SKU */
export interface Sku {
  /** The name of the SKU. Ex - P3. It is typically a letter+number code */
  name: string;
  /** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
  tier?: SkuTier;
  /** The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. */
  size?: string;
  /** If the service has different generations of hardware, for the same SKU, then that can be captured here. */
  family?: string;
  /** If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted. */
  capacity?: number;
}

export function skuSerializer(item: Sku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
export type SkuTier = "Free" | "Basic" | "Standard" | "Premium";

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
    createdAt: !item["createdAt"]
      ? item["createdAt"]
      : new Date(item["createdAt"]),
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

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"]
      ? item["error"]
      : errorDetailDeserializer(item["error"]),
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
    details: !item["details"]
      ? item["details"]
      : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(
  result: Array<ErrorDetail>,
): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(
  result: Array<ErrorAdditionalInfo>,
): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(
  item: any,
): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(
  item: any,
): _ErrorAdditionalInfoInfo {
  return item;
}

/** The type used for update operations of the AgriServiceResource. */
export interface AgriServiceResourceUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku?: Sku;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: AgriServiceResourceUpdateProperties;
}

export function agriServiceResourceUpdateSerializer(
  item: AgriServiceResourceUpdate,
): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : agriServiceResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the AgriServiceResource. */
export interface AgriServiceResourceUpdateProperties {
  /** Config of the AgriService instance. */
  config?: AgriServiceConfig;
  /** Data connector credentials of AgriService instance. */
  dataConnectorCredentials?: DataConnectorCredentialMap[];
  /** AgriService installed solutions. */
  installedSolutions?: InstalledSolutionMap[];
}

export function agriServiceResourceUpdatePropertiesSerializer(
  item: AgriServiceResourceUpdateProperties,
): any {
  return {
    config: !item["config"]
      ? item["config"]
      : agriServiceConfigSerializer(item["config"]),
    dataConnectorCredentials: !item["dataConnectorCredentials"]
      ? item["dataConnectorCredentials"]
      : dataConnectorCredentialMapArraySerializer(
          item["dataConnectorCredentials"],
        ),
    installedSolutions: !item["installedSolutions"]
      ? item["installedSolutions"]
      : installedSolutionMapArraySerializer(item["installedSolutions"]),
  };
}

/** The response of a AgriServiceResource list operation. */
export interface _AgriServiceResourceListResult {
  /** The AgriServiceResource items on this page */
  value: AgriServiceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _agriServiceResourceListResultDeserializer(
  item: any,
): _AgriServiceResourceListResult {
  return {
    value: agriServiceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function agriServiceResourceArraySerializer(
  result: Array<AgriServiceResource>,
): any[] {
  return result.map((item) => {
    return agriServiceResourceSerializer(item);
  });
}

export function agriServiceResourceArrayDeserializer(
  result: Array<AgriServiceResource>,
): any[] {
  return result.map((item) => {
    return agriServiceResourceDeserializer(item);
  });
}

/** The list of available agri solutions. */
export interface AvailableAgriSolutionListResult {
  /** Agri solutions list. */
  solutions: DataManagerForAgricultureSolution[];
}

export function availableAgriSolutionListResultDeserializer(
  item: any,
): AvailableAgriSolutionListResult {
  return {
    solutions: dataManagerForAgricultureSolutionArrayDeserializer(
      item["solutions"],
    ),
  };
}

export function dataManagerForAgricultureSolutionArrayDeserializer(
  result: Array<DataManagerForAgricultureSolution>,
): any[] {
  return result.map((item) => {
    return dataManagerForAgricultureSolutionDeserializer(item);
  });
}

/** Data Manager for Agriculture solution. */
export interface DataManagerForAgricultureSolution {
  /** Partner Id. */
  partnerId: string;
  /** Solution Id. */
  solutionId: string;
  /** Partner tenant Id. */
  partnerTenantId: string;
  /** Data access scopes. */
  dataAccessScopes: string[];
  /** Marketplace offer details. */
  marketPlaceOfferDetails: MarketPlaceOfferDetails;
  /** Saas application Id. */
  saasApplicationId: string;
  /** Entra application Id used to access azure data manager for agriculture instance. */
  accessAzureDataManagerForAgricultureApplicationId: string;
  /** Entra application name used to access azure data manager for agriculture instance. */
  accessAzureDataManagerForAgricultureApplicationName: string;
  /** Whether solution inference will validate input. */
  isValidateInput: boolean;
}

export function dataManagerForAgricultureSolutionDeserializer(
  item: any,
): DataManagerForAgricultureSolution {
  return {
    partnerId: item["partnerId"],
    solutionId: item["solutionId"],
    partnerTenantId: item["partnerTenantId"],
    dataAccessScopes: item["dataAccessScopes"].map((p: any) => {
      return p;
    }),
    marketPlaceOfferDetails: marketPlaceOfferDetailsDeserializer(
      item["marketPlaceOfferDetails"],
    ),
    saasApplicationId: item["saasApplicationId"],
    accessAzureDataManagerForAgricultureApplicationId:
      item["accessAzureDataManagerForAgricultureApplicationId"],
    accessAzureDataManagerForAgricultureApplicationName:
      item["accessAzureDataManagerForAgricultureApplicationName"],
    isValidateInput: item["isValidateInput"],
  };
}

/** Marketplace offer details of Agri solution. */
export interface MarketPlaceOfferDetails {
  /** Saas offer Id. */
  saasOfferId: string;
  /** Publisher Id. */
  publisherId: string;
}

export function marketPlaceOfferDetailsDeserializer(
  item: any,
): MarketPlaceOfferDetails {
  return {
    saasOfferId: item["saasOfferId"],
    publisherId: item["publisherId"],
  };
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(
  item: any,
): _OperationListResult {
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
    display: !item["display"]
      ? item["display"]
      : operationDisplayDeserializer(item["display"]),
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

/** Supported API versions for the Microsoft.AgriculturePlatform resource provider. */
export enum KnownVersions {
  /** The 2024-06-01-preview version. */
  V20240601Preview = "2024-06-01-preview",
}
