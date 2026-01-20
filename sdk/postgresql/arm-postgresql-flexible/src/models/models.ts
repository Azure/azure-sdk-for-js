// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Paged collection of Operation items */
export interface _OperationList {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListDeserializer(item: any): _OperationList {
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

/** REST API operation definition. */
export interface Operation {
  /** Name of the operation being performed on this particular object. */
  readonly name?: string;
  /** Localized display information for this particular operation or action. */
  readonly display?: OperationDisplay;
  /** Indicates if the operation is a data action. */
  isDataAction?: boolean;
  /** Intended executor of the operation. */
  readonly origin?: OperationOrigin;
  /** Additional descriptions for the operation. */
  readonly properties?: Record<string, any>;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    isDataAction: item["isDataAction"],
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
  /** Name of the resource provider. */
  readonly provider?: string;
  /** Type of resource on which the operation is performed. */
  readonly resource?: string;
  /** Name of the operation. */
  readonly operation?: string;
  /** Description of the operation. */
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

/** Intended executor of the operation. */
export enum KnownOperationOrigin {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** user */
  User = "user",
  /** system */
  System = "system",
}

/**
 * Intended executor of the operation. \
 * {@link KnownOperationOrigin} can be used interchangeably with OperationOrigin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **user** \
 * **system**
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

/** Properties of a migration. */
export interface Migration extends TrackedResource {
  /** Identifier of a migration. */
  readonly migrationId?: string;
  /** Current status of a migration. */
  readonly currentStatus?: MigrationStatus;
  /** Identifier of the private endpoint migration instance. */
  migrationInstanceResourceId?: string;
  /** Mode used to perform the migration: Online or Offline. */
  migrationMode?: MigrationMode;
  /** Supported option for a migration. */
  migrationOption?: MigrationOption;
  /** Source server type used for the migration: ApsaraDB_RDS, AWS, AWS_AURORA, AWS_EC2, AWS_RDS, AzureVM, Crunchy_PostgreSQL, Digital_Ocean_Droplets, Digital_Ocean_PostgreSQL, EDB, EDB_Oracle_Server, EDB_PostgreSQL, GCP, GCP_AlloyDB, GCP_CloudSQL, GCP_Compute, Heroku_PostgreSQL, Huawei_Compute, Huawei_RDS, OnPremises, PostgreSQLCosmosDB, PostgreSQLFlexibleServer, PostgreSQLSingleServer, or Supabase_PostgreSQL */
  sourceType?: SourceType;
  /** SSL mode used by a migration. Default SSL mode for 'PostgreSQLSingleServer' is 'VerifyFull'. Default SSL mode for other source types is 'Prefer'. */
  sslMode?: SslMode;
  /** Metadata of source database server. */
  readonly sourceDbServerMetadata?: DbServerMetadata;
  /** Metadata of target database server. */
  readonly targetDbServerMetadata?: DbServerMetadata;
  /** Identifier of the source database server resource, when 'sourceType' is 'PostgreSQLSingleServer'. For other source types this must be set to ipaddress:port@username or hostname:port@username. */
  sourceDbServerResourceId?: string;
  /** Fully qualified domain name (FQDN) or IP address of the source server. This property is optional. When provided, the migration service will always use it to connect to the source server. */
  sourceDbServerFullyQualifiedDomainName?: string;
  /** Identifier of the target database server resource. */
  readonly targetDbServerResourceId?: string;
  /** Fully qualified domain name (FQDN) or IP address of the target server. This property is optional. When provided, the migration service will always use it to connect to the target server. */
  targetDbServerFullyQualifiedDomainName?: string;
  /** Migration secret parameters. */
  secretParameters?: MigrationSecretParameters;
  /** Names of databases to migrate. */
  dbsToMigrate?: string[];
  /** Indicates whether to setup logical replication on source server, if needed. */
  setupLogicalReplicationOnSourceDbIfNeeded?: LogicalReplicationOnSourceServer;
  /** Indicates if databases on the target server can be overwritten when already present. If set to 'False', when the migration workflow detects that the database already exists on the target server, it will wait for a confirmation. */
  overwriteDbsInTarget?: OverwriteDatabasesOnTargetServer;
  /** Start time (UTC) for migration window. */
  migrationWindowStartTimeInUtc?: Date;
  /** End time (UTC) for migration window. */
  migrationWindowEndTimeInUtc?: Date;
  /** Indicates if roles and permissions must be migrated. */
  migrateRoles?: MigrateRolesAndPermissions;
  /** Indicates if data migration must start right away. */
  startDataMigration?: StartDataMigration;
  /** Indicates if cutover must be triggered for the entire migration. */
  triggerCutover?: TriggerCutover;
  /** When you want to trigger cutover for specific databases set 'triggerCutover' to 'True' and the names of the specific databases in this array. */
  dbsToTriggerCutoverOn?: string[];
  /** Indicates if cancel must be triggered for the entire migration. */
  cancel?: Cancel;
  /** When you want to trigger cancel for specific databases set 'triggerCutover' to 'True' and the names of the specific databases in this array. */
  dbsToCancelMigrationOn?: string[];
}

export function migrationSerializer(item: Migration): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "migrationInstanceResourceId",
      "migrationMode",
      "migrationOption",
      "sourceType",
      "sslMode",
      "sourceDbServerResourceId",
      "sourceDbServerFullyQualifiedDomainName",
      "targetDbServerFullyQualifiedDomainName",
      "secretParameters",
      "dbsToMigrate",
      "setupLogicalReplicationOnSourceDbIfNeeded",
      "overwriteDbsInTarget",
      "migrationWindowStartTimeInUtc",
      "migrationWindowEndTimeInUtc",
      "migrateRoles",
      "startDataMigration",
      "triggerCutover",
      "dbsToTriggerCutoverOn",
      "cancel",
      "dbsToCancelMigrationOn",
    ])
      ? undefined
      : _migrationPropertiesSerializer(item),
  };
}

export function migrationDeserializer(item: any): Migration {
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
    ...(!item["properties"]
      ? item["properties"]
      : _migrationPropertiesDeserializer(item["properties"])),
  };
}

/** Migration. */
export interface MigrationProperties {
  /** Identifier of a migration. */
  readonly migrationId?: string;
  /** Current status of a migration. */
  readonly currentStatus?: MigrationStatus;
  /** Identifier of the private endpoint migration instance. */
  migrationInstanceResourceId?: string;
  /** Mode used to perform the migration: Online or Offline. */
  migrationMode?: MigrationMode;
  /** Supported option for a migration. */
  migrationOption?: MigrationOption;
  /** Source server type used for the migration: ApsaraDB_RDS, AWS, AWS_AURORA, AWS_EC2, AWS_RDS, AzureVM, Crunchy_PostgreSQL, Digital_Ocean_Droplets, Digital_Ocean_PostgreSQL, EDB, EDB_Oracle_Server, EDB_PostgreSQL, GCP, GCP_AlloyDB, GCP_CloudSQL, GCP_Compute, Heroku_PostgreSQL, Huawei_Compute, Huawei_RDS, OnPremises, PostgreSQLCosmosDB, PostgreSQLFlexibleServer, PostgreSQLSingleServer, or Supabase_PostgreSQL */
  sourceType?: SourceType;
  /** SSL mode used by a migration. Default SSL mode for 'PostgreSQLSingleServer' is 'VerifyFull'. Default SSL mode for other source types is 'Prefer'. */
  sslMode?: SslMode;
  /** Metadata of source database server. */
  readonly sourceDbServerMetadata?: DbServerMetadata;
  /** Metadata of target database server. */
  readonly targetDbServerMetadata?: DbServerMetadata;
  /** Identifier of the source database server resource, when 'sourceType' is 'PostgreSQLSingleServer'. For other source types this must be set to ipaddress:port@username or hostname:port@username. */
  sourceDbServerResourceId?: string;
  /** Fully qualified domain name (FQDN) or IP address of the source server. This property is optional. When provided, the migration service will always use it to connect to the source server. */
  sourceDbServerFullyQualifiedDomainName?: string;
  /** Identifier of the target database server resource. */
  readonly targetDbServerResourceId?: string;
  /** Fully qualified domain name (FQDN) or IP address of the target server. This property is optional. When provided, the migration service will always use it to connect to the target server. */
  targetDbServerFullyQualifiedDomainName?: string;
  /** Migration secret parameters. */
  secretParameters?: MigrationSecretParameters;
  /** Names of databases to migrate. */
  dbsToMigrate?: string[];
  /** Indicates whether to setup logical replication on source server, if needed. */
  setupLogicalReplicationOnSourceDbIfNeeded?: LogicalReplicationOnSourceServer;
  /** Indicates if databases on the target server can be overwritten when already present. If set to 'False', when the migration workflow detects that the database already exists on the target server, it will wait for a confirmation. */
  overwriteDbsInTarget?: OverwriteDatabasesOnTargetServer;
  /** Start time (UTC) for migration window. */
  migrationWindowStartTimeInUtc?: Date;
  /** End time (UTC) for migration window. */
  migrationWindowEndTimeInUtc?: Date;
  /** Indicates if roles and permissions must be migrated. */
  migrateRoles?: MigrateRolesAndPermissions;
  /** Indicates if data migration must start right away. */
  startDataMigration?: StartDataMigration;
  /** Indicates if cutover must be triggered for the entire migration. */
  triggerCutover?: TriggerCutover;
  /** When you want to trigger cutover for specific databases set 'triggerCutover' to 'True' and the names of the specific databases in this array. */
  dbsToTriggerCutoverOn?: string[];
  /** Indicates if cancel must be triggered for the entire migration. */
  cancel?: Cancel;
  /** When you want to trigger cancel for specific databases set 'triggerCutover' to 'True' and the names of the specific databases in this array. */
  dbsToCancelMigrationOn?: string[];
}

export function migrationPropertiesSerializer(item: MigrationProperties): any {
  return {
    migrationInstanceResourceId: item["migrationInstanceResourceId"],
    migrationMode: item["migrationMode"],
    migrationOption: item["migrationOption"],
    sourceType: item["sourceType"],
    sslMode: item["sslMode"],
    sourceDbServerResourceId: item["sourceDbServerResourceId"],
    sourceDbServerFullyQualifiedDomainName: item["sourceDbServerFullyQualifiedDomainName"],
    targetDbServerFullyQualifiedDomainName: item["targetDbServerFullyQualifiedDomainName"],
    secretParameters: !item["secretParameters"]
      ? item["secretParameters"]
      : migrationSecretParametersSerializer(item["secretParameters"]),
    dbsToMigrate: !item["dbsToMigrate"]
      ? item["dbsToMigrate"]
      : item["dbsToMigrate"].map((p: any) => {
          return p;
        }),
    setupLogicalReplicationOnSourceDbIfNeeded: item["setupLogicalReplicationOnSourceDbIfNeeded"],
    overwriteDbsInTarget: item["overwriteDbsInTarget"],
    migrationWindowStartTimeInUtc: !item["migrationWindowStartTimeInUtc"]
      ? item["migrationWindowStartTimeInUtc"]
      : item["migrationWindowStartTimeInUtc"].toISOString(),
    migrationWindowEndTimeInUtc: !item["migrationWindowEndTimeInUtc"]
      ? item["migrationWindowEndTimeInUtc"]
      : item["migrationWindowEndTimeInUtc"].toISOString(),
    migrateRoles: item["migrateRoles"],
    startDataMigration: item["startDataMigration"],
    triggerCutover: item["triggerCutover"],
    dbsToTriggerCutoverOn: !item["dbsToTriggerCutoverOn"]
      ? item["dbsToTriggerCutoverOn"]
      : item["dbsToTriggerCutoverOn"].map((p: any) => {
          return p;
        }),
    cancel: item["cancel"],
    dbsToCancelMigrationOn: !item["dbsToCancelMigrationOn"]
      ? item["dbsToCancelMigrationOn"]
      : item["dbsToCancelMigrationOn"].map((p: any) => {
          return p;
        }),
  };
}

export function migrationPropertiesDeserializer(item: any): MigrationProperties {
  return {
    migrationId: item["migrationId"],
    currentStatus: !item["currentStatus"]
      ? item["currentStatus"]
      : migrationStatusDeserializer(item["currentStatus"]),
    migrationInstanceResourceId: item["migrationInstanceResourceId"],
    migrationMode: item["migrationMode"],
    migrationOption: item["migrationOption"],
    sourceType: item["sourceType"],
    sslMode: item["sslMode"],
    sourceDbServerMetadata: !item["sourceDbServerMetadata"]
      ? item["sourceDbServerMetadata"]
      : dbServerMetadataDeserializer(item["sourceDbServerMetadata"]),
    targetDbServerMetadata: !item["targetDbServerMetadata"]
      ? item["targetDbServerMetadata"]
      : dbServerMetadataDeserializer(item["targetDbServerMetadata"]),
    sourceDbServerResourceId: item["sourceDbServerResourceId"],
    sourceDbServerFullyQualifiedDomainName: item["sourceDbServerFullyQualifiedDomainName"],
    targetDbServerResourceId: item["targetDbServerResourceId"],
    targetDbServerFullyQualifiedDomainName: item["targetDbServerFullyQualifiedDomainName"],
    secretParameters: !item["secretParameters"]
      ? item["secretParameters"]
      : migrationSecretParametersDeserializer(item["secretParameters"]),
    dbsToMigrate: !item["dbsToMigrate"]
      ? item["dbsToMigrate"]
      : item["dbsToMigrate"].map((p: any) => {
          return p;
        }),
    setupLogicalReplicationOnSourceDbIfNeeded: item["setupLogicalReplicationOnSourceDbIfNeeded"],
    overwriteDbsInTarget: item["overwriteDbsInTarget"],
    migrationWindowStartTimeInUtc: !item["migrationWindowStartTimeInUtc"]
      ? item["migrationWindowStartTimeInUtc"]
      : new Date(item["migrationWindowStartTimeInUtc"]),
    migrationWindowEndTimeInUtc: !item["migrationWindowEndTimeInUtc"]
      ? item["migrationWindowEndTimeInUtc"]
      : new Date(item["migrationWindowEndTimeInUtc"]),
    migrateRoles: item["migrateRoles"],
    startDataMigration: item["startDataMigration"],
    triggerCutover: item["triggerCutover"],
    dbsToTriggerCutoverOn: !item["dbsToTriggerCutoverOn"]
      ? item["dbsToTriggerCutoverOn"]
      : item["dbsToTriggerCutoverOn"].map((p: any) => {
          return p;
        }),
    cancel: item["cancel"],
    dbsToCancelMigrationOn: !item["dbsToCancelMigrationOn"]
      ? item["dbsToCancelMigrationOn"]
      : item["dbsToCancelMigrationOn"].map((p: any) => {
          return p;
        }),
  };
}

/** State of migration. */
export interface MigrationStatus {
  /** State of migration. */
  readonly state?: MigrationState;
  /** Error message, if any, for the migration state. */
  readonly error?: string;
  /** Current migration sub state details. */
  readonly currentSubStateDetails?: MigrationSubstateDetails;
}

export function migrationStatusDeserializer(item: any): MigrationStatus {
  return {
    state: item["state"],
    error: item["error"],
    currentSubStateDetails: !item["currentSubStateDetails"]
      ? item["currentSubStateDetails"]
      : migrationSubstateDetailsDeserializer(item["currentSubStateDetails"]),
  };
}

/** State of migration. */
export enum KnownMigrationState {
  /** InProgress */
  InProgress = "InProgress",
  /** WaitingForUserAction */
  WaitingForUserAction = "WaitingForUserAction",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** ValidationFailed */
  ValidationFailed = "ValidationFailed",
  /** CleaningUp */
  CleaningUp = "CleaningUp",
}

/**
 * State of migration. \
 * {@link KnownMigrationState} can be used interchangeably with MigrationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **WaitingForUserAction** \
 * **Canceled** \
 * **Failed** \
 * **Succeeded** \
 * **ValidationFailed** \
 * **CleaningUp**
 */
export type MigrationState = string;

/** Details of migration substate. */
export interface MigrationSubstateDetails {
  /** Substate of migration. */
  readonly currentSubState?: MigrationSubstate;
  dbDetails?: Record<string, DatabaseMigrationState>;
  validationDetails?: ValidationDetails;
}

export function migrationSubstateDetailsDeserializer(item: any): MigrationSubstateDetails {
  return {
    currentSubState: item["currentSubState"],
    dbDetails: !item["dbDetails"]
      ? item["dbDetails"]
      : databaseMigrationStateRecordDeserializer(item["dbDetails"]),
    validationDetails: !item["validationDetails"]
      ? item["validationDetails"]
      : validationDetailsDeserializer(item["validationDetails"]),
  };
}

/** Substate of migration. */
export enum KnownMigrationSubstate {
  /** PerformingPreRequisiteSteps */
  PerformingPreRequisiteSteps = "PerformingPreRequisiteSteps",
  /** WaitingForLogicalReplicationSetupRequestOnSourceDB */
  WaitingForLogicalReplicationSetupRequestOnSourceDB = "WaitingForLogicalReplicationSetupRequestOnSourceDB",
  /** WaitingForDBsToMigrateSpecification */
  WaitingForDBsToMigrateSpecification = "WaitingForDBsToMigrateSpecification",
  /** WaitingForTargetDBOverwriteConfirmation */
  WaitingForTargetDBOverwriteConfirmation = "WaitingForTargetDBOverwriteConfirmation",
  /** WaitingForDataMigrationScheduling */
  WaitingForDataMigrationScheduling = "WaitingForDataMigrationScheduling",
  /** WaitingForDataMigrationWindow */
  WaitingForDataMigrationWindow = "WaitingForDataMigrationWindow",
  /** MigratingData */
  MigratingData = "MigratingData",
  /** WaitingForCutoverTrigger */
  WaitingForCutoverTrigger = "WaitingForCutoverTrigger",
  /** CompletingMigration */
  CompletingMigration = "CompletingMigration",
  /** Completed */
  Completed = "Completed",
  /** CancelingRequestedDBMigrations */
  CancelingRequestedDBMigrations = "CancelingRequestedDBMigrations",
  /** ValidationInProgress */
  ValidationInProgress = "ValidationInProgress",
}

/**
 * Substate of migration. \
 * {@link KnownMigrationSubstate} can be used interchangeably with MigrationSubstate,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PerformingPreRequisiteSteps** \
 * **WaitingForLogicalReplicationSetupRequestOnSourceDB** \
 * **WaitingForDBsToMigrateSpecification** \
 * **WaitingForTargetDBOverwriteConfirmation** \
 * **WaitingForDataMigrationScheduling** \
 * **WaitingForDataMigrationWindow** \
 * **MigratingData** \
 * **WaitingForCutoverTrigger** \
 * **CompletingMigration** \
 * **Completed** \
 * **CancelingRequestedDBMigrations** \
 * **ValidationInProgress**
 */
export type MigrationSubstate = string;

export function databaseMigrationStateRecordDeserializer(
  item: Record<string, any>,
): Record<string, DatabaseMigrationState> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : databaseMigrationStateDeserializer(item[key]);
  });
  return result;
}

/** Migration state of a database. */
export interface DatabaseMigrationState {
  /** Name of database. */
  databaseName?: string;
  /** Migration state of a database. */
  migrationState?: MigrationDatabaseState;
  /** Migration operation of a database. */
  migrationOperation?: string;
  /** Start time of a migration state. */
  startedOn?: Date;
  /** End time of a migration state. */
  endedOn?: Date;
  /** Number of tables queued for the migration of a database. */
  fullLoadQueuedTables?: number;
  /** Number of tables encountering errors during the migration of a database. */
  fullLoadErroredTables?: number;
  /** Number of tables loading during the migration of a database. */
  fullLoadLoadingTables?: number;
  /** Number of tables loaded during the migration of a database. */
  fullLoadCompletedTables?: number;
  /** Change Data Capture update counter. */
  cdcUpdateCounter?: number;
  /** Change Data Capture delete counter. */
  cdcDeleteCounter?: number;
  /** Change Data Capture insert counter. */
  cdcInsertCounter?: number;
  /** Change Data Capture applied changes counter. */
  appliedChanges?: number;
  /** Change Data Capture incoming changes counter. */
  incomingChanges?: number;
  /** Lag in seconds between source and target during online phase. */
  latency?: number;
  /** Error message, if any, for the migration state. */
  message?: string;
}

