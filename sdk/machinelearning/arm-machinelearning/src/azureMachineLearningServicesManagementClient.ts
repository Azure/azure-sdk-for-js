// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureMachineLearningServicesManagementContext,
  AzureMachineLearningServicesManagementClientOptionalParams,
} from "./api/index.js";
import { createAzureMachineLearningServicesManagement } from "./api/index.js";
import type { BatchDeploymentsOperations } from "./classic/batchDeployments/index.js";
import { _getBatchDeploymentsOperations } from "./classic/batchDeployments/index.js";
import type { BatchEndpointsOperations } from "./classic/batchEndpoints/index.js";
import { _getBatchEndpointsOperations } from "./classic/batchEndpoints/index.js";
import type { CapabilityHostsOperations } from "./classic/capabilityHosts/index.js";
import { _getCapabilityHostsOperations } from "./classic/capabilityHosts/index.js";
import type { CodeContainersOperations } from "./classic/codeContainers/index.js";
import { _getCodeContainersOperations } from "./classic/codeContainers/index.js";
import type { CodeVersionsOperations } from "./classic/codeVersions/index.js";
import { _getCodeVersionsOperations } from "./classic/codeVersions/index.js";
import type { ComponentContainersOperations } from "./classic/componentContainers/index.js";
import { _getComponentContainersOperations } from "./classic/componentContainers/index.js";
import type { ComponentVersionsOperations } from "./classic/componentVersions/index.js";
import { _getComponentVersionsOperations } from "./classic/componentVersions/index.js";
import type { ComputeOperations } from "./classic/compute/index.js";
import { _getComputeOperations } from "./classic/compute/index.js";
import type { DataContainersOperations } from "./classic/dataContainers/index.js";
import { _getDataContainersOperations } from "./classic/dataContainers/index.js";
import type { DataVersionsOperations } from "./classic/dataVersions/index.js";
import { _getDataVersionsOperations } from "./classic/dataVersions/index.js";
import type { DatastoresOperations } from "./classic/datastores/index.js";
import { _getDatastoresOperations } from "./classic/datastores/index.js";
import type { EnvironmentContainersOperations } from "./classic/environmentContainers/index.js";
import { _getEnvironmentContainersOperations } from "./classic/environmentContainers/index.js";
import type { EnvironmentVersionsOperations } from "./classic/environmentVersions/index.js";
import { _getEnvironmentVersionsOperations } from "./classic/environmentVersions/index.js";
import type { FeaturesOperations } from "./classic/features/index.js";
import { _getFeaturesOperations } from "./classic/features/index.js";
import type { FeaturesetContainersOperations } from "./classic/featuresetContainers/index.js";
import { _getFeaturesetContainersOperations } from "./classic/featuresetContainers/index.js";
import type { FeaturesetVersionsOperations } from "./classic/featuresetVersions/index.js";
import { _getFeaturesetVersionsOperations } from "./classic/featuresetVersions/index.js";
import type { FeaturestoreEntityContainersOperations } from "./classic/featurestoreEntityContainers/index.js";
import { _getFeaturestoreEntityContainersOperations } from "./classic/featurestoreEntityContainers/index.js";
import type { FeaturestoreEntityVersionsOperations } from "./classic/featurestoreEntityVersions/index.js";
import { _getFeaturestoreEntityVersionsOperations } from "./classic/featurestoreEntityVersions/index.js";
import type { JobsOperations } from "./classic/jobs/index.js";
import { _getJobsOperations } from "./classic/jobs/index.js";
import type { ManagedNetworkProvisionsOperations } from "./classic/managedNetworkProvisions/index.js";
import { _getManagedNetworkProvisionsOperations } from "./classic/managedNetworkProvisions/index.js";
import type { ManagedNetworkSettingsRuleOperations } from "./classic/managedNetworkSettingsRule/index.js";
import { _getManagedNetworkSettingsRuleOperations } from "./classic/managedNetworkSettingsRule/index.js";
import type { MarketplaceSubscriptionsOperations } from "./classic/marketplaceSubscriptions/index.js";
import { _getMarketplaceSubscriptionsOperations } from "./classic/marketplaceSubscriptions/index.js";
import type { ModelContainersOperations } from "./classic/modelContainers/index.js";
import { _getModelContainersOperations } from "./classic/modelContainers/index.js";
import type { ModelVersionsOperations } from "./classic/modelVersions/index.js";
import { _getModelVersionsOperations } from "./classic/modelVersions/index.js";
import type { OnlineDeploymentsOperations } from "./classic/onlineDeployments/index.js";
import { _getOnlineDeploymentsOperations } from "./classic/onlineDeployments/index.js";
import type { OnlineEndpointsOperations } from "./classic/onlineEndpoints/index.js";
import { _getOnlineEndpointsOperations } from "./classic/onlineEndpoints/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { QuotasOperations } from "./classic/quotas/index.js";
import { _getQuotasOperations } from "./classic/quotas/index.js";
import type { RegistriesOperations } from "./classic/registries/index.js";
import { _getRegistriesOperations } from "./classic/registries/index.js";
import type { RegistryCodeContainersOperations } from "./classic/registryCodeContainers/index.js";
import { _getRegistryCodeContainersOperations } from "./classic/registryCodeContainers/index.js";
import type { RegistryCodeVersionsOperations } from "./classic/registryCodeVersions/index.js";
import { _getRegistryCodeVersionsOperations } from "./classic/registryCodeVersions/index.js";
import type { RegistryComponentContainersOperations } from "./classic/registryComponentContainers/index.js";
import { _getRegistryComponentContainersOperations } from "./classic/registryComponentContainers/index.js";
import type { RegistryComponentVersionsOperations } from "./classic/registryComponentVersions/index.js";
import { _getRegistryComponentVersionsOperations } from "./classic/registryComponentVersions/index.js";
import type { RegistryDataContainersOperations } from "./classic/registryDataContainers/index.js";
import { _getRegistryDataContainersOperations } from "./classic/registryDataContainers/index.js";
import type { RegistryDataReferencesOperations } from "./classic/registryDataReferences/index.js";
import { _getRegistryDataReferencesOperations } from "./classic/registryDataReferences/index.js";
import type { RegistryDataVersionsOperations } from "./classic/registryDataVersions/index.js";
import { _getRegistryDataVersionsOperations } from "./classic/registryDataVersions/index.js";
import type { RegistryEnvironmentContainersOperations } from "./classic/registryEnvironmentContainers/index.js";
import { _getRegistryEnvironmentContainersOperations } from "./classic/registryEnvironmentContainers/index.js";
import type { RegistryEnvironmentVersionsOperations } from "./classic/registryEnvironmentVersions/index.js";
import { _getRegistryEnvironmentVersionsOperations } from "./classic/registryEnvironmentVersions/index.js";
import type { RegistryModelContainersOperations } from "./classic/registryModelContainers/index.js";
import { _getRegistryModelContainersOperations } from "./classic/registryModelContainers/index.js";
import type { RegistryModelVersionsOperations } from "./classic/registryModelVersions/index.js";
import { _getRegistryModelVersionsOperations } from "./classic/registryModelVersions/index.js";
import type { SchedulesOperations } from "./classic/schedules/index.js";
import { _getSchedulesOperations } from "./classic/schedules/index.js";
import type { ServerlessEndpointsOperations } from "./classic/serverlessEndpoints/index.js";
import { _getServerlessEndpointsOperations } from "./classic/serverlessEndpoints/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { VirtualMachineSizesOperations } from "./classic/virtualMachineSizes/index.js";
import { _getVirtualMachineSizesOperations } from "./classic/virtualMachineSizes/index.js";
import type { WorkspaceConnectionsOperations } from "./classic/workspaceConnections/index.js";
import { _getWorkspaceConnectionsOperations } from "./classic/workspaceConnections/index.js";
import type { WorkspaceFeaturesOperations } from "./classic/workspaceFeatures/index.js";
import { _getWorkspaceFeaturesOperations } from "./classic/workspaceFeatures/index.js";
import type { WorkspacesOperations } from "./classic/workspaces/index.js";
import { _getWorkspacesOperations } from "./classic/workspaces/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureMachineLearningServicesManagementClientOptionalParams } from "./api/azureMachineLearningServicesManagementContext.js";

