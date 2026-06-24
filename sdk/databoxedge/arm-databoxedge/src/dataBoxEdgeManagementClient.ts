// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DataBoxEdgeManagementContext,
  DataBoxEdgeManagementClientOptionalParams,
  createDataBoxEdgeManagement,
} from "./api/index.js";
import { AddonsOperations, _getAddonsOperations } from "./classic/addons/index.js";
import { AlertsOperations, _getAlertsOperations } from "./classic/alerts/index.js";
import {
  AvailableSkusOperations,
  _getAvailableSkusOperations,
} from "./classic/availableSkus/index.js";
import {
  BandwidthSchedulesOperations,
  _getBandwidthSchedulesOperations,
} from "./classic/bandwidthSchedules/index.js";
import { ContainersOperations, _getContainersOperations } from "./classic/containers/index.js";
import {
  DeviceCapacityCheckOperations,
  _getDeviceCapacityCheckOperations,
} from "./classic/deviceCapacityCheck/index.js";
import {
  DeviceCapacityInfoOperations,
  _getDeviceCapacityInfoOperations,
} from "./classic/deviceCapacityInfo/index.js";
import { DevicesOperations, _getDevicesOperations } from "./classic/devices/index.js";
import {
  DiagnosticSettingsOperations,
  _getDiagnosticSettingsOperations,
} from "./classic/diagnosticSettings/index.js";
import { JobsOperations, _getJobsOperations } from "./classic/jobs/index.js";
import {
  MonitoringConfigOperations,
  _getMonitoringConfigOperations,
} from "./classic/monitoringConfig/index.js";
import { NodesOperations, _getNodesOperations } from "./classic/nodes/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  OperationsStatusOperations,
  _getOperationsStatusOperations,
} from "./classic/operationsStatus/index.js";
import { OrdersOperations, _getOrdersOperations } from "./classic/orders/index.js";
import { RolesOperations, _getRolesOperations } from "./classic/roles/index.js";
import { SharesOperations, _getSharesOperations } from "./classic/shares/index.js";
import {
  StorageAccountCredentialsOperations,
  _getStorageAccountCredentialsOperations,
} from "./classic/storageAccountCredentials/index.js";
import {
  StorageAccountsOperations,
  _getStorageAccountsOperations,
} from "./classic/storageAccounts/index.js";
import {
  SupportPackagesOperations,
  _getSupportPackagesOperations,
} from "./classic/supportPackages/index.js";
import { TriggersOperations, _getTriggersOperations } from "./classic/triggers/index.js";
import { UsersOperations, _getUsersOperations } from "./classic/users/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DataBoxEdgeManagementClientOptionalParams } from "./api/dataBoxEdgeManagementContext.js";

export class DataBoxEdgeManagementClient {
  private _client: DataBoxEdgeManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: DataBoxEdgeManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: DataBoxEdgeManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | DataBoxEdgeManagementClientOptionalParams,
    options?: DataBoxEdgeManagementClientOptionalParams,
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
    this._client = createDataBoxEdgeManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.availableSkus = _getAvailableSkusOperations(this._client);
    this.monitoringConfig = _getMonitoringConfigOperations(this._client);
    this.deviceCapacityInfo = _getDeviceCapacityInfoOperations(this._client);
    this.supportPackages = _getSupportPackagesOperations(this._client);
    this.nodes = _getNodesOperations(this._client);
    this.deviceCapacityCheck = _getDeviceCapacityCheckOperations(this._client);
    this.users = _getUsersOperations(this._client);
    this.triggers = _getTriggersOperations(this._client);
    this.containers = _getContainersOperations(this._client);
    this.storageAccounts = _getStorageAccountsOperations(this._client);
    this.storageAccountCredentials = _getStorageAccountCredentialsOperations(this._client);
    this.shares = _getSharesOperations(this._client);
    this.addons = _getAddonsOperations(this._client);
    this.roles = _getRolesOperations(this._client);
    this.orders = _getOrdersOperations(this._client);
    this.jobs = _getJobsOperations(this._client);
    this.diagnosticSettings = _getDiagnosticSettingsOperations(this._client);
    this.bandwidthSchedules = _getBandwidthSchedulesOperations(this._client);
    this.alerts = _getAlertsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.devices = _getDevicesOperations(this._client);
    this.operationsStatus = _getOperationsStatusOperations(this._client);
  }

  /** The operation groups for availableSkus */
  public readonly availableSkus: AvailableSkusOperations;
  /** The operation groups for monitoringConfig */
  public readonly monitoringConfig: MonitoringConfigOperations;
  /** The operation groups for deviceCapacityInfo */
  public readonly deviceCapacityInfo: DeviceCapacityInfoOperations;
  /** The operation groups for supportPackages */
  public readonly supportPackages: SupportPackagesOperations;
  /** The operation groups for nodes */
  public readonly nodes: NodesOperations;
  /** The operation groups for deviceCapacityCheck */
  public readonly deviceCapacityCheck: DeviceCapacityCheckOperations;
  /** The operation groups for users */
  public readonly users: UsersOperations;
  /** The operation groups for triggers */
  public readonly triggers: TriggersOperations;
  /** The operation groups for containers */
  public readonly containers: ContainersOperations;
  /** The operation groups for storageAccounts */
  public readonly storageAccounts: StorageAccountsOperations;
  /** The operation groups for storageAccountCredentials */
  public readonly storageAccountCredentials: StorageAccountCredentialsOperations;
  /** The operation groups for shares */
  public readonly shares: SharesOperations;
  /** The operation groups for addons */
  public readonly addons: AddonsOperations;
  /** The operation groups for roles */
  public readonly roles: RolesOperations;
  /** The operation groups for orders */
  public readonly orders: OrdersOperations;
  /** The operation groups for jobs */
  public readonly jobs: JobsOperations;
  /** The operation groups for diagnosticSettings */
  public readonly diagnosticSettings: DiagnosticSettingsOperations;
  /** The operation groups for bandwidthSchedules */
  public readonly bandwidthSchedules: BandwidthSchedulesOperations;
  /** The operation groups for alerts */
  public readonly alerts: AlertsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for devices */
  public readonly devices: DevicesOperations;
  /** The operation groups for operationsStatus */
  public readonly operationsStatus: OperationsStatusOperations;
}
