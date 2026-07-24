// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext, AzureArcDataClientOptionalParams } from "./api/index.js";
import { createAzureArcData } from "./api/index.js";
import type { ActiveDirectoryConnectorsOperations } from "./classic/activeDirectoryConnectors/index.js";
import { _getActiveDirectoryConnectorsOperations } from "./classic/activeDirectoryConnectors/index.js";
import type { DataControllersOperations } from "./classic/dataControllers/index.js";
import { _getDataControllersOperations } from "./classic/dataControllers/index.js";
import type { FailoverGroupsOperations } from "./classic/failoverGroups/index.js";
import { _getFailoverGroupsOperations } from "./classic/failoverGroups/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PostgresInstancesOperations } from "./classic/postgresInstances/index.js";
import { _getPostgresInstancesOperations } from "./classic/postgresInstances/index.js";
import type { SqlManagedInstancesOperations } from "./classic/sqlManagedInstances/index.js";
import { _getSqlManagedInstancesOperations } from "./classic/sqlManagedInstances/index.js";
import type { SqlServerAvailabilityGroupsOperations } from "./classic/sqlServerAvailabilityGroups/index.js";
import { _getSqlServerAvailabilityGroupsOperations } from "./classic/sqlServerAvailabilityGroups/index.js";
import type { SqlServerDatabasesOperations } from "./classic/sqlServerDatabases/index.js";
import { _getSqlServerDatabasesOperations } from "./classic/sqlServerDatabases/index.js";
import type { SqlServerEsuLicensesOperations } from "./classic/sqlServerEsuLicenses/index.js";
import { _getSqlServerEsuLicensesOperations } from "./classic/sqlServerEsuLicenses/index.js";
import type { SqlServerInstancesOperations } from "./classic/sqlServerInstances/index.js";
import { _getSqlServerInstancesOperations } from "./classic/sqlServerInstances/index.js";
import type { SqlServerLicensesOperations } from "./classic/sqlServerLicenses/index.js";
import { _getSqlServerLicensesOperations } from "./classic/sqlServerLicenses/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureArcDataClientOptionalParams } from "./api/azureArcDataContext.js";

export class AzureArcDataClient {
  private _client: AzureArcDataContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AzureArcDataClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AzureArcDataClientOptionalParams,
  );
  /** The AzureArcData management API provides a RESTful set of web APIs to manage Azure Data Services on Azure Arc Resources. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AzureArcDataClientOptionalParams,
    options?: AzureArcDataClientOptionalParams,
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
    this._client = createAzureArcData(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.sqlServerDatabases = _getSqlServerDatabasesOperations(this._client);
    this.activeDirectoryConnectors = _getActiveDirectoryConnectorsOperations(this._client);
    this.dataControllers = _getDataControllersOperations(this._client);
    this.sqlServerAvailabilityGroups = _getSqlServerAvailabilityGroupsOperations(this._client);
    this.failoverGroups = _getFailoverGroupsOperations(this._client);
    this.sqlServerEsuLicenses = _getSqlServerEsuLicensesOperations(this._client);
    this.postgresInstances = _getPostgresInstancesOperations(this._client);
    this.sqlServerLicenses = _getSqlServerLicensesOperations(this._client);
    this.sqlServerInstances = _getSqlServerInstancesOperations(this._client);
    this.sqlManagedInstances = _getSqlManagedInstancesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for sqlServerDatabases */
  public readonly sqlServerDatabases: SqlServerDatabasesOperations;
  /** The operation groups for activeDirectoryConnectors */
  public readonly activeDirectoryConnectors: ActiveDirectoryConnectorsOperations;
  /** The operation groups for dataControllers */
  public readonly dataControllers: DataControllersOperations;
  /** The operation groups for sqlServerAvailabilityGroups */
  public readonly sqlServerAvailabilityGroups: SqlServerAvailabilityGroupsOperations;
  /** The operation groups for failoverGroups */
  public readonly failoverGroups: FailoverGroupsOperations;
  /** The operation groups for sqlServerEsuLicenses */
  public readonly sqlServerEsuLicenses: SqlServerEsuLicensesOperations;
  /** The operation groups for postgresInstances */
  public readonly postgresInstances: PostgresInstancesOperations;
  /** The operation groups for sqlServerLicenses */
  public readonly sqlServerLicenses: SqlServerLicensesOperations;
  /** The operation groups for sqlServerInstances */
  public readonly sqlServerInstances: SqlServerInstancesOperations;
  /** The operation groups for sqlManagedInstances */
  public readonly sqlManagedInstances: SqlManagedInstancesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
