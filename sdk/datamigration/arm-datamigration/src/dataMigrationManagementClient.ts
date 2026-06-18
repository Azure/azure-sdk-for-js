// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DataMigrationManagementContext,
  DataMigrationManagementClientOptionalParams,
} from "./api/index.js";
import { createDataMigrationManagement } from "./api/index.js";
import type { DatabaseMigrationsMongoToCosmosDbRUMongoOperations } from "./classic/databaseMigrationsMongoToCosmosDbRUMongo/index.js";
import { _getDatabaseMigrationsMongoToCosmosDbRUMongoOperations } from "./classic/databaseMigrationsMongoToCosmosDbRUMongo/index.js";
import type { DatabaseMigrationsMongoToCosmosDbvCoreMongoOperations } from "./classic/databaseMigrationsMongoToCosmosDbvCoreMongo/index.js";
import { _getDatabaseMigrationsMongoToCosmosDbvCoreMongoOperations } from "./classic/databaseMigrationsMongoToCosmosDbvCoreMongo/index.js";
import type { DatabaseMigrationsSqlDbOperations } from "./classic/databaseMigrationsSqlDb/index.js";
import { _getDatabaseMigrationsSqlDbOperations } from "./classic/databaseMigrationsSqlDb/index.js";
import type { DatabaseMigrationsSqlMiOperations } from "./classic/databaseMigrationsSqlMi/index.js";
import { _getDatabaseMigrationsSqlMiOperations } from "./classic/databaseMigrationsSqlMi/index.js";
import type { DatabaseMigrationsSqlVmOperations } from "./classic/databaseMigrationsSqlVm/index.js";
import { _getDatabaseMigrationsSqlVmOperations } from "./classic/databaseMigrationsSqlVm/index.js";
import type { FilesOperations } from "./classic/files/index.js";
import { _getFilesOperations } from "./classic/files/index.js";
import type { MigrationServicesOperations } from "./classic/migrationServices/index.js";
import { _getMigrationServicesOperations } from "./classic/migrationServices/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProjectsOperations } from "./classic/projects/index.js";
import { _getProjectsOperations } from "./classic/projects/index.js";
import type { ResourceSkusOperations } from "./classic/resourceSkus/index.js";
import { _getResourceSkusOperations } from "./classic/resourceSkus/index.js";
import type { ServiceTasksOperations } from "./classic/serviceTasks/index.js";
import { _getServiceTasksOperations } from "./classic/serviceTasks/index.js";
import type { ServicesOperations } from "./classic/services/index.js";
import { _getServicesOperations } from "./classic/services/index.js";
import type { SqlMigrationServicesOperations } from "./classic/sqlMigrationServices/index.js";
import { _getSqlMigrationServicesOperations } from "./classic/sqlMigrationServices/index.js";
import type { TasksOperations } from "./classic/tasks/index.js";
import { _getTasksOperations } from "./classic/tasks/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { DataMigrationManagementClientOptionalParams } from "./api/dataMigrationManagementContext.js";

export class DataMigrationManagementClient {
  private _client: DataMigrationManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: DataMigrationManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: DataMigrationManagementClientOptionalParams,
  );
  /** The SQL Migration management API provides a RESTful set of web APIs that allow users to migrate their SQL Server databases to Azure SQL. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | DataMigrationManagementClientOptionalParams,
    options?: DataMigrationManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDataMigrationManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.usages = _getUsagesOperations(this._client);
    this.resourceSkus = _getResourceSkusOperations(this._client);
    this.files = _getFilesOperations(this._client);
    this.tasks = _getTasksOperations(this._client);
    this.services = _getServicesOperations(this._client);
    this.databaseMigrationsSqlVm = _getDatabaseMigrationsSqlVmOperations(this._client);
    this.databaseMigrationsSqlMi = _getDatabaseMigrationsSqlMiOperations(this._client);
    this.databaseMigrationsSqlDb = _getDatabaseMigrationsSqlDbOperations(this._client);
    this.databaseMigrationsMongoToCosmosDbRUMongo =
      _getDatabaseMigrationsMongoToCosmosDbRUMongoOperations(this._client);
    this.projects = _getProjectsOperations(this._client);
    this.serviceTasks = _getServiceTasksOperations(this._client);
    this.sqlMigrationServices = _getSqlMigrationServicesOperations(this._client);
    this.migrationServices = _getMigrationServicesOperations(this._client);
    this.databaseMigrationsMongoToCosmosDbvCoreMongo =
      _getDatabaseMigrationsMongoToCosmosDbvCoreMongoOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for resourceSkus */
  public readonly resourceSkus: ResourceSkusOperations;
  /** The operation groups for files */
  public readonly files: FilesOperations;
  /** The operation groups for tasks */
  public readonly tasks: TasksOperations;
  /** The operation groups for services */
  public readonly services: ServicesOperations;
  /** The operation groups for databaseMigrationsSqlVm */
  public readonly databaseMigrationsSqlVm: DatabaseMigrationsSqlVmOperations;
  /** The operation groups for databaseMigrationsSqlMi */
  public readonly databaseMigrationsSqlMi: DatabaseMigrationsSqlMiOperations;
  /** The operation groups for databaseMigrationsSqlDb */
  public readonly databaseMigrationsSqlDb: DatabaseMigrationsSqlDbOperations;
  /** The operation groups for databaseMigrationsMongoToCosmosDbRUMongo */
  public readonly databaseMigrationsMongoToCosmosDbRUMongo: DatabaseMigrationsMongoToCosmosDbRUMongoOperations;
  /** The operation groups for projects */
  public readonly projects: ProjectsOperations;
  /** The operation groups for serviceTasks */
  public readonly serviceTasks: ServiceTasksOperations;
  /** The operation groups for sqlMigrationServices */
  public readonly sqlMigrationServices: SqlMigrationServicesOperations;
  /** The operation groups for migrationServices */
  public readonly migrationServices: MigrationServicesOperations;
  /** The operation groups for databaseMigrationsMongoToCosmosDbvCoreMongo */
  public readonly databaseMigrationsMongoToCosmosDbvCoreMongo: DatabaseMigrationsMongoToCosmosDbvCoreMongoOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
