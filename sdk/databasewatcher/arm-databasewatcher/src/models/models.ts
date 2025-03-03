// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface SharedPrivateLinkResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SharedPrivateLinkResourceProperties;
}

export function sharedPrivateLinkResourceSerializer(item: SharedPrivateLinkResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : sharedPrivateLinkResourcePropertiesSerializer(item["properties"]),
  };
}

export function sharedPrivateLinkResourceDeserializer(item: any): SharedPrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sharedPrivateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The generic properties of a Shared Private Link resource. */
export interface SharedPrivateLinkResourceProperties {
  /** The resource ID of the resource the shared private link resource is for. */
  privateLinkResourceId: string;
  /** The group id from the provider of resource the shared private link resource is for. */
  groupId: string;
  /** The request message for requesting approval of the shared private link resource. */
  requestMessage: string;
  /** The DNS zone segment to be included in the DNS name of the shared private link. Value is required for Azure Data Explorer clusters and SQL managed instances, and must be omitted for SQL logical servers and key vaults. The value is the second segment of the host FQDN name of the resource that the shared private link resource is for. For example: if the host name is 'adx-cluster-21187695.eastus.kusto.windows.net', then the value is 'eastus'; if the host name is 'sql-mi-23961134.767d5869f605.database.windows.net', then the value is '767d5869f605'. */
  dnsZone?: string;
  /** Status of the shared private link resource. Can be Pending, Approved, Rejected or Disconnected. */
  readonly status?: SharedPrivateLinkResourceStatus;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function sharedPrivateLinkResourcePropertiesSerializer(
  item: SharedPrivateLinkResourceProperties,
): any {
  return {
    privateLinkResourceId: item["privateLinkResourceId"],
    groupId: item["groupId"],
    requestMessage: item["requestMessage"],
    dnsZone: item["dnsZone"],
  };
}

export function sharedPrivateLinkResourcePropertiesDeserializer(
  item: any,
): SharedPrivateLinkResourceProperties {
  return {
    privateLinkResourceId: item["privateLinkResourceId"],
    groupId: item["groupId"],
    requestMessage: item["requestMessage"],
    dnsZone: item["dnsZone"],
    status: item["status"],
    provisioningState: item["provisioningState"],
  };
}

/** Status of the shared private link resource. Can be Pending, Approved, Rejected or Disconnected. */
export enum KnownSharedPrivateLinkResourceStatus {
  /** The shared private link connection request was not yet authorized by the resource owner. */
  Pending = "Pending",
  /** The shared private link connection request was approved by the resource owner. */
  Approved = "Approved",
  /** The shared private link connection request was rejected by the resource owner. */
  Rejected = "Rejected",
  /** The shared private link connection request was disconnected by the resource owner. */
  Disconnected = "Disconnected",
}

/**
 * Status of the shared private link resource. Can be Pending, Approved, Rejected or Disconnected. \
 * {@link KnownSharedPrivateLinkResourceStatus} can be used interchangeably with SharedPrivateLinkResourceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: The shared private link connection request was not yet authorized by the resource owner. \
 * **Approved**: The shared private link connection request was approved by the resource owner. \
 * **Rejected**: The shared private link connection request was rejected by the resource owner. \
 * **Disconnected**: The shared private link connection request was disconnected by the resource owner.
 */
export type SharedPrivateLinkResourceStatus = string;

/** The provisioning state of a resource type. */
export enum KnownResourceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
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
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(item: any): _ErrorAdditionalInfoInfo {
  return item;
}

/** The response of a SharedPrivateLinkResource list operation. */
export interface _SharedPrivateLinkResourceListResult {
  /** The SharedPrivateLinkResource items on this page */
  value: SharedPrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sharedPrivateLinkResourceListResultDeserializer(
  item: any,
): _SharedPrivateLinkResourceListResult {
  return {
    value: sharedPrivateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sharedPrivateLinkResourceArraySerializer(
  result: Array<SharedPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return sharedPrivateLinkResourceSerializer(item);
  });
}

export function sharedPrivateLinkResourceArrayDeserializer(
  result: Array<SharedPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return sharedPrivateLinkResourceDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface Target extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: TargetPropertiesUnion;
}

export function targetSerializer(item: Target): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : targetPropertiesUnionSerializer(item["properties"]),
  };
}

