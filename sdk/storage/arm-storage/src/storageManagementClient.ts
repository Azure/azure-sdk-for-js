// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  StorageManagementContext,
  StorageManagementClientOptionalParams,
} from "./api/index.js";
import { createStorageManagement } from "./api/index.js";
import type { BlobContainersOperations } from "./classic/blobContainers/index.js";
import { _getBlobContainersOperations } from "./classic/blobContainers/index.js";
import type { BlobInventoryPoliciesOperations } from "./classic/blobInventoryPolicies/index.js";
import { _getBlobInventoryPoliciesOperations } from "./classic/blobInventoryPolicies/index.js";
import type { BlobServicesOperations } from "./classic/blobServices/index.js";
import { _getBlobServicesOperations } from "./classic/blobServices/index.js";
import type { ConnectorsOperations } from "./classic/connectors/index.js";
import { _getConnectorsOperations } from "./classic/connectors/index.js";
import type { DataSharesOperations } from "./classic/dataShares/index.js";
import { _getDataSharesOperations } from "./classic/dataShares/index.js";
import type { DeletedAccountsOperations } from "./classic/deletedAccounts/index.js";
import { _getDeletedAccountsOperations } from "./classic/deletedAccounts/index.js";
import type { EncryptionScopesOperations } from "./classic/encryptionScopes/index.js";
import { _getEncryptionScopesOperations } from "./classic/encryptionScopes/index.js";
import type { FileServicesOperations } from "./classic/fileServices/index.js";
import { _getFileServicesOperations } from "./classic/fileServices/index.js";
import type { FileSharesOperations } from "./classic/fileShares/index.js";
import { _getFileSharesOperations } from "./classic/fileShares/index.js";
import type { LocalUsersOperations } from "./classic/localUsers/index.js";
import { _getLocalUsersOperations } from "./classic/localUsers/index.js";
import type { ManagementPoliciesOperations } from "./classic/managementPolicies/index.js";
import { _getManagementPoliciesOperations } from "./classic/managementPolicies/index.js";
import type { NetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import { _getNetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import type { ObjectReplicationPoliciesOperations } from "./classic/objectReplicationPolicies/index.js";
import { _getObjectReplicationPoliciesOperations } from "./classic/objectReplicationPolicies/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { QueueOperations } from "./classic/queue/index.js";
import { _getQueueOperations } from "./classic/queue/index.js";
import type { QueueServicesOperations } from "./classic/queueServices/index.js";
import { _getQueueServicesOperations } from "./classic/queueServices/index.js";
import type { SkusOperations } from "./classic/skus/index.js";
import { _getSkusOperations } from "./classic/skus/index.js";
import type { StorageAccountsOperations } from "./classic/storageAccounts/index.js";
import { _getStorageAccountsOperations } from "./classic/storageAccounts/index.js";
import type { StorageTaskAssignmentInstancesReportOperations } from "./classic/storageTaskAssignmentInstancesReport/index.js";
import { _getStorageTaskAssignmentInstancesReportOperations } from "./classic/storageTaskAssignmentInstancesReport/index.js";
import type { StorageTaskAssignmentsOperations } from "./classic/storageTaskAssignments/index.js";
import { _getStorageTaskAssignmentsOperations } from "./classic/storageTaskAssignments/index.js";
import type { StorageTaskAssignmentsInstancesReportOperations } from "./classic/storageTaskAssignmentsInstancesReport/index.js";
import { _getStorageTaskAssignmentsInstancesReportOperations } from "./classic/storageTaskAssignmentsInstancesReport/index.js";
import type { TableOperations } from "./classic/table/index.js";
import { _getTableOperations } from "./classic/table/index.js";
import type { TableServicesOperations } from "./classic/tableServices/index.js";
import { _getTableServicesOperations } from "./classic/tableServices/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { StorageManagementClientOptionalParams } from "./api/storageManagementContext.js";

export class StorageManagementClient {
  private _client: StorageManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: StorageManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: StorageManagementClientOptionalParams,
  );
  /** The Azure Storage Management API. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | StorageManagementClientOptionalParams,
    options?: StorageManagementClientOptionalParams,
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
    this._client = createStorageManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.usages = _getUsagesOperations(this._client);
    this.skus = _getSkusOperations(this._client);
    this.storageTaskAssignmentInstancesReport = _getStorageTaskAssignmentInstancesReportOperations(
      this._client,
    );
    this.table = _getTableOperations(this._client);
    this.localUsers = _getLocalUsersOperations(this._client);
    this.objectReplicationPolicies = _getObjectReplicationPoliciesOperations(this._client);
    this.queue = _getQueueOperations(this._client);
    this.storageTaskAssignmentsInstancesReport =
      _getStorageTaskAssignmentsInstancesReportOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.dataShares = _getDataSharesOperations(this._client);
    this.connectors = _getConnectorsOperations(this._client);
    this.storageTaskAssignments = _getStorageTaskAssignmentsOperations(this._client);
    this.networkSecurityPerimeterConfigurations =
      _getNetworkSecurityPerimeterConfigurationsOperations(this._client);
    this.tableServices = _getTableServicesOperations(this._client);
    this.encryptionScopes = _getEncryptionScopesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.blobInventoryPolicies = _getBlobInventoryPoliciesOperations(this._client);
    this.managementPolicies = _getManagementPoliciesOperations(this._client);
    this.deletedAccounts = _getDeletedAccountsOperations(this._client);
    this.queueServices = _getQueueServicesOperations(this._client);
    this.fileServices = _getFileServicesOperations(this._client);
    this.fileShares = _getFileSharesOperations(this._client);
    this.storageAccounts = _getStorageAccountsOperations(this._client);
    this.blobServices = _getBlobServicesOperations(this._client);
    this.blobContainers = _getBlobContainersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for skus */
  public readonly skus: SkusOperations;
  /** The operation groups for storageTaskAssignmentInstancesReport */
  public readonly storageTaskAssignmentInstancesReport: StorageTaskAssignmentInstancesReportOperations;
  /** The operation groups for table */
  public readonly table: TableOperations;
  /** The operation groups for localUsers */
  public readonly localUsers: LocalUsersOperations;
  /** The operation groups for objectReplicationPolicies */
  public readonly objectReplicationPolicies: ObjectReplicationPoliciesOperations;
  /** The operation groups for queue */
  public readonly queue: QueueOperations;
  /** The operation groups for storageTaskAssignmentsInstancesReport */
  public readonly storageTaskAssignmentsInstancesReport: StorageTaskAssignmentsInstancesReportOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for dataShares */
  public readonly dataShares: DataSharesOperations;
  /** The operation groups for connectors */
  public readonly connectors: ConnectorsOperations;
  /** The operation groups for storageTaskAssignments */
  public readonly storageTaskAssignments: StorageTaskAssignmentsOperations;
  /** The operation groups for networkSecurityPerimeterConfigurations */
  public readonly networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurationsOperations;
  /** The operation groups for tableServices */
  public readonly tableServices: TableServicesOperations;
  /** The operation groups for encryptionScopes */
  public readonly encryptionScopes: EncryptionScopesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for blobInventoryPolicies */
  public readonly blobInventoryPolicies: BlobInventoryPoliciesOperations;
  /** The operation groups for managementPolicies */
  public readonly managementPolicies: ManagementPoliciesOperations;
  /** The operation groups for deletedAccounts */
  public readonly deletedAccounts: DeletedAccountsOperations;
  /** The operation groups for queueServices */
  public readonly queueServices: QueueServicesOperations;
  /** The operation groups for fileServices */
  public readonly fileServices: FileServicesOperations;
  /** The operation groups for fileShares */
  public readonly fileShares: FileSharesOperations;
  /** The operation groups for storageAccounts */
  public readonly storageAccounts: StorageAccountsOperations;
  /** The operation groups for blobServices */
  public readonly blobServices: BlobServicesOperations;
  /** The operation groups for blobContainers */
  public readonly blobContainers: BlobContainersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
