// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkCloudContext, NetworkCloudOptionalParams } from "./api/index.js";
import { createNetworkCloud } from "./api/index.js";
import type { AccessBridgesOperations } from "./classic/accessBridges/index.js";
import { _getAccessBridgesOperations } from "./classic/accessBridges/index.js";
import type { AgentPoolsOperations } from "./classic/agentPools/index.js";
import { _getAgentPoolsOperations } from "./classic/agentPools/index.js";
import type { BareMetalMachineKeySetsOperations } from "./classic/bareMetalMachineKeySets/index.js";
import { _getBareMetalMachineKeySetsOperations } from "./classic/bareMetalMachineKeySets/index.js";
import type { BareMetalMachinesOperations } from "./classic/bareMetalMachines/index.js";
import { _getBareMetalMachinesOperations } from "./classic/bareMetalMachines/index.js";
import type { BmcKeySetsOperations } from "./classic/bmcKeySets/index.js";
import { _getBmcKeySetsOperations } from "./classic/bmcKeySets/index.js";
import type { CloudServicesNetworksOperations } from "./classic/cloudServicesNetworks/index.js";
import { _getCloudServicesNetworksOperations } from "./classic/cloudServicesNetworks/index.js";
import type { ClusterManagersOperations } from "./classic/clusterManagers/index.js";
import { _getClusterManagersOperations } from "./classic/clusterManagers/index.js";
import type { ClustersOperations } from "./classic/clusters/index.js";
import { _getClustersOperations } from "./classic/clusters/index.js";
import type { ConsolesOperations } from "./classic/consoles/index.js";
import { _getConsolesOperations } from "./classic/consoles/index.js";
import type { KubernetesClusterFeaturesOperations } from "./classic/kubernetesClusterFeatures/index.js";
import { _getKubernetesClusterFeaturesOperations } from "./classic/kubernetesClusterFeatures/index.js";
import type { KubernetesClustersOperations } from "./classic/kubernetesClusters/index.js";
import { _getKubernetesClustersOperations } from "./classic/kubernetesClusters/index.js";
import type { KubernetesVersionsOperations } from "./classic/kubernetesVersions/index.js";
import { _getKubernetesVersionsOperations } from "./classic/kubernetesVersions/index.js";
import type { L2NetworksOperations } from "./classic/l2Networks/index.js";
import { _getL2NetworksOperations } from "./classic/l2Networks/index.js";
import type { L3NetworksOperations } from "./classic/l3Networks/index.js";
import { _getL3NetworksOperations } from "./classic/l3Networks/index.js";
import type { MetricsConfigurationsOperations } from "./classic/metricsConfigurations/index.js";
import { _getMetricsConfigurationsOperations } from "./classic/metricsConfigurations/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { RackSkusOperations } from "./classic/rackSkus/index.js";
import { _getRackSkusOperations } from "./classic/rackSkus/index.js";
import type { RacksOperations } from "./classic/racks/index.js";
import { _getRacksOperations } from "./classic/racks/index.js";
import type { StorageAppliancesOperations } from "./classic/storageAppliances/index.js";
import { _getStorageAppliancesOperations } from "./classic/storageAppliances/index.js";
import type { TrunkedNetworksOperations } from "./classic/trunkedNetworks/index.js";
import { _getTrunkedNetworksOperations } from "./classic/trunkedNetworks/index.js";
import type { VirtualMachinesOperations } from "./classic/virtualMachines/index.js";
import { _getVirtualMachinesOperations } from "./classic/virtualMachines/index.js";
import type { VolumesOperations } from "./classic/volumes/index.js";
import { _getVolumesOperations } from "./classic/volumes/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { NetworkCloudOptionalParams } from "./api/networkCloudContext.js";

export class NetworkCloud {
  private _client: NetworkCloudContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Network Cloud APIs provide management of the Azure Operator Nexus compute resources such as on-premises clusters, hardware resources, and workload infrastructure resources. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: NetworkCloudOptionalParams = {},
  ) {
    this._client = createNetworkCloud(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.metricsConfigurations = _getMetricsConfigurationsOperations(this._client);
    this.consoles = _getConsolesOperations(this._client);
    this.kubernetesClusterFeatures = _getKubernetesClusterFeaturesOperations(this._client);
    this.agentPools = _getAgentPoolsOperations(this._client);
    this.bmcKeySets = _getBmcKeySetsOperations(this._client);
    this.bareMetalMachineKeySets = _getBareMetalMachineKeySetsOperations(this._client);
    this.volumes = _getVolumesOperations(this._client);
    this.virtualMachines = _getVirtualMachinesOperations(this._client);
    this.trunkedNetworks = _getTrunkedNetworksOperations(this._client);
    this.storageAppliances = _getStorageAppliancesOperations(this._client);
    this.racks = _getRacksOperations(this._client);
    this.rackSkus = _getRackSkusOperations(this._client);
    this.l3Networks = _getL3NetworksOperations(this._client);
    this.l2Networks = _getL2NetworksOperations(this._client);
    this.kubernetesVersions = _getKubernetesVersionsOperations(this._client);
    this.kubernetesClusters = _getKubernetesClustersOperations(this._client);
    this.clusters = _getClustersOperations(this._client);
    this.clusterManagers = _getClusterManagersOperations(this._client);
    this.cloudServicesNetworks = _getCloudServicesNetworksOperations(this._client);
    this.bareMetalMachines = _getBareMetalMachinesOperations(this._client);
    this.accessBridges = _getAccessBridgesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for metricsConfigurations */
  public readonly metricsConfigurations: MetricsConfigurationsOperations;
  /** The operation groups for consoles */
  public readonly consoles: ConsolesOperations;
  /** The operation groups for kubernetesClusterFeatures */
  public readonly kubernetesClusterFeatures: KubernetesClusterFeaturesOperations;
  /** The operation groups for agentPools */
  public readonly agentPools: AgentPoolsOperations;
  /** The operation groups for bmcKeySets */
  public readonly bmcKeySets: BmcKeySetsOperations;
  /** The operation groups for bareMetalMachineKeySets */
  public readonly bareMetalMachineKeySets: BareMetalMachineKeySetsOperations;
  /** The operation groups for volumes */
  public readonly volumes: VolumesOperations;
  /** The operation groups for virtualMachines */
  public readonly virtualMachines: VirtualMachinesOperations;
  /** The operation groups for trunkedNetworks */
  public readonly trunkedNetworks: TrunkedNetworksOperations;
  /** The operation groups for storageAppliances */
  public readonly storageAppliances: StorageAppliancesOperations;
  /** The operation groups for racks */
  public readonly racks: RacksOperations;
  /** The operation groups for rackSkus */
  public readonly rackSkus: RackSkusOperations;
  /** The operation groups for l3Networks */
  public readonly l3Networks: L3NetworksOperations;
  /** The operation groups for l2Networks */
  public readonly l2Networks: L2NetworksOperations;
  /** The operation groups for kubernetesVersions */
  public readonly kubernetesVersions: KubernetesVersionsOperations;
  /** The operation groups for kubernetesClusters */
  public readonly kubernetesClusters: KubernetesClustersOperations;
  /** The operation groups for clusters */
  public readonly clusters: ClustersOperations;
  /** The operation groups for clusterManagers */
  public readonly clusterManagers: ClusterManagersOperations;
  /** The operation groups for cloudServicesNetworks */
  public readonly cloudServicesNetworks: CloudServicesNetworksOperations;
  /** The operation groups for bareMetalMachines */
  public readonly bareMetalMachines: BareMetalMachinesOperations;
  /** The operation groups for accessBridges */
  public readonly accessBridges: AccessBridgesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
