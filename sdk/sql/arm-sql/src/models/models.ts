// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Result of the request to list SQL operations. */
export interface _OperationListResult {
  /** Array of results. */
  readonly value?: Operation[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** SQL REST API operation definition. */
export interface Operation {
  /** The name of the operation being performed on this particular object. */
  readonly name?: string;
  /** The localized display information for this particular operation / action. */
  readonly display?: OperationDisplay;
  /** The intended executor of the operation. */
  readonly origin?: OperationOrigin;
  /** Additional descriptions for the operation. */
  readonly properties?: Record<string, any>;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Display metadata associated with the operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name. */
  readonly provider?: string;
  /** The localized friendly form of the resource type related to this action/operation. */
  readonly resource?: string;
  /** The localized friendly name for the operation. */
  readonly operation?: string;
  /** The localized friendly description for the operation. */
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

/** The intended executor of the operation. */
export enum KnownOperationOrigin {
  /** user */
  User = "user",
  /** system */
  System = "system",
}

/**
 * The intended executor of the operation. \
 * {@link KnownOperationOrigin} can be used interchangeably with OperationOrigin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: user \
 * **system**: system
 */
export type OperationOrigin = string;

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

/** A short term retention policy. */
export interface BackupShortTermRetentionPolicy extends ProxyResource {
  /** The backup retention period in days. This is how many days Point-in-Time Restore will be supported. */
  retentionDays?: number;
  /** The differential backup interval in hours. This is how many interval hours between each differential backup will be supported. This is only applicable to live databases but not dropped databases. */
  diffBackupIntervalInHours?: DiffBackupIntervalInHours;
}

export function backupShortTermRetentionPolicySerializer(
  item: BackupShortTermRetentionPolicy,
): any {
  return {
    properties: areAllPropsUndefined(item, ["retentionDays", "diffBackupIntervalInHours"])
      ? undefined
      : _backupShortTermRetentionPolicyPropertiesSerializer(item),
  };
}

export function backupShortTermRetentionPolicyDeserializer(
  item: any,
): BackupShortTermRetentionPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _backupShortTermRetentionPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a short term retention policy */
export interface BackupShortTermRetentionPolicyProperties {
  /** The backup retention period in days. This is how many days Point-in-Time Restore will be supported. */
  retentionDays?: number;
  /** The differential backup interval in hours. This is how many interval hours between each differential backup will be supported. This is only applicable to live databases but not dropped databases. */
  diffBackupIntervalInHours?: DiffBackupIntervalInHours;
}

export function backupShortTermRetentionPolicyPropertiesSerializer(
  item: BackupShortTermRetentionPolicyProperties,
): any {
  return {
    retentionDays: item["retentionDays"],
    diffBackupIntervalInHours: item["diffBackupIntervalInHours"],
  };
}

export function backupShortTermRetentionPolicyPropertiesDeserializer(
  item: any,
): BackupShortTermRetentionPolicyProperties {
  return {
    retentionDays: item["retentionDays"],
    diffBackupIntervalInHours: item["diffBackupIntervalInHours"],
  };
}

/** The differential backup interval in hours. This is how many interval hours between each differential backup will be supported. This is only applicable to live databases but not dropped databases. */
export enum KnownDiffBackupIntervalInHours {
  /** 12 */
  Twelve = 12,
  /** 24 */
  TwentyFour = 24,
}

/**
 * The differential backup interval in hours. This is how many interval hours between each differential backup will be supported. This is only applicable to live databases but not dropped databases. \
 * {@link KnownDiffBackupIntervalInHours} can be used interchangeably with DiffBackupIntervalInHours,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **12**: 12 \
 * **24**: 24
 */
export type DiffBackupIntervalInHours = number;

/** Known values of {@link ShortTermRetentionPolicyName} that the service accepts. */
export enum KnownShortTermRetentionPolicyName {
  /** default */
  Default = "default",
}

/** Type of ShortTermRetentionPolicyName */
export type ShortTermRetentionPolicyName = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
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
  readonly systemData?: Systemdata;
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
      : systemdataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface Systemdata {
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

export function systemdataDeserializer(item: any): Systemdata {
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

/** The response of a BackupShortTermRetentionPolicy list operation. */
export interface _BackupShortTermRetentionPolicyListResult {
  /** The BackupShortTermRetentionPolicy items on this page */
  value: BackupShortTermRetentionPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _backupShortTermRetentionPolicyListResultDeserializer(
  item: any,
): _BackupShortTermRetentionPolicyListResult {
  return {
    value: backupShortTermRetentionPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function backupShortTermRetentionPolicyArraySerializer(
  result: Array<BackupShortTermRetentionPolicy>,
): any[] {
  return result.map((item) => {
    return backupShortTermRetentionPolicySerializer(item);
  });
}

export function backupShortTermRetentionPolicyArrayDeserializer(
  result: Array<BackupShortTermRetentionPolicy>,
): any[] {
  return result.map((item) => {
    return backupShortTermRetentionPolicyDeserializer(item);
  });
}

/** A database column resource. */
export interface DatabaseColumn extends ProxyResource {
  /** The column data type. */
  columnType?: ColumnDataType;
  /** The table temporal type. */
  temporalType?: TableTemporalType;
  /** Whether or not the column belongs to a memory optimized table. */
  memoryOptimized?: boolean;
  /** Whether or not the column is computed. */
  isComputed?: boolean;
}

export function databaseColumnDeserializer(item: any): DatabaseColumn {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseColumnPropertiesDeserializer(item["properties"])),
  };
}

/** Database column properties. */
export interface DatabaseColumnProperties {
  /** The column data type. */
  columnType?: ColumnDataType;
  /** The table temporal type. */
  temporalType?: TableTemporalType;
  /** Whether or not the column belongs to a memory optimized table. */
  memoryOptimized?: boolean;
  /** Whether or not the column is computed. */
  isComputed?: boolean;
}

export function databaseColumnPropertiesDeserializer(item: any): DatabaseColumnProperties {
  return {
    columnType: item["columnType"],
    temporalType: item["temporalType"],
    memoryOptimized: item["memoryOptimized"],
    isComputed: item["isComputed"],
  };
}

/** The column data type. */
export enum KnownColumnDataType {
  /** image */
  Image = "image",
  /** text */
  Text = "text",
  /** uniqueidentifier */
  Uniqueidentifier = "uniqueidentifier",
  /** date */
  Date = "date",
  /** time */
  Time = "time",
  /** datetime2 */
  Datetime2 = "datetime2",
  /** datetimeoffset */
  Datetimeoffset = "datetimeoffset",
  /** tinyint */
  Tinyint = "tinyint",
  /** smallint */
  Smallint = "smallint",
  /** int */
  Int = "int",
  /** smalldatetime */
  Smalldatetime = "smalldatetime",
  /** real */
  Real = "real",
  /** money */
  Money = "money",
  /** datetime */
  Datetime = "datetime",
  /** float */
  Float = "float",
  /** sql_variant */
  SqlVariant = "sql_variant",
  /** ntext */
  Ntext = "ntext",
  /** bit */
  Bit = "bit",
  /** decimal */
  Decimal = "decimal",
  /** numeric */
  Numeric = "numeric",
  /** smallmoney */
  Smallmoney = "smallmoney",
  /** bigint */
  Bigint = "bigint",
  /** hierarchyid */
  Hierarchyid = "hierarchyid",
  /** geometry */
  Geometry = "geometry",
  /** geography */
  Geography = "geography",
  /** varbinary */
  Varbinary = "varbinary",
  /** varchar */
  Varchar = "varchar",
  /** binary */
  Binary = "binary",
  /** char */
  Char = "char",
  /** timestamp */
  Timestamp = "timestamp",
  /** nvarchar */
  Nvarchar = "nvarchar",
  /** nchar */
  Nchar = "nchar",
  /** xml */
  Xml = "xml",
  /** sysname */
  Sysname = "sysname",
}

/**
 * The column data type. \
 * {@link KnownColumnDataType} can be used interchangeably with ColumnDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **image**: image \
 * **text**: text \
 * **uniqueidentifier**: uniqueidentifier \
 * **date**: date \
 * **time**: time \
 * **datetime2**: datetime2 \
 * **datetimeoffset**: datetimeoffset \
 * **tinyint**: tinyint \
 * **smallint**: smallint \
 * **int**: int \
 * **smalldatetime**: smalldatetime \
 * **real**: real \
 * **money**: money \
 * **datetime**: datetime \
 * **float**: float \
 * **sql_variant**: sql_variant \
 * **ntext**: ntext \
 * **bit**: bit \
 * **decimal**: decimal \
 * **numeric**: numeric \
 * **smallmoney**: smallmoney \
 * **bigint**: bigint \
 * **hierarchyid**: hierarchyid \
 * **geometry**: geometry \
 * **geography**: geography \
 * **varbinary**: varbinary \
 * **varchar**: varchar \
 * **binary**: binary \
 * **char**: char \
 * **timestamp**: timestamp \
 * **nvarchar**: nvarchar \
 * **nchar**: nchar \
 * **xml**: xml \
 * **sysname**: sysname
 */
export type ColumnDataType = string;

/** The table temporal type. */
export enum KnownTableTemporalType {
  /** NonTemporalTable */
  NonTemporalTable = "NonTemporalTable",
  /** HistoryTable */
  HistoryTable = "HistoryTable",
  /** SystemVersionedTemporalTable */
  SystemVersionedTemporalTable = "SystemVersionedTemporalTable",
}

/**
 * The table temporal type. \
 * {@link KnownTableTemporalType} can be used interchangeably with TableTemporalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NonTemporalTable**: NonTemporalTable \
 * **HistoryTable**: HistoryTable \
 * **SystemVersionedTemporalTable**: SystemVersionedTemporalTable
 */
export type TableTemporalType = string;

/** The response of a DatabaseColumn list operation. */
export interface _DatabaseColumnListResult {
  /** The DatabaseColumn items on this page */
  value: DatabaseColumn[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseColumnListResultDeserializer(item: any): _DatabaseColumnListResult {
  return {
    value: databaseColumnArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseColumnArrayDeserializer(result: Array<DatabaseColumn>): any[] {
  return result.map((item) => {
    return databaseColumnDeserializer(item);
  });
}

/** Database restore points. */
export interface RestorePoint extends ProxyResource {
  /** Resource location. */
  readonly location?: string;
  /** The type of restore point */
  readonly restorePointType?: RestorePointType;
  /** The earliest time to which this database can be restored */
  readonly earliestRestoreDate?: Date;
  /** The time the backup was taken */
  readonly restorePointCreationDate?: Date;
  /** The label of restore point for backup request by user */
  readonly restorePointLabel?: string;
}

export function restorePointDeserializer(item: any): RestorePoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _restorePointPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Properties of a database restore point */
export interface RestorePointProperties {
  /** The type of restore point */
  readonly restorePointType?: RestorePointType;
  /** The earliest time to which this database can be restored */
  readonly earliestRestoreDate?: Date;
  /** The time the backup was taken */
  readonly restorePointCreationDate?: Date;
  /** The label of restore point for backup request by user */
  readonly restorePointLabel?: string;
}

export function restorePointPropertiesDeserializer(item: any): RestorePointProperties {
  return {
    restorePointType: item["restorePointType"],
    earliestRestoreDate: !item["earliestRestoreDate"]
      ? item["earliestRestoreDate"]
      : new Date(item["earliestRestoreDate"]),
    restorePointCreationDate: !item["restorePointCreationDate"]
      ? item["restorePointCreationDate"]
      : new Date(item["restorePointCreationDate"]),
    restorePointLabel: item["restorePointLabel"],
  };
}

/** The type of restore point */
export type RestorePointType = "CONTINUOUS" | "DISCRETE";

/** The response of a RestorePoint list operation. */
export interface _RestorePointListResult {
  /** The RestorePoint items on this page */
  value: RestorePoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _restorePointListResultDeserializer(item: any): _RestorePointListResult {
  return {
    value: restorePointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorePointArrayDeserializer(result: Array<RestorePoint>): any[] {
  return result.map((item) => {
    return restorePointDeserializer(item);
  });
}

/** Contains the information necessary to perform a create database restore point operation. */
export interface CreateDatabaseRestorePointDefinition {
  /** The restore point label to apply */
  restorePointLabel: string;
}

export function createDatabaseRestorePointDefinitionSerializer(
  item: CreateDatabaseRestorePointDefinition,
): any {
  return { restorePointLabel: item["restorePointLabel"] };
}

/** The response of a SensitivityLabel list operation. */
export interface _SensitivityLabelListResult {
  /** The SensitivityLabel items on this page */
  value: SensitivityLabel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sensitivityLabelListResultDeserializer(item: any): _SensitivityLabelListResult {
  return {
    value: sensitivityLabelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sensitivityLabelArraySerializer(result: Array<SensitivityLabel>): any[] {
  return result.map((item) => {
    return sensitivityLabelSerializer(item);
  });
}

export function sensitivityLabelArrayDeserializer(result: Array<SensitivityLabel>): any[] {
  return result.map((item) => {
    return sensitivityLabelDeserializer(item);
  });
}

/** A sensitivity label. */
export interface SensitivityLabel extends ProxyResource {
  /** Resource that manages the sensitivity label. */
  readonly managedBy?: string;
  /** The schema name. */
  readonly schemaName?: string;
  /** The table name. */
  readonly tableName?: string;
  /** The column name. */
  readonly columnName?: string;
  /** The label name. */
  labelName?: string;
  /** The label ID. */
  labelId?: string;
  /** The information type. */
  informationType?: string;
  /** The information type ID. */
  informationTypeId?: string;
  /** Is sensitivity recommendation disabled. Applicable for recommended sensitivity label only. Specifies whether the sensitivity recommendation on this column is disabled (dismissed) or not. */
  readonly isDisabled?: boolean;
  rank?: SensitivityLabelRank;
  clientClassificationSource?: ClientClassificationSource;
}

export function sensitivityLabelSerializer(item: SensitivityLabel): any {
  return {
    properties: areAllPropsUndefined(item, [
      "labelName",
      "labelId",
      "informationType",
      "informationTypeId",
      "rank",
      "clientClassificationSource",
    ])
      ? undefined
      : _sensitivityLabelPropertiesSerializer(item),
  };
}

export function sensitivityLabelDeserializer(item: any): SensitivityLabel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sensitivityLabelPropertiesDeserializer(item["properties"])),
    managedBy: item["managedBy"],
  };
}

/** Properties of a sensitivity label. */
export interface SensitivityLabelProperties {
  /** The schema name. */
  readonly schemaName?: string;
  /** The table name. */
  readonly tableName?: string;
  /** The column name. */
  readonly columnName?: string;
  /** The label name. */
  labelName?: string;
  /** The label ID. */
  labelId?: string;
  /** The information type. */
  informationType?: string;
  /** The information type ID. */
  informationTypeId?: string;
  /** Is sensitivity recommendation disabled. Applicable for recommended sensitivity label only. Specifies whether the sensitivity recommendation on this column is disabled (dismissed) or not. */
  readonly isDisabled?: boolean;
  rank?: SensitivityLabelRank;
  clientClassificationSource?: ClientClassificationSource;
}

export function sensitivityLabelPropertiesSerializer(item: SensitivityLabelProperties): any {
  return {
    labelName: item["labelName"],
    labelId: item["labelId"],
    informationType: item["informationType"],
    informationTypeId: item["informationTypeId"],
    rank: item["rank"],
    clientClassificationSource: item["clientClassificationSource"],
  };
}

export function sensitivityLabelPropertiesDeserializer(item: any): SensitivityLabelProperties {
  return {
    schemaName: item["schemaName"],
    tableName: item["tableName"],
    columnName: item["columnName"],
    labelName: item["labelName"],
    labelId: item["labelId"],
    informationType: item["informationType"],
    informationTypeId: item["informationTypeId"],
    isDisabled: item["isDisabled"],
    rank: item["rank"],
    clientClassificationSource: item["clientClassificationSource"],
  };
}

/** Type of SensitivityLabelRank */
export type SensitivityLabelRank = "None" | "Low" | "Medium" | "High" | "Critical";

/** Known values of {@link ClientClassificationSource} that the service accepts. */
export enum KnownClientClassificationSource {
  /** None */
  None = "None",
  /** Native */
  Native = "Native",
  /** Recommended */
  Recommended = "Recommended",
  /** MIP */
  MIP = "MIP",
}

/** Type of ClientClassificationSource */
export type ClientClassificationSource = string;

/** A list of sensitivity label update operations. */
export interface SensitivityLabelUpdateList {
  operations?: SensitivityLabelUpdate[];
}

export function sensitivityLabelUpdateListSerializer(item: SensitivityLabelUpdateList): any {
  return {
    operations: !item["operations"]
      ? item["operations"]
      : sensitivityLabelUpdateArraySerializer(item["operations"]),
  };
}

export function sensitivityLabelUpdateArraySerializer(
  result: Array<SensitivityLabelUpdate>,
): any[] {
  return result.map((item) => {
    return sensitivityLabelUpdateSerializer(item);
  });
}

/** A sensitivity label update operation. */
export interface SensitivityLabelUpdate extends ProxyResourceAutoGenerated {
  op?: SensitivityLabelUpdateKind;
  /** Schema name of the column to update. */
  schema?: string;
  /** Table name of the column to update. */
  table?: string;
  /** Column name to update. */
  column?: string;
  /** The sensitivity label information to apply on a column. */
  sensitivityLabel?: SensitivityLabel;
}

export function sensitivityLabelUpdateSerializer(item: SensitivityLabelUpdate): any {
  return {
    properties: areAllPropsUndefined(item, ["op", "schema", "table", "column", "sensitivityLabel"])
      ? undefined
      : _sensitivityLabelUpdatePropertiesSerializer(item),
  };
}

/** Properties of an operation executed on a sensitivity label. */
export interface SensitivityLabelUpdateProperties {
  op: SensitivityLabelUpdateKind;
  /** Schema name of the column to update. */
  schema: string;
  /** Table name of the column to update. */
  table: string;
  /** Column name to update. */
  column: string;
  /** The sensitivity label information to apply on a column. */
  sensitivityLabel?: SensitivityLabel;
}

export function sensitivityLabelUpdatePropertiesSerializer(
  item: SensitivityLabelUpdateProperties,
): any {
  return {
    op: item["op"],
    schema: item["schema"],
    table: item["table"],
    column: item["column"],
    sensitivityLabel: !item["sensitivityLabel"]
      ? item["sensitivityLabel"]
      : sensitivityLabelSerializer(item["sensitivityLabel"]),
  };
}

/** Type of SensitivityLabelUpdateKind */
export type SensitivityLabelUpdateKind = "set" | "remove";

/** ARM proxy resource. */
export interface ProxyResourceAutoGenerated extends ResourceAutoGenerated {}

export function proxyResourceAutoGeneratedSerializer(_item: ProxyResourceAutoGenerated): any {
  return {};
}

export function proxyResourceAutoGeneratedDeserializer(item: any): ProxyResourceAutoGenerated {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** ARM resource. */
export interface ResourceAutoGenerated {
  /** Resource ID. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
}

export function resourceAutoGeneratedSerializer(_item: ResourceAutoGenerated): any {
  return {};
}

export function resourceAutoGeneratedDeserializer(item: any): ResourceAutoGenerated {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** A database resource. */
export interface Database extends TrackedResource {
  /**
   * The database SKU.
   *
   * The list of SKUs may vary by region and support offer. To determine the SKUs (including the SKU name, tier/edition, family, and capacity) that are available to your subscription in an Azure region, use the `Capabilities_ListByLocation` REST API or one of the following commands:
   *
   * ```azurecli
   * az sql db list-editions -l <location> -o table
   * ```
   *
   * ```powershell
   * Get-AzSqlServerServiceObjective -Location <location>
   * ```
   */
  sku?: Sku;
  /** Kind of database. This is metadata used for the Azure portal experience. */
  readonly kind?: string;
  /** Resource that manages the database. */
  readonly managedBy?: string;
  /** The Azure Active Directory identity of the database. */
  identity?: DatabaseIdentity;
  /**
   * Specifies the mode of database creation.
   *
   * Default: regular database creation.
   *
   * Copy: creates a database as a copy of an existing database. sourceDatabaseId must be specified as the resource ID of the source database.
   *
   * Secondary: creates a database as a secondary replica of an existing database. sourceDatabaseId must be specified as the resource ID of the existing primary database.
   *
   * PointInTimeRestore: Creates a database by restoring a point in time backup of an existing database. sourceDatabaseId must be specified as the resource ID of the existing database, and restorePointInTime must be specified.
   *
   * Recovery: Creates a database by restoring a geo-replicated backup. sourceDatabaseId must be specified as the recoverable database resource ID to restore.
   *
   * Restore: Creates a database by restoring a backup of a deleted database. sourceDatabaseId must be specified. If sourceDatabaseId is the database's original resource ID, then sourceDatabaseDeletionDate must be specified. Otherwise sourceDatabaseId must be the restorable dropped database resource ID and sourceDatabaseDeletionDate is ignored. restorePointInTime may also be specified to restore from an earlier point in time.
   *
   * RestoreLongTermRetentionBackup: Creates a database by restoring from a long term retention vault. recoveryServicesRecoveryPointResourceId must be specified as the recovery point resource ID.
   *
   * Copy, Secondary, and RestoreLongTermRetentionBackup are not supported for DataWarehouse edition.
   */
  createMode?: CreateMode;
  /** The collation of the database. */
  collation?: string;
  /** The max size of the database expressed in bytes. */
  maxSizeBytes?: number;
  /** The name of the sample schema to apply when creating this database. */
  sampleName?: SampleName;
  /** The resource identifier of the elastic pool containing this database. */
  elasticPoolId?: string;
  /** The resource identifier of the source database associated with create operation of this database. */
  sourceDatabaseId?: string;
  /** The status of the database. */
  readonly status?: DatabaseStatus;
  /** The ID of the database. */
  readonly databaseId?: string;
  /** The creation date of the database (ISO8601 format). */
  readonly creationDate?: Date;
  /** The current service level objective name of the database. */
  readonly currentServiceObjectiveName?: string;
  /** The requested service level objective name of the database. */
  readonly requestedServiceObjectiveName?: string;
  /** The default secondary region for this database. */
  readonly defaultSecondaryLocation?: string;
  /** Failover Group resource identifier that this database belongs to. */
  readonly failoverGroupId?: string;
  /** Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database. */
  restorePointInTime?: Date;
  /** Specifies the time that the database was deleted. */
  sourceDatabaseDeletionDate?: Date;
  /** The resource identifier of the recovery point associated with create operation of this database. */
  recoveryServicesRecoveryPointId?: string;
  /** The resource identifier of the long term retention backup associated with create operation of this database. */
  longTermRetentionBackupResourceId?: string;
  /** The resource identifier of the recoverable database associated with create operation of this database. */
  recoverableDatabaseId?: string;
  /** The resource identifier of the restorable dropped database associated with create operation of this database. */
  restorableDroppedDatabaseId?: string;
  /** Collation of the metadata catalog. */
  catalogCollation?: CatalogCollationType;
  /** Whether or not this database is zone redundant, which means the replicas of this database will be spread across multiple availability zones. */
  zoneRedundant?: boolean;
  /** The license type to apply for this database. `LicenseIncluded` if you need a license, or `BasePrice` if you have a license and are eligible for the Azure Hybrid Benefit. */
  licenseType?: DatabaseLicenseType;
  /** The max log size for this database. */
  readonly maxLogSizeBytes?: number;
  /** This records the earliest start date and time that restore is available for this database (ISO8601 format). */
  readonly earliestRestoreDate?: Date;
  /** The state of read-only routing. If enabled, connections that have application intent set to readonly in their connection string may be routed to a readonly secondary replica in the same region. Not applicable to a Hyperscale database within an elastic pool. */
  readScale?: DatabaseReadScale;
  /** The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition database that are used to provide high availability. Not applicable to a Hyperscale database within an elastic pool. */
  highAvailabilityReplicaCount?: number;
  /** The secondary type of the database if it is a secondary.  Valid values are Geo, Named and Standby. */
  secondaryType?: SecondaryType;
  /** The name and tier of the SKU. */
  readonly currentSku?: Sku;
  /** Time in minutes after which database is automatically paused. A value of -1 means that automatic pause is disabled */
  autoPauseDelay?: number;
  /** The storage account type used to store backups for this database. */
  readonly currentBackupStorageRedundancy?: BackupStorageRedundancy;
  /** The storage account type to be used to store backups for this database. */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /** Minimal capacity that database will always have allocated, if not paused */
  minCapacity?: number;
  /** The date when database was paused by user configuration or action(ISO8601 format). Null if the database is ready. */
  readonly pausedDate?: Date;
  /** The date when database was resumed by user action or database login (ISO8601 format). Null if the database is paused. */
  readonly resumedDate?: Date;
  /** Maintenance configuration id assigned to the database. This configuration defines the period when the maintenance updates will occur. */
  maintenanceConfigurationId?: string;
  /** Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created. */
  isLedgerOn?: boolean;
  /** Infra encryption is enabled for this database. */
  readonly isInfraEncryptionEnabled?: boolean;
  /** The Client id used for cross tenant per database CMK scenario */
  federatedClientId?: string;
  /** The resource ids of the user assigned identities to use */
  keys?: Record<string, DatabaseKey>;
  /** The azure key vault URI of the database if it's configured with per Database Customer Managed Keys. */
  encryptionProtector?: string;
  /** Type of enclave requested on the database i.e. Default or VBS enclaves. */
  preferredEnclaveType?: AlwaysEncryptedEnclaveType;
  /** Whether or not the database uses free monthly limits. Allowed on one database in a subscription. */
  useFreeLimit?: boolean;
  /**
   * Specifies the behavior when monthly free limits are exhausted for the free database.
   *
   * AutoPause: The database will be auto paused upon exhaustion of free limits for remainder of the month.
   *
   * BillForUsage: The database will continue to be online upon exhaustion of free limits and any overage will be billed.
   */
  freeLimitExhaustionBehavior?: FreeLimitExhaustionBehavior;
  /**
   * The resource identifier of the source associated with the create operation of this database.
   *
   * This property is only supported for DataWarehouse edition and allows to restore across subscriptions.
   *
   * When sourceResourceId is specified, sourceDatabaseId, recoverableDatabaseId, restorableDroppedDatabaseId and sourceDatabaseDeletionDate must not be specified and CreateMode must be PointInTimeRestore, Restore or Recover.
   *
   * When createMode is PointInTimeRestore, sourceResourceId must be the resource ID of the existing database or existing sql pool, and restorePointInTime must be specified.
   *
   * When createMode is Restore, sourceResourceId must be the resource ID of restorable dropped database or restorable dropped sql pool.
   *
   * When createMode is Recover, sourceResourceId must be the resource ID of recoverable database or recoverable sql pool.
   *
   * When source subscription belongs to a different tenant than target subscription, “x-ms-authorization-auxiliary” header must contain authentication token for the source tenant. For more details about “x-ms-authorization-auxiliary” header see https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/authenticate-multi-tenant
   */
  sourceResourceId?: string;
  /**
   * Whether or not customer controlled manual cutover needs to be done during Update Database operation to Hyperscale tier.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier.
   *
   * When manualCutover is specified, the scaling operation will wait for user input to trigger cutover to Hyperscale database.
   *
   * To trigger cutover, please provide 'performCutover' parameter when the Scaling operation is in Waiting state.
   */
  manualCutover?: boolean;
  /**
   * To trigger customer controlled manual cutover during the wait state while Scaling operation is in progress.
   *
   * This property parameter is only applicable for scaling operations that are initiated along with 'manualCutover' parameter.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier is already in progress.
   *
   * When performCutover is specified, the scaling operation will trigger cutover and perform role-change to Hyperscale database.
   */
  performCutover?: boolean;
  /** Specifies the availability zone the database is pinned to. */
  availabilityZone?: AvailabilityZoneType;
  /** The flag to enable or disable auto rotation of database encryption protector AKV key. */
  encryptionProtectorAutoRotation?: boolean;
  /** Specifies the provisioning state for this resource */
  readonly provisioningState?: string;
}

export function databaseSerializer(item: Database): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "createMode",
      "collation",
      "maxSizeBytes",
      "sampleName",
      "elasticPoolId",
      "sourceDatabaseId",
      "restorePointInTime",
      "sourceDatabaseDeletionDate",
      "recoveryServicesRecoveryPointId",
      "longTermRetentionBackupResourceId",
      "recoverableDatabaseId",
      "restorableDroppedDatabaseId",
      "catalogCollation",
      "zoneRedundant",
      "licenseType",
      "readScale",
      "highAvailabilityReplicaCount",
      "secondaryType",
      "autoPauseDelay",
      "requestedBackupStorageRedundancy",
      "minCapacity",
      "maintenanceConfigurationId",
      "isLedgerOn",
      "federatedClientId",
      "keys",
      "encryptionProtector",
      "preferredEnclaveType",
      "useFreeLimit",
      "freeLimitExhaustionBehavior",
      "sourceResourceId",
      "manualCutover",
      "performCutover",
      "availabilityZone",
      "encryptionProtectorAutoRotation",
    ])
      ? undefined
      : _databasePropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : databaseIdentitySerializer(item["identity"]),
  };
}

export function databaseDeserializer(item: any): Database {
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
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databasePropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    kind: item["kind"],
    managedBy: item["managedBy"],
    identity: !item["identity"] ? item["identity"] : databaseIdentityDeserializer(item["identity"]),
  };
}

/** The database's properties. */
export interface DatabaseProperties {
  /**
   * Specifies the mode of database creation.
   *
   * Default: regular database creation.
   *
   * Copy: creates a database as a copy of an existing database. sourceDatabaseId must be specified as the resource ID of the source database.
   *
   * Secondary: creates a database as a secondary replica of an existing database. sourceDatabaseId must be specified as the resource ID of the existing primary database.
   *
   * PointInTimeRestore: Creates a database by restoring a point in time backup of an existing database. sourceDatabaseId must be specified as the resource ID of the existing database, and restorePointInTime must be specified.
   *
   * Recovery: Creates a database by restoring a geo-replicated backup. sourceDatabaseId must be specified as the recoverable database resource ID to restore.
   *
   * Restore: Creates a database by restoring a backup of a deleted database. sourceDatabaseId must be specified. If sourceDatabaseId is the database's original resource ID, then sourceDatabaseDeletionDate must be specified. Otherwise sourceDatabaseId must be the restorable dropped database resource ID and sourceDatabaseDeletionDate is ignored. restorePointInTime may also be specified to restore from an earlier point in time.
   *
   * RestoreLongTermRetentionBackup: Creates a database by restoring from a long term retention vault. recoveryServicesRecoveryPointResourceId must be specified as the recovery point resource ID.
   *
   * Copy, Secondary, and RestoreLongTermRetentionBackup are not supported for DataWarehouse edition.
   */
  createMode?: CreateMode;
  /** The collation of the database. */
  collation?: string;
  /** The max size of the database expressed in bytes. */
  maxSizeBytes?: number;
  /** The name of the sample schema to apply when creating this database. */
  sampleName?: SampleName;
  /** The resource identifier of the elastic pool containing this database. */
  elasticPoolId?: string;
  /** The resource identifier of the source database associated with create operation of this database. */
  sourceDatabaseId?: string;
  /** The status of the database. */
  readonly status?: DatabaseStatus;
  /** The ID of the database. */
  readonly databaseId?: string;
  /** The creation date of the database (ISO8601 format). */
  readonly creationDate?: Date;
  /** The current service level objective name of the database. */
  readonly currentServiceObjectiveName?: string;
  /** The requested service level objective name of the database. */
  readonly requestedServiceObjectiveName?: string;
  /** The default secondary region for this database. */
  readonly defaultSecondaryLocation?: string;
  /** Failover Group resource identifier that this database belongs to. */
  readonly failoverGroupId?: string;
  /** Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database. */
  restorePointInTime?: Date;
  /** Specifies the time that the database was deleted. */
  sourceDatabaseDeletionDate?: Date;
  /** The resource identifier of the recovery point associated with create operation of this database. */
  recoveryServicesRecoveryPointId?: string;
  /** The resource identifier of the long term retention backup associated with create operation of this database. */
  longTermRetentionBackupResourceId?: string;
  /** The resource identifier of the recoverable database associated with create operation of this database. */
  recoverableDatabaseId?: string;
  /** The resource identifier of the restorable dropped database associated with create operation of this database. */
  restorableDroppedDatabaseId?: string;
  /** Collation of the metadata catalog. */
  catalogCollation?: CatalogCollationType;
  /** Whether or not this database is zone redundant, which means the replicas of this database will be spread across multiple availability zones. */
  zoneRedundant?: boolean;
  /** The license type to apply for this database. `LicenseIncluded` if you need a license, or `BasePrice` if you have a license and are eligible for the Azure Hybrid Benefit. */
  licenseType?: DatabaseLicenseType;
  /** The max log size for this database. */
  readonly maxLogSizeBytes?: number;
  /** This records the earliest start date and time that restore is available for this database (ISO8601 format). */
  readonly earliestRestoreDate?: Date;
  /** The state of read-only routing. If enabled, connections that have application intent set to readonly in their connection string may be routed to a readonly secondary replica in the same region. Not applicable to a Hyperscale database within an elastic pool. */
  readScale?: DatabaseReadScale;
  /** The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition database that are used to provide high availability. Not applicable to a Hyperscale database within an elastic pool. */
  highAvailabilityReplicaCount?: number;
  /** The secondary type of the database if it is a secondary.  Valid values are Geo, Named and Standby. */
  secondaryType?: SecondaryType;
  /** The name and tier of the SKU. */
  readonly currentSku?: Sku;
  /** Time in minutes after which database is automatically paused. A value of -1 means that automatic pause is disabled */
  autoPauseDelay?: number;
  /** The storage account type used to store backups for this database. */
  readonly currentBackupStorageRedundancy?: BackupStorageRedundancy;
  /** The storage account type to be used to store backups for this database. */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /** Minimal capacity that database will always have allocated, if not paused */
  minCapacity?: number;
  /** The date when database was paused by user configuration or action(ISO8601 format). Null if the database is ready. */
  readonly pausedDate?: Date;
  /** The date when database was resumed by user action or database login (ISO8601 format). Null if the database is paused. */
  readonly resumedDate?: Date;
  /** Maintenance configuration id assigned to the database. This configuration defines the period when the maintenance updates will occur. */
  maintenanceConfigurationId?: string;
  /** Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created. */
  isLedgerOn?: boolean;
  /** Infra encryption is enabled for this database. */
  readonly isInfraEncryptionEnabled?: boolean;
  /** The Client id used for cross tenant per database CMK scenario */
  federatedClientId?: string;
  /** The resource ids of the user assigned identities to use */
  keys?: Record<string, DatabaseKey>;
  /** The azure key vault URI of the database if it's configured with per Database Customer Managed Keys. */
  encryptionProtector?: string;
  /** Type of enclave requested on the database i.e. Default or VBS enclaves. */
  preferredEnclaveType?: AlwaysEncryptedEnclaveType;
  /** Whether or not the database uses free monthly limits. Allowed on one database in a subscription. */
  useFreeLimit?: boolean;
  /**
   * Specifies the behavior when monthly free limits are exhausted for the free database.
   *
   * AutoPause: The database will be auto paused upon exhaustion of free limits for remainder of the month.
   *
   * BillForUsage: The database will continue to be online upon exhaustion of free limits and any overage will be billed.
   */
  freeLimitExhaustionBehavior?: FreeLimitExhaustionBehavior;
  /**
   * The resource identifier of the source associated with the create operation of this database.
   *
   * This property is only supported for DataWarehouse edition and allows to restore across subscriptions.
   *
   * When sourceResourceId is specified, sourceDatabaseId, recoverableDatabaseId, restorableDroppedDatabaseId and sourceDatabaseDeletionDate must not be specified and CreateMode must be PointInTimeRestore, Restore or Recover.
   *
   * When createMode is PointInTimeRestore, sourceResourceId must be the resource ID of the existing database or existing sql pool, and restorePointInTime must be specified.
   *
   * When createMode is Restore, sourceResourceId must be the resource ID of restorable dropped database or restorable dropped sql pool.
   *
   * When createMode is Recover, sourceResourceId must be the resource ID of recoverable database or recoverable sql pool.
   *
   * When source subscription belongs to a different tenant than target subscription, “x-ms-authorization-auxiliary” header must contain authentication token for the source tenant. For more details about “x-ms-authorization-auxiliary” header see https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/authenticate-multi-tenant
   */
  sourceResourceId?: string;
  /**
   * Whether or not customer controlled manual cutover needs to be done during Update Database operation to Hyperscale tier.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier.
   *
   * When manualCutover is specified, the scaling operation will wait for user input to trigger cutover to Hyperscale database.
   *
   * To trigger cutover, please provide 'performCutover' parameter when the Scaling operation is in Waiting state.
   */
  manualCutover?: boolean;
  /**
   * To trigger customer controlled manual cutover during the wait state while Scaling operation is in progress.
   *
   * This property parameter is only applicable for scaling operations that are initiated along with 'manualCutover' parameter.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier is already in progress.
   *
   * When performCutover is specified, the scaling operation will trigger cutover and perform role-change to Hyperscale database.
   */
  performCutover?: boolean;
  /** Specifies the availability zone the database is pinned to. */
  availabilityZone?: AvailabilityZoneType;
  /** The flag to enable or disable auto rotation of database encryption protector AKV key. */
  encryptionProtectorAutoRotation?: boolean;
  /** Specifies the provisioning state for this resource */
  readonly provisioningState?: string;
}

export function databasePropertiesSerializer(item: DatabaseProperties): any {
  return {
    createMode: item["createMode"],
    collation: item["collation"],
    maxSizeBytes: item["maxSizeBytes"],
    sampleName: item["sampleName"],
    elasticPoolId: item["elasticPoolId"],
    sourceDatabaseId: item["sourceDatabaseId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    sourceDatabaseDeletionDate: !item["sourceDatabaseDeletionDate"]
      ? item["sourceDatabaseDeletionDate"]
      : item["sourceDatabaseDeletionDate"].toISOString(),
    recoveryServicesRecoveryPointId: item["recoveryServicesRecoveryPointId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    catalogCollation: item["catalogCollation"],
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    readScale: item["readScale"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    secondaryType: item["secondaryType"],
    autoPauseDelay: item["autoPauseDelay"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    minCapacity: item["minCapacity"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    isLedgerOn: item["isLedgerOn"],
    federatedClientId: item["federatedClientId"],
    keys: !item["keys"] ? item["keys"] : databaseKeyRecordSerializer(item["keys"]),
    encryptionProtector: item["encryptionProtector"],
    preferredEnclaveType: item["preferredEnclaveType"],
    useFreeLimit: item["useFreeLimit"],
    freeLimitExhaustionBehavior: item["freeLimitExhaustionBehavior"],
    sourceResourceId: item["sourceResourceId"],
    manualCutover: item["manualCutover"],
    performCutover: item["performCutover"],
    availabilityZone: item["availabilityZone"],
    encryptionProtectorAutoRotation: item["encryptionProtectorAutoRotation"],
  };
}

export function databasePropertiesDeserializer(item: any): DatabaseProperties {
  return {
    createMode: item["createMode"],
    collation: item["collation"],
    maxSizeBytes: item["maxSizeBytes"],
    sampleName: item["sampleName"],
    elasticPoolId: item["elasticPoolId"],
    sourceDatabaseId: item["sourceDatabaseId"],
    status: item["status"],
    databaseId: item["databaseId"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    currentServiceObjectiveName: item["currentServiceObjectiveName"],
    requestedServiceObjectiveName: item["requestedServiceObjectiveName"],
    defaultSecondaryLocation: item["defaultSecondaryLocation"],
    failoverGroupId: item["failoverGroupId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : new Date(item["restorePointInTime"]),
    sourceDatabaseDeletionDate: !item["sourceDatabaseDeletionDate"]
      ? item["sourceDatabaseDeletionDate"]
      : new Date(item["sourceDatabaseDeletionDate"]),
    recoveryServicesRecoveryPointId: item["recoveryServicesRecoveryPointId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    catalogCollation: item["catalogCollation"],
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    maxLogSizeBytes: item["maxLogSizeBytes"],
    earliestRestoreDate: !item["earliestRestoreDate"]
      ? item["earliestRestoreDate"]
      : new Date(item["earliestRestoreDate"]),
    readScale: item["readScale"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    secondaryType: item["secondaryType"],
    currentSku: !item["currentSku"] ? item["currentSku"] : skuDeserializer(item["currentSku"]),
    autoPauseDelay: item["autoPauseDelay"],
    currentBackupStorageRedundancy: item["currentBackupStorageRedundancy"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    minCapacity: item["minCapacity"],
    pausedDate: !item["pausedDate"] ? item["pausedDate"] : new Date(item["pausedDate"]),
    resumedDate: !item["resumedDate"] ? item["resumedDate"] : new Date(item["resumedDate"]),
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    isLedgerOn: item["isLedgerOn"],
    isInfraEncryptionEnabled: item["isInfraEncryptionEnabled"],
    federatedClientId: item["federatedClientId"],
    keys: !item["keys"] ? item["keys"] : databaseKeyRecordDeserializer(item["keys"]),
    encryptionProtector: item["encryptionProtector"],
    preferredEnclaveType: item["preferredEnclaveType"],
    useFreeLimit: item["useFreeLimit"],
    freeLimitExhaustionBehavior: item["freeLimitExhaustionBehavior"],
    sourceResourceId: item["sourceResourceId"],
    manualCutover: item["manualCutover"],
    performCutover: item["performCutover"],
    availabilityZone: item["availabilityZone"],
    encryptionProtectorAutoRotation: item["encryptionProtectorAutoRotation"],
    provisioningState: item["provisioningState"],
  };
}

/**
 * Specifies the mode of database creation.
 *
 * Default: regular database creation.
 *
 * Copy: creates a database as a copy of an existing database. sourceDatabaseId must be specified as the resource ID of the source database.
 *
 * Secondary: creates a database as a secondary replica of an existing database. sourceDatabaseId must be specified as the resource ID of the existing primary database.
 *
 * PointInTimeRestore: Creates a database by restoring a point in time backup of an existing database. sourceDatabaseId must be specified as the resource ID of the existing database, and restorePointInTime must be specified.
 *
 * Recovery: Creates a database by restoring a geo-replicated backup. sourceDatabaseId must be specified as the recoverable database resource ID to restore.
 *
 * Restore: Creates a database by restoring a backup of a deleted database. sourceDatabaseId must be specified. If sourceDatabaseId is the database's original resource ID, then sourceDatabaseDeletionDate must be specified. Otherwise sourceDatabaseId must be the restorable dropped database resource ID and sourceDatabaseDeletionDate is ignored. restorePointInTime may also be specified to restore from an earlier point in time.
 *
 * RestoreLongTermRetentionBackup: Creates a database by restoring from a long term retention vault. recoveryServicesRecoveryPointResourceId must be specified as the recovery point resource ID.
 *
 * Copy, Secondary, and RestoreLongTermRetentionBackup are not supported for DataWarehouse edition.
 */
export enum KnownCreateMode {
  /** Default */
  Default = "Default",
  /** Copy */
  Copy = "Copy",
  /** Secondary */
  Secondary = "Secondary",
  /** PointInTimeRestore */
  PointInTimeRestore = "PointInTimeRestore",
  /** Restore */
  Restore = "Restore",
  /** Recovery */
  Recovery = "Recovery",
  /** RestoreExternalBackup */
  RestoreExternalBackup = "RestoreExternalBackup",
  /** RestoreExternalBackupSecondary */
  RestoreExternalBackupSecondary = "RestoreExternalBackupSecondary",
  /** RestoreLongTermRetentionBackup */
  RestoreLongTermRetentionBackup = "RestoreLongTermRetentionBackup",
  /** OnlineSecondary */
  OnlineSecondary = "OnlineSecondary",
}

/**
 * Specifies the mode of database creation.
 *
 * Default: regular database creation.
 *
 * Copy: creates a database as a copy of an existing database. sourceDatabaseId must be specified as the resource ID of the source database.
 *
 * Secondary: creates a database as a secondary replica of an existing database. sourceDatabaseId must be specified as the resource ID of the existing primary database.
 *
 * PointInTimeRestore: Creates a database by restoring a point in time backup of an existing database. sourceDatabaseId must be specified as the resource ID of the existing database, and restorePointInTime must be specified.
 *
 * Recovery: Creates a database by restoring a geo-replicated backup. sourceDatabaseId must be specified as the recoverable database resource ID to restore.
 *
 * Restore: Creates a database by restoring a backup of a deleted database. sourceDatabaseId must be specified. If sourceDatabaseId is the database's original resource ID, then sourceDatabaseDeletionDate must be specified. Otherwise sourceDatabaseId must be the restorable dropped database resource ID and sourceDatabaseDeletionDate is ignored. restorePointInTime may also be specified to restore from an earlier point in time.
 *
 * RestoreLongTermRetentionBackup: Creates a database by restoring from a long term retention vault. recoveryServicesRecoveryPointResourceId must be specified as the recovery point resource ID.
 *
 * Copy, Secondary, and RestoreLongTermRetentionBackup are not supported for DataWarehouse edition. \
 * {@link KnownCreateMode} can be used interchangeably with CreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default \
 * **Copy**: Copy \
 * **Secondary**: Secondary \
 * **PointInTimeRestore**: PointInTimeRestore \
 * **Restore**: Restore \
 * **Recovery**: Recovery \
 * **RestoreExternalBackup**: RestoreExternalBackup \
 * **RestoreExternalBackupSecondary**: RestoreExternalBackupSecondary \
 * **RestoreLongTermRetentionBackup**: RestoreLongTermRetentionBackup \
 * **OnlineSecondary**: OnlineSecondary
 */
export type CreateMode = string;

/** The name of the sample schema to apply when creating this database. */
export enum KnownSampleName {
  /** AdventureWorksLT */
  AdventureWorksLT = "AdventureWorksLT",
  /** WideWorldImportersStd */
  WideWorldImportersStd = "WideWorldImportersStd",
  /** WideWorldImportersFull */
  WideWorldImportersFull = "WideWorldImportersFull",
}

/**
 * The name of the sample schema to apply when creating this database. \
 * {@link KnownSampleName} can be used interchangeably with SampleName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AdventureWorksLT**: AdventureWorksLT \
 * **WideWorldImportersStd**: WideWorldImportersStd \
 * **WideWorldImportersFull**: WideWorldImportersFull
 */
export type SampleName = string;

/** The status of the database. */
export enum KnownDatabaseStatus {
  /** Online */
  Online = "Online",
  /** Restoring */
  Restoring = "Restoring",
  /** RecoveryPending */
  RecoveryPending = "RecoveryPending",
  /** Recovering */
  Recovering = "Recovering",
  /** Suspect */
  Suspect = "Suspect",
  /** Offline */
  Offline = "Offline",
  /** Standby */
  Standby = "Standby",
  /** Shutdown */
  Shutdown = "Shutdown",
  /** EmergencyMode */
  EmergencyMode = "EmergencyMode",
  /** AutoClosed */
  AutoClosed = "AutoClosed",
  /** Copying */
  Copying = "Copying",
  /** Creating */
  Creating = "Creating",
  /** Inaccessible */
  Inaccessible = "Inaccessible",
  /** OfflineSecondary */
  OfflineSecondary = "OfflineSecondary",
  /** Pausing */
  Pausing = "Pausing",
  /** Paused */
  Paused = "Paused",
  /** Resuming */
  Resuming = "Resuming",
  /** Scaling */
  Scaling = "Scaling",
  /** OfflineChangingDwPerformanceTiers */
  OfflineChangingDwPerformanceTiers = "OfflineChangingDwPerformanceTiers",
  /** OnlineChangingDwPerformanceTiers */
  OnlineChangingDwPerformanceTiers = "OnlineChangingDwPerformanceTiers",
  /** Disabled */
  Disabled = "Disabled",
  /** Stopping */
  Stopping = "Stopping",
  /** Stopped */
  Stopped = "Stopped",
  /** Starting */
  Starting = "Starting",
}

/**
 * The status of the database. \
 * {@link KnownDatabaseStatus} can be used interchangeably with DatabaseStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Online**: Online \
 * **Restoring**: Restoring \
 * **RecoveryPending**: RecoveryPending \
 * **Recovering**: Recovering \
 * **Suspect**: Suspect \
 * **Offline**: Offline \
 * **Standby**: Standby \
 * **Shutdown**: Shutdown \
 * **EmergencyMode**: EmergencyMode \
 * **AutoClosed**: AutoClosed \
 * **Copying**: Copying \
 * **Creating**: Creating \
 * **Inaccessible**: Inaccessible \
 * **OfflineSecondary**: OfflineSecondary \
 * **Pausing**: Pausing \
 * **Paused**: Paused \
 * **Resuming**: Resuming \
 * **Scaling**: Scaling \
 * **OfflineChangingDwPerformanceTiers**: OfflineChangingDwPerformanceTiers \
 * **OnlineChangingDwPerformanceTiers**: OnlineChangingDwPerformanceTiers \
 * **Disabled**: Disabled \
 * **Stopping**: Stopping \
 * **Stopped**: Stopped \
 * **Starting**: Starting
 */
export type DatabaseStatus = string;

/** Collation of the metadata catalog. */
export enum KnownCatalogCollationType {
  /** DATABASE_DEFAULT */
  DatabaseDefault = "DATABASE_DEFAULT",
  /** SQL_Latin1_General_CP1_CI_AS */
  SQLLatin1GeneralCP1CIAS = "SQL_Latin1_General_CP1_CI_AS",
}

/**
 * Collation of the metadata catalog. \
 * {@link KnownCatalogCollationType} can be used interchangeably with CatalogCollationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DATABASE_DEFAULT**: DATABASE_DEFAULT \
 * **SQL_Latin1_General_CP1_CI_AS**: SQL_Latin1_General_CP1_CI_AS
 */
export type CatalogCollationType = string;

/** The license type to apply for this database. `LicenseIncluded` if you need a license, or `BasePrice` if you have a license and are eligible for the Azure Hybrid Benefit. */
export enum KnownDatabaseLicenseType {
  /** LicenseIncluded */
  LicenseIncluded = "LicenseIncluded",
  /** BasePrice */
  BasePrice = "BasePrice",
}

/**
 * The license type to apply for this database. `LicenseIncluded` if you need a license, or `BasePrice` if you have a license and are eligible for the Azure Hybrid Benefit. \
 * {@link KnownDatabaseLicenseType} can be used interchangeably with DatabaseLicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LicenseIncluded**: LicenseIncluded \
 * **BasePrice**: BasePrice
 */
export type DatabaseLicenseType = string;

/** The state of read-only routing. If enabled, connections that have application intent set to readonly in their connection string may be routed to a readonly secondary replica in the same region. Not applicable to a Hyperscale database within an elastic pool. */
export enum KnownDatabaseReadScale {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The state of read-only routing. If enabled, connections that have application intent set to readonly in their connection string may be routed to a readonly secondary replica in the same region. Not applicable to a Hyperscale database within an elastic pool. \
 * {@link KnownDatabaseReadScale} can be used interchangeably with DatabaseReadScale,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type DatabaseReadScale = string;

/** The secondary type of the database if it is a secondary.  Valid values are Geo, Named and Standby. */
export enum KnownSecondaryType {
  /** Geo */
  Geo = "Geo",
  /** Named */
  Named = "Named",
  /** Standby */
  Standby = "Standby",
}

/**
 * The secondary type of the database if it is a secondary.  Valid values are Geo, Named and Standby. \
 * {@link KnownSecondaryType} can be used interchangeably with SecondaryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Geo**: Geo \
 * **Named**: Named \
 * **Standby**: Standby
 */
export type SecondaryType = string;

/** An ARM Resource SKU. */
export interface Sku {
  /** The name of the SKU, typically, a letter + Number code, e.g. P3. */
  name: string;
  /** The tier or edition of the particular SKU, e.g. Basic, Premium. */
  tier?: string;
  /** Size of the particular SKU */
  size?: string;
  /** If the service has different generations of hardware, for the same SKU, then that can be captured here. */
  family?: string;
  /** Capacity of the particular SKU. */
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

/** The storage account type used to store backups for this database. */
export enum KnownBackupStorageRedundancy {
  /** Geo */
  Geo = "Geo",
  /** Local */
  Local = "Local",
  /** Zone */
  Zone = "Zone",
  /** GeoZone */
  GeoZone = "GeoZone",
}

/**
 * The storage account type used to store backups for this database. \
 * {@link KnownBackupStorageRedundancy} can be used interchangeably with BackupStorageRedundancy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Geo**: Geo \
 * **Local**: Local \
 * **Zone**: Zone \
 * **GeoZone**: GeoZone
 */
export type BackupStorageRedundancy = string;

export function databaseKeyRecordSerializer(
  item: Record<string, DatabaseKey>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : databaseKeySerializer(item[key]);
  });
  return result;
}

export function databaseKeyRecordDeserializer(
  item: Record<string, any>,
): Record<string, DatabaseKey> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : databaseKeyDeserializer(item[key]);
  });
  return result;
}

/** Database level key used for encryption at rest. */
export interface DatabaseKey {
  /** The database key type. Only supported value is 'AzureKeyVault'. */
  readonly type?: DatabaseKeyType;
  /** Thumbprint of the database key. */
  readonly thumbprint?: string;
  /** The database key creation date. */
  readonly creationDate?: Date;
  /** Subregion of the server key. */
  readonly subregion?: string;
  /** The database key's version. */
  readonly keyVersion?: string;
}

export function databaseKeySerializer(_item: DatabaseKey): any {
  return {};
}

export function databaseKeyDeserializer(item: any): DatabaseKey {
  return {
    type: item["type"],
    thumbprint: item["thumbprint"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    subregion: item["subregion"],
    keyVersion: item["keyVersion"],
  };
}

/** The database key type. Only supported value is 'AzureKeyVault'. */
export enum KnownDatabaseKeyType {
  /** AzureKeyVault */
  AzureKeyVault = "AzureKeyVault",
}

/**
 * The database key type. Only supported value is 'AzureKeyVault'. \
 * {@link KnownDatabaseKeyType} can be used interchangeably with DatabaseKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureKeyVault**: AzureKeyVault
 */
export type DatabaseKeyType = string;

/** Type of enclave requested on the database i.e. Default or VBS enclaves. */
export enum KnownAlwaysEncryptedEnclaveType {
  /** Default */
  Default = "Default",
  /** VBS */
  VBS = "VBS",
}

/**
 * Type of enclave requested on the database i.e. Default or VBS enclaves. \
 * {@link KnownAlwaysEncryptedEnclaveType} can be used interchangeably with AlwaysEncryptedEnclaveType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default \
 * **VBS**: VBS
 */
export type AlwaysEncryptedEnclaveType = string;

/**
 * Specifies the behavior when monthly free limits are exhausted for the free database.
 *
 * AutoPause: The database will be auto paused upon exhaustion of free limits for remainder of the month.
 *
 * BillForUsage: The database will continue to be online upon exhaustion of free limits and any overage will be billed.
 */
export enum KnownFreeLimitExhaustionBehavior {
  /** AutoPause */
  AutoPause = "AutoPause",
  /** BillOverUsage */
  BillOverUsage = "BillOverUsage",
}

/**
 * Specifies the behavior when monthly free limits are exhausted for the free database.
 *
 * AutoPause: The database will be auto paused upon exhaustion of free limits for remainder of the month.
 *
 * BillForUsage: The database will continue to be online upon exhaustion of free limits and any overage will be billed. \
 * {@link KnownFreeLimitExhaustionBehavior} can be used interchangeably with FreeLimitExhaustionBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AutoPause**: AutoPause \
 * **BillOverUsage**: BillOverUsage
 */
export type FreeLimitExhaustionBehavior = string;

/** Specifies the availability zone the database is pinned to. */
export enum KnownAvailabilityZoneType {
  /** NoPreference */
  NoPreference = "NoPreference",
  /** 1 */
  One = "1",
  /** 2 */
  Two = "2",
  /** 3 */
  Three = "3",
}

/**
 * Specifies the availability zone the database is pinned to. \
 * {@link KnownAvailabilityZoneType} can be used interchangeably with AvailabilityZoneType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoPreference**: NoPreference \
 * **1**: 1 \
 * **2**: 2 \
 * **3**: 3
 */
export type AvailabilityZoneType = string;

/** Azure Active Directory identity configuration for a resource. */
export interface DatabaseIdentity {
  /** The identity type */
  type?: DatabaseIdentityType;
  /** The Azure Active Directory tenant id. */
  readonly tenantId?: string;
  /** The resource ids of the user assigned identities to use */
  userAssignedIdentities?: Record<string, DatabaseUserIdentity>;
}

export function databaseIdentitySerializer(item: DatabaseIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : databaseUserIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function databaseIdentityDeserializer(item: any): DatabaseIdentity {
  return {
    type: item["type"],
    tenantId: item["tenantId"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : databaseUserIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The identity type */
export enum KnownDatabaseIdentityType {
  /** None */
  None = "None",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * The identity type \
 * {@link KnownDatabaseIdentityType} can be used interchangeably with DatabaseIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **UserAssigned**: UserAssigned
 */
export type DatabaseIdentityType = string;

export function databaseUserIdentityRecordSerializer(
  item: Record<string, DatabaseUserIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : databaseUserIdentitySerializer(item[key]);
  });
  return result;
}

export function databaseUserIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, DatabaseUserIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : databaseUserIdentityDeserializer(item[key]);
  });
  return result;
}

/** Azure Active Directory identity configuration for a resource. */
export interface DatabaseUserIdentity {
  /** The Azure Active Directory principal id. */
  readonly principalId?: string;
  /** The Azure Active Directory client id. */
  readonly clientId?: string;
}

export function databaseUserIdentitySerializer(_item: DatabaseUserIdentity): any {
  return {};
}

export function databaseUserIdentityDeserializer(item: any): DatabaseUserIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
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
      : systemdataDeserializer(item["systemData"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** A database update resource. */
export interface DatabaseUpdate {
  /** The name and tier of the SKU. */
  sku?: Sku;
  /** Database identity */
  identity?: DatabaseIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /**
   * Specifies the mode of database creation.
   *
   * Default: regular database creation.
   *
   * Copy: creates a database as a copy of an existing database. sourceDatabaseId must be specified as the resource ID of the source database.
   *
   * Secondary: creates a database as a secondary replica of an existing database. sourceDatabaseId must be specified as the resource ID of the existing primary database.
   *
   * PointInTimeRestore: Creates a database by restoring a point in time backup of an existing database. sourceDatabaseId must be specified as the resource ID of the existing database, and restorePointInTime must be specified.
   *
   * Recovery: Creates a database by restoring a geo-replicated backup. sourceDatabaseId must be specified as the recoverable database resource ID to restore.
   *
   * Restore: Creates a database by restoring a backup of a deleted database. sourceDatabaseId must be specified. If sourceDatabaseId is the database's original resource ID, then sourceDatabaseDeletionDate must be specified. Otherwise sourceDatabaseId must be the restorable dropped database resource ID and sourceDatabaseDeletionDate is ignored. restorePointInTime may also be specified to restore from an earlier point in time.
   *
   * RestoreLongTermRetentionBackup: Creates a database by restoring from a long term retention vault. recoveryServicesRecoveryPointResourceId must be specified as the recovery point resource ID.
   *
   * Copy, Secondary, and RestoreLongTermRetentionBackup are not supported for DataWarehouse edition.
   */
  createMode?: CreateMode;
  /** The collation of the database. */
  collation?: string;
  /** The max size of the database expressed in bytes. */
  maxSizeBytes?: number;
  /** The name of the sample schema to apply when creating this database. */
  sampleName?: SampleName;
  /** The resource identifier of the elastic pool containing this database. */
  elasticPoolId?: string;
  /** The resource identifier of the source database associated with create operation of this database. */
  sourceDatabaseId?: string;
  /** The status of the database. */
  readonly status?: DatabaseStatus;
  /** The ID of the database. */
  readonly databaseId?: string;
  /** The creation date of the database (ISO8601 format). */
  readonly creationDate?: Date;
  /** The current service level objective name of the database. */
  readonly currentServiceObjectiveName?: string;
  /** The requested service level objective name of the database. */
  readonly requestedServiceObjectiveName?: string;
  /** The default secondary region for this database. */
  readonly defaultSecondaryLocation?: string;
  /** Failover Group resource identifier that this database belongs to. */
  readonly failoverGroupId?: string;
  /** Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database. */
  restorePointInTime?: Date;
  /** Specifies the time that the database was deleted. */
  sourceDatabaseDeletionDate?: Date;
  /** The resource identifier of the recovery point associated with create operation of this database. */
  recoveryServicesRecoveryPointId?: string;
  /** The resource identifier of the long term retention backup associated with create operation of this database. */
  longTermRetentionBackupResourceId?: string;
  /** The resource identifier of the recoverable database associated with create operation of this database. */
  recoverableDatabaseId?: string;
  /** The resource identifier of the restorable dropped database associated with create operation of this database. */
  restorableDroppedDatabaseId?: string;
  /** Collation of the metadata catalog. */
  catalogCollation?: CatalogCollationType;
  /** Whether or not this database is zone redundant, which means the replicas of this database will be spread across multiple availability zones. */
  zoneRedundant?: boolean;
  /** The license type to apply for this database. `LicenseIncluded` if you need a license, or `BasePrice` if you have a license and are eligible for the Azure Hybrid Benefit. */
  licenseType?: DatabaseLicenseType;
  /** The max log size for this database. */
  readonly maxLogSizeBytes?: number;
  /** This records the earliest start date and time that restore is available for this database (ISO8601 format). */
  readonly earliestRestoreDate?: Date;
  /** The state of read-only routing. If enabled, connections that have application intent set to readonly in their connection string may be routed to a readonly secondary replica in the same region. Not applicable to a Hyperscale database within an elastic pool. */
  readScale?: DatabaseReadScale;
  /** The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition database that are used to provide high availability. Not applicable to a Hyperscale database within an elastic pool. */
  highAvailabilityReplicaCount?: number;
  /** The secondary type of the database if it is a secondary.  Valid values are Geo, Named and Standby. */
  secondaryType?: SecondaryType;
  /** The name and tier of the SKU. */
  readonly currentSku?: Sku;
  /** Time in minutes after which database is automatically paused. A value of -1 means that automatic pause is disabled */
  autoPauseDelay?: number;
  /** The storage account type used to store backups for this database. */
  readonly currentBackupStorageRedundancy?: BackupStorageRedundancy;
  /** The storage account type to be used to store backups for this database. */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /** Minimal capacity that database will always have allocated, if not paused */
  minCapacity?: number;
  /** The date when database was paused by user configuration or action(ISO8601 format). Null if the database is ready. */
  readonly pausedDate?: Date;
  /** The date when database was resumed by user action or database login (ISO8601 format). Null if the database is paused. */
  readonly resumedDate?: Date;
  /** Maintenance configuration id assigned to the database. This configuration defines the period when the maintenance updates will occur. */
  maintenanceConfigurationId?: string;
  /** Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created. */
  isLedgerOn?: boolean;
  /** Infra encryption is enabled for this database. */
  readonly isInfraEncryptionEnabled?: boolean;
  /** The Client id used for cross tenant per database CMK scenario */
  federatedClientId?: string;
  /** The resource ids of the user assigned identities to use */
  keys?: Record<string, DatabaseKey>;
  /** The azure key vault URI of the database if it's configured with per Database Customer Managed Keys. */
  encryptionProtector?: string;
  /** Type of enclave requested on the database i.e. Default or VBS enclaves. */
  preferredEnclaveType?: AlwaysEncryptedEnclaveType;
  /** Whether or not the database uses free monthly limits. Allowed on one database in a subscription. */
  useFreeLimit?: boolean;
  /**
   * Specifies the behavior when monthly free limits are exhausted for the free database.
   *
   * AutoPause: The database will be auto paused upon exhaustion of free limits for remainder of the month.
   *
   * BillForUsage: The database will continue to be online upon exhaustion of free limits and any overage will be billed.
   */
  freeLimitExhaustionBehavior?: FreeLimitExhaustionBehavior;
  /**
   * Whether or not customer controlled manual cutover needs to be done during Update Database operation to Hyperscale tier.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier.
   *
   * When manualCutover is specified, the scaling operation will wait for user input to trigger cutover to Hyperscale database.
   *
   * To trigger cutover, please provide 'performCutover' parameter when the Scaling operation is in Waiting state.
   */
  manualCutover?: boolean;
  /**
   * To trigger customer controlled manual cutover during the wait state while Scaling operation is in progress.
   *
   * This property parameter is only applicable for scaling operations that are initiated along with 'manualCutover' parameter.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier is already in progress.
   *
   * When performCutover is specified, the scaling operation will trigger cutover and perform role-change to Hyperscale database.
   */
  performCutover?: boolean;
  /** The flag to enable or disable auto rotation of database encryption protector AKV key. */
  encryptionProtectorAutoRotation?: boolean;
  /** Specifies the provisioning state for this resource */
  readonly provisioningState?: string;
}

export function databaseUpdateSerializer(item: DatabaseUpdate): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : databaseIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "createMode",
      "collation",
      "maxSizeBytes",
      "sampleName",
      "elasticPoolId",
      "sourceDatabaseId",
      "restorePointInTime",
      "sourceDatabaseDeletionDate",
      "recoveryServicesRecoveryPointId",
      "longTermRetentionBackupResourceId",
      "recoverableDatabaseId",
      "restorableDroppedDatabaseId",
      "catalogCollation",
      "zoneRedundant",
      "licenseType",
      "readScale",
      "highAvailabilityReplicaCount",
      "secondaryType",
      "autoPauseDelay",
      "requestedBackupStorageRedundancy",
      "minCapacity",
      "maintenanceConfigurationId",
      "isLedgerOn",
      "federatedClientId",
      "keys",
      "encryptionProtector",
      "preferredEnclaveType",
      "useFreeLimit",
      "freeLimitExhaustionBehavior",
      "manualCutover",
      "performCutover",
      "encryptionProtectorAutoRotation",
    ])
      ? undefined
      : _databaseUpdatePropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** A database update properties. */
export interface DatabaseUpdateProperties {
  /**
   * Specifies the mode of database creation.
   *
   * Default: regular database creation.
   *
   * Copy: creates a database as a copy of an existing database. sourceDatabaseId must be specified as the resource ID of the source database.
   *
   * Secondary: creates a database as a secondary replica of an existing database. sourceDatabaseId must be specified as the resource ID of the existing primary database.
   *
   * PointInTimeRestore: Creates a database by restoring a point in time backup of an existing database. sourceDatabaseId must be specified as the resource ID of the existing database, and restorePointInTime must be specified.
   *
   * Recovery: Creates a database by restoring a geo-replicated backup. sourceDatabaseId must be specified as the recoverable database resource ID to restore.
   *
   * Restore: Creates a database by restoring a backup of a deleted database. sourceDatabaseId must be specified. If sourceDatabaseId is the database's original resource ID, then sourceDatabaseDeletionDate must be specified. Otherwise sourceDatabaseId must be the restorable dropped database resource ID and sourceDatabaseDeletionDate is ignored. restorePointInTime may also be specified to restore from an earlier point in time.
   *
   * RestoreLongTermRetentionBackup: Creates a database by restoring from a long term retention vault. recoveryServicesRecoveryPointResourceId must be specified as the recovery point resource ID.
   *
   * Copy, Secondary, and RestoreLongTermRetentionBackup are not supported for DataWarehouse edition.
   */
  createMode?: CreateMode;
  /** The collation of the database. */
  collation?: string;
  /** The max size of the database expressed in bytes. */
  maxSizeBytes?: number;
  /** The name of the sample schema to apply when creating this database. */
  sampleName?: SampleName;
  /** The resource identifier of the elastic pool containing this database. */
  elasticPoolId?: string;
  /** The resource identifier of the source database associated with create operation of this database. */
  sourceDatabaseId?: string;
  /** The status of the database. */
  readonly status?: DatabaseStatus;
  /** The ID of the database. */
  readonly databaseId?: string;
  /** The creation date of the database (ISO8601 format). */
  readonly creationDate?: Date;
  /** The current service level objective name of the database. */
  readonly currentServiceObjectiveName?: string;
  /** The requested service level objective name of the database. */
  readonly requestedServiceObjectiveName?: string;
  /** The default secondary region for this database. */
  readonly defaultSecondaryLocation?: string;
  /** Failover Group resource identifier that this database belongs to. */
  readonly failoverGroupId?: string;
  /** Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database. */
  restorePointInTime?: Date;
  /** Specifies the time that the database was deleted. */
  sourceDatabaseDeletionDate?: Date;
  /** The resource identifier of the recovery point associated with create operation of this database. */
  recoveryServicesRecoveryPointId?: string;
  /** The resource identifier of the long term retention backup associated with create operation of this database. */
  longTermRetentionBackupResourceId?: string;
  /** The resource identifier of the recoverable database associated with create operation of this database. */
  recoverableDatabaseId?: string;
  /** The resource identifier of the restorable dropped database associated with create operation of this database. */
  restorableDroppedDatabaseId?: string;
  /** Collation of the metadata catalog. */
  catalogCollation?: CatalogCollationType;
  /** Whether or not this database is zone redundant, which means the replicas of this database will be spread across multiple availability zones. */
  zoneRedundant?: boolean;
  /** The license type to apply for this database. `LicenseIncluded` if you need a license, or `BasePrice` if you have a license and are eligible for the Azure Hybrid Benefit. */
  licenseType?: DatabaseLicenseType;
  /** The max log size for this database. */
  readonly maxLogSizeBytes?: number;
  /** This records the earliest start date and time that restore is available for this database (ISO8601 format). */
  readonly earliestRestoreDate?: Date;
  /** The state of read-only routing. If enabled, connections that have application intent set to readonly in their connection string may be routed to a readonly secondary replica in the same region. Not applicable to a Hyperscale database within an elastic pool. */
  readScale?: DatabaseReadScale;
  /** The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition database that are used to provide high availability. Not applicable to a Hyperscale database within an elastic pool. */
  highAvailabilityReplicaCount?: number;
  /** The secondary type of the database if it is a secondary.  Valid values are Geo, Named and Standby. */
  secondaryType?: SecondaryType;
  /** The name and tier of the SKU. */
  readonly currentSku?: Sku;
  /** Time in minutes after which database is automatically paused. A value of -1 means that automatic pause is disabled */
  autoPauseDelay?: number;
  /** The storage account type used to store backups for this database. */
  readonly currentBackupStorageRedundancy?: BackupStorageRedundancy;
  /** The storage account type to be used to store backups for this database. */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /** Minimal capacity that database will always have allocated, if not paused */
  minCapacity?: number;
  /** The date when database was paused by user configuration or action(ISO8601 format). Null if the database is ready. */
  readonly pausedDate?: Date;
  /** The date when database was resumed by user action or database login (ISO8601 format). Null if the database is paused. */
  readonly resumedDate?: Date;
  /** Maintenance configuration id assigned to the database. This configuration defines the period when the maintenance updates will occur. */
  maintenanceConfigurationId?: string;
  /** Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created. */
  isLedgerOn?: boolean;
  /** Infra encryption is enabled for this database. */
  readonly isInfraEncryptionEnabled?: boolean;
  /** The Client id used for cross tenant per database CMK scenario */
  federatedClientId?: string;
  /** The resource ids of the user assigned identities to use */
  keys?: Record<string, DatabaseKey>;
  /** The azure key vault URI of the database if it's configured with per Database Customer Managed Keys. */
  encryptionProtector?: string;
  /** Type of enclave requested on the database i.e. Default or VBS enclaves. */
  preferredEnclaveType?: AlwaysEncryptedEnclaveType;
  /** Whether or not the database uses free monthly limits. Allowed on one database in a subscription. */
  useFreeLimit?: boolean;
  /**
   * Specifies the behavior when monthly free limits are exhausted for the free database.
   *
   * AutoPause: The database will be auto paused upon exhaustion of free limits for remainder of the month.
   *
   * BillForUsage: The database will continue to be online upon exhaustion of free limits and any overage will be billed.
   */
  freeLimitExhaustionBehavior?: FreeLimitExhaustionBehavior;
  /**
   * Whether or not customer controlled manual cutover needs to be done during Update Database operation to Hyperscale tier.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier.
   *
   * When manualCutover is specified, the scaling operation will wait for user input to trigger cutover to Hyperscale database.
   *
   * To trigger cutover, please provide 'performCutover' parameter when the Scaling operation is in Waiting state.
   */
  manualCutover?: boolean;
  /**
   * To trigger customer controlled manual cutover during the wait state while Scaling operation is in progress.
   *
   * This property parameter is only applicable for scaling operations that are initiated along with 'manualCutover' parameter.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier is already in progress.
   *
   * When performCutover is specified, the scaling operation will trigger cutover and perform role-change to Hyperscale database.
   */
  performCutover?: boolean;
  /** The flag to enable or disable auto rotation of database encryption protector AKV key. */
  encryptionProtectorAutoRotation?: boolean;
  /** Specifies the provisioning state for this resource */
  readonly provisioningState?: string;
}

export function databaseUpdatePropertiesSerializer(item: DatabaseUpdateProperties): any {
  return {
    createMode: item["createMode"],
    collation: item["collation"],
    maxSizeBytes: item["maxSizeBytes"],
    sampleName: item["sampleName"],
    elasticPoolId: item["elasticPoolId"],
    sourceDatabaseId: item["sourceDatabaseId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    sourceDatabaseDeletionDate: !item["sourceDatabaseDeletionDate"]
      ? item["sourceDatabaseDeletionDate"]
      : item["sourceDatabaseDeletionDate"].toISOString(),
    recoveryServicesRecoveryPointId: item["recoveryServicesRecoveryPointId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    catalogCollation: item["catalogCollation"],
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    readScale: item["readScale"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    secondaryType: item["secondaryType"],
    autoPauseDelay: item["autoPauseDelay"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    minCapacity: item["minCapacity"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    isLedgerOn: item["isLedgerOn"],
    federatedClientId: item["federatedClientId"],
    keys: !item["keys"] ? item["keys"] : databaseKeyRecordSerializer(item["keys"]),
    encryptionProtector: item["encryptionProtector"],
    preferredEnclaveType: item["preferredEnclaveType"],
    useFreeLimit: item["useFreeLimit"],
    freeLimitExhaustionBehavior: item["freeLimitExhaustionBehavior"],
    manualCutover: item["manualCutover"],
    performCutover: item["performCutover"],
    encryptionProtectorAutoRotation: item["encryptionProtectorAutoRotation"],
  };
}

/** The response of a Database list operation. */
export interface _DatabaseListResult {
  /** The Database items on this page */
  value: Database[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseListResultDeserializer(item: any): _DatabaseListResult {
  return {
    value: databaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseArraySerializer(result: Array<Database>): any[] {
  return result.map((item) => {
    return databaseSerializer(item);
  });
}

export function databaseArrayDeserializer(result: Array<Database>): any[] {
  return result.map((item) => {
    return databaseDeserializer(item);
  });
}

/** Contains the information necessary to perform export database operation. */
export interface ExportDatabaseDefinition {
  /** Storage key type: StorageAccessKey, SharedAccessKey, or ManagedIdentity. */
  storageKeyType: StorageKeyType;
  /** Storage key for the storage account. If StorageKeyType is ManagedIdentity, this field should specify the Managed Identity's resource ID. */
  storageKey: string;
  /** Storage Uri. */
  storageUri: string;
  /** Administrator login name. If AuthenticationType is ManagedIdentity, this field should specify the Managed Identity's resource ID. */
  administratorLogin: string;
  /** Administrator login password. If AuthenticationType is ManagedIdentity, this field should not be specified. */
  administratorLoginPassword?: string;
  /** Type of credentials provided for access to the target SQL server: SQL, ADPassword or ManagedIdentity. */
  authenticationType?: string;
  /** Optional resource information to enable network isolation for request. */
  networkIsolation?: NetworkIsolationSettings;
}

export function exportDatabaseDefinitionSerializer(item: ExportDatabaseDefinition): any {
  return {
    storageKeyType: item["storageKeyType"],
    storageKey: item["storageKey"],
    storageUri: item["storageUri"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    authenticationType: item["authenticationType"],
    networkIsolation: !item["networkIsolation"]
      ? item["networkIsolation"]
      : networkIsolationSettingsSerializer(item["networkIsolation"]),
  };
}

/** Storage key type: StorageAccessKey, SharedAccessKey or ManagedIdentity. */
export enum KnownStorageKeyType {
  /** SharedAccessKey */
  SharedAccessKey = "SharedAccessKey",
  /** StorageAccessKey */
  StorageAccessKey = "StorageAccessKey",
  /** ManagedIdentity */
  ManagedIdentity = "ManagedIdentity",
}

/**
 * Storage key type: StorageAccessKey, SharedAccessKey or ManagedIdentity. \
 * {@link KnownStorageKeyType} can be used interchangeably with StorageKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SharedAccessKey**: SharedAccessKey \
 * **StorageAccessKey**: StorageAccessKey \
 * **ManagedIdentity**: ManagedIdentity
 */
export type StorageKeyType = string;

/** Contains the ARM resources for which to create private endpoint connection. */
export interface NetworkIsolationSettings {
  /** The resource id for the storage account used to store BACPAC file. If set, private endpoint connection will be created for the storage account. Must match storage account used for StorageUri parameter. */
  storageAccountResourceId?: string;
  /** The resource id for the SQL server which is the target of this request. If set, private endpoint connection will be created for the SQL server. Must match server which is target of the operation. */
  sqlServerResourceId?: string;
}

export function networkIsolationSettingsSerializer(item: NetworkIsolationSettings): any {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    sqlServerResourceId: item["sqlServerResourceId"],
  };
}

/** An ImportExport operation result resource. */
export interface ImportExportOperationResult extends ProxyResourceAutoGenerated {
  /** Request Id. */
  readonly requestId?: string;
  /** Request type. */
  readonly requestType?: string;
  /** Queued time. */
  readonly queuedTime?: string;
  /** Last modified time. */
  readonly lastModifiedTime?: string;
  /** Blob Uri. */
  readonly blobUri?: string;
  /** Server name. */
  readonly serverName?: string;
  /** Database name. */
  readonly databaseName?: string;
  /** Operation status. */
  readonly status?: string;
  /** Error message. */
  readonly errorMessage?: string;
  /** Gets the status of private endpoints associated with this request. */
  readonly privateEndpointConnections?: PrivateEndpointConnectionRequestStatus[];
}

export function importExportOperationResultDeserializer(item: any): ImportExportOperationResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _importExportOperationResultPropertiesDeserializer(item["properties"])),
  };
}

/** Contains the operation result properties for import/export operation. */
export interface ImportExportOperationResultProperties {
  /** Request Id. */
  readonly requestId?: string;
  /** Request type. */
  readonly requestType?: string;
  /** Queued time. */
  readonly queuedTime?: string;
  /** Last modified time. */
  readonly lastModifiedTime?: string;
  /** Blob Uri. */
  readonly blobUri?: string;
  /** Server name. */
  readonly serverName?: string;
  /** Database name. */
  readonly databaseName?: string;
  /** Operation status. */
  readonly status?: string;
  /** Error message. */
  readonly errorMessage?: string;
  /** Gets the status of private endpoints associated with this request. */
  readonly privateEndpointConnections?: PrivateEndpointConnectionRequestStatus[];
}

export function importExportOperationResultPropertiesDeserializer(
  item: any,
): ImportExportOperationResultProperties {
  return {
    requestId: item["requestId"],
    requestType: item["requestType"],
    queuedTime: item["queuedTime"],
    lastModifiedTime: item["lastModifiedTime"],
    blobUri: item["blobUri"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    status: item["status"],
    errorMessage: item["errorMessage"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionRequestStatusArrayDeserializer(item["privateEndpointConnections"]),
  };
}

export function privateEndpointConnectionRequestStatusArrayDeserializer(
  result: Array<PrivateEndpointConnectionRequestStatus>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionRequestStatusDeserializer(item);
  });
}

/** Contains the private endpoint connection requests status. */
export interface PrivateEndpointConnectionRequestStatus {
  /** Resource id for which the private endpoint is created. */
  readonly privateLinkServiceId?: string;
  /** The connection name for the private endpoint. */
  readonly privateEndpointConnectionName?: string;
  /** Status of this private endpoint connection. */
  readonly status?: string;
}

export function privateEndpointConnectionRequestStatusDeserializer(
  item: any,
): PrivateEndpointConnectionRequestStatus {
  return {
    privateLinkServiceId: item["privateLinkServiceId"],
    privateEndpointConnectionName: item["privateEndpointConnectionName"],
    status: item["status"],
  };
}

/** Contains the information necessary to perform import operation for existing database. */
export interface ImportExistingDatabaseDefinition {
  /** Storage key type: StorageAccessKey, SharedAccessKey, or ManagedIdentity. */
  storageKeyType: StorageKeyType;
  /** Storage key for the storage account. If StorageKeyType is ManagedIdentity, this field should specify the Managed Identity's resource ID. */
  storageKey: string;
  /** Storage Uri. */
  storageUri: string;
  /** Administrator login name. If AuthenticationType is ManagedIdentity, this field should specify the Managed Identity's resource ID. */
  administratorLogin: string;
  /** Administrator login password. If AuthenticationType is ManagedIdentity, this field should not be specified. */
  administratorLoginPassword?: string;
  /** Type of credentials provided for access to the target SQL server: SQL, ADPassword or ManagedIdentity. */
  authenticationType?: string;
  /** Optional resource information to enable network isolation for request. */
  networkIsolation?: NetworkIsolationSettings;
}

export function importExistingDatabaseDefinitionSerializer(
  item: ImportExistingDatabaseDefinition,
): any {
  return {
    storageKeyType: item["storageKeyType"],
    storageKey: item["storageKey"],
    storageUri: item["storageUri"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    authenticationType: item["authenticationType"],
    networkIsolation: !item["networkIsolation"]
      ? item["networkIsolation"]
      : networkIsolationSettingsSerializer(item["networkIsolation"]),
  };
}

/** Contains the information necessary to perform a resource move (rename). */
export interface ResourceMoveDefinition {
  /** The target ID for the resource */
  id: string;
}

export function resourceMoveDefinitionSerializer(item: ResourceMoveDefinition): any {
  return { id: item["id"] };
}

/** A server firewall rule. */
export interface FirewallRule extends ProxyResourceWithWritableName {
  /** The start IP address of the firewall rule. Must be IPv4 format. Use value '0.0.0.0' for all Azure-internal IP addresses. */
  startIpAddress?: string;
  /** The end IP address of the firewall rule. Must be IPv4 format. Must be greater than or equal to startIpAddress. Use value '0.0.0.0' for all Azure-internal IP addresses. */
  endIpAddress?: string;
}

export function firewallRuleSerializer(item: FirewallRule): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, ["startIpAddress", "endIpAddress"])
      ? undefined
      : _firewallRulePropertiesSerializer(item),
  };
}

export function firewallRuleDeserializer(item: any): FirewallRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _firewallRulePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a server firewall rule. */
export interface ServerFirewallRuleProperties {
  /** The start IP address of the firewall rule. Must be IPv4 format. Use value '0.0.0.0' for all Azure-internal IP addresses. */
  startIpAddress?: string;
  /** The end IP address of the firewall rule. Must be IPv4 format. Must be greater than or equal to startIpAddress. Use value '0.0.0.0' for all Azure-internal IP addresses. */
  endIpAddress?: string;
}

export function serverFirewallRulePropertiesSerializer(item: ServerFirewallRuleProperties): any {
  return { startIpAddress: item["startIpAddress"], endIpAddress: item["endIpAddress"] };
}

export function serverFirewallRulePropertiesDeserializer(item: any): ServerFirewallRuleProperties {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
  };
}

/** ARM proxy resource. */
export interface ProxyResourceWithWritableName extends ResourceWithWritableName {}

export function proxyResourceWithWritableNameSerializer(item: ProxyResourceWithWritableName): any {
  return { name: item["name"] };
}

export function proxyResourceWithWritableNameDeserializer(
  item: any,
): ProxyResourceWithWritableName {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** ARM resource. */
export interface ResourceWithWritableName {
  /** Resource ID. */
  readonly id?: string;
  /** Resource name. */
  name?: string;
  /** Resource type. */
  readonly type?: string;
}

export function resourceWithWritableNameSerializer(item: ResourceWithWritableName): any {
  return { name: item["name"] };
}

export function resourceWithWritableNameDeserializer(item: any): ResourceWithWritableName {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The response of a FirewallRule list operation. */
export interface _FirewallRuleListResult {
  /** The FirewallRule items on this page */
  value: FirewallRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _firewallRuleListResultDeserializer(item: any): _FirewallRuleListResult {
  return {
    value: firewallRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function firewallRuleArraySerializer(result: Array<FirewallRule>): any[] {
  return result.map((item) => {
    return firewallRuleSerializer(item);
  });
}

export function firewallRuleArrayDeserializer(result: Array<FirewallRule>): any[] {
  return result.map((item) => {
    return firewallRuleDeserializer(item);
  });
}

/** A list of server firewall rules. */
export interface FirewallRuleList {
  values?: FirewallRule[];
}

export function firewallRuleListSerializer(item: FirewallRuleList): any {
  return { values: !item["values"] ? item["values"] : firewallRuleArraySerializer(item["values"]) };
}

/** A replication link. */
export interface ReplicationLink extends ProxyResource {
  /** Resource partner server. */
  readonly partnerServer?: string;
  /** Resource partner database. */
  readonly partnerDatabase?: string;
  /** Resource partner database Id. */
  readonly partnerDatabaseId?: string;
  /** Resource partner location. */
  readonly partnerLocation?: string;
  /** Local replication role. */
  readonly role?: ReplicationRole;
  /** Partner replication role. */
  readonly partnerRole?: ReplicationRole;
  /** Replication mode. */
  readonly replicationMode?: string;
  /** Time at which the link was created. */
  readonly startTime?: Date;
  /** Seeding completion percentage for the link. */
  readonly percentComplete?: number;
  /** Replication state (PENDING, SEEDING, CATCHUP, SUSPENDED). */
  readonly replicationState?: ReplicationState;
  /** Whether the user is currently allowed to terminate the link. */
  readonly isTerminationAllowed?: boolean;
  /** Link type (GEO, NAMED, STANDBY). Update operation does not support NAMED. */
  linkType?: ReplicationLinkType;
}

export function replicationLinkSerializer(item: ReplicationLink): any {
  return {
    properties: areAllPropsUndefined(item, ["linkType"])
      ? undefined
      : _replicationLinkPropertiesSerializer(item),
  };
}

export function replicationLinkDeserializer(item: any): ReplicationLink {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _replicationLinkPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a replication link. */
export interface ReplicationLinkProperties {
  /** Resource partner server. */
  readonly partnerServer?: string;
  /** Resource partner database. */
  readonly partnerDatabase?: string;
  /** Resource partner database Id. */
  readonly partnerDatabaseId?: string;
  /** Resource partner location. */
  readonly partnerLocation?: string;
  /** Local replication role. */
  readonly role?: ReplicationRole;
  /** Partner replication role. */
  readonly partnerRole?: ReplicationRole;
  /** Replication mode. */
  readonly replicationMode?: string;
  /** Time at which the link was created. */
  readonly startTime?: Date;
  /** Seeding completion percentage for the link. */
  readonly percentComplete?: number;
  /** Replication state (PENDING, SEEDING, CATCHUP, SUSPENDED). */
  readonly replicationState?: ReplicationState;
  /** Whether the user is currently allowed to terminate the link. */
  readonly isTerminationAllowed?: boolean;
  /** Link type (GEO, NAMED, STANDBY). Update operation does not support NAMED. */
  linkType?: ReplicationLinkType;
}

export function replicationLinkPropertiesSerializer(item: ReplicationLinkProperties): any {
  return { linkType: item["linkType"] };
}

export function replicationLinkPropertiesDeserializer(item: any): ReplicationLinkProperties {
  return {
    partnerServer: item["partnerServer"],
    partnerDatabase: item["partnerDatabase"],
    partnerDatabaseId: item["partnerDatabaseId"],
    partnerLocation: item["partnerLocation"],
    role: item["role"],
    partnerRole: item["partnerRole"],
    replicationMode: item["replicationMode"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    percentComplete: item["percentComplete"],
    replicationState: item["replicationState"],
    isTerminationAllowed: item["isTerminationAllowed"],
    linkType: item["linkType"],
  };
}

/** Local replication role. */
export type ReplicationRole = "Primary" | "Secondary" | "NonReadableSecondary" | "Source" | "Copy";

/** Replication state (PENDING, SEEDING, CATCHUP, SUSPENDED). */
export enum KnownReplicationState {
  /** PENDING */
  Pending = "PENDING",
  /** SEEDING */
  Seeding = "SEEDING",
  /** CATCH_UP */
  CatchUP = "CATCH_UP",
  /** SUSPENDED */
  Suspended = "SUSPENDED",
}

/**
 * Replication state (PENDING, SEEDING, CATCHUP, SUSPENDED). \
 * {@link KnownReplicationState} can be used interchangeably with ReplicationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PENDING**: PENDING \
 * **SEEDING**: SEEDING \
 * **CATCH_UP**: CATCH_UP \
 * **SUSPENDED**: SUSPENDED
 */
export type ReplicationState = string;

/** Link type (GEO, NAMED, STANDBY). Update operation does not support NAMED. */
export enum KnownReplicationLinkType {
  /** GEO */
  GEO = "GEO",
  /** NAMED */
  Named = "NAMED",
  /** STANDBY */
  Standby = "STANDBY",
}

/**
 * Link type (GEO, NAMED, STANDBY). Update operation does not support NAMED. \
 * {@link KnownReplicationLinkType} can be used interchangeably with ReplicationLinkType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GEO**: GEO \
 * **NAMED**: NAMED \
 * **STANDBY**: STANDBY
 */
export type ReplicationLinkType = string;

/** A replication link update request. */
export interface ReplicationLinkUpdate extends ProxyResourceAutoGenerated {
  /** Link type (GEO, NAMED, STANDBY). Update operation does not support NAMED. */
  linkType?: ReplicationLinkType;
}

export function replicationLinkUpdateSerializer(item: ReplicationLinkUpdate): any {
  return {
    properties: areAllPropsUndefined(item, ["linkType"])
      ? undefined
      : _replicationLinkUpdatePropertiesSerializer(item),
  };
}

/** Properties of a replication link update. */
export interface ReplicationLinkUpdateProperties {
  /** Link type (GEO, NAMED, STANDBY). Update operation does not support NAMED. */
  linkType?: ReplicationLinkType;
}

export function replicationLinkUpdatePropertiesSerializer(
  item: ReplicationLinkUpdateProperties,
): any {
  return { linkType: item["linkType"] };
}

/** The response of a ReplicationLink list operation. */
export interface _ReplicationLinkListResult {
  /** The ReplicationLink items on this page */
  value: ReplicationLink[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _replicationLinkListResultDeserializer(item: any): _ReplicationLinkListResult {
  return {
    value: replicationLinkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicationLinkArraySerializer(result: Array<ReplicationLink>): any[] {
  return result.map((item) => {
    return replicationLinkSerializer(item);
  });
}

export function replicationLinkArrayDeserializer(result: Array<ReplicationLink>): any[] {
  return result.map((item) => {
    return replicationLinkDeserializer(item);
  });
}

/** An Azure SQL Database server. */
export interface Server extends TrackedResource {
  /** The Azure Active Directory identity of the server. */
  identity?: ResourceIdentity;
  /** Kind of sql server. This is metadata used for the Azure portal experience. */
  readonly kind?: string;
  /** Administrator username for the server. Once created it cannot be changed. */
  administratorLogin?: string;
  /** The administrator login password (required for server creation). */
  administratorLoginPassword?: string;
  /** The version of the server. */
  version?: string;
  /** The state of the server. */
  readonly state?: string;
  /** The fully qualified domain name of the server. */
  readonly fullyQualifiedDomainName?: string;
  /** List of private endpoint connections on a server */
  readonly privateEndpointConnections?: ServerPrivateEndpointConnection[];
  /** Minimal TLS version. Allowed values: 'None', 1.0', '1.1', '1.2', '1.3' */
  minimalTlsVersion?: MinimalTlsVersion;
  /** Whether or not public endpoint access is allowed for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' or 'SecuredByPerimeter' */
  publicNetworkAccess?: ServerPublicNetworkAccessFlag;
  /** Whether or not existing server has a workspace created and if it allows connection from workspace */
  readonly workspaceFeature?: ServerWorkspaceFeature;
  /** The resource id of a user assigned identity to be used by default. */
  primaryUserAssignedIdentityId?: string;
  /** The Client id used for cross tenant CMK scenario */
  federatedClientId?: string;
  /** A CMK URI of the key to use for encryption. */
  keyId?: string;
  /** The Azure Active Directory administrator can be utilized during server creation and for server updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used. */
  administrators?: ServerExternalAdministrator;
  /** Whether or not to restrict outbound network access for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' */
  restrictOutboundNetworkAccess?: ServerNetworkAccessFlag;
  /** Whether or not to enable IPv6 support for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' */
  isIPv6Enabled?: ServerNetworkAccessFlag;
  /** Status of external governance. */
  readonly externalGovernanceStatus?: ExternalGovernanceStatus;
  /** Number of days this server will stay soft-deleted. */
  retentionDays?: number;
  /** Create mode for server, only valid values for this are Normal and Restore. */
  createMode?: ServerCreateMode;
}

export function serverSerializer(item: Server): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "administratorLogin",
      "administratorLoginPassword",
      "version",
      "minimalTlsVersion",
      "publicNetworkAccess",
      "primaryUserAssignedIdentityId",
      "federatedClientId",
      "keyId",
      "administrators",
      "restrictOutboundNetworkAccess",
      "isIPv6Enabled",
      "retentionDays",
      "createMode",
    ])
      ? undefined
      : _serverPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
  };
}

export function serverDeserializer(item: any): Server {
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
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverPropertiesDeserializer(item["properties"])),
    identity: !item["identity"] ? item["identity"] : resourceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
  };
}

/** The properties of a server. */
export interface ServerProperties {
  /** Administrator username for the server. Once created it cannot be changed. */
  administratorLogin?: string;
  /** The administrator login password (required for server creation). */
  administratorLoginPassword?: string;
  /** The version of the server. */
  version?: string;
  /** The state of the server. */
  readonly state?: string;
  /** The fully qualified domain name of the server. */
  readonly fullyQualifiedDomainName?: string;
  /** List of private endpoint connections on a server */
  readonly privateEndpointConnections?: ServerPrivateEndpointConnection[];
  /** Minimal TLS version. Allowed values: 'None', 1.0', '1.1', '1.2', '1.3' */
  minimalTlsVersion?: MinimalTlsVersion;
  /** Whether or not public endpoint access is allowed for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' or 'SecuredByPerimeter' */
  publicNetworkAccess?: ServerPublicNetworkAccessFlag;
  /** Whether or not existing server has a workspace created and if it allows connection from workspace */
  readonly workspaceFeature?: ServerWorkspaceFeature;
  /** The resource id of a user assigned identity to be used by default. */
  primaryUserAssignedIdentityId?: string;
  /** The Client id used for cross tenant CMK scenario */
  federatedClientId?: string;
  /** A CMK URI of the key to use for encryption. */
  keyId?: string;
  /** The Azure Active Directory administrator can be utilized during server creation and for server updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used. */
  administrators?: ServerExternalAdministrator;
  /** Whether or not to restrict outbound network access for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' */
  restrictOutboundNetworkAccess?: ServerNetworkAccessFlag;
  /** Whether or not to enable IPv6 support for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' */
  isIPv6Enabled?: ServerNetworkAccessFlag;
  /** Status of external governance. */
  readonly externalGovernanceStatus?: ExternalGovernanceStatus;
  /** Number of days this server will stay soft-deleted. */
  retentionDays?: number;
  /** Create mode for server, only valid values for this are Normal and Restore. */
  createMode?: ServerCreateMode;
}

export function serverPropertiesSerializer(item: ServerProperties): any {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    minimalTlsVersion: item["minimalTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    federatedClientId: item["federatedClientId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : serverExternalAdministratorSerializer(item["administrators"]),
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    isIPv6Enabled: item["isIPv6Enabled"],
    retentionDays: item["retentionDays"],
    createMode: item["createMode"],
  };
}

export function serverPropertiesDeserializer(item: any): ServerProperties {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    state: item["state"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : serverPrivateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    minimalTlsVersion: item["minimalTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    workspaceFeature: item["workspaceFeature"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    federatedClientId: item["federatedClientId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : serverExternalAdministratorDeserializer(item["administrators"]),
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    isIPv6Enabled: item["isIPv6Enabled"],
    externalGovernanceStatus: item["externalGovernanceStatus"],
    retentionDays: item["retentionDays"],
    createMode: item["createMode"],
  };
}

export function serverPrivateEndpointConnectionArrayDeserializer(
  result: Array<ServerPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return serverPrivateEndpointConnectionDeserializer(item);
  });
}

/** A private endpoint connection under a server */
export interface ServerPrivateEndpointConnection {
  /** Resource ID. */
  readonly id?: string;
  /** Private endpoint connection properties */
  readonly properties?: PrivateEndpointConnectionProperties;
}

export function serverPrivateEndpointConnectionDeserializer(
  item: any,
): ServerPrivateEndpointConnection {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** Private endpoint which the connection belongs to. */
  privateEndpoint?: PrivateEndpointProperty;
  /** Group IDs. */
  readonly groupIds?: string[];
  /** Connection state of the private endpoint connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateProperty;
  /** State of the private endpoint connection. */
  readonly provisioningState?: PrivateEndpointProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertySerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertySerializer(
          item["privateLinkServiceConnectionState"],
        ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertyDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertyDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
    provisioningState: item["provisioningState"],
  };
}

/** model interface PrivateEndpointProperty */
export interface PrivateEndpointProperty {
  /** Resource id of the private endpoint. */
  id?: string;
}

export function privateEndpointPropertySerializer(item: PrivateEndpointProperty): any {
  return { id: item["id"] };
}

export function privateEndpointPropertyDeserializer(item: any): PrivateEndpointProperty {
  return {
    id: item["id"],
  };
}

/** model interface PrivateLinkServiceConnectionStateProperty */
export interface PrivateLinkServiceConnectionStateProperty {
  /** The private link service connection status. */
  status: PrivateLinkServiceConnectionStateStatus;
  /** The private link service connection description. */
  description: string;
  /** The actions required for private link service connection. */
  readonly actionsRequired?: PrivateLinkServiceConnectionStateActionsRequire;
}

export function privateLinkServiceConnectionStatePropertySerializer(
  item: PrivateLinkServiceConnectionStateProperty,
): any {
  return { status: item["status"], description: item["description"] };
}

export function privateLinkServiceConnectionStatePropertyDeserializer(
  item: any,
): PrivateLinkServiceConnectionStateProperty {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private link service connection status. */
export enum KnownPrivateLinkServiceConnectionStateStatus {
  /** Approved */
  Approved = "Approved",
  /** Pending */
  Pending = "Pending",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * The private link service connection status. \
 * {@link KnownPrivateLinkServiceConnectionStateStatus} can be used interchangeably with PrivateLinkServiceConnectionStateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approved**: Approved \
 * **Pending**: Pending \
 * **Rejected**: Rejected \
 * **Disconnected**: Disconnected
 */
export type PrivateLinkServiceConnectionStateStatus = string;

/** The actions required for private link service connection. */
export enum KnownPrivateLinkServiceConnectionStateActionsRequire {
  /** None */
  None = "None",
}

/**
 * The actions required for private link service connection. \
 * {@link KnownPrivateLinkServiceConnectionStateActionsRequire} can be used interchangeably with PrivateLinkServiceConnectionStateActionsRequire,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None
 */
export type PrivateLinkServiceConnectionStateActionsRequire = string;

/** State of the private endpoint connection. */
export enum KnownPrivateEndpointProvisioningState {
  /** Approving */
  Approving = "Approving",
  /** Ready */
  Ready = "Ready",
  /** Dropping */
  Dropping = "Dropping",
  /** Failed */
  Failed = "Failed",
  /** Rejecting */
  Rejecting = "Rejecting",
}

/**
 * State of the private endpoint connection. \
 * {@link KnownPrivateEndpointProvisioningState} can be used interchangeably with PrivateEndpointProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approving**: Approving \
 * **Ready**: Ready \
 * **Dropping**: Dropping \
 * **Failed**: Failed \
 * **Rejecting**: Rejecting
 */
export type PrivateEndpointProvisioningState = string;

/** Minimal TLS version. Allowed values: 'None', 1.0', '1.1', '1.2', '1.3' */
export enum KnownMinimalTlsVersion {
  /** None */
  None = "None",
  /** 1.0 */
  MinimalTlsVersion10 = "1.0",
  /** 1.1 */
  MinimalTlsVersion11 = "1.1",
  /** 1.2 */
  MinimalTlsVersion12 = "1.2",
  /** 1.3 */
  MinimalTlsVersion13 = "1.3",
}

/**
 * Minimal TLS version. Allowed values: 'None', 1.0', '1.1', '1.2', '1.3' \
 * {@link KnownMinimalTlsVersion} can be used interchangeably with MinimalTlsVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **1.0**: 1.0 \
 * **1.1**: 1.1 \
 * **1.2**: 1.2 \
 * **1.3**: 1.3
 */
export type MinimalTlsVersion = string;

/** Whether or not public endpoint access is allowed for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' or 'SecuredByPerimeter' */
export enum KnownServerPublicNetworkAccessFlag {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * Whether or not public endpoint access is allowed for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' or 'SecuredByPerimeter' \
 * {@link KnownServerPublicNetworkAccessFlag} can be used interchangeably with ServerPublicNetworkAccessFlag,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled \
 * **SecuredByPerimeter**: SecuredByPerimeter
 */
export type ServerPublicNetworkAccessFlag = string;

/** Whether or not existing server has a workspace created and if it allows connection from workspace */
export enum KnownServerWorkspaceFeature {
  /** Connected */
  Connected = "Connected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * Whether or not existing server has a workspace created and if it allows connection from workspace \
 * {@link KnownServerWorkspaceFeature} can be used interchangeably with ServerWorkspaceFeature,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected**: Connected \
 * **Disconnected**: Disconnected
 */
export type ServerWorkspaceFeature = string;

/** Properties of a active directory administrator. */
export interface ServerExternalAdministrator {
  /** Type of the sever administrator. */
  administratorType?: AdministratorType;
  /** Principal Type of the sever administrator. */
  principalType?: PrincipalType;
  /** Login name of the server administrator. */
  login?: string;
  /** SID (object ID) of the server administrator. */
  sid?: string;
  /** Tenant ID of the administrator. */
  tenantId?: string;
  /** Azure Active Directory only Authentication enabled. */
  azureADOnlyAuthentication?: boolean;
}

export function serverExternalAdministratorSerializer(item: ServerExternalAdministrator): any {
  return {
    administratorType: item["administratorType"],
    principalType: item["principalType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
    azureADOnlyAuthentication: item["azureADOnlyAuthentication"],
  };
}

export function serverExternalAdministratorDeserializer(item: any): ServerExternalAdministrator {
  return {
    administratorType: item["administratorType"],
    principalType: item["principalType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
    azureADOnlyAuthentication: item["azureADOnlyAuthentication"],
  };
}

/** Type of the sever administrator. */
export enum KnownAdministratorType {
  /** ActiveDirectory */
  ActiveDirectory = "ActiveDirectory",
}

/**
 * Type of the sever administrator. \
 * {@link KnownAdministratorType} can be used interchangeably with AdministratorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ActiveDirectory**: ActiveDirectory
 */
export type AdministratorType = string;

/** Principal Type of the sever administrator. */
export enum KnownPrincipalType {
  /** User */
  User = "User",
  /** Group */
  Group = "Group",
  /** Application */
  Application = "Application",
}

/**
 * Principal Type of the sever administrator. \
 * {@link KnownPrincipalType} can be used interchangeably with PrincipalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: User \
 * **Group**: Group \
 * **Application**: Application
 */
export type PrincipalType = string;

/** Whether or not to restrict outbound network access for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' */
export enum KnownServerNetworkAccessFlag {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether or not to restrict outbound network access for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' \
 * {@link KnownServerNetworkAccessFlag} can be used interchangeably with ServerNetworkAccessFlag,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type ServerNetworkAccessFlag = string;

/** Status of external governance. */
export enum KnownExternalGovernanceStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Status of external governance. \
 * {@link KnownExternalGovernanceStatus} can be used interchangeably with ExternalGovernanceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type ExternalGovernanceStatus = string;

/** Create mode for server, only valid values for this are Normal and Restore. */
export enum KnownServerCreateMode {
  /** Normal */
  Normal = "Normal",
  /** Restore */
  Restore = "Restore",
}

/**
 * Create mode for server, only valid values for this are Normal and Restore. \
 * {@link KnownServerCreateMode} can be used interchangeably with ServerCreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Normal**: Normal \
 * **Restore**: Restore
 */
export type ServerCreateMode = string;

/** Azure Active Directory identity configuration for a resource. */
export interface ResourceIdentity {
  /** The resource ids of the user assigned identities to use */
  userAssignedIdentities?: Record<string, UserIdentity>;
  /** The Azure Active Directory principal id. */
  readonly principalId?: string;
  /** The identity type. Set this to 'SystemAssigned' in order to automatically create and assign an Azure Active Directory principal for the resource. */
  type?: IdentityType;
  /** The Azure Active Directory tenant id. */
  readonly tenantId?: string;
}

export function resourceIdentitySerializer(item: ResourceIdentity): any {
  return {
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityRecordSerializer(item["userAssignedIdentities"]),
    type: item["type"],
  };
}

export function resourceIdentityDeserializer(item: any): ResourceIdentity {
  return {
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityRecordDeserializer(item["userAssignedIdentities"]),
    principalId: item["principalId"],
    type: item["type"],
    tenantId: item["tenantId"],
  };
}

export function userIdentityRecordSerializer(
  item: Record<string, UserIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentitySerializer(item[key]);
  });
  return result;
}

export function userIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityDeserializer(item[key]);
  });
  return result;
}

/** Azure Active Directory identity configuration for a resource. */
export interface UserIdentity {
  /** The Azure Active Directory principal id. */
  readonly principalId?: string;
  /** The Azure Active Directory client id. */
  readonly clientId?: string;
}

export function userIdentitySerializer(_item: UserIdentity): any {
  return {};
}

export function userIdentityDeserializer(item: any): UserIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The identity type. Set this to 'SystemAssigned' in order to automatically create and assign an Azure Active Directory principal for the resource. */
export enum KnownIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned,UserAssigned */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * The identity type. Set this to 'SystemAssigned' in order to automatically create and assign an Azure Active Directory principal for the resource. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned \
 * **SystemAssigned,UserAssigned**: SystemAssigned,UserAssigned
 */
export type IdentityType = string;

/** An update request for an Azure SQL Database server. */
export interface ServerUpdate {
  /** Server identity */
  identity?: ResourceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Administrator username for the server. Once created it cannot be changed. */
  administratorLogin?: string;
  /** The administrator login password (required for server creation). */
  administratorLoginPassword?: string;
  /** The version of the server. */
  version?: string;
  /** The state of the server. */
  readonly state?: string;
  /** The fully qualified domain name of the server. */
  readonly fullyQualifiedDomainName?: string;
  /** List of private endpoint connections on a server */
  readonly privateEndpointConnections?: ServerPrivateEndpointConnection[];
  /** Minimal TLS version. Allowed values: 'None', 1.0', '1.1', '1.2', '1.3' */
  minimalTlsVersion?: MinimalTlsVersion;
  /** Whether or not public endpoint access is allowed for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' or 'SecuredByPerimeter' */
  publicNetworkAccess?: ServerPublicNetworkAccessFlag;
  /** Whether or not existing server has a workspace created and if it allows connection from workspace */
  readonly workspaceFeature?: ServerWorkspaceFeature;
  /** The resource id of a user assigned identity to be used by default. */
  primaryUserAssignedIdentityId?: string;
  /** The Client id used for cross tenant CMK scenario */
  federatedClientId?: string;
  /** A CMK URI of the key to use for encryption. */
  keyId?: string;
  /** The Azure Active Directory administrator can be utilized during server creation and for server updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used. */
  administrators?: ServerExternalAdministrator;
  /** Whether or not to restrict outbound network access for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' */
  restrictOutboundNetworkAccess?: ServerNetworkAccessFlag;
  /** Whether or not to enable IPv6 support for this server.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' */
  isIPv6Enabled?: ServerNetworkAccessFlag;
  /** Status of external governance. */
  readonly externalGovernanceStatus?: ExternalGovernanceStatus;
  /** Number of days this server will stay soft-deleted. */
  retentionDays?: number;
  /** Create mode for server, only valid values for this are Normal and Restore. */
  createMode?: ServerCreateMode;
}

export function serverUpdateSerializer(item: ServerUpdate): any {
  return {
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "administratorLogin",
      "administratorLoginPassword",
      "version",
      "minimalTlsVersion",
      "publicNetworkAccess",
      "primaryUserAssignedIdentityId",
      "federatedClientId",
      "keyId",
      "administrators",
      "restrictOutboundNetworkAccess",
      "isIPv6Enabled",
      "retentionDays",
      "createMode",
    ])
      ? undefined
      : _serverUpdatePropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** The response of a Server list operation. */
export interface _ServerListResult {
  /** The Server items on this page */
  value: Server[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverListResultDeserializer(item: any): _ServerListResult {
  return {
    value: serverArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverArraySerializer(result: Array<Server>): any[] {
  return result.map((item) => {
    return serverSerializer(item);
  });
}

export function serverArrayDeserializer(result: Array<Server>): any[] {
  return result.map((item) => {
    return serverDeserializer(item);
  });
}

/** Contains the information necessary to perform import operation for new database. */
export interface ImportNewDatabaseDefinition {
  /** Name of the import database. */
  databaseName?: string;
  /** Edition of the import database. */
  edition?: string;
  /** Service level objective name of the import database. */
  serviceObjectiveName?: string;
  /** Max size in bytes for the import database. */
  maxSizeBytes?: string;
  /** Storage key type: StorageAccessKey, SharedAccessKey, or ManagedIdentity. */
  storageKeyType: StorageKeyType;
  /** Storage key for the storage account. If StorageKeyType is ManagedIdentity, this field should specify the Managed Identity's resource ID. */
  storageKey: string;
  /** Storage Uri. */
  storageUri: string;
  /** Administrator login name. If AuthenticationType is ManagedIdentity, this field should specify the Managed Identity's resource ID. */
  administratorLogin: string;
  /** Administrator login password. If AuthenticationType is ManagedIdentity, this field should not be specified. */
  administratorLoginPassword?: string;
  /** Type of credentials provided for access to the target SQL server: SQL, ADPassword or ManagedIdentity. */
  authenticationType?: string;
  /** Optional resource information to enable network isolation for request. */
  networkIsolation?: NetworkIsolationSettings;
}

export function importNewDatabaseDefinitionSerializer(item: ImportNewDatabaseDefinition): any {
  return {
    databaseName: item["databaseName"],
    edition: item["edition"],
    serviceObjectiveName: item["serviceObjectiveName"],
    maxSizeBytes: item["maxSizeBytes"],
    storageKeyType: item["storageKeyType"],
    storageKey: item["storageKey"],
    storageUri: item["storageUri"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    authenticationType: item["authenticationType"],
    networkIsolation: !item["networkIsolation"]
      ? item["networkIsolation"]
      : networkIsolationSettingsSerializer(item["networkIsolation"]),
  };
}

/** An RefreshExternalGovernanceStatus operation result resource. */
export interface RefreshExternalGovernanceStatusOperationResult extends ProxyResourceAutoGenerated {
  /** Request Id. */
  readonly requestId?: string;
  /** Request type. */
  readonly requestType?: string;
  /** Queued time. */
  readonly queuedTime?: string;
  /** Server name. */
  readonly serverName?: string;
  /** Operation status. */
  readonly status?: string;
  /** Error message. */
  readonly errorMessage?: string;
}

export function refreshExternalGovernanceStatusOperationResultDeserializer(
  item: any,
): RefreshExternalGovernanceStatusOperationResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _refreshExternalGovernanceStatusOperationResultPropertiesDeserializer(item["properties"])),
  };
}

/** Contains the operation result properties for refresh external governance status operation. */
export interface RefreshExternalGovernanceStatusOperationResultProperties {
  /** Request Id. */
  readonly requestId?: string;
  /** Request type. */
  readonly requestType?: string;
  /** Queued time. */
  readonly queuedTime?: string;
  /** Server name. */
  readonly serverName?: string;
  /** Operation status. */
  readonly status?: string;
  /** Error message. */
  readonly errorMessage?: string;
}

export function refreshExternalGovernanceStatusOperationResultPropertiesDeserializer(
  item: any,
): RefreshExternalGovernanceStatusOperationResultProperties {
  return {
    requestId: item["requestId"],
    requestType: item["requestType"],
    queuedTime: item["queuedTime"],
    serverName: item["serverName"],
    status: item["status"],
    errorMessage: item["errorMessage"],
  };
}

/** A request to check whether the specified name for a resource is available. */
export interface CheckNameAvailabilityRequest {
  name: string;
  type: CheckNameAvailabilityResourceType;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** Type of CheckNameAvailabilityResourceType */
export type CheckNameAvailabilityResourceType = "Microsoft.Sql/servers";

/** The result of a name availability check. */
export interface CheckNameAvailabilityResponse {
  /** The name whose availability was checked. */
  readonly name?: string;
  /** True if the name is available, otherwise false. */
  readonly available?: boolean;
  /** The reason code explaining why the name is unavailable. Will be undefined if the name is available. */
  readonly reason?: CheckNameAvailabilityReason;
  /** A message explaining why the name is unavailable. Will be undefined if the name is available. */
  readonly message?: string;
}

export function checkNameAvailabilityResponseDeserializer(
  item: any,
): CheckNameAvailabilityResponse {
  return {
    name: item["name"],
    available: item["available"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** The reason code explaining why the name is unavailable. Will be undefined if the name is available. */
export type CheckNameAvailabilityReason = "Invalid" | "AlreadyExists";

/** A server blob auditing policy. */
export interface ServerBlobAuditingPolicy extends ProxyResource {
  /**
   * Specifies the state of devops audit. If state is Enabled, devops logs will be sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled', 'IsAzureMonitorTargetEnabled' as true and 'IsDevopsAuditEnabled' as true
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should also be created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isDevopsAuditEnabled?: boolean;
  /** Specifies the number of days to keep in the audit logs in the storage account. */
  retentionDays?: number;
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /** Specifies whether storageAccountAccessKey value is the storage's secondary key. */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /** Specifies whether Managed Identity is used to access blob storage */
  isManagedIdentityInUse?: boolean;
  /** Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required. */
  state?: BlobAuditingPolicyState;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required. */
  storageEndpoint?: string;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /** Specifies the blob storage subscription Id. */
  storageAccountSubscriptionId?: string;
}

export function serverBlobAuditingPolicySerializer(item: ServerBlobAuditingPolicy): any {
  return {
    properties: areAllPropsUndefined(item, [
      "isDevopsAuditEnabled",
      "retentionDays",
      "auditActionsAndGroups",
      "isStorageSecondaryKeyInUse",
      "isAzureMonitorTargetEnabled",
      "queueDelayMs",
      "isManagedIdentityInUse",
      "state",
      "storageEndpoint",
      "storageAccountAccessKey",
      "storageAccountSubscriptionId",
    ])
      ? undefined
      : _serverBlobAuditingPolicyPropertiesSerializer(item),
  };
}

export function serverBlobAuditingPolicyDeserializer(item: any): ServerBlobAuditingPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverBlobAuditingPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a server blob auditing policy. */
export interface ServerBlobAuditingPolicyProperties {
  /**
   * Specifies the state of devops audit. If state is Enabled, devops logs will be sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled', 'IsAzureMonitorTargetEnabled' as true and 'IsDevopsAuditEnabled' as true
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should also be created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isDevopsAuditEnabled?: boolean;
  /** Specifies the number of days to keep in the audit logs in the storage account. */
  retentionDays?: number;
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /** Specifies whether storageAccountAccessKey value is the storage's secondary key. */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /** Specifies whether Managed Identity is used to access blob storage */
  isManagedIdentityInUse?: boolean;
  /** Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required. */
  state: BlobAuditingPolicyState;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required. */
  storageEndpoint?: string;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /** Specifies the blob storage subscription Id. */
  storageAccountSubscriptionId?: string;
}

export function serverBlobAuditingPolicyPropertiesSerializer(
  item: ServerBlobAuditingPolicyProperties,
): any {
  return {
    isDevopsAuditEnabled: item["isDevopsAuditEnabled"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function serverBlobAuditingPolicyPropertiesDeserializer(
  item: any,
): ServerBlobAuditingPolicyProperties {
  return {
    isDevopsAuditEnabled: item["isDevopsAuditEnabled"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

/** Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required. */
export type BlobAuditingPolicyState = "Enabled" | "Disabled";

/** The response of a ServerBlobAuditingPolicy list operation. */
export interface _ServerBlobAuditingPolicyListResult {
  /** The ServerBlobAuditingPolicy items on this page */
  value: ServerBlobAuditingPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverBlobAuditingPolicyListResultDeserializer(
  item: any,
): _ServerBlobAuditingPolicyListResult {
  return {
    value: serverBlobAuditingPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverBlobAuditingPolicyArraySerializer(
  result: Array<ServerBlobAuditingPolicy>,
): any[] {
  return result.map((item) => {
    return serverBlobAuditingPolicySerializer(item);
  });
}

export function serverBlobAuditingPolicyArrayDeserializer(
  result: Array<ServerBlobAuditingPolicy>,
): any[] {
  return result.map((item) => {
    return serverBlobAuditingPolicyDeserializer(item);
  });
}

/** A database blob auditing policy. */
export interface DatabaseBlobAuditingPolicy extends ProxyResource {
  /** Resource kind. */
  readonly kind?: string;
  /** Specifies the number of days to keep in the audit logs in the storage account. */
  retentionDays?: number;
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /** Specifies whether storageAccountAccessKey value is the storage's secondary key. */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /** Specifies whether Managed Identity is used to access blob storage */
  isManagedIdentityInUse?: boolean;
  /** Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required. */
  state?: BlobAuditingPolicyState;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required. */
  storageEndpoint?: string;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /** Specifies the blob storage subscription Id. */
  storageAccountSubscriptionId?: string;
}

export function databaseBlobAuditingPolicySerializer(item: DatabaseBlobAuditingPolicy): any {
  return {
    properties: areAllPropsUndefined(item, [
      "retentionDays",
      "auditActionsAndGroups",
      "isStorageSecondaryKeyInUse",
      "isAzureMonitorTargetEnabled",
      "queueDelayMs",
      "isManagedIdentityInUse",
      "state",
      "storageEndpoint",
      "storageAccountAccessKey",
      "storageAccountSubscriptionId",
    ])
      ? undefined
      : _databaseBlobAuditingPolicyPropertiesSerializer(item),
  };
}

export function databaseBlobAuditingPolicyDeserializer(item: any): DatabaseBlobAuditingPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseBlobAuditingPolicyPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Properties of a database blob auditing policy. */
export interface DatabaseBlobAuditingPolicyProperties {
  /** Specifies the number of days to keep in the audit logs in the storage account. */
  retentionDays?: number;
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /** Specifies whether storageAccountAccessKey value is the storage's secondary key. */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /** Specifies whether Managed Identity is used to access blob storage */
  isManagedIdentityInUse?: boolean;
  /** Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required. */
  state: BlobAuditingPolicyState;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required. */
  storageEndpoint?: string;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /** Specifies the blob storage subscription Id. */
  storageAccountSubscriptionId?: string;
}

export function databaseBlobAuditingPolicyPropertiesSerializer(
  item: DatabaseBlobAuditingPolicyProperties,
): any {
  return {
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function databaseBlobAuditingPolicyPropertiesDeserializer(
  item: any,
): DatabaseBlobAuditingPolicyProperties {
  return {
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

/** The response of a DatabaseBlobAuditingPolicy list operation. */
export interface _DatabaseBlobAuditingPolicyListResult {
  /** The DatabaseBlobAuditingPolicy items on this page */
  value: DatabaseBlobAuditingPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseBlobAuditingPolicyListResultDeserializer(
  item: any,
): _DatabaseBlobAuditingPolicyListResult {
  return {
    value: databaseBlobAuditingPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseBlobAuditingPolicyArraySerializer(
  result: Array<DatabaseBlobAuditingPolicy>,
): any[] {
  return result.map((item) => {
    return databaseBlobAuditingPolicySerializer(item);
  });
}

export function databaseBlobAuditingPolicyArrayDeserializer(
  result: Array<DatabaseBlobAuditingPolicy>,
): any[] {
  return result.map((item) => {
    return databaseBlobAuditingPolicyDeserializer(item);
  });
}

/** An extended database blob auditing policy. */
export interface ExtendedDatabaseBlobAuditingPolicy extends ProxyResource {
  /** Specifies condition of where clause when creating an audit. */
  predicateExpression?: string;
  /** Specifies the number of days to keep in the audit logs in the storage account. */
  retentionDays?: number;
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /** Specifies whether storageAccountAccessKey value is the storage's secondary key. */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /** Specifies whether Managed Identity is used to access blob storage */
  isManagedIdentityInUse?: boolean;
  /** Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required. */
  state?: BlobAuditingPolicyState;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required. */
  storageEndpoint?: string;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /** Specifies the blob storage subscription Id. */
  storageAccountSubscriptionId?: string;
}

export function extendedDatabaseBlobAuditingPolicySerializer(
  item: ExtendedDatabaseBlobAuditingPolicy,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "predicateExpression",
      "retentionDays",
      "auditActionsAndGroups",
      "isStorageSecondaryKeyInUse",
      "isAzureMonitorTargetEnabled",
      "queueDelayMs",
      "isManagedIdentityInUse",
      "state",
      "storageEndpoint",
      "storageAccountAccessKey",
      "storageAccountSubscriptionId",
    ])
      ? undefined
      : _extendedDatabaseBlobAuditingPolicyPropertiesSerializer(item),
  };
}

export function extendedDatabaseBlobAuditingPolicyDeserializer(
  item: any,
): ExtendedDatabaseBlobAuditingPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _extendedDatabaseBlobAuditingPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of an extended database blob auditing policy. */
export interface ExtendedDatabaseBlobAuditingPolicyProperties {
  /** Specifies condition of where clause when creating an audit. */
  predicateExpression?: string;
  /** Specifies the number of days to keep in the audit logs in the storage account. */
  retentionDays?: number;
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /** Specifies whether storageAccountAccessKey value is the storage's secondary key. */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /** Specifies whether Managed Identity is used to access blob storage */
  isManagedIdentityInUse?: boolean;
  /** Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required. */
  state: BlobAuditingPolicyState;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required. */
  storageEndpoint?: string;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /** Specifies the blob storage subscription Id. */
  storageAccountSubscriptionId?: string;
}

export function extendedDatabaseBlobAuditingPolicyPropertiesSerializer(
  item: ExtendedDatabaseBlobAuditingPolicyProperties,
): any {
  return {
    predicateExpression: item["predicateExpression"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function extendedDatabaseBlobAuditingPolicyPropertiesDeserializer(
  item: any,
): ExtendedDatabaseBlobAuditingPolicyProperties {
  return {
    predicateExpression: item["predicateExpression"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

/** The response of a ExtendedDatabaseBlobAuditingPolicy list operation. */
export interface _ExtendedDatabaseBlobAuditingPolicyListResult {
  /** The ExtendedDatabaseBlobAuditingPolicy items on this page */
  value: ExtendedDatabaseBlobAuditingPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _extendedDatabaseBlobAuditingPolicyListResultDeserializer(
  item: any,
): _ExtendedDatabaseBlobAuditingPolicyListResult {
  return {
    value: extendedDatabaseBlobAuditingPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function extendedDatabaseBlobAuditingPolicyArraySerializer(
  result: Array<ExtendedDatabaseBlobAuditingPolicy>,
): any[] {
  return result.map((item) => {
    return extendedDatabaseBlobAuditingPolicySerializer(item);
  });
}

export function extendedDatabaseBlobAuditingPolicyArrayDeserializer(
  result: Array<ExtendedDatabaseBlobAuditingPolicy>,
): any[] {
  return result.map((item) => {
    return extendedDatabaseBlobAuditingPolicyDeserializer(item);
  });
}

/** An extended server blob auditing policy. */
export interface ExtendedServerBlobAuditingPolicy extends ProxyResource {
  /**
   * Specifies the state of devops audit. If state is Enabled, devops logs will be sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled', 'IsAzureMonitorTargetEnabled' as true and 'IsDevopsAuditEnabled' as true
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should also be created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isDevopsAuditEnabled?: boolean;
  /** Specifies condition of where clause when creating an audit. */
  predicateExpression?: string;
  /** Specifies the number of days to keep in the audit logs in the storage account. */
  retentionDays?: number;
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /** Specifies whether storageAccountAccessKey value is the storage's secondary key. */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /** Specifies whether Managed Identity is used to access blob storage */
  isManagedIdentityInUse?: boolean;
  /** Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required. */
  state?: BlobAuditingPolicyState;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required. */
  storageEndpoint?: string;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /** Specifies the blob storage subscription Id. */
  storageAccountSubscriptionId?: string;
}

export function extendedServerBlobAuditingPolicySerializer(
  item: ExtendedServerBlobAuditingPolicy,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "isDevopsAuditEnabled",
      "predicateExpression",
      "retentionDays",
      "auditActionsAndGroups",
      "isStorageSecondaryKeyInUse",
      "isAzureMonitorTargetEnabled",
      "queueDelayMs",
      "isManagedIdentityInUse",
      "state",
      "storageEndpoint",
      "storageAccountAccessKey",
      "storageAccountSubscriptionId",
    ])
      ? undefined
      : _extendedServerBlobAuditingPolicyPropertiesSerializer(item),
  };
}

export function extendedServerBlobAuditingPolicyDeserializer(
  item: any,
): ExtendedServerBlobAuditingPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _extendedServerBlobAuditingPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of an extended server blob auditing policy. */
export interface ExtendedServerBlobAuditingPolicyProperties {
  /**
   * Specifies the state of devops audit. If state is Enabled, devops logs will be sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled', 'IsAzureMonitorTargetEnabled' as true and 'IsDevopsAuditEnabled' as true
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should also be created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isDevopsAuditEnabled?: boolean;
  /** Specifies condition of where clause when creating an audit. */
  predicateExpression?: string;
  /** Specifies the number of days to keep in the audit logs in the storage account. */
  retentionDays?: number;
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /** Specifies whether storageAccountAccessKey value is the storage's secondary key. */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /** Specifies whether Managed Identity is used to access blob storage */
  isManagedIdentityInUse?: boolean;
  /** Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required. */
  state: BlobAuditingPolicyState;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required. */
  storageEndpoint?: string;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /** Specifies the blob storage subscription Id. */
  storageAccountSubscriptionId?: string;
}

export function extendedServerBlobAuditingPolicyPropertiesSerializer(
  item: ExtendedServerBlobAuditingPolicyProperties,
): any {
  return {
    isDevopsAuditEnabled: item["isDevopsAuditEnabled"],
    predicateExpression: item["predicateExpression"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function extendedServerBlobAuditingPolicyPropertiesDeserializer(
  item: any,
): ExtendedServerBlobAuditingPolicyProperties {
  return {
    isDevopsAuditEnabled: item["isDevopsAuditEnabled"],
    predicateExpression: item["predicateExpression"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

/** The response of a ExtendedServerBlobAuditingPolicy list operation. */
export interface _ExtendedServerBlobAuditingPolicyListResult {
  /** The ExtendedServerBlobAuditingPolicy items on this page */
  value: ExtendedServerBlobAuditingPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _extendedServerBlobAuditingPolicyListResultDeserializer(
  item: any,
): _ExtendedServerBlobAuditingPolicyListResult {
  return {
    value: extendedServerBlobAuditingPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function extendedServerBlobAuditingPolicyArraySerializer(
  result: Array<ExtendedServerBlobAuditingPolicy>,
): any[] {
  return result.map((item) => {
    return extendedServerBlobAuditingPolicySerializer(item);
  });
}

export function extendedServerBlobAuditingPolicyArrayDeserializer(
  result: Array<ExtendedServerBlobAuditingPolicy>,
): any[] {
  return result.map((item) => {
    return extendedServerBlobAuditingPolicyDeserializer(item);
  });
}

/** Database, Server or Elastic Pool Advisor. */
export interface Advisor extends ProxyResource {
  /** Resource kind. */
  readonly kind?: string;
  /** Resource location. */
  readonly location?: string;
  /** Gets the status of availability of this advisor to customers. Possible values are 'GA', 'PublicPreview', 'LimitedPublicPreview' and 'PrivatePreview'. */
  readonly advisorStatus?: AdvisorStatus;
  /** Gets the auto-execute status (whether to let the system execute the recommendations) of this advisor. Possible values are 'Enabled' and 'Disabled' */
  autoExecuteStatus?: AutoExecuteStatus;
  /** Gets the resource from which current value of auto-execute status is inherited. Auto-execute status can be set on (and inherited from) different levels in the resource hierarchy. Possible values are 'Subscription', 'Server', 'ElasticPool', 'Database' and 'Default' (when status is not explicitly set on any level). */
  readonly autoExecuteStatusInheritedFrom?: AutoExecuteStatusInheritedFrom;
  /** Gets that status of recommendations for this advisor and reason for not having any recommendations. Possible values include, but are not limited to, 'Ok' (Recommendations available),LowActivity (not enough workload to analyze), 'DbSeemsTuned' (Database is doing well), etc. */
  readonly recommendationsStatus?: string;
  /** Gets the time when the current resource was analyzed for recommendations by this advisor. */
  readonly lastChecked?: Date;
  /** Gets the recommended actions for this advisor. */
  readonly recommendedActions?: RecommendedAction[];
}

export function advisorSerializer(item: Advisor): any {
  return {
    properties: areAllPropsUndefined(item, ["autoExecuteStatus"])
      ? undefined
      : _advisorPropertiesSerializer(item),
  };
}

export function advisorDeserializer(item: any): Advisor {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _advisorPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    location: item["location"],
  };
}

/** Properties for a Database, Server or Elastic Pool Advisor. */
export interface AdvisorProperties {
  /** Gets the status of availability of this advisor to customers. Possible values are 'GA', 'PublicPreview', 'LimitedPublicPreview' and 'PrivatePreview'. */
  readonly advisorStatus?: AdvisorStatus;
  /** Gets the auto-execute status (whether to let the system execute the recommendations) of this advisor. Possible values are 'Enabled' and 'Disabled' */
  autoExecuteStatus: AutoExecuteStatus;
  /** Gets the resource from which current value of auto-execute status is inherited. Auto-execute status can be set on (and inherited from) different levels in the resource hierarchy. Possible values are 'Subscription', 'Server', 'ElasticPool', 'Database' and 'Default' (when status is not explicitly set on any level). */
  readonly autoExecuteStatusInheritedFrom?: AutoExecuteStatusInheritedFrom;
  /** Gets that status of recommendations for this advisor and reason for not having any recommendations. Possible values include, but are not limited to, 'Ok' (Recommendations available),LowActivity (not enough workload to analyze), 'DbSeemsTuned' (Database is doing well), etc. */
  readonly recommendationsStatus?: string;
  /** Gets the time when the current resource was analyzed for recommendations by this advisor. */
  readonly lastChecked?: Date;
  /** Gets the recommended actions for this advisor. */
  readonly recommendedActions?: RecommendedAction[];
}

export function advisorPropertiesSerializer(item: AdvisorProperties): any {
  return { autoExecuteStatus: item["autoExecuteStatus"] };
}

export function advisorPropertiesDeserializer(item: any): AdvisorProperties {
  return {
    advisorStatus: item["advisorStatus"],
    autoExecuteStatus: item["autoExecuteStatus"],
    autoExecuteStatusInheritedFrom: item["autoExecuteStatusInheritedFrom"],
    recommendationsStatus: item["recommendationsStatus"],
    lastChecked: !item["lastChecked"] ? item["lastChecked"] : new Date(item["lastChecked"]),
    recommendedActions: !item["recommendedActions"]
      ? item["recommendedActions"]
      : recommendedActionArrayDeserializer(item["recommendedActions"]),
  };
}

/** Gets the status of availability of this advisor to customers. Possible values are 'GA', 'PublicPreview', 'LimitedPublicPreview' and 'PrivatePreview'. */
export type AdvisorStatus = "GA" | "PublicPreview" | "LimitedPublicPreview" | "PrivatePreview";
/** Gets the auto-execute status (whether to let the system execute the recommendations) of this advisor. Possible values are 'Enabled' and 'Disabled' */
export type AutoExecuteStatus = "Enabled" | "Disabled" | "Default";
/** Gets the resource from which current value of auto-execute status is inherited. Auto-execute status can be set on (and inherited from) different levels in the resource hierarchy. Possible values are 'Subscription', 'Server', 'ElasticPool', 'Database' and 'Default' (when status is not explicitly set on any level). */
export type AutoExecuteStatusInheritedFrom =
  | "Default"
  | "Subscription"
  | "Server"
  | "ElasticPool"
  | "Database";

export function recommendedActionArraySerializer(result: Array<RecommendedAction>): any[] {
  return result.map((item) => {
    return recommendedActionSerializer(item);
  });
}

export function recommendedActionArrayDeserializer(result: Array<RecommendedAction>): any[] {
  return result.map((item) => {
    return recommendedActionDeserializer(item);
  });
}

/** Database, Server or Elastic Pool Recommended Action. */
export interface RecommendedAction extends ProxyResource {
  /** Resource kind. */
  readonly kind?: string;
  /** Resource location. */
  readonly location?: string;
  /** Gets the reason for recommending this action. e.g., DuplicateIndex */
  readonly recommendationReason?: string;
  /** Gets the time since when this recommended action is valid. */
  readonly validSince?: Date;
  /** Gets time when this recommended action was last refreshed. */
  readonly lastRefresh?: Date;
  /** Gets the info of the current state the recommended action is in. */
  state?: RecommendedActionStateInfo;
  /** Gets if this recommended action is actionable by user */
  readonly isExecutableAction?: boolean;
  /** Gets if changes applied by this recommended action can be reverted by user */
  readonly isRevertableAction?: boolean;
  /** Gets if this recommended action was suggested some time ago but user chose to ignore this and system added a new recommended action again. */
  readonly isArchivedAction?: boolean;
  /** Gets the time when system started applying this recommended action on the user resource. e.g., index creation start time */
  readonly executeActionStartTime?: Date;
  /** Gets the time taken for applying this recommended action on user resource. e.g., time taken for index creation */
  readonly executeActionDuration?: string;
  /** Gets the time when system started reverting changes of this recommended action on user resource. e.g., time when index drop is executed. */
  readonly revertActionStartTime?: Date;
  /** Gets the time taken for reverting changes of this recommended action on user resource. e.g., time taken for dropping the created index. */
  readonly revertActionDuration?: string;
  /** Gets if approval for applying this recommended action was given by user/system. */
  readonly executeActionInitiatedBy?: RecommendedActionInitiatedBy;
  /** Gets the time when this recommended action was approved for execution. */
  readonly executeActionInitiatedTime?: Date;
  /** Gets if approval for reverting this recommended action was given by user/system. */
  readonly revertActionInitiatedBy?: RecommendedActionInitiatedBy;
  /** Gets the time when this recommended action was approved for revert. */
  readonly revertActionInitiatedTime?: Date;
  /** Gets the impact of this recommended action. Possible values are 1 - Low impact, 2 - Medium Impact and 3 - High Impact */
  readonly score?: number;
  /** Gets the implementation details of this recommended action for user to apply it manually. */
  readonly implementationDetails?: RecommendedActionImplementationInfo;
  /** Gets the error details if and why this recommended action is put to error state. */
  readonly errorDetails?: RecommendedActionErrorInfo;
  /** Gets the estimated impact info for this recommended action e.g., Estimated CPU gain, Estimated Disk Space change */
  readonly estimatedImpact?: RecommendedActionImpactRecord[];
  /** Gets the observed/actual impact info for this recommended action e.g., Actual CPU gain, Actual Disk Space change */
  readonly observedImpact?: RecommendedActionImpactRecord[];
  /** Gets the time series info of metrics for this recommended action e.g., CPU consumption time series */
  readonly timeSeries?: RecommendedActionMetricInfo[];
  /** Gets the linked objects, if any. */
  readonly linkedObjects?: string[];
  /** Gets additional details specific to this recommended action. */
  readonly details?: Record<string, string>;
}

export function recommendedActionSerializer(item: RecommendedAction): any {
  return {
    properties: areAllPropsUndefined(item, ["state"])
      ? undefined
      : _recommendedActionPropertiesSerializer(item),
  };
}

export function recommendedActionDeserializer(item: any): RecommendedAction {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _recommendedActionPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    location: item["location"],
  };
}

/** Properties for a Database, Server or Elastic Pool Recommended Action. */
export interface RecommendedActionProperties {
  /** Gets the reason for recommending this action. e.g., DuplicateIndex */
  readonly recommendationReason?: string;
  /** Gets the time since when this recommended action is valid. */
  readonly validSince?: Date;
  /** Gets time when this recommended action was last refreshed. */
  readonly lastRefresh?: Date;
  /** Gets the info of the current state the recommended action is in. */
  state: RecommendedActionStateInfo;
  /** Gets if this recommended action is actionable by user */
  readonly isExecutableAction?: boolean;
  /** Gets if changes applied by this recommended action can be reverted by user */
  readonly isRevertableAction?: boolean;
  /** Gets if this recommended action was suggested some time ago but user chose to ignore this and system added a new recommended action again. */
  readonly isArchivedAction?: boolean;
  /** Gets the time when system started applying this recommended action on the user resource. e.g., index creation start time */
  readonly executeActionStartTime?: Date;
  /** Gets the time taken for applying this recommended action on user resource. e.g., time taken for index creation */
  readonly executeActionDuration?: string;
  /** Gets the time when system started reverting changes of this recommended action on user resource. e.g., time when index drop is executed. */
  readonly revertActionStartTime?: Date;
  /** Gets the time taken for reverting changes of this recommended action on user resource. e.g., time taken for dropping the created index. */
  readonly revertActionDuration?: string;
  /** Gets if approval for applying this recommended action was given by user/system. */
  readonly executeActionInitiatedBy?: RecommendedActionInitiatedBy;
  /** Gets the time when this recommended action was approved for execution. */
  readonly executeActionInitiatedTime?: Date;
  /** Gets if approval for reverting this recommended action was given by user/system. */
  readonly revertActionInitiatedBy?: RecommendedActionInitiatedBy;
  /** Gets the time when this recommended action was approved for revert. */
  readonly revertActionInitiatedTime?: Date;
  /** Gets the impact of this recommended action. Possible values are 1 - Low impact, 2 - Medium Impact and 3 - High Impact */
  readonly score?: number;
  /** Gets the implementation details of this recommended action for user to apply it manually. */
  readonly implementationDetails?: RecommendedActionImplementationInfo;
  /** Gets the error details if and why this recommended action is put to error state. */
  readonly errorDetails?: RecommendedActionErrorInfo;
  /** Gets the estimated impact info for this recommended action e.g., Estimated CPU gain, Estimated Disk Space change */
  readonly estimatedImpact?: RecommendedActionImpactRecord[];
  /** Gets the observed/actual impact info for this recommended action e.g., Actual CPU gain, Actual Disk Space change */
  readonly observedImpact?: RecommendedActionImpactRecord[];
  /** Gets the time series info of metrics for this recommended action e.g., CPU consumption time series */
  readonly timeSeries?: RecommendedActionMetricInfo[];
  /** Gets the linked objects, if any. */
  readonly linkedObjects?: string[];
  /** Gets additional details specific to this recommended action. */
  readonly details?: Record<string, string>;
}

export function recommendedActionPropertiesSerializer(item: RecommendedActionProperties): any {
  return { state: recommendedActionStateInfoSerializer(item["state"]) };
}

export function recommendedActionPropertiesDeserializer(item: any): RecommendedActionProperties {
  return {
    recommendationReason: item["recommendationReason"],
    validSince: !item["validSince"] ? item["validSince"] : new Date(item["validSince"]),
    lastRefresh: !item["lastRefresh"] ? item["lastRefresh"] : new Date(item["lastRefresh"]),
    state: recommendedActionStateInfoDeserializer(item["state"]),
    isExecutableAction: item["isExecutableAction"],
    isRevertableAction: item["isRevertableAction"],
    isArchivedAction: item["isArchivedAction"],
    executeActionStartTime: !item["executeActionStartTime"]
      ? item["executeActionStartTime"]
      : new Date(item["executeActionStartTime"]),
    executeActionDuration: item["executeActionDuration"],
    revertActionStartTime: !item["revertActionStartTime"]
      ? item["revertActionStartTime"]
      : new Date(item["revertActionStartTime"]),
    revertActionDuration: item["revertActionDuration"],
    executeActionInitiatedBy: item["executeActionInitiatedBy"],
    executeActionInitiatedTime: !item["executeActionInitiatedTime"]
      ? item["executeActionInitiatedTime"]
      : new Date(item["executeActionInitiatedTime"]),
    revertActionInitiatedBy: item["revertActionInitiatedBy"],
    revertActionInitiatedTime: !item["revertActionInitiatedTime"]
      ? item["revertActionInitiatedTime"]
      : new Date(item["revertActionInitiatedTime"]),
    score: item["score"],
    implementationDetails: !item["implementationDetails"]
      ? item["implementationDetails"]
      : recommendedActionImplementationInfoDeserializer(item["implementationDetails"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : recommendedActionErrorInfoDeserializer(item["errorDetails"]),
    estimatedImpact: !item["estimatedImpact"]
      ? item["estimatedImpact"]
      : recommendedActionImpactRecordArrayDeserializer(item["estimatedImpact"]),
    observedImpact: !item["observedImpact"]
      ? item["observedImpact"]
      : recommendedActionImpactRecordArrayDeserializer(item["observedImpact"]),
    timeSeries: !item["timeSeries"]
      ? item["timeSeries"]
      : recommendedActionMetricInfoArrayDeserializer(item["timeSeries"]),
    linkedObjects: !item["linkedObjects"]
      ? item["linkedObjects"]
      : item["linkedObjects"].map((p: any) => {
          return p;
        }),
    details: !item["details"]
      ? item["details"]
      : Object.fromEntries(Object.entries(item["details"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Contains information of current state for an Azure SQL Database, Server or Elastic Pool Recommended Action. */
export interface RecommendedActionStateInfo {
  /** Current state the recommended action is in. Some commonly used states are: Active      -> recommended action is active and no action has been taken yet. Pending     -> recommended action is approved for and is awaiting execution. Executing   -> recommended action is being applied on the user database. Verifying   -> recommended action was applied and is being verified of its usefulness by the system. Success     -> recommended action was applied and improvement found during verification. Pending Revert  -> verification found little or no improvement so recommended action is queued for revert or user has manually reverted. Reverting   -> changes made while applying recommended action are being reverted on the user database. Reverted    -> successfully reverted the changes made by recommended action on user database. Ignored     -> user explicitly ignored/discarded the recommended action. */
  currentValue: RecommendedActionCurrentState;
  /** Gets who initiated the execution of this recommended action. Possible Value are: User    -> When user explicity notified system to apply the recommended action. System  -> When auto-execute status of this advisor was set to 'Enabled', in which case the system applied it. */
  readonly actionInitiatedBy?: RecommendedActionInitiatedBy;
  /** Gets the time when the state was last modified */
  readonly lastModified?: Date;
}

export function recommendedActionStateInfoSerializer(item: RecommendedActionStateInfo): any {
  return { currentValue: item["currentValue"] };
}

export function recommendedActionStateInfoDeserializer(item: any): RecommendedActionStateInfo {
  return {
    currentValue: item["currentValue"],
    actionInitiatedBy: item["actionInitiatedBy"],
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
  };
}

/** Current state the recommended action is in. Some commonly used states are: Active      -> recommended action is active and no action has been taken yet. Pending     -> recommended action is approved for and is awaiting execution. Executing   -> recommended action is being applied on the user database. Verifying   -> recommended action was applied and is being verified of its usefulness by the system. Success     -> recommended action was applied and improvement found during verification. Pending Revert  -> verification found little or no improvement so recommended action is queued for revert or user has manually reverted. Reverting   -> changes made while applying recommended action are being reverted on the user database. Reverted    -> successfully reverted the changes made by recommended action on user database. Ignored     -> user explicitly ignored/discarded the recommended action. */
export enum KnownRecommendedActionCurrentState {
  /** Active */
  Active = "Active",
  /** Pending */
  Pending = "Pending",
  /** Executing */
  Executing = "Executing",
  /** Verifying */
  Verifying = "Verifying",
  /** PendingRevert */
  PendingRevert = "PendingRevert",
  /** RevertCancelled */
  RevertCancelled = "RevertCancelled",
  /** Reverting */
  Reverting = "Reverting",
  /** Reverted */
  Reverted = "Reverted",
  /** Ignored */
  Ignored = "Ignored",
  /** Expired */
  Expired = "Expired",
  /** Monitoring */
  Monitoring = "Monitoring",
  /** Resolved */
  Resolved = "Resolved",
  /** Success */
  Success = "Success",
  /** Error */
  Error = "Error",
}

/**
 * Current state the recommended action is in. Some commonly used states are: Active      -> recommended action is active and no action has been taken yet. Pending     -> recommended action is approved for and is awaiting execution. Executing   -> recommended action is being applied on the user database. Verifying   -> recommended action was applied and is being verified of its usefulness by the system. Success     -> recommended action was applied and improvement found during verification. Pending Revert  -> verification found little or no improvement so recommended action is queued for revert or user has manually reverted. Reverting   -> changes made while applying recommended action are being reverted on the user database. Reverted    -> successfully reverted the changes made by recommended action on user database. Ignored     -> user explicitly ignored/discarded the recommended action. \
 * {@link KnownRecommendedActionCurrentState} can be used interchangeably with RecommendedActionCurrentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active \
 * **Pending**: Pending \
 * **Executing**: Executing \
 * **Verifying**: Verifying \
 * **PendingRevert**: PendingRevert \
 * **RevertCancelled**: RevertCancelled \
 * **Reverting**: Reverting \
 * **Reverted**: Reverted \
 * **Ignored**: Ignored \
 * **Expired**: Expired \
 * **Monitoring**: Monitoring \
 * **Resolved**: Resolved \
 * **Success**: Success \
 * **Error**: Error
 */
export type RecommendedActionCurrentState = string;
/** Gets if approval for applying this recommended action was given by user/system. */
export type RecommendedActionInitiatedBy = "User" | "System";

/** Contains information for manual implementation for an Azure SQL Database, Server or Elastic Pool Recommended Action. */
export interface RecommendedActionImplementationInfo {
  /** Gets the method in which this recommended action can be manually implemented. e.g., TSql, AzurePowerShell. */
  readonly method?: ImplementationMethod;
  /** Gets the manual implementation script. e.g., T-SQL script that could be executed on the database. */
  readonly script?: string;
}

export function recommendedActionImplementationInfoDeserializer(
  item: any,
): RecommendedActionImplementationInfo {
  return {
    method: item["method"],
    script: item["script"],
  };
}

/** Gets the method in which this recommended action can be manually implemented. e.g., TSql, AzurePowerShell. */
export type ImplementationMethod = "TSql" | "AzurePowerShell";

/** Contains error information for an Azure SQL Database, Server or Elastic Pool Recommended Action. */
export interface RecommendedActionErrorInfo {
  /** Gets the reason why the recommended action was put to error state. e.g., DatabaseHasQdsOff, IndexAlreadyExists */
  readonly errorCode?: string;
  /** Gets whether the error could be ignored and recommended action could be retried. Possible values are: Yes/No */
  readonly isRetryable?: IsRetryable;
}

export function recommendedActionErrorInfoDeserializer(item: any): RecommendedActionErrorInfo {
  return {
    errorCode: item["errorCode"],
    isRetryable: item["isRetryable"],
  };
}

/** Gets whether the error could be ignored and recommended action could be retried. Possible values are: Yes/No */
export type IsRetryable = "Yes" | "No";

export function recommendedActionImpactRecordArrayDeserializer(
  result: Array<RecommendedActionImpactRecord>,
): any[] {
  return result.map((item) => {
    return recommendedActionImpactRecordDeserializer(item);
  });
}

/** Contains information of estimated or observed impact on various metrics for an Azure SQL Database, Server or Elastic Pool Recommended Action. */
export interface RecommendedActionImpactRecord {
  /** Gets the name of the impact dimension. e.g., CPUChange, DiskSpaceChange, NumberOfQueriesAffected. */
  readonly dimensionName?: string;
  /** Gets the name of the impact dimension. e.g., CPUChange, DiskSpaceChange, NumberOfQueriesAffected. */
  readonly unit?: string;
  /** Gets the absolute value of this dimension if applicable. e.g., Number of Queries affected */
  readonly absoluteValue?: number;
  /** Gets the absolute change in the value of this dimension. e.g., Absolute Disk space change in Megabytes */
  readonly changeValueAbsolute?: number;
  /** Gets the relative change in the value of this dimension. e.g., Relative Disk space change in Percentage */
  readonly changeValueRelative?: number;
}

export function recommendedActionImpactRecordDeserializer(
  item: any,
): RecommendedActionImpactRecord {
  return {
    dimensionName: item["dimensionName"],
    unit: item["unit"],
    absoluteValue: item["absoluteValue"],
    changeValueAbsolute: item["changeValueAbsolute"],
    changeValueRelative: item["changeValueRelative"],
  };
}

export function recommendedActionMetricInfoArrayDeserializer(
  result: Array<RecommendedActionMetricInfo>,
): any[] {
  return result.map((item) => {
    return recommendedActionMetricInfoDeserializer(item);
  });
}

/** Contains time series of various impacted metrics for an Azure SQL Database, Server or Elastic Pool Recommended Action. */
export interface RecommendedActionMetricInfo {
  /** Gets the name of the metric. e.g., CPU, Number of Queries. */
  readonly metricName?: string;
  /** Gets the unit in which metric is measured. e.g., DTU, Frequency */
  readonly unit?: string;
  /** Gets the duration of time interval for the value given by this MetricInfo. e.g., PT1H (1 hour) */
  readonly timeGrain?: string;
  /** Gets the start time of time interval given by this MetricInfo. */
  readonly startTime?: Date;
  /** Gets the value of the metric in the time interval given by this MetricInfo. */
  readonly value?: number;
}

export function recommendedActionMetricInfoDeserializer(item: any): RecommendedActionMetricInfo {
  return {
    metricName: item["metricName"],
    unit: item["unit"],
    timeGrain: item["timeGrain"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    value: item["value"],
  };
}

/** A database table resource. */
export interface DatabaseTable extends ProxyResource {
  /** The table temporal type. */
  temporalType?: TableTemporalType;
  /** Whether or not the table is memory optimized. */
  memoryOptimized?: boolean;
}

export function databaseTableDeserializer(item: any): DatabaseTable {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseTablePropertiesDeserializer(item["properties"])),
  };
}

/** Database table properties. */
export interface DatabaseTableProperties {
  /** The table temporal type. */
  temporalType?: TableTemporalType;
  /** Whether or not the table is memory optimized. */
  memoryOptimized?: boolean;
}

export function databaseTablePropertiesDeserializer(item: any): DatabaseTableProperties {
  return {
    temporalType: item["temporalType"],
    memoryOptimized: item["memoryOptimized"],
  };
}

/** The response of a DatabaseTable list operation. */
export interface _DatabaseTableListResult {
  /** The DatabaseTable items on this page */
  value: DatabaseTable[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseTableListResultDeserializer(item: any): _DatabaseTableListResult {
  return {
    value: databaseTableArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseTableArrayDeserializer(result: Array<DatabaseTable>): any[] {
  return result.map((item) => {
    return databaseTableDeserializer(item);
  });
}

/** A database schema resource. */
export interface DatabaseSchema extends ProxyResource {}

export function databaseSchemaDeserializer(item: any): DatabaseSchema {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
  };
}

/** The response of a DatabaseSchema list operation. */
export interface _DatabaseSchemaListResult {
  /** The DatabaseSchema items on this page */
  value: DatabaseSchema[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseSchemaListResultDeserializer(item: any): _DatabaseSchemaListResult {
  return {
    value: databaseSchemaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseSchemaArrayDeserializer(result: Array<DatabaseSchema>): any[] {
  return result.map((item) => {
    return databaseSchemaDeserializer(item);
  });
}

/** A database security alert policy. */
export interface DatabaseSecurityAlertPolicy extends ProxyResource {
  /** Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database. */
  state?: SecurityAlertsPolicyState;
  /** Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force */
  disabledAlerts?: string[];
  /** Specifies an array of e-mail addresses to which the alert is sent. */
  emailAddresses?: string[];
  /** Specifies that the alert is sent to the account administrators. */
  emailAccountAdmins?: boolean;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs. */
  storageEndpoint?: string;
  /** Specifies the identifier key of the Threat Detection audit storage account. */
  storageAccountAccessKey?: string;
  /** Specifies the number of days to keep in the Threat Detection audit logs. */
  retentionDays?: number;
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
}

export function databaseSecurityAlertPolicySerializer(item: DatabaseSecurityAlertPolicy): any {
  return {
    properties: areAllPropsUndefined(item, [
      "state",
      "disabledAlerts",
      "emailAddresses",
      "emailAccountAdmins",
      "storageEndpoint",
      "storageAccountAccessKey",
      "retentionDays",
    ])
      ? undefined
      : _databaseSecurityAlertPolicyPropertiesSerializer(item),
  };
}

export function databaseSecurityAlertPolicyDeserializer(item: any): DatabaseSecurityAlertPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseSecurityAlertPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a security alert policy. */
export interface SecurityAlertsPolicyProperties {
  /** Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database. */
  state: SecurityAlertsPolicyState;
  /** Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force */
  disabledAlerts?: string[];
  /** Specifies an array of e-mail addresses to which the alert is sent. */
  emailAddresses?: string[];
  /** Specifies that the alert is sent to the account administrators. */
  emailAccountAdmins?: boolean;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs. */
  storageEndpoint?: string;
  /** Specifies the identifier key of the Threat Detection audit storage account. */
  storageAccountAccessKey?: string;
  /** Specifies the number of days to keep in the Threat Detection audit logs. */
  retentionDays?: number;
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
}

export function securityAlertsPolicyPropertiesSerializer(
  item: SecurityAlertsPolicyProperties,
): any {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
  };
}

export function securityAlertsPolicyPropertiesDeserializer(
  item: any,
): SecurityAlertsPolicyProperties {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

/** Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database. */
export type SecurityAlertsPolicyState = "Enabled" | "Disabled";

/** Known values of {@link SecurityAlertPolicyName} that the service accepts. */
export enum KnownSecurityAlertPolicyName {
  /** Default */
  Default = "Default",
}

/** Type of SecurityAlertPolicyName */
export type SecurityAlertPolicyName = string;

/** A list of the database's security alert policies. */
export interface _DatabaseSecurityAlertListResult {
  /** Array of results. */
  readonly value?: DatabaseSecurityAlertPolicy[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _databaseSecurityAlertListResultDeserializer(
  item: any,
): _DatabaseSecurityAlertListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : databaseSecurityAlertPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseSecurityAlertPolicyArraySerializer(
  result: Array<DatabaseSecurityAlertPolicy>,
): any[] {
  return result.map((item) => {
    return databaseSecurityAlertPolicySerializer(item);
  });
}

export function databaseSecurityAlertPolicyArrayDeserializer(
  result: Array<DatabaseSecurityAlertPolicy>,
): any[] {
  return result.map((item) => {
    return databaseSecurityAlertPolicyDeserializer(item);
  });
}

/** A database sql vulnerability assessment baseline set. */
export interface DatabaseSqlVulnerabilityAssessmentBaselineSet extends ProxyResource {
  /** The baseline set result */
  results?: Record<string, string[][]>;
}

export function databaseSqlVulnerabilityAssessmentBaselineSetDeserializer(
  item: any,
): DatabaseSqlVulnerabilityAssessmentBaselineSet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseSqlVulnerabilityAssessmentBaselineSetPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a database Sql Vulnerability Assessment baseline set. */
export interface DatabaseSqlVulnerabilityAssessmentBaselineSetProperties {
  /** The baseline set result */
  results: Record<string, string[][]>;
}

export function databaseSqlVulnerabilityAssessmentBaselineSetPropertiesDeserializer(
  item: any,
): DatabaseSqlVulnerabilityAssessmentBaselineSetProperties {
  return {
    results: Object.fromEntries(
      Object.entries(item["results"]).map(([k, p]: [string, any]) => [
        k,
        p.map((p1: any) => {
          return p1.map((p2: any) => {
            return p2;
          });
        }),
      ]),
    ),
  };
}

/** Known values of {@link BaselineName} that the service accepts. */
export enum KnownBaselineName {
  /** default */
  Default = "default",
}

/** Type of BaselineName */
export type BaselineName = string;

/** The response of a DatabaseSqlVulnerabilityAssessmentBaselineSet list operation. */
export interface _DatabaseSqlVulnerabilityAssessmentBaselineSetListResult {
  /** The DatabaseSqlVulnerabilityAssessmentBaselineSet items on this page */
  value: DatabaseSqlVulnerabilityAssessmentBaselineSet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseSqlVulnerabilityAssessmentBaselineSetListResultDeserializer(
  item: any,
): _DatabaseSqlVulnerabilityAssessmentBaselineSetListResult {
  return {
    value: databaseSqlVulnerabilityAssessmentBaselineSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseSqlVulnerabilityAssessmentBaselineSetArrayDeserializer(
  result: Array<DatabaseSqlVulnerabilityAssessmentBaselineSet>,
): any[] {
  return result.map((item) => {
    return databaseSqlVulnerabilityAssessmentBaselineSetDeserializer(item);
  });
}

/** A SQL Vulnerability Assessment. */
export interface SqlVulnerabilityAssessment extends ProxyResource {
  /** Specifies the state of the SQL Vulnerability Assessment, whether it is enabled or disabled or a state has not been applied yet on the specific database or server. */
  state?: SqlVulnerabilityAssessmentState;
}

export function sqlVulnerabilityAssessmentSerializer(item: SqlVulnerabilityAssessment): any {
  return {
    properties: areAllPropsUndefined(item, ["state"])
      ? undefined
      : _sqlVulnerabilityAssessmentPropertiesSerializer(item),
  };
}

export function sqlVulnerabilityAssessmentDeserializer(item: any): SqlVulnerabilityAssessment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlVulnerabilityAssessmentPropertiesDeserializer(item["properties"])),
  };
}

/** model interface SqlVulnerabilityAssessmentPolicyProperties */
export interface SqlVulnerabilityAssessmentPolicyProperties {
  /** Specifies the state of the SQL Vulnerability Assessment, whether it is enabled or disabled or a state has not been applied yet on the specific database or server. */
  state?: SqlVulnerabilityAssessmentState;
}

export function sqlVulnerabilityAssessmentPolicyPropertiesSerializer(
  item: SqlVulnerabilityAssessmentPolicyProperties,
): any {
  return { state: item["state"] };
}

export function sqlVulnerabilityAssessmentPolicyPropertiesDeserializer(
  item: any,
): SqlVulnerabilityAssessmentPolicyProperties {
  return {
    state: item["state"],
  };
}

/** Specifies the state of the SQL Vulnerability Assessment, whether it is enabled or disabled or a state has not been applied yet on the specific database or server. */
export type SqlVulnerabilityAssessmentState = "Enabled" | "Disabled";

/** Known values of {@link SqlVulnerabilityAssessmentName} that the service accepts. */
export enum KnownSqlVulnerabilityAssessmentName {
  /** default */
  Default = "default",
}

/** Type of SqlVulnerabilityAssessmentName */
export type SqlVulnerabilityAssessmentName = string;

/** The response of a SqlVulnerabilityAssessment list operation. */
export interface _SqlVulnerabilityAssessmentListResult {
  /** The SqlVulnerabilityAssessment items on this page */
  value: SqlVulnerabilityAssessment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sqlVulnerabilityAssessmentListResultDeserializer(
  item: any,
): _SqlVulnerabilityAssessmentListResult {
  return {
    value: sqlVulnerabilityAssessmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlVulnerabilityAssessmentArraySerializer(
  result: Array<SqlVulnerabilityAssessment>,
): any[] {
  return result.map((item) => {
    return sqlVulnerabilityAssessmentSerializer(item);
  });
}

export function sqlVulnerabilityAssessmentArrayDeserializer(
  result: Array<SqlVulnerabilityAssessment>,
): any[] {
  return result.map((item) => {
    return sqlVulnerabilityAssessmentDeserializer(item);
  });
}

/** A database sql vulnerability assessment rule baseline. */
export interface DatabaseSqlVulnerabilityAssessmentRuleBaseline extends ProxyResource {
  /** The rule baseline result */
  results?: string[][];
}

export function databaseSqlVulnerabilityAssessmentRuleBaselineDeserializer(
  item: any,
): DatabaseSqlVulnerabilityAssessmentRuleBaseline {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseSqlVulnerabilityAssessmentRuleBaselinePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a database Sql Vulnerability Assessment rule baseline. */
export interface DatabaseSqlVulnerabilityAssessmentRuleBaselineProperties {
  /** The rule baseline result */
  results: string[][];
}

export function databaseSqlVulnerabilityAssessmentRuleBaselinePropertiesDeserializer(
  item: any,
): DatabaseSqlVulnerabilityAssessmentRuleBaselineProperties {
  return {
    results: item["results"].map((p: any) => {
      return p.map((p1: any) => {
        return p1;
      });
    }),
  };
}

/** A database sql vulnerability assessment rule baseline input. */
export interface DatabaseSqlVulnerabilityAssessmentRuleBaselineInput extends ProxyResourceAutoGenerated {
  /** SystemData of DatabaseSqlVulnerabilityAssessmentRuleBaselineInputResource. */
  readonly systemData?: Systemdata;
  /** The latest scan flag */
  latestScan?: boolean;
  /** The rule baseline result */
  results?: string[][];
}

export function databaseSqlVulnerabilityAssessmentRuleBaselineInputSerializer(
  item: DatabaseSqlVulnerabilityAssessmentRuleBaselineInput,
): any {
  return {
    properties: areAllPropsUndefined(item, ["latestScan", "results"])
      ? undefined
      : _databaseSqlVulnerabilityAssessmentRuleBaselineInputPropertiesSerializer(item),
  };
}

/** Properties of a database Sql Vulnerability Assessment rule baseline. */
export interface DatabaseSqlVulnerabilityAssessmentRuleBaselineInputProperties {
  /** The latest scan flag */
  latestScan: boolean;
  /** The rule baseline result */
  results: string[][];
}

export function databaseSqlVulnerabilityAssessmentRuleBaselineInputPropertiesSerializer(
  item: DatabaseSqlVulnerabilityAssessmentRuleBaselineInputProperties,
): any {
  return {
    latestScan: item["latestScan"],
    results: item["results"].map((p: any) => {
      return p.map((p: any) => {
        return p;
      });
    }),
  };
}

/** The response of a DatabaseSqlVulnerabilityAssessmentRuleBaseline list operation. */
export interface _DatabaseSqlVulnerabilityAssessmentRuleBaselineListResult {
  /** The DatabaseSqlVulnerabilityAssessmentRuleBaseline items on this page */
  value: DatabaseSqlVulnerabilityAssessmentRuleBaseline[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseSqlVulnerabilityAssessmentRuleBaselineListResultDeserializer(
  item: any,
): _DatabaseSqlVulnerabilityAssessmentRuleBaselineListResult {
  return {
    value: databaseSqlVulnerabilityAssessmentRuleBaselineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseSqlVulnerabilityAssessmentRuleBaselineArrayDeserializer(
  result: Array<DatabaseSqlVulnerabilityAssessmentRuleBaseline>,
): any[] {
  return result.map((item) => {
    return databaseSqlVulnerabilityAssessmentRuleBaselineDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface SqlVulnerabilityAssessmentScanResults extends ProxyResource {
  /** SQL Vulnerability Assessment rule Id. */
  readonly ruleId?: string;
  /** SQL Vulnerability Assessment rule result status. */
  readonly status?: RuleStatus;
  /** SQL Vulnerability Assessment error message. */
  readonly errorMessage?: string;
  /** SQL Vulnerability Assessment is the query results trimmed. */
  readonly isTrimmed?: boolean;
  /** SQL Vulnerability Assessment query results that was run. */
  readonly queryResults?: string[][];
  /** SQL Vulnerability Assessment the remediation details. */
  readonly remediation?: Remediation;
  /** SQL Vulnerability Assessment rule result adjusted with baseline. */
  readonly baselineAdjustedResult?: BaselineAdjustedResult;
  /** SQL Vulnerability Assessment rule metadata. */
  readonly ruleMetadata?: VaRule;
}

export function sqlVulnerabilityAssessmentScanResultsDeserializer(
  item: any,
): SqlVulnerabilityAssessmentScanResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlVulnerabilityAssessmentScanResultsPropertiesDeserializer(item["properties"])),
  };
}

/** SQL Vulnerability Assessment scan result properties for a single rule. */
export interface SqlVulnerabilityAssessmentScanResultProperties {
  /** SQL Vulnerability Assessment rule Id. */
  readonly ruleId?: string;
  /** SQL Vulnerability Assessment rule result status. */
  readonly status?: RuleStatus;
  /** SQL Vulnerability Assessment error message. */
  readonly errorMessage?: string;
  /** SQL Vulnerability Assessment is the query results trimmed. */
  readonly isTrimmed?: boolean;
  /** SQL Vulnerability Assessment query results that was run. */
  readonly queryResults?: string[][];
  /** SQL Vulnerability Assessment the remediation details. */
  readonly remediation?: Remediation;
  /** SQL Vulnerability Assessment rule result adjusted with baseline. */
  readonly baselineAdjustedResult?: BaselineAdjustedResult;
  /** SQL Vulnerability Assessment rule metadata. */
  readonly ruleMetadata?: VaRule;
}

export function sqlVulnerabilityAssessmentScanResultPropertiesDeserializer(
  item: any,
): SqlVulnerabilityAssessmentScanResultProperties {
  return {
    ruleId: item["ruleId"],
    status: item["status"],
    errorMessage: item["errorMessage"],
    isTrimmed: item["isTrimmed"],
    queryResults: !item["queryResults"]
      ? item["queryResults"]
      : item["queryResults"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    remediation: !item["remediation"]
      ? item["remediation"]
      : remediationDeserializer(item["remediation"]),
    baselineAdjustedResult: !item["baselineAdjustedResult"]
      ? item["baselineAdjustedResult"]
      : baselineAdjustedResultDeserializer(item["baselineAdjustedResult"]),
    ruleMetadata: !item["ruleMetadata"]
      ? item["ruleMetadata"]
      : vaRuleDeserializer(item["ruleMetadata"]),
  };
}

/** SQL Vulnerability Assessment baseline status */
export enum KnownRuleStatus {
  /** NonFinding */
  NonFinding = "NonFinding",
  /** Finding */
  Finding = "Finding",
  /** InternalError */
  InternalError = "InternalError",
}

/**
 * SQL Vulnerability Assessment baseline status \
 * {@link KnownRuleStatus} can be used interchangeably with RuleStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NonFinding**: NonFinding \
 * **Finding**: Finding \
 * **InternalError**: InternalError
 */
export type RuleStatus = string;

/** SQL Vulnerability Assessment remediation Details. */
export interface Remediation {
  /** SQL Vulnerability Assessment remediation description. */
  readonly description?: string;
  /** SQL Vulnerability Assessment remediation script. */
  readonly scripts?: string[];
  /** SQL Vulnerability Assessment is remediation automated. */
  readonly automated?: boolean;
  /** SQL Vulnerability Assessment optional link to remediate in Azure Portal. */
  readonly portalLink?: string;
}

export function remediationDeserializer(item: any): Remediation {
  return {
    description: item["description"],
    scripts: !item["scripts"]
      ? item["scripts"]
      : item["scripts"].map((p: any) => {
          return p;
        }),
    automated: item["automated"],
    portalLink: item["portalLink"],
  };
}

/** SQL Vulnerability Assessment baseline adjusted results */
export interface BaselineAdjustedResult {
  /** SQL Vulnerability Assessment baseline details */
  readonly baseline?: Baseline;
  /** SQL Vulnerability Assessment baseline status */
  readonly status?: RuleStatus;
  /** SQL Vulnerability Assessment results that are not in baseline */
  readonly resultsNotInBaseline?: string[][];
  /** SQL Vulnerability Assessment results that are in baseline. */
  readonly resultsOnlyInBaseline?: string[][];
}

export function baselineAdjustedResultDeserializer(item: any): BaselineAdjustedResult {
  return {
    baseline: !item["baseline"] ? item["baseline"] : baselineDeserializer(item["baseline"]),
    status: item["status"],
    resultsNotInBaseline: !item["resultsNotInBaseline"]
      ? item["resultsNotInBaseline"]
      : item["resultsNotInBaseline"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    resultsOnlyInBaseline: !item["resultsOnlyInBaseline"]
      ? item["resultsOnlyInBaseline"]
      : item["resultsOnlyInBaseline"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

/** SQL Vulnerability Assessment baseline Details */
export interface Baseline {
  /** SQL Vulnerability Assessment baseline expected results */
  readonly expectedResults?: string[][];
  /** SQL Vulnerability Assessment baseline update time (UTC) */
  readonly updatedTime?: Date;
}

export function baselineDeserializer(item: any): Baseline {
  return {
    expectedResults: !item["expectedResults"]
      ? item["expectedResults"]
      : item["expectedResults"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    updatedTime: !item["updatedTime"] ? item["updatedTime"] : new Date(item["updatedTime"]),
  };
}

/** SQL Vulnerability Assessment rule metadata details. */
export interface VaRule {
  /** SQL Vulnerability Assessment rule Id. */
  readonly ruleId?: string;
  /** SQL Vulnerability Assessment rule severity. */
  readonly severity?: RuleSeverity;
  /** SQL Vulnerability Assessment rule category. */
  readonly category?: string;
  /** SQL Vulnerability Assessment rule type. */
  readonly ruleType?: RuleType;
  /** SQL Vulnerability Assessment rule title. */
  readonly title?: string;
  /** SQL Vulnerability Assessment rule description. */
  readonly description?: string;
  /** SQL Vulnerability Assessment rule rationale. */
  readonly rationale?: string;
  /** SQL Vulnerability Assessment rule query details. */
  readonly queryCheck?: QueryCheck;
  /** SQL Vulnerability Assessment benchmark references. */
  readonly benchmarkReferences?: BenchmarkReference[];
}

export function vaRuleDeserializer(item: any): VaRule {
  return {
    ruleId: item["ruleId"],
    severity: item["severity"],
    category: item["category"],
    ruleType: item["ruleType"],
    title: item["title"],
    description: item["description"],
    rationale: item["rationale"],
    queryCheck: !item["queryCheck"]
      ? item["queryCheck"]
      : queryCheckDeserializer(item["queryCheck"]),
    benchmarkReferences: !item["benchmarkReferences"]
      ? item["benchmarkReferences"]
      : benchmarkReferenceArrayDeserializer(item["benchmarkReferences"]),
  };
}

/** SQL Vulnerability Assessment rule severity. */
export enum KnownRuleSeverity {
  /** High */
  High = "High",
  /** Medium */
  Medium = "Medium",
  /** Low */
  Low = "Low",
  /** Informational */
  Informational = "Informational",
  /** Obsolete */
  Obsolete = "Obsolete",
}

/**
 * SQL Vulnerability Assessment rule severity. \
 * {@link KnownRuleSeverity} can be used interchangeably with RuleSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High**: High \
 * **Medium**: Medium \
 * **Low**: Low \
 * **Informational**: Informational \
 * **Obsolete**: Obsolete
 */
export type RuleSeverity = string;

/** SQL Vulnerability Assessment rule type. */
export enum KnownRuleType {
  /** Binary */
  Binary = "Binary",
  /** BaselineExpected */
  BaselineExpected = "BaselineExpected",
  /** PositiveList */
  PositiveList = "PositiveList",
  /** NegativeList */
  NegativeList = "NegativeList",
}

/**
 * SQL Vulnerability Assessment rule type. \
 * {@link KnownRuleType} can be used interchangeably with RuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Binary**: Binary \
 * **BaselineExpected**: BaselineExpected \
 * **PositiveList**: PositiveList \
 * **NegativeList**: NegativeList
 */
export type RuleType = string;

/** SQL Vulnerability Assessment query check object. */
export interface QueryCheck {
  /** SQL Vulnerability Assessment rule query. */
  readonly query?: string;
  /** SQL Vulnerability Assessment query expected result. */
  readonly expectedResult?: string[][];
  /** SQL Vulnerability Assessment column names of query expected result. */
  readonly columnNames?: string[];
}

export function queryCheckDeserializer(item: any): QueryCheck {
  return {
    query: item["query"],
    expectedResult: !item["expectedResult"]
      ? item["expectedResult"]
      : item["expectedResult"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    columnNames: !item["columnNames"]
      ? item["columnNames"]
      : item["columnNames"].map((p: any) => {
          return p;
        }),
  };
}

export function benchmarkReferenceArrayDeserializer(result: Array<BenchmarkReference>): any[] {
  return result.map((item) => {
    return benchmarkReferenceDeserializer(item);
  });
}

/** SQL Vulnerability Assessment benchmark reference */
export interface BenchmarkReference {
  /** SQL Vulnerability Assessment benchmark name */
  readonly benchmark?: string;
  /** SQL Vulnerability Assessment benchmark reference. */
  readonly reference?: string;
}

export function benchmarkReferenceDeserializer(item: any): BenchmarkReference {
  return {
    benchmark: item["benchmark"],
    reference: item["reference"],
  };
}

/** A list of vulnerability assessment scan results. */
export interface _SQLVulnerabilityAssessmentScanListResult {
  /** Array of results. */
  readonly value?: SqlVulnerabilityAssessmentScanResults[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _sqlVulnerabilityAssessmentScanListResultDeserializer(
  item: any,
): _SQLVulnerabilityAssessmentScanListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : sqlVulnerabilityAssessmentScanResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlVulnerabilityAssessmentScanResultsArrayDeserializer(
  result: Array<SqlVulnerabilityAssessmentScanResults>,
): any[] {
  return result.map((item) => {
    return sqlVulnerabilityAssessmentScanResultsDeserializer(item);
  });
}

/** A vulnerability assessment scan record. */
export interface SqlVulnerabilityAssessmentScanRecord extends ProxyResource {
  /** The scan ID. */
  readonly scanId?: string;
  /** The scan trigger type. */
  readonly triggerType?: VulnerabilityAssessmentScanTriggerType;
  /** The scan status. */
  readonly state?: VulnerabilityAssessmentScanState;
  /** The scan start time (UTC). */
  readonly startTime?: Date;
  /** The scan end time (UTC). */
  readonly endTime?: Date;
  /** The scan errors. */
  readonly errors?: SqlVulnerabilityAssessmentScanError[];
  /** The server name. */
  readonly server?: string;
  /** The database name. */
  readonly database?: string;
  /** The SQL version. */
  readonly sqlVersion?: string;
  /** The number of failed rules with high severity. */
  readonly highSeverityFailedRulesCount?: number;
  /** The number of failed rules with medium severity. */
  readonly mediumSeverityFailedRulesCount?: number;
  /** The number of failed rules with low severity. */
  readonly lowSeverityFailedRulesCount?: number;
  /** The number of total passed rules. */
  readonly totalPassedRulesCount?: number;
  /** The number of total failed rules. */
  readonly totalFailedRulesCount?: number;
  /** The number of total rules assessed. */
  readonly totalRulesCount?: number;
  /** Baseline created for this database, and has one or more rules. */
  readonly isBaselineApplied?: boolean;
  /** The last scan time. */
  readonly lastScanTime?: Date;
}

export function sqlVulnerabilityAssessmentScanRecordDeserializer(
  item: any,
): SqlVulnerabilityAssessmentScanRecord {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlVulnerabilityAssessmentScanRecordPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a vulnerability assessment scan record. */
export interface SqlVulnerabilityAssessmentScanRecordProperties {
  /** The scan ID. */
  readonly scanId?: string;
  /** The scan trigger type. */
  readonly triggerType?: VulnerabilityAssessmentScanTriggerType;
  /** The scan status. */
  readonly state?: VulnerabilityAssessmentScanState;
  /** The scan start time (UTC). */
  readonly startTime?: Date;
  /** The scan end time (UTC). */
  readonly endTime?: Date;
  /** The scan errors. */
  readonly errors?: SqlVulnerabilityAssessmentScanError[];
  /** The server name. */
  readonly server?: string;
  /** The database name. */
  readonly database?: string;
  /** The SQL version. */
  readonly sqlVersion?: string;
  /** The number of failed rules with high severity. */
  readonly highSeverityFailedRulesCount?: number;
  /** The number of failed rules with medium severity. */
  readonly mediumSeverityFailedRulesCount?: number;
  /** The number of failed rules with low severity. */
  readonly lowSeverityFailedRulesCount?: number;
  /** The number of total passed rules. */
  readonly totalPassedRulesCount?: number;
  /** The number of total failed rules. */
  readonly totalFailedRulesCount?: number;
  /** The number of total rules assessed. */
  readonly totalRulesCount?: number;
  /** Baseline created for this database, and has one or more rules. */
  readonly isBaselineApplied?: boolean;
  /** The last scan time. */
  readonly lastScanTime?: Date;
}

export function sqlVulnerabilityAssessmentScanRecordPropertiesDeserializer(
  item: any,
): SqlVulnerabilityAssessmentScanRecordProperties {
  return {
    scanId: item["scanId"],
    triggerType: item["triggerType"],
    state: item["state"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    errors: !item["errors"]
      ? item["errors"]
      : sqlVulnerabilityAssessmentScanErrorArrayDeserializer(item["errors"]),
    server: item["server"],
    database: item["database"],
    sqlVersion: item["sqlVersion"],
    highSeverityFailedRulesCount: item["highSeverityFailedRulesCount"],
    mediumSeverityFailedRulesCount: item["mediumSeverityFailedRulesCount"],
    lowSeverityFailedRulesCount: item["lowSeverityFailedRulesCount"],
    totalPassedRulesCount: item["totalPassedRulesCount"],
    totalFailedRulesCount: item["totalFailedRulesCount"],
    totalRulesCount: item["totalRulesCount"],
    isBaselineApplied: item["isBaselineApplied"],
    lastScanTime: !item["lastScanTime"] ? item["lastScanTime"] : new Date(item["lastScanTime"]),
  };
}

/** The scan trigger type. */
export enum KnownVulnerabilityAssessmentScanTriggerType {
  /** OnDemand */
  OnDemand = "OnDemand",
  /** Recurring */
  Recurring = "Recurring",
}

/**
 * The scan trigger type. \
 * {@link KnownVulnerabilityAssessmentScanTriggerType} can be used interchangeably with VulnerabilityAssessmentScanTriggerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OnDemand**: OnDemand \
 * **Recurring**: Recurring
 */
export type VulnerabilityAssessmentScanTriggerType = string;

/** The scan status. */
export enum KnownVulnerabilityAssessmentScanState {
  /** Passed */
  Passed = "Passed",
  /** Failed */
  Failed = "Failed",
  /** FailedToRun */
  FailedToRun = "FailedToRun",
  /** InProgress */
  InProgress = "InProgress",
}

/**
 * The scan status. \
 * {@link KnownVulnerabilityAssessmentScanState} can be used interchangeably with VulnerabilityAssessmentScanState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Passed**: Passed \
 * **Failed**: Failed \
 * **FailedToRun**: FailedToRun \
 * **InProgress**: InProgress
 */
export type VulnerabilityAssessmentScanState = string;

export function sqlVulnerabilityAssessmentScanErrorArrayDeserializer(
  result: Array<SqlVulnerabilityAssessmentScanError>,
): any[] {
  return result.map((item) => {
    return sqlVulnerabilityAssessmentScanErrorDeserializer(item);
  });
}

/** Properties of a vulnerability assessment scan error. */
export interface SqlVulnerabilityAssessmentScanError {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
}

export function sqlVulnerabilityAssessmentScanErrorDeserializer(
  item: any,
): SqlVulnerabilityAssessmentScanError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The response of a SqlVulnerabilityAssessmentScanRecord list operation. */
export interface _SqlVulnerabilityAssessmentScanRecordListResult {
  /** The SqlVulnerabilityAssessmentScanRecord items on this page */
  value: SqlVulnerabilityAssessmentScanRecord[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sqlVulnerabilityAssessmentScanRecordListResultDeserializer(
  item: any,
): _SqlVulnerabilityAssessmentScanRecordListResult {
  return {
    value: sqlVulnerabilityAssessmentScanRecordArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlVulnerabilityAssessmentScanRecordArrayDeserializer(
  result: Array<SqlVulnerabilityAssessmentScanRecord>,
): any[] {
  return result.map((item) => {
    return sqlVulnerabilityAssessmentScanRecordDeserializer(item);
  });
}

/** A database vulnerability assessment rule baseline. */
export interface DatabaseVulnerabilityAssessmentRuleBaseline extends ProxyResource {
  /** The rule baseline result */
  baselineResults?: DatabaseVulnerabilityAssessmentRuleBaselineItem[];
}

export function databaseVulnerabilityAssessmentRuleBaselineSerializer(
  item: DatabaseVulnerabilityAssessmentRuleBaseline,
): any {
  return {
    properties: areAllPropsUndefined(item, ["baselineResults"])
      ? undefined
      : _databaseVulnerabilityAssessmentRuleBaselinePropertiesSerializer(item),
  };
}

export function databaseVulnerabilityAssessmentRuleBaselineDeserializer(
  item: any,
): DatabaseVulnerabilityAssessmentRuleBaseline {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseVulnerabilityAssessmentRuleBaselinePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a database Vulnerability Assessment rule baseline. */
export interface DatabaseVulnerabilityAssessmentRuleBaselineProperties {
  /** The rule baseline result */
  baselineResults: DatabaseVulnerabilityAssessmentRuleBaselineItem[];
}

export function databaseVulnerabilityAssessmentRuleBaselinePropertiesSerializer(
  item: DatabaseVulnerabilityAssessmentRuleBaselineProperties,
): any {
  return {
    baselineResults: databaseVulnerabilityAssessmentRuleBaselineItemArraySerializer(
      item["baselineResults"],
    ),
  };
}

export function databaseVulnerabilityAssessmentRuleBaselinePropertiesDeserializer(
  item: any,
): DatabaseVulnerabilityAssessmentRuleBaselineProperties {
  return {
    baselineResults: databaseVulnerabilityAssessmentRuleBaselineItemArrayDeserializer(
      item["baselineResults"],
    ),
  };
}

export function databaseVulnerabilityAssessmentRuleBaselineItemArraySerializer(
  result: Array<DatabaseVulnerabilityAssessmentRuleBaselineItem>,
): any[] {
  return result.map((item) => {
    return databaseVulnerabilityAssessmentRuleBaselineItemSerializer(item);
  });
}

export function databaseVulnerabilityAssessmentRuleBaselineItemArrayDeserializer(
  result: Array<DatabaseVulnerabilityAssessmentRuleBaselineItem>,
): any[] {
  return result.map((item) => {
    return databaseVulnerabilityAssessmentRuleBaselineItemDeserializer(item);
  });
}

/** Properties for an Azure SQL Database Vulnerability Assessment rule baseline's result. */
export interface DatabaseVulnerabilityAssessmentRuleBaselineItem {
  /** The rule baseline result */
  result: string[];
}

export function databaseVulnerabilityAssessmentRuleBaselineItemSerializer(
  item: DatabaseVulnerabilityAssessmentRuleBaselineItem,
): any {
  return {
    result: item["result"].map((p: any) => {
      return p;
    }),
  };
}

export function databaseVulnerabilityAssessmentRuleBaselineItemDeserializer(
  item: any,
): DatabaseVulnerabilityAssessmentRuleBaselineItem {
  return {
    result: item["result"].map((p: any) => {
      return p;
    }),
  };
}

/** A database vulnerability assessment. */
export interface DatabaseVulnerabilityAssessment extends ProxyResource {
  /** A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/).  It is required if server level vulnerability assessment policy doesn't set */
  storageContainerPath?: string;
  /** A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageContainerSasKey?: string;
  /** Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageAccountAccessKey?: string;
  /** The recurring scans settings */
  recurringScans?: VulnerabilityAssessmentRecurringScansProperties;
}

export function databaseVulnerabilityAssessmentSerializer(
  item: DatabaseVulnerabilityAssessment,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "storageContainerPath",
      "storageContainerSasKey",
      "storageAccountAccessKey",
      "recurringScans",
    ])
      ? undefined
      : _databaseVulnerabilityAssessmentPropertiesSerializer(item),
  };
}

export function databaseVulnerabilityAssessmentDeserializer(
  item: any,
): DatabaseVulnerabilityAssessment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseVulnerabilityAssessmentPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a database Vulnerability Assessment. */
export interface DatabaseVulnerabilityAssessmentProperties {
  /** A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/).  It is required if server level vulnerability assessment policy doesn't set */
  storageContainerPath?: string;
  /** A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageContainerSasKey?: string;
  /** Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageAccountAccessKey?: string;
  /** The recurring scans settings */
  recurringScans?: VulnerabilityAssessmentRecurringScansProperties;
}

export function databaseVulnerabilityAssessmentPropertiesSerializer(
  item: DatabaseVulnerabilityAssessmentProperties,
): any {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesSerializer(item["recurringScans"]),
  };
}

export function databaseVulnerabilityAssessmentPropertiesDeserializer(
  item: any,
): DatabaseVulnerabilityAssessmentProperties {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesDeserializer(item["recurringScans"]),
  };
}

/** Properties of a Vulnerability Assessment recurring scans. */
export interface VulnerabilityAssessmentRecurringScansProperties {
  /** Recurring scans state. */
  isEnabled?: boolean;
  /** Specifies that the schedule scan notification will be is sent to the subscription administrators. */
  emailSubscriptionAdmins?: boolean;
  /** Specifies an array of e-mail addresses to which the scan notification is sent. */
  emails?: string[];
}

export function vulnerabilityAssessmentRecurringScansPropertiesSerializer(
  item: VulnerabilityAssessmentRecurringScansProperties,
): any {
  return {
    isEnabled: item["isEnabled"],
    emailSubscriptionAdmins: item["emailSubscriptionAdmins"],
    emails: !item["emails"]
      ? item["emails"]
      : item["emails"].map((p: any) => {
          return p;
        }),
  };
}

export function vulnerabilityAssessmentRecurringScansPropertiesDeserializer(
  item: any,
): VulnerabilityAssessmentRecurringScansProperties {
  return {
    isEnabled: item["isEnabled"],
    emailSubscriptionAdmins: item["emailSubscriptionAdmins"],
    emails: !item["emails"]
      ? item["emails"]
      : item["emails"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link VulnerabilityAssessmentName} that the service accepts. */
export enum KnownVulnerabilityAssessmentName {
  /** default */
  Default = "default",
}

/** Type of VulnerabilityAssessmentName */
export type VulnerabilityAssessmentName = string;

/** The response of a DatabaseVulnerabilityAssessment list operation. */
export interface _DatabaseVulnerabilityAssessmentListResult {
  /** The DatabaseVulnerabilityAssessment items on this page */
  value: DatabaseVulnerabilityAssessment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseVulnerabilityAssessmentListResultDeserializer(
  item: any,
): _DatabaseVulnerabilityAssessmentListResult {
  return {
    value: databaseVulnerabilityAssessmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseVulnerabilityAssessmentArraySerializer(
  result: Array<DatabaseVulnerabilityAssessment>,
): any[] {
  return result.map((item) => {
    return databaseVulnerabilityAssessmentSerializer(item);
  });
}

export function databaseVulnerabilityAssessmentArrayDeserializer(
  result: Array<DatabaseVulnerabilityAssessment>,
): any[] {
  return result.map((item) => {
    return databaseVulnerabilityAssessmentDeserializer(item);
  });
}

/** A vulnerability assessment scan record. */
export interface VulnerabilityAssessmentScanRecord extends ProxyResource {
  /** The scan ID. */
  readonly scanId?: string;
  /** The scan trigger type. */
  readonly triggerType?: VulnerabilityAssessmentScanTriggerType;
  /** The scan status. */
  readonly state?: VulnerabilityAssessmentScanState;
  /** The scan start time (UTC). */
  readonly startTime?: Date;
  /** The scan end time (UTC). */
  readonly endTime?: Date;
  /** The scan errors. */
  readonly errors?: VulnerabilityAssessmentScanError[];
  /** The scan results storage container path. */
  readonly storageContainerPath?: string;
  /** The number of failed security checks. */
  readonly numberOfFailedSecurityChecks?: number;
}

export function vulnerabilityAssessmentScanRecordDeserializer(
  item: any,
): VulnerabilityAssessmentScanRecord {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _vulnerabilityAssessmentScanRecordPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a vulnerability assessment scan record. */
export interface VulnerabilityAssessmentScanRecordProperties {
  /** The scan ID. */
  readonly scanId?: string;
  /** The scan trigger type. */
  readonly triggerType?: VulnerabilityAssessmentScanTriggerType;
  /** The scan status. */
  readonly state?: VulnerabilityAssessmentScanState;
  /** The scan start time (UTC). */
  readonly startTime?: Date;
  /** The scan end time (UTC). */
  readonly endTime?: Date;
  /** The scan errors. */
  readonly errors?: VulnerabilityAssessmentScanError[];
  /** The scan results storage container path. */
  readonly storageContainerPath?: string;
  /** The number of failed security checks. */
  readonly numberOfFailedSecurityChecks?: number;
}

export function vulnerabilityAssessmentScanRecordPropertiesDeserializer(
  item: any,
): VulnerabilityAssessmentScanRecordProperties {
  return {
    scanId: item["scanId"],
    triggerType: item["triggerType"],
    state: item["state"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    errors: !item["errors"]
      ? item["errors"]
      : vulnerabilityAssessmentScanErrorArrayDeserializer(item["errors"]),
    storageContainerPath: item["storageContainerPath"],
    numberOfFailedSecurityChecks: item["numberOfFailedSecurityChecks"],
  };
}

export function vulnerabilityAssessmentScanErrorArrayDeserializer(
  result: Array<VulnerabilityAssessmentScanError>,
): any[] {
  return result.map((item) => {
    return vulnerabilityAssessmentScanErrorDeserializer(item);
  });
}

/** Properties of a vulnerability assessment scan error. */
export interface VulnerabilityAssessmentScanError {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
}

export function vulnerabilityAssessmentScanErrorDeserializer(
  item: any,
): VulnerabilityAssessmentScanError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The response of a VulnerabilityAssessmentScanRecord list operation. */
export interface _VulnerabilityAssessmentScanRecordListResult {
  /** The VulnerabilityAssessmentScanRecord items on this page */
  value: VulnerabilityAssessmentScanRecord[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _vulnerabilityAssessmentScanRecordListResultDeserializer(
  item: any,
): _VulnerabilityAssessmentScanRecordListResult {
  return {
    value: vulnerabilityAssessmentScanRecordArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function vulnerabilityAssessmentScanRecordArrayDeserializer(
  result: Array<VulnerabilityAssessmentScanRecord>,
): any[] {
  return result.map((item) => {
    return vulnerabilityAssessmentScanRecordDeserializer(item);
  });
}

/** A database Vulnerability Assessment scan export resource. */
export interface DatabaseVulnerabilityAssessmentScansExport extends ProxyResourceAutoGenerated {
  /** Location of the exported report (e.g. https://myStorage.blob.core.windows.net/VaScans/scans/serverName/databaseName/scan_scanId.xlsx). */
  readonly exportedReportLocation?: string;
}

export function databaseVulnerabilityAssessmentScansExportDeserializer(
  item: any,
): DatabaseVulnerabilityAssessmentScansExport {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _databaseVulnerabilityAssessmentScansExportPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the export operation's result. */
export interface DatabaseVulnerabilityAssessmentScanExportProperties {
  /** Location of the exported report (e.g. https://myStorage.blob.core.windows.net/VaScans/scans/serverName/databaseName/scan_scanId.xlsx). */
  readonly exportedReportLocation?: string;
}

export function databaseVulnerabilityAssessmentScanExportPropertiesDeserializer(
  item: any,
): DatabaseVulnerabilityAssessmentScanExportProperties {
  return {
    exportedReportLocation: item["exportedReportLocation"],
  };
}

/** A database data masking policy. */
export interface DataMaskingPolicy extends ProxyResource {
  /** The location of the data masking policy. */
  readonly location?: string;
  /** The kind of Data Masking Policy. Metadata, used for Azure portal. */
  readonly kind?: string;
  /** The state of the data masking policy. */
  dataMaskingState?: DataMaskingState;
  /** The list of the exempt principals. Specifies the semicolon-separated list of database users for which the data masking policy does not apply. The specified users receive data results without masking for all of the database queries. */
  exemptPrincipals?: string;
  /** The list of the application principals. This is a legacy parameter and is no longer used. */
  readonly applicationPrincipals?: string;
  /** The masking level. This is a legacy parameter and is no longer used. */
  readonly maskingLevel?: string;
}

export function dataMaskingPolicySerializer(item: DataMaskingPolicy): any {
  return {
    properties: areAllPropsUndefined(item, ["dataMaskingState", "exemptPrincipals"])
      ? undefined
      : _dataMaskingPolicyPropertiesSerializer(item),
  };
}

export function dataMaskingPolicyDeserializer(item: any): DataMaskingPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _dataMaskingPolicyPropertiesDeserializer(item["properties"])),
    location: item["location"],
    kind: item["kind"],
  };
}

/** The properties of a database data masking policy. */
export interface DataMaskingPolicyProperties {
  /** The state of the data masking policy. */
  dataMaskingState: DataMaskingState;
  /** The list of the exempt principals. Specifies the semicolon-separated list of database users for which the data masking policy does not apply. The specified users receive data results without masking for all of the database queries. */
  exemptPrincipals?: string;
  /** The list of the application principals. This is a legacy parameter and is no longer used. */
  readonly applicationPrincipals?: string;
  /** The masking level. This is a legacy parameter and is no longer used. */
  readonly maskingLevel?: string;
}

export function dataMaskingPolicyPropertiesSerializer(item: DataMaskingPolicyProperties): any {
  return { dataMaskingState: item["dataMaskingState"], exemptPrincipals: item["exemptPrincipals"] };
}

export function dataMaskingPolicyPropertiesDeserializer(item: any): DataMaskingPolicyProperties {
  return {
    dataMaskingState: item["dataMaskingState"],
    exemptPrincipals: item["exemptPrincipals"],
    applicationPrincipals: item["applicationPrincipals"],
    maskingLevel: item["maskingLevel"],
  };
}

/** The state of the data masking policy. */
export type DataMaskingState = "Enabled" | "Disabled";

/** Known values of {@link DataMaskingPolicyName} that the service accepts. */
export enum KnownDataMaskingPolicyName {
  /** Default */
  Default = "Default",
}

/** Type of DataMaskingPolicyName */
export type DataMaskingPolicyName = string;

/** A deleted server. */
export interface DeletedServer extends ProxyResource {
  /** The version of the deleted server. */
  readonly version?: string;
  /** The deletion time of the deleted server. */
  readonly deletionTime?: Date;
  /** The original ID of the server before deletion. */
  readonly originalId?: string;
  /** The fully qualified domain name of the server. */
  readonly fullyQualifiedDomainName?: string;
}

export function deletedServerDeserializer(item: any): DeletedServer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _deletedServerPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a deleted server. */
export interface DeletedServerProperties {
  /** The version of the deleted server. */
  readonly version?: string;
  /** The deletion time of the deleted server. */
  readonly deletionTime?: Date;
  /** The original ID of the server before deletion. */
  readonly originalId?: string;
  /** The fully qualified domain name of the server. */
  readonly fullyQualifiedDomainName?: string;
}

export function deletedServerPropertiesDeserializer(item: any): DeletedServerProperties {
  return {
    version: item["version"],
    deletionTime: !item["deletionTime"] ? item["deletionTime"] : new Date(item["deletionTime"]),
    originalId: item["originalId"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
  };
}

/** The response of a DeletedServer list operation. */
export interface _DeletedServerListResult {
  /** The DeletedServer items on this page */
  value: DeletedServer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deletedServerListResultDeserializer(item: any): _DeletedServerListResult {
  return {
    value: deletedServerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedServerArrayDeserializer(result: Array<DeletedServer>): any[] {
  return result.map((item) => {
    return deletedServerDeserializer(item);
  });
}

/** Distributed availability group between box and Sql Managed Instance. */
export interface DistributedAvailabilityGroup extends ProxyResource {
  /** Name of the distributed availability group */
  readonly distributedAvailabilityGroupName?: string;
  /** ID of the distributed availability group */
  readonly distributedAvailabilityGroupId?: string;
  /** Replication mode of the link */
  replicationMode?: ReplicationModeType;
  /** SQL server side link role */
  readonly partnerLinkRole?: LinkRole;
  /** SQL server side availability group name */
  partnerAvailabilityGroupName?: string;
  /** SQL server side endpoint - IP or DNS resolvable name */
  partnerEndpoint?: string;
  /** Managed instance side link role */
  instanceLinkRole?: LinkRole;
  /** Managed instance side availability group name */
  instanceAvailabilityGroupName?: string;
  /** The link failover mode - can be Manual if intended to be used for two-way failover with a supported SQL Server, or None for one-way failover to Azure. */
  failoverMode?: FailoverModeType;
  /** Database seeding mode – can be Automatic (default), or Manual for supported scenarios. */
  seedingMode?: SeedingModeType;
  /** Databases in the distributed availability group */
  databases?: DistributedAvailabilityGroupDatabase[];
}

export function distributedAvailabilityGroupSerializer(item: DistributedAvailabilityGroup): any {
  return {
    properties: areAllPropsUndefined(item, [
      "replicationMode",
      "partnerAvailabilityGroupName",
      "partnerEndpoint",
      "instanceLinkRole",
      "instanceAvailabilityGroupName",
      "failoverMode",
      "seedingMode",
      "databases",
    ])
      ? undefined
      : _distributedAvailabilityGroupPropertiesSerializer(item),
  };
}

export function distributedAvailabilityGroupDeserializer(item: any): DistributedAvailabilityGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _distributedAvailabilityGroupPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a distributed availability group. */
export interface DistributedAvailabilityGroupProperties {
  /** Name of the distributed availability group */
  readonly distributedAvailabilityGroupName?: string;
  /** ID of the distributed availability group */
  readonly distributedAvailabilityGroupId?: string;
  /** Replication mode of the link */
  replicationMode?: ReplicationModeType;
  /** SQL server side link role */
  readonly partnerLinkRole?: LinkRole;
  /** SQL server side availability group name */
  partnerAvailabilityGroupName?: string;
  /** SQL server side endpoint - IP or DNS resolvable name */
  partnerEndpoint?: string;
  /** Managed instance side link role */
  instanceLinkRole?: LinkRole;
  /** Managed instance side availability group name */
  instanceAvailabilityGroupName?: string;
  /** The link failover mode - can be Manual if intended to be used for two-way failover with a supported SQL Server, or None for one-way failover to Azure. */
  failoverMode?: FailoverModeType;
  /** Database seeding mode – can be Automatic (default), or Manual for supported scenarios. */
  seedingMode?: SeedingModeType;
  /** Databases in the distributed availability group */
  databases?: DistributedAvailabilityGroupDatabase[];
}

export function distributedAvailabilityGroupPropertiesSerializer(
  item: DistributedAvailabilityGroupProperties,
): any {
  return {
    replicationMode: item["replicationMode"],
    partnerAvailabilityGroupName: item["partnerAvailabilityGroupName"],
    partnerEndpoint: item["partnerEndpoint"],
    instanceLinkRole: item["instanceLinkRole"],
    instanceAvailabilityGroupName: item["instanceAvailabilityGroupName"],
    failoverMode: item["failoverMode"],
    seedingMode: item["seedingMode"],
    databases: !item["databases"]
      ? item["databases"]
      : distributedAvailabilityGroupDatabaseArraySerializer(item["databases"]),
  };
}

export function distributedAvailabilityGroupPropertiesDeserializer(
  item: any,
): DistributedAvailabilityGroupProperties {
  return {
    distributedAvailabilityGroupName: item["distributedAvailabilityGroupName"],
    distributedAvailabilityGroupId: item["distributedAvailabilityGroupId"],
    replicationMode: item["replicationMode"],
    partnerLinkRole: item["partnerLinkRole"],
    partnerAvailabilityGroupName: item["partnerAvailabilityGroupName"],
    partnerEndpoint: item["partnerEndpoint"],
    instanceLinkRole: item["instanceLinkRole"],
    instanceAvailabilityGroupName: item["instanceAvailabilityGroupName"],
    failoverMode: item["failoverMode"],
    seedingMode: item["seedingMode"],
    databases: !item["databases"]
      ? item["databases"]
      : distributedAvailabilityGroupDatabaseArrayDeserializer(item["databases"]),
  };
}

/** Replication mode of the link */
export enum KnownReplicationModeType {
  /** Async */
  Async = "Async",
  /** Sync */
  Sync = "Sync",
}

/**
 * Replication mode of the link \
 * {@link KnownReplicationModeType} can be used interchangeably with ReplicationModeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Async**: Async \
 * **Sync**: Sync
 */
export type ReplicationModeType = string;

/** SQL server side link role */
export enum KnownLinkRole {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
}

/**
 * SQL server side link role \
 * {@link KnownLinkRole} can be used interchangeably with LinkRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary \
 * **Secondary**: Secondary
 */
export type LinkRole = string;

/** The link failover mode - can be Manual if intended to be used for two-way failover with a supported SQL Server, or None for one-way failover to Azure. */
export enum KnownFailoverModeType {
  /** None */
  None = "None",
  /** Manual */
  Manual = "Manual",
}

/**
 * The link failover mode - can be Manual if intended to be used for two-way failover with a supported SQL Server, or None for one-way failover to Azure. \
 * {@link KnownFailoverModeType} can be used interchangeably with FailoverModeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Manual**: Manual
 */
export type FailoverModeType = string;

/** Database seeding mode – can be Automatic (default), or Manual for supported scenarios. */
export enum KnownSeedingModeType {
  /** Automatic */
  Automatic = "Automatic",
  /** Manual */
  Manual = "Manual",
}

/**
 * Database seeding mode – can be Automatic (default), or Manual for supported scenarios. \
 * {@link KnownSeedingModeType} can be used interchangeably with SeedingModeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: Automatic \
 * **Manual**: Manual
 */
export type SeedingModeType = string;

export function distributedAvailabilityGroupDatabaseArraySerializer(
  result: Array<DistributedAvailabilityGroupDatabase>,
): any[] {
  return result.map((item) => {
    return distributedAvailabilityGroupDatabaseSerializer(item);
  });
}

export function distributedAvailabilityGroupDatabaseArrayDeserializer(
  result: Array<DistributedAvailabilityGroupDatabase>,
): any[] {
  return result.map((item) => {
    return distributedAvailabilityGroupDatabaseDeserializer(item);
  });
}

/** Database specific information */
export interface DistributedAvailabilityGroupDatabase {
  /** The name of the database in link */
  databaseName?: string;
  /** Managed instance replica id */
  readonly instanceReplicaId?: string;
  /** SQL server replica id */
  readonly partnerReplicaId?: string;
  /** Current link state */
  readonly replicaState?: string;
  /** Seeding progress */
  readonly seedingProgress?: string;
  /** Link health state */
  readonly synchronizationHealth?: ReplicaSynchronizationHealth;
  /** Link connected state */
  readonly connectedState?: ReplicaConnectedState;
  /** Last received LSN */
  readonly lastReceivedLsn?: string;
  /** Last received LSN time */
  readonly lastReceivedTime?: Date;
  /** Last sent LSN */
  readonly lastSentLsn?: string;
  /** Last sent LSN time */
  readonly lastSentTime?: Date;
  /** Last commit LSN */
  readonly lastCommitLsn?: string;
  /** Last commit LSN time */
  readonly lastCommitTime?: Date;
  /** Last hardened LSN */
  readonly lastHardenedLsn?: string;
  /** Last hardened LSN time */
  readonly lastHardenedTime?: Date;
  /** Last backup LSN */
  readonly lastBackupLsn?: string;
  /** Last backup LSN time */
  readonly lastBackupTime?: Date;
  /** The most recent link connection error description */
  readonly mostRecentLinkError?: string;
  /** SQL server certificate validity */
  readonly partnerAuthCertValidity?: CertificateInfo;
  /** Replication lag when Managed Instance link side is primary */
  readonly instanceSendReplicationLagSeconds?: number;
  /** Redo lag when Managed Instance link side is primary */
  readonly instanceRedoReplicationLagSeconds?: number;
}

export function distributedAvailabilityGroupDatabaseSerializer(
  item: DistributedAvailabilityGroupDatabase,
): any {
  return { databaseName: item["databaseName"] };
}

export function distributedAvailabilityGroupDatabaseDeserializer(
  item: any,
): DistributedAvailabilityGroupDatabase {
  return {
    databaseName: item["databaseName"],
    instanceReplicaId: item["instanceReplicaId"],
    partnerReplicaId: item["partnerReplicaId"],
    replicaState: item["replicaState"],
    seedingProgress: item["seedingProgress"],
    synchronizationHealth: item["synchronizationHealth"],
    connectedState: item["connectedState"],
    lastReceivedLsn: item["lastReceivedLsn"],
    lastReceivedTime: !item["lastReceivedTime"]
      ? item["lastReceivedTime"]
      : new Date(item["lastReceivedTime"]),
    lastSentLsn: item["lastSentLsn"],
    lastSentTime: !item["lastSentTime"] ? item["lastSentTime"] : new Date(item["lastSentTime"]),
    lastCommitLsn: item["lastCommitLsn"],
    lastCommitTime: !item["lastCommitTime"]
      ? item["lastCommitTime"]
      : new Date(item["lastCommitTime"]),
    lastHardenedLsn: item["lastHardenedLsn"],
    lastHardenedTime: !item["lastHardenedTime"]
      ? item["lastHardenedTime"]
      : new Date(item["lastHardenedTime"]),
    lastBackupLsn: item["lastBackupLsn"],
    lastBackupTime: !item["lastBackupTime"]
      ? item["lastBackupTime"]
      : new Date(item["lastBackupTime"]),
    mostRecentLinkError: item["mostRecentLinkError"],
    partnerAuthCertValidity: !item["partnerAuthCertValidity"]
      ? item["partnerAuthCertValidity"]
      : certificateInfoDeserializer(item["partnerAuthCertValidity"]),
    instanceSendReplicationLagSeconds: item["instanceSendReplicationLagSeconds"],
    instanceRedoReplicationLagSeconds: item["instanceRedoReplicationLagSeconds"],
  };
}

/** Link health state */
export enum KnownReplicaSynchronizationHealth {
  /** NOT_HEALTHY */
  NOTHealthy = "NOT_HEALTHY",
  /** PARTIALLY_HEALTHY */
  PartiallyHealthy = "PARTIALLY_HEALTHY",
  /** HEALTHY */
  Healthy = "HEALTHY",
}

/**
 * Link health state \
 * {@link KnownReplicaSynchronizationHealth} can be used interchangeably with ReplicaSynchronizationHealth,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NOT_HEALTHY**: NOT_HEALTHY \
 * **PARTIALLY_HEALTHY**: PARTIALLY_HEALTHY \
 * **HEALTHY**: HEALTHY
 */
export type ReplicaSynchronizationHealth = string;

/** Link connected state */
export enum KnownReplicaConnectedState {
  /** DISCONNECTED */
  Disconnected = "DISCONNECTED",
  /** CONNECTED */
  Connected = "CONNECTED",
}

/**
 * Link connected state \
 * {@link KnownReplicaConnectedState} can be used interchangeably with ReplicaConnectedState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DISCONNECTED**: DISCONNECTED \
 * **CONNECTED**: CONNECTED
 */
export type ReplicaConnectedState = string;

/** Certificate information */
export interface CertificateInfo {
  /** The certificate name */
  readonly certificateName?: string;
  /** The certificate expiry date */
  readonly expiryDate?: Date;
}

export function certificateInfoDeserializer(item: any): CertificateInfo {
  return {
    certificateName: item["certificateName"],
    expiryDate: !item["expiryDate"] ? item["expiryDate"] : new Date(item["expiryDate"]),
  };
}

/** A list of distributed availability groups in instance. */
export interface _DistributedAvailabilityGroupsListResult {
  /** Array of results. */
  readonly value?: DistributedAvailabilityGroup[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _distributedAvailabilityGroupsListResultDeserializer(
  item: any,
): _DistributedAvailabilityGroupsListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : distributedAvailabilityGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function distributedAvailabilityGroupArraySerializer(
  result: Array<DistributedAvailabilityGroup>,
): any[] {
  return result.map((item) => {
    return distributedAvailabilityGroupSerializer(item);
  });
}

export function distributedAvailabilityGroupArrayDeserializer(
  result: Array<DistributedAvailabilityGroup>,
): any[] {
  return result.map((item) => {
    return distributedAvailabilityGroupDeserializer(item);
  });
}

/** Distributed availability group failover. */
export interface DistributedAvailabilityGroupsFailoverRequest {
  /** The failover type, can be ForcedAllowDataLoss or Planned. */
  failoverType: FailoverType;
}

export function distributedAvailabilityGroupsFailoverRequestSerializer(
  item: DistributedAvailabilityGroupsFailoverRequest,
): any {
  return { failoverType: item["failoverType"] };
}

/** The failover type, can be ForcedAllowDataLoss or Planned. */
export enum KnownFailoverType {
  /** ForcedAllowDataLoss */
  ForcedAllowDataLoss = "ForcedAllowDataLoss",
  /** Planned */
  Planned = "Planned",
}

/**
 * The failover type, can be ForcedAllowDataLoss or Planned. \
 * {@link KnownFailoverType} can be used interchangeably with FailoverType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ForcedAllowDataLoss**: ForcedAllowDataLoss \
 * **Planned**: Planned
 */
export type FailoverType = string;

/** Distributed availability group failover request. */
export interface DistributedAvailabilityGroupSetRole {
  /** New role of managed instance in a distributed availability group, can be Primary or Secondary. */
  instanceRole: InstanceRole;
  /** The type of the role change, can be Planned or Forced. */
  roleChangeType: RoleChangeType;
}

export function distributedAvailabilityGroupSetRoleSerializer(
  item: DistributedAvailabilityGroupSetRole,
): any {
  return { instanceRole: item["instanceRole"], roleChangeType: item["roleChangeType"] };
}

/** New role of managed instance in a distributed availability group, can be Primary or Secondary. */
export enum KnownInstanceRole {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
}

/**
 * New role of managed instance in a distributed availability group, can be Primary or Secondary. \
 * {@link KnownInstanceRole} can be used interchangeably with InstanceRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary \
 * **Secondary**: Secondary
 */
export type InstanceRole = string;

/** The type of the role change, can be Planned or Forced. */
export enum KnownRoleChangeType {
  /** Forced */
  Forced = "Forced",
  /** Planned */
  Planned = "Planned",
}

/**
 * The type of the role change, can be Planned or Forced. \
 * {@link KnownRoleChangeType} can be used interchangeably with RoleChangeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Forced**: Forced \
 * **Planned**: Planned
 */
export type RoleChangeType = string;

/** A managed database resource. */
export interface ManagedDatabase extends TrackedResource {
  /** Collation of the managed database. */
  collation?: string;
  /** Status of the database. */
  readonly status?: ManagedDatabaseStatus;
  /** Creation date of the database. */
  readonly creationDate?: Date;
  /** Earliest restore point in time for point in time restore. */
  readonly earliestRestorePoint?: Date;
  /** Conditional. If createMode is PointInTimeRestore, this value is required. Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database. */
  restorePointInTime?: Date;
  /** Geo paired region. */
  readonly defaultSecondaryLocation?: string;
  /** Collation of the metadata catalog. */
  catalogCollation?: CatalogCollationType;
  /** Managed database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. SourceDatabaseName, SourceManagedInstanceName and PointInTime must be specified. RestoreExternalBackup: Create a database by restoring from external backup files. Collation, StorageContainerUri and StorageContainerSasToken must be specified. Recovery: Creates a database by restoring a geo-replicated backup. RecoverableDatabaseId must be specified as the recoverable database resource ID to restore. RestoreLongTermRetentionBackup: Create a database by restoring from a long term retention backup (longTermRetentionBackupResourceId required). */
  createMode?: ManagedDatabaseCreateMode;
  /** Conditional. If createMode is RestoreExternalBackup, this value is required. Specifies the uri of the storage container where backups for this restore are stored. */
  storageContainerUri?: string;
  /** The resource identifier of the source database associated with create operation of this database. */
  sourceDatabaseId?: string;
  /** The resource identifier of the cross-subscription source database associated with create operation of this database. */
  crossSubscriptionSourceDatabaseId?: string;
  /** The restorable dropped database resource id to restore when creating this database. */
  restorableDroppedDatabaseId?: string;
  /** The restorable cross-subscription dropped database resource id to restore when creating this database. */
  crossSubscriptionRestorableDroppedDatabaseId?: string;
  /** Conditional. If createMode is RestoreExternalBackup, this value is used. Specifies the identity used for storage container authentication. Can be 'SharedAccessSignature' or 'ManagedIdentity'; if not specified 'SharedAccessSignature' is assumed. */
  storageContainerIdentity?: string;
  /** Conditional. If createMode is RestoreExternalBackup and storageContainerIdentity is not ManagedIdentity, this value is required. Specifies the storage container sas token. */
  storageContainerSasToken?: string;
  /** Instance Failover Group resource identifier that this managed database belongs to. */
  readonly failoverGroupId?: string;
  /** The resource identifier of the recoverable database associated with create operation of this database. */
  recoverableDatabaseId?: string;
  /** The name of the Long Term Retention backup to be used for restore of this managed database. */
  longTermRetentionBackupResourceId?: string;
  /** Whether to auto complete restore of this managed database. */
  autoCompleteRestore?: boolean;
  /** Last backup file name for restore of this managed database. */
  lastBackupName?: string;
  /** Target managed instance id used in cross-subscription restore. */
  crossSubscriptionTargetManagedInstanceId?: string;
  /** Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created. */
  isLedgerOn?: boolean;
  /** Additional observability and troubleshooting information for databases in ‘Inaccessible’ state. */
  readonly extendedAccessibilityInfo?: ManagedDatabaseExtendedAccessibilityInfo;
}

export function managedDatabaseSerializer(item: ManagedDatabase): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "collation",
      "restorePointInTime",
      "catalogCollation",
      "createMode",
      "storageContainerUri",
      "sourceDatabaseId",
      "crossSubscriptionSourceDatabaseId",
      "restorableDroppedDatabaseId",
      "crossSubscriptionRestorableDroppedDatabaseId",
      "storageContainerIdentity",
      "storageContainerSasToken",
      "recoverableDatabaseId",
      "longTermRetentionBackupResourceId",
      "autoCompleteRestore",
      "lastBackupName",
      "crossSubscriptionTargetManagedInstanceId",
      "isLedgerOn",
    ])
      ? undefined
      : _managedDatabasePropertiesSerializer(item),
  };
}

export function managedDatabaseDeserializer(item: any): ManagedDatabase {
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
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedDatabasePropertiesDeserializer(item["properties"])),
  };
}

/** The managed database's properties. */
export interface ManagedDatabaseProperties {
  /** Collation of the managed database. */
  collation?: string;
  /** Status of the database. */
  readonly status?: ManagedDatabaseStatus;
  /** Creation date of the database. */
  readonly creationDate?: Date;
  /** Earliest restore point in time for point in time restore. */
  readonly earliestRestorePoint?: Date;
  /** Conditional. If createMode is PointInTimeRestore, this value is required. Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database. */
  restorePointInTime?: Date;
  /** Geo paired region. */
  readonly defaultSecondaryLocation?: string;
  /** Collation of the metadata catalog. */
  catalogCollation?: CatalogCollationType;
  /** Managed database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. SourceDatabaseName, SourceManagedInstanceName and PointInTime must be specified. RestoreExternalBackup: Create a database by restoring from external backup files. Collation, StorageContainerUri and StorageContainerSasToken must be specified. Recovery: Creates a database by restoring a geo-replicated backup. RecoverableDatabaseId must be specified as the recoverable database resource ID to restore. RestoreLongTermRetentionBackup: Create a database by restoring from a long term retention backup (longTermRetentionBackupResourceId required). */
  createMode?: ManagedDatabaseCreateMode;
  /** Conditional. If createMode is RestoreExternalBackup, this value is required. Specifies the uri of the storage container where backups for this restore are stored. */
  storageContainerUri?: string;
  /** The resource identifier of the source database associated with create operation of this database. */
  sourceDatabaseId?: string;
  /** The resource identifier of the cross-subscription source database associated with create operation of this database. */
  crossSubscriptionSourceDatabaseId?: string;
  /** The restorable dropped database resource id to restore when creating this database. */
  restorableDroppedDatabaseId?: string;
  /** The restorable cross-subscription dropped database resource id to restore when creating this database. */
  crossSubscriptionRestorableDroppedDatabaseId?: string;
  /** Conditional. If createMode is RestoreExternalBackup, this value is used. Specifies the identity used for storage container authentication. Can be 'SharedAccessSignature' or 'ManagedIdentity'; if not specified 'SharedAccessSignature' is assumed. */
  storageContainerIdentity?: string;
  /** Conditional. If createMode is RestoreExternalBackup and storageContainerIdentity is not ManagedIdentity, this value is required. Specifies the storage container sas token. */
  storageContainerSasToken?: string;
  /** Instance Failover Group resource identifier that this managed database belongs to. */
  readonly failoverGroupId?: string;
  /** The resource identifier of the recoverable database associated with create operation of this database. */
  recoverableDatabaseId?: string;
  /** The name of the Long Term Retention backup to be used for restore of this managed database. */
  longTermRetentionBackupResourceId?: string;
  /** Whether to auto complete restore of this managed database. */
  autoCompleteRestore?: boolean;
  /** Last backup file name for restore of this managed database. */
  lastBackupName?: string;
  /** Target managed instance id used in cross-subscription restore. */
  crossSubscriptionTargetManagedInstanceId?: string;
  /** Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created. */
  isLedgerOn?: boolean;
  /** Additional observability and troubleshooting information for databases in ‘Inaccessible’ state. */
  readonly extendedAccessibilityInfo?: ManagedDatabaseExtendedAccessibilityInfo;
}

export function managedDatabasePropertiesSerializer(item: ManagedDatabaseProperties): any {
  return {
    collation: item["collation"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    catalogCollation: item["catalogCollation"],
    createMode: item["createMode"],
    storageContainerUri: item["storageContainerUri"],
    sourceDatabaseId: item["sourceDatabaseId"],
    crossSubscriptionSourceDatabaseId: item["crossSubscriptionSourceDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    crossSubscriptionRestorableDroppedDatabaseId:
      item["crossSubscriptionRestorableDroppedDatabaseId"],
    storageContainerIdentity: item["storageContainerIdentity"],
    storageContainerSasToken: item["storageContainerSasToken"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    autoCompleteRestore: item["autoCompleteRestore"],
    lastBackupName: item["lastBackupName"],
    crossSubscriptionTargetManagedInstanceId: item["crossSubscriptionTargetManagedInstanceId"],
    isLedgerOn: item["isLedgerOn"],
  };
}

export function managedDatabasePropertiesDeserializer(item: any): ManagedDatabaseProperties {
  return {
    collation: item["collation"],
    status: item["status"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    earliestRestorePoint: !item["earliestRestorePoint"]
      ? item["earliestRestorePoint"]
      : new Date(item["earliestRestorePoint"]),
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : new Date(item["restorePointInTime"]),
    defaultSecondaryLocation: item["defaultSecondaryLocation"],
    catalogCollation: item["catalogCollation"],
    createMode: item["createMode"],
    storageContainerUri: item["storageContainerUri"],
    sourceDatabaseId: item["sourceDatabaseId"],
    crossSubscriptionSourceDatabaseId: item["crossSubscriptionSourceDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    crossSubscriptionRestorableDroppedDatabaseId:
      item["crossSubscriptionRestorableDroppedDatabaseId"],
    storageContainerIdentity: item["storageContainerIdentity"],
    storageContainerSasToken: item["storageContainerSasToken"],
    failoverGroupId: item["failoverGroupId"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    autoCompleteRestore: item["autoCompleteRestore"],
    lastBackupName: item["lastBackupName"],
    crossSubscriptionTargetManagedInstanceId: item["crossSubscriptionTargetManagedInstanceId"],
    isLedgerOn: item["isLedgerOn"],
    extendedAccessibilityInfo: !item["extendedAccessibilityInfo"]
      ? item["extendedAccessibilityInfo"]
      : managedDatabaseExtendedAccessibilityInfoDeserializer(item["extendedAccessibilityInfo"]),
  };
}

/** Status of the database. */
export enum KnownManagedDatabaseStatus {
  /** Online */
  Online = "Online",
  /** Offline */
  Offline = "Offline",
  /** Shutdown */
  Shutdown = "Shutdown",
  /** Creating */
  Creating = "Creating",
  /** Inaccessible */
  Inaccessible = "Inaccessible",
  /** Restoring */
  Restoring = "Restoring",
  /** Updating */
  Updating = "Updating",
  /** Stopping */
  Stopping = "Stopping",
  /** Stopped */
  Stopped = "Stopped",
  /** Starting */
  Starting = "Starting",
  /** DbMoving */
  DbMoving = "DbMoving",
  /** DbCopying */
  DbCopying = "DbCopying",
}

/**
 * Status of the database. \
 * {@link KnownManagedDatabaseStatus} can be used interchangeably with ManagedDatabaseStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Online**: Online \
 * **Offline**: Offline \
 * **Shutdown**: Shutdown \
 * **Creating**: Creating \
 * **Inaccessible**: Inaccessible \
 * **Restoring**: Restoring \
 * **Updating**: Updating \
 * **Stopping**: Stopping \
 * **Stopped**: Stopped \
 * **Starting**: Starting \
 * **DbMoving**: DbMoving \
 * **DbCopying**: DbCopying
 */
export type ManagedDatabaseStatus = string;

/** Managed database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. SourceDatabaseName, SourceManagedInstanceName and PointInTime must be specified. RestoreExternalBackup: Create a database by restoring from external backup files. Collation, StorageContainerUri and StorageContainerSasToken must be specified. Recovery: Creates a database by restoring a geo-replicated backup. RecoverableDatabaseId must be specified as the recoverable database resource ID to restore. RestoreLongTermRetentionBackup: Create a database by restoring from a long term retention backup (longTermRetentionBackupResourceId required). */
export enum KnownManagedDatabaseCreateMode {
  /** Default */
  Default = "Default",
  /** RestoreExternalBackup */
  RestoreExternalBackup = "RestoreExternalBackup",
  /** PointInTimeRestore */
  PointInTimeRestore = "PointInTimeRestore",
  /** Recovery */
  Recovery = "Recovery",
  /** RestoreLongTermRetentionBackup */
  RestoreLongTermRetentionBackup = "RestoreLongTermRetentionBackup",
}

/**
 * Managed database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. SourceDatabaseName, SourceManagedInstanceName and PointInTime must be specified. RestoreExternalBackup: Create a database by restoring from external backup files. Collation, StorageContainerUri and StorageContainerSasToken must be specified. Recovery: Creates a database by restoring a geo-replicated backup. RecoverableDatabaseId must be specified as the recoverable database resource ID to restore. RestoreLongTermRetentionBackup: Create a database by restoring from a long term retention backup (longTermRetentionBackupResourceId required). \
 * {@link KnownManagedDatabaseCreateMode} can be used interchangeably with ManagedDatabaseCreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default \
 * **RestoreExternalBackup**: RestoreExternalBackup \
 * **PointInTimeRestore**: PointInTimeRestore \
 * **Recovery**: Recovery \
 * **RestoreLongTermRetentionBackup**: RestoreLongTermRetentionBackup
 */
export type ManagedDatabaseCreateMode = string;

/** Managed Database Extended Accessibility Information */
export interface ManagedDatabaseExtendedAccessibilityInfo {
  /** SQL Server error code connected to the inaccessibility root cause. */
  readonly inaccessibilityReasonErrorCode: string;
  /** Root cause explanation and mitigation action. */
  readonly inaccessibilityReasonDescription: string;
  /** Root cause kind. Allowed values are “TransparentDataEncryption”, “DatabaseReplication”, and “Unknown”. */
  readonly inaccessibilityReasonKind: InaccessibilityReason;
  /** For the root cause kind “TransparentDataEncryption”, the CMK URI. */
  readonly inaccessibilityReasonTdeKeyUri?: string;
}

export function managedDatabaseExtendedAccessibilityInfoDeserializer(
  item: any,
): ManagedDatabaseExtendedAccessibilityInfo {
  return {
    inaccessibilityReasonErrorCode: item["inaccessibilityReasonErrorCode"],
    inaccessibilityReasonDescription: item["inaccessibilityReasonDescription"],
    inaccessibilityReasonKind: item["inaccessibilityReasonKind"],
    inaccessibilityReasonTdeKeyUri: item["inaccessibilityReasonTdeKeyUri"],
  };
}

/** Root cause kind. Allowed values are “TransparentDataEncryption”, “DatabaseReplication”, and “Unknown”. */
export enum KnownInaccessibilityReason {
  /** Unknown */
  Unknown = "Unknown",
  /** TransparentDataEncryption */
  TransparentDataEncryption = "TransparentDataEncryption",
  /** DatabaseReplication */
  DatabaseReplication = "DatabaseReplication",
}

/**
 * Root cause kind. Allowed values are “TransparentDataEncryption”, “DatabaseReplication”, and “Unknown”. \
 * {@link KnownInaccessibilityReason} can be used interchangeably with InaccessibilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **TransparentDataEncryption**: TransparentDataEncryption \
 * **DatabaseReplication**: DatabaseReplication
 */
export type InaccessibilityReason = string;

/** An managed database update. */
export interface ManagedDatabaseUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Collation of the managed database. */
  collation?: string;
  /** Status of the database. */
  readonly status?: ManagedDatabaseStatus;
  /** Creation date of the database. */
  readonly creationDate?: Date;
  /** Earliest restore point in time for point in time restore. */
  readonly earliestRestorePoint?: Date;
  /** Conditional. If createMode is PointInTimeRestore, this value is required. Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database. */
  restorePointInTime?: Date;
  /** Geo paired region. */
  readonly defaultSecondaryLocation?: string;
  /** Collation of the metadata catalog. */
  catalogCollation?: CatalogCollationType;
  /** Managed database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. SourceDatabaseName, SourceManagedInstanceName and PointInTime must be specified. RestoreExternalBackup: Create a database by restoring from external backup files. Collation, StorageContainerUri and StorageContainerSasToken must be specified. Recovery: Creates a database by restoring a geo-replicated backup. RecoverableDatabaseId must be specified as the recoverable database resource ID to restore. RestoreLongTermRetentionBackup: Create a database by restoring from a long term retention backup (longTermRetentionBackupResourceId required). */
  createMode?: ManagedDatabaseCreateMode;
  /** Conditional. If createMode is RestoreExternalBackup, this value is required. Specifies the uri of the storage container where backups for this restore are stored. */
  storageContainerUri?: string;
  /** The resource identifier of the source database associated with create operation of this database. */
  sourceDatabaseId?: string;
  /** The resource identifier of the cross-subscription source database associated with create operation of this database. */
  crossSubscriptionSourceDatabaseId?: string;
  /** The restorable dropped database resource id to restore when creating this database. */
  restorableDroppedDatabaseId?: string;
  /** The restorable cross-subscription dropped database resource id to restore when creating this database. */
  crossSubscriptionRestorableDroppedDatabaseId?: string;
  /** Conditional. If createMode is RestoreExternalBackup, this value is used. Specifies the identity used for storage container authentication. Can be 'SharedAccessSignature' or 'ManagedIdentity'; if not specified 'SharedAccessSignature' is assumed. */
  storageContainerIdentity?: string;
  /** Conditional. If createMode is RestoreExternalBackup and storageContainerIdentity is not ManagedIdentity, this value is required. Specifies the storage container sas token. */
  storageContainerSasToken?: string;
  /** Instance Failover Group resource identifier that this managed database belongs to. */
  readonly failoverGroupId?: string;
  /** The resource identifier of the recoverable database associated with create operation of this database. */
  recoverableDatabaseId?: string;
  /** The name of the Long Term Retention backup to be used for restore of this managed database. */
  longTermRetentionBackupResourceId?: string;
  /** Whether to auto complete restore of this managed database. */
  autoCompleteRestore?: boolean;
  /** Last backup file name for restore of this managed database. */
  lastBackupName?: string;
  /** Target managed instance id used in cross-subscription restore. */
  crossSubscriptionTargetManagedInstanceId?: string;
  /** Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created. */
  isLedgerOn?: boolean;
  /** Additional observability and troubleshooting information for databases in ‘Inaccessible’ state. */
  readonly extendedAccessibilityInfo?: ManagedDatabaseExtendedAccessibilityInfo;
}

export function managedDatabaseUpdateSerializer(item: ManagedDatabaseUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "collation",
      "restorePointInTime",
      "catalogCollation",
      "createMode",
      "storageContainerUri",
      "sourceDatabaseId",
      "crossSubscriptionSourceDatabaseId",
      "restorableDroppedDatabaseId",
      "crossSubscriptionRestorableDroppedDatabaseId",
      "storageContainerIdentity",
      "storageContainerSasToken",
      "recoverableDatabaseId",
      "longTermRetentionBackupResourceId",
      "autoCompleteRestore",
      "lastBackupName",
      "crossSubscriptionTargetManagedInstanceId",
      "isLedgerOn",
    ])
      ? undefined
      : _managedDatabaseUpdatePropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** The response of a ManagedDatabase list operation. */
export interface _ManagedDatabaseListResult {
  /** The ManagedDatabase items on this page */
  value: ManagedDatabase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedDatabaseListResultDeserializer(item: any): _ManagedDatabaseListResult {
  return {
    value: managedDatabaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedDatabaseArraySerializer(result: Array<ManagedDatabase>): any[] {
  return result.map((item) => {
    return managedDatabaseSerializer(item);
  });
}

export function managedDatabaseArrayDeserializer(result: Array<ManagedDatabase>): any[] {
  return result.map((item) => {
    return managedDatabaseDeserializer(item);
  });
}

/** Contains the information necessary to perform a managed database move. */
export interface ManagedDatabaseMoveDefinition {
  /** The destination managed database ID */
  destinationManagedDatabaseId: string;
}

export function managedDatabaseMoveDefinitionSerializer(item: ManagedDatabaseMoveDefinition): any {
  return { destinationManagedDatabaseId: item["destinationManagedDatabaseId"] };
}

/** Contains the information necessary to perform a complete database restore operation. */
export interface CompleteDatabaseRestoreDefinition {
  /** The last backup name to apply */
  lastBackupName: string;
}

export function completeDatabaseRestoreDefinitionSerializer(
  item: CompleteDatabaseRestoreDefinition,
): any {
  return { lastBackupName: item["lastBackupName"] };
}

/** Contains the information necessary to start a managed database move. */
export interface ManagedDatabaseStartMoveDefinition {
  /** The destination managed database ID */
  destinationManagedDatabaseId: string;
  /** The move operation mode. */
  operationMode?: MoveOperationMode;
}

export function managedDatabaseStartMoveDefinitionSerializer(
  item: ManagedDatabaseStartMoveDefinition,
): any {
  return {
    destinationManagedDatabaseId: item["destinationManagedDatabaseId"],
    operationMode: item["operationMode"],
  };
}

/** Operation mode. */
export enum KnownMoveOperationMode {
  /** Move */
  Move = "Move",
  /** Copy */
  Copy = "Copy",
}

/**
 * Operation mode. \
 * {@link KnownMoveOperationMode} can be used interchangeably with MoveOperationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Move**: Move \
 * **Copy**: Copy
 */
export type MoveOperationMode = string;

/** A server trust group. */
export interface ServerTrustGroup extends ProxyResource {
  /** Group members information for the server trust group. */
  groupMembers?: ServerInfo[];
  /** Trust scope of the server trust group. */
  trustScopes?: ServerTrustGroupPropertiesTrustScopesItem[];
}

export function serverTrustGroupSerializer(item: ServerTrustGroup): any {
  return {
    properties: areAllPropsUndefined(item, ["groupMembers", "trustScopes"])
      ? undefined
      : _serverTrustGroupPropertiesSerializer(item),
  };
}

export function serverTrustGroupDeserializer(item: any): ServerTrustGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverTrustGroupPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a server trust group. */
export interface ServerTrustGroupProperties {
  /** Group members information for the server trust group. */
  groupMembers: ServerInfo[];
  /** Trust scope of the server trust group. */
  trustScopes: ServerTrustGroupPropertiesTrustScopesItem[];
}

export function serverTrustGroupPropertiesSerializer(item: ServerTrustGroupProperties): any {
  return {
    groupMembers: serverInfoArraySerializer(item["groupMembers"]),
    trustScopes: item["trustScopes"].map((p: any) => {
      return p;
    }),
  };
}

export function serverTrustGroupPropertiesDeserializer(item: any): ServerTrustGroupProperties {
  return {
    groupMembers: serverInfoArrayDeserializer(item["groupMembers"]),
    trustScopes: item["trustScopes"].map((p: any) => {
      return p;
    }),
  };
}

export function serverInfoArraySerializer(result: Array<ServerInfo>): any[] {
  return result.map((item) => {
    return serverInfoSerializer(item);
  });
}

export function serverInfoArrayDeserializer(result: Array<ServerInfo>): any[] {
  return result.map((item) => {
    return serverInfoDeserializer(item);
  });
}

/** Server info for the server trust group. */
export interface ServerInfo {
  /** Server Id. */
  serverId: string;
}

export function serverInfoSerializer(item: ServerInfo): any {
  return { serverId: item["serverId"] };
}

export function serverInfoDeserializer(item: any): ServerInfo {
  return {
    serverId: item["serverId"],
  };
}

/** Known values of {@link ServerTrustGroupPropertiesTrustScopesItem} that the service accepts. */
export enum KnownServerTrustGroupPropertiesTrustScopesItem {
  /** GlobalTransactions */
  GlobalTransactions = "GlobalTransactions",
  /** ServiceBroker */
  ServiceBroker = "ServiceBroker",
}

/** Type of ServerTrustGroupPropertiesTrustScopesItem */
export type ServerTrustGroupPropertiesTrustScopesItem = string;

/** The response of a ServerTrustGroup list operation. */
export interface _ServerTrustGroupListResult {
  /** The ServerTrustGroup items on this page */
  value: ServerTrustGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverTrustGroupListResultDeserializer(item: any): _ServerTrustGroupListResult {
  return {
    value: serverTrustGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverTrustGroupArraySerializer(result: Array<ServerTrustGroup>): any[] {
  return result.map((item) => {
    return serverTrustGroupSerializer(item);
  });
}

export function serverTrustGroupArrayDeserializer(result: Array<ServerTrustGroup>): any[] {
  return result.map((item) => {
    return serverTrustGroupDeserializer(item);
  });
}

/** An Azure SQL managed instance. */
export interface ManagedInstance extends TrackedResource {
  /** The Azure Active Directory identity of the managed instance. */
  identity?: ResourceIdentity;
  /** Managed instance SKU. Allowed values for sku.name: GP_Gen5 (General Purpose, Standard-series); GP_G8IM (General Purpose, Premium-series); GP_G8IH (General Purpose, Premium-series memory optimized); BC_Gen5 (Business Critical, Standard-Series); BC_G8IM (Business Critical, Premium-series); BC_G8IH (Business Critical, Premium-series memory optimized). */
  sku?: Sku;
  /** Provisioning state of managed instance. */
  readonly provisioningState?: ProvisioningState;
  /**
   * Specifies the mode of database creation.
   *
   * Default: Regular instance creation.
   *
   * Restore: Creates an instance by restoring a set of backups to specific point in time. RestorePointInTime and SourceManagedInstanceId must be specified.
   */
  managedInstanceCreateMode?: ManagedServerCreateMode;
  /** The fully qualified domain name of the managed instance. */
  readonly fullyQualifiedDomainName?: string;
  /** Whether or not this is a GPv2 variant of General Purpose edition. */
  isGeneralPurposeV2?: boolean;
  /** Administrator username for the managed instance. Can only be specified when the managed instance is being created (and is required for creation). */
  administratorLogin?: string;
  /** The administrator login password (required for managed instance creation). */
  administratorLoginPassword?: string;
  /** Subnet resource ID for the managed instance. */
  subnetId?: string;
  /** The state of the managed instance. */
  readonly state?: string;
  /** The license type. Possible values are 'LicenseIncluded' (regular price inclusive of a new SQL license) and 'BasePrice' (discounted AHB price for bringing your own SQL licenses). */
  licenseType?: ManagedInstanceLicenseType;
  /** Hybrid secondary usage. Possible values are 'Active' (default value) and 'Passive' (customer uses the secondary as Passive DR). */
  hybridSecondaryUsage?: HybridSecondaryUsage;
  /** Hybrid secondary usage detected. Possible values are 'Active' (customer does not meet the requirements to use the secondary as Passive DR) and 'Passive' (customer meets the requirements to use the secondary as Passive DR). */
  readonly hybridSecondaryUsageDetected?: HybridSecondaryUsageDetected;
  /** The number of vCores. Allowed values: 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128. Supported vCores depends on the selected hardware family and service tier. */
  vCores?: number;
  /** Storage size in GB. Minimum value: 32. Maximum value: 32768. Increments of 32 GB allowed only. Maximum value depends on the selected hardware family and number of vCores. */
  storageSizeInGB?: number;
  /** Storage IOps. Minimum value: 300. Maximum value: 80000. Increments of 1 IOps allowed only. Maximum value depends on the selected hardware family and number of vCores. */
  storageIOps?: number;
  /** Storage throughput MBps parameter is not supported in the instance create/update operation. */
  storageThroughputMBps?: number;
  /** Memory size in GB. Minimum value: 28. Maximum value: 870. Minimum and maximum value depend on the number of vCores and service tier. Read more about resource limits: https://aka.ms/mi-resource-limits-api. */
  memorySizeInGB?: number;
  /** Collation of the managed instance. */
  collation?: string;
  /** The Dns Zone that the managed instance is in. */
  readonly dnsZone?: string;
  /** The resource id of another managed instance whose DNS zone this managed instance will share after creation. */
  dnsZonePartner?: string;
  /** Whether or not the public data endpoint is enabled. */
  publicDataEndpointEnabled?: boolean;
  /** The resource identifier of the source managed instance associated with create operation of this instance. */
  sourceManagedInstanceId?: string;
  /** Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database. */
  restorePointInTime?: Date;
  /** Connection type used for connecting to the instance. */
  proxyOverride?: ManagedInstanceProxyOverride;
  /**
   * Id of the timezone. Allowed values are timezones supported by Windows.
   * Windows keeps details on supported timezones, including the id, in registry under
   * KEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones.
   * You can get those registry values via SQL Server by querying SELECT name AS timezone_id FROM sys.time_zone_info.
   * List of Ids can also be obtained by executing [System.TimeZoneInfo]::GetSystemTimeZones() in PowerShell.
   * An example of valid timezone id is "Pacific Standard Time" or "W. Europe Standard Time".
   */
  timezoneId?: string;
  /** The Id of the instance pool this managed server belongs to. */
  instancePoolId?: string;
  /** Specifies maintenance configuration id to apply to this managed instance. */
  maintenanceConfigurationId?: string;
  /** List of private endpoint connections on a managed instance. */
  readonly privateEndpointConnections?: ManagedInstancePecProperty[];
  /** Minimal TLS version. Allowed values: 'None', '1.0', '1.1', '1.2' */
  minimalTlsVersion?: string;
  /** The storage account type used to store backups for this instance. The options are Local (LocallyRedundantStorage), Zone (ZoneRedundantStorage), Geo (GeoRedundantStorage) and GeoZone(GeoZoneRedundantStorage) */
  readonly currentBackupStorageRedundancy?: BackupStorageRedundancy;
  /** The storage account type to be used to store backups for this instance. The options are Local (LocallyRedundantStorage), Zone (ZoneRedundantStorage), Geo (GeoRedundantStorage) and GeoZone(GeoZoneRedundantStorage) */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /** Whether or not the zone-redundancy is enabled. */
  zoneRedundant?: boolean;
  /** The resource id of a user assigned identity to be used by default. */
  primaryUserAssignedIdentityId?: string;
  /** A CMK URI of the key to use for encryption. */
  keyId?: string;
  /** The Azure Active Directory administrator can be utilized during instance creation and for instance updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used. */
  administrators?: ManagedInstanceExternalAdministrator;
  /** The managed instance's service principal. */
  servicePrincipal?: ServicePrincipal;
  /** Virtual cluster resource id for the Managed Instance. */
  readonly virtualClusterId?: string;
  /** Status of external governance. */
  readonly externalGovernanceStatus?: ExternalGovernanceStatus;
  /** Pricing model of Managed Instance. */
  pricingModel?: PricingModel;
  /** Specifies the point in time (ISO8601 format) of the Managed Instance creation. */
  readonly createTime?: Date;
  /** The managed instance's authentication metadata lookup mode. */
  authenticationMetadata?: AuthMetadataLookupModes;
  /** Specifies the internal format of instance databases specific to the SQL engine version. */
  databaseFormat?: ManagedInstanceDatabaseFormat;
  /** Specifies the logical availability zone Managed Instance is pinned to. */
  requestedLogicalAvailabilityZone?: AvailabilityZoneType;
}

export function managedInstanceSerializer(item: ManagedInstance): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "managedInstanceCreateMode",
      "isGeneralPurposeV2",
      "administratorLogin",
      "administratorLoginPassword",
      "subnetId",
      "licenseType",
      "hybridSecondaryUsage",
      "vCores",
      "storageSizeInGB",
      "storageIOps",
      "storageThroughputMBps",
      "memorySizeInGB",
      "collation",
      "dnsZonePartner",
      "publicDataEndpointEnabled",
      "sourceManagedInstanceId",
      "restorePointInTime",
      "proxyOverride",
      "timezoneId",
      "instancePoolId",
      "maintenanceConfigurationId",
      "minimalTlsVersion",
      "requestedBackupStorageRedundancy",
      "zoneRedundant",
      "primaryUserAssignedIdentityId",
      "keyId",
      "administrators",
      "servicePrincipal",
      "pricingModel",
      "authenticationMetadata",
      "databaseFormat",
      "requestedLogicalAvailabilityZone",
    ])
      ? undefined
      : _managedInstancePropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function managedInstanceDeserializer(item: any): ManagedInstance {
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
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstancePropertiesDeserializer(item["properties"])),
    identity: !item["identity"] ? item["identity"] : resourceIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** The properties of a managed instance. */
export interface ManagedInstanceProperties {
  /** Provisioning state of managed instance. */
  readonly provisioningState?: ProvisioningState;
  /**
   * Specifies the mode of database creation.
   *
   * Default: Regular instance creation.
   *
   * Restore: Creates an instance by restoring a set of backups to specific point in time. RestorePointInTime and SourceManagedInstanceId must be specified.
   */
  managedInstanceCreateMode?: ManagedServerCreateMode;
  /** The fully qualified domain name of the managed instance. */
  readonly fullyQualifiedDomainName?: string;
  /** Whether or not this is a GPv2 variant of General Purpose edition. */
  isGeneralPurposeV2?: boolean;
  /** Administrator username for the managed instance. Can only be specified when the managed instance is being created (and is required for creation). */
  administratorLogin?: string;
  /** The administrator login password (required for managed instance creation). */
  administratorLoginPassword?: string;
  /** Subnet resource ID for the managed instance. */
  subnetId?: string;
  /** The state of the managed instance. */
  readonly state?: string;
  /** The license type. Possible values are 'LicenseIncluded' (regular price inclusive of a new SQL license) and 'BasePrice' (discounted AHB price for bringing your own SQL licenses). */
  licenseType?: ManagedInstanceLicenseType;
  /** Hybrid secondary usage. Possible values are 'Active' (default value) and 'Passive' (customer uses the secondary as Passive DR). */
  hybridSecondaryUsage?: HybridSecondaryUsage;
  /** Hybrid secondary usage detected. Possible values are 'Active' (customer does not meet the requirements to use the secondary as Passive DR) and 'Passive' (customer meets the requirements to use the secondary as Passive DR). */
  readonly hybridSecondaryUsageDetected?: HybridSecondaryUsageDetected;
  /** The number of vCores. Allowed values: 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128. Supported vCores depends on the selected hardware family and service tier. */
  vCores?: number;
  /** Storage size in GB. Minimum value: 32. Maximum value: 32768. Increments of 32 GB allowed only. Maximum value depends on the selected hardware family and number of vCores. */
  storageSizeInGB?: number;
  /** Storage IOps. Minimum value: 300. Maximum value: 80000. Increments of 1 IOps allowed only. Maximum value depends on the selected hardware family and number of vCores. */
  storageIOps?: number;
  /** Storage throughput MBps parameter is not supported in the instance create/update operation. */
  storageThroughputMBps?: number;
  /** Memory size in GB. Minimum value: 28. Maximum value: 870. Minimum and maximum value depend on the number of vCores and service tier. Read more about resource limits: https://aka.ms/mi-resource-limits-api. */
  memorySizeInGB?: number;
  /** Collation of the managed instance. */
  collation?: string;
  /** The Dns Zone that the managed instance is in. */
  readonly dnsZone?: string;
  /** The resource id of another managed instance whose DNS zone this managed instance will share after creation. */
  dnsZonePartner?: string;
  /** Whether or not the public data endpoint is enabled. */
  publicDataEndpointEnabled?: boolean;
  /** The resource identifier of the source managed instance associated with create operation of this instance. */
  sourceManagedInstanceId?: string;
  /** Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database. */
  restorePointInTime?: Date;
  /** Connection type used for connecting to the instance. */
  proxyOverride?: ManagedInstanceProxyOverride;
  /**
   * Id of the timezone. Allowed values are timezones supported by Windows.
   * Windows keeps details on supported timezones, including the id, in registry under
   * KEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones.
   * You can get those registry values via SQL Server by querying SELECT name AS timezone_id FROM sys.time_zone_info.
   * List of Ids can also be obtained by executing [System.TimeZoneInfo]::GetSystemTimeZones() in PowerShell.
   * An example of valid timezone id is "Pacific Standard Time" or "W. Europe Standard Time".
   */
  timezoneId?: string;
  /** The Id of the instance pool this managed server belongs to. */
  instancePoolId?: string;
  /** Specifies maintenance configuration id to apply to this managed instance. */
  maintenanceConfigurationId?: string;
  /** List of private endpoint connections on a managed instance. */
  readonly privateEndpointConnections?: ManagedInstancePecProperty[];
  /** Minimal TLS version. Allowed values: 'None', '1.0', '1.1', '1.2' */
  minimalTlsVersion?: string;
  /** The storage account type used to store backups for this instance. The options are Local (LocallyRedundantStorage), Zone (ZoneRedundantStorage), Geo (GeoRedundantStorage) and GeoZone(GeoZoneRedundantStorage) */
  readonly currentBackupStorageRedundancy?: BackupStorageRedundancy;
  /** The storage account type to be used to store backups for this instance. The options are Local (LocallyRedundantStorage), Zone (ZoneRedundantStorage), Geo (GeoRedundantStorage) and GeoZone(GeoZoneRedundantStorage) */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /** Whether or not the zone-redundancy is enabled. */
  zoneRedundant?: boolean;
  /** The resource id of a user assigned identity to be used by default. */
  primaryUserAssignedIdentityId?: string;
  /** A CMK URI of the key to use for encryption. */
  keyId?: string;
  /** The Azure Active Directory administrator can be utilized during instance creation and for instance updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used. */
  administrators?: ManagedInstanceExternalAdministrator;
  /** The managed instance's service principal. */
  servicePrincipal?: ServicePrincipal;
  /** Virtual cluster resource id for the Managed Instance. */
  readonly virtualClusterId?: string;
  /** Status of external governance. */
  readonly externalGovernanceStatus?: ExternalGovernanceStatus;
  /** Pricing model of Managed Instance. */
  pricingModel?: PricingModel;
  /** Specifies the point in time (ISO8601 format) of the Managed Instance creation. */
  readonly createTime?: Date;
  /** The managed instance's authentication metadata lookup mode. */
  authenticationMetadata?: AuthMetadataLookupModes;
  /** Specifies the internal format of instance databases specific to the SQL engine version. */
  databaseFormat?: ManagedInstanceDatabaseFormat;
  /** Specifies the logical availability zone Managed Instance is pinned to. */
  requestedLogicalAvailabilityZone?: AvailabilityZoneType;
}

export function managedInstancePropertiesSerializer(item: ManagedInstanceProperties): any {
  return {
    managedInstanceCreateMode: item["managedInstanceCreateMode"],
    isGeneralPurposeV2: item["isGeneralPurposeV2"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    subnetId: item["subnetId"],
    licenseType: item["licenseType"],
    hybridSecondaryUsage: item["hybridSecondaryUsage"],
    vCores: item["vCores"],
    storageSizeInGB: item["storageSizeInGB"],
    storageIOps: item["storageIOps"],
    storageThroughputMBps: item["storageThroughputMBps"],
    memorySizeInGB: item["memorySizeInGB"],
    collation: item["collation"],
    dnsZonePartner: item["dnsZonePartner"],
    publicDataEndpointEnabled: item["publicDataEndpointEnabled"],
    sourceManagedInstanceId: item["sourceManagedInstanceId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    proxyOverride: item["proxyOverride"],
    timezoneId: item["timezoneId"],
    instancePoolId: item["instancePoolId"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    minimalTlsVersion: item["minimalTlsVersion"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    zoneRedundant: item["zoneRedundant"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : managedInstanceExternalAdministratorSerializer(item["administrators"]),
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalSerializer(item["servicePrincipal"]),
    pricingModel: item["pricingModel"],
    authenticationMetadata: item["authenticationMetadata"],
    databaseFormat: item["databaseFormat"],
    requestedLogicalAvailabilityZone: item["requestedLogicalAvailabilityZone"],
  };
}

export function managedInstancePropertiesDeserializer(item: any): ManagedInstanceProperties {
  return {
    provisioningState: item["provisioningState"],
    managedInstanceCreateMode: item["managedInstanceCreateMode"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    isGeneralPurposeV2: item["isGeneralPurposeV2"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    subnetId: item["subnetId"],
    state: item["state"],
    licenseType: item["licenseType"],
    hybridSecondaryUsage: item["hybridSecondaryUsage"],
    hybridSecondaryUsageDetected: item["hybridSecondaryUsageDetected"],
    vCores: item["vCores"],
    storageSizeInGB: item["storageSizeInGB"],
    storageIOps: item["storageIOps"],
    storageThroughputMBps: item["storageThroughputMBps"],
    memorySizeInGB: item["memorySizeInGB"],
    collation: item["collation"],
    dnsZone: item["dnsZone"],
    dnsZonePartner: item["dnsZonePartner"],
    publicDataEndpointEnabled: item["publicDataEndpointEnabled"],
    sourceManagedInstanceId: item["sourceManagedInstanceId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : new Date(item["restorePointInTime"]),
    proxyOverride: item["proxyOverride"],
    timezoneId: item["timezoneId"],
    instancePoolId: item["instancePoolId"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : managedInstancePecPropertyArrayDeserializer(item["privateEndpointConnections"]),
    minimalTlsVersion: item["minimalTlsVersion"],
    currentBackupStorageRedundancy: item["currentBackupStorageRedundancy"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    zoneRedundant: item["zoneRedundant"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : managedInstanceExternalAdministratorDeserializer(item["administrators"]),
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalDeserializer(item["servicePrincipal"]),
    virtualClusterId: item["virtualClusterId"],
    externalGovernanceStatus: item["externalGovernanceStatus"],
    pricingModel: item["pricingModel"],
    createTime: !item["createTime"] ? item["createTime"] : new Date(item["createTime"]),
    authenticationMetadata: item["authenticationMetadata"],
    databaseFormat: item["databaseFormat"],
    requestedLogicalAvailabilityZone: item["requestedLogicalAvailabilityZone"],
  };
}

/** The ARM provisioning state of the job execution. */
export enum KnownProvisioningState {
  /** Created */
  Created = "Created",
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The ARM provisioning state of the job execution. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created**: Created \
 * **InProgress**: InProgress \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled
 */
export type ProvisioningState = string;

/**
 * Specifies the mode of database creation.
 *
 * Default: Regular instance creation.
 *
 * Restore: Creates an instance by restoring a set of backups to specific point in time. RestorePointInTime and SourceManagedInstanceId must be specified.
 */
export enum KnownManagedServerCreateMode {
  /** Default */
  Default = "Default",
  /** PointInTimeRestore */
  PointInTimeRestore = "PointInTimeRestore",
}

/**
 * Specifies the mode of database creation.
 *
 * Default: Regular instance creation.
 *
 * Restore: Creates an instance by restoring a set of backups to specific point in time. RestorePointInTime and SourceManagedInstanceId must be specified. \
 * {@link KnownManagedServerCreateMode} can be used interchangeably with ManagedServerCreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default \
 * **PointInTimeRestore**: PointInTimeRestore
 */
export type ManagedServerCreateMode = string;

/** The license type. Possible values are 'LicenseIncluded' (regular price inclusive of a new SQL license) and 'BasePrice' (discounted AHB price for bringing your own SQL licenses). */
export enum KnownManagedInstanceLicenseType {
  /** LicenseIncluded */
  LicenseIncluded = "LicenseIncluded",
  /** BasePrice */
  BasePrice = "BasePrice",
}

/**
 * The license type. Possible values are 'LicenseIncluded' (regular price inclusive of a new SQL license) and 'BasePrice' (discounted AHB price for bringing your own SQL licenses). \
 * {@link KnownManagedInstanceLicenseType} can be used interchangeably with ManagedInstanceLicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LicenseIncluded**: LicenseIncluded \
 * **BasePrice**: BasePrice
 */
export type ManagedInstanceLicenseType = string;

/** Hybrid secondary usage. Possible values are 'Active' (default value) and 'Passive' (customer uses the secondary as Passive DR). */
export enum KnownHybridSecondaryUsage {
  /** Active */
  Active = "Active",
  /** Passive */
  Passive = "Passive",
}

/**
 * Hybrid secondary usage. Possible values are 'Active' (default value) and 'Passive' (customer uses the secondary as Passive DR). \
 * {@link KnownHybridSecondaryUsage} can be used interchangeably with HybridSecondaryUsage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active \
 * **Passive**: Passive
 */
export type HybridSecondaryUsage = string;

/** Hybrid secondary usage detected. Possible values are 'Active' (customer does not meet the requirements to use the secondary as Passive DR) and 'Passive' (customer meets the requirements to use the secondary as Passive DR). */
export enum KnownHybridSecondaryUsageDetected {
  /** Active */
  Active = "Active",
  /** Passive */
  Passive = "Passive",
}

/**
 * Hybrid secondary usage detected. Possible values are 'Active' (customer does not meet the requirements to use the secondary as Passive DR) and 'Passive' (customer meets the requirements to use the secondary as Passive DR). \
 * {@link KnownHybridSecondaryUsageDetected} can be used interchangeably with HybridSecondaryUsageDetected,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active \
 * **Passive**: Passive
 */
export type HybridSecondaryUsageDetected = string;

/** Connection type used for connecting to the instance. */
export enum KnownManagedInstanceProxyOverride {
  /** Proxy */
  Proxy = "Proxy",
  /** Redirect */
  Redirect = "Redirect",
  /** Default */
  Default = "Default",
}

/**
 * Connection type used for connecting to the instance. \
 * {@link KnownManagedInstanceProxyOverride} can be used interchangeably with ManagedInstanceProxyOverride,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Proxy**: Proxy \
 * **Redirect**: Redirect \
 * **Default**: Default
 */
export type ManagedInstanceProxyOverride = string;

export function managedInstancePecPropertyArrayDeserializer(
  result: Array<ManagedInstancePecProperty>,
): any[] {
  return result.map((item) => {
    return managedInstancePecPropertyDeserializer(item);
  });
}

/** A private endpoint connection under a managed instance */
export interface ManagedInstancePecProperty {
  /** Resource ID. */
  readonly id?: string;
  /** Private endpoint connection properties */
  readonly properties?: ManagedInstancePrivateEndpointConnectionProperties;
}

export function managedInstancePecPropertyDeserializer(item: any): ManagedInstancePecProperty {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : managedInstancePrivateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private endpoint connection. */
export interface ManagedInstancePrivateEndpointConnectionProperties {
  /** Private endpoint which the connection belongs to. */
  privateEndpoint?: ManagedInstancePrivateEndpointProperty;
  /** Connection State of the Private Endpoint Connection. */
  privateLinkServiceConnectionState?: ManagedInstancePrivateLinkServiceConnectionStateProperty;
  /** State of the Private Endpoint Connection. */
  readonly provisioningState?: string;
}

export function managedInstancePrivateEndpointConnectionPropertiesSerializer(
  item: ManagedInstancePrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : managedInstancePrivateEndpointPropertySerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : managedInstancePrivateLinkServiceConnectionStatePropertySerializer(
          item["privateLinkServiceConnectionState"],
        ),
  };
}

export function managedInstancePrivateEndpointConnectionPropertiesDeserializer(
  item: any,
): ManagedInstancePrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : managedInstancePrivateEndpointPropertyDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : managedInstancePrivateLinkServiceConnectionStatePropertyDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
    provisioningState: item["provisioningState"],
  };
}

/** model interface ManagedInstancePrivateEndpointProperty */
export interface ManagedInstancePrivateEndpointProperty {
  /** Resource id of the private endpoint. */
  id?: string;
}

export function managedInstancePrivateEndpointPropertySerializer(
  item: ManagedInstancePrivateEndpointProperty,
): any {
  return { id: item["id"] };
}

export function managedInstancePrivateEndpointPropertyDeserializer(
  item: any,
): ManagedInstancePrivateEndpointProperty {
  return {
    id: item["id"],
  };
}

/** model interface ManagedInstancePrivateLinkServiceConnectionStateProperty */
export interface ManagedInstancePrivateLinkServiceConnectionStateProperty {
  /** The private link service connection status. */
  status: string;
  /** The private link service connection description. */
  description: string;
  /** The private link service connection description. */
  readonly actionsRequired?: string;
}

export function managedInstancePrivateLinkServiceConnectionStatePropertySerializer(
  item: ManagedInstancePrivateLinkServiceConnectionStateProperty,
): any {
  return { status: item["status"], description: item["description"] };
}

export function managedInstancePrivateLinkServiceConnectionStatePropertyDeserializer(
  item: any,
): ManagedInstancePrivateLinkServiceConnectionStateProperty {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** Properties of a active directory administrator. */
export interface ManagedInstanceExternalAdministrator {
  /** Type of the sever administrator. */
  administratorType?: AdministratorType;
  /** Principal Type of the sever administrator. */
  principalType?: PrincipalType;
  /** Login name of the server administrator. */
  login?: string;
  /** SID (object ID) of the server administrator. */
  sid?: string;
  /** Tenant ID of the administrator. */
  tenantId?: string;
  /** Azure Active Directory only Authentication enabled. */
  azureADOnlyAuthentication?: boolean;
}

export function managedInstanceExternalAdministratorSerializer(
  item: ManagedInstanceExternalAdministrator,
): any {
  return {
    administratorType: item["administratorType"],
    principalType: item["principalType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
    azureADOnlyAuthentication: item["azureADOnlyAuthentication"],
  };
}

export function managedInstanceExternalAdministratorDeserializer(
  item: any,
): ManagedInstanceExternalAdministrator {
  return {
    administratorType: item["administratorType"],
    principalType: item["principalType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
    azureADOnlyAuthentication: item["azureADOnlyAuthentication"],
  };
}

/** The managed instance's service principal configuration for a resource. */
export interface ServicePrincipal {
  /** The Azure Active Directory application object id. */
  readonly principalId?: string;
  /** The Azure Active Directory application client id. */
  readonly clientId?: string;
  /** The Azure Active Directory tenant id. */
  readonly tenantId?: string;
  /** Service principal type. */
  type?: ServicePrincipalType;
}

export function servicePrincipalSerializer(item: ServicePrincipal): any {
  return { type: item["type"] };
}

export function servicePrincipalDeserializer(item: any): ServicePrincipal {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** Service principal type. */
export enum KnownServicePrincipalType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
}

/**
 * Service principal type. \
 * {@link KnownServicePrincipalType} can be used interchangeably with ServicePrincipalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **SystemAssigned**: SystemAssigned
 */
export type ServicePrincipalType = string;

/** Pricing model of Managed Instance. */
export enum KnownPricingModel {
  /** Regular */
  Regular = "Regular",
  /** Freemium */
  Freemium = "Freemium",
}

/**
 * Pricing model of Managed Instance. \
 * {@link KnownPricingModel} can be used interchangeably with PricingModel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular**: Regular \
 * **Freemium**: Freemium
 */
export type PricingModel = string;

/** The managed instance's authentication metadata lookup mode. */
export enum KnownAuthMetadataLookupModes {
  /** AzureAD */
  AzureAD = "AzureAD",
  /** Paired */
  Paired = "Paired",
  /** Windows */
  Windows = "Windows",
}

/**
 * The managed instance's authentication metadata lookup mode. \
 * {@link KnownAuthMetadataLookupModes} can be used interchangeably with AuthMetadataLookupModes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureAD**: AzureAD \
 * **Paired**: Paired \
 * **Windows**: Windows
 */
export type AuthMetadataLookupModes = string;

/** Specifies the internal format of instance databases specific to the SQL engine version. */
export enum KnownManagedInstanceDatabaseFormat {
  /** AlwaysUpToDate */
  AlwaysUpToDate = "AlwaysUpToDate",
  /** SQLServer2022 */
  SQLServer2022 = "SQLServer2022",
  /** SQLServer2025 */
  SQLServer2025 = "SQLServer2025",
}

/**
 * Specifies the internal format of instance databases specific to the SQL engine version. \
 * {@link KnownManagedInstanceDatabaseFormat} can be used interchangeably with ManagedInstanceDatabaseFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AlwaysUpToDate**: AlwaysUpToDate \
 * **SQLServer2022**: SQLServer2022 \
 * **SQLServer2025**: SQLServer2025
 */
export type ManagedInstanceDatabaseFormat = string;

/** An update request for an Azure SQL Database managed instance. */
export interface ManagedInstanceUpdate {
  /** Managed instance sku */
  sku?: Sku;
  /** Managed instance identity */
  identity?: ResourceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Provisioning state of managed instance. */
  readonly provisioningState?: ProvisioningState;
  /**
   * Specifies the mode of database creation.
   *
   * Default: Regular instance creation.
   *
   * Restore: Creates an instance by restoring a set of backups to specific point in time. RestorePointInTime and SourceManagedInstanceId must be specified.
   */
  managedInstanceCreateMode?: ManagedServerCreateMode;
  /** The fully qualified domain name of the managed instance. */
  readonly fullyQualifiedDomainName?: string;
  /** Whether or not this is a GPv2 variant of General Purpose edition. */
  isGeneralPurposeV2?: boolean;
  /** Administrator username for the managed instance. Can only be specified when the managed instance is being created (and is required for creation). */
  administratorLogin?: string;
  /** The administrator login password (required for managed instance creation). */
  administratorLoginPassword?: string;
  /** Subnet resource ID for the managed instance. */
  subnetId?: string;
  /** The state of the managed instance. */
  readonly state?: string;
  /** The license type. Possible values are 'LicenseIncluded' (regular price inclusive of a new SQL license) and 'BasePrice' (discounted AHB price for bringing your own SQL licenses). */
  licenseType?: ManagedInstanceLicenseType;
  /** Hybrid secondary usage. Possible values are 'Active' (default value) and 'Passive' (customer uses the secondary as Passive DR). */
  hybridSecondaryUsage?: HybridSecondaryUsage;
  /** Hybrid secondary usage detected. Possible values are 'Active' (customer does not meet the requirements to use the secondary as Passive DR) and 'Passive' (customer meets the requirements to use the secondary as Passive DR). */
  readonly hybridSecondaryUsageDetected?: HybridSecondaryUsageDetected;
  /** The number of vCores. Allowed values: 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128. Supported vCores depends on the selected hardware family and service tier. */
  vCores?: number;
  /** Storage size in GB. Minimum value: 32. Maximum value: 32768. Increments of 32 GB allowed only. Maximum value depends on the selected hardware family and number of vCores. */
  storageSizeInGB?: number;
  /** Storage IOps. Minimum value: 300. Maximum value: 80000. Increments of 1 IOps allowed only. Maximum value depends on the selected hardware family and number of vCores. */
  storageIOps?: number;
  /** Storage throughput MBps parameter is not supported in the instance create/update operation. */
  storageThroughputMBps?: number;
  /** Memory size in GB. Minimum value: 28. Maximum value: 870. Minimum and maximum value depend on the number of vCores and service tier. Read more about resource limits: https://aka.ms/mi-resource-limits-api. */
  memorySizeInGB?: number;
  /** Collation of the managed instance. */
  collation?: string;
  /** The Dns Zone that the managed instance is in. */
  readonly dnsZone?: string;
  /** The resource id of another managed instance whose DNS zone this managed instance will share after creation. */
  dnsZonePartner?: string;
  /** Whether or not the public data endpoint is enabled. */
  publicDataEndpointEnabled?: boolean;
  /** The resource identifier of the source managed instance associated with create operation of this instance. */
  sourceManagedInstanceId?: string;
  /** Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database. */
  restorePointInTime?: Date;
  /** Connection type used for connecting to the instance. */
  proxyOverride?: ManagedInstanceProxyOverride;
  /**
   * Id of the timezone. Allowed values are timezones supported by Windows.
   * Windows keeps details on supported timezones, including the id, in registry under
   * KEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones.
   * You can get those registry values via SQL Server by querying SELECT name AS timezone_id FROM sys.time_zone_info.
   * List of Ids can also be obtained by executing [System.TimeZoneInfo]::GetSystemTimeZones() in PowerShell.
   * An example of valid timezone id is "Pacific Standard Time" or "W. Europe Standard Time".
   */
  timezoneId?: string;
  /** The Id of the instance pool this managed server belongs to. */
  instancePoolId?: string;
  /** Specifies maintenance configuration id to apply to this managed instance. */
  maintenanceConfigurationId?: string;
  /** List of private endpoint connections on a managed instance. */
  readonly privateEndpointConnections?: ManagedInstancePecProperty[];
  /** Minimal TLS version. Allowed values: 'None', '1.0', '1.1', '1.2' */
  minimalTlsVersion?: string;
  /** The storage account type used to store backups for this instance. The options are Local (LocallyRedundantStorage), Zone (ZoneRedundantStorage), Geo (GeoRedundantStorage) and GeoZone(GeoZoneRedundantStorage) */
  readonly currentBackupStorageRedundancy?: BackupStorageRedundancy;
  /** The storage account type to be used to store backups for this instance. The options are Local (LocallyRedundantStorage), Zone (ZoneRedundantStorage), Geo (GeoRedundantStorage) and GeoZone(GeoZoneRedundantStorage) */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /** Whether or not the zone-redundancy is enabled. */
  zoneRedundant?: boolean;
  /** The resource id of a user assigned identity to be used by default. */
  primaryUserAssignedIdentityId?: string;
  /** A CMK URI of the key to use for encryption. */
  keyId?: string;
  /** The Azure Active Directory administrator can be utilized during instance creation and for instance updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used. */
  administrators?: ManagedInstanceExternalAdministrator;
  /** The managed instance's service principal. */
  servicePrincipal?: ServicePrincipal;
  /** Virtual cluster resource id for the Managed Instance. */
  readonly virtualClusterId?: string;
  /** Status of external governance. */
  readonly externalGovernanceStatus?: ExternalGovernanceStatus;
  /** Pricing model of Managed Instance. */
  pricingModel?: PricingModel;
  /** Specifies the point in time (ISO8601 format) of the Managed Instance creation. */
  readonly createTime?: Date;
  /** The managed instance's authentication metadata lookup mode. */
  authenticationMetadata?: AuthMetadataLookupModes;
  /** Specifies the internal format of instance databases specific to the SQL engine version. */
  databaseFormat?: ManagedInstanceDatabaseFormat;
  /** Specifies the logical availability zone Managed Instance is pinned to. */
  requestedLogicalAvailabilityZone?: AvailabilityZoneType;
}

export function managedInstanceUpdateSerializer(item: ManagedInstanceUpdate): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "managedInstanceCreateMode",
      "isGeneralPurposeV2",
      "administratorLogin",
      "administratorLoginPassword",
      "subnetId",
      "licenseType",
      "hybridSecondaryUsage",
      "vCores",
      "storageSizeInGB",
      "storageIOps",
      "storageThroughputMBps",
      "memorySizeInGB",
      "collation",
      "dnsZonePartner",
      "publicDataEndpointEnabled",
      "sourceManagedInstanceId",
      "restorePointInTime",
      "proxyOverride",
      "timezoneId",
      "instancePoolId",
      "maintenanceConfigurationId",
      "minimalTlsVersion",
      "requestedBackupStorageRedundancy",
      "zoneRedundant",
      "primaryUserAssignedIdentityId",
      "keyId",
      "administrators",
      "servicePrincipal",
      "pricingModel",
      "authenticationMetadata",
      "databaseFormat",
      "requestedLogicalAvailabilityZone",
    ])
      ? undefined
      : _managedInstanceUpdatePropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** The response of a ManagedInstance list operation. */
export interface _ManagedInstanceListResult {
  /** The ManagedInstance items on this page */
  value: ManagedInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstanceListResultDeserializer(item: any): _ManagedInstanceListResult {
  return {
    value: managedInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstanceArraySerializer(result: Array<ManagedInstance>): any[] {
  return result.map((item) => {
    return managedInstanceSerializer(item);
  });
}

export function managedInstanceArrayDeserializer(result: Array<ManagedInstance>): any[] {
  return result.map((item) => {
    return managedInstanceDeserializer(item);
  });
}

/** A collection of endpoints that the managed instance service requires outbound network access to. */
export interface _OutboundEnvironmentEndpointCollection {
  /** The OutboundEnvironmentEndpoint items on this page */
  value: OutboundEnvironmentEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _outboundEnvironmentEndpointCollectionDeserializer(
  item: any,
): _OutboundEnvironmentEndpointCollection {
  return {
    value: outboundEnvironmentEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function outboundEnvironmentEndpointArrayDeserializer(
  result: Array<OutboundEnvironmentEndpoint>,
): any[] {
  return result.map((item) => {
    return outboundEnvironmentEndpointDeserializer(item);
  });
}

/** An endpoint that the managed instance service requires outbound network access to. */
export interface OutboundEnvironmentEndpoint {
  /** The type of service accessed by the managed instance service, e.g., Azure Storage, Azure Active Directory, etc. */
  readonly category?: string;
  /** The endpoints that the managed instance service communicates with in order to function correctly. */
  readonly endpoints?: EndpointDependency[];
}

export function outboundEnvironmentEndpointDeserializer(item: any): OutboundEnvironmentEndpoint {
  return {
    category: item["category"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointDependencyArrayDeserializer(item["endpoints"]),
  };
}

export function endpointDependencyArrayDeserializer(result: Array<EndpointDependency>): any[] {
  return result.map((item) => {
    return endpointDependencyDeserializer(item);
  });
}

/** A domain name that the managed instance service needs to communicate with, along with additional details. */
export interface EndpointDependency {
  /** The domain name of the dependency. */
  readonly domainName?: string;
  /** The IP Addresses and Ports used when connecting to DomainName. */
  readonly endpointDetails?: EndpointDetail[];
}

export function endpointDependencyDeserializer(item: any): EndpointDependency {
  return {
    domainName: item["domainName"],
    endpointDetails: !item["endpointDetails"]
      ? item["endpointDetails"]
      : endpointDetailArrayDeserializer(item["endpointDetails"]),
  };
}

export function endpointDetailArrayDeserializer(result: Array<EndpointDetail>): any[] {
  return result.map((item) => {
    return endpointDetailDeserializer(item);
  });
}

/** A domain name that the managed instance service needs to communicate with, along with additional details. */
export interface EndpointDetail {
  /** The port an endpoint is connected to. */
  readonly port?: number;
}

export function endpointDetailDeserializer(item: any): EndpointDetail {
  return {
    port: item["port"],
  };
}

/** An RefreshExternalGovernanceStatus operation result resource. */
export interface RefreshExternalGovernanceStatusOperationResultMI extends ProxyResourceAutoGenerated {
  /** Request Id. */
  readonly requestId?: string;
  /** Request type. */
  readonly requestType?: string;
  /** Queued time. */
  readonly queuedTime?: string;
  /** Managed instance name. */
  readonly managedInstanceName?: string;
  /** Operation status. */
  readonly status?: string;
  /** Error message. */
  readonly errorMessage?: string;
}

export function refreshExternalGovernanceStatusOperationResultMIDeserializer(
  item: any,
): RefreshExternalGovernanceStatusOperationResultMI {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _refreshExternalGovernanceStatusOperationResultMIPropertiesDeserializer(
          item["properties"],
        )),
  };
}

/** Contains the operation result properties for refresh external governance status operation. */
export interface RefreshExternalGovernanceStatusOperationResultPropertiesMI {
  /** Request Id. */
  readonly requestId?: string;
  /** Request type. */
  readonly requestType?: string;
  /** Queued time. */
  readonly queuedTime?: string;
  /** Managed instance name. */
  readonly managedInstanceName?: string;
  /** Operation status. */
  readonly status?: string;
  /** Error message. */
  readonly errorMessage?: string;
}

export function refreshExternalGovernanceStatusOperationResultPropertiesMIDeserializer(
  item: any,
): RefreshExternalGovernanceStatusOperationResultPropertiesMI {
  return {
    requestId: item["requestId"],
    requestType: item["requestType"],
    queuedTime: item["queuedTime"],
    managedInstanceName: item["managedInstanceName"],
    status: item["status"],
    errorMessage: item["errorMessage"],
  };
}

/** A list of top resource consuming queries on managed instance */
export interface _TopQueriesListResult {
  /** The TopQueries items on this page */
  value: TopQueries[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _topQueriesListResultDeserializer(item: any): _TopQueriesListResult {
  return {
    value: topQueriesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function topQueriesArrayDeserializer(result: Array<TopQueries>): any[] {
  return result.map((item) => {
    return topQueriesDeserializer(item);
  });
}

/** model interface TopQueries */
export interface TopQueries {
  /** Requested number of top queries. */
  readonly numberOfQueries?: number;
  /** Aggregation function used to calculate query metrics. */
  readonly aggregationFunction?: string;
  /** Metric used to rank queries. */
  readonly observationMetric?: string;
  /** Interval type (length). */
  readonly intervalType?: QueryTimeGrainType;
  /** The start time for the metric (ISO-8601 format). */
  readonly startTime?: string;
  /** The end time for the metric (ISO-8601 format). */
  readonly endTime?: string;
  /** List of top resource consuming queries with appropriate metric data */
  queries?: QueryStatisticsProperties[];
}

export function topQueriesDeserializer(item: any): TopQueries {
  return {
    numberOfQueries: item["numberOfQueries"],
    aggregationFunction: item["aggregationFunction"],
    observationMetric: item["observationMetric"],
    intervalType: item["intervalType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    queries: !item["queries"]
      ? item["queries"]
      : queryStatisticsPropertiesArrayDeserializer(item["queries"]),
  };
}

/** Interval type (length). */
export enum KnownQueryTimeGrainType {
  /** PT1H */
  PT1H = "PT1H",
  /** P1D */
  P1D = "P1D",
}

/**
 * Interval type (length). \
 * {@link KnownQueryTimeGrainType} can be used interchangeably with QueryTimeGrainType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PT1H**: PT1H \
 * **P1D**: P1D
 */
export type QueryTimeGrainType = string;

export function queryStatisticsPropertiesArrayDeserializer(
  result: Array<QueryStatisticsProperties>,
): any[] {
  return result.map((item) => {
    return queryStatisticsPropertiesDeserializer(item);
  });
}

/** Properties of a query execution statistics. */
export interface QueryStatisticsProperties {
  /** Database name of the database in which this query was executed. */
  readonly databaseName?: string;
  /** Unique query id (unique within one database). */
  readonly queryId?: string;
  /** The start time for the metric (ISO-8601 format). */
  readonly startTime?: string;
  /** The end time for the metric (ISO-8601 format). */
  readonly endTime?: string;
  /** List of intervals with appropriate metric data */
  intervals?: QueryMetricInterval[];
}

export function queryStatisticsPropertiesDeserializer(item: any): QueryStatisticsProperties {
  return {
    databaseName: item["databaseName"],
    queryId: item["queryId"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    intervals: !item["intervals"]
      ? item["intervals"]
      : queryMetricIntervalArrayDeserializer(item["intervals"]),
  };
}

export function queryMetricIntervalArrayDeserializer(result: Array<QueryMetricInterval>): any[] {
  return result.map((item) => {
    return queryMetricIntervalDeserializer(item);
  });
}

/** Properties of a query metrics interval. */
export interface QueryMetricInterval {
  /** The start time for the metric interval (ISO-8601 format). */
  readonly intervalStartTime?: string;
  /** Interval type (length). */
  readonly intervalType?: QueryTimeGrainType;
  /** Execution count of a query in this interval. */
  readonly executionCount?: number;
  /** List of metric objects for this interval */
  metrics?: QueryMetricProperties[];
}

export function queryMetricIntervalDeserializer(item: any): QueryMetricInterval {
  return {
    intervalStartTime: item["intervalStartTime"],
    intervalType: item["intervalType"],
    executionCount: item["executionCount"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : queryMetricPropertiesArrayDeserializer(item["metrics"]),
  };
}

export function queryMetricPropertiesArrayDeserializer(
  result: Array<QueryMetricProperties>,
): any[] {
  return result.map((item) => {
    return queryMetricPropertiesDeserializer(item);
  });
}

/** Properties of a topquery metric in one interval. */
export interface QueryMetricProperties {
  /** The name information for the metric. */
  readonly name?: string;
  /** The UI appropriate name for the metric. */
  readonly displayName?: string;
  /** The unit of the metric. */
  readonly unit?: QueryMetricUnitType;
  /** The value of the metric. */
  readonly value?: number;
  /** Metric value when min() aggregate function is used over the interval. */
  readonly min?: number;
  /** Metric value when max() aggregate function is used over the interval. */
  readonly max?: number;
  /** Metric value when avg() aggregate function is used over the interval. */
  readonly avg?: number;
  /** Metric value when sum() aggregate function is used over the interval. */
  readonly sum?: number;
  /** Metric value when stdev aggregate function is used over the interval. */
  readonly stdev?: number;
}

export function queryMetricPropertiesDeserializer(item: any): QueryMetricProperties {
  return {
    name: item["name"],
    displayName: item["displayName"],
    unit: item["unit"],
    value: item["value"],
    min: item["min"],
    max: item["max"],
    avg: item["avg"],
    sum: item["sum"],
    stdev: item["stdev"],
  };
}

/** The unit of the metric. */
export enum KnownQueryMetricUnitType {
  /** percentage */
  Percentage = "percentage",
  /** KB */
  KB = "KB",
  /** microseconds */
  Microseconds = "microseconds",
  /** count */
  Count = "count",
}

/**
 * The unit of the metric. \
 * {@link KnownQueryMetricUnitType} can be used interchangeably with QueryMetricUnitType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **percentage**: percentage \
 * **KB**: KB \
 * **microseconds**: microseconds \
 * **count**: count
 */
export type QueryMetricUnitType = string;

/** Validate azure key vault encryption key. */
export interface ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest {
  /** The URI of the key. */
  tdeKeyUri: string;
}

export function managedInstanceValidateAzureKeyVaultEncryptionKeyRequestSerializer(
  item: ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest,
): any {
  return { tdeKeyUri: item["tdeKeyUri"] };
}

/** An elastic pool. */
export interface ElasticPool extends TrackedResource {
  /**
   * The elastic pool SKU.
   *
   * The list of SKUs may vary by region and support offer. To determine the SKUs (including the SKU name, tier/edition, family, and capacity) that are available to your subscription in an Azure region, use the `Capabilities_ListByLocation` REST API or the following command:
   *
   * ```azurecli
   * az sql elastic-pool list-editions -l <location> -o table
   * ```
   */
  sku?: Sku;
  /** Kind of elastic pool. This is metadata used for the Azure portal experience. */
  readonly kind?: string;
  /** The state of the elastic pool. */
  readonly state?: ElasticPoolState;
  /** The creation date of the elastic pool (ISO8601 format). */
  readonly creationDate?: Date;
  /** The storage limit for the database elastic pool in bytes. */
  maxSizeBytes?: number;
  /** Minimal capacity that serverless pool will not shrink below, if not paused */
  minCapacity?: number;
  /** The per database settings for the elastic pool. */
  perDatabaseSettings?: ElasticPoolPerDatabaseSettings;
  /** Whether or not this elastic pool is zone redundant, which means the replicas of this elastic pool will be spread across multiple availability zones. */
  zoneRedundant?: boolean;
  /** The license type to apply for this elastic pool. */
  licenseType?: ElasticPoolLicenseType;
  /** Maintenance configuration id assigned to the elastic pool. This configuration defines the period when the maintenance updates will will occur. */
  maintenanceConfigurationId?: string;
  /** The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition elastic pool that are used to provide high availability. Applicable only to Hyperscale elastic pools. */
  highAvailabilityReplicaCount?: number;
  /** Time in minutes after which elastic pool is automatically paused. A value of -1 means that automatic pause is disabled */
  autoPauseDelay?: number;
  /** Type of enclave requested on the elastic pool. */
  preferredEnclaveType?: AlwaysEncryptedEnclaveType;
  /** Specifies the availability zone the pool's primary replica is pinned to. */
  availabilityZone?: AvailabilityZoneType;
  /** The name and tier of the current SKU. */
  readonly currentSku?: Sku;
}

export function elasticPoolSerializer(item: ElasticPool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "maxSizeBytes",
      "minCapacity",
      "perDatabaseSettings",
      "zoneRedundant",
      "licenseType",
      "maintenanceConfigurationId",
      "highAvailabilityReplicaCount",
      "autoPauseDelay",
      "preferredEnclaveType",
      "availabilityZone",
    ])
      ? undefined
      : _elasticPoolPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function elasticPoolDeserializer(item: any): ElasticPool {
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
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _elasticPoolPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    kind: item["kind"],
  };
}

/** Properties of an elastic pool */
export interface ElasticPoolProperties {
  /** The state of the elastic pool. */
  readonly state?: ElasticPoolState;
  /** The creation date of the elastic pool (ISO8601 format). */
  readonly creationDate?: Date;
  /** The storage limit for the database elastic pool in bytes. */
  maxSizeBytes?: number;
  /** Minimal capacity that serverless pool will not shrink below, if not paused */
  minCapacity?: number;
  /** The per database settings for the elastic pool. */
  perDatabaseSettings?: ElasticPoolPerDatabaseSettings;
  /** Whether or not this elastic pool is zone redundant, which means the replicas of this elastic pool will be spread across multiple availability zones. */
  zoneRedundant?: boolean;
  /** The license type to apply for this elastic pool. */
  licenseType?: ElasticPoolLicenseType;
  /** Maintenance configuration id assigned to the elastic pool. This configuration defines the period when the maintenance updates will will occur. */
  maintenanceConfigurationId?: string;
  /** The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition elastic pool that are used to provide high availability. Applicable only to Hyperscale elastic pools. */
  highAvailabilityReplicaCount?: number;
  /** Time in minutes after which elastic pool is automatically paused. A value of -1 means that automatic pause is disabled */
  autoPauseDelay?: number;
  /** Type of enclave requested on the elastic pool. */
  preferredEnclaveType?: AlwaysEncryptedEnclaveType;
  /** Specifies the availability zone the pool's primary replica is pinned to. */
  availabilityZone?: AvailabilityZoneType;
  /** The name and tier of the current SKU. */
  readonly currentSku?: Sku;
}

export function elasticPoolPropertiesSerializer(item: ElasticPoolProperties): any {
  return {
    maxSizeBytes: item["maxSizeBytes"],
    minCapacity: item["minCapacity"],
    perDatabaseSettings: !item["perDatabaseSettings"]
      ? item["perDatabaseSettings"]
      : elasticPoolPerDatabaseSettingsSerializer(item["perDatabaseSettings"]),
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    autoPauseDelay: item["autoPauseDelay"],
    preferredEnclaveType: item["preferredEnclaveType"],
    availabilityZone: item["availabilityZone"],
  };
}

export function elasticPoolPropertiesDeserializer(item: any): ElasticPoolProperties {
  return {
    state: item["state"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    maxSizeBytes: item["maxSizeBytes"],
    minCapacity: item["minCapacity"],
    perDatabaseSettings: !item["perDatabaseSettings"]
      ? item["perDatabaseSettings"]
      : elasticPoolPerDatabaseSettingsDeserializer(item["perDatabaseSettings"]),
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    autoPauseDelay: item["autoPauseDelay"],
    preferredEnclaveType: item["preferredEnclaveType"],
    availabilityZone: item["availabilityZone"],
    currentSku: !item["currentSku"] ? item["currentSku"] : skuDeserializer(item["currentSku"]),
  };
}

/** The state of the elastic pool. */
export enum KnownElasticPoolState {
  /** Creating */
  Creating = "Creating",
  /** Ready */
  Ready = "Ready",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The state of the elastic pool. \
 * {@link KnownElasticPoolState} can be used interchangeably with ElasticPoolState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Ready**: Ready \
 * **Disabled**: Disabled
 */
export type ElasticPoolState = string;

/** Per database settings of an elastic pool. */
export interface ElasticPoolPerDatabaseSettings {
  /** The minimum capacity all databases are guaranteed. */
  minCapacity?: number;
  /** The maximum capacity any one database can consume. */
  maxCapacity?: number;
  /** Auto Pause Delay for per database within pool */
  autoPauseDelay?: number;
}

export function elasticPoolPerDatabaseSettingsSerializer(
  item: ElasticPoolPerDatabaseSettings,
): any {
  return {
    minCapacity: item["minCapacity"],
    maxCapacity: item["maxCapacity"],
    autoPauseDelay: item["autoPauseDelay"],
  };
}

export function elasticPoolPerDatabaseSettingsDeserializer(
  item: any,
): ElasticPoolPerDatabaseSettings {
  return {
    minCapacity: item["minCapacity"],
    maxCapacity: item["maxCapacity"],
    autoPauseDelay: item["autoPauseDelay"],
  };
}

/** The license type to apply for this elastic pool. */
export enum KnownElasticPoolLicenseType {
  /** LicenseIncluded */
  LicenseIncluded = "LicenseIncluded",
  /** BasePrice */
  BasePrice = "BasePrice",
}

/**
 * The license type to apply for this elastic pool. \
 * {@link KnownElasticPoolLicenseType} can be used interchangeably with ElasticPoolLicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LicenseIncluded**: LicenseIncluded \
 * **BasePrice**: BasePrice
 */
export type ElasticPoolLicenseType = string;

/** An elastic pool update. */
export interface ElasticPoolUpdate {
  /** An ARM Resource SKU. */
  sku?: Sku;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The storage limit for the database elastic pool in bytes. */
  maxSizeBytes?: number;
  /** Minimal capacity that serverless pool will not shrink below, if not paused */
  minCapacity?: number;
  /** The per database settings for the elastic pool. */
  perDatabaseSettings?: ElasticPoolPerDatabaseSettings;
  /** Whether or not this elastic pool is zone redundant, which means the replicas of this elastic pool will be spread across multiple availability zones. */
  zoneRedundant?: boolean;
  /** The license type to apply for this elastic pool. */
  licenseType?: ElasticPoolLicenseType;
  /** Maintenance configuration id assigned to the elastic pool. This configuration defines the period when the maintenance updates will will occur. */
  maintenanceConfigurationId?: string;
  /** The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition elastic pool that are used to provide high availability. Applicable only to Hyperscale elastic pools. */
  highAvailabilityReplicaCount?: number;
  /** Time in minutes after which elastic pool is automatically paused. A value of -1 means that automatic pause is disabled */
  autoPauseDelay?: number;
  /** Type of enclave requested on the elastic pool. */
  preferredEnclaveType?: AlwaysEncryptedEnclaveType;
  /** Specifies the availability zone the pool's primary replica is pinned to. */
  availabilityZone?: AvailabilityZoneType;
  /** The name and tier of the current SKU. */
  readonly currentSku?: Sku;
}

export function elasticPoolUpdateSerializer(item: ElasticPoolUpdate): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    properties: areAllPropsUndefined(item, [
      "maxSizeBytes",
      "minCapacity",
      "perDatabaseSettings",
      "zoneRedundant",
      "licenseType",
      "maintenanceConfigurationId",
      "highAvailabilityReplicaCount",
      "autoPauseDelay",
      "preferredEnclaveType",
      "availabilityZone",
    ])
      ? undefined
      : _elasticPoolUpdatePropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Properties of an elastic pool */
export interface ElasticPoolUpdateProperties {
  /** The storage limit for the database elastic pool in bytes. */
  maxSizeBytes?: number;
  /** Minimal capacity that serverless pool will not shrink below, if not paused */
  minCapacity?: number;
  /** The per database settings for the elastic pool. */
  perDatabaseSettings?: ElasticPoolPerDatabaseSettings;
  /** Whether or not this elastic pool is zone redundant, which means the replicas of this elastic pool will be spread across multiple availability zones. */
  zoneRedundant?: boolean;
  /** The license type to apply for this elastic pool. */
  licenseType?: ElasticPoolLicenseType;
  /** Maintenance configuration id assigned to the elastic pool. This configuration defines the period when the maintenance updates will will occur. */
  maintenanceConfigurationId?: string;
  /** The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition elastic pool that are used to provide high availability. Applicable only to Hyperscale elastic pools. */
  highAvailabilityReplicaCount?: number;
  /** Time in minutes after which elastic pool is automatically paused. A value of -1 means that automatic pause is disabled */
  autoPauseDelay?: number;
  /** Type of enclave requested on the elastic pool. */
  preferredEnclaveType?: AlwaysEncryptedEnclaveType;
  /** Specifies the availability zone the pool's primary replica is pinned to. */
  availabilityZone?: AvailabilityZoneType;
  /** The name and tier of the current SKU. */
  readonly currentSku?: Sku;
}

export function elasticPoolUpdatePropertiesSerializer(item: ElasticPoolUpdateProperties): any {
  return {
    maxSizeBytes: item["maxSizeBytes"],
    minCapacity: item["minCapacity"],
    perDatabaseSettings: !item["perDatabaseSettings"]
      ? item["perDatabaseSettings"]
      : elasticPoolPerDatabaseSettingsSerializer(item["perDatabaseSettings"]),
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    autoPauseDelay: item["autoPauseDelay"],
    preferredEnclaveType: item["preferredEnclaveType"],
    availabilityZone: item["availabilityZone"],
  };
}

/** The response of a ElasticPool list operation. */
export interface _ElasticPoolListResult {
  /** The ElasticPool items on this page */
  value: ElasticPool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _elasticPoolListResultDeserializer(item: any): _ElasticPoolListResult {
  return {
    value: elasticPoolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function elasticPoolArraySerializer(result: Array<ElasticPool>): any[] {
  return result.map((item) => {
    return elasticPoolSerializer(item);
  });
}

export function elasticPoolArrayDeserializer(result: Array<ElasticPool>): any[] {
  return result.map((item) => {
    return elasticPoolDeserializer(item);
  });
}

/** The server encryption protector. */
export interface EncryptionProtector extends ProxyResource {
  /** Kind of encryption protector. This is metadata used for the Azure portal experience. */
  readonly kind?: string;
  /** Resource location. */
  readonly location?: string;
  /** Subregion of the encryption protector. */
  readonly subregion?: string;
  /** The name of the server key. */
  serverKeyName?: string;
  /** The encryption protector type like 'ServiceManaged', 'AzureKeyVault'. */
  serverKeyType?: ServerKeyType;
  /** The URI of the server key. */
  readonly uri?: string;
  /** Thumbprint of the server key. */
  readonly thumbprint?: string;
  /** Key auto rotation opt-in flag. Either true or false. */
  autoRotationEnabled?: boolean;
  /** The version of the server key being used as encryption protector */
  readonly keyVersion?: string;
}

export function encryptionProtectorSerializer(item: EncryptionProtector): any {
  return {
    properties: areAllPropsUndefined(item, [
      "serverKeyName",
      "serverKeyType",
      "autoRotationEnabled",
    ])
      ? undefined
      : _encryptionProtectorPropertiesSerializer(item),
  };
}

export function encryptionProtectorDeserializer(item: any): EncryptionProtector {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _encryptionProtectorPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    location: item["location"],
  };
}

/** Properties for an encryption protector execution. */
export interface EncryptionProtectorProperties {
  /** Subregion of the encryption protector. */
  readonly subregion?: string;
  /** The name of the server key. */
  serverKeyName?: string;
  /** The encryption protector type like 'ServiceManaged', 'AzureKeyVault'. */
  serverKeyType: ServerKeyType;
  /** The URI of the server key. */
  readonly uri?: string;
  /** Thumbprint of the server key. */
  readonly thumbprint?: string;
  /** Key auto rotation opt-in flag. Either true or false. */
  autoRotationEnabled?: boolean;
  /** The version of the server key being used as encryption protector */
  readonly keyVersion?: string;
}

export function encryptionProtectorPropertiesSerializer(item: EncryptionProtectorProperties): any {
  return {
    serverKeyName: item["serverKeyName"],
    serverKeyType: item["serverKeyType"],
    autoRotationEnabled: item["autoRotationEnabled"],
  };
}

export function encryptionProtectorPropertiesDeserializer(
  item: any,
): EncryptionProtectorProperties {
  return {
    subregion: item["subregion"],
    serverKeyName: item["serverKeyName"],
    serverKeyType: item["serverKeyType"],
    uri: item["uri"],
    thumbprint: item["thumbprint"],
    autoRotationEnabled: item["autoRotationEnabled"],
    keyVersion: item["keyVersion"],
  };
}

/** The encryption protector type like 'ServiceManaged', 'AzureKeyVault'. */
export enum KnownServerKeyType {
  /** ServiceManaged */
  ServiceManaged = "ServiceManaged",
  /** AzureKeyVault */
  AzureKeyVault = "AzureKeyVault",
}

/**
 * The encryption protector type like 'ServiceManaged', 'AzureKeyVault'. \
 * {@link KnownServerKeyType} can be used interchangeably with ServerKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceManaged**: ServiceManaged \
 * **AzureKeyVault**: AzureKeyVault
 */
export type ServerKeyType = string;

/** Known values of {@link EncryptionProtectorName} that the service accepts. */
export enum KnownEncryptionProtectorName {
  /** current */
  Current = "current",
}

/** Type of EncryptionProtectorName */
export type EncryptionProtectorName = string;

/** The response of a EncryptionProtector list operation. */
export interface _EncryptionProtectorListResult {
  /** The EncryptionProtector items on this page */
  value: EncryptionProtector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _encryptionProtectorListResultDeserializer(
  item: any,
): _EncryptionProtectorListResult {
  return {
    value: encryptionProtectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function encryptionProtectorArraySerializer(result: Array<EncryptionProtector>): any[] {
  return result.map((item) => {
    return encryptionProtectorSerializer(item);
  });
}

export function encryptionProtectorArrayDeserializer(result: Array<EncryptionProtector>): any[] {
  return result.map((item) => {
    return encryptionProtectorDeserializer(item);
  });
}

/** Certificate used on an endpoint on the Managed Instance. */
export interface EndpointCertificate extends ProxyResource {
  /** The certificate public blob */
  publicBlob?: string;
}

export function endpointCertificateDeserializer(item: any): EndpointCertificate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _endpointCertificatePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of an endpoint certificate. */
export interface EndpointCertificateProperties {
  /** The certificate public blob */
  publicBlob?: string;
}

export function endpointCertificatePropertiesDeserializer(
  item: any,
): EndpointCertificateProperties {
  return {
    publicBlob: item["publicBlob"],
  };
}

/** The response of a EndpointCertificate list operation. */
export interface _EndpointCertificateListResult {
  /** The EndpointCertificate items on this page */
  value: EndpointCertificate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _endpointCertificateListResultDeserializer(
  item: any,
): _EndpointCertificateListResult {
  return {
    value: endpointCertificateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function endpointCertificateArrayDeserializer(result: Array<EndpointCertificate>): any[] {
  return result.map((item) => {
    return endpointCertificateDeserializer(item);
  });
}

/** A failover group. */
export interface FailoverGroup extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Resource location. */
  readonly location?: string;
  /** Read-write endpoint of the failover group instance. */
  readWriteEndpoint?: FailoverGroupReadWriteEndpoint;
  /** Read-only endpoint of the failover group instance. */
  readOnlyEndpoint?: FailoverGroupReadOnlyEndpoint;
  /** Local replication role of the failover group instance. */
  readonly replicationRole?: FailoverGroupReplicationRole;
  /** Replication state of the failover group instance. */
  readonly replicationState?: string;
  /** List of partner server information for the failover group. */
  partnerServers?: PartnerInfo[];
  /** List of databases in the failover group. */
  databases?: string[];
  /** Databases secondary type on partner server. */
  secondaryType?: FailoverGroupDatabasesSecondaryType;
}

export function failoverGroupSerializer(item: FailoverGroup): any {
  return {
    properties: areAllPropsUndefined(item, [
      "readWriteEndpoint",
      "readOnlyEndpoint",
      "partnerServers",
      "databases",
      "secondaryType",
    ])
      ? undefined
      : _failoverGroupPropertiesSerializer(item),
    tags: item["tags"],
  };
}

export function failoverGroupDeserializer(item: any): FailoverGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _failoverGroupPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Properties of a failover group. */
export interface FailoverGroupProperties {
  /** Read-write endpoint of the failover group instance. */
  readWriteEndpoint: FailoverGroupReadWriteEndpoint;
  /** Read-only endpoint of the failover group instance. */
  readOnlyEndpoint?: FailoverGroupReadOnlyEndpoint;
  /** Local replication role of the failover group instance. */
  readonly replicationRole?: FailoverGroupReplicationRole;
  /** Replication state of the failover group instance. */
  readonly replicationState?: string;
  /** List of partner server information for the failover group. */
  partnerServers: PartnerInfo[];
  /** List of databases in the failover group. */
  databases?: string[];
  /** Databases secondary type on partner server. */
  secondaryType?: FailoverGroupDatabasesSecondaryType;
}

export function failoverGroupPropertiesSerializer(item: FailoverGroupProperties): any {
  return {
    readWriteEndpoint: failoverGroupReadWriteEndpointSerializer(item["readWriteEndpoint"]),
    readOnlyEndpoint: !item["readOnlyEndpoint"]
      ? item["readOnlyEndpoint"]
      : failoverGroupReadOnlyEndpointSerializer(item["readOnlyEndpoint"]),
    partnerServers: partnerInfoArraySerializer(item["partnerServers"]),
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    secondaryType: item["secondaryType"],
  };
}

export function failoverGroupPropertiesDeserializer(item: any): FailoverGroupProperties {
  return {
    readWriteEndpoint: failoverGroupReadWriteEndpointDeserializer(item["readWriteEndpoint"]),
    readOnlyEndpoint: !item["readOnlyEndpoint"]
      ? item["readOnlyEndpoint"]
      : failoverGroupReadOnlyEndpointDeserializer(item["readOnlyEndpoint"]),
    replicationRole: item["replicationRole"],
    replicationState: item["replicationState"],
    partnerServers: partnerInfoArrayDeserializer(item["partnerServers"]),
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    secondaryType: item["secondaryType"],
  };
}

/** Read-write endpoint of the failover group instance. */
export interface FailoverGroupReadWriteEndpoint {
  /** Failover policy of the read-write endpoint for the failover group. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required. */
  failoverPolicy: ReadWriteEndpointFailoverPolicy;
  /** Grace period before failover with data loss is attempted for the read-write endpoint. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required. */
  failoverWithDataLossGracePeriodMinutes?: number;
}

export function failoverGroupReadWriteEndpointSerializer(
  item: FailoverGroupReadWriteEndpoint,
): any {
  return {
    failoverPolicy: item["failoverPolicy"],
    failoverWithDataLossGracePeriodMinutes: item["failoverWithDataLossGracePeriodMinutes"],
  };
}

export function failoverGroupReadWriteEndpointDeserializer(
  item: any,
): FailoverGroupReadWriteEndpoint {
  return {
    failoverPolicy: item["failoverPolicy"],
    failoverWithDataLossGracePeriodMinutes: item["failoverWithDataLossGracePeriodMinutes"],
  };
}

/** Failover policy of the read-write endpoint for the failover group. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required. */
export enum KnownReadWriteEndpointFailoverPolicy {
  /** Manual */
  Manual = "Manual",
  /** Automatic */
  Automatic = "Automatic",
}

/**
 * Failover policy of the read-write endpoint for the failover group. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required. \
 * {@link KnownReadWriteEndpointFailoverPolicy} can be used interchangeably with ReadWriteEndpointFailoverPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual**: Manual \
 * **Automatic**: Automatic
 */
export type ReadWriteEndpointFailoverPolicy = string;

/** Read-only endpoint of the failover group instance. */
export interface FailoverGroupReadOnlyEndpoint {
  /** Failover policy of the read-only endpoint for the failover group. */
  failoverPolicy?: ReadOnlyEndpointFailoverPolicy;
  /** The target partner server where the read-only endpoint points to. */
  targetServer?: string;
}

export function failoverGroupReadOnlyEndpointSerializer(item: FailoverGroupReadOnlyEndpoint): any {
  return { failoverPolicy: item["failoverPolicy"], targetServer: item["targetServer"] };
}

export function failoverGroupReadOnlyEndpointDeserializer(
  item: any,
): FailoverGroupReadOnlyEndpoint {
  return {
    failoverPolicy: item["failoverPolicy"],
    targetServer: item["targetServer"],
  };
}

/** Failover policy of the read-only endpoint for the failover group. */
export enum KnownReadOnlyEndpointFailoverPolicy {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Failover policy of the read-only endpoint for the failover group. \
 * {@link KnownReadOnlyEndpointFailoverPolicy} can be used interchangeably with ReadOnlyEndpointFailoverPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type ReadOnlyEndpointFailoverPolicy = string;

/** Local replication role of the failover group instance. */
export enum KnownFailoverGroupReplicationRole {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
}

/**
 * Local replication role of the failover group instance. \
 * {@link KnownFailoverGroupReplicationRole} can be used interchangeably with FailoverGroupReplicationRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary \
 * **Secondary**: Secondary
 */
export type FailoverGroupReplicationRole = string;

export function partnerInfoArraySerializer(result: Array<PartnerInfo>): any[] {
  return result.map((item) => {
    return partnerInfoSerializer(item);
  });
}

export function partnerInfoArrayDeserializer(result: Array<PartnerInfo>): any[] {
  return result.map((item) => {
    return partnerInfoDeserializer(item);
  });
}

/** Partner server information for the failover group. */
export interface PartnerInfo {
  /** Resource identifier of the partner server. */
  id: string;
  /** Geo location of the partner server. */
  readonly location?: string;
  /** Replication role of the partner server. */
  readonly replicationRole?: FailoverGroupReplicationRole;
}

export function partnerInfoSerializer(item: PartnerInfo): any {
  return { id: item["id"] };
}

export function partnerInfoDeserializer(item: any): PartnerInfo {
  return {
    id: item["id"],
    location: item["location"],
    replicationRole: item["replicationRole"],
  };
}

/** Databases secondary type on partner server. */
export enum KnownFailoverGroupDatabasesSecondaryType {
  /** Geo */
  Geo = "Geo",
  /** Standby */
  Standby = "Standby",
}

/**
 * Databases secondary type on partner server. \
 * {@link KnownFailoverGroupDatabasesSecondaryType} can be used interchangeably with FailoverGroupDatabasesSecondaryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Geo**: Geo \
 * **Standby**: Standby
 */
export type FailoverGroupDatabasesSecondaryType = string;

/** A failover group update request. */
export interface FailoverGroupUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Read-write endpoint of the failover group instance. */
  readWriteEndpoint?: FailoverGroupReadWriteEndpoint;
  /** Read-only endpoint of the failover group instance. */
  readOnlyEndpoint?: FailoverGroupReadOnlyEndpoint;
  /** List of databases in the failover group. */
  databases?: string[];
  /** List of partner server information for the failover group. */
  partnerServers?: PartnerInfo[];
  /** Databases secondary type on partner server. */
  secondaryType?: FailoverGroupDatabasesSecondaryType;
}

export function failoverGroupUpdateSerializer(item: FailoverGroupUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "readWriteEndpoint",
      "readOnlyEndpoint",
      "databases",
      "partnerServers",
      "secondaryType",
    ])
      ? undefined
      : _failoverGroupUpdatePropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Properties of a failover group update. */
export interface FailoverGroupUpdateProperties {
  /** Read-write endpoint of the failover group instance. */
  readWriteEndpoint?: FailoverGroupReadWriteEndpoint;
  /** Read-only endpoint of the failover group instance. */
  readOnlyEndpoint?: FailoverGroupReadOnlyEndpoint;
  /** List of databases in the failover group. */
  databases?: string[];
  /** List of partner server information for the failover group. */
  partnerServers?: PartnerInfo[];
  /** Databases secondary type on partner server. */
  secondaryType?: FailoverGroupDatabasesSecondaryType;
}

export function failoverGroupUpdatePropertiesSerializer(item: FailoverGroupUpdateProperties): any {
  return {
    readWriteEndpoint: !item["readWriteEndpoint"]
      ? item["readWriteEndpoint"]
      : failoverGroupReadWriteEndpointSerializer(item["readWriteEndpoint"]),
    readOnlyEndpoint: !item["readOnlyEndpoint"]
      ? item["readOnlyEndpoint"]
      : failoverGroupReadOnlyEndpointSerializer(item["readOnlyEndpoint"]),
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    partnerServers: !item["partnerServers"]
      ? item["partnerServers"]
      : partnerInfoArraySerializer(item["partnerServers"]),
    secondaryType: item["secondaryType"],
  };
}

/** The response of a FailoverGroup list operation. */
export interface _FailoverGroupListResult {
  /** The FailoverGroup items on this page */
  value: FailoverGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _failoverGroupListResultDeserializer(item: any): _FailoverGroupListResult {
  return {
    value: failoverGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function failoverGroupArraySerializer(result: Array<FailoverGroup>): any[] {
  return result.map((item) => {
    return failoverGroupSerializer(item);
  });
}

export function failoverGroupArrayDeserializer(result: Array<FailoverGroup>): any[] {
  return result.map((item) => {
    return failoverGroupDeserializer(item);
  });
}

/** A Geo backup policy. */
export interface GeoBackupPolicy extends ProxyResource {
  /** Backup policy location. */
  readonly location?: string;
  /** Kind of geo backup policy.  This is metadata used for the Azure portal experience. */
  readonly kind?: string;
  /** The state of the geo backup policy. */
  state?: GeoBackupPolicyState;
  /** The storage type of the geo backup policy. */
  readonly storageType?: string;
}

export function geoBackupPolicySerializer(item: GeoBackupPolicy): any {
  return {
    properties: areAllPropsUndefined(item, ["state"])
      ? undefined
      : _geoBackupPolicyPropertiesSerializer(item),
  };
}

export function geoBackupPolicyDeserializer(item: any): GeoBackupPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _geoBackupPolicyPropertiesDeserializer(item["properties"])),
    location: item["location"],
    kind: item["kind"],
  };
}

/** The properties of the geo backup policy. */
export interface GeoBackupPolicyProperties {
  /** The state of the geo backup policy. */
  state: GeoBackupPolicyState;
  /** The storage type of the geo backup policy. */
  readonly storageType?: string;
}

export function geoBackupPolicyPropertiesSerializer(item: GeoBackupPolicyProperties): any {
  return { state: item["state"] };
}

export function geoBackupPolicyPropertiesDeserializer(item: any): GeoBackupPolicyProperties {
  return {
    state: item["state"],
    storageType: item["storageType"],
  };
}

/** The state of the geo backup policy. */
export type GeoBackupPolicyState = "Enabled" | "Disabled";

/** Known values of {@link GeoBackupPolicyName} that the service accepts. */
export enum KnownGeoBackupPolicyName {
  /** Default */
  Default = "Default",
}

/** Type of GeoBackupPolicyName */
export type GeoBackupPolicyName = string;

/** The response of a GeoBackupPolicy list operation. */
export interface _GeoBackupPolicyListResult {
  /** The GeoBackupPolicy items on this page */
  value: GeoBackupPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _geoBackupPolicyListResultDeserializer(item: any): _GeoBackupPolicyListResult {
  return {
    value: geoBackupPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function geoBackupPolicyArraySerializer(result: Array<GeoBackupPolicy>): any[] {
  return result.map((item) => {
    return geoBackupPolicySerializer(item);
  });
}

export function geoBackupPolicyArrayDeserializer(result: Array<GeoBackupPolicy>): any[] {
  return result.map((item) => {
    return geoBackupPolicyDeserializer(item);
  });
}

/** An instance failover group. */
export interface InstanceFailoverGroup extends ProxyResource {
  /** Type of the geo-secondary instance. Set 'Standby' if the instance is used as a DR option only. */
  secondaryType?: SecondaryInstanceType;
  /** Read-write endpoint of the failover group instance. */
  readWriteEndpoint?: InstanceFailoverGroupReadWriteEndpoint;
  /** Read-only endpoint of the failover group instance. */
  readOnlyEndpoint?: InstanceFailoverGroupReadOnlyEndpoint;
  /** Local replication role of the failover group instance. */
  readonly replicationRole?: InstanceFailoverGroupReplicationRole;
  /** Replication state of the failover group instance. */
  readonly replicationState?: string;
  /** Partner region information for the failover group. */
  partnerRegions?: PartnerRegionInfo[];
  /** List of managed instance pairs in the failover group. */
  managedInstancePairs?: ManagedInstancePairInfo[];
}

export function instanceFailoverGroupSerializer(item: InstanceFailoverGroup): any {
  return {
    properties: areAllPropsUndefined(item, [
      "secondaryType",
      "readWriteEndpoint",
      "readOnlyEndpoint",
      "partnerRegions",
      "managedInstancePairs",
    ])
      ? undefined
      : _instanceFailoverGroupPropertiesSerializer(item),
  };
}

export function instanceFailoverGroupDeserializer(item: any): InstanceFailoverGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _instanceFailoverGroupPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a instance failover group. */
export interface InstanceFailoverGroupProperties {
  /** Type of the geo-secondary instance. Set 'Standby' if the instance is used as a DR option only. */
  secondaryType?: SecondaryInstanceType;
  /** Read-write endpoint of the failover group instance. */
  readWriteEndpoint: InstanceFailoverGroupReadWriteEndpoint;
  /** Read-only endpoint of the failover group instance. */
  readOnlyEndpoint?: InstanceFailoverGroupReadOnlyEndpoint;
  /** Local replication role of the failover group instance. */
  readonly replicationRole?: InstanceFailoverGroupReplicationRole;
  /** Replication state of the failover group instance. */
  readonly replicationState?: string;
  /** Partner region information for the failover group. */
  partnerRegions: PartnerRegionInfo[];
  /** List of managed instance pairs in the failover group. */
  managedInstancePairs: ManagedInstancePairInfo[];
}

export function instanceFailoverGroupPropertiesSerializer(
  item: InstanceFailoverGroupProperties,
): any {
  return {
    secondaryType: item["secondaryType"],
    readWriteEndpoint: instanceFailoverGroupReadWriteEndpointSerializer(item["readWriteEndpoint"]),
    readOnlyEndpoint: !item["readOnlyEndpoint"]
      ? item["readOnlyEndpoint"]
      : instanceFailoverGroupReadOnlyEndpointSerializer(item["readOnlyEndpoint"]),
    partnerRegions: partnerRegionInfoArraySerializer(item["partnerRegions"]),
    managedInstancePairs: managedInstancePairInfoArraySerializer(item["managedInstancePairs"]),
  };
}

export function instanceFailoverGroupPropertiesDeserializer(
  item: any,
): InstanceFailoverGroupProperties {
  return {
    secondaryType: item["secondaryType"],
    readWriteEndpoint: instanceFailoverGroupReadWriteEndpointDeserializer(
      item["readWriteEndpoint"],
    ),
    readOnlyEndpoint: !item["readOnlyEndpoint"]
      ? item["readOnlyEndpoint"]
      : instanceFailoverGroupReadOnlyEndpointDeserializer(item["readOnlyEndpoint"]),
    replicationRole: item["replicationRole"],
    replicationState: item["replicationState"],
    partnerRegions: partnerRegionInfoArrayDeserializer(item["partnerRegions"]),
    managedInstancePairs: managedInstancePairInfoArrayDeserializer(item["managedInstancePairs"]),
  };
}

/** Type of the geo-secondary instance. Set 'Standby' if the instance is used as a DR option only. */
export enum KnownSecondaryInstanceType {
  /** Geo */
  Geo = "Geo",
  /** Standby */
  Standby = "Standby",
}

/**
 * Type of the geo-secondary instance. Set 'Standby' if the instance is used as a DR option only. \
 * {@link KnownSecondaryInstanceType} can be used interchangeably with SecondaryInstanceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Geo**: Geo \
 * **Standby**: Standby
 */
export type SecondaryInstanceType = string;

/** Read-write endpoint of the failover group instance. */
export interface InstanceFailoverGroupReadWriteEndpoint {
  /** Failover policy of the read-write endpoint for the failover group. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required. */
  failoverPolicy: ReadWriteEndpointFailoverPolicy;
  /** Grace period before failover with data loss is attempted for the read-write endpoint. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required. */
  failoverWithDataLossGracePeriodMinutes?: number;
}

export function instanceFailoverGroupReadWriteEndpointSerializer(
  item: InstanceFailoverGroupReadWriteEndpoint,
): any {
  return {
    failoverPolicy: item["failoverPolicy"],
    failoverWithDataLossGracePeriodMinutes: item["failoverWithDataLossGracePeriodMinutes"],
  };
}

export function instanceFailoverGroupReadWriteEndpointDeserializer(
  item: any,
): InstanceFailoverGroupReadWriteEndpoint {
  return {
    failoverPolicy: item["failoverPolicy"],
    failoverWithDataLossGracePeriodMinutes: item["failoverWithDataLossGracePeriodMinutes"],
  };
}

/** Read-only endpoint of the failover group instance. */
export interface InstanceFailoverGroupReadOnlyEndpoint {
  /** Failover policy of the read-only endpoint for the failover group. */
  failoverPolicy?: ReadOnlyEndpointFailoverPolicy;
}

export function instanceFailoverGroupReadOnlyEndpointSerializer(
  item: InstanceFailoverGroupReadOnlyEndpoint,
): any {
  return { failoverPolicy: item["failoverPolicy"] };
}

export function instanceFailoverGroupReadOnlyEndpointDeserializer(
  item: any,
): InstanceFailoverGroupReadOnlyEndpoint {
  return {
    failoverPolicy: item["failoverPolicy"],
  };
}

/** Local replication role of the failover group instance. */
export enum KnownInstanceFailoverGroupReplicationRole {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
}

/**
 * Local replication role of the failover group instance. \
 * {@link KnownInstanceFailoverGroupReplicationRole} can be used interchangeably with InstanceFailoverGroupReplicationRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary \
 * **Secondary**: Secondary
 */
export type InstanceFailoverGroupReplicationRole = string;

export function partnerRegionInfoArraySerializer(result: Array<PartnerRegionInfo>): any[] {
  return result.map((item) => {
    return partnerRegionInfoSerializer(item);
  });
}

export function partnerRegionInfoArrayDeserializer(result: Array<PartnerRegionInfo>): any[] {
  return result.map((item) => {
    return partnerRegionInfoDeserializer(item);
  });
}

/** Partner region information for the failover group. */
export interface PartnerRegionInfo {
  /** Geo location of the partner managed instances. */
  location?: string;
  /** Replication role of the partner managed instances. */
  readonly replicationRole?: InstanceFailoverGroupReplicationRole;
}

export function partnerRegionInfoSerializer(item: PartnerRegionInfo): any {
  return { location: item["location"] };
}

export function partnerRegionInfoDeserializer(item: any): PartnerRegionInfo {
  return {
    location: item["location"],
    replicationRole: item["replicationRole"],
  };
}

export function managedInstancePairInfoArraySerializer(
  result: Array<ManagedInstancePairInfo>,
): any[] {
  return result.map((item) => {
    return managedInstancePairInfoSerializer(item);
  });
}

export function managedInstancePairInfoArrayDeserializer(
  result: Array<ManagedInstancePairInfo>,
): any[] {
  return result.map((item) => {
    return managedInstancePairInfoDeserializer(item);
  });
}

/** Pairs of Managed Instances in the failover group. */
export interface ManagedInstancePairInfo {
  /** Id of Primary Managed Instance in pair. */
  primaryManagedInstanceId?: string;
  /** Id of Partner Managed Instance in pair. */
  partnerManagedInstanceId?: string;
}

export function managedInstancePairInfoSerializer(item: ManagedInstancePairInfo): any {
  return {
    primaryManagedInstanceId: item["primaryManagedInstanceId"],
    partnerManagedInstanceId: item["partnerManagedInstanceId"],
  };
}

export function managedInstancePairInfoDeserializer(item: any): ManagedInstancePairInfo {
  return {
    primaryManagedInstanceId: item["primaryManagedInstanceId"],
    partnerManagedInstanceId: item["partnerManagedInstanceId"],
  };
}

/** The response of a InstanceFailoverGroup list operation. */
export interface _InstanceFailoverGroupListResult {
  /** The InstanceFailoverGroup items on this page */
  value: InstanceFailoverGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _instanceFailoverGroupListResultDeserializer(
  item: any,
): _InstanceFailoverGroupListResult {
  return {
    value: instanceFailoverGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function instanceFailoverGroupArraySerializer(result: Array<InstanceFailoverGroup>): any[] {
  return result.map((item) => {
    return instanceFailoverGroupSerializer(item);
  });
}

export function instanceFailoverGroupArrayDeserializer(
  result: Array<InstanceFailoverGroup>,
): any[] {
  return result.map((item) => {
    return instanceFailoverGroupDeserializer(item);
  });
}

/** A instance pool operation. */
export interface InstancePoolOperation extends ProxyResource {
  /** The name of the instance pool the operation is being performed on. */
  readonly instancePoolName?: string;
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The percentage of the operation completed. */
  readonly percentComplete?: number;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: ManagementOperationState;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Error type (e.g. None, User). */
  readonly errorType?: ErrorType;
  /** The estimated completion time of the operation. */
  readonly estimatedCompletionTime?: Date;
  /** The operation description. */
  readonly description?: string;
  /** Whether the operation can be cancelled. */
  readonly isCancellable?: boolean;
}

export function instancePoolOperationDeserializer(item: any): InstancePoolOperation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _instancePoolOperationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a instance pool operation. */
export interface InstancePoolOperationProperties {
  /** The name of the instance pool the operation is being performed on. */
  readonly instancePoolName?: string;
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The percentage of the operation completed. */
  readonly percentComplete?: number;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: ManagementOperationState;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Error type (e.g. None, User). */
  readonly errorType?: ErrorType;
  /** The estimated completion time of the operation. */
  readonly estimatedCompletionTime?: Date;
  /** The operation description. */
  readonly description?: string;
  /** Whether the operation can be cancelled. */
  readonly isCancellable?: boolean;
}

export function instancePoolOperationPropertiesDeserializer(
  item: any,
): InstancePoolOperationProperties {
  return {
    instancePoolName: item["instancePoolName"],
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    errorType: item["errorType"],
    estimatedCompletionTime: !item["estimatedCompletionTime"]
      ? item["estimatedCompletionTime"]
      : new Date(item["estimatedCompletionTime"]),
    description: item["description"],
    isCancellable: item["isCancellable"],
  };
}

/** The operation state. */
export enum KnownManagementOperationState {
  /** Pending */
  Pending = "Pending",
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** CancelInProgress */
  CancelInProgress = "CancelInProgress",
  /** Cancelled */
  Cancelled = "Cancelled",
}

/**
 * The operation state. \
 * {@link KnownManagementOperationState} can be used interchangeably with ManagementOperationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Pending \
 * **InProgress**: InProgress \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **CancelInProgress**: CancelInProgress \
 * **Cancelled**: Cancelled
 */
export type ManagementOperationState = string;

/** Error type (e.g. None, User). */
export enum KnownErrorType {
  /** None */
  None = "None",
  /** User */
  User = "User",
}

/**
 * Error type (e.g. None, User). \
 * {@link KnownErrorType} can be used interchangeably with ErrorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **User**: User
 */
export type ErrorType = string;

/** The response of a InstancePoolOperation list operation. */
export interface _InstancePoolOperationListResult {
  /** The InstancePoolOperation items on this page */
  value: InstancePoolOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _instancePoolOperationListResultDeserializer(
  item: any,
): _InstancePoolOperationListResult {
  return {
    value: instancePoolOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function instancePoolOperationArrayDeserializer(
  result: Array<InstancePoolOperation>,
): any[] {
  return result.map((item) => {
    return instancePoolOperationDeserializer(item);
  });
}

/** An Azure SQL instance pool. */
export interface InstancePool extends TrackedResource {
  /** The name and tier of the SKU. */
  sku?: Sku;
  /** Resource ID of the subnet to place this instance pool in. */
  subnetId?: string;
  /** Count of vCores belonging to this instance pool. */
  vCores?: number;
  /** The license type. Possible values are 'LicenseIncluded' (price for SQL license is included) and 'BasePrice' (without SQL license price). */
  licenseType?: InstancePoolLicenseType;
  /** The Dns Zone that the managed instance pool is in. */
  readonly dnsZone?: string;
  /** Specifies maintenance configuration id to apply to this managed instance. */
  maintenanceConfigurationId?: string;
}

export function instancePoolSerializer(item: InstancePool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "subnetId",
      "vCores",
      "licenseType",
      "maintenanceConfigurationId",
    ])
      ? undefined
      : _instancePoolPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function instancePoolDeserializer(item: any): InstancePool {
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
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _instancePoolPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** Properties of an instance pool. */
export interface InstancePoolProperties {
  /** Resource ID of the subnet to place this instance pool in. */
  subnetId: string;
  /** Count of vCores belonging to this instance pool. */
  vCores: number;
  /** The license type. Possible values are 'LicenseIncluded' (price for SQL license is included) and 'BasePrice' (without SQL license price). */
  licenseType: InstancePoolLicenseType;
  /** The Dns Zone that the managed instance pool is in. */
  readonly dnsZone?: string;
  /** Specifies maintenance configuration id to apply to this managed instance. */
  maintenanceConfigurationId?: string;
}

export function instancePoolPropertiesSerializer(item: InstancePoolProperties): any {
  return {
    subnetId: item["subnetId"],
    vCores: item["vCores"],
    licenseType: item["licenseType"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
  };
}

export function instancePoolPropertiesDeserializer(item: any): InstancePoolProperties {
  return {
    subnetId: item["subnetId"],
    vCores: item["vCores"],
    licenseType: item["licenseType"],
    dnsZone: item["dnsZone"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
  };
}

/** The license type. Possible values are 'LicenseIncluded' (price for SQL license is included) and 'BasePrice' (without SQL license price). */
export enum KnownInstancePoolLicenseType {
  /** LicenseIncluded */
  LicenseIncluded = "LicenseIncluded",
  /** BasePrice */
  BasePrice = "BasePrice",
}

/**
 * The license type. Possible values are 'LicenseIncluded' (price for SQL license is included) and 'BasePrice' (without SQL license price). \
 * {@link KnownInstancePoolLicenseType} can be used interchangeably with InstancePoolLicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LicenseIncluded**: LicenseIncluded \
 * **BasePrice**: BasePrice
 */
export type InstancePoolLicenseType = string;

/** An update to an Instance pool. */
export interface InstancePoolUpdate {
  /** The name and tier of the SKU. */
  sku?: Sku;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Resource ID of the subnet to place this instance pool in. */
  subnetId?: string;
  /** Count of vCores belonging to this instance pool. */
  vCores?: number;
  /** The license type. Possible values are 'LicenseIncluded' (price for SQL license is included) and 'BasePrice' (without SQL license price). */
  licenseType?: InstancePoolLicenseType;
  /** The Dns Zone that the managed instance pool is in. */
  readonly dnsZone?: string;
  /** Specifies maintenance configuration id to apply to this managed instance. */
  maintenanceConfigurationId?: string;
}

export function instancePoolUpdateSerializer(item: InstancePoolUpdate): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    properties: areAllPropsUndefined(item, [
      "subnetId",
      "vCores",
      "licenseType",
      "maintenanceConfigurationId",
    ])
      ? undefined
      : _instancePoolUpdatePropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** The response of a InstancePool list operation. */
export interface _InstancePoolListResult {
  /** The InstancePool items on this page */
  value: InstancePool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _instancePoolListResultDeserializer(item: any): _InstancePoolListResult {
  return {
    value: instancePoolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function instancePoolArraySerializer(result: Array<InstancePool>): any[] {
  return result.map((item) => {
    return instancePoolSerializer(item);
  });
}

export function instancePoolArrayDeserializer(result: Array<InstancePool>): any[] {
  return result.map((item) => {
    return instancePoolDeserializer(item);
  });
}

/** An IPv6 server firewall rule. */
export interface IPv6FirewallRule extends ProxyResourceWithWritableName {
  /** The start IP address of the firewall rule. Must be IPv6 format. */
  startIPv6Address?: string;
  /** The end IP address of the firewall rule. Must be IPv6 format. Must be greater than or equal to startIpv6Address. */
  endIPv6Address?: string;
}

export function iPv6FirewallRuleSerializer(item: IPv6FirewallRule): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, ["startIPv6Address", "endIPv6Address"])
      ? undefined
      : _iPv6FirewallRulePropertiesSerializer(item),
  };
}

export function iPv6FirewallRuleDeserializer(item: any): IPv6FirewallRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _iPv6FirewallRulePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of an IPv6 server firewall rule. */
export interface IPv6ServerFirewallRuleProperties {
  /** The start IP address of the firewall rule. Must be IPv6 format. */
  startIPv6Address?: string;
  /** The end IP address of the firewall rule. Must be IPv6 format. Must be greater than or equal to startIpv6Address. */
  endIPv6Address?: string;
}

export function iPv6ServerFirewallRulePropertiesSerializer(
  item: IPv6ServerFirewallRuleProperties,
): any {
  return { startIPv6Address: item["startIPv6Address"], endIPv6Address: item["endIPv6Address"] };
}

export function iPv6ServerFirewallRulePropertiesDeserializer(
  item: any,
): IPv6ServerFirewallRuleProperties {
  return {
    startIPv6Address: item["startIPv6Address"],
    endIPv6Address: item["endIPv6Address"],
  };
}

/** The response of a IPv6FirewallRule list operation. */
export interface _IPv6FirewallRuleListResult {
  /** The IPv6FirewallRule items on this page */
  value: IPv6FirewallRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _iPv6FirewallRuleListResultDeserializer(item: any): _IPv6FirewallRuleListResult {
  return {
    value: iPv6FirewallRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function iPv6FirewallRuleArraySerializer(result: Array<IPv6FirewallRule>): any[] {
  return result.map((item) => {
    return iPv6FirewallRuleSerializer(item);
  });
}

export function iPv6FirewallRuleArrayDeserializer(result: Array<IPv6FirewallRule>): any[] {
  return result.map((item) => {
    return iPv6FirewallRuleDeserializer(item);
  });
}

/** An execution of a job */
export interface JobExecution extends ProxyResource {
  /** The job version number. */
  readonly jobVersion?: number;
  /** The job step name. */
  readonly stepName?: string;
  /** The job step id. */
  readonly stepId?: number;
  /** The unique identifier of the job execution. */
  readonly jobExecutionId?: string;
  /** The detailed state of the job execution. */
  readonly lifecycle?: JobExecutionLifecycle;
  /** The ARM provisioning state of the job execution. */
  readonly provisioningState?: ProvisioningState;
  /** The time that the job execution was created. */
  readonly createTime?: Date;
  /** The time that the job execution started. */
  readonly startTime?: Date;
  /** The time that the job execution completed. */
  readonly endTime?: Date;
  /** Number of times the job execution has been attempted. */
  currentAttempts?: number;
  /** Start time of the current attempt. */
  readonly currentAttemptStartTime?: Date;
  /** The last status or error message. */
  readonly lastMessage?: string;
  /** The target that this execution is executed on. */
  readonly target?: JobExecutionTarget;
}

export function jobExecutionDeserializer(item: any): JobExecution {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _jobExecutionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties for an Azure SQL Database Elastic job execution. */
export interface JobExecutionProperties {
  /** The job version number. */
  readonly jobVersion?: number;
  /** The job step name. */
  readonly stepName?: string;
  /** The job step id. */
  readonly stepId?: number;
  /** The unique identifier of the job execution. */
  readonly jobExecutionId?: string;
  /** The detailed state of the job execution. */
  readonly lifecycle?: JobExecutionLifecycle;
  /** The ARM provisioning state of the job execution. */
  readonly provisioningState?: ProvisioningState;
  /** The time that the job execution was created. */
  readonly createTime?: Date;
  /** The time that the job execution started. */
  readonly startTime?: Date;
  /** The time that the job execution completed. */
  readonly endTime?: Date;
  /** Number of times the job execution has been attempted. */
  currentAttempts?: number;
  /** Start time of the current attempt. */
  readonly currentAttemptStartTime?: Date;
  /** The last status or error message. */
  readonly lastMessage?: string;
  /** The target that this execution is executed on. */
  readonly target?: JobExecutionTarget;
}

export function jobExecutionPropertiesDeserializer(item: any): JobExecutionProperties {
  return {
    jobVersion: item["jobVersion"],
    stepName: item["stepName"],
    stepId: item["stepId"],
    jobExecutionId: item["jobExecutionId"],
    lifecycle: item["lifecycle"],
    provisioningState: item["provisioningState"],
    createTime: !item["createTime"] ? item["createTime"] : new Date(item["createTime"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    currentAttempts: item["currentAttempts"],
    currentAttemptStartTime: !item["currentAttemptStartTime"]
      ? item["currentAttemptStartTime"]
      : new Date(item["currentAttemptStartTime"]),
    lastMessage: item["lastMessage"],
    target: !item["target"] ? item["target"] : jobExecutionTargetDeserializer(item["target"]),
  };
}

/** The detailed state of the job execution. */
export enum KnownJobExecutionLifecycle {
  /** Created */
  Created = "Created",
  /** InProgress */
  InProgress = "InProgress",
  /** WaitingForChildJobExecutions */
  WaitingForChildJobExecutions = "WaitingForChildJobExecutions",
  /** WaitingForRetry */
  WaitingForRetry = "WaitingForRetry",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** SucceededWithSkipped */
  SucceededWithSkipped = "SucceededWithSkipped",
  /** Failed */
  Failed = "Failed",
  /** TimedOut */
  TimedOut = "TimedOut",
  /** Canceled */
  Canceled = "Canceled",
  /** Skipped */
  Skipped = "Skipped",
}

/**
 * The detailed state of the job execution. \
 * {@link KnownJobExecutionLifecycle} can be used interchangeably with JobExecutionLifecycle,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created**: Created \
 * **InProgress**: InProgress \
 * **WaitingForChildJobExecutions**: WaitingForChildJobExecutions \
 * **WaitingForRetry**: WaitingForRetry \
 * **Succeeded**: Succeeded \
 * **SucceededWithSkipped**: SucceededWithSkipped \
 * **Failed**: Failed \
 * **TimedOut**: TimedOut \
 * **Canceled**: Canceled \
 * **Skipped**: Skipped
 */
export type JobExecutionLifecycle = string;

/** The target that a job execution is executed on. */
export interface JobExecutionTarget {
  /** The type of the target. */
  readonly type?: JobTargetType;
  /** The server name. */
  readonly serverName?: string;
  /** The database name. */
  readonly databaseName?: string;
}

export function jobExecutionTargetDeserializer(item: any): JobExecutionTarget {
  return {
    type: item["type"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
  };
}

/** The type of the target. */
export enum KnownJobTargetType {
  /** TargetGroup */
  TargetGroup = "TargetGroup",
  /** SqlDatabase */
  SqlDatabase = "SqlDatabase",
  /** SqlElasticPool */
  SqlElasticPool = "SqlElasticPool",
  /** SqlShardMap */
  SqlShardMap = "SqlShardMap",
  /** SqlServer */
  SqlServer = "SqlServer",
}

/**
 * The type of the target. \
 * {@link KnownJobTargetType} can be used interchangeably with JobTargetType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TargetGroup**: TargetGroup \
 * **SqlDatabase**: SqlDatabase \
 * **SqlElasticPool**: SqlElasticPool \
 * **SqlShardMap**: SqlShardMap \
 * **SqlServer**: SqlServer
 */
export type JobTargetType = string;

/** The response of a JobExecution list operation. */
export interface _JobExecutionListResult {
  /** The JobExecution items on this page */
  value: JobExecution[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobExecutionListResultDeserializer(item: any): _JobExecutionListResult {
  return {
    value: jobExecutionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobExecutionArrayDeserializer(result: Array<JobExecution>): any[] {
  return result.map((item) => {
    return jobExecutionDeserializer(item);
  });
}

/** An Azure SQL job agent. */
export interface JobAgent extends TrackedResource {
  /** The name and tier of the SKU. */
  sku?: Sku;
  /** The identity of the job agent. */
  identity?: JobAgentIdentity;
  /** Resource ID of the database to store job metadata in. */
  databaseId?: string;
  /** The state of the job agent. */
  readonly state?: JobAgentState;
}

export function jobAgentSerializer(item: JobAgent): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["databaseId"])
      ? undefined
      : _jobAgentPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : jobAgentIdentitySerializer(item["identity"]),
  };
}

export function jobAgentDeserializer(item: any): JobAgent {
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
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _jobAgentPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : jobAgentIdentityDeserializer(item["identity"]),
  };
}

/** Properties of a job agent. */
export interface JobAgentProperties {
  /** Resource ID of the database to store job metadata in. */
  databaseId: string;
  /** The state of the job agent. */
  readonly state?: JobAgentState;
}

export function jobAgentPropertiesSerializer(item: JobAgentProperties): any {
  return { databaseId: item["databaseId"] };
}

export function jobAgentPropertiesDeserializer(item: any): JobAgentProperties {
  return {
    databaseId: item["databaseId"],
    state: item["state"],
  };
}

/** The state of the job agent. */
export enum KnownJobAgentState {
  /** Creating */
  Creating = "Creating",
  /** Ready */
  Ready = "Ready",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The state of the job agent. \
 * {@link KnownJobAgentState} can be used interchangeably with JobAgentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Ready**: Ready \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Disabled**: Disabled
 */
export type JobAgentState = string;

/** Azure Active Directory identity configuration for a resource. */
export interface JobAgentIdentity {
  /** The job agent identity tenant id */
  tenantId?: string;
  /** The job agent identity type */
  type: JobAgentIdentityType;
  /** The resource ids of the user assigned identities to use */
  userAssignedIdentities?: Record<string, JobAgentUserAssignedIdentity>;
}

export function jobAgentIdentitySerializer(item: JobAgentIdentity): any {
  return {
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : jobAgentUserAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function jobAgentIdentityDeserializer(item: any): JobAgentIdentity {
  return {
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : jobAgentUserAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The job agent identity type */
export enum KnownJobAgentIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssignedUserAssigned */
  SystemAssignedUserAssigned = "SystemAssignedUserAssigned",
}

/**
 * The job agent identity type \
 * {@link KnownJobAgentIdentityType} can be used interchangeably with JobAgentIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned \
 * **SystemAssignedUserAssigned**: SystemAssignedUserAssigned
 */
export type JobAgentIdentityType = string;

export function jobAgentUserAssignedIdentityRecordSerializer(
  item: Record<string, JobAgentUserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : jobAgentUserAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function jobAgentUserAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, JobAgentUserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : jobAgentUserAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** Azure Active Directory identity configuration for a resource. */
export interface JobAgentUserAssignedIdentity {
  /** The Azure Active Directory principal id. */
  readonly principalId?: string;
  /** The Azure Active Directory client id. */
  readonly clientId?: string;
}

export function jobAgentUserAssignedIdentitySerializer(_item: JobAgentUserAssignedIdentity): any {
  return {};
}

export function jobAgentUserAssignedIdentityDeserializer(item: any): JobAgentUserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** An update to an Azure SQL job agent. */
export interface JobAgentUpdate {
  /** Managed identity assigned to job agent */
  identity?: JobAgentIdentity;
  /** The name and tier of the SKU. */
  sku?: Sku;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function jobAgentUpdateSerializer(item: JobAgentUpdate): any {
  return {
    identity: !item["identity"] ? item["identity"] : jobAgentIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

/** The response of a JobAgent list operation. */
export interface _JobAgentListResult {
  /** The JobAgent items on this page */
  value: JobAgent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobAgentListResultDeserializer(item: any): _JobAgentListResult {
  return {
    value: jobAgentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobAgentArraySerializer(result: Array<JobAgent>): any[] {
  return result.map((item) => {
    return jobAgentSerializer(item);
  });
}

export function jobAgentArrayDeserializer(result: Array<JobAgent>): any[] {
  return result.map((item) => {
    return jobAgentDeserializer(item);
  });
}

/** A stored credential that can be used by a job to connect to target databases. */
export interface JobCredential extends ProxyResource {
  /** The credential user name. */
  username?: string;
  /** The credential password. */
  password?: string;
}

export function jobCredentialSerializer(item: JobCredential): any {
  return {
    properties: areAllPropsUndefined(item, ["username", "password"])
      ? undefined
      : _jobCredentialPropertiesSerializer(item),
  };
}

export function jobCredentialDeserializer(item: any): JobCredential {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _jobCredentialPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a job credential. */
export interface JobCredentialProperties {
  /** The credential user name. */
  username: string;
  /** The credential password. */
  password: string;
}

export function jobCredentialPropertiesSerializer(item: JobCredentialProperties): any {
  return { username: item["username"], password: item["password"] };
}

export function jobCredentialPropertiesDeserializer(item: any): JobCredentialProperties {
  return {
    username: item["username"],
    password: item["password"],
  };
}

/** The response of a JobCredential list operation. */
export interface _JobCredentialListResult {
  /** The JobCredential items on this page */
  value: JobCredential[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobCredentialListResultDeserializer(item: any): _JobCredentialListResult {
  return {
    value: jobCredentialArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobCredentialArraySerializer(result: Array<JobCredential>): any[] {
  return result.map((item) => {
    return jobCredentialSerializer(item);
  });
}

export function jobCredentialArrayDeserializer(result: Array<JobCredential>): any[] {
  return result.map((item) => {
    return jobCredentialDeserializer(item);
  });
}

/** A job. */
export interface Job extends ProxyResource {
  /** User-defined description of the job. */
  description?: string;
  /** The job version number. */
  readonly version?: number;
  /** Schedule properties of the job. */
  schedule?: JobSchedule;
}

export function jobSerializer(item: Job): any {
  return {
    properties: areAllPropsUndefined(item, ["description", "schedule"])
      ? undefined
      : _jobPropertiesSerializer(item),
  };
}

export function jobDeserializer(item: any): Job {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"] ? item["properties"] : _jobPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a job. */
export interface JobProperties {
  /** User-defined description of the job. */
  description?: string;
  /** The job version number. */
  readonly version?: number;
  /** Schedule properties of the job. */
  schedule?: JobSchedule;
}

export function jobPropertiesSerializer(item: JobProperties): any {
  return {
    description: item["description"],
    schedule: !item["schedule"] ? item["schedule"] : jobScheduleSerializer(item["schedule"]),
  };
}

export function jobPropertiesDeserializer(item: any): JobProperties {
  return {
    description: item["description"],
    version: item["version"],
    schedule: !item["schedule"] ? item["schedule"] : jobScheduleDeserializer(item["schedule"]),
  };
}

/** Scheduling properties of a job. */
export interface JobSchedule {
  /** Schedule start time. */
  startTime?: Date;
  /** Schedule end time. */
  endTime?: Date;
  /** Schedule interval type */
  type?: JobScheduleType;
  /** Whether or not the schedule is enabled. */
  enabled?: boolean;
  /** Value of the schedule's recurring interval, if the ScheduleType is recurring. ISO8601 duration format. */
  interval?: string;
}

export function jobScheduleSerializer(item: JobSchedule): any {
  return {
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
    endTime: !item["endTime"] ? item["endTime"] : item["endTime"].toISOString(),
    type: item["type"],
    enabled: item["enabled"],
    interval: item["interval"],
  };
}

export function jobScheduleDeserializer(item: any): JobSchedule {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    type: item["type"],
    enabled: item["enabled"],
    interval: item["interval"],
  };
}

/** Schedule interval type */
export type JobScheduleType = "Once" | "Recurring";

/** The response of a Job list operation. */
export interface _JobListResult {
  /** The Job items on this page */
  value: Job[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobListResultDeserializer(item: any): _JobListResult {
  return {
    value: jobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobArraySerializer(result: Array<Job>): any[] {
  return result.map((item) => {
    return jobSerializer(item);
  });
}

export function jobArrayDeserializer(result: Array<Job>): any[] {
  return result.map((item) => {
    return jobDeserializer(item);
  });
}

/** A job agent private endpoint. */
export interface JobPrivateEndpoint extends ProxyResource {
  /** ARM resource id of the server the private endpoint will target. */
  targetServerAzureResourceId?: string;
  /** Private endpoint id of the private endpoint. */
  readonly privateEndpointId?: string;
}

export function jobPrivateEndpointSerializer(item: JobPrivateEndpoint): any {
  return {
    properties: areAllPropsUndefined(item, ["targetServerAzureResourceId"])
      ? undefined
      : _jobPrivateEndpointPropertiesSerializer(item),
  };
}

export function jobPrivateEndpointDeserializer(item: any): JobPrivateEndpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _jobPrivateEndpointPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of job agent private endpoint. */
export interface JobPrivateEndpointProperties {
  /** ARM resource id of the server the private endpoint will target. */
  targetServerAzureResourceId: string;
  /** Private endpoint id of the private endpoint. */
  readonly privateEndpointId?: string;
}

export function jobPrivateEndpointPropertiesSerializer(item: JobPrivateEndpointProperties): any {
  return { targetServerAzureResourceId: item["targetServerAzureResourceId"] };
}

export function jobPrivateEndpointPropertiesDeserializer(item: any): JobPrivateEndpointProperties {
  return {
    targetServerAzureResourceId: item["targetServerAzureResourceId"],
    privateEndpointId: item["privateEndpointId"],
  };
}

/** The response of a JobPrivateEndpoint list operation. */
export interface _JobPrivateEndpointListResult {
  /** The JobPrivateEndpoint items on this page */
  value: JobPrivateEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobPrivateEndpointListResultDeserializer(
  item: any,
): _JobPrivateEndpointListResult {
  return {
    value: jobPrivateEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobPrivateEndpointArraySerializer(result: Array<JobPrivateEndpoint>): any[] {
  return result.map((item) => {
    return jobPrivateEndpointSerializer(item);
  });
}

export function jobPrivateEndpointArrayDeserializer(result: Array<JobPrivateEndpoint>): any[] {
  return result.map((item) => {
    return jobPrivateEndpointDeserializer(item);
  });
}

/** A job step. */
export interface JobStep extends ProxyResource {
  /** The job step's index within the job. If not specified when creating the job step, it will be created as the last step. If not specified when updating the job step, the step id is not modified. */
  stepId?: number;
  /** The resource ID of the target group that the job step will be executed on. */
  targetGroup?: string;
  /** The resource ID of the job credential that will be used to connect to the targets. */
  credential?: string;
  /** The action payload of the job step. */
  action?: JobStepAction;
  /** Output destination properties of the job step. */
  output?: JobStepOutput;
  /** Execution options for the job step. */
  executionOptions?: JobStepExecutionOptions;
}

export function jobStepSerializer(item: JobStep): any {
  return {
    properties: areAllPropsUndefined(item, [
      "stepId",
      "targetGroup",
      "credential",
      "action",
      "output",
      "executionOptions",
    ])
      ? undefined
      : _jobStepPropertiesSerializer(item),
  };
}

export function jobStepDeserializer(item: any): JobStep {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _jobStepPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a job step. */
export interface JobStepProperties {
  /** The job step's index within the job. If not specified when creating the job step, it will be created as the last step. If not specified when updating the job step, the step id is not modified. */
  stepId?: number;
  /** The resource ID of the target group that the job step will be executed on. */
  targetGroup: string;
  /** The resource ID of the job credential that will be used to connect to the targets. */
  credential?: string;
  /** The action payload of the job step. */
  action: JobStepAction;
  /** Output destination properties of the job step. */
  output?: JobStepOutput;
  /** Execution options for the job step. */
  executionOptions?: JobStepExecutionOptions;
}

export function jobStepPropertiesSerializer(item: JobStepProperties): any {
  return {
    stepId: item["stepId"],
    targetGroup: item["targetGroup"],
    credential: item["credential"],
    action: jobStepActionSerializer(item["action"]),
    output: !item["output"] ? item["output"] : jobStepOutputSerializer(item["output"]),
    executionOptions: !item["executionOptions"]
      ? item["executionOptions"]
      : jobStepExecutionOptionsSerializer(item["executionOptions"]),
  };
}

export function jobStepPropertiesDeserializer(item: any): JobStepProperties {
  return {
    stepId: item["stepId"],
    targetGroup: item["targetGroup"],
    credential: item["credential"],
    action: jobStepActionDeserializer(item["action"]),
    output: !item["output"] ? item["output"] : jobStepOutputDeserializer(item["output"]),
    executionOptions: !item["executionOptions"]
      ? item["executionOptions"]
      : jobStepExecutionOptionsDeserializer(item["executionOptions"]),
  };
}

/** The action to be executed by a job step. */
export interface JobStepAction {
  /** Type of action being executed by the job step. */
  type?: JobStepActionType;
  /** The source of the action to execute. */
  source?: JobStepActionSource;
  /** The action value, for example the text of the T-SQL script to execute. */
  value: string;
}

export function jobStepActionSerializer(item: JobStepAction): any {
  return { type: item["type"], source: item["source"], value: item["value"] };
}

export function jobStepActionDeserializer(item: any): JobStepAction {
  return {
    type: item["type"],
    source: item["source"],
    value: item["value"],
  };
}

/** Type of action being executed by the job step. */
export enum KnownJobStepActionType {
  /** TSql */
  TSql = "TSql",
}

/**
 * Type of action being executed by the job step. \
 * {@link KnownJobStepActionType} can be used interchangeably with JobStepActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TSql**: TSql
 */
export type JobStepActionType = string;

/** The source of the action to execute. */
export enum KnownJobStepActionSource {
  /** Inline */
  Inline = "Inline",
}

/**
 * The source of the action to execute. \
 * {@link KnownJobStepActionSource} can be used interchangeably with JobStepActionSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inline**: Inline
 */
export type JobStepActionSource = string;

/** The output configuration of a job step. */
export interface JobStepOutput {
  /** The output destination type. */
  type?: JobStepOutputType;
  /** The output destination subscription id. */
  subscriptionId?: string;
  /** The output destination resource group. */
  resourceGroupName?: string;
  /** The output destination server name. */
  serverName: string;
  /** The output destination database. */
  databaseName: string;
  /** The output destination schema. */
  schemaName?: string;
  /** The output destination table. */
  tableName: string;
  /** The resource ID of the credential to use to connect to the output destination. */
  credential?: string;
}

export function jobStepOutputSerializer(item: JobStepOutput): any {
  return {
    type: item["type"],
    subscriptionId: item["subscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    schemaName: item["schemaName"],
    tableName: item["tableName"],
    credential: item["credential"],
  };
}

export function jobStepOutputDeserializer(item: any): JobStepOutput {
  return {
    type: item["type"],
    subscriptionId: item["subscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    schemaName: item["schemaName"],
    tableName: item["tableName"],
    credential: item["credential"],
  };
}

/** The output destination type. */
export enum KnownJobStepOutputType {
  /** SqlDatabase */
  SqlDatabase = "SqlDatabase",
}

/**
 * The output destination type. \
 * {@link KnownJobStepOutputType} can be used interchangeably with JobStepOutputType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SqlDatabase**: SqlDatabase
 */
export type JobStepOutputType = string;

/** The execution options of a job step. */
export interface JobStepExecutionOptions {
  /** Execution timeout for the job step. */
  timeoutSeconds?: number;
  /** Maximum number of times the job step will be reattempted if the first attempt fails. */
  retryAttempts?: number;
  /** Initial delay between retries for job step execution. */
  initialRetryIntervalSeconds?: number;
  /** The maximum amount of time to wait between retries for job step execution. */
  maximumRetryIntervalSeconds?: number;
  /** The backoff multiplier for the time between retries. */
  retryIntervalBackoffMultiplier?: number;
}

export function jobStepExecutionOptionsSerializer(item: JobStepExecutionOptions): any {
  return {
    timeoutSeconds: item["timeoutSeconds"],
    retryAttempts: item["retryAttempts"],
    initialRetryIntervalSeconds: item["initialRetryIntervalSeconds"],
    maximumRetryIntervalSeconds: item["maximumRetryIntervalSeconds"],
    retryIntervalBackoffMultiplier: item["retryIntervalBackoffMultiplier"],
  };
}

export function jobStepExecutionOptionsDeserializer(item: any): JobStepExecutionOptions {
  return {
    timeoutSeconds: item["timeoutSeconds"],
    retryAttempts: item["retryAttempts"],
    initialRetryIntervalSeconds: item["initialRetryIntervalSeconds"],
    maximumRetryIntervalSeconds: item["maximumRetryIntervalSeconds"],
    retryIntervalBackoffMultiplier: item["retryIntervalBackoffMultiplier"],
  };
}

/** The response of a JobStep list operation. */
export interface _JobStepListResult {
  /** The JobStep items on this page */
  value: JobStep[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobStepListResultDeserializer(item: any): _JobStepListResult {
  return {
    value: jobStepArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobStepArraySerializer(result: Array<JobStep>): any[] {
  return result.map((item) => {
    return jobStepSerializer(item);
  });
}

export function jobStepArrayDeserializer(result: Array<JobStep>): any[] {
  return result.map((item) => {
    return jobStepDeserializer(item);
  });
}

/** A group of job targets. */
export interface JobTargetGroup extends ProxyResource {
  /** Members of the target group. */
  members?: JobTarget[];
}

export function jobTargetGroupSerializer(item: JobTargetGroup): any {
  return {
    properties: areAllPropsUndefined(item, ["members"])
      ? undefined
      : _jobTargetGroupPropertiesSerializer(item),
  };
}

export function jobTargetGroupDeserializer(item: any): JobTargetGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _jobTargetGroupPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of job target group. */
export interface JobTargetGroupProperties {
  /** Members of the target group. */
  members: JobTarget[];
}

export function jobTargetGroupPropertiesSerializer(item: JobTargetGroupProperties): any {
  return { members: jobTargetArraySerializer(item["members"]) };
}

export function jobTargetGroupPropertiesDeserializer(item: any): JobTargetGroupProperties {
  return {
    members: jobTargetArrayDeserializer(item["members"]),
  };
}

export function jobTargetArraySerializer(result: Array<JobTarget>): any[] {
  return result.map((item) => {
    return jobTargetSerializer(item);
  });
}

export function jobTargetArrayDeserializer(result: Array<JobTarget>): any[] {
  return result.map((item) => {
    return jobTargetDeserializer(item);
  });
}

/** A job target, for example a specific database or a container of databases that is evaluated during job execution. */
export interface JobTarget {
  /** Whether the target is included or excluded from the group. */
  membershipType?: JobTargetGroupMembershipType;
  /** The target type. */
  type: JobTargetType;
  /** The target server name. */
  serverName?: string;
  /** The target database name. */
  databaseName?: string;
  /** The target elastic pool name. */
  elasticPoolName?: string;
  /** The target shard map. */
  shardMapName?: string;
  /** The resource ID of the credential that is used during job execution to connect to the target and determine the list of databases inside the target. */
  refreshCredential?: string;
}

export function jobTargetSerializer(item: JobTarget): any {
  return {
    membershipType: item["membershipType"],
    type: item["type"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    elasticPoolName: item["elasticPoolName"],
    shardMapName: item["shardMapName"],
    refreshCredential: item["refreshCredential"],
  };
}

export function jobTargetDeserializer(item: any): JobTarget {
  return {
    membershipType: item["membershipType"],
    type: item["type"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    elasticPoolName: item["elasticPoolName"],
    shardMapName: item["shardMapName"],
    refreshCredential: item["refreshCredential"],
  };
}

/** Whether the target is included or excluded from the group. */
export type JobTargetGroupMembershipType = "Include" | "Exclude";

/** The response of a JobTargetGroup list operation. */
export interface _JobTargetGroupListResult {
  /** The JobTargetGroup items on this page */
  value: JobTargetGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobTargetGroupListResultDeserializer(item: any): _JobTargetGroupListResult {
  return {
    value: jobTargetGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobTargetGroupArraySerializer(result: Array<JobTargetGroup>): any[] {
  return result.map((item) => {
    return jobTargetGroupSerializer(item);
  });
}

export function jobTargetGroupArrayDeserializer(result: Array<JobTargetGroup>): any[] {
  return result.map((item) => {
    return jobTargetGroupDeserializer(item);
  });
}

/** A job version. */
export interface JobVersion extends ProxyResource {}

export function jobVersionDeserializer(item: any): JobVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
  };
}

/** The response of a JobVersion list operation. */
export interface _JobVersionListResult {
  /** The JobVersion items on this page */
  value: JobVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobVersionListResultDeserializer(item: any): _JobVersionListResult {
  return {
    value: jobVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobVersionArrayDeserializer(result: Array<JobVersion>): any[] {
  return result.map((item) => {
    return jobVersionDeserializer(item);
  });
}

/** A long term retention backup. */
export interface LongTermRetentionBackup extends ProxyResource {
  /** The server name that the backup database belong to. */
  readonly serverName?: string;
  /** The create time of the server. */
  readonly serverCreateTime?: Date;
  /** The name of the database the backup belong to */
  readonly databaseName?: string;
  /** The delete time of the database */
  readonly databaseDeletionTime?: Date;
  /** The time the backup was taken */
  readonly backupTime?: Date;
  /** The time the long term retention backup will expire. */
  readonly backupExpirationTime?: Date;
  /** The storage redundancy type of the backup */
  readonly backupStorageRedundancy?: BackupStorageRedundancy;
  /** The storage redundancy type of the backup */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /** The setting whether the LTR backup is immutable */
  isBackupImmutable?: boolean;
  /** The setting for whether or not time-based immutability is enabled for the LTR backup. When time-based immutability is enabled and locked, the backup cannot be deleted until BackupExpirationTime. */
  timeBasedImmutability?: TimeBasedImmutability;
  /** The time-based immutability mode. Only applicable if time-based immutability is enabled. */
  timeBasedImmutabilityMode?: TimeBasedImmutabilityMode;
  /** The setting for whether LegalHold is enabled or disabled on the LTR backup. When LegalHold is enabled, the backup cannot be deleted until the LegalHold is removed. */
  legalHoldImmutability?: SetLegalHoldImmutability;
  /** The BackupStorageAccessTier for the LTR backup */
  readonly backupStorageAccessTier?: BackupStorageAccessTier;
}

export function longTermRetentionBackupDeserializer(item: any): LongTermRetentionBackup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _longTermRetentionBackupPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a long term retention backup */
export interface LongTermRetentionBackupProperties {
  /** The server name that the backup database belong to. */
  readonly serverName?: string;
  /** The create time of the server. */
  readonly serverCreateTime?: Date;
  /** The name of the database the backup belong to */
  readonly databaseName?: string;
  /** The delete time of the database */
  readonly databaseDeletionTime?: Date;
  /** The time the backup was taken */
  readonly backupTime?: Date;
  /** The time the long term retention backup will expire. */
  readonly backupExpirationTime?: Date;
  /** The storage redundancy type of the backup */
  readonly backupStorageRedundancy?: BackupStorageRedundancy;
  /** The storage redundancy type of the backup */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /** The setting whether the LTR backup is immutable */
  isBackupImmutable?: boolean;
  /** The setting for whether or not time-based immutability is enabled for the LTR backup. When time-based immutability is enabled and locked, the backup cannot be deleted until BackupExpirationTime. */
  timeBasedImmutability?: TimeBasedImmutability;
  /** The time-based immutability mode. Only applicable if time-based immutability is enabled. */
  timeBasedImmutabilityMode?: TimeBasedImmutabilityMode;
  /** The setting for whether LegalHold is enabled or disabled on the LTR backup. When LegalHold is enabled, the backup cannot be deleted until the LegalHold is removed. */
  legalHoldImmutability?: SetLegalHoldImmutability;
  /** The BackupStorageAccessTier for the LTR backup */
  readonly backupStorageAccessTier?: BackupStorageAccessTier;
}

export function longTermRetentionBackupPropertiesDeserializer(
  item: any,
): LongTermRetentionBackupProperties {
  return {
    serverName: item["serverName"],
    serverCreateTime: !item["serverCreateTime"]
      ? item["serverCreateTime"]
      : new Date(item["serverCreateTime"]),
    databaseName: item["databaseName"],
    databaseDeletionTime: !item["databaseDeletionTime"]
      ? item["databaseDeletionTime"]
      : new Date(item["databaseDeletionTime"]),
    backupTime: !item["backupTime"] ? item["backupTime"] : new Date(item["backupTime"]),
    backupExpirationTime: !item["backupExpirationTime"]
      ? item["backupExpirationTime"]
      : new Date(item["backupExpirationTime"]),
    backupStorageRedundancy: item["backupStorageRedundancy"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    isBackupImmutable: item["isBackupImmutable"],
    timeBasedImmutability: item["timeBasedImmutability"],
    timeBasedImmutabilityMode: item["timeBasedImmutabilityMode"],
    legalHoldImmutability: item["legalHoldImmutability"],
    backupStorageAccessTier: item["backupStorageAccessTier"],
  };
}

/** The setting for whether or not time-based immutability is enabled for the LTR backup. When time-based immutability is enabled and locked, the backup cannot be deleted until BackupExpirationTime. */
export enum KnownTimeBasedImmutability {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The setting for whether or not time-based immutability is enabled for the LTR backup. When time-based immutability is enabled and locked, the backup cannot be deleted until BackupExpirationTime. \
 * {@link KnownTimeBasedImmutability} can be used interchangeably with TimeBasedImmutability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type TimeBasedImmutability = string;

/** The time-based immutability mode. Only applicable if time-based immutability is enabled. */
export enum KnownTimeBasedImmutabilityMode {
  /** Locked */
  Locked = "Locked",
  /** Unlocked */
  Unlocked = "Unlocked",
}

/**
 * The time-based immutability mode. Only applicable if time-based immutability is enabled. \
 * {@link KnownTimeBasedImmutabilityMode} can be used interchangeably with TimeBasedImmutabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Locked**: Locked \
 * **Unlocked**: Unlocked
 */
export type TimeBasedImmutabilityMode = string;

/** The setting for whether LegalHold is enabled or disabled on the LTR backup. When LegalHold is enabled, the backup cannot be deleted until the LegalHold is removed. */
export enum KnownSetLegalHoldImmutability {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The setting for whether LegalHold is enabled or disabled on the LTR backup. When LegalHold is enabled, the backup cannot be deleted until the LegalHold is removed. \
 * {@link KnownSetLegalHoldImmutability} can be used interchangeably with SetLegalHoldImmutability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type SetLegalHoldImmutability = string;

/** The BackupStorageAccessTier for the LTR backup */
export enum KnownBackupStorageAccessTier {
  /** Hot */
  Hot = "Hot",
  /** Archive */
  Archive = "Archive",
}

/**
 * The BackupStorageAccessTier for the LTR backup \
 * {@link KnownBackupStorageAccessTier} can be used interchangeably with BackupStorageAccessTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Hot**: Hot \
 * **Archive**: Archive
 */
export type BackupStorageAccessTier = string;

/** A list of long term retention backups. */
export interface _LongTermRetentionBackupListResult {
  /** Array of results. */
  readonly value?: LongTermRetentionBackup[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _longTermRetentionBackupListResultDeserializer(
  item: any,
): _LongTermRetentionBackupListResult {
  return {
    value: !item["value"] ? item["value"] : longTermRetentionBackupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function longTermRetentionBackupArrayDeserializer(
  result: Array<LongTermRetentionBackup>,
): any[] {
  return result.map((item) => {
    return longTermRetentionBackupDeserializer(item);
  });
}

/** Contains the information necessary to change long term retention backup access tier and related operation mode. */
export interface ChangeLongTermRetentionBackupAccessTierParameters {
  /** The long term retention backup storage access tier */
  backupStorageAccessTier: string;
  /** The operation mode when updating ltr backup storage access tier */
  operationMode: string;
}

export function changeLongTermRetentionBackupAccessTierParametersSerializer(
  item: ChangeLongTermRetentionBackupAccessTierParameters,
): any {
  return {
    backupStorageAccessTier: item["backupStorageAccessTier"],
    operationMode: item["operationMode"],
  };
}

/** Contains the information necessary to perform long term retention backup copy operation. */
export interface CopyLongTermRetentionBackupParameters {
  /** The subscription that owns the target server */
  targetSubscriptionId?: string;
  /** The resource group that owns the target server */
  targetResourceGroup?: string;
  /** The resource Id of the target server that owns the database */
  targetServerResourceId?: string;
  /** The fully qualified domain name of the target server */
  targetServerFullyQualifiedDomainName?: string;
  /** The name of the database owns the copied backup. */
  targetDatabaseName?: string;
  /** The storage redundancy type of the copied backup */
  targetBackupStorageRedundancy?: BackupStorageRedundancy;
}

export function copyLongTermRetentionBackupParametersSerializer(
  item: CopyLongTermRetentionBackupParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "targetSubscriptionId",
      "targetResourceGroup",
      "targetServerResourceId",
      "targetServerFullyQualifiedDomainName",
      "targetDatabaseName",
      "targetBackupStorageRedundancy",
    ])
      ? undefined
      : _copyLongTermRetentionBackupParametersPropertiesSerializer(item),
  };
}

/** Contains the properties to perform long term retention backup copy operation. */
export interface CopyLongTermRetentionBackupParametersProperties {
  /** The subscription that owns the target server */
  targetSubscriptionId?: string;
  /** The resource group that owns the target server */
  targetResourceGroup?: string;
  /** The resource Id of the target server that owns the database */
  targetServerResourceId?: string;
  /** The fully qualified domain name of the target server */
  targetServerFullyQualifiedDomainName?: string;
  /** The name of the database owns the copied backup. */
  targetDatabaseName?: string;
  /** The storage redundancy type of the copied backup */
  targetBackupStorageRedundancy?: BackupStorageRedundancy;
}

export function copyLongTermRetentionBackupParametersPropertiesSerializer(
  item: CopyLongTermRetentionBackupParametersProperties,
): any {
  return {
    targetSubscriptionId: item["targetSubscriptionId"],
    targetResourceGroup: item["targetResourceGroup"],
    targetServerResourceId: item["targetServerResourceId"],
    targetServerFullyQualifiedDomainName: item["targetServerFullyQualifiedDomainName"],
    targetDatabaseName: item["targetDatabaseName"],
    targetBackupStorageRedundancy: item["targetBackupStorageRedundancy"],
  };
}

/** A LongTermRetentionBackup operation result resource. */
export interface LongTermRetentionBackupOperationResult extends ProxyResourceAutoGenerated {
  /** Request Id. */
  readonly requestId?: string;
  /** Operation type. */
  readonly operationType?: string;
  /** Source backup resource id */
  readonly fromBackupResourceId?: string;
  /** Target backup resource id */
  readonly toBackupResourceId?: string;
  /** The storage redundancy type of the copied backup */
  readonly targetBackupStorageRedundancy?: BackupStorageRedundancy;
  /** Operation status */
  readonly status?: string;
  /** Progress message */
  readonly message?: string;
}

export function longTermRetentionBackupOperationResultDeserializer(
  item: any,
): LongTermRetentionBackupOperationResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _longTermRetentionBackupOperationResultPropertiesDeserializer(item["properties"])),
  };
}

/** Contains the operation result properties for long term retention backup operation. */
export interface LongTermRetentionOperationResultProperties {
  /** Request Id. */
  readonly requestId?: string;
  /** Operation type. */
  readonly operationType?: string;
  /** Source backup resource id */
  readonly fromBackupResourceId?: string;
  /** Target backup resource id */
  readonly toBackupResourceId?: string;
  /** The storage redundancy type of the copied backup */
  readonly targetBackupStorageRedundancy?: BackupStorageRedundancy;
  /** Operation status */
  readonly status?: string;
  /** Progress message */
  readonly message?: string;
}

export function longTermRetentionOperationResultPropertiesDeserializer(
  item: any,
): LongTermRetentionOperationResultProperties {
  return {
    requestId: item["requestId"],
    operationType: item["operationType"],
    fromBackupResourceId: item["fromBackupResourceId"],
    toBackupResourceId: item["toBackupResourceId"],
    targetBackupStorageRedundancy: item["targetBackupStorageRedundancy"],
    status: item["status"],
    message: item["message"],
  };
}

/** Contains the information necessary to perform long term retention backup update operation. */
export interface UpdateLongTermRetentionBackupParameters {
  /** The storage redundancy type of the copied backup */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
}

export function updateLongTermRetentionBackupParametersSerializer(
  item: UpdateLongTermRetentionBackupParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["requestedBackupStorageRedundancy"])
      ? undefined
      : _updateLongTermRetentionBackupParametersPropertiesSerializer(item),
  };
}

/** Contains the properties to perform long term retention backup copy operation. */
export interface UpdateLongTermRetentionBackupParametersProperties {
  /** The storage redundancy type of the copied backup */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
}

export function updateLongTermRetentionBackupParametersPropertiesSerializer(
  item: UpdateLongTermRetentionBackupParametersProperties,
): any {
  return { requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"] };
}

/** A long term retention backup for a managed database. */
export interface ManagedInstanceLongTermRetentionBackup extends ProxyResource {
  /** The managed instance that the backup database belongs to. */
  readonly managedInstanceName?: string;
  /** The create time of the instance. */
  readonly managedInstanceCreateTime?: Date;
  /** The name of the database the backup belong to */
  readonly databaseName?: string;
  /** The delete time of the database */
  readonly databaseDeletionTime?: Date;
  /** The time the backup was taken */
  readonly backupTime?: Date;
  /** The time the long term retention backup will expire. */
  readonly backupExpirationTime?: Date;
  /** The storage redundancy type of the backup */
  readonly backupStorageRedundancy?: BackupStorageRedundancy;
  /** The BackupStorageAccessTier for the LTR backup */
  readonly backupStorageAccessTier?: BackupStorageAccessTier;
}

export function managedInstanceLongTermRetentionBackupDeserializer(
  item: any,
): ManagedInstanceLongTermRetentionBackup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstanceLongTermRetentionBackupPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a long term retention backup */
export interface ManagedInstanceLongTermRetentionBackupProperties {
  /** The managed instance that the backup database belongs to. */
  readonly managedInstanceName?: string;
  /** The create time of the instance. */
  readonly managedInstanceCreateTime?: Date;
  /** The name of the database the backup belong to */
  readonly databaseName?: string;
  /** The delete time of the database */
  readonly databaseDeletionTime?: Date;
  /** The time the backup was taken */
  readonly backupTime?: Date;
  /** The time the long term retention backup will expire. */
  readonly backupExpirationTime?: Date;
  /** The storage redundancy type of the backup */
  readonly backupStorageRedundancy?: BackupStorageRedundancy;
  /** The BackupStorageAccessTier for the LTR backup */
  readonly backupStorageAccessTier?: BackupStorageAccessTier;
}

export function managedInstanceLongTermRetentionBackupPropertiesDeserializer(
  item: any,
): ManagedInstanceLongTermRetentionBackupProperties {
  return {
    managedInstanceName: item["managedInstanceName"],
    managedInstanceCreateTime: !item["managedInstanceCreateTime"]
      ? item["managedInstanceCreateTime"]
      : new Date(item["managedInstanceCreateTime"]),
    databaseName: item["databaseName"],
    databaseDeletionTime: !item["databaseDeletionTime"]
      ? item["databaseDeletionTime"]
      : new Date(item["databaseDeletionTime"]),
    backupTime: !item["backupTime"] ? item["backupTime"] : new Date(item["backupTime"]),
    backupExpirationTime: !item["backupExpirationTime"]
      ? item["backupExpirationTime"]
      : new Date(item["backupExpirationTime"]),
    backupStorageRedundancy: item["backupStorageRedundancy"],
    backupStorageAccessTier: item["backupStorageAccessTier"],
  };
}

/** The response of a ManagedInstanceLongTermRetentionBackup list operation. */
export interface _ManagedInstanceLongTermRetentionBackupListResult {
  /** The ManagedInstanceLongTermRetentionBackup items on this page */
  value: ManagedInstanceLongTermRetentionBackup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstanceLongTermRetentionBackupListResultDeserializer(
  item: any,
): _ManagedInstanceLongTermRetentionBackupListResult {
  return {
    value: managedInstanceLongTermRetentionBackupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstanceLongTermRetentionBackupArrayDeserializer(
  result: Array<ManagedInstanceLongTermRetentionBackup>,
): any[] {
  return result.map((item) => {
    return managedInstanceLongTermRetentionBackupDeserializer(item);
  });
}

/** A long term retention policy. */
export interface LongTermRetentionPolicy extends ProxyResource {
  /** The setting for whether to enable time-based immutability for future backups. When set, future backups will have TimeBasedImmutability enabled. */
  timeBasedImmutability?: TimeBasedImmutability;
  /** The setting for time-based immutability mode for future backup (Value can be either Locked or UnLocked. Only effective if TimeBasedImmutability is enabled). Caution: Immutability of LTR backup cannot be removed if TimeBasedImmutabilityMode is Locked. */
  timeBasedImmutabilityMode?: TimeBasedImmutabilityMode;
  /** The weekly retention policy for an LTR backup in an ISO 8601 format. */
  weeklyRetention?: string;
  /** The monthly retention policy for an LTR backup in an ISO 8601 format. */
  monthlyRetention?: string;
  /** The yearly retention policy for an LTR backup in an ISO 8601 format. */
  yearlyRetention?: string;
  /** The week of year to take the yearly backup in an ISO 8601 format. */
  weekOfYear?: number;
}

export function longTermRetentionPolicySerializer(item: LongTermRetentionPolicy): any {
  return {
    properties: areAllPropsUndefined(item, [
      "timeBasedImmutability",
      "timeBasedImmutabilityMode",
      "weeklyRetention",
      "monthlyRetention",
      "yearlyRetention",
      "weekOfYear",
    ])
      ? undefined
      : _longTermRetentionPolicyPropertiesSerializer(item),
  };
}

export function longTermRetentionPolicyDeserializer(item: any): LongTermRetentionPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _longTermRetentionPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a long term retention policy */
export interface LongTermRetentionPolicyProperties {
  /** The setting for whether to enable time-based immutability for future backups. When set, future backups will have TimeBasedImmutability enabled. */
  timeBasedImmutability?: TimeBasedImmutability;
  /** The setting for time-based immutability mode for future backup (Value can be either Locked or UnLocked. Only effective if TimeBasedImmutability is enabled). Caution: Immutability of LTR backup cannot be removed if TimeBasedImmutabilityMode is Locked. */
  timeBasedImmutabilityMode?: TimeBasedImmutabilityMode;
  /** The weekly retention policy for an LTR backup in an ISO 8601 format. */
  weeklyRetention?: string;
  /** The monthly retention policy for an LTR backup in an ISO 8601 format. */
  monthlyRetention?: string;
  /** The yearly retention policy for an LTR backup in an ISO 8601 format. */
  yearlyRetention?: string;
  /** The week of year to take the yearly backup in an ISO 8601 format. */
  weekOfYear?: number;
}

export function longTermRetentionPolicyPropertiesSerializer(
  item: LongTermRetentionPolicyProperties,
): any {
  return {
    timeBasedImmutability: item["timeBasedImmutability"],
    timeBasedImmutabilityMode: item["timeBasedImmutabilityMode"],
    weeklyRetention: item["weeklyRetention"],
    monthlyRetention: item["monthlyRetention"],
    yearlyRetention: item["yearlyRetention"],
    weekOfYear: item["weekOfYear"],
  };
}

export function longTermRetentionPolicyPropertiesDeserializer(
  item: any,
): LongTermRetentionPolicyProperties {
  return {
    timeBasedImmutability: item["timeBasedImmutability"],
    timeBasedImmutabilityMode: item["timeBasedImmutabilityMode"],
    weeklyRetention: item["weeklyRetention"],
    monthlyRetention: item["monthlyRetention"],
    yearlyRetention: item["yearlyRetention"],
    weekOfYear: item["weekOfYear"],
  };
}

/** Known values of {@link LongTermRetentionPolicyName} that the service accepts. */
export enum KnownLongTermRetentionPolicyName {
  /** default */
  Default = "default",
}

/** Type of LongTermRetentionPolicyName */
export type LongTermRetentionPolicyName = string;

/** The response of a LongTermRetentionPolicy list operation. */
export interface _LongTermRetentionPolicyListResult {
  /** The LongTermRetentionPolicy items on this page */
  value: LongTermRetentionPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _longTermRetentionPolicyListResultDeserializer(
  item: any,
): _LongTermRetentionPolicyListResult {
  return {
    value: longTermRetentionPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function longTermRetentionPolicyArraySerializer(
  result: Array<LongTermRetentionPolicy>,
): any[] {
  return result.map((item) => {
    return longTermRetentionPolicySerializer(item);
  });
}

export function longTermRetentionPolicyArrayDeserializer(
  result: Array<LongTermRetentionPolicy>,
): any[] {
  return result.map((item) => {
    return longTermRetentionPolicyDeserializer(item);
  });
}

/** A short term retention policy. */
export interface ManagedBackupShortTermRetentionPolicy extends ProxyResource {
  /** The backup retention period in days. This is how many days Point-in-Time Restore will be supported. */
  retentionDays?: number;
}

export function managedBackupShortTermRetentionPolicySerializer(
  item: ManagedBackupShortTermRetentionPolicy,
): any {
  return {
    properties: areAllPropsUndefined(item, ["retentionDays"])
      ? undefined
      : _managedBackupShortTermRetentionPolicyPropertiesSerializer(item),
  };
}

export function managedBackupShortTermRetentionPolicyDeserializer(
  item: any,
): ManagedBackupShortTermRetentionPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedBackupShortTermRetentionPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a short term retention policy */
export interface ManagedBackupShortTermRetentionPolicyProperties {
  /** The backup retention period in days. This is how many days Point-in-Time Restore will be supported. */
  retentionDays?: number;
}

export function managedBackupShortTermRetentionPolicyPropertiesSerializer(
  item: ManagedBackupShortTermRetentionPolicyProperties,
): any {
  return { retentionDays: item["retentionDays"] };
}

export function managedBackupShortTermRetentionPolicyPropertiesDeserializer(
  item: any,
): ManagedBackupShortTermRetentionPolicyProperties {
  return {
    retentionDays: item["retentionDays"],
  };
}

/** Known values of {@link ManagedShortTermRetentionPolicyName} that the service accepts. */
export enum KnownManagedShortTermRetentionPolicyName {
  /** default */
  Default = "default",
}

/** Type of ManagedShortTermRetentionPolicyName */
export type ManagedShortTermRetentionPolicyName = string;

/** The response of a ManagedBackupShortTermRetentionPolicy list operation. */
export interface _ManagedBackupShortTermRetentionPolicyListResult {
  /** The ManagedBackupShortTermRetentionPolicy items on this page */
  value: ManagedBackupShortTermRetentionPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedBackupShortTermRetentionPolicyListResultDeserializer(
  item: any,
): _ManagedBackupShortTermRetentionPolicyListResult {
  return {
    value: managedBackupShortTermRetentionPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedBackupShortTermRetentionPolicyArraySerializer(
  result: Array<ManagedBackupShortTermRetentionPolicy>,
): any[] {
  return result.map((item) => {
    return managedBackupShortTermRetentionPolicySerializer(item);
  });
}

export function managedBackupShortTermRetentionPolicyArrayDeserializer(
  result: Array<ManagedBackupShortTermRetentionPolicy>,
): any[] {
  return result.map((item) => {
    return managedBackupShortTermRetentionPolicyDeserializer(item);
  });
}

/** A managed database security alert policy. */
export interface ManagedDatabaseSecurityAlertPolicy extends ProxyResource {
  /** Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database. */
  state?: SecurityAlertPolicyState;
  /** Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force */
  disabledAlerts?: string[];
  /** Specifies an array of e-mail addresses to which the alert is sent. */
  emailAddresses?: string[];
  /** Specifies that the alert is sent to the account administrators. */
  emailAccountAdmins?: boolean;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs. */
  storageEndpoint?: string;
  /** Specifies the identifier key of the Threat Detection audit storage account. */
  storageAccountAccessKey?: string;
  /** Specifies the number of days to keep in the Threat Detection audit logs. */
  retentionDays?: number;
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
}

export function managedDatabaseSecurityAlertPolicySerializer(
  item: ManagedDatabaseSecurityAlertPolicy,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "state",
      "disabledAlerts",
      "emailAddresses",
      "emailAccountAdmins",
      "storageEndpoint",
      "storageAccountAccessKey",
      "retentionDays",
    ])
      ? undefined
      : _managedDatabaseSecurityAlertPolicyPropertiesSerializer(item),
  };
}

export function managedDatabaseSecurityAlertPolicyDeserializer(
  item: any,
): ManagedDatabaseSecurityAlertPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedDatabaseSecurityAlertPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a security alert policy. */
export interface SecurityAlertPolicyProperties {
  /** Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database. */
  state: SecurityAlertPolicyState;
  /** Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force */
  disabledAlerts?: string[];
  /** Specifies an array of e-mail addresses to which the alert is sent. */
  emailAddresses?: string[];
  /** Specifies that the alert is sent to the account administrators. */
  emailAccountAdmins?: boolean;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs. */
  storageEndpoint?: string;
  /** Specifies the identifier key of the Threat Detection audit storage account. */
  storageAccountAccessKey?: string;
  /** Specifies the number of days to keep in the Threat Detection audit logs. */
  retentionDays?: number;
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
}

export function securityAlertPolicyPropertiesSerializer(item: SecurityAlertPolicyProperties): any {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
  };
}

export function securityAlertPolicyPropertiesDeserializer(
  item: any,
): SecurityAlertPolicyProperties {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

/** Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database. */
export type SecurityAlertPolicyState = "New" | "Enabled" | "Disabled";

/** The response of a ManagedDatabaseSecurityAlertPolicy list operation. */
export interface _ManagedDatabaseSecurityAlertPolicyListResult {
  /** The ManagedDatabaseSecurityAlertPolicy items on this page */
  value: ManagedDatabaseSecurityAlertPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedDatabaseSecurityAlertPolicyListResultDeserializer(
  item: any,
): _ManagedDatabaseSecurityAlertPolicyListResult {
  return {
    value: managedDatabaseSecurityAlertPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedDatabaseSecurityAlertPolicyArraySerializer(
  result: Array<ManagedDatabaseSecurityAlertPolicy>,
): any[] {
  return result.map((item) => {
    return managedDatabaseSecurityAlertPolicySerializer(item);
  });
}

export function managedDatabaseSecurityAlertPolicyArrayDeserializer(
  result: Array<ManagedDatabaseSecurityAlertPolicy>,
): any[] {
  return result.map((item) => {
    return managedDatabaseSecurityAlertPolicyDeserializer(item);
  });
}

/** An Azure SQL managed instance administrator. */
export interface ManagedInstanceAdministrator extends ProxyResource {
  /** Type of the managed instance administrator. */
  administratorType?: ManagedInstanceAdministratorType;
  /** Login name of the managed instance administrator. */
  login?: string;
  /** SID (object ID) of the managed instance administrator. */
  sid?: string;
  /** Tenant ID of the managed instance administrator. */
  tenantId?: string;
}

export function managedInstanceAdministratorSerializer(item: ManagedInstanceAdministrator): any {
  return {
    properties: areAllPropsUndefined(item, ["administratorType", "login", "sid", "tenantId"])
      ? undefined
      : _managedInstanceAdministratorPropertiesSerializer(item),
  };
}

export function managedInstanceAdministratorDeserializer(item: any): ManagedInstanceAdministrator {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstanceAdministratorPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a managed instance administrator. */
export interface ManagedInstanceAdministratorProperties {
  /** Type of the managed instance administrator. */
  administratorType: ManagedInstanceAdministratorType;
  /** Login name of the managed instance administrator. */
  login: string;
  /** SID (object ID) of the managed instance administrator. */
  sid: string;
  /** Tenant ID of the managed instance administrator. */
  tenantId?: string;
}

export function managedInstanceAdministratorPropertiesSerializer(
  item: ManagedInstanceAdministratorProperties,
): any {
  return {
    administratorType: item["administratorType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
  };
}

export function managedInstanceAdministratorPropertiesDeserializer(
  item: any,
): ManagedInstanceAdministratorProperties {
  return {
    administratorType: item["administratorType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
  };
}

/** Type of the managed instance administrator. */
export enum KnownManagedInstanceAdministratorType {
  /** ActiveDirectory */
  ActiveDirectory = "ActiveDirectory",
}

/**
 * Type of the managed instance administrator. \
 * {@link KnownManagedInstanceAdministratorType} can be used interchangeably with ManagedInstanceAdministratorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ActiveDirectory**: ActiveDirectory
 */
export type ManagedInstanceAdministratorType = string;

/** Known values of {@link AdministratorName} that the service accepts. */
export enum KnownAdministratorName {
  /** ActiveDirectory */
  ActiveDirectory = "ActiveDirectory",
}

/** Type of AdministratorName */
export type AdministratorName = string;

/** The response of a ManagedInstanceAdministrator list operation. */
export interface _ManagedInstanceAdministratorListResult {
  /** The ManagedInstanceAdministrator items on this page */
  value: ManagedInstanceAdministrator[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstanceAdministratorListResultDeserializer(
  item: any,
): _ManagedInstanceAdministratorListResult {
  return {
    value: managedInstanceAdministratorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstanceAdministratorArraySerializer(
  result: Array<ManagedInstanceAdministrator>,
): any[] {
  return result.map((item) => {
    return managedInstanceAdministratorSerializer(item);
  });
}

export function managedInstanceAdministratorArrayDeserializer(
  result: Array<ManagedInstanceAdministrator>,
): any[] {
  return result.map((item) => {
    return managedInstanceAdministratorDeserializer(item);
  });
}

/** Azure Active Directory only authentication. */
export interface ManagedInstanceAzureADOnlyAuthentication extends ProxyResource {
  /** Azure Active Directory only Authentication enabled. */
  azureADOnlyAuthentication?: boolean;
}

export function managedInstanceAzureADOnlyAuthenticationSerializer(
  item: ManagedInstanceAzureADOnlyAuthentication,
): any {
  return {
    properties: areAllPropsUndefined(item, ["azureADOnlyAuthentication"])
      ? undefined
      : _managedInstanceAzureADOnlyAuthenticationPropertiesSerializer(item),
  };
}

export function managedInstanceAzureADOnlyAuthenticationDeserializer(
  item: any,
): ManagedInstanceAzureADOnlyAuthentication {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstanceAzureADOnlyAuthenticationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a active directory only authentication for Managed Instance. */
export interface ManagedInstanceAzureADOnlyAuthProperties {
  /** Azure Active Directory only Authentication enabled. */
  azureADOnlyAuthentication: boolean;
}

export function managedInstanceAzureADOnlyAuthPropertiesSerializer(
  item: ManagedInstanceAzureADOnlyAuthProperties,
): any {
  return { azureADOnlyAuthentication: item["azureADOnlyAuthentication"] };
}

export function managedInstanceAzureADOnlyAuthPropertiesDeserializer(
  item: any,
): ManagedInstanceAzureADOnlyAuthProperties {
  return {
    azureADOnlyAuthentication: item["azureADOnlyAuthentication"],
  };
}

/** Known values of {@link AuthenticationName} that the service accepts. */
export enum KnownAuthenticationName {
  /** Default */
  Default = "Default",
}

/** Type of AuthenticationName */
export type AuthenticationName = string;

/** List of managed database move operations. */
export interface _ManagedInstanceAzureADOnlyAuthListResult {
  /** Array of results. */
  readonly value?: ManagedInstanceAzureADOnlyAuthentication[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _managedInstanceAzureADOnlyAuthListResultDeserializer(
  item: any,
): _ManagedInstanceAzureADOnlyAuthListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : managedInstanceAzureADOnlyAuthenticationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstanceAzureADOnlyAuthenticationArraySerializer(
  result: Array<ManagedInstanceAzureADOnlyAuthentication>,
): any[] {
  return result.map((item) => {
    return managedInstanceAzureADOnlyAuthenticationSerializer(item);
  });
}

export function managedInstanceAzureADOnlyAuthenticationArrayDeserializer(
  result: Array<ManagedInstanceAzureADOnlyAuthentication>,
): any[] {
  return result.map((item) => {
    return managedInstanceAzureADOnlyAuthenticationDeserializer(item);
  });
}

/** SQL Managed Instance DTC */
export interface ManagedInstanceDtc extends ProxyResource {
  /** Active status of managed instance DTC. */
  dtcEnabled?: boolean;
  /** Security settings of managed instance DTC. */
  securitySettings?: ManagedInstanceDtcSecuritySettings;
  /** External dns suffix search list of managed instance DTC. */
  externalDnsSuffixSearchList?: string[];
  /** Host name dns suffix of managed instance DTC. */
  readonly dtcHostNameDnsSuffix?: string;
  /** Status of FQDN of managed instance DTC. Toggling this setting might trigger a restart of the managed instance. */
  fqdnEnabled?: boolean;
  /** Provisioning state of managed instance DTC. */
  readonly provisioningState?: ProvisioningState;
}

export function managedInstanceDtcSerializer(item: ManagedInstanceDtc): any {
  return {
    properties: areAllPropsUndefined(item, [
      "dtcEnabled",
      "securitySettings",
      "externalDnsSuffixSearchList",
      "fqdnEnabled",
    ])
      ? undefined
      : _managedInstanceDtcPropertiesSerializer(item),
  };
}

export function managedInstanceDtcDeserializer(item: any): ManagedInstanceDtc {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstanceDtcPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of managed instance DTC. */
export interface ManagedInstanceDtcProperties {
  /** Active status of managed instance DTC. */
  dtcEnabled?: boolean;
  /** Security settings of managed instance DTC. */
  securitySettings?: ManagedInstanceDtcSecuritySettings;
  /** External dns suffix search list of managed instance DTC. */
  externalDnsSuffixSearchList?: string[];
  /** Host name dns suffix of managed instance DTC. */
  readonly dtcHostNameDnsSuffix?: string;
  /** Status of FQDN of managed instance DTC. Toggling this setting might trigger a restart of the managed instance. */
  fqdnEnabled?: boolean;
  /** Provisioning state of managed instance DTC. */
  readonly provisioningState?: ProvisioningState;
}

export function managedInstanceDtcPropertiesSerializer(item: ManagedInstanceDtcProperties): any {
  return {
    dtcEnabled: item["dtcEnabled"],
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : managedInstanceDtcSecuritySettingsSerializer(item["securitySettings"]),
    externalDnsSuffixSearchList: !item["externalDnsSuffixSearchList"]
      ? item["externalDnsSuffixSearchList"]
      : item["externalDnsSuffixSearchList"].map((p: any) => {
          return p;
        }),
    fqdnEnabled: item["fqdnEnabled"],
  };
}

export function managedInstanceDtcPropertiesDeserializer(item: any): ManagedInstanceDtcProperties {
  return {
    dtcEnabled: item["dtcEnabled"],
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : managedInstanceDtcSecuritySettingsDeserializer(item["securitySettings"]),
    externalDnsSuffixSearchList: !item["externalDnsSuffixSearchList"]
      ? item["externalDnsSuffixSearchList"]
      : item["externalDnsSuffixSearchList"].map((p: any) => {
          return p;
        }),
    dtcHostNameDnsSuffix: item["dtcHostNameDnsSuffix"],
    fqdnEnabled: item["fqdnEnabled"],
    provisioningState: item["provisioningState"],
  };
}

/** The Security Settings of managed instance DTC. */
export interface ManagedInstanceDtcSecuritySettings {
  /** Transaction Manager communication settings of managed instance DTC. */
  transactionManagerCommunicationSettings?: ManagedInstanceDtcTransactionManagerCommunicationSettings;
  /** Allow XA Transactions to managed instance DTC. */
  xaTransactionsEnabled?: boolean;
  /** Allow SNA LU 6.2 Transactions to managed instance DTC. */
  snaLu6Point2TransactionsEnabled?: boolean;
  /** Default timeout for XA Transactions (in seconds). */
  xaTransactionsDefaultTimeout?: number;
  /** Maximum timeout for XA Transactions (in seconds). */
  xaTransactionsMaximumTimeout?: number;
}

export function managedInstanceDtcSecuritySettingsSerializer(
  item: ManagedInstanceDtcSecuritySettings,
): any {
  return {
    transactionManagerCommunicationSettings: !item["transactionManagerCommunicationSettings"]
      ? item["transactionManagerCommunicationSettings"]
      : managedInstanceDtcTransactionManagerCommunicationSettingsSerializer(
          item["transactionManagerCommunicationSettings"],
        ),
    xaTransactionsEnabled: item["xaTransactionsEnabled"],
    snaLu6point2TransactionsEnabled: item["snaLu6Point2TransactionsEnabled"],
    xaTransactionsDefaultTimeout: item["xaTransactionsDefaultTimeout"],
    xaTransactionsMaximumTimeout: item["xaTransactionsMaximumTimeout"],
  };
}

export function managedInstanceDtcSecuritySettingsDeserializer(
  item: any,
): ManagedInstanceDtcSecuritySettings {
  return {
    transactionManagerCommunicationSettings: !item["transactionManagerCommunicationSettings"]
      ? item["transactionManagerCommunicationSettings"]
      : managedInstanceDtcTransactionManagerCommunicationSettingsDeserializer(
          item["transactionManagerCommunicationSettings"],
        ),
    xaTransactionsEnabled: item["xaTransactionsEnabled"],
    snaLu6Point2TransactionsEnabled: item["snaLu6point2TransactionsEnabled"],
    xaTransactionsDefaultTimeout: item["xaTransactionsDefaultTimeout"],
    xaTransactionsMaximumTimeout: item["xaTransactionsMaximumTimeout"],
  };
}

/** The Transaction Manager Communication Settings of managed instance DTC. */
export interface ManagedInstanceDtcTransactionManagerCommunicationSettings {
  /** Allow Inbound traffic to managed instance DTC. */
  allowInboundEnabled?: boolean;
  /** Allow Outbound traffic of managed instance DTC. */
  allowOutboundEnabled?: boolean;
  /** Authentication type of managed instance DTC. */
  authentication?: string;
}

export function managedInstanceDtcTransactionManagerCommunicationSettingsSerializer(
  item: ManagedInstanceDtcTransactionManagerCommunicationSettings,
): any {
  return {
    allowInboundEnabled: item["allowInboundEnabled"],
    allowOutboundEnabled: item["allowOutboundEnabled"],
    authentication: item["authentication"],
  };
}

export function managedInstanceDtcTransactionManagerCommunicationSettingsDeserializer(
  item: any,
): ManagedInstanceDtcTransactionManagerCommunicationSettings {
  return {
    allowInboundEnabled: item["allowInboundEnabled"],
    allowOutboundEnabled: item["allowOutboundEnabled"],
    authentication: item["authentication"],
  };
}

/** Known values of {@link DtcName} that the service accepts. */
export enum KnownDtcName {
  /** current */
  Current = "current",
}

/** Type of DtcName */
export type DtcName = string;

/** The response of a ManagedInstanceDtc list operation. */
export interface _ManagedInstanceDtcListResult {
  /** The ManagedInstanceDtc items on this page */
  value: ManagedInstanceDtc[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstanceDtcListResultDeserializer(
  item: any,
): _ManagedInstanceDtcListResult {
  return {
    value: managedInstanceDtcArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstanceDtcArraySerializer(result: Array<ManagedInstanceDtc>): any[] {
  return result.map((item) => {
    return managedInstanceDtcSerializer(item);
  });
}

export function managedInstanceDtcArrayDeserializer(result: Array<ManagedInstanceDtc>): any[] {
  return result.map((item) => {
    return managedInstanceDtcDeserializer(item);
  });
}

/** The managed instance encryption protector. */
export interface ManagedInstanceEncryptionProtector extends ProxyResource {
  /** Kind of encryption protector. This is metadata used for the Azure portal experience. */
  readonly kind?: string;
  /** The name of the managed instance key. */
  serverKeyName?: string;
  /** The encryption protector type like 'ServiceManaged', 'AzureKeyVault'. */
  serverKeyType?: ServerKeyType;
  /** The URI of the server key. */
  readonly uri?: string;
  /** Thumbprint of the server key. */
  readonly thumbprint?: string;
  /** Key auto rotation opt-in flag. Either true or false. */
  autoRotationEnabled?: boolean;
}

export function managedInstanceEncryptionProtectorSerializer(
  item: ManagedInstanceEncryptionProtector,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "serverKeyName",
      "serverKeyType",
      "autoRotationEnabled",
    ])
      ? undefined
      : _managedInstanceEncryptionProtectorPropertiesSerializer(item),
  };
}

export function managedInstanceEncryptionProtectorDeserializer(
  item: any,
): ManagedInstanceEncryptionProtector {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstanceEncryptionProtectorPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Properties for an encryption protector execution. */
export interface ManagedInstanceEncryptionProtectorProperties {
  /** The name of the managed instance key. */
  serverKeyName?: string;
  /** The encryption protector type like 'ServiceManaged', 'AzureKeyVault'. */
  serverKeyType: ServerKeyType;
  /** The URI of the server key. */
  readonly uri?: string;
  /** Thumbprint of the server key. */
  readonly thumbprint?: string;
  /** Key auto rotation opt-in flag. Either true or false. */
  autoRotationEnabled?: boolean;
}

export function managedInstanceEncryptionProtectorPropertiesSerializer(
  item: ManagedInstanceEncryptionProtectorProperties,
): any {
  return {
    serverKeyName: item["serverKeyName"],
    serverKeyType: item["serverKeyType"],
    autoRotationEnabled: item["autoRotationEnabled"],
  };
}

export function managedInstanceEncryptionProtectorPropertiesDeserializer(
  item: any,
): ManagedInstanceEncryptionProtectorProperties {
  return {
    serverKeyName: item["serverKeyName"],
    serverKeyType: item["serverKeyType"],
    uri: item["uri"],
    thumbprint: item["thumbprint"],
    autoRotationEnabled: item["autoRotationEnabled"],
  };
}

/** The response of a ManagedInstanceEncryptionProtector list operation. */
export interface _ManagedInstanceEncryptionProtectorListResult {
  /** The ManagedInstanceEncryptionProtector items on this page */
  value: ManagedInstanceEncryptionProtector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstanceEncryptionProtectorListResultDeserializer(
  item: any,
): _ManagedInstanceEncryptionProtectorListResult {
  return {
    value: managedInstanceEncryptionProtectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstanceEncryptionProtectorArraySerializer(
  result: Array<ManagedInstanceEncryptionProtector>,
): any[] {
  return result.map((item) => {
    return managedInstanceEncryptionProtectorSerializer(item);
  });
}

export function managedInstanceEncryptionProtectorArrayDeserializer(
  result: Array<ManagedInstanceEncryptionProtector>,
): any[] {
  return result.map((item) => {
    return managedInstanceEncryptionProtectorDeserializer(item);
  });
}

/** A managed instance key. */
export interface ManagedInstanceKey extends ProxyResource {
  /** Kind of encryption protector. This is metadata used for the Azure portal experience. */
  readonly kind?: string;
  /** The key type like 'ServiceManaged', 'AzureKeyVault'. */
  serverKeyType?: ServerKeyType;
  /** The URI of the key. If the ServerKeyType is AzureKeyVault, then the URI is required. */
  uri?: string;
  /** Thumbprint of the key. */
  readonly thumbprint?: string;
  /** The key creation date. */
  readonly creationDate?: Date;
  /** Key auto rotation opt-in flag. Either true or false. */
  readonly autoRotationEnabled?: boolean;
}

export function managedInstanceKeySerializer(item: ManagedInstanceKey): any {
  return {
    properties: areAllPropsUndefined(item, ["serverKeyType", "uri"])
      ? undefined
      : _managedInstanceKeyPropertiesSerializer(item),
  };
}

export function managedInstanceKeyDeserializer(item: any): ManagedInstanceKey {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstanceKeyPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Properties for a key execution. */
export interface ManagedInstanceKeyProperties {
  /** The key type like 'ServiceManaged', 'AzureKeyVault'. */
  serverKeyType: ServerKeyType;
  /** The URI of the key. If the ServerKeyType is AzureKeyVault, then the URI is required. */
  uri?: string;
  /** Thumbprint of the key. */
  readonly thumbprint?: string;
  /** The key creation date. */
  readonly creationDate?: Date;
  /** Key auto rotation opt-in flag. Either true or false. */
  readonly autoRotationEnabled?: boolean;
}

export function managedInstanceKeyPropertiesSerializer(item: ManagedInstanceKeyProperties): any {
  return { serverKeyType: item["serverKeyType"], uri: item["uri"] };
}

export function managedInstanceKeyPropertiesDeserializer(item: any): ManagedInstanceKeyProperties {
  return {
    serverKeyType: item["serverKeyType"],
    uri: item["uri"],
    thumbprint: item["thumbprint"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    autoRotationEnabled: item["autoRotationEnabled"],
  };
}

/** The response of a ManagedInstanceKey list operation. */
export interface _ManagedInstanceKeyListResult {
  /** The ManagedInstanceKey items on this page */
  value: ManagedInstanceKey[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstanceKeyListResultDeserializer(
  item: any,
): _ManagedInstanceKeyListResult {
  return {
    value: managedInstanceKeyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstanceKeyArraySerializer(result: Array<ManagedInstanceKey>): any[] {
  return result.map((item) => {
    return managedInstanceKeySerializer(item);
  });
}

export function managedInstanceKeyArrayDeserializer(result: Array<ManagedInstanceKey>): any[] {
  return result.map((item) => {
    return managedInstanceKeyDeserializer(item);
  });
}

/** A long term retention policy. */
export interface ManagedInstanceLongTermRetentionPolicy extends ProxyResource {
  /** The BackupStorageAccessTier for the LTR backups */
  backupStorageAccessTier?: BackupStorageAccessTier;
  /** The weekly retention policy for an LTR backup in an ISO 8601 format. */
  weeklyRetention?: string;
  /** The monthly retention policy for an LTR backup in an ISO 8601 format. */
  monthlyRetention?: string;
  /** The yearly retention policy for an LTR backup in an ISO 8601 format. */
  yearlyRetention?: string;
  /** The week of year to take the yearly backup in an ISO 8601 format. */
  weekOfYear?: number;
}

export function managedInstanceLongTermRetentionPolicySerializer(
  item: ManagedInstanceLongTermRetentionPolicy,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "backupStorageAccessTier",
      "weeklyRetention",
      "monthlyRetention",
      "yearlyRetention",
      "weekOfYear",
    ])
      ? undefined
      : _managedInstanceLongTermRetentionPolicyPropertiesSerializer(item),
  };
}

export function managedInstanceLongTermRetentionPolicyDeserializer(
  item: any,
): ManagedInstanceLongTermRetentionPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstanceLongTermRetentionPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a long term retention policy */
export interface ManagedInstanceLongTermRetentionPolicyProperties {
  /** The BackupStorageAccessTier for the LTR backups */
  backupStorageAccessTier?: BackupStorageAccessTier;
  /** The weekly retention policy for an LTR backup in an ISO 8601 format. */
  weeklyRetention?: string;
  /** The monthly retention policy for an LTR backup in an ISO 8601 format. */
  monthlyRetention?: string;
  /** The yearly retention policy for an LTR backup in an ISO 8601 format. */
  yearlyRetention?: string;
  /** The week of year to take the yearly backup in an ISO 8601 format. */
  weekOfYear?: number;
}

export function managedInstanceLongTermRetentionPolicyPropertiesSerializer(
  item: ManagedInstanceLongTermRetentionPolicyProperties,
): any {
  return {
    backupStorageAccessTier: item["backupStorageAccessTier"],
    weeklyRetention: item["weeklyRetention"],
    monthlyRetention: item["monthlyRetention"],
    yearlyRetention: item["yearlyRetention"],
    weekOfYear: item["weekOfYear"],
  };
}

export function managedInstanceLongTermRetentionPolicyPropertiesDeserializer(
  item: any,
): ManagedInstanceLongTermRetentionPolicyProperties {
  return {
    backupStorageAccessTier: item["backupStorageAccessTier"],
    weeklyRetention: item["weeklyRetention"],
    monthlyRetention: item["monthlyRetention"],
    yearlyRetention: item["yearlyRetention"],
    weekOfYear: item["weekOfYear"],
  };
}

/** Known values of {@link ManagedInstanceLongTermRetentionPolicyName} that the service accepts. */
export enum KnownManagedInstanceLongTermRetentionPolicyName {
  /** default */
  Default = "default",
}

/** Type of ManagedInstanceLongTermRetentionPolicyName */
export type ManagedInstanceLongTermRetentionPolicyName = string;

/** The response of a ManagedInstanceLongTermRetentionPolicy list operation. */
export interface _ManagedInstanceLongTermRetentionPolicyListResult {
  /** The ManagedInstanceLongTermRetentionPolicy items on this page */
  value: ManagedInstanceLongTermRetentionPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstanceLongTermRetentionPolicyListResultDeserializer(
  item: any,
): _ManagedInstanceLongTermRetentionPolicyListResult {
  return {
    value: managedInstanceLongTermRetentionPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstanceLongTermRetentionPolicyArraySerializer(
  result: Array<ManagedInstanceLongTermRetentionPolicy>,
): any[] {
  return result.map((item) => {
    return managedInstanceLongTermRetentionPolicySerializer(item);
  });
}

export function managedInstanceLongTermRetentionPolicyArrayDeserializer(
  result: Array<ManagedInstanceLongTermRetentionPolicy>,
): any[] {
  return result.map((item) => {
    return managedInstanceLongTermRetentionPolicyDeserializer(item);
  });
}

/** A managed instance operation. */
export interface ManagedInstanceOperation extends ProxyResource {
  /** The name of the managed instance the operation is being performed on. */
  readonly managedInstanceName?: string;
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The percentage of the operation completed. */
  readonly percentComplete?: number;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: ManagementOperationState;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Whether or not the error is a user error. */
  readonly isUserError?: boolean;
  /** The estimated completion time of the operation. */
  readonly estimatedCompletionTime?: Date;
  /** The operation description. */
  readonly description?: string;
  /** Whether the operation can be cancelled. */
  readonly isCancellable?: boolean;
  /** The operation parameters. */
  readonly operationParameters?: ManagedInstanceOperationParametersPair;
  /** The operation steps. */
  readonly operationSteps?: ManagedInstanceOperationSteps;
}

export function managedInstanceOperationDeserializer(item: any): ManagedInstanceOperation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstanceOperationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a managed instance operation. */
export interface ManagedInstanceOperationProperties {
  /** The name of the managed instance the operation is being performed on. */
  readonly managedInstanceName?: string;
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The percentage of the operation completed. */
  readonly percentComplete?: number;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: ManagementOperationState;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Whether or not the error is a user error. */
  readonly isUserError?: boolean;
  /** The estimated completion time of the operation. */
  readonly estimatedCompletionTime?: Date;
  /** The operation description. */
  readonly description?: string;
  /** Whether the operation can be cancelled. */
  readonly isCancellable?: boolean;
  /** The operation parameters. */
  readonly operationParameters?: ManagedInstanceOperationParametersPair;
  /** The operation steps. */
  readonly operationSteps?: ManagedInstanceOperationSteps;
}

export function managedInstanceOperationPropertiesDeserializer(
  item: any,
): ManagedInstanceOperationProperties {
  return {
    managedInstanceName: item["managedInstanceName"],
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    isUserError: item["isUserError"],
    estimatedCompletionTime: !item["estimatedCompletionTime"]
      ? item["estimatedCompletionTime"]
      : new Date(item["estimatedCompletionTime"]),
    description: item["description"],
    isCancellable: item["isCancellable"],
    operationParameters: !item["operationParameters"]
      ? item["operationParameters"]
      : managedInstanceOperationParametersPairDeserializer(item["operationParameters"]),
    operationSteps: !item["operationSteps"]
      ? item["operationSteps"]
      : managedInstanceOperationStepsDeserializer(item["operationSteps"]),
  };
}

/** The parameters of a managed instance operation. */
export interface ManagedInstanceOperationParametersPair {
  /** The current parameters. */
  readonly currentParameters?: UpsertManagedServerOperationParameters;
  /** The requested parameters. */
  readonly requestedParameters?: UpsertManagedServerOperationParameters;
}

export function managedInstanceOperationParametersPairDeserializer(
  item: any,
): ManagedInstanceOperationParametersPair {
  return {
    currentParameters: !item["currentParameters"]
      ? item["currentParameters"]
      : upsertManagedServerOperationParametersDeserializer(item["currentParameters"]),
    requestedParameters: !item["requestedParameters"]
      ? item["requestedParameters"]
      : upsertManagedServerOperationParametersDeserializer(item["requestedParameters"]),
  };
}

/** model interface UpsertManagedServerOperationParameters */
export interface UpsertManagedServerOperationParameters {
  family?: string;
  tier?: string;
  vCores?: number;
  storageSizeInGB?: number;
}

export function upsertManagedServerOperationParametersDeserializer(
  item: any,
): UpsertManagedServerOperationParameters {
  return {
    family: item["family"],
    tier: item["tier"],
    vCores: item["vCores"],
    storageSizeInGB: item["storageSizeInGB"],
  };
}

/** The steps of a managed instance operation. */
export interface ManagedInstanceOperationSteps {
  /** The total number of operation steps. */
  readonly totalSteps?: string;
  /** The number of current operation steps. */
  readonly currentStep?: number;
  /** The operation steps list. */
  readonly stepsList?: UpsertManagedServerOperationStepWithEstimatesAndDuration[];
}

export function managedInstanceOperationStepsDeserializer(
  item: any,
): ManagedInstanceOperationSteps {
  return {
    totalSteps: item["totalSteps"],
    currentStep: item["currentStep"],
    stepsList: !item["stepsList"]
      ? item["stepsList"]
      : upsertManagedServerOperationStepWithEstimatesAndDurationArrayDeserializer(
          item["stepsList"],
        ),
  };
}

export function upsertManagedServerOperationStepWithEstimatesAndDurationArrayDeserializer(
  result: Array<UpsertManagedServerOperationStepWithEstimatesAndDuration>,
): any[] {
  return result.map((item) => {
    return upsertManagedServerOperationStepWithEstimatesAndDurationDeserializer(item);
  });
}

/** model interface UpsertManagedServerOperationStepWithEstimatesAndDuration */
export interface UpsertManagedServerOperationStepWithEstimatesAndDuration {
  stepStartTime?: Date;
  stepEndTime?: Date;
  timeElapsed?: string;
  order?: number;
  name?: string;
  status?: UpsertManagedServerOperationStepWithEstimatesAndDurationStatus;
}

export function upsertManagedServerOperationStepWithEstimatesAndDurationDeserializer(
  item: any,
): UpsertManagedServerOperationStepWithEstimatesAndDuration {
  return {
    stepStartTime: !item["stepStartTime"] ? item["stepStartTime"] : new Date(item["stepStartTime"]),
    stepEndTime: !item["stepEndTime"] ? item["stepEndTime"] : new Date(item["stepEndTime"]),
    timeElapsed: item["timeElapsed"],
    order: item["order"],
    name: item["name"],
    status: item["status"],
  };
}

/** Known values of {@link UpsertManagedServerOperationStepWithEstimatesAndDurationStatus} that the service accepts. */
export enum KnownUpsertManagedServerOperationStepWithEstimatesAndDurationStatus {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** InProgress */
  InProgress = "InProgress",
  /** SlowedDown */
  SlowedDown = "SlowedDown",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/** Type of UpsertManagedServerOperationStepWithEstimatesAndDurationStatus */
export type UpsertManagedServerOperationStepWithEstimatesAndDurationStatus = string;

/** The response of a ManagedInstanceOperation list operation. */
export interface _ManagedInstanceOperationListResult {
  /** The ManagedInstanceOperation items on this page */
  value: ManagedInstanceOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstanceOperationListResultDeserializer(
  item: any,
): _ManagedInstanceOperationListResult {
  return {
    value: managedInstanceOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstanceOperationArrayDeserializer(
  result: Array<ManagedInstanceOperation>,
): any[] {
  return result.map((item) => {
    return managedInstanceOperationDeserializer(item);
  });
}

/** A private endpoint connection */
export interface ManagedInstancePrivateEndpointConnection extends ProxyResource {
  /** Private endpoint which the connection belongs to. */
  privateEndpoint?: ManagedInstancePrivateEndpointProperty;
  /** Connection State of the Private Endpoint Connection. */
  privateLinkServiceConnectionState?: ManagedInstancePrivateLinkServiceConnectionStateProperty;
  /** State of the Private Endpoint Connection. */
  readonly provisioningState?: string;
}

export function managedInstancePrivateEndpointConnectionSerializer(
  item: ManagedInstancePrivateEndpointConnection,
): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _managedInstancePrivateEndpointConnectionPropertiesSerializer(item),
  };
}

export function managedInstancePrivateEndpointConnectionDeserializer(
  item: any,
): ManagedInstancePrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstancePrivateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** The response of a ManagedInstancePrivateEndpointConnection list operation. */
export interface _ManagedInstancePrivateEndpointConnectionListResult {
  /** The ManagedInstancePrivateEndpointConnection items on this page */
  value: ManagedInstancePrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstancePrivateEndpointConnectionListResultDeserializer(
  item: any,
): _ManagedInstancePrivateEndpointConnectionListResult {
  return {
    value: managedInstancePrivateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstancePrivateEndpointConnectionArraySerializer(
  result: Array<ManagedInstancePrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return managedInstancePrivateEndpointConnectionSerializer(item);
  });
}

export function managedInstancePrivateEndpointConnectionArrayDeserializer(
  result: Array<ManagedInstancePrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return managedInstancePrivateEndpointConnectionDeserializer(item);
  });
}

/** A managed instance vulnerability assessment. */
export interface ManagedInstanceVulnerabilityAssessment extends ProxyResource {
  /** A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/). */
  storageContainerPath?: string;
  /** A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageContainerSasKey?: string;
  /** Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageAccountAccessKey?: string;
  /** The recurring scans settings */
  recurringScans?: VulnerabilityAssessmentRecurringScansProperties;
}

export function managedInstanceVulnerabilityAssessmentSerializer(
  item: ManagedInstanceVulnerabilityAssessment,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "storageContainerPath",
      "storageContainerSasKey",
      "storageAccountAccessKey",
      "recurringScans",
    ])
      ? undefined
      : _managedInstanceVulnerabilityAssessmentPropertiesSerializer(item),
  };
}

export function managedInstanceVulnerabilityAssessmentDeserializer(
  item: any,
): ManagedInstanceVulnerabilityAssessment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstanceVulnerabilityAssessmentPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a managed instance vulnerability assessment. */
export interface ManagedInstanceVulnerabilityAssessmentProperties {
  /** A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/). */
  storageContainerPath: string;
  /** A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageContainerSasKey?: string;
  /** Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageAccountAccessKey?: string;
  /** The recurring scans settings */
  recurringScans?: VulnerabilityAssessmentRecurringScansProperties;
}

export function managedInstanceVulnerabilityAssessmentPropertiesSerializer(
  item: ManagedInstanceVulnerabilityAssessmentProperties,
): any {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesSerializer(item["recurringScans"]),
  };
}

export function managedInstanceVulnerabilityAssessmentPropertiesDeserializer(
  item: any,
): ManagedInstanceVulnerabilityAssessmentProperties {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesDeserializer(item["recurringScans"]),
  };
}

/** The response of a ManagedInstanceVulnerabilityAssessment list operation. */
export interface _ManagedInstanceVulnerabilityAssessmentListResult {
  /** The ManagedInstanceVulnerabilityAssessment items on this page */
  value: ManagedInstanceVulnerabilityAssessment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstanceVulnerabilityAssessmentListResultDeserializer(
  item: any,
): _ManagedInstanceVulnerabilityAssessmentListResult {
  return {
    value: managedInstanceVulnerabilityAssessmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstanceVulnerabilityAssessmentArraySerializer(
  result: Array<ManagedInstanceVulnerabilityAssessment>,
): any[] {
  return result.map((item) => {
    return managedInstanceVulnerabilityAssessmentSerializer(item);
  });
}

export function managedInstanceVulnerabilityAssessmentArrayDeserializer(
  result: Array<ManagedInstanceVulnerabilityAssessment>,
): any[] {
  return result.map((item) => {
    return managedInstanceVulnerabilityAssessmentDeserializer(item);
  });
}

/** A managed server DNS alias. */
export interface ManagedServerDnsAlias extends ProxyResource {
  /** The fully qualified DNS record for managed server alias */
  readonly azureDnsRecord?: string;
  /** The fully qualified public DNS record for managed server alias */
  readonly publicAzureDnsRecord?: string;
}

export function managedServerDnsAliasDeserializer(item: any): ManagedServerDnsAlias {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedServerDnsAliasPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a managed server DNS alias. */
export interface ManagedServerDnsAliasProperties {
  /** The fully qualified DNS record for managed server alias */
  readonly azureDnsRecord?: string;
  /** The fully qualified public DNS record for managed server alias */
  readonly publicAzureDnsRecord?: string;
}

export function managedServerDnsAliasPropertiesDeserializer(
  item: any,
): ManagedServerDnsAliasProperties {
  return {
    azureDnsRecord: item["azureDnsRecord"],
    publicAzureDnsRecord: item["publicAzureDnsRecord"],
  };
}

/** A managed server dns alias creation request. */
export interface ManagedServerDnsAliasCreation {
  /** Whether or not DNS record should be created for this alias. */
  createDnsRecord?: boolean;
}

export function managedServerDnsAliasCreationSerializer(item: ManagedServerDnsAliasCreation): any {
  return { createDnsRecord: item["createDnsRecord"] };
}

/** The response of a ManagedServerDnsAlias list operation. */
export interface _ManagedServerDnsAliasListResult {
  /** The ManagedServerDnsAlias items on this page */
  value: ManagedServerDnsAlias[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedServerDnsAliasListResultDeserializer(
  item: any,
): _ManagedServerDnsAliasListResult {
  return {
    value: managedServerDnsAliasArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedServerDnsAliasArrayDeserializer(
  result: Array<ManagedServerDnsAlias>,
): any[] {
  return result.map((item) => {
    return managedServerDnsAliasDeserializer(item);
  });
}

/** A managed server DNS alias acquisition request. */
export interface ManagedServerDnsAliasAcquisition {
  /** The resource ID of the managed server DNS alias that will be acquired to point to this managed server instead. */
  oldManagedServerDnsAliasResourceId: string;
}

export function managedServerDnsAliasAcquisitionSerializer(
  item: ManagedServerDnsAliasAcquisition,
): any {
  return { oldManagedServerDnsAliasResourceId: item["oldManagedServerDnsAliasResourceId"] };
}

/** A managed server security alert policy. */
export interface ManagedServerSecurityAlertPolicy extends ProxyResource {
  /** Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database. */
  state?: SecurityAlertsPolicyState;
  /** Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force */
  disabledAlerts?: string[];
  /** Specifies an array of e-mail addresses to which the alert is sent. */
  emailAddresses?: string[];
  /** Specifies that the alert is sent to the account administrators. */
  emailAccountAdmins?: boolean;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs. */
  storageEndpoint?: string;
  /** Specifies the identifier key of the Threat Detection audit storage account. */
  storageAccountAccessKey?: string;
  /** Specifies the number of days to keep in the Threat Detection audit logs. */
  retentionDays?: number;
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
}

export function managedServerSecurityAlertPolicySerializer(
  item: ManagedServerSecurityAlertPolicy,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "state",
      "disabledAlerts",
      "emailAddresses",
      "emailAccountAdmins",
      "storageEndpoint",
      "storageAccountAccessKey",
      "retentionDays",
    ])
      ? undefined
      : _managedServerSecurityAlertPolicyPropertiesSerializer(item),
  };
}

export function managedServerSecurityAlertPolicyDeserializer(
  item: any,
): ManagedServerSecurityAlertPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedServerSecurityAlertPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** The response of a ManagedServerSecurityAlertPolicy list operation. */
export interface _ManagedServerSecurityAlertPolicyListResult {
  /** The ManagedServerSecurityAlertPolicy items on this page */
  value: ManagedServerSecurityAlertPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedServerSecurityAlertPolicyListResultDeserializer(
  item: any,
): _ManagedServerSecurityAlertPolicyListResult {
  return {
    value: managedServerSecurityAlertPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedServerSecurityAlertPolicyArraySerializer(
  result: Array<ManagedServerSecurityAlertPolicy>,
): any[] {
  return result.map((item) => {
    return managedServerSecurityAlertPolicySerializer(item);
  });
}

export function managedServerSecurityAlertPolicyArrayDeserializer(
  result: Array<ManagedServerSecurityAlertPolicy>,
): any[] {
  return result.map((item) => {
    return managedServerSecurityAlertPolicyDeserializer(item);
  });
}

/** NSP Configuration for a server. */
export interface NetworkSecurityPerimeterConfiguration extends ProxyResource {
  readonly provisioningState?: string;
  networkSecurityPerimeter?: NSPConfigPerimeter;
  resourceAssociation?: NSPConfigAssociation;
  profile?: NSPConfigProfile;
  provisioningIssues?: NSPProvisioningIssue[];
}

export function networkSecurityPerimeterConfigurationDeserializer(
  item: any,
): NetworkSecurityPerimeterConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _networkSecurityPerimeterConfigurationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of an NSP config. */
export interface NetworkSecurityPerimeterConfigurationProperties {
  readonly provisioningState?: string;
  networkSecurityPerimeter?: NSPConfigPerimeter;
  resourceAssociation?: NSPConfigAssociation;
  profile?: NSPConfigProfile;
  provisioningIssues?: NSPProvisioningIssue[];
}

export function networkSecurityPerimeterConfigurationPropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : nspConfigPerimeterDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : nspConfigAssociationDeserializer(item["resourceAssociation"]),
    profile: !item["profile"] ? item["profile"] : nspConfigProfileDeserializer(item["profile"]),
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : nspProvisioningIssueArrayDeserializer(item["provisioningIssues"]),
  };
}

/** model interface NSPConfigPerimeter */
export interface NSPConfigPerimeter {
  id?: string;
  perimeterGuid?: string;
  location?: string;
}

export function nspConfigPerimeterDeserializer(item: any): NSPConfigPerimeter {
  return {
    id: item["id"],
    perimeterGuid: item["perimeterGuid"],
    location: item["location"],
  };
}

/** model interface NSPConfigAssociation */
export interface NSPConfigAssociation {
  name?: string;
  accessMode?: string;
}

export function nspConfigAssociationDeserializer(item: any): NSPConfigAssociation {
  return {
    name: item["name"],
    accessMode: item["accessMode"],
  };
}

/** model interface NSPConfigProfile */
export interface NSPConfigProfile {
  name?: string;
  accessRulesVersion?: string;
  accessRules?: NSPConfigAccessRule[];
}

export function nspConfigProfileDeserializer(item: any): NSPConfigProfile {
  return {
    name: item["name"],
    accessRulesVersion: item["accessRulesVersion"],
    accessRules: !item["accessRules"]
      ? item["accessRules"]
      : nspConfigAccessRuleArrayDeserializer(item["accessRules"]),
  };
}

export function nspConfigAccessRuleArrayDeserializer(result: Array<NSPConfigAccessRule>): any[] {
  return result.map((item) => {
    return nspConfigAccessRuleDeserializer(item);
  });
}

/** model interface NSPConfigAccessRule */
export interface NSPConfigAccessRule {
  name?: string;
  properties?: NSPConfigAccessRuleProperties;
}

export function nspConfigAccessRuleDeserializer(item: any): NSPConfigAccessRule {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : nspConfigAccessRulePropertiesDeserializer(item["properties"]),
  };
}

/** model interface NSPConfigAccessRuleProperties */
export interface NSPConfigAccessRuleProperties {
  direction?: string;
  addressPrefixes?: string[];
  fullyQualifiedDomainNames?: string[];
  subscriptions?: string[];
  networkSecurityPerimeters?: NSPConfigNetworkSecurityPerimeterRule[];
  serviceTags?: string[];
}

export function nspConfigAccessRulePropertiesDeserializer(
  item: any,
): NSPConfigAccessRuleProperties {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    fullyQualifiedDomainNames: !item["fullyQualifiedDomainNames"]
      ? item["fullyQualifiedDomainNames"]
      : item["fullyQualifiedDomainNames"].map((p: any) => {
          return p;
        }),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : item["subscriptions"].map((p: any) => {
          return p;
        }),
    networkSecurityPerimeters: !item["networkSecurityPerimeters"]
      ? item["networkSecurityPerimeters"]
      : nspConfigNetworkSecurityPerimeterRuleArrayDeserializer(item["networkSecurityPerimeters"]),
    serviceTags: !item["serviceTags"]
      ? item["serviceTags"]
      : item["serviceTags"].map((p: any) => {
          return p;
        }),
  };
}

export function nspConfigNetworkSecurityPerimeterRuleArrayDeserializer(
  result: Array<NSPConfigNetworkSecurityPerimeterRule>,
): any[] {
  return result.map((item) => {
    return nspConfigNetworkSecurityPerimeterRuleDeserializer(item);
  });
}

/** model interface NSPConfigNetworkSecurityPerimeterRule */
export interface NSPConfigNetworkSecurityPerimeterRule {
  id?: string;
  perimeterGuid?: string;
  location?: string;
}

export function nspConfigNetworkSecurityPerimeterRuleDeserializer(
  item: any,
): NSPConfigNetworkSecurityPerimeterRule {
  return {
    id: item["id"],
    perimeterGuid: item["perimeterGuid"],
    location: item["location"],
  };
}

export function nspProvisioningIssueArrayDeserializer(result: Array<NSPProvisioningIssue>): any[] {
  return result.map((item) => {
    return nspProvisioningIssueDeserializer(item);
  });
}

/** model interface NSPProvisioningIssue */
export interface NSPProvisioningIssue {
  name?: string;
  properties?: NSPProvisioningIssueProperties;
}

export function nspProvisioningIssueDeserializer(item: any): NSPProvisioningIssue {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : nspProvisioningIssuePropertiesDeserializer(item["properties"]),
  };
}

/** model interface NSPProvisioningIssueProperties */
export interface NSPProvisioningIssueProperties {
  issueType?: string;
  severity?: string;
  description?: string;
  suggestedResourceIds?: string[];
  suggestedAccessRules?: string[];
}

export function nspProvisioningIssuePropertiesDeserializer(
  item: any,
): NSPProvisioningIssueProperties {
  return {
    issueType: item["issueType"],
    severity: item["severity"],
    description: item["description"],
    suggestedResourceIds: !item["suggestedResourceIds"]
      ? item["suggestedResourceIds"]
      : item["suggestedResourceIds"].map((p: any) => {
          return p;
        }),
    suggestedAccessRules: !item["suggestedAccessRules"]
      ? item["suggestedAccessRules"]
      : item["suggestedAccessRules"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a NetworkSecurityPerimeterConfiguration list operation. */
export interface _NetworkSecurityPerimeterConfigurationListResult {
  /** The NetworkSecurityPerimeterConfiguration items on this page */
  value: NetworkSecurityPerimeterConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkSecurityPerimeterConfigurationListResultDeserializer(
  item: any,
): _NetworkSecurityPerimeterConfigurationListResult {
  return {
    value: networkSecurityPerimeterConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkSecurityPerimeterConfigurationArrayDeserializer(
  result: Array<NetworkSecurityPerimeterConfiguration>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterConfigurationDeserializer(item);
  });
}

/** An Azure SQL DB Server Outbound Firewall Rule. */
export interface OutboundFirewallRule extends ProxyResource {
  /** The state of the outbound rule. */
  readonly provisioningState?: string;
}

export function outboundFirewallRuleDeserializer(item: any): OutboundFirewallRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _outboundFirewallRulePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of an outbound firewall rule. */
export interface OutboundFirewallRuleProperties {
  /** The state of the outbound rule. */
  readonly provisioningState?: string;
}

export function outboundFirewallRulePropertiesDeserializer(
  item: any,
): OutboundFirewallRuleProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** The response of a OutboundFirewallRule list operation. */
export interface _OutboundFirewallRuleListResult {
  /** The OutboundFirewallRule items on this page */
  value: OutboundFirewallRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _outboundFirewallRuleListResultDeserializer(
  item: any,
): _OutboundFirewallRuleListResult {
  return {
    value: outboundFirewallRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function outboundFirewallRuleArrayDeserializer(result: Array<OutboundFirewallRule>): any[] {
  return result.map((item) => {
    return outboundFirewallRuleDeserializer(item);
  });
}

/** A private endpoint connection */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Private endpoint which the connection belongs to. */
  privateEndpoint?: PrivateEndpointProperty;
  /** Group IDs. */
  readonly groupIds?: string[];
  /** Connection state of the private endpoint connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateProperty;
  /** State of the private endpoint connection. */
  readonly provisioningState?: PrivateEndpointProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource group id. */
  readonly properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource required zone names. */
  readonly requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a PrivateLinkResource list operation. */
export interface _PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A recoverable database resource. */
export interface RecoverableDatabase extends ProxyResource {
  /** The edition of the database. */
  readonly edition?: string;
  /** The service level objective name of the database. */
  readonly serviceLevelObjective?: string;
  /** The elastic pool name of the database */
  readonly elasticPoolName?: string;
  /** The last available backup date. */
  readonly lastAvailableBackupDate?: Date;
  /** The resource ids of the user assigned identities to use */
  keys?: Record<string, DatabaseKey>;
}

export function recoverableDatabaseDeserializer(item: any): RecoverableDatabase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _recoverableDatabasePropertiesDeserializer(item["properties"])),
  };
}

/** The recoverable database's properties. */
export interface RecoverableDatabaseProperties {
  /** The edition of the database. */
  readonly edition?: string;
  /** The service level objective name of the database. */
  readonly serviceLevelObjective?: string;
  /** The elastic pool name of the database */
  readonly elasticPoolName?: string;
  /** The last available backup date. */
  readonly lastAvailableBackupDate?: Date;
  /** The resource ids of the user assigned identities to use */
  keys?: Record<string, DatabaseKey>;
}

export function recoverableDatabasePropertiesDeserializer(
  item: any,
): RecoverableDatabaseProperties {
  return {
    edition: item["edition"],
    serviceLevelObjective: item["serviceLevelObjective"],
    elasticPoolName: item["elasticPoolName"],
    lastAvailableBackupDate: !item["lastAvailableBackupDate"]
      ? item["lastAvailableBackupDate"]
      : new Date(item["lastAvailableBackupDate"]),
    keys: !item["keys"] ? item["keys"] : databaseKeyRecordDeserializer(item["keys"]),
  };
}

/** The response of a RecoverableDatabase list operation. */
export interface _RecoverableDatabaseListResult {
  /** The RecoverableDatabase items on this page */
  value: RecoverableDatabase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recoverableDatabaseListResultDeserializer(
  item: any,
): _RecoverableDatabaseListResult {
  return {
    value: recoverableDatabaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recoverableDatabaseArrayDeserializer(result: Array<RecoverableDatabase>): any[] {
  return result.map((item) => {
    return recoverableDatabaseDeserializer(item);
  });
}

/** A recoverable managed database resource. */
export interface RecoverableManagedDatabase extends ProxyResource {
  /** The last available backup date. */
  readonly lastAvailableBackupDate?: string;
}

export function recoverableManagedDatabaseDeserializer(item: any): RecoverableManagedDatabase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _recoverableManagedDatabasePropertiesDeserializer(item["properties"])),
  };
}

/** The recoverable managed database's properties. */
export interface RecoverableManagedDatabaseProperties {
  /** The last available backup date. */
  readonly lastAvailableBackupDate?: string;
}

export function recoverableManagedDatabasePropertiesDeserializer(
  item: any,
): RecoverableManagedDatabaseProperties {
  return {
    lastAvailableBackupDate: item["lastAvailableBackupDate"],
  };
}

/** The response of a RecoverableManagedDatabase list operation. */
export interface _RecoverableManagedDatabaseListResult {
  /** The RecoverableManagedDatabase items on this page */
  value: RecoverableManagedDatabase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recoverableManagedDatabaseListResultDeserializer(
  item: any,
): _RecoverableManagedDatabaseListResult {
  return {
    value: recoverableManagedDatabaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recoverableManagedDatabaseArrayDeserializer(
  result: Array<RecoverableManagedDatabase>,
): any[] {
  return result.map((item) => {
    return recoverableManagedDatabaseDeserializer(item);
  });
}

/** A restorable dropped database resource. */
export interface RestorableDroppedDatabase extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Resource location. */
  location?: string;
  /** The name and tier of the SKU. */
  sku?: Sku;
  /** The name of the database. */
  readonly databaseName?: string;
  /** The max size of the database expressed in bytes. */
  readonly maxSizeBytes?: number;
  /** The creation date of the database (ISO8601 format). */
  readonly creationDate?: Date;
  /** The deletion date of the database (ISO8601 format). */
  readonly deletionDate?: Date;
  /** The earliest restore date of the database (ISO8601 format). */
  readonly earliestRestoreDate?: Date;
  /** The storage account type used to store backups for this database. */
  readonly backupStorageRedundancy?: BackupStorageRedundancy;
  /** The resource ids of the user assigned identities to use */
  keys?: Record<string, DatabaseKey>;
}

export function restorableDroppedDatabaseDeserializer(item: any): RestorableDroppedDatabase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _restorableDroppedDatabasePropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** The restorable dropped database's properties. */
export interface RestorableDroppedDatabaseProperties {
  /** The name of the database. */
  readonly databaseName?: string;
  /** The max size of the database expressed in bytes. */
  readonly maxSizeBytes?: number;
  /** The creation date of the database (ISO8601 format). */
  readonly creationDate?: Date;
  /** The deletion date of the database (ISO8601 format). */
  readonly deletionDate?: Date;
  /** The earliest restore date of the database (ISO8601 format). */
  readonly earliestRestoreDate?: Date;
  /** The storage account type used to store backups for this database. */
  readonly backupStorageRedundancy?: BackupStorageRedundancy;
  /** The resource ids of the user assigned identities to use */
  keys?: Record<string, DatabaseKey>;
}

export function restorableDroppedDatabasePropertiesDeserializer(
  item: any,
): RestorableDroppedDatabaseProperties {
  return {
    databaseName: item["databaseName"],
    maxSizeBytes: item["maxSizeBytes"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
    earliestRestoreDate: !item["earliestRestoreDate"]
      ? item["earliestRestoreDate"]
      : new Date(item["earliestRestoreDate"]),
    backupStorageRedundancy: item["backupStorageRedundancy"],
    keys: !item["keys"] ? item["keys"] : databaseKeyRecordDeserializer(item["keys"]),
  };
}

/** The response of a RestorableDroppedDatabase list operation. */
export interface _RestorableDroppedDatabaseListResult {
  /** The RestorableDroppedDatabase items on this page */
  value: RestorableDroppedDatabase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _restorableDroppedDatabaseListResultDeserializer(
  item: any,
): _RestorableDroppedDatabaseListResult {
  return {
    value: restorableDroppedDatabaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableDroppedDatabaseArrayDeserializer(
  result: Array<RestorableDroppedDatabase>,
): any[] {
  return result.map((item) => {
    return restorableDroppedDatabaseDeserializer(item);
  });
}

/** A restorable dropped managed database resource. */
export interface RestorableDroppedManagedDatabase extends TrackedResource {
  /** The name of the database. */
  readonly databaseName?: string;
  /** The creation date of the database (ISO8601 format). */
  readonly creationDate?: Date;
  /** The deletion date of the database (ISO8601 format). */
  readonly deletionDate?: Date;
  /** The earliest restore date of the database (ISO8601 format). */
  readonly earliestRestoreDate?: Date;
}

export function restorableDroppedManagedDatabaseDeserializer(
  item: any,
): RestorableDroppedManagedDatabase {
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
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _restorableDroppedManagedDatabasePropertiesDeserializer(item["properties"])),
  };
}

/** The restorable dropped managed database's properties. */
export interface RestorableDroppedManagedDatabaseProperties {
  /** The name of the database. */
  readonly databaseName?: string;
  /** The creation date of the database (ISO8601 format). */
  readonly creationDate?: Date;
  /** The deletion date of the database (ISO8601 format). */
  readonly deletionDate?: Date;
  /** The earliest restore date of the database (ISO8601 format). */
  readonly earliestRestoreDate?: Date;
}

export function restorableDroppedManagedDatabasePropertiesDeserializer(
  item: any,
): RestorableDroppedManagedDatabaseProperties {
  return {
    databaseName: item["databaseName"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
    earliestRestoreDate: !item["earliestRestoreDate"]
      ? item["earliestRestoreDate"]
      : new Date(item["earliestRestoreDate"]),
  };
}

/** The response of a RestorableDroppedManagedDatabase list operation. */
export interface _RestorableDroppedManagedDatabaseListResult {
  /** The RestorableDroppedManagedDatabase items on this page */
  value: RestorableDroppedManagedDatabase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _restorableDroppedManagedDatabaseListResultDeserializer(
  item: any,
): _RestorableDroppedManagedDatabaseListResult {
  return {
    value: restorableDroppedManagedDatabaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableDroppedManagedDatabaseArrayDeserializer(
  result: Array<RestorableDroppedManagedDatabase>,
): any[] {
  return result.map((item) => {
    return restorableDroppedManagedDatabaseDeserializer(item);
  });
}

/** Azure Active Directory administrator. */
export interface ServerAzureADAdministrator extends ProxyResource {
  /** Type of the sever administrator. */
  administratorType?: AdministratorType;
  /** Login name of the server administrator. */
  login?: string;
  /** SID (object ID) of the server administrator. */
  sid?: string;
  /** Tenant ID of the administrator. */
  tenantId?: string;
  /** Azure Active Directory only Authentication enabled. */
  readonly azureADOnlyAuthentication?: boolean;
}

export function serverAzureADAdministratorSerializer(item: ServerAzureADAdministrator): any {
  return {
    properties: areAllPropsUndefined(item, ["administratorType", "login", "sid", "tenantId"])
      ? undefined
      : _serverAzureADAdministratorPropertiesSerializer(item),
  };
}

export function serverAzureADAdministratorDeserializer(item: any): ServerAzureADAdministrator {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverAzureADAdministratorPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a active directory administrator. */
export interface AdministratorProperties {
  /** Type of the sever administrator. */
  administratorType?: AdministratorType;
  /** Login name of the server administrator. */
  login: string;
  /** SID (object ID) of the server administrator. */
  sid: string;
  /** Tenant ID of the administrator. */
  tenantId?: string;
  /** Azure Active Directory only Authentication enabled. */
  readonly azureADOnlyAuthentication?: boolean;
}

export function administratorPropertiesSerializer(item: AdministratorProperties): any {
  return {
    administratorType: item["administratorType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
  };
}

export function administratorPropertiesDeserializer(item: any): AdministratorProperties {
  return {
    administratorType: item["administratorType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
    azureADOnlyAuthentication: item["azureADOnlyAuthentication"],
  };
}

/** A list of active directory administrators. */
export interface _AdministratorListResult {
  /** Array of results. */
  readonly value?: ServerAzureADAdministrator[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _administratorListResultDeserializer(item: any): _AdministratorListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : serverAzureADAdministratorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverAzureADAdministratorArraySerializer(
  result: Array<ServerAzureADAdministrator>,
): any[] {
  return result.map((item) => {
    return serverAzureADAdministratorSerializer(item);
  });
}

export function serverAzureADAdministratorArrayDeserializer(
  result: Array<ServerAzureADAdministrator>,
): any[] {
  return result.map((item) => {
    return serverAzureADAdministratorDeserializer(item);
  });
}

/** Azure Active Directory only authentication. */
export interface ServerAzureADOnlyAuthentication extends ProxyResource {
  /** Azure Active Directory only Authentication enabled. */
  azureADOnlyAuthentication?: boolean;
}

export function serverAzureADOnlyAuthenticationSerializer(
  item: ServerAzureADOnlyAuthentication,
): any {
  return {
    properties: areAllPropsUndefined(item, ["azureADOnlyAuthentication"])
      ? undefined
      : _serverAzureADOnlyAuthenticationPropertiesSerializer(item),
  };
}

export function serverAzureADOnlyAuthenticationDeserializer(
  item: any,
): ServerAzureADOnlyAuthentication {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverAzureADOnlyAuthenticationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a active directory only authentication. */
export interface AzureADOnlyAuthProperties {
  /** Azure Active Directory only Authentication enabled. */
  azureADOnlyAuthentication: boolean;
}

export function azureADOnlyAuthPropertiesSerializer(item: AzureADOnlyAuthProperties): any {
  return { azureADOnlyAuthentication: item["azureADOnlyAuthentication"] };
}

export function azureADOnlyAuthPropertiesDeserializer(item: any): AzureADOnlyAuthProperties {
  return {
    azureADOnlyAuthentication: item["azureADOnlyAuthentication"],
  };
}

/** A list of active directory only authentications. */
export interface _AzureADOnlyAuthListResult {
  /** Array of results. */
  readonly value?: ServerAzureADOnlyAuthentication[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _azureADOnlyAuthListResultDeserializer(item: any): _AzureADOnlyAuthListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : serverAzureADOnlyAuthenticationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverAzureADOnlyAuthenticationArraySerializer(
  result: Array<ServerAzureADOnlyAuthentication>,
): any[] {
  return result.map((item) => {
    return serverAzureADOnlyAuthenticationSerializer(item);
  });
}

export function serverAzureADOnlyAuthenticationArrayDeserializer(
  result: Array<ServerAzureADOnlyAuthentication>,
): any[] {
  return result.map((item) => {
    return serverAzureADOnlyAuthenticationDeserializer(item);
  });
}

/** A server configuration option */
export interface ServerConfigurationOption extends ProxyResource {
  /** Value of the server configuration option. */
  serverConfigurationOptionValue?: number;
  /** Provisioning state of server configuration option. */
  readonly provisioningState?: ProvisioningState;
}

export function serverConfigurationOptionSerializer(item: ServerConfigurationOption): any {
  return {
    properties: areAllPropsUndefined(item, ["serverConfigurationOptionValue"])
      ? undefined
      : _serverConfigurationOptionPropertiesSerializer(item),
  };
}

export function serverConfigurationOptionDeserializer(item: any): ServerConfigurationOption {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverConfigurationOptionPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of server configuration option. */
export interface ServerConfigurationOptionProperties {
  /** Value of the server configuration option. */
  serverConfigurationOptionValue: number;
  /** Provisioning state of server configuration option. */
  readonly provisioningState?: ProvisioningState;
}

export function serverConfigurationOptionPropertiesSerializer(
  item: ServerConfigurationOptionProperties,
): any {
  return { serverConfigurationOptionValue: item["serverConfigurationOptionValue"] };
}

export function serverConfigurationOptionPropertiesDeserializer(
  item: any,
): ServerConfigurationOptionProperties {
  return {
    serverConfigurationOptionValue: item["serverConfigurationOptionValue"],
    provisioningState: item["provisioningState"],
  };
}

/** Known values of {@link ServerConfigurationOptionName} that the service accepts. */
export enum KnownServerConfigurationOptionName {
  /** allowPolybaseExport */
  AllowPolybaseExport = "allowPolybaseExport",
}

/** Type of ServerConfigurationOptionName */
export type ServerConfigurationOptionName = string;

/** The response of a ServerConfigurationOption list operation. */
export interface _ServerConfigurationOptionListResult {
  /** The ServerConfigurationOption items on this page */
  value: ServerConfigurationOption[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverConfigurationOptionListResultDeserializer(
  item: any,
): _ServerConfigurationOptionListResult {
  return {
    value: serverConfigurationOptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverConfigurationOptionArraySerializer(
  result: Array<ServerConfigurationOption>,
): any[] {
  return result.map((item) => {
    return serverConfigurationOptionSerializer(item);
  });
}

export function serverConfigurationOptionArrayDeserializer(
  result: Array<ServerConfigurationOption>,
): any[] {
  return result.map((item) => {
    return serverConfigurationOptionDeserializer(item);
  });
}

/** A server connection policy */
export interface ServerConnectionPolicy extends ProxyResource {
  /** Resource location. */
  readonly location?: string;
  /** Metadata used for the Azure portal experience. */
  readonly kind?: string;
  /** The server connection type. */
  connectionType?: ServerConnectionType;
}

export function serverConnectionPolicySerializer(item: ServerConnectionPolicy): any {
  return {
    properties: areAllPropsUndefined(item, ["connectionType"])
      ? undefined
      : _serverConnectionPolicyPropertiesSerializer(item),
  };
}

export function serverConnectionPolicyDeserializer(item: any): ServerConnectionPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverConnectionPolicyPropertiesDeserializer(item["properties"])),
    location: item["location"],
    kind: item["kind"],
  };
}

/** The properties of a server connection policy. */
export interface ServerConnectionPolicyProperties {
  /** The server connection type. */
  connectionType: ServerConnectionType;
}

export function serverConnectionPolicyPropertiesSerializer(
  item: ServerConnectionPolicyProperties,
): any {
  return { connectionType: item["connectionType"] };
}

export function serverConnectionPolicyPropertiesDeserializer(
  item: any,
): ServerConnectionPolicyProperties {
  return {
    connectionType: item["connectionType"],
  };
}

/** The server connection type. */
export enum KnownServerConnectionType {
  /** Default */
  Default = "Default",
  /** Redirect */
  Redirect = "Redirect",
  /** Proxy */
  Proxy = "Proxy",
}

/**
 * The server connection type. \
 * {@link KnownServerConnectionType} can be used interchangeably with ServerConnectionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default \
 * **Redirect**: Redirect \
 * **Proxy**: Proxy
 */
export type ServerConnectionType = string;

/** Known values of {@link ConnectionPolicyName} that the service accepts. */
export enum KnownConnectionPolicyName {
  /** default */
  Default = "default",
}

/** Type of ConnectionPolicyName */
export type ConnectionPolicyName = string;

/** The response of a ServerConnectionPolicy list operation. */
export interface _ServerConnectionPolicyListResult {
  /** The ServerConnectionPolicy items on this page */
  value: ServerConnectionPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverConnectionPolicyListResultDeserializer(
  item: any,
): _ServerConnectionPolicyListResult {
  return {
    value: serverConnectionPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverConnectionPolicyArraySerializer(
  result: Array<ServerConnectionPolicy>,
): any[] {
  return result.map((item) => {
    return serverConnectionPolicySerializer(item);
  });
}

export function serverConnectionPolicyArrayDeserializer(
  result: Array<ServerConnectionPolicy>,
): any[] {
  return result.map((item) => {
    return serverConnectionPolicyDeserializer(item);
  });
}

/** A server DevOps auditing settings. */
export interface ServerDevOpsAuditingSettings extends ProxyResource {
  /**
   * Specifies whether DevOps audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure DevOps audit, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should be also created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /** Specifies whether Managed Identity is used to access blob storage */
  isManagedIdentityInUse?: boolean;
  /** Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required. */
  state?: BlobAuditingPolicyState;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required. */
  storageEndpoint?: string;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /** Specifies the blob storage subscription Id. */
  storageAccountSubscriptionId?: string;
}

export function serverDevOpsAuditingSettingsSerializer(item: ServerDevOpsAuditingSettings): any {
  return {
    properties: areAllPropsUndefined(item, [
      "isAzureMonitorTargetEnabled",
      "isManagedIdentityInUse",
      "state",
      "storageEndpoint",
      "storageAccountAccessKey",
      "storageAccountSubscriptionId",
    ])
      ? undefined
      : _serverDevOpsAuditingSettingsPropertiesSerializer(item),
  };
}

export function serverDevOpsAuditingSettingsDeserializer(item: any): ServerDevOpsAuditingSettings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverDevOpsAuditingSettingsPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a server DevOps audit settings. */
export interface ServerDevOpsAuditSettingsProperties {
  /**
   * Specifies whether DevOps audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure DevOps audit, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should be also created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /** Specifies whether Managed Identity is used to access blob storage */
  isManagedIdentityInUse?: boolean;
  /** Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required. */
  state: BlobAuditingPolicyState;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required. */
  storageEndpoint?: string;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /** Specifies the blob storage subscription Id. */
  storageAccountSubscriptionId?: string;
}

export function serverDevOpsAuditSettingsPropertiesSerializer(
  item: ServerDevOpsAuditSettingsProperties,
): any {
  return {
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function serverDevOpsAuditSettingsPropertiesDeserializer(
  item: any,
): ServerDevOpsAuditSettingsProperties {
  return {
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

/** Known values of {@link DevOpsAuditingSettingsName} that the service accepts. */
export enum KnownDevOpsAuditingSettingsName {
  /** Default */
  Default = "Default",
}

/** Type of DevOpsAuditingSettingsName */
export type DevOpsAuditingSettingsName = string;

/** A list of server DevOps audit settings. */
export interface _ServerDevOpsAuditSettingsListResult {
  /** Array of results. */
  readonly value?: ServerDevOpsAuditingSettings[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _serverDevOpsAuditSettingsListResultDeserializer(
  item: any,
): _ServerDevOpsAuditSettingsListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : serverDevOpsAuditingSettingsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverDevOpsAuditingSettingsArraySerializer(
  result: Array<ServerDevOpsAuditingSettings>,
): any[] {
  return result.map((item) => {
    return serverDevOpsAuditingSettingsSerializer(item);
  });
}

export function serverDevOpsAuditingSettingsArrayDeserializer(
  result: Array<ServerDevOpsAuditingSettings>,
): any[] {
  return result.map((item) => {
    return serverDevOpsAuditingSettingsDeserializer(item);
  });
}

/** A server DNS alias. */
export interface ServerDnsAlias extends ProxyResource {
  /** The fully qualified DNS record for alias */
  readonly azureDnsRecord?: string;
}

export function serverDnsAliasDeserializer(item: any): ServerDnsAlias {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverDnsAliasPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a server DNS alias. */
export interface ServerDnsAliasProperties {
  /** The fully qualified DNS record for alias */
  readonly azureDnsRecord?: string;
}

export function serverDnsAliasPropertiesDeserializer(item: any): ServerDnsAliasProperties {
  return {
    azureDnsRecord: item["azureDnsRecord"],
  };
}

/** The response of a ServerDnsAlias list operation. */
export interface _ServerDnsAliasListResult {
  /** The ServerDnsAlias items on this page */
  value: ServerDnsAlias[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverDnsAliasListResultDeserializer(item: any): _ServerDnsAliasListResult {
  return {
    value: serverDnsAliasArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverDnsAliasArrayDeserializer(result: Array<ServerDnsAlias>): any[] {
  return result.map((item) => {
    return serverDnsAliasDeserializer(item);
  });
}

/** A server dns alias acquisition request. */
export interface ServerDnsAliasAcquisition {
  /** The id of the server alias that will be acquired to point to this server instead. */
  oldServerDnsAliasId: string;
}

export function serverDnsAliasAcquisitionSerializer(item: ServerDnsAliasAcquisition): any {
  return { oldServerDnsAliasId: item["oldServerDnsAliasId"] };
}

/** A server key. */
export interface ServerKey extends ProxyResource {
  /** Kind of encryption protector. This is metadata used for the Azure portal experience. */
  readonly kind?: string;
  /** Resource location. */
  readonly location?: string;
  /** Subregion of the server key. */
  readonly subregion?: string;
  /** The server key type like 'ServiceManaged', 'AzureKeyVault'. */
  serverKeyType?: ServerKeyType;
  /** The URI of the server key. If the ServerKeyType is AzureKeyVault, then the URI is required. The AKV URI is required to be in this format: 'https://YourVaultName.vault.azure.net/keys/YourKeyName/YourKeyVersion' or can be 'https://YourVaultName.vault.azure.net/keys/YourKeyName' */
  uri?: string;
  /** Thumbprint of the server key. */
  readonly thumbprint?: string;
  /** The server key creation date. */
  readonly creationDate?: Date;
  /** Key auto rotation opt-in flag. Either true or false. */
  readonly autoRotationEnabled?: boolean;
  /** The version of the server key. */
  readonly keyVersion?: string;
}

export function serverKeySerializer(item: ServerKey): any {
  return {
    properties: areAllPropsUndefined(item, ["serverKeyType", "uri"])
      ? undefined
      : _serverKeyPropertiesSerializer(item),
  };
}

export function serverKeyDeserializer(item: any): ServerKey {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverKeyPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    location: item["location"],
  };
}

/** Properties for a server key execution. */
export interface ServerKeyProperties {
  /** Subregion of the server key. */
  readonly subregion?: string;
  /** The server key type like 'ServiceManaged', 'AzureKeyVault'. */
  serverKeyType: ServerKeyType;
  /** The URI of the server key. If the ServerKeyType is AzureKeyVault, then the URI is required. The AKV URI is required to be in this format: 'https://YourVaultName.vault.azure.net/keys/YourKeyName/YourKeyVersion' or can be 'https://YourVaultName.vault.azure.net/keys/YourKeyName' */
  uri?: string;
  /** Thumbprint of the server key. */
  readonly thumbprint?: string;
  /** The server key creation date. */
  readonly creationDate?: Date;
  /** Key auto rotation opt-in flag. Either true or false. */
  readonly autoRotationEnabled?: boolean;
  /** The version of the server key. */
  readonly keyVersion?: string;
}

export function serverKeyPropertiesSerializer(item: ServerKeyProperties): any {
  return { serverKeyType: item["serverKeyType"], uri: item["uri"] };
}

export function serverKeyPropertiesDeserializer(item: any): ServerKeyProperties {
  return {
    subregion: item["subregion"],
    serverKeyType: item["serverKeyType"],
    uri: item["uri"],
    thumbprint: item["thumbprint"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    autoRotationEnabled: item["autoRotationEnabled"],
    keyVersion: item["keyVersion"],
  };
}

/** The response of a ServerKey list operation. */
export interface _ServerKeyListResult {
  /** The ServerKey items on this page */
  value: ServerKey[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverKeyListResultDeserializer(item: any): _ServerKeyListResult {
  return {
    value: serverKeyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverKeyArraySerializer(result: Array<ServerKey>): any[] {
  return result.map((item) => {
    return serverKeySerializer(item);
  });
}

export function serverKeyArrayDeserializer(result: Array<ServerKey>): any[] {
  return result.map((item) => {
    return serverKeyDeserializer(item);
  });
}

/** A server security alert policy. */
export interface ServerSecurityAlertPolicy extends ProxyResource {
  /** Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database. */
  state?: SecurityAlertsPolicyState;
  /** Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force */
  disabledAlerts?: string[];
  /** Specifies an array of e-mail addresses to which the alert is sent. */
  emailAddresses?: string[];
  /** Specifies that the alert is sent to the account administrators. */
  emailAccountAdmins?: boolean;
  /** Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs. */
  storageEndpoint?: string;
  /** Specifies the identifier key of the Threat Detection audit storage account. */
  storageAccountAccessKey?: string;
  /** Specifies the number of days to keep in the Threat Detection audit logs. */
  retentionDays?: number;
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
}

export function serverSecurityAlertPolicySerializer(item: ServerSecurityAlertPolicy): any {
  return {
    properties: areAllPropsUndefined(item, [
      "state",
      "disabledAlerts",
      "emailAddresses",
      "emailAccountAdmins",
      "storageEndpoint",
      "storageAccountAccessKey",
      "retentionDays",
    ])
      ? undefined
      : _serverSecurityAlertPolicyPropertiesSerializer(item),
  };
}

export function serverSecurityAlertPolicyDeserializer(item: any): ServerSecurityAlertPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverSecurityAlertPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** A list of the server's security alert policies. */
export interface _LogicalServerSecurityAlertPolicyListResult {
  /** Array of results. */
  readonly value?: ServerSecurityAlertPolicy[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _logicalServerSecurityAlertPolicyListResultDeserializer(
  item: any,
): _LogicalServerSecurityAlertPolicyListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : serverSecurityAlertPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverSecurityAlertPolicyArraySerializer(
  result: Array<ServerSecurityAlertPolicy>,
): any[] {
  return result.map((item) => {
    return serverSecurityAlertPolicySerializer(item);
  });
}

export function serverSecurityAlertPolicyArrayDeserializer(
  result: Array<ServerSecurityAlertPolicy>,
): any[] {
  return result.map((item) => {
    return serverSecurityAlertPolicyDeserializer(item);
  });
}

/** Server trust certificate imported from box to enable connection between box and Sql Managed Instance. */
export interface ServerTrustCertificate extends ProxyResource {
  /** The certificate public blob */
  publicBlob?: string;
  /** The certificate thumbprint */
  readonly thumbprint?: string;
  /** The certificate name */
  readonly certificateName?: string;
}

export function serverTrustCertificateSerializer(item: ServerTrustCertificate): any {
  return {
    properties: areAllPropsUndefined(item, ["publicBlob"])
      ? undefined
      : _serverTrustCertificatePropertiesSerializer(item),
  };
}

export function serverTrustCertificateDeserializer(item: any): ServerTrustCertificate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverTrustCertificatePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a server trust certificate. */
export interface ServerTrustCertificateProperties {
  /** The certificate public blob */
  publicBlob?: string;
  /** The certificate thumbprint */
  readonly thumbprint?: string;
  /** The certificate name */
  readonly certificateName?: string;
}

export function serverTrustCertificatePropertiesSerializer(
  item: ServerTrustCertificateProperties,
): any {
  return { publicBlob: item["publicBlob"] };
}

export function serverTrustCertificatePropertiesDeserializer(
  item: any,
): ServerTrustCertificateProperties {
  return {
    publicBlob: item["publicBlob"],
    thumbprint: item["thumbprint"],
    certificateName: item["certificateName"],
  };
}

/** A list of server trust certificates in instance. */
export interface _ServerTrustCertificatesListResult {
  /** Array of results. */
  readonly value?: ServerTrustCertificate[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _serverTrustCertificatesListResultDeserializer(
  item: any,
): _ServerTrustCertificatesListResult {
  return {
    value: !item["value"] ? item["value"] : serverTrustCertificateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverTrustCertificateArraySerializer(
  result: Array<ServerTrustCertificate>,
): any[] {
  return result.map((item) => {
    return serverTrustCertificateSerializer(item);
  });
}

export function serverTrustCertificateArrayDeserializer(
  result: Array<ServerTrustCertificate>,
): any[] {
  return result.map((item) => {
    return serverTrustCertificateDeserializer(item);
  });
}

/** A server vulnerability assessment. */
export interface ServerVulnerabilityAssessment extends ProxyResource {
  /** A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/). */
  storageContainerPath?: string;
  /** A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageContainerSasKey?: string;
  /** Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageAccountAccessKey?: string;
  /** The recurring scans settings */
  recurringScans?: VulnerabilityAssessmentRecurringScansProperties;
}

export function serverVulnerabilityAssessmentSerializer(item: ServerVulnerabilityAssessment): any {
  return {
    properties: areAllPropsUndefined(item, [
      "storageContainerPath",
      "storageContainerSasKey",
      "storageAccountAccessKey",
      "recurringScans",
    ])
      ? undefined
      : _serverVulnerabilityAssessmentPropertiesSerializer(item),
  };
}

export function serverVulnerabilityAssessmentDeserializer(
  item: any,
): ServerVulnerabilityAssessment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverVulnerabilityAssessmentPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a server Vulnerability Assessment. */
export interface ServerVulnerabilityAssessmentProperties {
  /** A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/). */
  storageContainerPath: string;
  /** A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageContainerSasKey?: string;
  /** Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall */
  storageAccountAccessKey?: string;
  /** The recurring scans settings */
  recurringScans?: VulnerabilityAssessmentRecurringScansProperties;
}

export function serverVulnerabilityAssessmentPropertiesSerializer(
  item: ServerVulnerabilityAssessmentProperties,
): any {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesSerializer(item["recurringScans"]),
  };
}

export function serverVulnerabilityAssessmentPropertiesDeserializer(
  item: any,
): ServerVulnerabilityAssessmentProperties {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesDeserializer(item["recurringScans"]),
  };
}

/** The response of a ServerVulnerabilityAssessment list operation. */
export interface _ServerVulnerabilityAssessmentListResult {
  /** The ServerVulnerabilityAssessment items on this page */
  value: ServerVulnerabilityAssessment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverVulnerabilityAssessmentListResultDeserializer(
  item: any,
): _ServerVulnerabilityAssessmentListResult {
  return {
    value: serverVulnerabilityAssessmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverVulnerabilityAssessmentArraySerializer(
  result: Array<ServerVulnerabilityAssessment>,
): any[] {
  return result.map((item) => {
    return serverVulnerabilityAssessmentSerializer(item);
  });
}

export function serverVulnerabilityAssessmentArrayDeserializer(
  result: Array<ServerVulnerabilityAssessment>,
): any[] {
  return result.map((item) => {
    return serverVulnerabilityAssessmentDeserializer(item);
  });
}

/** Managed instance's Start/Stop schedule. */
export interface StartStopManagedInstanceSchedule extends ProxyResource {
  /** The description of the schedule. */
  description?: string;
  /** The time zone of the schedule. */
  timeZoneId?: string;
  /** Schedule list. */
  scheduleList?: ScheduleItem[];
  /** Next action to be executed (Start or Stop) */
  readonly nextRunAction?: string;
  /** Timestamp when the next action will be executed in the corresponding schedule time zone. */
  readonly nextExecutionTime?: string;
}

export function startStopManagedInstanceScheduleSerializer(
  item: StartStopManagedInstanceSchedule,
): any {
  return {
    properties: areAllPropsUndefined(item, ["description", "timeZoneId", "scheduleList"])
      ? undefined
      : _startStopManagedInstanceSchedulePropertiesSerializer(item),
  };
}

export function startStopManagedInstanceScheduleDeserializer(
  item: any,
): StartStopManagedInstanceSchedule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _startStopManagedInstanceSchedulePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of managed instance's Start/Stop schedule. */
export interface StartStopManagedInstanceScheduleProperties {
  /** The description of the schedule. */
  description?: string;
  /** The time zone of the schedule. */
  timeZoneId?: string;
  /** Schedule list. */
  scheduleList: ScheduleItem[];
  /** Next action to be executed (Start or Stop) */
  readonly nextRunAction?: string;
  /** Timestamp when the next action will be executed in the corresponding schedule time zone. */
  readonly nextExecutionTime?: string;
}

export function startStopManagedInstanceSchedulePropertiesSerializer(
  item: StartStopManagedInstanceScheduleProperties,
): any {
  return {
    description: item["description"],
    timeZoneId: item["timeZoneId"],
    scheduleList: scheduleItemArraySerializer(item["scheduleList"]),
  };
}

export function startStopManagedInstanceSchedulePropertiesDeserializer(
  item: any,
): StartStopManagedInstanceScheduleProperties {
  return {
    description: item["description"],
    timeZoneId: item["timeZoneId"],
    scheduleList: scheduleItemArrayDeserializer(item["scheduleList"]),
    nextRunAction: item["nextRunAction"],
    nextExecutionTime: item["nextExecutionTime"],
  };
}

export function scheduleItemArraySerializer(result: Array<ScheduleItem>): any[] {
  return result.map((item) => {
    return scheduleItemSerializer(item);
  });
}

export function scheduleItemArrayDeserializer(result: Array<ScheduleItem>): any[] {
  return result.map((item) => {
    return scheduleItemDeserializer(item);
  });
}

/** Schedule info describing when the server should be started or stopped. */
export interface ScheduleItem {
  /** Start day. */
  startDay: DayOfWeek;
  /** Start time. */
  startTime: string;
  /** Stop day. */
  stopDay: DayOfWeek;
  /** Stop time. */
  stopTime: string;
}

export function scheduleItemSerializer(item: ScheduleItem): any {
  return {
    startDay: item["startDay"],
    startTime: item["startTime"],
    stopDay: item["stopDay"],
    stopTime: item["stopTime"],
  };
}

export function scheduleItemDeserializer(item: any): ScheduleItem {
  return {
    startDay: item["startDay"],
    startTime: item["startTime"],
    stopDay: item["stopDay"],
    stopTime: item["stopTime"],
  };
}

/** Day of maintenance window. */
export enum KnownDayOfWeek {
  /** Sunday */
  Sunday = "Sunday",
  /** Monday */
  Monday = "Monday",
  /** Tuesday */
  Tuesday = "Tuesday",
  /** Wednesday */
  Wednesday = "Wednesday",
  /** Thursday */
  Thursday = "Thursday",
  /** Friday */
  Friday = "Friday",
  /** Saturday */
  Saturday = "Saturday",
}

/**
 * Day of maintenance window. \
 * {@link KnownDayOfWeek} can be used interchangeably with DayOfWeek,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sunday**: Sunday \
 * **Monday**: Monday \
 * **Tuesday**: Tuesday \
 * **Wednesday**: Wednesday \
 * **Thursday**: Thursday \
 * **Friday**: Friday \
 * **Saturday**: Saturday
 */
export type DayOfWeek = string;

/** Known values of {@link StartStopScheduleName} that the service accepts. */
export enum KnownStartStopScheduleName {
  /** default */
  Default = "default",
}

/** Type of StartStopScheduleName */
export type StartStopScheduleName = string;

/** The response of a StartStopManagedInstanceSchedule list operation. */
export interface _StartStopManagedInstanceScheduleListResult {
  /** The StartStopManagedInstanceSchedule items on this page */
  value: StartStopManagedInstanceSchedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _startStopManagedInstanceScheduleListResultDeserializer(
  item: any,
): _StartStopManagedInstanceScheduleListResult {
  return {
    value: startStopManagedInstanceScheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function startStopManagedInstanceScheduleArraySerializer(
  result: Array<StartStopManagedInstanceSchedule>,
): any[] {
  return result.map((item) => {
    return startStopManagedInstanceScheduleSerializer(item);
  });
}

export function startStopManagedInstanceScheduleArrayDeserializer(
  result: Array<StartStopManagedInstanceSchedule>,
): any[] {
  return result.map((item) => {
    return startStopManagedInstanceScheduleDeserializer(item);
  });
}

/** Usage Metric of a Subscription in a Location. */
export interface SubscriptionUsage extends ProxyResource {
  /** User-readable name of the metric. */
  readonly displayName?: string;
  /** Current value of the metric. */
  readonly currentValue?: number;
  /** Boundary value of the metric. */
  readonly limit?: number;
  /** Unit of the metric. */
  readonly unit?: string;
}

export function subscriptionUsageDeserializer(item: any): SubscriptionUsage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _subscriptionUsagePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a subscription usage. */
export interface SubscriptionUsageProperties {
  /** User-readable name of the metric. */
  readonly displayName?: string;
  /** Current value of the metric. */
  readonly currentValue?: number;
  /** Boundary value of the metric. */
  readonly limit?: number;
  /** Unit of the metric. */
  readonly unit?: string;
}

export function subscriptionUsagePropertiesDeserializer(item: any): SubscriptionUsageProperties {
  return {
    displayName: item["displayName"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    unit: item["unit"],
  };
}

/** The response of a SubscriptionUsage list operation. */
export interface _SubscriptionUsageListResult {
  /** The SubscriptionUsage items on this page */
  value: SubscriptionUsage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _subscriptionUsageListResultDeserializer(item: any): _SubscriptionUsageListResult {
  return {
    value: subscriptionUsageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function subscriptionUsageArrayDeserializer(result: Array<SubscriptionUsage>): any[] {
  return result.map((item) => {
    return subscriptionUsageDeserializer(item);
  });
}

/** An Azure SQL Database sync agent. */
export interface SyncAgent extends ProxyResource {
  /** Name of the sync agent. */
  readonly namePropertiesName?: string;
  /** ARM resource id of the sync database in the sync agent. */
  syncDatabaseId?: string;
  /** Last alive time of the sync agent. */
  readonly lastAliveTime?: Date;
  /** State of the sync agent. */
  readonly state?: SyncAgentState;
  /** If the sync agent version is up to date. */
  readonly isUpToDate?: boolean;
  /** Expiration time of the sync agent version. */
  readonly expiryTime?: Date;
  /** Version of the sync agent. */
  readonly version?: string;
}

export function syncAgentSerializer(item: SyncAgent): any {
  return {
    properties: areAllPropsUndefined(item, ["syncDatabaseId"])
      ? undefined
      : _syncAgentPropertiesSerializer(item),
  };
}

export function syncAgentDeserializer(item: any): SyncAgent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _syncAgentPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of an Azure SQL Database sync agent. */
export interface SyncAgentProperties {
  /** Name of the sync agent. */
  readonly name?: string;
  /** ARM resource id of the sync database in the sync agent. */
  syncDatabaseId?: string;
  /** Last alive time of the sync agent. */
  readonly lastAliveTime?: Date;
  /** State of the sync agent. */
  readonly state?: SyncAgentState;
  /** If the sync agent version is up to date. */
  readonly isUpToDate?: boolean;
  /** Expiration time of the sync agent version. */
  readonly expiryTime?: Date;
  /** Version of the sync agent. */
  readonly version?: string;
}

export function syncAgentPropertiesSerializer(item: SyncAgentProperties): any {
  return { syncDatabaseId: item["syncDatabaseId"] };
}

export function syncAgentPropertiesDeserializer(item: any): SyncAgentProperties {
  return {
    name: item["name"],
    syncDatabaseId: item["syncDatabaseId"],
    lastAliveTime: !item["lastAliveTime"] ? item["lastAliveTime"] : new Date(item["lastAliveTime"]),
    state: item["state"],
    isUpToDate: item["isUpToDate"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    version: item["version"],
  };
}

/** State of the sync agent. */
export enum KnownSyncAgentState {
  /** Online */
  Online = "Online",
  /** Offline */
  Offline = "Offline",
  /** NeverConnected */
  NeverConnected = "NeverConnected",
}

/**
 * State of the sync agent. \
 * {@link KnownSyncAgentState} can be used interchangeably with SyncAgentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Online**: Online \
 * **Offline**: Offline \
 * **NeverConnected**: NeverConnected
 */
export type SyncAgentState = string;

/** The response of a SyncAgent list operation. */
export interface _SyncAgentListResult {
  /** The SyncAgent items on this page */
  value: SyncAgent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _syncAgentListResultDeserializer(item: any): _SyncAgentListResult {
  return {
    value: syncAgentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function syncAgentArraySerializer(result: Array<SyncAgent>): any[] {
  return result.map((item) => {
    return syncAgentSerializer(item);
  });
}

export function syncAgentArrayDeserializer(result: Array<SyncAgent>): any[] {
  return result.map((item) => {
    return syncAgentDeserializer(item);
  });
}

/** Properties of an Azure SQL Database sync agent key. */
export interface SyncAgentKeyProperties {
  /** Key of sync agent. */
  readonly syncAgentKey?: string;
}

export function syncAgentKeyPropertiesDeserializer(item: any): SyncAgentKeyProperties {
  return {
    syncAgentKey: item["syncAgentKey"],
  };
}

/** The response of a SyncAgentLinkedDatabase list operation. */
export interface _SyncAgentLinkedDatabaseListResult {
  /** The SyncAgentLinkedDatabase items on this page */
  value: SyncAgentLinkedDatabase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _syncAgentLinkedDatabaseListResultDeserializer(
  item: any,
): _SyncAgentLinkedDatabaseListResult {
  return {
    value: syncAgentLinkedDatabaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function syncAgentLinkedDatabaseArrayDeserializer(
  result: Array<SyncAgentLinkedDatabase>,
): any[] {
  return result.map((item) => {
    return syncAgentLinkedDatabaseDeserializer(item);
  });
}

/** An Azure SQL Database sync agent linked database. */
export interface SyncAgentLinkedDatabase extends ProxyResourceAutoGenerated {
  /** Type of the sync agent linked database. */
  readonly databaseType?: SyncMemberDbType;
  /** Id of the sync agent linked database. */
  readonly databaseId?: string;
  /** Description of the sync agent linked database. */
  readonly description?: string;
  /** Server name of the sync agent linked database. */
  readonly serverName?: string;
  /** Database name of the sync agent linked database. */
  readonly databaseName?: string;
  /** User name of the sync agent linked database. */
  readonly userName?: string;
}

export function syncAgentLinkedDatabaseDeserializer(item: any): SyncAgentLinkedDatabase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _syncAgentLinkedDatabasePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of an Azure SQL Database sync agent linked database. */
export interface SyncAgentLinkedDatabaseProperties {
  /** Type of the sync agent linked database. */
  readonly databaseType?: SyncMemberDbType;
  /** Id of the sync agent linked database. */
  readonly databaseId?: string;
  /** Description of the sync agent linked database. */
  readonly description?: string;
  /** Server name of the sync agent linked database. */
  readonly serverName?: string;
  /** Database name of the sync agent linked database. */
  readonly databaseName?: string;
  /** User name of the sync agent linked database. */
  readonly userName?: string;
}

export function syncAgentLinkedDatabasePropertiesDeserializer(
  item: any,
): SyncAgentLinkedDatabaseProperties {
  return {
    databaseType: item["databaseType"],
    databaseId: item["databaseId"],
    description: item["description"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    userName: item["userName"],
  };
}

/** Type of the sync agent linked database. */
export enum KnownSyncMemberDbType {
  /** AzureSqlDatabase */
  AzureSqlDatabase = "AzureSqlDatabase",
  /** SqlServerDatabase */
  SqlServerDatabase = "SqlServerDatabase",
}

/**
 * Type of the sync agent linked database. \
 * {@link KnownSyncMemberDbType} can be used interchangeably with SyncMemberDbType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureSqlDatabase**: AzureSqlDatabase \
 * **SqlServerDatabase**: SqlServerDatabase
 */
export type SyncMemberDbType = string;

/** An Azure SQL Database sync group. */
export interface SyncGroup extends ProxyResource {
  /** The name and capacity of the SKU. */
  sku?: Sku;
  /** Sync group authentication information. */
  identity?: DataSyncParticipantIdentity;
  /** Sync interval of the sync group. */
  interval?: number;
  /** Last sync time of the sync group. */
  readonly lastSyncTime?: Date;
  /** Conflict resolution policy of the sync group. */
  conflictResolutionPolicy?: SyncConflictResolutionPolicy;
  /** ARM resource id of the sync database in the sync group. */
  syncDatabaseId?: string;
  /** User name for the sync group hub database credential. */
  hubDatabaseUserName?: string;
  /** Password for the sync group hub database credential. */
  hubDatabasePassword?: string;
  /** Sync state of the sync group. */
  readonly syncState?: SyncGroupState;
  /** Sync schema of the sync group. */
  schema?: SyncGroupSchema;
  /** If conflict logging is enabled. */
  enableConflictLogging?: boolean;
  /** Conflict logging retention period. */
  conflictLoggingRetentionInDays?: number;
  /** If use private link connection is enabled. */
  usePrivateLinkConnection?: boolean;
  /** Private endpoint name of the sync group if use private link connection is enabled. */
  readonly privateEndpointName?: string;
}

export function syncGroupSerializer(item: SyncGroup): any {
  return {
    properties: areAllPropsUndefined(item, [
      "interval",
      "conflictResolutionPolicy",
      "syncDatabaseId",
      "hubDatabaseUserName",
      "hubDatabasePassword",
      "schema",
      "enableConflictLogging",
      "conflictLoggingRetentionInDays",
      "usePrivateLinkConnection",
    ])
      ? undefined
      : _syncGroupPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : dataSyncParticipantIdentitySerializer(item["identity"]),
  };
}

export function syncGroupDeserializer(item: any): SyncGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _syncGroupPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : dataSyncParticipantIdentityDeserializer(item["identity"]),
  };
}

/** Properties of a sync group with support to MI. */
export interface SyncGroupProperties {
  /** Sync interval of the sync group. */
  interval?: number;
  /** Last sync time of the sync group. */
  readonly lastSyncTime?: Date;
  /** Conflict resolution policy of the sync group. */
  conflictResolutionPolicy?: SyncConflictResolutionPolicy;
  /** ARM resource id of the sync database in the sync group. */
  syncDatabaseId?: string;
  /** User name for the sync group hub database credential. */
  hubDatabaseUserName?: string;
  /** Password for the sync group hub database credential. */
  hubDatabasePassword?: string;
  /** Sync state of the sync group. */
  readonly syncState?: SyncGroupState;
  /** Sync schema of the sync group. */
  schema?: SyncGroupSchema;
  /** If conflict logging is enabled. */
  enableConflictLogging?: boolean;
  /** Conflict logging retention period. */
  conflictLoggingRetentionInDays?: number;
  /** If use private link connection is enabled. */
  usePrivateLinkConnection?: boolean;
  /** Private endpoint name of the sync group if use private link connection is enabled. */
  readonly privateEndpointName?: string;
}

export function syncGroupPropertiesSerializer(item: SyncGroupProperties): any {
  return {
    interval: item["interval"],
    conflictResolutionPolicy: item["conflictResolutionPolicy"],
    syncDatabaseId: item["syncDatabaseId"],
    hubDatabaseUserName: item["hubDatabaseUserName"],
    hubDatabasePassword: item["hubDatabasePassword"],
    schema: !item["schema"] ? item["schema"] : syncGroupSchemaSerializer(item["schema"]),
    enableConflictLogging: item["enableConflictLogging"],
    conflictLoggingRetentionInDays: item["conflictLoggingRetentionInDays"],
    usePrivateLinkConnection: item["usePrivateLinkConnection"],
  };
}

export function syncGroupPropertiesDeserializer(item: any): SyncGroupProperties {
  return {
    interval: item["interval"],
    lastSyncTime: !item["lastSyncTime"] ? item["lastSyncTime"] : new Date(item["lastSyncTime"]),
    conflictResolutionPolicy: item["conflictResolutionPolicy"],
    syncDatabaseId: item["syncDatabaseId"],
    hubDatabaseUserName: item["hubDatabaseUserName"],
    hubDatabasePassword: item["hubDatabasePassword"],
    syncState: item["syncState"],
    schema: !item["schema"] ? item["schema"] : syncGroupSchemaDeserializer(item["schema"]),
    enableConflictLogging: item["enableConflictLogging"],
    conflictLoggingRetentionInDays: item["conflictLoggingRetentionInDays"],
    usePrivateLinkConnection: item["usePrivateLinkConnection"],
    privateEndpointName: item["privateEndpointName"],
  };
}

/** Conflict resolution policy of the sync group. */
export enum KnownSyncConflictResolutionPolicy {
  /** HubWin */
  HubWin = "HubWin",
  /** MemberWin */
  MemberWin = "MemberWin",
}

/**
 * Conflict resolution policy of the sync group. \
 * {@link KnownSyncConflictResolutionPolicy} can be used interchangeably with SyncConflictResolutionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HubWin**: HubWin \
 * **MemberWin**: MemberWin
 */
export type SyncConflictResolutionPolicy = string;

/** Sync state of the sync group. */
export enum KnownSyncGroupState {
  /** NotReady */
  NotReady = "NotReady",
  /** Error */
  Error = "Error",
  /** Warning */
  Warning = "Warning",
  /** Progressing */
  Progressing = "Progressing",
  /** Good */
  Good = "Good",
}

/**
 * Sync state of the sync group. \
 * {@link KnownSyncGroupState} can be used interchangeably with SyncGroupState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotReady**: NotReady \
 * **Error**: Error \
 * **Warning**: Warning \
 * **Progressing**: Progressing \
 * **Good**: Good
 */
export type SyncGroupState = string;

/** Properties of sync group schema. */
export interface SyncGroupSchema {
  /** List of tables in sync group schema. */
  tables?: SyncGroupSchemaTable[];
  /** Name of master sync member where the schema is from. */
  masterSyncMemberName?: string;
}

export function syncGroupSchemaSerializer(item: SyncGroupSchema): any {
  return {
    tables: !item["tables"] ? item["tables"] : syncGroupSchemaTableArraySerializer(item["tables"]),
    masterSyncMemberName: item["masterSyncMemberName"],
  };
}

export function syncGroupSchemaDeserializer(item: any): SyncGroupSchema {
  return {
    tables: !item["tables"]
      ? item["tables"]
      : syncGroupSchemaTableArrayDeserializer(item["tables"]),
    masterSyncMemberName: item["masterSyncMemberName"],
  };
}

export function syncGroupSchemaTableArraySerializer(result: Array<SyncGroupSchemaTable>): any[] {
  return result.map((item) => {
    return syncGroupSchemaTableSerializer(item);
  });
}

export function syncGroupSchemaTableArrayDeserializer(result: Array<SyncGroupSchemaTable>): any[] {
  return result.map((item) => {
    return syncGroupSchemaTableDeserializer(item);
  });
}

/** Properties of table in sync group schema. */
export interface SyncGroupSchemaTable {
  /** List of columns in sync group schema. */
  columns?: SyncGroupSchemaTableColumn[];
  /** Quoted name of sync group schema table. */
  quotedName?: string;
}

export function syncGroupSchemaTableSerializer(item: SyncGroupSchemaTable): any {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : syncGroupSchemaTableColumnArraySerializer(item["columns"]),
    quotedName: item["quotedName"],
  };
}

export function syncGroupSchemaTableDeserializer(item: any): SyncGroupSchemaTable {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : syncGroupSchemaTableColumnArrayDeserializer(item["columns"]),
    quotedName: item["quotedName"],
  };
}

export function syncGroupSchemaTableColumnArraySerializer(
  result: Array<SyncGroupSchemaTableColumn>,
): any[] {
  return result.map((item) => {
    return syncGroupSchemaTableColumnSerializer(item);
  });
}

export function syncGroupSchemaTableColumnArrayDeserializer(
  result: Array<SyncGroupSchemaTableColumn>,
): any[] {
  return result.map((item) => {
    return syncGroupSchemaTableColumnDeserializer(item);
  });
}

/** Properties of column in sync group table. */
export interface SyncGroupSchemaTableColumn {
  /** Quoted name of sync group table column. */
  quotedName?: string;
  /** Data size of the column. */
  dataSize?: string;
  /** Data type of the column. */
  dataType?: string;
}

export function syncGroupSchemaTableColumnSerializer(item: SyncGroupSchemaTableColumn): any {
  return { quotedName: item["quotedName"], dataSize: item["dataSize"], dataType: item["dataType"] };
}

export function syncGroupSchemaTableColumnDeserializer(item: any): SyncGroupSchemaTableColumn {
  return {
    quotedName: item["quotedName"],
    dataSize: item["dataSize"],
    dataType: item["dataType"],
  };
}

/** Azure Active Directory identity configuration for a resource. */
export interface DataSyncParticipantIdentity {
  /** The Datasync identity type */
  type: DataSyncParticipantIdentityType;
  /** The DataSync participant identity tenant id */
  tenantId?: string;
  /** The resource ids of the user assigned identities to use */
  userAssignedIdentities?: Record<string, DataSyncParticipantUserAssignedIdentity>;
}

export function dataSyncParticipantIdentitySerializer(item: DataSyncParticipantIdentity): any {
  return {
    type: item["type"],
    tenantId: item["tenantId"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : dataSyncParticipantUserAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function dataSyncParticipantIdentityDeserializer(item: any): DataSyncParticipantIdentity {
  return {
    type: item["type"],
    tenantId: item["tenantId"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : dataSyncParticipantUserAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Known values of {@link DataSyncParticipantIdentityType} that the service accepts. */
export enum KnownDataSyncParticipantIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssignedUserAssigned */
  SystemAssignedUserAssigned = "SystemAssignedUserAssigned",
}

/** Type of DataSyncParticipantIdentityType */
export type DataSyncParticipantIdentityType = string;

export function dataSyncParticipantUserAssignedIdentityRecordSerializer(
  item: Record<string, DataSyncParticipantUserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : dataSyncParticipantUserAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function dataSyncParticipantUserAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, DataSyncParticipantUserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : dataSyncParticipantUserAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** Azure Active Directory identity configuration for a resource. */
export interface DataSyncParticipantUserAssignedIdentity {
  /** The Azure Active Directory principal id. */
  readonly principalId?: string;
  /** The Azure Active Directory client id. */
  readonly clientId?: string;
}

export function dataSyncParticipantUserAssignedIdentitySerializer(
  _item: DataSyncParticipantUserAssignedIdentity,
): any {
  return {};
}

export function dataSyncParticipantUserAssignedIdentityDeserializer(
  item: any,
): DataSyncParticipantUserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The response of a SyncGroup list operation. */
export interface _SyncGroupListResult {
  /** The SyncGroup items on this page */
  value: SyncGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _syncGroupListResultDeserializer(item: any): _SyncGroupListResult {
  return {
    value: syncGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function syncGroupArraySerializer(result: Array<SyncGroup>): any[] {
  return result.map((item) => {
    return syncGroupSerializer(item);
  });
}

export function syncGroupArrayDeserializer(result: Array<SyncGroup>): any[] {
  return result.map((item) => {
    return syncGroupDeserializer(item);
  });
}

/** A list of sync schema properties. */
export interface _SyncFullSchemaPropertiesListResult {
  /** The SyncFullSchemaProperties items on this page */
  value: SyncFullSchemaProperties[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _syncFullSchemaPropertiesListResultDeserializer(
  item: any,
): _SyncFullSchemaPropertiesListResult {
  return {
    value: syncFullSchemaPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function syncFullSchemaPropertiesArrayDeserializer(
  result: Array<SyncFullSchemaProperties>,
): any[] {
  return result.map((item) => {
    return syncFullSchemaPropertiesDeserializer(item);
  });
}

/** Properties of the database full schema. */
export interface SyncFullSchemaProperties {
  /** List of tables in the database full schema. */
  readonly tables?: SyncFullSchemaTable[];
  /** Last update time of the database schema. */
  readonly lastUpdateTime?: Date;
}

export function syncFullSchemaPropertiesDeserializer(item: any): SyncFullSchemaProperties {
  return {
    tables: !item["tables"] ? item["tables"] : syncFullSchemaTableArrayDeserializer(item["tables"]),
    lastUpdateTime: !item["lastUpdateTime"]
      ? item["lastUpdateTime"]
      : new Date(item["lastUpdateTime"]),
  };
}

export function syncFullSchemaTableArrayDeserializer(result: Array<SyncFullSchemaTable>): any[] {
  return result.map((item) => {
    return syncFullSchemaTableDeserializer(item);
  });
}

/** Properties of the table in the database full schema. */
export interface SyncFullSchemaTable {
  /** List of columns in the table of database full schema. */
  readonly columns?: SyncFullSchemaTableColumn[];
  /** Error id of the table. */
  readonly errorId?: string;
  /** If there is error in the table. */
  readonly hasError?: boolean;
  /** Name of the table. */
  readonly name?: string;
  /** Quoted name of the table. */
  readonly quotedName?: string;
}

export function syncFullSchemaTableDeserializer(item: any): SyncFullSchemaTable {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : syncFullSchemaTableColumnArrayDeserializer(item["columns"]),
    errorId: item["errorId"],
    hasError: item["hasError"],
    name: item["name"],
    quotedName: item["quotedName"],
  };
}

export function syncFullSchemaTableColumnArrayDeserializer(
  result: Array<SyncFullSchemaTableColumn>,
): any[] {
  return result.map((item) => {
    return syncFullSchemaTableColumnDeserializer(item);
  });
}

/** Properties of the column in the table of database full schema. */
export interface SyncFullSchemaTableColumn {
  /** Data size of the column. */
  readonly dataSize?: string;
  /** Data type of the column. */
  readonly dataType?: string;
  /** Error id of the column. */
  readonly errorId?: string;
  /** If there is error in the table. */
  readonly hasError?: boolean;
  /** If it is the primary key of the table. */
  readonly isPrimaryKey?: boolean;
  /** Name of the column. */
  readonly name?: string;
  /** Quoted name of the column. */
  readonly quotedName?: string;
}

export function syncFullSchemaTableColumnDeserializer(item: any): SyncFullSchemaTableColumn {
  return {
    dataSize: item["dataSize"],
    dataType: item["dataType"],
    errorId: item["errorId"],
    hasError: item["hasError"],
    isPrimaryKey: item["isPrimaryKey"],
    name: item["name"],
    quotedName: item["quotedName"],
  };
}

/** A list of sync group log properties. */
export interface _SyncGroupLogListResult {
  /** The SyncGroupLogProperties items on this page */
  value: SyncGroupLogProperties[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _syncGroupLogListResultDeserializer(item: any): _SyncGroupLogListResult {
  return {
    value: syncGroupLogPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function syncGroupLogPropertiesArrayDeserializer(
  result: Array<SyncGroupLogProperties>,
): any[] {
  return result.map((item) => {
    return syncGroupLogPropertiesDeserializer(item);
  });
}

/** Properties of an Azure SQL Database sync group log. */
export interface SyncGroupLogProperties {
  /** Timestamp of the sync group log. */
  readonly timestamp?: Date;
  /** Type of the sync group log. */
  readonly type?: SyncGroupLogType;
  /** Source of the sync group log. */
  readonly source?: string;
  /** Details of the sync group log. */
  readonly details?: string;
  /** TracingId of the sync group log. */
  readonly tracingId?: string;
  /** OperationStatus of the sync group log. */
  readonly operationStatus?: string;
}

export function syncGroupLogPropertiesDeserializer(item: any): SyncGroupLogProperties {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    type: item["type"],
    source: item["source"],
    details: item["details"],
    tracingId: item["tracingId"],
    operationStatus: item["operationStatus"],
  };
}

/** Type of the sync group log. */
export enum KnownSyncGroupLogType {
  /** All */
  All = "All",
  /** Error */
  Error = "Error",
  /** Warning */
  Warning = "Warning",
  /** Success */
  Success = "Success",
}

/**
 * Type of the sync group log. \
 * {@link KnownSyncGroupLogType} can be used interchangeably with SyncGroupLogType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **All**: All \
 * **Error**: Error \
 * **Warning**: Warning \
 * **Success**: Success
 */
export type SyncGroupLogType = string;

/** A list of sync database ID properties. */
export interface _SyncDatabaseIdListResult {
  /** The SyncDatabaseIdProperties items on this page */
  value: SyncDatabaseIdProperties[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _syncDatabaseIdListResultDeserializer(item: any): _SyncDatabaseIdListResult {
  return {
    value: syncDatabaseIdPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function syncDatabaseIdPropertiesArrayDeserializer(
  result: Array<SyncDatabaseIdProperties>,
): any[] {
  return result.map((item) => {
    return syncDatabaseIdPropertiesDeserializer(item);
  });
}

/** Properties of the sync database id. */
export interface SyncDatabaseIdProperties {
  /** ARM resource id of sync database. */
  readonly id?: string;
}

export function syncDatabaseIdPropertiesDeserializer(item: any): SyncDatabaseIdProperties {
  return {
    id: item["id"],
  };
}

/** An Azure SQL Database sync member. */
export interface SyncMember extends ProxyResource {
  /** Sync member authentication information. */
  identity?: DataSyncParticipantIdentity;
  /** Database type of the sync member. */
  databaseType?: SyncMemberDbType;
  /** ARM resource id of the sync agent in the sync member. */
  syncAgentId?: string;
  /** SQL Server database id of the sync member. */
  sqlServerDatabaseId?: string;
  /** ARM resource id of the sync member logical database, for sync members in Azure. */
  syncMemberAzureDatabaseResourceId?: string;
  /** Whether to use private link connection. */
  usePrivateLinkConnection?: boolean;
  /** Private endpoint name of the sync member if use private link connection is enabled, for sync members in Azure. */
  readonly privateEndpointName?: string;
  /** Server name of the member database in the sync member */
  serverName?: string;
  /** Database name of the member database in the sync member. */
  databaseName?: string;
  /** User name of the member database in the sync member. */
  userName?: string;
  /** Password of the member database in the sync member. */
  password?: string;
  /** Sync direction of the sync member. */
  syncDirection?: SyncDirection;
  /** Sync state of the sync member. */
  readonly syncState?: SyncMemberState;
}

export function syncMemberSerializer(item: SyncMember): any {
  return {
    properties: areAllPropsUndefined(item, [
      "databaseType",
      "syncAgentId",
      "sqlServerDatabaseId",
      "syncMemberAzureDatabaseResourceId",
      "usePrivateLinkConnection",
      "serverName",
      "databaseName",
      "userName",
      "password",
      "syncDirection",
    ])
      ? undefined
      : _syncMemberPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : dataSyncParticipantIdentitySerializer(item["identity"]),
  };
}

export function syncMemberDeserializer(item: any): SyncMember {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _syncMemberPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : dataSyncParticipantIdentityDeserializer(item["identity"]),
  };
}

/** Properties of a sync member with support to MI. */
export interface SyncMemberProperties {
  /** Database type of the sync member. */
  databaseType?: SyncMemberDbType;
  /** ARM resource id of the sync agent in the sync member. */
  syncAgentId?: string;
  /** SQL Server database id of the sync member. */
  sqlServerDatabaseId?: string;
  /** ARM resource id of the sync member logical database, for sync members in Azure. */
  syncMemberAzureDatabaseResourceId?: string;
  /** Whether to use private link connection. */
  usePrivateLinkConnection?: boolean;
  /** Private endpoint name of the sync member if use private link connection is enabled, for sync members in Azure. */
  readonly privateEndpointName?: string;
  /** Server name of the member database in the sync member */
  serverName?: string;
  /** Database name of the member database in the sync member. */
  databaseName?: string;
  /** User name of the member database in the sync member. */
  userName?: string;
  /** Password of the member database in the sync member. */
  password?: string;
  /** Sync direction of the sync member. */
  syncDirection?: SyncDirection;
  /** Sync state of the sync member. */
  readonly syncState?: SyncMemberState;
}

export function syncMemberPropertiesSerializer(item: SyncMemberProperties): any {
  return {
    databaseType: item["databaseType"],
    syncAgentId: item["syncAgentId"],
    sqlServerDatabaseId: item["sqlServerDatabaseId"],
    syncMemberAzureDatabaseResourceId: item["syncMemberAzureDatabaseResourceId"],
    usePrivateLinkConnection: item["usePrivateLinkConnection"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    userName: item["userName"],
    password: item["password"],
    syncDirection: item["syncDirection"],
  };
}

export function syncMemberPropertiesDeserializer(item: any): SyncMemberProperties {
  return {
    databaseType: item["databaseType"],
    syncAgentId: item["syncAgentId"],
    sqlServerDatabaseId: item["sqlServerDatabaseId"],
    syncMemberAzureDatabaseResourceId: item["syncMemberAzureDatabaseResourceId"],
    usePrivateLinkConnection: item["usePrivateLinkConnection"],
    privateEndpointName: item["privateEndpointName"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    userName: item["userName"],
    password: item["password"],
    syncDirection: item["syncDirection"],
    syncState: item["syncState"],
  };
}

/** Sync direction of the sync member. */
export enum KnownSyncDirection {
  /** Bidirectional */
  Bidirectional = "Bidirectional",
  /** OneWayMemberToHub */
  OneWayMemberToHub = "OneWayMemberToHub",
  /** OneWayHubToMember */
  OneWayHubToMember = "OneWayHubToMember",
}

/**
 * Sync direction of the sync member. \
 * {@link KnownSyncDirection} can be used interchangeably with SyncDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bidirectional**: Bidirectional \
 * **OneWayMemberToHub**: OneWayMemberToHub \
 * **OneWayHubToMember**: OneWayHubToMember
 */
export type SyncDirection = string;

/** Sync state of the sync member. */
export enum KnownSyncMemberState {
  /** SyncInProgress */
  SyncInProgress = "SyncInProgress",
  /** SyncSucceeded */
  SyncSucceeded = "SyncSucceeded",
  /** SyncFailed */
  SyncFailed = "SyncFailed",
  /** DisabledTombstoneCleanup */
  DisabledTombstoneCleanup = "DisabledTombstoneCleanup",
  /** DisabledBackupRestore */
  DisabledBackupRestore = "DisabledBackupRestore",
  /** SyncSucceededWithWarnings */
  SyncSucceededWithWarnings = "SyncSucceededWithWarnings",
  /** SyncCancelling */
  SyncCancelling = "SyncCancelling",
  /** SyncCancelled */
  SyncCancelled = "SyncCancelled",
  /** UnProvisioned */
  UnProvisioned = "UnProvisioned",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Provisioned */
  Provisioned = "Provisioned",
  /** ProvisionFailed */
  ProvisionFailed = "ProvisionFailed",
  /** DeProvisioning */
  DeProvisioning = "DeProvisioning",
  /** DeProvisioned */
  DeProvisioned = "DeProvisioned",
  /** DeProvisionFailed */
  DeProvisionFailed = "DeProvisionFailed",
  /** Reprovisioning */
  Reprovisioning = "Reprovisioning",
  /** ReprovisionFailed */
  ReprovisionFailed = "ReprovisionFailed",
  /** UnReprovisioned */
  UnReprovisioned = "UnReprovisioned",
}

/**
 * Sync state of the sync member. \
 * {@link KnownSyncMemberState} can be used interchangeably with SyncMemberState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SyncInProgress**: SyncInProgress \
 * **SyncSucceeded**: SyncSucceeded \
 * **SyncFailed**: SyncFailed \
 * **DisabledTombstoneCleanup**: DisabledTombstoneCleanup \
 * **DisabledBackupRestore**: DisabledBackupRestore \
 * **SyncSucceededWithWarnings**: SyncSucceededWithWarnings \
 * **SyncCancelling**: SyncCancelling \
 * **SyncCancelled**: SyncCancelled \
 * **UnProvisioned**: UnProvisioned \
 * **Provisioning**: Provisioning \
 * **Provisioned**: Provisioned \
 * **ProvisionFailed**: ProvisionFailed \
 * **DeProvisioning**: DeProvisioning \
 * **DeProvisioned**: DeProvisioned \
 * **DeProvisionFailed**: DeProvisionFailed \
 * **Reprovisioning**: Reprovisioning \
 * **ReprovisionFailed**: ReprovisionFailed \
 * **UnReprovisioned**: UnReprovisioned
 */
export type SyncMemberState = string;

/** The response of a SyncMember list operation. */
export interface _SyncMemberListResult {
  /** The SyncMember items on this page */
  value: SyncMember[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _syncMemberListResultDeserializer(item: any): _SyncMemberListResult {
  return {
    value: syncMemberArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function syncMemberArraySerializer(result: Array<SyncMember>): any[] {
  return result.map((item) => {
    return syncMemberSerializer(item);
  });
}

export function syncMemberArrayDeserializer(result: Array<SyncMember>): any[] {
  return result.map((item) => {
    return syncMemberDeserializer(item);
  });
}

/** Time Zone property. */
export interface TimeZone extends ProxyResource {
  /** The time zone id */
  readonly timeZoneId?: string;
  /** The time zone display name */
  readonly displayName?: string;
}

export function timeZoneDeserializer(item: any): TimeZone {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _timeZonePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a time zone. */
export interface TimeZoneProperties {
  /** The time zone id */
  readonly timeZoneId?: string;
  /** The time zone display name */
  readonly displayName?: string;
}

export function timeZonePropertiesDeserializer(item: any): TimeZoneProperties {
  return {
    timeZoneId: item["timeZoneId"],
    displayName: item["displayName"],
  };
}

/** The response of a TimeZone list operation. */
export interface _TimeZoneListResult {
  /** The TimeZone items on this page */
  value: TimeZone[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _timeZoneListResultDeserializer(item: any): _TimeZoneListResult {
  return {
    value: timeZoneArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function timeZoneArrayDeserializer(result: Array<TimeZone>): any[] {
  return result.map((item) => {
    return timeZoneDeserializer(item);
  });
}

/** An Azure SQL virtual cluster. */
export interface VirtualCluster extends TrackedResource {
  /** Subnet resource ID for the virtual cluster. */
  readonly subnetId?: string;
  /** Virtual cluster version. */
  version?: string;
  /** List of resources in this virtual cluster. */
  readonly childResources?: string[];
}

export function virtualClusterSerializer(item: VirtualCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["version"])
      ? undefined
      : _virtualClusterPropertiesSerializer(item),
  };
}

export function virtualClusterDeserializer(item: any): VirtualCluster {
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
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _virtualClusterPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a virtual cluster. */
export interface VirtualClusterProperties {
  /** Subnet resource ID for the virtual cluster. */
  readonly subnetId?: string;
  /** Virtual cluster version. */
  version?: string;
  /** List of resources in this virtual cluster. */
  readonly childResources?: string[];
}

export function virtualClusterPropertiesSerializer(item: VirtualClusterProperties): any {
  return { version: item["version"] };
}

export function virtualClusterPropertiesDeserializer(item: any): VirtualClusterProperties {
  return {
    subnetId: item["subnetId"],
    version: item["version"],
    childResources: !item["childResources"]
      ? item["childResources"]
      : item["childResources"].map((p: any) => {
          return p;
        }),
  };
}

/** An update request for virtual cluster. */
export interface VirtualClusterUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Subnet resource ID for the virtual cluster. */
  readonly subnetId?: string;
  /** Virtual cluster version. */
  version?: string;
  /** List of resources in this virtual cluster. */
  readonly childResources?: string[];
}

export function virtualClusterUpdateSerializer(item: VirtualClusterUpdate): any {
  return {
    properties: areAllPropsUndefined(item, ["version"])
      ? undefined
      : _virtualClusterUpdatePropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** The response of a VirtualCluster list operation. */
export interface _VirtualClusterListResult {
  /** The VirtualCluster items on this page */
  value: VirtualCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualClusterListResultDeserializer(item: any): _VirtualClusterListResult {
  return {
    value: virtualClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualClusterArraySerializer(result: Array<VirtualCluster>): any[] {
  return result.map((item) => {
    return virtualClusterSerializer(item);
  });
}

export function virtualClusterArrayDeserializer(result: Array<VirtualCluster>): any[] {
  return result.map((item) => {
    return virtualClusterDeserializer(item);
  });
}

/** A refresh DNS servers operation. */
export interface UpdateVirtualClusterDnsServersOperation extends ProxyResourceAutoGenerated {
  /** The status of the DNS refresh operation. */
  readonly status?: DNSRefreshOperationStatus;
}

export function updateVirtualClusterDnsServersOperationDeserializer(
  item: any,
): UpdateVirtualClusterDnsServersOperation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _updateVirtualClusterDnsServersOperationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of dns servers on virtual cluster. */
export interface VirtualClusterDnsServersProperties {
  /** The status of the DNS refresh operation. */
  readonly status?: DNSRefreshOperationStatus;
}

export function virtualClusterDnsServersPropertiesDeserializer(
  item: any,
): VirtualClusterDnsServersProperties {
  return {
    status: item["status"],
  };
}

/** The status of the DNS refresh operation. */
export enum KnownDNSRefreshOperationStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** InProgress */
  InProgress = "InProgress",
}

/**
 * The status of the DNS refresh operation. \
 * {@link KnownDNSRefreshOperationStatus} can be used interchangeably with DNSRefreshOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **InProgress**: InProgress
 */
export type DNSRefreshOperationStatus = string;

/** A virtual network rule. */
export interface VirtualNetworkRule extends ProxyResource {
  /** The ARM resource id of the virtual network subnet. */
  virtualNetworkSubnetId?: string;
  /** Create firewall rule before the virtual network has vnet service endpoint enabled. */
  ignoreMissingVnetServiceEndpoint?: boolean;
  /** Virtual Network Rule State */
  readonly state?: VirtualNetworkRuleState;
}

export function virtualNetworkRuleSerializer(item: VirtualNetworkRule): any {
  return {
    properties: areAllPropsUndefined(item, [
      "virtualNetworkSubnetId",
      "ignoreMissingVnetServiceEndpoint",
    ])
      ? undefined
      : _virtualNetworkRulePropertiesSerializer(item),
  };
}

export function virtualNetworkRuleDeserializer(item: any): VirtualNetworkRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _virtualNetworkRulePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a virtual network rule. */
export interface VirtualNetworkRuleProperties {
  /** The ARM resource id of the virtual network subnet. */
  virtualNetworkSubnetId: string;
  /** Create firewall rule before the virtual network has vnet service endpoint enabled. */
  ignoreMissingVnetServiceEndpoint?: boolean;
  /** Virtual Network Rule State */
  readonly state?: VirtualNetworkRuleState;
}

export function virtualNetworkRulePropertiesSerializer(item: VirtualNetworkRuleProperties): any {
  return {
    virtualNetworkSubnetId: item["virtualNetworkSubnetId"],
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
  };
}

export function virtualNetworkRulePropertiesDeserializer(item: any): VirtualNetworkRuleProperties {
  return {
    virtualNetworkSubnetId: item["virtualNetworkSubnetId"],
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
    state: item["state"],
  };
}

/** Virtual Network Rule State */
export enum KnownVirtualNetworkRuleState {
  /** Initializing */
  Initializing = "Initializing",
  /** InProgress */
  InProgress = "InProgress",
  /** Ready */
  Ready = "Ready",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Virtual Network Rule State \
 * {@link KnownVirtualNetworkRuleState} can be used interchangeably with VirtualNetworkRuleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initializing**: Initializing \
 * **InProgress**: InProgress \
 * **Ready**: Ready \
 * **Failed**: Failed \
 * **Deleting**: Deleting \
 * **Unknown**: Unknown
 */
export type VirtualNetworkRuleState = string;

/** The response of a VirtualNetworkRule list operation. */
export interface _VirtualNetworkRuleListResult {
  /** The VirtualNetworkRule items on this page */
  value: VirtualNetworkRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkRuleListResultDeserializer(
  item: any,
): _VirtualNetworkRuleListResult {
  return {
    value: virtualNetworkRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualNetworkRuleArraySerializer(result: Array<VirtualNetworkRule>): any[] {
  return result.map((item) => {
    return virtualNetworkRuleSerializer(item);
  });
}

export function virtualNetworkRuleArrayDeserializer(result: Array<VirtualNetworkRule>): any[] {
  return result.map((item) => {
    return virtualNetworkRuleDeserializer(item);
  });
}

/** Workload classifier operations for a data warehouse */
export interface WorkloadClassifier extends ProxyResource {
  /** The workload classifier member name. */
  memberName?: string;
  /** The workload classifier label. */
  label?: string;
  /** The workload classifier context. */
  context?: string;
  /** The workload classifier start time for classification. */
  startTime?: string;
  /** The workload classifier end time for classification. */
  endTime?: string;
  /** The workload classifier importance. */
  importance?: string;
}

export function workloadClassifierSerializer(item: WorkloadClassifier): any {
  return {
    properties: areAllPropsUndefined(item, [
      "memberName",
      "label",
      "context",
      "startTime",
      "endTime",
      "importance",
    ])
      ? undefined
      : _workloadClassifierPropertiesSerializer(item),
  };
}

export function workloadClassifierDeserializer(item: any): WorkloadClassifier {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workloadClassifierPropertiesDeserializer(item["properties"])),
  };
}

/** Workload classifier definition. For more information look at sys.workload_management_workload_classifiers (DMV). */
export interface WorkloadClassifierProperties {
  /** The workload classifier member name. */
  memberName: string;
  /** The workload classifier label. */
  label?: string;
  /** The workload classifier context. */
  context?: string;
  /** The workload classifier start time for classification. */
  startTime?: string;
  /** The workload classifier end time for classification. */
  endTime?: string;
  /** The workload classifier importance. */
  importance?: string;
}

export function workloadClassifierPropertiesSerializer(item: WorkloadClassifierProperties): any {
  return {
    memberName: item["memberName"],
    label: item["label"],
    context: item["context"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    importance: item["importance"],
  };
}

export function workloadClassifierPropertiesDeserializer(item: any): WorkloadClassifierProperties {
  return {
    memberName: item["memberName"],
    label: item["label"],
    context: item["context"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    importance: item["importance"],
  };
}

/** The response of a WorkloadClassifier list operation. */
export interface _WorkloadClassifierListResult {
  /** The WorkloadClassifier items on this page */
  value: WorkloadClassifier[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadClassifierListResultDeserializer(
  item: any,
): _WorkloadClassifierListResult {
  return {
    value: workloadClassifierArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadClassifierArraySerializer(result: Array<WorkloadClassifier>): any[] {
  return result.map((item) => {
    return workloadClassifierSerializer(item);
  });
}

export function workloadClassifierArrayDeserializer(result: Array<WorkloadClassifier>): any[] {
  return result.map((item) => {
    return workloadClassifierDeserializer(item);
  });
}

/** Workload group operations for a data warehouse */
export interface WorkloadGroup extends ProxyResource {
  /** The workload group minimum percentage resource. */
  minResourcePercent?: number;
  /** The workload group cap percentage resource. */
  maxResourcePercent?: number;
  /** The workload group request minimum grant percentage. */
  minResourcePercentPerRequest?: number;
  /** The workload group request maximum grant percentage. */
  maxResourcePercentPerRequest?: number;
  /** The workload group importance level. */
  importance?: string;
  /** The workload group query execution timeout. */
  queryExecutionTimeout?: number;
}

export function workloadGroupSerializer(item: WorkloadGroup): any {
  return {
    properties: areAllPropsUndefined(item, [
      "minResourcePercent",
      "maxResourcePercent",
      "minResourcePercentPerRequest",
      "maxResourcePercentPerRequest",
      "importance",
      "queryExecutionTimeout",
    ])
      ? undefined
      : _workloadGroupPropertiesSerializer(item),
  };
}

export function workloadGroupDeserializer(item: any): WorkloadGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workloadGroupPropertiesDeserializer(item["properties"])),
  };
}

/** Workload group definition. For more information look at sys.workload_management_workload_groups (DMV). */
export interface WorkloadGroupProperties {
  /** The workload group minimum percentage resource. */
  minResourcePercent: number;
  /** The workload group cap percentage resource. */
  maxResourcePercent: number;
  /** The workload group request minimum grant percentage. */
  minResourcePercentPerRequest: number;
  /** The workload group request maximum grant percentage. */
  maxResourcePercentPerRequest?: number;
  /** The workload group importance level. */
  importance?: string;
  /** The workload group query execution timeout. */
  queryExecutionTimeout?: number;
}

export function workloadGroupPropertiesSerializer(item: WorkloadGroupProperties): any {
  return {
    minResourcePercent: item["minResourcePercent"],
    maxResourcePercent: item["maxResourcePercent"],
    minResourcePercentPerRequest: item["minResourcePercentPerRequest"],
    maxResourcePercentPerRequest: item["maxResourcePercentPerRequest"],
    importance: item["importance"],
    queryExecutionTimeout: item["queryExecutionTimeout"],
  };
}

export function workloadGroupPropertiesDeserializer(item: any): WorkloadGroupProperties {
  return {
    minResourcePercent: item["minResourcePercent"],
    maxResourcePercent: item["maxResourcePercent"],
    minResourcePercentPerRequest: item["minResourcePercentPerRequest"],
    maxResourcePercentPerRequest: item["maxResourcePercentPerRequest"],
    importance: item["importance"],
    queryExecutionTimeout: item["queryExecutionTimeout"],
  };
}

/** The response of a WorkloadGroup list operation. */
export interface _WorkloadGroupListResult {
  /** The WorkloadGroup items on this page */
  value: WorkloadGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadGroupListResultDeserializer(item: any): _WorkloadGroupListResult {
  return {
    value: workloadGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadGroupArraySerializer(result: Array<WorkloadGroup>): any[] {
  return result.map((item) => {
    return workloadGroupSerializer(item);
  });
}

export function workloadGroupArrayDeserializer(result: Array<WorkloadGroup>): any[] {
  return result.map((item) => {
    return workloadGroupDeserializer(item);
  });
}

/** The response of a DatabaseOperation list operation. */
export interface _DatabaseOperationListResult {
  /** The DatabaseOperation items on this page */
  value: DatabaseOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseOperationListResultDeserializer(item: any): _DatabaseOperationListResult {
  return {
    value: databaseOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseOperationArrayDeserializer(result: Array<DatabaseOperation>): any[] {
  return result.map((item) => {
    return databaseOperationDeserializer(item);
  });
}

/** A database operation. */
export interface DatabaseOperation extends ProxyResourceAutoGenerated {
  /** The name of the database the operation is being performed on. */
  readonly databaseName?: string;
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The percentage of the operation completed. */
  readonly percentComplete?: number;
  /** The name of the server. */
  readonly serverName?: string;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: ManagementOperationState;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Whether or not the error is a user error. */
  readonly isUserError?: boolean;
  /** The estimated completion time of the operation. */
  readonly estimatedCompletionTime?: Date;
  /** The operation description. */
  readonly description?: string;
  /** Whether the operation can be cancelled. */
  readonly isCancellable?: boolean;
  /** The operation phase details. */
  readonly operationPhaseDetails?: PhaseDetails;
}

export function databaseOperationDeserializer(item: any): DatabaseOperation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _databaseOperationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a database operation. */
export interface DatabaseOperationProperties {
  /** The name of the database the operation is being performed on. */
  readonly databaseName?: string;
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The percentage of the operation completed. */
  readonly percentComplete?: number;
  /** The name of the server. */
  readonly serverName?: string;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: ManagementOperationState;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Whether or not the error is a user error. */
  readonly isUserError?: boolean;
  /** The estimated completion time of the operation. */
  readonly estimatedCompletionTime?: Date;
  /** The operation description. */
  readonly description?: string;
  /** Whether the operation can be cancelled. */
  readonly isCancellable?: boolean;
  /** The operation phase details. */
  readonly operationPhaseDetails?: PhaseDetails;
}

export function databaseOperationPropertiesDeserializer(item: any): DatabaseOperationProperties {
  return {
    databaseName: item["databaseName"],
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    percentComplete: item["percentComplete"],
    serverName: item["serverName"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    isUserError: item["isUserError"],
    estimatedCompletionTime: !item["estimatedCompletionTime"]
      ? item["estimatedCompletionTime"]
      : new Date(item["estimatedCompletionTime"]),
    description: item["description"],
    isCancellable: item["isCancellable"],
    operationPhaseDetails: !item["operationPhaseDetails"]
      ? item["operationPhaseDetails"]
      : phaseDetailsDeserializer(item["operationPhaseDetails"]),
  };
}

/** The phase details properties of a database operation. */
export interface PhaseDetails {
  /** The operation phase. */
  readonly phase?: Phase;
  /** The operation phase information. */
  readonly phaseInformation?: Record<string, string>;
}

export function phaseDetailsDeserializer(item: any): PhaseDetails {
  return {
    phase: item["phase"],
    phaseInformation: !item["phaseInformation"]
      ? item["phaseInformation"]
      : Object.fromEntries(
          Object.entries(item["phaseInformation"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The operation phase. */
export enum KnownPhase {
  /** LogTransitionInProgress */
  LogTransitionInProgress = "LogTransitionInProgress",
  /** Copying */
  Copying = "Copying",
  /** BuildingHyperscaleComponents */
  BuildingHyperscaleComponents = "BuildingHyperscaleComponents",
  /** Catchup */
  Catchup = "Catchup",
  /** WaitingForCutover */
  WaitingForCutover = "WaitingForCutover",
  /** CutoverInProgress */
  CutoverInProgress = "CutoverInProgress",
}

/**
 * The operation phase. \
 * {@link KnownPhase} can be used interchangeably with Phase,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LogTransitionInProgress**: LogTransitionInProgress \
 * **Copying**: Copying \
 * **BuildingHyperscaleComponents**: BuildingHyperscaleComponents \
 * **Catchup**: Catchup \
 * **WaitingForCutover**: WaitingForCutover \
 * **CutoverInProgress**: CutoverInProgress
 */
export type Phase = string;

/** The response of a DatabaseUsage list operation. */
export interface _DatabaseUsageListResult {
  /** The DatabaseUsage items on this page */
  value: DatabaseUsage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseUsageListResultDeserializer(item: any): _DatabaseUsageListResult {
  return {
    value: databaseUsageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseUsageArrayDeserializer(result: Array<DatabaseUsage>): any[] {
  return result.map((item) => {
    return databaseUsageDeserializer(item);
  });
}

/** Usage metric of a database. */
export interface DatabaseUsage extends ProxyResourceAutoGenerated {
  /** User-readable name of the metric. */
  readonly displayName?: string;
  /** Current value of the metric. */
  readonly currentValue?: number;
  /** Boundary value of the metric. */
  readonly limit?: number;
  /** Unit of the metric. */
  readonly unit?: string;
}

export function databaseUsageDeserializer(item: any): DatabaseUsage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _databaseUsagePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a database usage. */
export interface DatabaseUsageProperties {
  /** User-readable name of the metric. */
  readonly displayName?: string;
  /** Current value of the metric. */
  readonly currentValue?: number;
  /** Boundary value of the metric. */
  readonly limit?: number;
  /** Unit of the metric. */
  readonly unit?: string;
}

export function databaseUsagePropertiesDeserializer(item: any): DatabaseUsageProperties {
  return {
    displayName: item["displayName"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    unit: item["unit"],
  };
}

/** A list of recommended sensitivity label update operations. */
export interface RecommendedSensitivityLabelUpdateList {
  operations?: RecommendedSensitivityLabelUpdate[];
}

export function recommendedSensitivityLabelUpdateListSerializer(
  item: RecommendedSensitivityLabelUpdateList,
): any {
  return {
    operations: !item["operations"]
      ? item["operations"]
      : recommendedSensitivityLabelUpdateArraySerializer(item["operations"]),
  };
}

export function recommendedSensitivityLabelUpdateArraySerializer(
  result: Array<RecommendedSensitivityLabelUpdate>,
): any[] {
  return result.map((item) => {
    return recommendedSensitivityLabelUpdateSerializer(item);
  });
}

/** A recommended sensitivity label update operation. */
export interface RecommendedSensitivityLabelUpdate extends ProxyResourceAutoGenerated {
  op?: RecommendedSensitivityLabelUpdateKind;
  /** Schema name of the column to update. */
  schema?: string;
  /** Table name of the column to update. */
  table?: string;
  /** Column name to update. */
  column?: string;
}

export function recommendedSensitivityLabelUpdateSerializer(
  item: RecommendedSensitivityLabelUpdate,
): any {
  return {
    properties: areAllPropsUndefined(item, ["op", "schema", "table", "column"])
      ? undefined
      : _recommendedSensitivityLabelUpdatePropertiesSerializer(item),
  };
}

/** Properties of an operation executed on a recommended sensitivity label. */
export interface RecommendedSensitivityLabelUpdateProperties {
  op: RecommendedSensitivityLabelUpdateKind;
  /** Schema name of the column to update. */
  schema: string;
  /** Table name of the column to update. */
  table: string;
  /** Column name to update. */
  column: string;
}

export function recommendedSensitivityLabelUpdatePropertiesSerializer(
  item: RecommendedSensitivityLabelUpdateProperties,
): any {
  return { op: item["op"], schema: item["schema"], table: item["table"], column: item["column"] };
}

/** Type of RecommendedSensitivityLabelUpdateKind */
export type RecommendedSensitivityLabelUpdateKind = "enable" | "disable";

/** The response of a SynapseLinkWorkspace list operation. */
export interface _SynapseLinkWorkspaceListResult {
  /** The SynapseLinkWorkspace items on this page */
  value: SynapseLinkWorkspace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _synapseLinkWorkspaceListResultDeserializer(
  item: any,
): _SynapseLinkWorkspaceListResult {
  return {
    value: synapseLinkWorkspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function synapseLinkWorkspaceArrayDeserializer(result: Array<SynapseLinkWorkspace>): any[] {
  return result.map((item) => {
    return synapseLinkWorkspaceDeserializer(item);
  });
}

/** Synapse link workspace resource */
export interface SynapseLinkWorkspace extends ProxyResourceAutoGenerated {
  /** List of all synapselink workspaces */
  workspaces?: SynapseLinkWorkspaceInfoProperties[];
}

export function synapseLinkWorkspaceDeserializer(item: any): SynapseLinkWorkspace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _synapseLinkWorkspacePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a Synapse link workspaces */
export interface SynapseLinkWorkspaceProperties {
  /** List of all synapselink workspaces */
  workspaces?: SynapseLinkWorkspaceInfoProperties[];
}

export function synapseLinkWorkspacePropertiesDeserializer(
  item: any,
): SynapseLinkWorkspaceProperties {
  return {
    workspaces: !item["workspaces"]
      ? item["workspaces"]
      : synapseLinkWorkspaceInfoPropertiesArrayDeserializer(item["workspaces"]),
  };
}

export function synapseLinkWorkspaceInfoPropertiesArrayDeserializer(
  result: Array<SynapseLinkWorkspaceInfoProperties>,
): any[] {
  return result.map((item) => {
    return synapseLinkWorkspaceInfoPropertiesDeserializer(item);
  });
}

/** Properties of a Synapse link workspaces */
export interface SynapseLinkWorkspaceInfoProperties {
  /** Synapse link workspace id. */
  workspaceId?: string;
  /** Link connection name. */
  linkConnectionName?: string;
}

export function synapseLinkWorkspaceInfoPropertiesDeserializer(
  item: any,
): SynapseLinkWorkspaceInfoProperties {
  return {
    workspaceId: item["workspaceId"],
    linkConnectionName: item["linkConnectionName"],
  };
}

/** The response of a ServerOperation list operation. */
export interface _ServerOperationListResult {
  /** The ServerOperation items on this page */
  value: ServerOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverOperationListResultDeserializer(item: any): _ServerOperationListResult {
  return {
    value: serverOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverOperationArrayDeserializer(result: Array<ServerOperation>): any[] {
  return result.map((item) => {
    return serverOperationDeserializer(item);
  });
}

/** A server operation. */
export interface ServerOperation extends ProxyResourceAutoGenerated {
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The percentage of the operation completed. */
  readonly percentComplete?: number;
  /** The name of the server. */
  readonly serverName?: string;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: ManagementOperationState;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Whether or not the error is a user error. */
  readonly isUserError?: boolean;
  /** The estimated completion time of the operation. */
  readonly estimatedCompletionTime?: Date;
  /** The operation description. */
  readonly description?: string;
  /** Whether the operation can be cancelled. */
  readonly isCancellable?: boolean;
}

export function serverOperationDeserializer(item: any): ServerOperation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _serverOperationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a server operation. */
export interface ServerOperationProperties {
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The percentage of the operation completed. */
  readonly percentComplete?: number;
  /** The name of the server. */
  readonly serverName?: string;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: ManagementOperationState;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Whether or not the error is a user error. */
  readonly isUserError?: boolean;
  /** The estimated completion time of the operation. */
  readonly estimatedCompletionTime?: Date;
  /** The operation description. */
  readonly description?: string;
  /** Whether the operation can be cancelled. */
  readonly isCancellable?: boolean;
}

export function serverOperationPropertiesDeserializer(item: any): ServerOperationProperties {
  return {
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    percentComplete: item["percentComplete"],
    serverName: item["serverName"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    isUserError: item["isUserError"],
    estimatedCompletionTime: !item["estimatedCompletionTime"]
      ? item["estimatedCompletionTime"]
      : new Date(item["estimatedCompletionTime"]),
    description: item["description"],
    isCancellable: item["isCancellable"],
  };
}

/** The response of a ServerUsage list operation. */
export interface _ServerUsageListResult {
  /** The ServerUsage items on this page */
  value: ServerUsage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverUsageListResultDeserializer(item: any): _ServerUsageListResult {
  return {
    value: serverUsageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverUsageArrayDeserializer(result: Array<ServerUsage>): any[] {
  return result.map((item) => {
    return serverUsageDeserializer(item);
  });
}

/** Usage metric of a server. */
export interface ServerUsage extends ProxyResourceAutoGenerated {
  /** User-readable name of the metric. */
  readonly displayName?: string;
  /** Current value of the metric. */
  readonly currentValue?: number;
  /** Boundary value of the metric. */
  readonly limit?: number;
  /** Unit of the metric. */
  readonly unit?: string;
}

export function serverUsageDeserializer(item: any): ServerUsage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _serverUsagePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a server usage. */
export interface ServerUsageProperties {
  /** User-readable name of the metric. */
  readonly displayName?: string;
  /** Current value of the metric. */
  readonly currentValue?: number;
  /** Boundary value of the metric. */
  readonly limit?: number;
  /** Unit of the metric. */
  readonly unit?: string;
}

export function serverUsagePropertiesDeserializer(item: any): ServerUsageProperties {
  return {
    displayName: item["displayName"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    unit: item["unit"],
  };
}

/** A TDE certificate that can be uploaded into a server. */
export interface TdeCertificate extends ProxyResourceAutoGenerated {
  /** The base64 encoded certificate private blob. */
  privateBlob?: string;
  /** The certificate password. */
  certPassword?: string;
}

export function tdeCertificateSerializer(item: TdeCertificate): any {
  return {
    properties: areAllPropsUndefined(item, ["privateBlob", "certPassword"])
      ? undefined
      : _tdeCertificatePropertiesSerializer(item),
  };
}

/** Properties of a TDE certificate. */
export interface TdeCertificateProperties {
  /** The base64 encoded certificate private blob. */
  privateBlob: string;
  /** The certificate password. */
  certPassword?: string;
}

export function tdeCertificatePropertiesSerializer(item: TdeCertificateProperties): any {
  return { privateBlob: item["privateBlob"], certPassword: item["certPassword"] };
}

/** A database Advanced Threat Protection. */
export interface DatabaseAdvancedThreatProtection extends ProxyResource {
  /** Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server. */
  state?: AdvancedThreatProtectionState;
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
}

export function databaseAdvancedThreatProtectionSerializer(
  item: DatabaseAdvancedThreatProtection,
): any {
  return {
    properties: areAllPropsUndefined(item, ["state"])
      ? undefined
      : _databaseAdvancedThreatProtectionPropertiesSerializer(item),
  };
}

export function databaseAdvancedThreatProtectionDeserializer(
  item: any,
): DatabaseAdvancedThreatProtection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseAdvancedThreatProtectionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of an Advanced Threat Protection state. */
export interface AdvancedThreatProtectionProperties {
  /** Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server. */
  state: AdvancedThreatProtectionState;
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
}

export function advancedThreatProtectionPropertiesSerializer(
  item: AdvancedThreatProtectionProperties,
): any {
  return { state: item["state"] };
}

export function advancedThreatProtectionPropertiesDeserializer(
  item: any,
): AdvancedThreatProtectionProperties {
  return {
    state: item["state"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

/** Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server. */
export type AdvancedThreatProtectionState = "New" | "Enabled" | "Disabled";

/** Known values of {@link AdvancedThreatProtectionName} that the service accepts. */
export enum KnownAdvancedThreatProtectionName {
  /** Default */
  Default = "Default",
}

/** Type of AdvancedThreatProtectionName */
export type AdvancedThreatProtectionName = string;

/** The response of a DatabaseAdvancedThreatProtection list operation. */
export interface _DatabaseAdvancedThreatProtectionListResult {
  /** The DatabaseAdvancedThreatProtection items on this page */
  value: DatabaseAdvancedThreatProtection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseAdvancedThreatProtectionListResultDeserializer(
  item: any,
): _DatabaseAdvancedThreatProtectionListResult {
  return {
    value: databaseAdvancedThreatProtectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseAdvancedThreatProtectionArraySerializer(
  result: Array<DatabaseAdvancedThreatProtection>,
): any[] {
  return result.map((item) => {
    return databaseAdvancedThreatProtectionSerializer(item);
  });
}

export function databaseAdvancedThreatProtectionArrayDeserializer(
  result: Array<DatabaseAdvancedThreatProtection>,
): any[] {
  return result.map((item) => {
    return databaseAdvancedThreatProtectionDeserializer(item);
  });
}

/** Database-level Automatic Tuning. */
export interface DatabaseAutomaticTuning extends ProxyResource {
  /** Automatic tuning desired state. */
  desiredState?: AutomaticTuningMode;
  /** Automatic tuning actual state. */
  readonly actualState?: AutomaticTuningMode;
  /** Automatic tuning options definition. */
  options?: Record<string, AutomaticTuningOptions>;
}

export function databaseAutomaticTuningSerializer(item: DatabaseAutomaticTuning): any {
  return {
    properties: areAllPropsUndefined(item, ["desiredState", "options"])
      ? undefined
      : _databaseAutomaticTuningPropertiesSerializer(item),
  };
}

export function databaseAutomaticTuningDeserializer(item: any): DatabaseAutomaticTuning {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseAutomaticTuningPropertiesDeserializer(item["properties"])),
  };
}

/** Database-level Automatic Tuning properties. */
export interface DatabaseAutomaticTuningProperties {
  /** Automatic tuning desired state. */
  desiredState?: AutomaticTuningMode;
  /** Automatic tuning actual state. */
  readonly actualState?: AutomaticTuningMode;
  /** Automatic tuning options definition. */
  options?: Record<string, AutomaticTuningOptions>;
}

export function databaseAutomaticTuningPropertiesSerializer(
  item: DatabaseAutomaticTuningProperties,
): any {
  return {
    desiredState: item["desiredState"],
    options: !item["options"]
      ? item["options"]
      : automaticTuningOptionsRecordSerializer(item["options"]),
  };
}

export function databaseAutomaticTuningPropertiesDeserializer(
  item: any,
): DatabaseAutomaticTuningProperties {
  return {
    desiredState: item["desiredState"],
    actualState: item["actualState"],
    options: !item["options"]
      ? item["options"]
      : automaticTuningOptionsRecordDeserializer(item["options"]),
  };
}

/** Automatic tuning desired state. */
export type AutomaticTuningMode = "Inherit" | "Custom" | "Auto" | "Unspecified";

export function automaticTuningOptionsRecordSerializer(
  item: Record<string, AutomaticTuningOptions>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : automaticTuningOptionsSerializer(item[key]);
  });
  return result;
}

export function automaticTuningOptionsRecordDeserializer(
  item: Record<string, any>,
): Record<string, AutomaticTuningOptions> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : automaticTuningOptionsDeserializer(item[key]);
  });
  return result;
}

/** Automatic tuning properties for individual advisors. */
export interface AutomaticTuningOptions {
  /** Automatic tuning option desired state. */
  desiredState?: AutomaticTuningOptionModeDesired;
  /** Automatic tuning option actual state. */
  readonly actualState?: AutomaticTuningOptionModeActual;
  /** Reason code if desired and actual state are different. */
  readonly reasonCode?: number;
  /** Reason description if desired and actual state are different. */
  readonly reasonDesc?: AutomaticTuningDisabledReason;
}

export function automaticTuningOptionsSerializer(item: AutomaticTuningOptions): any {
  return { desiredState: item["desiredState"] };
}

export function automaticTuningOptionsDeserializer(item: any): AutomaticTuningOptions {
  return {
    desiredState: item["desiredState"],
    actualState: item["actualState"],
    reasonCode: item["reasonCode"],
    reasonDesc: item["reasonDesc"],
  };
}

/** Automatic tuning option desired state. */
export type AutomaticTuningOptionModeDesired = "Off" | "On" | "Default";
/** Automatic tuning option actual state. */
export type AutomaticTuningOptionModeActual = "Off" | "On";
/** Reason description if desired and actual state are different. */
export type AutomaticTuningDisabledReason =
  | "Default"
  | "Disabled"
  | "AutoConfigured"
  | "InheritedFromServer"
  | "QueryStoreOff"
  | "QueryStoreReadOnly"
  | "NotSupported";

/** An Import, Export, or PolybaseImport resource. */
export interface DatabaseExtensions extends ProxyResourceAutoGenerated {
  /** Operation mode of the operation: Import, Export, or PolybaseImport. */
  operationMode?: OperationMode;
  /** Storage key type: StorageAccessKey, SharedAccessKey or ManagedIdentity. */
  storageKeyType?: StorageKeyType;
  /** Storage key for the storage account. If StorageKeyType is ManagedIdentity, this field should specify the Managed Identity's resource ID. */
  storageKey?: string;
  /** Storage Uri for the storage account. */
  storageUri?: string;
  /** Administrator login name. If AuthenticationType is ManagedIdentity, this field should specify the Managed Identity's resource ID. */
  administratorLogin?: string;
  /** Administrator login password. If AuthenticationType is ManagedIdentity, this field should not be specified. */
  administratorLoginPassword?: string;
  /** Authentication type used to access the SQL: Sql, ADPassword or ManagedIdentity. */
  authenticationType?: string;
  /** Database edition for the newly created database in the case of an import operation. */
  databaseEdition?: string;
  /** Database service level objective for the newly created database in the case of an import operation. */
  serviceObjectiveName?: string;
  /** Database max size in bytes for the newly created database in the case of an import operation. */
  maxSizeBytes?: string;
  /** Optional resource information to enable network isolation for request. */
  networkIsolation?: NetworkIsolationSettings;
}

export function databaseExtensionsSerializer(item: DatabaseExtensions): any {
  return {
    properties: areAllPropsUndefined(item, [
      "operationMode",
      "storageKeyType",
      "storageKey",
      "storageUri",
      "administratorLogin",
      "administratorLoginPassword",
      "authenticationType",
      "databaseEdition",
      "serviceObjectiveName",
      "maxSizeBytes",
      "networkIsolation",
    ])
      ? undefined
      : _databaseExtensionsPropertiesSerializer(item),
  };
}

/** Contains the database information after a successful Import, Export, or PolybaseImport */
export interface DatabaseExtensionsProperties {
  /** Operation mode of the operation: Import, Export, or PolybaseImport. */
  operationMode: OperationMode;
  /** Storage key type: StorageAccessKey, SharedAccessKey or ManagedIdentity. */
  storageKeyType: StorageKeyType;
  /** Storage key for the storage account. If StorageKeyType is ManagedIdentity, this field should specify the Managed Identity's resource ID. */
  storageKey: string;
  /** Storage Uri for the storage account. */
  storageUri: string;
  /** Administrator login name. If AuthenticationType is ManagedIdentity, this field should specify the Managed Identity's resource ID. */
  administratorLogin?: string;
  /** Administrator login password. If AuthenticationType is ManagedIdentity, this field should not be specified. */
  administratorLoginPassword?: string;
  /** Authentication type used to access the SQL: Sql, ADPassword or ManagedIdentity. */
  authenticationType?: string;
  /** Database edition for the newly created database in the case of an import operation. */
  databaseEdition?: string;
  /** Database service level objective for the newly created database in the case of an import operation. */
  serviceObjectiveName?: string;
  /** Database max size in bytes for the newly created database in the case of an import operation. */
  maxSizeBytes?: string;
  /** Optional resource information to enable network isolation for request. */
  networkIsolation?: NetworkIsolationSettings;
}

export function databaseExtensionsPropertiesSerializer(item: DatabaseExtensionsProperties): any {
  return {
    operationMode: item["operationMode"],
    storageKeyType: item["storageKeyType"],
    storageKey: item["storageKey"],
    storageUri: item["storageUri"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    authenticationType: item["authenticationType"],
    databaseEdition: item["databaseEdition"],
    serviceObjectiveName: item["serviceObjectiveName"],
    maxSizeBytes: item["maxSizeBytes"],
    networkIsolation: !item["networkIsolation"]
      ? item["networkIsolation"]
      : networkIsolationSettingsSerializer(item["networkIsolation"]),
  };
}

/** Operation mode of the operation: Import, Export, or PolybaseImport. */
export enum KnownOperationMode {
  /** PolybaseImport */
  PolybaseImport = "PolybaseImport",
  /** Import */
  Import = "Import",
  /** Export */
  Export = "Export",
}

/**
 * Operation mode of the operation: Import, Export, or PolybaseImport. \
 * {@link KnownOperationMode} can be used interchangeably with OperationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PolybaseImport**: PolybaseImport \
 * **Import**: Import \
 * **Export**: Export
 */
export type OperationMode = string;

/** An Extension operation result resource. */
export interface ImportExportExtensionsOperationResult extends ProxyResource {
  /** Request Id. */
  readonly requestId?: string;
  /** Request type. */
  readonly requestType?: string;
  /** Last modified time. */
  readonly lastModifiedTime?: string;
  /** Server name. */
  readonly serverName?: string;
  /** Database name. */
  readonly databaseName?: string;
  /** Operation status. */
  readonly status?: string;
  /** Error message. */
  readonly errorMessage?: string;
  /** Queued time. */
  readonly queuedTime?: string;
  /** Blob URI. */
  readonly blobUri?: string;
  /** Gets the status of private endpoints associated with this request. */
  readonly privateEndpointConnections?: PrivateEndpointConnectionRequestStatus[];
}

export function importExportExtensionsOperationResultDeserializer(
  item: any,
): ImportExportExtensionsOperationResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _importExportExtensionsOperationResultPropertiesDeserializer(item["properties"])),
  };
}

/** Contains the operation result properties for import/export operation. */
export interface ImportExportExtensionsOperationResultProperties {
  /** Request Id. */
  readonly requestId?: string;
  /** Request type. */
  readonly requestType?: string;
  /** Last modified time. */
  readonly lastModifiedTime?: string;
  /** Server name. */
  readonly serverName?: string;
  /** Database name. */
  readonly databaseName?: string;
  /** Operation status. */
  readonly status?: string;
  /** Error message. */
  readonly errorMessage?: string;
  /** Queued time. */
  readonly queuedTime?: string;
  /** Blob URI. */
  readonly blobUri?: string;
  /** Gets the status of private endpoints associated with this request. */
  readonly privateEndpointConnections?: PrivateEndpointConnectionRequestStatus[];
}

export function importExportExtensionsOperationResultPropertiesDeserializer(
  item: any,
): ImportExportExtensionsOperationResultProperties {
  return {
    requestId: item["requestId"],
    requestType: item["requestType"],
    lastModifiedTime: item["lastModifiedTime"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    status: item["status"],
    errorMessage: item["errorMessage"],
    queuedTime: item["queuedTime"],
    blobUri: item["blobUri"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionRequestStatusArrayDeserializer(item["privateEndpointConnections"]),
  };
}

/** Import export operation extensions list. */
export interface _ImportExportExtensionsOperationListResult {
  /** Array of results. */
  readonly value?: ImportExportExtensionsOperationResult[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _importExportExtensionsOperationListResultDeserializer(
  item: any,
): _ImportExportExtensionsOperationListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : importExportExtensionsOperationResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function importExportExtensionsOperationResultArrayDeserializer(
  result: Array<ImportExportExtensionsOperationResult>,
): any[] {
  return result.map((item) => {
    return importExportExtensionsOperationResultDeserializer(item);
  });
}

/** A database sql vulnerability assessment rule baseline list input. */
export interface DatabaseSqlVulnerabilityAssessmentRuleBaselineListInput extends ProxyResourceAutoGenerated {
  /** SystemData of DatabaseSqlVulnerabilityAssessmentRuleBaselineListInputResource. */
  readonly systemData?: Systemdata;
  /** The latest scan flag */
  latestScan?: boolean;
  /** The rule baseline result list */
  results?: Record<string, string[][]>;
}

export function databaseSqlVulnerabilityAssessmentRuleBaselineListInputSerializer(
  item: DatabaseSqlVulnerabilityAssessmentRuleBaselineListInput,
): any {
  return {
    properties: areAllPropsUndefined(item, ["latestScan", "results"])
      ? undefined
      : _databaseSqlVulnerabilityAssessmentRuleBaselineListInputPropertiesSerializer(item),
  };
}

/** Properties of a database Sql Vulnerability Assessment rule baseline. */
export interface DatabaseSqlVulnerabilityAssessmentRuleBaselineListInputProperties {
  /** The latest scan flag */
  latestScan: boolean;
  /** The rule baseline result list */
  results: Record<string, string[][]>;
}

export function databaseSqlVulnerabilityAssessmentRuleBaselineListInputPropertiesSerializer(
  item: DatabaseSqlVulnerabilityAssessmentRuleBaselineListInputProperties,
): any {
  return { latestScan: item["latestScan"], results: item["results"] };
}

/** The response of a DataMaskingRule list operation. */
export interface _DataMaskingRuleListResult {
  /** The DataMaskingRule items on this page */
  value: DataMaskingRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataMaskingRuleListResultDeserializer(item: any): _DataMaskingRuleListResult {
  return {
    value: dataMaskingRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataMaskingRuleArraySerializer(result: Array<DataMaskingRule>): any[] {
  return result.map((item) => {
    return dataMaskingRuleSerializer(item);
  });
}

export function dataMaskingRuleArrayDeserializer(result: Array<DataMaskingRule>): any[] {
  return result.map((item) => {
    return dataMaskingRuleDeserializer(item);
  });
}

/** A database data masking rule. */
export interface DataMaskingRule extends ProxyResourceAutoGenerated {
  /** The location of the data masking rule. */
  readonly location?: string;
  /** The kind of Data Masking Rule. Metadata, used for Azure portal. */
  readonly kind?: string;
  /** The rule Id. */
  readonly idPropertiesId?: string;
  /** The rule state. Used to delete a rule. To delete an existing rule, specify the schemaName, tableName, columnName, maskingFunction, and specify ruleState as disabled. However, if the rule doesn't already exist, the rule will be created with ruleState set to enabled, regardless of the provided value of ruleState. */
  ruleState?: DataMaskingRuleState;
  /** The schema name on which the data masking rule is applied. */
  schemaName?: string;
  /** The table name on which the data masking rule is applied. */
  tableName?: string;
  /** The column name on which the data masking rule is applied. */
  columnName?: string;
  /** The alias name. This is a legacy parameter and is no longer used. */
  aliasName?: string;
  /** The masking function that is used for the data masking rule. */
  maskingFunction?: DataMaskingFunction;
  /** The numberFrom property of the masking rule. Required if maskingFunction is set to Number, otherwise this parameter will be ignored. */
  numberFrom?: string;
  /** The numberTo property of the data masking rule. Required if maskingFunction is set to Number, otherwise this parameter will be ignored. */
  numberTo?: string;
  /** If maskingFunction is set to Text, the number of characters to show unmasked in the beginning of the string. Otherwise, this parameter will be ignored. */
  prefixSize?: string;
  /** If maskingFunction is set to Text, the number of characters to show unmasked at the end of the string. Otherwise, this parameter will be ignored. */
  suffixSize?: string;
  /** If maskingFunction is set to Text, the character to use for masking the unexposed part of the string. Otherwise, this parameter will be ignored. */
  replacementString?: string;
}

export function dataMaskingRuleSerializer(item: DataMaskingRule): any {
  return {
    properties: areAllPropsUndefined(item, [
      "ruleState",
      "schemaName",
      "tableName",
      "columnName",
      "aliasName",
      "maskingFunction",
      "numberFrom",
      "numberTo",
      "prefixSize",
      "suffixSize",
      "replacementString",
    ])
      ? undefined
      : _dataMaskingRulePropertiesSerializer(item),
  };
}

export function dataMaskingRuleDeserializer(item: any): DataMaskingRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    kind: item["kind"],
    ...(!item["properties"]
      ? item["properties"]
      : _dataMaskingRulePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a database data masking rule. */
export interface DataMaskingRuleProperties {
  /** The rule Id. */
  readonly id?: string;
  /** The rule state. Used to delete a rule. To delete an existing rule, specify the schemaName, tableName, columnName, maskingFunction, and specify ruleState as disabled. However, if the rule doesn't already exist, the rule will be created with ruleState set to enabled, regardless of the provided value of ruleState. */
  ruleState?: DataMaskingRuleState;
  /** The schema name on which the data masking rule is applied. */
  schemaName: string;
  /** The table name on which the data masking rule is applied. */
  tableName: string;
  /** The column name on which the data masking rule is applied. */
  columnName: string;
  /** The alias name. This is a legacy parameter and is no longer used. */
  aliasName?: string;
  /** The masking function that is used for the data masking rule. */
  maskingFunction: DataMaskingFunction;
  /** The numberFrom property of the masking rule. Required if maskingFunction is set to Number, otherwise this parameter will be ignored. */
  numberFrom?: string;
  /** The numberTo property of the data masking rule. Required if maskingFunction is set to Number, otherwise this parameter will be ignored. */
  numberTo?: string;
  /** If maskingFunction is set to Text, the number of characters to show unmasked in the beginning of the string. Otherwise, this parameter will be ignored. */
  prefixSize?: string;
  /** If maskingFunction is set to Text, the number of characters to show unmasked at the end of the string. Otherwise, this parameter will be ignored. */
  suffixSize?: string;
  /** If maskingFunction is set to Text, the character to use for masking the unexposed part of the string. Otherwise, this parameter will be ignored. */
  replacementString?: string;
}

export function dataMaskingRulePropertiesSerializer(item: DataMaskingRuleProperties): any {
  return {
    ruleState: item["ruleState"],
    schemaName: item["schemaName"],
    tableName: item["tableName"],
    columnName: item["columnName"],
    aliasName: item["aliasName"],
    maskingFunction: item["maskingFunction"],
    numberFrom: item["numberFrom"],
    numberTo: item["numberTo"],
    prefixSize: item["prefixSize"],
    suffixSize: item["suffixSize"],
    replacementString: item["replacementString"],
  };
}

export function dataMaskingRulePropertiesDeserializer(item: any): DataMaskingRuleProperties {
  return {
    id: item["id"],
    ruleState: item["ruleState"],
    schemaName: item["schemaName"],
    tableName: item["tableName"],
    columnName: item["columnName"],
    aliasName: item["aliasName"],
    maskingFunction: item["maskingFunction"],
    numberFrom: item["numberFrom"],
    numberTo: item["numberTo"],
    prefixSize: item["prefixSize"],
    suffixSize: item["suffixSize"],
    replacementString: item["replacementString"],
  };
}

/** The rule state. Used to delete a rule. To delete an existing rule, specify the schemaName, tableName, columnName, maskingFunction, and specify ruleState as disabled. However, if the rule doesn't already exist, the rule will be created with ruleState set to enabled, regardless of the provided value of ruleState. */
export enum KnownDataMaskingRuleState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The rule state. Used to delete a rule. To delete an existing rule, specify the schemaName, tableName, columnName, maskingFunction, and specify ruleState as disabled. However, if the rule doesn't already exist, the rule will be created with ruleState set to enabled, regardless of the provided value of ruleState. \
 * {@link KnownDataMaskingRuleState} can be used interchangeably with DataMaskingRuleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type DataMaskingRuleState = string;

/** The masking function that is used for the data masking rule. */
export enum KnownDataMaskingFunction {
  /** Default */
  Default = "Default",
  /** CCN */
  CCN = "CCN",
  /** Email */
  Email = "Email",
  /** Number */
  Number = "Number",
  /** SSN */
  SSN = "SSN",
  /** Text */
  Text = "Text",
}

/**
 * The masking function that is used for the data masking rule. \
 * {@link KnownDataMaskingFunction} can be used interchangeably with DataMaskingFunction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default \
 * **CCN**: CCN \
 * **Email**: Email \
 * **Number**: Number \
 * **SSN**: SSN \
 * **Text**: Text
 */
export type DataMaskingFunction = string;

/** User activities of a data warehouse */
export interface DataWarehouseUserActivities extends ProxyResource {
  /** Count of running and suspended queries. */
  readonly activeQueriesCount?: number;
}

export function dataWarehouseUserActivitiesDeserializer(item: any): DataWarehouseUserActivities {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _dataWarehouseUserActivitiesPropertiesDeserializer(item["properties"])),
  };
}

/** User activities of a data warehouse. This currently includes the count of running or suspended queries. For more information, please view the sys.dm_pdw_exec_requests dynamic management view (DMV). */
export interface DataWarehouseUserActivitiesProperties {
  /** Count of running and suspended queries. */
  readonly activeQueriesCount?: number;
}

export function dataWarehouseUserActivitiesPropertiesDeserializer(
  item: any,
): DataWarehouseUserActivitiesProperties {
  return {
    activeQueriesCount: item["activeQueriesCount"],
  };
}

/** Known values of {@link DataWarehouseUserActivityName} that the service accepts. */
export enum KnownDataWarehouseUserActivityName {
  /** current */
  Current = "current",
}

/** Type of DataWarehouseUserActivityName */
export type DataWarehouseUserActivityName = string;

/** The response of a DataWarehouseUserActivities list operation. */
export interface _DataWarehouseUserActivitiesListResult {
  /** The DataWarehouseUserActivities items on this page */
  value: DataWarehouseUserActivities[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataWarehouseUserActivitiesListResultDeserializer(
  item: any,
): _DataWarehouseUserActivitiesListResult {
  return {
    value: dataWarehouseUserActivitiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataWarehouseUserActivitiesArrayDeserializer(
  result: Array<DataWarehouseUserActivities>,
): any[] {
  return result.map((item) => {
    return dataWarehouseUserActivitiesDeserializer(item);
  });
}

/** A list of security events. */
export interface _SecurityEventCollection {
  /** The SecurityEvent items on this page */
  value: SecurityEvent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityEventCollectionDeserializer(item: any): _SecurityEventCollection {
  return {
    value: securityEventArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityEventArrayDeserializer(result: Array<SecurityEvent>): any[] {
  return result.map((item) => {
    return securityEventDeserializer(item);
  });
}

/** A security event. */
export interface SecurityEvent extends ProxyResourceAutoGenerated {
  /** The time when the security event occurred. */
  readonly eventTime?: Date;
  /** The type of the security event. */
  readonly securityEventType?: SecurityEventType;
  /** The subscription name */
  readonly subscription?: string;
  /** The server name */
  readonly server?: string;
  /** The database name */
  readonly database?: string;
  /** The IP address of the client who executed the statement. */
  readonly clientIp?: string;
  /** The application used to execute the statement. */
  readonly applicationName?: string;
  /** The principal user who executed the statement */
  readonly principalName?: string;
  /** The sql injection additional properties, populated only if the type of the security event is sql injection. */
  readonly securityEventSqlInjectionAdditionalProperties?: SecurityEventSqlInjectionAdditionalProperties;
}

export function securityEventDeserializer(item: any): SecurityEvent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _securityEventPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a security event. */
export interface SecurityEventProperties {
  /** The time when the security event occurred. */
  readonly eventTime?: Date;
  /** The type of the security event. */
  readonly securityEventType?: SecurityEventType;
  /** The subscription name */
  readonly subscription?: string;
  /** The server name */
  readonly server?: string;
  /** The database name */
  readonly database?: string;
  /** The IP address of the client who executed the statement. */
  readonly clientIp?: string;
  /** The application used to execute the statement. */
  readonly applicationName?: string;
  /** The principal user who executed the statement */
  readonly principalName?: string;
  /** The sql injection additional properties, populated only if the type of the security event is sql injection. */
  readonly securityEventSqlInjectionAdditionalProperties?: SecurityEventSqlInjectionAdditionalProperties;
}

export function securityEventPropertiesDeserializer(item: any): SecurityEventProperties {
  return {
    eventTime: !item["eventTime"] ? item["eventTime"] : new Date(item["eventTime"]),
    securityEventType: item["securityEventType"],
    subscription: item["subscription"],
    server: item["server"],
    database: item["database"],
    clientIp: item["clientIp"],
    applicationName: item["applicationName"],
    principalName: item["principalName"],
    securityEventSqlInjectionAdditionalProperties: !item[
      "securityEventSqlInjectionAdditionalProperties"
    ]
      ? item["securityEventSqlInjectionAdditionalProperties"]
      : securityEventSqlInjectionAdditionalPropertiesDeserializer(
          item["securityEventSqlInjectionAdditionalProperties"],
        ),
  };
}

/** The type of the security event. */
export type SecurityEventType = "Undefined" | "SqlInjectionVulnerability" | "SqlInjectionExploit";

/** The properties of a security event sql injection additional properties. */
export interface SecurityEventSqlInjectionAdditionalProperties {
  /** The threat ID. */
  readonly threatId?: string;
  /** The statement */
  readonly statement?: string;
  /** The statement highlight offset */
  readonly statementHighlightOffset?: number;
  /** The statement highlight length */
  readonly statementHighlightLength?: number;
  /** The sql error code */
  readonly errorCode?: number;
  /** The sql error severity */
  readonly errorSeverity?: number;
  /** The sql error message */
  readonly errorMessage?: string;
}

export function securityEventSqlInjectionAdditionalPropertiesDeserializer(
  item: any,
): SecurityEventSqlInjectionAdditionalProperties {
  return {
    threatId: item["threatId"],
    statement: item["statement"],
    statementHighlightOffset: item["statementHighlightOffset"],
    statementHighlightLength: item["statementHighlightLength"],
    errorCode: item["errorCode"],
    errorSeverity: item["errorSeverity"],
    errorMessage: item["errorMessage"],
  };
}

/** The response of a ElasticPoolOperation list operation. */
export interface _ElasticPoolOperationListResult {
  /** The ElasticPoolOperation items on this page */
  value: ElasticPoolOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _elasticPoolOperationListResultDeserializer(
  item: any,
): _ElasticPoolOperationListResult {
  return {
    value: elasticPoolOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function elasticPoolOperationArrayDeserializer(result: Array<ElasticPoolOperation>): any[] {
  return result.map((item) => {
    return elasticPoolOperationDeserializer(item);
  });
}

/** A elastic pool operation. */
export interface ElasticPoolOperation extends ProxyResourceAutoGenerated {
  /** The name of the elastic pool the operation is being performed on. */
  readonly elasticPoolName?: string;
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The percentage of the operation completed. */
  readonly percentComplete?: number;
  /** The name of the server. */
  readonly serverName?: string;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: string;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Whether or not the error is a user error. */
  readonly isUserError?: boolean;
  /** The estimated completion time of the operation. */
  readonly estimatedCompletionTime?: Date;
  /** The operation description. */
  readonly description?: string;
  /** Whether the operation can be cancelled. */
  readonly isCancellable?: boolean;
}

export function elasticPoolOperationDeserializer(item: any): ElasticPoolOperation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _elasticPoolOperationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a elastic pool operation. */
export interface ElasticPoolOperationProperties {
  /** The name of the elastic pool the operation is being performed on. */
  readonly elasticPoolName?: string;
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The percentage of the operation completed. */
  readonly percentComplete?: number;
  /** The name of the server. */
  readonly serverName?: string;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: string;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Whether or not the error is a user error. */
  readonly isUserError?: boolean;
  /** The estimated completion time of the operation. */
  readonly estimatedCompletionTime?: Date;
  /** The operation description. */
  readonly description?: string;
  /** Whether the operation can be cancelled. */
  readonly isCancellable?: boolean;
}

export function elasticPoolOperationPropertiesDeserializer(
  item: any,
): ElasticPoolOperationProperties {
  return {
    elasticPoolName: item["elasticPoolName"],
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    percentComplete: item["percentComplete"],
    serverName: item["serverName"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    isUserError: item["isUserError"],
    estimatedCompletionTime: !item["estimatedCompletionTime"]
      ? item["estimatedCompletionTime"]
      : new Date(item["estimatedCompletionTime"]),
    description: item["description"],
    isCancellable: item["isCancellable"],
  };
}

/** A list of usages. */
export interface _UsageListResult {
  /** The Usage items on this page */
  value: Usage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _usageListResultDeserializer(item: any): _UsageListResult {
  return {
    value: usageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageArrayDeserializer(result: Array<Usage>): any[] {
  return result.map((item) => {
    return usageDeserializer(item);
  });
}

/** ARM usage. */
export interface Usage {
  /** Resource ID. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: Name;
  /** Resource type. */
  readonly type?: string;
  /** Usage unit. */
  readonly unit?: string;
  /** Usage current value. */
  readonly currentValue?: number;
  /** Usage limit. */
  readonly limit?: number;
  /** Usage requested limit. */
  readonly requestedLimit?: number;
}

export function usageDeserializer(item: any): Usage {
  return {
    id: item["id"],
    name: !item["name"] ? item["name"] : nameDeserializer(item["name"]),
    type: item["type"],
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    requestedLimit: item["requestedLimit"],
  };
}

/** ARM Usage Name */
export interface Name {
  /** Usage name value */
  value?: string;
  /** Usage name localized value. */
  localizedValue?: string;
}

export function nameDeserializer(item: any): Name {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** Azure SQL Database ledger digest upload settings. */
export interface LedgerDigestUploads extends ProxyResource {
  /** The digest storage endpoint, which must be either an Azure blob storage endpoint or an URI for Azure Confidential Ledger. */
  digestStorageEndpoint?: string;
  /** Specifies the state of ledger digest upload. */
  readonly state?: LedgerDigestUploadsState;
}

export function ledgerDigestUploadsSerializer(item: LedgerDigestUploads): any {
  return {
    properties: areAllPropsUndefined(item, ["digestStorageEndpoint"])
      ? undefined
      : _ledgerDigestUploadsPropertiesSerializer(item),
  };
}

export function ledgerDigestUploadsDeserializer(item: any): LedgerDigestUploads {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ledgerDigestUploadsPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a database ledger digest upload settings. */
export interface LedgerDigestUploadsProperties {
  /** The digest storage endpoint, which must be either an Azure blob storage endpoint or an URI for Azure Confidential Ledger. */
  digestStorageEndpoint?: string;
  /** Specifies the state of ledger digest upload. */
  readonly state?: LedgerDigestUploadsState;
}

export function ledgerDigestUploadsPropertiesSerializer(item: LedgerDigestUploadsProperties): any {
  return { digestStorageEndpoint: item["digestStorageEndpoint"] };
}

export function ledgerDigestUploadsPropertiesDeserializer(
  item: any,
): LedgerDigestUploadsProperties {
  return {
    digestStorageEndpoint: item["digestStorageEndpoint"],
    state: item["state"],
  };
}

/** Specifies the state of ledger digest upload. */
export type LedgerDigestUploadsState = "Enabled" | "Disabled";

/** Known values of {@link LedgerDigestUploadsName} that the service accepts. */
export enum KnownLedgerDigestUploadsName {
  /** current */
  Current = "current",
}

/** Type of LedgerDigestUploadsName */
export type LedgerDigestUploadsName = string;

/** The response of a LedgerDigestUploads list operation. */
export interface _LedgerDigestUploadsListResult {
  /** The LedgerDigestUploads items on this page */
  value: LedgerDigestUploads[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ledgerDigestUploadsListResultDeserializer(
  item: any,
): _LedgerDigestUploadsListResult {
  return {
    value: ledgerDigestUploadsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ledgerDigestUploadsArraySerializer(result: Array<LedgerDigestUploads>): any[] {
  return result.map((item) => {
    return ledgerDigestUploadsSerializer(item);
  });
}

export function ledgerDigestUploadsArrayDeserializer(result: Array<LedgerDigestUploads>): any[] {
  return result.map((item) => {
    return ledgerDigestUploadsDeserializer(item);
  });
}

/** Maintenance window options. */
export interface MaintenanceWindowOptions extends ProxyResource {
  /** Whether maintenance windows are enabled for the database. */
  isEnabled?: boolean;
  /** Available maintenance cycles e.g. {Saturday, 0, 48*60}, {Wednesday, 0, 24*60}. */
  maintenanceWindowCycles?: MaintenanceWindowTimeRange[];
  /** Minimum duration of maintenance window. */
  minDurationInMinutes?: number;
  /** Default duration for maintenance window. */
  defaultDurationInMinutes?: number;
  /** Minimum number of maintenance windows cycles to be set on the database. */
  minCycles?: number;
  /** Time granularity in minutes for maintenance windows. */
  timeGranularityInMinutes?: number;
  /** Whether we allow multiple maintenance windows per cycle. */
  allowMultipleMaintenanceWindowsPerCycle?: boolean;
}

export function maintenanceWindowOptionsDeserializer(item: any): MaintenanceWindowOptions {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _maintenanceWindowOptionsPropertiesDeserializer(item["properties"])),
  };
}

/** Maintenance window options properties. */
export interface MaintenanceWindowOptionsProperties {
  /** Whether maintenance windows are enabled for the database. */
  isEnabled?: boolean;
  /** Available maintenance cycles e.g. {Saturday, 0, 48*60}, {Wednesday, 0, 24*60}. */
  maintenanceWindowCycles?: MaintenanceWindowTimeRange[];
  /** Minimum duration of maintenance window. */
  minDurationInMinutes?: number;
  /** Default duration for maintenance window. */
  defaultDurationInMinutes?: number;
  /** Minimum number of maintenance windows cycles to be set on the database. */
  minCycles?: number;
  /** Time granularity in minutes for maintenance windows. */
  timeGranularityInMinutes?: number;
  /** Whether we allow multiple maintenance windows per cycle. */
  allowMultipleMaintenanceWindowsPerCycle?: boolean;
}

export function maintenanceWindowOptionsPropertiesDeserializer(
  item: any,
): MaintenanceWindowOptionsProperties {
  return {
    isEnabled: item["isEnabled"],
    maintenanceWindowCycles: !item["maintenanceWindowCycles"]
      ? item["maintenanceWindowCycles"]
      : maintenanceWindowTimeRangeArrayDeserializer(item["maintenanceWindowCycles"]),
    minDurationInMinutes: item["minDurationInMinutes"],
    defaultDurationInMinutes: item["defaultDurationInMinutes"],
    minCycles: item["minCycles"],
    timeGranularityInMinutes: item["timeGranularityInMinutes"],
    allowMultipleMaintenanceWindowsPerCycle: item["allowMultipleMaintenanceWindowsPerCycle"],
  };
}

export function maintenanceWindowTimeRangeArraySerializer(
  result: Array<MaintenanceWindowTimeRange>,
): any[] {
  return result.map((item) => {
    return maintenanceWindowTimeRangeSerializer(item);
  });
}

export function maintenanceWindowTimeRangeArrayDeserializer(
  result: Array<MaintenanceWindowTimeRange>,
): any[] {
  return result.map((item) => {
    return maintenanceWindowTimeRangeDeserializer(item);
  });
}

/** Maintenance window time range. */
export interface MaintenanceWindowTimeRange {
  /** Day of maintenance window. */
  dayOfWeek?: DayOfWeek;
  /** Start time minutes offset from 12am. */
  startTime?: string;
  /** Duration of maintenance window in minutes. */
  duration?: string;
}

export function maintenanceWindowTimeRangeSerializer(item: MaintenanceWindowTimeRange): any {
  return { dayOfWeek: item["dayOfWeek"], startTime: item["startTime"], duration: item["duration"] };
}

export function maintenanceWindowTimeRangeDeserializer(item: any): MaintenanceWindowTimeRange {
  return {
    dayOfWeek: item["dayOfWeek"],
    startTime: item["startTime"],
    duration: item["duration"],
  };
}

/** Maintenance windows. */
export interface MaintenanceWindows extends ProxyResource {
  timeRanges?: MaintenanceWindowTimeRange[];
}

export function maintenanceWindowsSerializer(item: MaintenanceWindows): any {
  return {
    properties: areAllPropsUndefined(item, ["timeRanges"])
      ? undefined
      : _maintenanceWindowsPropertiesSerializer(item),
  };
}

export function maintenanceWindowsDeserializer(item: any): MaintenanceWindows {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _maintenanceWindowsPropertiesDeserializer(item["properties"])),
  };
}

/** Maintenance windows resource properties. */
export interface MaintenanceWindowsProperties {
  timeRanges?: MaintenanceWindowTimeRange[];
}

export function maintenanceWindowsPropertiesSerializer(item: MaintenanceWindowsProperties): any {
  return {
    timeRanges: !item["timeRanges"]
      ? item["timeRanges"]
      : maintenanceWindowTimeRangeArraySerializer(item["timeRanges"]),
  };
}

export function maintenanceWindowsPropertiesDeserializer(item: any): MaintenanceWindowsProperties {
  return {
    timeRanges: !item["timeRanges"]
      ? item["timeRanges"]
      : maintenanceWindowTimeRangeArrayDeserializer(item["timeRanges"]),
  };
}

/** A managed database Advanced Threat Protection. */
export interface ManagedDatabaseAdvancedThreatProtection extends ProxyResource {
  /** Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server. */
  state?: AdvancedThreatProtectionState;
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
}

export function managedDatabaseAdvancedThreatProtectionSerializer(
  item: ManagedDatabaseAdvancedThreatProtection,
): any {
  return {
    properties: areAllPropsUndefined(item, ["state"])
      ? undefined
      : _managedDatabaseAdvancedThreatProtectionPropertiesSerializer(item),
  };
}

export function managedDatabaseAdvancedThreatProtectionDeserializer(
  item: any,
): ManagedDatabaseAdvancedThreatProtection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedDatabaseAdvancedThreatProtectionPropertiesDeserializer(item["properties"])),
  };
}

/** The response of a ManagedDatabaseAdvancedThreatProtection list operation. */
export interface _ManagedDatabaseAdvancedThreatProtectionListResult {
  /** The ManagedDatabaseAdvancedThreatProtection items on this page */
  value: ManagedDatabaseAdvancedThreatProtection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedDatabaseAdvancedThreatProtectionListResultDeserializer(
  item: any,
): _ManagedDatabaseAdvancedThreatProtectionListResult {
  return {
    value: managedDatabaseAdvancedThreatProtectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedDatabaseAdvancedThreatProtectionArraySerializer(
  result: Array<ManagedDatabaseAdvancedThreatProtection>,
): any[] {
  return result.map((item) => {
    return managedDatabaseAdvancedThreatProtectionSerializer(item);
  });
}

export function managedDatabaseAdvancedThreatProtectionArrayDeserializer(
  result: Array<ManagedDatabaseAdvancedThreatProtection>,
): any[] {
  return result.map((item) => {
    return managedDatabaseAdvancedThreatProtectionDeserializer(item);
  });
}

/** A managed database move operation. */
export interface ManagedDatabaseMoveOperationResult extends ProxyResource {
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: ManagementOperationState;
  /** Operation mode. */
  readonly operationMode?: MoveOperationMode;
  /** Source Managed Instance name. */
  readonly sourceManagedInstanceName?: string;
  /** Target Managed Instance name. */
  readonly targetManagedInstanceName?: string;
  /** Source Managed Instance resource id. */
  readonly sourceManagedInstanceId?: string;
  /** Target Managed instance resource id. */
  readonly targetManagedInstanceId?: string;
  /** Source database name. */
  readonly sourceDatabaseName?: string;
  /** Target database name. */
  readonly targetDatabaseName?: string;
  /** Is move operation cancellable. */
  readonly isCancellable?: boolean;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Whether or not the error is a user error. */
  readonly isUserError?: boolean;
}

export function managedDatabaseMoveOperationResultDeserializer(
  item: any,
): ManagedDatabaseMoveOperationResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedDatabaseMoveOperationResultPropertiesDeserializer(item["properties"])),
  };
}

/** Contains the operation result properties for managed database move operation. */
export interface ManagedDatabaseMoveOperationResultProperties {
  /** The name of operation. */
  readonly operation?: string;
  /** The friendly name of operation. */
  readonly operationFriendlyName?: string;
  /** The operation start time. */
  readonly startTime?: Date;
  /** The operation state. */
  readonly state?: ManagementOperationState;
  /** Operation mode. */
  readonly operationMode?: MoveOperationMode;
  /** Source Managed Instance name. */
  readonly sourceManagedInstanceName?: string;
  /** Target Managed Instance name. */
  readonly targetManagedInstanceName?: string;
  /** Source Managed Instance resource id. */
  readonly sourceManagedInstanceId?: string;
  /** Target Managed instance resource id. */
  readonly targetManagedInstanceId?: string;
  /** Source database name. */
  readonly sourceDatabaseName?: string;
  /** Target database name. */
  readonly targetDatabaseName?: string;
  /** Is move operation cancellable. */
  readonly isCancellable?: boolean;
  /** The operation error code. */
  readonly errorCode?: number;
  /** The operation error description. */
  readonly errorDescription?: string;
  /** The operation error severity. */
  readonly errorSeverity?: number;
  /** Whether or not the error is a user error. */
  readonly isUserError?: boolean;
}

export function managedDatabaseMoveOperationResultPropertiesDeserializer(
  item: any,
): ManagedDatabaseMoveOperationResultProperties {
  return {
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    operationMode: item["operationMode"],
    sourceManagedInstanceName: item["sourceManagedInstanceName"],
    targetManagedInstanceName: item["targetManagedInstanceName"],
    sourceManagedInstanceId: item["sourceManagedInstanceId"],
    targetManagedInstanceId: item["targetManagedInstanceId"],
    sourceDatabaseName: item["sourceDatabaseName"],
    targetDatabaseName: item["targetDatabaseName"],
    isCancellable: item["isCancellable"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    isUserError: item["isUserError"],
  };
}

/** List of managed database move operations. */
export interface _ManagedDatabaseMoveOperationListResult {
  /** Array of results. */
  readonly value?: ManagedDatabaseMoveOperationResult[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _managedDatabaseMoveOperationListResultDeserializer(
  item: any,
): _ManagedDatabaseMoveOperationListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : managedDatabaseMoveOperationResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedDatabaseMoveOperationResultArrayDeserializer(
  result: Array<ManagedDatabaseMoveOperationResult>,
): any[] {
  return result.map((item) => {
    return managedDatabaseMoveOperationResultDeserializer(item);
  });
}

/** Database query. */
export interface ManagedInstanceQuery extends ProxyResource {
  /** Query text. */
  queryText?: string;
}

export function managedInstanceQueryDeserializer(item: any): ManagedInstanceQuery {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstanceQueryPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a database query. */
export interface QueryProperties {
  /** Query text. */
  queryText?: string;
}

export function queryPropertiesDeserializer(item: any): QueryProperties {
  return {
    queryText: item["queryText"],
  };
}

/** Execution statistics for one particular query */
export interface _ManagedInstanceQueryStatistics {
  /** The QueryStatistics items on this page */
  value: QueryStatistics[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstanceQueryStatisticsDeserializer(
  item: any,
): _ManagedInstanceQueryStatistics {
  return {
    value: queryStatisticsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function queryStatisticsArrayDeserializer(result: Array<QueryStatistics>): any[] {
  return result.map((item) => {
    return queryStatisticsDeserializer(item);
  });
}

/** model interface QueryStatistics */
export interface QueryStatistics extends ProxyResourceAutoGenerated {
  /** Database name of the database in which this query was executed. */
  readonly databaseName?: string;
  /** Unique query id (unique within one database). */
  readonly queryId?: string;
  /** The start time for the metric (ISO-8601 format). */
  readonly startTime?: string;
  /** The end time for the metric (ISO-8601 format). */
  readonly endTime?: string;
  /** List of intervals with appropriate metric data */
  intervals?: QueryMetricInterval[];
}

export function queryStatisticsDeserializer(item: any): QueryStatistics {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _queryStatisticsPropertiesDeserializer(item["properties"])),
  };
}

/** A managed database restore details. */
export interface ManagedDatabaseRestoreDetailsResult extends ProxyResource {
  /** Restore type. */
  readonly typePropertiesType?: string;
  /** Restore status. */
  readonly status?: string;
  /** The reason why restore is in Blocked state. */
  readonly blockReason?: string;
  /** Last uploaded file name. */
  readonly lastUploadedFileName?: string;
  /** Last uploaded file time. */
  readonly lastUploadedFileTime?: Date;
  /** Last restored file name. */
  readonly lastRestoredFileName?: string;
  /** Last restored file time. */
  readonly lastRestoredFileTime?: Date;
  /** Percent completed. */
  readonly percentCompleted?: number;
  /** Current restored size MB. */
  readonly currentRestoredSizeMB?: number;
  /** Current restore plan size MB. */
  readonly currentRestorePlanSizeMB?: number;
  /** Current backup type. */
  readonly currentBackupType?: string;
  /** Current restoring file name. */
  readonly currentRestoringFileName?: string;
  /** Number of files detected. */
  readonly numberOfFilesDetected?: number;
  /** Number of files queued. */
  readonly numberOfFilesQueued?: number;
  /** Number of files skipped. */
  readonly numberOfFilesSkipped?: number;
  /** Number of files restoring. */
  readonly numberOfFilesRestoring?: number;
  /** Number of files restored. */
  readonly numberOfFilesRestored?: number;
  /** Number of files unrestorable. */
  readonly numberOfFilesUnrestorable?: number;
  /** Full backup sets. */
  readonly fullBackupSets?: ManagedDatabaseRestoreDetailsBackupSetProperties[];
  /** Diff backup sets. */
  readonly diffBackupSets?: ManagedDatabaseRestoreDetailsBackupSetProperties[];
  /** Log backup sets. */
  readonly logBackupSets?: ManagedDatabaseRestoreDetailsBackupSetProperties[];
  /** Unrestorable files. */
  readonly unrestorableFiles?: ManagedDatabaseRestoreDetailsUnrestorableFileProperties[];
}

export function managedDatabaseRestoreDetailsResultDeserializer(
  item: any,
): ManagedDatabaseRestoreDetailsResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedDatabaseRestoreDetailsResultPropertiesDeserializer(item["properties"])),
  };
}

/** The managed database's restore details properties. */
export interface ManagedDatabaseRestoreDetailsProperties {
  /** Restore type. */
  readonly type?: string;
  /** Restore status. */
  readonly status?: string;
  /** The reason why restore is in Blocked state. */
  readonly blockReason?: string;
  /** Last uploaded file name. */
  readonly lastUploadedFileName?: string;
  /** Last uploaded file time. */
  readonly lastUploadedFileTime?: Date;
  /** Last restored file name. */
  readonly lastRestoredFileName?: string;
  /** Last restored file time. */
  readonly lastRestoredFileTime?: Date;
  /** Percent completed. */
  readonly percentCompleted?: number;
  /** Current restored size MB. */
  readonly currentRestoredSizeMB?: number;
  /** Current restore plan size MB. */
  readonly currentRestorePlanSizeMB?: number;
  /** Current backup type. */
  readonly currentBackupType?: string;
  /** Current restoring file name. */
  readonly currentRestoringFileName?: string;
  /** Number of files detected. */
  readonly numberOfFilesDetected?: number;
  /** Number of files queued. */
  readonly numberOfFilesQueued?: number;
  /** Number of files skipped. */
  readonly numberOfFilesSkipped?: number;
  /** Number of files restoring. */
  readonly numberOfFilesRestoring?: number;
  /** Number of files restored. */
  readonly numberOfFilesRestored?: number;
  /** Number of files unrestorable. */
  readonly numberOfFilesUnrestorable?: number;
  /** Full backup sets. */
  readonly fullBackupSets?: ManagedDatabaseRestoreDetailsBackupSetProperties[];
  /** Diff backup sets. */
  readonly diffBackupSets?: ManagedDatabaseRestoreDetailsBackupSetProperties[];
  /** Log backup sets. */
  readonly logBackupSets?: ManagedDatabaseRestoreDetailsBackupSetProperties[];
  /** Unrestorable files. */
  readonly unrestorableFiles?: ManagedDatabaseRestoreDetailsUnrestorableFileProperties[];
}

export function managedDatabaseRestoreDetailsPropertiesDeserializer(
  item: any,
): ManagedDatabaseRestoreDetailsProperties {
  return {
    type: item["type"],
    status: item["status"],
    blockReason: item["blockReason"],
    lastUploadedFileName: item["lastUploadedFileName"],
    lastUploadedFileTime: !item["lastUploadedFileTime"]
      ? item["lastUploadedFileTime"]
      : new Date(item["lastUploadedFileTime"]),
    lastRestoredFileName: item["lastRestoredFileName"],
    lastRestoredFileTime: !item["lastRestoredFileTime"]
      ? item["lastRestoredFileTime"]
      : new Date(item["lastRestoredFileTime"]),
    percentCompleted: item["percentCompleted"],
    currentRestoredSizeMB: item["currentRestoredSizeMB"],
    currentRestorePlanSizeMB: item["currentRestorePlanSizeMB"],
    currentBackupType: item["currentBackupType"],
    currentRestoringFileName: item["currentRestoringFileName"],
    numberOfFilesDetected: item["numberOfFilesDetected"],
    numberOfFilesQueued: item["numberOfFilesQueued"],
    numberOfFilesSkipped: item["numberOfFilesSkipped"],
    numberOfFilesRestoring: item["numberOfFilesRestoring"],
    numberOfFilesRestored: item["numberOfFilesRestored"],
    numberOfFilesUnrestorable: item["numberOfFilesUnrestorable"],
    fullBackupSets: !item["fullBackupSets"]
      ? item["fullBackupSets"]
      : managedDatabaseRestoreDetailsBackupSetPropertiesArrayDeserializer(item["fullBackupSets"]),
    diffBackupSets: !item["diffBackupSets"]
      ? item["diffBackupSets"]
      : managedDatabaseRestoreDetailsBackupSetPropertiesArrayDeserializer(item["diffBackupSets"]),
    logBackupSets: !item["logBackupSets"]
      ? item["logBackupSets"]
      : managedDatabaseRestoreDetailsBackupSetPropertiesArrayDeserializer(item["logBackupSets"]),
    unrestorableFiles: !item["unrestorableFiles"]
      ? item["unrestorableFiles"]
      : managedDatabaseRestoreDetailsUnrestorableFilePropertiesArrayDeserializer(
          item["unrestorableFiles"],
        ),
  };
}

export function managedDatabaseRestoreDetailsBackupSetPropertiesArrayDeserializer(
  result: Array<ManagedDatabaseRestoreDetailsBackupSetProperties>,
): any[] {
  return result.map((item) => {
    return managedDatabaseRestoreDetailsBackupSetPropertiesDeserializer(item);
  });
}

/** The managed database's restore details backup set properties. */
export interface ManagedDatabaseRestoreDetailsBackupSetProperties {
  /** Backup set status. */
  readonly status?: string;
  /** First stripe name. */
  readonly firstStripeName?: string;
  /** Number of stripes. */
  readonly numberOfStripes?: number;
  /** Backup size. */
  readonly backupSizeMB?: number;
  /** Last restored file time. */
  readonly restoreStartedTimestampUtc?: Date;
  /** Last restored file time. */
  readonly restoreFinishedTimestampUtc?: Date;
}

export function managedDatabaseRestoreDetailsBackupSetPropertiesDeserializer(
  item: any,
): ManagedDatabaseRestoreDetailsBackupSetProperties {
  return {
    status: item["status"],
    firstStripeName: item["firstStripeName"],
    numberOfStripes: item["numberOfStripes"],
    backupSizeMB: item["backupSizeMB"],
    restoreStartedTimestampUtc: !item["restoreStartedTimestampUtc"]
      ? item["restoreStartedTimestampUtc"]
      : new Date(item["restoreStartedTimestampUtc"]),
    restoreFinishedTimestampUtc: !item["restoreFinishedTimestampUtc"]
      ? item["restoreFinishedTimestampUtc"]
      : new Date(item["restoreFinishedTimestampUtc"]),
  };
}

export function managedDatabaseRestoreDetailsUnrestorableFilePropertiesArrayDeserializer(
  result: Array<ManagedDatabaseRestoreDetailsUnrestorableFileProperties>,
): any[] {
  return result.map((item) => {
    return managedDatabaseRestoreDetailsUnrestorableFilePropertiesDeserializer(item);
  });
}

/** The managed database's restore details unrestorable file properties. */
export interface ManagedDatabaseRestoreDetailsUnrestorableFileProperties {
  /** File name. */
  readonly name?: string;
}

export function managedDatabaseRestoreDetailsUnrestorableFilePropertiesDeserializer(
  item: any,
): ManagedDatabaseRestoreDetailsUnrestorableFileProperties {
  return {
    name: item["name"],
  };
}

/** Known values of {@link RestoreDetailsName} that the service accepts. */
export enum KnownRestoreDetailsName {
  /** Default */
  Default = "Default",
}

/** Type of RestoreDetailsName */
export type RestoreDetailsName = string;

/** A managed database transparent data encryption state. */
export interface ManagedTransparentDataEncryption extends ProxyResource {
  /** Specifies the state of the transparent data encryption. */
  state?: TransparentDataEncryptionState;
}

export function managedTransparentDataEncryptionSerializer(
  item: ManagedTransparentDataEncryption,
): any {
  return {
    properties: areAllPropsUndefined(item, ["state"])
      ? undefined
      : _managedTransparentDataEncryptionPropertiesSerializer(item),
  };
}

export function managedTransparentDataEncryptionDeserializer(
  item: any,
): ManagedTransparentDataEncryption {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedTransparentDataEncryptionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a transparent data encryption. */
export interface ManagedTransparentDataEncryptionProperties {
  /** Specifies the state of the transparent data encryption. */
  state: TransparentDataEncryptionState;
}

export function managedTransparentDataEncryptionPropertiesSerializer(
  item: ManagedTransparentDataEncryptionProperties,
): any {
  return { state: item["state"] };
}

export function managedTransparentDataEncryptionPropertiesDeserializer(
  item: any,
): ManagedTransparentDataEncryptionProperties {
  return {
    state: item["state"],
  };
}

/** Specifies the state of the transparent data encryption. */
export type TransparentDataEncryptionState = "Enabled" | "Disabled";

/** Known values of {@link TransparentDataEncryptionName} that the service accepts. */
export enum KnownTransparentDataEncryptionName {
  /** current */
  Current = "current",
}

/** Type of TransparentDataEncryptionName */
export type TransparentDataEncryptionName = string;

/** The response of a ManagedTransparentDataEncryption list operation. */
export interface _ManagedTransparentDataEncryptionListResult {
  /** The ManagedTransparentDataEncryption items on this page */
  value: ManagedTransparentDataEncryption[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedTransparentDataEncryptionListResultDeserializer(
  item: any,
): _ManagedTransparentDataEncryptionListResult {
  return {
    value: managedTransparentDataEncryptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedTransparentDataEncryptionArraySerializer(
  result: Array<ManagedTransparentDataEncryption>,
): any[] {
  return result.map((item) => {
    return managedTransparentDataEncryptionSerializer(item);
  });
}

export function managedTransparentDataEncryptionArrayDeserializer(
  result: Array<ManagedTransparentDataEncryption>,
): any[] {
  return result.map((item) => {
    return managedTransparentDataEncryptionDeserializer(item);
  });
}

/** A managed instance Advanced Threat Protection. */
export interface ManagedInstanceAdvancedThreatProtection extends ProxyResource {
  /** Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server. */
  state?: AdvancedThreatProtectionState;
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
}

export function managedInstanceAdvancedThreatProtectionSerializer(
  item: ManagedInstanceAdvancedThreatProtection,
): any {
  return {
    properties: areAllPropsUndefined(item, ["state"])
      ? undefined
      : _managedInstanceAdvancedThreatProtectionPropertiesSerializer(item),
  };
}

export function managedInstanceAdvancedThreatProtectionDeserializer(
  item: any,
): ManagedInstanceAdvancedThreatProtection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedInstanceAdvancedThreatProtectionPropertiesDeserializer(item["properties"])),
  };
}

/** The response of a ManagedInstanceAdvancedThreatProtection list operation. */
export interface _ManagedInstanceAdvancedThreatProtectionListResult {
  /** The ManagedInstanceAdvancedThreatProtection items on this page */
  value: ManagedInstanceAdvancedThreatProtection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstanceAdvancedThreatProtectionListResultDeserializer(
  item: any,
): _ManagedInstanceAdvancedThreatProtectionListResult {
  return {
    value: managedInstanceAdvancedThreatProtectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstanceAdvancedThreatProtectionArraySerializer(
  result: Array<ManagedInstanceAdvancedThreatProtection>,
): any[] {
  return result.map((item) => {
    return managedInstanceAdvancedThreatProtectionSerializer(item);
  });
}

export function managedInstanceAdvancedThreatProtectionArrayDeserializer(
  result: Array<ManagedInstanceAdvancedThreatProtection>,
): any[] {
  return result.map((item) => {
    return managedInstanceAdvancedThreatProtectionDeserializer(item);
  });
}

/** A private link resource */
export interface ManagedInstancePrivateLink extends ProxyResource {
  /** The private link resource group id. */
  readonly properties?: ManagedInstancePrivateLinkProperties;
}

export function managedInstancePrivateLinkDeserializer(item: any): ManagedInstancePrivateLink {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : managedInstancePrivateLinkPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private link resource. */
export interface ManagedInstancePrivateLinkProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource required zone names. */
  readonly requiredZoneNames?: string[];
}

export function managedInstancePrivateLinkPropertiesDeserializer(
  item: any,
): ManagedInstancePrivateLinkProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a ManagedInstancePrivateLink list operation. */
export interface _ManagedInstancePrivateLinkListResult {
  /** The ManagedInstancePrivateLink items on this page */
  value: ManagedInstancePrivateLink[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedInstancePrivateLinkListResultDeserializer(
  item: any,
): _ManagedInstancePrivateLinkListResult {
  return {
    value: managedInstancePrivateLinkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedInstancePrivateLinkArrayDeserializer(
  result: Array<ManagedInstancePrivateLink>,
): any[] {
  return result.map((item) => {
    return managedInstancePrivateLinkDeserializer(item);
  });
}

/** Azure SQL Database ledger digest upload settings. */
export interface ManagedLedgerDigestUploads extends ProxyResource {
  /** The digest storage endpoint, which must be either an Azure blob storage endpoint or an URI for Azure Confidential Ledger. */
  digestStorageEndpoint?: string;
  /** Specifies the state of ledger digest upload. */
  readonly state?: ManagedLedgerDigestUploadsState;
}

export function managedLedgerDigestUploadsSerializer(item: ManagedLedgerDigestUploads): any {
  return {
    properties: areAllPropsUndefined(item, ["digestStorageEndpoint"])
      ? undefined
      : _managedLedgerDigestUploadsPropertiesSerializer(item),
  };
}

export function managedLedgerDigestUploadsDeserializer(item: any): ManagedLedgerDigestUploads {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedLedgerDigestUploadsPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a database ledger digest upload settings. */
export interface ManagedLedgerDigestUploadsProperties {
  /** The digest storage endpoint, which must be either an Azure blob storage endpoint or an URI for Azure Confidential Ledger. */
  digestStorageEndpoint?: string;
  /** Specifies the state of ledger digest upload. */
  readonly state?: ManagedLedgerDigestUploadsState;
}

export function managedLedgerDigestUploadsPropertiesSerializer(
  item: ManagedLedgerDigestUploadsProperties,
): any {
  return { digestStorageEndpoint: item["digestStorageEndpoint"] };
}

export function managedLedgerDigestUploadsPropertiesDeserializer(
  item: any,
): ManagedLedgerDigestUploadsProperties {
  return {
    digestStorageEndpoint: item["digestStorageEndpoint"],
    state: item["state"],
  };
}

/** Specifies the state of ledger digest upload. */
export enum KnownManagedLedgerDigestUploadsState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Specifies the state of ledger digest upload. \
 * {@link KnownManagedLedgerDigestUploadsState} can be used interchangeably with ManagedLedgerDigestUploadsState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type ManagedLedgerDigestUploadsState = string;

/** Known values of {@link ManagedLedgerDigestUploadsName} that the service accepts. */
export enum KnownManagedLedgerDigestUploadsName {
  /** current */
  Current = "current",
}

/** Type of ManagedLedgerDigestUploadsName */
export type ManagedLedgerDigestUploadsName = string;

/** The response of a ManagedLedgerDigestUploads list operation. */
export interface _ManagedLedgerDigestUploadsListResult {
  /** The ManagedLedgerDigestUploads items on this page */
  value: ManagedLedgerDigestUploads[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedLedgerDigestUploadsListResultDeserializer(
  item: any,
): _ManagedLedgerDigestUploadsListResult {
  return {
    value: managedLedgerDigestUploadsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedLedgerDigestUploadsArraySerializer(
  result: Array<ManagedLedgerDigestUploads>,
): any[] {
  return result.map((item) => {
    return managedLedgerDigestUploadsSerializer(item);
  });
}

export function managedLedgerDigestUploadsArrayDeserializer(
  result: Array<ManagedLedgerDigestUploads>,
): any[] {
  return result.map((item) => {
    return managedLedgerDigestUploadsDeserializer(item);
  });
}

/** A server Advanced Threat Protection. */
export interface ServerAdvancedThreatProtection extends ProxyResource {
  /** Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server. */
  state?: AdvancedThreatProtectionState;
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
}

export function serverAdvancedThreatProtectionSerializer(
  item: ServerAdvancedThreatProtection,
): any {
  return {
    properties: areAllPropsUndefined(item, ["state"])
      ? undefined
      : _serverAdvancedThreatProtectionPropertiesSerializer(item),
  };
}

export function serverAdvancedThreatProtectionDeserializer(
  item: any,
): ServerAdvancedThreatProtection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverAdvancedThreatProtectionPropertiesDeserializer(item["properties"])),
  };
}

/** A list of the server's Advanced Threat Protection configurations. */
export interface _LogicalServerAdvancedThreatProtectionListResult {
  /** Array of results. */
  readonly value?: ServerAdvancedThreatProtection[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _logicalServerAdvancedThreatProtectionListResultDeserializer(
  item: any,
): _LogicalServerAdvancedThreatProtectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : serverAdvancedThreatProtectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverAdvancedThreatProtectionArraySerializer(
  result: Array<ServerAdvancedThreatProtection>,
): any[] {
  return result.map((item) => {
    return serverAdvancedThreatProtectionSerializer(item);
  });
}

export function serverAdvancedThreatProtectionArrayDeserializer(
  result: Array<ServerAdvancedThreatProtection>,
): any[] {
  return result.map((item) => {
    return serverAdvancedThreatProtectionDeserializer(item);
  });
}

/** Server-level Automatic Tuning. */
export interface ServerAutomaticTuning extends ProxyResource {
  /** Automatic tuning desired state. */
  desiredState?: AutomaticTuningServerMode;
  /** Automatic tuning actual state. */
  readonly actualState?: AutomaticTuningServerMode;
  /** Automatic tuning options definition. */
  options?: Record<string, AutomaticTuningServerOptions>;
}

export function serverAutomaticTuningSerializer(item: ServerAutomaticTuning): any {
  return {
    properties: areAllPropsUndefined(item, ["desiredState", "options"])
      ? undefined
      : _serverAutomaticTuningPropertiesSerializer(item),
  };
}

export function serverAutomaticTuningDeserializer(item: any): ServerAutomaticTuning {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverAutomaticTuningPropertiesDeserializer(item["properties"])),
  };
}

/** Server-level Automatic Tuning properties. */
export interface AutomaticTuningServerProperties {
  /** Automatic tuning desired state. */
  desiredState?: AutomaticTuningServerMode;
  /** Automatic tuning actual state. */
  readonly actualState?: AutomaticTuningServerMode;
  /** Automatic tuning options definition. */
  options?: Record<string, AutomaticTuningServerOptions>;
}

export function automaticTuningServerPropertiesSerializer(
  item: AutomaticTuningServerProperties,
): any {
  return {
    desiredState: item["desiredState"],
    options: !item["options"]
      ? item["options"]
      : automaticTuningServerOptionsRecordSerializer(item["options"]),
  };
}

export function automaticTuningServerPropertiesDeserializer(
  item: any,
): AutomaticTuningServerProperties {
  return {
    desiredState: item["desiredState"],
    actualState: item["actualState"],
    options: !item["options"]
      ? item["options"]
      : automaticTuningServerOptionsRecordDeserializer(item["options"]),
  };
}

/** Automatic tuning desired state. */
export type AutomaticTuningServerMode = "Custom" | "Auto" | "Unspecified";

export function automaticTuningServerOptionsRecordSerializer(
  item: Record<string, AutomaticTuningServerOptions>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : automaticTuningServerOptionsSerializer(item[key]);
  });
  return result;
}

export function automaticTuningServerOptionsRecordDeserializer(
  item: Record<string, any>,
): Record<string, AutomaticTuningServerOptions> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : automaticTuningServerOptionsDeserializer(item[key]);
  });
  return result;
}

/** Automatic tuning properties for individual advisors. */
export interface AutomaticTuningServerOptions {
  /** Automatic tuning option desired state. */
  desiredState?: AutomaticTuningOptionModeDesired;
  /** Automatic tuning option actual state. */
  readonly actualState?: AutomaticTuningOptionModeActual;
  /** Reason code if desired and actual state are different. */
  readonly reasonCode?: number;
  /** Reason description if desired and actual state are different. */
  readonly reasonDesc?: AutomaticTuningServerReason;
}

export function automaticTuningServerOptionsSerializer(item: AutomaticTuningServerOptions): any {
  return { desiredState: item["desiredState"] };
}

export function automaticTuningServerOptionsDeserializer(item: any): AutomaticTuningServerOptions {
  return {
    desiredState: item["desiredState"],
    actualState: item["actualState"],
    reasonCode: item["reasonCode"],
    reasonDesc: item["reasonDesc"],
  };
}

/** Reason description if desired and actual state are different. */
export type AutomaticTuningServerReason = "Default" | "Disabled" | "AutoConfigured";

/** A recoverable managed database resource. */
export interface SqlAgentConfiguration extends ProxyResource {
  /** The state of Sql Agent. */
  state?: SqlAgentConfigurationPropertiesState;
}

export function sqlAgentConfigurationSerializer(item: SqlAgentConfiguration): any {
  return {
    properties: areAllPropsUndefined(item, ["state"])
      ? undefined
      : _sqlAgentConfigurationPropertiesSerializer(item),
  };
}

export function sqlAgentConfigurationDeserializer(item: any): SqlAgentConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlAgentConfigurationPropertiesDeserializer(item["properties"])),
  };
}

/** Sql agent configuration properties. */
export interface SqlAgentConfigurationProperties {
  /** The state of Sql Agent. */
  state?: SqlAgentConfigurationPropertiesState;
}

export function sqlAgentConfigurationPropertiesSerializer(
  item: SqlAgentConfigurationProperties,
): any {
  return { state: item["state"] };
}

export function sqlAgentConfigurationPropertiesDeserializer(
  item: any,
): SqlAgentConfigurationProperties {
  return {
    state: item["state"],
  };
}

/** The state of Sql Agent. */
export enum KnownSqlAgentConfigurationPropertiesState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The state of Sql Agent. \
 * {@link KnownSqlAgentConfigurationPropertiesState} can be used interchangeably with SqlAgentConfigurationPropertiesState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type SqlAgentConfigurationPropertiesState = string;

/** A logical database transparent data encryption scan state. */
export interface LogicalDatabaseTransparentDataEncryption extends ProxyResource {
  /** Specifies the state of the transparent data encryption. */
  state?: TransparentDataEncryptionState;
  /** Specifies the encryption scan state of the transparent data encryption. */
  scanState?: TransparentDataEncryptionScanState;
}

export function logicalDatabaseTransparentDataEncryptionSerializer(
  item: LogicalDatabaseTransparentDataEncryption,
): any {
  return {
    properties: areAllPropsUndefined(item, ["state", "scanState"])
      ? undefined
      : _logicalDatabaseTransparentDataEncryptionPropertiesSerializer(item),
  };
}

export function logicalDatabaseTransparentDataEncryptionDeserializer(
  item: any,
): LogicalDatabaseTransparentDataEncryption {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemdataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _logicalDatabaseTransparentDataEncryptionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a transparent data encryption scan. */
export interface TransparentDataEncryptionProperties {
  /** Specifies the state of the transparent data encryption. */
  state: TransparentDataEncryptionState;
  /** Specifies the encryption scan state of the transparent data encryption. */
  scanState?: TransparentDataEncryptionScanState;
}

export function transparentDataEncryptionPropertiesSerializer(
  item: TransparentDataEncryptionProperties,
): any {
  return { state: item["state"], scanState: item["scanState"] };
}

export function transparentDataEncryptionPropertiesDeserializer(
  item: any,
): TransparentDataEncryptionProperties {
  return {
    state: item["state"],
    scanState: item["scanState"],
  };
}

/** Specifies the encryption scan state of the transparent data encryption. */
export enum KnownTransparentDataEncryptionScanState {
  /** None */
  None = "None",
  /** Resume */
  Resume = "Resume",
  /** Running */
  Running = "Running",
  /** Suspend */
  Suspend = "Suspend",
  /** Aborted */
  Aborted = "Aborted",
  /** Completed */
  Completed = "Completed",
}

/**
 * Specifies the encryption scan state of the transparent data encryption. \
 * {@link KnownTransparentDataEncryptionScanState} can be used interchangeably with TransparentDataEncryptionScanState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Resume**: Resume \
 * **Running**: Running \
 * **Suspend**: Suspend \
 * **Aborted**: Aborted \
 * **Completed**: Completed
 */
export type TransparentDataEncryptionScanState = string;

/** The response of a LogicalDatabaseTransparentDataEncryption list operation. */
export interface _LogicalDatabaseTransparentDataEncryptionListResult {
  /** The LogicalDatabaseTransparentDataEncryption items on this page */
  value: LogicalDatabaseTransparentDataEncryption[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _logicalDatabaseTransparentDataEncryptionListResultDeserializer(
  item: any,
): _LogicalDatabaseTransparentDataEncryptionListResult {
  return {
    value: logicalDatabaseTransparentDataEncryptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function logicalDatabaseTransparentDataEncryptionArraySerializer(
  result: Array<LogicalDatabaseTransparentDataEncryption>,
): any[] {
  return result.map((item) => {
    return logicalDatabaseTransparentDataEncryptionSerializer(item);
  });
}

export function logicalDatabaseTransparentDataEncryptionArrayDeserializer(
  result: Array<LogicalDatabaseTransparentDataEncryption>,
): any[] {
  return result.map((item) => {
    return logicalDatabaseTransparentDataEncryptionDeserializer(item);
  });
}

/** The location capability. */
export interface LocationCapabilities {
  /** The location name. */
  readonly name?: string;
  /** The list of supported server versions. */
  readonly supportedServerVersions?: ServerVersionCapability[];
  /** The list of supported managed instance versions. */
  readonly supportedManagedInstanceVersions?: ManagedInstanceVersionCapability[];
  /** The list of supported job agent versions. */
  readonly supportedJobAgentVersions?: JobAgentVersionCapability[];
  /** Whether or not the subscription is allowed to provision zone resilient resources. */
  readonly isZoneResilientProvisioningAllowed?: boolean;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function locationCapabilitiesDeserializer(item: any): LocationCapabilities {
  return {
    name: item["name"],
    supportedServerVersions: !item["supportedServerVersions"]
      ? item["supportedServerVersions"]
      : serverVersionCapabilityArrayDeserializer(item["supportedServerVersions"]),
    supportedManagedInstanceVersions: !item["supportedManagedInstanceVersions"]
      ? item["supportedManagedInstanceVersions"]
      : managedInstanceVersionCapabilityArrayDeserializer(item["supportedManagedInstanceVersions"]),
    supportedJobAgentVersions: !item["supportedJobAgentVersions"]
      ? item["supportedJobAgentVersions"]
      : jobAgentVersionCapabilityArrayDeserializer(item["supportedJobAgentVersions"]),
    isZoneResilientProvisioningAllowed: item["isZoneResilientProvisioningAllowed"],
    status: item["status"],
    reason: item["reason"],
  };
}

export function serverVersionCapabilityArrayDeserializer(
  result: Array<ServerVersionCapability>,
): any[] {
  return result.map((item) => {
    return serverVersionCapabilityDeserializer(item);
  });
}

/** The server capability */
export interface ServerVersionCapability {
  /** The server version name. */
  readonly name?: string;
  /** The list of supported database editions. */
  readonly supportedEditions?: EditionCapability[];
  /** The list of supported elastic pool editions. */
  readonly supportedElasticPoolEditions?: ElasticPoolEditionCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function serverVersionCapabilityDeserializer(item: any): ServerVersionCapability {
  return {
    name: item["name"],
    supportedEditions: !item["supportedEditions"]
      ? item["supportedEditions"]
      : editionCapabilityArrayDeserializer(item["supportedEditions"]),
    supportedElasticPoolEditions: !item["supportedElasticPoolEditions"]
      ? item["supportedElasticPoolEditions"]
      : elasticPoolEditionCapabilityArrayDeserializer(item["supportedElasticPoolEditions"]),
    status: item["status"],
    reason: item["reason"],
  };
}

export function editionCapabilityArrayDeserializer(result: Array<EditionCapability>): any[] {
  return result.map((item) => {
    return editionCapabilityDeserializer(item);
  });
}

/** The edition capability. */
export interface EditionCapability {
  /** The database edition name. */
  readonly name?: string;
  /** The list of supported service objectives for the edition. */
  readonly supportedServiceLevelObjectives?: ServiceObjectiveCapability[];
  /** Whether or not zone redundancy is supported for the edition. */
  readonly zoneRedundant?: boolean;
  /** The read scale capability for the edition. */
  readonly readScale?: ReadScaleCapability;
  /** The list of supported storage capabilities for this edition */
  readonly supportedStorageCapabilities?: StorageCapability[];
  /** Whether or not zone pinning is supported for the edition. */
  readonly zonePinning?: boolean;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function editionCapabilityDeserializer(item: any): EditionCapability {
  return {
    name: item["name"],
    supportedServiceLevelObjectives: !item["supportedServiceLevelObjectives"]
      ? item["supportedServiceLevelObjectives"]
      : serviceObjectiveCapabilityArrayDeserializer(item["supportedServiceLevelObjectives"]),
    zoneRedundant: item["zoneRedundant"],
    readScale: !item["readScale"]
      ? item["readScale"]
      : readScaleCapabilityDeserializer(item["readScale"]),
    supportedStorageCapabilities: !item["supportedStorageCapabilities"]
      ? item["supportedStorageCapabilities"]
      : storageCapabilityArrayDeserializer(item["supportedStorageCapabilities"]),
    zonePinning: item["zonePinning"],
    status: item["status"],
    reason: item["reason"],
  };
}

export function serviceObjectiveCapabilityArrayDeserializer(
  result: Array<ServiceObjectiveCapability>,
): any[] {
  return result.map((item) => {
    return serviceObjectiveCapabilityDeserializer(item);
  });
}

/** The service objectives capability. */
export interface ServiceObjectiveCapability {
  /** The unique ID of the service objective. */
  readonly id?: string;
  /** The service objective name. */
  readonly name?: string;
  /** The list of supported maximum database sizes. */
  readonly supportedMaxSizes?: MaxSizeRangeCapability[];
  /** The performance level. */
  readonly performanceLevel?: PerformanceLevelCapability;
  /** The sku. */
  readonly sku?: Sku;
  /** List of supported license types. */
  readonly supportedLicenseTypes?: LicenseTypeCapability[];
  /** The included (free) max size. */
  readonly includedMaxSize?: MaxSizeCapability;
  /** Whether or not zone redundancy is supported for the service objective. */
  readonly zoneRedundant?: boolean;
  /** Supported time range for auto pause delay */
  readonly supportedAutoPauseDelay?: AutoPauseDelayTimeRange;
  /** List of supported min capacities */
  readonly supportedMinCapacities?: MinCapacityCapability[];
  /** The compute model */
  readonly computeModel?: string;
  /** List of supported maintenance configurations */
  readonly supportedMaintenanceConfigurations?: MaintenanceConfigurationCapability[];
  /** Whether or not zone pinning is supported. */
  readonly zonePinning?: boolean;
  /** List of supported availability zones */
  readonly supportedZones?: ZonePinningCapability[];
  /** List of supported free limit exhaustion behaviors */
  readonly supportedFreeLimitExhaustionBehaviors?: FreeLimitExhaustionBehaviorCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function serviceObjectiveCapabilityDeserializer(item: any): ServiceObjectiveCapability {
  return {
    id: item["id"],
    name: item["name"],
    supportedMaxSizes: !item["supportedMaxSizes"]
      ? item["supportedMaxSizes"]
      : maxSizeRangeCapabilityArrayDeserializer(item["supportedMaxSizes"]),
    performanceLevel: !item["performanceLevel"]
      ? item["performanceLevel"]
      : performanceLevelCapabilityDeserializer(item["performanceLevel"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    supportedLicenseTypes: !item["supportedLicenseTypes"]
      ? item["supportedLicenseTypes"]
      : licenseTypeCapabilityArrayDeserializer(item["supportedLicenseTypes"]),
    includedMaxSize: !item["includedMaxSize"]
      ? item["includedMaxSize"]
      : maxSizeCapabilityDeserializer(item["includedMaxSize"]),
    zoneRedundant: item["zoneRedundant"],
    supportedAutoPauseDelay: !item["supportedAutoPauseDelay"]
      ? item["supportedAutoPauseDelay"]
      : autoPauseDelayTimeRangeDeserializer(item["supportedAutoPauseDelay"]),
    supportedMinCapacities: !item["supportedMinCapacities"]
      ? item["supportedMinCapacities"]
      : minCapacityCapabilityArrayDeserializer(item["supportedMinCapacities"]),
    computeModel: item["computeModel"],
    supportedMaintenanceConfigurations: !item["supportedMaintenanceConfigurations"]
      ? item["supportedMaintenanceConfigurations"]
      : maintenanceConfigurationCapabilityArrayDeserializer(
          item["supportedMaintenanceConfigurations"],
        ),
    zonePinning: item["zonePinning"],
    supportedZones: !item["supportedZones"]
      ? item["supportedZones"]
      : zonePinningCapabilityArrayDeserializer(item["supportedZones"]),
    supportedFreeLimitExhaustionBehaviors: !item["supportedFreeLimitExhaustionBehaviors"]
      ? item["supportedFreeLimitExhaustionBehaviors"]
      : freeLimitExhaustionBehaviorCapabilityArrayDeserializer(
          item["supportedFreeLimitExhaustionBehaviors"],
        ),
    status: item["status"],
    reason: item["reason"],
  };
}

export function maxSizeRangeCapabilityArrayDeserializer(
  result: Array<MaxSizeRangeCapability>,
): any[] {
  return result.map((item) => {
    return maxSizeRangeCapabilityDeserializer(item);
  });
}

/** The maximum size range capability. */
export interface MaxSizeRangeCapability {
  /** Minimum value. */
  readonly minValue?: MaxSizeCapability;
  /** Maximum value. */
  readonly maxValue?: MaxSizeCapability;
  /** Scale/step size for discrete values between the minimum value and the maximum value. */
  readonly scaleSize?: MaxSizeCapability;
  /** Size of transaction log. */
  readonly logSize?: LogSizeCapability;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function maxSizeRangeCapabilityDeserializer(item: any): MaxSizeRangeCapability {
  return {
    minValue: !item["minValue"]
      ? item["minValue"]
      : maxSizeCapabilityDeserializer(item["minValue"]),
    maxValue: !item["maxValue"]
      ? item["maxValue"]
      : maxSizeCapabilityDeserializer(item["maxValue"]),
    scaleSize: !item["scaleSize"]
      ? item["scaleSize"]
      : maxSizeCapabilityDeserializer(item["scaleSize"]),
    logSize: !item["logSize"] ? item["logSize"] : logSizeCapabilityDeserializer(item["logSize"]),
    status: item["status"],
    reason: item["reason"],
  };
}

/** The maximum size capability. */
export interface MaxSizeCapability {
  /** The maximum size limit (see 'unit' for the units). */
  readonly limit?: number;
  /** The units that the limit is expressed in. */
  readonly unit?: MaxSizeUnit;
}

export function maxSizeCapabilityDeserializer(item: any): MaxSizeCapability {
  return {
    limit: item["limit"],
    unit: item["unit"],
  };
}

/** The units that the limit is expressed in. */
export enum KnownMaxSizeUnit {
  /** Megabytes */
  Megabytes = "Megabytes",
  /** Gigabytes */
  Gigabytes = "Gigabytes",
  /** Terabytes */
  Terabytes = "Terabytes",
  /** Petabytes */
  Petabytes = "Petabytes",
}

/**
 * The units that the limit is expressed in. \
 * {@link KnownMaxSizeUnit} can be used interchangeably with MaxSizeUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Megabytes**: Megabytes \
 * **Gigabytes**: Gigabytes \
 * **Terabytes**: Terabytes \
 * **Petabytes**: Petabytes
 */
export type MaxSizeUnit = string;

/** The log size capability. */
export interface LogSizeCapability {
  /** The log size limit (see 'unit' for the units). */
  readonly limit?: number;
  /** The units that the limit is expressed in. */
  readonly unit?: LogSizeUnit;
}

export function logSizeCapabilityDeserializer(item: any): LogSizeCapability {
  return {
    limit: item["limit"],
    unit: item["unit"],
  };
}

/** The units that the limit is expressed in. */
export enum KnownLogSizeUnit {
  /** Megabytes */
  Megabytes = "Megabytes",
  /** Gigabytes */
  Gigabytes = "Gigabytes",
  /** Terabytes */
  Terabytes = "Terabytes",
  /** Petabytes */
  Petabytes = "Petabytes",
  /** Percent */
  Percent = "Percent",
}

/**
 * The units that the limit is expressed in. \
 * {@link KnownLogSizeUnit} can be used interchangeably with LogSizeUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Megabytes**: Megabytes \
 * **Gigabytes**: Gigabytes \
 * **Terabytes**: Terabytes \
 * **Petabytes**: Petabytes \
 * **Percent**: Percent
 */
export type LogSizeUnit = string;
/** The status of the capability. */
export type CapabilityStatus = "Visible" | "Available" | "Default" | "Disabled";

/** The performance level capability. */
export interface PerformanceLevelCapability {
  /** Performance level value. */
  readonly value?: number;
  /** Unit type used to measure performance level. */
  readonly unit?: PerformanceLevelUnit;
}

export function performanceLevelCapabilityDeserializer(item: any): PerformanceLevelCapability {
  return {
    value: item["value"],
    unit: item["unit"],
  };
}

/** Unit type used to measure performance level. */
export enum KnownPerformanceLevelUnit {
  /** DTU */
  DTU = "DTU",
  /** VCores */
  VCores = "VCores",
}

/**
 * Unit type used to measure performance level. \
 * {@link KnownPerformanceLevelUnit} can be used interchangeably with PerformanceLevelUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DTU**: DTU \
 * **VCores**: VCores
 */
export type PerformanceLevelUnit = string;

export function licenseTypeCapabilityArrayDeserializer(
  result: Array<LicenseTypeCapability>,
): any[] {
  return result.map((item) => {
    return licenseTypeCapabilityDeserializer(item);
  });
}

/** The license type capability */
export interface LicenseTypeCapability {
  /** License type identifier. */
  readonly name?: string;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function licenseTypeCapabilityDeserializer(item: any): LicenseTypeCapability {
  return {
    name: item["name"],
    status: item["status"],
    reason: item["reason"],
  };
}

/** Supported auto pause delay time range */
export interface AutoPauseDelayTimeRange {
  /** Minimum value */
  readonly minValue?: number;
  /** Maximum value */
  readonly maxValue?: number;
  /** Step value for discrete values between the minimum value and the maximum value. */
  readonly stepSize?: number;
  /** Default value is no value is provided */
  readonly default?: number;
  /** Unit of time that delay is expressed in */
  readonly unit?: PauseDelayTimeUnit;
  /** Value that is used to not pause (infinite delay before pause) */
  readonly doNotPauseValue?: number;
}

export function autoPauseDelayTimeRangeDeserializer(item: any): AutoPauseDelayTimeRange {
  return {
    minValue: item["minValue"],
    maxValue: item["maxValue"],
    stepSize: item["stepSize"],
    default: item["default"],
    unit: item["unit"],
    doNotPauseValue: item["doNotPauseValue"],
  };
}

/** Unit of time that delay is expressed in */
export enum KnownPauseDelayTimeUnit {
  /** Minutes */
  Minutes = "Minutes",
}

/**
 * Unit of time that delay is expressed in \
 * {@link KnownPauseDelayTimeUnit} can be used interchangeably with PauseDelayTimeUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Minutes**: Minutes
 */
export type PauseDelayTimeUnit = string;

export function minCapacityCapabilityArrayDeserializer(
  result: Array<MinCapacityCapability>,
): any[] {
  return result.map((item) => {
    return minCapacityCapabilityDeserializer(item);
  });
}

/** The min capacity capability */
export interface MinCapacityCapability {
  /** Min capacity value */
  readonly value?: number;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function minCapacityCapabilityDeserializer(item: any): MinCapacityCapability {
  return {
    value: item["value"],
    status: item["status"],
    reason: item["reason"],
  };
}

export function maintenanceConfigurationCapabilityArrayDeserializer(
  result: Array<MaintenanceConfigurationCapability>,
): any[] {
  return result.map((item) => {
    return maintenanceConfigurationCapabilityDeserializer(item);
  });
}

/** The maintenance configuration capability */
export interface MaintenanceConfigurationCapability {
  /** Maintenance configuration name */
  readonly name?: string;
  /** Whether or not zone redundancy is supported for the maintenance configuration. */
  readonly zoneRedundant?: boolean;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function maintenanceConfigurationCapabilityDeserializer(
  item: any,
): MaintenanceConfigurationCapability {
  return {
    name: item["name"],
    zoneRedundant: item["zoneRedundant"],
    status: item["status"],
    reason: item["reason"],
  };
}

export function zonePinningCapabilityArrayDeserializer(
  result: Array<ZonePinningCapability>,
): any[] {
  return result.map((item) => {
    return zonePinningCapabilityDeserializer(item);
  });
}

/** The zone pinning capability */
export interface ZonePinningCapability {
  /** Name of the availability zone */
  readonly availabilityZone?: string;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function zonePinningCapabilityDeserializer(item: any): ZonePinningCapability {
  return {
    availabilityZone: item["availabilityZone"],
    status: item["status"],
    reason: item["reason"],
  };
}

export function freeLimitExhaustionBehaviorCapabilityArrayDeserializer(
  result: Array<FreeLimitExhaustionBehaviorCapability>,
): any[] {
  return result.map((item) => {
    return freeLimitExhaustionBehaviorCapabilityDeserializer(item);
  });
}

/** Supported free limit exhaustion behavior options */
export interface FreeLimitExhaustionBehaviorCapability {
  /** Free limit exhaustion behavior type */
  readonly exhaustionBehaviorType?: FreeLimitExhaustionBehavior;
  /** Free limit exhaustion behavior status */
  readonly status?: CapabilityStatus;
}

export function freeLimitExhaustionBehaviorCapabilityDeserializer(
  item: any,
): FreeLimitExhaustionBehaviorCapability {
  return {
    exhaustionBehaviorType: item["exhaustionBehaviorType"],
    status: item["status"],
  };
}

/** The read scale capability. */
export interface ReadScaleCapability {
  /** The maximum number of read scale replicas. */
  readonly maxNumberOfReplicas?: number;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function readScaleCapabilityDeserializer(item: any): ReadScaleCapability {
  return {
    maxNumberOfReplicas: item["maxNumberOfReplicas"],
    status: item["status"],
    reason: item["reason"],
  };
}

export function storageCapabilityArrayDeserializer(result: Array<StorageCapability>): any[] {
  return result.map((item) => {
    return storageCapabilityDeserializer(item);
  });
}

/** The storage account type capability. */
export interface StorageCapability {
  /** The storage account type for the database's backups. */
  readonly storageAccountType?: StorageCapabilityStorageAccountType;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function storageCapabilityDeserializer(item: any): StorageCapability {
  return {
    storageAccountType: item["storageAccountType"],
    status: item["status"],
    reason: item["reason"],
  };
}

/** The storage account type for the database's backups. */
export enum KnownStorageCapabilityStorageAccountType {
  /** GRS */
  GRS = "GRS",
  /** LRS */
  LRS = "LRS",
  /** ZRS */
  ZRS = "ZRS",
  /** GZRS */
  Gzrs = "GZRS",
}

/**
 * The storage account type for the database's backups. \
 * {@link KnownStorageCapabilityStorageAccountType} can be used interchangeably with StorageCapabilityStorageAccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GRS**: GRS \
 * **LRS**: LRS \
 * **ZRS**: ZRS \
 * **GZRS**: GZRS
 */
export type StorageCapabilityStorageAccountType = string;

export function elasticPoolEditionCapabilityArrayDeserializer(
  result: Array<ElasticPoolEditionCapability>,
): any[] {
  return result.map((item) => {
    return elasticPoolEditionCapabilityDeserializer(item);
  });
}

/** The elastic pool edition capability. */
export interface ElasticPoolEditionCapability {
  /** The elastic pool edition name. */
  readonly name?: string;
  /** The list of supported elastic pool DTU levels for the edition. */
  readonly supportedElasticPoolPerformanceLevels?: ElasticPoolPerformanceLevelCapability[];
  /** Whether or not zone redundancy is supported for the edition. */
  readonly zoneRedundant?: boolean;
  /** Whether or not zone pinning is supported for the edition. */
  readonly zonePinning?: boolean;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function elasticPoolEditionCapabilityDeserializer(item: any): ElasticPoolEditionCapability {
  return {
    name: item["name"],
    supportedElasticPoolPerformanceLevels: !item["supportedElasticPoolPerformanceLevels"]
      ? item["supportedElasticPoolPerformanceLevels"]
      : elasticPoolPerformanceLevelCapabilityArrayDeserializer(
          item["supportedElasticPoolPerformanceLevels"],
        ),
    zoneRedundant: item["zoneRedundant"],
    zonePinning: item["zonePinning"],
    status: item["status"],
    reason: item["reason"],
  };
}

export function elasticPoolPerformanceLevelCapabilityArrayDeserializer(
  result: Array<ElasticPoolPerformanceLevelCapability>,
): any[] {
  return result.map((item) => {
    return elasticPoolPerformanceLevelCapabilityDeserializer(item);
  });
}

/** The Elastic Pool performance level capability. */
export interface ElasticPoolPerformanceLevelCapability {
  /** The performance level for the pool. */
  readonly performanceLevel?: PerformanceLevelCapability;
  /** The sku. */
  readonly sku?: Sku;
  /** List of supported license types. */
  readonly supportedLicenseTypes?: LicenseTypeCapability[];
  /** The maximum number of databases supported. */
  readonly maxDatabaseCount?: number;
  /** The included (free) max size for this performance level. */
  readonly includedMaxSize?: MaxSizeCapability;
  /** The list of supported max sizes. */
  readonly supportedMaxSizes?: MaxSizeRangeCapability[];
  /** The list of supported per database max sizes. */
  readonly supportedPerDatabaseMaxSizes?: MaxSizeRangeCapability[];
  /** The list of supported per database max performance levels. */
  readonly supportedPerDatabaseMaxPerformanceLevels?: ElasticPoolPerDatabaseMaxPerformanceLevelCapability[];
  /** Whether or not zone redundancy is supported for the performance level. */
  readonly zoneRedundant?: boolean;
  /** List of supported maintenance configurations */
  readonly supportedMaintenanceConfigurations?: MaintenanceConfigurationCapability[];
  /** List of supported min capacities */
  readonly supportedMinCapacities?: MinCapacityCapability[];
  /** Supported time range for auto pause delay */
  readonly supportedAutoPauseDelay?: AutoPauseDelayTimeRange;
  /** Supported time range for per database auto pause delay */
  readonly supportedPerDatabaseAutoPauseDelay?: PerDatabaseAutoPauseDelayTimeRange;
  /** List of supported availability zones */
  readonly supportedZones?: ZonePinningCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function elasticPoolPerformanceLevelCapabilityDeserializer(
  item: any,
): ElasticPoolPerformanceLevelCapability {
  return {
    performanceLevel: !item["performanceLevel"]
      ? item["performanceLevel"]
      : performanceLevelCapabilityDeserializer(item["performanceLevel"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    supportedLicenseTypes: !item["supportedLicenseTypes"]
      ? item["supportedLicenseTypes"]
      : licenseTypeCapabilityArrayDeserializer(item["supportedLicenseTypes"]),
    maxDatabaseCount: item["maxDatabaseCount"],
    includedMaxSize: !item["includedMaxSize"]
      ? item["includedMaxSize"]
      : maxSizeCapabilityDeserializer(item["includedMaxSize"]),
    supportedMaxSizes: !item["supportedMaxSizes"]
      ? item["supportedMaxSizes"]
      : maxSizeRangeCapabilityArrayDeserializer(item["supportedMaxSizes"]),
    supportedPerDatabaseMaxSizes: !item["supportedPerDatabaseMaxSizes"]
      ? item["supportedPerDatabaseMaxSizes"]
      : maxSizeRangeCapabilityArrayDeserializer(item["supportedPerDatabaseMaxSizes"]),
    supportedPerDatabaseMaxPerformanceLevels: !item["supportedPerDatabaseMaxPerformanceLevels"]
      ? item["supportedPerDatabaseMaxPerformanceLevels"]
      : elasticPoolPerDatabaseMaxPerformanceLevelCapabilityArrayDeserializer(
          item["supportedPerDatabaseMaxPerformanceLevels"],
        ),
    zoneRedundant: item["zoneRedundant"],
    supportedMaintenanceConfigurations: !item["supportedMaintenanceConfigurations"]
      ? item["supportedMaintenanceConfigurations"]
      : maintenanceConfigurationCapabilityArrayDeserializer(
          item["supportedMaintenanceConfigurations"],
        ),
    supportedMinCapacities: !item["supportedMinCapacities"]
      ? item["supportedMinCapacities"]
      : minCapacityCapabilityArrayDeserializer(item["supportedMinCapacities"]),
    supportedAutoPauseDelay: !item["supportedAutoPauseDelay"]
      ? item["supportedAutoPauseDelay"]
      : autoPauseDelayTimeRangeDeserializer(item["supportedAutoPauseDelay"]),
    supportedPerDatabaseAutoPauseDelay: !item["supportedPerDatabaseAutoPauseDelay"]
      ? item["supportedPerDatabaseAutoPauseDelay"]
      : perDatabaseAutoPauseDelayTimeRangeDeserializer(item["supportedPerDatabaseAutoPauseDelay"]),
    supportedZones: !item["supportedZones"]
      ? item["supportedZones"]
      : zonePinningCapabilityArrayDeserializer(item["supportedZones"]),
    status: item["status"],
    reason: item["reason"],
  };
}

export function elasticPoolPerDatabaseMaxPerformanceLevelCapabilityArrayDeserializer(
  result: Array<ElasticPoolPerDatabaseMaxPerformanceLevelCapability>,
): any[] {
  return result.map((item) => {
    return elasticPoolPerDatabaseMaxPerformanceLevelCapabilityDeserializer(item);
  });
}

/** The max per-database performance level capability. */
export interface ElasticPoolPerDatabaseMaxPerformanceLevelCapability {
  /** The maximum performance level per database. */
  readonly limit?: number;
  /** Unit type used to measure performance level. */
  readonly unit?: PerformanceLevelUnit;
  /** The list of supported min database performance levels. */
  readonly supportedPerDatabaseMinPerformanceLevels?: ElasticPoolPerDatabaseMinPerformanceLevelCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function elasticPoolPerDatabaseMaxPerformanceLevelCapabilityDeserializer(
  item: any,
): ElasticPoolPerDatabaseMaxPerformanceLevelCapability {
  return {
    limit: item["limit"],
    unit: item["unit"],
    supportedPerDatabaseMinPerformanceLevels: !item["supportedPerDatabaseMinPerformanceLevels"]
      ? item["supportedPerDatabaseMinPerformanceLevels"]
      : elasticPoolPerDatabaseMinPerformanceLevelCapabilityArrayDeserializer(
          item["supportedPerDatabaseMinPerformanceLevels"],
        ),
    status: item["status"],
    reason: item["reason"],
  };
}

export function elasticPoolPerDatabaseMinPerformanceLevelCapabilityArrayDeserializer(
  result: Array<ElasticPoolPerDatabaseMinPerformanceLevelCapability>,
): any[] {
  return result.map((item) => {
    return elasticPoolPerDatabaseMinPerformanceLevelCapabilityDeserializer(item);
  });
}

/** The minimum per-database performance level capability. */
export interface ElasticPoolPerDatabaseMinPerformanceLevelCapability {
  /** The minimum performance level per database. */
  readonly limit?: number;
  /** Unit type used to measure performance level. */
  readonly unit?: PerformanceLevelUnit;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function elasticPoolPerDatabaseMinPerformanceLevelCapabilityDeserializer(
  item: any,
): ElasticPoolPerDatabaseMinPerformanceLevelCapability {
  return {
    limit: item["limit"],
    unit: item["unit"],
    status: item["status"],
    reason: item["reason"],
  };
}

/** Supported auto pause delay time range */
export interface PerDatabaseAutoPauseDelayTimeRange {
  /** Minimum value */
  readonly minValue?: number;
  /** Maximum value */
  readonly maxValue?: number;
  /** Step value for discrete values between the minimum value and the maximum value. */
  readonly stepSize?: number;
  /** Default value if no value is provided */
  readonly default?: number;
  /** Unit of time that delay is expressed in */
  readonly unit?: PauseDelayTimeUnit;
  /** Value that is used to not pause (infinite delay before pause) */
  readonly doNotPauseValue?: number;
}

export function perDatabaseAutoPauseDelayTimeRangeDeserializer(
  item: any,
): PerDatabaseAutoPauseDelayTimeRange {
  return {
    minValue: item["minValue"],
    maxValue: item["maxValue"],
    stepSize: item["stepSize"],
    default: item["default"],
    unit: item["unit"],
    doNotPauseValue: item["doNotPauseValue"],
  };
}

export function managedInstanceVersionCapabilityArrayDeserializer(
  result: Array<ManagedInstanceVersionCapability>,
): any[] {
  return result.map((item) => {
    return managedInstanceVersionCapabilityDeserializer(item);
  });
}

/** The managed instance capability */
export interface ManagedInstanceVersionCapability {
  /** The server version name. */
  readonly name?: string;
  /** The list of supported managed instance editions. */
  readonly supportedEditions?: ManagedInstanceEditionCapability[];
  /** The list of supported instance pool editions. */
  readonly supportedInstancePoolEditions?: InstancePoolEditionCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function managedInstanceVersionCapabilityDeserializer(
  item: any,
): ManagedInstanceVersionCapability {
  return {
    name: item["name"],
    supportedEditions: !item["supportedEditions"]
      ? item["supportedEditions"]
      : managedInstanceEditionCapabilityArrayDeserializer(item["supportedEditions"]),
    supportedInstancePoolEditions: !item["supportedInstancePoolEditions"]
      ? item["supportedInstancePoolEditions"]
      : instancePoolEditionCapabilityArrayDeserializer(item["supportedInstancePoolEditions"]),
    status: item["status"],
    reason: item["reason"],
  };
}

export function managedInstanceEditionCapabilityArrayDeserializer(
  result: Array<ManagedInstanceEditionCapability>,
): any[] {
  return result.map((item) => {
    return managedInstanceEditionCapabilityDeserializer(item);
  });
}

/** The managed server capability */
export interface ManagedInstanceEditionCapability {
  /** The managed server version name. */
  readonly name?: string;
  /** Whether or not this is a GPv2 variant of General Purpose edition. */
  readonly isGeneralPurposeV2?: boolean;
  /** The supported families. */
  readonly supportedFamilies?: ManagedInstanceFamilyCapability[];
  /** The list of supported storage capabilities for this edition */
  readonly supportedStorageCapabilities?: StorageCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function managedInstanceEditionCapabilityDeserializer(
  item: any,
): ManagedInstanceEditionCapability {
  return {
    name: item["name"],
    isGeneralPurposeV2: item["isGeneralPurposeV2"],
    supportedFamilies: !item["supportedFamilies"]
      ? item["supportedFamilies"]
      : managedInstanceFamilyCapabilityArrayDeserializer(item["supportedFamilies"]),
    supportedStorageCapabilities: !item["supportedStorageCapabilities"]
      ? item["supportedStorageCapabilities"]
      : storageCapabilityArrayDeserializer(item["supportedStorageCapabilities"]),
    status: item["status"],
    reason: item["reason"],
  };
}

export function managedInstanceFamilyCapabilityArrayDeserializer(
  result: Array<ManagedInstanceFamilyCapability>,
): any[] {
  return result.map((item) => {
    return managedInstanceFamilyCapabilityDeserializer(item);
  });
}

/** The managed server family capability. */
export interface ManagedInstanceFamilyCapability {
  /** Family name. */
  readonly name?: string;
  /** SKU name. */
  readonly sku?: string;
  /** Whether or not zone redundancy is supported for the family. */
  readonly zoneRedundant?: boolean;
  /** List of supported license types. */
  readonly supportedLicenseTypes?: LicenseTypeCapability[];
  /** List of supported virtual cores values. */
  readonly supportedVcoresValues?: ManagedInstanceVcoresCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function managedInstanceFamilyCapabilityDeserializer(
  item: any,
): ManagedInstanceFamilyCapability {
  return {
    name: item["name"],
    sku: item["sku"],
    zoneRedundant: item["zoneRedundant"],
    supportedLicenseTypes: !item["supportedLicenseTypes"]
      ? item["supportedLicenseTypes"]
      : licenseTypeCapabilityArrayDeserializer(item["supportedLicenseTypes"]),
    supportedVcoresValues: !item["supportedVcoresValues"]
      ? item["supportedVcoresValues"]
      : managedInstanceVcoresCapabilityArrayDeserializer(item["supportedVcoresValues"]),
    status: item["status"],
    reason: item["reason"],
  };
}

export function managedInstanceVcoresCapabilityArrayDeserializer(
  result: Array<ManagedInstanceVcoresCapability>,
): any[] {
  return result.map((item) => {
    return managedInstanceVcoresCapabilityDeserializer(item);
  });
}

/** The managed instance virtual cores capability. */
export interface ManagedInstanceVcoresCapability {
  /** The virtual cores identifier. */
  readonly name?: string;
  /** The virtual cores value. */
  readonly value?: number;
  /** Supported memory sizes in GB. */
  readonly supportedMemorySizesInGB?: MaxLimitRangeCapability;
  /** Memory limit MB ranges. */
  readonly supportedMemoryLimitsMB?: MaxLimitRangeCapability;
  /** Included size. */
  readonly includedMaxSize?: MaxSizeCapability;
  /** Storage size ranges. */
  readonly supportedStorageSizes?: MaxSizeRangeCapability[];
  /** Included storage IOps. */
  readonly includedStorageIOps?: number;
  /** Storage IOps ranges. */
  readonly supportedStorageIOps?: MaxLimitRangeCapability;
  /** Min IOps override factor per selected storage GB. */
  readonly iopsMinValueOverrideFactorPerSelectedStorageGB?: number;
  /** Included IOps override factor per selected storage GB. */
  readonly iopsIncludedValueOverrideFactorPerSelectedStorageGB?: number;
  /** Included storage throughput MBps. */
  readonly includedStorageThroughputMBps?: number;
  /** Storage throughput MBps ranges. */
  readonly supportedStorageThroughputMBps?: MaxLimitRangeCapability;
  /** Min throughput MBps override factor per selected storage GB. */
  readonly throughputMBpsMinValueOverrideFactorPerSelectedStorageGB?: number;
  /** Included throughput MBps override factor per selected storage GB. */
  readonly throughputMBpsIncludedValueOverrideFactorPerSelectedStorageGB?: number;
  /** True if this service objective is supported for managed instances in an instance pool. */
  readonly instancePoolSupported?: boolean;
  /** True if this service objective is supported for standalone managed instances. */
  readonly standaloneSupported?: boolean;
  /** List of supported maintenance configurations */
  readonly supportedMaintenanceConfigurations?: ManagedInstanceMaintenanceConfigurationCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function managedInstanceVcoresCapabilityDeserializer(
  item: any,
): ManagedInstanceVcoresCapability {
  return {
    name: item["name"],
    value: item["value"],
    supportedMemorySizesInGB: !item["supportedMemorySizesInGB"]
      ? item["supportedMemorySizesInGB"]
      : maxLimitRangeCapabilityDeserializer(item["supportedMemorySizesInGB"]),
    supportedMemoryLimitsMB: !item["supportedMemoryLimitsMB"]
      ? item["supportedMemoryLimitsMB"]
      : maxLimitRangeCapabilityDeserializer(item["supportedMemoryLimitsMB"]),
    includedMaxSize: !item["includedMaxSize"]
      ? item["includedMaxSize"]
      : maxSizeCapabilityDeserializer(item["includedMaxSize"]),
    supportedStorageSizes: !item["supportedStorageSizes"]
      ? item["supportedStorageSizes"]
      : maxSizeRangeCapabilityArrayDeserializer(item["supportedStorageSizes"]),
    includedStorageIOps: item["includedStorageIOps"],
    supportedStorageIOps: !item["supportedStorageIOps"]
      ? item["supportedStorageIOps"]
      : maxLimitRangeCapabilityDeserializer(item["supportedStorageIOps"]),
    iopsMinValueOverrideFactorPerSelectedStorageGB:
      item["iopsMinValueOverrideFactorPerSelectedStorageGB"],
    iopsIncludedValueOverrideFactorPerSelectedStorageGB:
      item["iopsIncludedValueOverrideFactorPerSelectedStorageGB"],
    includedStorageThroughputMBps: item["includedStorageThroughputMBps"],
    supportedStorageThroughputMBps: !item["supportedStorageThroughputMBps"]
      ? item["supportedStorageThroughputMBps"]
      : maxLimitRangeCapabilityDeserializer(item["supportedStorageThroughputMBps"]),
    throughputMBpsMinValueOverrideFactorPerSelectedStorageGB:
      item["throughputMBpsMinValueOverrideFactorPerSelectedStorageGB"],
    throughputMBpsIncludedValueOverrideFactorPerSelectedStorageGB:
      item["throughputMBpsIncludedValueOverrideFactorPerSelectedStorageGB"],
    instancePoolSupported: item["instancePoolSupported"],
    standaloneSupported: item["standaloneSupported"],
    supportedMaintenanceConfigurations: !item["supportedMaintenanceConfigurations"]
      ? item["supportedMaintenanceConfigurations"]
      : managedInstanceMaintenanceConfigurationCapabilityArrayDeserializer(
          item["supportedMaintenanceConfigurations"],
        ),
    status: item["status"],
    reason: item["reason"],
  };
}

/** The maximum limit range capability. */
export interface MaxLimitRangeCapability {
  /** Minimum value. */
  readonly minValue?: number;
  /** Maximum value. */
  readonly maxValue?: number;
  /** Scale/step size for discrete values between the minimum value and the maximum value. */
  readonly scaleSize?: number;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function maxLimitRangeCapabilityDeserializer(item: any): MaxLimitRangeCapability {
  return {
    minValue: item["minValue"],
    maxValue: item["maxValue"],
    scaleSize: item["scaleSize"],
    status: item["status"],
    reason: item["reason"],
  };
}

export function managedInstanceMaintenanceConfigurationCapabilityArrayDeserializer(
  result: Array<ManagedInstanceMaintenanceConfigurationCapability>,
): any[] {
  return result.map((item) => {
    return managedInstanceMaintenanceConfigurationCapabilityDeserializer(item);
  });
}

/** The maintenance configuration capability */
export interface ManagedInstanceMaintenanceConfigurationCapability {
  /** Maintenance configuration name */
  readonly name?: string;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function managedInstanceMaintenanceConfigurationCapabilityDeserializer(
  item: any,
): ManagedInstanceMaintenanceConfigurationCapability {
  return {
    name: item["name"],
    status: item["status"],
    reason: item["reason"],
  };
}

export function instancePoolEditionCapabilityArrayDeserializer(
  result: Array<InstancePoolEditionCapability>,
): any[] {
  return result.map((item) => {
    return instancePoolEditionCapabilityDeserializer(item);
  });
}

/** The instance pool capability */
export interface InstancePoolEditionCapability {
  /** The instance pool version name. */
  readonly name?: string;
  /** The supported families. */
  readonly supportedFamilies?: InstancePoolFamilyCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function instancePoolEditionCapabilityDeserializer(
  item: any,
): InstancePoolEditionCapability {
  return {
    name: item["name"],
    supportedFamilies: !item["supportedFamilies"]
      ? item["supportedFamilies"]
      : instancePoolFamilyCapabilityArrayDeserializer(item["supportedFamilies"]),
    status: item["status"],
    reason: item["reason"],
  };
}

export function instancePoolFamilyCapabilityArrayDeserializer(
  result: Array<InstancePoolFamilyCapability>,
): any[] {
  return result.map((item) => {
    return instancePoolFamilyCapabilityDeserializer(item);
  });
}

/** The instance pool family capability. */
export interface InstancePoolFamilyCapability {
  /** Family name. */
  readonly name?: string;
  /** List of supported license types. */
  readonly supportedLicenseTypes?: LicenseTypeCapability[];
  /** List of supported virtual cores values. */
  readonly supportedVcoresValues?: InstancePoolVcoresCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function instancePoolFamilyCapabilityDeserializer(item: any): InstancePoolFamilyCapability {
  return {
    name: item["name"],
    supportedLicenseTypes: !item["supportedLicenseTypes"]
      ? item["supportedLicenseTypes"]
      : licenseTypeCapabilityArrayDeserializer(item["supportedLicenseTypes"]),
    supportedVcoresValues: !item["supportedVcoresValues"]
      ? item["supportedVcoresValues"]
      : instancePoolVcoresCapabilityArrayDeserializer(item["supportedVcoresValues"]),
    status: item["status"],
    reason: item["reason"],
  };
}

export function instancePoolVcoresCapabilityArrayDeserializer(
  result: Array<InstancePoolVcoresCapability>,
): any[] {
  return result.map((item) => {
    return instancePoolVcoresCapabilityDeserializer(item);
  });
}

/** The managed instance virtual cores capability. */
export interface InstancePoolVcoresCapability {
  /** The virtual cores identifier. */
  readonly name?: string;
  /** The virtual cores value. */
  readonly value?: number;
  /** Storage limit. */
  readonly storageLimit?: MaxSizeCapability;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function instancePoolVcoresCapabilityDeserializer(item: any): InstancePoolVcoresCapability {
  return {
    name: item["name"],
    value: item["value"],
    storageLimit: !item["storageLimit"]
      ? item["storageLimit"]
      : maxSizeCapabilityDeserializer(item["storageLimit"]),
    status: item["status"],
    reason: item["reason"],
  };
}

export function jobAgentVersionCapabilityArrayDeserializer(
  result: Array<JobAgentVersionCapability>,
): any[] {
  return result.map((item) => {
    return jobAgentVersionCapabilityDeserializer(item);
  });
}

/** The job agent version capability. */
export interface JobAgentVersionCapability {
  /** The job agent version name. */
  readonly name?: string;
  /** The list of supported editions. */
  readonly supportedEditions?: JobAgentEditionCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function jobAgentVersionCapabilityDeserializer(item: any): JobAgentVersionCapability {
  return {
    name: item["name"],
    supportedEditions: !item["supportedEditions"]
      ? item["supportedEditions"]
      : jobAgentEditionCapabilityArrayDeserializer(item["supportedEditions"]),
    status: item["status"],
    reason: item["reason"],
  };
}

export function jobAgentEditionCapabilityArrayDeserializer(
  result: Array<JobAgentEditionCapability>,
): any[] {
  return result.map((item) => {
    return jobAgentEditionCapabilityDeserializer(item);
  });
}

/** The job agent edition capability. */
export interface JobAgentEditionCapability {
  /** The job agent edition name. */
  readonly name?: string;
  /** The list of supported service level objectives for the edition. */
  readonly supportedServiceLevelObjectives?: JobAgentServiceLevelObjectiveCapability[];
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function jobAgentEditionCapabilityDeserializer(item: any): JobAgentEditionCapability {
  return {
    name: item["name"],
    supportedServiceLevelObjectives: !item["supportedServiceLevelObjectives"]
      ? item["supportedServiceLevelObjectives"]
      : jobAgentServiceLevelObjectiveCapabilityArrayDeserializer(
          item["supportedServiceLevelObjectives"],
        ),
    status: item["status"],
    reason: item["reason"],
  };
}

export function jobAgentServiceLevelObjectiveCapabilityArrayDeserializer(
  result: Array<JobAgentServiceLevelObjectiveCapability>,
): any[] {
  return result.map((item) => {
    return jobAgentServiceLevelObjectiveCapabilityDeserializer(item);
  });
}

/** The job agent service level objective capability. */
export interface JobAgentServiceLevelObjectiveCapability {
  /** The service objective name. */
  readonly name?: string;
  /** The sku. */
  readonly sku?: Sku;
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  reason?: string;
}

export function jobAgentServiceLevelObjectiveCapabilityDeserializer(
  item: any,
): JobAgentServiceLevelObjectiveCapability {
  return {
    name: item["name"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    status: item["status"],
    reason: item["reason"],
  };
}

/** Type of SensitivityLabelSource */
export type SensitivityLabelSource = "current" | "recommended";
/** Type of CurrentSensitivityLabelSource */
export type CurrentSensitivityLabelSource = "current";
/** Type of RecommendedSensitivityLabelSource */
export type RecommendedSensitivityLabelSource = "recommended";

/** Known values of {@link ReplicaType} that the service accepts. */
export enum KnownReplicaType {
  /** Primary */
  Primary = "Primary",
  /** ReadableSecondary */
  ReadableSecondary = "ReadableSecondary",
}

/** Type of ReplicaType */
export type ReplicaType = string;
/** Type of BlobAuditingPolicyName */
export type BlobAuditingPolicyName = "default";
/** Type of VulnerabilityAssessmentSystemDatabaseName */
export type VulnerabilityAssessmentSystemDatabaseName = "master";
/** Type of VulnerabilityAssessmentPolicyBaselineName */
export type VulnerabilityAssessmentPolicyBaselineName = "master" | "default";

/** Known values of {@link AggregationFunctionType} that the service accepts. */
export enum KnownAggregationFunctionType {
  /** avg */
  Avg = "avg",
  /** min */
  Min = "min",
  /** max */
  Max = "max",
  /** stdev */
  Stdev = "stdev",
  /** sum */
  Sum = "sum",
}

/** Type of AggregationFunctionType */
export type AggregationFunctionType = string;

/** Known values of {@link MetricType} that the service accepts. */
export enum KnownMetricType {
  /** cpu */
  Cpu = "cpu",
  /** io */
  Io = "io",
  /** logIo */
  LogIo = "logIo",
  /** duration */
  Duration = "duration",
  /** dtu */
  Dtu = "dtu",
}

/** Type of MetricType */
export type MetricType = string;

/** Known values of {@link DatabaseState} that the service accepts. */
export enum KnownDatabaseState {
  /** All */
  All = "All",
  /** Live */
  Live = "Live",
  /** Deleted */
  Deleted = "Deleted",
}

/** Type of DatabaseState */
export type DatabaseState = string;

/** Known values of {@link SyncGroupsType} that the service accepts. */
export enum KnownSyncGroupsType {
  /** All */
  All = "All",
  /** Error */
  Error = "Error",
  /** Warning */
  Warning = "Warning",
  /** Success */
  Success = "Success",
}

/** Type of SyncGroupsType */
export type SyncGroupsType = string;

/** Known values of {@link CapabilityGroup} that the service accepts. */
export enum KnownCapabilityGroup {
  /** supportedEditions */
  SupportedEditions = "supportedEditions",
  /** supportedElasticPoolEditions */
  SupportedElasticPoolEditions = "supportedElasticPoolEditions",
  /** supportedManagedInstanceVersions */
  SupportedManagedInstanceVersions = "supportedManagedInstanceVersions",
  /** supportedInstancePoolEditions */
  SupportedInstancePoolEditions = "supportedInstancePoolEditions",
  /** supportedManagedInstanceEditions */
  SupportedManagedInstanceEditions = "supportedManagedInstanceEditions",
  /** supportedJobAgentVersions */
  SupportedJobAgentVersions = "supportedJobAgentVersions",
}

/** Type of CapabilityGroup */
export type CapabilityGroup = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-02-01-preview API version. */
  V20250201Preview = "2025-02-01-preview",
}

export function advisorArraySerializer(result: Array<Advisor>): any[] {
  return result.map((item) => {
    return advisorSerializer(item);
  });
}

export function advisorArrayDeserializer(result: Array<Advisor>): any[] {
  return result.map((item) => {
    return advisorDeserializer(item);
  });
}

export function _backupShortTermRetentionPolicyPropertiesSerializer(
  item: BackupShortTermRetentionPolicy,
): any {
  return {
    retentionDays: item["retentionDays"],
    diffBackupIntervalInHours: item["diffBackupIntervalInHours"],
  };
}

export function _backupShortTermRetentionPolicyPropertiesDeserializer(item: any) {
  return {
    retentionDays: item["retentionDays"],
    diffBackupIntervalInHours: item["diffBackupIntervalInHours"],
  };
}

export function _databaseColumnPropertiesDeserializer(item: any) {
  return {
    columnType: item["columnType"],
    temporalType: item["temporalType"],
    memoryOptimized: item["memoryOptimized"],
    isComputed: item["isComputed"],
  };
}

export function _restorePointPropertiesDeserializer(item: any) {
  return {
    restorePointType: item["restorePointType"],
    earliestRestoreDate: !item["earliestRestoreDate"]
      ? item["earliestRestoreDate"]
      : new Date(item["earliestRestoreDate"]),
    restorePointCreationDate: !item["restorePointCreationDate"]
      ? item["restorePointCreationDate"]
      : new Date(item["restorePointCreationDate"]),
    restorePointLabel: item["restorePointLabel"],
  };
}

export function _sensitivityLabelPropertiesSerializer(item: SensitivityLabel): any {
  return {
    labelName: item["labelName"],
    labelId: item["labelId"],
    informationType: item["informationType"],
    informationTypeId: item["informationTypeId"],
    rank: item["rank"],
    clientClassificationSource: item["clientClassificationSource"],
  };
}

export function _sensitivityLabelPropertiesDeserializer(item: any) {
  return {
    schemaName: item["schemaName"],
    tableName: item["tableName"],
    columnName: item["columnName"],
    labelName: item["labelName"],
    labelId: item["labelId"],
    informationType: item["informationType"],
    informationTypeId: item["informationTypeId"],
    isDisabled: item["isDisabled"],
    rank: item["rank"],
    clientClassificationSource: item["clientClassificationSource"],
  };
}

export function _sensitivityLabelUpdatePropertiesSerializer(item: SensitivityLabelUpdate): any {
  return {
    op: item["op"],
    schema: item["schema"],
    table: item["table"],
    column: item["column"],
    sensitivityLabel: !item["sensitivityLabel"]
      ? item["sensitivityLabel"]
      : sensitivityLabelSerializer(item["sensitivityLabel"]),
  };
}

export function _databasePropertiesSerializer(item: Database): any {
  return {
    createMode: item["createMode"],
    collation: item["collation"],
    maxSizeBytes: item["maxSizeBytes"],
    sampleName: item["sampleName"],
    elasticPoolId: item["elasticPoolId"],
    sourceDatabaseId: item["sourceDatabaseId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    sourceDatabaseDeletionDate: !item["sourceDatabaseDeletionDate"]
      ? item["sourceDatabaseDeletionDate"]
      : item["sourceDatabaseDeletionDate"].toISOString(),
    recoveryServicesRecoveryPointId: item["recoveryServicesRecoveryPointId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    catalogCollation: item["catalogCollation"],
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    readScale: item["readScale"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    secondaryType: item["secondaryType"],
    autoPauseDelay: item["autoPauseDelay"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    minCapacity: item["minCapacity"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    isLedgerOn: item["isLedgerOn"],
    federatedClientId: item["federatedClientId"],
    keys: !item["keys"] ? item["keys"] : databaseKeyRecordSerializer(item["keys"]),
    encryptionProtector: item["encryptionProtector"],
    preferredEnclaveType: item["preferredEnclaveType"],
    useFreeLimit: item["useFreeLimit"],
    freeLimitExhaustionBehavior: item["freeLimitExhaustionBehavior"],
    sourceResourceId: item["sourceResourceId"],
    manualCutover: item["manualCutover"],
    performCutover: item["performCutover"],
    availabilityZone: item["availabilityZone"],
    encryptionProtectorAutoRotation: item["encryptionProtectorAutoRotation"],
  };
}

export function _databasePropertiesDeserializer(item: any) {
  return {
    createMode: item["createMode"],
    collation: item["collation"],
    maxSizeBytes: item["maxSizeBytes"],
    sampleName: item["sampleName"],
    elasticPoolId: item["elasticPoolId"],
    sourceDatabaseId: item["sourceDatabaseId"],
    status: item["status"],
    databaseId: item["databaseId"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    currentServiceObjectiveName: item["currentServiceObjectiveName"],
    requestedServiceObjectiveName: item["requestedServiceObjectiveName"],
    defaultSecondaryLocation: item["defaultSecondaryLocation"],
    failoverGroupId: item["failoverGroupId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : new Date(item["restorePointInTime"]),
    sourceDatabaseDeletionDate: !item["sourceDatabaseDeletionDate"]
      ? item["sourceDatabaseDeletionDate"]
      : new Date(item["sourceDatabaseDeletionDate"]),
    recoveryServicesRecoveryPointId: item["recoveryServicesRecoveryPointId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    catalogCollation: item["catalogCollation"],
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    maxLogSizeBytes: item["maxLogSizeBytes"],
    earliestRestoreDate: !item["earliestRestoreDate"]
      ? item["earliestRestoreDate"]
      : new Date(item["earliestRestoreDate"]),
    readScale: item["readScale"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    secondaryType: item["secondaryType"],
    currentSku: !item["currentSku"] ? item["currentSku"] : skuDeserializer(item["currentSku"]),
    autoPauseDelay: item["autoPauseDelay"],
    currentBackupStorageRedundancy: item["currentBackupStorageRedundancy"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    minCapacity: item["minCapacity"],
    pausedDate: !item["pausedDate"] ? item["pausedDate"] : new Date(item["pausedDate"]),
    resumedDate: !item["resumedDate"] ? item["resumedDate"] : new Date(item["resumedDate"]),
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    isLedgerOn: item["isLedgerOn"],
    isInfraEncryptionEnabled: item["isInfraEncryptionEnabled"],
    federatedClientId: item["federatedClientId"],
    keys: !item["keys"] ? item["keys"] : databaseKeyRecordDeserializer(item["keys"]),
    encryptionProtector: item["encryptionProtector"],
    preferredEnclaveType: item["preferredEnclaveType"],
    useFreeLimit: item["useFreeLimit"],
    freeLimitExhaustionBehavior: item["freeLimitExhaustionBehavior"],
    sourceResourceId: item["sourceResourceId"],
    manualCutover: item["manualCutover"],
    performCutover: item["performCutover"],
    availabilityZone: item["availabilityZone"],
    encryptionProtectorAutoRotation: item["encryptionProtectorAutoRotation"],
    provisioningState: item["provisioningState"],
  };
}

export function _databaseUpdatePropertiesSerializer(item: DatabaseUpdate): any {
  return {
    createMode: item["createMode"],
    collation: item["collation"],
    maxSizeBytes: item["maxSizeBytes"],
    sampleName: item["sampleName"],
    elasticPoolId: item["elasticPoolId"],
    sourceDatabaseId: item["sourceDatabaseId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    sourceDatabaseDeletionDate: !item["sourceDatabaseDeletionDate"]
      ? item["sourceDatabaseDeletionDate"]
      : item["sourceDatabaseDeletionDate"].toISOString(),
    recoveryServicesRecoveryPointId: item["recoveryServicesRecoveryPointId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    catalogCollation: item["catalogCollation"],
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    readScale: item["readScale"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    secondaryType: item["secondaryType"],
    autoPauseDelay: item["autoPauseDelay"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    minCapacity: item["minCapacity"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    isLedgerOn: item["isLedgerOn"],
    federatedClientId: item["federatedClientId"],
    keys: !item["keys"] ? item["keys"] : databaseKeyRecordSerializer(item["keys"]),
    encryptionProtector: item["encryptionProtector"],
    preferredEnclaveType: item["preferredEnclaveType"],
    useFreeLimit: item["useFreeLimit"],
    freeLimitExhaustionBehavior: item["freeLimitExhaustionBehavior"],
    manualCutover: item["manualCutover"],
    performCutover: item["performCutover"],
    encryptionProtectorAutoRotation: item["encryptionProtectorAutoRotation"],
  };
}

export function _importExportOperationResultPropertiesDeserializer(item: any) {
  return {
    requestId: item["requestId"],
    requestType: item["requestType"],
    queuedTime: item["queuedTime"],
    lastModifiedTime: item["lastModifiedTime"],
    blobUri: item["blobUri"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    status: item["status"],
    errorMessage: item["errorMessage"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionRequestStatusArrayDeserializer(item["privateEndpointConnections"]),
  };
}

export function _firewallRulePropertiesSerializer(item: FirewallRule): any {
  return { startIpAddress: item["startIpAddress"], endIpAddress: item["endIpAddress"] };
}

export function _firewallRulePropertiesDeserializer(item: any) {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
  };
}

export function _replicationLinkPropertiesSerializer(item: ReplicationLink): any {
  return { linkType: item["linkType"] };
}

export function _replicationLinkPropertiesDeserializer(item: any) {
  return {
    partnerServer: item["partnerServer"],
    partnerDatabase: item["partnerDatabase"],
    partnerDatabaseId: item["partnerDatabaseId"],
    partnerLocation: item["partnerLocation"],
    role: item["role"],
    partnerRole: item["partnerRole"],
    replicationMode: item["replicationMode"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    percentComplete: item["percentComplete"],
    replicationState: item["replicationState"],
    isTerminationAllowed: item["isTerminationAllowed"],
    linkType: item["linkType"],
  };
}

export function _replicationLinkUpdatePropertiesSerializer(item: ReplicationLinkUpdate): any {
  return { linkType: item["linkType"] };
}

export function _serverPropertiesSerializer(item: Server): any {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    minimalTlsVersion: item["minimalTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    federatedClientId: item["federatedClientId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : serverExternalAdministratorSerializer(item["administrators"]),
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    isIPv6Enabled: item["isIPv6Enabled"],
    retentionDays: item["retentionDays"],
    createMode: item["createMode"],
  };
}

export function _serverPropertiesDeserializer(item: any) {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    state: item["state"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : serverPrivateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    minimalTlsVersion: item["minimalTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    workspaceFeature: item["workspaceFeature"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    federatedClientId: item["federatedClientId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : serverExternalAdministratorDeserializer(item["administrators"]),
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    isIPv6Enabled: item["isIPv6Enabled"],
    externalGovernanceStatus: item["externalGovernanceStatus"],
    retentionDays: item["retentionDays"],
    createMode: item["createMode"],
  };
}

export function _serverUpdatePropertiesSerializer(item: ServerUpdate): any {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    minimalTlsVersion: item["minimalTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    federatedClientId: item["federatedClientId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : serverExternalAdministratorSerializer(item["administrators"]),
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    isIPv6Enabled: item["isIPv6Enabled"],
    retentionDays: item["retentionDays"],
    createMode: item["createMode"],
  };
}

export function _serverUpdatePropertiesDeserializer(item: any) {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    state: item["state"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : serverPrivateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    minimalTlsVersion: item["minimalTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    workspaceFeature: item["workspaceFeature"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    federatedClientId: item["federatedClientId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : serverExternalAdministratorDeserializer(item["administrators"]),
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    isIPv6Enabled: item["isIPv6Enabled"],
    externalGovernanceStatus: item["externalGovernanceStatus"],
    retentionDays: item["retentionDays"],
    createMode: item["createMode"],
  };
}

export function _refreshExternalGovernanceStatusOperationResultPropertiesDeserializer(item: any) {
  return {
    requestId: item["requestId"],
    requestType: item["requestType"],
    queuedTime: item["queuedTime"],
    serverName: item["serverName"],
    status: item["status"],
    errorMessage: item["errorMessage"],
  };
}

export function _serverBlobAuditingPolicyPropertiesSerializer(item: ServerBlobAuditingPolicy): any {
  return {
    isDevopsAuditEnabled: item["isDevopsAuditEnabled"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function _serverBlobAuditingPolicyPropertiesDeserializer(item: any) {
  return {
    isDevopsAuditEnabled: item["isDevopsAuditEnabled"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function _databaseBlobAuditingPolicyPropertiesSerializer(
  item: DatabaseBlobAuditingPolicy,
): any {
  return {
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function _databaseBlobAuditingPolicyPropertiesDeserializer(item: any) {
  return {
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function _extendedDatabaseBlobAuditingPolicyPropertiesSerializer(
  item: ExtendedDatabaseBlobAuditingPolicy,
): any {
  return {
    predicateExpression: item["predicateExpression"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function _extendedDatabaseBlobAuditingPolicyPropertiesDeserializer(item: any) {
  return {
    predicateExpression: item["predicateExpression"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function _extendedServerBlobAuditingPolicyPropertiesSerializer(
  item: ExtendedServerBlobAuditingPolicy,
): any {
  return {
    isDevopsAuditEnabled: item["isDevopsAuditEnabled"],
    predicateExpression: item["predicateExpression"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function _extendedServerBlobAuditingPolicyPropertiesDeserializer(item: any) {
  return {
    isDevopsAuditEnabled: item["isDevopsAuditEnabled"],
    predicateExpression: item["predicateExpression"],
    retentionDays: item["retentionDays"],
    auditActionsAndGroups: !item["auditActionsAndGroups"]
      ? item["auditActionsAndGroups"]
      : item["auditActionsAndGroups"].map((p: any) => {
          return p;
        }),
    isStorageSecondaryKeyInUse: item["isStorageSecondaryKeyInUse"],
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    queueDelayMs: item["queueDelayMs"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function _recommendedActionPropertiesSerializer(item: RecommendedAction): any {
  return {
    state: !item["state"] ? item["state"] : recommendedActionStateInfoSerializer(item["state"]),
  };
}

export function _recommendedActionPropertiesDeserializer(item: any) {
  return {
    recommendationReason: item["recommendationReason"],
    validSince: !item["validSince"] ? item["validSince"] : new Date(item["validSince"]),
    lastRefresh: !item["lastRefresh"] ? item["lastRefresh"] : new Date(item["lastRefresh"]),
    state: !item["state"] ? item["state"] : recommendedActionStateInfoDeserializer(item["state"]),
    isExecutableAction: item["isExecutableAction"],
    isRevertableAction: item["isRevertableAction"],
    isArchivedAction: item["isArchivedAction"],
    executeActionStartTime: !item["executeActionStartTime"]
      ? item["executeActionStartTime"]
      : new Date(item["executeActionStartTime"]),
    executeActionDuration: item["executeActionDuration"],
    revertActionStartTime: !item["revertActionStartTime"]
      ? item["revertActionStartTime"]
      : new Date(item["revertActionStartTime"]),
    revertActionDuration: item["revertActionDuration"],
    executeActionInitiatedBy: item["executeActionInitiatedBy"],
    executeActionInitiatedTime: !item["executeActionInitiatedTime"]
      ? item["executeActionInitiatedTime"]
      : new Date(item["executeActionInitiatedTime"]),
    revertActionInitiatedBy: item["revertActionInitiatedBy"],
    revertActionInitiatedTime: !item["revertActionInitiatedTime"]
      ? item["revertActionInitiatedTime"]
      : new Date(item["revertActionInitiatedTime"]),
    score: item["score"],
    implementationDetails: !item["implementationDetails"]
      ? item["implementationDetails"]
      : recommendedActionImplementationInfoDeserializer(item["implementationDetails"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : recommendedActionErrorInfoDeserializer(item["errorDetails"]),
    estimatedImpact: !item["estimatedImpact"]
      ? item["estimatedImpact"]
      : recommendedActionImpactRecordArrayDeserializer(item["estimatedImpact"]),
    observedImpact: !item["observedImpact"]
      ? item["observedImpact"]
      : recommendedActionImpactRecordArrayDeserializer(item["observedImpact"]),
    timeSeries: !item["timeSeries"]
      ? item["timeSeries"]
      : recommendedActionMetricInfoArrayDeserializer(item["timeSeries"]),
    linkedObjects: !item["linkedObjects"]
      ? item["linkedObjects"]
      : item["linkedObjects"].map((p: any) => {
          return p;
        }),
    details: !item["details"]
      ? item["details"]
      : Object.fromEntries(Object.entries(item["details"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function _advisorPropertiesSerializer(item: Advisor): any {
  return { autoExecuteStatus: item["autoExecuteStatus"] };
}

export function _advisorPropertiesDeserializer(item: any) {
  return {
    advisorStatus: item["advisorStatus"],
    autoExecuteStatus: item["autoExecuteStatus"],
    autoExecuteStatusInheritedFrom: item["autoExecuteStatusInheritedFrom"],
    recommendationsStatus: item["recommendationsStatus"],
    lastChecked: !item["lastChecked"] ? item["lastChecked"] : new Date(item["lastChecked"]),
    recommendedActions: !item["recommendedActions"]
      ? item["recommendedActions"]
      : recommendedActionArrayDeserializer(item["recommendedActions"]),
  };
}

export function _databaseTablePropertiesDeserializer(item: any) {
  return {
    temporalType: item["temporalType"],
    memoryOptimized: item["memoryOptimized"],
  };
}

export function _databaseSecurityAlertPolicyPropertiesSerializer(
  item: DatabaseSecurityAlertPolicy,
): any {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
  };
}

export function _databaseSecurityAlertPolicyPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

export function _databaseSqlVulnerabilityAssessmentBaselineSetPropertiesDeserializer(item: any) {
  return {
    results: !item["results"]
      ? item["results"]
      : Object.fromEntries(
          Object.entries(item["results"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1.map((p2: any) => {
                return p2;
              });
            }),
          ]),
        ),
  };
}

export function _sqlVulnerabilityAssessmentPropertiesSerializer(
  item: SqlVulnerabilityAssessment,
): any {
  return { state: item["state"] };
}

export function _sqlVulnerabilityAssessmentPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
  };
}

export function _databaseSqlVulnerabilityAssessmentRuleBaselinePropertiesDeserializer(item: any) {
  return {
    results: !item["results"]
      ? item["results"]
      : item["results"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

export function _databaseSqlVulnerabilityAssessmentRuleBaselineInputPropertiesSerializer(
  item: DatabaseSqlVulnerabilityAssessmentRuleBaselineInput,
): any {
  return {
    latestScan: item["latestScan"],
    results: !item["results"]
      ? item["results"]
      : item["results"].map((p: any) => {
          return p.map((p: any) => {
            return p;
          });
        }),
  };
}

export function _sqlVulnerabilityAssessmentScanResultsPropertiesDeserializer(item: any) {
  return {
    ruleId: item["ruleId"],
    status: item["status"],
    errorMessage: item["errorMessage"],
    isTrimmed: item["isTrimmed"],
    queryResults: !item["queryResults"]
      ? item["queryResults"]
      : item["queryResults"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    remediation: !item["remediation"]
      ? item["remediation"]
      : remediationDeserializer(item["remediation"]),
    baselineAdjustedResult: !item["baselineAdjustedResult"]
      ? item["baselineAdjustedResult"]
      : baselineAdjustedResultDeserializer(item["baselineAdjustedResult"]),
    ruleMetadata: !item["ruleMetadata"]
      ? item["ruleMetadata"]
      : vaRuleDeserializer(item["ruleMetadata"]),
  };
}

export function _sqlVulnerabilityAssessmentScanRecordPropertiesDeserializer(item: any) {
  return {
    scanId: item["scanId"],
    triggerType: item["triggerType"],
    state: item["state"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    errors: !item["errors"]
      ? item["errors"]
      : sqlVulnerabilityAssessmentScanErrorArrayDeserializer(item["errors"]),
    server: item["server"],
    database: item["database"],
    sqlVersion: item["sqlVersion"],
    highSeverityFailedRulesCount: item["highSeverityFailedRulesCount"],
    mediumSeverityFailedRulesCount: item["mediumSeverityFailedRulesCount"],
    lowSeverityFailedRulesCount: item["lowSeverityFailedRulesCount"],
    totalPassedRulesCount: item["totalPassedRulesCount"],
    totalFailedRulesCount: item["totalFailedRulesCount"],
    totalRulesCount: item["totalRulesCount"],
    isBaselineApplied: item["isBaselineApplied"],
    lastScanTime: !item["lastScanTime"] ? item["lastScanTime"] : new Date(item["lastScanTime"]),
  };
}

export function _databaseVulnerabilityAssessmentRuleBaselinePropertiesSerializer(
  item: DatabaseVulnerabilityAssessmentRuleBaseline,
): any {
  return {
    baselineResults: !item["baselineResults"]
      ? item["baselineResults"]
      : databaseVulnerabilityAssessmentRuleBaselineItemArraySerializer(item["baselineResults"]),
  };
}

export function _databaseVulnerabilityAssessmentRuleBaselinePropertiesDeserializer(item: any) {
  return {
    baselineResults: !item["baselineResults"]
      ? item["baselineResults"]
      : databaseVulnerabilityAssessmentRuleBaselineItemArrayDeserializer(item["baselineResults"]),
  };
}

export function _databaseVulnerabilityAssessmentPropertiesSerializer(
  item: DatabaseVulnerabilityAssessment,
): any {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesSerializer(item["recurringScans"]),
  };
}

export function _databaseVulnerabilityAssessmentPropertiesDeserializer(item: any) {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesDeserializer(item["recurringScans"]),
  };
}

export function _vulnerabilityAssessmentScanRecordPropertiesDeserializer(item: any) {
  return {
    scanId: item["scanId"],
    triggerType: item["triggerType"],
    state: item["state"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    errors: !item["errors"]
      ? item["errors"]
      : vulnerabilityAssessmentScanErrorArrayDeserializer(item["errors"]),
    storageContainerPath: item["storageContainerPath"],
    numberOfFailedSecurityChecks: item["numberOfFailedSecurityChecks"],
  };
}

export function _databaseVulnerabilityAssessmentScansExportPropertiesDeserializer(item: any) {
  return {
    exportedReportLocation: item["exportedReportLocation"],
  };
}

export function _dataMaskingPolicyPropertiesSerializer(item: DataMaskingPolicy): any {
  return { dataMaskingState: item["dataMaskingState"], exemptPrincipals: item["exemptPrincipals"] };
}

export function _dataMaskingPolicyPropertiesDeserializer(item: any) {
  return {
    dataMaskingState: item["dataMaskingState"],
    exemptPrincipals: item["exemptPrincipals"],
    applicationPrincipals: item["applicationPrincipals"],
    maskingLevel: item["maskingLevel"],
  };
}

export function _deletedServerPropertiesDeserializer(item: any) {
  return {
    version: item["version"],
    deletionTime: !item["deletionTime"] ? item["deletionTime"] : new Date(item["deletionTime"]),
    originalId: item["originalId"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
  };
}

export function _distributedAvailabilityGroupPropertiesSerializer(
  item: DistributedAvailabilityGroup,
): any {
  return {
    replicationMode: item["replicationMode"],
    partnerAvailabilityGroupName: item["partnerAvailabilityGroupName"],
    partnerEndpoint: item["partnerEndpoint"],
    instanceLinkRole: item["instanceLinkRole"],
    instanceAvailabilityGroupName: item["instanceAvailabilityGroupName"],
    failoverMode: item["failoverMode"],
    seedingMode: item["seedingMode"],
    databases: !item["databases"]
      ? item["databases"]
      : distributedAvailabilityGroupDatabaseArraySerializer(item["databases"]),
  };
}

export function _distributedAvailabilityGroupPropertiesDeserializer(item: any) {
  return {
    distributedAvailabilityGroupName: item["distributedAvailabilityGroupName"],
    distributedAvailabilityGroupId: item["distributedAvailabilityGroupId"],
    replicationMode: item["replicationMode"],
    partnerLinkRole: item["partnerLinkRole"],
    partnerAvailabilityGroupName: item["partnerAvailabilityGroupName"],
    partnerEndpoint: item["partnerEndpoint"],
    instanceLinkRole: item["instanceLinkRole"],
    instanceAvailabilityGroupName: item["instanceAvailabilityGroupName"],
    failoverMode: item["failoverMode"],
    seedingMode: item["seedingMode"],
    databases: !item["databases"]
      ? item["databases"]
      : distributedAvailabilityGroupDatabaseArrayDeserializer(item["databases"]),
  };
}

export function _managedDatabasePropertiesSerializer(item: ManagedDatabase): any {
  return {
    collation: item["collation"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    catalogCollation: item["catalogCollation"],
    createMode: item["createMode"],
    storageContainerUri: item["storageContainerUri"],
    sourceDatabaseId: item["sourceDatabaseId"],
    crossSubscriptionSourceDatabaseId: item["crossSubscriptionSourceDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    crossSubscriptionRestorableDroppedDatabaseId:
      item["crossSubscriptionRestorableDroppedDatabaseId"],
    storageContainerIdentity: item["storageContainerIdentity"],
    storageContainerSasToken: item["storageContainerSasToken"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    autoCompleteRestore: item["autoCompleteRestore"],
    lastBackupName: item["lastBackupName"],
    crossSubscriptionTargetManagedInstanceId: item["crossSubscriptionTargetManagedInstanceId"],
    isLedgerOn: item["isLedgerOn"],
  };
}

export function _managedDatabasePropertiesDeserializer(item: any) {
  return {
    collation: item["collation"],
    status: item["status"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    earliestRestorePoint: !item["earliestRestorePoint"]
      ? item["earliestRestorePoint"]
      : new Date(item["earliestRestorePoint"]),
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : new Date(item["restorePointInTime"]),
    defaultSecondaryLocation: item["defaultSecondaryLocation"],
    catalogCollation: item["catalogCollation"],
    createMode: item["createMode"],
    storageContainerUri: item["storageContainerUri"],
    sourceDatabaseId: item["sourceDatabaseId"],
    crossSubscriptionSourceDatabaseId: item["crossSubscriptionSourceDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    crossSubscriptionRestorableDroppedDatabaseId:
      item["crossSubscriptionRestorableDroppedDatabaseId"],
    storageContainerIdentity: item["storageContainerIdentity"],
    storageContainerSasToken: item["storageContainerSasToken"],
    failoverGroupId: item["failoverGroupId"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    autoCompleteRestore: item["autoCompleteRestore"],
    lastBackupName: item["lastBackupName"],
    crossSubscriptionTargetManagedInstanceId: item["crossSubscriptionTargetManagedInstanceId"],
    isLedgerOn: item["isLedgerOn"],
    extendedAccessibilityInfo: !item["extendedAccessibilityInfo"]
      ? item["extendedAccessibilityInfo"]
      : managedDatabaseExtendedAccessibilityInfoDeserializer(item["extendedAccessibilityInfo"]),
  };
}

export function _managedDatabaseUpdatePropertiesSerializer(item: ManagedDatabaseUpdate): any {
  return {
    collation: item["collation"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    catalogCollation: item["catalogCollation"],
    createMode: item["createMode"],
    storageContainerUri: item["storageContainerUri"],
    sourceDatabaseId: item["sourceDatabaseId"],
    crossSubscriptionSourceDatabaseId: item["crossSubscriptionSourceDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    crossSubscriptionRestorableDroppedDatabaseId:
      item["crossSubscriptionRestorableDroppedDatabaseId"],
    storageContainerIdentity: item["storageContainerIdentity"],
    storageContainerSasToken: item["storageContainerSasToken"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    autoCompleteRestore: item["autoCompleteRestore"],
    lastBackupName: item["lastBackupName"],
    crossSubscriptionTargetManagedInstanceId: item["crossSubscriptionTargetManagedInstanceId"],
    isLedgerOn: item["isLedgerOn"],
  };
}

export function _managedDatabaseUpdatePropertiesDeserializer(item: any) {
  return {
    collation: item["collation"],
    status: item["status"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    earliestRestorePoint: !item["earliestRestorePoint"]
      ? item["earliestRestorePoint"]
      : new Date(item["earliestRestorePoint"]),
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : new Date(item["restorePointInTime"]),
    defaultSecondaryLocation: item["defaultSecondaryLocation"],
    catalogCollation: item["catalogCollation"],
    createMode: item["createMode"],
    storageContainerUri: item["storageContainerUri"],
    sourceDatabaseId: item["sourceDatabaseId"],
    crossSubscriptionSourceDatabaseId: item["crossSubscriptionSourceDatabaseId"],
    restorableDroppedDatabaseId: item["restorableDroppedDatabaseId"],
    crossSubscriptionRestorableDroppedDatabaseId:
      item["crossSubscriptionRestorableDroppedDatabaseId"],
    storageContainerIdentity: item["storageContainerIdentity"],
    storageContainerSasToken: item["storageContainerSasToken"],
    failoverGroupId: item["failoverGroupId"],
    recoverableDatabaseId: item["recoverableDatabaseId"],
    longTermRetentionBackupResourceId: item["longTermRetentionBackupResourceId"],
    autoCompleteRestore: item["autoCompleteRestore"],
    lastBackupName: item["lastBackupName"],
    crossSubscriptionTargetManagedInstanceId: item["crossSubscriptionTargetManagedInstanceId"],
    isLedgerOn: item["isLedgerOn"],
    extendedAccessibilityInfo: !item["extendedAccessibilityInfo"]
      ? item["extendedAccessibilityInfo"]
      : managedDatabaseExtendedAccessibilityInfoDeserializer(item["extendedAccessibilityInfo"]),
  };
}

export function _serverTrustGroupPropertiesSerializer(item: ServerTrustGroup): any {
  return {
    groupMembers: !item["groupMembers"]
      ? item["groupMembers"]
      : serverInfoArraySerializer(item["groupMembers"]),
    trustScopes: !item["trustScopes"]
      ? item["trustScopes"]
      : item["trustScopes"].map((p: any) => {
          return p;
        }),
  };
}

export function _serverTrustGroupPropertiesDeserializer(item: any) {
  return {
    groupMembers: !item["groupMembers"]
      ? item["groupMembers"]
      : serverInfoArrayDeserializer(item["groupMembers"]),
    trustScopes: !item["trustScopes"]
      ? item["trustScopes"]
      : item["trustScopes"].map((p: any) => {
          return p;
        }),
  };
}

export function _managedInstancePropertiesSerializer(item: ManagedInstance): any {
  return {
    managedInstanceCreateMode: item["managedInstanceCreateMode"],
    isGeneralPurposeV2: item["isGeneralPurposeV2"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    subnetId: item["subnetId"],
    licenseType: item["licenseType"],
    hybridSecondaryUsage: item["hybridSecondaryUsage"],
    vCores: item["vCores"],
    storageSizeInGB: item["storageSizeInGB"],
    storageIOps: item["storageIOps"],
    storageThroughputMBps: item["storageThroughputMBps"],
    memorySizeInGB: item["memorySizeInGB"],
    collation: item["collation"],
    dnsZonePartner: item["dnsZonePartner"],
    publicDataEndpointEnabled: item["publicDataEndpointEnabled"],
    sourceManagedInstanceId: item["sourceManagedInstanceId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    proxyOverride: item["proxyOverride"],
    timezoneId: item["timezoneId"],
    instancePoolId: item["instancePoolId"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    minimalTlsVersion: item["minimalTlsVersion"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    zoneRedundant: item["zoneRedundant"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : managedInstanceExternalAdministratorSerializer(item["administrators"]),
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalSerializer(item["servicePrincipal"]),
    pricingModel: item["pricingModel"],
    authenticationMetadata: item["authenticationMetadata"],
    databaseFormat: item["databaseFormat"],
    requestedLogicalAvailabilityZone: item["requestedLogicalAvailabilityZone"],
  };
}

export function _managedInstancePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    managedInstanceCreateMode: item["managedInstanceCreateMode"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    isGeneralPurposeV2: item["isGeneralPurposeV2"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    subnetId: item["subnetId"],
    state: item["state"],
    licenseType: item["licenseType"],
    hybridSecondaryUsage: item["hybridSecondaryUsage"],
    hybridSecondaryUsageDetected: item["hybridSecondaryUsageDetected"],
    vCores: item["vCores"],
    storageSizeInGB: item["storageSizeInGB"],
    storageIOps: item["storageIOps"],
    storageThroughputMBps: item["storageThroughputMBps"],
    memorySizeInGB: item["memorySizeInGB"],
    collation: item["collation"],
    dnsZone: item["dnsZone"],
    dnsZonePartner: item["dnsZonePartner"],
    publicDataEndpointEnabled: item["publicDataEndpointEnabled"],
    sourceManagedInstanceId: item["sourceManagedInstanceId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : new Date(item["restorePointInTime"]),
    proxyOverride: item["proxyOverride"],
    timezoneId: item["timezoneId"],
    instancePoolId: item["instancePoolId"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : managedInstancePecPropertyArrayDeserializer(item["privateEndpointConnections"]),
    minimalTlsVersion: item["minimalTlsVersion"],
    currentBackupStorageRedundancy: item["currentBackupStorageRedundancy"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    zoneRedundant: item["zoneRedundant"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : managedInstanceExternalAdministratorDeserializer(item["administrators"]),
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalDeserializer(item["servicePrincipal"]),
    virtualClusterId: item["virtualClusterId"],
    externalGovernanceStatus: item["externalGovernanceStatus"],
    pricingModel: item["pricingModel"],
    createTime: !item["createTime"] ? item["createTime"] : new Date(item["createTime"]),
    authenticationMetadata: item["authenticationMetadata"],
    databaseFormat: item["databaseFormat"],
    requestedLogicalAvailabilityZone: item["requestedLogicalAvailabilityZone"],
  };
}

export function _managedInstanceUpdatePropertiesSerializer(item: ManagedInstanceUpdate): any {
  return {
    managedInstanceCreateMode: item["managedInstanceCreateMode"],
    isGeneralPurposeV2: item["isGeneralPurposeV2"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    subnetId: item["subnetId"],
    licenseType: item["licenseType"],
    hybridSecondaryUsage: item["hybridSecondaryUsage"],
    vCores: item["vCores"],
    storageSizeInGB: item["storageSizeInGB"],
    storageIOps: item["storageIOps"],
    storageThroughputMBps: item["storageThroughputMBps"],
    memorySizeInGB: item["memorySizeInGB"],
    collation: item["collation"],
    dnsZonePartner: item["dnsZonePartner"],
    publicDataEndpointEnabled: item["publicDataEndpointEnabled"],
    sourceManagedInstanceId: item["sourceManagedInstanceId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    proxyOverride: item["proxyOverride"],
    timezoneId: item["timezoneId"],
    instancePoolId: item["instancePoolId"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    minimalTlsVersion: item["minimalTlsVersion"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    zoneRedundant: item["zoneRedundant"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : managedInstanceExternalAdministratorSerializer(item["administrators"]),
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalSerializer(item["servicePrincipal"]),
    pricingModel: item["pricingModel"],
    authenticationMetadata: item["authenticationMetadata"],
    databaseFormat: item["databaseFormat"],
    requestedLogicalAvailabilityZone: item["requestedLogicalAvailabilityZone"],
  };
}

export function _managedInstanceUpdatePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    managedInstanceCreateMode: item["managedInstanceCreateMode"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    isGeneralPurposeV2: item["isGeneralPurposeV2"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    subnetId: item["subnetId"],
    state: item["state"],
    licenseType: item["licenseType"],
    hybridSecondaryUsage: item["hybridSecondaryUsage"],
    hybridSecondaryUsageDetected: item["hybridSecondaryUsageDetected"],
    vCores: item["vCores"],
    storageSizeInGB: item["storageSizeInGB"],
    storageIOps: item["storageIOps"],
    storageThroughputMBps: item["storageThroughputMBps"],
    memorySizeInGB: item["memorySizeInGB"],
    collation: item["collation"],
    dnsZone: item["dnsZone"],
    dnsZonePartner: item["dnsZonePartner"],
    publicDataEndpointEnabled: item["publicDataEndpointEnabled"],
    sourceManagedInstanceId: item["sourceManagedInstanceId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : new Date(item["restorePointInTime"]),
    proxyOverride: item["proxyOverride"],
    timezoneId: item["timezoneId"],
    instancePoolId: item["instancePoolId"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : managedInstancePecPropertyArrayDeserializer(item["privateEndpointConnections"]),
    minimalTlsVersion: item["minimalTlsVersion"],
    currentBackupStorageRedundancy: item["currentBackupStorageRedundancy"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    zoneRedundant: item["zoneRedundant"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    keyId: item["keyId"],
    administrators: !item["administrators"]
      ? item["administrators"]
      : managedInstanceExternalAdministratorDeserializer(item["administrators"]),
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalDeserializer(item["servicePrincipal"]),
    virtualClusterId: item["virtualClusterId"],
    externalGovernanceStatus: item["externalGovernanceStatus"],
    pricingModel: item["pricingModel"],
    createTime: !item["createTime"] ? item["createTime"] : new Date(item["createTime"]),
    authenticationMetadata: item["authenticationMetadata"],
    databaseFormat: item["databaseFormat"],
    requestedLogicalAvailabilityZone: item["requestedLogicalAvailabilityZone"],
  };
}

export function _refreshExternalGovernanceStatusOperationResultMIPropertiesDeserializer(item: any) {
  return {
    requestId: item["requestId"],
    requestType: item["requestType"],
    queuedTime: item["queuedTime"],
    managedInstanceName: item["managedInstanceName"],
    status: item["status"],
    errorMessage: item["errorMessage"],
  };
}

export function _elasticPoolPropertiesSerializer(item: ElasticPool): any {
  return {
    maxSizeBytes: item["maxSizeBytes"],
    minCapacity: item["minCapacity"],
    perDatabaseSettings: !item["perDatabaseSettings"]
      ? item["perDatabaseSettings"]
      : elasticPoolPerDatabaseSettingsSerializer(item["perDatabaseSettings"]),
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    autoPauseDelay: item["autoPauseDelay"],
    preferredEnclaveType: item["preferredEnclaveType"],
    availabilityZone: item["availabilityZone"],
  };
}

export function _elasticPoolPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    maxSizeBytes: item["maxSizeBytes"],
    minCapacity: item["minCapacity"],
    perDatabaseSettings: !item["perDatabaseSettings"]
      ? item["perDatabaseSettings"]
      : elasticPoolPerDatabaseSettingsDeserializer(item["perDatabaseSettings"]),
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    autoPauseDelay: item["autoPauseDelay"],
    preferredEnclaveType: item["preferredEnclaveType"],
    availabilityZone: item["availabilityZone"],
    currentSku: !item["currentSku"] ? item["currentSku"] : skuDeserializer(item["currentSku"]),
  };
}

export function _elasticPoolUpdatePropertiesSerializer(item: ElasticPoolUpdate): any {
  return {
    maxSizeBytes: item["maxSizeBytes"],
    minCapacity: item["minCapacity"],
    perDatabaseSettings: !item["perDatabaseSettings"]
      ? item["perDatabaseSettings"]
      : elasticPoolPerDatabaseSettingsSerializer(item["perDatabaseSettings"]),
    zoneRedundant: item["zoneRedundant"],
    licenseType: item["licenseType"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    highAvailabilityReplicaCount: item["highAvailabilityReplicaCount"],
    autoPauseDelay: item["autoPauseDelay"],
    preferredEnclaveType: item["preferredEnclaveType"],
    availabilityZone: item["availabilityZone"],
  };
}

export function _encryptionProtectorPropertiesSerializer(item: EncryptionProtector): any {
  return {
    serverKeyName: item["serverKeyName"],
    serverKeyType: item["serverKeyType"],
    autoRotationEnabled: item["autoRotationEnabled"],
  };
}

export function _encryptionProtectorPropertiesDeserializer(item: any) {
  return {
    subregion: item["subregion"],
    serverKeyName: item["serverKeyName"],
    serverKeyType: item["serverKeyType"],
    uri: item["uri"],
    thumbprint: item["thumbprint"],
    autoRotationEnabled: item["autoRotationEnabled"],
    keyVersion: item["keyVersion"],
  };
}

export function _endpointCertificatePropertiesDeserializer(item: any) {
  return {
    publicBlob: item["publicBlob"],
  };
}

export function _failoverGroupPropertiesSerializer(item: FailoverGroup): any {
  return {
    readWriteEndpoint: !item["readWriteEndpoint"]
      ? item["readWriteEndpoint"]
      : failoverGroupReadWriteEndpointSerializer(item["readWriteEndpoint"]),
    readOnlyEndpoint: !item["readOnlyEndpoint"]
      ? item["readOnlyEndpoint"]
      : failoverGroupReadOnlyEndpointSerializer(item["readOnlyEndpoint"]),
    partnerServers: !item["partnerServers"]
      ? item["partnerServers"]
      : partnerInfoArraySerializer(item["partnerServers"]),
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    secondaryType: item["secondaryType"],
  };
}

export function _failoverGroupPropertiesDeserializer(item: any) {
  return {
    readWriteEndpoint: !item["readWriteEndpoint"]
      ? item["readWriteEndpoint"]
      : failoverGroupReadWriteEndpointDeserializer(item["readWriteEndpoint"]),
    readOnlyEndpoint: !item["readOnlyEndpoint"]
      ? item["readOnlyEndpoint"]
      : failoverGroupReadOnlyEndpointDeserializer(item["readOnlyEndpoint"]),
    replicationRole: item["replicationRole"],
    replicationState: item["replicationState"],
    partnerServers: !item["partnerServers"]
      ? item["partnerServers"]
      : partnerInfoArrayDeserializer(item["partnerServers"]),
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    secondaryType: item["secondaryType"],
  };
}

export function _failoverGroupUpdatePropertiesSerializer(item: FailoverGroupUpdate): any {
  return {
    readWriteEndpoint: !item["readWriteEndpoint"]
      ? item["readWriteEndpoint"]
      : failoverGroupReadWriteEndpointSerializer(item["readWriteEndpoint"]),
    readOnlyEndpoint: !item["readOnlyEndpoint"]
      ? item["readOnlyEndpoint"]
      : failoverGroupReadOnlyEndpointSerializer(item["readOnlyEndpoint"]),
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    partnerServers: !item["partnerServers"]
      ? item["partnerServers"]
      : partnerInfoArraySerializer(item["partnerServers"]),
    secondaryType: item["secondaryType"],
  };
}

export function _geoBackupPolicyPropertiesSerializer(item: GeoBackupPolicy): any {
  return { state: item["state"] };
}

export function _geoBackupPolicyPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    storageType: item["storageType"],
  };
}

export function _instanceFailoverGroupPropertiesSerializer(item: InstanceFailoverGroup): any {
  return {
    secondaryType: item["secondaryType"],
    readWriteEndpoint: !item["readWriteEndpoint"]
      ? item["readWriteEndpoint"]
      : instanceFailoverGroupReadWriteEndpointSerializer(item["readWriteEndpoint"]),
    readOnlyEndpoint: !item["readOnlyEndpoint"]
      ? item["readOnlyEndpoint"]
      : instanceFailoverGroupReadOnlyEndpointSerializer(item["readOnlyEndpoint"]),
    partnerRegions: !item["partnerRegions"]
      ? item["partnerRegions"]
      : partnerRegionInfoArraySerializer(item["partnerRegions"]),
    managedInstancePairs: !item["managedInstancePairs"]
      ? item["managedInstancePairs"]
      : managedInstancePairInfoArraySerializer(item["managedInstancePairs"]),
  };
}

export function _instanceFailoverGroupPropertiesDeserializer(item: any) {
  return {
    secondaryType: item["secondaryType"],
    readWriteEndpoint: !item["readWriteEndpoint"]
      ? item["readWriteEndpoint"]
      : instanceFailoverGroupReadWriteEndpointDeserializer(item["readWriteEndpoint"]),
    readOnlyEndpoint: !item["readOnlyEndpoint"]
      ? item["readOnlyEndpoint"]
      : instanceFailoverGroupReadOnlyEndpointDeserializer(item["readOnlyEndpoint"]),
    replicationRole: item["replicationRole"],
    replicationState: item["replicationState"],
    partnerRegions: !item["partnerRegions"]
      ? item["partnerRegions"]
      : partnerRegionInfoArrayDeserializer(item["partnerRegions"]),
    managedInstancePairs: !item["managedInstancePairs"]
      ? item["managedInstancePairs"]
      : managedInstancePairInfoArrayDeserializer(item["managedInstancePairs"]),
  };
}

export function _instancePoolOperationPropertiesDeserializer(item: any) {
  return {
    instancePoolName: item["instancePoolName"],
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    errorType: item["errorType"],
    estimatedCompletionTime: !item["estimatedCompletionTime"]
      ? item["estimatedCompletionTime"]
      : new Date(item["estimatedCompletionTime"]),
    description: item["description"],
    isCancellable: item["isCancellable"],
  };
}

export function _instancePoolPropertiesSerializer(item: InstancePool): any {
  return {
    subnetId: item["subnetId"],
    vCores: item["vCores"],
    licenseType: item["licenseType"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
  };
}

export function _instancePoolPropertiesDeserializer(item: any) {
  return {
    subnetId: item["subnetId"],
    vCores: item["vCores"],
    licenseType: item["licenseType"],
    dnsZone: item["dnsZone"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
  };
}

export function _instancePoolUpdatePropertiesSerializer(item: InstancePoolUpdate): any {
  return {
    subnetId: item["subnetId"],
    vCores: item["vCores"],
    licenseType: item["licenseType"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
  };
}

export function _instancePoolUpdatePropertiesDeserializer(item: any) {
  return {
    subnetId: item["subnetId"],
    vCores: item["vCores"],
    licenseType: item["licenseType"],
    dnsZone: item["dnsZone"],
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
  };
}

export function _iPv6FirewallRulePropertiesSerializer(item: IPv6FirewallRule): any {
  return { startIPv6Address: item["startIPv6Address"], endIPv6Address: item["endIPv6Address"] };
}

export function _iPv6FirewallRulePropertiesDeserializer(item: any) {
  return {
    startIPv6Address: item["startIPv6Address"],
    endIPv6Address: item["endIPv6Address"],
  };
}

export function _jobExecutionPropertiesDeserializer(item: any) {
  return {
    jobVersion: item["jobVersion"],
    stepName: item["stepName"],
    stepId: item["stepId"],
    jobExecutionId: item["jobExecutionId"],
    lifecycle: item["lifecycle"],
    provisioningState: item["provisioningState"],
    createTime: !item["createTime"] ? item["createTime"] : new Date(item["createTime"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    currentAttempts: item["currentAttempts"],
    currentAttemptStartTime: !item["currentAttemptStartTime"]
      ? item["currentAttemptStartTime"]
      : new Date(item["currentAttemptStartTime"]),
    lastMessage: item["lastMessage"],
    target: !item["target"] ? item["target"] : jobExecutionTargetDeserializer(item["target"]),
  };
}

export function _jobAgentPropertiesSerializer(item: JobAgent): any {
  return { databaseId: item["databaseId"] };
}

export function _jobAgentPropertiesDeserializer(item: any) {
  return {
    databaseId: item["databaseId"],
    state: item["state"],
  };
}

export function _jobCredentialPropertiesSerializer(item: JobCredential): any {
  return { username: item["username"], password: item["password"] };
}

export function _jobCredentialPropertiesDeserializer(item: any) {
  return {
    username: item["username"],
    password: item["password"],
  };
}

export function _jobPropertiesSerializer(item: Job): any {
  return {
    description: item["description"],
    schedule: !item["schedule"] ? item["schedule"] : jobScheduleSerializer(item["schedule"]),
  };
}

export function _jobPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    version: item["version"],
    schedule: !item["schedule"] ? item["schedule"] : jobScheduleDeserializer(item["schedule"]),
  };
}

export function _jobPrivateEndpointPropertiesSerializer(item: JobPrivateEndpoint): any {
  return { targetServerAzureResourceId: item["targetServerAzureResourceId"] };
}

export function _jobPrivateEndpointPropertiesDeserializer(item: any) {
  return {
    targetServerAzureResourceId: item["targetServerAzureResourceId"],
    privateEndpointId: item["privateEndpointId"],
  };
}

export function _jobStepPropertiesSerializer(item: JobStep): any {
  return {
    stepId: item["stepId"],
    targetGroup: item["targetGroup"],
    credential: item["credential"],
    action: !item["action"] ? item["action"] : jobStepActionSerializer(item["action"]),
    output: !item["output"] ? item["output"] : jobStepOutputSerializer(item["output"]),
    executionOptions: !item["executionOptions"]
      ? item["executionOptions"]
      : jobStepExecutionOptionsSerializer(item["executionOptions"]),
  };
}

export function _jobStepPropertiesDeserializer(item: any) {
  return {
    stepId: item["stepId"],
    targetGroup: item["targetGroup"],
    credential: item["credential"],
    action: !item["action"] ? item["action"] : jobStepActionDeserializer(item["action"]),
    output: !item["output"] ? item["output"] : jobStepOutputDeserializer(item["output"]),
    executionOptions: !item["executionOptions"]
      ? item["executionOptions"]
      : jobStepExecutionOptionsDeserializer(item["executionOptions"]),
  };
}

export function _jobTargetGroupPropertiesSerializer(item: JobTargetGroup): any {
  return {
    members: !item["members"] ? item["members"] : jobTargetArraySerializer(item["members"]),
  };
}

export function _jobTargetGroupPropertiesDeserializer(item: any) {
  return {
    members: !item["members"] ? item["members"] : jobTargetArrayDeserializer(item["members"]),
  };
}

export function _longTermRetentionBackupPropertiesDeserializer(item: any) {
  return {
    serverName: item["serverName"],
    serverCreateTime: !item["serverCreateTime"]
      ? item["serverCreateTime"]
      : new Date(item["serverCreateTime"]),
    databaseName: item["databaseName"],
    databaseDeletionTime: !item["databaseDeletionTime"]
      ? item["databaseDeletionTime"]
      : new Date(item["databaseDeletionTime"]),
    backupTime: !item["backupTime"] ? item["backupTime"] : new Date(item["backupTime"]),
    backupExpirationTime: !item["backupExpirationTime"]
      ? item["backupExpirationTime"]
      : new Date(item["backupExpirationTime"]),
    backupStorageRedundancy: item["backupStorageRedundancy"],
    requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"],
    isBackupImmutable: item["isBackupImmutable"],
    timeBasedImmutability: item["timeBasedImmutability"],
    timeBasedImmutabilityMode: item["timeBasedImmutabilityMode"],
    legalHoldImmutability: item["legalHoldImmutability"],
    backupStorageAccessTier: item["backupStorageAccessTier"],
  };
}

export function _copyLongTermRetentionBackupParametersPropertiesSerializer(
  item: CopyLongTermRetentionBackupParameters,
): any {
  return {
    targetSubscriptionId: item["targetSubscriptionId"],
    targetResourceGroup: item["targetResourceGroup"],
    targetServerResourceId: item["targetServerResourceId"],
    targetServerFullyQualifiedDomainName: item["targetServerFullyQualifiedDomainName"],
    targetDatabaseName: item["targetDatabaseName"],
    targetBackupStorageRedundancy: item["targetBackupStorageRedundancy"],
  };
}

export function _longTermRetentionBackupOperationResultPropertiesDeserializer(item: any) {
  return {
    requestId: item["requestId"],
    operationType: item["operationType"],
    fromBackupResourceId: item["fromBackupResourceId"],
    toBackupResourceId: item["toBackupResourceId"],
    targetBackupStorageRedundancy: item["targetBackupStorageRedundancy"],
    status: item["status"],
    message: item["message"],
  };
}

export function _updateLongTermRetentionBackupParametersPropertiesSerializer(
  item: UpdateLongTermRetentionBackupParameters,
): any {
  return { requestedBackupStorageRedundancy: item["requestedBackupStorageRedundancy"] };
}

export function _managedInstanceLongTermRetentionBackupPropertiesDeserializer(item: any) {
  return {
    managedInstanceName: item["managedInstanceName"],
    managedInstanceCreateTime: !item["managedInstanceCreateTime"]
      ? item["managedInstanceCreateTime"]
      : new Date(item["managedInstanceCreateTime"]),
    databaseName: item["databaseName"],
    databaseDeletionTime: !item["databaseDeletionTime"]
      ? item["databaseDeletionTime"]
      : new Date(item["databaseDeletionTime"]),
    backupTime: !item["backupTime"] ? item["backupTime"] : new Date(item["backupTime"]),
    backupExpirationTime: !item["backupExpirationTime"]
      ? item["backupExpirationTime"]
      : new Date(item["backupExpirationTime"]),
    backupStorageRedundancy: item["backupStorageRedundancy"],
    backupStorageAccessTier: item["backupStorageAccessTier"],
  };
}

export function _longTermRetentionPolicyPropertiesSerializer(item: LongTermRetentionPolicy): any {
  return {
    timeBasedImmutability: item["timeBasedImmutability"],
    timeBasedImmutabilityMode: item["timeBasedImmutabilityMode"],
    weeklyRetention: item["weeklyRetention"],
    monthlyRetention: item["monthlyRetention"],
    yearlyRetention: item["yearlyRetention"],
    weekOfYear: item["weekOfYear"],
  };
}

export function _longTermRetentionPolicyPropertiesDeserializer(item: any) {
  return {
    timeBasedImmutability: item["timeBasedImmutability"],
    timeBasedImmutabilityMode: item["timeBasedImmutabilityMode"],
    weeklyRetention: item["weeklyRetention"],
    monthlyRetention: item["monthlyRetention"],
    yearlyRetention: item["yearlyRetention"],
    weekOfYear: item["weekOfYear"],
  };
}

export function _managedBackupShortTermRetentionPolicyPropertiesSerializer(
  item: ManagedBackupShortTermRetentionPolicy,
): any {
  return { retentionDays: item["retentionDays"] };
}

export function _managedBackupShortTermRetentionPolicyPropertiesDeserializer(item: any) {
  return {
    retentionDays: item["retentionDays"],
  };
}

export function _managedDatabaseSecurityAlertPolicyPropertiesSerializer(
  item: ManagedDatabaseSecurityAlertPolicy,
): any {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
  };
}

export function _managedDatabaseSecurityAlertPolicyPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

export function _managedInstanceAdministratorPropertiesSerializer(
  item: ManagedInstanceAdministrator,
): any {
  return {
    administratorType: item["administratorType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
  };
}

export function _managedInstanceAdministratorPropertiesDeserializer(item: any) {
  return {
    administratorType: item["administratorType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
  };
}

export function _managedInstanceAzureADOnlyAuthenticationPropertiesSerializer(
  item: ManagedInstanceAzureADOnlyAuthentication,
): any {
  return { azureADOnlyAuthentication: item["azureADOnlyAuthentication"] };
}

export function _managedInstanceAzureADOnlyAuthenticationPropertiesDeserializer(item: any) {
  return {
    azureADOnlyAuthentication: item["azureADOnlyAuthentication"],
  };
}

export function _managedInstanceDtcPropertiesSerializer(item: ManagedInstanceDtc): any {
  return {
    dtcEnabled: item["dtcEnabled"],
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : managedInstanceDtcSecuritySettingsSerializer(item["securitySettings"]),
    externalDnsSuffixSearchList: !item["externalDnsSuffixSearchList"]
      ? item["externalDnsSuffixSearchList"]
      : item["externalDnsSuffixSearchList"].map((p: any) => {
          return p;
        }),
    fqdnEnabled: item["fqdnEnabled"],
  };
}

export function _managedInstanceDtcPropertiesDeserializer(item: any) {
  return {
    dtcEnabled: item["dtcEnabled"],
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : managedInstanceDtcSecuritySettingsDeserializer(item["securitySettings"]),
    externalDnsSuffixSearchList: !item["externalDnsSuffixSearchList"]
      ? item["externalDnsSuffixSearchList"]
      : item["externalDnsSuffixSearchList"].map((p: any) => {
          return p;
        }),
    dtcHostNameDnsSuffix: item["dtcHostNameDnsSuffix"],
    fqdnEnabled: item["fqdnEnabled"],
    provisioningState: item["provisioningState"],
  };
}

export function _managedInstanceEncryptionProtectorPropertiesSerializer(
  item: ManagedInstanceEncryptionProtector,
): any {
  return {
    serverKeyName: item["serverKeyName"],
    serverKeyType: item["serverKeyType"],
    autoRotationEnabled: item["autoRotationEnabled"],
  };
}

export function _managedInstanceEncryptionProtectorPropertiesDeserializer(item: any) {
  return {
    serverKeyName: item["serverKeyName"],
    serverKeyType: item["serverKeyType"],
    uri: item["uri"],
    thumbprint: item["thumbprint"],
    autoRotationEnabled: item["autoRotationEnabled"],
  };
}

export function _managedInstanceKeyPropertiesSerializer(item: ManagedInstanceKey): any {
  return { serverKeyType: item["serverKeyType"], uri: item["uri"] };
}

export function _managedInstanceKeyPropertiesDeserializer(item: any) {
  return {
    serverKeyType: item["serverKeyType"],
    uri: item["uri"],
    thumbprint: item["thumbprint"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    autoRotationEnabled: item["autoRotationEnabled"],
  };
}

export function _managedInstanceLongTermRetentionPolicyPropertiesSerializer(
  item: ManagedInstanceLongTermRetentionPolicy,
): any {
  return {
    backupStorageAccessTier: item["backupStorageAccessTier"],
    weeklyRetention: item["weeklyRetention"],
    monthlyRetention: item["monthlyRetention"],
    yearlyRetention: item["yearlyRetention"],
    weekOfYear: item["weekOfYear"],
  };
}

export function _managedInstanceLongTermRetentionPolicyPropertiesDeserializer(item: any) {
  return {
    backupStorageAccessTier: item["backupStorageAccessTier"],
    weeklyRetention: item["weeklyRetention"],
    monthlyRetention: item["monthlyRetention"],
    yearlyRetention: item["yearlyRetention"],
    weekOfYear: item["weekOfYear"],
  };
}

export function _managedInstanceOperationPropertiesDeserializer(item: any) {
  return {
    managedInstanceName: item["managedInstanceName"],
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    isUserError: item["isUserError"],
    estimatedCompletionTime: !item["estimatedCompletionTime"]
      ? item["estimatedCompletionTime"]
      : new Date(item["estimatedCompletionTime"]),
    description: item["description"],
    isCancellable: item["isCancellable"],
    operationParameters: !item["operationParameters"]
      ? item["operationParameters"]
      : managedInstanceOperationParametersPairDeserializer(item["operationParameters"]),
    operationSteps: !item["operationSteps"]
      ? item["operationSteps"]
      : managedInstanceOperationStepsDeserializer(item["operationSteps"]),
  };
}

export function _managedInstancePrivateEndpointConnectionPropertiesSerializer(
  item: ManagedInstancePrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : managedInstancePrivateEndpointPropertySerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : managedInstancePrivateLinkServiceConnectionStatePropertySerializer(
          item["privateLinkServiceConnectionState"],
        ),
  };
}

export function _managedInstancePrivateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : managedInstancePrivateEndpointPropertyDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : managedInstancePrivateLinkServiceConnectionStatePropertyDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
    provisioningState: item["provisioningState"],
  };
}

export function _managedInstanceVulnerabilityAssessmentPropertiesSerializer(
  item: ManagedInstanceVulnerabilityAssessment,
): any {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesSerializer(item["recurringScans"]),
  };
}

export function _managedInstanceVulnerabilityAssessmentPropertiesDeserializer(item: any) {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesDeserializer(item["recurringScans"]),
  };
}

export function _managedServerDnsAliasPropertiesDeserializer(item: any) {
  return {
    azureDnsRecord: item["azureDnsRecord"],
    publicAzureDnsRecord: item["publicAzureDnsRecord"],
  };
}

export function _managedServerSecurityAlertPolicyPropertiesSerializer(
  item: ManagedServerSecurityAlertPolicy,
): any {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
  };
}

export function _managedServerSecurityAlertPolicyPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

export function _networkSecurityPerimeterConfigurationPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : nspConfigPerimeterDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : nspConfigAssociationDeserializer(item["resourceAssociation"]),
    profile: !item["profile"] ? item["profile"] : nspConfigProfileDeserializer(item["profile"]),
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : nspProvisioningIssueArrayDeserializer(item["provisioningIssues"]),
  };
}

export function _outboundFirewallRulePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertySerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertySerializer(
          item["privateLinkServiceConnectionState"],
        ),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertyDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertyDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
    provisioningState: item["provisioningState"],
  };
}

export function _recoverableDatabasePropertiesDeserializer(item: any) {
  return {
    edition: item["edition"],
    serviceLevelObjective: item["serviceLevelObjective"],
    elasticPoolName: item["elasticPoolName"],
    lastAvailableBackupDate: !item["lastAvailableBackupDate"]
      ? item["lastAvailableBackupDate"]
      : new Date(item["lastAvailableBackupDate"]),
    keys: !item["keys"] ? item["keys"] : databaseKeyRecordDeserializer(item["keys"]),
  };
}

export function _recoverableManagedDatabasePropertiesDeserializer(item: any) {
  return {
    lastAvailableBackupDate: item["lastAvailableBackupDate"],
  };
}

export function _restorableDroppedDatabasePropertiesDeserializer(item: any) {
  return {
    databaseName: item["databaseName"],
    maxSizeBytes: item["maxSizeBytes"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
    earliestRestoreDate: !item["earliestRestoreDate"]
      ? item["earliestRestoreDate"]
      : new Date(item["earliestRestoreDate"]),
    backupStorageRedundancy: item["backupStorageRedundancy"],
    keys: !item["keys"] ? item["keys"] : databaseKeyRecordDeserializer(item["keys"]),
  };
}

export function _restorableDroppedManagedDatabasePropertiesDeserializer(item: any) {
  return {
    databaseName: item["databaseName"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
    earliestRestoreDate: !item["earliestRestoreDate"]
      ? item["earliestRestoreDate"]
      : new Date(item["earliestRestoreDate"]),
  };
}

export function _serverAzureADAdministratorPropertiesSerializer(
  item: ServerAzureADAdministrator,
): any {
  return {
    administratorType: item["administratorType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
  };
}

export function _serverAzureADAdministratorPropertiesDeserializer(item: any) {
  return {
    administratorType: item["administratorType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
    azureADOnlyAuthentication: item["azureADOnlyAuthentication"],
  };
}

export function _serverAzureADOnlyAuthenticationPropertiesSerializer(
  item: ServerAzureADOnlyAuthentication,
): any {
  return { azureADOnlyAuthentication: item["azureADOnlyAuthentication"] };
}

export function _serverAzureADOnlyAuthenticationPropertiesDeserializer(item: any) {
  return {
    azureADOnlyAuthentication: item["azureADOnlyAuthentication"],
  };
}

export function _serverConfigurationOptionPropertiesSerializer(
  item: ServerConfigurationOption,
): any {
  return { serverConfigurationOptionValue: item["serverConfigurationOptionValue"] };
}

export function _serverConfigurationOptionPropertiesDeserializer(item: any) {
  return {
    serverConfigurationOptionValue: item["serverConfigurationOptionValue"],
    provisioningState: item["provisioningState"],
  };
}

export function _serverConnectionPolicyPropertiesSerializer(item: ServerConnectionPolicy): any {
  return { connectionType: item["connectionType"] };
}

export function _serverConnectionPolicyPropertiesDeserializer(item: any) {
  return {
    connectionType: item["connectionType"],
  };
}

export function _serverDevOpsAuditingSettingsPropertiesSerializer(
  item: ServerDevOpsAuditingSettings,
): any {
  return {
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function _serverDevOpsAuditingSettingsPropertiesDeserializer(item: any) {
  return {
    isAzureMonitorTargetEnabled: item["isAzureMonitorTargetEnabled"],
    isManagedIdentityInUse: item["isManagedIdentityInUse"],
    state: item["state"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    storageAccountSubscriptionId: item["storageAccountSubscriptionId"],
  };
}

export function _serverDnsAliasPropertiesDeserializer(item: any) {
  return {
    azureDnsRecord: item["azureDnsRecord"],
  };
}

export function _serverKeyPropertiesSerializer(item: ServerKey): any {
  return { serverKeyType: item["serverKeyType"], uri: item["uri"] };
}

export function _serverKeyPropertiesDeserializer(item: any) {
  return {
    subregion: item["subregion"],
    serverKeyType: item["serverKeyType"],
    uri: item["uri"],
    thumbprint: item["thumbprint"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    autoRotationEnabled: item["autoRotationEnabled"],
    keyVersion: item["keyVersion"],
  };
}

export function _serverSecurityAlertPolicyPropertiesSerializer(
  item: ServerSecurityAlertPolicy,
): any {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
  };
}

export function _serverSecurityAlertPolicyPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    disabledAlerts: !item["disabledAlerts"]
      ? item["disabledAlerts"]
      : item["disabledAlerts"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    emailAccountAdmins: item["emailAccountAdmins"],
    storageEndpoint: item["storageEndpoint"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    retentionDays: item["retentionDays"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

export function _serverTrustCertificatePropertiesSerializer(item: ServerTrustCertificate): any {
  return { publicBlob: item["publicBlob"] };
}

export function _serverTrustCertificatePropertiesDeserializer(item: any) {
  return {
    publicBlob: item["publicBlob"],
    thumbprint: item["thumbprint"],
    certificateName: item["certificateName"],
  };
}

export function _serverVulnerabilityAssessmentPropertiesSerializer(
  item: ServerVulnerabilityAssessment,
): any {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesSerializer(item["recurringScans"]),
  };
}

export function _serverVulnerabilityAssessmentPropertiesDeserializer(item: any) {
  return {
    storageContainerPath: item["storageContainerPath"],
    storageContainerSasKey: item["storageContainerSasKey"],
    storageAccountAccessKey: item["storageAccountAccessKey"],
    recurringScans: !item["recurringScans"]
      ? item["recurringScans"]
      : vulnerabilityAssessmentRecurringScansPropertiesDeserializer(item["recurringScans"]),
  };
}

export function _startStopManagedInstanceSchedulePropertiesSerializer(
  item: StartStopManagedInstanceSchedule,
): any {
  return {
    description: item["description"],
    timeZoneId: item["timeZoneId"],
    scheduleList: !item["scheduleList"]
      ? item["scheduleList"]
      : scheduleItemArraySerializer(item["scheduleList"]),
  };
}

export function _startStopManagedInstanceSchedulePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    timeZoneId: item["timeZoneId"],
    scheduleList: !item["scheduleList"]
      ? item["scheduleList"]
      : scheduleItemArrayDeserializer(item["scheduleList"]),
    nextRunAction: item["nextRunAction"],
    nextExecutionTime: item["nextExecutionTime"],
  };
}

export function _subscriptionUsagePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    unit: item["unit"],
  };
}

export function _syncAgentPropertiesSerializer(item: SyncAgent): any {
  return { syncDatabaseId: item["syncDatabaseId"] };
}

export function _syncAgentPropertiesDeserializer(item: any) {
  return {
    namePropertiesName: item["name"],
    syncDatabaseId: item["syncDatabaseId"],
    lastAliveTime: !item["lastAliveTime"] ? item["lastAliveTime"] : new Date(item["lastAliveTime"]),
    state: item["state"],
    isUpToDate: item["isUpToDate"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    version: item["version"],
  };
}

export function _syncAgentLinkedDatabasePropertiesDeserializer(item: any) {
  return {
    databaseType: item["databaseType"],
    databaseId: item["databaseId"],
    description: item["description"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    userName: item["userName"],
  };
}

export function _syncGroupPropertiesSerializer(item: SyncGroup): any {
  return {
    interval: item["interval"],
    conflictResolutionPolicy: item["conflictResolutionPolicy"],
    syncDatabaseId: item["syncDatabaseId"],
    hubDatabaseUserName: item["hubDatabaseUserName"],
    hubDatabasePassword: item["hubDatabasePassword"],
    schema: !item["schema"] ? item["schema"] : syncGroupSchemaSerializer(item["schema"]),
    enableConflictLogging: item["enableConflictLogging"],
    conflictLoggingRetentionInDays: item["conflictLoggingRetentionInDays"],
    usePrivateLinkConnection: item["usePrivateLinkConnection"],
  };
}

export function _syncGroupPropertiesDeserializer(item: any) {
  return {
    interval: item["interval"],
    lastSyncTime: !item["lastSyncTime"] ? item["lastSyncTime"] : new Date(item["lastSyncTime"]),
    conflictResolutionPolicy: item["conflictResolutionPolicy"],
    syncDatabaseId: item["syncDatabaseId"],
    hubDatabaseUserName: item["hubDatabaseUserName"],
    hubDatabasePassword: item["hubDatabasePassword"],
    syncState: item["syncState"],
    schema: !item["schema"] ? item["schema"] : syncGroupSchemaDeserializer(item["schema"]),
    enableConflictLogging: item["enableConflictLogging"],
    conflictLoggingRetentionInDays: item["conflictLoggingRetentionInDays"],
    usePrivateLinkConnection: item["usePrivateLinkConnection"],
    privateEndpointName: item["privateEndpointName"],
  };
}

export function _syncMemberPropertiesSerializer(item: SyncMember): any {
  return {
    databaseType: item["databaseType"],
    syncAgentId: item["syncAgentId"],
    sqlServerDatabaseId: item["sqlServerDatabaseId"],
    syncMemberAzureDatabaseResourceId: item["syncMemberAzureDatabaseResourceId"],
    usePrivateLinkConnection: item["usePrivateLinkConnection"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    userName: item["userName"],
    password: item["password"],
    syncDirection: item["syncDirection"],
  };
}

export function _syncMemberPropertiesDeserializer(item: any) {
  return {
    databaseType: item["databaseType"],
    syncAgentId: item["syncAgentId"],
    sqlServerDatabaseId: item["sqlServerDatabaseId"],
    syncMemberAzureDatabaseResourceId: item["syncMemberAzureDatabaseResourceId"],
    usePrivateLinkConnection: item["usePrivateLinkConnection"],
    privateEndpointName: item["privateEndpointName"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    userName: item["userName"],
    password: item["password"],
    syncDirection: item["syncDirection"],
    syncState: item["syncState"],
  };
}

export function _timeZonePropertiesDeserializer(item: any) {
  return {
    timeZoneId: item["timeZoneId"],
    displayName: item["displayName"],
  };
}

export function _virtualClusterPropertiesSerializer(item: VirtualCluster): any {
  return { version: item["version"] };
}

export function _virtualClusterPropertiesDeserializer(item: any) {
  return {
    subnetId: item["subnetId"],
    version: item["version"],
    childResources: !item["childResources"]
      ? item["childResources"]
      : item["childResources"].map((p: any) => {
          return p;
        }),
  };
}

export function _virtualClusterUpdatePropertiesSerializer(item: VirtualClusterUpdate): any {
  return { version: item["version"] };
}

export function _virtualClusterUpdatePropertiesDeserializer(item: any) {
  return {
    subnetId: item["subnetId"],
    version: item["version"],
    childResources: !item["childResources"]
      ? item["childResources"]
      : item["childResources"].map((p: any) => {
          return p;
        }),
  };
}

export function _updateVirtualClusterDnsServersOperationPropertiesDeserializer(item: any) {
  return {
    status: item["status"],
  };
}

export function _virtualNetworkRulePropertiesSerializer(item: VirtualNetworkRule): any {
  return {
    virtualNetworkSubnetId: item["virtualNetworkSubnetId"],
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
  };
}

export function _virtualNetworkRulePropertiesDeserializer(item: any) {
  return {
    virtualNetworkSubnetId: item["virtualNetworkSubnetId"],
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
    state: item["state"],
  };
}

export function _workloadClassifierPropertiesSerializer(item: WorkloadClassifier): any {
  return {
    memberName: item["memberName"],
    label: item["label"],
    context: item["context"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    importance: item["importance"],
  };
}

export function _workloadClassifierPropertiesDeserializer(item: any) {
  return {
    memberName: item["memberName"],
    label: item["label"],
    context: item["context"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    importance: item["importance"],
  };
}

export function _workloadGroupPropertiesSerializer(item: WorkloadGroup): any {
  return {
    minResourcePercent: item["minResourcePercent"],
    maxResourcePercent: item["maxResourcePercent"],
    minResourcePercentPerRequest: item["minResourcePercentPerRequest"],
    maxResourcePercentPerRequest: item["maxResourcePercentPerRequest"],
    importance: item["importance"],
    queryExecutionTimeout: item["queryExecutionTimeout"],
  };
}

export function _workloadGroupPropertiesDeserializer(item: any) {
  return {
    minResourcePercent: item["minResourcePercent"],
    maxResourcePercent: item["maxResourcePercent"],
    minResourcePercentPerRequest: item["minResourcePercentPerRequest"],
    maxResourcePercentPerRequest: item["maxResourcePercentPerRequest"],
    importance: item["importance"],
    queryExecutionTimeout: item["queryExecutionTimeout"],
  };
}

export function _databaseOperationPropertiesDeserializer(item: any) {
  return {
    databaseName: item["databaseName"],
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    percentComplete: item["percentComplete"],
    serverName: item["serverName"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    isUserError: item["isUserError"],
    estimatedCompletionTime: !item["estimatedCompletionTime"]
      ? item["estimatedCompletionTime"]
      : new Date(item["estimatedCompletionTime"]),
    description: item["description"],
    isCancellable: item["isCancellable"],
    operationPhaseDetails: !item["operationPhaseDetails"]
      ? item["operationPhaseDetails"]
      : phaseDetailsDeserializer(item["operationPhaseDetails"]),
  };
}

export function _databaseUsagePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    unit: item["unit"],
  };
}

export function _recommendedSensitivityLabelUpdatePropertiesSerializer(
  item: RecommendedSensitivityLabelUpdate,
): any {
  return { op: item["op"], schema: item["schema"], table: item["table"], column: item["column"] };
}

export function _synapseLinkWorkspacePropertiesDeserializer(item: any) {
  return {
    workspaces: !item["workspaces"]
      ? item["workspaces"]
      : synapseLinkWorkspaceInfoPropertiesArrayDeserializer(item["workspaces"]),
  };
}

export function _serverOperationPropertiesDeserializer(item: any) {
  return {
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    percentComplete: item["percentComplete"],
    serverName: item["serverName"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    isUserError: item["isUserError"],
    estimatedCompletionTime: !item["estimatedCompletionTime"]
      ? item["estimatedCompletionTime"]
      : new Date(item["estimatedCompletionTime"]),
    description: item["description"],
    isCancellable: item["isCancellable"],
  };
}

export function _serverUsagePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    unit: item["unit"],
  };
}

export function _tdeCertificatePropertiesSerializer(item: TdeCertificate): any {
  return { privateBlob: item["privateBlob"], certPassword: item["certPassword"] };
}

export function _databaseAdvancedThreatProtectionPropertiesSerializer(
  item: DatabaseAdvancedThreatProtection,
): any {
  return { state: item["state"] };
}

export function _databaseAdvancedThreatProtectionPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

export function _databaseAutomaticTuningPropertiesSerializer(item: DatabaseAutomaticTuning): any {
  return {
    desiredState: item["desiredState"],
    options: !item["options"]
      ? item["options"]
      : automaticTuningOptionsRecordSerializer(item["options"]),
  };
}

export function _databaseAutomaticTuningPropertiesDeserializer(item: any) {
  return {
    desiredState: item["desiredState"],
    actualState: item["actualState"],
    options: !item["options"]
      ? item["options"]
      : automaticTuningOptionsRecordDeserializer(item["options"]),
  };
}

export function _databaseExtensionsPropertiesSerializer(item: DatabaseExtensions): any {
  return {
    operationMode: item["operationMode"],
    storageKeyType: item["storageKeyType"],
    storageKey: item["storageKey"],
    storageUri: item["storageUri"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    authenticationType: item["authenticationType"],
    databaseEdition: item["databaseEdition"],
    serviceObjectiveName: item["serviceObjectiveName"],
    maxSizeBytes: item["maxSizeBytes"],
    networkIsolation: !item["networkIsolation"]
      ? item["networkIsolation"]
      : networkIsolationSettingsSerializer(item["networkIsolation"]),
  };
}

export function _importExportExtensionsOperationResultPropertiesDeserializer(item: any) {
  return {
    requestId: item["requestId"],
    requestType: item["requestType"],
    lastModifiedTime: item["lastModifiedTime"],
    serverName: item["serverName"],
    databaseName: item["databaseName"],
    status: item["status"],
    errorMessage: item["errorMessage"],
    queuedTime: item["queuedTime"],
    blobUri: item["blobUri"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionRequestStatusArrayDeserializer(item["privateEndpointConnections"]),
  };
}

export function _databaseSqlVulnerabilityAssessmentRuleBaselineListInputPropertiesSerializer(
  item: DatabaseSqlVulnerabilityAssessmentRuleBaselineListInput,
): any {
  return { latestScan: item["latestScan"], results: item["results"] };
}

export function _dataMaskingRulePropertiesSerializer(item: DataMaskingRule): any {
  return {
    ruleState: item["ruleState"],
    schemaName: item["schemaName"],
    tableName: item["tableName"],
    columnName: item["columnName"],
    aliasName: item["aliasName"],
    maskingFunction: item["maskingFunction"],
    numberFrom: item["numberFrom"],
    numberTo: item["numberTo"],
    prefixSize: item["prefixSize"],
    suffixSize: item["suffixSize"],
    replacementString: item["replacementString"],
  };
}

export function _dataMaskingRulePropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    ruleState: item["ruleState"],
    schemaName: item["schemaName"],
    tableName: item["tableName"],
    columnName: item["columnName"],
    aliasName: item["aliasName"],
    maskingFunction: item["maskingFunction"],
    numberFrom: item["numberFrom"],
    numberTo: item["numberTo"],
    prefixSize: item["prefixSize"],
    suffixSize: item["suffixSize"],
    replacementString: item["replacementString"],
  };
}

export function _dataWarehouseUserActivitiesPropertiesDeserializer(item: any) {
  return {
    activeQueriesCount: item["activeQueriesCount"],
  };
}

export function _securityEventPropertiesDeserializer(item: any) {
  return {
    eventTime: !item["eventTime"] ? item["eventTime"] : new Date(item["eventTime"]),
    securityEventType: item["securityEventType"],
    subscription: item["subscription"],
    server: item["server"],
    database: item["database"],
    clientIp: item["clientIp"],
    applicationName: item["applicationName"],
    principalName: item["principalName"],
    securityEventSqlInjectionAdditionalProperties: !item[
      "securityEventSqlInjectionAdditionalProperties"
    ]
      ? item["securityEventSqlInjectionAdditionalProperties"]
      : securityEventSqlInjectionAdditionalPropertiesDeserializer(
          item["securityEventSqlInjectionAdditionalProperties"],
        ),
  };
}

export function _elasticPoolOperationPropertiesDeserializer(item: any) {
  return {
    elasticPoolName: item["elasticPoolName"],
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    percentComplete: item["percentComplete"],
    serverName: item["serverName"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    isUserError: item["isUserError"],
    estimatedCompletionTime: !item["estimatedCompletionTime"]
      ? item["estimatedCompletionTime"]
      : new Date(item["estimatedCompletionTime"]),
    description: item["description"],
    isCancellable: item["isCancellable"],
  };
}

export function _ledgerDigestUploadsPropertiesSerializer(item: LedgerDigestUploads): any {
  return { digestStorageEndpoint: item["digestStorageEndpoint"] };
}

export function _ledgerDigestUploadsPropertiesDeserializer(item: any) {
  return {
    digestStorageEndpoint: item["digestStorageEndpoint"],
    state: item["state"],
  };
}

export function _maintenanceWindowOptionsPropertiesDeserializer(item: any) {
  return {
    isEnabled: item["isEnabled"],
    maintenanceWindowCycles: !item["maintenanceWindowCycles"]
      ? item["maintenanceWindowCycles"]
      : maintenanceWindowTimeRangeArrayDeserializer(item["maintenanceWindowCycles"]),
    minDurationInMinutes: item["minDurationInMinutes"],
    defaultDurationInMinutes: item["defaultDurationInMinutes"],
    minCycles: item["minCycles"],
    timeGranularityInMinutes: item["timeGranularityInMinutes"],
    allowMultipleMaintenanceWindowsPerCycle: item["allowMultipleMaintenanceWindowsPerCycle"],
  };
}

export function _maintenanceWindowsPropertiesSerializer(item: MaintenanceWindows): any {
  return {
    timeRanges: !item["timeRanges"]
      ? item["timeRanges"]
      : maintenanceWindowTimeRangeArraySerializer(item["timeRanges"]),
  };
}

export function _maintenanceWindowsPropertiesDeserializer(item: any) {
  return {
    timeRanges: !item["timeRanges"]
      ? item["timeRanges"]
      : maintenanceWindowTimeRangeArrayDeserializer(item["timeRanges"]),
  };
}

export function _managedDatabaseAdvancedThreatProtectionPropertiesSerializer(
  item: ManagedDatabaseAdvancedThreatProtection,
): any {
  return { state: item["state"] };
}

export function _managedDatabaseAdvancedThreatProtectionPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

export function _managedDatabaseMoveOperationResultPropertiesDeserializer(item: any) {
  return {
    operation: item["operation"],
    operationFriendlyName: item["operationFriendlyName"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    state: item["state"],
    operationMode: item["operationMode"],
    sourceManagedInstanceName: item["sourceManagedInstanceName"],
    targetManagedInstanceName: item["targetManagedInstanceName"],
    sourceManagedInstanceId: item["sourceManagedInstanceId"],
    targetManagedInstanceId: item["targetManagedInstanceId"],
    sourceDatabaseName: item["sourceDatabaseName"],
    targetDatabaseName: item["targetDatabaseName"],
    isCancellable: item["isCancellable"],
    errorCode: item["errorCode"],
    errorDescription: item["errorDescription"],
    errorSeverity: item["errorSeverity"],
    isUserError: item["isUserError"],
  };
}

export function _managedInstanceQueryPropertiesDeserializer(item: any) {
  return {
    queryText: item["queryText"],
  };
}

export function _queryStatisticsPropertiesDeserializer(item: any) {
  return {
    databaseName: item["databaseName"],
    queryId: item["queryId"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    intervals: !item["intervals"]
      ? item["intervals"]
      : queryMetricIntervalArrayDeserializer(item["intervals"]),
  };
}

export function _managedDatabaseRestoreDetailsResultPropertiesDeserializer(item: any) {
  return {
    typePropertiesType: item["type"],
    status: item["status"],
    blockReason: item["blockReason"],
    lastUploadedFileName: item["lastUploadedFileName"],
    lastUploadedFileTime: !item["lastUploadedFileTime"]
      ? item["lastUploadedFileTime"]
      : new Date(item["lastUploadedFileTime"]),
    lastRestoredFileName: item["lastRestoredFileName"],
    lastRestoredFileTime: !item["lastRestoredFileTime"]
      ? item["lastRestoredFileTime"]
      : new Date(item["lastRestoredFileTime"]),
    percentCompleted: item["percentCompleted"],
    currentRestoredSizeMB: item["currentRestoredSizeMB"],
    currentRestorePlanSizeMB: item["currentRestorePlanSizeMB"],
    currentBackupType: item["currentBackupType"],
    currentRestoringFileName: item["currentRestoringFileName"],
    numberOfFilesDetected: item["numberOfFilesDetected"],
    numberOfFilesQueued: item["numberOfFilesQueued"],
    numberOfFilesSkipped: item["numberOfFilesSkipped"],
    numberOfFilesRestoring: item["numberOfFilesRestoring"],
    numberOfFilesRestored: item["numberOfFilesRestored"],
    numberOfFilesUnrestorable: item["numberOfFilesUnrestorable"],
    fullBackupSets: !item["fullBackupSets"]
      ? item["fullBackupSets"]
      : managedDatabaseRestoreDetailsBackupSetPropertiesArrayDeserializer(item["fullBackupSets"]),
    diffBackupSets: !item["diffBackupSets"]
      ? item["diffBackupSets"]
      : managedDatabaseRestoreDetailsBackupSetPropertiesArrayDeserializer(item["diffBackupSets"]),
    logBackupSets: !item["logBackupSets"]
      ? item["logBackupSets"]
      : managedDatabaseRestoreDetailsBackupSetPropertiesArrayDeserializer(item["logBackupSets"]),
    unrestorableFiles: !item["unrestorableFiles"]
      ? item["unrestorableFiles"]
      : managedDatabaseRestoreDetailsUnrestorableFilePropertiesArrayDeserializer(
          item["unrestorableFiles"],
        ),
  };
}

export function _managedTransparentDataEncryptionPropertiesSerializer(
  item: ManagedTransparentDataEncryption,
): any {
  return { state: item["state"] };
}

export function _managedTransparentDataEncryptionPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
  };
}

export function _managedInstanceAdvancedThreatProtectionPropertiesSerializer(
  item: ManagedInstanceAdvancedThreatProtection,
): any {
  return { state: item["state"] };
}

export function _managedInstanceAdvancedThreatProtectionPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

export function _managedLedgerDigestUploadsPropertiesSerializer(
  item: ManagedLedgerDigestUploads,
): any {
  return { digestStorageEndpoint: item["digestStorageEndpoint"] };
}

export function _managedLedgerDigestUploadsPropertiesDeserializer(item: any) {
  return {
    digestStorageEndpoint: item["digestStorageEndpoint"],
    state: item["state"],
  };
}

export function _serverAdvancedThreatProtectionPropertiesSerializer(
  item: ServerAdvancedThreatProtection,
): any {
  return { state: item["state"] };
}

export function _serverAdvancedThreatProtectionPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

export function _serverAutomaticTuningPropertiesSerializer(item: ServerAutomaticTuning): any {
  return {
    desiredState: item["desiredState"],
    options: !item["options"]
      ? item["options"]
      : automaticTuningServerOptionsRecordSerializer(item["options"]),
  };
}

export function _serverAutomaticTuningPropertiesDeserializer(item: any) {
  return {
    desiredState: item["desiredState"],
    actualState: item["actualState"],
    options: !item["options"]
      ? item["options"]
      : automaticTuningServerOptionsRecordDeserializer(item["options"]),
  };
}

export function _sqlAgentConfigurationPropertiesSerializer(item: SqlAgentConfiguration): any {
  return { state: item["state"] };
}

export function _sqlAgentConfigurationPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
  };
}

export function _logicalDatabaseTransparentDataEncryptionPropertiesSerializer(
  item: LogicalDatabaseTransparentDataEncryption,
): any {
  return { state: item["state"], scanState: item["scanState"] };
}

export function _logicalDatabaseTransparentDataEncryptionPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    scanState: item["scanState"],
  };
}