export function targetDeserializer(item: any): Target {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : targetPropertiesUnionDeserializer(item["properties"]),
  };
}

/** The generic properties of a target. */
export interface TargetProperties {
  /** Discriminator property for TargetProperties. */
  /** The discriminator possible values: SqlDb, SqlEp, SqlMi */
  targetType: string;
  /** The type of authentication to use when connecting to a target. */
  targetAuthenticationType: TargetAuthenticationType;
  /** To use SQL authentication when connecting to targets, specify the vault where the login name and password secrets are stored. */
  targetVault?: VaultSecret;
  /** The FQDN host name of the server to use in the connection string when connecting to a target. For example, for an Azure SQL logical server in the Azure commercial cloud, the value might be 'sql-logical-server-22092780.database.windows.net'; for an Azure SQL managed instance in the Azure commercial cloud, the value might be 'sql-mi-39441134.767d5869f605.database.windows.net'. Port number and instance name must be specified separately. */
  connectionServerName: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function targetPropertiesSerializer(item: TargetProperties): any {
  return {
    targetType: item["targetType"],
    targetAuthenticationType: item["targetAuthenticationType"],
    targetVault: !item["targetVault"]
      ? item["targetVault"]
      : vaultSecretSerializer(item["targetVault"]),
    connectionServerName: item["connectionServerName"],
  };
}

export function targetPropertiesDeserializer(item: any): TargetProperties {
  return {
    targetType: item["targetType"],
    targetAuthenticationType: item["targetAuthenticationType"],
    targetVault: !item["targetVault"]
      ? item["targetVault"]
      : vaultSecretDeserializer(item["targetVault"]),
    connectionServerName: item["connectionServerName"],
    provisioningState: item["provisioningState"],
  };
}

/** Alias for TargetPropertiesUnion */
export type TargetPropertiesUnion =
  | SqlDbSingleDatabaseTargetProperties
  | SqlDbElasticPoolTargetProperties
  | SqlMiTargetProperties
  | TargetProperties;

export function targetPropertiesUnionSerializer(item: TargetPropertiesUnion): any {
  switch (item.targetType) {
    case "SqlDb":
      return sqlDbSingleDatabaseTargetPropertiesSerializer(
        item as SqlDbSingleDatabaseTargetProperties,
      );

    case "SqlEp":
      return sqlDbElasticPoolTargetPropertiesSerializer(item as SqlDbElasticPoolTargetProperties);

    case "SqlMi":
      return sqlMiTargetPropertiesSerializer(item as SqlMiTargetProperties);

    default:
      return targetPropertiesSerializer(item);
  }
}

export function targetPropertiesUnionDeserializer(item: any): TargetPropertiesUnion {
  switch (item.targetType) {
    case "SqlDb":
      return sqlDbSingleDatabaseTargetPropertiesDeserializer(
        item as SqlDbSingleDatabaseTargetProperties,
      );

    case "SqlEp":
      return sqlDbElasticPoolTargetPropertiesDeserializer(item as SqlDbElasticPoolTargetProperties);

    case "SqlMi":
      return sqlMiTargetPropertiesDeserializer(item as SqlMiTargetProperties);

    default:
      return targetPropertiesDeserializer(item);
  }
}

/** The type of authentication to use when connecting to a target. */
export enum KnownTargetAuthenticationType {
  /** The Azure Active Directory authentication. */
  Aad = "Aad",
  /** The SQL password authentication. */
  Sql = "Sql",
}

/**
 * The type of authentication to use when connecting to a target. \
 * {@link KnownTargetAuthenticationType} can be used interchangeably with TargetAuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Aad**: The Azure Active Directory authentication. \
 * **Sql**: The SQL password authentication.
 */
export type TargetAuthenticationType = string;

/** The vault specific details required if using SQL authentication to connect to a target. */
export interface VaultSecret {
  /** The Azure resource ID of the Key Vault instance storing database authentication secrets. */
  akvResourceId?: string;
  /** The path to the Key Vault secret storing the login name (aka user name, aka account name) for authentication to a target. */
  akvTargetUser?: string;
  /** The path to the Key Vault secret storing the password for authentication to a target. */
  akvTargetPassword?: string;
}

export function vaultSecretSerializer(item: VaultSecret): any {
  return {
    akvResourceId: item["akvResourceId"],
    akvTargetUser: item["akvTargetUser"],
    akvTargetPassword: item["akvTargetPassword"],
  };
}

export function vaultSecretDeserializer(item: any): VaultSecret {
  return {
    akvResourceId: item["akvResourceId"],
    akvTargetUser: item["akvTargetUser"],
    akvTargetPassword: item["akvTargetPassword"],
  };
}

/** The properties specific to a database in Azure SQL Database. */
export interface SqlDbSingleDatabaseTargetProperties extends TargetProperties {
  /** The Azure SQL DB single database target. */
  targetType: "SqlDb";
  /** The Azure resource ID of an Azure SQL DB database target. */
  sqlDbResourceId: string;
  /** Set to true to monitor a high availability replica of specified target, if any. */
  readIntent?: boolean;
}

export function sqlDbSingleDatabaseTargetPropertiesSerializer(
  item: SqlDbSingleDatabaseTargetProperties,
): any {
  return {
    targetType: item["targetType"],
    targetAuthenticationType: item["targetAuthenticationType"],
    targetVault: !item["targetVault"]
      ? item["targetVault"]
      : vaultSecretSerializer(item["targetVault"]),
    connectionServerName: item["connectionServerName"],
    sqlDbResourceId: item["sqlDbResourceId"],
    readIntent: item["readIntent"],
  };
}

export function sqlDbSingleDatabaseTargetPropertiesDeserializer(
  item: any,
): SqlDbSingleDatabaseTargetProperties {
  return {
    targetType: item["targetType"],
    targetAuthenticationType: item["targetAuthenticationType"],
    targetVault: !item["targetVault"]
      ? item["targetVault"]
      : vaultSecretDeserializer(item["targetVault"]),
    connectionServerName: item["connectionServerName"],
    provisioningState: item["provisioningState"],
    sqlDbResourceId: item["sqlDbResourceId"],
    readIntent: item["readIntent"],
  };
}

/** The properties specific to an elastic pool in Azure SQL Database. */
export interface SqlDbElasticPoolTargetProperties extends TargetProperties {
  /** The Azure SQL DB elastic pool target. */
  targetType: "SqlEp";
  /** The Azure resource ID of an Azure SQL DB elastic pool target. */
  sqlEpResourceId: string;
  /** The Azure resource ID of the anchor database used to connect to an elastic pool. */
  anchorDatabaseResourceId: string;
  /** Set to true to monitor a high availability replica of specified target, if any. */
  readIntent?: boolean;
}

export function sqlDbElasticPoolTargetPropertiesSerializer(
  item: SqlDbElasticPoolTargetProperties,
): any {
  return {
    targetType: item["targetType"],
    targetAuthenticationType: item["targetAuthenticationType"],
    targetVault: !item["targetVault"]
      ? item["targetVault"]
      : vaultSecretSerializer(item["targetVault"]),
    connectionServerName: item["connectionServerName"],
    sqlEpResourceId: item["sqlEpResourceId"],
    anchorDatabaseResourceId: item["anchorDatabaseResourceId"],
    readIntent: item["readIntent"],
  };
}

export function sqlDbElasticPoolTargetPropertiesDeserializer(
  item: any,
): SqlDbElasticPoolTargetProperties {
  return {
    targetType: item["targetType"],
    targetAuthenticationType: item["targetAuthenticationType"],
    targetVault: !item["targetVault"]
      ? item["targetVault"]
      : vaultSecretDeserializer(item["targetVault"]),
    connectionServerName: item["connectionServerName"],
    provisioningState: item["provisioningState"],
    sqlEpResourceId: item["sqlEpResourceId"],
    anchorDatabaseResourceId: item["anchorDatabaseResourceId"],
    readIntent: item["readIntent"],
  };
}

/** The properties specific to Azure SQL Managed Instance targets. */
export interface SqlMiTargetProperties extends TargetProperties {
  /** The Azure SQL Managed Instance target. */
  targetType: "SqlMi";
  /** The Azure resource ID of an Azure SQL Managed Instance target. */
  sqlMiResourceId: string;
  /** The TCP port number to optionally use in the connection string when connecting to an Azure SQL Managed Instance target. */
  connectionTcpPort?: number;
  /** Set to true to monitor a high availability replica of specified target, if any. */
  readIntent?: boolean;
}

export function sqlMiTargetPropertiesSerializer(item: SqlMiTargetProperties): any {
  return {
    targetType: item["targetType"],
    targetAuthenticationType: item["targetAuthenticationType"],
    targetVault: !item["targetVault"]
      ? item["targetVault"]
      : vaultSecretSerializer(item["targetVault"]),
    connectionServerName: item["connectionServerName"],
    sqlMiResourceId: item["sqlMiResourceId"],
    connectionTcpPort: item["connectionTcpPort"],
    readIntent: item["readIntent"],
  };
}

export function sqlMiTargetPropertiesDeserializer(item: any): SqlMiTargetProperties {
  return {
    targetType: item["targetType"],
    targetAuthenticationType: item["targetAuthenticationType"],
    targetVault: !item["targetVault"]
      ? item["targetVault"]
      : vaultSecretDeserializer(item["targetVault"]),
    connectionServerName: item["connectionServerName"],
    provisioningState: item["provisioningState"],
    sqlMiResourceId: item["sqlMiResourceId"],
    connectionTcpPort: item["connectionTcpPort"],
    readIntent: item["readIntent"],
  };
}

/** The response of a Target list operation. */
export interface _TargetListResult {
  /** The Target items on this page */
  value: Target[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _targetListResultDeserializer(item: any): _TargetListResult {
  return {
    value: targetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function targetArraySerializer(result: Array<Target>): any[] {
  return result.map((item) => {
    return targetSerializer(item);
  });
}

export function targetArrayDeserializer(result: Array<Target>): any[] {
  return result.map((item) => {
    return targetDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface HealthValidation extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: HealthValidationProperties;
}

export function healthValidationDeserializer(item: any): HealthValidation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : healthValidationPropertiesDeserializer(item["properties"]),
  };
}

/** The generic properties of the health validation resource. */
export interface HealthValidationProperties {
  /** The start time of health validation, in UTC. */
  readonly startTime: Date;
  /** The end time of health validation, in UTC. */
  readonly endTime: Date;
  /** The current health validation status. */
  readonly status: ValidationStatus;
  /** The list of issues found by health validation. */
  readonly issues: ValidationIssue[];
  /** The provisioning state of the health validation resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function healthValidationPropertiesDeserializer(item: any): HealthValidationProperties {
  return {
    startTime: new Date(item["startTime"]),
    endTime: new Date(item["endTime"]),
    status: item["status"],
    issues: validationIssueArrayDeserializer(item["issues"]),
    provisioningState: item["provisioningState"],
  };
}

/** Health validation status. */
export enum KnownValidationStatus {
  /** Health validation has not started. */
  NotStarted = "NotStarted",
  /** Health validation is running. */
  Running = "Running",
  /** Health validation completed successfully. */
  Succeeded = "Succeeded",
  /** Health validation failed. */
  Failed = "Failed",
  /** Health validation was canceled. */
  Canceled = "Canceled",
  /** Health validation timed out. */
  TimedOut = "TimedOut",
}

/**
 * Health validation status. \
 * {@link KnownvalidationStatus} can be used interchangeably with validationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: Health validation has not started. \
 * **Running**: Health validation is running. \
 * **Succeeded**: Health validation completed successfully. \
 * **Failed**: Health validation failed. \
 * **Canceled**: Health validation was canceled. \
 * **TimedOut**: Health validation timed out.
 */
export type ValidationStatus = string;

export function validationIssueArrayDeserializer(result: Array<ValidationIssue>): any[] {
  return result.map((item) => {
    return validationIssueDeserializer(item);
  });
}

/** The model of a health validation issue. */
export interface ValidationIssue {
  /** The error code of the issue. */
  readonly errorCode: string;
  /** The error message of the issue. */
  readonly errorMessage: string;
  /** The additional details for the issue. */
  readonly additionalDetails?: string;
  /** The recommendation for resolving the issue. */
  readonly recommendationMessage: string;
  /** The URL related to resolving the issue. */
  readonly recommendationUrl?: string;
  /** The resource ID of the Azure resource related to the issue. */
  readonly relatedResourceId?: string;
  /** The type of the Azure resource related to the issue. */
  readonly relatedResourceType?: string;
}

export function validationIssueDeserializer(item: any): ValidationIssue {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    additionalDetails: item["additionalDetails"],
    recommendationMessage: item["recommendationMessage"],
    recommendationUrl: item["recommendationUrl"],
    relatedResourceId: item["relatedResourceId"],
    relatedResourceType: item["relatedResourceType"],
  };
}

/** The response of a HealthValidation list operation. */
export interface _HealthValidationListResult {
  /** The HealthValidation items on this page */
  value: HealthValidation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _healthValidationListResultDeserializer(item: any): _HealthValidationListResult {
  return {
    value: healthValidationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function healthValidationArrayDeserializer(result: Array<HealthValidation>): any[] {
  return result.map((item) => {
    return healthValidationDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface AlertRuleResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AlertRuleResourceProperties;
}

export function alertRuleResourceSerializer(item: AlertRuleResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : alertRuleResourcePropertiesSerializer(item["properties"]),
  };
}

export function alertRuleResourceDeserializer(item: any): AlertRuleResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : alertRuleResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The generic properties of the alert rule proxy resource. */
export interface AlertRuleResourceProperties {
  /** The resource ID of the alert rule resource. */
  alertRuleResourceId: string;
  /** The properties with which the alert rule resource was created. */
  createdWithProperties: AlertRuleCreationProperties;
  /** The creation time of the alert rule resource. */
  creationTime: Date;
  /** The provisioning state of the alert rule resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** The template ID associated with alert rule resource. */
  alertRuleTemplateId: string;
  /** The alert rule template version. */
  alertRuleTemplateVersion: string;
}

export function alertRuleResourcePropertiesSerializer(item: AlertRuleResourceProperties): any {
  return {
    alertRuleResourceId: item["alertRuleResourceId"],
    createdWithProperties: item["createdWithProperties"],
    creationTime: item["creationTime"].toISOString(),
    alertRuleTemplateId: item["alertRuleTemplateId"],
    alertRuleTemplateVersion: item["alertRuleTemplateVersion"],
  };
}

export function alertRuleResourcePropertiesDeserializer(item: any): AlertRuleResourceProperties {
  return {
    alertRuleResourceId: item["alertRuleResourceId"],
    createdWithProperties: item["createdWithProperties"],
    creationTime: new Date(item["creationTime"]),
    provisioningState: item["provisioningState"],
    alertRuleTemplateId: item["alertRuleTemplateId"],
    alertRuleTemplateVersion: item["alertRuleTemplateVersion"],
  };
}

/** The properties with which the alert rule resource was created. */
export enum KnownAlertRuleCreationProperties {
  /** The alert rule was created with an action group. */
  CreatedWithActionGroup = "CreatedWithActionGroup",
  /** The alert rule was created with no properties. */
  None = "None",
}

/**
 * The properties with which the alert rule resource was created. \
 * {@link KnownalertRuleCreationProperties} can be used interchangeably with alertRuleCreationProperties,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CreatedWithActionGroup**: The alert rule was created with an action group. \
 * **None**: The alert rule was created with no properties.
 */
export type AlertRuleCreationProperties = string;

/** The response of a AlertRuleResource list operation. */
export interface _AlertRuleResourceListResult {
  /** The AlertRuleResource items on this page */
  value: AlertRuleResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertRuleResourceListResultDeserializer(item: any): _AlertRuleResourceListResult {
  return {
    value: alertRuleResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertRuleResourceArraySerializer(result: Array<AlertRuleResource>): any[] {
  return result.map((item) => {
    return alertRuleResourceSerializer(item);
  });
}

export function alertRuleResourceArrayDeserializer(result: Array<AlertRuleResource>): any[] {
  return result.map((item) => {
    return alertRuleResourceDeserializer(item);
  });
}

/** The DatabaseWatcherProviderHub resource. */
export interface Watcher extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: WatcherProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentityV4;
}

export function watcherSerializer(item: Watcher): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : watcherPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityV4Serializer(item["identity"]),
  };
}

export function watcherDeserializer(item: any): Watcher {
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
      : watcherPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityV4Deserializer(item["identity"]),
  };
}

/** The RP specific properties of the resource. */
export interface WatcherProperties {
  /** The data store for collected monitoring data. */
  datastore?: Datastore;
  /** The monitoring collection status of the watcher. */
  readonly status?: WatcherStatus;
  /** The provisioning state of the resource watcher. */
  readonly provisioningState?: DatabaseWatcherProvisioningState;
  /** The resource ID of a user-assigned managed identity that will be assigned to a new alert rule. */
  defaultAlertRuleIdentityResourceId?: string;
}

export function watcherPropertiesSerializer(item: WatcherProperties): any {
  return {
    datastore: !item["datastore"] ? item["datastore"] : datastoreSerializer(item["datastore"]),
    defaultAlertRuleIdentityResourceId: item["defaultAlertRuleIdentityResourceId"],
  };
}

export function watcherPropertiesDeserializer(item: any): WatcherProperties {
  return {
    datastore: !item["datastore"] ? item["datastore"] : datastoreDeserializer(item["datastore"]),
    status: item["status"],
    provisioningState: item["provisioningState"],
    defaultAlertRuleIdentityResourceId: item["defaultAlertRuleIdentityResourceId"],
  };
}

/** The properties of a data store. */
export interface Datastore {
  /** The Azure resource ID of an Azure Data Explorer cluster. */
  adxClusterResourceId?: string;
  /** The Kusto cluster display name. */
  kustoClusterDisplayName?: string;
  /** The Kusto cluster URI. */
  kustoClusterUri: string;
  /** The Kusto data ingestion URI. */
  kustoDataIngestionUri: string;
  /** The name of a Kusto database. */
  kustoDatabaseName: string;
  /** The Kusto management URL. */
  kustoManagementUrl: string;
  /** The type of a Kusto offering. */
  kustoOfferingType: KustoOfferingType;
}

export function datastoreSerializer(item: Datastore): any {
  return {
    adxClusterResourceId: item["adxClusterResourceId"],
    kustoClusterDisplayName: item["kustoClusterDisplayName"],
    kustoClusterUri: item["kustoClusterUri"],
    kustoDataIngestionUri: item["kustoDataIngestionUri"],
    kustoDatabaseName: item["kustoDatabaseName"],
    kustoManagementUrl: item["kustoManagementUrl"],
    kustoOfferingType: item["kustoOfferingType"],
  };
}

export function datastoreDeserializer(item: any): Datastore {
  return {
    adxClusterResourceId: item["adxClusterResourceId"],
    kustoClusterDisplayName: item["kustoClusterDisplayName"],
    kustoClusterUri: item["kustoClusterUri"],
    kustoDataIngestionUri: item["kustoDataIngestionUri"],
    kustoDatabaseName: item["kustoDatabaseName"],
    kustoManagementUrl: item["kustoManagementUrl"],
    kustoOfferingType: item["kustoOfferingType"],
  };
}

/** The type of Kusto offering. */
export enum KnownKustoOfferingType {
  /** The Azure Data Explorer cluster Kusto offering. */
  adx = "adx",
  /** The free Azure Data Explorer cluster Kusto offering. */
  free = "free",
  /** The Fabric Real-Time Analytics Kusto offering. */
  fabric = "fabric",
}

/**
 * The type of Kusto offering. \
 * {@link KnownKustoOfferingType} can be used interchangeably with KustoOfferingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **adx**: The Azure Data Explorer cluster Kusto offering. \
 * **free**: The free Azure Data Explorer cluster Kusto offering. \
 * **fabric**: The Fabric Real-Time Analytics Kusto offering.
 */
export type KustoOfferingType = string;

/** The monitoring collection status of a watcher. */
export enum KnownWatcherStatus {
  /** Denotes the watcher is in a starting state. */
  Starting = "Starting",
  /** Denotes the watcher is in a running state. */
  Running = "Running",
  /** Denotes the watcher is in a stopping state. */
  Stopping = "Stopping",
  /** Denotes the watcher is in a stopped state. */
  Stopped = "Stopped",
  /** Denotes the watcher is in a deleting state. */
  Deleting = "Deleting",
}

/**
 * The monitoring collection status of a watcher. \
 * {@link KnownWatcherStatus} can be used interchangeably with WatcherStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Starting**: Denotes the watcher is in a starting state. \
 * **Running**: Denotes the watcher is in a running state. \
 * **Stopping**: Denotes the watcher is in a stopping state. \
 * **Stopped**: Denotes the watcher is in a stopped state. \
 * **Deleting**: Denotes the watcher is in a deleting state.
 */
export type WatcherStatus = string;

/** The status of the last provisioning operation performed on the resource. */
export enum KnownDatabaseWatcherProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The status of the last provisioning operation performed on the resource. \
 * {@link KnownDatabaseWatcherProvisioningState} can be used interchangeably with DatabaseWatcherProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type DatabaseWatcherProvisioningState = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentityV4 {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentityV4Serializer(item: ManagedServiceIdentityV4): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedServiceIdentityV4Deserializer(item: any): ManagedServiceIdentityV4 {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
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
  SystemAndUserAssigned = "SystemAssigned, UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned, UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    clientId: item["clientId"],
    principalId: item["principalId"],
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
    tags: item["tags"],
    location: item["location"],
  };
}

/** The type used for update operations of the Watcher. */
export interface WatcherUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentityV4;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: WatcherUpdateProperties;
}

export function watcherUpdateSerializer(item: WatcherUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityV4Serializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : watcherUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Watcher. */
export interface WatcherUpdateProperties {
  /** The data store for collected monitoring data. */
  datastore?: Datastore;
  /** The resource ID of a user-assigned managed identity that will be assigned to a new alert rule. */
  defaultAlertRuleIdentityResourceId?: string;
}

export function watcherUpdatePropertiesSerializer(item: WatcherUpdateProperties): any {
  return {
    datastore: !item["datastore"] ? item["datastore"] : datastoreSerializer(item["datastore"]),
    defaultAlertRuleIdentityResourceId: item["defaultAlertRuleIdentityResourceId"],
  };
}

/** The response of a Watcher list operation. */
export interface _WatcherListResult {
  /** The Watcher items on this page */
  value: Watcher[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _watcherListResultDeserializer(item: any): _WatcherListResult {
  return {
    value: watcherArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function watcherArraySerializer(result: Array<Watcher>): any[] {
  return result.map((item) => {
    return watcherSerializer(item);
  });
}

export function watcherArrayDeserializer(result: Array<Watcher>): any[] {
  return result.map((item) => {
    return watcherDeserializer(item);
  });
}

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
  user = "user",
  /** Indicates the operation is initiated by a system. */
  system = "system",
  /** Indicates the operation is initiated by a user or system. */
  "user,system" = "user,system",
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

/** Versions info. */
export enum KnownVersions {
  /** The 2025-01-02 version. */
  v2025_01_02 = "2025-01-02",
}