export function databaseMigrationStateDeserializer(item: any): DatabaseMigrationState {
  return {
    databaseName: item["databaseName"],
    migrationState: item["migrationState"],
    migrationOperation: item["migrationOperation"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    fullLoadQueuedTables: item["fullLoadQueuedTables"],
    fullLoadErroredTables: item["fullLoadErroredTables"],
    fullLoadLoadingTables: item["fullLoadLoadingTables"],
    fullLoadCompletedTables: item["fullLoadCompletedTables"],
    cdcUpdateCounter: item["cdcUpdateCounter"],
    cdcDeleteCounter: item["cdcDeleteCounter"],
    cdcInsertCounter: item["cdcInsertCounter"],
    appliedChanges: item["appliedChanges"],
    incomingChanges: item["incomingChanges"],
    latency: item["latency"],
    message: item["message"],
  };
}

/** Migration state of a database. */
export enum KnownMigrationDatabaseState {
  /** InProgress */
  InProgress = "InProgress",
  /** WaitingForCutoverTrigger */
  WaitingForCutoverTrigger = "WaitingForCutoverTrigger",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceling */
  Canceling = "Canceling",
}

/**
 * Migration state of a database. \
 * {@link KnownMigrationDatabaseState} can be used interchangeably with MigrationDatabaseState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **WaitingForCutoverTrigger** \
 * **Failed** \
 * **Canceled** \
 * **Succeeded** \
 * **Canceling**
 */
export type MigrationDatabaseState = string;

/** Details for the validation for migration. */
export interface ValidationDetails {
  /** Validation status for migration. */
  status?: ValidationState;
  /** Start time (UTC) for validation. */
  validationStartTimeInUtc?: Date;
  /** End time (UTC) for validation. */
  validationEndTimeInUtc?: Date;
  /** Details of server level validations. */
  serverLevelValidationDetails?: ValidationSummaryItem[];
  /** Details of server level validations. */
  dbLevelValidationDetails?: DbLevelValidationStatus[];
}

export function validationDetailsDeserializer(item: any): ValidationDetails {
  return {
    status: item["status"],
    validationStartTimeInUtc: !item["validationStartTimeInUtc"]
      ? item["validationStartTimeInUtc"]
      : new Date(item["validationStartTimeInUtc"]),
    validationEndTimeInUtc: !item["validationEndTimeInUtc"]
      ? item["validationEndTimeInUtc"]
      : new Date(item["validationEndTimeInUtc"]),
    serverLevelValidationDetails: !item["serverLevelValidationDetails"]
      ? item["serverLevelValidationDetails"]
      : validationSummaryItemArrayDeserializer(item["serverLevelValidationDetails"]),
    dbLevelValidationDetails: !item["dbLevelValidationDetails"]
      ? item["dbLevelValidationDetails"]
      : dbLevelValidationStatusArrayDeserializer(item["dbLevelValidationDetails"]),
  };
}

/** Validation status for migration. */
export enum KnownValidationState {
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Warning */
  Warning = "Warning",
}

/**
 * Validation status for migration. \
 * {@link KnownValidationState} can be used interchangeably with ValidationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Failed** \
 * **Succeeded** \
 * **Warning**
 */
export type ValidationState = string;

export function validationSummaryItemArrayDeserializer(
  result: Array<ValidationSummaryItem>,
): any[] {
  return result.map((item) => {
    return validationSummaryItemDeserializer(item);
  });
}

/** Validation summary object. */
export interface ValidationSummaryItem {
  /** Validation type. */
  type?: string;
  /** Validation status for migration. */
  state?: ValidationState;
  /** Validation messages. */
  messages?: ValidationMessage[];
}

export function validationSummaryItemDeserializer(item: any): ValidationSummaryItem {
  return {
    type: item["type"],
    state: item["state"],
    messages: !item["messages"]
      ? item["messages"]
      : validationMessageArrayDeserializer(item["messages"]),
  };
}

export function validationMessageArrayDeserializer(result: Array<ValidationMessage>): any[] {
  return result.map((item) => {
    return validationMessageDeserializer(item);
  });
}

/** Validation message object. */
export interface ValidationMessage {
  /** Severity of validation message. */
  state?: ValidationState;
  /** Validation message string. */
  message?: string;
}

export function validationMessageDeserializer(item: any): ValidationMessage {
  return {
    state: item["state"],
    message: item["message"],
  };
}

export function dbLevelValidationStatusArrayDeserializer(
  result: Array<DbLevelValidationStatus>,
): any[] {
  return result.map((item) => {
    return dbLevelValidationStatusDeserializer(item);
  });
}

/** Validation status summary for a database. */
export interface DbLevelValidationStatus {
  /** Name of database. */
  databaseName?: string;
  /** Start time of a database level validation. */
  startedOn?: Date;
  /** End time of a database level validation. */
  endedOn?: Date;
  /** Summary of database level validations. */
  summary?: ValidationSummaryItem[];
}

export function dbLevelValidationStatusDeserializer(item: any): DbLevelValidationStatus {
  return {
    databaseName: item["databaseName"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    summary: !item["summary"]
      ? item["summary"]
      : validationSummaryItemArrayDeserializer(item["summary"]),
  };
}

/** Mode used to perform the migration: Online or Offline. */
export enum KnownMigrationMode {
  /** Offline */
  Offline = "Offline",
  /** Online */
  Online = "Online",
}

/**
 * Mode used to perform the migration: Online or Offline. \
 * {@link KnownMigrationMode} can be used interchangeably with MigrationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Offline** \
 * **Online**
 */
export type MigrationMode = string;

/** Supported option for a migration */
export enum KnownMigrationOption {
  /** Validate */
  Validate = "Validate",
  /** Migrate */
  Migrate = "Migrate",
  /** ValidateAndMigrate */
  ValidateAndMigrate = "ValidateAndMigrate",
}

/**
 * Supported option for a migration \
 * {@link KnownMigrationOption} can be used interchangeably with MigrationOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Validate** \
 * **Migrate** \
 * **ValidateAndMigrate**
 */
export type MigrationOption = string;

/** Source server type used for the migration: ApsaraDB_RDS, AWS, AWS_AURORA, AWS_EC2, AWS_RDS, AzureVM, Crunchy_PostgreSQL, Digital_Ocean_Droplets, Digital_Ocean_PostgreSQL, EDB, EDB_Oracle_Server, EDB_PostgreSQL, GCP, GCP_AlloyDB, GCP_CloudSQL, GCP_Compute, Heroku_PostgreSQL, Huawei_Compute, Huawei_RDS, OnPremises, PostgreSQLCosmosDB, PostgreSQLFlexibleServer, PostgreSQLSingleServer, or Supabase_PostgreSQL */
export enum KnownSourceType {
  /** OnPremises */
  OnPremises = "OnPremises",
  /** AWS */
  AWS = "AWS",
  /** GCP */
  GCP = "GCP",
  /** AzureVM */
  AzureVM = "AzureVM",
  /** PostgreSQLSingleServer */
  PostgreSQLSingleServer = "PostgreSQLSingleServer",
  /** AWS_RDS */
  AWSRDS = "AWS_RDS",
  /** AWS_AURORA */
  AWSAurora = "AWS_AURORA",
  /** AWS_EC2 */
  AWSEC2 = "AWS_EC2",
  /** GCP_CloudSQL */
  GCPCloudSQL = "GCP_CloudSQL",
  /** GCP_AlloyDB */
  GCPAlloyDB = "GCP_AlloyDB",
  /** GCP_Compute */
  GCPCompute = "GCP_Compute",
  /** EDB */
  EDB = "EDB",
  /** EDB_Oracle_Server */
  EDBOracleServer = "EDB_Oracle_Server",
  /** EDB_PostgreSQL */
  EDBPostgreSQL = "EDB_PostgreSQL",
  /** PostgreSQLFlexibleServer */
  PostgreSQLFlexibleServer = "PostgreSQLFlexibleServer",
  /** PostgreSQLCosmosDB */
  PostgreSQLCosmosDB = "PostgreSQLCosmosDB",
  /** Huawei_RDS */
  HuaweiRDS = "Huawei_RDS",
  /** Huawei_Compute */
  HuaweiCompute = "Huawei_Compute",
  /** Heroku_PostgreSQL */
  HerokuPostgreSQL = "Heroku_PostgreSQL",
  /** Crunchy_PostgreSQL */
  CrunchyPostgreSQL = "Crunchy_PostgreSQL",
  /** ApsaraDB_RDS */
  ApsaraDBRDS = "ApsaraDB_RDS",
  /** Digital_Ocean_Droplets */
  DigitalOceanDroplets = "Digital_Ocean_Droplets",
  /** Digital_Ocean_PostgreSQL */
  DigitalOceanPostgreSQL = "Digital_Ocean_PostgreSQL",
  /** Supabase_PostgreSQL */
  SupabasePostgreSQL = "Supabase_PostgreSQL",
}

/**
 * Source server type used for the migration: ApsaraDB_RDS, AWS, AWS_AURORA, AWS_EC2, AWS_RDS, AzureVM, Crunchy_PostgreSQL, Digital_Ocean_Droplets, Digital_Ocean_PostgreSQL, EDB, EDB_Oracle_Server, EDB_PostgreSQL, GCP, GCP_AlloyDB, GCP_CloudSQL, GCP_Compute, Heroku_PostgreSQL, Huawei_Compute, Huawei_RDS, OnPremises, PostgreSQLCosmosDB, PostgreSQLFlexibleServer, PostgreSQLSingleServer, or Supabase_PostgreSQL \
 * {@link KnownSourceType} can be used interchangeably with SourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OnPremises** \
 * **AWS** \
 * **GCP** \
 * **AzureVM** \
 * **PostgreSQLSingleServer** \
 * **AWS_RDS** \
 * **AWS_AURORA** \
 * **AWS_EC2** \
 * **GCP_CloudSQL** \
 * **GCP_AlloyDB** \
 * **GCP_Compute** \
 * **EDB** \
 * **EDB_Oracle_Server** \
 * **EDB_PostgreSQL** \
 * **PostgreSQLFlexibleServer** \
 * **PostgreSQLCosmosDB** \
 * **Huawei_RDS** \
 * **Huawei_Compute** \
 * **Heroku_PostgreSQL** \
 * **Crunchy_PostgreSQL** \
 * **ApsaraDB_RDS** \
 * **Digital_Ocean_Droplets** \
 * **Digital_Ocean_PostgreSQL** \
 * **Supabase_PostgreSQL**
 */
export type SourceType = string;

/** SSL mode used by a migration. Default SSL mode for 'PostgreSQLSingleServer' is 'VerifyFull'. Default SSL mode for other source types is 'Prefer'. */
export enum KnownSslMode {
  /** Prefer */
  Prefer = "Prefer",
  /** Require */
  Require = "Require",
  /** VerifyCA */
  VerifyCA = "VerifyCA",
  /** VerifyFull */
  VerifyFull = "VerifyFull",
}

/**
 * SSL mode used by a migration. Default SSL mode for 'PostgreSQLSingleServer' is 'VerifyFull'. Default SSL mode for other source types is 'Prefer'. \
 * {@link KnownSslMode} can be used interchangeably with SslMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Prefer** \
 * **Require** \
 * **VerifyCA** \
 * **VerifyFull**
 */
export type SslMode = string;

/** Database server metadata. */
export interface DbServerMetadata {
  /** Location of database server. */
  readonly location?: string;
  /** Major version of PostgreSQL database engine. */
  version?: string;
  /** Storage size (in MB) for database server. */
  storageMb?: number;
  /** Compute tier and size of the database server. This object is empty for an Azure Database for PostgreSQL single server. */
  sku?: ServerSku;
}

export function dbServerMetadataDeserializer(item: any): DbServerMetadata {
  return {
    location: item["location"],
    version: item["version"],
    storageMb: item["storageMb"],
    sku: !item["sku"] ? item["sku"] : serverSkuDeserializer(item["sku"]),
  };
}

/** Compute information of a server. */
export interface ServerSku {
  /** Compute tier and size of the database server. This object is empty for an Azure Database for PostgreSQL single server. */
  name?: string;
  /** Tier of the compute assigned to a server. */
  tier?: SkuTier;
}

export function serverSkuDeserializer(item: any): ServerSku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** Tier of the compute assigned to a server. */
export enum KnownSkuTier {
  /** Burstable */
  Burstable = "Burstable",
  /** GeneralPurpose */
  GeneralPurpose = "GeneralPurpose",
  /** MemoryOptimized */
  MemoryOptimized = "MemoryOptimized",
}

/**
 * Tier of the compute assigned to a server. \
 * {@link KnownSkuTier} can be used interchangeably with SkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Burstable** \
 * **GeneralPurpose** \
 * **MemoryOptimized**
 */
export type SkuTier = string;

/** Migration secret parameters. */
export interface MigrationSecretParameters {
  /** Credentials of administrator users for source and target servers. */
  adminCredentials: AdminCredentials;
  /** Gets or sets the name of the user for the source server. This user doesn't need to be an administrator. */
  sourceServerUsername?: string;
  /** Gets or sets the name of the user for the target server. This user doesn't need to be an administrator. */
  targetServerUsername?: string;
}

export function migrationSecretParametersSerializer(item: MigrationSecretParameters): any {
  return {
    adminCredentials: adminCredentialsSerializer(item["adminCredentials"]),
    sourceServerUsername: item["sourceServerUsername"],
    targetServerUsername: item["targetServerUsername"],
  };
}

export function migrationSecretParametersDeserializer(item: any): MigrationSecretParameters {
  return {
    adminCredentials: adminCredentialsDeserializer(item["adminCredentials"]),
    sourceServerUsername: item["sourceServerUsername"],
    targetServerUsername: item["targetServerUsername"],
  };
}

/** Credentials of administrator users for source and target servers. */
export interface AdminCredentials {
  /** Password for the user of the source server. */
  sourceServerPassword: string;
  /** Password for the user of the target server. */
  targetServerPassword: string;
}

export function adminCredentialsSerializer(item: AdminCredentials): any {
  return {
    sourceServerPassword: item["sourceServerPassword"],
    targetServerPassword: item["targetServerPassword"],
  };
}

export function adminCredentialsDeserializer(item: any): AdminCredentials {
  return {
    sourceServerPassword: item["sourceServerPassword"],
    targetServerPassword: item["targetServerPassword"],
  };
}

/** Indicates whether to setup logical replication on source server, if needed. */
export enum KnownLogicalReplicationOnSourceServer {
  /** True */
  True = "True",
  /** False */
  False = "False",
}

/**
 * Indicates whether to setup logical replication on source server, if needed. \
 * {@link KnownLogicalReplicationOnSourceServer} can be used interchangeably with LogicalReplicationOnSourceServer,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False**
 */
export type LogicalReplicationOnSourceServer = string;

/** Indicates if databases on the target server can be overwritten when already present. If set to 'False', when the migration workflow detects that the database already exists on the target server, it will wait for a confirmation. */
export enum KnownOverwriteDatabasesOnTargetServer {
  /** True */
  True = "True",
  /** False */
  False = "False",
}

/**
 * Indicates if databases on the target server can be overwritten when already present. If set to 'False', when the migration workflow detects that the database already exists on the target server, it will wait for a confirmation. \
 * {@link KnownOverwriteDatabasesOnTargetServer} can be used interchangeably with OverwriteDatabasesOnTargetServer,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False**
 */
export type OverwriteDatabasesOnTargetServer = string;

/** Indicates if roles and permissions must be migrated. */
export enum KnownMigrateRolesAndPermissions {
  /** True */
  True = "True",
  /** False */
  False = "False",
}

/**
 * Indicates if roles and permissions must be migrated. \
 * {@link KnownMigrateRolesAndPermissions} can be used interchangeably with MigrateRolesAndPermissions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False**
 */
export type MigrateRolesAndPermissions = string;

/** Indicates if data migration must start right away. */
export enum KnownStartDataMigration {
  /** True */
  True = "True",
  /** False */
  False = "False",
}

/**
 * Indicates if data migration must start right away. \
 * {@link KnownStartDataMigration} can be used interchangeably with StartDataMigration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False**
 */
export type StartDataMigration = string;

/** Indicates if cutover must be triggered for the entire migration. */
export enum KnownTriggerCutover {
  /** True */
  True = "True",
  /** False */
  False = "False",
}

/**
 * Indicates if cutover must be triggered for the entire migration. \
 * {@link KnownTriggerCutover} can be used interchangeably with TriggerCutover,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False**
 */
export type TriggerCutover = string;

/** Indicates if cancel must be triggered for the entire migration. */
export enum KnownCancel {
  /** True */
  True = "True",
  /** False */
  False = "False",
}

/**
 * Indicates if cancel must be triggered for the entire migration. \
 * {@link KnownCancel} can be used interchangeably with Cancel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False**
 */
export type Cancel = string;

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

/** Migration. */
export interface MigrationResourceForPatch {
  /** Application-specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Identifier of the source database server resource, when 'sourceType' is 'PostgreSQLSingleServer'. For other source types this must be set to ipaddress:port@username or hostname:port@username. */
  sourceDbServerResourceId?: string;
  /** Fully qualified domain name (FQDN) or IP address of the source server. This property is optional. When provided, the migration service will always use it to connect to the source server. */
  sourceDbServerFullyQualifiedDomainName?: string;
  /** Fully qualified domain name (FQDN) or IP address of the target server. This property is optional. When provided, the migration service will always use it to connect to the target server. */
  targetDbServerFullyQualifiedDomainName?: string;
  /** Migration secret parameters. */
  secretParameters?: MigrationSecretParametersForPatch;
  /** Names of databases to migrate. */
  dbsToMigrate?: string[];
  /** Indicates whether to setup logical replication on source server, if needed. */
  setupLogicalReplicationOnSourceDbIfNeeded?: LogicalReplicationOnSourceServer;
  /** Indicates if databases on the target server can be overwritten when already present. If set to 'False', when the migration workflow detects that the database already exists on the target server, it will wait for a confirmation. */
  overwriteDbsInTarget?: OverwriteDatabasesOnTargetServer;
  /** Start time (UTC) for migration window. */
  migrationWindowStartTimeInUtc?: Date;
  /** Indicates if roles and permissions must be migrated. */
  migrateRoles?: MigrateRolesAndPermissions;
  /** Indicates if data migration must start right away. */
  startDataMigration?: StartDataMigration;
  /** Indicates if cutover must be triggered for the entire migration. */
  triggerCutover?: TriggerCutover;
  /** When you want to trigger cutover for specific databases set 'triggerCutover' to 'True' and the names of the specific databases in this array. */
  dbsToTriggerCutoverOn?: string[];
  /** Indicates if cancel must be triggered for the entire migration. */
  cancel?: Cancel;
  /** When you want to trigger cancel for specific databases set 'triggerCutover' to 'True' and the names of the specific databases in this array. */
  dbsToCancelMigrationOn?: string[];
  /** Mode used to perform the migration: Online or Offline. */
  migrationMode?: MigrationMode;
}

export function migrationResourceForPatchSerializer(item: MigrationResourceForPatch): any {
  return {
    properties: areAllPropsUndefined(item, [
      "sourceDbServerResourceId",
      "sourceDbServerFullyQualifiedDomainName",
      "targetDbServerFullyQualifiedDomainName",
      "secretParameters",
      "dbsToMigrate",
      "setupLogicalReplicationOnSourceDbIfNeeded",
      "overwriteDbsInTarget",
      "migrationWindowStartTimeInUtc",
      "migrateRoles",
      "startDataMigration",
      "triggerCutover",
      "dbsToTriggerCutoverOn",
      "cancel",
      "dbsToCancelMigrationOn",
      "migrationMode",
    ])
      ? undefined
      : _migrationResourceForPatchPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Migration properties. */
export interface MigrationPropertiesForPatch {
  /** Identifier of the source database server resource, when 'sourceType' is 'PostgreSQLSingleServer'. For other source types this must be set to ipaddress:port@username or hostname:port@username. */
  sourceDbServerResourceId?: string;
  /** Fully qualified domain name (FQDN) or IP address of the source server. This property is optional. When provided, the migration service will always use it to connect to the source server. */
  sourceDbServerFullyQualifiedDomainName?: string;
  /** Fully qualified domain name (FQDN) or IP address of the target server. This property is optional. When provided, the migration service will always use it to connect to the target server. */
  targetDbServerFullyQualifiedDomainName?: string;
  /** Migration secret parameters. */
  secretParameters?: MigrationSecretParametersForPatch;
  /** Names of databases to migrate. */
  dbsToMigrate?: string[];
  /** Indicates whether to setup logical replication on source server, if needed. */
  setupLogicalReplicationOnSourceDbIfNeeded?: LogicalReplicationOnSourceServer;
  /** Indicates if databases on the target server can be overwritten when already present. If set to 'False', when the migration workflow detects that the database already exists on the target server, it will wait for a confirmation. */
  overwriteDbsInTarget?: OverwriteDatabasesOnTargetServer;
  /** Start time (UTC) for migration window. */
  migrationWindowStartTimeInUtc?: Date;
  /** Indicates if roles and permissions must be migrated. */
  migrateRoles?: MigrateRolesAndPermissions;
  /** Indicates if data migration must start right away. */
  startDataMigration?: StartDataMigration;
  /** Indicates if cutover must be triggered for the entire migration. */
  triggerCutover?: TriggerCutover;
  /** When you want to trigger cutover for specific databases set 'triggerCutover' to 'True' and the names of the specific databases in this array. */
  dbsToTriggerCutoverOn?: string[];
  /** Indicates if cancel must be triggered for the entire migration. */
  cancel?: Cancel;
  /** When you want to trigger cancel for specific databases set 'triggerCutover' to 'True' and the names of the specific databases in this array. */
  dbsToCancelMigrationOn?: string[];
  /** Mode used to perform the migration: Online or Offline. */
  migrationMode?: MigrationMode;
}

export function migrationPropertiesForPatchSerializer(item: MigrationPropertiesForPatch): any {
  return {
    sourceDbServerResourceId: item["sourceDbServerResourceId"],
    sourceDbServerFullyQualifiedDomainName: item["sourceDbServerFullyQualifiedDomainName"],
    targetDbServerFullyQualifiedDomainName: item["targetDbServerFullyQualifiedDomainName"],
    secretParameters: !item["secretParameters"]
      ? item["secretParameters"]
      : migrationSecretParametersForPatchSerializer(item["secretParameters"]),
    dbsToMigrate: !item["dbsToMigrate"]
      ? item["dbsToMigrate"]
      : item["dbsToMigrate"].map((p: any) => {
          return p;
        }),
    setupLogicalReplicationOnSourceDbIfNeeded: item["setupLogicalReplicationOnSourceDbIfNeeded"],
    overwriteDbsInTarget: item["overwriteDbsInTarget"],
    migrationWindowStartTimeInUtc: !item["migrationWindowStartTimeInUtc"]
      ? item["migrationWindowStartTimeInUtc"]
      : item["migrationWindowStartTimeInUtc"].toISOString(),
    migrateRoles: item["migrateRoles"],
    startDataMigration: item["startDataMigration"],
    triggerCutover: item["triggerCutover"],
    dbsToTriggerCutoverOn: !item["dbsToTriggerCutoverOn"]
      ? item["dbsToTriggerCutoverOn"]
      : item["dbsToTriggerCutoverOn"].map((p: any) => {
          return p;
        }),
    cancel: item["cancel"],
    dbsToCancelMigrationOn: !item["dbsToCancelMigrationOn"]
      ? item["dbsToCancelMigrationOn"]
      : item["dbsToCancelMigrationOn"].map((p: any) => {
          return p;
        }),
    migrationMode: item["migrationMode"],
  };
}

/** Migration secret parameters. */
export interface MigrationSecretParametersForPatch {
  /** Credentials of administrator users for source and target servers. */
  adminCredentials?: AdminCredentialsForPatch;
  /** Gets or sets the name of the user for the source server. This user doesn't need to be an administrator. */
  sourceServerUsername?: string;
  /** Gets or sets the name of the user for the target server. This user doesn't need to be an administrator. */
  targetServerUsername?: string;
}

export function migrationSecretParametersForPatchSerializer(
  item: MigrationSecretParametersForPatch,
): any {
  return {
    adminCredentials: !item["adminCredentials"]
      ? item["adminCredentials"]
      : adminCredentialsForPatchSerializer(item["adminCredentials"]),
    sourceServerUsername: item["sourceServerUsername"],
    targetServerUsername: item["targetServerUsername"],
  };
}

/** Credentials of administrator users for source and target servers. */
export interface AdminCredentialsForPatch {
  /** Password for the user of the source server. */
  sourceServerPassword?: string;
  /** Password for the user of the target server. */
  targetServerPassword?: string;
}

export function adminCredentialsForPatchSerializer(item: AdminCredentialsForPatch): any {
  return {
    sourceServerPassword: item["sourceServerPassword"],
    targetServerPassword: item["targetServerPassword"],
  };
}

/** List of migrations. */
export interface _MigrationList {
  /** The Migration items on this page */
  readonly value: Migration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _migrationListDeserializer(item: any): _MigrationList {
  return {
    value: migrationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function migrationArraySerializer(result: Array<Migration>): any[] {
  return result.map((item) => {
    return migrationSerializer(item);
  });
}

export function migrationArrayDeserializer(result: Array<Migration>): any[] {
  return result.map((item) => {
    return migrationDeserializer(item);
  });
}

/** Availability of a migration name. */
export interface MigrationNameAvailability {
  /** Name of the migration to check for validity and availability. */
  name: string;
  /** Type of resource. */
  type: string;
  /** Indicates if the migration name is available. */
  readonly nameAvailable?: boolean;
  /** Migration name availability reason. */
  readonly reason?: MigrationNameAvailabilityReason;
  /** Migration name availability message. */
  readonly message?: string;
}

export function migrationNameAvailabilitySerializer(item: MigrationNameAvailability): any {
  return { name: item["name"], type: item["type"] };
}

export function migrationNameAvailabilityDeserializer(item: any): MigrationNameAvailability {
  return {
    name: item["name"],
    type: item["type"],
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Migration name availability reason. */
export enum KnownMigrationNameAvailabilityReason {
  /** Invalid */
  Invalid = "Invalid",
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
}

/**
 * Migration name availability reason. \
 * {@link KnownMigrationNameAvailabilityReason} can be used interchangeably with MigrationNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AlreadyExists**
 */
export type MigrationNameAvailabilityReason = string;

/** Properties of a server. */
export interface Server extends TrackedResource {
  /** Compute tier and size of a server. */
  sku?: Sku;
  /** User assigned managed identities assigned to the server. */
  identity?: UserAssignedIdentity;
  /** Name of the login designated as the first password based administrator assigned to your instance of PostgreSQL. Must be specified the first time that you enable password based authentication on a server. Once set to a given value, it cannot be changed for the rest of the life of a server. If you disable password based authentication on a server which had it enabled, this password based role isn't deleted. */
  administratorLogin?: string;
  /** Password assigned to the administrator login. As long as password authentication is enabled, this password can be changed at any time. */
  administratorLoginPassword?: string;
  /** Major version of PostgreSQL database engine. */
  version?: PostgresMajorVersion;
  /** Minor version of PostgreSQL database engine. */
  readonly minorVersion?: string;
  /** Possible states of a server. */
  readonly state?: ServerState;
  /** Fully qualified domain name of a server. */
  readonly fullyQualifiedDomainName?: string;
  /** Storage properties of a server. */
  storage?: Storage;
  /** Authentication configuration properties of a server. */
  authConfig?: AuthConfig;
  /** Data encryption properties of a server. */
  dataEncryption?: DataEncryption;
  /** Backup properties of a server. */
  backup?: Backup;
  /** Network properties of a server. Only required if you want your server to be integrated into a virtual network provided by customer. */
  network?: Network;
  /** High availability properties of a server. */
  highAvailability?: HighAvailability;
  /** Maintenance window properties of a server. */
  maintenanceWindow?: MaintenanceWindow;
  /** Identifier of the server to be used as the source of the new server. Required when 'createMode' is 'PointInTimeRestore', 'GeoRestore', 'Replica', or 'ReviveDropped'. This property is returned only when the target server is a read replica. */
  sourceServerResourceId?: string;
  /** Creation time (in ISO8601 format) of the backup which you want to restore in the new server. It's required when 'createMode' is 'PointInTimeRestore', 'GeoRestore', or 'ReviveDropped'. */
  pointInTimeUTC?: Date;
  /** Availability zone of a server. */
  availabilityZone?: string;
  /** Role of the server in a replication set. */
  replicationRole?: ReplicationRole;
  /** Maximum number of read replicas allowed for a server. */
  readonly replicaCapacity?: number;
  /** Read replica properties of a server. Required only in case that you want to promote a server. */
  replica?: Replica;
  /** Creation mode of a new server. */
  createMode?: CreateMode;
  /** List of private endpoint connections associated with the specified server. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Cluster properties of a server. */
  cluster?: Cluster;
}

export function serverSerializer(item: Server): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "administratorLogin",
      "administratorLoginPassword",
      "version",
      "storage",
      "authConfig",
      "dataEncryption",
      "backup",
      "network",
      "highAvailability",
      "maintenanceWindow",
      "sourceServerResourceId",
      "pointInTimeUTC",
      "availabilityZone",
      "replicationRole",
      "replica",
      "createMode",
      "cluster",
    ])
      ? undefined
      : _serverPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : userAssignedIdentitySerializer(item["identity"]),
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
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : userAssignedIdentityDeserializer(item["identity"]),
  };
}

/** Properties of a server. */
export interface ServerProperties {
  /** Name of the login designated as the first password based administrator assigned to your instance of PostgreSQL. Must be specified the first time that you enable password based authentication on a server. Once set to a given value, it cannot be changed for the rest of the life of a server. If you disable password based authentication on a server which had it enabled, this password based role isn't deleted. */
  administratorLogin?: string;
  /** Password assigned to the administrator login. As long as password authentication is enabled, this password can be changed at any time. */
  administratorLoginPassword?: string;
  /** Major version of PostgreSQL database engine. */
  version?: PostgresMajorVersion;
  /** Minor version of PostgreSQL database engine. */
  readonly minorVersion?: string;
  /** Possible states of a server. */
  readonly state?: ServerState;
  /** Fully qualified domain name of a server. */
  readonly fullyQualifiedDomainName?: string;
  /** Storage properties of a server. */
  storage?: Storage;
  /** Authentication configuration properties of a server. */
  authConfig?: AuthConfig;
  /** Data encryption properties of a server. */
  dataEncryption?: DataEncryption;
  /** Backup properties of a server. */
  backup?: Backup;
  /** Network properties of a server. Only required if you want your server to be integrated into a virtual network provided by customer. */
  network?: Network;
  /** High availability properties of a server. */
  highAvailability?: HighAvailability;
  /** Maintenance window properties of a server. */
  maintenanceWindow?: MaintenanceWindow;
  /** Identifier of the server to be used as the source of the new server. Required when 'createMode' is 'PointInTimeRestore', 'GeoRestore', 'Replica', or 'ReviveDropped'. This property is returned only when the target server is a read replica. */
  sourceServerResourceId?: string;
  /** Creation time (in ISO8601 format) of the backup which you want to restore in the new server. It's required when 'createMode' is 'PointInTimeRestore', 'GeoRestore', or 'ReviveDropped'. */
  pointInTimeUTC?: Date;
  /** Availability zone of a server. */
  availabilityZone?: string;
  /** Role of the server in a replication set. */
  replicationRole?: ReplicationRole;
  /** Maximum number of read replicas allowed for a server. */
  readonly replicaCapacity?: number;
  /** Read replica properties of a server. Required only in case that you want to promote a server. */
  replica?: Replica;
  /** Creation mode of a new server. */
  createMode?: CreateMode;
  /** List of private endpoint connections associated with the specified server. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Cluster properties of a server. */
  cluster?: Cluster;
}

export function serverPropertiesSerializer(item: ServerProperties): any {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    storage: !item["storage"] ? item["storage"] : storageSerializer(item["storage"]),
    authConfig: !item["authConfig"] ? item["authConfig"] : authConfigSerializer(item["authConfig"]),
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionSerializer(item["dataEncryption"]),
    backup: !item["backup"] ? item["backup"] : backupSerializer(item["backup"]),
    network: !item["network"] ? item["network"] : networkSerializer(item["network"]),
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilitySerializer(item["highAvailability"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
    sourceServerResourceId: item["sourceServerResourceId"],
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : item["pointInTimeUTC"].toISOString(),
    availabilityZone: item["availabilityZone"],
    replicationRole: item["replicationRole"],
    replica: !item["replica"] ? item["replica"] : replicaSerializer(item["replica"]),
    createMode: item["createMode"],
    cluster: !item["cluster"] ? item["cluster"] : clusterSerializer(item["cluster"]),
  };
}

export function serverPropertiesDeserializer(item: any): ServerProperties {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    minorVersion: item["minorVersion"],
    state: item["state"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    storage: !item["storage"] ? item["storage"] : storageDeserializer(item["storage"]),
    authConfig: !item["authConfig"]
      ? item["authConfig"]
      : authConfigDeserializer(item["authConfig"]),
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionDeserializer(item["dataEncryption"]),
    backup: !item["backup"] ? item["backup"] : backupDeserializer(item["backup"]),
    network: !item["network"] ? item["network"] : networkDeserializer(item["network"]),
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilityDeserializer(item["highAvailability"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowDeserializer(item["maintenanceWindow"]),
    sourceServerResourceId: item["sourceServerResourceId"],
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : new Date(item["pointInTimeUTC"]),
    availabilityZone: item["availabilityZone"],
    replicationRole: item["replicationRole"],
    replicaCapacity: item["replicaCapacity"],
    replica: !item["replica"] ? item["replica"] : replicaDeserializer(item["replica"]),
    createMode: item["createMode"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    cluster: !item["cluster"] ? item["cluster"] : clusterDeserializer(item["cluster"]),
  };
}

/** Major version of PostgreSQL database engine. */
export enum KnownPostgresMajorVersion {
  /** 18 */
  Eighteen = "18",
  /** 17 */
  Seventeen = "17",
  /** 16 */
  Sixteen = "16",
  /** 15 */
  Fifteen = "15",
  /** 14 */
  Fourteen = "14",
  /** 13 */
  Thirteen = "13",
  /** 12 */
  Twelve = "12",
  /** 11 */
  Eleven = "11",
}

/**
 * Major version of PostgreSQL database engine. \
 * {@link KnownPostgresMajorVersion} can be used interchangeably with PostgresMajorVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **18** \
 * **17** \
 * **16** \
 * **15** \
 * **14** \
 * **13** \
 * **12** \
 * **11**
 */
export type PostgresMajorVersion = string;

/** Possible states of a server. */
export enum KnownServerState {
  /** Ready */
  Ready = "Ready",
  /** Dropping */
  Dropping = "Dropping",
  /** Disabled */
  Disabled = "Disabled",
  /** Starting */
  Starting = "Starting",
  /** Stopping */
  Stopping = "Stopping",
  /** Stopped */
  Stopped = "Stopped",
  /** Updating */
  Updating = "Updating",
  /** Restarting */
  Restarting = "Restarting",
  /** Inaccessible */
  Inaccessible = "Inaccessible",
  /** Provisioning */
  Provisioning = "Provisioning",
}

/**
 * Possible states of a server. \
 * {@link KnownServerState} can be used interchangeably with ServerState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready** \
 * **Dropping** \
 * **Disabled** \
 * **Starting** \
 * **Stopping** \
 * **Stopped** \
 * **Updating** \
 * **Restarting** \
 * **Inaccessible** \
 * **Provisioning**
 */
export type ServerState = string;

/** Storage properties of a server. */
export interface Storage {
  /** Size of storage assigned to a server. */
  storageSizeGB?: number;
  /** Flag to enable or disable the automatic growth of storage size of a server when available space is nearing zero and conditions allow for automatically growing storage size. */
  autoGrow?: StorageAutoGrow;
  /** Storage tier of a server. */
  tier?: AzureManagedDiskPerformanceTier;
  /** Maximum IOPS supported for storage. Required when type of storage is PremiumV2_LRS or UltraSSD_LRS. */
  iops?: number;
  /** Maximum throughput supported for storage. Required when type of storage is PremiumV2_LRS or UltraSSD_LRS. */
  throughput?: number;
  /** Type of storage assigned to a server. Allowed values are Premium_LRS, PremiumV2_LRS, or UltraSSD_LRS. If not specified, it defaults to Premium_LRS. */
  type?: StorageType;
}

export function storageSerializer(item: Storage): any {
  return {
    storageSizeGB: item["storageSizeGB"],
    autoGrow: item["autoGrow"],
    tier: item["tier"],
    iops: item["iops"],
    throughput: item["throughput"],
    type: item["type"],
  };
}

export function storageDeserializer(item: any): Storage {
  return {
    storageSizeGB: item["storageSizeGB"],
    autoGrow: item["autoGrow"],
    tier: item["tier"],
    iops: item["iops"],
    throughput: item["throughput"],
    type: item["type"],
  };
}

/** Flag to enable or disable the automatic growth of storage size of a server when available space is nearing zero and conditions allow for automatically growing storage size. */
export enum KnownStorageAutoGrow {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Flag to enable or disable the automatic growth of storage size of a server when available space is nearing zero and conditions allow for automatically growing storage size. \
 * {@link KnownStorageAutoGrow} can be used interchangeably with StorageAutoGrow,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type StorageAutoGrow = string;

/** Storage tier of a server. */
export enum KnownAzureManagedDiskPerformanceTier {
  /** P1 */
  P1 = "P1",
  /** P2 */
  P2 = "P2",
  /** P3 */
  P3 = "P3",
  /** P4 */
  P4 = "P4",
  /** P6 */
  P6 = "P6",
  /** P10 */
  P10 = "P10",
  /** P15 */
  P15 = "P15",
  /** P20 */
  P20 = "P20",
  /** P30 */
  P30 = "P30",
  /** P40 */
  P40 = "P40",
  /** P50 */
  P50 = "P50",
  /** P60 */
  P60 = "P60",
  /** P70 */
  P70 = "P70",
  /** P80 */
  P80 = "P80",
}

/**
 * Storage tier of a server. \
 * {@link KnownAzureManagedDiskPerformanceTier} can be used interchangeably with AzureManagedDiskPerformanceTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P1** \
 * **P2** \
 * **P3** \
 * **P4** \
 * **P6** \
 * **P10** \
 * **P15** \
 * **P20** \
 * **P30** \
 * **P40** \
 * **P50** \
 * **P60** \
 * **P70** \
 * **P80**
 */
export type AzureManagedDiskPerformanceTier = string;

/** Type of storage assigned to a server. Allowed values are Premium_LRS, PremiumV2_LRS, or UltraSSD_LRS. If not specified, it defaults to Premium_LRS. */
export enum KnownStorageType {
  /** Premium_LRS */
  PremiumLRS = "Premium_LRS",
  /** PremiumV2_LRS */
  PremiumV2LRS = "PremiumV2_LRS",
  /** UltraSSD_LRS */
  UltraSSDLRS = "UltraSSD_LRS",
}

/**
 * Type of storage assigned to a server. Allowed values are Premium_LRS, PremiumV2_LRS, or UltraSSD_LRS. If not specified, it defaults to Premium_LRS. \
 * {@link KnownStorageType} can be used interchangeably with StorageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Premium_LRS** \
 * **PremiumV2_LRS** \
 * **UltraSSD_LRS**
 */
export type StorageType = string;

/** Authentication configuration properties of a server. */
export interface AuthConfig {
  /** Indicates if the server supports Microsoft Entra authentication. */
  activeDirectoryAuth?: MicrosoftEntraAuth;
  /** Indicates if the server supports password based authentication. */
  passwordAuth?: PasswordBasedAuth;
  /** Identifier of the tenant of the delegated resource. */
  tenantId?: string;
}

export function authConfigSerializer(item: AuthConfig): any {
  return {
    activeDirectoryAuth: item["activeDirectoryAuth"],
    passwordAuth: item["passwordAuth"],
    tenantId: item["tenantId"],
  };
}

export function authConfigDeserializer(item: any): AuthConfig {
  return {
    activeDirectoryAuth: item["activeDirectoryAuth"],
    passwordAuth: item["passwordAuth"],
    tenantId: item["tenantId"],
  };
}

/** Indicates if the server supports Microsoft Entra authentication. */
export enum KnownMicrosoftEntraAuth {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if the server supports Microsoft Entra authentication. \
 * {@link KnownMicrosoftEntraAuth} can be used interchangeably with MicrosoftEntraAuth,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type MicrosoftEntraAuth = string;

/** Indicates if the server supports password based authentication. */
export enum KnownPasswordBasedAuth {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if the server supports password based authentication. \
 * {@link KnownPasswordBasedAuth} can be used interchangeably with PasswordBasedAuth,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PasswordBasedAuth = string;

/** Data encryption properties of a server. */
export interface DataEncryption {
  /** URI of the key in Azure Key Vault used for data encryption of the primary storage associated to a server. */
  primaryKeyURI?: string;
  /** Identifier of the user assigned managed identity used to access the key in Azure Key Vault for data encryption of the primary storage associated to a server. */
  primaryUserAssignedIdentityId?: string;
  /** Identifier of the user assigned managed identity used to access the key in Azure Key Vault for data encryption of the geographically redundant storage associated to a server that is configured to support geographically redundant backups. */
  geoBackupKeyURI?: string;
  /** Identifier of the user assigned managed identity used to access the key in Azure Key Vault for data encryption of the geographically redundant storage associated to a server that is configured to support geographically redundant backups. */
  geoBackupUserAssignedIdentityId?: string;
  /** Data encryption type used by a server. */
  type?: DataEncryptionType;
  /** Status of key used by a server configured with data encryption based on customer managed key, to encrypt the primary storage associated to the server. */
  readonly primaryEncryptionKeyStatus?: EncryptionKeyStatus;
  /** Status of key used by a server configured with data encryption based on customer managed key, to encrypt the geographically redundant storage associated to the server when it is configured to support geographically redundant backups. */
  readonly geoBackupEncryptionKeyStatus?: EncryptionKeyStatus;
}

export function dataEncryptionSerializer(item: DataEncryption): any {
  return {
    primaryKeyURI: item["primaryKeyURI"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    geoBackupKeyURI: item["geoBackupKeyURI"],
    geoBackupUserAssignedIdentityId: item["geoBackupUserAssignedIdentityId"],
    type: item["type"],
  };
}

export function dataEncryptionDeserializer(item: any): DataEncryption {
  return {
    primaryKeyURI: item["primaryKeyURI"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    geoBackupKeyURI: item["geoBackupKeyURI"],
    geoBackupUserAssignedIdentityId: item["geoBackupUserAssignedIdentityId"],
    type: item["type"],
    primaryEncryptionKeyStatus: item["primaryEncryptionKeyStatus"],
    geoBackupEncryptionKeyStatus: item["geoBackupEncryptionKeyStatus"],
  };
}

/** Data encryption type used by a server. */
export enum KnownDataEncryptionType {
  /** SystemManaged */
  SystemManaged = "SystemManaged",
  /** AzureKeyVault */
  AzureKeyVault = "AzureKeyVault",
}

/**
 * Data encryption type used by a server. \
 * {@link KnownDataEncryptionType} can be used interchangeably with DataEncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemManaged** \
 * **AzureKeyVault**
 */
export type DataEncryptionType = string;

/** Status of key used by a server configured with data encryption based on customer managed key, to encrypt the primary storage associated to the server. */
export enum KnownEncryptionKeyStatus {
  /** Valid */
  Valid = "Valid",
  /** Invalid */
  Invalid = "Invalid",
}

/**
 * Status of key used by a server configured with data encryption based on customer managed key, to encrypt the primary storage associated to the server. \
 * {@link KnownEncryptionKeyStatus} can be used interchangeably with EncryptionKeyStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Valid** \
 * **Invalid**
 */
export type EncryptionKeyStatus = string;

/** Backup properties of a server. */
export interface Backup {
  /** Backup retention days for the server. */
  backupRetentionDays?: number;
  /** Indicates if the server is configured to create geographically redundant backups. */
  geoRedundantBackup?: GeographicallyRedundantBackup;
  /** Earliest restore point time (ISO8601 format) for a server. */
  readonly earliestRestoreDate?: Date;
}

export function backupSerializer(item: Backup): any {
  return {
    backupRetentionDays: item["backupRetentionDays"],
    geoRedundantBackup: item["geoRedundantBackup"],
  };
}

export function backupDeserializer(item: any): Backup {
  return {
    backupRetentionDays: item["backupRetentionDays"],
    geoRedundantBackup: item["geoRedundantBackup"],
    earliestRestoreDate: !item["earliestRestoreDate"]
      ? item["earliestRestoreDate"]
      : new Date(item["earliestRestoreDate"]),
  };
}

/** Indicates if the server is configured to create geographically redundant backups. */
export enum KnownGeographicallyRedundantBackup {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if the server is configured to create geographically redundant backups. \
 * {@link KnownGeographicallyRedundantBackup} can be used interchangeably with GeographicallyRedundantBackup,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type GeographicallyRedundantBackup = string;

/** Network properties of a server. */
export interface Network {
  /** Indicates if public network access is enabled or not. This is only supported for servers that are not integrated into a virtual network which is owned and provided by customer when server is deployed. */
  publicNetworkAccess?: ServerPublicNetworkAccessState;
  /** Resource identifier of the delegated subnet. Required during creation of a new server, in case you want the server to be integrated into your own virtual network. For an update operation, you only have to provide this property if you want to change the value assigned for the private DNS zone. */
  delegatedSubnetResourceId?: string;
  /** Identifier of the private DNS zone. Required during creation of a new server, in case you want the server to be integrated into your own virtual network. For an update operation, you only have to provide this property if you want to change the value assigned for the private DNS zone. */
  privateDnsZoneArmResourceId?: string;
}

export function networkSerializer(item: Network): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    delegatedSubnetResourceId: item["delegatedSubnetResourceId"],
    privateDnsZoneArmResourceId: item["privateDnsZoneArmResourceId"],
  };
}

export function networkDeserializer(item: any): Network {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    delegatedSubnetResourceId: item["delegatedSubnetResourceId"],
    privateDnsZoneArmResourceId: item["privateDnsZoneArmResourceId"],
  };
}

/** Indicates if public network access is enabled or not. */
export enum KnownServerPublicNetworkAccessState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if public network access is enabled or not. \
 * {@link KnownServerPublicNetworkAccessState} can be used interchangeably with ServerPublicNetworkAccessState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type ServerPublicNetworkAccessState = string;

/** High availability properties of a server. */
export interface HighAvailability {
  /** High availability mode for a server. */
  mode?: PostgreSqlFlexibleServerHighAvailabilityMode;
  /** Possible states of the standby server created when high availability is set to SameZone or ZoneRedundant. */
  readonly state?: HighAvailabilityState;
  /** Availability zone associated to the standby server created when high availability is set to SameZone or ZoneRedundant. */
  standbyAvailabilityZone?: string;
}

export function highAvailabilitySerializer(item: HighAvailability): any {
  return { mode: item["mode"], standbyAvailabilityZone: item["standbyAvailabilityZone"] };
}

export function highAvailabilityDeserializer(item: any): HighAvailability {
  return {
    mode: item["mode"],
    state: item["state"],
    standbyAvailabilityZone: item["standbyAvailabilityZone"],
  };
}

/** Modes of high availability supported for this compute. */
export enum KnownPostgreSqlFlexibleServerHighAvailabilityMode {
  /** Disabled */
  Disabled = "Disabled",
  /** ZoneRedundant */
  ZoneRedundant = "ZoneRedundant",
  /** SameZone */
  SameZone = "SameZone",
}

/**
 * Modes of high availability supported for this compute. \
 * {@link KnownPostgreSqlFlexibleServerHighAvailabilityMode} can be used interchangeably with PostgreSqlFlexibleServerHighAvailabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **ZoneRedundant** \
 * **SameZone**
 */
export type PostgreSqlFlexibleServerHighAvailabilityMode = string;

/** Possible states of the standby server created when high availability is set to SameZone or ZoneRedundant. */
export enum KnownHighAvailabilityState {
  /** NotEnabled */
  NotEnabled = "NotEnabled",
  /** CreatingStandby */
  CreatingStandby = "CreatingStandby",
  /** ReplicatingData */
  ReplicatingData = "ReplicatingData",
  /** FailingOver */
  FailingOver = "FailingOver",
  /** Healthy */
  Healthy = "Healthy",
  /** RemovingStandby */
  RemovingStandby = "RemovingStandby",
}

/**
 * Possible states of the standby server created when high availability is set to SameZone or ZoneRedundant. \
 * {@link KnownHighAvailabilityState} can be used interchangeably with HighAvailabilityState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotEnabled** \
 * **CreatingStandby** \
 * **ReplicatingData** \
 * **FailingOver** \
 * **Healthy** \
 * **RemovingStandby**
 */
export type HighAvailabilityState = string;

/** Maintenance window properties of a server. */
export interface MaintenanceWindow {
  /** Indicates whether custom window is enabled or disabled. */
  customWindow?: string;
  /** Start hour to be used for maintenance window. */
  startHour?: number;
  /** Start minute to be used for maintenance window. */
  startMinute?: number;
  /** Day of the week to be used for maintenance window. */
  dayOfWeek?: number;
}

export function maintenanceWindowSerializer(item: MaintenanceWindow): any {
  return {
    customWindow: item["customWindow"],
    startHour: item["startHour"],
    startMinute: item["startMinute"],
    dayOfWeek: item["dayOfWeek"],
  };
}

export function maintenanceWindowDeserializer(item: any): MaintenanceWindow {
  return {
    customWindow: item["customWindow"],
    startHour: item["startHour"],
    startMinute: item["startMinute"],
    dayOfWeek: item["dayOfWeek"],
  };
}

/** Role of the server in a replication set. */
export enum KnownReplicationRole {
  /** None */
  None = "None",
  /** Primary */
  Primary = "Primary",
  /** AsyncReplica */
  AsyncReplica = "AsyncReplica",
  /** GeoAsyncReplica */
  GeoAsyncReplica = "GeoAsyncReplica",
}

/**
 * Role of the server in a replication set. \
 * {@link KnownReplicationRole} can be used interchangeably with ReplicationRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Primary** \
 * **AsyncReplica** \
 * **GeoAsyncReplica**
 */
export type ReplicationRole = string;

/** Replica properties of a server. */
export interface Replica {
  /** Role of the server in a replication set. */
  role?: ReplicationRole;
  /** Maximum number of read replicas allowed for a server. */
  readonly capacity?: number;
  /** Indicates the replication state of a read replica. This property is returned only when the target server is a read replica. Possible  values are Active, Broken, Catchup, Provisioning, Reconfiguring, and Updating */
  readonly replicationState?: ReplicationState;
  /** Type of operation to apply on the read replica. This property is write only. Standalone means that the read replica will be promoted to a standalone server, and will become a completely independent entity from the replication set. Switchover means that the read replica will roles with the primary server. */
  promoteMode?: ReadReplicaPromoteMode;
  /** Data synchronization option to use when processing the operation specified in the promoteMode property. This property is write only. */
  promoteOption?: ReadReplicaPromoteOption;
}

export function replicaSerializer(item: Replica): any {
  return {
    role: item["role"],
    promoteMode: item["promoteMode"],
    promoteOption: item["promoteOption"],
  };
}

export function replicaDeserializer(item: any): Replica {
  return {
    role: item["role"],
    capacity: item["capacity"],
    replicationState: item["replicationState"],
    promoteMode: item["promoteMode"],
    promoteOption: item["promoteOption"],
  };
}

/** Indicates the replication state of a read replica. This property is returned only when the target server is a read replica. Possible  values are Active, Broken, Catchup, Provisioning, Reconfiguring, and Updating */
export enum KnownReplicationState {
  /** The read replica server is fully synchronized and actively replicating data from the primary server. */
  Active = "Active",
  /** The read replica server is behind the primary server and is currently catching up with pending changes. */
  Catchup = "Catchup",
  /** The read replica server is being created and is in process of getting initialized. */
  Provisioning = "Provisioning",
  /** The read replica server is undergoing some changes it can be changing compute size of promoting it to primary server. */
  Updating = "Updating",
  /** Replication has failed or been interrupted. */
  Broken = "Broken",
  /** The read replica server is being reconfigured, possibly due to changes in source or settings. */
  Reconfiguring = "Reconfiguring",
}

/**
 * Indicates the replication state of a read replica. This property is returned only when the target server is a read replica. Possible  values are Active, Broken, Catchup, Provisioning, Reconfiguring, and Updating \
 * {@link KnownReplicationState} can be used interchangeably with ReplicationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: The read replica server is fully synchronized and actively replicating data from the primary server. \
 * **Catchup**: The read replica server is behind the primary server and is currently catching up with pending changes. \
 * **Provisioning**: The read replica server is being created and is in process of getting initialized. \
 * **Updating**: The read replica server is undergoing some changes it can be changing compute size of promoting it to primary server. \
 * **Broken**: Replication has failed or been interrupted. \
 * **Reconfiguring**: The read replica server is being reconfigured, possibly due to changes in source or settings.
 */
export type ReplicationState = string;

/** Type of operation to apply on the read replica. This property is write only. Standalone means that the read replica will be promoted to a standalone server, and will become a completely independent entity from the replication set. Switchover means that the read replica will roles with the primary server. */
export enum KnownReadReplicaPromoteMode {
  /** Read replica will become an independent server. */
  Standalone = "Standalone",
  /** Read replica will swap roles with primary server. */
  Switchover = "Switchover",
}

/**
 * Type of operation to apply on the read replica. This property is write only. Standalone means that the read replica will be promoted to a standalone server, and will become a completely independent entity from the replication set. Switchover means that the read replica will roles with the primary server. \
 * {@link KnownReadReplicaPromoteMode} can be used interchangeably with ReadReplicaPromoteMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standalone**: Read replica will become an independent server. \
 * **Switchover**: Read replica will swap roles with primary server.
 */
export type ReadReplicaPromoteMode = string;

/** Data synchronization option to use when processing the operation specified in the promoteMode property. This property is write only. */
export enum KnownReadReplicaPromoteOption {
  /** The operation will wait for data in the read replica to be fully synchronized with its source server, before it initiates the operation. */
  Planned = "Planned",
  /** The operation will not wait for data in the read replica to be synchronized with its source server, before it initiates the operation. */
  Forced = "Forced",
}

/**
 * Data synchronization option to use when processing the operation specified in the promoteMode property. This property is write only. \
 * {@link KnownReadReplicaPromoteOption} can be used interchangeably with ReadReplicaPromoteOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Planned**: The operation will wait for data in the read replica to be fully synchronized with its source server, before it initiates the operation. \
 * **Forced**: The operation will not wait for data in the read replica to be synchronized with its source server, before it initiates the operation.
 */
export type ReadReplicaPromoteOption = string;

/** Creation mode of a new server. */
export enum KnownCreateMode {
  /** Default */
  Default = "Default",
  /** Create */
  Create = "Create",
  /** Update */
  Update = "Update",
  /** PointInTimeRestore */
  PointInTimeRestore = "PointInTimeRestore",
  /** GeoRestore */
  GeoRestore = "GeoRestore",
  /** Replica */
  Replica = "Replica",
  /** ReviveDropped */
  ReviveDropped = "ReviveDropped",
}

/**
 * Creation mode of a new server. \
 * {@link KnownCreateMode} can be used interchangeably with CreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **Create** \
 * **Update** \
 * **PointInTimeRestore** \
 * **GeoRestore** \
 * **Replica** \
 * **ReviveDropped**
 */
export type CreateMode = string;

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

/** The private endpoint connection resource. */
export interface PrivateEndpointConnection extends Resource {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
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
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier of the private endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return item;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Connection waiting for approval or rejection */
  Pending = "Pending",
  /** Connection approved */
  Approved = "Approved",
  /** Connection Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Connection has been provisioned */
  Succeeded = "Succeeded",
  /** Connection is being created */
  Creating = "Creating",
  /** Connection is being deleted */
  Deleting = "Deleting",
  /** Connection provisioning has failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Connection has been provisioned \
 * **Creating**: Connection is being created \
 * **Deleting**: Connection is being deleted \
 * **Failed**: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Cluster properties of a server. */
export interface Cluster {
  /** Number of nodes assigned to the elastic cluster. */
  clusterSize?: number;
  /** Default database name for the elastic cluster. */
  defaultDatabaseName?: string;
}

export function clusterSerializer(item: Cluster): any {
  return { clusterSize: item["clusterSize"], defaultDatabaseName: item["defaultDatabaseName"] };
}

export function clusterDeserializer(item: any): Cluster {
  return {
    clusterSize: item["clusterSize"],
    defaultDatabaseName: item["defaultDatabaseName"],
  };
}

/** Compute information of a server. */
export interface Sku {
  /** Name by which is known a given compute size assigned to a server. */
  name: string;
  /** Tier of the compute assigned to a server. */
  tier: SkuTier;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"], tier: item["tier"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** Identities associated with a server. */
export interface UserAssignedIdentity {
  /** Map of user assigned managed identities. */
  userAssignedIdentities?: Record<string, UserIdentity>;
  /** Identifier of the object of the service principal associated to the user assigned managed identity. */
  principalId?: string;
  /** Types of identities associated with a server. */
  type: IdentityType;
  /** Identifier of the tenant of a server. */
  readonly tenantId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return {
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityRecordSerializer(item["userAssignedIdentities"]),
    principalId: item["principalId"],
    type: item["type"],
  };
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
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

/** User assigned managed identity associated with a server. */
export interface UserIdentity {
  /** Identifier of the object of the service principal associated to the user assigned managed identity. */
  principalId?: string;
  /** Identifier of the client of the service principal associated to the user assigned managed identity. */
  clientId?: string;
}

export function userIdentitySerializer(item: UserIdentity): any {
  return { principalId: item["principalId"], clientId: item["clientId"] };
}

export function userIdentityDeserializer(item: any): UserIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Types of identities associated with a server. */
export enum KnownIdentityType {
  /** None */
  None = "None",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** SystemAssigned,UserAssigned */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Types of identities associated with a server. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **UserAssigned** \
 * **SystemAssigned** \
 * **SystemAssigned,UserAssigned**
 */
export type IdentityType = string;

/** Represents a server to be updated. */
export interface ServerForPatch {
  /** Compute tier and size of a server. */
  sku?: SkuForPatch;
  /** Describes the identity of the application. */
  identity?: UserAssignedIdentity;
  /** Application-specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Name of the login designated as the first password based administrator assigned to your instance of PostgreSQL. Must be specified the first time that you enable password based authentication on a server. Once set to a given value, it cannot be changed for the rest of the life of a server. If you disable password based authentication on a server which had it enabled, this password based role isn't deleted. */
  readonly administratorLogin?: string;
  /** Password assigned to the administrator login. As long as password authentication is enabled, this password can be changed at any time. */
  administratorLoginPassword?: string;
  /** Major version of PostgreSQL database engine. */
  version?: PostgresMajorVersion;
  /** Storage properties of a server. */
  storage?: Storage;
  /** Backup properties of a server. */
  backup?: BackupForPatch;
  /** High availability properties of a server. */
  highAvailability?: HighAvailabilityForPatch;
  /** Maintenance window properties of a server. */
  maintenanceWindow?: MaintenanceWindowForPatch;
  /** Authentication configuration properties of a server. */
  authConfig?: AuthConfigForPatch;
  /** Data encryption properties of a server. */
  dataEncryption?: DataEncryption;
  /** Availability zone of a server. */
  availabilityZone?: string;
  /** Update mode of an existing server. */
  createMode?: CreateModeForPatch;
  /** Role of the server in a replication set. */
  replicationRole?: ReplicationRole;
  /** Read replica properties of a server. Required only in case that you want to promote a server. */
  replica?: Replica;
  /** Network properties of a server. Only required if you want your server to be integrated into a virtual network provided by customer. */
  network?: Network;
  /** Cluster properties of a server. */
  cluster?: Cluster;
}

export function serverForPatchSerializer(item: ServerForPatch): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuForPatchSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : userAssignedIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "administratorLoginPassword",
      "version",
      "storage",
      "backup",
      "highAvailability",
      "maintenanceWindow",
      "authConfig",
      "dataEncryption",
      "availabilityZone",
      "createMode",
      "replicationRole",
      "replica",
      "network",
      "cluster",
    ])
      ? undefined
      : _serverForPatchPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Compute information of a server. */
export interface SkuForPatch {
  /** Name by which is known a given compute size assigned to a server. */
  name?: string;
  /** Tier of the compute assigned to a server. */
  tier?: SkuTier;
}

export function skuForPatchSerializer(item: SkuForPatch): any {
  return { name: item["name"], tier: item["tier"] };
}

/** Properties of a server. */
export interface ServerPropertiesForPatch {
  /** Name of the login designated as the first password based administrator assigned to your instance of PostgreSQL. Must be specified the first time that you enable password based authentication on a server. Once set to a given value, it cannot be changed for the rest of the life of a server. If you disable password based authentication on a server which had it enabled, this password based role isn't deleted. */
  readonly administratorLogin?: string;
  /** Password assigned to the administrator login. As long as password authentication is enabled, this password can be changed at any time. */
  administratorLoginPassword?: string;
  /** Major version of PostgreSQL database engine. */
  version?: PostgresMajorVersion;
  /** Storage properties of a server. */
  storage?: Storage;
  /** Backup properties of a server. */
  backup?: BackupForPatch;
  /** High availability properties of a server. */
  highAvailability?: HighAvailabilityForPatch;
  /** Maintenance window properties of a server. */
  maintenanceWindow?: MaintenanceWindowForPatch;
  /** Authentication configuration properties of a server. */
  authConfig?: AuthConfigForPatch;
  /** Data encryption properties of a server. */
  dataEncryption?: DataEncryption;
  /** Availability zone of a server. */
  availabilityZone?: string;
  /** Update mode of an existing server. */
  createMode?: CreateModeForPatch;
  /** Role of the server in a replication set. */
  replicationRole?: ReplicationRole;
  /** Read replica properties of a server. Required only in case that you want to promote a server. */
  replica?: Replica;
  /** Network properties of a server. Only required if you want your server to be integrated into a virtual network provided by customer. */
  network?: Network;
  /** Cluster properties of a server. */
  cluster?: Cluster;
}

export function serverPropertiesForPatchSerializer(item: ServerPropertiesForPatch): any {
  return {
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    storage: !item["storage"] ? item["storage"] : storageSerializer(item["storage"]),
    backup: !item["backup"] ? item["backup"] : backupForPatchSerializer(item["backup"]),
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilityForPatchSerializer(item["highAvailability"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowForPatchSerializer(item["maintenanceWindow"]),
    authConfig: !item["authConfig"]
      ? item["authConfig"]
      : authConfigForPatchSerializer(item["authConfig"]),
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionSerializer(item["dataEncryption"]),
    availabilityZone: item["availabilityZone"],
    createMode: item["createMode"],
    replicationRole: item["replicationRole"],
    replica: !item["replica"] ? item["replica"] : replicaSerializer(item["replica"]),
    network: !item["network"] ? item["network"] : networkSerializer(item["network"]),
    cluster: !item["cluster"] ? item["cluster"] : clusterSerializer(item["cluster"]),
  };
}

/** Backup properties of a server. */
export interface BackupForPatch {
  /** Backup retention days for the server. */
  backupRetentionDays?: number;
  /** Indicates if the server is configured to create geographically redundant backups. */
  readonly geoRedundantBackup?: GeographicallyRedundantBackup;
  /** Earliest restore point time (ISO8601 format) for a server. */
  readonly earliestRestoreDate?: Date;
}

export function backupForPatchSerializer(item: BackupForPatch): any {
  return { backupRetentionDays: item["backupRetentionDays"] };
}

/** High availability properties of a server. */
export interface HighAvailabilityForPatch {
  /** High availability mode for a server. */
  mode?: PostgreSqlFlexibleServerHighAvailabilityMode;
  /** Possible states of the standby server created when high availability is set to SameZone or ZoneRedundant. */
  readonly state?: HighAvailabilityState;
  /** Availability zone associated to the standby server created when high availability is set to SameZone or ZoneRedundant. */
  standbyAvailabilityZone?: string;
}

export function highAvailabilityForPatchSerializer(item: HighAvailabilityForPatch): any {
  return { mode: item["mode"], standbyAvailabilityZone: item["standbyAvailabilityZone"] };
}

/** Maintenance window properties of a server. */
export interface MaintenanceWindowForPatch {
  /** Indicates whether custom window is enabled or disabled. */
  customWindow?: string;
  /** Start hour to be used for maintenance window. */
  startHour?: number;
  /** Start minute to be used for maintenance window. */
  startMinute?: number;
  /** Day of the week to be used for maintenance window. */
  dayOfWeek?: number;
}

export function maintenanceWindowForPatchSerializer(item: MaintenanceWindowForPatch): any {
  return {
    customWindow: item["customWindow"],
    startHour: item["startHour"],
    startMinute: item["startMinute"],
    dayOfWeek: item["dayOfWeek"],
  };
}

/** Authentication configuration properties of a server. */
export interface AuthConfigForPatch {
  /** Indicates if the server supports Microsoft Entra authentication. */
  activeDirectoryAuth?: MicrosoftEntraAuth;
  /** Indicates if the server supports password based authentication. */
  passwordAuth?: PasswordBasedAuth;
  /** Identifier of the tenant of the delegated resource. */
  tenantId?: string;
}

export function authConfigForPatchSerializer(item: AuthConfigForPatch): any {
  return {
    activeDirectoryAuth: item["activeDirectoryAuth"],
    passwordAuth: item["passwordAuth"],
    tenantId: item["tenantId"],
  };
}

/** Update mode of an existing server. */
export enum KnownCreateModeForPatch {
  /** Default */
  Default = "Default",
  /** Update */
  Update = "Update",
}

/**
 * Update mode of an existing server. \
 * {@link KnownCreateModeForPatch} can be used interchangeably with CreateModeForPatch,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **Update**
 */
export type CreateModeForPatch = string;

/** A list of servers. */
export interface _ServerList {
  /** The Server items on this page */
  value: Server[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverListDeserializer(item: any): _ServerList {
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

/** PostgreSQL database engine restart parameters. */
export interface RestartParameter {
  /** Indicates if restart the PostgreSQL database engine should failover or switch over from primary to standby. This only works if server has high availability enabled. */
  restartWithFailover?: boolean;
  /** Failover mode. */
  failoverMode?: FailoverMode;
}

export function restartParameterSerializer(item: RestartParameter): any {
  return { restartWithFailover: item["restartWithFailover"], failoverMode: item["failoverMode"] };
}

/** Failover mode. */
export enum KnownFailoverMode {
  /** PlannedFailover */
  PlannedFailover = "PlannedFailover",
  /** ForcedFailover */
  ForcedFailover = "ForcedFailover",
  /** PlannedSwitchover */
  PlannedSwitchover = "PlannedSwitchover",
  /** ForcedSwitchover */
  ForcedSwitchover = "ForcedSwitchover",
}

/**
 * Failover mode. \
 * {@link KnownFailoverMode} can be used interchangeably with FailoverMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PlannedFailover** \
 * **ForcedFailover** \
 * **PlannedSwitchover** \
 * **ForcedSwitchover**
 */
export type FailoverMode = string;

/** The status of a network migration operation. */
export interface MigrateNetworkStatus {
  /** The ID of the subscription. */
  subscriptionId?: string;
  /** The name of the resource group. */
  resourceGroupName?: string;
  /** The name of the server. */
  serverName?: string;
  /** The state of the network migration operation. */
  readonly state?: NetworkMigrationState;
}

export function migrateNetworkStatusDeserializer(item: any): MigrateNetworkStatus {
  return {
    subscriptionId: item["subscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    serverName: item["serverName"],
    state: item["state"],
  };
}

/** The state of the network migration operation. */
export enum KnownNetworkMigrationState {
  /** The network migration is pending. */
  Pending = "Pending",
  /** The network migration is in progress. */
  InProgress = "InProgress",
  /** The network migration succeeded. */
  Succeeded = "Succeeded",
  /** The network migration failed. */
  Failed = "Failed",
  /** The network migration cancellation is in progress. */
  CancelInProgress = "CancelInProgress",
  /** The network migration was cancelled. */
  Cancelled = "Cancelled",
}

/**
 * The state of the network migration operation. \
 * {@link KnownNetworkMigrationState} can be used interchangeably with NetworkMigrationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: The network migration is pending. \
 * **InProgress**: The network migration is in progress. \
 * **Succeeded**: The network migration succeeded. \
 * **Failed**: The network migration failed. \
 * **CancelInProgress**: The network migration cancellation is in progress. \
 * **Cancelled**: The network migration was cancelled.
 */
export type NetworkMigrationState = string;

/** Configuration (also known as server parameter). */
export interface Configuration extends ProxyResource {
  /** Value of the configuration (also known as server parameter). Required to update the value assigned to a specific modifiable configuration. */
  value?: string;
  /** Description of the configuration (also known as server parameter). */
  readonly description?: string;
  /** Value assigned by default to the configuration (also known as server parameter). */
  readonly defaultValue?: string;
  /** Data type of the configuration (also known as server parameter). */
  readonly dataType?: ConfigurationDataType;
  /** Allowed values of the configuration (also known as server parameter). */
  readonly allowedValues?: string;
  /** Source of the value assigned to the configuration (also known as server parameter). Required to update the value assigned to a specific modifiable configuration. */
  source?: string;
  /** Indicates if it's a dynamic (true) or static (false) configuration (also known as server parameter). Static server parameters require a server restart after changing the value assigned to them, for the change to take effect. Dynamic server parameters do not require a server restart after changing the value assigned to them, for the change to take effect. */
  readonly isDynamicConfig?: boolean;
  /** Indicates if it's a read-only (true) or modifiable (false) configuration (also known as server parameter). */
  readonly isReadOnly?: boolean;
  /** Indicates if the value assigned to the configuration (also known as server parameter) is pending a server restart for it to take effect. */
  readonly isConfigPendingRestart?: boolean;
  /** Units in which the configuration (also known as server parameter) value is expressed. */
  readonly unit?: string;
  /** Link pointing to the documentation of the configuration (also known as server parameter). */
  readonly documentationLink?: string;
}

export function configurationDeserializer(item: any): Configuration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _configurationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a configuration (also known as server parameter). */
export interface ConfigurationProperties {
  /** Value of the configuration (also known as server parameter). Required to update the value assigned to a specific modifiable configuration. */
  value?: string;
  /** Description of the configuration (also known as server parameter). */
  readonly description?: string;
  /** Value assigned by default to the configuration (also known as server parameter). */
  readonly defaultValue?: string;
  /** Data type of the configuration (also known as server parameter). */
  readonly dataType?: ConfigurationDataType;
  /** Allowed values of the configuration (also known as server parameter). */
  readonly allowedValues?: string;
  /** Source of the value assigned to the configuration (also known as server parameter). Required to update the value assigned to a specific modifiable configuration. */
  source?: string;
  /** Indicates if it's a dynamic (true) or static (false) configuration (also known as server parameter). Static server parameters require a server restart after changing the value assigned to them, for the change to take effect. Dynamic server parameters do not require a server restart after changing the value assigned to them, for the change to take effect. */
  readonly isDynamicConfig?: boolean;
  /** Indicates if it's a read-only (true) or modifiable (false) configuration (also known as server parameter). */
  readonly isReadOnly?: boolean;
  /** Indicates if the value assigned to the configuration (also known as server parameter) is pending a server restart for it to take effect. */
  readonly isConfigPendingRestart?: boolean;
  /** Units in which the configuration (also known as server parameter) value is expressed. */
  readonly unit?: string;
  /** Link pointing to the documentation of the configuration (also known as server parameter). */
  readonly documentationLink?: string;
}

export function configurationPropertiesSerializer(item: ConfigurationProperties): any {
  return { value: item["value"], source: item["source"] };
}

export function configurationPropertiesDeserializer(item: any): ConfigurationProperties {
  return {
    value: item["value"],
    description: item["description"],
    defaultValue: item["defaultValue"],
    dataType: item["dataType"],
    allowedValues: item["allowedValues"],
    source: item["source"],
    isDynamicConfig: item["isDynamicConfig"],
    isReadOnly: item["isReadOnly"],
    isConfigPendingRestart: item["isConfigPendingRestart"],
    unit: item["unit"],
    documentationLink: item["documentationLink"],
  };
}

/** Data type of the configuration (also known as server parameter). */
export enum KnownConfigurationDataType {
  /** Boolean */
  Boolean = "Boolean",
  /** Numeric */
  Numeric = "Numeric",
  /** Integer */
  Integer = "Integer",
  /** Enumeration */
  Enumeration = "Enumeration",
  /** String */
  String = "String",
  /** Set */
  Set = "Set",
}

/**
 * Data type of the configuration (also known as server parameter). \
 * {@link KnownConfigurationDataType} can be used interchangeably with ConfigurationDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Boolean** \
 * **Numeric** \
 * **Integer** \
 * **Enumeration** \
 * **String** \
 * **Set**
 */
export type ConfigurationDataType = string;

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

/** Configuration (also known as server parameter). */
export interface ConfigurationForUpdate {
  /** Value of the configuration (also known as server parameter). Required to update the value assigned to a specific modifiable configuration. */
  value?: string;
  /** Description of the configuration (also known as server parameter). */
  readonly description?: string;
  /** Value assigned by default to the configuration (also known as server parameter). */
  readonly defaultValue?: string;
  /** Data type of the configuration (also known as server parameter). */
  readonly dataType?: ConfigurationDataType;
  /** Allowed values of the configuration (also known as server parameter). */
  readonly allowedValues?: string;
  /** Source of the value assigned to the configuration (also known as server parameter). Required to update the value assigned to a specific modifiable configuration. */
  source?: string;
  /** Indicates if it's a dynamic (true) or static (false) configuration (also known as server parameter). Static server parameters require a server restart after changing the value assigned to them, for the change to take effect. Dynamic server parameters do not require a server restart after changing the value assigned to them, for the change to take effect. */
  readonly isDynamicConfig?: boolean;
  /** Indicates if it's a read-only (true) or modifiable (false) configuration (also known as server parameter). */
  readonly isReadOnly?: boolean;
  /** Indicates if the value assigned to the configuration (also known as server parameter) is pending a server restart for it to take effect. */
  readonly isConfigPendingRestart?: boolean;
  /** Units in which the configuration (also known as server parameter) value is expressed. */
  readonly unit?: string;
  /** Link pointing to the documentation of the configuration (also known as server parameter). */
  readonly documentationLink?: string;
}

export function configurationForUpdateSerializer(item: ConfigurationForUpdate): any {
  return {
    properties: areAllPropsUndefined(item, ["value", "source"])
      ? undefined
      : _configurationForUpdatePropertiesSerializer(item),
  };
}

/** List of configurations (also known as server parameters). */
export interface _ConfigurationList {
  /** The Configuration items on this page */
  value: Configuration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _configurationListDeserializer(item: any): _ConfigurationList {
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

/** Represents a database. */
export interface Database extends ProxyResource {
  /** Character set of the database. */
  charset?: string;
  /** Collation of the database. */
  collation?: string;
}

export function databaseSerializer(item: Database): any {
  return {
    properties: areAllPropsUndefined(item, ["charset", "collation"])
      ? undefined
      : _databasePropertiesSerializer(item),
  };
}

export function databaseDeserializer(item: any): Database {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databasePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a database. */
export interface DatabaseProperties {
  /** Character set of the database. */
  charset?: string;
  /** Collation of the database. */
  collation?: string;
}

export function databasePropertiesSerializer(item: DatabaseProperties): any {
  return { charset: item["charset"], collation: item["collation"] };
}

export function databasePropertiesDeserializer(item: any): DatabaseProperties {
  return {
    charset: item["charset"],
    collation: item["collation"],
  };
}

/** List of all databases in a server. */
export interface _DatabaseList {
  /** The Database items on this page */
  value: Database[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseListDeserializer(item: any): _DatabaseList {
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

/** Firewall rule. */
export interface FirewallRule extends ProxyResource {
  /** IP address defining the start of the range of addresses of a firewall rule. Must be expressed in IPv4 format. */
  startIpAddress: string;
  /** IP address defining the end of the range of addresses of a firewall rule. Must be expressed in IPv4 format. */
  endIpAddress: string;
}

export function firewallRuleSerializer(item: FirewallRule): any {
  return { properties: _firewallRulePropertiesSerializer(item) };
}

export function firewallRuleDeserializer(item: any): FirewallRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._firewallRulePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a firewall rule. */
export interface FirewallRuleProperties {
  /** IP address defining the start of the range of addresses of a firewall rule. Must be expressed in IPv4 format. */
  startIpAddress: string;
  /** IP address defining the end of the range of addresses of a firewall rule. Must be expressed in IPv4 format. */
  endIpAddress: string;
}

export function firewallRulePropertiesSerializer(item: FirewallRuleProperties): any {
  return { startIpAddress: item["startIpAddress"], endIpAddress: item["endIpAddress"] };
}

export function firewallRulePropertiesDeserializer(item: any): FirewallRuleProperties {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
  };
}

/** List of firewall rules. */
export interface _FirewallRuleList {
  /** The FirewallRule items on this page */
  value: FirewallRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _firewallRuleListDeserializer(item: any): _FirewallRuleList {
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

/** List of private endpoint connections. */
export interface _PrivateEndpointConnectionList {
  /** The PrivateEndpointConnection items on this page */
  readonly value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListDeserializer(
  item: any,
): _PrivateEndpointConnectionList {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** A private link resource. */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
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

/** A list of private link resources */
export interface _PrivateLinkResourceList {
  /** The PrivateLinkResource items on this page */
  readonly value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListDeserializer(item: any): _PrivateLinkResourceList {
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

/** Pair of virtual endpoints for a server. */
export interface VirtualEndpoint extends ProxyResource {
  /** Type of endpoint for the virtual endpoints. */
  endpointType?: VirtualEndpointType;
  /** List of servers that one of the virtual endpoints can refer to. */
  members?: string[];
  /** List of virtual endpoints for a server. */
  readonly virtualEndpoints?: string[];
}

export function virtualEndpointSerializer(item: VirtualEndpoint): any {
  return {
    properties: areAllPropsUndefined(item, ["endpointType", "members"])
      ? undefined
      : _virtualEndpointPropertiesSerializer(item),
  };
}

export function virtualEndpointDeserializer(item: any): VirtualEndpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _virtualEndpointPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a pair of virtual endpoints. */
export interface VirtualEndpointResourceProperties {
  /** Type of endpoint for the virtual endpoints. */
  endpointType?: VirtualEndpointType;
  /** List of servers that one of the virtual endpoints can refer to. */
  members?: string[];
  /** List of virtual endpoints for a server. */
  readonly virtualEndpoints?: string[];
}

export function virtualEndpointResourcePropertiesSerializer(
  item: VirtualEndpointResourceProperties,
): any {
  return {
    endpointType: item["endpointType"],
    members: !item["members"]
      ? item["members"]
      : item["members"].map((p: any) => {
          return p;
        }),
  };
}

export function virtualEndpointResourcePropertiesDeserializer(
  item: any,
): VirtualEndpointResourceProperties {
  return {
    endpointType: item["endpointType"],
    members: !item["members"]
      ? item["members"]
      : item["members"].map((p: any) => {
          return p;
        }),
    virtualEndpoints: !item["virtualEndpoints"]
      ? item["virtualEndpoints"]
      : item["virtualEndpoints"].map((p: any) => {
          return p;
        }),
  };
}

/** Type of endpoint for the virtual endpoints. */
export enum KnownVirtualEndpointType {
  /** ReadWrite */
  ReadWrite = "ReadWrite",
}

/**
 * Type of endpoint for the virtual endpoints. \
 * {@link KnownVirtualEndpointType} can be used interchangeably with VirtualEndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadWrite**
 */
export type VirtualEndpointType = string;

/** Pair of virtual endpoints for a server. */
export interface VirtualEndpointResourceForPatch {
  /** Type of endpoint for the virtual endpoints. */
  endpointType?: VirtualEndpointType;
  /** List of servers that one of the virtual endpoints can refer to. */
  members?: string[];
  /** List of virtual endpoints for a server. */
  readonly virtualEndpoints?: string[];
}

export function virtualEndpointResourceForPatchSerializer(
  item: VirtualEndpointResourceForPatch,
): any {
  return {
    properties: areAllPropsUndefined(item, ["endpointType", "members"])
      ? undefined
      : _virtualEndpointResourceForPatchPropertiesSerializer(item),
  };
}

/** List of virtual endpoints. */
export interface _VirtualEndpointsList {
  /** The VirtualEndpoint items on this page */
  value: VirtualEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualEndpointsListDeserializer(item: any): _VirtualEndpointsList {
  return {
    value: virtualEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualEndpointArraySerializer(result: Array<VirtualEndpoint>): any[] {
  return result.map((item) => {
    return virtualEndpointSerializer(item);
  });
}

export function virtualEndpointArrayDeserializer(result: Array<VirtualEndpoint>): any[] {
  return result.map((item) => {
    return virtualEndpointDeserializer(item);
  });
}

/** Server administrator associated to a Microsoft Entra principal. */
export interface AdministratorMicrosoftEntra extends ProxyResource {
  /** Type of Microsoft Entra principal to which the server administrator is associated. */
  principalType?: PrincipalType;
  /** Name of the Microsoft Entra principal. */
  principalName?: string;
  /** Object identifier of the Microsoft Entra principal. */
  objectId?: string;
  /** Identifier of the tenant in which the Microsoft Entra principal exists. */
  tenantId?: string;
}

export function administratorMicrosoftEntraDeserializer(item: any): AdministratorMicrosoftEntra {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._administratorMicrosoftEntraPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a server administrator associated to a Microsoft Entra principal. */
export interface AdministratorMicrosoftEntraProperties {
  /** Type of Microsoft Entra principal to which the server administrator is associated. */
  principalType?: PrincipalType;
  /** Name of the Microsoft Entra principal. */
  principalName?: string;
  /** Object identifier of the Microsoft Entra principal. */
  objectId?: string;
  /** Identifier of the tenant in which the Microsoft Entra principal exists. */
  tenantId?: string;
}

export function administratorMicrosoftEntraPropertiesDeserializer(
  item: any,
): AdministratorMicrosoftEntraProperties {
  return {
    principalType: item["principalType"],
    principalName: item["principalName"],
    objectId: item["objectId"],
    tenantId: item["tenantId"],
  };
}

/** Type of Microsoft Entra principal to which the server administrator is associated. */
export enum KnownPrincipalType {
  /** The principal type is not known or not specified. */
  Unknown = "Unknown",
  /** A Microsoft Entra user. */
  User = "User",
  /** A Microsoft Entra group. */
  Group = "Group",
  /** A Microsoft Entra service principal, typically representing an application or service identity */
  ServicePrincipal = "ServicePrincipal",
}

/**
 * Type of Microsoft Entra principal to which the server administrator is associated. \
 * {@link KnownPrincipalType} can be used interchangeably with PrincipalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The principal type is not known or not specified. \
 * **User**: A Microsoft Entra user. \
 * **Group**: A Microsoft Entra group. \
 * **ServicePrincipal**: A Microsoft Entra service principal, typically representing an application or service identity
 */
export type PrincipalType = string;

/** Server administrator associated to a Microsoft Entra principal. */
export interface AdministratorMicrosoftEntraAdd {
  /** Type of Microsoft Entra principal to which the server administrator is associated. */
  principalType?: PrincipalType;
  /** Name of the Microsoft Entra principal. */
  principalName?: string;
  /** Identifier of the tenant in which the Microsoft Entra principal exists. */
  tenantId?: string;
}

export function administratorMicrosoftEntraAddSerializer(
  item: AdministratorMicrosoftEntraAdd,
): any {
  return {
    properties: areAllPropsUndefined(item, ["principalType", "principalName", "tenantId"])
      ? undefined
      : _administratorMicrosoftEntraAddPropertiesSerializer(item),
  };
}

/** Properties of a server administrator associated to a Microsoft Entra principal. */
export interface AdministratorMicrosoftEntraPropertiesForAdd {
  /** Type of Microsoft Entra principal to which the server administrator is associated. */
  principalType?: PrincipalType;
  /** Name of the Microsoft Entra principal. */
  principalName?: string;
  /** Identifier of the tenant in which the Microsoft Entra principal exists. */
  tenantId?: string;
}

export function administratorMicrosoftEntraPropertiesForAddSerializer(
  item: AdministratorMicrosoftEntraPropertiesForAdd,
): any {
  return {
    principalType: item["principalType"],
    principalName: item["principalName"],
    tenantId: item["tenantId"],
  };
}

/** List of server administrators associated to Microsoft Entra principals. */
export interface _AdministratorMicrosoftEntraList {
  /** The AdministratorMicrosoftEntra items on this page */
  value: AdministratorMicrosoftEntra[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _administratorMicrosoftEntraListDeserializer(
  item: any,
): _AdministratorMicrosoftEntraList {
  return {
    value: administratorMicrosoftEntraArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function administratorMicrosoftEntraArrayDeserializer(
  result: Array<AdministratorMicrosoftEntra>,
): any[] {
  return result.map((item) => {
    return administratorMicrosoftEntraDeserializer(item);
  });
}

/** List of capabilities for the Azure Database for PostgreSQL flexible server. */
export interface _CapabilityList {
  /** The Capability items on this page */
  readonly value: Capability[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _capabilityListDeserializer(item: any): _CapabilityList {
  return {
    value: capabilityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function capabilityArrayDeserializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilityDeserializer(item);
  });
}

/** Capability for the Azure Database for PostgreSQL flexible server. */
export interface Capability extends CapabilityBase {
  /** Name of flexible servers capabilities. */
  name?: string;
  /** List of supported compute tiers. */
  readonly supportedServerEditions?: ServerEditionCapability[];
  /** List of supported major versions of PostgreSQL database engine. */
  readonly supportedServerVersions?: ServerVersionCapability[];
  /** Features supported. */
  readonly supportedFeatures?: SupportedFeature[];
  /** Indicates if fast provisioning is supported. 'Enabled' means fast provisioning is supported. 'Disabled' stands for fast provisioning is not supported. Will be deprecated in the future. Look to Supported Features for 'FastProvisioning'. */
  readonly fastProvisioningSupported?: FastProvisioningSupport;
  /** List of compute tiers supporting fast provisioning. */
  readonly supportedFastProvisioningEditions?: FastProvisioningEditionCapability[];
  /** Indicates if geographically redundant backups are supported in this location. 'Enabled' means geographically redundant backups are supported. 'Disabled' stands for geographically redundant backup is not supported. Will be deprecated in the future. Look to Supported Features for 'GeoBackup'. */
  readonly geoBackupSupported?: GeographicallyRedundantBackupSupport;
  /** Indicates if high availability with zone redundancy is supported in this location. 'Enabled' means high availability with zone redundancy is supported. 'Disabled' stands for high availability with zone redundancy is not supported. Will be deprecated in the future. Look to Supported Features for  'ZoneRedundantHa'. */
  readonly zoneRedundantHaSupported?: ZoneRedundantHighAvailabilitySupport;
  /** Indicates if high availability with zone redundancy is supported in conjunction with geographically redundant backups in this location. 'Enabled' means high availability with zone redundancy is supported in conjunction with geographically redundant backups is supported. 'Disabled' stands for high availability with zone redundancy is supported in conjunction with geographically redundant backups is not supported. Will be deprecated in the future. Look to Supported Features for 'ZoneRedundantHaAndGeoBackup'. */
  readonly zoneRedundantHaAndGeoBackupSupported?: ZoneRedundantHighAvailabilityAndGeographicallyRedundantBackupSupport;
  /** Indicates if storage autogrow is supported in this location. 'Enabled' means storage autogrow is supported. 'Disabled' stands for storage autogrow is not supported. Will be deprecated in the future. Look to Supported Features for 'StorageAutoGrowth'. */
  readonly storageAutoGrowthSupported?: StorageAutoGrowthSupport;
  /** Indicates if resizing the storage, without interrupting the operation of the database engine, is supported in this location for the given subscription. 'Enabled' means resizing the storage without interrupting the operation of the database engine is supported. 'Disabled' means resizing the storage without interrupting the operation of the database engine is not supported. Will be deprecated in the future. Look to Supported Features for 'OnlineResize'. */
  readonly onlineResizeSupported?: OnlineStorageResizeSupport;
  /** Indicates if this location is restricted. 'Enabled' means location is restricted. 'Disabled' stands for location is not restricted. Will be deprecated in the future. Look to Supported Features for 'Restricted'. */
  readonly restricted?: LocationRestricted;
}

export function capabilityDeserializer(item: any): Capability {
  return {
    status: item["status"],
    reason: item["reason"],
    name: item["name"],
    supportedServerEditions: !item["supportedServerEditions"]
      ? item["supportedServerEditions"]
      : serverEditionCapabilityArrayDeserializer(item["supportedServerEditions"]),
    supportedServerVersions: !item["supportedServerVersions"]
      ? item["supportedServerVersions"]
      : serverVersionCapabilityArrayDeserializer(item["supportedServerVersions"]),
    supportedFeatures: !item["supportedFeatures"]
      ? item["supportedFeatures"]
      : supportedFeatureArrayDeserializer(item["supportedFeatures"]),
    fastProvisioningSupported: item["fastProvisioningSupported"],
    supportedFastProvisioningEditions: !item["supportedFastProvisioningEditions"]
      ? item["supportedFastProvisioningEditions"]
      : fastProvisioningEditionCapabilityArrayDeserializer(
          item["supportedFastProvisioningEditions"],
        ),
    geoBackupSupported: item["geoBackupSupported"],
    zoneRedundantHaSupported: item["zoneRedundantHaSupported"],
    zoneRedundantHaAndGeoBackupSupported: item["zoneRedundantHaAndGeoBackupSupported"],
    storageAutoGrowthSupported: item["storageAutoGrowthSupported"],
    onlineResizeSupported: item["onlineResizeSupported"],
    restricted: item["restricted"],
  };
}

export function serverEditionCapabilityArrayDeserializer(
  result: Array<ServerEditionCapability>,
): any[] {
  return result.map((item) => {
    return serverEditionCapabilityDeserializer(item);
  });
}

/** Capabilities in terms of compute tier. */
export interface ServerEditionCapability extends CapabilityBase {
  /** Name of compute tier. */
  readonly name?: string;
  /** Default compute name (SKU) for this computer tier. */
  readonly defaultSkuName?: string;
  /** List of storage editions supported by this compute tier and compute name. */
  readonly supportedStorageEditions?: StorageEditionCapability[];
  /** List of supported compute names (SKUs). */
  readonly supportedServerSkus?: ServerSkuCapability[];
}

export function serverEditionCapabilityDeserializer(item: any): ServerEditionCapability {
  return {
    status: item["status"],
    reason: item["reason"],
    name: item["name"],
    defaultSkuName: item["defaultSkuName"],
    supportedStorageEditions: !item["supportedStorageEditions"]
      ? item["supportedStorageEditions"]
      : storageEditionCapabilityArrayDeserializer(item["supportedStorageEditions"]),
    supportedServerSkus: !item["supportedServerSkus"]
      ? item["supportedServerSkus"]
      : serverSkuCapabilityArrayDeserializer(item["supportedServerSkus"]),
  };
}

export function storageEditionCapabilityArrayDeserializer(
  result: Array<StorageEditionCapability>,
): any[] {
  return result.map((item) => {
    return storageEditionCapabilityDeserializer(item);
  });
}

/** Capabilities in terms of storage tier. */
export interface StorageEditionCapability extends CapabilityBase {
  /** Name of storage tier. */
  readonly name?: string;
  /** Default storage size (in MB) for this storage tier. */
  readonly defaultStorageSizeMb?: number;
  /** Configurations of storage supported for this storage tier. */
  readonly supportedStorageMb?: StorageMbCapability[];
}

export function storageEditionCapabilityDeserializer(item: any): StorageEditionCapability {
  return {
    status: item["status"],
    reason: item["reason"],
    name: item["name"],
    defaultStorageSizeMb: item["defaultStorageSizeMb"],
    supportedStorageMb: !item["supportedStorageMb"]
      ? item["supportedStorageMb"]
      : storageMbCapabilityArrayDeserializer(item["supportedStorageMb"]),
  };
}

export function storageMbCapabilityArrayDeserializer(result: Array<StorageMbCapability>): any[] {
  return result.map((item) => {
    return storageMbCapabilityDeserializer(item);
  });
}

/** Storage size (in MB) capability. */
export interface StorageMbCapability extends CapabilityBase {
  /** Minimum IOPS supported by the storage size. */
  readonly supportedIops?: number;
  /** Maximum IOPS supported by the storage size. */
  readonly supportedMaximumIops?: number;
  /** Minimum supported size (in MB) of storage. */
  readonly storageSizeMb?: number;
  /** Maximum supported size (in MB) of storage. */
  readonly maximumStorageSizeMb?: number;
  /** Minimum supported throughput (in MB/s) of storage. */
  readonly supportedThroughput?: number;
  /** Maximum supported throughput (in MB/s) of storage. */
  readonly supportedMaximumThroughput?: number;
  /** Default IOPS for this tier and storage size. */
  readonly defaultIopsTier?: string;
  /** List of all supported storage tiers for this tier and storage size. */
  readonly supportedIopsTiers?: StorageTierCapability[];
}

export function storageMbCapabilityDeserializer(item: any): StorageMbCapability {
  return {
    status: item["status"],
    reason: item["reason"],
    supportedIops: item["supportedIops"],
    supportedMaximumIops: item["supportedMaximumIops"],
    storageSizeMb: item["storageSizeMb"],
    maximumStorageSizeMb: item["maximumStorageSizeMb"],
    supportedThroughput: item["supportedThroughput"],
    supportedMaximumThroughput: item["supportedMaximumThroughput"],
    defaultIopsTier: item["defaultIopsTier"],
    supportedIopsTiers: !item["supportedIopsTiers"]
      ? item["supportedIopsTiers"]
      : storageTierCapabilityArrayDeserializer(item["supportedIopsTiers"]),
  };
}

export function storageTierCapabilityArrayDeserializer(
  result: Array<StorageTierCapability>,
): any[] {
  return result.map((item) => {
    return storageTierCapabilityDeserializer(item);
  });
}

/** Capability of a storage tier. */
export interface StorageTierCapability extends CapabilityBase {
  /** Name of the storage tier. */
  readonly name?: string;
  /** Supported IOPS for the storage tier. */
  readonly iops?: number;
}

export function storageTierCapabilityDeserializer(item: any): StorageTierCapability {
  return {
    status: item["status"],
    reason: item["reason"],
    name: item["name"],
    iops: item["iops"],
  };
}

export function serverSkuCapabilityArrayDeserializer(result: Array<ServerSkuCapability>): any[] {
  return result.map((item) => {
    return serverSkuCapabilityDeserializer(item);
  });
}

/** Capabilities in terms of compute. */
export interface ServerSkuCapability extends CapabilityBase {
  /** Name of the compute (SKU). */
  readonly name?: string;
  /** vCores available for this compute. */
  readonly vCores?: number;
  /** Maximum IOPS supported by this compute. */
  readonly supportedIops?: number;
  /** Supported memory (in MB) per virtual core assigned to this compute. */
  readonly supportedMemoryPerVcoreMb?: number;
  /** List of supported availability zones. E.g. '1', '2', '3' */
  readonly supportedZones?: string[];
  /** Modes of high availability supported for this compute. */
  readonly supportedHaMode?: HighAvailabilityMode[];
  /** Features supported. */
  readonly supportedFeatures?: SupportedFeature[];
  /** Security profile of the compute. Indicates if it's a Confidential Compute virtual machine. */
  readonly securityProfile?: string;
}

export function serverSkuCapabilityDeserializer(item: any): ServerSkuCapability {
  return {
    status: item["status"],
    reason: item["reason"],
    name: item["name"],
    vCores: item["vCores"],
    supportedIops: item["supportedIops"],
    supportedMemoryPerVcoreMb: item["supportedMemoryPerVcoreMb"],
    supportedZones: !item["supportedZones"]
      ? item["supportedZones"]
      : item["supportedZones"].map((p: any) => {
          return p;
        }),
    supportedHaMode: !item["supportedHaMode"]
      ? item["supportedHaMode"]
      : item["supportedHaMode"].map((p: any) => {
          return p;
        }),
    supportedFeatures: !item["supportedFeatures"]
      ? item["supportedFeatures"]
      : supportedFeatureArrayDeserializer(item["supportedFeatures"]),
    securityProfile: item["securityProfile"],
  };
}

/** Modes of high availability supported for this compute. */
export enum KnownHighAvailabilityMode {
  /** ZoneRedundant */
  ZoneRedundant = "ZoneRedundant",
  /** SameZone */
  SameZone = "SameZone",
}

/**
 * Modes of high availability supported for this compute. \
 * {@link KnownHighAvailabilityMode} can be used interchangeably with HighAvailabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ZoneRedundant** \
 * **SameZone**
 */
export type HighAvailabilityMode = string;

export function supportedFeatureArrayDeserializer(result: Array<SupportedFeature>): any[] {
  return result.map((item) => {
    return supportedFeatureDeserializer(item);
  });
}

/** Features supported. */
export interface SupportedFeature {
  /** Name of the feature. */
  readonly name?: string;
  /** Status of the feature. Indicates if the feature is enabled or not. */
  readonly status?: FeatureStatus;
}

export function supportedFeatureDeserializer(item: any): SupportedFeature {
  return {
    name: item["name"],
    status: item["status"],
  };
}

/** Status of the feature. Indicates if the feature is enabled or not. */
export enum KnownFeatureStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Status of the feature. Indicates if the feature is enabled or not. \
 * {@link KnownFeatureStatus} can be used interchangeably with FeatureStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type FeatureStatus = string;

export function serverVersionCapabilityArrayDeserializer(
  result: Array<ServerVersionCapability>,
): any[] {
  return result.map((item) => {
    return serverVersionCapabilityDeserializer(item);
  });
}

/** Capabilities in terms of major versions of PostgreSQL database engine. */
export interface ServerVersionCapability extends CapabilityBase {
  /** Major version of PostgreSQL database engine. */
  readonly name?: string;
  /** Major versions of PostgreSQL database engine to which this version can be automatically upgraded. */
  readonly supportedVersionsToUpgrade?: string[];
  /** Features supported. */
  readonly supportedFeatures?: SupportedFeature[];
}

export function serverVersionCapabilityDeserializer(item: any): ServerVersionCapability {
  return {
    status: item["status"],
    reason: item["reason"],
    name: item["name"],
    supportedVersionsToUpgrade: !item["supportedVersionsToUpgrade"]
      ? item["supportedVersionsToUpgrade"]
      : item["supportedVersionsToUpgrade"].map((p: any) => {
          return p;
        }),
    supportedFeatures: !item["supportedFeatures"]
      ? item["supportedFeatures"]
      : supportedFeatureArrayDeserializer(item["supportedFeatures"]),
  };
}

/** Indicates if fast provisioning is supported. 'Enabled' means fast provisioning is supported. 'Disabled' stands for fast provisioning is not supported. Will be deprecated in the future. Look to Supported Features for 'FastProvisioning'. */
export enum KnownFastProvisioningSupport {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if fast provisioning is supported. 'Enabled' means fast provisioning is supported. 'Disabled' stands for fast provisioning is not supported. Will be deprecated in the future. Look to Supported Features for 'FastProvisioning'. \
 * {@link KnownFastProvisioningSupport} can be used interchangeably with FastProvisioningSupport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type FastProvisioningSupport = string;

export function fastProvisioningEditionCapabilityArrayDeserializer(
  result: Array<FastProvisioningEditionCapability>,
): any[] {
  return result.map((item) => {
    return fastProvisioningEditionCapabilityDeserializer(item);
  });
}

/** Capability of a fast provisioning compute tier. */
export interface FastProvisioningEditionCapability extends CapabilityBase {
  /** Compute tier supporting fast provisioning. */
  readonly supportedTier?: string;
  /** Compute name (SKU) supporting fast provisioning. */
  readonly supportedSku?: string;
  /** Storage size (in GB) supporting fast provisioning. */
  readonly supportedStorageGb?: number;
  /** Major version of PostgreSQL database engine supporting fast provisioning. */
  readonly supportedServerVersions?: string;
  /** Count of servers in cache matching this specification. */
  readonly serverCount?: number;
}

export function fastProvisioningEditionCapabilityDeserializer(
  item: any,
): FastProvisioningEditionCapability {
  return {
    status: item["status"],
    reason: item["reason"],
    supportedTier: item["supportedTier"],
    supportedSku: item["supportedSku"],
    supportedStorageGb: item["supportedStorageGb"],
    supportedServerVersions: item["supportedServerVersions"],
    serverCount: item["serverCount"],
  };
}

/** Indicates if geographically redundant backups are supported in this location. 'Enabled' means geographically redundant backups are supported. 'Disabled' stands for geographically redundant backup is not supported. Will be deprecated in the future. Look to Supported Features for 'GeoBackup'. */
export enum KnownGeographicallyRedundantBackupSupport {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if geographically redundant backups are supported in this location. 'Enabled' means geographically redundant backups are supported. 'Disabled' stands for geographically redundant backup is not supported. Will be deprecated in the future. Look to Supported Features for 'GeoBackup'. \
 * {@link KnownGeographicallyRedundantBackupSupport} can be used interchangeably with GeographicallyRedundantBackupSupport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type GeographicallyRedundantBackupSupport = string;

/** Indicates if high availability with zone redundancy is supported in this location. 'Enabled' means high availability with zone redundancy is supported. 'Disabled' stands for high availability with zone redundancy is not supported. Will be deprecated in the future. Look to Supported Features for  'ZoneRedundantHa'. */
export enum KnownZoneRedundantHighAvailabilitySupport {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if high availability with zone redundancy is supported in this location. 'Enabled' means high availability with zone redundancy is supported. 'Disabled' stands for high availability with zone redundancy is not supported. Will be deprecated in the future. Look to Supported Features for  'ZoneRedundantHa'. \
 * {@link KnownZoneRedundantHighAvailabilitySupport} can be used interchangeably with ZoneRedundantHighAvailabilitySupport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type ZoneRedundantHighAvailabilitySupport = string;

/** Indicates if high availability with zone redundancy is supported in conjunction with geographically redundant backups in this location. 'Enabled' means high availability with zone redundancy is supported in conjunction with geographically redundant backups is supported. 'Disabled' stands for high availability with zone redundancy is supported in conjunction with geographically redundant backups is not supported. Will be deprecated in the future. Look to Supported Features for 'ZoneRedundantHaAndGeoBackup'. */
export enum KnownZoneRedundantHighAvailabilityAndGeographicallyRedundantBackupSupport {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if high availability with zone redundancy is supported in conjunction with geographically redundant backups in this location. 'Enabled' means high availability with zone redundancy is supported in conjunction with geographically redundant backups is supported. 'Disabled' stands for high availability with zone redundancy is supported in conjunction with geographically redundant backups is not supported. Will be deprecated in the future. Look to Supported Features for 'ZoneRedundantHaAndGeoBackup'. \
 * {@link KnownZoneRedundantHighAvailabilityAndGeographicallyRedundantBackupSupport} can be used interchangeably with ZoneRedundantHighAvailabilityAndGeographicallyRedundantBackupSupport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type ZoneRedundantHighAvailabilityAndGeographicallyRedundantBackupSupport = string;

/** Indicates if storage autogrow is supported in this location. 'Enabled' means storage autogrow is supported. 'Disabled' stands for storage autogrow is not supported. Will be deprecated in the future. Look to Supported Features for 'StorageAutoGrowth'. */
export enum KnownStorageAutoGrowthSupport {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if storage autogrow is supported in this location. 'Enabled' means storage autogrow is supported. 'Disabled' stands for storage autogrow is not supported. Will be deprecated in the future. Look to Supported Features for 'StorageAutoGrowth'. \
 * {@link KnownStorageAutoGrowthSupport} can be used interchangeably with StorageAutoGrowthSupport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type StorageAutoGrowthSupport = string;

/** Indicates if resizing the storage, without interrupting the operation of the database engine, is supported in this location for the given subscription. 'Enabled' means resizing the storage without interrupting the operation of the database engine is supported. 'Disabled' means resizing the storage without interrupting the operation of the database engine is not supported. Will be deprecated in the future. Look to Supported Features for 'OnlineResize'. */
export enum KnownOnlineStorageResizeSupport {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if resizing the storage, without interrupting the operation of the database engine, is supported in this location for the given subscription. 'Enabled' means resizing the storage without interrupting the operation of the database engine is supported. 'Disabled' means resizing the storage without interrupting the operation of the database engine is not supported. Will be deprecated in the future. Look to Supported Features for 'OnlineResize'. \
 * {@link KnownOnlineStorageResizeSupport} can be used interchangeably with OnlineStorageResizeSupport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type OnlineStorageResizeSupport = string;

/** Indicates if this location is restricted. 'Enabled' means location is restricted. 'Disabled' stands for location is not restricted. Will be deprecated in the future. Look to Supported Features for 'Restricted'. */
export enum KnownLocationRestricted {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if this location is restricted. 'Enabled' means location is restricted. 'Disabled' stands for location is not restricted. Will be deprecated in the future. Look to Supported Features for 'Restricted'. \
 * {@link KnownLocationRestricted} can be used interchangeably with LocationRestricted,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type LocationRestricted = string;

/** Base object for representing capability */
export interface CapabilityBase {
  /** The status of the capability. */
  readonly status?: CapabilityStatus;
  /** The reason for the capability not being available. */
  readonly reason?: string;
}

export function capabilityBaseDeserializer(item: any): CapabilityBase {
  return {
    status: item["status"],
    reason: item["reason"],
  };
}

/** The status of the capability. */
export type CapabilityStatus = "Visible" | "Available" | "Default" | "Disabled";

/** List of log files. */
export interface _CapturedLogList {
  /** The CapturedLog items on this page */
  value: CapturedLog[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _capturedLogListDeserializer(item: any): _CapturedLogList {
  return {
    value: capturedLogArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function capturedLogArrayDeserializer(result: Array<CapturedLog>): any[] {
  return result.map((item) => {
    return capturedLogDeserializer(item);
  });
}

/** Log file. */
export interface CapturedLog extends ProxyResource {
  /** Creation timestamp of the log file. */
  createdTime?: Date;
  /** Last modified timestamp of the log file. */
  lastModifiedTime?: Date;
  /** Size (in KB) of the log file. */
  sizeInKb?: number;
  /** Type of log file. Can be 'ServerLogs' or 'UpgradeLogs'. */
  typePropertiesType?: string;
  /** URL to download the log file from. */
  url?: string;
}

export function capturedLogDeserializer(item: any): CapturedLog {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _capturedLogPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a log file. */
export interface CapturedLogProperties {
  /** Creation timestamp of the log file. */
  createdTime?: Date;
  /** Last modified timestamp of the log file. */
  lastModifiedTime?: Date;
  /** Size (in KB) of the log file. */
  sizeInKb?: number;
  /** Type of log file. Can be 'ServerLogs' or 'UpgradeLogs'. */
  type?: string;
  /** URL to download the log file from. */
  url?: string;
}

export function capturedLogPropertiesDeserializer(item: any): CapturedLogProperties {
  return {
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    sizeInKb: item["sizeInKb"],
    type: item["type"],
    url: item["url"],
  };
}

/** A request that is made for pre-backup. */
export interface LtrPreBackupRequest extends BackupRequestBase {}

export function ltrPreBackupRequestSerializer(item: LtrPreBackupRequest): any {
  return { backupSettings: backupSettingsSerializer(item["backupSettings"]) };
}

/** BackupRequestBase is the base for all backup request. */
export interface BackupRequestBase {
  /** Backup Settings */
  backupSettings: BackupSettings;
}

export function backupRequestBaseSerializer(item: BackupRequestBase): any {
  return { backupSettings: backupSettingsSerializer(item["backupSettings"]) };
}

/** The settings for the long term backup. */
export interface BackupSettings {
  /** Backup Name for the current backup */
  backupName: string;
}

export function backupSettingsSerializer(item: BackupSettings): any {
  return { backupName: item["backupName"] };
}

/** Response for the LTR pre-backup API call */
export interface LtrPreBackupResponse {
  /** Number of storage containers the plugin will use during backup. More than one containers may be used for size limitations, parallelism, or redundancy etc. */
  numberOfContainers: number;
}

export function ltrPreBackupResponseDeserializer(item: any): LtrPreBackupResponse {
  return {
    ..._ltrPreBackupResponsePropertiesDeserializer(item["properties"]),
  };
}

/** Response for the pre-backup request. */
export interface BackupsLongTermRetentionResponseProperties {
  /** Number of storage containers the plugin will use during backup. More than one containers may be used for size limitations, parallelism, or redundancy etc. */
  numberOfContainers: number;
}

export function backupsLongTermRetentionResponsePropertiesDeserializer(
  item: any,
): BackupsLongTermRetentionResponseProperties {
  return {
    numberOfContainers: item["numberOfContainers"],
  };
}

/** The request that is made for a long term retention backup. */
export interface BackupsLongTermRetentionRequest extends BackupRequestBase {
  /** Backup store detail for target server */
  targetDetails: BackupStoreDetails;
}

export function backupsLongTermRetentionRequestSerializer(
  item: BackupsLongTermRetentionRequest,
): any {
  return {
    backupSettings: backupSettingsSerializer(item["backupSettings"]),
    targetDetails: backupStoreDetailsSerializer(item["targetDetails"]),
  };
}

/** Details about the target where the backup content will be stored. */
export interface BackupStoreDetails {
  /** List of SAS uri of storage containers where backup data is to be streamed/copied. */
  sasUriList: string[];
}

export function backupStoreDetailsSerializer(item: BackupStoreDetails): any {
  return {
    sasUriList: item["sasUriList"].map((p: any) => {
      return p;
    }),
  };
}

/** Response for the LTR backup API call */
export interface BackupsLongTermRetentionResponse {
  /** Size of datasource in bytes */
  datasourceSizeInBytes?: number;
  /** Data transferred in bytes */
  dataTransferredInBytes?: number;
  /** Name of Backup operation */
  backupName?: string;
  /** Metadata to be stored in RP. Store everything that will be required to perform a successful restore using this Recovery point. e.g. Versions, DataFormat etc */
  backupMetadata?: string;
  /** Service-set extensible enum indicating the status of operation */
  status?: ExecutionStatus;
  /** Start time of the operation. */
  startTime?: Date;
  /** End time of the operation. */
  endTime?: Date;
  /** PercentageCompleted */
  percentComplete?: number;
  /** The error code. */
  readonly errorCode?: string;
  /** The error message. */
  readonly errorMessage?: string;
}

export function backupsLongTermRetentionResponseDeserializer(
  item: any,
): BackupsLongTermRetentionResponse {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _backupsLongTermRetentionResponsePropertiesDeserializer(item["properties"])),
  };
}

/** Response for the backup request. */
export interface LtrBackupOperationResponseProperties {
  /** Size of datasource in bytes */
  datasourceSizeInBytes?: number;
  /** Data transferred in bytes */
  dataTransferredInBytes?: number;
  /** Name of Backup operation */
  backupName?: string;
  /** Metadata to be stored in RP. Store everything that will be required to perform a successful restore using this Recovery point. e.g. Versions, DataFormat etc */
  backupMetadata?: string;
  /** Service-set extensible enum indicating the status of operation */
  status: ExecutionStatus;
  /** Start time of the operation. */
  startTime: Date;
  /** End time of the operation. */
  endTime?: Date;
  /** PercentageCompleted */
  percentComplete?: number;
  /** The error code. */
  readonly errorCode?: string;
  /** The error message. */
  readonly errorMessage?: string;
}

export function ltrBackupOperationResponsePropertiesDeserializer(
  item: any,
): LtrBackupOperationResponseProperties {
  return {
    datasourceSizeInBytes: item["datasourceSizeInBytes"],
    dataTransferredInBytes: item["dataTransferredInBytes"],
    backupName: item["backupName"],
    backupMetadata: item["backupMetadata"],
    status: item["status"],
    startTime: new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    percentComplete: item["percentComplete"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
  };
}

/** Service-set extensible enum indicating the status of operation */
export enum KnownExecutionStatus {
  /** Running */
  Running = "Running",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
}

/**
 * Service-set extensible enum indicating the status of operation \
 * {@link KnownExecutionStatus} can be used interchangeably with ExecutionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running** \
 * **Cancelled** \
 * **Failed** \
 * **Succeeded**
 */
export type ExecutionStatus = string;

/** Response for the LTR backup Operation API call */
export interface BackupsLongTermRetentionOperation extends ProxyResource {
  /** Size of datasource in bytes */
  datasourceSizeInBytes?: number;
  /** Data transferred in bytes */
  dataTransferredInBytes?: number;
  /** Name of Backup operation */
  backupName?: string;
  /** Metadata to be stored in RP. Store everything that will be required to perform a successful restore using this Recovery point. e.g. Versions, DataFormat etc */
  backupMetadata?: string;
  /** Service-set extensible enum indicating the status of operation */
  status?: ExecutionStatus;
  /** Start time of the operation. */
  startTime?: Date;
  /** End time of the operation. */
  endTime?: Date;
  /** PercentageCompleted */
  percentComplete?: number;
  /** The error code. */
  readonly errorCode?: string;
  /** The error message. */
  readonly errorMessage?: string;
}

export function backupsLongTermRetentionOperationDeserializer(
  item: any,
): BackupsLongTermRetentionOperation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _backupsLongTermRetentionOperationPropertiesDeserializer(item["properties"])),
  };
}

/** A list of long term retention backup operations for server. */
export interface _LtrServerBackupOperationList {
  /** The BackupsLongTermRetentionOperation items on this page */
  value: BackupsLongTermRetentionOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ltrServerBackupOperationListDeserializer(
  item: any,
): _LtrServerBackupOperationList {
  return {
    value: backupsLongTermRetentionOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function backupsLongTermRetentionOperationArrayDeserializer(
  result: Array<BackupsLongTermRetentionOperation>,
): any[] {
  return result.map((item) => {
    return backupsLongTermRetentionOperationDeserializer(item);
  });
}

/** Advanced threat protection settings of the server. */
export interface AdvancedThreatProtectionSettingsModel extends ProxyResource {
  /** Specifies the state of the advanced threat protection, whether it is enabled, disabled, or a state has not been applied yet on the server. */
  state?: ThreatProtectionState;
  /** Specifies the creation time (UTC) of the policy. */
  readonly creationTime?: Date;
}

export function advancedThreatProtectionSettingsModelSerializer(
  item: AdvancedThreatProtectionSettingsModel,
): any {
  return {
    properties: areAllPropsUndefined(item, ["state"])
      ? undefined
      : _advancedThreatProtectionSettingsModelPropertiesSerializer(item),
  };
}

export function advancedThreatProtectionSettingsModelDeserializer(
  item: any,
): AdvancedThreatProtectionSettingsModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _advancedThreatProtectionSettingsModelPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of advanced threat protection state for a server. */
export interface AdvancedThreatProtectionSettingsProperties {
  /** Specifies the state of the advanced threat protection, whether it is enabled, disabled, or a state has not been applied yet on the server. */
  state: ThreatProtectionState;
  /** Specifies the creation time (UTC) of the policy. */
  readonly creationTime?: Date;
}

export function advancedThreatProtectionSettingsPropertiesSerializer(
  item: AdvancedThreatProtectionSettingsProperties,
): any {
  return { state: item["state"] };
}

export function advancedThreatProtectionSettingsPropertiesDeserializer(
  item: any,
): AdvancedThreatProtectionSettingsProperties {
  return {
    state: item["state"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

/** Specifies the state of the advanced threat protection, whether it is enabled, disabled, or a state has not been applied yet on the server. */
export type ThreatProtectionState = "Enabled" | "Disabled";

/** Known values of {@link ThreatProtectionName} that the service accepts. */
export enum KnownThreatProtectionName {
  /** Default */
  Default = "Default",
}

/** Type of ThreatProtectionName */
export type ThreatProtectionName = string;

/** List of advanced threat protection settings for a server. */
export interface _AdvancedThreatProtectionSettingsList {
  /** The AdvancedThreatProtectionSettingsModel items on this page */
  readonly value: AdvancedThreatProtectionSettingsModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _advancedThreatProtectionSettingsListDeserializer(
  item: any,
): _AdvancedThreatProtectionSettingsList {
  return {
    value: advancedThreatProtectionSettingsModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function advancedThreatProtectionSettingsModelArraySerializer(
  result: Array<AdvancedThreatProtectionSettingsModel>,
): any[] {
  return result.map((item) => {
    return advancedThreatProtectionSettingsModelSerializer(item);
  });
}

export function advancedThreatProtectionSettingsModelArrayDeserializer(
  result: Array<AdvancedThreatProtectionSettingsModel>,
): any[] {
  return result.map((item) => {
    return advancedThreatProtectionSettingsModelDeserializer(item);
  });
}

/** Properties of a backup. */
export interface BackupAutomaticAndOnDemand extends ProxyResource {
  /** Type of backup. */
  backupType?: BackupType;
  /** Time(ISO8601 format) at which the backup was completed. */
  completedTime?: Date;
  /** Source of the backup. */
  source?: string;
}

export function backupAutomaticAndOnDemandDeserializer(item: any): BackupAutomaticAndOnDemand {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _backupAutomaticAndOnDemandPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a backup. */
export interface BackupAutomaticAndOnDemandProperties {
  /** Type of backup. */
  backupType?: BackupType;
  /** Time(ISO8601 format) at which the backup was completed. */
  completedTime?: Date;
  /** Source of the backup. */
  source?: string;
}

export function backupAutomaticAndOnDemandPropertiesDeserializer(
  item: any,
): BackupAutomaticAndOnDemandProperties {
  return {
    backupType: item["backupType"],
    completedTime: !item["completedTime"] ? item["completedTime"] : new Date(item["completedTime"]),
    source: item["source"],
  };
}

/** Type of backup. */
export enum KnownBackupType {
  /** Full */
  Full = "Full",
  /** Customer On-Demand */
  CustomerOnDemand = "Customer On-Demand",
}

/**
 * Type of backup. \
 * {@link KnownBackupType} can be used interchangeably with BackupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Full** \
 * **Customer On-Demand**
 */
export type BackupType = string;

/** List of backups. */
export interface _BackupAutomaticAndOnDemandList {
  /** The BackupAutomaticAndOnDemand items on this page */
  value: BackupAutomaticAndOnDemand[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _backupAutomaticAndOnDemandListDeserializer(
  item: any,
): _BackupAutomaticAndOnDemandList {
  return {
    value: backupAutomaticAndOnDemandArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function backupAutomaticAndOnDemandArrayDeserializer(
  result: Array<BackupAutomaticAndOnDemand>,
): any[] {
  return result.map((item) => {
    return backupAutomaticAndOnDemandDeserializer(item);
  });
}

/** Impact on some metric if this recommended action is applied. */
export interface TuningOptions extends ProxyResource {}

export function tuningOptionsDeserializer(item: any): TuningOptions {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The name of the tuning option. */
export enum KnownTuningOptionParameterEnum {
  /** index */
  Index = "index",
  /** table */
  Table = "table",
}

/**
 * The name of the tuning option. \
 * {@link KnownTuningOptionParameterEnum} can be used interchangeably with TuningOptionParameterEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **index** \
 * **table**
 */
export type TuningOptionParameterEnum = string;

/** List of server tuning options. */
export interface _TuningOptionsList {
  /** The TuningOptions items on this page */
  value: TuningOptions[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _tuningOptionsListDeserializer(item: any): _TuningOptionsList {
  return {
    value: tuningOptionsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tuningOptionsArrayDeserializer(result: Array<TuningOptions>): any[] {
  return result.map((item) => {
    return tuningOptionsDeserializer(item);
  });
}

/** List of available object recommendations. */
export interface _ObjectRecommendationList {
  /** The ObjectRecommendation items on this page */
  value: ObjectRecommendation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _objectRecommendationListDeserializer(item: any): _ObjectRecommendationList {
  return {
    value: objectRecommendationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function objectRecommendationArrayDeserializer(result: Array<ObjectRecommendation>): any[] {
  return result.map((item) => {
    return objectRecommendationDeserializer(item);
  });
}

/** Object recommendation properties. */
export interface ObjectRecommendation extends ProxyResource {
  /** Always empty. */
  kind?: string;
  /** Creation time (UTC) of this recommendation. */
  initialRecommendedTime?: Date;
  /** Last time (UTC) that this recommendation was produced. */
  lastRecommendedTime?: Date;
  /** Number of times this recommendation has been produced. */
  timesRecommended?: number;
  /** List of identifiers for all queries identified as targets for improvement if the recommendation is applied. The list is only populated for CREATE INDEX recommendations. */
  improvedQueryIds?: number[];
  /** Reason for this recommendation. */
  recommendationReason?: string;
  /** Current state. */
  currentState?: string;
  /** Type for this recommendation. */
  recommendationType?: RecommendationTypeEnum;
  /** Implementation details for the recommended action. */
  implementationDetails?: ObjectRecommendationPropertiesImplementationDetails;
  /** Workload information for the recommended action. */
  analyzedWorkload?: ObjectRecommendationPropertiesAnalyzedWorkload;
  /** Estimated impact of this recommended action. */
  readonly estimatedImpact?: ImpactRecord[];
  /** Recommendation details for the recommended action. */
  readonly details?: ObjectRecommendationDetails;
}

export function objectRecommendationDeserializer(item: any): ObjectRecommendation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    ...(!item["properties"]
      ? item["properties"]
      : _objectRecommendationPropertiesDeserializer(item["properties"])),
  };
}

/** Object recommendation properties. */
export interface ObjectRecommendationProperties {
  /** Creation time (UTC) of this recommendation. */
  initialRecommendedTime?: Date;
  /** Last time (UTC) that this recommendation was produced. */
  lastRecommendedTime?: Date;
  /** Number of times this recommendation has been produced. */
  timesRecommended?: number;
  /** List of identifiers for all queries identified as targets for improvement if the recommendation is applied. The list is only populated for CREATE INDEX recommendations. */
  improvedQueryIds?: number[];
  /** Reason for this recommendation. */
  recommendationReason?: string;
  /** Current state. */
  currentState?: string;
  /** Type for this recommendation. */
  recommendationType?: RecommendationTypeEnum;
  /** Implementation details for the recommended action. */
  implementationDetails?: ObjectRecommendationPropertiesImplementationDetails;
  /** Workload information for the recommended action. */
  analyzedWorkload?: ObjectRecommendationPropertiesAnalyzedWorkload;
  /** Estimated impact of this recommended action. */
  readonly estimatedImpact?: ImpactRecord[];
  /** Recommendation details for the recommended action. */
  readonly details?: ObjectRecommendationDetails;
}

export function objectRecommendationPropertiesDeserializer(
  item: any,
): ObjectRecommendationProperties {
  return {
    initialRecommendedTime: !item["initialRecommendedTime"]
      ? item["initialRecommendedTime"]
      : new Date(item["initialRecommendedTime"]),
    lastRecommendedTime: !item["lastRecommendedTime"]
      ? item["lastRecommendedTime"]
      : new Date(item["lastRecommendedTime"]),
    timesRecommended: item["timesRecommended"],
    improvedQueryIds: !item["improvedQueryIds"]
      ? item["improvedQueryIds"]
      : item["improvedQueryIds"].map((p: any) => {
          return p;
        }),
    recommendationReason: item["recommendationReason"],
    currentState: item["currentState"],
    recommendationType: item["recommendationType"],
    implementationDetails: !item["implementationDetails"]
      ? item["implementationDetails"]
      : objectRecommendationPropertiesImplementationDetailsDeserializer(
          item["implementationDetails"],
        ),
    analyzedWorkload: !item["analyzedWorkload"]
      ? item["analyzedWorkload"]
      : objectRecommendationPropertiesAnalyzedWorkloadDeserializer(item["analyzedWorkload"]),
    estimatedImpact: !item["estimatedImpact"]
      ? item["estimatedImpact"]
      : impactRecordArrayDeserializer(item["estimatedImpact"]),
    details: !item["details"]
      ? item["details"]
      : objectRecommendationDetailsDeserializer(item["details"]),
  };
}

/** Type for this recommendation. */
export enum KnownRecommendationTypeEnum {
  /** CreateIndex */
  CreateIndex = "CreateIndex",
  /** DropIndex */
  DropIndex = "DropIndex",
  /** ReIndex */
  ReIndex = "ReIndex",
  /** AnalyzeTable */
  AnalyzeTable = "AnalyzeTable",
}

/**
 * Type for this recommendation. \
 * {@link KnownRecommendationTypeEnum} can be used interchangeably with RecommendationTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CreateIndex** \
 * **DropIndex** \
 * **ReIndex** \
 * **AnalyzeTable**
 */
export type RecommendationTypeEnum = string;

/** Implementation details for the recommended action. */
export interface ObjectRecommendationPropertiesImplementationDetails {
  /** Method of implementation for recommended action. */
  method?: string;
  /** Implementation script for the recommended action. */
  script?: string;
}

export function objectRecommendationPropertiesImplementationDetailsDeserializer(
  item: any,
): ObjectRecommendationPropertiesImplementationDetails {
  return {
    method: item["method"],
    script: item["script"],
  };
}

/** Workload information for the recommended action. */
export interface ObjectRecommendationPropertiesAnalyzedWorkload {
  /** Start time (UTC) of the workload analyzed. */
  startTime?: Date;
  /** End time (UTC) of the workload analyzed. */
  endTime?: Date;
  /** Number of queries from the workload that were examined to produce this recommendation. For DROP INDEX recommendations it's 0 (zero). */
  queryCount?: number;
}

export function objectRecommendationPropertiesAnalyzedWorkloadDeserializer(
  item: any,
): ObjectRecommendationPropertiesAnalyzedWorkload {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    queryCount: item["queryCount"],
  };
}

export function impactRecordArrayDeserializer(result: Array<ImpactRecord>): any[] {
  return result.map((item) => {
    return impactRecordDeserializer(item);
  });
}

/** Impact on some metric if this recommended action is applied. */
export interface ImpactRecord {
  /** Dimension name. */
  dimensionName?: string;
  /** Dimension unit. */
  unit?: string;
  /** Optional property that can be used to store the identifier of the query, if the metric is for a specific query. */
  queryId?: number;
  /** Absolute value. */
  absoluteValue?: number;
}

export function impactRecordDeserializer(item: any): ImpactRecord {
  return {
    dimensionName: item["dimensionName"],
    unit: item["unit"],
    queryId: item["queryId"],
    absoluteValue: item["absoluteValue"],
  };
}

/** Recommendation details for the recommended action. */
export interface ObjectRecommendationDetails {
  /** Database name. */
  databaseName?: string;
  /** Schema name. */
  schema?: string;
  /** Table name. */
  table?: string;
  /** Index type. */
  indexType?: string;
  /** Index name. */
  indexName?: string;
  /** Index columns. */
  indexColumns?: string[];
  /** Index included columns. */
  includedColumns?: string[];
}

export function objectRecommendationDetailsDeserializer(item: any): ObjectRecommendationDetails {
  return {
    databaseName: item["databaseName"],
    schema: item["schema"],
    table: item["table"],
    indexType: item["indexType"],
    indexName: item["indexName"],
    indexColumns: !item["indexColumns"]
      ? item["indexColumns"]
      : item["indexColumns"].map((p: any) => {
          return p;
        }),
    includedColumns: !item["includedColumns"]
      ? item["includedColumns"]
      : item["includedColumns"].map((p: any) => {
          return p;
        }),
  };
}

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** Availability of a name. */
export interface NameAvailabilityModel extends CheckNameAvailabilityResponse {
  /** Name for which validity and availability was checked. */
  readonly name?: string;
  /** Type of resource. It can be 'Microsoft.DBforPostgreSQL/flexibleServers' or 'Microsoft.DBforPostgreSQL/flexibleServers/virtualendpoints'. */
  readonly type?: string;
}

export function nameAvailabilityModelDeserializer(item: any): NameAvailabilityModel {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
    name: item["name"],
    type: item["type"],
  };
}

/** The check availability result. */
export interface CheckNameAvailabilityResponse {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReason;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

export function checkNameAvailabilityResponseDeserializer(
  item: any,
): CheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Possible reasons for a name not being available. */
export enum KnownCheckNameAvailabilityReason {
  /** Name is invalid. */
  Invalid = "Invalid",
  /** Name already exists. */
  AlreadyExists = "AlreadyExists",
}

/**
 * Possible reasons for a name not being available. \
 * {@link KnownCheckNameAvailabilityReason} can be used interchangeably with CheckNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Name is invalid. \
 * **AlreadyExists**: Name already exists.
 */
export type CheckNameAvailabilityReason = string;

/** Capability for the PostgreSQL server */
export interface _QuotaUsageList {
  /** The QuotaUsage items on this page */
  readonly value: QuotaUsage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _quotaUsageListDeserializer(item: any): _QuotaUsageList {
  return {
    value: quotaUsageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function quotaUsageArrayDeserializer(result: Array<QuotaUsage>): any[] {
  return result.map((item) => {
    return quotaUsageDeserializer(item);
  });
}

/** Quota usage for servers */
export interface QuotaUsage {
  /** Name of quota usage for servers */
  name?: NameProperty;
  /** Quota limit */
  limit?: number;
  /** Quota unit */
  unit?: string;
  /** Current Quota usage value */
  currentValue?: number;
  /** Fully qualified ARM resource Id */
  id?: string;
}

export function quotaUsageDeserializer(item: any): QuotaUsage {
  return {
    name: !item["name"] ? item["name"] : namePropertyDeserializer(item["name"]),
    limit: item["limit"],
    unit: item["unit"],
    currentValue: item["currentValue"],
    id: item["id"],
  };
}

/** Name property for quota usage */
export interface NameProperty {
  /** Name value */
  value?: string;
  /** Localized name */
  localizedValue?: string;
}

export function namePropertyDeserializer(item: any): NameProperty {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** Virtual network subnet usage parameter */
export interface VirtualNetworkSubnetUsageParameter {
  /** Virtual network resource id. */
  virtualNetworkArmResourceId?: string;
}

export function virtualNetworkSubnetUsageParameterSerializer(
  item: VirtualNetworkSubnetUsageParameter,
): any {
  return { virtualNetworkArmResourceId: item["virtualNetworkArmResourceId"] };
}

/** Virtual network subnet usage data. */
export interface VirtualNetworkSubnetUsageModel {
  readonly delegatedSubnetsUsage?: DelegatedSubnetUsage[];
  /** location of the delegated subnet usage */
  readonly location?: string;
  /** subscriptionId of the delegated subnet usage */
  readonly subscriptionId?: string;
}

export function virtualNetworkSubnetUsageModelDeserializer(
  item: any,
): VirtualNetworkSubnetUsageModel {
  return {
    delegatedSubnetsUsage: !item["delegatedSubnetsUsage"]
      ? item["delegatedSubnetsUsage"]
      : delegatedSubnetUsageArrayDeserializer(item["delegatedSubnetsUsage"]),
    location: item["location"],
    subscriptionId: item["subscriptionId"],
  };
}

export function delegatedSubnetUsageArrayDeserializer(result: Array<DelegatedSubnetUsage>): any[] {
  return result.map((item) => {
    return delegatedSubnetUsageDeserializer(item);
  });
}

/** Delegated subnet usage data. */
export interface DelegatedSubnetUsage {
  /** Name of the delegated subnet for which IP addresses are in use */
  readonly subnetName?: string;
  /** Number of IP addresses used by the delegated subnet */
  readonly usage?: number;
}

export function delegatedSubnetUsageDeserializer(item: any): DelegatedSubnetUsage {
  return {
    subnetName: item["subnetName"],
    usage: item["usage"],
  };
}

/** Known values of {@link MigrationListFilter} that the service accepts. */
export enum KnownMigrationListFilter {
  /** Active */
  Active = "Active",
  /** All */
  All = "All",
}

/** Type of MigrationListFilter */
export type MigrationListFilter = string;

/** Recommendations list filter. Retrieves recommendations based on type. */
export enum KnownRecommendationTypeParameterEnum {
  /** CreateIndex */
  CreateIndex = "CreateIndex",
  /** DropIndex */
  DropIndex = "DropIndex",
  /** ReIndex */
  ReIndex = "ReIndex",
  /** AnalyzeTable */
  AnalyzeTable = "AnalyzeTable",
}

/**
 * Recommendations list filter. Retrieves recommendations based on type. \
 * {@link KnownRecommendationTypeParameterEnum} can be used interchangeably with RecommendationTypeParameterEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CreateIndex** \
 * **DropIndex** \
 * **ReIndex** \
 * **AnalyzeTable**
 */
export type RecommendationTypeParameterEnum = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-08-01 API version. */
  V20250801 = "2025-08-01",
  /** The 2026-01-01-preview API version. */
  V20260101 = "2026-01-01-preview",
}

export function _migrationPropertiesSerializer(item: Migration): any {
  return {
    migrationInstanceResourceId: item["migrationInstanceResourceId"],
    migrationMode: item["migrationMode"],
    migrationOption: item["migrationOption"],
    sourceType: item["sourceType"],
    sslMode: item["sslMode"],
    sourceDbServerResourceId: item["sourceDbServerResourceId"],
    sourceDbServerFullyQualifiedDomainName: item["sourceDbServerFullyQualifiedDomainName"],
    targetDbServerFullyQualifiedDomainName: item["targetDbServerFullyQualifiedDomainName"],
    secretParameters: !item["secretParameters"]
      ? item["secretParameters"]
      : migrationSecretParametersSerializer(item["secretParameters"]),
    dbsToMigrate: !item["dbsToMigrate"]
      ? item["dbsToMigrate"]
      : item["dbsToMigrate"].map((p: any) => {
          return p;
        }),
    setupLogicalReplicationOnSourceDbIfNeeded: item["setupLogicalReplicationOnSourceDbIfNeeded"],
    overwriteDbsInTarget: item["overwriteDbsInTarget"],
    migrationWindowStartTimeInUtc: !item["migrationWindowStartTimeInUtc"]
      ? item["migrationWindowStartTimeInUtc"]
      : item["migrationWindowStartTimeInUtc"].toISOString(),
    migrationWindowEndTimeInUtc: !item["migrationWindowEndTimeInUtc"]
      ? item["migrationWindowEndTimeInUtc"]
      : item["migrationWindowEndTimeInUtc"].toISOString(),
    migrateRoles: item["migrateRoles"],
    startDataMigration: item["startDataMigration"],
    triggerCutover: item["triggerCutover"],
    dbsToTriggerCutoverOn: !item["dbsToTriggerCutoverOn"]
      ? item["dbsToTriggerCutoverOn"]
      : item["dbsToTriggerCutoverOn"].map((p: any) => {
          return p;
        }),
    cancel: item["cancel"],
    dbsToCancelMigrationOn: !item["dbsToCancelMigrationOn"]
      ? item["dbsToCancelMigrationOn"]
      : item["dbsToCancelMigrationOn"].map((p: any) => {
          return p;
        }),
  };
}

export function _migrationPropertiesDeserializer(item: any) {
  return {
    migrationId: item["migrationId"],
    currentStatus: !item["currentStatus"]
      ? item["currentStatus"]
      : migrationStatusDeserializer(item["currentStatus"]),
    migrationInstanceResourceId: item["migrationInstanceResourceId"],
    migrationMode: item["migrationMode"],
    migrationOption: item["migrationOption"],
    sourceType: item["sourceType"],
    sslMode: item["sslMode"],
    sourceDbServerMetadata: !item["sourceDbServerMetadata"]
      ? item["sourceDbServerMetadata"]
      : dbServerMetadataDeserializer(item["sourceDbServerMetadata"]),
    targetDbServerMetadata: !item["targetDbServerMetadata"]
      ? item["targetDbServerMetadata"]
      : dbServerMetadataDeserializer(item["targetDbServerMetadata"]),
    sourceDbServerResourceId: item["sourceDbServerResourceId"],
    sourceDbServerFullyQualifiedDomainName: item["sourceDbServerFullyQualifiedDomainName"],
    targetDbServerResourceId: item["targetDbServerResourceId"],
    targetDbServerFullyQualifiedDomainName: item["targetDbServerFullyQualifiedDomainName"],
    secretParameters: !item["secretParameters"]
      ? item["secretParameters"]
      : migrationSecretParametersDeserializer(item["secretParameters"]),
    dbsToMigrate: !item["dbsToMigrate"]
      ? item["dbsToMigrate"]
      : item["dbsToMigrate"].map((p: any) => {
          return p;
        }),
    setupLogicalReplicationOnSourceDbIfNeeded: item["setupLogicalReplicationOnSourceDbIfNeeded"],
    overwriteDbsInTarget: item["overwriteDbsInTarget"],
    migrationWindowStartTimeInUtc: !item["migrationWindowStartTimeInUtc"]
      ? item["migrationWindowStartTimeInUtc"]
      : new Date(item["migrationWindowStartTimeInUtc"]),
    migrationWindowEndTimeInUtc: !item["migrationWindowEndTimeInUtc"]
      ? item["migrationWindowEndTimeInUtc"]
      : new Date(item["migrationWindowEndTimeInUtc"]),
    migrateRoles: item["migrateRoles"],
    startDataMigration: item["startDataMigration"],
    triggerCutover: item["triggerCutover"],
    dbsToTriggerCutoverOn: !item["dbsToTriggerCutoverOn"]
      ? item["dbsToTriggerCutoverOn"]
      : item["dbsToTriggerCutoverOn"].map((p: any) => {
          return p;
        }),
    cancel: item["cancel"],
    dbsToCancelMigrationOn: !item["dbsToCancelMigrationOn"]
      ? item["dbsToCancelMigrationOn"]
      : item["dbsToCancelMigrationOn"].map((p: any) => {
          return p;
        }),
  };
}

export function _migrationResourceForPatchPropertiesSerializer(
  item: MigrationResourceForPatch,
): any {
  return {
    sourceDbServerResourceId: item["sourceDbServerResourceId"],
    sourceDbServerFullyQualifiedDomainName: item["sourceDbServerFullyQualifiedDomainName"],
    targetDbServerFullyQualifiedDomainName: item["targetDbServerFullyQualifiedDomainName"],
    secretParameters: !item["secretParameters"]
      ? item["secretParameters"]
      : migrationSecretParametersForPatchSerializer(item["secretParameters"]),
    dbsToMigrate: !item["dbsToMigrate"]
      ? item["dbsToMigrate"]
      : item["dbsToMigrate"].map((p: any) => {
          return p;
        }),
    setupLogicalReplicationOnSourceDbIfNeeded: item["setupLogicalReplicationOnSourceDbIfNeeded"],
    overwriteDbsInTarget: item["overwriteDbsInTarget"],
    migrationWindowStartTimeInUtc: !item["migrationWindowStartTimeInUtc"]
      ? item["migrationWindowStartTimeInUtc"]
      : item["migrationWindowStartTimeInUtc"].toISOString(),
    migrateRoles: item["migrateRoles"],
    startDataMigration: item["startDataMigration"],
    triggerCutover: item["triggerCutover"],
    dbsToTriggerCutoverOn: !item["dbsToTriggerCutoverOn"]
      ? item["dbsToTriggerCutoverOn"]
      : item["dbsToTriggerCutoverOn"].map((p: any) => {
          return p;
        }),
    cancel: item["cancel"],
    dbsToCancelMigrationOn: !item["dbsToCancelMigrationOn"]
      ? item["dbsToCancelMigrationOn"]
      : item["dbsToCancelMigrationOn"].map((p: any) => {
          return p;
        }),
    migrationMode: item["migrationMode"],
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _serverPropertiesSerializer(item: Server): any {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    storage: !item["storage"] ? item["storage"] : storageSerializer(item["storage"]),
    authConfig: !item["authConfig"] ? item["authConfig"] : authConfigSerializer(item["authConfig"]),
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionSerializer(item["dataEncryption"]),
    backup: !item["backup"] ? item["backup"] : backupSerializer(item["backup"]),
    network: !item["network"] ? item["network"] : networkSerializer(item["network"]),
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilitySerializer(item["highAvailability"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
    sourceServerResourceId: item["sourceServerResourceId"],
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : item["pointInTimeUTC"].toISOString(),
    availabilityZone: item["availabilityZone"],
    replicationRole: item["replicationRole"],
    replica: !item["replica"] ? item["replica"] : replicaSerializer(item["replica"]),
    createMode: item["createMode"],
    cluster: !item["cluster"] ? item["cluster"] : clusterSerializer(item["cluster"]),
  };
}

export function _serverPropertiesDeserializer(item: any) {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    minorVersion: item["minorVersion"],
    state: item["state"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    storage: !item["storage"] ? item["storage"] : storageDeserializer(item["storage"]),
    authConfig: !item["authConfig"]
      ? item["authConfig"]
      : authConfigDeserializer(item["authConfig"]),
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionDeserializer(item["dataEncryption"]),
    backup: !item["backup"] ? item["backup"] : backupDeserializer(item["backup"]),
    network: !item["network"] ? item["network"] : networkDeserializer(item["network"]),
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilityDeserializer(item["highAvailability"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowDeserializer(item["maintenanceWindow"]),
    sourceServerResourceId: item["sourceServerResourceId"],
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : new Date(item["pointInTimeUTC"]),
    availabilityZone: item["availabilityZone"],
    replicationRole: item["replicationRole"],
    replicaCapacity: item["replicaCapacity"],
    replica: !item["replica"] ? item["replica"] : replicaDeserializer(item["replica"]),
    createMode: item["createMode"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    cluster: !item["cluster"] ? item["cluster"] : clusterDeserializer(item["cluster"]),
  };
}

export function _serverForPatchPropertiesSerializer(item: ServerForPatch): any {
  return {
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    storage: !item["storage"] ? item["storage"] : storageSerializer(item["storage"]),
    backup: !item["backup"] ? item["backup"] : backupForPatchSerializer(item["backup"]),
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilityForPatchSerializer(item["highAvailability"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowForPatchSerializer(item["maintenanceWindow"]),
    authConfig: !item["authConfig"]
      ? item["authConfig"]
      : authConfigForPatchSerializer(item["authConfig"]),
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionSerializer(item["dataEncryption"]),
    availabilityZone: item["availabilityZone"],
    createMode: item["createMode"],
    replicationRole: item["replicationRole"],
    replica: !item["replica"] ? item["replica"] : replicaSerializer(item["replica"]),
    network: !item["network"] ? item["network"] : networkSerializer(item["network"]),
    cluster: !item["cluster"] ? item["cluster"] : clusterSerializer(item["cluster"]),
  };
}

export function _configurationPropertiesSerializer(item: Configuration): any {
  return { value: item["value"], source: item["source"] };
}

export function _configurationPropertiesDeserializer(item: any) {
  return {
    value: item["value"],
    description: item["description"],
    defaultValue: item["defaultValue"],
    dataType: item["dataType"],
    allowedValues: item["allowedValues"],
    source: item["source"],
    isDynamicConfig: item["isDynamicConfig"],
    isReadOnly: item["isReadOnly"],
    isConfigPendingRestart: item["isConfigPendingRestart"],
    unit: item["unit"],
    documentationLink: item["documentationLink"],
  };
}

export function _configurationForUpdatePropertiesSerializer(item: ConfigurationForUpdate): any {
  return { value: item["value"], source: item["source"] };
}

export function _configurationForUpdatePropertiesDeserializer(item: any) {
  return {
    value: item["value"],
    description: item["description"],
    defaultValue: item["defaultValue"],
    dataType: item["dataType"],
    allowedValues: item["allowedValues"],
    source: item["source"],
    isDynamicConfig: item["isDynamicConfig"],
    isReadOnly: item["isReadOnly"],
    isConfigPendingRestart: item["isConfigPendingRestart"],
    unit: item["unit"],
    documentationLink: item["documentationLink"],
  };
}

export function _databasePropertiesSerializer(item: Database): any {
  return { charset: item["charset"], collation: item["collation"] };
}

export function _databasePropertiesDeserializer(item: any) {
  return {
    charset: item["charset"],
    collation: item["collation"],
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

export function _privateLinkResourcePropertiesDeserializer(item: any) {
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

export function _virtualEndpointPropertiesSerializer(item: VirtualEndpoint): any {
  return {
    endpointType: item["endpointType"],
    members: !item["members"]
      ? item["members"]
      : item["members"].map((p: any) => {
          return p;
        }),
  };
}

export function _virtualEndpointPropertiesDeserializer(item: any) {
  return {
    endpointType: item["endpointType"],
    members: !item["members"]
      ? item["members"]
      : item["members"].map((p: any) => {
          return p;
        }),
    virtualEndpoints: !item["virtualEndpoints"]
      ? item["virtualEndpoints"]
      : item["virtualEndpoints"].map((p: any) => {
          return p;
        }),
  };
}

export function _virtualEndpointResourceForPatchPropertiesSerializer(
  item: VirtualEndpointResourceForPatch,
): any {
  return {
    endpointType: item["endpointType"],
    members: !item["members"]
      ? item["members"]
      : item["members"].map((p: any) => {
          return p;
        }),
  };
}

export function _virtualEndpointResourceForPatchPropertiesDeserializer(item: any) {
  return {
    endpointType: item["endpointType"],
    members: !item["members"]
      ? item["members"]
      : item["members"].map((p: any) => {
          return p;
        }),
    virtualEndpoints: !item["virtualEndpoints"]
      ? item["virtualEndpoints"]
      : item["virtualEndpoints"].map((p: any) => {
          return p;
        }),
  };
}

export function _administratorMicrosoftEntraPropertiesDeserializer(item: any) {
  return {
    principalType: item["principalType"],
    principalName: item["principalName"],
    objectId: item["objectId"],
    tenantId: item["tenantId"],
  };
}

export function _administratorMicrosoftEntraAddPropertiesSerializer(
  item: AdministratorMicrosoftEntraAdd,
): any {
  return {
    principalType: item["principalType"],
    principalName: item["principalName"],
    tenantId: item["tenantId"],
  };
}

export function _capturedLogPropertiesDeserializer(item: any) {
  return {
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    sizeInKb: item["sizeInKb"],
    typePropertiesType: item["type"],
    url: item["url"],
  };
}

export function _ltrPreBackupResponsePropertiesDeserializer(item: any) {
  return {
    numberOfContainers: item["numberOfContainers"],
  };
}

export function _backupsLongTermRetentionResponsePropertiesDeserializer(item: any) {
  return {
    datasourceSizeInBytes: item["datasourceSizeInBytes"],
    dataTransferredInBytes: item["dataTransferredInBytes"],
    backupName: item["backupName"],
    backupMetadata: item["backupMetadata"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    percentComplete: item["percentComplete"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
  };
}

export function _backupsLongTermRetentionOperationPropertiesDeserializer(item: any) {
  return {
    datasourceSizeInBytes: item["datasourceSizeInBytes"],
    dataTransferredInBytes: item["dataTransferredInBytes"],
    backupName: item["backupName"],
    backupMetadata: item["backupMetadata"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    percentComplete: item["percentComplete"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
  };
}

export function _advancedThreatProtectionSettingsModelPropertiesSerializer(
  item: AdvancedThreatProtectionSettingsModel,
): any {
  return { state: item["state"] };
}

export function _advancedThreatProtectionSettingsModelPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

export function _backupAutomaticAndOnDemandPropertiesDeserializer(item: any) {
  return {
    backupType: item["backupType"],
    completedTime: !item["completedTime"] ? item["completedTime"] : new Date(item["completedTime"]),
    source: item["source"],
  };
}

export function _objectRecommendationPropertiesDeserializer(item: any) {
  return {
    initialRecommendedTime: !item["initialRecommendedTime"]
      ? item["initialRecommendedTime"]
      : new Date(item["initialRecommendedTime"]),
    lastRecommendedTime: !item["lastRecommendedTime"]
      ? item["lastRecommendedTime"]
      : new Date(item["lastRecommendedTime"]),
    timesRecommended: item["timesRecommended"],
    improvedQueryIds: !item["improvedQueryIds"]
      ? item["improvedQueryIds"]
      : item["improvedQueryIds"].map((p: any) => {
          return p;
        }),
    recommendationReason: item["recommendationReason"],
    currentState: item["currentState"],
    recommendationType: item["recommendationType"],
    implementationDetails: !item["implementationDetails"]
      ? item["implementationDetails"]
      : objectRecommendationPropertiesImplementationDetailsDeserializer(
          item["implementationDetails"],
        ),
    analyzedWorkload: !item["analyzedWorkload"]
      ? item["analyzedWorkload"]
      : objectRecommendationPropertiesAnalyzedWorkloadDeserializer(item["analyzedWorkload"]),
    estimatedImpact: !item["estimatedImpact"]
      ? item["estimatedImpact"]
      : impactRecordArrayDeserializer(item["estimatedImpact"]),
    details: !item["details"]
      ? item["details"]
      : objectRecommendationDetailsDeserializer(item["details"]),
  };
}
