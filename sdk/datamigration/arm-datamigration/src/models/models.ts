// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Paged collection of OperationsDefinition items */
export interface _OperationListResult {
  /** The OperationsDefinition items on this page */
  readonly value: OperationsDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationsDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationsDefinitionArrayDeserializer(result: Array<OperationsDefinition>): any[] {
  return result.map((item) => {
    return operationsDefinitionDeserializer(item);
  });
}

/** model interface OperationsDefinition */
export interface OperationsDefinition {
  readonly name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  readonly display?: OperationsDisplayDefinition;
  readonly origin?: OperationOrigin;
  /** Dictionary of <AnyObject> */
  readonly properties?: Record<string, any>;
}

export function operationsDefinitionDeserializer(item: any): OperationsDefinition {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"]
      ? item["display"]
      : operationsDisplayDefinitionDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** model interface OperationsDisplayDefinition */
export interface OperationsDisplayDefinition {
  readonly provider?: string;
  readonly resource?: string;
  readonly operation?: string;
  readonly description?: string;
}

export function operationsDisplayDefinitionDeserializer(item: any): OperationsDisplayDefinition {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Known values of {@link OperationOrigin} that the service accepts. */
export enum KnownOperationOrigin {
  /** user */
  User = "user",
  /** system */
  System = "system",
}

/** Type of OperationOrigin */
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

/** Database Migration Resource for Mongo to CosmosDb. */
export interface DatabaseMigrationCosmosDbMongo extends ProxyResource {
  kind?: "MongoToCosmosDbMongo";
  /** Resource Id of the target resource. */
  scope?: string;
  /** Provisioning State of migration. ProvisioningState as Succeeded implies that validations have been performed and migration has started. */
  readonly provisioningState?: ProvisioningState;
  /** Migration status. */
  readonly migrationStatus?: string;
  /** Database migration start time. */
  readonly startedOn?: Date;
  /** Database migration end time. */
  readonly endedOn?: Date;
  /** Resource Id of the Migration Service. */
  migrationService?: string;
  /** ID for current migration operation. */
  migrationOperationId?: string;
  /** Error details in case of migration failure. */
  readonly migrationFailureError?: ErrorInfo;
  /** Error message for migration provisioning failure, if any. */
  provisioningError?: string;
  /** Source Mongo connection details. */
  sourceMongoConnection?: MongoConnectionInformation;
  /** Target Cosmos DB Mongo connection details. */
  targetMongoConnection?: MongoConnectionInformation;
  /** List of Mongo Collections to be migrated. */
  collectionList?: MongoMigrationCollection[];
}

export function databaseMigrationCosmosDbMongoSerializer(
  item: DatabaseMigrationCosmosDbMongo,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "kind",
      "scope",
      "migrationService",
      "migrationOperationId",
      "provisioningError",
      "sourceMongoConnection",
      "targetMongoConnection",
      "collectionList",
    ])
      ? undefined
      : _databaseMigrationCosmosDbMongoPropertiesSerializer(item),
  };
}

export function databaseMigrationCosmosDbMongoDeserializer(
  item: any,
): DatabaseMigrationCosmosDbMongo {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseMigrationCosmosDbMongoPropertiesDeserializer(item["properties"])),
  };
}

/** Database Migration Resource properties for CosmosDb for Mongo. */
export interface DatabaseMigrationPropertiesCosmosDbMongo extends DatabaseMigrationBaseProperties {
  /** Source Mongo connection details. */
  sourceMongoConnection?: MongoConnectionInformation;
  /** Target Cosmos DB Mongo connection details. */
  targetMongoConnection?: MongoConnectionInformation;
  /** List of Mongo Collections to be migrated. */
  collectionList?: MongoMigrationCollection[];
  kind: "MongoToCosmosDbMongo";
}

export function databaseMigrationPropertiesCosmosDbMongoSerializer(
  item: DatabaseMigrationPropertiesCosmosDbMongo,
): any {
  return {
    kind: item["kind"],
    scope: item["scope"],
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    provisioningError: item["provisioningError"],
    sourceMongoConnection: !item["sourceMongoConnection"]
      ? item["sourceMongoConnection"]
      : mongoConnectionInformationSerializer(item["sourceMongoConnection"]),
    targetMongoConnection: !item["targetMongoConnection"]
      ? item["targetMongoConnection"]
      : mongoConnectionInformationSerializer(item["targetMongoConnection"]),
    collectionList: !item["collectionList"]
      ? item["collectionList"]
      : mongoMigrationCollectionArraySerializer(item["collectionList"]),
  };
}

export function databaseMigrationPropertiesCosmosDbMongoDeserializer(
  item: any,
): DatabaseMigrationPropertiesCosmosDbMongo {
  return {
    kind: item["kind"],
    scope: item["scope"],
    provisioningState: item["provisioningState"],
    migrationStatus: item["migrationStatus"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    migrationFailureError: !item["migrationFailureError"]
      ? item["migrationFailureError"]
      : errorInfoDeserializer(item["migrationFailureError"]),
    provisioningError: item["provisioningError"],
    sourceMongoConnection: !item["sourceMongoConnection"]
      ? item["sourceMongoConnection"]
      : mongoConnectionInformationDeserializer(item["sourceMongoConnection"]),
    targetMongoConnection: !item["targetMongoConnection"]
      ? item["targetMongoConnection"]
      : mongoConnectionInformationDeserializer(item["targetMongoConnection"]),
    collectionList: !item["collectionList"]
      ? item["collectionList"]
      : mongoMigrationCollectionArrayDeserializer(item["collectionList"]),
  };
}

/** Mongo Connection */
export interface MongoConnectionInformation {
  /** Host of mongo connection. */
  host?: string;
  /** Port of mongo connection. */
  port?: number;
  /** User name to connect to Mongo. */
  userName?: string;
  /** Password to connect to Mongo. */
  password?: string;
  /** Whether to UseSsl or UseTls to connect to Mongo. Default is true. */
  useSsl?: boolean;
  /** ConnectionString to connect to Mongo. */
  connectionString?: string;
}

export function mongoConnectionInformationSerializer(item: MongoConnectionInformation): any {
  return {
    host: item["host"],
    port: item["port"],
    userName: item["userName"],
    password: item["password"],
    useSsl: item["useSsl"],
    connectionString: item["connectionString"],
  };
}

export function mongoConnectionInformationDeserializer(item: any): MongoConnectionInformation {
  return {
    host: item["host"],
    port: item["port"],
    userName: item["userName"],
    password: item["password"],
    useSsl: item["useSsl"],
    connectionString: item["connectionString"],
  };
}

export function mongoMigrationCollectionArraySerializer(
  result: Array<MongoMigrationCollection>,
): any[] {
  return result.map((item) => {
    return mongoMigrationCollectionSerializer(item);
  });
}

export function mongoMigrationCollectionArrayDeserializer(
  result: Array<MongoMigrationCollection>,
): any[] {
  return result.map((item) => {
    return mongoMigrationCollectionDeserializer(item);
  });
}

/** Mongo source and target database and collection details. */
export interface MongoMigrationCollection {
  /** Source database name. */
  sourceDatabase?: string;
  /** Source collection name. */
  sourceCollection?: string;
  /** Target database name. */
  targetDatabase?: string;
  /** Target collection name. */
  targetCollection?: string;
  /** Detailed migration status. Not included by default. */
  readonly migrationProgressDetails?: MongoMigrationProgressDetails;
}

export function mongoMigrationCollectionSerializer(item: MongoMigrationCollection): any {
  return {
    sourceDatabase: item["sourceDatabase"],
    sourceCollection: item["sourceCollection"],
    targetDatabase: item["targetDatabase"],
    targetCollection: item["targetCollection"],
  };
}

export function mongoMigrationCollectionDeserializer(item: any): MongoMigrationCollection {
  return {
    sourceDatabase: item["sourceDatabase"],
    sourceCollection: item["sourceCollection"],
    targetDatabase: item["targetDatabase"],
    targetCollection: item["targetCollection"],
    migrationProgressDetails: !item["migrationProgressDetails"]
      ? item["migrationProgressDetails"]
      : mongoMigrationProgressDetailsDeserializer(item["migrationProgressDetails"]),
  };
}

/** Detailed status of collection migration. */
export interface MongoMigrationProgressDetails {
  /** Migration Status */
  readonly migrationStatus?: MongoMigrationStatus;
  /** Migration Error */
  readonly migrationError?: string;
  /** Source Document Count */
  readonly sourceDocumentCount?: number;
  /** Processed Document Count */
  readonly processedDocumentCount?: number;
  /** Migration duration */
  readonly durationInSeconds?: number;
}

export function mongoMigrationProgressDetailsDeserializer(
  item: any,
): MongoMigrationProgressDetails {
  return {
    migrationStatus: item["migrationStatus"],
    migrationError: item["migrationError"],
    sourceDocumentCount: item["sourceDocumentCount"],
    processedDocumentCount: item["processedDocumentCount"],
    durationInSeconds: item["durationInSeconds"],
  };
}

/** Migration Status */
export enum KnownMongoMigrationStatus {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Migration Status \
 * {@link KnownMongoMigrationStatus} can be used interchangeably with MongoMigrationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: NotStarted \
 * **InProgress**: InProgress \
 * **Completed**: Completed \
 * **Failed**: Failed \
 * **Canceled**: Canceled
 */
export type MongoMigrationStatus = string;

/** Database Migration Base Resource properties. */
export interface DatabaseMigrationBaseProperties {
  kind: ResourceType;
  /** Resource Id of the target resource. */
  scope?: string;
  /** Provisioning State of migration. ProvisioningState as Succeeded implies that validations have been performed and migration has started. */
  readonly provisioningState?: ProvisioningState;
  /** Migration status. */
  readonly migrationStatus?: string;
  /** Database migration start time. */
  readonly startedOn?: Date;
  /** Database migration end time. */
  readonly endedOn?: Date;
  /** Resource Id of the Migration Service. */
  migrationService?: string;
  /** ID for current migration operation. */
  migrationOperationId?: string;
  /** Error details in case of migration failure. */
  readonly migrationFailureError?: ErrorInfo;
  /** Error message for migration provisioning failure, if any. */
  provisioningError?: string;
}

export function databaseMigrationBasePropertiesSerializer(
  item: DatabaseMigrationBaseProperties,
): any {
  return {
    kind: item["kind"],
    scope: item["scope"],
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    provisioningError: item["provisioningError"],
  };
}

export function databaseMigrationBasePropertiesDeserializer(
  item: any,
): DatabaseMigrationBaseProperties {
  return {
    kind: item["kind"],
    scope: item["scope"],
    provisioningState: item["provisioningState"],
    migrationStatus: item["migrationStatus"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    migrationFailureError: !item["migrationFailureError"]
      ? item["migrationFailureError"]
      : errorInfoDeserializer(item["migrationFailureError"]),
    provisioningError: item["provisioningError"],
  };
}

/** Alias for DatabaseMigrationBasePropertiesUnion */
export type DatabaseMigrationBasePropertiesUnion =
  | DatabaseMigrationPropertiesCosmosDbMongo
  | DatabaseMigrationPropertiesUnion
  | DatabaseMigrationBaseProperties;

export function databaseMigrationBasePropertiesUnionSerializer(
  item: DatabaseMigrationBasePropertiesUnion,
): any {
  switch (item.kind) {
    case "MongoToCosmosDbMongo":
      return databaseMigrationPropertiesCosmosDbMongoSerializer(
        item as DatabaseMigrationPropertiesCosmosDbMongo,
      );

    case "DatabaseMigrationProperties":
    case "SqlDb":
    case "SqlMi":
    case "SqlVm":
      return databaseMigrationPropertiesUnionSerializer(item as DatabaseMigrationPropertiesUnion);

    default:
      return databaseMigrationBasePropertiesSerializer(item);
  }
}

export function databaseMigrationBasePropertiesUnionDeserializer(
  item: any,
): DatabaseMigrationBasePropertiesUnion {
  switch (item["kind"]) {
    case "MongoToCosmosDbMongo":
      return databaseMigrationPropertiesCosmosDbMongoDeserializer(
        item as DatabaseMigrationPropertiesCosmosDbMongo,
      );

    case "DatabaseMigrationProperties":
    case "SqlDb":
    case "SqlMi":
    case "SqlVm":
      return databaseMigrationPropertiesUnionDeserializer(item as DatabaseMigrationPropertiesUnion);

    default:
      return databaseMigrationBasePropertiesDeserializer(item);
  }
}

/** Known values of {@link ResourceType} that the service accepts. */
export enum KnownResourceType {
  /** SqlMi */
  SqlMi = "SqlMi",
  /** SqlVm */
  SqlVm = "SqlVm",
  /** SqlDb */
  SqlDb = "SqlDb",
  /** MongoToCosmosDbMongo */
  MongoToCosmosDbMongo = "MongoToCosmosDbMongo",
  /** DatabaseMigrationProperties */
  DatabaseMigrationProperties = "DatabaseMigrationProperties",
}

/** Type of ResourceType */
export type ResourceType = string;

/** Provisioning State of migration. ProvisioningState as Succeeded implies that validations have been performed and migration has started. */
export enum KnownProvisioningState {
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Updating */
  Updating = "Updating",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Provisioning State of migration. ProvisioningState as Succeeded implies that validations have been performed and migration has started. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning**: Provisioning \
 * **Updating**: Updating \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled
 */
export type ProvisioningState = string;

/** Error details */
export interface ErrorInfo {
  /** Error code. */
  readonly code?: string;
  /** Error message. */
  readonly message?: string;
}

export function errorInfoDeserializer(item: any): ErrorInfo {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Database Migration Resource properties for SQL database. */
export interface DatabaseMigrationPropertiesSqlDb extends DatabaseMigrationProperties {
  /** Detailed migration status. Not included by default. */
  readonly migrationStatusDetails?: SqlDbMigrationStatusDetails;
  /** Target SQL DB connection details. */
  targetSqlConnection?: SqlConnectionInformation;
  /** Offline configuration. */
  readonly offlineConfiguration?: SqlDbOfflineConfiguration;
  /** List of tables to copy. */
  tableList?: string[];
  kind: "SqlDb";
}

export function databaseMigrationPropertiesSqlDbSerializer(
  item: DatabaseMigrationPropertiesSqlDb,
): any {
  return {
    kind: item["kind"],
    sourceSqlConnection: !item["sourceSqlConnection"]
      ? item["sourceSqlConnection"]
      : sqlConnectionInformationSerializer(item["sourceSqlConnection"]),
    sourceDatabaseName: item["sourceDatabaseName"],
    targetDatabaseCollation: item["targetDatabaseCollation"],
    sqlServerInstanceId: item["sqlServerInstanceId"],
    scope: item["scope"],
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    provisioningError: item["provisioningError"],
    targetSqlConnection: !item["targetSqlConnection"]
      ? item["targetSqlConnection"]
      : sqlConnectionInformationSerializer(item["targetSqlConnection"]),
    tableList: !item["tableList"]
      ? item["tableList"]
      : item["tableList"].map((p: any) => {
          return p;
        }),
  };
}

export function databaseMigrationPropertiesSqlDbDeserializer(
  item: any,
): DatabaseMigrationPropertiesSqlDb {
  return {
    kind: item["kind"],
    sourceSqlConnection: !item["sourceSqlConnection"]
      ? item["sourceSqlConnection"]
      : sqlConnectionInformationDeserializer(item["sourceSqlConnection"]),
    sourceDatabaseName: item["sourceDatabaseName"],
    sourceServerName: item["sourceServerName"],
    targetDatabaseCollation: item["targetDatabaseCollation"],
    sqlServerInstanceId: item["sqlServerInstanceId"],
    scope: item["scope"],
    provisioningState: item["provisioningState"],
    migrationStatus: item["migrationStatus"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    migrationFailureError: !item["migrationFailureError"]
      ? item["migrationFailureError"]
      : errorInfoDeserializer(item["migrationFailureError"]),
    provisioningError: item["provisioningError"],
    migrationStatusDetails: !item["migrationStatusDetails"]
      ? item["migrationStatusDetails"]
      : sqlDbMigrationStatusDetailsDeserializer(item["migrationStatusDetails"]),
    targetSqlConnection: !item["targetSqlConnection"]
      ? item["targetSqlConnection"]
      : sqlConnectionInformationDeserializer(item["targetSqlConnection"]),
    offlineConfiguration: !item["offlineConfiguration"]
      ? item["offlineConfiguration"]
      : sqlDbOfflineConfigurationDeserializer(item["offlineConfiguration"]),
    tableList: !item["tableList"]
      ? item["tableList"]
      : item["tableList"].map((p: any) => {
          return p;
        }),
  };
}

/** Detailed status of current Sql Db migration. */
export interface SqlDbMigrationStatusDetails {
  /** Current State of Migration. */
  readonly migrationState?: string;
  /** Sql Data Copy errors, if any. */
  readonly sqlDataCopyErrors?: string[];
  /** Details on progress of ADF copy activities. */
  readonly listOfCopyProgressDetails?: CopyProgressDetails[];
}

export function sqlDbMigrationStatusDetailsDeserializer(item: any): SqlDbMigrationStatusDetails {
  return {
    migrationState: item["migrationState"],
    sqlDataCopyErrors: !item["sqlDataCopyErrors"]
      ? item["sqlDataCopyErrors"]
      : item["sqlDataCopyErrors"].map((p: any) => {
          return p;
        }),
    listOfCopyProgressDetails: !item["listOfCopyProgressDetails"]
      ? item["listOfCopyProgressDetails"]
      : copyProgressDetailsArrayDeserializer(item["listOfCopyProgressDetails"]),
  };
}

export function copyProgressDetailsArrayDeserializer(result: Array<CopyProgressDetails>): any[] {
  return result.map((item) => {
    return copyProgressDetailsDeserializer(item);
  });
}

/** Details on progress of ADF copy activity */
export interface CopyProgressDetails {
  /** Table Name */
  readonly tableName?: string;
  /** Status of the Copy activity (InProgress, Succeeded, Failed, Canceled). */
  readonly status?: string;
  /** Type of parallel copy (Dynamic range, Physical partition, none). */
  readonly parallelCopyType?: string;
  /** The degree of parallelization. */
  readonly usedParallelCopies?: number;
  /** Bytes read */
  readonly dataRead?: number;
  /** Bytes written */
  readonly dataWritten?: number;
  /** Rows read */
  readonly rowsRead?: number;
  /** Rows Copied */
  readonly rowsCopied?: number;
  /** Copy Start */
  readonly copyStart?: Date;
  /** Copy throughput in KBps */
  readonly copyThroughput?: number;
  /** Copy Duration in seconds */
  readonly copyDuration?: number;
}

export function copyProgressDetailsDeserializer(item: any): CopyProgressDetails {
  return {
    tableName: item["tableName"],
    status: item["status"],
    parallelCopyType: item["parallelCopyType"],
    usedParallelCopies: item["usedParallelCopies"],
    dataRead: item["dataRead"],
    dataWritten: item["dataWritten"],
    rowsRead: item["rowsRead"],
    rowsCopied: item["rowsCopied"],
    copyStart: !item["copyStart"] ? item["copyStart"] : new Date(item["copyStart"]),
    copyThroughput: item["copyThroughput"],
    copyDuration: item["copyDuration"],
  };
}

/** Source SQL Connection */
export interface SqlConnectionInformation {
  /** Data source. */
  dataSource?: string;
  /** Authentication type. */
  authentication?: string;
  /** User name to connect to source SQL. */
  userName?: string;
  /** Password to connect to source SQL. */
  password?: string;
  /** Whether to encrypt connection or not. */
  encryptConnection?: boolean;
  /** Whether to trust server certificate or not. */
  trustServerCertificate?: boolean;
}

export function sqlConnectionInformationSerializer(item: SqlConnectionInformation): any {
  return {
    dataSource: item["dataSource"],
    authentication: item["authentication"],
    userName: item["userName"],
    password: item["password"],
    encryptConnection: item["encryptConnection"],
    trustServerCertificate: item["trustServerCertificate"],
  };
}

export function sqlConnectionInformationDeserializer(item: any): SqlConnectionInformation {
  return {
    dataSource: item["dataSource"],
    authentication: item["authentication"],
    userName: item["userName"],
    password: item["password"],
    encryptConnection: item["encryptConnection"],
    trustServerCertificate: item["trustServerCertificate"],
  };
}

/** Offline configuration */
export interface SqlDbOfflineConfiguration {
  /** Offline migration */
  readonly offline?: boolean;
}

export function sqlDbOfflineConfigurationDeserializer(item: any): SqlDbOfflineConfiguration {
  return {
    offline: item["offline"],
  };
}

/** Database Migration Resource properties. */
export interface DatabaseMigrationProperties extends DatabaseMigrationBaseProperties {
  kind: "DatabaseMigrationProperties" | "SqlDb" | "SqlMi" | "SqlVm";
  /** Source SQL Server connection details. */
  sourceSqlConnection?: SqlConnectionInformation;
  /** Name of the source database. */
  sourceDatabaseName?: string;
  /** Name of the source sql server. */
  readonly sourceServerName?: string;
  /** Database collation to be used for the target database. */
  targetDatabaseCollation?: string;
  /** Optional property - Resource Id for the source Sql server instance. Validations are performed on this property to ensure that it follows the correct format. */
  sqlServerInstanceId?: string;
}

export function databaseMigrationPropertiesSerializer(item: DatabaseMigrationProperties): any {
  return {
    kind: item["kind"],
    scope: item["scope"],
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    provisioningError: item["provisioningError"],
    sourceSqlConnection: !item["sourceSqlConnection"]
      ? item["sourceSqlConnection"]
      : sqlConnectionInformationSerializer(item["sourceSqlConnection"]),
    sourceDatabaseName: item["sourceDatabaseName"],
    targetDatabaseCollation: item["targetDatabaseCollation"],
    sqlServerInstanceId: item["sqlServerInstanceId"],
  };
}

export function databaseMigrationPropertiesDeserializer(item: any): DatabaseMigrationProperties {
  return {
    kind: item["kind"],
    scope: item["scope"],
    provisioningState: item["provisioningState"],
    migrationStatus: item["migrationStatus"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    migrationFailureError: !item["migrationFailureError"]
      ? item["migrationFailureError"]
      : errorInfoDeserializer(item["migrationFailureError"]),
    provisioningError: item["provisioningError"],
    sourceSqlConnection: !item["sourceSqlConnection"]
      ? item["sourceSqlConnection"]
      : sqlConnectionInformationDeserializer(item["sourceSqlConnection"]),
    sourceDatabaseName: item["sourceDatabaseName"],
    sourceServerName: item["sourceServerName"],
    targetDatabaseCollation: item["targetDatabaseCollation"],
    sqlServerInstanceId: item["sqlServerInstanceId"],
  };
}

/** Alias for DatabaseMigrationPropertiesUnion */
export type DatabaseMigrationPropertiesUnion =
  | DatabaseMigrationPropertiesSqlDb
  | DatabaseMigrationPropertiesSqlMi
  | DatabaseMigrationPropertiesSqlVm
  | DatabaseMigrationProperties;

export function databaseMigrationPropertiesUnionSerializer(
  item: DatabaseMigrationPropertiesUnion,
): any {
  switch (item.kind) {
    case "SqlDb":
      return databaseMigrationPropertiesSqlDbSerializer(item as DatabaseMigrationPropertiesSqlDb);

    case "SqlMi":
      return databaseMigrationPropertiesSqlMiSerializer(item as DatabaseMigrationPropertiesSqlMi);

    case "SqlVm":
      return databaseMigrationPropertiesSqlVmSerializer(item as DatabaseMigrationPropertiesSqlVm);

    default:
      return databaseMigrationPropertiesSerializer(item);
  }
}

export function databaseMigrationPropertiesUnionDeserializer(
  item: any,
): DatabaseMigrationPropertiesUnion {
  switch (item["kind"]) {
    case "SqlDb":
      return databaseMigrationPropertiesSqlDbDeserializer(item as DatabaseMigrationPropertiesSqlDb);

    case "SqlMi":
      return databaseMigrationPropertiesSqlMiDeserializer(item as DatabaseMigrationPropertiesSqlMi);

    case "SqlVm":
      return databaseMigrationPropertiesSqlVmDeserializer(item as DatabaseMigrationPropertiesSqlVm);

    default:
      return databaseMigrationPropertiesDeserializer(item);
  }
}

/** Database Migration Resource properties for SQL Managed Instance. */
export interface DatabaseMigrationPropertiesSqlMi extends DatabaseMigrationProperties {
  /** Detailed migration status. Not included by default. */
  readonly migrationStatusDetails?: MigrationStatusDetails;
  /** Backup configuration info. */
  backupConfiguration?: BackupConfiguration;
  /** Offline configuration. */
  offlineConfiguration?: OfflineConfiguration;
  kind: "SqlMi";
}

export function databaseMigrationPropertiesSqlMiSerializer(
  item: DatabaseMigrationPropertiesSqlMi,
): any {
  return {
    kind: item["kind"],
    sourceSqlConnection: !item["sourceSqlConnection"]
      ? item["sourceSqlConnection"]
      : sqlConnectionInformationSerializer(item["sourceSqlConnection"]),
    sourceDatabaseName: item["sourceDatabaseName"],
    targetDatabaseCollation: item["targetDatabaseCollation"],
    sqlServerInstanceId: item["sqlServerInstanceId"],
    scope: item["scope"],
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    provisioningError: item["provisioningError"],
    backupConfiguration: !item["backupConfiguration"]
      ? item["backupConfiguration"]
      : backupConfigurationSerializer(item["backupConfiguration"]),
    offlineConfiguration: !item["offlineConfiguration"]
      ? item["offlineConfiguration"]
      : offlineConfigurationSerializer(item["offlineConfiguration"]),
  };
}

export function databaseMigrationPropertiesSqlMiDeserializer(
  item: any,
): DatabaseMigrationPropertiesSqlMi {
  return {
    kind: item["kind"],
    sourceSqlConnection: !item["sourceSqlConnection"]
      ? item["sourceSqlConnection"]
      : sqlConnectionInformationDeserializer(item["sourceSqlConnection"]),
    sourceDatabaseName: item["sourceDatabaseName"],
    sourceServerName: item["sourceServerName"],
    targetDatabaseCollation: item["targetDatabaseCollation"],
    sqlServerInstanceId: item["sqlServerInstanceId"],
    scope: item["scope"],
    provisioningState: item["provisioningState"],
    migrationStatus: item["migrationStatus"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    migrationFailureError: !item["migrationFailureError"]
      ? item["migrationFailureError"]
      : errorInfoDeserializer(item["migrationFailureError"]),
    provisioningError: item["provisioningError"],
    migrationStatusDetails: !item["migrationStatusDetails"]
      ? item["migrationStatusDetails"]
      : migrationStatusDetailsDeserializer(item["migrationStatusDetails"]),
    backupConfiguration: !item["backupConfiguration"]
      ? item["backupConfiguration"]
      : backupConfigurationDeserializer(item["backupConfiguration"]),
    offlineConfiguration: !item["offlineConfiguration"]
      ? item["offlineConfiguration"]
      : offlineConfigurationDeserializer(item["offlineConfiguration"]),
  };
}

/** Detailed status of current migration. */
export interface MigrationStatusDetails {
  /** Current State of Migration. */
  readonly migrationState?: string;
  /** Details of full backup set. */
  readonly fullBackupSetInfo?: SqlBackupSetInfo;
  /** Last applied backup set information. */
  readonly lastRestoredBackupSetInfo?: SqlBackupSetInfo;
  /** Backup sets that are currently active. */
  readonly activeBackupSets?: SqlBackupSetInfo[];
  /** Files that are not valid backup files. */
  readonly invalidFiles?: string[];
  /** Name of blob container. */
  readonly blobContainerName?: string;
  /** Whether full backup has been applied to the target database or not. */
  readonly isFullBackupRestored?: boolean;
  /** Restore blocking reason, if any */
  readonly restoreBlockingReason?: string;
  /** Complete restore error message, if any */
  readonly completeRestoreErrorMessage?: string;
  /** File upload blocking errors, if any. */
  readonly fileUploadBlockingErrors?: string[];
  /** File name that is currently being restored. */
  readonly currentRestoringFilename?: string;
  /** Last restored file name. */
  readonly lastRestoredFilename?: string;
  /** Total pending log backups. */
  readonly pendingLogBackupsCount?: number;
}

export function migrationStatusDetailsDeserializer(item: any): MigrationStatusDetails {
  return {
    migrationState: item["migrationState"],
    fullBackupSetInfo: !item["fullBackupSetInfo"]
      ? item["fullBackupSetInfo"]
      : sqlBackupSetInfoDeserializer(item["fullBackupSetInfo"]),
    lastRestoredBackupSetInfo: !item["lastRestoredBackupSetInfo"]
      ? item["lastRestoredBackupSetInfo"]
      : sqlBackupSetInfoDeserializer(item["lastRestoredBackupSetInfo"]),
    activeBackupSets: !item["activeBackupSets"]
      ? item["activeBackupSets"]
      : sqlBackupSetInfoArrayDeserializer(item["activeBackupSets"]),
    invalidFiles: !item["invalidFiles"]
      ? item["invalidFiles"]
      : item["invalidFiles"].map((p: any) => {
          return p;
        }),
    blobContainerName: item["blobContainerName"],
    isFullBackupRestored: item["isFullBackupRestored"],
    restoreBlockingReason: item["restoreBlockingReason"],
    completeRestoreErrorMessage: item["completeRestoreErrorMessage"],
    fileUploadBlockingErrors: !item["fileUploadBlockingErrors"]
      ? item["fileUploadBlockingErrors"]
      : item["fileUploadBlockingErrors"].map((p: any) => {
          return p;
        }),
    currentRestoringFilename: item["currentRestoringFilename"],
    lastRestoredFilename: item["lastRestoredFilename"],
    pendingLogBackupsCount: item["pendingLogBackupsCount"],
  };
}

/** Information of backup set */
export interface SqlBackupSetInfo {
  /** Backup set id. */
  readonly backupSetId?: string;
  /** First LSN of the backup set. */
  readonly firstLSN?: string;
  /** Last LSN of the backup set. */
  readonly lastLSN?: string;
  /** Backup type. */
  readonly backupType?: string;
  /** List of files in the backup set. */
  readonly listOfBackupFiles?: SqlBackupFileInfo[];
  /** Backup start date. */
  readonly backupStartDate?: Date;
  /** Backup end time. */
  readonly backupFinishDate?: Date;
  /** Whether this backup set has been restored or not. */
  readonly isBackupRestored?: boolean;
  /** Has Backup Checksums */
  readonly hasBackupChecksums?: boolean;
  /** Media family count */
  readonly familyCount?: number;
  /** The reasons why the backup set is ignored */
  readonly ignoreReasons?: string[];
}

export function sqlBackupSetInfoDeserializer(item: any): SqlBackupSetInfo {
  return {
    backupSetId: item["backupSetId"],
    firstLSN: item["firstLSN"],
    lastLSN: item["lastLSN"],
    backupType: item["backupType"],
    listOfBackupFiles: !item["listOfBackupFiles"]
      ? item["listOfBackupFiles"]
      : sqlBackupFileInfoArrayDeserializer(item["listOfBackupFiles"]),
    backupStartDate: !item["backupStartDate"]
      ? item["backupStartDate"]
      : new Date(item["backupStartDate"]),
    backupFinishDate: !item["backupFinishDate"]
      ? item["backupFinishDate"]
      : new Date(item["backupFinishDate"]),
    isBackupRestored: item["isBackupRestored"],
    hasBackupChecksums: item["hasBackupChecksums"],
    familyCount: item["familyCount"],
    ignoreReasons: !item["ignoreReasons"]
      ? item["ignoreReasons"]
      : item["ignoreReasons"].map((p: any) => {
          return p;
        }),
  };
}

export function sqlBackupFileInfoArrayDeserializer(result: Array<SqlBackupFileInfo>): any[] {
  return result.map((item) => {
    return sqlBackupFileInfoDeserializer(item);
  });
}

/** Information of backup file */
export interface SqlBackupFileInfo {
  /** File name. */
  readonly fileName?: string;
  /** Status of the file. (Initial, Uploading, Uploaded, Restoring, Restored or Skipped) */
  readonly status?: string;
  /** File size in bytes */
  readonly totalSize?: number;
  /** Bytes read */
  readonly dataRead?: number;
  /** Bytes written */
  readonly dataWritten?: number;
  /** Copy throughput in KBps */
  readonly copyThroughput?: number;
  /** Copy Duration in seconds */
  readonly copyDuration?: number;
  /** Media family sequence number */
  readonly familySequenceNumber?: number;
}

export function sqlBackupFileInfoDeserializer(item: any): SqlBackupFileInfo {
  return {
    fileName: item["fileName"],
    status: item["status"],
    totalSize: item["totalSize"],
    dataRead: item["dataRead"],
    dataWritten: item["dataWritten"],
    copyThroughput: item["copyThroughput"],
    copyDuration: item["copyDuration"],
    familySequenceNumber: item["familySequenceNumber"],
  };
}

export function sqlBackupSetInfoArrayDeserializer(result: Array<SqlBackupSetInfo>): any[] {
  return result.map((item) => {
    return sqlBackupSetInfoDeserializer(item);
  });
}

/** Backup Configuration */
export interface BackupConfiguration {
  /** Source location of backups. */
  sourceLocation?: SourceLocation;
  /** Target location for copying backups. */
  targetLocation?: TargetLocation;
}

export function backupConfigurationSerializer(item: BackupConfiguration): any {
  return {
    sourceLocation: !item["sourceLocation"]
      ? item["sourceLocation"]
      : sourceLocationSerializer(item["sourceLocation"]),
    targetLocation: !item["targetLocation"]
      ? item["targetLocation"]
      : targetLocationSerializer(item["targetLocation"]),
  };
}

export function backupConfigurationDeserializer(item: any): BackupConfiguration {
  return {
    sourceLocation: !item["sourceLocation"]
      ? item["sourceLocation"]
      : sourceLocationDeserializer(item["sourceLocation"]),
    targetLocation: !item["targetLocation"]
      ? item["targetLocation"]
      : targetLocationDeserializer(item["targetLocation"]),
  };
}

/** Source Location details of backups. */
export interface SourceLocation {
  /** Source File share. */
  fileShare?: SqlFileShare;
  /** Source Azure Blob. */
  azureBlob?: AzureBlob;
  /** Backup storage Type. */
  readonly fileStorageType?: string;
}

export function sourceLocationSerializer(item: SourceLocation): any {
  return {
    fileShare: !item["fileShare"] ? item["fileShare"] : sqlFileShareSerializer(item["fileShare"]),
    azureBlob: !item["azureBlob"] ? item["azureBlob"] : azureBlobSerializer(item["azureBlob"]),
  };
}

export function sourceLocationDeserializer(item: any): SourceLocation {
  return {
    fileShare: !item["fileShare"] ? item["fileShare"] : sqlFileShareDeserializer(item["fileShare"]),
    azureBlob: !item["azureBlob"] ? item["azureBlob"] : azureBlobDeserializer(item["azureBlob"]),
    fileStorageType: item["fileStorageType"],
  };
}

/** File share */
export interface SqlFileShare {
  /** Location as SMB share or local drive where backups are placed. */
  path?: string;
  /** Username to access the file share location for backups. */
  username?: string;
  /** Password for username to access file share location. */
  password?: string;
}

export function sqlFileShareSerializer(item: SqlFileShare): any {
  return { path: item["path"], username: item["username"], password: item["password"] };
}

export function sqlFileShareDeserializer(item: any): SqlFileShare {
  return {
    path: item["path"],
    username: item["username"],
    password: item["password"],
  };
}

/** Azure Blob Details */
export interface AzureBlob {
  /** Authentication type used for accessing Azure Blob Storage. */
  authType?: AuthType;
  /** Identity details for authentication using a Managed Identity. */
  identity?: ManagedServiceIdentity;
  /** Resource Id of the storage account where backups are stored. */
  storageAccountResourceId?: string;
  /** Storage Account Key. */
  accountKey?: string;
  /** Blob container name where backups are stored. */
  blobContainerName?: string;
}

export function azureBlobSerializer(item: AzureBlob): any {
  return {
    authType: item["authType"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    storageAccountResourceId: item["storageAccountResourceId"],
    accountKey: item["accountKey"],
    blobContainerName: item["blobContainerName"],
  };
}

export function azureBlobDeserializer(item: any): AzureBlob {
  return {
    authType: item["authType"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    storageAccountResourceId: item["storageAccountResourceId"],
    accountKey: item["accountKey"],
    blobContainerName: item["blobContainerName"],
  };
}

/** Authentication type used for accessing Azure Blob Storage. */
export type AuthType = "AccountKey" | "ManagedIdentity";

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
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
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Target Location details for optional copy of backups */
export interface TargetLocation {
  /** Resource Id of the storage account copying backups. */
  storageAccountResourceId?: string;
  /** Storage Account Key. */
  accountKey?: string;
}

export function targetLocationSerializer(item: TargetLocation): any {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    accountKey: item["accountKey"],
  };
}

export function targetLocationDeserializer(item: any): TargetLocation {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    accountKey: item["accountKey"],
  };
}

/** Offline configuration */
export interface OfflineConfiguration {
  /** Offline migration */
  offline?: boolean;
  /** Last backup name for offline migration. This is optional for migrations from file share. If it is not provided, then the service will determine the last backup file name based on latest backup files present in file share. */
  lastBackupName?: string;
}

export function offlineConfigurationSerializer(item: OfflineConfiguration): any {
  return { offline: item["offline"], lastBackupName: item["lastBackupName"] };
}

export function offlineConfigurationDeserializer(item: any): OfflineConfiguration {
  return {
    offline: item["offline"],
    lastBackupName: item["lastBackupName"],
  };
}

/** Database Migration Resource properties for SQL Virtual Machine. */
export interface DatabaseMigrationPropertiesSqlVm extends DatabaseMigrationProperties {
  /** Detailed migration status. Not included by default. */
  readonly migrationStatusDetails?: MigrationStatusDetails;
  /** Backup configuration info. */
  backupConfiguration?: BackupConfiguration;
  /** Offline configuration. */
  offlineConfiguration?: OfflineConfiguration;
  kind: "SqlVm";
}

export function databaseMigrationPropertiesSqlVmSerializer(
  item: DatabaseMigrationPropertiesSqlVm,
): any {
  return {
    kind: item["kind"],
    sourceSqlConnection: !item["sourceSqlConnection"]
      ? item["sourceSqlConnection"]
      : sqlConnectionInformationSerializer(item["sourceSqlConnection"]),
    sourceDatabaseName: item["sourceDatabaseName"],
    targetDatabaseCollation: item["targetDatabaseCollation"],
    sqlServerInstanceId: item["sqlServerInstanceId"],
    scope: item["scope"],
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    provisioningError: item["provisioningError"],
    backupConfiguration: !item["backupConfiguration"]
      ? item["backupConfiguration"]
      : backupConfigurationSerializer(item["backupConfiguration"]),
    offlineConfiguration: !item["offlineConfiguration"]
      ? item["offlineConfiguration"]
      : offlineConfigurationSerializer(item["offlineConfiguration"]),
  };
}

export function databaseMigrationPropertiesSqlVmDeserializer(
  item: any,
): DatabaseMigrationPropertiesSqlVm {
  return {
    kind: item["kind"],
    sourceSqlConnection: !item["sourceSqlConnection"]
      ? item["sourceSqlConnection"]
      : sqlConnectionInformationDeserializer(item["sourceSqlConnection"]),
    sourceDatabaseName: item["sourceDatabaseName"],
    sourceServerName: item["sourceServerName"],
    targetDatabaseCollation: item["targetDatabaseCollation"],
    sqlServerInstanceId: item["sqlServerInstanceId"],
    scope: item["scope"],
    provisioningState: item["provisioningState"],
    migrationStatus: item["migrationStatus"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    migrationFailureError: !item["migrationFailureError"]
      ? item["migrationFailureError"]
      : errorInfoDeserializer(item["migrationFailureError"]),
    provisioningError: item["provisioningError"],
    migrationStatusDetails: !item["migrationStatusDetails"]
      ? item["migrationStatusDetails"]
      : migrationStatusDetailsDeserializer(item["migrationStatusDetails"]),
    backupConfiguration: !item["backupConfiguration"]
      ? item["backupConfiguration"]
      : backupConfigurationDeserializer(item["backupConfiguration"]),
    offlineConfiguration: !item["offlineConfiguration"]
      ? item["offlineConfiguration"]
      : offlineConfigurationDeserializer(item["offlineConfiguration"]),
  };
}

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

/** The response of a DatabaseMigrationCosmosDbMongo list operation. */
export interface _DatabaseMigrationCosmosDbMongoListResult {
  /** The DatabaseMigrationCosmosDbMongo items on this page */
  readonly value: DatabaseMigrationCosmosDbMongo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseMigrationCosmosDbMongoListResultDeserializer(
  item: any,
): _DatabaseMigrationCosmosDbMongoListResult {
  return {
    value: databaseMigrationCosmosDbMongoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseMigrationCosmosDbMongoArraySerializer(
  result: Array<DatabaseMigrationCosmosDbMongo>,
): any[] {
  return result.map((item) => {
    return databaseMigrationCosmosDbMongoSerializer(item);
  });
}

export function databaseMigrationCosmosDbMongoArrayDeserializer(
  result: Array<DatabaseMigrationCosmosDbMongo>,
): any[] {
  return result.map((item) => {
    return databaseMigrationCosmosDbMongoDeserializer(item);
  });
}

/** A Migration Service. */
export interface MigrationService extends TrackedResource {
  /** Provisioning state to track the async operation status. */
  readonly provisioningState?: ProvisioningState;
  /** Current state of the Integration runtime. */
  readonly integrationRuntimeState?: string;
}

export function migrationServiceSerializer(item: MigrationService): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [])
      ? undefined
      : _migrationServicePropertiesSerializer(item),
  };
}

export function migrationServiceDeserializer(item: any): MigrationService {
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
      : _migrationServicePropertiesDeserializer(item["properties"])),
  };
}

/** The Migration Service properties. */
export interface MigrationServiceProperties {
  /** Provisioning state to track the async operation status. */
  readonly provisioningState?: ProvisioningState;
  /** Current state of the Integration runtime. */
  readonly integrationRuntimeState?: string;
}

export function migrationServicePropertiesSerializer(_item: MigrationServiceProperties): any {
  return {};
}

export function migrationServicePropertiesDeserializer(item: any): MigrationServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    integrationRuntimeState: item["integrationRuntimeState"],
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

/** An update to a Migration Service. */
export interface MigrationServiceUpdate {
  /** Dictionary of <string> */
  tags?: Record<string, string>;
}

export function migrationServiceUpdateSerializer(item: MigrationServiceUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a MigrationService list operation. */
export interface _MigrationServiceListResult {
  /** The MigrationService items on this page */
  readonly value: MigrationService[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _migrationServiceListResultDeserializer(item: any): _MigrationServiceListResult {
  return {
    value: migrationServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function migrationServiceArraySerializer(result: Array<MigrationService>): any[] {
  return result.map((item) => {
    return migrationServiceSerializer(item);
  });
}

export function migrationServiceArrayDeserializer(result: Array<MigrationService>): any[] {
  return result.map((item) => {
    return migrationServiceDeserializer(item);
  });
}

/** The response of a DatabaseMigrationBase list operation. */
export interface _DatabaseMigrationBaseListResult {
  /** The DatabaseMigrationBase items on this page */
  readonly value: DatabaseMigrationBase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseMigrationBaseListResultDeserializer(
  item: any,
): _DatabaseMigrationBaseListResult {
  return {
    value: databaseMigrationBaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseMigrationBaseArrayDeserializer(
  result: Array<DatabaseMigrationBase>,
): any[] {
  return result.map((item) => {
    return databaseMigrationBaseDeserializer(item);
  });
}

/** Database Migration Resource. */
export interface DatabaseMigrationBase extends ProxyResource {
  /** Database Migration Base Resource properties. */
  properties?: DatabaseMigrationBasePropertiesUnion;
}

export function databaseMigrationBaseDeserializer(item: any): DatabaseMigrationBase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : databaseMigrationBasePropertiesUnionDeserializer(item["properties"]),
  };
}

/** A SQL Migration Service. */
export interface SqlMigrationService extends ProxyResource {
  location?: string;
  tags?: Record<string, string>;
  /** Provisioning state to track the async operation status. */
  readonly provisioningState?: string;
  /** Current state of the Integration runtime. */
  readonly integrationRuntimeState?: string;
}

export function sqlMigrationServiceSerializer(item: SqlMigrationService): any {
  return {
    properties: areAllPropsUndefined(item, [])
      ? undefined
      : _sqlMigrationServicePropertiesSerializer(item),
    location: item["location"],
    tags: item["tags"],
  };
}

export function sqlMigrationServiceDeserializer(item: any): SqlMigrationService {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlMigrationServicePropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The SQL Migration Service properties. */
export interface SqlMigrationServiceProperties {
  /** Provisioning state to track the async operation status. */
  readonly provisioningState?: string;
  /** Current state of the Integration runtime. */
  readonly integrationRuntimeState?: string;
}

export function sqlMigrationServicePropertiesSerializer(_item: SqlMigrationServiceProperties): any {
  return {};
}

export function sqlMigrationServicePropertiesDeserializer(
  item: any,
): SqlMigrationServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    integrationRuntimeState: item["integrationRuntimeState"],
  };
}

/** An update to a SQL Migration Service. */
export interface SqlMigrationServiceUpdate {
  /** Dictionary of <string> */
  tags?: Record<string, string>;
}

export function sqlMigrationServiceUpdateSerializer(item: SqlMigrationServiceUpdate): any {
  return { tags: item["tags"] };
}

/** A list of SQL Migration Service. */
export interface _SqlMigrationListResult {
  /** The SqlMigrationService items on this page */
  readonly value: SqlMigrationService[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sqlMigrationListResultDeserializer(item: any): _SqlMigrationListResult {
  return {
    value: sqlMigrationServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlMigrationServiceArraySerializer(result: Array<SqlMigrationService>): any[] {
  return result.map((item) => {
    return sqlMigrationServiceSerializer(item);
  });
}

export function sqlMigrationServiceArrayDeserializer(result: Array<SqlMigrationService>): any[] {
  return result.map((item) => {
    return sqlMigrationServiceDeserializer(item);
  });
}

/** An authentication key. */
export interface AuthenticationKeys {
  /** The first authentication key. */
  authKey1?: string;
  /** The second authentication key. */
  authKey2?: string;
}

export function authenticationKeysDeserializer(item: any): AuthenticationKeys {
  return {
    authKey1: item["authKey1"],
    authKey2: item["authKey2"],
  };
}

/** An authentication key to regenerate. */
export interface RegenAuthKeys {
  /** The name of authentication key to generate. */
  keyName?: string;
  /** The first authentication key. */
  authKey1?: string;
  /** The second authentication key. */
  authKey2?: string;
}

export function regenAuthKeysSerializer(item: RegenAuthKeys): any {
  return { keyName: item["keyName"], authKey1: item["authKey1"], authKey2: item["authKey2"] };
}

export function regenAuthKeysDeserializer(item: any): RegenAuthKeys {
  return {
    keyName: item["keyName"],
    authKey1: item["authKey1"],
    authKey2: item["authKey2"],
  };
}

/** Details of node to be deleted. */
export interface DeleteNode {
  /** The name of node to delete. */
  nodeName?: string;
  /** The name of integration runtime. */
  integrationRuntimeName?: string;
}

export function deleteNodeSerializer(item: DeleteNode): any {
  return { nodeName: item["nodeName"], integrationRuntimeName: item["integrationRuntimeName"] };
}

export function deleteNodeDeserializer(item: any): DeleteNode {
  return {
    nodeName: item["nodeName"],
    integrationRuntimeName: item["integrationRuntimeName"],
  };
}

/** The response of a DatabaseMigration list operation. */
export interface _DatabaseMigrationListResult {
  /** The DatabaseMigration items on this page */
  readonly value: DatabaseMigration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseMigrationListResultDeserializer(item: any): _DatabaseMigrationListResult {
  return {
    value: databaseMigrationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseMigrationArrayDeserializer(result: Array<DatabaseMigration>): any[] {
  return result.map((item) => {
    return databaseMigrationDeserializer(item);
  });
}

/** Database Migration Resource. */
export interface DatabaseMigration extends ProxyResource {
  /** Database Migration Resource properties. */
  properties?: DatabaseMigrationPropertiesUnion;
}

export function databaseMigrationDeserializer(item: any): DatabaseMigration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : databaseMigrationPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Integration Runtime Monitoring Data. */
export interface IntegrationRuntimeMonitoringData {
  /** The name of Integration Runtime. */
  readonly name?: string;
  /** Integration Runtime node monitoring data. */
  readonly nodes?: NodeMonitoringData[];
}

export function integrationRuntimeMonitoringDataDeserializer(
  item: any,
): IntegrationRuntimeMonitoringData {
  return {
    name: item["name"],
    nodes: !item["nodes"] ? item["nodes"] : nodeMonitoringDataArrayDeserializer(item["nodes"]),
  };
}

export function nodeMonitoringDataArrayDeserializer(result: Array<NodeMonitoringData>): any[] {
  return result.map((item) => {
    return nodeMonitoringDataDeserializer(item);
  });
}

/** model interface NodeMonitoringData */
export interface NodeMonitoringData {
  /** Unmatched properties from the message are deserialized in this collection. */
  readonly additionalProperties?: Record<string, any>;
  /** Name of the integration runtime node. */
  readonly nodeName?: string;
  /** Available memory (MB) on the integration runtime node. */
  readonly availableMemoryInMB?: number;
  /** CPU percentage on the integration runtime node. */
  readonly cpuUtilization?: number;
  /** Maximum concurrent jobs on the integration runtime node. */
  readonly concurrentJobsLimit?: number;
  /** The number of jobs currently running on the integration runtime node. */
  readonly concurrentJobsRunning?: number;
  /** The maximum concurrent jobs in this integration runtime. */
  readonly maxConcurrentJobs?: number;
  /** Sent bytes on the integration runtime node. */
  readonly sentBytes?: number;
  /** Received bytes on the integration runtime node. */
  readonly receivedBytes?: number;
}

export function nodeMonitoringDataDeserializer(item: any): NodeMonitoringData {
  return {
    additionalProperties: !item["additionalProperties"]
      ? item["additionalProperties"]
      : Object.fromEntries(
          Object.entries(item["additionalProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    nodeName: item["nodeName"],
    availableMemoryInMB: item["availableMemoryInMB"],
    cpuUtilization: item["cpuUtilization"],
    concurrentJobsLimit: item["concurrentJobsLimit"],
    concurrentJobsRunning: item["concurrentJobsRunning"],
    maxConcurrentJobs: item["maxConcurrentJobs"],
    sentBytes: item["sentBytes"],
    receivedBytes: item["receivedBytes"],
  };
}

/** A task resource */
export interface ProjectTask extends ProxyResource {
  /** Custom task properties */
  properties?: ProjectTaskPropertiesUnion;
  /** HTTP strong entity tag value. This is ignored if submitted. */
  etag?: string;
}

export function projectTaskSerializer(item: ProjectTask): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : projectTaskPropertiesUnionSerializer(item["properties"]),
    etag: item["etag"],
  };
}

export function projectTaskDeserializer(item: any): ProjectTask {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : projectTaskPropertiesUnionDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Base class for all types of DMS (classic) task properties. If task is not supported by current client, this object is returned. */
export interface ProjectTaskProperties {
  /** Task type. */
  /** The discriminator possible values: MigrateSchemaSqlServerSqlDb, Service.Check.OCI, Service.Upload.OCI, Service.Install.OCI, Connect.MongoDb, ConnectToSource.SqlServer, ConnectToSource.SqlServer.Sync, ConnectToSource.PostgreSql.Sync, ConnectToSource.MySql, ConnectToSource.Oracle.Sync, ConnectToTarget.SqlDb, ConnectToTarget.SqlDb.Sync, ConnectToTarget.AzureDbForPostgreSql.Sync, ConnectToTarget.Oracle.AzureDbForPostgreSql.Sync, GetUserTables.Sql, GetUserTables.AzureSqlDb.Sync, GetUserTablesOracle, GetUserTablesPostgreSql, GetUserTablesMySql, ConnectToTarget.AzureSqlDbMI, ConnectToTarget.AzureSqlDbMI.Sync.LRS, ConnectToTarget.AzureDbForMySql, Migrate.MongoDb, Migrate.SqlServer.AzureSqlDbMI, Migrate.SqlServer.AzureSqlDbMI.Sync.LRS, Migrate.SqlServer.SqlDb, Migrate.SqlServer.AzureSqlDb.Sync, Migrate.MySql.AzureDbForMySql.Sync, Migrate.MySql.AzureDbForMySql, Migrate.PostgreSql.AzureDbForPostgreSql.SyncV2, Migrate.Oracle.AzureDbForPostgreSql.Sync, ValidateMigrationInput.SqlServer.SqlDb.Sync, ValidateMigrationInput.SqlServer.AzureSqlDbMI, ValidateMigrationInput.SqlServer.AzureSqlDbMI.Sync.LRS, Validate.MongoDb, Validate.Oracle.AzureDbPostgreSql.Sync, GetTDECertificates.Sql, Migrate.Ssis */
  taskType: TaskType;
  /** Array of errors. This is ignored if submitted. */
  readonly errors?: ODataError[];
  /** The state of the task. This is ignored if submitted. */
  readonly state?: TaskState;
  /** Array of command properties. */
  readonly commands?: CommandPropertiesUnion[];
  /** Key value pairs of client data to attach meta data information to task */
  clientData?: Record<string, string>;
}

export function projectTaskPropertiesSerializer(item: ProjectTaskProperties): any {
  return { taskType: item["taskType"], clientData: item["clientData"] };
}

export function projectTaskPropertiesDeserializer(item: any): ProjectTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Alias for ProjectTaskPropertiesUnion */
export type ProjectTaskPropertiesUnion =
  | MigrateSchemaSqlServerSqlDbTaskProperties
  | CheckOCIDriverTaskProperties
  | UploadOCIDriverTaskProperties
  | InstallOCIDriverTaskProperties
  | ConnectToMongoDbTaskProperties
  | ConnectToSourceSqlServerTaskProperties
  | ConnectToSourceSqlServerSyncTaskProperties
  | ConnectToSourcePostgreSqlSyncTaskProperties
  | ConnectToSourceMySqlTaskProperties
  | ConnectToSourceOracleSyncTaskProperties
  | ConnectToTargetSqlDbTaskProperties
  | ConnectToTargetSqlSqlDbSyncTaskProperties
  | ConnectToTargetAzureDbForPostgreSqlSyncTaskProperties
  | ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskProperties
  | GetUserTablesSqlTaskProperties
  | GetUserTablesSqlSyncTaskProperties
  | GetUserTablesOracleTaskProperties
  | GetUserTablesPostgreSqlTaskProperties
  | GetUserTablesMySqlTaskProperties
  | ConnectToTargetSqlMITaskProperties
  | ConnectToTargetSqlMISyncTaskProperties
  | ConnectToTargetAzureDbForMySqlTaskProperties
  | MigrateMongoDbTaskProperties
  | MigrateSqlServerSqlMITaskProperties
  | MigrateSqlServerSqlMISyncTaskProperties
  | MigrateSqlServerSqlDbTaskProperties
  | MigrateSqlServerSqlDbSyncTaskProperties
  | MigrateMySqlAzureDbForMySqlSyncTaskProperties
  | MigrateMySqlAzureDbForMySqlOfflineTaskProperties
  | MigratePostgreSqlAzureDbForPostgreSqlSyncTaskProperties
  | MigrateOracleAzureDbForPostgreSqlSyncTaskProperties
  | ValidateMigrationInputSqlServerSqlDbSyncTaskProperties
  | ValidateMigrationInputSqlServerSqlMITaskProperties
  | ValidateMigrationInputSqlServerSqlMISyncTaskProperties
  | ValidateMongoDbTaskProperties
  | ValidateOracleAzureDbForPostgreSqlSyncTaskProperties
  | GetTdeCertificatesSqlTaskProperties
  | MigrateSsisTaskProperties
  | ProjectTaskProperties;

export function projectTaskPropertiesUnionSerializer(item: ProjectTaskPropertiesUnion): any {
  switch (item.taskType) {
    case "MigrateSchemaSqlServerSqlDb":
      return migrateSchemaSqlServerSqlDbTaskPropertiesSerializer(
        item as MigrateSchemaSqlServerSqlDbTaskProperties,
      );

    case "Service.Check.OCI":
      return checkOCIDriverTaskPropertiesSerializer(item as CheckOCIDriverTaskProperties);

    case "Service.Upload.OCI":
      return uploadOCIDriverTaskPropertiesSerializer(item as UploadOCIDriverTaskProperties);

    case "Service.Install.OCI":
      return installOCIDriverTaskPropertiesSerializer(item as InstallOCIDriverTaskProperties);

    case "Connect.MongoDb":
      return connectToMongoDbTaskPropertiesSerializer(item as ConnectToMongoDbTaskProperties);

    case "ConnectToSource.SqlServer":
      return connectToSourceSqlServerTaskPropertiesSerializer(
        item as ConnectToSourceSqlServerTaskProperties,
      );

    case "ConnectToSource.SqlServer.Sync":
      return connectToSourceSqlServerSyncTaskPropertiesSerializer(
        item as ConnectToSourceSqlServerSyncTaskProperties,
      );

    case "ConnectToSource.PostgreSql.Sync":
      return connectToSourcePostgreSqlSyncTaskPropertiesSerializer(
        item as ConnectToSourcePostgreSqlSyncTaskProperties,
      );

    case "ConnectToSource.MySql":
      return connectToSourceMySqlTaskPropertiesSerializer(
        item as ConnectToSourceMySqlTaskProperties,
      );

    case "ConnectToSource.Oracle.Sync":
      return connectToSourceOracleSyncTaskPropertiesSerializer(
        item as ConnectToSourceOracleSyncTaskProperties,
      );

    case "ConnectToTarget.SqlDb":
      return connectToTargetSqlDbTaskPropertiesSerializer(
        item as ConnectToTargetSqlDbTaskProperties,
      );

    case "ConnectToTarget.SqlDb.Sync":
      return connectToTargetSqlSqlDbSyncTaskPropertiesSerializer(
        item as ConnectToTargetSqlSqlDbSyncTaskProperties,
      );

    case "ConnectToTarget.AzureDbForPostgreSql.Sync":
      return connectToTargetAzureDbForPostgreSqlSyncTaskPropertiesSerializer(
        item as ConnectToTargetAzureDbForPostgreSqlSyncTaskProperties,
      );

    case "ConnectToTarget.Oracle.AzureDbForPostgreSql.Sync":
      return connectToTargetOracleAzureDbForPostgreSqlSyncTaskPropertiesSerializer(
        item as ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskProperties,
      );

    case "GetUserTables.Sql":
      return getUserTablesSqlTaskPropertiesSerializer(item as GetUserTablesSqlTaskProperties);

    case "GetUserTables.AzureSqlDb.Sync":
      return getUserTablesSqlSyncTaskPropertiesSerializer(
        item as GetUserTablesSqlSyncTaskProperties,
      );

    case "GetUserTablesOracle":
      return getUserTablesOracleTaskPropertiesSerializer(item as GetUserTablesOracleTaskProperties);

    case "GetUserTablesPostgreSql":
      return getUserTablesPostgreSqlTaskPropertiesSerializer(
        item as GetUserTablesPostgreSqlTaskProperties,
      );

    case "GetUserTablesMySql":
      return getUserTablesMySqlTaskPropertiesSerializer(item as GetUserTablesMySqlTaskProperties);

    case "ConnectToTarget.AzureSqlDbMI":
      return connectToTargetSqlMITaskPropertiesSerializer(
        item as ConnectToTargetSqlMITaskProperties,
      );

    case "ConnectToTarget.AzureSqlDbMI.Sync.LRS":
      return connectToTargetSqlMISyncTaskPropertiesSerializer(
        item as ConnectToTargetSqlMISyncTaskProperties,
      );

    case "ConnectToTarget.AzureDbForMySql":
      return connectToTargetAzureDbForMySqlTaskPropertiesSerializer(
        item as ConnectToTargetAzureDbForMySqlTaskProperties,
      );

    case "Migrate.MongoDb":
      return migrateMongoDbTaskPropertiesSerializer(item as MigrateMongoDbTaskProperties);

    case "Migrate.SqlServer.AzureSqlDbMI":
      return migrateSqlServerSqlMITaskPropertiesSerializer(
        item as MigrateSqlServerSqlMITaskProperties,
      );

    case "Migrate.SqlServer.AzureSqlDbMI.Sync.LRS":
      return migrateSqlServerSqlMISyncTaskPropertiesSerializer(
        item as MigrateSqlServerSqlMISyncTaskProperties,
      );

    case "Migrate.SqlServer.SqlDb":
      return migrateSqlServerSqlDbTaskPropertiesSerializer(
        item as MigrateSqlServerSqlDbTaskProperties,
      );

    case "Migrate.SqlServer.AzureSqlDb.Sync":
      return migrateSqlServerSqlDbSyncTaskPropertiesSerializer(
        item as MigrateSqlServerSqlDbSyncTaskProperties,
      );

    case "Migrate.MySql.AzureDbForMySql.Sync":
      return migrateMySqlAzureDbForMySqlSyncTaskPropertiesSerializer(
        item as MigrateMySqlAzureDbForMySqlSyncTaskProperties,
      );

    case "Migrate.MySql.AzureDbForMySql":
      return migrateMySqlAzureDbForMySqlOfflineTaskPropertiesSerializer(
        item as MigrateMySqlAzureDbForMySqlOfflineTaskProperties,
      );

    case "Migrate.PostgreSql.AzureDbForPostgreSql.SyncV2":
      return migratePostgreSqlAzureDbForPostgreSqlSyncTaskPropertiesSerializer(
        item as MigratePostgreSqlAzureDbForPostgreSqlSyncTaskProperties,
      );

    case "Migrate.Oracle.AzureDbForPostgreSql.Sync":
      return migrateOracleAzureDbForPostgreSqlSyncTaskPropertiesSerializer(
        item as MigrateOracleAzureDbForPostgreSqlSyncTaskProperties,
      );

    case "ValidateMigrationInput.SqlServer.SqlDb.Sync":
      return validateMigrationInputSqlServerSqlDbSyncTaskPropertiesSerializer(
        item as ValidateMigrationInputSqlServerSqlDbSyncTaskProperties,
      );

    case "ValidateMigrationInput.SqlServer.AzureSqlDbMI":
      return validateMigrationInputSqlServerSqlMITaskPropertiesSerializer(
        item as ValidateMigrationInputSqlServerSqlMITaskProperties,
      );

    case "ValidateMigrationInput.SqlServer.AzureSqlDbMI.Sync.LRS":
      return validateMigrationInputSqlServerSqlMISyncTaskPropertiesSerializer(
        item as ValidateMigrationInputSqlServerSqlMISyncTaskProperties,
      );

    case "Validate.MongoDb":
      return validateMongoDbTaskPropertiesSerializer(item as ValidateMongoDbTaskProperties);

    case "Validate.Oracle.AzureDbPostgreSql.Sync":
      return validateOracleAzureDbForPostgreSqlSyncTaskPropertiesSerializer(
        item as ValidateOracleAzureDbForPostgreSqlSyncTaskProperties,
      );

    case "GetTDECertificates.Sql":
      return getTdeCertificatesSqlTaskPropertiesSerializer(
        item as GetTdeCertificatesSqlTaskProperties,
      );

    case "Migrate.Ssis":
      return migrateSsisTaskPropertiesSerializer(item as MigrateSsisTaskProperties);

    default:
      return projectTaskPropertiesSerializer(item);
  }
}

export function projectTaskPropertiesUnionDeserializer(item: any): ProjectTaskPropertiesUnion {
  switch (item["taskType"]) {
    case "MigrateSchemaSqlServerSqlDb":
      return migrateSchemaSqlServerSqlDbTaskPropertiesDeserializer(
        item as MigrateSchemaSqlServerSqlDbTaskProperties,
      );

    case "Service.Check.OCI":
      return checkOCIDriverTaskPropertiesDeserializer(item as CheckOCIDriverTaskProperties);

    case "Service.Upload.OCI":
      return uploadOCIDriverTaskPropertiesDeserializer(item as UploadOCIDriverTaskProperties);

    case "Service.Install.OCI":
      return installOCIDriverTaskPropertiesDeserializer(item as InstallOCIDriverTaskProperties);

    case "Connect.MongoDb":
      return connectToMongoDbTaskPropertiesDeserializer(item as ConnectToMongoDbTaskProperties);

    case "ConnectToSource.SqlServer":
      return connectToSourceSqlServerTaskPropertiesDeserializer(
        item as ConnectToSourceSqlServerTaskProperties,
      );

    case "ConnectToSource.SqlServer.Sync":
      return connectToSourceSqlServerSyncTaskPropertiesDeserializer(
        item as ConnectToSourceSqlServerSyncTaskProperties,
      );

    case "ConnectToSource.PostgreSql.Sync":
      return connectToSourcePostgreSqlSyncTaskPropertiesDeserializer(
        item as ConnectToSourcePostgreSqlSyncTaskProperties,
      );

    case "ConnectToSource.MySql":
      return connectToSourceMySqlTaskPropertiesDeserializer(
        item as ConnectToSourceMySqlTaskProperties,
      );

    case "ConnectToSource.Oracle.Sync":
      return connectToSourceOracleSyncTaskPropertiesDeserializer(
        item as ConnectToSourceOracleSyncTaskProperties,
      );

    case "ConnectToTarget.SqlDb":
      return connectToTargetSqlDbTaskPropertiesDeserializer(
        item as ConnectToTargetSqlDbTaskProperties,
      );

    case "ConnectToTarget.SqlDb.Sync":
      return connectToTargetSqlSqlDbSyncTaskPropertiesDeserializer(
        item as ConnectToTargetSqlSqlDbSyncTaskProperties,
      );

    case "ConnectToTarget.AzureDbForPostgreSql.Sync":
      return connectToTargetAzureDbForPostgreSqlSyncTaskPropertiesDeserializer(
        item as ConnectToTargetAzureDbForPostgreSqlSyncTaskProperties,
      );

    case "ConnectToTarget.Oracle.AzureDbForPostgreSql.Sync":
      return connectToTargetOracleAzureDbForPostgreSqlSyncTaskPropertiesDeserializer(
        item as ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskProperties,
      );

    case "GetUserTables.Sql":
      return getUserTablesSqlTaskPropertiesDeserializer(item as GetUserTablesSqlTaskProperties);

    case "GetUserTables.AzureSqlDb.Sync":
      return getUserTablesSqlSyncTaskPropertiesDeserializer(
        item as GetUserTablesSqlSyncTaskProperties,
      );

    case "GetUserTablesOracle":
      return getUserTablesOracleTaskPropertiesDeserializer(
        item as GetUserTablesOracleTaskProperties,
      );

    case "GetUserTablesPostgreSql":
      return getUserTablesPostgreSqlTaskPropertiesDeserializer(
        item as GetUserTablesPostgreSqlTaskProperties,
      );

    case "GetUserTablesMySql":
      return getUserTablesMySqlTaskPropertiesDeserializer(item as GetUserTablesMySqlTaskProperties);

    case "ConnectToTarget.AzureSqlDbMI":
      return connectToTargetSqlMITaskPropertiesDeserializer(
        item as ConnectToTargetSqlMITaskProperties,
      );

    case "ConnectToTarget.AzureSqlDbMI.Sync.LRS":
      return connectToTargetSqlMISyncTaskPropertiesDeserializer(
        item as ConnectToTargetSqlMISyncTaskProperties,
      );

    case "ConnectToTarget.AzureDbForMySql":
      return connectToTargetAzureDbForMySqlTaskPropertiesDeserializer(
        item as ConnectToTargetAzureDbForMySqlTaskProperties,
      );

    case "Migrate.MongoDb":
      return migrateMongoDbTaskPropertiesDeserializer(item as MigrateMongoDbTaskProperties);

    case "Migrate.SqlServer.AzureSqlDbMI":
      return migrateSqlServerSqlMITaskPropertiesDeserializer(
        item as MigrateSqlServerSqlMITaskProperties,
      );

    case "Migrate.SqlServer.AzureSqlDbMI.Sync.LRS":
      return migrateSqlServerSqlMISyncTaskPropertiesDeserializer(
        item as MigrateSqlServerSqlMISyncTaskProperties,
      );

    case "Migrate.SqlServer.SqlDb":
      return migrateSqlServerSqlDbTaskPropertiesDeserializer(
        item as MigrateSqlServerSqlDbTaskProperties,
      );

    case "Migrate.SqlServer.AzureSqlDb.Sync":
      return migrateSqlServerSqlDbSyncTaskPropertiesDeserializer(
        item as MigrateSqlServerSqlDbSyncTaskProperties,
      );

    case "Migrate.MySql.AzureDbForMySql.Sync":
      return migrateMySqlAzureDbForMySqlSyncTaskPropertiesDeserializer(
        item as MigrateMySqlAzureDbForMySqlSyncTaskProperties,
      );

    case "Migrate.MySql.AzureDbForMySql":
      return migrateMySqlAzureDbForMySqlOfflineTaskPropertiesDeserializer(
        item as MigrateMySqlAzureDbForMySqlOfflineTaskProperties,
      );

    case "Migrate.PostgreSql.AzureDbForPostgreSql.SyncV2":
      return migratePostgreSqlAzureDbForPostgreSqlSyncTaskPropertiesDeserializer(
        item as MigratePostgreSqlAzureDbForPostgreSqlSyncTaskProperties,
      );

    case "Migrate.Oracle.AzureDbForPostgreSql.Sync":
      return migrateOracleAzureDbForPostgreSqlSyncTaskPropertiesDeserializer(
        item as MigrateOracleAzureDbForPostgreSqlSyncTaskProperties,
      );

    case "ValidateMigrationInput.SqlServer.SqlDb.Sync":
      return validateMigrationInputSqlServerSqlDbSyncTaskPropertiesDeserializer(
        item as ValidateMigrationInputSqlServerSqlDbSyncTaskProperties,
      );

    case "ValidateMigrationInput.SqlServer.AzureSqlDbMI":
      return validateMigrationInputSqlServerSqlMITaskPropertiesDeserializer(
        item as ValidateMigrationInputSqlServerSqlMITaskProperties,
      );

    case "ValidateMigrationInput.SqlServer.AzureSqlDbMI.Sync.LRS":
      return validateMigrationInputSqlServerSqlMISyncTaskPropertiesDeserializer(
        item as ValidateMigrationInputSqlServerSqlMISyncTaskProperties,
      );

    case "Validate.MongoDb":
      return validateMongoDbTaskPropertiesDeserializer(item as ValidateMongoDbTaskProperties);

    case "Validate.Oracle.AzureDbPostgreSql.Sync":
      return validateOracleAzureDbForPostgreSqlSyncTaskPropertiesDeserializer(
        item as ValidateOracleAzureDbForPostgreSqlSyncTaskProperties,
      );

    case "GetTDECertificates.Sql":
      return getTdeCertificatesSqlTaskPropertiesDeserializer(
        item as GetTdeCertificatesSqlTaskProperties,
      );

    case "Migrate.Ssis":
      return migrateSsisTaskPropertiesDeserializer(item as MigrateSsisTaskProperties);

    default:
      return projectTaskPropertiesDeserializer(item);
  }
}

/** Task type. */
export enum KnownTaskType {
  /** Connect.MongoDb */
  ConnectMongoDb = "Connect.MongoDb",
  /** ConnectToSource.SqlServer */
  ConnectToSourceSqlServer = "ConnectToSource.SqlServer",
  /** ConnectToSource.SqlServer.Sync */
  ConnectToSourceSqlServerSync = "ConnectToSource.SqlServer.Sync",
  /** ConnectToSource.PostgreSql.Sync */
  ConnectToSourcePostgreSqlSync = "ConnectToSource.PostgreSql.Sync",
  /** ConnectToSource.MySql */
  ConnectToSourceMySql = "ConnectToSource.MySql",
  /** ConnectToSource.Oracle.Sync */
  ConnectToSourceOracleSync = "ConnectToSource.Oracle.Sync",
  /** ConnectToTarget.SqlDb */
  ConnectToTargetSqlDb = "ConnectToTarget.SqlDb",
  /** ConnectToTarget.SqlDb.Sync */
  ConnectToTargetSqlDbSync = "ConnectToTarget.SqlDb.Sync",
  /** ConnectToTarget.AzureDbForPostgreSql.Sync */
  ConnectToTargetAzureDbForPostgreSqlSync = "ConnectToTarget.AzureDbForPostgreSql.Sync",
  /** ConnectToTarget.Oracle.AzureDbForPostgreSql.Sync */
  ConnectToTargetOracleAzureDbForPostgreSqlSync = "ConnectToTarget.Oracle.AzureDbForPostgreSql.Sync",
  /** ConnectToTarget.AzureSqlDbMI */
  ConnectToTargetAzureSqlDbMI = "ConnectToTarget.AzureSqlDbMI",
  /** ConnectToTarget.AzureSqlDbMI.Sync.LRS */
  ConnectToTargetAzureSqlDbMISyncLRS = "ConnectToTarget.AzureSqlDbMI.Sync.LRS",
  /** ConnectToTarget.AzureDbForMySql */
  ConnectToTargetAzureDbForMySql = "ConnectToTarget.AzureDbForMySql",
  /** GetUserTables.Sql */
  GetUserTablesSql = "GetUserTables.Sql",
  /** GetUserTables.AzureSqlDb.Sync */
  GetUserTablesAzureSqlDbSync = "GetUserTables.AzureSqlDb.Sync",
  /** GetUserTablesOracle */
  GetUserTablesOracle = "GetUserTablesOracle",
  /** GetUserTablesPostgreSql */
  GetUserTablesPostgreSql = "GetUserTablesPostgreSql",
  /** GetUserTablesMySql */
  GetUserTablesMySql = "GetUserTablesMySql",
  /** Migrate.MongoDb */
  MigrateMongoDb = "Migrate.MongoDb",
  /** Migrate.SqlServer.AzureSqlDbMI */
  MigrateSqlServerAzureSqlDbMI = "Migrate.SqlServer.AzureSqlDbMI",
  /** Migrate.SqlServer.AzureSqlDbMI.Sync.LRS */
  MigrateSqlServerAzureSqlDbMISyncLRS = "Migrate.SqlServer.AzureSqlDbMI.Sync.LRS",
  /** Migrate.SqlServer.SqlDb */
  MigrateSqlServerSqlDb = "Migrate.SqlServer.SqlDb",
  /** Migrate.SqlServer.AzureSqlDb.Sync */
  MigrateSqlServerAzureSqlDbSync = "Migrate.SqlServer.AzureSqlDb.Sync",
  /** Migrate.MySql.AzureDbForMySql.Sync */
  MigrateMySqlAzureDbForMySqlSync = "Migrate.MySql.AzureDbForMySql.Sync",
  /** Migrate.MySql.AzureDbForMySql */
  MigrateMySqlAzureDbForMySql = "Migrate.MySql.AzureDbForMySql",
  /** Migrate.PostgreSql.AzureDbForPostgreSql.SyncV2 */
  MigratePostgreSqlAzureDbForPostgreSqlSyncV2 = "Migrate.PostgreSql.AzureDbForPostgreSql.SyncV2",
  /** Migrate.Oracle.AzureDbForPostgreSql.Sync */
  MigrateOracleAzureDbForPostgreSqlSync = "Migrate.Oracle.AzureDbForPostgreSql.Sync",
  /** ValidateMigrationInput.SqlServer.SqlDb.Sync */
  ValidateMigrationInputSqlServerSqlDbSync = "ValidateMigrationInput.SqlServer.SqlDb.Sync",
  /** ValidateMigrationInput.SqlServer.AzureSqlDbMI */
  ValidateMigrationInputSqlServerAzureSqlDbMI = "ValidateMigrationInput.SqlServer.AzureSqlDbMI",
  /** ValidateMigrationInput.SqlServer.AzureSqlDbMI.Sync.LRS */
  ValidateMigrationInputSqlServerAzureSqlDbMISyncLRS = "ValidateMigrationInput.SqlServer.AzureSqlDbMI.Sync.LRS",
  /** Validate.MongoDb */
  ValidateMongoDb = "Validate.MongoDb",
  /** Validate.Oracle.AzureDbPostgreSql.Sync */
  ValidateOracleAzureDbPostgreSqlSync = "Validate.Oracle.AzureDbPostgreSql.Sync",
  /** GetTDECertificates.Sql */
  GetTDECertificatesSql = "GetTDECertificates.Sql",
  /** Migrate.Ssis */
  MigrateSsis = "Migrate.Ssis",
  /** Service.Check.OCI */
  ServiceCheckOCI = "Service.Check.OCI",
  /** Service.Upload.OCI */
  ServiceUploadOCI = "Service.Upload.OCI",
  /** Service.Install.OCI */
  ServiceInstallOCI = "Service.Install.OCI",
  /** MigrateSchemaSqlServerSqlDb */
  MigrateSchemaSqlServerSqlDb = "MigrateSchemaSqlServerSqlDb",
}

/**
 * Task type. \
 * {@link KnownTaskType} can be used interchangeably with TaskType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connect.MongoDb**: Connect.MongoDb \
 * **ConnectToSource.SqlServer**: ConnectToSource.SqlServer \
 * **ConnectToSource.SqlServer.Sync**: ConnectToSource.SqlServer.Sync \
 * **ConnectToSource.PostgreSql.Sync**: ConnectToSource.PostgreSql.Sync \
 * **ConnectToSource.MySql**: ConnectToSource.MySql \
 * **ConnectToSource.Oracle.Sync**: ConnectToSource.Oracle.Sync \
 * **ConnectToTarget.SqlDb**: ConnectToTarget.SqlDb \
 * **ConnectToTarget.SqlDb.Sync**: ConnectToTarget.SqlDb.Sync \
 * **ConnectToTarget.AzureDbForPostgreSql.Sync**: ConnectToTarget.AzureDbForPostgreSql.Sync \
 * **ConnectToTarget.Oracle.AzureDbForPostgreSql.Sync**: ConnectToTarget.Oracle.AzureDbForPostgreSql.Sync \
 * **ConnectToTarget.AzureSqlDbMI**: ConnectToTarget.AzureSqlDbMI \
 * **ConnectToTarget.AzureSqlDbMI.Sync.LRS**: ConnectToTarget.AzureSqlDbMI.Sync.LRS \
 * **ConnectToTarget.AzureDbForMySql**: ConnectToTarget.AzureDbForMySql \
 * **GetUserTables.Sql**: GetUserTables.Sql \
 * **GetUserTables.AzureSqlDb.Sync**: GetUserTables.AzureSqlDb.Sync \
 * **GetUserTablesOracle**: GetUserTablesOracle \
 * **GetUserTablesPostgreSql**: GetUserTablesPostgreSql \
 * **GetUserTablesMySql**: GetUserTablesMySql \
 * **Migrate.MongoDb**: Migrate.MongoDb \
 * **Migrate.SqlServer.AzureSqlDbMI**: Migrate.SqlServer.AzureSqlDbMI \
 * **Migrate.SqlServer.AzureSqlDbMI.Sync.LRS**: Migrate.SqlServer.AzureSqlDbMI.Sync.LRS \
 * **Migrate.SqlServer.SqlDb**: Migrate.SqlServer.SqlDb \
 * **Migrate.SqlServer.AzureSqlDb.Sync**: Migrate.SqlServer.AzureSqlDb.Sync \
 * **Migrate.MySql.AzureDbForMySql.Sync**: Migrate.MySql.AzureDbForMySql.Sync \
 * **Migrate.MySql.AzureDbForMySql**: Migrate.MySql.AzureDbForMySql \
 * **Migrate.PostgreSql.AzureDbForPostgreSql.SyncV2**: Migrate.PostgreSql.AzureDbForPostgreSql.SyncV2 \
 * **Migrate.Oracle.AzureDbForPostgreSql.Sync**: Migrate.Oracle.AzureDbForPostgreSql.Sync \
 * **ValidateMigrationInput.SqlServer.SqlDb.Sync**: ValidateMigrationInput.SqlServer.SqlDb.Sync \
 * **ValidateMigrationInput.SqlServer.AzureSqlDbMI**: ValidateMigrationInput.SqlServer.AzureSqlDbMI \
 * **ValidateMigrationInput.SqlServer.AzureSqlDbMI.Sync.LRS**: ValidateMigrationInput.SqlServer.AzureSqlDbMI.Sync.LRS \
 * **Validate.MongoDb**: Validate.MongoDb \
 * **Validate.Oracle.AzureDbPostgreSql.Sync**: Validate.Oracle.AzureDbPostgreSql.Sync \
 * **GetTDECertificates.Sql**: GetTDECertificates.Sql \
 * **Migrate.Ssis**: Migrate.Ssis \
 * **Service.Check.OCI**: Service.Check.OCI \
 * **Service.Upload.OCI**: Service.Upload.OCI \
 * **Service.Install.OCI**: Service.Install.OCI \
 * **MigrateSchemaSqlServerSqlDb**: MigrateSchemaSqlServerSqlDb
 */
export type TaskType = string;

export function oDataErrorArrayDeserializer(result: Array<ODataError>): any[] {
  return result.map((item) => {
    return oDataErrorDeserializer(item);
  });
}

/** Error information in OData format. */
export interface ODataError {
  /** The machine-readable description of the error, such as 'InvalidRequest' or 'InternalServerError' */
  code?: string;
  /** The human-readable description of the error */
  message?: string;
  /** Inner errors that caused this error */
  details?: ODataError[];
}

export function oDataErrorDeserializer(item: any): ODataError {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"] ? item["details"] : oDataErrorArrayDeserializer(item["details"]),
  };
}

/** The state of the task. This is ignored if submitted. */
export enum KnownTaskState {
  /** Unknown */
  Unknown = "Unknown",
  /** Queued */
  Queued = "Queued",
  /** Running */
  Running = "Running",
  /** Canceled */
  Canceled = "Canceled",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** FailedInputValidation */
  FailedInputValidation = "FailedInputValidation",
  /** Faulted */
  Faulted = "Faulted",
}

/**
 * The state of the task. This is ignored if submitted. \
 * {@link KnownTaskState} can be used interchangeably with TaskState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Queued**: Queued \
 * **Running**: Running \
 * **Canceled**: Canceled \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **FailedInputValidation**: FailedInputValidation \
 * **Faulted**: Faulted
 */
export type TaskState = string;

export function commandPropertiesUnionArraySerializer(
  result: Array<CommandPropertiesUnion>,
): any[] {
  return result.map((item) => {
    return commandPropertiesUnionSerializer(item);
  });
}

export function commandPropertiesUnionArrayDeserializer(
  result: Array<CommandPropertiesUnion>,
): any[] {
  return result.map((item) => {
    return commandPropertiesUnionDeserializer(item);
  });
}

/** Base class for all types of DMS (classic) command properties. If command is not supported by current client, this object is returned. */
export interface CommandProperties {
  /** Command type. */
  /** The discriminator possible values: Migrate.Sync.Complete.Database, Migrate.SqlServer.AzureDbSqlMi.Complete, cancel, finish, restart */
  commandType: CommandType;
  /** Array of errors. This is ignored if submitted. */
  readonly errors?: ODataError[];
  /** The state of the command. This is ignored if submitted. */
  readonly state?: CommandState;
}

export function commandPropertiesSerializer(item: CommandProperties): any {
  return { commandType: item["commandType"] };
}

export function commandPropertiesDeserializer(item: any): CommandProperties {
  return {
    commandType: item["commandType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
  };
}

/** Alias for CommandPropertiesUnion */
export type CommandPropertiesUnion =
  | MigrateSyncCompleteCommandProperties
  | MigrateMISyncCompleteCommandProperties
  | MongoDbCancelCommand
  | MongoDbFinishCommand
  | MongoDbRestartCommand
  | CommandProperties;

export function commandPropertiesUnionSerializer(item: CommandPropertiesUnion): any {
  switch (item.commandType) {
    case "Migrate.Sync.Complete.Database":
      return migrateSyncCompleteCommandPropertiesSerializer(
        item as MigrateSyncCompleteCommandProperties,
      );

    case "Migrate.SqlServer.AzureDbSqlMi.Complete":
      return migrateMISyncCompleteCommandPropertiesSerializer(
        item as MigrateMISyncCompleteCommandProperties,
      );

    case "cancel":
      return mongoDbCancelCommandSerializer(item as MongoDbCancelCommand);

    case "finish":
      return mongoDbFinishCommandSerializer(item as MongoDbFinishCommand);

    case "restart":
      return mongoDbRestartCommandSerializer(item as MongoDbRestartCommand);

    default:
      return commandPropertiesSerializer(item);
  }
}

export function commandPropertiesUnionDeserializer(item: any): CommandPropertiesUnion {
  switch (item["commandType"]) {
    case "Migrate.Sync.Complete.Database":
      return migrateSyncCompleteCommandPropertiesDeserializer(
        item as MigrateSyncCompleteCommandProperties,
      );

    case "Migrate.SqlServer.AzureDbSqlMi.Complete":
      return migrateMISyncCompleteCommandPropertiesDeserializer(
        item as MigrateMISyncCompleteCommandProperties,
      );

    case "cancel":
      return mongoDbCancelCommandDeserializer(item as MongoDbCancelCommand);

    case "finish":
      return mongoDbFinishCommandDeserializer(item as MongoDbFinishCommand);

    case "restart":
      return mongoDbRestartCommandDeserializer(item as MongoDbRestartCommand);

    default:
      return commandPropertiesDeserializer(item);
  }
}

/** Command type. */
export enum KnownCommandType {
  /** Migrate.Sync.Complete.Database */
  MigrateSyncCompleteDatabase = "Migrate.Sync.Complete.Database",
  /** Migrate.SqlServer.AzureDbSqlMi.Complete */
  MigrateSqlServerAzureDbSqlMiComplete = "Migrate.SqlServer.AzureDbSqlMi.Complete",
  /** cancel */
  Cancel = "cancel",
  /** finish */
  Finish = "finish",
  /** restart */
  Restart = "restart",
}

/**
 * Command type. \
 * {@link KnownCommandType} can be used interchangeably with CommandType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Migrate.Sync.Complete.Database**: Migrate.Sync.Complete.Database \
 * **Migrate.SqlServer.AzureDbSqlMi.Complete**: Migrate.SqlServer.AzureDbSqlMi.Complete \
 * **cancel**: cancel \
 * **finish**: finish \
 * **restart**: restart
 */
export type CommandType = string;

/** The state of the command. This is ignored if submitted. */
export enum KnownCommandState {
  /** Unknown */
  Unknown = "Unknown",
  /** Accepted */
  Accepted = "Accepted",
  /** Running */
  Running = "Running",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
}

/**
 * The state of the command. This is ignored if submitted. \
 * {@link KnownCommandState} can be used interchangeably with CommandState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Accepted**: Accepted \
 * **Running**: Running \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed
 */
export type CommandState = string;

/** Properties for the command that completes sync migration for a database. */
export interface MigrateSyncCompleteCommandProperties extends CommandProperties {
  /** Command input */
  input?: MigrateSyncCompleteCommandInput;
  /** Command output. This is ignored if submitted. */
  readonly output?: MigrateSyncCompleteCommandOutput;
  /** Command id */
  commandId?: string;
  /** Command type. */
  commandType: "Migrate.Sync.Complete.Database";
}

export function migrateSyncCompleteCommandPropertiesSerializer(
  item: MigrateSyncCompleteCommandProperties,
): any {
  return {
    commandType: item["commandType"],
    input: !item["input"]
      ? item["input"]
      : migrateSyncCompleteCommandInputSerializer(item["input"]),
    commandId: item["commandId"],
  };
}

export function migrateSyncCompleteCommandPropertiesDeserializer(
  item: any,
): MigrateSyncCompleteCommandProperties {
  return {
    commandType: item["commandType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    input: !item["input"]
      ? item["input"]
      : migrateSyncCompleteCommandInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migrateSyncCompleteCommandOutputDeserializer(item["output"]),
    commandId: item["commandId"],
  };
}

/** Input for command that completes sync migration for a database. */
export interface MigrateSyncCompleteCommandInput {
  /** Name of database */
  databaseName: string;
  /** Time stamp to complete */
  commitTimeStamp?: Date;
}

export function migrateSyncCompleteCommandInputSerializer(
  item: MigrateSyncCompleteCommandInput,
): any {
  return {
    databaseName: item["databaseName"],
    commitTimeStamp: !item["commitTimeStamp"]
      ? item["commitTimeStamp"]
      : item["commitTimeStamp"].toISOString(),
  };
}

export function migrateSyncCompleteCommandInputDeserializer(
  item: any,
): MigrateSyncCompleteCommandInput {
  return {
    databaseName: item["databaseName"],
    commitTimeStamp: !item["commitTimeStamp"]
      ? item["commitTimeStamp"]
      : new Date(item["commitTimeStamp"]),
  };
}

/** Output for command that completes sync migration for a database. */
export interface MigrateSyncCompleteCommandOutput {
  /** Result identifier */
  readonly id?: string;
  /** List of errors that happened during the command execution */
  readonly errors?: ReportableException[];
}

export function migrateSyncCompleteCommandOutputDeserializer(
  item: any,
): MigrateSyncCompleteCommandOutput {
  return {
    id: item["id"],
    errors: !item["errors"] ? item["errors"] : reportableExceptionArrayDeserializer(item["errors"]),
  };
}

export function reportableExceptionArrayDeserializer(result: Array<ReportableException>): any[] {
  return result.map((item) => {
    return reportableExceptionDeserializer(item);
  });
}

/** Exception object for all custom exceptions */
export interface ReportableException {
  /** Error message */
  message?: string;
  /** Actionable steps for this exception */
  actionableMessage?: string;
  /** The path to the file where exception occurred */
  filePath?: string;
  /** The line number where exception occurred */
  lineNumber?: string;
  /** Coded numerical value that is assigned to a specific exception */
  hResult?: number;
  /** Stack trace */
  stackTrace?: string;
}

export function reportableExceptionDeserializer(item: any): ReportableException {
  return {
    message: item["message"],
    actionableMessage: item["actionableMessage"],
    filePath: item["filePath"],
    lineNumber: item["lineNumber"],
    hResult: item["hResult"],
    stackTrace: item["stackTrace"],
  };
}

/** Properties for the command that completes online migration for an Azure SQL Database Managed Instance. */
export interface MigrateMISyncCompleteCommandProperties extends CommandProperties {
  /** Command input */
  input?: MigrateMISyncCompleteCommandInput;
  /** Command output. This is ignored if submitted. */
  readonly output?: MigrateMISyncCompleteCommandOutput;
  /** Command type. */
  commandType: "Migrate.SqlServer.AzureDbSqlMi.Complete";
}

export function migrateMISyncCompleteCommandPropertiesSerializer(
  item: MigrateMISyncCompleteCommandProperties,
): any {
  return {
    commandType: item["commandType"],
    input: !item["input"]
      ? item["input"]
      : migrateMISyncCompleteCommandInputSerializer(item["input"]),
  };
}

export function migrateMISyncCompleteCommandPropertiesDeserializer(
  item: any,
): MigrateMISyncCompleteCommandProperties {
  return {
    commandType: item["commandType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    input: !item["input"]
      ? item["input"]
      : migrateMISyncCompleteCommandInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migrateMISyncCompleteCommandOutputDeserializer(item["output"]),
  };
}

/** Input for command that completes online migration for an Azure SQL Database Managed Instance. */
export interface MigrateMISyncCompleteCommandInput {
  /** Name of managed instance database */
  sourceDatabaseName: string;
}

export function migrateMISyncCompleteCommandInputSerializer(
  item: MigrateMISyncCompleteCommandInput,
): any {
  return { sourceDatabaseName: item["sourceDatabaseName"] };
}

export function migrateMISyncCompleteCommandInputDeserializer(
  item: any,
): MigrateMISyncCompleteCommandInput {
  return {
    sourceDatabaseName: item["sourceDatabaseName"],
  };
}

/** Output for command that completes online migration for an Azure SQL Database Managed Instance. */
export interface MigrateMISyncCompleteCommandOutput {
  /** List of errors that happened during the command execution */
  errors?: ReportableException[];
}

export function migrateMISyncCompleteCommandOutputDeserializer(
  item: any,
): MigrateMISyncCompleteCommandOutput {
  return {
    errors: !item["errors"] ? item["errors"] : reportableExceptionArrayDeserializer(item["errors"]),
  };
}

/** Properties for the command that cancels a migration in whole or in part */
export interface MongoDbCancelCommand extends CommandProperties {
  /** Command input */
  input?: MongoDbCommandInput;
  /** Command type. */
  commandType: "cancel";
}

export function mongoDbCancelCommandSerializer(item: MongoDbCancelCommand): any {
  return {
    commandType: item["commandType"],
    input: !item["input"] ? item["input"] : mongoDbCommandInputSerializer(item["input"]),
  };
}

export function mongoDbCancelCommandDeserializer(item: any): MongoDbCancelCommand {
  return {
    commandType: item["commandType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    input: !item["input"] ? item["input"] : mongoDbCommandInputDeserializer(item["input"]),
  };
}

/** Describes the input to the 'cancel' and 'restart' MongoDB migration commands */
export interface MongoDbCommandInput {
  /** The qualified name of a database or collection to act upon, or null to act upon the entire migration */
  objectName?: string;
}

export function mongoDbCommandInputSerializer(item: MongoDbCommandInput): any {
  return { objectName: item["objectName"] };
}

export function mongoDbCommandInputDeserializer(item: any): MongoDbCommandInput {
  return {
    objectName: item["objectName"],
  };
}

/** Properties for the command that finishes a migration in whole or in part */
export interface MongoDbFinishCommand extends CommandProperties {
  /** Command input */
  input?: MongoDbFinishCommandInput;
  /** Command type. */
  commandType: "finish";
}

export function mongoDbFinishCommandSerializer(item: MongoDbFinishCommand): any {
  return {
    commandType: item["commandType"],
    input: !item["input"] ? item["input"] : mongoDbFinishCommandInputSerializer(item["input"]),
  };
}

export function mongoDbFinishCommandDeserializer(item: any): MongoDbFinishCommand {
  return {
    commandType: item["commandType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    input: !item["input"] ? item["input"] : mongoDbFinishCommandInputDeserializer(item["input"]),
  };
}

/** Describes the input to the 'finish' MongoDB migration command */
export interface MongoDbFinishCommandInput extends MongoDbCommandInput {
  /** If true, replication for the affected objects will be stopped immediately. If false, the migrator will finish replaying queued events before finishing the replication. */
  immediate: boolean;
}

export function mongoDbFinishCommandInputSerializer(item: MongoDbFinishCommandInput): any {
  return { objectName: item["objectName"], immediate: item["immediate"] };
}

export function mongoDbFinishCommandInputDeserializer(item: any): MongoDbFinishCommandInput {
  return {
    objectName: item["objectName"],
    immediate: item["immediate"],
  };
}

/** Properties for the command that restarts a migration in whole or in part */
export interface MongoDbRestartCommand extends CommandProperties {
  /** Command input */
  input?: MongoDbCommandInput;
  /** Command type. */
  commandType: "restart";
}

export function mongoDbRestartCommandSerializer(item: MongoDbRestartCommand): any {
  return {
    commandType: item["commandType"],
    input: !item["input"] ? item["input"] : mongoDbCommandInputSerializer(item["input"]),
  };
}

export function mongoDbRestartCommandDeserializer(item: any): MongoDbRestartCommand {
  return {
    commandType: item["commandType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    input: !item["input"] ? item["input"] : mongoDbCommandInputDeserializer(item["input"]),
  };
}

/** Properties for task that migrates Schema for SQL Server databases to Azure SQL databases */
export interface MigrateSchemaSqlServerSqlDbTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: MigrateSchemaSqlServerSqlDbTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: MigrateSchemaSqlServerSqlDbTaskOutputUnion[];
  /** DateTime in UTC when the task was created */
  createdOn?: string;
  /** Task id */
  taskId?: string;
  /** whether the task can be cloned or not */
  isCloneable?: boolean;
  /** Task type. */
  taskType: "MigrateSchemaSqlServerSqlDb";
}

export function migrateSchemaSqlServerSqlDbTaskPropertiesSerializer(
  item: MigrateSchemaSqlServerSqlDbTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : migrateSchemaSqlServerSqlDbTaskInputSerializer(item["input"]),
    createdOn: item["createdOn"],
    taskId: item["taskId"],
    isCloneable: item["isCloneable"],
  };
}

export function migrateSchemaSqlServerSqlDbTaskPropertiesDeserializer(
  item: any,
): MigrateSchemaSqlServerSqlDbTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : migrateSchemaSqlServerSqlDbTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migrateSchemaSqlServerSqlDbTaskOutputUnionArrayDeserializer(item["output"]),
    createdOn: item["createdOn"],
    taskId: item["taskId"],
    isCloneable: item["isCloneable"],
  };
}

/** Input for task that migrates Schema for SQL Server databases to Azure SQL databases */
export interface MigrateSchemaSqlServerSqlDbTaskInput extends SqlMigrationTaskInput {
  /** Databases to migrate */
  selectedDatabases: MigrateSchemaSqlServerSqlDbDatabaseInput[];
  /** encrypted key for secure fields */
  encryptedKeyForSecureFields?: string;
  /** Migration start time */
  startedOn?: string;
}

export function migrateSchemaSqlServerSqlDbTaskInputSerializer(
  item: MigrateSchemaSqlServerSqlDbTaskInput,
): any {
  return {
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSchemaSqlServerSqlDbDatabaseInputArraySerializer(
      item["selectedDatabases"],
    ),
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
    startedOn: item["startedOn"],
  };
}

export function migrateSchemaSqlServerSqlDbTaskInputDeserializer(
  item: any,
): MigrateSchemaSqlServerSqlDbTaskInput {
  return {
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSchemaSqlServerSqlDbDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
    startedOn: item["startedOn"],
  };
}

export function migrateSchemaSqlServerSqlDbDatabaseInputArraySerializer(
  result: Array<MigrateSchemaSqlServerSqlDbDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateSchemaSqlServerSqlDbDatabaseInputSerializer(item);
  });
}

export function migrateSchemaSqlServerSqlDbDatabaseInputArrayDeserializer(
  result: Array<MigrateSchemaSqlServerSqlDbDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateSchemaSqlServerSqlDbDatabaseInputDeserializer(item);
  });
}

/** Database input for migrate schema Sql Server to Azure SQL Server scenario */
export interface MigrateSchemaSqlServerSqlDbDatabaseInput {
  /** Name of source database */
  name?: string;
  /** Id of the source database */
  id?: string;
  /** Name of target database */
  targetDatabaseName?: string;
  /** Database schema migration settings */
  schemaSetting?: SchemaMigrationSetting;
}

export function migrateSchemaSqlServerSqlDbDatabaseInputSerializer(
  item: MigrateSchemaSqlServerSqlDbDatabaseInput,
): any {
  return {
    name: item["name"],
    id: item["id"],
    targetDatabaseName: item["targetDatabaseName"],
    schemaSetting: !item["schemaSetting"]
      ? item["schemaSetting"]
      : schemaMigrationSettingSerializer(item["schemaSetting"]),
  };
}

export function migrateSchemaSqlServerSqlDbDatabaseInputDeserializer(
  item: any,
): MigrateSchemaSqlServerSqlDbDatabaseInput {
  return {
    name: item["name"],
    id: item["id"],
    targetDatabaseName: item["targetDatabaseName"],
    schemaSetting: !item["schemaSetting"]
      ? item["schemaSetting"]
      : schemaMigrationSettingDeserializer(item["schemaSetting"]),
  };
}

/** Settings for migrating schema from source to target */
export interface SchemaMigrationSetting {
  /** Option on how to migrate the schema */
  schemaOption?: SchemaMigrationOption;
  /** Resource Identifier of a file resource containing the uploaded schema file */
  fileId?: string;
  /** Name of the file resource containing the uploaded schema file */
  fileName?: string;
}

export function schemaMigrationSettingSerializer(item: SchemaMigrationSetting): any {
  return { schemaOption: item["schemaOption"], fileId: item["fileId"], fileName: item["fileName"] };
}

export function schemaMigrationSettingDeserializer(item: any): SchemaMigrationSetting {
  return {
    schemaOption: item["schemaOption"],
    fileId: item["fileId"],
    fileName: item["fileName"],
  };
}

/** Option for how schema is extracted and applied to target */
export enum KnownSchemaMigrationOption {
  /** None */
  None = "None",
  /** ExtractFromSource */
  ExtractFromSource = "ExtractFromSource",
  /** UseStorageFile */
  UseStorageFile = "UseStorageFile",
}

/**
 * Option for how schema is extracted and applied to target \
 * {@link KnownSchemaMigrationOption} can be used interchangeably with SchemaMigrationOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **ExtractFromSource**: ExtractFromSource \
 * **UseStorageFile**: UseStorageFile
 */
export type SchemaMigrationOption = string;

export function migrateSchemaSqlServerSqlDbTaskOutputUnionArrayDeserializer(
  result: Array<MigrateSchemaSqlServerSqlDbTaskOutputUnion>,
): any[] {
  return result.map((item) => {
    return migrateSchemaSqlServerSqlDbTaskOutputUnionDeserializer(item);
  });
}

/** Output for the task that migrates Schema for SQL Server databases to Azure SQL databases */
export interface MigrateSchemaSqlServerSqlDbTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Result type */
  /** The discriminator possible values: MigrationLevelOutput, DatabaseLevelOutput, SchemaErrorOutput, ErrorOutput */
  resultType: string;
}

export function migrateSchemaSqlServerSqlDbTaskOutputDeserializer(
  item: any,
): MigrateSchemaSqlServerSqlDbTaskOutput {
  return {
    id: item["id"],
    resultType: item["resultType"],
  };
}

/** Alias for MigrateSchemaSqlServerSqlDbTaskOutputUnion */
export type MigrateSchemaSqlServerSqlDbTaskOutputUnion =
  | MigrateSchemaSqlServerSqlDbTaskOutputMigrationLevel
  | MigrateSchemaSqlServerSqlDbTaskOutputDatabaseLevel
  | MigrateSchemaSqlServerSqlDbTaskOutputError
  | MigrateSchemaSqlTaskOutputError
  | MigrateSchemaSqlServerSqlDbTaskOutput;

export function migrateSchemaSqlServerSqlDbTaskOutputUnionDeserializer(
  item: any,
): MigrateSchemaSqlServerSqlDbTaskOutputUnion {
  switch (item["resultType"]) {
    case "MigrationLevelOutput":
      return migrateSchemaSqlServerSqlDbTaskOutputMigrationLevelDeserializer(
        item as MigrateSchemaSqlServerSqlDbTaskOutputMigrationLevel,
      );

    case "DatabaseLevelOutput":
      return migrateSchemaSqlServerSqlDbTaskOutputDatabaseLevelDeserializer(
        item as MigrateSchemaSqlServerSqlDbTaskOutputDatabaseLevel,
      );

    case "SchemaErrorOutput":
      return migrateSchemaSqlServerSqlDbTaskOutputErrorDeserializer(
        item as MigrateSchemaSqlServerSqlDbTaskOutputError,
      );

    case "ErrorOutput":
      return migrateSchemaSqlTaskOutputErrorDeserializer(item as MigrateSchemaSqlTaskOutputError);

    default:
      return migrateSchemaSqlServerSqlDbTaskOutputDeserializer(item);
  }
}

/** model interface MigrateSchemaSqlServerSqlDbTaskOutputMigrationLevel */
export interface MigrateSchemaSqlServerSqlDbTaskOutputMigrationLevel extends MigrateSchemaSqlServerSqlDbTaskOutput {
  /** Overall state of the schema migration */
  readonly state?: MigrationState;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Source server version */
  readonly sourceServerVersion?: string;
  /** Source server brand version */
  readonly sourceServerBrandVersion?: string;
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
  /** Result type */
  resultType: "MigrationLevelOutput";
}

export function migrateSchemaSqlServerSqlDbTaskOutputMigrationLevelDeserializer(
  item: any,
): MigrateSchemaSqlServerSqlDbTaskOutputMigrationLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    state: item["state"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    sourceServerVersion: item["sourceServerVersion"],
    sourceServerBrandVersion: item["sourceServerBrandVersion"],
    targetServerVersion: item["targetServerVersion"],
    targetServerBrandVersion: item["targetServerBrandVersion"],
  };
}

/** Current state of migration */
export enum KnownMigrationState {
  /** None */
  None = "None",
  /** InProgress */
  InProgress = "InProgress",
  /** Failed */
  Failed = "Failed",
  /** Warning */
  Warning = "Warning",
  /** Completed */
  Completed = "Completed",
  /** Skipped */
  Skipped = "Skipped",
  /** Stopped */
  Stopped = "Stopped",
}

/**
 * Current state of migration \
 * {@link KnownMigrationState} can be used interchangeably with MigrationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **InProgress**: InProgress \
 * **Failed**: Failed \
 * **Warning**: Warning \
 * **Completed**: Completed \
 * **Skipped**: Skipped \
 * **Stopped**: Stopped
 */
export type MigrationState = string;

/** model interface MigrateSchemaSqlServerSqlDbTaskOutputDatabaseLevel */
export interface MigrateSchemaSqlServerSqlDbTaskOutputDatabaseLevel extends MigrateSchemaSqlServerSqlDbTaskOutput {
  /** The name of the database */
  readonly databaseName?: string;
  /** State of the schema migration for this database */
  readonly state?: MigrationState;
  /** Schema migration stage for this database */
  readonly stage?: SchemaMigrationStage;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Prefix string to use for querying errors for this database */
  readonly databaseErrorResultPrefix?: string;
  /** Prefix string to use for querying schema errors for this database */
  readonly schemaErrorResultPrefix?: string;
  /** Number of successful operations for this database */
  readonly numberOfSuccessfulOperations?: number;
  /** Number of failed operations for this database */
  readonly numberOfFailedOperations?: number;
  /** Identifier for the file resource containing the schema of this database */
  readonly fileId?: string;
  /** Result type */
  resultType: "DatabaseLevelOutput";
}

export function migrateSchemaSqlServerSqlDbTaskOutputDatabaseLevelDeserializer(
  item: any,
): MigrateSchemaSqlServerSqlDbTaskOutputDatabaseLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    databaseName: item["databaseName"],
    state: item["state"],
    stage: item["stage"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    databaseErrorResultPrefix: item["databaseErrorResultPrefix"],
    schemaErrorResultPrefix: item["schemaErrorResultPrefix"],
    numberOfSuccessfulOperations: item["numberOfSuccessfulOperations"],
    numberOfFailedOperations: item["numberOfFailedOperations"],
    fileId: item["fileId"],
  };
}

/** Current stage of schema migration */
export enum KnownSchemaMigrationStage {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** ValidatingInputs */
  ValidatingInputs = "ValidatingInputs",
  /** CollectingObjects */
  CollectingObjects = "CollectingObjects",
  /** DownloadingScript */
  DownloadingScript = "DownloadingScript",
  /** GeneratingScript */
  GeneratingScript = "GeneratingScript",
  /** UploadingScript */
  UploadingScript = "UploadingScript",
  /** DeployingSchema */
  DeployingSchema = "DeployingSchema",
  /** Completed */
  Completed = "Completed",
  /** CompletedWithWarnings */
  CompletedWithWarnings = "CompletedWithWarnings",
  /** Failed */
  Failed = "Failed",
}

/**
 * Current stage of schema migration \
 * {@link KnownSchemaMigrationStage} can be used interchangeably with SchemaMigrationStage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: NotStarted \
 * **ValidatingInputs**: ValidatingInputs \
 * **CollectingObjects**: CollectingObjects \
 * **DownloadingScript**: DownloadingScript \
 * **GeneratingScript**: GeneratingScript \
 * **UploadingScript**: UploadingScript \
 * **DeployingSchema**: DeployingSchema \
 * **Completed**: Completed \
 * **CompletedWithWarnings**: CompletedWithWarnings \
 * **Failed**: Failed
 */
export type SchemaMigrationStage = string;

/** model interface MigrateSchemaSqlServerSqlDbTaskOutputError */
export interface MigrateSchemaSqlServerSqlDbTaskOutputError extends MigrateSchemaSqlServerSqlDbTaskOutput {
  /** Schema command which failed */
  readonly commandText?: string;
  /** Reason of failure */
  readonly errorText?: string;
  /** Result type */
  resultType: "SchemaErrorOutput";
}

export function migrateSchemaSqlServerSqlDbTaskOutputErrorDeserializer(
  item: any,
): MigrateSchemaSqlServerSqlDbTaskOutputError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    commandText: item["commandText"],
    errorText: item["errorText"],
  };
}

/** model interface MigrateSchemaSqlTaskOutputError */
export interface MigrateSchemaSqlTaskOutputError extends MigrateSchemaSqlServerSqlDbTaskOutput {
  /** Migration error */
  readonly error?: ReportableException;
  /** Result type */
  resultType: "ErrorOutput";
}

export function migrateSchemaSqlTaskOutputErrorDeserializer(
  item: any,
): MigrateSchemaSqlTaskOutputError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    error: !item["error"] ? item["error"] : reportableExceptionDeserializer(item["error"]),
  };
}

/** Properties for the task that checks for OCI drivers. */
export interface CheckOCIDriverTaskProperties extends ProjectTaskProperties {
  /** Input for the service task to check for OCI drivers. */
  input?: CheckOCIDriverTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: CheckOCIDriverTaskOutput[];
  /** Task type. */
  taskType: "Service.Check.OCI";
}

export function checkOCIDriverTaskPropertiesSerializer(item: CheckOCIDriverTaskProperties): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : checkOCIDriverTaskInputSerializer(item["input"]),
  };
}

export function checkOCIDriverTaskPropertiesDeserializer(item: any): CheckOCIDriverTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"] ? item["input"] : checkOCIDriverTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : checkOCIDriverTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the service task to check for OCI drivers. */
export interface CheckOCIDriverTaskInput {
  /** Version of the source server to check against.  Optional. */
  serverVersion?: string;
}

export function checkOCIDriverTaskInputSerializer(item: CheckOCIDriverTaskInput): any {
  return { serverVersion: item["serverVersion"] };
}

export function checkOCIDriverTaskInputDeserializer(item: any): CheckOCIDriverTaskInput {
  return {
    serverVersion: item["serverVersion"],
  };
}

export function checkOCIDriverTaskOutputArrayDeserializer(
  result: Array<CheckOCIDriverTaskOutput>,
): any[] {
  return result.map((item) => {
    return checkOCIDriverTaskOutputDeserializer(item);
  });
}

/** Output for the service task to check for OCI drivers. */
export interface CheckOCIDriverTaskOutput {
  /** Information about the installed driver if found and valid. */
  installedDriver?: OracleOCIDriverInfo;
  /** Validation errors */
  readonly validationErrors?: ReportableException[];
}

export function checkOCIDriverTaskOutputDeserializer(item: any): CheckOCIDriverTaskOutput {
  return {
    installedDriver: !item["installedDriver"]
      ? item["installedDriver"]
      : oracleOCIDriverInfoDeserializer(item["installedDriver"]),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Information about an Oracle OCI driver. */
export interface OracleOCIDriverInfo {
  /** The name of the driver package */
  readonly driverName?: string;
  /** The size in bytes of the driver package */
  readonly driverSize?: string;
  /** The MD5 Base64 encoded checksum for the driver package. */
  readonly archiveChecksum?: string;
  /** The checksum for the driver package provided by Oracle. */
  readonly oracleChecksum?: string;
  /** Version listed in the OCI assembly 'oci.dll' */
  readonly assemblyVersion?: string;
  /** List of Oracle database versions supported by this driver. Only major minor of the version is listed. */
  readonly supportedOracleVersions?: string[];
}

export function oracleOCIDriverInfoDeserializer(item: any): OracleOCIDriverInfo {
  return {
    driverName: item["driverName"],
    driverSize: item["driverSize"],
    archiveChecksum: item["archiveChecksum"],
    oracleChecksum: item["oracleChecksum"],
    assemblyVersion: item["assemblyVersion"],
    supportedOracleVersions: !item["supportedOracleVersions"]
      ? item["supportedOracleVersions"]
      : item["supportedOracleVersions"].map((p: any) => {
          return p;
        }),
  };
}

/** Properties for the task that uploads an OCI driver. */
export interface UploadOCIDriverTaskProperties extends ProjectTaskProperties {
  /** Input for the service task to upload an OCI driver. */
  input?: UploadOCIDriverTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: UploadOCIDriverTaskOutput[];
  /** Task type. */
  taskType: "Service.Upload.OCI";
}

export function uploadOCIDriverTaskPropertiesSerializer(item: UploadOCIDriverTaskProperties): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : uploadOCIDriverTaskInputSerializer(item["input"]),
  };
}

export function uploadOCIDriverTaskPropertiesDeserializer(
  item: any,
): UploadOCIDriverTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"] ? item["input"] : uploadOCIDriverTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : uploadOCIDriverTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the service task to upload an OCI driver. */
export interface UploadOCIDriverTaskInput {
  /** File share information for the OCI driver archive. */
  driverShare?: FileShare;
}

export function uploadOCIDriverTaskInputSerializer(item: UploadOCIDriverTaskInput): any {
  return {
    driverShare: !item["driverShare"]
      ? item["driverShare"]
      : fileShareSerializer(item["driverShare"]),
  };
}

export function uploadOCIDriverTaskInputDeserializer(item: any): UploadOCIDriverTaskInput {
  return {
    driverShare: !item["driverShare"]
      ? item["driverShare"]
      : fileShareDeserializer(item["driverShare"]),
  };
}

/** File share information with Path, Username, and Password. */
export interface FileShare {
  /** User name credential to connect to the share location */
  userName?: string;
  /** Password credential used to connect to the share location. */
  password?: string;
  /** The folder path for this share. */
  path: string;
}

export function fileShareSerializer(item: FileShare): any {
  return { userName: item["userName"], password: item["password"], path: item["path"] };
}

export function fileShareDeserializer(item: any): FileShare {
  return {
    userName: item["userName"],
    password: item["password"],
    path: item["path"],
  };
}

export function uploadOCIDriverTaskOutputArrayDeserializer(
  result: Array<UploadOCIDriverTaskOutput>,
): any[] {
  return result.map((item) => {
    return uploadOCIDriverTaskOutputDeserializer(item);
  });
}

/** Output for the service task to upload an OCI driver. */
export interface UploadOCIDriverTaskOutput {
  /** The name of the driver package that was validated and uploaded. */
  readonly driverPackageName?: string;
  /** Validation errors */
  readonly validationErrors?: ReportableException[];
}

export function uploadOCIDriverTaskOutputDeserializer(item: any): UploadOCIDriverTaskOutput {
  return {
    driverPackageName: item["driverPackageName"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that installs an OCI driver. */
export interface InstallOCIDriverTaskProperties extends ProjectTaskProperties {
  /** Input for the service task to install an OCI driver. */
  input?: InstallOCIDriverTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: InstallOCIDriverTaskOutput[];
  /** Task type. */
  taskType: "Service.Install.OCI";
}

export function installOCIDriverTaskPropertiesSerializer(
  item: InstallOCIDriverTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : installOCIDriverTaskInputSerializer(item["input"]),
  };
}

export function installOCIDriverTaskPropertiesDeserializer(
  item: any,
): InstallOCIDriverTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"] ? item["input"] : installOCIDriverTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : installOCIDriverTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the service task to install an OCI driver. */
export interface InstallOCIDriverTaskInput {
  /** Name of the uploaded driver package to install. */
  driverPackageName?: string;
}

export function installOCIDriverTaskInputSerializer(item: InstallOCIDriverTaskInput): any {
  return { driverPackageName: item["driverPackageName"] };
}

export function installOCIDriverTaskInputDeserializer(item: any): InstallOCIDriverTaskInput {
  return {
    driverPackageName: item["driverPackageName"],
  };
}

export function installOCIDriverTaskOutputArrayDeserializer(
  result: Array<InstallOCIDriverTaskOutput>,
): any[] {
  return result.map((item) => {
    return installOCIDriverTaskOutputDeserializer(item);
  });
}

/** Output for the service task to install an OCI driver. */
export interface InstallOCIDriverTaskOutput {
  /** Validation errors */
  readonly validationErrors?: ReportableException[];
}

export function installOCIDriverTaskOutputDeserializer(item: any): InstallOCIDriverTaskOutput {
  return {
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that validates the connection to and provides information about a MongoDB server */
export interface ConnectToMongoDbTaskProperties extends ProjectTaskProperties {
  /** Describes a connection to a MongoDB data source */
  input?: MongoDbConnectionInfo;
  /** An array containing a single MongoDbClusterInfo object */
  readonly output?: MongoDbClusterInfo[];
  /** Task type. */
  taskType: "Connect.MongoDb";
}

export function connectToMongoDbTaskPropertiesSerializer(
  item: ConnectToMongoDbTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : mongoDbConnectionInfoSerializer(item["input"]),
  };
}

export function connectToMongoDbTaskPropertiesDeserializer(
  item: any,
): ConnectToMongoDbTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"] ? item["input"] : mongoDbConnectionInfoDeserializer(item["input"]),
    output: !item["output"] ? item["output"] : mongoDbClusterInfoArrayDeserializer(item["output"]),
  };
}

/** Describes a connection to a MongoDB data source */
export interface MongoDbConnectionInfo extends ConnectionInfo {
  /** A MongoDB connection string or blob container URL. The user name and password can be specified here or in the userName and password properties */
  connectionString: string;
  /** Data source */
  dataSource?: string;
  /** Whether to encrypt the connection */
  encryptConnection?: boolean;
  /** server brand version */
  serverBrandVersion?: string;
  /** server version */
  serverVersion?: string;
  /** name of the server */
  serverName?: string;
  /** Whether to trust the server certificate */
  trustServerCertificate?: boolean;
  enforceSSL?: boolean;
  /** port for server */
  port?: number;
  /** Additional connection settings */
  additionalSettings?: string;
  /** Authentication type to use for connection */
  authentication?: AuthenticationType;
  /** Type of connection info */
  type: "MongoDbConnectionInfo";
}

export function mongoDbConnectionInfoSerializer(item: MongoDbConnectionInfo): any {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    connectionString: item["connectionString"],
    dataSource: item["dataSource"],
    encryptConnection: item["encryptConnection"],
    serverBrandVersion: item["serverBrandVersion"],
    serverVersion: item["serverVersion"],
    serverName: item["serverName"],
    trustServerCertificate: item["trustServerCertificate"],
    enforceSSL: item["enforceSSL"],
    port: item["port"],
    additionalSettings: item["additionalSettings"],
    authentication: item["authentication"],
  };
}

export function mongoDbConnectionInfoDeserializer(item: any): MongoDbConnectionInfo {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    connectionString: item["connectionString"],
    dataSource: item["dataSource"],
    encryptConnection: item["encryptConnection"],
    serverBrandVersion: item["serverBrandVersion"],
    serverVersion: item["serverVersion"],
    serverName: item["serverName"],
    trustServerCertificate: item["trustServerCertificate"],
    enforceSSL: item["enforceSSL"],
    port: item["port"],
    additionalSettings: item["additionalSettings"],
    authentication: item["authentication"],
  };
}

/** An enumeration of possible authentication types when connecting */
export enum KnownAuthenticationType {
  /** None */
  None = "None",
  /** WindowsAuthentication */
  WindowsAuthentication = "WindowsAuthentication",
  /** SqlAuthentication */
  SqlAuthentication = "SqlAuthentication",
  /** ActiveDirectoryIntegrated */
  ActiveDirectoryIntegrated = "ActiveDirectoryIntegrated",
  /** ActiveDirectoryPassword */
  ActiveDirectoryPassword = "ActiveDirectoryPassword",
}

/**
 * An enumeration of possible authentication types when connecting \
 * {@link KnownAuthenticationType} can be used interchangeably with AuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **WindowsAuthentication**: WindowsAuthentication \
 * **SqlAuthentication**: SqlAuthentication \
 * **ActiveDirectoryIntegrated**: ActiveDirectoryIntegrated \
 * **ActiveDirectoryPassword**: ActiveDirectoryPassword
 */
export type AuthenticationType = string;

export function mongoDbClusterInfoArrayDeserializer(result: Array<MongoDbClusterInfo>): any[] {
  return result.map((item) => {
    return mongoDbClusterInfoDeserializer(item);
  });
}

/** Describes a MongoDB data source */
export interface MongoDbClusterInfo {
  /** A list of non-system databases in the cluster */
  databases: MongoDbDatabaseInfo[];
  /** Whether the cluster supports sharded collections */
  supportsSharding: boolean;
  /** The type of data source */
  type: MongoDbClusterType;
  /** The version of the data source in the form x.y.z (e.g. 3.6.7). Not used if Type is BlobContainer. */
  version: string;
}

export function mongoDbClusterInfoDeserializer(item: any): MongoDbClusterInfo {
  return {
    databases: mongoDbDatabaseInfoArrayDeserializer(item["databases"]),
    supportsSharding: item["supportsSharding"],
    type: item["type"],
    version: item["version"],
  };
}

export function mongoDbDatabaseInfoArrayDeserializer(result: Array<MongoDbDatabaseInfo>): any[] {
  return result.map((item) => {
    return mongoDbDatabaseInfoDeserializer(item);
  });
}

/** Describes a database within a MongoDB data source */
export interface MongoDbDatabaseInfo extends MongoDbObjectInfo {
  /** A list of supported collections in a MongoDB database */
  collections: MongoDbCollectionInfo[];
  /** Whether the database has sharding enabled. Note that the migration task will enable sharding on the target if necessary. */
  supportsSharding: boolean;
}

export function mongoDbDatabaseInfoDeserializer(item: any): MongoDbDatabaseInfo {
  return {
    averageDocumentSize: item["averageDocumentSize"],
    dataSize: item["dataSize"],
    documentCount: item["documentCount"],
    name: item["name"],
    qualifiedName: item["qualifiedName"],
    collections: mongoDbCollectionInfoArrayDeserializer(item["collections"]),
    supportsSharding: item["supportsSharding"],
  };
}

export function mongoDbCollectionInfoArrayDeserializer(
  result: Array<MongoDbCollectionInfo>,
): any[] {
  return result.map((item) => {
    return mongoDbCollectionInfoDeserializer(item);
  });
}

/** Describes a supported collection within a MongoDB database */
export interface MongoDbCollectionInfo extends MongoDbObjectInfo {
  /** The name of the database containing the collection */
  databaseName: string;
  /** Whether the collection is a capped collection (i.e. whether it has a fixed size and acts like a circular buffer) */
  isCapped: boolean;
  /** Whether the collection is system collection */
  isSystemCollection: boolean;
  /** Whether the collection is a view of another collection */
  isView: boolean;
  /** The shard key on the collection, or null if the collection is not sharded */
  shardKey?: MongoDbShardKeyInfo;
  /** Whether the database has sharding enabled. Note that the migration task will enable sharding on the target if necessary. */
  supportsSharding: boolean;
  /** The name of the collection that this is a view of, if IsView is true */
  viewOf?: string;
}

export function mongoDbCollectionInfoDeserializer(item: any): MongoDbCollectionInfo {
  return {
    averageDocumentSize: item["averageDocumentSize"],
    dataSize: item["dataSize"],
    documentCount: item["documentCount"],
    name: item["name"],
    qualifiedName: item["qualifiedName"],
    databaseName: item["databaseName"],
    isCapped: item["isCapped"],
    isSystemCollection: item["isSystemCollection"],
    isView: item["isView"],
    shardKey: !item["shardKey"]
      ? item["shardKey"]
      : mongoDbShardKeyInfoDeserializer(item["shardKey"]),
    supportsSharding: item["supportsSharding"],
    viewOf: item["viewOf"],
  };
}

/** Describes a MongoDB shard key */
export interface MongoDbShardKeyInfo {
  /** The fields within the shard key */
  fields: MongoDbShardKeyField[];
  /** Whether the shard key is unique */
  isUnique: boolean;
}

export function mongoDbShardKeyInfoDeserializer(item: any): MongoDbShardKeyInfo {
  return {
    fields: mongoDbShardKeyFieldArrayDeserializer(item["fields"]),
    isUnique: item["isUnique"],
  };
}

export function mongoDbShardKeyFieldArraySerializer(result: Array<MongoDbShardKeyField>): any[] {
  return result.map((item) => {
    return mongoDbShardKeyFieldSerializer(item);
  });
}

export function mongoDbShardKeyFieldArrayDeserializer(result: Array<MongoDbShardKeyField>): any[] {
  return result.map((item) => {
    return mongoDbShardKeyFieldDeserializer(item);
  });
}

/** Describes a field reference within a MongoDB shard key */
export interface MongoDbShardKeyField {
  /** The name of the field */
  name: string;
  /** The field ordering */
  order: MongoDbShardKeyOrder;
}

export function mongoDbShardKeyFieldSerializer(item: MongoDbShardKeyField): any {
  return { name: item["name"], order: item["order"] };
}

export function mongoDbShardKeyFieldDeserializer(item: any): MongoDbShardKeyField {
  return {
    name: item["name"],
    order: item["order"],
  };
}

/** The field ordering */
export enum KnownMongoDbShardKeyOrder {
  /** Forward */
  Forward = "Forward",
  /** Reverse */
  Reverse = "Reverse",
  /** Hashed */
  Hashed = "Hashed",
}

/**
 * The field ordering \
 * {@link KnownMongoDbShardKeyOrder} can be used interchangeably with MongoDbShardKeyOrder,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Forward**: Forward \
 * **Reverse**: Reverse \
 * **Hashed**: Hashed
 */
export type MongoDbShardKeyOrder = string;

/** The type of data source */
export enum KnownMongoDbClusterType {
  /** BlobContainer */
  BlobContainer = "BlobContainer",
  /** CosmosDb */
  CosmosDb = "CosmosDb",
  /** MongoDb */
  MongoDb = "MongoDb",
}

/**
 * The type of data source \
 * {@link KnownMongoDbClusterType} can be used interchangeably with MongoDbClusterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BlobContainer**: BlobContainer \
 * **CosmosDb**: CosmosDb \
 * **MongoDb**: MongoDb
 */
export type MongoDbClusterType = string;

/** Properties for the task that validates connection to SQL Server and also validates source server requirements */
export interface ConnectToSourceSqlServerTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToSourceSqlServerTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToSourceSqlServerTaskOutputUnion[];
  /** Task id */
  taskId?: string;
  /** Task type. */
  taskType: "ConnectToSource.SqlServer";
}

export function connectToSourceSqlServerTaskPropertiesSerializer(
  item: ConnectToSourceSqlServerTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : connectToSourceSqlServerTaskInputSerializer(item["input"]),
    taskId: item["taskId"],
  };
}

export function connectToSourceSqlServerTaskPropertiesDeserializer(
  item: any,
): ConnectToSourceSqlServerTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToSourceSqlServerTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToSourceSqlServerTaskOutputUnionArrayDeserializer(item["output"]),
    taskId: item["taskId"],
  };
}

/** Input for the task that validates connection to SQL Server and also validates source server requirements */
export interface ConnectToSourceSqlServerTaskInput {
  /** Connection information for Source SQL Server */
  sourceConnectionInfo: SqlConnectionInfo;
  /** Permission group for validations */
  checkPermissionsGroup?: ServerLevelPermissionsGroup;
  /** Flag for whether to collect databases from source server. */
  collectDatabases?: boolean;
  /** Flag for whether to collect logins from source server. */
  collectLogins?: boolean;
  /** Flag for whether to collect agent jobs from source server. */
  collectAgentJobs?: boolean;
  /** Flag for whether to collect TDE Certificate names from source server. */
  collectTdeCertificateInfo?: boolean;
  /** Flag for whether to validate SSIS catalog is reachable on the source server. */
  validateSsisCatalogOnly?: boolean;
  /** encrypted key for secure fields */
  encryptedKeyForSecureFields?: string;
}

export function connectToSourceSqlServerTaskInputSerializer(
  item: ConnectToSourceSqlServerTaskInput,
): any {
  return {
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    checkPermissionsGroup: item["checkPermissionsGroup"],
    collectDatabases: item["collectDatabases"],
    collectLogins: item["collectLogins"],
    collectAgentJobs: item["collectAgentJobs"],
    collectTdeCertificateInfo: item["collectTdeCertificateInfo"],
    validateSsisCatalogOnly: item["validateSsisCatalogOnly"],
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
  };
}

export function connectToSourceSqlServerTaskInputDeserializer(
  item: any,
): ConnectToSourceSqlServerTaskInput {
  return {
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    checkPermissionsGroup: item["checkPermissionsGroup"],
    collectDatabases: item["collectDatabases"],
    collectLogins: item["collectLogins"],
    collectAgentJobs: item["collectAgentJobs"],
    collectTdeCertificateInfo: item["collectTdeCertificateInfo"],
    validateSsisCatalogOnly: item["validateSsisCatalogOnly"],
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
  };
}

/** Information for connecting to SQL database server */
export interface SqlConnectionInfo extends ConnectionInfo {
  /** Data source in the format Protocol:MachineName\SQLServerInstanceName,PortNumber */
  dataSource: string;
  /** name of the server */
  serverName?: string;
  /** Port for Server */
  port?: number;
  /** server version */
  serverVersion?: string;
  /** server brand version */
  serverBrandVersion?: string;
  /** Represents the ID of an HTTP resource represented by an Azure resource provider. */
  resourceId?: string;
  /** Authentication type to use for connection */
  authentication?: AuthenticationType;
  /** Whether to encrypt the connection */
  encryptConnection?: boolean;
  /** Additional connection settings */
  additionalSettings?: string;
  /** Whether to trust the server certificate */
  trustServerCertificate?: boolean;
  /** Server platform type for connection */
  platform?: SqlSourcePlatform;
  /** Type of connection info */
  type: "SqlConnectionInfo";
}

export function sqlConnectionInfoSerializer(item: SqlConnectionInfo): any {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    dataSource: item["dataSource"],
    serverName: item["serverName"],
    port: item["port"],
    serverVersion: item["serverVersion"],
    serverBrandVersion: item["serverBrandVersion"],
    resourceId: item["resourceId"],
    authentication: item["authentication"],
    encryptConnection: item["encryptConnection"],
    additionalSettings: item["additionalSettings"],
    trustServerCertificate: item["trustServerCertificate"],
    platform: item["platform"],
  };
}

export function sqlConnectionInfoDeserializer(item: any): SqlConnectionInfo {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    dataSource: item["dataSource"],
    serverName: item["serverName"],
    port: item["port"],
    serverVersion: item["serverVersion"],
    serverBrandVersion: item["serverBrandVersion"],
    resourceId: item["resourceId"],
    authentication: item["authentication"],
    encryptConnection: item["encryptConnection"],
    additionalSettings: item["additionalSettings"],
    trustServerCertificate: item["trustServerCertificate"],
    platform: item["platform"],
  };
}

/** An enumeration of source platform types */
export enum KnownSqlSourcePlatform {
  /** SqlOnPrem */
  SqlOnPrem = "SqlOnPrem",
}

/**
 * An enumeration of source platform types \
 * {@link KnownSqlSourcePlatform} can be used interchangeably with SqlSourcePlatform,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SqlOnPrem**: SqlOnPrem
 */
export type SqlSourcePlatform = string;
/** Permission group for validations. These groups will run a set of permissions for validating user activity. Select the permission group for the activity that you are performing. */
export type ServerLevelPermissionsGroup =
  | "Default"
  | "MigrationFromSqlServerToAzureDB"
  | "MigrationFromSqlServerToAzureMI"
  | "MigrationFromMySQLToAzureDBForMySQL"
  | "MigrationFromSqlServerToAzureVM";

export function connectToSourceSqlServerTaskOutputUnionArrayDeserializer(
  result: Array<ConnectToSourceSqlServerTaskOutputUnion>,
): any[] {
  return result.map((item) => {
    return connectToSourceSqlServerTaskOutputUnionDeserializer(item);
  });
}

/** Output for the task that validates connection to SQL Server and also validates source server requirements */
export interface ConnectToSourceSqlServerTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Type of result - database level or task level */
  /** The discriminator possible values: TaskLevelOutput, DatabaseLevelOutput, LoginLevelOutput, AgentJobLevelOutput */
  resultType: string;
}

export function connectToSourceSqlServerTaskOutputDeserializer(
  item: any,
): ConnectToSourceSqlServerTaskOutput {
  return {
    id: item["id"],
    resultType: item["resultType"],
  };
}

/** Alias for ConnectToSourceSqlServerTaskOutputUnion */
export type ConnectToSourceSqlServerTaskOutputUnion =
  | ConnectToSourceSqlServerTaskOutputTaskLevel
  | ConnectToSourceSqlServerTaskOutputDatabaseLevel
  | ConnectToSourceSqlServerTaskOutputLoginLevel
  | ConnectToSourceSqlServerTaskOutputAgentJobLevel
  | ConnectToSourceSqlServerTaskOutput;

export function connectToSourceSqlServerTaskOutputUnionDeserializer(
  item: any,
): ConnectToSourceSqlServerTaskOutputUnion {
  switch (item["resultType"]) {
    case "TaskLevelOutput":
      return connectToSourceSqlServerTaskOutputTaskLevelDeserializer(
        item as ConnectToSourceSqlServerTaskOutputTaskLevel,
      );

    case "DatabaseLevelOutput":
      return connectToSourceSqlServerTaskOutputDatabaseLevelDeserializer(
        item as ConnectToSourceSqlServerTaskOutputDatabaseLevel,
      );

    case "LoginLevelOutput":
      return connectToSourceSqlServerTaskOutputLoginLevelDeserializer(
        item as ConnectToSourceSqlServerTaskOutputLoginLevel,
      );

    case "AgentJobLevelOutput":
      return connectToSourceSqlServerTaskOutputAgentJobLevelDeserializer(
        item as ConnectToSourceSqlServerTaskOutputAgentJobLevel,
      );

    default:
      return connectToSourceSqlServerTaskOutputDeserializer(item);
  }
}

/** Task level output for the task that validates connection to SQL Server and also validates source server requirements */
export interface ConnectToSourceSqlServerTaskOutputTaskLevel extends ConnectToSourceSqlServerTaskOutput {
  /** Source databases as a map from database name to database id */
  readonly databases?: string;
  /** Source logins as a map from login name to login id. */
  readonly logins?: string;
  /** Source agent jobs as a map from agent job name to id. */
  readonly agentJobs?: string;
  /** Mapping from database name to TDE certificate name, if applicable */
  readonly databaseTdeCertificateMapping?: string;
  /** Source server version */
  readonly sourceServerVersion?: string;
  /** Source server brand version */
  readonly sourceServerBrandVersion?: string;
  /** Validation errors */
  readonly validationErrors?: ReportableException[];
  /** Type of result - database level or task level */
  resultType: "TaskLevelOutput";
}

export function connectToSourceSqlServerTaskOutputTaskLevelDeserializer(
  item: any,
): ConnectToSourceSqlServerTaskOutputTaskLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    databases: item["databases"],
    logins: item["logins"],
    agentJobs: item["agentJobs"],
    databaseTdeCertificateMapping: item["databaseTdeCertificateMapping"],
    sourceServerVersion: item["sourceServerVersion"],
    sourceServerBrandVersion: item["sourceServerBrandVersion"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Database level output for the task that validates connection to SQL Server and also validates source server requirements */
export interface ConnectToSourceSqlServerTaskOutputDatabaseLevel extends ConnectToSourceSqlServerTaskOutput {
  /** Database name */
  readonly name?: string;
  /** Size of the file in megabytes */
  readonly sizeMB?: number;
  /** The list of database files */
  readonly databaseFiles?: DatabaseFileInfo[];
  /** SQL Server compatibility level of database */
  readonly compatibilityLevel?: DatabaseCompatLevel;
  /** State of the database */
  readonly databaseState?: DatabaseState;
  /** Type of result - database level or task level */
  resultType: "DatabaseLevelOutput";
}

export function connectToSourceSqlServerTaskOutputDatabaseLevelDeserializer(
  item: any,
): ConnectToSourceSqlServerTaskOutputDatabaseLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    name: item["name"],
    sizeMB: item["sizeMB"],
    databaseFiles: !item["databaseFiles"]
      ? item["databaseFiles"]
      : databaseFileInfoArrayDeserializer(item["databaseFiles"]),
    compatibilityLevel: item["compatibilityLevel"],
    databaseState: item["databaseState"],
  };
}

export function databaseFileInfoArrayDeserializer(result: Array<DatabaseFileInfo>): any[] {
  return result.map((item) => {
    return databaseFileInfoDeserializer(item);
  });
}

/** Database file specific information */
export interface DatabaseFileInfo {
  /** Name of the database */
  databaseName?: string;
  /** Unique identifier for database file */
  id?: string;
  /** Logical name of the file */
  logicalName?: string;
  /** Operating-system full path of the file */
  physicalFullName?: string;
  /** Suggested full path of the file for restoring */
  restoreFullName?: string;
  /** Database file type */
  fileType?: DatabaseFileType;
  /** Size of the file in megabytes */
  sizeMB?: number;
}

export function databaseFileInfoDeserializer(item: any): DatabaseFileInfo {
  return {
    databaseName: item["databaseName"],
    id: item["id"],
    logicalName: item["logicalName"],
    physicalFullName: item["physicalFullName"],
    restoreFullName: item["restoreFullName"],
    fileType: item["fileType"],
    sizeMB: item["sizeMB"],
  };
}

/** An enumeration of SQL Server database file types */
export enum KnownDatabaseFileType {
  /** Rows */
  Rows = "Rows",
  /** Log */
  Log = "Log",
  /** Filestream */
  Filestream = "Filestream",
  /** NotSupported */
  NotSupported = "NotSupported",
  /** Fulltext */
  Fulltext = "Fulltext",
}

/**
 * An enumeration of SQL Server database file types \
 * {@link KnownDatabaseFileType} can be used interchangeably with DatabaseFileType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Rows**: Rows \
 * **Log**: Log \
 * **Filestream**: Filestream \
 * **NotSupported**: NotSupported \
 * **Fulltext**: Fulltext
 */
export type DatabaseFileType = string;

/** An enumeration of SQL Server database compatibility levels */
export enum KnownDatabaseCompatLevel {
  /** CompatLevel80 */
  CompatLevel80 = "CompatLevel80",
  /** CompatLevel90 */
  CompatLevel90 = "CompatLevel90",
  /** CompatLevel100 */
  CompatLevel100 = "CompatLevel100",
  /** CompatLevel110 */
  CompatLevel110 = "CompatLevel110",
  /** CompatLevel120 */
  CompatLevel120 = "CompatLevel120",
  /** CompatLevel130 */
  CompatLevel130 = "CompatLevel130",
  /** CompatLevel140 */
  CompatLevel140 = "CompatLevel140",
}

/**
 * An enumeration of SQL Server database compatibility levels \
 * {@link KnownDatabaseCompatLevel} can be used interchangeably with DatabaseCompatLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CompatLevel80**: CompatLevel80 \
 * **CompatLevel90**: CompatLevel90 \
 * **CompatLevel100**: CompatLevel100 \
 * **CompatLevel110**: CompatLevel110 \
 * **CompatLevel120**: CompatLevel120 \
 * **CompatLevel130**: CompatLevel130 \
 * **CompatLevel140**: CompatLevel140
 */
export type DatabaseCompatLevel = string;

/** An enumeration of SQL Server Database states */
export enum KnownDatabaseState {
  /** Online */
  Online = "Online",
  /** Restoring */
  Restoring = "Restoring",
  /** Recovering */
  Recovering = "Recovering",
  /** RecoveryPending */
  RecoveryPending = "RecoveryPending",
  /** Suspect */
  Suspect = "Suspect",
  /** Emergency */
  Emergency = "Emergency",
  /** Offline */
  Offline = "Offline",
  /** Copying */
  Copying = "Copying",
  /** OfflineSecondary */
  OfflineSecondary = "OfflineSecondary",
}

/**
 * An enumeration of SQL Server Database states \
 * {@link KnownDatabaseState} can be used interchangeably with DatabaseState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Online**: Online \
 * **Restoring**: Restoring \
 * **Recovering**: Recovering \
 * **RecoveryPending**: RecoveryPending \
 * **Suspect**: Suspect \
 * **Emergency**: Emergency \
 * **Offline**: Offline \
 * **Copying**: Copying \
 * **OfflineSecondary**: OfflineSecondary
 */
export type DatabaseState = string;

/** Login level output for the task that validates connection to SQL Server and also validates source server requirements */
export interface ConnectToSourceSqlServerTaskOutputLoginLevel extends ConnectToSourceSqlServerTaskOutput {
  /** Login name. */
  readonly name?: string;
  /** The type of login. */
  readonly loginType?: LoginType;
  /** The default database for the login. */
  readonly defaultDatabase?: string;
  /** The state of the login. */
  readonly isEnabled?: boolean;
  /** Information about eligibility of login for migration. */
  readonly migrationEligibility?: MigrationEligibilityInfo;
  /** Type of result - database level or task level */
  resultType: "LoginLevelOutput";
}

export function connectToSourceSqlServerTaskOutputLoginLevelDeserializer(
  item: any,
): ConnectToSourceSqlServerTaskOutputLoginLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    name: item["name"],
    loginType: item["loginType"],
    defaultDatabase: item["defaultDatabase"],
    isEnabled: item["isEnabled"],
    migrationEligibility: !item["migrationEligibility"]
      ? item["migrationEligibility"]
      : migrationEligibilityInfoDeserializer(item["migrationEligibility"]),
  };
}

/** Enum mapping of SMO LoginType. */
export enum KnownLoginType {
  /** WindowsUser */
  WindowsUser = "WindowsUser",
  /** WindowsGroup */
  WindowsGroup = "WindowsGroup",
  /** SqlLogin */
  SqlLogin = "SqlLogin",
  /** Certificate */
  Certificate = "Certificate",
  /** AsymmetricKey */
  AsymmetricKey = "AsymmetricKey",
  /** ExternalUser */
  ExternalUser = "ExternalUser",
  /** ExternalGroup */
  ExternalGroup = "ExternalGroup",
}

/**
 * Enum mapping of SMO LoginType. \
 * {@link KnownLoginType} can be used interchangeably with LoginType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WindowsUser**: WindowsUser \
 * **WindowsGroup**: WindowsGroup \
 * **SqlLogin**: SqlLogin \
 * **Certificate**: Certificate \
 * **AsymmetricKey**: AsymmetricKey \
 * **ExternalUser**: ExternalUser \
 * **ExternalGroup**: ExternalGroup
 */
export type LoginType = string;

/** Information about migration eligibility of a server object */
export interface MigrationEligibilityInfo {
  /** Whether object is eligible for migration or not. */
  readonly isEligibleForMigration?: boolean;
  /** Information about eligibility failure for the server object. */
  readonly validationMessages?: string[];
}

export function migrationEligibilityInfoDeserializer(item: any): MigrationEligibilityInfo {
  return {
    isEligibleForMigration: item["isEligibleForMigration"],
    validationMessages: !item["validationMessages"]
      ? item["validationMessages"]
      : item["validationMessages"].map((p: any) => {
          return p;
        }),
  };
}

/** Agent Job level output for the task that validates connection to SQL Server and also validates source server requirements */
export interface ConnectToSourceSqlServerTaskOutputAgentJobLevel extends ConnectToSourceSqlServerTaskOutput {
  /** Agent Job name */
  readonly name?: string;
  /** The type of Agent Job. */
  readonly jobCategory?: string;
  /** The state of the original Agent Job. */
  readonly isEnabled?: boolean;
  /** The owner of the Agent Job */
  readonly jobOwner?: string;
  /** UTC Date and time when the Agent Job was last executed. */
  readonly lastExecutedOn?: Date;
  /** Validation errors */
  readonly validationErrors?: ReportableException[];
  /** Information about eligibility of agent job for migration. */
  readonly migrationEligibility?: MigrationEligibilityInfo;
  /** Type of result - database level or task level */
  resultType: "AgentJobLevelOutput";
}

export function connectToSourceSqlServerTaskOutputAgentJobLevelDeserializer(
  item: any,
): ConnectToSourceSqlServerTaskOutputAgentJobLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    name: item["name"],
    jobCategory: item["jobCategory"],
    isEnabled: item["isEnabled"],
    jobOwner: item["jobOwner"],
    lastExecutedOn: !item["lastExecutedOn"]
      ? item["lastExecutedOn"]
      : new Date(item["lastExecutedOn"]),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
    migrationEligibility: !item["migrationEligibility"]
      ? item["migrationEligibility"]
      : migrationEligibilityInfoDeserializer(item["migrationEligibility"]),
  };
}

/** Properties for the task that validates connection to SQL Server and source server requirements for online migration */
export interface ConnectToSourceSqlServerSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToSourceSqlServerTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToSourceSqlServerTaskOutputUnion[];
  /** Task type. */
  taskType: "ConnectToSource.SqlServer.Sync";
}

export function connectToSourceSqlServerSyncTaskPropertiesSerializer(
  item: ConnectToSourceSqlServerSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : connectToSourceSqlServerTaskInputSerializer(item["input"]),
  };
}

export function connectToSourceSqlServerSyncTaskPropertiesDeserializer(
  item: any,
): ConnectToSourceSqlServerSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToSourceSqlServerTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToSourceSqlServerTaskOutputUnionArrayDeserializer(item["output"]),
  };
}

/** Properties for the task that validates connection to PostgreSQL server and source server requirements for online migration */
export interface ConnectToSourcePostgreSqlSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToSourcePostgreSqlSyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToSourcePostgreSqlSyncTaskOutput[];
  /** Task type. */
  taskType: "ConnectToSource.PostgreSql.Sync";
}

export function connectToSourcePostgreSqlSyncTaskPropertiesSerializer(
  item: ConnectToSourcePostgreSqlSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : connectToSourcePostgreSqlSyncTaskInputSerializer(item["input"]),
  };
}

export function connectToSourcePostgreSqlSyncTaskPropertiesDeserializer(
  item: any,
): ConnectToSourcePostgreSqlSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToSourcePostgreSqlSyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToSourcePostgreSqlSyncTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that validates connection to PostgreSQL and source server requirements */
export interface ConnectToSourcePostgreSqlSyncTaskInput {
  /** Connection information for source PostgreSQL server */
  sourceConnectionInfo: PostgreSqlConnectionInfo;
}

export function connectToSourcePostgreSqlSyncTaskInputSerializer(
  item: ConnectToSourcePostgreSqlSyncTaskInput,
): any {
  return { sourceConnectionInfo: postgreSqlConnectionInfoSerializer(item["sourceConnectionInfo"]) };
}

export function connectToSourcePostgreSqlSyncTaskInputDeserializer(
  item: any,
): ConnectToSourcePostgreSqlSyncTaskInput {
  return {
    sourceConnectionInfo: postgreSqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
  };
}

/** Information for connecting to PostgreSQL server */
export interface PostgreSqlConnectionInfo extends ConnectionInfo {
  /** Name of the server */
  serverName: string;
  /** Data source */
  dataSource?: string;
  /** server version */
  serverVersion?: string;
  /** Name of the database */
  databaseName?: string;
  /** Port for Server */
  port: number;
  /** Whether to encrypt the connection */
  encryptConnection?: boolean;
  /** Whether to trust the server certificate */
  trustServerCertificate?: boolean;
  /** Additional connection settings */
  additionalSettings?: string;
  /** server brand version */
  serverBrandVersion?: string;
  /** Authentication type to use for connection */
  authentication?: AuthenticationType;
  /** Type of connection info */
  type: "PostgreSqlConnectionInfo";
}

export function postgreSqlConnectionInfoSerializer(item: PostgreSqlConnectionInfo): any {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    serverName: item["serverName"],
    dataSource: item["dataSource"],
    serverVersion: item["serverVersion"],
    databaseName: item["databaseName"],
    port: item["port"],
    encryptConnection: item["encryptConnection"],
    trustServerCertificate: item["trustServerCertificate"],
    additionalSettings: item["additionalSettings"],
    serverBrandVersion: item["serverBrandVersion"],
    authentication: item["authentication"],
  };
}

export function postgreSqlConnectionInfoDeserializer(item: any): PostgreSqlConnectionInfo {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    serverName: item["serverName"],
    dataSource: item["dataSource"],
    serverVersion: item["serverVersion"],
    databaseName: item["databaseName"],
    port: item["port"],
    encryptConnection: item["encryptConnection"],
    trustServerCertificate: item["trustServerCertificate"],
    additionalSettings: item["additionalSettings"],
    serverBrandVersion: item["serverBrandVersion"],
    authentication: item["authentication"],
  };
}

export function connectToSourcePostgreSqlSyncTaskOutputArrayDeserializer(
  result: Array<ConnectToSourcePostgreSqlSyncTaskOutput>,
): any[] {
  return result.map((item) => {
    return connectToSourcePostgreSqlSyncTaskOutputDeserializer(item);
  });
}

/** Output for the task that validates connection to PostgreSQL and source server requirements */
export interface ConnectToSourcePostgreSqlSyncTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Version of the source server */
  readonly sourceServerVersion?: string;
  /** List of databases on source server */
  readonly databases?: string[];
  /** Source server brand version */
  readonly sourceServerBrandVersion?: string;
  /** Validation errors associated with the task */
  readonly validationErrors?: ReportableException[];
}

export function connectToSourcePostgreSqlSyncTaskOutputDeserializer(
  item: any,
): ConnectToSourcePostgreSqlSyncTaskOutput {
  return {
    id: item["id"],
    sourceServerVersion: item["sourceServerVersion"],
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    sourceServerBrandVersion: item["sourceServerBrandVersion"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that validates MySQL database connection */
export interface ConnectToSourceMySqlTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToSourceMySqlTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToSourceNonSqlTaskOutput[];
  /** Task type. */
  taskType: "ConnectToSource.MySql";
}

export function connectToSourceMySqlTaskPropertiesSerializer(
  item: ConnectToSourceMySqlTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : connectToSourceMySqlTaskInputSerializer(item["input"]),
  };
}

export function connectToSourceMySqlTaskPropertiesDeserializer(
  item: any,
): ConnectToSourceMySqlTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToSourceMySqlTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToSourceNonSqlTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that validates MySQL database connection */
export interface ConnectToSourceMySqlTaskInput {
  /** Information for connecting to MySQL source */
  sourceConnectionInfo: MySqlConnectionInfo;
  /** Target Platform for the migration */
  targetPlatform?: MySqlTargetPlatformType;
  /** Permission group for validations */
  checkPermissionsGroup?: ServerLevelPermissionsGroup;
  /** Flag for whether or not the migration is offline */
  isOfflineMigration?: boolean;
}

export function connectToSourceMySqlTaskInputSerializer(item: ConnectToSourceMySqlTaskInput): any {
  return {
    sourceConnectionInfo: mySqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetPlatform: item["targetPlatform"],
    checkPermissionsGroup: item["checkPermissionsGroup"],
    isOfflineMigration: item["isOfflineMigration"],
  };
}

export function connectToSourceMySqlTaskInputDeserializer(
  item: any,
): ConnectToSourceMySqlTaskInput {
  return {
    sourceConnectionInfo: mySqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetPlatform: item["targetPlatform"],
    checkPermissionsGroup: item["checkPermissionsGroup"],
    isOfflineMigration: item["isOfflineMigration"],
  };
}

/** Information for connecting to MySQL server */
export interface MySqlConnectionInfo extends ConnectionInfo {
  /** Name of the server */
  serverName: string;
  /** Data source */
  dataSource?: string;
  /** Port for Server */
  port: number;
  /** Whether to encrypt the connection */
  encryptConnection?: boolean;
  /** Authentication type to use for connection */
  authentication?: AuthenticationType;
  /** Additional connection settings */
  additionalSettings?: string;
  /** Type of connection info */
  type: "MySqlConnectionInfo";
}

export function mySqlConnectionInfoSerializer(item: MySqlConnectionInfo): any {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    serverName: item["serverName"],
    dataSource: item["dataSource"],
    port: item["port"],
    encryptConnection: item["encryptConnection"],
    authentication: item["authentication"],
    additionalSettings: item["additionalSettings"],
  };
}

export function mySqlConnectionInfoDeserializer(item: any): MySqlConnectionInfo {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    serverName: item["serverName"],
    dataSource: item["dataSource"],
    port: item["port"],
    encryptConnection: item["encryptConnection"],
    authentication: item["authentication"],
    additionalSettings: item["additionalSettings"],
  };
}

/** An enumeration of possible target types when migrating from MySQL */
export enum KnownMySqlTargetPlatformType {
  /** SqlServer */
  SqlServer = "SqlServer",
  /** AzureDbForMySQL */
  AzureDbForMySQL = "AzureDbForMySQL",
}

/**
 * An enumeration of possible target types when migrating from MySQL \
 * {@link KnownMySqlTargetPlatformType} can be used interchangeably with MySqlTargetPlatformType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SqlServer**: SqlServer \
 * **AzureDbForMySQL**: AzureDbForMySQL
 */
export type MySqlTargetPlatformType = string;

export function connectToSourceNonSqlTaskOutputArrayDeserializer(
  result: Array<ConnectToSourceNonSqlTaskOutput>,
): any[] {
  return result.map((item) => {
    return connectToSourceNonSqlTaskOutputDeserializer(item);
  });
}

/** Output for connect to MySQL type source */
export interface ConnectToSourceNonSqlTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Server brand version */
  readonly sourceServerBrandVersion?: string;
  /** Server properties */
  readonly serverProperties?: ServerProperties;
  /** List of databases on the server */
  readonly databases?: string[];
  /** Validation errors associated with the task */
  readonly validationErrors?: ReportableException[];
}

export function connectToSourceNonSqlTaskOutputDeserializer(
  item: any,
): ConnectToSourceNonSqlTaskOutput {
  return {
    id: item["id"],
    sourceServerBrandVersion: item["sourceServerBrandVersion"],
    serverProperties: !item["serverProperties"]
      ? item["serverProperties"]
      : serverPropertiesDeserializer(item["serverProperties"]),
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Server properties for MySQL type source */
export interface ServerProperties {
  /** Name of the server platform */
  readonly serverPlatform?: string;
  /** Name of the server */
  readonly serverName?: string;
  /** Version of the database server */
  readonly serverVersion?: string;
  /** Edition of the database server */
  readonly serverEdition?: string;
  /** Version of the operating system */
  readonly serverOperatingSystemVersion?: string;
  /** Number of databases in the server */
  readonly serverDatabaseCount?: number;
}

export function serverPropertiesDeserializer(item: any): ServerProperties {
  return {
    serverPlatform: item["serverPlatform"],
    serverName: item["serverName"],
    serverVersion: item["serverVersion"],
    serverEdition: item["serverEdition"],
    serverOperatingSystemVersion: item["serverOperatingSystemVersion"],
    serverDatabaseCount: item["serverDatabaseCount"],
  };
}

/** Properties for the task that validates Oracle database connection */
export interface ConnectToSourceOracleSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToSourceOracleSyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToSourceOracleSyncTaskOutput[];
  /** Task type. */
  taskType: "ConnectToSource.Oracle.Sync";
}

export function connectToSourceOracleSyncTaskPropertiesSerializer(
  item: ConnectToSourceOracleSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : connectToSourceOracleSyncTaskInputSerializer(item["input"]),
  };
}

export function connectToSourceOracleSyncTaskPropertiesDeserializer(
  item: any,
): ConnectToSourceOracleSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToSourceOracleSyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToSourceOracleSyncTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that validates Oracle database connection */
export interface ConnectToSourceOracleSyncTaskInput {
  /** Information for connecting to Oracle source */
  sourceConnectionInfo: OracleConnectionInfo;
}

export function connectToSourceOracleSyncTaskInputSerializer(
  item: ConnectToSourceOracleSyncTaskInput,
): any {
  return { sourceConnectionInfo: oracleConnectionInfoSerializer(item["sourceConnectionInfo"]) };
}

export function connectToSourceOracleSyncTaskInputDeserializer(
  item: any,
): ConnectToSourceOracleSyncTaskInput {
  return {
    sourceConnectionInfo: oracleConnectionInfoDeserializer(item["sourceConnectionInfo"]),
  };
}

/** Information for connecting to Oracle server */
export interface OracleConnectionInfo extends ConnectionInfo {
  /** EZConnect or TNSName connection string. */
  dataSource: string;
  /** name of the server */
  serverName?: string;
  /** server version */
  serverVersion?: string;
  /** port for server */
  port?: number;
  /** Authentication type to use for connection */
  authentication?: AuthenticationType;
  /** Type of connection info */
  type: "OracleConnectionInfo";
}

export function oracleConnectionInfoSerializer(item: OracleConnectionInfo): any {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    dataSource: item["dataSource"],
    serverName: item["serverName"],
    serverVersion: item["serverVersion"],
    port: item["port"],
    authentication: item["authentication"],
  };
}

export function oracleConnectionInfoDeserializer(item: any): OracleConnectionInfo {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    dataSource: item["dataSource"],
    serverName: item["serverName"],
    serverVersion: item["serverVersion"],
    port: item["port"],
    authentication: item["authentication"],
  };
}

export function connectToSourceOracleSyncTaskOutputArrayDeserializer(
  result: Array<ConnectToSourceOracleSyncTaskOutput>,
): any[] {
  return result.map((item) => {
    return connectToSourceOracleSyncTaskOutputDeserializer(item);
  });
}

/** Output for the task that validates Oracle database connection */
export interface ConnectToSourceOracleSyncTaskOutput {
  /** Version of the source server */
  readonly sourceServerVersion?: string;
  /** List of schemas on source server */
  readonly databases?: string[];
  /** Source server brand version */
  readonly sourceServerBrandVersion?: string;
  /** Validation errors associated with the task */
  readonly validationErrors?: ReportableException[];
}

export function connectToSourceOracleSyncTaskOutputDeserializer(
  item: any,
): ConnectToSourceOracleSyncTaskOutput {
  return {
    sourceServerVersion: item["sourceServerVersion"],
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    sourceServerBrandVersion: item["sourceServerBrandVersion"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that validates connection to SQL DB and target server requirements */
export interface ConnectToTargetSqlDbTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToTargetSqlDbTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToTargetSqlDbTaskOutput[];
  /** DateTime in UTC when the task was created */
  createdOn?: string;
  /** Task type. */
  taskType: "ConnectToTarget.SqlDb";
}

export function connectToTargetSqlDbTaskPropertiesSerializer(
  item: ConnectToTargetSqlDbTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : connectToTargetSqlDbTaskInputSerializer(item["input"]),
    createdOn: item["createdOn"],
  };
}

export function connectToTargetSqlDbTaskPropertiesDeserializer(
  item: any,
): ConnectToTargetSqlDbTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToTargetSqlDbTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToTargetSqlDbTaskOutputArrayDeserializer(item["output"]),
    createdOn: item["createdOn"],
  };
}

/** Input for the task that validates connection to SQL DB and target server requirements */
export interface ConnectToTargetSqlDbTaskInput {
  /** Connection information for target SQL DB */
  targetConnectionInfo: SqlConnectionInfo;
  /** Boolean flag indicating whether to query object counts for each database on the target server */
  queryObjectCounts?: boolean;
}

export function connectToTargetSqlDbTaskInputSerializer(item: ConnectToTargetSqlDbTaskInput): any {
  return {
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    queryObjectCounts: item["queryObjectCounts"],
  };
}

export function connectToTargetSqlDbTaskInputDeserializer(
  item: any,
): ConnectToTargetSqlDbTaskInput {
  return {
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    queryObjectCounts: item["queryObjectCounts"],
  };
}

export function connectToTargetSqlDbTaskOutputArrayDeserializer(
  result: Array<ConnectToTargetSqlDbTaskOutput>,
): any[] {
  return result.map((item) => {
    return connectToTargetSqlDbTaskOutputDeserializer(item);
  });
}

/** Output for the task that validates connection to SQL DB and target server requirements */
export interface ConnectToTargetSqlDbTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Source databases as a map from database name to database id */
  readonly databases?: string;
  /** Version of the target server */
  readonly targetServerVersion?: string;
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
}

export function connectToTargetSqlDbTaskOutputDeserializer(
  item: any,
): ConnectToTargetSqlDbTaskOutput {
  return {
    id: item["id"],
    databases: item["databases"],
    targetServerVersion: item["targetServerVersion"],
    targetServerBrandVersion: item["targetServerBrandVersion"],
  };
}

/** Properties for the task that validates connection to SQL DB and target server requirements for online migration */
export interface ConnectToTargetSqlSqlDbSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToTargetSqlSqlDbSyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToTargetSqlDbTaskOutput[];
  /** Task type. */
  taskType: "ConnectToTarget.SqlDb.Sync";
}

export function connectToTargetSqlSqlDbSyncTaskPropertiesSerializer(
  item: ConnectToTargetSqlSqlDbSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : connectToTargetSqlSqlDbSyncTaskInputSerializer(item["input"]),
  };
}

export function connectToTargetSqlSqlDbSyncTaskPropertiesDeserializer(
  item: any,
): ConnectToTargetSqlSqlDbSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToTargetSqlSqlDbSyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToTargetSqlDbTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that validates connection to Azure SQL DB and target server requirements */
export interface ConnectToTargetSqlSqlDbSyncTaskInput {
  /** Connection information for source SQL Server */
  sourceConnectionInfo: SqlConnectionInfo;
  /** Connection information for target SQL DB */
  targetConnectionInfo: SqlConnectionInfo;
}

export function connectToTargetSqlSqlDbSyncTaskInputSerializer(
  item: ConnectToTargetSqlSqlDbSyncTaskInput,
): any {
  return {
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
  };
}

export function connectToTargetSqlSqlDbSyncTaskInputDeserializer(
  item: any,
): ConnectToTargetSqlSqlDbSyncTaskInput {
  return {
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
  };
}

/** Properties for the task that validates connection to Azure Database For PostgreSQL server and target server requirements for online migration */
export interface ConnectToTargetAzureDbForPostgreSqlSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToTargetAzureDbForPostgreSqlSyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToTargetAzureDbForPostgreSqlSyncTaskOutput[];
  /** Task type. */
  taskType: "ConnectToTarget.AzureDbForPostgreSql.Sync";
}

export function connectToTargetAzureDbForPostgreSqlSyncTaskPropertiesSerializer(
  item: ConnectToTargetAzureDbForPostgreSqlSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : connectToTargetAzureDbForPostgreSqlSyncTaskInputSerializer(item["input"]),
  };
}

export function connectToTargetAzureDbForPostgreSqlSyncTaskPropertiesDeserializer(
  item: any,
): ConnectToTargetAzureDbForPostgreSqlSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToTargetAzureDbForPostgreSqlSyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToTargetAzureDbForPostgreSqlSyncTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that validates connection to Azure Database for PostgreSQL and target server requirements */
export interface ConnectToTargetAzureDbForPostgreSqlSyncTaskInput {
  /** Connection information for source PostgreSQL server */
  sourceConnectionInfo: PostgreSqlConnectionInfo;
  /** Connection information for target Azure Database for PostgreSQL server */
  targetConnectionInfo: PostgreSqlConnectionInfo;
}

export function connectToTargetAzureDbForPostgreSqlSyncTaskInputSerializer(
  item: ConnectToTargetAzureDbForPostgreSqlSyncTaskInput,
): any {
  return {
    sourceConnectionInfo: postgreSqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: postgreSqlConnectionInfoSerializer(item["targetConnectionInfo"]),
  };
}

export function connectToTargetAzureDbForPostgreSqlSyncTaskInputDeserializer(
  item: any,
): ConnectToTargetAzureDbForPostgreSqlSyncTaskInput {
  return {
    sourceConnectionInfo: postgreSqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: postgreSqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
  };
}

export function connectToTargetAzureDbForPostgreSqlSyncTaskOutputArrayDeserializer(
  result: Array<ConnectToTargetAzureDbForPostgreSqlSyncTaskOutput>,
): any[] {
  return result.map((item) => {
    return connectToTargetAzureDbForPostgreSqlSyncTaskOutputDeserializer(item);
  });
}

/** Output for the task that validates connection to Azure Database for PostgreSQL and target server requirements */
export interface ConnectToTargetAzureDbForPostgreSqlSyncTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Version of the target server */
  readonly targetServerVersion?: string;
  /** List of databases on target server */
  readonly databases?: string[];
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
  /** Validation errors associated with the task */
  readonly validationErrors?: ReportableException[];
}

export function connectToTargetAzureDbForPostgreSqlSyncTaskOutputDeserializer(
  item: any,
): ConnectToTargetAzureDbForPostgreSqlSyncTaskOutput {
  return {
    id: item["id"],
    targetServerVersion: item["targetServerVersion"],
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    targetServerBrandVersion: item["targetServerBrandVersion"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that validates connection to Azure Database For PostgreSQL server and target server requirements for online migration for Oracle source. */
export interface ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskOutput[];
  /** Task type. */
  taskType: "ConnectToTarget.Oracle.AzureDbForPostgreSql.Sync";
}

export function connectToTargetOracleAzureDbForPostgreSqlSyncTaskPropertiesSerializer(
  item: ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : connectToTargetOracleAzureDbForPostgreSqlSyncTaskInputSerializer(item["input"]),
  };
}

export function connectToTargetOracleAzureDbForPostgreSqlSyncTaskPropertiesDeserializer(
  item: any,
): ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToTargetOracleAzureDbForPostgreSqlSyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that validates connection to Azure Database for PostgreSQL and target server requirements for Oracle source. */
export interface ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskInput {
  /** Connection information for target Azure Database for PostgreSQL server */
  targetConnectionInfo: PostgreSqlConnectionInfo;
}

export function connectToTargetOracleAzureDbForPostgreSqlSyncTaskInputSerializer(
  item: ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskInput,
): any {
  return { targetConnectionInfo: postgreSqlConnectionInfoSerializer(item["targetConnectionInfo"]) };
}

export function connectToTargetOracleAzureDbForPostgreSqlSyncTaskInputDeserializer(
  item: any,
): ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskInput {
  return {
    targetConnectionInfo: postgreSqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
  };
}

export function connectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputArrayDeserializer(
  result: Array<ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskOutput>,
): any[] {
  return result.map((item) => {
    return connectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputDeserializer(item);
  });
}

/** Output for the task that validates connection to Azure Database for PostgreSQL and target server requirements for Oracle source. */
export interface ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskOutput {
  /** Version of the target server */
  readonly targetServerVersion?: string;
  /** List of databases on target server */
  readonly databases?: string[];
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
  /** Validation errors associated with the task */
  readonly validationErrors?: ReportableException[];
  /** Mapping of schemas per database */
  databaseSchemaMap?: ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputDatabaseSchemaMapItem[];
}

export function connectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputDeserializer(
  item: any,
): ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskOutput {
  return {
    targetServerVersion: item["targetServerVersion"],
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    targetServerBrandVersion: item["targetServerBrandVersion"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
    databaseSchemaMap: !item["databaseSchemaMap"]
      ? item["databaseSchemaMap"]
      : connectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputDatabaseSchemaMapItemArrayDeserializer(
          item["databaseSchemaMap"],
        ),
  };
}

export function connectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputDatabaseSchemaMapItemArrayDeserializer(
  result: Array<ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputDatabaseSchemaMapItem>,
): any[] {
  return result.map((item) => {
    return connectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputDatabaseSchemaMapItemDeserializer(
      item,
    );
  });
}

/** model interface ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputDatabaseSchemaMapItem */
export interface ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputDatabaseSchemaMapItem {
  database?: string;
  schemas?: string[];
}

export function connectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputDatabaseSchemaMapItemDeserializer(
  item: any,
): ConnectToTargetOracleAzureDbForPostgreSqlSyncTaskOutputDatabaseSchemaMapItem {
  return {
    database: item["database"],
    schemas: !item["schemas"]
      ? item["schemas"]
      : item["schemas"].map((p: any) => {
          return p;
        }),
  };
}

/** Properties for the task that collects user tables for the given list of databases */
export interface GetUserTablesSqlTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: GetUserTablesSqlTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: GetUserTablesSqlTaskOutput[];
  /** Task id */
  taskId?: string;
  /** Task type. */
  taskType: "GetUserTables.Sql";
}

export function getUserTablesSqlTaskPropertiesSerializer(
  item: GetUserTablesSqlTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : getUserTablesSqlTaskInputSerializer(item["input"]),
    taskId: item["taskId"],
  };
}

export function getUserTablesSqlTaskPropertiesDeserializer(
  item: any,
): GetUserTablesSqlTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"] ? item["input"] : getUserTablesSqlTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : getUserTablesSqlTaskOutputArrayDeserializer(item["output"]),
    taskId: item["taskId"],
  };
}

/** Input for the task that collects user tables for the given list of databases */
export interface GetUserTablesSqlTaskInput {
  /** Connection information for SQL Server */
  connectionInfo: SqlConnectionInfo;
  /** List of database names to collect tables for */
  selectedDatabases: string[];
  /** encrypted key for secure fields */
  encryptedKeyForSecureFields?: string;
}

export function getUserTablesSqlTaskInputSerializer(item: GetUserTablesSqlTaskInput): any {
  return {
    connectionInfo: sqlConnectionInfoSerializer(item["connectionInfo"]),
    selectedDatabases: item["selectedDatabases"].map((p: any) => {
      return p;
    }),
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
  };
}

export function getUserTablesSqlTaskInputDeserializer(item: any): GetUserTablesSqlTaskInput {
  return {
    connectionInfo: sqlConnectionInfoDeserializer(item["connectionInfo"]),
    selectedDatabases: item["selectedDatabases"].map((p: any) => {
      return p;
    }),
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
  };
}

export function getUserTablesSqlTaskOutputArrayDeserializer(
  result: Array<GetUserTablesSqlTaskOutput>,
): any[] {
  return result.map((item) => {
    return getUserTablesSqlTaskOutputDeserializer(item);
  });
}

/** Output of the task that collects user tables for the given list of databases */
export interface GetUserTablesSqlTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Mapping from database name to list of tables */
  readonly databasesToTables?: string;
  /** Validation errors */
  readonly validationErrors?: ReportableException[];
}

export function getUserTablesSqlTaskOutputDeserializer(item: any): GetUserTablesSqlTaskOutput {
  return {
    id: item["id"],
    databasesToTables: item["databasesToTables"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that collects user tables for the given list of databases */
export interface GetUserTablesSqlSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: GetUserTablesSqlSyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: GetUserTablesSqlSyncTaskOutput[];
  /** Task type. */
  taskType: "GetUserTables.AzureSqlDb.Sync";
}

export function getUserTablesSqlSyncTaskPropertiesSerializer(
  item: GetUserTablesSqlSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : getUserTablesSqlSyncTaskInputSerializer(item["input"]),
  };
}

export function getUserTablesSqlSyncTaskPropertiesDeserializer(
  item: any,
): GetUserTablesSqlSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : getUserTablesSqlSyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : getUserTablesSqlSyncTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that collects user tables for the given list of databases */
export interface GetUserTablesSqlSyncTaskInput {
  /** Connection information for SQL Server */
  sourceConnectionInfo: SqlConnectionInfo;
  /** Connection information for SQL DB */
  targetConnectionInfo: SqlConnectionInfo;
  /** List of source database names to collect tables for */
  selectedSourceDatabases: string[];
  /** List of target database names to collect tables for */
  selectedTargetDatabases: string[];
}

export function getUserTablesSqlSyncTaskInputSerializer(item: GetUserTablesSqlSyncTaskInput): any {
  return {
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    selectedSourceDatabases: item["selectedSourceDatabases"].map((p: any) => {
      return p;
    }),
    selectedTargetDatabases: item["selectedTargetDatabases"].map((p: any) => {
      return p;
    }),
  };
}

export function getUserTablesSqlSyncTaskInputDeserializer(
  item: any,
): GetUserTablesSqlSyncTaskInput {
  return {
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    selectedSourceDatabases: item["selectedSourceDatabases"].map((p: any) => {
      return p;
    }),
    selectedTargetDatabases: item["selectedTargetDatabases"].map((p: any) => {
      return p;
    }),
  };
}

export function getUserTablesSqlSyncTaskOutputArrayDeserializer(
  result: Array<GetUserTablesSqlSyncTaskOutput>,
): any[] {
  return result.map((item) => {
    return getUserTablesSqlSyncTaskOutputDeserializer(item);
  });
}

/** Output of the task that collects user tables for the given list of databases */
export interface GetUserTablesSqlSyncTaskOutput {
  /** Mapping from database name to list of source tables */
  readonly databasesToSourceTables?: string;
  /** Mapping from database name to list of target tables */
  readonly databasesToTargetTables?: string;
  /** Mapping from database name to list of validation errors */
  readonly tableValidationErrors?: string;
  /** Validation errors */
  readonly validationErrors?: ReportableException[];
}

export function getUserTablesSqlSyncTaskOutputDeserializer(
  item: any,
): GetUserTablesSqlSyncTaskOutput {
  return {
    databasesToSourceTables: item["databasesToSourceTables"],
    databasesToTargetTables: item["databasesToTargetTables"],
    tableValidationErrors: item["tableValidationErrors"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that collects user tables for the given list of Oracle schemas */
export interface GetUserTablesOracleTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: GetUserTablesOracleTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: GetUserTablesOracleTaskOutput[];
  /** Task type. */
  taskType: "GetUserTablesOracle";
}

export function getUserTablesOracleTaskPropertiesSerializer(
  item: GetUserTablesOracleTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : getUserTablesOracleTaskInputSerializer(item["input"]),
  };
}

export function getUserTablesOracleTaskPropertiesDeserializer(
  item: any,
): GetUserTablesOracleTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"] ? item["input"] : getUserTablesOracleTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : getUserTablesOracleTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that gets the list of tables contained within a provided list of Oracle schemas. */
export interface GetUserTablesOracleTaskInput {
  /** Information for connecting to Oracle source */
  connectionInfo: OracleConnectionInfo;
  /** List of Oracle schemas for which to collect tables */
  selectedSchemas: string[];
}

export function getUserTablesOracleTaskInputSerializer(item: GetUserTablesOracleTaskInput): any {
  return {
    connectionInfo: oracleConnectionInfoSerializer(item["connectionInfo"]),
    selectedSchemas: item["selectedSchemas"].map((p: any) => {
      return p;
    }),
  };
}

export function getUserTablesOracleTaskInputDeserializer(item: any): GetUserTablesOracleTaskInput {
  return {
    connectionInfo: oracleConnectionInfoDeserializer(item["connectionInfo"]),
    selectedSchemas: item["selectedSchemas"].map((p: any) => {
      return p;
    }),
  };
}

export function getUserTablesOracleTaskOutputArrayDeserializer(
  result: Array<GetUserTablesOracleTaskOutput>,
): any[] {
  return result.map((item) => {
    return getUserTablesOracleTaskOutputDeserializer(item);
  });
}

/** Output for the task that gets the list of tables contained within a provided list of Oracle schemas. */
export interface GetUserTablesOracleTaskOutput {
  /** The schema this result is for */
  readonly schemaName?: string;
  /** List of valid tables found for this schema */
  readonly tables?: DatabaseTable[];
  /** Validation errors associated with the task */
  readonly validationErrors?: ReportableException[];
}

export function getUserTablesOracleTaskOutputDeserializer(
  item: any,
): GetUserTablesOracleTaskOutput {
  return {
    schemaName: item["schemaName"],
    tables: !item["tables"] ? item["tables"] : databaseTableArrayDeserializer(item["tables"]),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

export function databaseTableArrayDeserializer(result: Array<DatabaseTable>): any[] {
  return result.map((item) => {
    return databaseTableDeserializer(item);
  });
}

/** Table properties */
export interface DatabaseTable {
  /** Indicates whether table is empty or not */
  readonly hasRows?: boolean;
  /** Schema-qualified name of the table */
  readonly name?: string;
}

export function databaseTableDeserializer(item: any): DatabaseTable {
  return {
    hasRows: item["hasRows"],
    name: item["name"],
  };
}

/** Properties for the task that collects user tables for the given list of databases */
export interface GetUserTablesPostgreSqlTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: GetUserTablesPostgreSqlTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: GetUserTablesPostgreSqlTaskOutput[];
  /** Task type. */
  taskType: "GetUserTablesPostgreSql";
}

export function getUserTablesPostgreSqlTaskPropertiesSerializer(
  item: GetUserTablesPostgreSqlTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : getUserTablesPostgreSqlTaskInputSerializer(item["input"]),
  };
}

export function getUserTablesPostgreSqlTaskPropertiesDeserializer(
  item: any,
): GetUserTablesPostgreSqlTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : getUserTablesPostgreSqlTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : getUserTablesPostgreSqlTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that gets the list of tables for a provided list of PostgreSQL databases. */
export interface GetUserTablesPostgreSqlTaskInput {
  /** Information for connecting to PostgreSQL source */
  connectionInfo: PostgreSqlConnectionInfo;
  /** List of PostgreSQL databases for which to collect tables */
  selectedDatabases: string[];
}

export function getUserTablesPostgreSqlTaskInputSerializer(
  item: GetUserTablesPostgreSqlTaskInput,
): any {
  return {
    connectionInfo: postgreSqlConnectionInfoSerializer(item["connectionInfo"]),
    selectedDatabases: item["selectedDatabases"].map((p: any) => {
      return p;
    }),
  };
}

export function getUserTablesPostgreSqlTaskInputDeserializer(
  item: any,
): GetUserTablesPostgreSqlTaskInput {
  return {
    connectionInfo: postgreSqlConnectionInfoDeserializer(item["connectionInfo"]),
    selectedDatabases: item["selectedDatabases"].map((p: any) => {
      return p;
    }),
  };
}

export function getUserTablesPostgreSqlTaskOutputArrayDeserializer(
  result: Array<GetUserTablesPostgreSqlTaskOutput>,
): any[] {
  return result.map((item) => {
    return getUserTablesPostgreSqlTaskOutputDeserializer(item);
  });
}

/** Output for the task that gets the list of tables for a provided list of PostgreSQL databases. */
export interface GetUserTablesPostgreSqlTaskOutput {
  /** The database this result is for */
  readonly databaseName?: string;
  /** List of valid tables found for this database */
  readonly tables?: DatabaseTable[];
  /** Validation errors associated with the task */
  readonly validationErrors?: ReportableException[];
}

export function getUserTablesPostgreSqlTaskOutputDeserializer(
  item: any,
): GetUserTablesPostgreSqlTaskOutput {
  return {
    databaseName: item["databaseName"],
    tables: !item["tables"] ? item["tables"] : databaseTableArrayDeserializer(item["tables"]),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that collects user tables for the given list of databases */
export interface GetUserTablesMySqlTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: GetUserTablesMySqlTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: GetUserTablesMySqlTaskOutput[];
  /** Task type. */
  taskType: "GetUserTablesMySql";
}

export function getUserTablesMySqlTaskPropertiesSerializer(
  item: GetUserTablesMySqlTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : getUserTablesMySqlTaskInputSerializer(item["input"]),
  };
}

export function getUserTablesMySqlTaskPropertiesDeserializer(
  item: any,
): GetUserTablesMySqlTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"] ? item["input"] : getUserTablesMySqlTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : getUserTablesMySqlTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that collects user tables for the given list of databases */
export interface GetUserTablesMySqlTaskInput {
  /** Connection information for SQL Server */
  connectionInfo: MySqlConnectionInfo;
  /** List of database names to collect tables for */
  selectedDatabases: string[];
}

export function getUserTablesMySqlTaskInputSerializer(item: GetUserTablesMySqlTaskInput): any {
  return {
    connectionInfo: mySqlConnectionInfoSerializer(item["connectionInfo"]),
    selectedDatabases: item["selectedDatabases"].map((p: any) => {
      return p;
    }),
  };
}

export function getUserTablesMySqlTaskInputDeserializer(item: any): GetUserTablesMySqlTaskInput {
  return {
    connectionInfo: mySqlConnectionInfoDeserializer(item["connectionInfo"]),
    selectedDatabases: item["selectedDatabases"].map((p: any) => {
      return p;
    }),
  };
}

export function getUserTablesMySqlTaskOutputArrayDeserializer(
  result: Array<GetUserTablesMySqlTaskOutput>,
): any[] {
  return result.map((item) => {
    return getUserTablesMySqlTaskOutputDeserializer(item);
  });
}

/** Output of the task that collects user tables for the given list of databases */
export interface GetUserTablesMySqlTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Mapping from database name to list of tables */
  readonly databasesToTables?: string;
  /** Validation errors */
  readonly validationErrors?: ReportableException[];
}

export function getUserTablesMySqlTaskOutputDeserializer(item: any): GetUserTablesMySqlTaskOutput {
  return {
    id: item["id"],
    databasesToTables: item["databasesToTables"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that validates connection to Azure SQL Database Managed Instance */
export interface ConnectToTargetSqlMITaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToTargetSqlMITaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToTargetSqlMITaskOutput[];
  /** Task type. */
  taskType: "ConnectToTarget.AzureSqlDbMI";
}

export function connectToTargetSqlMITaskPropertiesSerializer(
  item: ConnectToTargetSqlMITaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : connectToTargetSqlMITaskInputSerializer(item["input"]),
  };
}

export function connectToTargetSqlMITaskPropertiesDeserializer(
  item: any,
): ConnectToTargetSqlMITaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToTargetSqlMITaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToTargetSqlMITaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that validates connection to Azure SQL Database Managed Instance. */
export interface ConnectToTargetSqlMITaskInput {
  /** Connection information for target SQL Server */
  targetConnectionInfo: SqlConnectionInfo;
  /** Flag for whether to collect logins from target SQL MI server. */
  collectLogins?: boolean;
  /** Flag for whether to collect agent jobs from target SQL MI server. */
  collectAgentJobs?: boolean;
  /** Flag for whether to validate SSIS catalog is reachable on the target SQL MI server. */
  validateSsisCatalogOnly?: boolean;
}

export function connectToTargetSqlMITaskInputSerializer(item: ConnectToTargetSqlMITaskInput): any {
  return {
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    collectLogins: item["collectLogins"],
    collectAgentJobs: item["collectAgentJobs"],
    validateSsisCatalogOnly: item["validateSsisCatalogOnly"],
  };
}

export function connectToTargetSqlMITaskInputDeserializer(
  item: any,
): ConnectToTargetSqlMITaskInput {
  return {
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    collectLogins: item["collectLogins"],
    collectAgentJobs: item["collectAgentJobs"],
    validateSsisCatalogOnly: item["validateSsisCatalogOnly"],
  };
}

export function connectToTargetSqlMITaskOutputArrayDeserializer(
  result: Array<ConnectToTargetSqlMITaskOutput>,
): any[] {
  return result.map((item) => {
    return connectToTargetSqlMITaskOutputDeserializer(item);
  });
}

/** Output for the task that validates connection to Azure SQL Database Managed Instance. */
export interface ConnectToTargetSqlMITaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
  /** List of logins on the target server. */
  readonly logins?: string[];
  /** List of agent jobs on the target server. */
  readonly agentJobs?: string[];
  /** Validation errors */
  readonly validationErrors?: ReportableException[];
}

export function connectToTargetSqlMITaskOutputDeserializer(
  item: any,
): ConnectToTargetSqlMITaskOutput {
  return {
    id: item["id"],
    targetServerVersion: item["targetServerVersion"],
    targetServerBrandVersion: item["targetServerBrandVersion"],
    logins: !item["logins"]
      ? item["logins"]
      : item["logins"].map((p: any) => {
          return p;
        }),
    agentJobs: !item["agentJobs"]
      ? item["agentJobs"]
      : item["agentJobs"].map((p: any) => {
          return p;
        }),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that validates connection to Azure SQL Database Managed Instance */
export interface ConnectToTargetSqlMISyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToTargetSqlMISyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToTargetSqlMISyncTaskOutput[];
  /** Task type. */
  taskType: "ConnectToTarget.AzureSqlDbMI.Sync.LRS";
}

export function connectToTargetSqlMISyncTaskPropertiesSerializer(
  item: ConnectToTargetSqlMISyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : connectToTargetSqlMISyncTaskInputSerializer(item["input"]),
  };
}

export function connectToTargetSqlMISyncTaskPropertiesDeserializer(
  item: any,
): ConnectToTargetSqlMISyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToTargetSqlMISyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToTargetSqlMISyncTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that validates connection to Azure SQL Database Managed Instance online scenario. */
export interface ConnectToTargetSqlMISyncTaskInput {
  /** Connection information for Azure SQL Database Managed Instance */
  targetConnectionInfo: MiSqlConnectionInfo;
  /** Azure Active Directory Application the DMS (classic) instance will use to connect to the target instance of Azure SQL Database Managed Instance and the Azure Storage Account */
  azureApp: AzureActiveDirectoryApp;
}

export function connectToTargetSqlMISyncTaskInputSerializer(
  item: ConnectToTargetSqlMISyncTaskInput,
): any {
  return {
    targetConnectionInfo: miSqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    azureApp: azureActiveDirectoryAppSerializer(item["azureApp"]),
  };
}

export function connectToTargetSqlMISyncTaskInputDeserializer(
  item: any,
): ConnectToTargetSqlMISyncTaskInput {
  return {
    targetConnectionInfo: miSqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    azureApp: azureActiveDirectoryAppDeserializer(item["azureApp"]),
  };
}

/** Properties required to create a connection to Azure SQL database Managed instance */
export interface MiSqlConnectionInfo extends ConnectionInfo {
  /** Resource id for Azure SQL database Managed instance */
  managedInstanceResourceId: string;
  /** Type of connection info */
  type: "MiSqlConnectionInfo";
}

export function miSqlConnectionInfoSerializer(item: MiSqlConnectionInfo): any {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    managedInstanceResourceId: item["managedInstanceResourceId"],
  };
}

export function miSqlConnectionInfoDeserializer(item: any): MiSqlConnectionInfo {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    managedInstanceResourceId: item["managedInstanceResourceId"],
  };
}

/** Azure Active Directory Application */
export interface AzureActiveDirectoryApp {
  /** Application ID of the Azure Active Directory Application */
  applicationId?: string;
  /** Key used to authenticate to the Azure Active Directory Application */
  appKey?: string;
  /** Tenant id of the customer */
  tenantId?: string;
  /** Ignore checking azure permissions on the AAD app */
  ignoreAzurePermissions?: boolean;
}

export function azureActiveDirectoryAppSerializer(item: AzureActiveDirectoryApp): any {
  return {
    applicationId: item["applicationId"],
    appKey: item["appKey"],
    tenantId: item["tenantId"],
    ignoreAzurePermissions: item["ignoreAzurePermissions"],
  };
}

export function azureActiveDirectoryAppDeserializer(item: any): AzureActiveDirectoryApp {
  return {
    applicationId: item["applicationId"],
    appKey: item["appKey"],
    tenantId: item["tenantId"],
    ignoreAzurePermissions: item["ignoreAzurePermissions"],
  };
}

export function connectToTargetSqlMISyncTaskOutputArrayDeserializer(
  result: Array<ConnectToTargetSqlMISyncTaskOutput>,
): any[] {
  return result.map((item) => {
    return connectToTargetSqlMISyncTaskOutputDeserializer(item);
  });
}

/** Output for the task that validates connection to Azure SQL Database Managed Instance. */
export interface ConnectToTargetSqlMISyncTaskOutput {
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
  /** Validation errors */
  readonly validationErrors?: ReportableException[];
}

export function connectToTargetSqlMISyncTaskOutputDeserializer(
  item: any,
): ConnectToTargetSqlMISyncTaskOutput {
  return {
    targetServerVersion: item["targetServerVersion"],
    targetServerBrandVersion: item["targetServerBrandVersion"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that validates connection to Azure Database for MySQL and target server requirements */
export interface ConnectToTargetAzureDbForMySqlTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ConnectToTargetAzureDbForMySqlTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ConnectToTargetAzureDbForMySqlTaskOutput[];
  /** Task type. */
  taskType: "ConnectToTarget.AzureDbForMySql";
}

export function connectToTargetAzureDbForMySqlTaskPropertiesSerializer(
  item: ConnectToTargetAzureDbForMySqlTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : connectToTargetAzureDbForMySqlTaskInputSerializer(item["input"]),
  };
}

export function connectToTargetAzureDbForMySqlTaskPropertiesDeserializer(
  item: any,
): ConnectToTargetAzureDbForMySqlTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : connectToTargetAzureDbForMySqlTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : connectToTargetAzureDbForMySqlTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that validates connection to Azure Database for MySQL and target server requirements */
export interface ConnectToTargetAzureDbForMySqlTaskInput {
  /** Connection information for source MySQL server */
  sourceConnectionInfo: MySqlConnectionInfo;
  /** Connection information for target Azure Database for MySQL server */
  targetConnectionInfo: MySqlConnectionInfo;
  /** Flag for whether or not the migration is offline */
  isOfflineMigration?: boolean;
}

export function connectToTargetAzureDbForMySqlTaskInputSerializer(
  item: ConnectToTargetAzureDbForMySqlTaskInput,
): any {
  return {
    sourceConnectionInfo: mySqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: mySqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    isOfflineMigration: item["isOfflineMigration"],
  };
}

export function connectToTargetAzureDbForMySqlTaskInputDeserializer(
  item: any,
): ConnectToTargetAzureDbForMySqlTaskInput {
  return {
    sourceConnectionInfo: mySqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: mySqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    isOfflineMigration: item["isOfflineMigration"],
  };
}

export function connectToTargetAzureDbForMySqlTaskOutputArrayDeserializer(
  result: Array<ConnectToTargetAzureDbForMySqlTaskOutput>,
): any[] {
  return result.map((item) => {
    return connectToTargetAzureDbForMySqlTaskOutputDeserializer(item);
  });
}

/** Output for the task that validates connection to Azure Database for MySQL and target server requirements */
export interface ConnectToTargetAzureDbForMySqlTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Version of the target server */
  readonly serverVersion?: string;
  /** List of databases on target server */
  readonly databases?: string[];
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
  /** Validation errors associated with the task */
  readonly validationErrors?: ReportableException[];
}

export function connectToTargetAzureDbForMySqlTaskOutputDeserializer(
  item: any,
): ConnectToTargetAzureDbForMySqlTaskOutput {
  return {
    id: item["id"],
    serverVersion: item["serverVersion"],
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    targetServerBrandVersion: item["targetServerBrandVersion"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that migrates data between MongoDB data sources */
export interface MigrateMongoDbTaskProperties extends ProjectTaskProperties {
  /** Describes how a MongoDB data migration should be performed */
  input?: MongoDbMigrationSettings;
  readonly output?: MongoDbProgressUnion[];
  /** Task type. */
  taskType: "Migrate.MongoDb";
}

export function migrateMongoDbTaskPropertiesSerializer(item: MigrateMongoDbTaskProperties): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : mongoDbMigrationSettingsSerializer(item["input"]),
  };
}

export function migrateMongoDbTaskPropertiesDeserializer(item: any): MigrateMongoDbTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"] ? item["input"] : mongoDbMigrationSettingsDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : mongoDbProgressUnionArrayDeserializer(item["output"]),
  };
}

/** Describes how a MongoDB data migration should be performed */
export interface MongoDbMigrationSettings {
  /** The RU limit on a CosmosDB target that collections will be temporarily increased to (if lower) during the initial copy of a migration, from 10,000 to 1,000,000, or 0 to use the default boost (which is generally the maximum), or null to not boost the RUs. This setting has no effect on non-CosmosDB targets. */
  boostRUs?: number;
  /** The databases on the source cluster to migrate to the target. The keys are the names of the databases. */
  databases: Record<string, MongoDbDatabaseSettings>;
  /** Describes how changes will be replicated from the source to the target. The default is OneTime. */
  replication?: MongoDbReplication;
  /** Settings used to connect to the source cluster */
  source: MongoDbConnectionInfo;
  /** Settings used to connect to the target cluster */
  target: MongoDbConnectionInfo;
  /** Settings used to limit the resource usage of the migration */
  throttling?: MongoDbThrottlingSettings;
}

export function mongoDbMigrationSettingsSerializer(item: MongoDbMigrationSettings): any {
  return {
    boostRUs: item["boostRUs"],
    databases: mongoDbDatabaseSettingsRecordSerializer(item["databases"]),
    replication: item["replication"],
    source: mongoDbConnectionInfoSerializer(item["source"]),
    target: mongoDbConnectionInfoSerializer(item["target"]),
    throttling: !item["throttling"]
      ? item["throttling"]
      : mongoDbThrottlingSettingsSerializer(item["throttling"]),
  };
}

export function mongoDbMigrationSettingsDeserializer(item: any): MongoDbMigrationSettings {
  return {
    boostRUs: item["boostRUs"],
    databases: mongoDbDatabaseSettingsRecordDeserializer(item["databases"]),
    replication: item["replication"],
    source: mongoDbConnectionInfoDeserializer(item["source"]),
    target: mongoDbConnectionInfoDeserializer(item["target"]),
    throttling: !item["throttling"]
      ? item["throttling"]
      : mongoDbThrottlingSettingsDeserializer(item["throttling"]),
  };
}

export function mongoDbDatabaseSettingsRecordSerializer(
  item: Record<string, MongoDbDatabaseSettings>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : mongoDbDatabaseSettingsSerializer(item[key]);
  });
  return result;
}

export function mongoDbDatabaseSettingsRecordDeserializer(
  item: Record<string, any>,
): Record<string, MongoDbDatabaseSettings> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : mongoDbDatabaseSettingsDeserializer(item[key]);
  });
  return result;
}

/** Describes how an individual MongoDB database should be migrated */
export interface MongoDbDatabaseSettings {
  /** The collections on the source database to migrate to the target. The keys are the unqualified names of the collections. */
  collections: Record<string, MongoDbCollectionSettings>;
  /** The RUs that should be configured on a CosmosDB target, or null to use the default, or 0 if throughput should not be provisioned for the database. This has no effect on non-CosmosDB targets. */
  targetRUs?: number;
}

export function mongoDbDatabaseSettingsSerializer(item: MongoDbDatabaseSettings): any {
  return {
    collections: mongoDbCollectionSettingsRecordSerializer(item["collections"]),
    targetRUs: item["targetRUs"],
  };
}

export function mongoDbDatabaseSettingsDeserializer(item: any): MongoDbDatabaseSettings {
  return {
    collections: mongoDbCollectionSettingsRecordDeserializer(item["collections"]),
    targetRUs: item["targetRUs"],
  };
}

export function mongoDbCollectionSettingsRecordSerializer(
  item: Record<string, MongoDbCollectionSettings>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : mongoDbCollectionSettingsSerializer(item[key]);
  });
  return result;
}

export function mongoDbCollectionSettingsRecordDeserializer(
  item: Record<string, any>,
): Record<string, MongoDbCollectionSettings> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : mongoDbCollectionSettingsDeserializer(item[key]);
  });
  return result;
}

/** Describes how an individual MongoDB collection should be migrated */
export interface MongoDbCollectionSettings {
  /** Whether the migrator is allowed to drop the target collection in the course of performing a migration. The default is true. */
  canDelete?: boolean;
  /** Describes a MongoDB shard key */
  shardKey?: MongoDbShardKeySetting;
  /** The RUs that should be configured on a CosmosDB target, or null to use the default. This has no effect on non-CosmosDB targets. */
  targetRUs?: number;
}

export function mongoDbCollectionSettingsSerializer(item: MongoDbCollectionSettings): any {
  return {
    canDelete: item["canDelete"],
    shardKey: !item["shardKey"]
      ? item["shardKey"]
      : mongoDbShardKeySettingSerializer(item["shardKey"]),
    targetRUs: item["targetRUs"],
  };
}

export function mongoDbCollectionSettingsDeserializer(item: any): MongoDbCollectionSettings {
  return {
    canDelete: item["canDelete"],
    shardKey: !item["shardKey"]
      ? item["shardKey"]
      : mongoDbShardKeySettingDeserializer(item["shardKey"]),
    targetRUs: item["targetRUs"],
  };
}

/** Describes a MongoDB shard key */
export interface MongoDbShardKeySetting {
  /** The fields within the shard key */
  fields: MongoDbShardKeyField[];
  /** Whether the shard key is unique */
  isUnique?: boolean;
}

export function mongoDbShardKeySettingSerializer(item: MongoDbShardKeySetting): any {
  return {
    fields: mongoDbShardKeyFieldArraySerializer(item["fields"]),
    isUnique: item["isUnique"],
  };
}

export function mongoDbShardKeySettingDeserializer(item: any): MongoDbShardKeySetting {
  return {
    fields: mongoDbShardKeyFieldArrayDeserializer(item["fields"]),
    isUnique: item["isUnique"],
  };
}

/** Describes how changes will be replicated from the source to the target. The default is OneTime. */
export enum KnownMongoDbReplication {
  /** Disabled */
  Disabled = "Disabled",
  /** OneTime */
  OneTime = "OneTime",
  /** Continuous */
  Continuous = "Continuous",
}

/**
 * Describes how changes will be replicated from the source to the target. The default is OneTime. \
 * {@link KnownMongoDbReplication} can be used interchangeably with MongoDbReplication,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **OneTime**: OneTime \
 * **Continuous**: Continuous
 */
export type MongoDbReplication = string;

/** Specifies resource limits for the migration */
export interface MongoDbThrottlingSettings {
  /** The percentage of CPU time that the migrator will try to avoid using, from 0 to 100 */
  minFreeCpu?: number;
  /** The number of megabytes of RAM that the migrator will try to avoid using */
  minFreeMemoryMb?: number;
  /** The maximum number of work items (e.g. collection copies) that will be processed in parallel */
  maxParallelism?: number;
}

export function mongoDbThrottlingSettingsSerializer(item: MongoDbThrottlingSettings): any {
  return {
    minFreeCpu: item["minFreeCpu"],
    minFreeMemoryMb: item["minFreeMemoryMb"],
    maxParallelism: item["maxParallelism"],
  };
}

export function mongoDbThrottlingSettingsDeserializer(item: any): MongoDbThrottlingSettings {
  return {
    minFreeCpu: item["minFreeCpu"],
    minFreeMemoryMb: item["minFreeMemoryMb"],
    maxParallelism: item["maxParallelism"],
  };
}

export function mongoDbProgressUnionArrayDeserializer(result: Array<MongoDbProgressUnion>): any[] {
  return result.map((item) => {
    return mongoDbProgressUnionDeserializer(item);
  });
}

/** Base class for MongoDB migration outputs */
export interface MongoDbProgress {
  /** The number of document bytes copied during the Copying stage */
  bytesCopied: number;
  /** The number of documents copied during the Copying stage */
  documentsCopied: number;
  /** The elapsed time in the format [ddd.]hh:mm:ss[.fffffff] (i.e. TimeSpan format) */
  elapsedTime: string;
  /** The errors and warnings that have occurred for the current object. The keys are the error codes. */
  errors: Record<string, MongoDbError>;
  /** The number of oplog events awaiting replay */
  eventsPending: number;
  /** The number of oplog events replayed so far */
  eventsReplayed: number;
  /** The timestamp of the last oplog event received, or null if no oplog event has been received yet */
  lastEventTime?: Date;
  /** The timestamp of the last oplog event replayed, or null if no oplog event has been replayed yet */
  lastReplayTime?: Date;
  /** The name of the progress object. For a collection, this is the unqualified collection name. For a database, this is the database name. For the overall migration, this is null. */
  name?: string;
  /** The qualified name of the progress object. For a collection, this is the database-qualified name. For a database, this is the database name. For the overall migration, this is null. */
  qualifiedName?: string;
  /** The type of progress object */
  /** The discriminator possible values: Collection, Database, Migration */
  resultType: MongoDbProgressResultType;
  state: MongoDbMigrationState;
  /** The total number of document bytes on the source at the beginning of the Copying stage, or -1 if the total size was unknown */
  totalBytes: number;
  /** The total number of documents on the source at the beginning of the Copying stage, or -1 if the total count was unknown */
  totalDocuments: number;
}

export function mongoDbProgressDeserializer(item: any): MongoDbProgress {
  return {
    bytesCopied: item["bytesCopied"],
    documentsCopied: item["documentsCopied"],
    elapsedTime: item["elapsedTime"],
    errors: mongoDbErrorRecordDeserializer(item["errors"]),
    eventsPending: item["eventsPending"],
    eventsReplayed: item["eventsReplayed"],
    lastEventTime: !item["lastEventTime"] ? item["lastEventTime"] : new Date(item["lastEventTime"]),
    lastReplayTime: !item["lastReplayTime"]
      ? item["lastReplayTime"]
      : new Date(item["lastReplayTime"]),
    name: item["name"],
    qualifiedName: item["qualifiedName"],
    resultType: item["resultType"],
    state: item["state"],
    totalBytes: item["totalBytes"],
    totalDocuments: item["totalDocuments"],
  };
}

/** Alias for MongoDbProgressUnion */
export type MongoDbProgressUnion =
  | MongoDbCollectionProgress
  | MongoDbDatabaseProgress
  | MongoDbMigrationProgress
  | MongoDbProgress;

export function mongoDbProgressUnionDeserializer(item: any): MongoDbProgressUnion {
  switch (item["resultType"]) {
    case "Collection":
      return mongoDbCollectionProgressDeserializer(item as MongoDbCollectionProgress);

    case "Database":
      return mongoDbDatabaseProgressDeserializer(item as MongoDbDatabaseProgress);

    case "Migration":
      return mongoDbMigrationProgressDeserializer(item as MongoDbMigrationProgress);

    default:
      return mongoDbProgressDeserializer(item);
  }
}

export function mongoDbErrorRecordDeserializer(
  item: Record<string, any>,
): Record<string, MongoDbError> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : mongoDbErrorDeserializer(item[key]);
  });
  return result;
}

/** Describes an error or warning that occurred during a MongoDB migration */
export interface MongoDbError {
  /** The non-localized, machine-readable code that describes the error or warning */
  code?: string;
  /** The number of times the error or warning has occurred */
  count?: number;
  /** The localized, human-readable message that describes the error or warning */
  message?: string;
  /** The type of error or warning */
  type?: MongoDbErrorType;
}

export function mongoDbErrorDeserializer(item: any): MongoDbError {
  return {
    code: item["code"],
    count: item["count"],
    message: item["message"],
    type: item["type"],
  };
}

/** The type of error or warning */
export enum KnownMongoDbErrorType {
  /** Error */
  Error = "Error",
  /** ValidationError */
  ValidationError = "ValidationError",
  /** Warning */
  Warning = "Warning",
}

/**
 * The type of error or warning \
 * {@link KnownMongoDbErrorType} can be used interchangeably with MongoDbErrorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error**: Error \
 * **ValidationError**: ValidationError \
 * **Warning**: Warning
 */
export type MongoDbErrorType = string;

/** The type of progress object */
export enum KnownMongoDbProgressResultType {
  /** Migration */
  Migration = "Migration",
  /** Database */
  Database = "Database",
  /** Collection */
  Collection = "Collection",
}

/**
 * The type of progress object \
 * {@link KnownMongoDbProgressResultType} can be used interchangeably with MongoDbProgressResultType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Migration**: Migration \
 * **Database**: Database \
 * **Collection**: Collection
 */
export type MongoDbProgressResultType = string;

/** Known values of {@link MongoDbMigrationState} that the service accepts. */
export enum KnownMongoDbMigrationState {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** ValidatingInput */
  ValidatingInput = "ValidatingInput",
  /** Initializing */
  Initializing = "Initializing",
  /** Restarting */
  Restarting = "Restarting",
  /** Copying */
  Copying = "Copying",
  /** InitialReplay */
  InitialReplay = "InitialReplay",
  /** Replaying */
  Replaying = "Replaying",
  /** Finalizing */
  Finalizing = "Finalizing",
  /** Complete */
  Complete = "Complete",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/** Type of MongoDbMigrationState */
export type MongoDbMigrationState = string;

/** Describes the progress of a collection */
export interface MongoDbCollectionProgress extends MongoDbProgress {
  /** The type of progress object */
  resultType: "Collection";
}

export function mongoDbCollectionProgressDeserializer(item: any): MongoDbCollectionProgress {
  return {
    bytesCopied: item["bytesCopied"],
    documentsCopied: item["documentsCopied"],
    elapsedTime: item["elapsedTime"],
    errors: mongoDbErrorRecordDeserializer(item["errors"]),
    eventsPending: item["eventsPending"],
    eventsReplayed: item["eventsReplayed"],
    lastEventTime: !item["lastEventTime"] ? item["lastEventTime"] : new Date(item["lastEventTime"]),
    lastReplayTime: !item["lastReplayTime"]
      ? item["lastReplayTime"]
      : new Date(item["lastReplayTime"]),
    name: item["name"],
    qualifiedName: item["qualifiedName"],
    resultType: item["resultType"],
    state: item["state"],
    totalBytes: item["totalBytes"],
    totalDocuments: item["totalDocuments"],
  };
}

/** Describes the progress of a database */
export interface MongoDbDatabaseProgress extends MongoDbProgress {
  /** The progress of the collections in the database. The keys are the unqualified names of the collections */
  collections?: Record<string, MongoDbCollectionProgress>;
  /** The type of progress object */
  resultType: "Database";
}

export function mongoDbDatabaseProgressDeserializer(item: any): MongoDbDatabaseProgress {
  return {
    bytesCopied: item["bytesCopied"],
    documentsCopied: item["documentsCopied"],
    elapsedTime: item["elapsedTime"],
    errors: mongoDbErrorRecordDeserializer(item["errors"]),
    eventsPending: item["eventsPending"],
    eventsReplayed: item["eventsReplayed"],
    lastEventTime: !item["lastEventTime"] ? item["lastEventTime"] : new Date(item["lastEventTime"]),
    lastReplayTime: !item["lastReplayTime"]
      ? item["lastReplayTime"]
      : new Date(item["lastReplayTime"]),
    name: item["name"],
    qualifiedName: item["qualifiedName"],
    resultType: item["resultType"],
    state: item["state"],
    totalBytes: item["totalBytes"],
    totalDocuments: item["totalDocuments"],
    collections: !item["collections"]
      ? item["collections"]
      : mongoDbCollectionProgressRecordDeserializer(item["collections"]),
  };
}

export function mongoDbCollectionProgressRecordDeserializer(
  item: Record<string, any>,
): Record<string, MongoDbCollectionProgress> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : mongoDbCollectionProgressDeserializer(item[key]);
  });
  return result;
}

/** Describes the progress of the overall migration */
export interface MongoDbMigrationProgress extends MongoDbProgress {
  /** The progress of the databases in the migration. The keys are the names of the databases */
  databases?: Record<string, MongoDbDatabaseProgress>;
  /** The type of progress object */
  resultType: "Migration";
}

export function mongoDbMigrationProgressDeserializer(item: any): MongoDbMigrationProgress {
  return {
    bytesCopied: item["bytesCopied"],
    documentsCopied: item["documentsCopied"],
    elapsedTime: item["elapsedTime"],
    errors: mongoDbErrorRecordDeserializer(item["errors"]),
    eventsPending: item["eventsPending"],
    eventsReplayed: item["eventsReplayed"],
    lastEventTime: !item["lastEventTime"] ? item["lastEventTime"] : new Date(item["lastEventTime"]),
    lastReplayTime: !item["lastReplayTime"]
      ? item["lastReplayTime"]
      : new Date(item["lastReplayTime"]),
    name: item["name"],
    qualifiedName: item["qualifiedName"],
    resultType: item["resultType"],
    state: item["state"],
    totalBytes: item["totalBytes"],
    totalDocuments: item["totalDocuments"],
    databases: !item["databases"]
      ? item["databases"]
      : mongoDbDatabaseProgressRecordDeserializer(item["databases"]),
  };
}

export function mongoDbDatabaseProgressRecordDeserializer(
  item: Record<string, any>,
): Record<string, MongoDbDatabaseProgress> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : mongoDbDatabaseProgressDeserializer(item[key]);
  });
  return result;
}

/** Properties for task that migrates SQL Server databases to Azure SQL Database Managed Instance */
export interface MigrateSqlServerSqlMITaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: MigrateSqlServerSqlMITaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: MigrateSqlServerSqlMITaskOutputUnion[];
  /** task id */
  taskId?: string;
  /** DateTime in UTC when the task was created */
  createdOn?: string;
  /** parent task id */
  parentTaskId?: string;
  /** whether the task can be cloned or not */
  isCloneable?: boolean;
  /** Task type. */
  taskType: "Migrate.SqlServer.AzureSqlDbMI";
}

export function migrateSqlServerSqlMITaskPropertiesSerializer(
  item: MigrateSqlServerSqlMITaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : migrateSqlServerSqlMITaskInputSerializer(item["input"]),
    taskId: item["taskId"],
    createdOn: item["createdOn"],
    parentTaskId: item["parentTaskId"],
    isCloneable: item["isCloneable"],
  };
}

export function migrateSqlServerSqlMITaskPropertiesDeserializer(
  item: any,
): MigrateSqlServerSqlMITaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : migrateSqlServerSqlMITaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migrateSqlServerSqlMITaskOutputUnionArrayDeserializer(item["output"]),
    taskId: item["taskId"],
    createdOn: item["createdOn"],
    parentTaskId: item["parentTaskId"],
    isCloneable: item["isCloneable"],
  };
}

/** Input for task that migrates SQL Server databases to Azure SQL Database Managed Instance. */
export interface MigrateSqlServerSqlMITaskInput extends SqlMigrationTaskInput {
  /** Databases to migrate */
  selectedDatabases: MigrateSqlServerSqlMIDatabaseInput[];
  /** Date and time relative to UTC when the migration was started on */
  startedOn?: string;
  /** Logins to migrate. */
  selectedLogins?: string[];
  /** Agent Jobs to migrate. */
  selectedAgentJobs?: string[];
  /** Backup file share information for all selected databases. */
  backupFileShare?: FileShare;
  /** SAS URI of Azure Storage Account Container to be used for storing backup files. */
  backupBlobShare: BlobShare;
  /** Backup Mode to specify whether to use existing backup or create new backup. If using existing backups, backup file paths are required to be provided in selectedDatabases. */
  backupMode?: BackupMode;
  /** Azure Active Directory domain name in the format of 'contoso.com' for federated Azure AD or 'contoso.onmicrosoft.com' for managed domain, required if and only if Windows logins are selected */
  aadDomainName?: string;
  /** encrypted key for secure fields */
  encryptedKeyForSecureFields?: string;
}

export function migrateSqlServerSqlMITaskInputSerializer(
  item: MigrateSqlServerSqlMITaskInput,
): any {
  return {
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSqlServerSqlMIDatabaseInputArraySerializer(item["selectedDatabases"]),
    startedOn: item["startedOn"],
    selectedLogins: !item["selectedLogins"]
      ? item["selectedLogins"]
      : item["selectedLogins"].map((p: any) => {
          return p;
        }),
    selectedAgentJobs: !item["selectedAgentJobs"]
      ? item["selectedAgentJobs"]
      : item["selectedAgentJobs"].map((p: any) => {
          return p;
        }),
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareSerializer(item["backupFileShare"]),
    backupBlobShare: blobShareSerializer(item["backupBlobShare"]),
    backupMode: item["backupMode"],
    aadDomainName: item["aadDomainName"],
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
  };
}

export function migrateSqlServerSqlMITaskInputDeserializer(
  item: any,
): MigrateSqlServerSqlMITaskInput {
  return {
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSqlServerSqlMIDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
    startedOn: item["startedOn"],
    selectedLogins: !item["selectedLogins"]
      ? item["selectedLogins"]
      : item["selectedLogins"].map((p: any) => {
          return p;
        }),
    selectedAgentJobs: !item["selectedAgentJobs"]
      ? item["selectedAgentJobs"]
      : item["selectedAgentJobs"].map((p: any) => {
          return p;
        }),
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareDeserializer(item["backupFileShare"]),
    backupBlobShare: blobShareDeserializer(item["backupBlobShare"]),
    backupMode: item["backupMode"],
    aadDomainName: item["aadDomainName"],
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
  };
}

export function migrateSqlServerSqlMIDatabaseInputArraySerializer(
  result: Array<MigrateSqlServerSqlMIDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateSqlServerSqlMIDatabaseInputSerializer(item);
  });
}

export function migrateSqlServerSqlMIDatabaseInputArrayDeserializer(
  result: Array<MigrateSqlServerSqlMIDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateSqlServerSqlMIDatabaseInputDeserializer(item);
  });
}

/** Database specific information for SQL to Azure SQL DB Managed Instance migration task inputs */
export interface MigrateSqlServerSqlMIDatabaseInput {
  /** Name of the database */
  name: string;
  /** Name of the database at destination */
  restoreDatabaseName: string;
  /** Backup file share information for backing up this database. */
  backupFileShare?: FileShare;
  /** The list of backup files to be used in case of existing backups. */
  backupFilePaths?: string[];
  /** id of the database */
  id?: string;
}

export function migrateSqlServerSqlMIDatabaseInputSerializer(
  item: MigrateSqlServerSqlMIDatabaseInput,
): any {
  return {
    name: item["name"],
    restoreDatabaseName: item["restoreDatabaseName"],
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareSerializer(item["backupFileShare"]),
    backupFilePaths: !item["backupFilePaths"]
      ? item["backupFilePaths"]
      : item["backupFilePaths"].map((p: any) => {
          return p;
        }),
    id: item["id"],
  };
}

export function migrateSqlServerSqlMIDatabaseInputDeserializer(
  item: any,
): MigrateSqlServerSqlMIDatabaseInput {
  return {
    name: item["name"],
    restoreDatabaseName: item["restoreDatabaseName"],
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareDeserializer(item["backupFileShare"]),
    backupFilePaths: !item["backupFilePaths"]
      ? item["backupFilePaths"]
      : item["backupFilePaths"].map((p: any) => {
          return p;
        }),
    id: item["id"],
  };
}

/** Blob container storage information. */
export interface BlobShare {
  /** SAS URI of Azure Storage Account Container. */
  sasUri?: string;
}

export function blobShareSerializer(item: BlobShare): any {
  return { sasUri: item["sasUri"] };
}

export function blobShareDeserializer(item: any): BlobShare {
  return {
    sasUri: item["sasUri"],
  };
}

/** An enumeration of backup modes */
export enum KnownBackupMode {
  /** CreateBackup */
  CreateBackup = "CreateBackup",
  /** ExistingBackup */
  ExistingBackup = "ExistingBackup",
}

/**
 * An enumeration of backup modes \
 * {@link KnownBackupMode} can be used interchangeably with BackupMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CreateBackup**: CreateBackup \
 * **ExistingBackup**: ExistingBackup
 */
export type BackupMode = string;

export function migrateSqlServerSqlMITaskOutputUnionArrayDeserializer(
  result: Array<MigrateSqlServerSqlMITaskOutputUnion>,
): any[] {
  return result.map((item) => {
    return migrateSqlServerSqlMITaskOutputUnionDeserializer(item);
  });
}

/** Output for task that migrates SQL Server databases to Azure SQL Database Managed Instance. */
export interface MigrateSqlServerSqlMITaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Result type */
  /** The discriminator possible values: MigrationLevelOutput, DatabaseLevelOutput, AgentJobLevelOutput, LoginLevelOutput, ErrorOutput */
  resultType: string;
}

export function migrateSqlServerSqlMITaskOutputDeserializer(
  item: any,
): MigrateSqlServerSqlMITaskOutput {
  return {
    id: item["id"],
    resultType: item["resultType"],
  };
}

/** Alias for MigrateSqlServerSqlMITaskOutputUnion */
export type MigrateSqlServerSqlMITaskOutputUnion =
  | MigrateSqlServerSqlMITaskOutputMigrationLevel
  | MigrateSqlServerSqlMITaskOutputDatabaseLevel
  | MigrateSqlServerSqlMITaskOutputAgentJobLevel
  | MigrateSqlServerSqlMITaskOutputLoginLevel
  | MigrateSqlServerSqlMITaskOutputError
  | MigrateSqlServerSqlMITaskOutput;

export function migrateSqlServerSqlMITaskOutputUnionDeserializer(
  item: any,
): MigrateSqlServerSqlMITaskOutputUnion {
  switch (item["resultType"]) {
    case "MigrationLevelOutput":
      return migrateSqlServerSqlMITaskOutputMigrationLevelDeserializer(
        item as MigrateSqlServerSqlMITaskOutputMigrationLevel,
      );

    case "DatabaseLevelOutput":
      return migrateSqlServerSqlMITaskOutputDatabaseLevelDeserializer(
        item as MigrateSqlServerSqlMITaskOutputDatabaseLevel,
      );

    case "AgentJobLevelOutput":
      return migrateSqlServerSqlMITaskOutputAgentJobLevelDeserializer(
        item as MigrateSqlServerSqlMITaskOutputAgentJobLevel,
      );

    case "LoginLevelOutput":
      return migrateSqlServerSqlMITaskOutputLoginLevelDeserializer(
        item as MigrateSqlServerSqlMITaskOutputLoginLevel,
      );

    case "ErrorOutput":
      return migrateSqlServerSqlMITaskOutputErrorDeserializer(
        item as MigrateSqlServerSqlMITaskOutputError,
      );

    default:
      return migrateSqlServerSqlMITaskOutputDeserializer(item);
  }
}

/** model interface MigrateSqlServerSqlMITaskOutputMigrationLevel */
export interface MigrateSqlServerSqlMITaskOutputMigrationLevel extends MigrateSqlServerSqlMITaskOutput {
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Current status of migration */
  readonly status?: MigrationStatus;
  /** Current state of migration */
  readonly state?: MigrationState;
  /** Selected agent jobs as a map from name to id */
  readonly agentJobs?: string;
  /** Selected logins as a map from name to id */
  readonly logins?: string;
  /** Migration progress message */
  readonly message?: string;
  /** Map of server role migration results. */
  readonly serverRoleResults?: string;
  /** List of orphaned users. */
  readonly orphanedUsersInfo?: OrphanedUserInfo[];
  /** Selected databases as a map from database name to database id */
  readonly databases?: string;
  /** Source server version */
  readonly sourceServerVersion?: string;
  /** Source server brand version */
  readonly sourceServerBrandVersion?: string;
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
  /** Migration exceptions and warnings. */
  readonly exceptionsAndWarnings?: ReportableException[];
  /** Result type */
  resultType: "MigrationLevelOutput";
}

export function migrateSqlServerSqlMITaskOutputMigrationLevelDeserializer(
  item: any,
): MigrateSqlServerSqlMITaskOutputMigrationLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    status: item["status"],
    state: item["state"],
    agentJobs: item["agentJobs"],
    logins: item["logins"],
    message: item["message"],
    serverRoleResults: item["serverRoleResults"],
    orphanedUsersInfo: !item["orphanedUsersInfo"]
      ? item["orphanedUsersInfo"]
      : orphanedUserInfoArrayDeserializer(item["orphanedUsersInfo"]),
    databases: item["databases"],
    sourceServerVersion: item["sourceServerVersion"],
    sourceServerBrandVersion: item["sourceServerBrandVersion"],
    targetServerVersion: item["targetServerVersion"],
    targetServerBrandVersion: item["targetServerBrandVersion"],
    exceptionsAndWarnings: !item["exceptionsAndWarnings"]
      ? item["exceptionsAndWarnings"]
      : reportableExceptionArrayDeserializer(item["exceptionsAndWarnings"]),
  };
}

/** Current status of migration */
export enum KnownMigrationStatus {
  /** Default */
  Default = "Default",
  /** Connecting */
  Connecting = "Connecting",
  /** SourceAndTargetSelected */
  SourceAndTargetSelected = "SourceAndTargetSelected",
  /** SelectLogins */
  SelectLogins = "SelectLogins",
  /** Configured */
  Configured = "Configured",
  /** Running */
  Running = "Running",
  /** Error */
  Error = "Error",
  /** Stopped */
  Stopped = "Stopped",
  /** Completed */
  Completed = "Completed",
  /** CompletedWithWarnings */
  CompletedWithWarnings = "CompletedWithWarnings",
}

/**
 * Current status of migration \
 * {@link KnownMigrationStatus} can be used interchangeably with MigrationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default \
 * **Connecting**: Connecting \
 * **SourceAndTargetSelected**: SourceAndTargetSelected \
 * **SelectLogins**: SelectLogins \
 * **Configured**: Configured \
 * **Running**: Running \
 * **Error**: Error \
 * **Stopped**: Stopped \
 * **Completed**: Completed \
 * **CompletedWithWarnings**: CompletedWithWarnings
 */
export type MigrationStatus = string;

export function orphanedUserInfoArrayDeserializer(result: Array<OrphanedUserInfo>): any[] {
  return result.map((item) => {
    return orphanedUserInfoDeserializer(item);
  });
}

/** Information of orphaned users on the SQL server database. */
export interface OrphanedUserInfo {
  /** Name of the orphaned user */
  name?: string;
  /** Parent database of the user */
  databaseName?: string;
}

export function orphanedUserInfoDeserializer(item: any): OrphanedUserInfo {
  return {
    name: item["name"],
    databaseName: item["databaseName"],
  };
}

/** model interface MigrateSqlServerSqlMITaskOutputDatabaseLevel */
export interface MigrateSqlServerSqlMITaskOutputDatabaseLevel extends MigrateSqlServerSqlMITaskOutput {
  /** Name of the database */
  readonly databaseName?: string;
  /** Size of the database in megabytes */
  readonly sizeMB?: number;
  /** Current state of migration */
  readonly state?: MigrationState;
  /** Current stage of migration */
  readonly stage?: DatabaseMigrationStage;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Migration progress message */
  readonly message?: string;
  /** Migration exceptions and warnings */
  readonly exceptionsAndWarnings?: ReportableException[];
  /** Result type */
  resultType: "DatabaseLevelOutput";
}

export function migrateSqlServerSqlMITaskOutputDatabaseLevelDeserializer(
  item: any,
): MigrateSqlServerSqlMITaskOutputDatabaseLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    databaseName: item["databaseName"],
    sizeMB: item["sizeMB"],
    state: item["state"],
    stage: item["stage"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    message: item["message"],
    exceptionsAndWarnings: !item["exceptionsAndWarnings"]
      ? item["exceptionsAndWarnings"]
      : reportableExceptionArrayDeserializer(item["exceptionsAndWarnings"]),
  };
}

/** Current stage of migration */
export enum KnownDatabaseMigrationStage {
  /** None */
  None = "None",
  /** Initialize */
  Initialize = "Initialize",
  /** Backup */
  Backup = "Backup",
  /** FileCopy */
  FileCopy = "FileCopy",
  /** Restore */
  Restore = "Restore",
  /** Completed */
  Completed = "Completed",
}

/**
 * Current stage of migration \
 * {@link KnownDatabaseMigrationStage} can be used interchangeably with DatabaseMigrationStage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Initialize**: Initialize \
 * **Backup**: Backup \
 * **FileCopy**: FileCopy \
 * **Restore**: Restore \
 * **Completed**: Completed
 */
export type DatabaseMigrationStage = string;

/** model interface MigrateSqlServerSqlMITaskOutputAgentJobLevel */
export interface MigrateSqlServerSqlMITaskOutputAgentJobLevel extends MigrateSqlServerSqlMITaskOutput {
  /** Agent Job name. */
  readonly name?: string;
  /** The state of the original Agent Job. */
  readonly isEnabled?: boolean;
  /** Current state of migration */
  readonly state?: MigrationState;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Migration progress message */
  readonly message?: string;
  /** Migration errors and warnings per job */
  readonly exceptionsAndWarnings?: ReportableException[];
  /** Result type */
  resultType: "AgentJobLevelOutput";
}

export function migrateSqlServerSqlMITaskOutputAgentJobLevelDeserializer(
  item: any,
): MigrateSqlServerSqlMITaskOutputAgentJobLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    name: item["name"],
    isEnabled: item["isEnabled"],
    state: item["state"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    message: item["message"],
    exceptionsAndWarnings: !item["exceptionsAndWarnings"]
      ? item["exceptionsAndWarnings"]
      : reportableExceptionArrayDeserializer(item["exceptionsAndWarnings"]),
  };
}

/** model interface MigrateSqlServerSqlMITaskOutputLoginLevel */
export interface MigrateSqlServerSqlMITaskOutputLoginLevel extends MigrateSqlServerSqlMITaskOutput {
  /** Login name. */
  readonly loginName?: string;
  /** Current state of login */
  readonly state?: MigrationState;
  /** Current stage of login */
  readonly stage?: LoginMigrationStage;
  /** Login migration start time */
  readonly startedOn?: Date;
  /** Login migration end time */
  readonly endedOn?: Date;
  /** Login migration progress message */
  readonly message?: string;
  /** Login migration errors and warnings per login */
  readonly exceptionsAndWarnings?: ReportableException[];
  /** Result type */
  resultType: "LoginLevelOutput";
}

export function migrateSqlServerSqlMITaskOutputLoginLevelDeserializer(
  item: any,
): MigrateSqlServerSqlMITaskOutputLoginLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    loginName: item["loginName"],
    state: item["state"],
    stage: item["stage"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    message: item["message"],
    exceptionsAndWarnings: !item["exceptionsAndWarnings"]
      ? item["exceptionsAndWarnings"]
      : reportableExceptionArrayDeserializer(item["exceptionsAndWarnings"]),
  };
}

/** Enum of the different stage of login migration. */
export enum KnownLoginMigrationStage {
  /** None */
  None = "None",
  /** Initialize */
  Initialize = "Initialize",
  /** LoginMigration */
  LoginMigration = "LoginMigration",
  /** EstablishUserMapping */
  EstablishUserMapping = "EstablishUserMapping",
  /** AssignRoleMembership */
  AssignRoleMembership = "AssignRoleMembership",
  /** AssignRoleOwnership */
  AssignRoleOwnership = "AssignRoleOwnership",
  /** EstablishServerPermissions */
  EstablishServerPermissions = "EstablishServerPermissions",
  /** EstablishObjectPermissions */
  EstablishObjectPermissions = "EstablishObjectPermissions",
  /** Completed */
  Completed = "Completed",
}

/**
 * Enum of the different stage of login migration. \
 * {@link KnownLoginMigrationStage} can be used interchangeably with LoginMigrationStage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Initialize**: Initialize \
 * **LoginMigration**: LoginMigration \
 * **EstablishUserMapping**: EstablishUserMapping \
 * **AssignRoleMembership**: AssignRoleMembership \
 * **AssignRoleOwnership**: AssignRoleOwnership \
 * **EstablishServerPermissions**: EstablishServerPermissions \
 * **EstablishObjectPermissions**: EstablishObjectPermissions \
 * **Completed**: Completed
 */
export type LoginMigrationStage = string;

/** model interface MigrateSqlServerSqlMITaskOutputError */
export interface MigrateSqlServerSqlMITaskOutputError extends MigrateSqlServerSqlMITaskOutput {
  /** Migration error */
  readonly error?: ReportableException;
  /** Result type */
  resultType: "ErrorOutput";
}

export function migrateSqlServerSqlMITaskOutputErrorDeserializer(
  item: any,
): MigrateSqlServerSqlMITaskOutputError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    error: !item["error"] ? item["error"] : reportableExceptionDeserializer(item["error"]),
  };
}

/** Properties for task that migrates SQL Server databases to Azure SQL Database Managed Instance sync scenario */
export interface MigrateSqlServerSqlMISyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: MigrateSqlServerSqlMISyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: MigrateSqlServerSqlMISyncTaskOutputUnion[];
  /** DateTime in UTC when the task was created */
  createdOn?: string;
  /** Task type. */
  taskType: "Migrate.SqlServer.AzureSqlDbMI.Sync.LRS";
}

export function migrateSqlServerSqlMISyncTaskPropertiesSerializer(
  item: MigrateSqlServerSqlMISyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : migrateSqlServerSqlMISyncTaskInputSerializer(item["input"]),
    createdOn: item["createdOn"],
  };
}

export function migrateSqlServerSqlMISyncTaskPropertiesDeserializer(
  item: any,
): MigrateSqlServerSqlMISyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : migrateSqlServerSqlMISyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migrateSqlServerSqlMISyncTaskOutputUnionArrayDeserializer(item["output"]),
    createdOn: item["createdOn"],
  };
}

/** Input for task that migrates SQL Server databases to Azure SQL Database Managed Instance online scenario. */
export interface MigrateSqlServerSqlMISyncTaskInput extends SqlServerSqlMISyncTaskInput {
  /** Number of database migrations to start in parallel */
  numberOfParallelDatabaseMigrations?: number;
}

export function migrateSqlServerSqlMISyncTaskInputSerializer(
  item: MigrateSqlServerSqlMISyncTaskInput,
): any {
  return {
    selectedDatabases: migrateSqlServerSqlMIDatabaseInputArraySerializer(item["selectedDatabases"]),
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareSerializer(item["backupFileShare"]),
    storageResourceId: item["storageResourceId"],
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: miSqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    azureApp: azureActiveDirectoryAppSerializer(item["azureApp"]),
    numberOfParallelDatabaseMigrations: item["numberOfParallelDatabaseMigrations"],
  };
}

export function migrateSqlServerSqlMISyncTaskInputDeserializer(
  item: any,
): MigrateSqlServerSqlMISyncTaskInput {
  return {
    selectedDatabases: migrateSqlServerSqlMIDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareDeserializer(item["backupFileShare"]),
    storageResourceId: item["storageResourceId"],
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: miSqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    azureApp: azureActiveDirectoryAppDeserializer(item["azureApp"]),
    numberOfParallelDatabaseMigrations: item["numberOfParallelDatabaseMigrations"],
  };
}

export function migrateSqlServerSqlMISyncTaskOutputUnionArrayDeserializer(
  result: Array<MigrateSqlServerSqlMISyncTaskOutputUnion>,
): any[] {
  return result.map((item) => {
    return migrateSqlServerSqlMISyncTaskOutputUnionDeserializer(item);
  });
}

/** Output for task that migrates SQL Server databases to Azure SQL Database Managed Instance using Log Replay Service. */
export interface MigrateSqlServerSqlMISyncTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Result type */
  /** The discriminator possible values: MigrationLevelOutput, DatabaseLevelOutput, ErrorOutput */
  resultType: string;
}

export function migrateSqlServerSqlMISyncTaskOutputDeserializer(
  item: any,
): MigrateSqlServerSqlMISyncTaskOutput {
  return {
    id: item["id"],
    resultType: item["resultType"],
  };
}

/** Alias for MigrateSqlServerSqlMISyncTaskOutputUnion */
export type MigrateSqlServerSqlMISyncTaskOutputUnion =
  | MigrateSqlServerSqlMISyncTaskOutputMigrationLevel
  | MigrateSqlServerSqlMISyncTaskOutputDatabaseLevel
  | MigrateSqlServerSqlMISyncTaskOutputError
  | MigrateSqlServerSqlMISyncTaskOutput;

export function migrateSqlServerSqlMISyncTaskOutputUnionDeserializer(
  item: any,
): MigrateSqlServerSqlMISyncTaskOutputUnion {
  switch (item["resultType"]) {
    case "MigrationLevelOutput":
      return migrateSqlServerSqlMISyncTaskOutputMigrationLevelDeserializer(
        item as MigrateSqlServerSqlMISyncTaskOutputMigrationLevel,
      );

    case "DatabaseLevelOutput":
      return migrateSqlServerSqlMISyncTaskOutputDatabaseLevelDeserializer(
        item as MigrateSqlServerSqlMISyncTaskOutputDatabaseLevel,
      );

    case "ErrorOutput":
      return migrateSqlServerSqlMISyncTaskOutputErrorDeserializer(
        item as MigrateSqlServerSqlMISyncTaskOutputError,
      );

    default:
      return migrateSqlServerSqlMISyncTaskOutputDeserializer(item);
  }
}

/** model interface MigrateSqlServerSqlMISyncTaskOutputMigrationLevel */
export interface MigrateSqlServerSqlMISyncTaskOutputMigrationLevel extends MigrateSqlServerSqlMISyncTaskOutput {
  /** Count of databases */
  readonly databaseCount?: number;
  /** Current state of migration */
  readonly state?: MigrationState;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Source server name */
  readonly sourceServerName?: string;
  /** Source server version */
  readonly sourceServerVersion?: string;
  /** Source server brand version */
  readonly sourceServerBrandVersion?: string;
  /** Target server name */
  readonly targetServerName?: string;
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
  /** Number of database level errors */
  readonly databaseErrorCount?: number;
  /** Result type */
  resultType: "MigrationLevelOutput";
}

export function migrateSqlServerSqlMISyncTaskOutputMigrationLevelDeserializer(
  item: any,
): MigrateSqlServerSqlMISyncTaskOutputMigrationLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    databaseCount: item["databaseCount"],
    state: item["state"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    sourceServerName: item["sourceServerName"],
    sourceServerVersion: item["sourceServerVersion"],
    sourceServerBrandVersion: item["sourceServerBrandVersion"],
    targetServerName: item["targetServerName"],
    targetServerVersion: item["targetServerVersion"],
    targetServerBrandVersion: item["targetServerBrandVersion"],
    databaseErrorCount: item["databaseErrorCount"],
  };
}

/** model interface MigrateSqlServerSqlMISyncTaskOutputDatabaseLevel */
export interface MigrateSqlServerSqlMISyncTaskOutputDatabaseLevel extends MigrateSqlServerSqlMISyncTaskOutput {
  /** Name of the database */
  readonly sourceDatabaseName?: string;
  /** Current state of database */
  readonly migrationState?: DatabaseMigrationState;
  /** Database migration start time */
  readonly startedOn?: Date;
  /** Database migration end time */
  readonly endedOn?: Date;
  /** Details of full backup set */
  readonly fullBackupSetInfo?: BackupSetInfo;
  /** Last applied backup set information */
  readonly lastRestoredBackupSetInfo?: BackupSetInfo;
  /** Backup sets that are currently active (Either being uploaded or getting restored) */
  readonly activeBackupSets?: BackupSetInfo[];
  /** Name of container created in the Azure Storage account where backups are copied to */
  readonly containerName?: string;
  /** prefix string to use for querying errors for this database */
  readonly errorPrefix?: string;
  /** Whether full backup has been applied to the target database or not */
  readonly isFullBackupRestored?: boolean;
  /** Migration exceptions and warnings */
  readonly exceptionsAndWarnings?: ReportableException[];
  /** Result type */
  resultType: "DatabaseLevelOutput";
}

export function migrateSqlServerSqlMISyncTaskOutputDatabaseLevelDeserializer(
  item: any,
): MigrateSqlServerSqlMISyncTaskOutputDatabaseLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    sourceDatabaseName: item["sourceDatabaseName"],
    migrationState: item["migrationState"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    fullBackupSetInfo: !item["fullBackupSetInfo"]
      ? item["fullBackupSetInfo"]
      : backupSetInfoDeserializer(item["fullBackupSetInfo"]),
    lastRestoredBackupSetInfo: !item["lastRestoredBackupSetInfo"]
      ? item["lastRestoredBackupSetInfo"]
      : backupSetInfoDeserializer(item["lastRestoredBackupSetInfo"]),
    activeBackupSets: !item["activeBackupSets"]
      ? item["activeBackupSets"]
      : backupSetInfoArrayDeserializer(item["activeBackupSets"]),
    containerName: item["containerName"],
    errorPrefix: item["errorPrefix"],
    isFullBackupRestored: item["isFullBackupRestored"],
    exceptionsAndWarnings: !item["exceptionsAndWarnings"]
      ? item["exceptionsAndWarnings"]
      : reportableExceptionArrayDeserializer(item["exceptionsAndWarnings"]),
  };
}

/** Database level migration state. */
export enum KnownDatabaseMigrationState {
  /** UNDEFINED */
  Undefined = "UNDEFINED",
  /** INITIAL */
  Initial = "INITIAL",
  /** FULL_BACKUP_UPLOAD_START */
  FullBackupUploadStart = "FULL_BACKUP_UPLOAD_START",
  /** LOG_SHIPPING_START */
  LOGShippingStart = "LOG_SHIPPING_START",
  /** UPLOAD_LOG_FILES_START */
  UploadLOGFilesStart = "UPLOAD_LOG_FILES_START",
  /** CUTOVER_START */
  CutoverStart = "CUTOVER_START",
  /** POST_CUTOVER_COMPLETE */
  PostCutoverComplete = "POST_CUTOVER_COMPLETE",
  /** COMPLETED */
  Completed = "COMPLETED",
  /** CANCELLED */
  Cancelled = "CANCELLED",
  /** FAILED */
  Failed = "FAILED",
}

/**
 * Database level migration state. \
 * {@link KnownDatabaseMigrationState} can be used interchangeably with DatabaseMigrationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UNDEFINED**: UNDEFINED \
 * **INITIAL**: INITIAL \
 * **FULL_BACKUP_UPLOAD_START**: FULL_BACKUP_UPLOAD_START \
 * **LOG_SHIPPING_START**: LOG_SHIPPING_START \
 * **UPLOAD_LOG_FILES_START**: UPLOAD_LOG_FILES_START \
 * **CUTOVER_START**: CUTOVER_START \
 * **POST_CUTOVER_COMPLETE**: POST_CUTOVER_COMPLETE \
 * **COMPLETED**: COMPLETED \
 * **CANCELLED**: CANCELLED \
 * **FAILED**: FAILED
 */
export type DatabaseMigrationState = string;

/** Information of backup set */
export interface BackupSetInfo {
  /** Id for the set of backup files */
  backupSetId?: string;
  /** First log sequence number of the backup file */
  firstLsn?: string;
  /** Last log sequence number of the backup file */
  lastLsn?: string;
  /** Last modified time of the backup file in share location */
  lastModifiedTime?: Date;
  /** Enum of the different backup types */
  backupType?: BackupType;
  /** List of files in the backup set */
  listOfBackupFiles?: BackupFileInfo[];
  /** Name of the database to which the backup set belongs */
  databaseName?: string;
  /** Date and time that the backup operation began */
  backupStartDate?: Date;
  /** Date and time that the backup operation finished */
  backupFinishedDate?: Date;
  /** Whether the backup set is restored or not */
  isBackupRestored?: boolean;
}

export function backupSetInfoDeserializer(item: any): BackupSetInfo {
  return {
    backupSetId: item["backupSetId"],
    firstLsn: item["firstLsn"],
    lastLsn: item["lastLsn"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    backupType: item["backupType"],
    listOfBackupFiles: !item["listOfBackupFiles"]
      ? item["listOfBackupFiles"]
      : backupFileInfoArrayDeserializer(item["listOfBackupFiles"]),
    databaseName: item["databaseName"],
    backupStartDate: !item["backupStartDate"]
      ? item["backupStartDate"]
      : new Date(item["backupStartDate"]),
    backupFinishedDate: !item["backupFinishedDate"]
      ? item["backupFinishedDate"]
      : new Date(item["backupFinishedDate"]),
    isBackupRestored: item["isBackupRestored"],
  };
}

/** Enum of the different backup types. */
export enum KnownBackupType {
  /** Database */
  Database = "Database",
  /** TransactionLog */
  TransactionLog = "TransactionLog",
  /** File */
  File = "File",
  /** DifferentialDatabase */
  DifferentialDatabase = "DifferentialDatabase",
  /** DifferentialFile */
  DifferentialFile = "DifferentialFile",
  /** Partial */
  Partial = "Partial",
  /** DifferentialPartial */
  DifferentialPartial = "DifferentialPartial",
}

/**
 * Enum of the different backup types. \
 * {@link KnownBackupType} can be used interchangeably with BackupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Database**: Database \
 * **TransactionLog**: TransactionLog \
 * **File**: File \
 * **DifferentialDatabase**: DifferentialDatabase \
 * **DifferentialFile**: DifferentialFile \
 * **Partial**: Partial \
 * **DifferentialPartial**: DifferentialPartial
 */
export type BackupType = string;

export function backupFileInfoArrayDeserializer(result: Array<BackupFileInfo>): any[] {
  return result.map((item) => {
    return backupFileInfoDeserializer(item);
  });
}

/** Information of the backup file */
export interface BackupFileInfo {
  /** Location of the backup file in shared folder */
  fileLocation?: string;
  /** Sequence number of the backup file in the backup set */
  familySequenceNumber?: number;
  /** Status of the backup file during migration */
  status?: BackupFileStatus;
}

export function backupFileInfoDeserializer(item: any): BackupFileInfo {
  return {
    fileLocation: item["fileLocation"],
    familySequenceNumber: item["familySequenceNumber"],
    status: item["status"],
  };
}

/** An enumeration of Status of the log backup file. */
export enum KnownBackupFileStatus {
  /** Arrived */
  Arrived = "Arrived",
  /** Queued */
  Queued = "Queued",
  /** Uploading */
  Uploading = "Uploading",
  /** Uploaded */
  Uploaded = "Uploaded",
  /** Restoring */
  Restoring = "Restoring",
  /** Restored */
  Restored = "Restored",
  /** Cancelled */
  Cancelled = "Cancelled",
}

/**
 * An enumeration of Status of the log backup file. \
 * {@link KnownBackupFileStatus} can be used interchangeably with BackupFileStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Arrived**: Arrived \
 * **Queued**: Queued \
 * **Uploading**: Uploading \
 * **Uploaded**: Uploaded \
 * **Restoring**: Restoring \
 * **Restored**: Restored \
 * **Cancelled**: Cancelled
 */
export type BackupFileStatus = string;

export function backupSetInfoArrayDeserializer(result: Array<BackupSetInfo>): any[] {
  return result.map((item) => {
    return backupSetInfoDeserializer(item);
  });
}

/** model interface MigrateSqlServerSqlMISyncTaskOutputError */
export interface MigrateSqlServerSqlMISyncTaskOutputError extends MigrateSqlServerSqlMISyncTaskOutput {
  /** Migration error */
  readonly error?: ReportableException;
  /** Result type */
  resultType: "ErrorOutput";
}

export function migrateSqlServerSqlMISyncTaskOutputErrorDeserializer(
  item: any,
): MigrateSqlServerSqlMISyncTaskOutputError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    error: !item["error"] ? item["error"] : reportableExceptionDeserializer(item["error"]),
  };
}

/** Properties for the task that migrates on-prem SQL Server databases to Azure SQL Database */
export interface MigrateSqlServerSqlDbTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: MigrateSqlServerSqlDbTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: MigrateSqlServerSqlDbTaskOutputUnion[];
  /** task id */
  taskId?: string;
  /** whether the task can be cloned or not */
  isCloneable?: boolean;
  /** DateTime in UTC when the task was created */
  createdOn?: string;
  /** Task type. */
  taskType: "Migrate.SqlServer.SqlDb";
}

export function migrateSqlServerSqlDbTaskPropertiesSerializer(
  item: MigrateSqlServerSqlDbTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : migrateSqlServerSqlDbTaskInputSerializer(item["input"]),
    taskId: item["taskId"],
    isCloneable: item["isCloneable"],
    createdOn: item["createdOn"],
  };
}

export function migrateSqlServerSqlDbTaskPropertiesDeserializer(
  item: any,
): MigrateSqlServerSqlDbTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : migrateSqlServerSqlDbTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migrateSqlServerSqlDbTaskOutputUnionArrayDeserializer(item["output"]),
    taskId: item["taskId"],
    isCloneable: item["isCloneable"],
    createdOn: item["createdOn"],
  };
}

/** Input for the task that migrates on-prem SQL Server databases to Azure SQL Database */
export interface MigrateSqlServerSqlDbTaskInput extends SqlMigrationTaskInput {
  /** Databases to migrate */
  selectedDatabases: MigrateSqlServerSqlDbDatabaseInput[];
  /**
   * Options for enabling various post migration validations. Available options,
   * 1.) Data Integrity Check: Performs a checksum based comparison on source and target tables after the migration to ensure the correctness of the data.
   * 2.) Schema Validation: Performs a thorough schema comparison between the source and target tables and provides a list of differences between the source and target database, 3.) Query Analysis: Executes a set of queries picked up automatically either from the Query Plan Cache or Query Store and execute them and compares the execution time between the source and target database.
   */
  validationOptions?: MigrationValidationOptions;
  /** Date and time relative to UTC when the migration was started on */
  startedOn?: string;
  /** encrypted key for secure fields */
  encryptedKeyForSecureFields?: string;
}

export function migrateSqlServerSqlDbTaskInputSerializer(
  item: MigrateSqlServerSqlDbTaskInput,
): any {
  return {
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSqlServerSqlDbDatabaseInputArraySerializer(item["selectedDatabases"]),
    validationOptions: !item["validationOptions"]
      ? item["validationOptions"]
      : migrationValidationOptionsSerializer(item["validationOptions"]),
    startedOn: item["startedOn"],
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
  };
}

export function migrateSqlServerSqlDbTaskInputDeserializer(
  item: any,
): MigrateSqlServerSqlDbTaskInput {
  return {
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSqlServerSqlDbDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
    validationOptions: !item["validationOptions"]
      ? item["validationOptions"]
      : migrationValidationOptionsDeserializer(item["validationOptions"]),
    startedOn: item["startedOn"],
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
  };
}

export function migrateSqlServerSqlDbDatabaseInputArraySerializer(
  result: Array<MigrateSqlServerSqlDbDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateSqlServerSqlDbDatabaseInputSerializer(item);
  });
}

export function migrateSqlServerSqlDbDatabaseInputArrayDeserializer(
  result: Array<MigrateSqlServerSqlDbDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateSqlServerSqlDbDatabaseInputDeserializer(item);
  });
}

/** Database specific information for SQL to Azure SQL DB migration task inputs */
export interface MigrateSqlServerSqlDbDatabaseInput {
  /** Name of the database */
  name?: string;
  /** Name of target database. Note: Target database will be truncated before starting migration. */
  targetDatabaseName?: string;
  /** Whether to set database read only before migration */
  makeSourceDbReadOnly?: boolean;
  /** Mapping of source to target tables */
  tableMap?: Record<string, string>;
  /** Settings selected for DB schema migration. */
  schemaSetting?: any;
  /** id of the database */
  id?: string;
}

export function migrateSqlServerSqlDbDatabaseInputSerializer(
  item: MigrateSqlServerSqlDbDatabaseInput,
): any {
  return {
    name: item["name"],
    targetDatabaseName: item["targetDatabaseName"],
    makeSourceDbReadOnly: item["makeSourceDbReadOnly"],
    tableMap: item["tableMap"],
    schemaSetting: item["schemaSetting"],
    id: item["id"],
  };
}

export function migrateSqlServerSqlDbDatabaseInputDeserializer(
  item: any,
): MigrateSqlServerSqlDbDatabaseInput {
  return {
    name: item["name"],
    targetDatabaseName: item["targetDatabaseName"],
    makeSourceDbReadOnly: item["makeSourceDbReadOnly"],
    tableMap: !item["tableMap"]
      ? item["tableMap"]
      : Object.fromEntries(Object.entries(item["tableMap"]).map(([k, p]: [string, any]) => [k, p])),
    schemaSetting: item["schemaSetting"],
    id: item["id"],
  };
}

/** Types of validations to run after the migration */
export interface MigrationValidationOptions {
  /** Allows to compare the schema information between source and target. */
  enableSchemaValidation?: boolean;
  /** Allows to perform a checksum based data integrity validation between source and target for the selected database / tables . */
  enableDataIntegrityValidation?: boolean;
  /** Allows to perform a quick and intelligent query analysis by retrieving queries from the source database and executes them in the target. The result will have execution statistics for executions in source and target databases for the extracted queries. */
  enableQueryAnalysisValidation?: boolean;
}

export function migrationValidationOptionsSerializer(item: MigrationValidationOptions): any {
  return {
    enableSchemaValidation: item["enableSchemaValidation"],
    enableDataIntegrityValidation: item["enableDataIntegrityValidation"],
    enableQueryAnalysisValidation: item["enableQueryAnalysisValidation"],
  };
}

export function migrationValidationOptionsDeserializer(item: any): MigrationValidationOptions {
  return {
    enableSchemaValidation: item["enableSchemaValidation"],
    enableDataIntegrityValidation: item["enableDataIntegrityValidation"],
    enableQueryAnalysisValidation: item["enableQueryAnalysisValidation"],
  };
}

export function migrateSqlServerSqlDbTaskOutputUnionArrayDeserializer(
  result: Array<MigrateSqlServerSqlDbTaskOutputUnion>,
): any[] {
  return result.map((item) => {
    return migrateSqlServerSqlDbTaskOutputUnionDeserializer(item);
  });
}

/** Output for the task that migrates on-prem SQL Server databases to Azure SQL Database */
export interface MigrateSqlServerSqlDbTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Result type */
  /** The discriminator possible values: MigrationLevelOutput, DatabaseLevelOutput, TableLevelOutput, ErrorOutput, MigrationValidationOutput, MigrationDatabaseLevelValidationOutput */
  resultType: string;
}

export function migrateSqlServerSqlDbTaskOutputDeserializer(
  item: any,
): MigrateSqlServerSqlDbTaskOutput {
  return {
    id: item["id"],
    resultType: item["resultType"],
  };
}

/** Alias for MigrateSqlServerSqlDbTaskOutputUnion */
export type MigrateSqlServerSqlDbTaskOutputUnion =
  | MigrateSqlServerSqlDbTaskOutputMigrationLevel
  | MigrateSqlServerSqlDbTaskOutputDatabaseLevel
  | MigrateSqlServerSqlDbTaskOutputTableLevel
  | MigrateSqlServerSqlDbTaskOutputError
  | MigrateSqlServerSqlDbTaskOutputValidationResult
  | MigrateSqlServerSqlDbTaskOutputDatabaseLevelValidationResult
  | MigrateSqlServerSqlDbTaskOutput;

export function migrateSqlServerSqlDbTaskOutputUnionDeserializer(
  item: any,
): MigrateSqlServerSqlDbTaskOutputUnion {
  switch (item["resultType"]) {
    case "MigrationLevelOutput":
      return migrateSqlServerSqlDbTaskOutputMigrationLevelDeserializer(
        item as MigrateSqlServerSqlDbTaskOutputMigrationLevel,
      );

    case "DatabaseLevelOutput":
      return migrateSqlServerSqlDbTaskOutputDatabaseLevelDeserializer(
        item as MigrateSqlServerSqlDbTaskOutputDatabaseLevel,
      );

    case "TableLevelOutput":
      return migrateSqlServerSqlDbTaskOutputTableLevelDeserializer(
        item as MigrateSqlServerSqlDbTaskOutputTableLevel,
      );

    case "ErrorOutput":
      return migrateSqlServerSqlDbTaskOutputErrorDeserializer(
        item as MigrateSqlServerSqlDbTaskOutputError,
      );

    case "MigrationValidationOutput":
      return migrateSqlServerSqlDbTaskOutputValidationResultDeserializer(
        item as MigrateSqlServerSqlDbTaskOutputValidationResult,
      );

    case "MigrationDatabaseLevelValidationOutput":
      return migrateSqlServerSqlDbTaskOutputDatabaseLevelValidationResultDeserializer(
        item as MigrateSqlServerSqlDbTaskOutputDatabaseLevelValidationResult,
      );

    default:
      return migrateSqlServerSqlDbTaskOutputDeserializer(item);
  }
}

/** model interface MigrateSqlServerSqlDbTaskOutputMigrationLevel */
export interface MigrateSqlServerSqlDbTaskOutputMigrationLevel extends MigrateSqlServerSqlDbTaskOutput {
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Duration of task execution in seconds. */
  readonly durationInSeconds?: number;
  /** Current status of migration */
  readonly status?: MigrationStatus;
  /** Migration status message */
  readonly statusMessage?: string;
  /** Migration progress message */
  readonly message?: string;
  /** Selected databases as a map from database name to database id */
  readonly databases?: string;
  /** Summary of database results in the migration */
  readonly databaseSummary?: string;
  /** Migration Validation Results */
  migrationValidationResult?: MigrationValidationResult;
  /** Migration Report Result, provides unique url for downloading your migration report. */
  migrationReportResult?: MigrationReportResult;
  /** Source server version */
  readonly sourceServerVersion?: string;
  /** Source server brand version */
  readonly sourceServerBrandVersion?: string;
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
  /** Migration exceptions and warnings. */
  readonly exceptionsAndWarnings?: ReportableException[];
  /** Result type */
  resultType: "MigrationLevelOutput";
}

export function migrateSqlServerSqlDbTaskOutputMigrationLevelDeserializer(
  item: any,
): MigrateSqlServerSqlDbTaskOutputMigrationLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    durationInSeconds: item["durationInSeconds"],
    status: item["status"],
    statusMessage: item["statusMessage"],
    message: item["message"],
    databases: item["databases"],
    databaseSummary: item["databaseSummary"],
    migrationValidationResult: !item["migrationValidationResult"]
      ? item["migrationValidationResult"]
      : migrationValidationResultDeserializer(item["migrationValidationResult"]),
    migrationReportResult: !item["migrationReportResult"]
      ? item["migrationReportResult"]
      : migrationReportResultDeserializer(item["migrationReportResult"]),
    sourceServerVersion: item["sourceServerVersion"],
    sourceServerBrandVersion: item["sourceServerBrandVersion"],
    targetServerVersion: item["targetServerVersion"],
    targetServerBrandVersion: item["targetServerBrandVersion"],
    exceptionsAndWarnings: !item["exceptionsAndWarnings"]
      ? item["exceptionsAndWarnings"]
      : reportableExceptionArrayDeserializer(item["exceptionsAndWarnings"]),
  };
}

/** Migration Validation Result */
export interface MigrationValidationResult {
  /** Migration validation result identifier */
  readonly id?: string;
  /** Migration Identifier */
  readonly migrationId?: string;
  /** Validation summary results for each database */
  summaryResults?: Record<string, MigrationValidationDatabaseSummaryResult>;
  /** Current status of validation at the migration level. Status from the database validation result status will be aggregated here. */
  readonly status?: ValidationStatus;
}

export function migrationValidationResultDeserializer(item: any): MigrationValidationResult {
  return {
    id: item["id"],
    migrationId: item["migrationId"],
    summaryResults: !item["summaryResults"]
      ? item["summaryResults"]
      : migrationValidationDatabaseSummaryResultRecordDeserializer(item["summaryResults"]),
    status: item["status"],
  };
}

export function migrationValidationDatabaseSummaryResultRecordDeserializer(
  item: Record<string, any>,
): Record<string, MigrationValidationDatabaseSummaryResult> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : migrationValidationDatabaseSummaryResultDeserializer(item[key]);
  });
  return result;
}

/** Migration Validation Database level summary result */
export interface MigrationValidationDatabaseSummaryResult {
  /** Result identifier */
  readonly id?: string;
  /** Migration Identifier */
  readonly migrationId?: string;
  /** Name of the source database */
  readonly sourceDatabaseName?: string;
  /** Name of the target database */
  readonly targetDatabaseName?: string;
  /** Validation start time */
  readonly startedOn?: Date;
  /** Validation end time */
  readonly endedOn?: Date;
  /** Current status of validation at the database level */
  readonly status?: ValidationStatus;
}

export function migrationValidationDatabaseSummaryResultDeserializer(
  item: any,
): MigrationValidationDatabaseSummaryResult {
  return {
    id: item["id"],
    migrationId: item["migrationId"],
    sourceDatabaseName: item["sourceDatabaseName"],
    targetDatabaseName: item["targetDatabaseName"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    status: item["status"],
  };
}

/** Current status of the validation */
export enum KnownValidationStatus {
  /** Default */
  Default = "Default",
  /** NotStarted */
  NotStarted = "NotStarted",
  /** Initialized */
  Initialized = "Initialized",
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
  /** CompletedWithIssues */
  CompletedWithIssues = "CompletedWithIssues",
  /** Stopped */
  Stopped = "Stopped",
  /** Failed */
  Failed = "Failed",
}

/**
 * Current status of the validation \
 * {@link KnownValidationStatus} can be used interchangeably with ValidationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default \
 * **NotStarted**: NotStarted \
 * **Initialized**: Initialized \
 * **InProgress**: InProgress \
 * **Completed**: Completed \
 * **CompletedWithIssues**: CompletedWithIssues \
 * **Stopped**: Stopped \
 * **Failed**: Failed
 */
export type ValidationStatus = string;

/** Migration validation report result, contains the url for downloading the generated report. */
export interface MigrationReportResult {
  /** Migration validation result identifier */
  id?: string;
  /** The url of the report. */
  reportUrl?: string;
}

export function migrationReportResultDeserializer(item: any): MigrationReportResult {
  return {
    id: item["id"],
    reportUrl: item["reportUrl"],
  };
}

/** model interface MigrateSqlServerSqlDbTaskOutputDatabaseLevel */
export interface MigrateSqlServerSqlDbTaskOutputDatabaseLevel extends MigrateSqlServerSqlDbTaskOutput {
  /** Name of the item */
  readonly databaseName?: string;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Current state of migration */
  readonly state?: MigrationState;
  /** Migration stage that this database is in */
  readonly stage?: DatabaseMigrationStage;
  /** Status message */
  readonly statusMessage?: string;
  /** Migration progress message */
  readonly message?: string;
  /** Number of objects */
  readonly numberOfObjects?: number;
  /** Number of successfully completed objects */
  readonly numberOfObjectsCompleted?: number;
  /** Number of database/object errors. */
  readonly errorCount?: number;
  /** Wildcard string prefix to use for querying all errors of the item */
  readonly errorPrefix?: string;
  /** Wildcard string prefix to use for querying all sub-tem results of the item */
  readonly resultPrefix?: string;
  /** Migration exceptions and warnings. */
  readonly exceptionsAndWarnings?: ReportableException[];
  /** Summary of object results in the migration */
  readonly objectSummary?: string;
  /** Result type */
  resultType: "DatabaseLevelOutput";
}

export function migrateSqlServerSqlDbTaskOutputDatabaseLevelDeserializer(
  item: any,
): MigrateSqlServerSqlDbTaskOutputDatabaseLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    databaseName: item["databaseName"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    state: item["state"],
    stage: item["stage"],
    statusMessage: item["statusMessage"],
    message: item["message"],
    numberOfObjects: item["numberOfObjects"],
    numberOfObjectsCompleted: item["numberOfObjectsCompleted"],
    errorCount: item["errorCount"],
    errorPrefix: item["errorPrefix"],
    resultPrefix: item["resultPrefix"],
    exceptionsAndWarnings: !item["exceptionsAndWarnings"]
      ? item["exceptionsAndWarnings"]
      : reportableExceptionArrayDeserializer(item["exceptionsAndWarnings"]),
    objectSummary: item["objectSummary"],
  };
}

/** model interface MigrateSqlServerSqlDbTaskOutputTableLevel */
export interface MigrateSqlServerSqlDbTaskOutputTableLevel extends MigrateSqlServerSqlDbTaskOutput {
  /** Name of the item */
  readonly objectName?: string;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Current state of migration */
  readonly state?: MigrationState;
  /** Status message */
  readonly statusMessage?: string;
  /** Number of items */
  readonly itemsCount?: number;
  /** Number of successfully completed items */
  readonly itemsCompletedCount?: number;
  /** Wildcard string prefix to use for querying all errors of the item */
  readonly errorPrefix?: string;
  /** Wildcard string prefix to use for querying all sub-tem results of the item */
  readonly resultPrefix?: string;
  /** Result type */
  resultType: "TableLevelOutput";
}

export function migrateSqlServerSqlDbTaskOutputTableLevelDeserializer(
  item: any,
): MigrateSqlServerSqlDbTaskOutputTableLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    objectName: item["objectName"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    state: item["state"],
    statusMessage: item["statusMessage"],
    itemsCount: item["itemsCount"],
    itemsCompletedCount: item["itemsCompletedCount"],
    errorPrefix: item["errorPrefix"],
    resultPrefix: item["resultPrefix"],
  };
}

/** model interface MigrateSqlServerSqlDbTaskOutputError */
export interface MigrateSqlServerSqlDbTaskOutputError extends MigrateSqlServerSqlDbTaskOutput {
  /** Migration error */
  readonly error?: ReportableException;
  /** Result type */
  resultType: "ErrorOutput";
}

export function migrateSqlServerSqlDbTaskOutputErrorDeserializer(
  item: any,
): MigrateSqlServerSqlDbTaskOutputError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    error: !item["error"] ? item["error"] : reportableExceptionDeserializer(item["error"]),
  };
}

/** model interface MigrateSqlServerSqlDbTaskOutputValidationResult */
export interface MigrateSqlServerSqlDbTaskOutputValidationResult extends MigrateSqlServerSqlDbTaskOutput {
  /** Migration validation result identifier */
  readonly id?: string;
  /** Migration Identifier */
  readonly migrationId?: string;
  /** Validation summary results for each database */
  summaryResults?: Record<string, MigrationValidationDatabaseSummaryResult>;
  /** Current status of validation at the migration level. Status from the database validation result status will be aggregated here. */
  readonly status?: ValidationStatus;
  /** Result type */
  resultType: "MigrationValidationOutput";
}

export function migrateSqlServerSqlDbTaskOutputValidationResultDeserializer(
  item: any,
): MigrateSqlServerSqlDbTaskOutputValidationResult {
  return {
    id: item["id"],
    resultType: item["resultType"],
    migrationId: item["migrationId"],
    summaryResults: !item["summaryResults"]
      ? item["summaryResults"]
      : migrationValidationDatabaseSummaryResultRecordDeserializer(item["summaryResults"]),
    status: item["status"],
  };
}

/** model interface MigrateSqlServerSqlDbTaskOutputDatabaseLevelValidationResult */
export interface MigrateSqlServerSqlDbTaskOutputDatabaseLevelValidationResult extends MigrateSqlServerSqlDbTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Migration Identifier */
  readonly migrationId?: string;
  /** Name of the source database */
  readonly sourceDatabaseName?: string;
  /** Name of the target database */
  readonly targetDatabaseName?: string;
  /** Validation start time */
  readonly startedOn?: Date;
  /** Validation end time */
  readonly endedOn?: Date;
  /** Provides data integrity validation result between the source and target tables that are migrated. */
  readonly dataIntegrityValidationResult?: DataIntegrityValidationResult;
  /** Provides schema comparison result between source and target database */
  readonly schemaValidationResult?: SchemaComparisonValidationResult;
  /** Results of some of the query execution result between source and target database */
  readonly queryAnalysisValidationResult?: QueryAnalysisValidationResult;
  /** Current status of validation at the database level */
  readonly status?: ValidationStatus;
  /** Result type */
  resultType: "MigrationDatabaseLevelValidationOutput";
}

export function migrateSqlServerSqlDbTaskOutputDatabaseLevelValidationResultDeserializer(
  item: any,
): MigrateSqlServerSqlDbTaskOutputDatabaseLevelValidationResult {
  return {
    id: item["id"],
    resultType: item["resultType"],
    migrationId: item["migrationId"],
    sourceDatabaseName: item["sourceDatabaseName"],
    targetDatabaseName: item["targetDatabaseName"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    dataIntegrityValidationResult: !item["dataIntegrityValidationResult"]
      ? item["dataIntegrityValidationResult"]
      : dataIntegrityValidationResultDeserializer(item["dataIntegrityValidationResult"]),
    schemaValidationResult: !item["schemaValidationResult"]
      ? item["schemaValidationResult"]
      : schemaComparisonValidationResultDeserializer(item["schemaValidationResult"]),
    queryAnalysisValidationResult: !item["queryAnalysisValidationResult"]
      ? item["queryAnalysisValidationResult"]
      : queryAnalysisValidationResultDeserializer(item["queryAnalysisValidationResult"]),
    status: item["status"],
  };
}

/** Results for checksum based Data Integrity validation results */
export interface DataIntegrityValidationResult {
  /** List of failed table names of source and target pair */
  failedObjects?: Record<string, string>;
  /** List of errors that happened while performing data integrity validation */
  validationErrors?: ValidationError;
}

export function dataIntegrityValidationResultDeserializer(
  item: any,
): DataIntegrityValidationResult {
  return {
    failedObjects: !item["failedObjects"]
      ? item["failedObjects"]
      : Object.fromEntries(
          Object.entries(item["failedObjects"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : validationErrorDeserializer(item["validationErrors"]),
  };
}

/** Description about the errors happen while performing migration validation */
export interface ValidationError {
  /** Error Text */
  text?: string;
  /** Severity of the error */
  severity?: Severity;
}

export function validationErrorDeserializer(item: any): ValidationError {
  return {
    text: item["text"],
    severity: item["severity"],
  };
}

/** Severity of the validation error */
export enum KnownSeverity {
  /** Message */
  Message = "Message",
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
}

/**
 * Severity of the validation error \
 * {@link KnownSeverity} can be used interchangeably with Severity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Message**: Message \
 * **Warning**: Warning \
 * **Error**: Error
 */
export type Severity = string;

/** Results for schema comparison between the source and target */
export interface SchemaComparisonValidationResult {
  /** List of schema differences between the source and target databases */
  schemaDifferences?: SchemaComparisonValidationResultType;
  /** List of errors that happened while performing schema compare validation */
  validationErrors?: ValidationError;
  /** Count of source database objects */
  sourceDatabaseObjectCount?: Record<string, number>;
  /** Count of target database objects */
  targetDatabaseObjectCount?: Record<string, number>;
}

export function schemaComparisonValidationResultDeserializer(
  item: any,
): SchemaComparisonValidationResult {
  return {
    schemaDifferences: !item["schemaDifferences"]
      ? item["schemaDifferences"]
      : schemaComparisonValidationResultTypeDeserializer(item["schemaDifferences"]),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : validationErrorDeserializer(item["validationErrors"]),
    sourceDatabaseObjectCount: !item["sourceDatabaseObjectCount"]
      ? item["sourceDatabaseObjectCount"]
      : Object.fromEntries(
          Object.entries(item["sourceDatabaseObjectCount"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    targetDatabaseObjectCount: !item["targetDatabaseObjectCount"]
      ? item["targetDatabaseObjectCount"]
      : Object.fromEntries(
          Object.entries(item["targetDatabaseObjectCount"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Description about the errors happen while performing migration validation */
export interface SchemaComparisonValidationResultType {
  /** Name of the object that has the difference */
  objectName?: string;
  /** Type of the object that has the difference. e.g (Table/View/StoredProcedure) */
  objectType?: ObjectType;
  /** Update action type with respect to target */
  updateAction?: UpdateActionType;
}

export function schemaComparisonValidationResultTypeDeserializer(
  item: any,
): SchemaComparisonValidationResultType {
  return {
    objectName: item["objectName"],
    objectType: item["objectType"],
    updateAction: item["updateAction"],
  };
}

/** An enumeration of type of objects */
export enum KnownObjectType {
  /** StoredProcedures */
  StoredProcedures = "StoredProcedures",
  /** Table */
  Table = "Table",
  /** User */
  User = "User",
  /** View */
  View = "View",
  /** Function */
  Function = "Function",
}

/**
 * An enumeration of type of objects \
 * {@link KnownObjectType} can be used interchangeably with ObjectType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StoredProcedures**: StoredProcedures \
 * **Table**: Table \
 * **User**: User \
 * **View**: View \
 * **Function**: Function
 */
export type ObjectType = string;

/** Type of the actual difference for the compared object, while performing schema comparison */
export enum KnownUpdateActionType {
  /** DeletedOnTarget */
  DeletedOnTarget = "DeletedOnTarget",
  /** ChangedOnTarget */
  ChangedOnTarget = "ChangedOnTarget",
  /** AddedOnTarget */
  AddedOnTarget = "AddedOnTarget",
}

/**
 * Type of the actual difference for the compared object, while performing schema comparison \
 * {@link KnownUpdateActionType} can be used interchangeably with UpdateActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DeletedOnTarget**: DeletedOnTarget \
 * **ChangedOnTarget**: ChangedOnTarget \
 * **AddedOnTarget**: AddedOnTarget
 */
export type UpdateActionType = string;

/** Results for query analysis comparison between the source and target */
export interface QueryAnalysisValidationResult {
  /** List of queries executed and it's execution results in source and target */
  queryResults?: QueryExecutionResult;
  /** Errors that are part of the execution */
  validationErrors?: ValidationError;
}

export function queryAnalysisValidationResultDeserializer(
  item: any,
): QueryAnalysisValidationResult {
  return {
    queryResults: !item["queryResults"]
      ? item["queryResults"]
      : queryExecutionResultDeserializer(item["queryResults"]),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : validationErrorDeserializer(item["validationErrors"]),
  };
}

/** Describes query analysis results for execution in source and target */
export interface QueryExecutionResult {
  /** Query text retrieved from the source server */
  queryText?: string;
  /** Total no. of statements in the batch */
  statementsInBatch?: number;
  /** Query analysis result from the source */
  sourceResult?: ExecutionStatistics;
  /** Query analysis result from the target */
  targetResult?: ExecutionStatistics;
}

export function queryExecutionResultDeserializer(item: any): QueryExecutionResult {
  return {
    queryText: item["queryText"],
    statementsInBatch: item["statementsInBatch"],
    sourceResult: !item["sourceResult"]
      ? item["sourceResult"]
      : executionStatisticsDeserializer(item["sourceResult"]),
    targetResult: !item["targetResult"]
      ? item["targetResult"]
      : executionStatisticsDeserializer(item["targetResult"]),
  };
}

/** Description about the errors happen while performing migration validation */
export interface ExecutionStatistics {
  /** No. of query executions */
  executionCount?: number;
  /** CPU Time in millisecond(s) for the query execution */
  cpuTimeMs?: number;
  /** Time taken in millisecond(s) for executing the query */
  elapsedTimeMs?: number;
  /** Dictionary of sql query execution wait types and the respective statistics */
  waitStats?: Record<string, WaitStatistics>;
  /** Indicates whether the query resulted in an error */
  hasErrors?: boolean;
  /** List of sql Errors */
  sqlErrors?: string[];
}

export function executionStatisticsDeserializer(item: any): ExecutionStatistics {
  return {
    executionCount: item["executionCount"],
    cpuTimeMs: item["cpuTimeMs"],
    elapsedTimeMs: item["elapsedTimeMs"],
    waitStats: !item["waitStats"]
      ? item["waitStats"]
      : waitStatisticsRecordDeserializer(item["waitStats"]),
    hasErrors: item["hasErrors"],
    sqlErrors: !item["sqlErrors"]
      ? item["sqlErrors"]
      : item["sqlErrors"].map((p: any) => {
          return p;
        }),
  };
}

export function waitStatisticsRecordDeserializer(
  item: Record<string, any>,
): Record<string, WaitStatistics> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : waitStatisticsDeserializer(item[key]);
  });
  return result;
}

/** Wait statistics gathered during query batch execution */
export interface WaitStatistics {
  /** Type of the Wait */
  waitType?: string;
  /** Total wait time in millisecond(s) */
  waitTimeMs?: number;
  /** Total no. of waits */
  waitCount?: number;
}

export function waitStatisticsDeserializer(item: any): WaitStatistics {
  return {
    waitType: item["waitType"],
    waitTimeMs: item["waitTimeMs"],
    waitCount: item["waitCount"],
  };
}

/** Properties for the task that migrates on-prem SQL Server databases to Azure SQL Database for online migrations */
export interface MigrateSqlServerSqlDbSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: MigrateSqlServerSqlDbSyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: MigrateSqlServerSqlDbSyncTaskOutputUnion[];
  /** Task type. */
  taskType: "Migrate.SqlServer.AzureSqlDb.Sync";
}

export function migrateSqlServerSqlDbSyncTaskPropertiesSerializer(
  item: MigrateSqlServerSqlDbSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : migrateSqlServerSqlDbSyncTaskInputSerializer(item["input"]),
  };
}

export function migrateSqlServerSqlDbSyncTaskPropertiesDeserializer(
  item: any,
): MigrateSqlServerSqlDbSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : migrateSqlServerSqlDbSyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migrateSqlServerSqlDbSyncTaskOutputUnionArrayDeserializer(item["output"]),
  };
}

/** Input for the task that migrates on-prem SQL Server databases to Azure SQL Database for online migrations */
export interface MigrateSqlServerSqlDbSyncTaskInput extends SqlMigrationTaskInput {
  /** Databases to migrate */
  selectedDatabases: MigrateSqlServerSqlDbSyncDatabaseInput[];
  /** Validation options */
  validationOptions?: MigrationValidationOptions;
}

export function migrateSqlServerSqlDbSyncTaskInputSerializer(
  item: MigrateSqlServerSqlDbSyncTaskInput,
): any {
  return {
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSqlServerSqlDbSyncDatabaseInputArraySerializer(
      item["selectedDatabases"],
    ),
    validationOptions: !item["validationOptions"]
      ? item["validationOptions"]
      : migrationValidationOptionsSerializer(item["validationOptions"]),
  };
}

export function migrateSqlServerSqlDbSyncTaskInputDeserializer(
  item: any,
): MigrateSqlServerSqlDbSyncTaskInput {
  return {
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSqlServerSqlDbSyncDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
    validationOptions: !item["validationOptions"]
      ? item["validationOptions"]
      : migrationValidationOptionsDeserializer(item["validationOptions"]),
  };
}

export function migrateSqlServerSqlDbSyncDatabaseInputArraySerializer(
  result: Array<MigrateSqlServerSqlDbSyncDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateSqlServerSqlDbSyncDatabaseInputSerializer(item);
  });
}

export function migrateSqlServerSqlDbSyncDatabaseInputArrayDeserializer(
  result: Array<MigrateSqlServerSqlDbSyncDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateSqlServerSqlDbSyncDatabaseInputDeserializer(item);
  });
}

/** Database specific information for SQL to Azure SQL DB sync migration task inputs */
export interface MigrateSqlServerSqlDbSyncDatabaseInput {
  /** Unique identifier for database */
  id?: string;
  /** Name of database */
  name?: string;
  /** Target database name */
  targetDatabaseName?: string;
  /** Schema name to be migrated */
  schemaName?: string;
  /** Mapping of source to target tables */
  tableMap?: Record<string, string>;
  /** Migration settings which tune the migration behavior */
  migrationSetting?: Record<string, string>;
  /** Source settings to tune source endpoint migration behavior */
  sourceSetting?: Record<string, string>;
  /** Target settings to tune target endpoint migration behavior */
  targetSetting?: Record<string, string>;
}

export function migrateSqlServerSqlDbSyncDatabaseInputSerializer(
  item: MigrateSqlServerSqlDbSyncDatabaseInput,
): any {
  return {
    id: item["id"],
    name: item["name"],
    targetDatabaseName: item["targetDatabaseName"],
    schemaName: item["schemaName"],
    tableMap: item["tableMap"],
    migrationSetting: item["migrationSetting"],
    sourceSetting: item["sourceSetting"],
    targetSetting: item["targetSetting"],
  };
}

export function migrateSqlServerSqlDbSyncDatabaseInputDeserializer(
  item: any,
): MigrateSqlServerSqlDbSyncDatabaseInput {
  return {
    id: item["id"],
    name: item["name"],
    targetDatabaseName: item["targetDatabaseName"],
    schemaName: item["schemaName"],
    tableMap: !item["tableMap"]
      ? item["tableMap"]
      : Object.fromEntries(Object.entries(item["tableMap"]).map(([k, p]: [string, any]) => [k, p])),
    migrationSetting: !item["migrationSetting"]
      ? item["migrationSetting"]
      : Object.fromEntries(
          Object.entries(item["migrationSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    sourceSetting: !item["sourceSetting"]
      ? item["sourceSetting"]
      : Object.fromEntries(
          Object.entries(item["sourceSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    targetSetting: !item["targetSetting"]
      ? item["targetSetting"]
      : Object.fromEntries(
          Object.entries(item["targetSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function migrateSqlServerSqlDbSyncTaskOutputUnionArrayDeserializer(
  result: Array<MigrateSqlServerSqlDbSyncTaskOutputUnion>,
): any[] {
  return result.map((item) => {
    return migrateSqlServerSqlDbSyncTaskOutputUnionDeserializer(item);
  });
}

/** Output for the task that migrates on-prem SQL Server databases to Azure SQL Database for online migrations */
export interface MigrateSqlServerSqlDbSyncTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Result type */
  /** The discriminator possible values: MigrationLevelOutput, DatabaseLevelOutput, TableLevelOutput, ErrorOutput, DatabaseLevelErrorOutput */
  resultType: string;
}

export function migrateSqlServerSqlDbSyncTaskOutputDeserializer(
  item: any,
): MigrateSqlServerSqlDbSyncTaskOutput {
  return {
    id: item["id"],
    resultType: item["resultType"],
  };
}

/** Alias for MigrateSqlServerSqlDbSyncTaskOutputUnion */
export type MigrateSqlServerSqlDbSyncTaskOutputUnion =
  | MigrateSqlServerSqlDbSyncTaskOutputMigrationLevel
  | MigrateSqlServerSqlDbSyncTaskOutputDatabaseLevel
  | MigrateSqlServerSqlDbSyncTaskOutputTableLevel
  | MigrateSqlServerSqlDbSyncTaskOutputError
  | MigrateSqlServerSqlDbSyncTaskOutputDatabaseError
  | MigrateSqlServerSqlDbSyncTaskOutput;

export function migrateSqlServerSqlDbSyncTaskOutputUnionDeserializer(
  item: any,
): MigrateSqlServerSqlDbSyncTaskOutputUnion {
  switch (item["resultType"]) {
    case "MigrationLevelOutput":
      return migrateSqlServerSqlDbSyncTaskOutputMigrationLevelDeserializer(
        item as MigrateSqlServerSqlDbSyncTaskOutputMigrationLevel,
      );

    case "DatabaseLevelOutput":
      return migrateSqlServerSqlDbSyncTaskOutputDatabaseLevelDeserializer(
        item as MigrateSqlServerSqlDbSyncTaskOutputDatabaseLevel,
      );

    case "TableLevelOutput":
      return migrateSqlServerSqlDbSyncTaskOutputTableLevelDeserializer(
        item as MigrateSqlServerSqlDbSyncTaskOutputTableLevel,
      );

    case "ErrorOutput":
      return migrateSqlServerSqlDbSyncTaskOutputErrorDeserializer(
        item as MigrateSqlServerSqlDbSyncTaskOutputError,
      );

    case "DatabaseLevelErrorOutput":
      return migrateSqlServerSqlDbSyncTaskOutputDatabaseErrorDeserializer(
        item as MigrateSqlServerSqlDbSyncTaskOutputDatabaseError,
      );

    default:
      return migrateSqlServerSqlDbSyncTaskOutputDeserializer(item);
  }
}

/** model interface MigrateSqlServerSqlDbSyncTaskOutputMigrationLevel */
export interface MigrateSqlServerSqlDbSyncTaskOutputMigrationLevel extends MigrateSqlServerSqlDbSyncTaskOutput {
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Source server version */
  readonly sourceServerVersion?: string;
  /** Source server name */
  readonly sourceServer?: string;
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server name */
  readonly targetServer?: string;
  /** Count of databases */
  readonly databaseCount?: number;
  /** Result type */
  resultType: "MigrationLevelOutput";
}

export function migrateSqlServerSqlDbSyncTaskOutputMigrationLevelDeserializer(
  item: any,
): MigrateSqlServerSqlDbSyncTaskOutputMigrationLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    sourceServerVersion: item["sourceServerVersion"],
    sourceServer: item["sourceServer"],
    targetServerVersion: item["targetServerVersion"],
    targetServer: item["targetServer"],
    databaseCount: item["databaseCount"],
  };
}

/** model interface MigrateSqlServerSqlDbSyncTaskOutputDatabaseLevel */
export interface MigrateSqlServerSqlDbSyncTaskOutputDatabaseLevel extends MigrateSqlServerSqlDbSyncTaskOutput {
  /** Name of the database */
  readonly databaseName?: string;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Migration state that this database is in */
  readonly migrationState?: SyncDatabaseMigrationReportingState;
  /** Number of incoming changes */
  readonly incomingChanges?: number;
  /** Number of applied changes */
  readonly appliedChanges?: number;
  /** Number of cdc inserts */
  readonly cdcInsertCounter?: number;
  /** Number of cdc deletes */
  readonly cdcDeleteCounter?: number;
  /** Number of cdc updates */
  readonly cdcUpdateCounter?: number;
  /** Number of tables completed in full load */
  readonly fullLoadCompletedTables?: number;
  /** Number of tables loading in full load */
  readonly fullLoadLoadingTables?: number;
  /** Number of tables queued in full load */
  readonly fullLoadQueuedTables?: number;
  /** Number of tables errored in full load */
  readonly fullLoadErroredTables?: number;
  /** Indicates if initial load (full load) has been completed */
  readonly initializationCompleted?: boolean;
  /** CDC apply latency */
  readonly latency?: number;
  /** Result type */
  resultType: "DatabaseLevelOutput";
}

export function migrateSqlServerSqlDbSyncTaskOutputDatabaseLevelDeserializer(
  item: any,
): MigrateSqlServerSqlDbSyncTaskOutputDatabaseLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    databaseName: item["databaseName"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    migrationState: item["migrationState"],
    incomingChanges: item["incomingChanges"],
    appliedChanges: item["appliedChanges"],
    cdcInsertCounter: item["cdcInsertCounter"],
    cdcDeleteCounter: item["cdcDeleteCounter"],
    cdcUpdateCounter: item["cdcUpdateCounter"],
    fullLoadCompletedTables: item["fullLoadCompletedTables"],
    fullLoadLoadingTables: item["fullLoadLoadingTables"],
    fullLoadQueuedTables: item["fullLoadQueuedTables"],
    fullLoadErroredTables: item["fullLoadErroredTables"],
    initializationCompleted: item["initializationCompleted"],
    latency: item["latency"],
  };
}

/** Enum of the different state of database level online migration. */
export enum KnownSyncDatabaseMigrationReportingState {
  /** UNDEFINED */
  Undefined = "UNDEFINED",
  /** CONFIGURING */
  Configuring = "CONFIGURING",
  /** INITIALIAZING */
  Initialiazing = "INITIALIAZING",
  /** STARTING */
  Starting = "STARTING",
  /** RUNNING */
  Running = "RUNNING",
  /** READY_TO_COMPLETE */
  ReadyTOComplete = "READY_TO_COMPLETE",
  /** COMPLETING */
  Completing = "COMPLETING",
  /** COMPLETE */
  Complete = "COMPLETE",
  /** CANCELLING */
  Cancelling = "CANCELLING",
  /** CANCELLED */
  Cancelled = "CANCELLED",
  /** FAILED */
  Failed = "FAILED",
  /** VALIDATING */
  Validating = "VALIDATING",
  /** VALIDATION_COMPLETE */
  ValidationComplete = "VALIDATION_COMPLETE",
  /** VALIDATION_FAILED */
  ValidationFailed = "VALIDATION_FAILED",
  /** RESTORE_IN_PROGRESS */
  RestoreINProgress = "RESTORE_IN_PROGRESS",
  /** RESTORE_COMPLETED */
  RestoreCompleted = "RESTORE_COMPLETED",
  /** BACKUP_IN_PROGRESS */
  BackupINProgress = "BACKUP_IN_PROGRESS",
  /** BACKUP_COMPLETED */
  BackupCompleted = "BACKUP_COMPLETED",
}

/**
 * Enum of the different state of database level online migration. \
 * {@link KnownSyncDatabaseMigrationReportingState} can be used interchangeably with SyncDatabaseMigrationReportingState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UNDEFINED**: UNDEFINED \
 * **CONFIGURING**: CONFIGURING \
 * **INITIALIAZING**: INITIALIAZING \
 * **STARTING**: STARTING \
 * **RUNNING**: RUNNING \
 * **READY_TO_COMPLETE**: READY_TO_COMPLETE \
 * **COMPLETING**: COMPLETING \
 * **COMPLETE**: COMPLETE \
 * **CANCELLING**: CANCELLING \
 * **CANCELLED**: CANCELLED \
 * **FAILED**: FAILED \
 * **VALIDATING**: VALIDATING \
 * **VALIDATION_COMPLETE**: VALIDATION_COMPLETE \
 * **VALIDATION_FAILED**: VALIDATION_FAILED \
 * **RESTORE_IN_PROGRESS**: RESTORE_IN_PROGRESS \
 * **RESTORE_COMPLETED**: RESTORE_COMPLETED \
 * **BACKUP_IN_PROGRESS**: BACKUP_IN_PROGRESS \
 * **BACKUP_COMPLETED**: BACKUP_COMPLETED
 */
export type SyncDatabaseMigrationReportingState = string;

/** model interface MigrateSqlServerSqlDbSyncTaskOutputTableLevel */
export interface MigrateSqlServerSqlDbSyncTaskOutputTableLevel extends MigrateSqlServerSqlDbSyncTaskOutput {
  /** Name of the table */
  readonly tableName?: string;
  /** Name of the database */
  readonly databaseName?: string;
  /** Number of applied inserts */
  readonly cdcInsertCounter?: number;
  /** Number of applied updates */
  readonly cdcUpdateCounter?: number;
  /** Number of applied deletes */
  readonly cdcDeleteCounter?: number;
  /** Estimate to finish full load */
  readonly fullLoadEstFinishTime?: Date;
  /** Full load start time */
  readonly fullLoadStartedOn?: Date;
  /** Full load end time */
  readonly fullLoadEndedOn?: Date;
  /** Number of rows applied in full load */
  readonly fullLoadTotalRows?: number;
  /** Current state of the table migration */
  readonly state?: SyncTableMigrationState;
  /** Total number of applied changes */
  readonly totalChangesApplied?: number;
  /** Number of data errors occurred */
  readonly dataErrorsCounter?: number;
  /** Last modified time on target */
  readonly lastModifiedTime?: Date;
  /** Result type */
  resultType: "TableLevelOutput";
}

export function migrateSqlServerSqlDbSyncTaskOutputTableLevelDeserializer(
  item: any,
): MigrateSqlServerSqlDbSyncTaskOutputTableLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    tableName: item["tableName"],
    databaseName: item["databaseName"],
    cdcInsertCounter: item["cdcInsertCounter"],
    cdcUpdateCounter: item["cdcUpdateCounter"],
    cdcDeleteCounter: item["cdcDeleteCounter"],
    fullLoadEstFinishTime: !item["fullLoadEstFinishTime"]
      ? item["fullLoadEstFinishTime"]
      : new Date(item["fullLoadEstFinishTime"]),
    fullLoadStartedOn: !item["fullLoadStartedOn"]
      ? item["fullLoadStartedOn"]
      : new Date(item["fullLoadStartedOn"]),
    fullLoadEndedOn: !item["fullLoadEndedOn"]
      ? item["fullLoadEndedOn"]
      : new Date(item["fullLoadEndedOn"]),
    fullLoadTotalRows: item["fullLoadTotalRows"],
    state: item["state"],
    totalChangesApplied: item["totalChangesApplied"],
    dataErrorsCounter: item["dataErrorsCounter"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
  };
}

/** Enum of the different state of table level online migration. */
export enum KnownSyncTableMigrationState {
  /** BEFORE_LOAD */
  BeforeLoad = "BEFORE_LOAD",
  /** FULL_LOAD */
  FullLoad = "FULL_LOAD",
  /** COMPLETED */
  Completed = "COMPLETED",
  /** CANCELED */
  Canceled = "CANCELED",
  /** ERROR */
  Error = "ERROR",
  /** FAILED */
  Failed = "FAILED",
}

/**
 * Enum of the different state of table level online migration. \
 * {@link KnownSyncTableMigrationState} can be used interchangeably with SyncTableMigrationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BEFORE_LOAD**: BEFORE_LOAD \
 * **FULL_LOAD**: FULL_LOAD \
 * **COMPLETED**: COMPLETED \
 * **CANCELED**: CANCELED \
 * **ERROR**: ERROR \
 * **FAILED**: FAILED
 */
export type SyncTableMigrationState = string;

/** model interface MigrateSqlServerSqlDbSyncTaskOutputError */
export interface MigrateSqlServerSqlDbSyncTaskOutputError extends MigrateSqlServerSqlDbSyncTaskOutput {
  /** Migration error */
  readonly error?: ReportableException;
  /** Result type */
  resultType: "ErrorOutput";
}

export function migrateSqlServerSqlDbSyncTaskOutputErrorDeserializer(
  item: any,
): MigrateSqlServerSqlDbSyncTaskOutputError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    error: !item["error"] ? item["error"] : reportableExceptionDeserializer(item["error"]),
  };
}

/** model interface MigrateSqlServerSqlDbSyncTaskOutputDatabaseError */
export interface MigrateSqlServerSqlDbSyncTaskOutputDatabaseError extends MigrateSqlServerSqlDbSyncTaskOutput {
  /** Error message */
  errorMessage?: string;
  /** List of error events. */
  events?: SyncMigrationDatabaseErrorEvent[];
  /** Result type */
  resultType: "DatabaseLevelErrorOutput";
}

export function migrateSqlServerSqlDbSyncTaskOutputDatabaseErrorDeserializer(
  item: any,
): MigrateSqlServerSqlDbSyncTaskOutputDatabaseError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    errorMessage: item["errorMessage"],
    events: !item["events"]
      ? item["events"]
      : syncMigrationDatabaseErrorEventArrayDeserializer(item["events"]),
  };
}

export function syncMigrationDatabaseErrorEventArrayDeserializer(
  result: Array<SyncMigrationDatabaseErrorEvent>,
): any[] {
  return result.map((item) => {
    return syncMigrationDatabaseErrorEventDeserializer(item);
  });
}

/** Database migration errors for online migration */
export interface SyncMigrationDatabaseErrorEvent {
  /** String value of timestamp. */
  readonly timestampString?: string;
  /** Event type. */
  readonly eventTypeString?: string;
  /** Event text. */
  readonly eventText?: string;
}

export function syncMigrationDatabaseErrorEventDeserializer(
  item: any,
): SyncMigrationDatabaseErrorEvent {
  return {
    timestampString: item["timestampString"],
    eventTypeString: item["eventTypeString"],
    eventText: item["eventText"],
  };
}

/** Properties for the task that migrates MySQL databases to Azure Database for MySQL for online migrations */
export interface MigrateMySqlAzureDbForMySqlSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: MigrateMySqlAzureDbForMySqlSyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: MigrateMySqlAzureDbForMySqlSyncTaskOutputUnion[];
  /** Task type. */
  taskType: "Migrate.MySql.AzureDbForMySql.Sync";
}

export function migrateMySqlAzureDbForMySqlSyncTaskPropertiesSerializer(
  item: MigrateMySqlAzureDbForMySqlSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : migrateMySqlAzureDbForMySqlSyncTaskInputSerializer(item["input"]),
  };
}

export function migrateMySqlAzureDbForMySqlSyncTaskPropertiesDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : migrateMySqlAzureDbForMySqlSyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migrateMySqlAzureDbForMySqlSyncTaskOutputUnionArrayDeserializer(item["output"]),
  };
}

/** Input for the task that migrates MySQL databases to Azure Database for MySQL for online migrations */
export interface MigrateMySqlAzureDbForMySqlSyncTaskInput {
  /** Connection information for source MySQL */
  sourceConnectionInfo: MySqlConnectionInfo;
  /** Connection information for target Azure Database for MySQL */
  targetConnectionInfo: MySqlConnectionInfo;
  /** Databases to migrate */
  selectedDatabases: MigrateMySqlAzureDbForMySqlSyncDatabaseInput[];
}

export function migrateMySqlAzureDbForMySqlSyncTaskInputSerializer(
  item: MigrateMySqlAzureDbForMySqlSyncTaskInput,
): any {
  return {
    sourceConnectionInfo: mySqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: mySqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateMySqlAzureDbForMySqlSyncDatabaseInputArraySerializer(
      item["selectedDatabases"],
    ),
  };
}

export function migrateMySqlAzureDbForMySqlSyncTaskInputDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlSyncTaskInput {
  return {
    sourceConnectionInfo: mySqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: mySqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateMySqlAzureDbForMySqlSyncDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
  };
}

export function migrateMySqlAzureDbForMySqlSyncDatabaseInputArraySerializer(
  result: Array<MigrateMySqlAzureDbForMySqlSyncDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateMySqlAzureDbForMySqlSyncDatabaseInputSerializer(item);
  });
}

export function migrateMySqlAzureDbForMySqlSyncDatabaseInputArrayDeserializer(
  result: Array<MigrateMySqlAzureDbForMySqlSyncDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateMySqlAzureDbForMySqlSyncDatabaseInputDeserializer(item);
  });
}

/** Database specific information for MySQL to Azure Database for MySQL migration task inputs */
export interface MigrateMySqlAzureDbForMySqlSyncDatabaseInput {
  /** Name of the database */
  name?: string;
  /** Name of target database. Note: Target database will be truncated before starting migration. */
  targetDatabaseName?: string;
  /** Migration settings which tune the migration behavior */
  migrationSetting?: Record<string, string>;
  /** Source settings to tune source endpoint migration behavior */
  sourceSetting?: Record<string, string>;
  /** Target settings to tune target endpoint migration behavior */
  targetSetting?: Record<string, string>;
  /** Mapping of source to target tables */
  tableMap?: Record<string, string>;
}

export function migrateMySqlAzureDbForMySqlSyncDatabaseInputSerializer(
  item: MigrateMySqlAzureDbForMySqlSyncDatabaseInput,
): any {
  return {
    name: item["name"],
    targetDatabaseName: item["targetDatabaseName"],
    migrationSetting: item["migrationSetting"],
    sourceSetting: item["sourceSetting"],
    targetSetting: item["targetSetting"],
    tableMap: item["tableMap"],
  };
}

export function migrateMySqlAzureDbForMySqlSyncDatabaseInputDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlSyncDatabaseInput {
  return {
    name: item["name"],
    targetDatabaseName: item["targetDatabaseName"],
    migrationSetting: !item["migrationSetting"]
      ? item["migrationSetting"]
      : Object.fromEntries(
          Object.entries(item["migrationSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    sourceSetting: !item["sourceSetting"]
      ? item["sourceSetting"]
      : Object.fromEntries(
          Object.entries(item["sourceSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    targetSetting: !item["targetSetting"]
      ? item["targetSetting"]
      : Object.fromEntries(
          Object.entries(item["targetSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    tableMap: !item["tableMap"]
      ? item["tableMap"]
      : Object.fromEntries(Object.entries(item["tableMap"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function migrateMySqlAzureDbForMySqlSyncTaskOutputUnionArrayDeserializer(
  result: Array<MigrateMySqlAzureDbForMySqlSyncTaskOutputUnion>,
): any[] {
  return result.map((item) => {
    return migrateMySqlAzureDbForMySqlSyncTaskOutputUnionDeserializer(item);
  });
}

/** Output for the task that migrates MySQL databases to Azure Database for MySQL for online migrations */
export interface MigrateMySqlAzureDbForMySqlSyncTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Result type */
  /** The discriminator possible values: MigrationLevelOutput, DatabaseLevelOutput, TableLevelOutput, ErrorOutput, DatabaseLevelErrorOutput */
  resultType: string;
}

export function migrateMySqlAzureDbForMySqlSyncTaskOutputDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlSyncTaskOutput {
  return {
    id: item["id"],
    resultType: item["resultType"],
  };
}

/** Alias for MigrateMySqlAzureDbForMySqlSyncTaskOutputUnion */
export type MigrateMySqlAzureDbForMySqlSyncTaskOutputUnion =
  | MigrateMySqlAzureDbForMySqlSyncTaskOutputMigrationLevel
  | MigrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseLevel
  | MigrateMySqlAzureDbForMySqlSyncTaskOutputTableLevel
  | MigrateMySqlAzureDbForMySqlSyncTaskOutputError
  | MigrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseError
  | MigrateMySqlAzureDbForMySqlSyncTaskOutput;

export function migrateMySqlAzureDbForMySqlSyncTaskOutputUnionDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlSyncTaskOutputUnion {
  switch (item["resultType"]) {
    case "MigrationLevelOutput":
      return migrateMySqlAzureDbForMySqlSyncTaskOutputMigrationLevelDeserializer(
        item as MigrateMySqlAzureDbForMySqlSyncTaskOutputMigrationLevel,
      );

    case "DatabaseLevelOutput":
      return migrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseLevelDeserializer(
        item as MigrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseLevel,
      );

    case "TableLevelOutput":
      return migrateMySqlAzureDbForMySqlSyncTaskOutputTableLevelDeserializer(
        item as MigrateMySqlAzureDbForMySqlSyncTaskOutputTableLevel,
      );

    case "ErrorOutput":
      return migrateMySqlAzureDbForMySqlSyncTaskOutputErrorDeserializer(
        item as MigrateMySqlAzureDbForMySqlSyncTaskOutputError,
      );

    case "DatabaseLevelErrorOutput":
      return migrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseErrorDeserializer(
        item as MigrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseError,
      );

    default:
      return migrateMySqlAzureDbForMySqlSyncTaskOutputDeserializer(item);
  }
}

/** model interface MigrateMySqlAzureDbForMySqlSyncTaskOutputMigrationLevel */
export interface MigrateMySqlAzureDbForMySqlSyncTaskOutputMigrationLevel extends MigrateMySqlAzureDbForMySqlSyncTaskOutput {
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Source server version */
  readonly sourceServerVersion?: string;
  /** Source server name */
  readonly sourceServer?: string;
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server name */
  readonly targetServer?: string;
  /** Result type */
  resultType: "MigrationLevelOutput";
}

export function migrateMySqlAzureDbForMySqlSyncTaskOutputMigrationLevelDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlSyncTaskOutputMigrationLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    sourceServerVersion: item["sourceServerVersion"],
    sourceServer: item["sourceServer"],
    targetServerVersion: item["targetServerVersion"],
    targetServer: item["targetServer"],
  };
}

/** model interface MigrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseLevel */
export interface MigrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseLevel extends MigrateMySqlAzureDbForMySqlSyncTaskOutput {
  /** Name of the database */
  readonly databaseName?: string;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Migration state that this database is in */
  readonly migrationState?: SyncDatabaseMigrationReportingState;
  /** Number of incoming changes */
  readonly incomingChanges?: number;
  /** Number of applied changes */
  readonly appliedChanges?: number;
  /** Number of cdc inserts */
  readonly cdcInsertCounter?: number;
  /** Number of cdc deletes */
  readonly cdcDeleteCounter?: number;
  /** Number of cdc updates */
  readonly cdcUpdateCounter?: number;
  /** Number of tables completed in full load */
  readonly fullLoadCompletedTables?: number;
  /** Number of tables loading in full load */
  readonly fullLoadLoadingTables?: number;
  /** Number of tables queued in full load */
  readonly fullLoadQueuedTables?: number;
  /** Number of tables errored in full load */
  readonly fullLoadErroredTables?: number;
  /** Indicates if initial load (full load) has been completed */
  readonly initializationCompleted?: boolean;
  /** CDC apply latency */
  readonly latency?: number;
  /** Result type */
  resultType: "DatabaseLevelOutput";
}

export function migrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseLevelDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    databaseName: item["databaseName"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    migrationState: item["migrationState"],
    incomingChanges: item["incomingChanges"],
    appliedChanges: item["appliedChanges"],
    cdcInsertCounter: item["cdcInsertCounter"],
    cdcDeleteCounter: item["cdcDeleteCounter"],
    cdcUpdateCounter: item["cdcUpdateCounter"],
    fullLoadCompletedTables: item["fullLoadCompletedTables"],
    fullLoadLoadingTables: item["fullLoadLoadingTables"],
    fullLoadQueuedTables: item["fullLoadQueuedTables"],
    fullLoadErroredTables: item["fullLoadErroredTables"],
    initializationCompleted: item["initializationCompleted"],
    latency: item["latency"],
  };
}

/** model interface MigrateMySqlAzureDbForMySqlSyncTaskOutputTableLevel */
export interface MigrateMySqlAzureDbForMySqlSyncTaskOutputTableLevel extends MigrateMySqlAzureDbForMySqlSyncTaskOutput {
  /** Name of the table */
  readonly tableName?: string;
  /** Name of the database */
  readonly databaseName?: string;
  /** Number of applied inserts */
  readonly cdcInsertCounter?: string;
  /** Number of applied updates */
  readonly cdcUpdateCounter?: string;
  /** Number of applied deletes */
  readonly cdcDeleteCounter?: string;
  /** Estimate to finish full load */
  readonly fullLoadEstFinishTime?: Date;
  /** Full load start time */
  readonly fullLoadStartedOn?: Date;
  /** Full load end time */
  readonly fullLoadEndedOn?: Date;
  /** Number of rows applied in full load */
  readonly fullLoadTotalRows?: number;
  /** Current state of the table migration */
  readonly state?: SyncTableMigrationState;
  /** Total number of applied changes */
  readonly totalChangesApplied?: number;
  /** Number of data errors occurred */
  readonly dataErrorsCounter?: number;
  /** Last modified time on target */
  readonly lastModifiedTime?: Date;
  /** Result type */
  resultType: "TableLevelOutput";
}

export function migrateMySqlAzureDbForMySqlSyncTaskOutputTableLevelDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlSyncTaskOutputTableLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    tableName: item["tableName"],
    databaseName: item["databaseName"],
    cdcInsertCounter: item["cdcInsertCounter"],
    cdcUpdateCounter: item["cdcUpdateCounter"],
    cdcDeleteCounter: item["cdcDeleteCounter"],
    fullLoadEstFinishTime: !item["fullLoadEstFinishTime"]
      ? item["fullLoadEstFinishTime"]
      : new Date(item["fullLoadEstFinishTime"]),
    fullLoadStartedOn: !item["fullLoadStartedOn"]
      ? item["fullLoadStartedOn"]
      : new Date(item["fullLoadStartedOn"]),
    fullLoadEndedOn: !item["fullLoadEndedOn"]
      ? item["fullLoadEndedOn"]
      : new Date(item["fullLoadEndedOn"]),
    fullLoadTotalRows: item["fullLoadTotalRows"],
    state: item["state"],
    totalChangesApplied: item["totalChangesApplied"],
    dataErrorsCounter: item["dataErrorsCounter"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
  };
}

/** model interface MigrateMySqlAzureDbForMySqlSyncTaskOutputError */
export interface MigrateMySqlAzureDbForMySqlSyncTaskOutputError extends MigrateMySqlAzureDbForMySqlSyncTaskOutput {
  /** Migration error */
  readonly error?: ReportableException;
  /** Result type */
  resultType: "ErrorOutput";
}

export function migrateMySqlAzureDbForMySqlSyncTaskOutputErrorDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlSyncTaskOutputError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    error: !item["error"] ? item["error"] : reportableExceptionDeserializer(item["error"]),
  };
}

/** model interface MigrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseError */
export interface MigrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseError extends MigrateMySqlAzureDbForMySqlSyncTaskOutput {
  /** Error message */
  errorMessage?: string;
  /** List of error events. */
  events?: SyncMigrationDatabaseErrorEvent[];
  /** Result type */
  resultType: "DatabaseLevelErrorOutput";
}

export function migrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseErrorDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlSyncTaskOutputDatabaseError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    errorMessage: item["errorMessage"],
    events: !item["events"]
      ? item["events"]
      : syncMigrationDatabaseErrorEventArrayDeserializer(item["events"]),
  };
}

/** Properties for the task that migrates MySQL databases to Azure Database for MySQL for offline migrations */
export interface MigrateMySqlAzureDbForMySqlOfflineTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: MigrateMySqlAzureDbForMySqlOfflineTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: MigrateMySqlAzureDbForMySqlOfflineTaskOutputUnion[];
  /** whether the task can be cloned or not */
  isCloneable?: boolean;
  /** Task id */
  taskId?: string;
  /** Task type. */
  taskType: "Migrate.MySql.AzureDbForMySql";
}

export function migrateMySqlAzureDbForMySqlOfflineTaskPropertiesSerializer(
  item: MigrateMySqlAzureDbForMySqlOfflineTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : migrateMySqlAzureDbForMySqlOfflineTaskInputSerializer(item["input"]),
    isCloneable: item["isCloneable"],
    taskId: item["taskId"],
  };
}

export function migrateMySqlAzureDbForMySqlOfflineTaskPropertiesDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlOfflineTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : migrateMySqlAzureDbForMySqlOfflineTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migrateMySqlAzureDbForMySqlOfflineTaskOutputUnionArrayDeserializer(item["output"]),
    isCloneable: item["isCloneable"],
    taskId: item["taskId"],
  };
}

/** Input for the task that migrates MySQL databases to Azure Database for MySQL for offline migrations */
export interface MigrateMySqlAzureDbForMySqlOfflineTaskInput {
  /** Connection information for source MySQL */
  sourceConnectionInfo: MySqlConnectionInfo;
  /** Connection information for target Azure Database for MySQL */
  targetConnectionInfo: MySqlConnectionInfo;
  /** Databases to migrate */
  selectedDatabases: MigrateMySqlAzureDbForMySqlOfflineDatabaseInput[];
  /** Setting to set the source server read only */
  makeSourceServerReadOnly?: boolean;
  /** Parameter to specify when the migration started */
  startedOn?: Date;
  /** Optional parameters for fine tuning the data transfer rate during migration */
  optionalAgentSettings?: Record<string, string>;
  /** encrypted key for secure fields */
  encryptedKeyForSecureFields?: string;
}

export function migrateMySqlAzureDbForMySqlOfflineTaskInputSerializer(
  item: MigrateMySqlAzureDbForMySqlOfflineTaskInput,
): any {
  return {
    sourceConnectionInfo: mySqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: mySqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateMySqlAzureDbForMySqlOfflineDatabaseInputArraySerializer(
      item["selectedDatabases"],
    ),
    makeSourceServerReadOnly: item["makeSourceServerReadOnly"],
    startedOn: !item["startedOn"] ? item["startedOn"] : item["startedOn"].toISOString(),
    optionalAgentSettings: item["optionalAgentSettings"],
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
  };
}

export function migrateMySqlAzureDbForMySqlOfflineTaskInputDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlOfflineTaskInput {
  return {
    sourceConnectionInfo: mySqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: mySqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateMySqlAzureDbForMySqlOfflineDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
    makeSourceServerReadOnly: item["makeSourceServerReadOnly"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    optionalAgentSettings: !item["optionalAgentSettings"]
      ? item["optionalAgentSettings"]
      : Object.fromEntries(
          Object.entries(item["optionalAgentSettings"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
  };
}

export function migrateMySqlAzureDbForMySqlOfflineDatabaseInputArraySerializer(
  result: Array<MigrateMySqlAzureDbForMySqlOfflineDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateMySqlAzureDbForMySqlOfflineDatabaseInputSerializer(item);
  });
}

export function migrateMySqlAzureDbForMySqlOfflineDatabaseInputArrayDeserializer(
  result: Array<MigrateMySqlAzureDbForMySqlOfflineDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateMySqlAzureDbForMySqlOfflineDatabaseInputDeserializer(item);
  });
}

/** Database specific information for offline MySQL to Azure Database for MySQL migration task inputs */
export interface MigrateMySqlAzureDbForMySqlOfflineDatabaseInput {
  /** Name of the database */
  name?: string;
  /** Name of target database. Note: Target database will be truncated before starting migration. */
  targetDatabaseName?: string;
  /** Mapping of source to target tables */
  tableMap?: Record<string, string>;
}

export function migrateMySqlAzureDbForMySqlOfflineDatabaseInputSerializer(
  item: MigrateMySqlAzureDbForMySqlOfflineDatabaseInput,
): any {
  return {
    name: item["name"],
    targetDatabaseName: item["targetDatabaseName"],
    tableMap: item["tableMap"],
  };
}

export function migrateMySqlAzureDbForMySqlOfflineDatabaseInputDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlOfflineDatabaseInput {
  return {
    name: item["name"],
    targetDatabaseName: item["targetDatabaseName"],
    tableMap: !item["tableMap"]
      ? item["tableMap"]
      : Object.fromEntries(Object.entries(item["tableMap"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function migrateMySqlAzureDbForMySqlOfflineTaskOutputUnionArrayDeserializer(
  result: Array<MigrateMySqlAzureDbForMySqlOfflineTaskOutputUnion>,
): any[] {
  return result.map((item) => {
    return migrateMySqlAzureDbForMySqlOfflineTaskOutputUnionDeserializer(item);
  });
}

/** Output for the task that migrates MySQL databases to Azure Database for MySQL for offline migrations */
export interface MigrateMySqlAzureDbForMySqlOfflineTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Result type */
  /** The discriminator possible values: MigrationLevelOutput, DatabaseLevelOutput, TableLevelOutput, ErrorOutput */
  resultType: string;
}

export function migrateMySqlAzureDbForMySqlOfflineTaskOutputDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlOfflineTaskOutput {
  return {
    id: item["id"],
    resultType: item["resultType"],
  };
}

/** Alias for MigrateMySqlAzureDbForMySqlOfflineTaskOutputUnion */
export type MigrateMySqlAzureDbForMySqlOfflineTaskOutputUnion =
  | MigrateMySqlAzureDbForMySqlOfflineTaskOutputMigrationLevel
  | MigrateMySqlAzureDbForMySqlOfflineTaskOutputDatabaseLevel
  | MigrateMySqlAzureDbForMySqlOfflineTaskOutputTableLevel
  | MigrateMySqlAzureDbForMySqlOfflineTaskOutputError
  | MigrateMySqlAzureDbForMySqlOfflineTaskOutput;

export function migrateMySqlAzureDbForMySqlOfflineTaskOutputUnionDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlOfflineTaskOutputUnion {
  switch (item["resultType"]) {
    case "MigrationLevelOutput":
      return migrateMySqlAzureDbForMySqlOfflineTaskOutputMigrationLevelDeserializer(
        item as MigrateMySqlAzureDbForMySqlOfflineTaskOutputMigrationLevel,
      );

    case "DatabaseLevelOutput":
      return migrateMySqlAzureDbForMySqlOfflineTaskOutputDatabaseLevelDeserializer(
        item as MigrateMySqlAzureDbForMySqlOfflineTaskOutputDatabaseLevel,
      );

    case "TableLevelOutput":
      return migrateMySqlAzureDbForMySqlOfflineTaskOutputTableLevelDeserializer(
        item as MigrateMySqlAzureDbForMySqlOfflineTaskOutputTableLevel,
      );

    case "ErrorOutput":
      return migrateMySqlAzureDbForMySqlOfflineTaskOutputErrorDeserializer(
        item as MigrateMySqlAzureDbForMySqlOfflineTaskOutputError,
      );

    default:
      return migrateMySqlAzureDbForMySqlOfflineTaskOutputDeserializer(item);
  }
}

/** model interface MigrateMySqlAzureDbForMySqlOfflineTaskOutputMigrationLevel */
export interface MigrateMySqlAzureDbForMySqlOfflineTaskOutputMigrationLevel extends MigrateMySqlAzureDbForMySqlOfflineTaskOutput {
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Duration of task execution in seconds. */
  readonly durationInSeconds?: number;
  /** Current status of migration */
  readonly status?: MigrationStatus;
  /** Migration status message */
  readonly statusMessage?: string;
  /** Migration progress message */
  readonly message?: string;
  /** Selected databases as a map from database name to database id */
  databases?: string;
  /** Summary of database results in the migration */
  readonly databaseSummary?: string;
  /** Migration Report Result, provides unique url for downloading your migration report. */
  migrationReportResult?: MigrationReportResult;
  /** Source server version */
  readonly sourceServerVersion?: string;
  /** Source server brand version */
  readonly sourceServerBrandVersion?: string;
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
  /** Migration exceptions and warnings. */
  readonly exceptionsAndWarnings?: ReportableException[];
  /** Last time the storage was updated */
  readonly lastStorageUpdate?: Date;
  /** Result type */
  resultType: "MigrationLevelOutput";
}

export function migrateMySqlAzureDbForMySqlOfflineTaskOutputMigrationLevelDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlOfflineTaskOutputMigrationLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    durationInSeconds: item["durationInSeconds"],
    status: item["status"],
    statusMessage: item["statusMessage"],
    message: item["message"],
    databases: item["databases"],
    databaseSummary: item["databaseSummary"],
    migrationReportResult: !item["migrationReportResult"]
      ? item["migrationReportResult"]
      : migrationReportResultDeserializer(item["migrationReportResult"]),
    sourceServerVersion: item["sourceServerVersion"],
    sourceServerBrandVersion: item["sourceServerBrandVersion"],
    targetServerVersion: item["targetServerVersion"],
    targetServerBrandVersion: item["targetServerBrandVersion"],
    exceptionsAndWarnings: !item["exceptionsAndWarnings"]
      ? item["exceptionsAndWarnings"]
      : reportableExceptionArrayDeserializer(item["exceptionsAndWarnings"]),
    lastStorageUpdate: !item["lastStorageUpdate"]
      ? item["lastStorageUpdate"]
      : new Date(item["lastStorageUpdate"]),
  };
}

/** model interface MigrateMySqlAzureDbForMySqlOfflineTaskOutputDatabaseLevel */
export interface MigrateMySqlAzureDbForMySqlOfflineTaskOutputDatabaseLevel extends MigrateMySqlAzureDbForMySqlOfflineTaskOutput {
  /** Name of the database */
  readonly databaseName?: string;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Current state of migration */
  readonly state?: MigrationState;
  /** Migration stage that this database is in */
  readonly stage?: DatabaseMigrationStage;
  /** Status message */
  readonly statusMessage?: string;
  /** Migration progress message */
  readonly message?: string;
  /** Number of objects */
  readonly numberOfObjects?: number;
  /** Number of successfully completed objects */
  readonly numberOfObjectsCompleted?: number;
  /** Number of database/object errors. */
  readonly errorCount?: number;
  /** Wildcard string prefix to use for querying all errors of the item */
  readonly errorPrefix?: string;
  /** Wildcard string prefix to use for querying all sub-tem results of the item */
  readonly resultPrefix?: string;
  /** Migration exceptions and warnings. */
  readonly exceptionsAndWarnings?: ReportableException[];
  /** Last time the storage was updated */
  readonly lastStorageUpdate?: Date;
  /** Summary of object results in the migration */
  readonly objectSummary?: string;
  /** Result type */
  resultType: "DatabaseLevelOutput";
}

export function migrateMySqlAzureDbForMySqlOfflineTaskOutputDatabaseLevelDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlOfflineTaskOutputDatabaseLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    databaseName: item["databaseName"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    state: item["state"],
    stage: item["stage"],
    statusMessage: item["statusMessage"],
    message: item["message"],
    numberOfObjects: item["numberOfObjects"],
    numberOfObjectsCompleted: item["numberOfObjectsCompleted"],
    errorCount: item["errorCount"],
    errorPrefix: item["errorPrefix"],
    resultPrefix: item["resultPrefix"],
    exceptionsAndWarnings: !item["exceptionsAndWarnings"]
      ? item["exceptionsAndWarnings"]
      : reportableExceptionArrayDeserializer(item["exceptionsAndWarnings"]),
    lastStorageUpdate: !item["lastStorageUpdate"]
      ? item["lastStorageUpdate"]
      : new Date(item["lastStorageUpdate"]),
    objectSummary: item["objectSummary"],
  };
}

/** model interface MigrateMySqlAzureDbForMySqlOfflineTaskOutputTableLevel */
export interface MigrateMySqlAzureDbForMySqlOfflineTaskOutputTableLevel extends MigrateMySqlAzureDbForMySqlOfflineTaskOutput {
  /** Name of the item */
  readonly objectName?: string;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Current state of migration */
  readonly state?: MigrationState;
  /** Status message */
  readonly statusMessage?: string;
  /** Number of items */
  readonly itemsCount?: number;
  /** Number of successfully completed items */
  readonly itemsCompletedCount?: number;
  /** Wildcard string prefix to use for querying all errors of the item */
  readonly errorPrefix?: string;
  /** Wildcard string prefix to use for querying all sub-tem results of the item */
  readonly resultPrefix?: string;
  /** Last time the storage was updated */
  readonly lastStorageUpdate?: Date;
  /** Result type */
  resultType: "TableLevelOutput";
}

export function migrateMySqlAzureDbForMySqlOfflineTaskOutputTableLevelDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlOfflineTaskOutputTableLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    objectName: item["objectName"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    state: item["state"],
    statusMessage: item["statusMessage"],
    itemsCount: item["itemsCount"],
    itemsCompletedCount: item["itemsCompletedCount"],
    errorPrefix: item["errorPrefix"],
    resultPrefix: item["resultPrefix"],
    lastStorageUpdate: !item["lastStorageUpdate"]
      ? item["lastStorageUpdate"]
      : new Date(item["lastStorageUpdate"]),
  };
}

/** model interface MigrateMySqlAzureDbForMySqlOfflineTaskOutputError */
export interface MigrateMySqlAzureDbForMySqlOfflineTaskOutputError extends MigrateMySqlAzureDbForMySqlOfflineTaskOutput {
  /** Migration error */
  readonly error?: ReportableException;
  /** Result type */
  resultType: "ErrorOutput";
}

export function migrateMySqlAzureDbForMySqlOfflineTaskOutputErrorDeserializer(
  item: any,
): MigrateMySqlAzureDbForMySqlOfflineTaskOutputError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    error: !item["error"] ? item["error"] : reportableExceptionDeserializer(item["error"]),
  };
}

/** Properties for the task that migrates PostgreSQL databases to Azure Database for PostgreSQL for online migrations */
export interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: MigratePostgreSqlAzureDbForPostgreSqlSyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputUnion[];
  /** task id */
  taskId?: string;
  /** DateTime in UTC when the task was created */
  createdOn?: string;
  /** whether the task can be cloned or not */
  isCloneable?: boolean;
  /** Task type. */
  taskType: "Migrate.PostgreSql.AzureDbForPostgreSql.SyncV2";
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskPropertiesSerializer(
  item: MigratePostgreSqlAzureDbForPostgreSqlSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : migratePostgreSqlAzureDbForPostgreSqlSyncTaskInputSerializer(item["input"]),
    taskId: item["taskId"],
    createdOn: item["createdOn"],
    isCloneable: item["isCloneable"],
  };
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskPropertiesDeserializer(
  item: any,
): MigratePostgreSqlAzureDbForPostgreSqlSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : migratePostgreSqlAzureDbForPostgreSqlSyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputUnionArrayDeserializer(item["output"]),
    taskId: item["taskId"],
    createdOn: item["createdOn"],
    isCloneable: item["isCloneable"],
  };
}

/** Input for the task that migrates PostgreSQL databases to Azure Database for PostgreSQL for online migrations */
export interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskInput {
  /** Databases to migrate */
  selectedDatabases: MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInput[];
  /** Connection information for target Azure Database for PostgreSQL */
  targetConnectionInfo: PostgreSqlConnectionInfo;
  /** Connection information for source PostgreSQL */
  sourceConnectionInfo: PostgreSqlConnectionInfo;
  /** encrypted key for secure fields */
  encryptedKeyForSecureFields?: string;
  /** Migration start time */
  readonly startedOn?: Date;
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskInputSerializer(
  item: MigratePostgreSqlAzureDbForPostgreSqlSyncTaskInput,
): any {
  return {
    selectedDatabases: migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInputArraySerializer(
      item["selectedDatabases"],
    ),
    targetConnectionInfo: postgreSqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    sourceConnectionInfo: postgreSqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
  };
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskInputDeserializer(
  item: any,
): MigratePostgreSqlAzureDbForPostgreSqlSyncTaskInput {
  return {
    selectedDatabases: migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
    targetConnectionInfo: postgreSqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    sourceConnectionInfo: postgreSqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    encryptedKeyForSecureFields: item["encryptedKeyForSecureFields"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
  };
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInputArraySerializer(
  result: Array<MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInputSerializer(item);
  });
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInputArrayDeserializer(
  result: Array<MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInputDeserializer(item);
  });
}

/** Database specific information for PostgreSQL to Azure Database for PostgreSQL migration task inputs */
export interface MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInput {
  /** Name of the database */
  name?: string;
  /** Result identifier */
  readonly id?: string;
  /** Name of target database. Note: Target database will be truncated before starting migration. */
  targetDatabaseName?: string;
  /** Migration settings which tune the migration behavior */
  migrationSetting?: Record<string, any>;
  /** Source settings to tune source endpoint migration behavior */
  sourceSetting?: Record<string, string>;
  /** Target settings to tune target endpoint migration behavior */
  targetSetting?: Record<string, string>;
  /** Tables selected for migration */
  selectedTables?: MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInput[];
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInputSerializer(
  item: MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInput,
): any {
  return {
    name: item["name"],
    targetDatabaseName: item["targetDatabaseName"],
    migrationSetting: item["migrationSetting"],
    sourceSetting: item["sourceSetting"],
    targetSetting: item["targetSetting"],
    selectedTables: !item["selectedTables"]
      ? item["selectedTables"]
      : migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInputArraySerializer(
          item["selectedTables"],
        ),
  };
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInputDeserializer(
  item: any,
): MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseInput {
  return {
    name: item["name"],
    id: item["id"],
    targetDatabaseName: item["targetDatabaseName"],
    migrationSetting: !item["migrationSetting"]
      ? item["migrationSetting"]
      : Object.fromEntries(
          Object.entries(item["migrationSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    sourceSetting: !item["sourceSetting"]
      ? item["sourceSetting"]
      : Object.fromEntries(
          Object.entries(item["sourceSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    targetSetting: !item["targetSetting"]
      ? item["targetSetting"]
      : Object.fromEntries(
          Object.entries(item["targetSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    selectedTables: !item["selectedTables"]
      ? item["selectedTables"]
      : migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInputArrayDeserializer(
          item["selectedTables"],
        ),
  };
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInputArraySerializer(
  result: Array<MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInput>,
): any[] {
  return result.map((item) => {
    return migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInputSerializer(item);
  });
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInputArrayDeserializer(
  result: Array<MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInput>,
): any[] {
  return result.map((item) => {
    return migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInputDeserializer(item);
  });
}

/** Selected tables for the migration */
export interface MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInput {
  /** Name of the table to migrate */
  name?: string;
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInputSerializer(
  item: MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInput,
): any {
  return { name: item["name"] };
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInputDeserializer(
  item: any,
): MigratePostgreSqlAzureDbForPostgreSqlSyncDatabaseTableInput {
  return {
    name: item["name"],
  };
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputUnionArrayDeserializer(
  result: Array<MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputUnion>,
): any[] {
  return result.map((item) => {
    return migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputUnionDeserializer(item);
  });
}

/** Output for the task that migrates PostgreSQL databases to Azure Database for PostgreSQL for online migrations */
export interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Result type */
  /** The discriminator possible values: MigrationLevelOutput, DatabaseLevelOutput, TableLevelOutput, ErrorOutput, DatabaseLevelErrorOutput */
  resultType: string;
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDeserializer(
  item: any,
): MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutput {
  return {
    id: item["id"],
    resultType: item["resultType"],
  };
}

/** Alias for MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputUnion */
export type MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputUnion =
  | MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputMigrationLevel
  | MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseLevel
  | MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputTableLevel
  | MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputError
  | MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseError
  | MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutput;

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputUnionDeserializer(
  item: any,
): MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputUnion {
  switch (item["resultType"]) {
    case "MigrationLevelOutput":
      return migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputMigrationLevelDeserializer(
        item as MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputMigrationLevel,
      );

    case "DatabaseLevelOutput":
      return migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseLevelDeserializer(
        item as MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseLevel,
      );

    case "TableLevelOutput":
      return migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputTableLevelDeserializer(
        item as MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputTableLevel,
      );

    case "ErrorOutput":
      return migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputErrorDeserializer(
        item as MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputError,
      );

    case "DatabaseLevelErrorOutput":
      return migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseErrorDeserializer(
        item as MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseError,
      );

    default:
      return migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDeserializer(item);
  }
}

/** model interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputMigrationLevel */
export interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputMigrationLevel extends MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutput {
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Source server version */
  readonly sourceServerVersion?: string;
  /** Source server name */
  readonly sourceServer?: string;
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server name */
  readonly targetServer?: string;
  /** Source server type. */
  readonly sourceServerType?: ScenarioSource;
  /** Target server type. */
  readonly targetServerType?: ScenarioTarget;
  /** Migration status */
  readonly state?: ReplicateMigrationState;
  /** Number of databases to include */
  databaseCount?: number;
  /** Result type */
  resultType: "MigrationLevelOutput";
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputMigrationLevelDeserializer(
  item: any,
): MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputMigrationLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    sourceServerVersion: item["sourceServerVersion"],
    sourceServer: item["sourceServer"],
    targetServerVersion: item["targetServerVersion"],
    targetServer: item["targetServer"],
    sourceServerType: item["sourceServerType"],
    targetServerType: item["targetServerType"],
    state: item["state"],
    databaseCount: item["databaseCount"],
  };
}

/** An enumeration of source type */
export enum KnownScenarioSource {
  /** Access */
  Access = "Access",
  /** DB2 */
  DB2 = "DB2",
  /** MySQL */
  MySQL = "MySQL",
  /** Oracle */
  Oracle = "Oracle",
  /** SQL */
  SQL = "SQL",
  /** Sybase */
  Sybase = "Sybase",
  /** PostgreSQL */
  PostgreSQL = "PostgreSQL",
  /** MongoDB */
  MongoDB = "MongoDB",
  /** SQLRDS */
  Sqlrds = "SQLRDS",
  /** MySQLRDS */
  MySqlrds = "MySQLRDS",
  /** PostgreSQLRDS */
  PostgreSqlrds = "PostgreSQLRDS",
}

/**
 * An enumeration of source type \
 * {@link KnownScenarioSource} can be used interchangeably with ScenarioSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Access**: Access \
 * **DB2**: DB2 \
 * **MySQL**: MySQL \
 * **Oracle**: Oracle \
 * **SQL**: SQL \
 * **Sybase**: Sybase \
 * **PostgreSQL**: PostgreSQL \
 * **MongoDB**: MongoDB \
 * **SQLRDS**: SQLRDS \
 * **MySQLRDS**: MySQLRDS \
 * **PostgreSQLRDS**: PostgreSQLRDS
 */
export type ScenarioSource = string;

/** An enumeration of target type */
export enum KnownScenarioTarget {
  /** SQLServer */
  SQLServer = "SQLServer",
  /** SQLDB */
  Sqldb = "SQLDB",
  /** SQLDW */
  Sqldw = "SQLDW",
  /** SQLMI */
  Sqlmi = "SQLMI",
  /** AzureDBForMySql */
  AzureDBForMySql = "AzureDBForMySql",
  /** AzureDBForPostgresSQL */
  AzureDBForPostgresSQL = "AzureDBForPostgresSQL",
  /** MongoDB */
  MongoDB = "MongoDB",
}

/**
 * An enumeration of target type \
 * {@link KnownScenarioTarget} can be used interchangeably with ScenarioTarget,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SQLServer**: SQLServer \
 * **SQLDB**: SQLDB \
 * **SQLDW**: SQLDW \
 * **SQLMI**: SQLMI \
 * **AzureDBForMySql**: AzureDBForMySql \
 * **AzureDBForPostgresSQL**: AzureDBForPostgresSQL \
 * **MongoDB**: MongoDB
 */
export type ScenarioTarget = string;

/** Wrapper for replicate reported migration states. */
export enum KnownReplicateMigrationState {
  /** UNDEFINED */
  Undefined = "UNDEFINED",
  /** VALIDATING */
  Validating = "VALIDATING",
  /** PENDING */
  Pending = "PENDING",
  /** COMPLETE */
  Complete = "COMPLETE",
  /** ACTION_REQUIRED */
  ActionRequired = "ACTION_REQUIRED",
  /** FAILED */
  Failed = "FAILED",
}

/**
 * Wrapper for replicate reported migration states. \
 * {@link KnownReplicateMigrationState} can be used interchangeably with ReplicateMigrationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UNDEFINED**: UNDEFINED \
 * **VALIDATING**: VALIDATING \
 * **PENDING**: PENDING \
 * **COMPLETE**: COMPLETE \
 * **ACTION_REQUIRED**: ACTION_REQUIRED \
 * **FAILED**: FAILED
 */
export type ReplicateMigrationState = string;

/** model interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseLevel */
export interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseLevel extends MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutput {
  /** Name of the database */
  readonly databaseName?: string;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Migration state that this database is in */
  readonly migrationState?: SyncDatabaseMigrationReportingState;
  /** Number of incoming changes */
  readonly incomingChanges?: number;
  /** Number of applied changes */
  readonly appliedChanges?: number;
  /** Number of cdc inserts */
  readonly cdcInsertCounter?: number;
  /** Number of cdc deletes */
  readonly cdcDeleteCounter?: number;
  /** Number of cdc updates */
  readonly cdcUpdateCounter?: number;
  /** Number of tables completed in full load */
  readonly fullLoadCompletedTables?: number;
  /** Number of tables loading in full load */
  readonly fullLoadLoadingTables?: number;
  /** Number of tables queued in full load */
  readonly fullLoadQueuedTables?: number;
  /** Number of tables errored in full load */
  readonly fullLoadErroredTables?: number;
  /** Indicates if initial load (full load) has been completed */
  readonly initializationCompleted?: boolean;
  /** CDC apply latency */
  readonly latency?: number;
  /** Result type */
  resultType: "DatabaseLevelOutput";
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseLevelDeserializer(
  item: any,
): MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    databaseName: item["databaseName"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    migrationState: item["migrationState"],
    incomingChanges: item["incomingChanges"],
    appliedChanges: item["appliedChanges"],
    cdcInsertCounter: item["cdcInsertCounter"],
    cdcDeleteCounter: item["cdcDeleteCounter"],
    cdcUpdateCounter: item["cdcUpdateCounter"],
    fullLoadCompletedTables: item["fullLoadCompletedTables"],
    fullLoadLoadingTables: item["fullLoadLoadingTables"],
    fullLoadQueuedTables: item["fullLoadQueuedTables"],
    fullLoadErroredTables: item["fullLoadErroredTables"],
    initializationCompleted: item["initializationCompleted"],
    latency: item["latency"],
  };
}

/** model interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputTableLevel */
export interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputTableLevel extends MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutput {
  /** Name of the table */
  readonly tableName?: string;
  /** Name of the database */
  readonly databaseName?: string;
  /** Number of applied inserts */
  readonly cdcInsertCounter?: number;
  /** Number of applied updates */
  readonly cdcUpdateCounter?: number;
  /** Number of applied deletes */
  readonly cdcDeleteCounter?: number;
  /** Estimate to finish full load */
  readonly fullLoadEstFinishTime?: Date;
  /** Full load start time */
  readonly fullLoadStartedOn?: Date;
  /** Full load end time */
  readonly fullLoadEndedOn?: Date;
  /** Number of rows applied in full load */
  readonly fullLoadTotalRows?: number;
  /** Current state of the table migration */
  readonly state?: SyncTableMigrationState;
  /** Total number of applied changes */
  readonly totalChangesApplied?: number;
  /** Number of data errors occurred */
  readonly dataErrorsCounter?: number;
  /** Last modified time on target */
  readonly lastModifiedTime?: Date;
  /** Result type */
  resultType: "TableLevelOutput";
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputTableLevelDeserializer(
  item: any,
): MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputTableLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    tableName: item["tableName"],
    databaseName: item["databaseName"],
    cdcInsertCounter: item["cdcInsertCounter"],
    cdcUpdateCounter: item["cdcUpdateCounter"],
    cdcDeleteCounter: item["cdcDeleteCounter"],
    fullLoadEstFinishTime: !item["fullLoadEstFinishTime"]
      ? item["fullLoadEstFinishTime"]
      : new Date(item["fullLoadEstFinishTime"]),
    fullLoadStartedOn: !item["fullLoadStartedOn"]
      ? item["fullLoadStartedOn"]
      : new Date(item["fullLoadStartedOn"]),
    fullLoadEndedOn: !item["fullLoadEndedOn"]
      ? item["fullLoadEndedOn"]
      : new Date(item["fullLoadEndedOn"]),
    fullLoadTotalRows: item["fullLoadTotalRows"],
    state: item["state"],
    totalChangesApplied: item["totalChangesApplied"],
    dataErrorsCounter: item["dataErrorsCounter"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
  };
}

/** model interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputError */
export interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputError extends MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutput {
  /** Migration error */
  readonly error?: ReportableException;
  /** List of error events */
  events?: SyncMigrationDatabaseErrorEvent[];
  /** Result type */
  resultType: "ErrorOutput";
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputErrorDeserializer(
  item: any,
): MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    error: !item["error"] ? item["error"] : reportableExceptionDeserializer(item["error"]),
    events: !item["events"]
      ? item["events"]
      : syncMigrationDatabaseErrorEventArrayDeserializer(item["events"]),
  };
}

/** model interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseError */
export interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseError extends MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutput {
  /** Error message */
  errorMessage?: string;
  /** List of error events. */
  events?: SyncMigrationDatabaseErrorEvent[];
  /** Result type */
  resultType: "DatabaseLevelErrorOutput";
}

export function migratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseErrorDeserializer(
  item: any,
): MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputDatabaseError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    errorMessage: item["errorMessage"],
    events: !item["events"]
      ? item["events"]
      : syncMigrationDatabaseErrorEventArrayDeserializer(item["events"]),
  };
}

/** Properties for the task that migrates Oracle to Azure Database for PostgreSQL for online migrations */
export interface MigrateOracleAzureDbForPostgreSqlSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: MigrateOracleAzureDbPostgreSqlSyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: MigrateOracleAzureDbPostgreSqlSyncTaskOutputUnion[];
  /** Task type. */
  taskType: "Migrate.Oracle.AzureDbForPostgreSql.Sync";
}

export function migrateOracleAzureDbForPostgreSqlSyncTaskPropertiesSerializer(
  item: MigrateOracleAzureDbForPostgreSqlSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : migrateOracleAzureDbPostgreSqlSyncTaskInputSerializer(item["input"]),
  };
}

export function migrateOracleAzureDbForPostgreSqlSyncTaskPropertiesDeserializer(
  item: any,
): MigrateOracleAzureDbForPostgreSqlSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : migrateOracleAzureDbPostgreSqlSyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migrateOracleAzureDbPostgreSqlSyncTaskOutputUnionArrayDeserializer(item["output"]),
  };
}

/** Input for the task that migrates Oracle databases to Azure Database for PostgreSQL for online migrations */
export interface MigrateOracleAzureDbPostgreSqlSyncTaskInput {
  /** Databases to migrate */
  selectedDatabases: MigrateOracleAzureDbPostgreSqlSyncDatabaseInput[];
  /** Connection information for target Azure Database for PostgreSQL */
  targetConnectionInfo: PostgreSqlConnectionInfo;
  /** Connection information for source Oracle */
  sourceConnectionInfo: OracleConnectionInfo;
}

export function migrateOracleAzureDbPostgreSqlSyncTaskInputSerializer(
  item: MigrateOracleAzureDbPostgreSqlSyncTaskInput,
): any {
  return {
    selectedDatabases: migrateOracleAzureDbPostgreSqlSyncDatabaseInputArraySerializer(
      item["selectedDatabases"],
    ),
    targetConnectionInfo: postgreSqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    sourceConnectionInfo: oracleConnectionInfoSerializer(item["sourceConnectionInfo"]),
  };
}

export function migrateOracleAzureDbPostgreSqlSyncTaskInputDeserializer(
  item: any,
): MigrateOracleAzureDbPostgreSqlSyncTaskInput {
  return {
    selectedDatabases: migrateOracleAzureDbPostgreSqlSyncDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
    targetConnectionInfo: postgreSqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    sourceConnectionInfo: oracleConnectionInfoDeserializer(item["sourceConnectionInfo"]),
  };
}

export function migrateOracleAzureDbPostgreSqlSyncDatabaseInputArraySerializer(
  result: Array<MigrateOracleAzureDbPostgreSqlSyncDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateOracleAzureDbPostgreSqlSyncDatabaseInputSerializer(item);
  });
}

export function migrateOracleAzureDbPostgreSqlSyncDatabaseInputArrayDeserializer(
  result: Array<MigrateOracleAzureDbPostgreSqlSyncDatabaseInput>,
): any[] {
  return result.map((item) => {
    return migrateOracleAzureDbPostgreSqlSyncDatabaseInputDeserializer(item);
  });
}

/** Database specific information for Oracle to Azure Database for PostgreSQL migration task inputs */
export interface MigrateOracleAzureDbPostgreSqlSyncDatabaseInput {
  /** How to handle object name casing: either Preserve or ToLower */
  caseManipulation?: string;
  /** Name of the migration pipeline */
  name?: string;
  /** Name of the source schema */
  schemaName?: string;
  /** Mapping of source to target tables */
  tableMap?: Record<string, string>;
  /** Name of target database. Note: Target database will be truncated before starting migration. */
  targetDatabaseName?: string;
  /** Migration settings which tune the migration behavior */
  migrationSetting?: Record<string, string>;
  /** Source settings to tune source endpoint migration behavior */
  sourceSetting?: Record<string, string>;
  /** Target settings to tune target endpoint migration behavior */
  targetSetting?: Record<string, string>;
}

export function migrateOracleAzureDbPostgreSqlSyncDatabaseInputSerializer(
  item: MigrateOracleAzureDbPostgreSqlSyncDatabaseInput,
): any {
  return {
    caseManipulation: item["caseManipulation"],
    name: item["name"],
    schemaName: item["schemaName"],
    tableMap: item["tableMap"],
    targetDatabaseName: item["targetDatabaseName"],
    migrationSetting: item["migrationSetting"],
    sourceSetting: item["sourceSetting"],
    targetSetting: item["targetSetting"],
  };
}

export function migrateOracleAzureDbPostgreSqlSyncDatabaseInputDeserializer(
  item: any,
): MigrateOracleAzureDbPostgreSqlSyncDatabaseInput {
  return {
    caseManipulation: item["caseManipulation"],
    name: item["name"],
    schemaName: item["schemaName"],
    tableMap: !item["tableMap"]
      ? item["tableMap"]
      : Object.fromEntries(Object.entries(item["tableMap"]).map(([k, p]: [string, any]) => [k, p])),
    targetDatabaseName: item["targetDatabaseName"],
    migrationSetting: !item["migrationSetting"]
      ? item["migrationSetting"]
      : Object.fromEntries(
          Object.entries(item["migrationSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    sourceSetting: !item["sourceSetting"]
      ? item["sourceSetting"]
      : Object.fromEntries(
          Object.entries(item["sourceSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    targetSetting: !item["targetSetting"]
      ? item["targetSetting"]
      : Object.fromEntries(
          Object.entries(item["targetSetting"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function migrateOracleAzureDbPostgreSqlSyncTaskOutputUnionArrayDeserializer(
  result: Array<MigrateOracleAzureDbPostgreSqlSyncTaskOutputUnion>,
): any[] {
  return result.map((item) => {
    return migrateOracleAzureDbPostgreSqlSyncTaskOutputUnionDeserializer(item);
  });
}

/** Output for the task that migrates Oracle databases to Azure Database for PostgreSQL for online migrations */
export interface MigrateOracleAzureDbPostgreSqlSyncTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Result type */
  /** The discriminator possible values: MigrationLevelOutput, DatabaseLevelOutput, TableLevelOutput, ErrorOutput, DatabaseLevelErrorOutput */
  resultType: string;
}

export function migrateOracleAzureDbPostgreSqlSyncTaskOutputDeserializer(
  item: any,
): MigrateOracleAzureDbPostgreSqlSyncTaskOutput {
  return {
    id: item["id"],
    resultType: item["resultType"],
  };
}

/** Alias for MigrateOracleAzureDbPostgreSqlSyncTaskOutputUnion */
export type MigrateOracleAzureDbPostgreSqlSyncTaskOutputUnion =
  | MigrateOracleAzureDbPostgreSqlSyncTaskOutputMigrationLevel
  | MigrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseLevel
  | MigrateOracleAzureDbPostgreSqlSyncTaskOutputTableLevel
  | MigrateOracleAzureDbPostgreSqlSyncTaskOutputError
  | MigrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseError
  | MigrateOracleAzureDbPostgreSqlSyncTaskOutput;

export function migrateOracleAzureDbPostgreSqlSyncTaskOutputUnionDeserializer(
  item: any,
): MigrateOracleAzureDbPostgreSqlSyncTaskOutputUnion {
  switch (item["resultType"]) {
    case "MigrationLevelOutput":
      return migrateOracleAzureDbPostgreSqlSyncTaskOutputMigrationLevelDeserializer(
        item as MigrateOracleAzureDbPostgreSqlSyncTaskOutputMigrationLevel,
      );

    case "DatabaseLevelOutput":
      return migrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseLevelDeserializer(
        item as MigrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseLevel,
      );

    case "TableLevelOutput":
      return migrateOracleAzureDbPostgreSqlSyncTaskOutputTableLevelDeserializer(
        item as MigrateOracleAzureDbPostgreSqlSyncTaskOutputTableLevel,
      );

    case "ErrorOutput":
      return migrateOracleAzureDbPostgreSqlSyncTaskOutputErrorDeserializer(
        item as MigrateOracleAzureDbPostgreSqlSyncTaskOutputError,
      );

    case "DatabaseLevelErrorOutput":
      return migrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseErrorDeserializer(
        item as MigrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseError,
      );

    default:
      return migrateOracleAzureDbPostgreSqlSyncTaskOutputDeserializer(item);
  }
}

/** model interface MigrateOracleAzureDbPostgreSqlSyncTaskOutputMigrationLevel */
export interface MigrateOracleAzureDbPostgreSqlSyncTaskOutputMigrationLevel extends MigrateOracleAzureDbPostgreSqlSyncTaskOutput {
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Source server version */
  readonly sourceServerVersion?: string;
  /** Source server name */
  readonly sourceServer?: string;
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server name */
  readonly targetServer?: string;
  /** Result type */
  resultType: "MigrationLevelOutput";
}

export function migrateOracleAzureDbPostgreSqlSyncTaskOutputMigrationLevelDeserializer(
  item: any,
): MigrateOracleAzureDbPostgreSqlSyncTaskOutputMigrationLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    sourceServerVersion: item["sourceServerVersion"],
    sourceServer: item["sourceServer"],
    targetServerVersion: item["targetServerVersion"],
    targetServer: item["targetServer"],
  };
}

/** model interface MigrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseLevel */
export interface MigrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseLevel extends MigrateOracleAzureDbPostgreSqlSyncTaskOutput {
  /** Name of the database */
  readonly databaseName?: string;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Migration state that this database is in */
  readonly migrationState?: SyncDatabaseMigrationReportingState;
  /** Number of incoming changes */
  readonly incomingChanges?: number;
  /** Number of applied changes */
  readonly appliedChanges?: number;
  /** Number of cdc inserts */
  readonly cdcInsertCounter?: number;
  /** Number of cdc deletes */
  readonly cdcDeleteCounter?: number;
  /** Number of cdc updates */
  readonly cdcUpdateCounter?: number;
  /** Number of tables completed in full load */
  readonly fullLoadCompletedTables?: number;
  /** Number of tables loading in full load */
  readonly fullLoadLoadingTables?: number;
  /** Number of tables queued in full load */
  readonly fullLoadQueuedTables?: number;
  /** Number of tables errored in full load */
  readonly fullLoadErroredTables?: number;
  /** Indicates if initial load (full load) has been completed */
  readonly initializationCompleted?: boolean;
  /** CDC apply latency */
  readonly latency?: number;
  /** Result type */
  resultType: "DatabaseLevelOutput";
}

export function migrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseLevelDeserializer(
  item: any,
): MigrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    databaseName: item["databaseName"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    migrationState: item["migrationState"],
    incomingChanges: item["incomingChanges"],
    appliedChanges: item["appliedChanges"],
    cdcInsertCounter: item["cdcInsertCounter"],
    cdcDeleteCounter: item["cdcDeleteCounter"],
    cdcUpdateCounter: item["cdcUpdateCounter"],
    fullLoadCompletedTables: item["fullLoadCompletedTables"],
    fullLoadLoadingTables: item["fullLoadLoadingTables"],
    fullLoadQueuedTables: item["fullLoadQueuedTables"],
    fullLoadErroredTables: item["fullLoadErroredTables"],
    initializationCompleted: item["initializationCompleted"],
    latency: item["latency"],
  };
}

/** model interface MigrateOracleAzureDbPostgreSqlSyncTaskOutputTableLevel */
export interface MigrateOracleAzureDbPostgreSqlSyncTaskOutputTableLevel extends MigrateOracleAzureDbPostgreSqlSyncTaskOutput {
  /** Name of the table */
  readonly tableName?: string;
  /** Name of the database */
  readonly databaseName?: string;
  /** Number of applied inserts */
  readonly cdcInsertCounter?: number;
  /** Number of applied updates */
  readonly cdcUpdateCounter?: number;
  /** Number of applied deletes */
  readonly cdcDeleteCounter?: number;
  /** Estimate to finish full load */
  readonly fullLoadEstFinishTime?: Date;
  /** Full load start time */
  readonly fullLoadStartedOn?: Date;
  /** Full load end time */
  readonly fullLoadEndedOn?: Date;
  /** Number of rows applied in full load */
  readonly fullLoadTotalRows?: number;
  /** Current state of the table migration */
  readonly state?: SyncTableMigrationState;
  /** Total number of applied changes */
  readonly totalChangesApplied?: number;
  /** Number of data errors occurred */
  readonly dataErrorsCounter?: number;
  /** Last modified time on target */
  readonly lastModifiedTime?: Date;
  /** Result type */
  resultType: "TableLevelOutput";
}

export function migrateOracleAzureDbPostgreSqlSyncTaskOutputTableLevelDeserializer(
  item: any,
): MigrateOracleAzureDbPostgreSqlSyncTaskOutputTableLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    tableName: item["tableName"],
    databaseName: item["databaseName"],
    cdcInsertCounter: item["cdcInsertCounter"],
    cdcUpdateCounter: item["cdcUpdateCounter"],
    cdcDeleteCounter: item["cdcDeleteCounter"],
    fullLoadEstFinishTime: !item["fullLoadEstFinishTime"]
      ? item["fullLoadEstFinishTime"]
      : new Date(item["fullLoadEstFinishTime"]),
    fullLoadStartedOn: !item["fullLoadStartedOn"]
      ? item["fullLoadStartedOn"]
      : new Date(item["fullLoadStartedOn"]),
    fullLoadEndedOn: !item["fullLoadEndedOn"]
      ? item["fullLoadEndedOn"]
      : new Date(item["fullLoadEndedOn"]),
    fullLoadTotalRows: item["fullLoadTotalRows"],
    state: item["state"],
    totalChangesApplied: item["totalChangesApplied"],
    dataErrorsCounter: item["dataErrorsCounter"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
  };
}

/** model interface MigrateOracleAzureDbPostgreSqlSyncTaskOutputError */
export interface MigrateOracleAzureDbPostgreSqlSyncTaskOutputError extends MigrateOracleAzureDbPostgreSqlSyncTaskOutput {
  /** Migration error */
  readonly error?: ReportableException;
  /** Result type */
  resultType: "ErrorOutput";
}

export function migrateOracleAzureDbPostgreSqlSyncTaskOutputErrorDeserializer(
  item: any,
): MigrateOracleAzureDbPostgreSqlSyncTaskOutputError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    error: !item["error"] ? item["error"] : reportableExceptionDeserializer(item["error"]),
  };
}

/** model interface MigrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseError */
export interface MigrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseError extends MigrateOracleAzureDbPostgreSqlSyncTaskOutput {
  /** Error message */
  errorMessage?: string;
  /** List of error events. */
  events?: SyncMigrationDatabaseErrorEvent[];
  /** Result type */
  resultType: "DatabaseLevelErrorOutput";
}

export function migrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseErrorDeserializer(
  item: any,
): MigrateOracleAzureDbPostgreSqlSyncTaskOutputDatabaseError {
  return {
    id: item["id"],
    resultType: item["resultType"],
    errorMessage: item["errorMessage"],
    events: !item["events"]
      ? item["events"]
      : syncMigrationDatabaseErrorEventArrayDeserializer(item["events"]),
  };
}

/** Properties for task that validates migration input for SQL to Azure SQL DB sync migrations */
export interface ValidateMigrationInputSqlServerSqlDbSyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ValidateSyncMigrationInputSqlServerTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ValidateSyncMigrationInputSqlServerTaskOutput[];
  /** Task type. */
  taskType: "ValidateMigrationInput.SqlServer.SqlDb.Sync";
}

export function validateMigrationInputSqlServerSqlDbSyncTaskPropertiesSerializer(
  item: ValidateMigrationInputSqlServerSqlDbSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : validateSyncMigrationInputSqlServerTaskInputSerializer(item["input"]),
  };
}

export function validateMigrationInputSqlServerSqlDbSyncTaskPropertiesDeserializer(
  item: any,
): ValidateMigrationInputSqlServerSqlDbSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : validateSyncMigrationInputSqlServerTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : validateSyncMigrationInputSqlServerTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for task that validates migration input for SQL sync migrations */
export interface ValidateSyncMigrationInputSqlServerTaskInput {
  /** Information for connecting to source SQL server */
  sourceConnectionInfo: SqlConnectionInfo;
  /** Information for connecting to target */
  targetConnectionInfo: SqlConnectionInfo;
  /** Databases to migrate */
  selectedDatabases: MigrateSqlServerSqlDbSyncDatabaseInput[];
}

export function validateSyncMigrationInputSqlServerTaskInputSerializer(
  item: ValidateSyncMigrationInputSqlServerTaskInput,
): any {
  return {
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSqlServerSqlDbSyncDatabaseInputArraySerializer(
      item["selectedDatabases"],
    ),
  };
}

export function validateSyncMigrationInputSqlServerTaskInputDeserializer(
  item: any,
): ValidateSyncMigrationInputSqlServerTaskInput {
  return {
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSqlServerSqlDbSyncDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
  };
}

export function validateSyncMigrationInputSqlServerTaskOutputArrayDeserializer(
  result: Array<ValidateSyncMigrationInputSqlServerTaskOutput>,
): any[] {
  return result.map((item) => {
    return validateSyncMigrationInputSqlServerTaskOutputDeserializer(item);
  });
}

/** Output for task that validates migration input for SQL sync migrations */
export interface ValidateSyncMigrationInputSqlServerTaskOutput {
  /** Database identifier */
  readonly id?: string;
  /** Name of database */
  readonly name?: string;
  /** Errors associated with a selected database object */
  readonly validationErrors?: ReportableException[];
}

export function validateSyncMigrationInputSqlServerTaskOutputDeserializer(
  item: any,
): ValidateSyncMigrationInputSqlServerTaskOutput {
  return {
    id: item["id"],
    name: item["name"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for task that validates migration input for SQL to Azure SQL Database Managed Instance */
export interface ValidateMigrationInputSqlServerSqlMITaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ValidateMigrationInputSqlServerSqlMITaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ValidateMigrationInputSqlServerSqlMITaskOutput[];
  /** Task type. */
  taskType: "ValidateMigrationInput.SqlServer.AzureSqlDbMI";
}

export function validateMigrationInputSqlServerSqlMITaskPropertiesSerializer(
  item: ValidateMigrationInputSqlServerSqlMITaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : validateMigrationInputSqlServerSqlMITaskInputSerializer(item["input"]),
  };
}

export function validateMigrationInputSqlServerSqlMITaskPropertiesDeserializer(
  item: any,
): ValidateMigrationInputSqlServerSqlMITaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : validateMigrationInputSqlServerSqlMITaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : validateMigrationInputSqlServerSqlMITaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for task that validates migration input for SQL to Azure SQL Managed Instance */
export interface ValidateMigrationInputSqlServerSqlMITaskInput {
  /** Information for connecting to source */
  sourceConnectionInfo: SqlConnectionInfo;
  /** Information for connecting to target */
  targetConnectionInfo: SqlConnectionInfo;
  /** Databases to migrate */
  selectedDatabases: MigrateSqlServerSqlMIDatabaseInput[];
  /** Logins to migrate */
  selectedLogins?: string[];
  /** Backup file share information for all selected databases. */
  backupFileShare?: FileShare;
  /** SAS URI of Azure Storage Account Container to be used for storing backup files. */
  backupBlobShare: BlobShare;
  /** Backup Mode to specify whether to use existing backup or create new backup. */
  backupMode?: BackupMode;
}

export function validateMigrationInputSqlServerSqlMITaskInputSerializer(
  item: ValidateMigrationInputSqlServerSqlMITaskInput,
): any {
  return {
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSqlServerSqlMIDatabaseInputArraySerializer(item["selectedDatabases"]),
    selectedLogins: !item["selectedLogins"]
      ? item["selectedLogins"]
      : item["selectedLogins"].map((p: any) => {
          return p;
        }),
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareSerializer(item["backupFileShare"]),
    backupBlobShare: blobShareSerializer(item["backupBlobShare"]),
    backupMode: item["backupMode"],
  };
}

export function validateMigrationInputSqlServerSqlMITaskInputDeserializer(
  item: any,
): ValidateMigrationInputSqlServerSqlMITaskInput {
  return {
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    selectedDatabases: migrateSqlServerSqlMIDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
    selectedLogins: !item["selectedLogins"]
      ? item["selectedLogins"]
      : item["selectedLogins"].map((p: any) => {
          return p;
        }),
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareDeserializer(item["backupFileShare"]),
    backupBlobShare: blobShareDeserializer(item["backupBlobShare"]),
    backupMode: item["backupMode"],
  };
}

export function validateMigrationInputSqlServerSqlMITaskOutputArrayDeserializer(
  result: Array<ValidateMigrationInputSqlServerSqlMITaskOutput>,
): any[] {
  return result.map((item) => {
    return validateMigrationInputSqlServerSqlMITaskOutputDeserializer(item);
  });
}

/** Output for task that validates migration input for SQL to Azure SQL Managed Instance migrations */
export interface ValidateMigrationInputSqlServerSqlMITaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Name of database */
  readonly name?: string;
  /** Errors associated with the RestoreDatabaseName */
  readonly restoreDatabaseNameErrors?: ReportableException[];
  /** Errors associated with the BackupFolder path */
  readonly backupFolderErrors?: ReportableException[];
  /** Errors associated with backup share user name and password credentials */
  readonly backupShareCredentialsErrors?: ReportableException[];
  /** Errors associated with the storage account provided. */
  readonly backupStorageAccountErrors?: ReportableException[];
  /** Errors associated with existing backup files. */
  readonly existingBackupErrors?: ReportableException[];
  /** Information about backup files when existing backup mode is used. */
  databaseBackupInfo?: DatabaseBackupInfo;
}

export function validateMigrationInputSqlServerSqlMITaskOutputDeserializer(
  item: any,
): ValidateMigrationInputSqlServerSqlMITaskOutput {
  return {
    id: item["id"],
    name: item["name"],
    restoreDatabaseNameErrors: !item["restoreDatabaseNameErrors"]
      ? item["restoreDatabaseNameErrors"]
      : reportableExceptionArrayDeserializer(item["restoreDatabaseNameErrors"]),
    backupFolderErrors: !item["backupFolderErrors"]
      ? item["backupFolderErrors"]
      : reportableExceptionArrayDeserializer(item["backupFolderErrors"]),
    backupShareCredentialsErrors: !item["backupShareCredentialsErrors"]
      ? item["backupShareCredentialsErrors"]
      : reportableExceptionArrayDeserializer(item["backupShareCredentialsErrors"]),
    backupStorageAccountErrors: !item["backupStorageAccountErrors"]
      ? item["backupStorageAccountErrors"]
      : reportableExceptionArrayDeserializer(item["backupStorageAccountErrors"]),
    existingBackupErrors: !item["existingBackupErrors"]
      ? item["existingBackupErrors"]
      : reportableExceptionArrayDeserializer(item["existingBackupErrors"]),
    databaseBackupInfo: !item["databaseBackupInfo"]
      ? item["databaseBackupInfo"]
      : databaseBackupInfoDeserializer(item["databaseBackupInfo"]),
  };
}

/** Information about backup files when existing backup mode is used. */
export interface DatabaseBackupInfo {
  /** Database name. */
  readonly databaseName?: string;
  /** Backup Type. */
  readonly backupType?: BackupType;
  /** The list of backup files for the current database. */
  readonly backupFiles?: string[];
  /** Position of current database backup in the file. */
  readonly position?: number;
  /** Database was damaged when backed up, but the backup operation was requested to continue despite errors. */
  readonly isDamaged?: boolean;
  /** Whether the backup set is compressed */
  readonly isCompressed?: boolean;
  /** Number of files in the backup set. */
  readonly familyCount?: number;
  /** Date and time when the backup operation finished. */
  readonly backupFinishDate?: Date;
}

export function databaseBackupInfoDeserializer(item: any): DatabaseBackupInfo {
  return {
    databaseName: item["databaseName"],
    backupType: item["backupType"],
    backupFiles: !item["backupFiles"]
      ? item["backupFiles"]
      : item["backupFiles"].map((p: any) => {
          return p;
        }),
    position: item["position"],
    isDamaged: item["isDamaged"],
    isCompressed: item["isCompressed"],
    familyCount: item["familyCount"],
    backupFinishDate: !item["backupFinishDate"]
      ? item["backupFinishDate"]
      : new Date(item["backupFinishDate"]),
  };
}

/** Properties for task that validates migration input for SQL to Azure SQL Database Managed Instance sync scenario */
export interface ValidateMigrationInputSqlServerSqlMISyncTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: ValidateMigrationInputSqlServerSqlMISyncTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: ValidateMigrationInputSqlServerSqlMISyncTaskOutput[];
  /** Task type. */
  taskType: "ValidateMigrationInput.SqlServer.AzureSqlDbMI.Sync.LRS";
}

export function validateMigrationInputSqlServerSqlMISyncTaskPropertiesSerializer(
  item: ValidateMigrationInputSqlServerSqlMISyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : validateMigrationInputSqlServerSqlMISyncTaskInputSerializer(item["input"]),
  };
}

export function validateMigrationInputSqlServerSqlMISyncTaskPropertiesDeserializer(
  item: any,
): ValidateMigrationInputSqlServerSqlMISyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : validateMigrationInputSqlServerSqlMISyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : validateMigrationInputSqlServerSqlMISyncTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for task that migrates SQL Server databases to Azure SQL Database Managed Instance online scenario. */
export interface ValidateMigrationInputSqlServerSqlMISyncTaskInput extends SqlServerSqlMISyncTaskInput {}

export function validateMigrationInputSqlServerSqlMISyncTaskInputSerializer(
  item: ValidateMigrationInputSqlServerSqlMISyncTaskInput,
): any {
  return {
    selectedDatabases: migrateSqlServerSqlMIDatabaseInputArraySerializer(item["selectedDatabases"]),
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareSerializer(item["backupFileShare"]),
    storageResourceId: item["storageResourceId"],
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: miSqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    azureApp: azureActiveDirectoryAppSerializer(item["azureApp"]),
  };
}

export function validateMigrationInputSqlServerSqlMISyncTaskInputDeserializer(
  item: any,
): ValidateMigrationInputSqlServerSqlMISyncTaskInput {
  return {
    selectedDatabases: migrateSqlServerSqlMIDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareDeserializer(item["backupFileShare"]),
    storageResourceId: item["storageResourceId"],
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: miSqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    azureApp: azureActiveDirectoryAppDeserializer(item["azureApp"]),
  };
}

export function validateMigrationInputSqlServerSqlMISyncTaskOutputArrayDeserializer(
  result: Array<ValidateMigrationInputSqlServerSqlMISyncTaskOutput>,
): any[] {
  return result.map((item) => {
    return validateMigrationInputSqlServerSqlMISyncTaskOutputDeserializer(item);
  });
}

/** Output for task that validates migration input for Azure SQL Database Managed Instance online migration */
export interface ValidateMigrationInputSqlServerSqlMISyncTaskOutput {
  /** Database identifier */
  readonly id?: string;
  /** Name of database */
  readonly name?: string;
  /** Errors associated with a selected database object */
  readonly validationErrors?: ReportableException[];
}

export function validateMigrationInputSqlServerSqlMISyncTaskOutputDeserializer(
  item: any,
): ValidateMigrationInputSqlServerSqlMISyncTaskOutput {
  return {
    id: item["id"],
    name: item["name"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that validates a migration between MongoDB data sources */
export interface ValidateMongoDbTaskProperties extends ProjectTaskProperties {
  /** Describes how a MongoDB data migration should be performed */
  input?: MongoDbMigrationSettings;
  /** An array containing a single MongoDbMigrationProgress object */
  readonly output?: MongoDbMigrationProgress[];
  /** Task type. */
  taskType: "Validate.MongoDb";
}

export function validateMongoDbTaskPropertiesSerializer(item: ValidateMongoDbTaskProperties): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : mongoDbMigrationSettingsSerializer(item["input"]),
  };
}

export function validateMongoDbTaskPropertiesDeserializer(
  item: any,
): ValidateMongoDbTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"] ? item["input"] : mongoDbMigrationSettingsDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : mongoDbMigrationProgressArrayDeserializer(item["output"]),
  };
}

export function mongoDbMigrationProgressArrayDeserializer(
  result: Array<MongoDbMigrationProgress>,
): any[] {
  return result.map((item) => {
    return mongoDbMigrationProgressDeserializer(item);
  });
}

/** Properties for the task that validates a migration for Oracle to Azure Database for PostgreSQL for online migrations */
export interface ValidateOracleAzureDbForPostgreSqlSyncTaskProperties extends ProjectTaskProperties {
  /** Input for the task that migrates Oracle databases to Azure Database for PostgreSQL for online migrations */
  input?: MigrateOracleAzureDbPostgreSqlSyncTaskInput;
  /** An array containing a single validation error response object */
  readonly output?: ValidateOracleAzureDbPostgreSqlSyncTaskOutput[];
  /** Task type. */
  taskType: "Validate.Oracle.AzureDbPostgreSql.Sync";
}

export function validateOracleAzureDbForPostgreSqlSyncTaskPropertiesSerializer(
  item: ValidateOracleAzureDbForPostgreSqlSyncTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"]
      ? item["input"]
      : migrateOracleAzureDbPostgreSqlSyncTaskInputSerializer(item["input"]),
  };
}

export function validateOracleAzureDbForPostgreSqlSyncTaskPropertiesDeserializer(
  item: any,
): ValidateOracleAzureDbForPostgreSqlSyncTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : migrateOracleAzureDbPostgreSqlSyncTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : validateOracleAzureDbPostgreSqlSyncTaskOutputArrayDeserializer(item["output"]),
  };
}

export function validateOracleAzureDbPostgreSqlSyncTaskOutputArrayDeserializer(
  result: Array<ValidateOracleAzureDbPostgreSqlSyncTaskOutput>,
): any[] {
  return result.map((item) => {
    return validateOracleAzureDbPostgreSqlSyncTaskOutputDeserializer(item);
  });
}

/** Output for task that validates migration input for Oracle to Azure Database for PostgreSQL for online migrations */
export interface ValidateOracleAzureDbPostgreSqlSyncTaskOutput {
  /** Errors associated with a selected database object */
  readonly validationErrors?: ReportableException[];
}

export function validateOracleAzureDbPostgreSqlSyncTaskOutputDeserializer(
  item: any,
): ValidateOracleAzureDbPostgreSqlSyncTaskOutput {
  return {
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for the task that gets TDE certificates in Base64 encoded format. */
export interface GetTdeCertificatesSqlTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: GetTdeCertificatesSqlTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: GetTdeCertificatesSqlTaskOutput[];
  /** Task type. */
  taskType: "GetTDECertificates.Sql";
}

export function getTdeCertificatesSqlTaskPropertiesSerializer(
  item: GetTdeCertificatesSqlTaskProperties,
): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : getTdeCertificatesSqlTaskInputSerializer(item["input"]),
  };
}

export function getTdeCertificatesSqlTaskPropertiesDeserializer(
  item: any,
): GetTdeCertificatesSqlTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"]
      ? item["input"]
      : getTdeCertificatesSqlTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : getTdeCertificatesSqlTaskOutputArrayDeserializer(item["output"]),
  };
}

/** Input for the task that gets TDE certificates in Base64 encoded format. */
export interface GetTdeCertificatesSqlTaskInput {
  /** Connection information for SQL Server */
  connectionInfo: SqlConnectionInfo;
  /** Backup file share information for file share to be used for temporarily storing files. */
  backupFileShare: FileShare;
  /** List containing certificate names and corresponding password to use for encrypting the exported certificate. */
  selectedCertificates: SelectedCertificateInput[];
}

export function getTdeCertificatesSqlTaskInputSerializer(
  item: GetTdeCertificatesSqlTaskInput,
): any {
  return {
    connectionInfo: sqlConnectionInfoSerializer(item["connectionInfo"]),
    backupFileShare: fileShareSerializer(item["backupFileShare"]),
    selectedCertificates: selectedCertificateInputArraySerializer(item["selectedCertificates"]),
  };
}

export function getTdeCertificatesSqlTaskInputDeserializer(
  item: any,
): GetTdeCertificatesSqlTaskInput {
  return {
    connectionInfo: sqlConnectionInfoDeserializer(item["connectionInfo"]),
    backupFileShare: fileShareDeserializer(item["backupFileShare"]),
    selectedCertificates: selectedCertificateInputArrayDeserializer(item["selectedCertificates"]),
  };
}

export function selectedCertificateInputArraySerializer(
  result: Array<SelectedCertificateInput>,
): any[] {
  return result.map((item) => {
    return selectedCertificateInputSerializer(item);
  });
}

export function selectedCertificateInputArrayDeserializer(
  result: Array<SelectedCertificateInput>,
): any[] {
  return result.map((item) => {
    return selectedCertificateInputDeserializer(item);
  });
}

/** Info for certificate to be exported for TDE enabled databases. */
export interface SelectedCertificateInput {
  /** Name of certificate to be exported. */
  certificateName: string;
  /** Password to use for encrypting the exported certificate. */
  password: string;
}

export function selectedCertificateInputSerializer(item: SelectedCertificateInput): any {
  return { certificateName: item["certificateName"], password: item["password"] };
}

export function selectedCertificateInputDeserializer(item: any): SelectedCertificateInput {
  return {
    certificateName: item["certificateName"],
    password: item["password"],
  };
}

export function getTdeCertificatesSqlTaskOutputArrayDeserializer(
  result: Array<GetTdeCertificatesSqlTaskOutput>,
): any[] {
  return result.map((item) => {
    return getTdeCertificatesSqlTaskOutputDeserializer(item);
  });
}

/** Output of the task that gets TDE certificates in Base64 encoded format. */
export interface GetTdeCertificatesSqlTaskOutput {
  /** Mapping from certificate name to base 64 encoded format. */
  readonly base64EncodedCertificates?: string;
  /** Validation errors */
  readonly validationErrors?: ReportableException[];
}

export function getTdeCertificatesSqlTaskOutputDeserializer(
  item: any,
): GetTdeCertificatesSqlTaskOutput {
  return {
    base64EncodedCertificates: item["base64EncodedCertificates"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : reportableExceptionArrayDeserializer(item["validationErrors"]),
  };
}

/** Properties for task that migrates SSIS packages from SQL Server databases to Azure SQL Database Managed Instance. */
export interface MigrateSsisTaskProperties extends ProjectTaskProperties {
  /** Task input */
  input?: MigrateSsisTaskInput;
  /** Task output. This is ignored if submitted. */
  readonly output?: MigrateSsisTaskOutputUnion[];
  /** Task type. */
  taskType: "Migrate.Ssis";
}

export function migrateSsisTaskPropertiesSerializer(item: MigrateSsisTaskProperties): any {
  return {
    taskType: item["taskType"],
    clientData: item["clientData"],
    input: !item["input"] ? item["input"] : migrateSsisTaskInputSerializer(item["input"]),
  };
}

export function migrateSsisTaskPropertiesDeserializer(item: any): MigrateSsisTaskProperties {
  return {
    taskType: item["taskType"],
    errors: !item["errors"] ? item["errors"] : oDataErrorArrayDeserializer(item["errors"]),
    state: item["state"],
    commands: !item["commands"]
      ? item["commands"]
      : commandPropertiesUnionArrayDeserializer(item["commands"]),
    clientData: !item["clientData"]
      ? item["clientData"]
      : Object.fromEntries(
          Object.entries(item["clientData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    input: !item["input"] ? item["input"] : migrateSsisTaskInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : migrateSsisTaskOutputUnionArrayDeserializer(item["output"]),
  };
}

/** Input for task that migrates SSIS packages from SQL Server to Azure SQL Database Managed Instance. */
export interface MigrateSsisTaskInput extends SqlMigrationTaskInput {
  /** SSIS package migration information. */
  ssisMigrationInfo: SsisMigrationInfo;
}

export function migrateSsisTaskInputSerializer(item: MigrateSsisTaskInput): any {
  return {
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    ssisMigrationInfo: ssisMigrationInfoSerializer(item["ssisMigrationInfo"]),
  };
}

export function migrateSsisTaskInputDeserializer(item: any): MigrateSsisTaskInput {
  return {
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    ssisMigrationInfo: ssisMigrationInfoDeserializer(item["ssisMigrationInfo"]),
  };
}

/** SSIS migration info with SSIS store type, overwrite policy. */
export interface SsisMigrationInfo {
  /** The SSIS store type of source, only SSIS catalog is supported now in DMS (classic) */
  ssisStoreType?: SsisStoreType;
  /** The overwrite option for the SSIS project migration */
  projectOverwriteOption?: SsisMigrationOverwriteOption;
  /** The overwrite option for the SSIS environment migration */
  environmentOverwriteOption?: SsisMigrationOverwriteOption;
}

export function ssisMigrationInfoSerializer(item: SsisMigrationInfo): any {
  return {
    ssisStoreType: item["ssisStoreType"],
    projectOverwriteOption: item["projectOverwriteOption"],
    environmentOverwriteOption: item["environmentOverwriteOption"],
  };
}

export function ssisMigrationInfoDeserializer(item: any): SsisMigrationInfo {
  return {
    ssisStoreType: item["ssisStoreType"],
    projectOverwriteOption: item["projectOverwriteOption"],
    environmentOverwriteOption: item["environmentOverwriteOption"],
  };
}

/** An enumeration of supported source SSIS store type in DMS (classic) */
export enum KnownSsisStoreType {
  /** SsisCatalog */
  SsisCatalog = "SsisCatalog",
}

/**
 * An enumeration of supported source SSIS store type in DMS (classic) \
 * {@link KnownSsisStoreType} can be used interchangeably with SsisStoreType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SsisCatalog**: SsisCatalog
 */
export type SsisStoreType = string;

/** The overwrite option for SSIS object migration, only ignore and overwrite are supported in DMS (classic) now and future may add Reuse option for container object */
export enum KnownSsisMigrationOverwriteOption {
  /** Ignore */
  Ignore = "Ignore",
  /** Overwrite */
  Overwrite = "Overwrite",
}

/**
 * The overwrite option for SSIS object migration, only ignore and overwrite are supported in DMS (classic) now and future may add Reuse option for container object \
 * {@link KnownSsisMigrationOverwriteOption} can be used interchangeably with SsisMigrationOverwriteOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ignore**: Ignore \
 * **Overwrite**: Overwrite
 */
export type SsisMigrationOverwriteOption = string;

export function migrateSsisTaskOutputUnionArrayDeserializer(
  result: Array<MigrateSsisTaskOutputUnion>,
): any[] {
  return result.map((item) => {
    return migrateSsisTaskOutputUnionDeserializer(item);
  });
}

/** Output for task that migrates SSIS packages from SQL Server to Azure SQL Database Managed Instance. */
export interface MigrateSsisTaskOutput {
  /** Result identifier */
  readonly id?: string;
  /** Result type */
  /** The discriminator possible values: MigrationLevelOutput, SsisProjectLevelOutput */
  resultType: string;
}

export function migrateSsisTaskOutputDeserializer(item: any): MigrateSsisTaskOutput {
  return {
    id: item["id"],
    resultType: item["resultType"],
  };
}

/** Alias for MigrateSsisTaskOutputUnion */
export type MigrateSsisTaskOutputUnion =
  | MigrateSsisTaskOutputMigrationLevel
  | MigrateSsisTaskOutputProjectLevel
  | MigrateSsisTaskOutput;

export function migrateSsisTaskOutputUnionDeserializer(item: any): MigrateSsisTaskOutputUnion {
  switch (item["resultType"]) {
    case "MigrationLevelOutput":
      return migrateSsisTaskOutputMigrationLevelDeserializer(
        item as MigrateSsisTaskOutputMigrationLevel,
      );

    case "SsisProjectLevelOutput":
      return migrateSsisTaskOutputProjectLevelDeserializer(
        item as MigrateSsisTaskOutputProjectLevel,
      );

    default:
      return migrateSsisTaskOutputDeserializer(item);
  }
}

/** model interface MigrateSsisTaskOutputMigrationLevel */
export interface MigrateSsisTaskOutputMigrationLevel extends MigrateSsisTaskOutput {
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Current status of migration */
  readonly status?: MigrationStatus;
  /** Migration progress message */
  readonly message?: string;
  /** Source server version */
  readonly sourceServerVersion?: string;
  /** Source server brand version */
  readonly sourceServerBrandVersion?: string;
  /** Target server version */
  readonly targetServerVersion?: string;
  /** Target server brand version */
  readonly targetServerBrandVersion?: string;
  /** Migration exceptions and warnings. */
  readonly exceptionsAndWarnings?: ReportableException[];
  /** Stage of SSIS migration. */
  readonly stage?: SsisMigrationStage;
  /** Result type */
  resultType: "MigrationLevelOutput";
}

export function migrateSsisTaskOutputMigrationLevelDeserializer(
  item: any,
): MigrateSsisTaskOutputMigrationLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    status: item["status"],
    message: item["message"],
    sourceServerVersion: item["sourceServerVersion"],
    sourceServerBrandVersion: item["sourceServerBrandVersion"],
    targetServerVersion: item["targetServerVersion"],
    targetServerBrandVersion: item["targetServerBrandVersion"],
    exceptionsAndWarnings: !item["exceptionsAndWarnings"]
      ? item["exceptionsAndWarnings"]
      : reportableExceptionArrayDeserializer(item["exceptionsAndWarnings"]),
    stage: item["stage"],
  };
}

/** Current stage of SSIS migration */
export enum KnownSsisMigrationStage {
  /** None */
  None = "None",
  /** Initialize */
  Initialize = "Initialize",
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
}

/**
 * Current stage of SSIS migration \
 * {@link KnownSsisMigrationStage} can be used interchangeably with SsisMigrationStage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Initialize**: Initialize \
 * **InProgress**: InProgress \
 * **Completed**: Completed
 */
export type SsisMigrationStage = string;

/** model interface MigrateSsisTaskOutputProjectLevel */
export interface MigrateSsisTaskOutputProjectLevel extends MigrateSsisTaskOutput {
  /** Name of the folder */
  readonly folderName?: string;
  /** Name of the project */
  readonly projectName?: string;
  /** Current state of migration */
  readonly state?: MigrationState;
  /** Stage of SSIS migration. */
  readonly stage?: SsisMigrationStage;
  /** Migration start time */
  readonly startedOn?: Date;
  /** Migration end time */
  readonly endedOn?: Date;
  /** Migration progress message */
  readonly message?: string;
  /** Migration exceptions and warnings */
  readonly exceptionsAndWarnings?: ReportableException[];
  /** Result type */
  resultType: "SsisProjectLevelOutput";
}

export function migrateSsisTaskOutputProjectLevelDeserializer(
  item: any,
): MigrateSsisTaskOutputProjectLevel {
  return {
    id: item["id"],
    resultType: item["resultType"],
    folderName: item["folderName"],
    projectName: item["projectName"],
    state: item["state"],
    stage: item["stage"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    message: item["message"],
    exceptionsAndWarnings: !item["exceptionsAndWarnings"]
      ? item["exceptionsAndWarnings"]
      : reportableExceptionArrayDeserializer(item["exceptionsAndWarnings"]),
  };
}

/** Base class for migration task input */
export interface SqlMigrationTaskInput {
  /** Information for connecting to source */
  sourceConnectionInfo: SqlConnectionInfo;
  /** Information for connecting to target */
  targetConnectionInfo: SqlConnectionInfo;
}

export function sqlMigrationTaskInputSerializer(item: SqlMigrationTaskInput): any {
  return {
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoSerializer(item["targetConnectionInfo"]),
  };
}

export function sqlMigrationTaskInputDeserializer(item: any): SqlMigrationTaskInput {
  return {
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: sqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
  };
}

/** Defines the connection properties of a server */
export interface ConnectionInfo {
  /** Type of connection info */
  /** The discriminator possible values: MongoDbConnectionInfo, SqlConnectionInfo, MySqlConnectionInfo, OracleConnectionInfo, PostgreSqlConnectionInfo, MiSqlConnectionInfo */
  type: string;
  /** User name */
  userName?: string;
  /** Password credential. */
  password?: string;
}

export function connectionInfoSerializer(item: ConnectionInfo): any {
  return { type: item["type"], userName: item["userName"], password: item["password"] };
}

export function connectionInfoDeserializer(item: any): ConnectionInfo {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
  };
}

/** Alias for ConnectionInfoUnion */
export type ConnectionInfoUnion =
  | MongoDbConnectionInfo
  | SqlConnectionInfo
  | MySqlConnectionInfo
  | OracleConnectionInfo
  | PostgreSqlConnectionInfo
  | MiSqlConnectionInfo
  | ConnectionInfo;

export function connectionInfoUnionSerializer(item: ConnectionInfoUnion): any {
  switch (item.type) {
    case "MongoDbConnectionInfo":
      return mongoDbConnectionInfoSerializer(item as MongoDbConnectionInfo);

    case "SqlConnectionInfo":
      return sqlConnectionInfoSerializer(item as SqlConnectionInfo);

    case "MySqlConnectionInfo":
      return mySqlConnectionInfoSerializer(item as MySqlConnectionInfo);

    case "OracleConnectionInfo":
      return oracleConnectionInfoSerializer(item as OracleConnectionInfo);

    case "PostgreSqlConnectionInfo":
      return postgreSqlConnectionInfoSerializer(item as PostgreSqlConnectionInfo);

    case "MiSqlConnectionInfo":
      return miSqlConnectionInfoSerializer(item as MiSqlConnectionInfo);

    default:
      return connectionInfoSerializer(item);
  }
}

export function connectionInfoUnionDeserializer(item: any): ConnectionInfoUnion {
  switch (item["type"]) {
    case "MongoDbConnectionInfo":
      return mongoDbConnectionInfoDeserializer(item as MongoDbConnectionInfo);

    case "SqlConnectionInfo":
      return sqlConnectionInfoDeserializer(item as SqlConnectionInfo);

    case "MySqlConnectionInfo":
      return mySqlConnectionInfoDeserializer(item as MySqlConnectionInfo);

    case "OracleConnectionInfo":
      return oracleConnectionInfoDeserializer(item as OracleConnectionInfo);

    case "PostgreSqlConnectionInfo":
      return postgreSqlConnectionInfoDeserializer(item as PostgreSqlConnectionInfo);

    case "MiSqlConnectionInfo":
      return miSqlConnectionInfoDeserializer(item as MiSqlConnectionInfo);

    default:
      return connectionInfoDeserializer(item);
  }
}

/** Describes a database or collection within a MongoDB data source */
export interface MongoDbObjectInfo {
  /** The average document size, or -1 if the average size is unknown */
  averageDocumentSize: number;
  /** The estimated total data size, in bytes, or -1 if the size is unknown. */
  dataSize: number;
  /** The estimated total number of documents, or -1 if the document count is unknown */
  documentCount: number;
  /** The unqualified name of the database or collection */
  name: string;
  /** The qualified name of the database or collection. For a collection, this is the database-qualified name. */
  qualifiedName: string;
}

export function mongoDbObjectInfoDeserializer(item: any): MongoDbObjectInfo {
  return {
    averageDocumentSize: item["averageDocumentSize"],
    dataSize: item["dataSize"],
    documentCount: item["documentCount"],
    name: item["name"],
    qualifiedName: item["qualifiedName"],
  };
}

/** Input for task that migrates SQL Server databases to Azure SQL Database Managed Instance online scenario. */
export interface SqlServerSqlMISyncTaskInput {
  /** Databases to migrate */
  selectedDatabases: MigrateSqlServerSqlMIDatabaseInput[];
  /** Backup file share information for all selected databases. */
  backupFileShare?: FileShare;
  /** Fully qualified resourceId of storage */
  storageResourceId: string;
  /** Connection information for source SQL Server */
  sourceConnectionInfo: SqlConnectionInfo;
  /** Connection information for Azure SQL Database Managed Instance */
  targetConnectionInfo: MiSqlConnectionInfo;
  /** Azure Active Directory Application the DMS (classic) instance will use to connect to the target instance of Azure SQL Database Managed Instance and the Azure Storage Account */
  azureApp: AzureActiveDirectoryApp;
}

export function sqlServerSqlMISyncTaskInputSerializer(item: SqlServerSqlMISyncTaskInput): any {
  return {
    selectedDatabases: migrateSqlServerSqlMIDatabaseInputArraySerializer(item["selectedDatabases"]),
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareSerializer(item["backupFileShare"]),
    storageResourceId: item["storageResourceId"],
    sourceConnectionInfo: sqlConnectionInfoSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: miSqlConnectionInfoSerializer(item["targetConnectionInfo"]),
    azureApp: azureActiveDirectoryAppSerializer(item["azureApp"]),
  };
}

export function sqlServerSqlMISyncTaskInputDeserializer(item: any): SqlServerSqlMISyncTaskInput {
  return {
    selectedDatabases: migrateSqlServerSqlMIDatabaseInputArrayDeserializer(
      item["selectedDatabases"],
    ),
    backupFileShare: !item["backupFileShare"]
      ? item["backupFileShare"]
      : fileShareDeserializer(item["backupFileShare"]),
    storageResourceId: item["storageResourceId"],
    sourceConnectionInfo: sqlConnectionInfoDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: miSqlConnectionInfoDeserializer(item["targetConnectionInfo"]),
    azureApp: azureActiveDirectoryAppDeserializer(item["azureApp"]),
  };
}

/** Error information. */
export interface ApiError {
  /** Error information in OData format */
  error?: ODataError;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
}

export function apiErrorDeserializer(item: any): ApiError {
  return {
    error: !item["error"] ? item["error"] : oDataErrorDeserializer(item["error"]),
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** OData page of tasks */
export interface _TaskList {
  /** The ProjectTask items on this page */
  value: ProjectTask[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _taskListDeserializer(item: any): _TaskList {
  return {
    value: projectTaskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function projectTaskArraySerializer(result: Array<ProjectTask>): any[] {
  return result.map((item) => {
    return projectTaskSerializer(item);
  });
}

export function projectTaskArrayDeserializer(result: Array<ProjectTask>): any[] {
  return result.map((item) => {
    return projectTaskDeserializer(item);
  });
}

/** A project resource */
export interface Project extends ProxyResource {
  /** HTTP strong entity tag value. This is ignored if submitted. */
  etag?: string;
  location?: string;
  tags?: Record<string, string>;
  /** Source platform for the project */
  sourcePlatform?: ProjectSourcePlatform;
  /** Field that defines the Azure active directory application info, used to connect to the target Azure resource */
  azureAuthenticationInfo?: AzureActiveDirectoryApp;
  /** Target platform for the project */
  targetPlatform?: ProjectTargetPlatform;
  /** UTC Date and time when project was created */
  readonly creationTime?: Date;
  /** Information for connecting to source */
  sourceConnectionInfo?: ConnectionInfoUnion;
  /** Information for connecting to target */
  targetConnectionInfo?: ConnectionInfoUnion;
  /** List of DatabaseInfo */
  databasesInfo?: DatabaseInfo[];
  /** The project's provisioning state */
  readonly provisioningState?: ProjectProvisioningState;
}

export function projectSerializer(item: Project): any {
  return {
    properties: areAllPropsUndefined(item, [
      "sourcePlatform",
      "azureAuthenticationInfo",
      "targetPlatform",
      "sourceConnectionInfo",
      "targetConnectionInfo",
      "databasesInfo",
    ])
      ? undefined
      : _projectPropertiesSerializer(item),
    etag: item["etag"],
    location: item["location"],
    tags: item["tags"],
  };
}

export function projectDeserializer(item: any): Project {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _projectPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Project-specific properties */
export interface ProjectProperties {
  /** Source platform for the project */
  sourcePlatform: ProjectSourcePlatform;
  /** Field that defines the Azure active directory application info, used to connect to the target Azure resource */
  azureAuthenticationInfo?: AzureActiveDirectoryApp;
  /** Target platform for the project */
  targetPlatform: ProjectTargetPlatform;
  /** UTC Date and time when project was created */
  readonly creationTime?: Date;
  /** Information for connecting to source */
  sourceConnectionInfo?: ConnectionInfoUnion;
  /** Information for connecting to target */
  targetConnectionInfo?: ConnectionInfoUnion;
  /** List of DatabaseInfo */
  databasesInfo?: DatabaseInfo[];
  /** The project's provisioning state */
  readonly provisioningState?: ProjectProvisioningState;
}

export function projectPropertiesSerializer(item: ProjectProperties): any {
  return {
    sourcePlatform: item["sourcePlatform"],
    azureAuthenticationInfo: !item["azureAuthenticationInfo"]
      ? item["azureAuthenticationInfo"]
      : azureActiveDirectoryAppSerializer(item["azureAuthenticationInfo"]),
    targetPlatform: item["targetPlatform"],
    sourceConnectionInfo: !item["sourceConnectionInfo"]
      ? item["sourceConnectionInfo"]
      : connectionInfoUnionSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: !item["targetConnectionInfo"]
      ? item["targetConnectionInfo"]
      : connectionInfoUnionSerializer(item["targetConnectionInfo"]),
    databasesInfo: !item["databasesInfo"]
      ? item["databasesInfo"]
      : databaseInfoArraySerializer(item["databasesInfo"]),
  };
}

export function projectPropertiesDeserializer(item: any): ProjectProperties {
  return {
    sourcePlatform: item["sourcePlatform"],
    azureAuthenticationInfo: !item["azureAuthenticationInfo"]
      ? item["azureAuthenticationInfo"]
      : azureActiveDirectoryAppDeserializer(item["azureAuthenticationInfo"]),
    targetPlatform: item["targetPlatform"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    sourceConnectionInfo: !item["sourceConnectionInfo"]
      ? item["sourceConnectionInfo"]
      : connectionInfoUnionDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: !item["targetConnectionInfo"]
      ? item["targetConnectionInfo"]
      : connectionInfoUnionDeserializer(item["targetConnectionInfo"]),
    databasesInfo: !item["databasesInfo"]
      ? item["databasesInfo"]
      : databaseInfoArrayDeserializer(item["databasesInfo"]),
    provisioningState: item["provisioningState"],
  };
}

/** Source platform of the project */
export enum KnownProjectSourcePlatform {
  /** SQL */
  SQL = "SQL",
  /** MySQL */
  MySQL = "MySQL",
  /** PostgreSql */
  PostgreSql = "PostgreSql",
  /** MongoDb */
  MongoDb = "MongoDb",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Source platform of the project \
 * {@link KnownProjectSourcePlatform} can be used interchangeably with ProjectSourcePlatform,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SQL**: SQL \
 * **MySQL**: MySQL \
 * **PostgreSql**: PostgreSql \
 * **MongoDb**: MongoDb \
 * **Unknown**: Unknown
 */
export type ProjectSourcePlatform = string;

/** Target platform of the project */
export enum KnownProjectTargetPlatform {
  /** SQLDB */
  Sqldb = "SQLDB",
  /** SQLMI */
  Sqlmi = "SQLMI",
  /** AzureDbForMySql */
  AzureDbForMySql = "AzureDbForMySql",
  /** AzureDbForPostgreSql */
  AzureDbForPostgreSql = "AzureDbForPostgreSql",
  /** MongoDb */
  MongoDb = "MongoDb",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Target platform of the project \
 * {@link KnownProjectTargetPlatform} can be used interchangeably with ProjectTargetPlatform,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SQLDB**: SQLDB \
 * **SQLMI**: SQLMI \
 * **AzureDbForMySql**: AzureDbForMySql \
 * **AzureDbForPostgreSql**: AzureDbForPostgreSql \
 * **MongoDb**: MongoDb \
 * **Unknown**: Unknown
 */
export type ProjectTargetPlatform = string;

export function databaseInfoArraySerializer(result: Array<DatabaseInfo>): any[] {
  return result.map((item) => {
    return databaseInfoSerializer(item);
  });
}

export function databaseInfoArrayDeserializer(result: Array<DatabaseInfo>): any[] {
  return result.map((item) => {
    return databaseInfoDeserializer(item);
  });
}

/** Project Database Details */
export interface DatabaseInfo {
  /** Name of the database */
  sourceDatabaseName: string;
}

export function databaseInfoSerializer(item: DatabaseInfo): any {
  return { sourceDatabaseName: item["sourceDatabaseName"] };
}

export function databaseInfoDeserializer(item: any): DatabaseInfo {
  return {
    sourceDatabaseName: item["sourceDatabaseName"],
  };
}

/** The project's provisioning state */
export enum KnownProjectProvisioningState {
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
}

/**
 * The project's provisioning state \
 * {@link KnownProjectProvisioningState} can be used interchangeably with ProjectProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded
 */
export type ProjectProvisioningState = string;

/** OData page of project resources */
export interface _ProjectList {
  /** The Project items on this page */
  value: Project[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _projectListDeserializer(item: any): _ProjectList {
  return {
    value: projectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function projectArraySerializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectSerializer(item);
  });
}

export function projectArrayDeserializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectDeserializer(item);
  });
}

/** Database Migration Resource for SQL Database. */
export interface DatabaseMigrationSqlDb extends ProxyResource {
  /** Database Migration Resource properties for SQL database. */
  properties?: DatabaseMigrationPropertiesSqlDb;
}

export function databaseMigrationSqlDbSerializer(item: DatabaseMigrationSqlDb): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : databaseMigrationPropertiesSqlDbSerializer(item["properties"]),
  };
}

export function databaseMigrationSqlDbDeserializer(item: any): DatabaseMigrationSqlDb {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : databaseMigrationPropertiesSqlDbDeserializer(item["properties"]),
  };
}

/** Migration Operation Input */
export interface MigrationOperationInput {
  /** ID tracking migration operation. */
  migrationOperationId?: string;
}

export function migrationOperationInputSerializer(item: MigrationOperationInput): any {
  return { migrationOperationId: item["migrationOperationId"] };
}

/** Database Migration Resource for SQL Managed Instance. */
export interface DatabaseMigrationSqlMi extends ProxyResource {
  /** Database Migration Resource properties for SQL Managed Instance. */
  properties?: DatabaseMigrationPropertiesSqlMi;
}

export function databaseMigrationSqlMiSerializer(item: DatabaseMigrationSqlMi): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : databaseMigrationPropertiesSqlMiSerializer(item["properties"]),
  };
}

export function databaseMigrationSqlMiDeserializer(item: any): DatabaseMigrationSqlMi {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : databaseMigrationPropertiesSqlMiDeserializer(item["properties"]),
  };
}

/** Database Migration Resource for SQL Virtual Machine. */
export interface DatabaseMigrationSqlVm extends ProxyResource {
  /** Database Migration Resource properties for SQL Virtual Machine. */
  properties?: DatabaseMigrationPropertiesSqlVm;
}

export function databaseMigrationSqlVmSerializer(item: DatabaseMigrationSqlVm): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : databaseMigrationPropertiesSqlVmSerializer(item["properties"]),
  };
}

export function databaseMigrationSqlVmDeserializer(item: any): DatabaseMigrationSqlVm {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : databaseMigrationPropertiesSqlVmDeserializer(item["properties"]),
  };
}

/** An Azure Database Migration Service (classic) resource */
export interface DataMigrationService extends ProxyResource {
  /** HTTP strong entity tag value. Ignored if submitted */
  etag?: string;
  /** The resource kind. Only 'vm' (the default) is supported. */
  kind?: string;
  /** Service SKU */
  sku?: ServiceSku;
  location?: string;
  tags?: Record<string, string>;
  /** The resource's provisioning state */
  readonly provisioningState?: ServiceProvisioningState;
  /** The public key of the service, used to encrypt secrets sent to the service */
  publicKey?: string;
  /** The ID of the Microsoft.Network/virtualNetworks/subnets resource to which the service should be joined */
  virtualSubnetId?: string;
  /** The ID of the Microsoft.Network/networkInterfaces resource which the service have */
  virtualNicId?: string;
  /** The time delay before the service is auto-stopped when idle. */
  autoStopDelay?: string;
  /** Whether service resources should be deleted when stopped. (Turned on by default) */
  deleteResourcesOnStop?: boolean;
}

export function dataMigrationServiceSerializer(item: DataMigrationService): any {
  return {
    properties: areAllPropsUndefined(item, [
      "publicKey",
      "virtualSubnetId",
      "virtualNicId",
      "autoStopDelay",
      "deleteResourcesOnStop",
    ])
      ? undefined
      : _dataMigrationServicePropertiesSerializer(item),
    etag: item["etag"],
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : serviceSkuSerializer(item["sku"]),
    location: item["location"],
    tags: item["tags"],
  };
}

export function dataMigrationServiceDeserializer(item: any): DataMigrationService {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _dataMigrationServicePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : serviceSkuDeserializer(item["sku"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Properties of the Azure Database Migration Service (classic) instance */
export interface DataMigrationServiceProperties {
  /** The resource's provisioning state */
  readonly provisioningState?: ServiceProvisioningState;
  /** The public key of the service, used to encrypt secrets sent to the service */
  publicKey?: string;
  /** The ID of the Microsoft.Network/virtualNetworks/subnets resource to which the service should be joined */
  virtualSubnetId?: string;
  /** The ID of the Microsoft.Network/networkInterfaces resource which the service have */
  virtualNicId?: string;
  /** The time delay before the service is auto-stopped when idle. */
  autoStopDelay?: string;
  /** Whether service resources should be deleted when stopped. (Turned on by default) */
  deleteResourcesOnStop?: boolean;
}

export function dataMigrationServicePropertiesSerializer(
  item: DataMigrationServiceProperties,
): any {
  return {
    publicKey: item["publicKey"],
    virtualSubnetId: item["virtualSubnetId"],
    virtualNicId: item["virtualNicId"],
    autoStopDelay: item["autoStopDelay"],
    deleteResourcesOnStop: item["deleteResourcesOnStop"],
  };
}

export function dataMigrationServicePropertiesDeserializer(
  item: any,
): DataMigrationServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    publicKey: item["publicKey"],
    virtualSubnetId: item["virtualSubnetId"],
    virtualNicId: item["virtualNicId"],
    autoStopDelay: item["autoStopDelay"],
    deleteResourcesOnStop: item["deleteResourcesOnStop"],
  };
}

/** The resource's provisioning state */
export enum KnownServiceProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** Deleting */
  Deleting = "Deleting",
  /** Deploying */
  Deploying = "Deploying",
  /** Stopped */
  Stopped = "Stopped",
  /** Stopping */
  Stopping = "Stopping",
  /** Starting */
  Starting = "Starting",
  /** FailedToStart */
  FailedToStart = "FailedToStart",
  /** FailedToStop */
  FailedToStop = "FailedToStop",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
}

/**
 * The resource's provisioning state \
 * {@link KnownServiceProvisioningState} can be used interchangeably with ServiceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Accepted \
 * **Deleting**: Deleting \
 * **Deploying**: Deploying \
 * **Stopped**: Stopped \
 * **Stopping**: Stopping \
 * **Starting**: Starting \
 * **FailedToStart**: FailedToStart \
 * **FailedToStop**: FailedToStop \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed
 */
export type ServiceProvisioningState = string;

/** An Azure SKU instance */
export interface ServiceSku {
  /** The unique name of the SKU, such as 'P3' */
  name?: string;
  /** The tier of the SKU, such as 'Basic', 'General Purpose', or 'Business Critical' */
  tier?: string;
  /** The SKU family, used when the service has multiple performance classes within a tier, such as 'A', 'D', etc. for virtual machines */
  family?: string;
  /** The size of the SKU, used when the name alone does not denote a service size or when a SKU has multiple performance classes within a family, e.g. 'A1' for virtual machines */
  size?: string;
  /** The capacity of the SKU, if it supports scaling */
  capacity?: number;
}

export function serviceSkuSerializer(item: ServiceSku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    family: item["family"],
    size: item["size"],
    capacity: item["capacity"],
  };
}

export function serviceSkuDeserializer(item: any): ServiceSku {
  return {
    name: item["name"],
    tier: item["tier"],
    family: item["family"],
    size: item["size"],
    capacity: item["capacity"],
  };
}

/** OData page of service objects */
export interface _DataMigrationServiceList {
  /** The DataMigrationService items on this page */
  value: DataMigrationService[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataMigrationServiceListDeserializer(item: any): _DataMigrationServiceList {
  return {
    value: dataMigrationServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataMigrationServiceArraySerializer(result: Array<DataMigrationService>): any[] {
  return result.map((item) => {
    return dataMigrationServiceSerializer(item);
  });
}

export function dataMigrationServiceArrayDeserializer(result: Array<DataMigrationService>): any[] {
  return result.map((item) => {
    return dataMigrationServiceDeserializer(item);
  });
}

/** Service health status */
export interface DataMigrationServiceStatusResponse {
  /** The DMS instance agent version */
  agentVersion?: string;
  /** Agent Configuration */
  agentConfiguration?: any;
  /** The machine-readable status, such as 'Initializing', 'Offline', 'Online', 'Deploying', 'Deleting', 'Stopped', 'Stopping', 'Starting', 'FailedToStart', 'FailedToStop' or 'Failed' */
  status?: string;
  /** The services virtual machine size, such as 'Standard_D2_v2' */
  vmSize?: string;
  /** The list of supported task types */
  supportedTaskTypes?: string[];
}

export function dataMigrationServiceStatusResponseDeserializer(
  item: any,
): DataMigrationServiceStatusResponse {
  return {
    agentVersion: item["agentVersion"],
    agentConfiguration: item["agentConfiguration"],
    status: item["status"],
    vmSize: item["vmSize"],
    supportedTaskTypes: !item["supportedTaskTypes"]
      ? item["supportedTaskTypes"]
      : item["supportedTaskTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** OData page of available SKUs */
export interface _ServiceSkuList {
  /** The AvailableServiceSku items on this page */
  value: AvailableServiceSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serviceSkuListDeserializer(item: any): _ServiceSkuList {
  return {
    value: availableServiceSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function availableServiceSkuArrayDeserializer(result: Array<AvailableServiceSku>): any[] {
  return result.map((item) => {
    return availableServiceSkuDeserializer(item);
  });
}

/** Describes the available service SKU. */
export interface AvailableServiceSku {
  /** The resource type, including the provider namespace */
  resourceType?: string;
  /** SKU name, tier, etc. */
  sku?: AvailableServiceSkuSku;
  /** A description of the scaling capacities of the SKU */
  capacity?: AvailableServiceSkuCapacity;
}

export function availableServiceSkuDeserializer(item: any): AvailableServiceSku {
  return {
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : availableServiceSkuSkuDeserializer(item["sku"]),
    capacity: !item["capacity"]
      ? item["capacity"]
      : availableServiceSkuCapacityDeserializer(item["capacity"]),
  };
}

/** SKU name, tier, etc. */
export interface AvailableServiceSkuSku {
  /** The name of the SKU */
  name?: string;
  /** SKU family */
  family?: string;
  /** SKU size */
  size?: string;
  /** The tier of the SKU, such as "Basic", "General Purpose", or "Business Critical" */
  tier?: string;
}

export function availableServiceSkuSkuDeserializer(item: any): AvailableServiceSkuSku {
  return {
    name: item["name"],
    family: item["family"],
    size: item["size"],
    tier: item["tier"],
  };
}

/** A description of the scaling capacities of the SKU */
export interface AvailableServiceSkuCapacity {
  /** The minimum capacity, usually 0 or 1. */
  minimum?: number;
  /** The maximum capacity */
  maximum?: number;
  /** The default capacity */
  default?: number;
  /** The scalability approach */
  scaleType?: ServiceScalability;
}

export function availableServiceSkuCapacityDeserializer(item: any): AvailableServiceSkuCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

/** The scalability approach */
export enum KnownServiceScalability {
  /** none */
  None = "none",
  /** manual */
  Manual = "manual",
  /** automatic */
  Automatic = "automatic",
}

/**
 * The scalability approach \
 * {@link KnownServiceScalability} can be used interchangeably with ServiceScalability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **none**: none \
 * **manual**: manual \
 * **automatic**: automatic
 */
export type ServiceScalability = string;

/** A resource type and proposed name */
export interface NameAvailabilityRequest {
  /** The proposed resource name */
  name?: string;
  /** The resource type chain (e.g. virtualMachines/extensions) */
  type?: string;
}

export function nameAvailabilityRequestSerializer(item: NameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** Indicates whether a proposed resource name is available */
export interface NameAvailabilityResponse {
  /** If true, the name is valid and available. If false, 'reason' describes why not. */
  nameAvailable?: boolean;
  /** The reason why the name is not available, if nameAvailable is false */
  reason?: NameCheckFailureReason;
  /** The localized reason why the name is not available, if nameAvailable is false */
  message?: string;
}

export function nameAvailabilityResponseDeserializer(item: any): NameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** The reason why the name is not available, if nameAvailable is false */
export enum KnownNameCheckFailureReason {
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
  /** Invalid */
  Invalid = "Invalid",
}

/**
 * The reason why the name is not available, if nameAvailable is false \
 * {@link KnownNameCheckFailureReason} can be used interchangeably with NameCheckFailureReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AlreadyExists**: AlreadyExists \
 * **Invalid**: Invalid
 */
export type NameCheckFailureReason = string;

/** A file resource */
export interface ProjectFile extends ProxyResource {
  /** Custom file properties */
  properties?: ProjectFileProperties;
  /** HTTP strong entity tag value. This is ignored if submitted. */
  etag?: string;
}

export function projectFileSerializer(item: ProjectFile): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : projectFilePropertiesSerializer(item["properties"]),
    etag: item["etag"],
  };
}

export function projectFileDeserializer(item: any): ProjectFile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : projectFilePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Base class for file properties. */
export interface ProjectFileProperties {
  /** Optional File extension. If submitted it should not have a leading period and must match the extension from filePath. */
  extension?: string;
  /** Relative path of this file resource. This property can be set when creating or updating the file resource. */
  filePath?: string;
  /** Modification DateTime. */
  readonly lastModified?: Date;
  /** File content type. This property can be modified to reflect the file content type. */
  mediaType?: string;
  /** File size. */
  readonly size?: number;
}

export function projectFilePropertiesSerializer(item: ProjectFileProperties): any {
  return { extension: item["extension"], filePath: item["filePath"], mediaType: item["mediaType"] };
}

export function projectFilePropertiesDeserializer(item: any): ProjectFileProperties {
  return {
    extension: item["extension"],
    filePath: item["filePath"],
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
    mediaType: item["mediaType"],
    size: item["size"],
  };
}

/** OData page of files */
export interface _FileList {
  /** The ProjectFile items on this page */
  value: ProjectFile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fileListDeserializer(item: any): _FileList {
  return {
    value: projectFileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function projectFileArraySerializer(result: Array<ProjectFile>): any[] {
  return result.map((item) => {
    return projectFileSerializer(item);
  });
}

export function projectFileArrayDeserializer(result: Array<ProjectFile>): any[] {
  return result.map((item) => {
    return projectFileDeserializer(item);
  });
}

/** File storage information. */
export interface FileStorageInfo {
  /** A URI that can be used to access the file content. */
  uri?: string;
  /** Dictionary of <string> */
  headers?: Record<string, string>;
}

export function fileStorageInfoDeserializer(item: any): FileStorageInfo {
  return {
    uri: item["uri"],
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(Object.entries(item["headers"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The DMS (classic) List SKUs operation response. */
export interface _ResourceSkusResult {
  /** The ResourceSku items on this page */
  value: ResourceSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceSkusResultDeserializer(item: any): _ResourceSkusResult {
  return {
    value: resourceSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceSkuArrayDeserializer(result: Array<ResourceSku>): any[] {
  return result.map((item) => {
    return resourceSkuDeserializer(item);
  });
}

/** Describes an available DMS (classic) SKU. */
export interface ResourceSku {
  /** The type of resource the SKU applies to. */
  readonly resourceType?: string;
  /** The name of SKU. */
  readonly name?: string;
  /** Specifies the tier of DMS (classic) in a scale set. */
  readonly tier?: string;
  /** The Size of the SKU. */
  readonly size?: string;
  /** The Family of this particular SKU. */
  readonly family?: string;
  /** The Kind of resources that are supported in this SKU. */
  readonly kind?: string;
  /** Not used. */
  readonly capacity?: ResourceSkuCapacity;
  /** The set of locations that the SKU is available. */
  readonly locations?: string[];
  /** The api versions that support this SKU. */
  readonly apiVersions?: string[];
  /** Metadata for retrieving price info. */
  readonly costs?: ResourceSkuCosts[];
  /** A name value pair to describe the capability. */
  readonly capabilities?: ResourceSkuCapabilities[];
  /** The restrictions because of which SKU cannot be used. This is empty if there are no restrictions. */
  readonly restrictions?: ResourceSkuRestrictions[];
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    kind: item["kind"],
    capacity: !item["capacity"]
      ? item["capacity"]
      : resourceSkuCapacityDeserializer(item["capacity"]),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    costs: !item["costs"] ? item["costs"] : resourceSkuCostsArrayDeserializer(item["costs"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : resourceSkuCapabilitiesArrayDeserializer(item["capabilities"]),
    restrictions: !item["restrictions"]
      ? item["restrictions"]
      : resourceSkuRestrictionsArrayDeserializer(item["restrictions"]),
  };
}

/** Describes scaling information of a SKU. */
export interface ResourceSkuCapacity {
  /** The minimum capacity. */
  readonly minimum?: number;
  /** The maximum capacity. */
  readonly maximum?: number;
  /** The default capacity. */
  readonly default?: number;
  /** The scale type applicable to the SKU. */
  readonly scaleType?: ResourceSkuCapacityScaleType;
}

export function resourceSkuCapacityDeserializer(item: any): ResourceSkuCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

/** The scale type applicable to the SKU. */
export enum KnownResourceSkuCapacityScaleType {
  /** Automatic */
  Automatic = "Automatic",
  /** Manual */
  Manual = "Manual",
  /** None */
  None = "None",
}

/**
 * The scale type applicable to the SKU. \
 * {@link KnownResourceSkuCapacityScaleType} can be used interchangeably with ResourceSkuCapacityScaleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: Automatic \
 * **Manual**: Manual \
 * **None**: None
 */
export type ResourceSkuCapacityScaleType = string;

export function resourceSkuCostsArrayDeserializer(result: Array<ResourceSkuCosts>): any[] {
  return result.map((item) => {
    return resourceSkuCostsDeserializer(item);
  });
}

/** Describes metadata for retrieving price info. */
export interface ResourceSkuCosts {
  /** Used for querying price from commerce. */
  readonly meterID?: string;
  /** The multiplier is needed to extend the base metered cost. */
  readonly quantity?: number;
  /** An invariant to show the extended unit. */
  readonly extendedUnit?: string;
}

export function resourceSkuCostsDeserializer(item: any): ResourceSkuCosts {
  return {
    meterID: item["meterID"],
    quantity: item["quantity"],
    extendedUnit: item["extendedUnit"],
  };
}

export function resourceSkuCapabilitiesArrayDeserializer(
  result: Array<ResourceSkuCapabilities>,
): any[] {
  return result.map((item) => {
    return resourceSkuCapabilitiesDeserializer(item);
  });
}

/** Describes The SKU capabilities object. */
export interface ResourceSkuCapabilities {
  /** An invariant to describe the feature. */
  readonly name?: string;
  /** An invariant if the feature is measured by quantity. */
  readonly value?: string;
}

export function resourceSkuCapabilitiesDeserializer(item: any): ResourceSkuCapabilities {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function resourceSkuRestrictionsArrayDeserializer(
  result: Array<ResourceSkuRestrictions>,
): any[] {
  return result.map((item) => {
    return resourceSkuRestrictionsDeserializer(item);
  });
}

/** Describes scaling information of a SKU. */
export interface ResourceSkuRestrictions {
  /** The type of restrictions. */
  readonly type?: ResourceSkuRestrictionsType;
  /** The value of restrictions. If the restriction type is set to location. This would be different locations where the SKU is restricted. */
  readonly values?: string[];
  /** The reason code for restriction. */
  readonly reasonCode?: ResourceSkuRestrictionsReasonCode;
}

export function resourceSkuRestrictionsDeserializer(item: any): ResourceSkuRestrictions {
  return {
    type: item["type"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
    reasonCode: item["reasonCode"],
  };
}

/** The type of restrictions. */
export enum KnownResourceSkuRestrictionsType {
  /** location */
  Location = "location",
}

/**
 * The type of restrictions. \
 * {@link KnownResourceSkuRestrictionsType} can be used interchangeably with ResourceSkuRestrictionsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **location**: location
 */
export type ResourceSkuRestrictionsType = string;

/** The reason code for restriction. */
export enum KnownResourceSkuRestrictionsReasonCode {
  /** QuotaId */
  QuotaId = "QuotaId",
  /** NotAvailableForSubscription */
  NotAvailableForSubscription = "NotAvailableForSubscription",
}

/**
 * The reason code for restriction. \
 * {@link KnownResourceSkuRestrictionsReasonCode} can be used interchangeably with ResourceSkuRestrictionsReasonCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **QuotaId**: QuotaId \
 * **NotAvailableForSubscription**: NotAvailableForSubscription
 */
export type ResourceSkuRestrictionsReasonCode = string;

/** OData page of quota objects */
export interface _QuotaList {
  /** The Quota items on this page */
  value: Quota[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _quotaListDeserializer(item: any): _QuotaList {
  return {
    value: quotaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function quotaArrayDeserializer(result: Array<Quota>): any[] {
  return result.map((item) => {
    return quotaDeserializer(item);
  });
}

/** Describes a quota for or usage details about a resource */
export interface Quota {
  /** The current value of the quota. If null or missing, the current value cannot be determined in the context of the request. */
  currentValue?: number;
  /** The resource ID of the quota object */
  id?: string;
  /** The maximum value of the quota. If null or missing, the quota has no maximum, in which case it merely tracks usage. */
  limit?: number;
  /** The name of the quota */
  name?: QuotaName;
  /** The unit for the quota, such as Count, Bytes, BytesPerSecond, etc. */
  unit?: string;
}

export function quotaDeserializer(item: any): Quota {
  return {
    currentValue: item["currentValue"],
    id: item["id"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : quotaNameDeserializer(item["name"]),
    unit: item["unit"],
  };
}

/** The name of the quota */
export interface QuotaName {
  /** The localized name of the quota */
  localizedValue?: string;
  /** The unlocalized name (or ID) of the quota */
  value?: string;
}

export function quotaNameDeserializer(item: any): QuotaName {
  return {
    localizedValue: item["localizedValue"],
    value: item["value"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-09-01-preview API version. */
  V20250901Preview = "2025-09-01-preview",
}

export function _databaseMigrationCosmosDbMongoPropertiesSerializer(
  item: DatabaseMigrationCosmosDbMongo,
): any {
  return {
    kind: item["kind"],
    scope: item["scope"],
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    provisioningError: item["provisioningError"],
    sourceMongoConnection: !item["sourceMongoConnection"]
      ? item["sourceMongoConnection"]
      : mongoConnectionInformationSerializer(item["sourceMongoConnection"]),
    targetMongoConnection: !item["targetMongoConnection"]
      ? item["targetMongoConnection"]
      : mongoConnectionInformationSerializer(item["targetMongoConnection"]),
    collectionList: !item["collectionList"]
      ? item["collectionList"]
      : mongoMigrationCollectionArraySerializer(item["collectionList"]),
  };
}

export function _databaseMigrationCosmosDbMongoPropertiesDeserializer(item: any) {
  return {
    kind: item["kind"],
    scope: item["scope"],
    provisioningState: item["provisioningState"],
    migrationStatus: item["migrationStatus"],
    startedOn: !item["startedOn"] ? item["startedOn"] : new Date(item["startedOn"]),
    endedOn: !item["endedOn"] ? item["endedOn"] : new Date(item["endedOn"]),
    migrationService: item["migrationService"],
    migrationOperationId: item["migrationOperationId"],
    migrationFailureError: !item["migrationFailureError"]
      ? item["migrationFailureError"]
      : errorInfoDeserializer(item["migrationFailureError"]),
    provisioningError: item["provisioningError"],
    sourceMongoConnection: !item["sourceMongoConnection"]
      ? item["sourceMongoConnection"]
      : mongoConnectionInformationDeserializer(item["sourceMongoConnection"]),
    targetMongoConnection: !item["targetMongoConnection"]
      ? item["targetMongoConnection"]
      : mongoConnectionInformationDeserializer(item["targetMongoConnection"]),
    collectionList: !item["collectionList"]
      ? item["collectionList"]
      : mongoMigrationCollectionArrayDeserializer(item["collectionList"]),
  };
}

export function _migrationServicePropertiesSerializer(_item: MigrationService): any {
  return {};
}

export function _migrationServicePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    integrationRuntimeState: item["integrationRuntimeState"],
  };
}

export function _sqlMigrationServicePropertiesSerializer(_item: SqlMigrationService): any {
  return {};
}

export function _sqlMigrationServicePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    integrationRuntimeState: item["integrationRuntimeState"],
  };
}

export function _projectPropertiesSerializer(item: Project): any {
  return {
    sourcePlatform: item["sourcePlatform"],
    azureAuthenticationInfo: !item["azureAuthenticationInfo"]
      ? item["azureAuthenticationInfo"]
      : azureActiveDirectoryAppSerializer(item["azureAuthenticationInfo"]),
    targetPlatform: item["targetPlatform"],
    sourceConnectionInfo: !item["sourceConnectionInfo"]
      ? item["sourceConnectionInfo"]
      : connectionInfoUnionSerializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: !item["targetConnectionInfo"]
      ? item["targetConnectionInfo"]
      : connectionInfoUnionSerializer(item["targetConnectionInfo"]),
    databasesInfo: !item["databasesInfo"]
      ? item["databasesInfo"]
      : databaseInfoArraySerializer(item["databasesInfo"]),
  };
}

export function _projectPropertiesDeserializer(item: any) {
  return {
    sourcePlatform: item["sourcePlatform"],
    azureAuthenticationInfo: !item["azureAuthenticationInfo"]
      ? item["azureAuthenticationInfo"]
      : azureActiveDirectoryAppDeserializer(item["azureAuthenticationInfo"]),
    targetPlatform: item["targetPlatform"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    sourceConnectionInfo: !item["sourceConnectionInfo"]
      ? item["sourceConnectionInfo"]
      : connectionInfoUnionDeserializer(item["sourceConnectionInfo"]),
    targetConnectionInfo: !item["targetConnectionInfo"]
      ? item["targetConnectionInfo"]
      : connectionInfoUnionDeserializer(item["targetConnectionInfo"]),
    databasesInfo: !item["databasesInfo"]
      ? item["databasesInfo"]
      : databaseInfoArrayDeserializer(item["databasesInfo"]),
    provisioningState: item["provisioningState"],
  };
}

export function _dataMigrationServicePropertiesSerializer(item: DataMigrationService): any {
  return {
    publicKey: item["publicKey"],
    virtualSubnetId: item["virtualSubnetId"],
    virtualNicId: item["virtualNicId"],
    autoStopDelay: item["autoStopDelay"],
    deleteResourcesOnStop: item["deleteResourcesOnStop"],
  };
}

export function _dataMigrationServicePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    publicKey: item["publicKey"],
    virtualSubnetId: item["virtualSubnetId"],
    virtualNicId: item["virtualNicId"],
    autoStopDelay: item["autoStopDelay"],
    deleteResourcesOnStop: item["deleteResourcesOnStop"],
  };
}