export class AzureMachineLearningServicesManagementClient {
  private _client: AzureMachineLearningServicesManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** These APIs allow end users to operate on Azure Machine Learning Workspace resources. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzureMachineLearningServicesManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureMachineLearningServicesManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.quotas = _getQuotasOperations(this._client);
    this.virtualMachineSizes = _getVirtualMachineSizesOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.managedNetworkSettingsRule = _getManagedNetworkSettingsRuleOperations(this._client);
    this.workspaceConnections = _getWorkspaceConnectionsOperations(this._client);
    this.jobs = _getJobsOperations(this._client);
    this.registryModelVersions = _getRegistryModelVersionsOperations(this._client);
    this.registryModelContainers = _getRegistryModelContainersOperations(this._client);
    this.registryEnvironmentVersions = _getRegistryEnvironmentVersionsOperations(this._client);
    this.registryEnvironmentContainers = _getRegistryEnvironmentContainersOperations(this._client);
    this.registryDataVersions = _getRegistryDataVersionsOperations(this._client);
    this.registryDataContainers = _getRegistryDataContainersOperations(this._client);
    this.registryComponentVersions = _getRegistryComponentVersionsOperations(this._client);
    this.registryComponentContainers = _getRegistryComponentContainersOperations(this._client);
    this.registryCodeVersions = _getRegistryCodeVersionsOperations(this._client);
    this.registryDataReferences = _getRegistryDataReferencesOperations(this._client);
    this.registryCodeContainers = _getRegistryCodeContainersOperations(this._client);
    this.managedNetworkProvisions = _getManagedNetworkProvisionsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.workspaceFeatures = _getWorkspaceFeaturesOperations(this._client);
    this.compute = _getComputeOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.serverlessEndpoints = _getServerlessEndpointsOperations(this._client);
    this.schedules = _getSchedulesOperations(this._client);
    this.onlineDeployments = _getOnlineDeploymentsOperations(this._client);
    this.onlineEndpoints = _getOnlineEndpointsOperations(this._client);
    this.marketplaceSubscriptions = _getMarketplaceSubscriptionsOperations(this._client);
    this.featurestoreEntityVersions = _getFeaturestoreEntityVersionsOperations(this._client);
    this.featurestoreEntityContainers = _getFeaturestoreEntityContainersOperations(this._client);
    this.featuresetVersions = _getFeaturesetVersionsOperations(this._client);
    this.features = _getFeaturesOperations(this._client);
    this.featuresetContainers = _getFeaturesetContainersOperations(this._client);
    this.datastores = _getDatastoresOperations(this._client);
    this.capabilityHosts = _getCapabilityHostsOperations(this._client);
    this.batchDeployments = _getBatchDeploymentsOperations(this._client);
    this.batchEndpoints = _getBatchEndpointsOperations(this._client);
    this.modelVersions = _getModelVersionsOperations(this._client);
    this.modelContainers = _getModelContainersOperations(this._client);
    this.environmentVersions = _getEnvironmentVersionsOperations(this._client);
    this.environmentContainers = _getEnvironmentContainersOperations(this._client);
    this.dataVersions = _getDataVersionsOperations(this._client);
    this.dataContainers = _getDataContainersOperations(this._client);
    this.componentVersions = _getComponentVersionsOperations(this._client);
    this.componentContainers = _getComponentContainersOperations(this._client);
    this.codeVersions = _getCodeVersionsOperations(this._client);
    this.registries = _getRegistriesOperations(this._client);
    this.codeContainers = _getCodeContainersOperations(this._client);
    this.workspaces = _getWorkspacesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for quotas */
  public readonly quotas: QuotasOperations;
  /** The operation groups for virtualMachineSizes */
  public readonly virtualMachineSizes: VirtualMachineSizesOperations;
  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for managedNetworkSettingsRule */
  public readonly managedNetworkSettingsRule: ManagedNetworkSettingsRuleOperations;
  /** The operation groups for workspaceConnections */
  public readonly workspaceConnections: WorkspaceConnectionsOperations;
  /** The operation groups for jobs */
  public readonly jobs: JobsOperations;
  /** The operation groups for registryModelVersions */
  public readonly registryModelVersions: RegistryModelVersionsOperations;
  /** The operation groups for registryModelContainers */
  public readonly registryModelContainers: RegistryModelContainersOperations;
  /** The operation groups for registryEnvironmentVersions */
  public readonly registryEnvironmentVersions: RegistryEnvironmentVersionsOperations;
  /** The operation groups for registryEnvironmentContainers */
  public readonly registryEnvironmentContainers: RegistryEnvironmentContainersOperations;
  /** The operation groups for registryDataVersions */
  public readonly registryDataVersions: RegistryDataVersionsOperations;
  /** The operation groups for registryDataContainers */
  public readonly registryDataContainers: RegistryDataContainersOperations;
  /** The operation groups for registryComponentVersions */
  public readonly registryComponentVersions: RegistryComponentVersionsOperations;
  /** The operation groups for registryComponentContainers */
  public readonly registryComponentContainers: RegistryComponentContainersOperations;
  /** The operation groups for registryCodeVersions */
  public readonly registryCodeVersions: RegistryCodeVersionsOperations;
  /** The operation groups for registryDataReferences */
  public readonly registryDataReferences: RegistryDataReferencesOperations;
  /** The operation groups for registryCodeContainers */
  public readonly registryCodeContainers: RegistryCodeContainersOperations;
  /** The operation groups for managedNetworkProvisions */
  public readonly managedNetworkProvisions: ManagedNetworkProvisionsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for workspaceFeatures */
  public readonly workspaceFeatures: WorkspaceFeaturesOperations;
  /** The operation groups for compute */
  public readonly compute: ComputeOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for serverlessEndpoints */
  public readonly serverlessEndpoints: ServerlessEndpointsOperations;
  /** The operation groups for schedules */
  public readonly schedules: SchedulesOperations;
  /** The operation groups for onlineDeployments */
  public readonly onlineDeployments: OnlineDeploymentsOperations;
  /** The operation groups for onlineEndpoints */
  public readonly onlineEndpoints: OnlineEndpointsOperations;
  /** The operation groups for marketplaceSubscriptions */
  public readonly marketplaceSubscriptions: MarketplaceSubscriptionsOperations;
  /** The operation groups for featurestoreEntityVersions */
  public readonly featurestoreEntityVersions: FeaturestoreEntityVersionsOperations;
  /** The operation groups for featurestoreEntityContainers */
  public readonly featurestoreEntityContainers: FeaturestoreEntityContainersOperations;
  /** The operation groups for featuresetVersions */
  public readonly featuresetVersions: FeaturesetVersionsOperations;
  /** The operation groups for features */
  public readonly features: FeaturesOperations;
  /** The operation groups for featuresetContainers */
  public readonly featuresetContainers: FeaturesetContainersOperations;
  /** The operation groups for datastores */
  public readonly datastores: DatastoresOperations;
  /** The operation groups for capabilityHosts */
  public readonly capabilityHosts: CapabilityHostsOperations;
  /** The operation groups for batchDeployments */
  public readonly batchDeployments: BatchDeploymentsOperations;
  /** The operation groups for batchEndpoints */
  public readonly batchEndpoints: BatchEndpointsOperations;
  /** The operation groups for modelVersions */
  public readonly modelVersions: ModelVersionsOperations;
  /** The operation groups for modelContainers */
  public readonly modelContainers: ModelContainersOperations;
  /** The operation groups for environmentVersions */
  public readonly environmentVersions: EnvironmentVersionsOperations;
  /** The operation groups for environmentContainers */
  public readonly environmentContainers: EnvironmentContainersOperations;
  /** The operation groups for dataVersions */
  public readonly dataVersions: DataVersionsOperations;
  /** The operation groups for dataContainers */
  public readonly dataContainers: DataContainersOperations;
  /** The operation groups for componentVersions */
  public readonly componentVersions: ComponentVersionsOperations;
  /** The operation groups for componentContainers */
  public readonly componentContainers: ComponentContainersOperations;
  /** The operation groups for codeVersions */
  public readonly codeVersions: CodeVersionsOperations;
  /** The operation groups for registries */
  public readonly registries: RegistriesOperations;
  /** The operation groups for codeContainers */
  public readonly codeContainers: CodeContainersOperations;
  /** The operation groups for workspaces */
  public readonly workspaces: WorkspacesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
