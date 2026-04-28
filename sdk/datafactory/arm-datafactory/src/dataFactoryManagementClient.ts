// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DataFactoryManagementContext,
  DataFactoryManagementClientOptionalParams,
  createDataFactoryManagement,
} from "./api/index.js";
import {
  ActivityRunsOperations,
  _getActivityRunsOperations,
} from "./classic/activityRuns/index.js";
import {
  ChangeDataCaptureOperations,
  _getChangeDataCaptureOperations,
} from "./classic/changeDataCapture/index.js";
import {
  CredentialOperationsOperations,
  _getCredentialOperationsOperations,
} from "./classic/credentialOperations/index.js";
import {
  DataFlowDebugSessionOperations,
  _getDataFlowDebugSessionOperations,
} from "./classic/dataFlowDebugSession/index.js";
import { DataFlowsOperations, _getDataFlowsOperations } from "./classic/dataFlows/index.js";
import { DatasetsOperations, _getDatasetsOperations } from "./classic/datasets/index.js";
import {
  ExposureControlOperations,
  _getExposureControlOperations,
} from "./classic/exposureControl/index.js";
import { FactoriesOperations, _getFactoriesOperations } from "./classic/factories/index.js";
import {
  GlobalParametersOperations,
  _getGlobalParametersOperations,
} from "./classic/globalParameters/index.js";
import {
  IntegrationRuntimeOperations,
  _getIntegrationRuntimeOperations,
} from "./classic/integrationRuntime/index.js";
import {
  IntegrationRuntimeNodesOperations,
  _getIntegrationRuntimeNodesOperations,
} from "./classic/integrationRuntimeNodes/index.js";
import {
  IntegrationRuntimeObjectMetadataOperations,
  _getIntegrationRuntimeObjectMetadataOperations,
} from "./classic/integrationRuntimeObjectMetadata/index.js";
import {
  IntegrationRuntimesOperations,
  _getIntegrationRuntimesOperations,
} from "./classic/integrationRuntimes/index.js";
import {
  LinkedServicesOperations,
  _getLinkedServicesOperations,
} from "./classic/linkedServices/index.js";
import {
  ManagedPrivateEndpointsOperations,
  _getManagedPrivateEndpointsOperations,
} from "./classic/managedPrivateEndpoints/index.js";
import {
  ManagedVirtualNetworksOperations,
  _getManagedVirtualNetworksOperations,
} from "./classic/managedVirtualNetworks/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PipelineRunsOperations,
  _getPipelineRunsOperations,
} from "./classic/pipelineRuns/index.js";
import { PipelinesOperations, _getPipelinesOperations } from "./classic/pipelines/index.js";
import {
  PrivateEndPointConnectionsOperations,
  _getPrivateEndPointConnectionsOperations,
} from "./classic/privateEndPointConnections/index.js";
import {
  PrivateEndpointConnectionOperations,
  _getPrivateEndpointConnectionOperations,
} from "./classic/privateEndpointConnection/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { TriggerRunsOperations, _getTriggerRunsOperations } from "./classic/triggerRuns/index.js";
import { TriggersOperations, _getTriggersOperations } from "./classic/triggers/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DataFactoryManagementClientOptionalParams } from "./api/dataFactoryManagementContext.js";

export class DataFactoryManagementClient {
  private _client: DataFactoryManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: DataFactoryManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: DataFactoryManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | DataFactoryManagementClientOptionalParams,
    options?: DataFactoryManagementClientOptionalParams,
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
    this._client = createDataFactoryManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.changeDataCapture = _getChangeDataCaptureOperations(this._client);
    this.globalParameters = _getGlobalParametersOperations(this._client);
    this.privateEndPointConnections = _getPrivateEndPointConnectionsOperations(this._client);
    this.privateEndpointConnection = _getPrivateEndpointConnectionOperations(this._client);
    this.credentialOperations = _getCredentialOperationsOperations(this._client);
    this.managedPrivateEndpoints = _getManagedPrivateEndpointsOperations(this._client);
    this.managedVirtualNetworks = _getManagedVirtualNetworksOperations(this._client);
    this.dataFlows = _getDataFlowsOperations(this._client);
    this.pipelines = _getPipelinesOperations(this._client);
    this.datasets = _getDatasetsOperations(this._client);
    this.linkedServices = _getLinkedServicesOperations(this._client);
    this.integrationRuntime = _getIntegrationRuntimeOperations(this._client);
    this.integrationRuntimeNodes = _getIntegrationRuntimeNodesOperations(this._client);
    this.integrationRuntimeObjectMetadata = _getIntegrationRuntimeObjectMetadataOperations(
      this._client,
    );
    this.integrationRuntimes = _getIntegrationRuntimesOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.dataFlowDebugSession = _getDataFlowDebugSessionOperations(this._client);
    this.triggerRuns = _getTriggerRunsOperations(this._client);
    this.triggers = _getTriggersOperations(this._client);
    this.activityRuns = _getActivityRunsOperations(this._client);
    this.pipelineRuns = _getPipelineRunsOperations(this._client);
    this.exposureControl = _getExposureControlOperations(this._client);
    this.factories = _getFactoriesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for changeDataCapture */
  public readonly changeDataCapture: ChangeDataCaptureOperations;
  /** The operation groups for globalParameters */
  public readonly globalParameters: GlobalParametersOperations;
  /** The operation groups for privateEndPointConnections */
  public readonly privateEndPointConnections: PrivateEndPointConnectionsOperations;
  /** The operation groups for privateEndpointConnection */
  public readonly privateEndpointConnection: PrivateEndpointConnectionOperations;
  /** The operation groups for credentialOperations */
  public readonly credentialOperations: CredentialOperationsOperations;
  /** The operation groups for managedPrivateEndpoints */
  public readonly managedPrivateEndpoints: ManagedPrivateEndpointsOperations;
  /** The operation groups for managedVirtualNetworks */
  public readonly managedVirtualNetworks: ManagedVirtualNetworksOperations;
  /** The operation groups for dataFlows */
  public readonly dataFlows: DataFlowsOperations;
  /** The operation groups for pipelines */
  public readonly pipelines: PipelinesOperations;
  /** The operation groups for datasets */
  public readonly datasets: DatasetsOperations;
  /** The operation groups for linkedServices */
  public readonly linkedServices: LinkedServicesOperations;
  /** The operation groups for integrationRuntime */
  public readonly integrationRuntime: IntegrationRuntimeOperations;
  /** The operation groups for integrationRuntimeNodes */
  public readonly integrationRuntimeNodes: IntegrationRuntimeNodesOperations;
  /** The operation groups for integrationRuntimeObjectMetadata */
  public readonly integrationRuntimeObjectMetadata: IntegrationRuntimeObjectMetadataOperations;
  /** The operation groups for integrationRuntimes */
  public readonly integrationRuntimes: IntegrationRuntimesOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for dataFlowDebugSession */
  public readonly dataFlowDebugSession: DataFlowDebugSessionOperations;
  /** The operation groups for triggerRuns */
  public readonly triggerRuns: TriggerRunsOperations;
  /** The operation groups for triggers */
  public readonly triggers: TriggersOperations;
  /** The operation groups for activityRuns */
  public readonly activityRuns: ActivityRunsOperations;
  /** The operation groups for pipelineRuns */
  public readonly pipelineRuns: PipelineRunsOperations;
  /** The operation groups for exposureControl */
  public readonly exposureControl: ExposureControlOperations;
  /** The operation groups for factories */
  public readonly factories: FactoriesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
