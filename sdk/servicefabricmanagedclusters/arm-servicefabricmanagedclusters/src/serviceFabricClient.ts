// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createServiceFabric,
  ServiceFabricContext,
  ServiceFabricClientOptionalParams,
} from "./api/index.js";
import {
  OperationStatusOperations,
  _getOperationStatusOperations,
} from "./classic/operationStatus/index.js";
import {
  OperationResultsOperations,
  _getOperationResultsOperations,
} from "./classic/operationResults/index.js";
import {
  NodeTypeSkusOperations,
  _getNodeTypeSkusOperations,
} from "./classic/nodeTypeSkus/index.js";
import { NodeTypesOperations, _getNodeTypesOperations } from "./classic/nodeTypes/index.js";
import {
  ManagedMaintenanceWindowStatusOperations,
  _getManagedMaintenanceWindowStatusOperations,
} from "./classic/managedMaintenanceWindowStatus/index.js";
import {
  ManagedApplyMaintenanceWindowOperations,
  _getManagedApplyMaintenanceWindowOperations,
} from "./classic/managedApplyMaintenanceWindow/index.js";
import {
  ManagedAzResiliencyStatusOperations,
  _getManagedAzResiliencyStatusOperations,
} from "./classic/managedAzResiliencyStatus/index.js";
import {
  ManagedClustersOperations,
  _getManagedClustersOperations,
} from "./classic/managedClusters/index.js";
import {
  ManagedUnsupportedVMSizesOperations,
  _getManagedUnsupportedVMSizesOperations,
} from "./classic/managedUnsupportedVMSizes/index.js";
import {
  ManagedClusterVersionOperations,
  _getManagedClusterVersionOperations,
} from "./classic/managedClusterVersion/index.js";
import { ServicesOperations, _getServicesOperations } from "./classic/services/index.js";
import {
  ApplicationTypeVersionsOperations,
  _getApplicationTypeVersionsOperations,
} from "./classic/applicationTypeVersions/index.js";
import {
  ApplicationTypesOperations,
  _getApplicationTypesOperations,
} from "./classic/applicationTypes/index.js";
import {
  ApplicationsOperations,
  _getApplicationsOperations,
} from "./classic/applications/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { ServiceFabricClientOptionalParams } from "./api/serviceFabricContext.js";

export class ServiceFabricClient {
  private _client: ServiceFabricContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Service Fabric Managed Clusters Management Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ServiceFabricClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createServiceFabric(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operationStatus = _getOperationStatusOperations(this._client);
    this.operationResults = _getOperationResultsOperations(this._client);
    this.nodeTypeSkus = _getNodeTypeSkusOperations(this._client);
    this.nodeTypes = _getNodeTypesOperations(this._client);
    this.managedMaintenanceWindowStatus = _getManagedMaintenanceWindowStatusOperations(
      this._client,
    );
    this.managedApplyMaintenanceWindow = _getManagedApplyMaintenanceWindowOperations(this._client);
    this.managedAzResiliencyStatus = _getManagedAzResiliencyStatusOperations(this._client);
    this.managedClusters = _getManagedClustersOperations(this._client);
    this.managedUnsupportedVMSizes = _getManagedUnsupportedVMSizesOperations(this._client);
    this.managedClusterVersion = _getManagedClusterVersionOperations(this._client);
    this.services = _getServicesOperations(this._client);
    this.applicationTypeVersions = _getApplicationTypeVersionsOperations(this._client);
    this.applicationTypes = _getApplicationTypesOperations(this._client);
    this.applications = _getApplicationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for operationStatus */
  public readonly operationStatus: OperationStatusOperations;
  /** The operation groups for operationResults */
  public readonly operationResults: OperationResultsOperations;
  /** The operation groups for nodeTypeSkus */
  public readonly nodeTypeSkus: NodeTypeSkusOperations;
  /** The operation groups for nodeTypes */
  public readonly nodeTypes: NodeTypesOperations;
  /** The operation groups for managedMaintenanceWindowStatus */
  public readonly managedMaintenanceWindowStatus: ManagedMaintenanceWindowStatusOperations;
  /** The operation groups for managedApplyMaintenanceWindow */
  public readonly managedApplyMaintenanceWindow: ManagedApplyMaintenanceWindowOperations;
  /** The operation groups for managedAzResiliencyStatus */
  public readonly managedAzResiliencyStatus: ManagedAzResiliencyStatusOperations;
  /** The operation groups for managedClusters */
  public readonly managedClusters: ManagedClustersOperations;
  /** The operation groups for managedUnsupportedVMSizes */
  public readonly managedUnsupportedVMSizes: ManagedUnsupportedVMSizesOperations;
  /** The operation groups for managedClusterVersion */
  public readonly managedClusterVersion: ManagedClusterVersionOperations;
  /** The operation groups for services */
  public readonly services: ServicesOperations;
  /** The operation groups for applicationTypeVersions */
  public readonly applicationTypeVersions: ApplicationTypeVersionsOperations;
  /** The operation groups for applicationTypes */
  public readonly applicationTypes: ApplicationTypesOperations;
  /** The operation groups for applications */
  public readonly applications: ApplicationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
